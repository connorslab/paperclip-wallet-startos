import { sdk } from './sdk'
import { i18n } from './i18n'
import { uiPort } from './utils'
import { storeJson } from './fileModels/store.json'
export const main = sdk.setupMain(async ({ effects }) => {
  const bundledJam =
    (await storeJson.read((s) => s.bundledJam).const(effects)) ?? true
  const backend = await storeJson.read((s) => s.backend).const(effects)
  // Advertise only an onion address already published by StartOS. This does
  // not enable Tor, publish a port, or change the user's preferred UI address.
  const pairingOnion = await sdk.host.getOwn(effects, 'wallet-ui', (host) =>
    host?.bindings[uiPort]?.interfaces.ui?.addressInfo.format('urlstring').find((address) => {
      try {
        const url = new URL(address)
        return ['http:', 'https:'].includes(url.protocol) && /^[a-z2-7]{56}\.onion$/.test(url.hostname)
      } catch {
        // StartOS may include scoped IPv6 URLs that Node cannot parse. Skip
        // that candidate so optional Tor discovery cannot prevent startup.
        return false
      }
    }) ?? '',
  ).const()
  let mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })
  const nodeEnv: Record<string, string> = {}
  let jamRpcURL = ''
  if (backend === 'knots-blake2b' || bundledJam) {
    const rpc = await sdk.host
      .getBridgeAddress(effects, {
        packageId: 'knots-blake2b',
        hostId: 'rpc',
        internalPort: 18443,
        ssl: false,
      })
      .const()
    if (rpc) jamRpcURL = `http://${rpc}`
    if (rpc && backend === 'knots-blake2b') {
      mounts = mounts.mountDependency({
        dependencyId: 'knots-blake2b',
        volumeId: 'main',
        subpath: null,
        mountpoint: '/mnt/xbt-node',
        readonly: true,
      })
      nodeEnv.PAPERCLIP_NODE_RPC_URL = `http://${rpc}`
      nodeEnv.PAPERCLIP_NODE_RPC_COOKIE = '/mnt/xbt-node/.cookie'
    }
  }
  const jamEnabled = !!bundledJam && !!jamRpcURL
  if (jamEnabled)
    mounts = mounts.mountVolume({
      volumeId: 'jam-public',
      subpath: null,
      mountpoint: '/run/paperclip-jam-public',
      readonly: true,
    })
  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'wallet' },
    mounts,
    'wallet',
  )
  return sdk.Daemons.of(effects)
    .addDaemon('wallet', {
      subcontainer,
      exec: {
        command: [
          '/usr/bin/tini',
          '--',
          'python3',
          '/usr/local/lib/paperclip/startos-entrypoint.py',
        ],
        user: 'root',
        runAsInit: true,
        env: {
          BARKD_UI_DEFAULT_ARK_SERVER: 'https://ark.paperclippool.xyz',
          PAPERCLIP_XBT_MAINNET: '1',
          BARKD_JARS_PAIRING_ONION: pairingOnion,
          ...nodeEnv,
          ...(jamEnabled
            ? {
                BARKD_JOINBLAKET_URL: 'https://localhost:28183',
                BARKD_JOINBLAKET_CA_FILE: '/run/paperclip-jam-public/cert.pem',
              }
            : {}),
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: [],
    })
    .addOneshot('jam-directories', () =>
      jamEnabled
        ? {
            subcontainer: sdk.SubContainer.of(
              effects,
              { imageId: 'jam' },
              sdk.Mounts.of()
                .mountVolume({
                  volumeId: 'jam',
                  subpath: null,
                  mountpoint: '/data',
                  readonly: false,
                })
                .mountVolume({
                  volumeId: 'jam-public',
                  subpath: null,
                  mountpoint: '/run/paperclip-jam-public',
                  readonly: false,
                }),
              'jam-init',
            ),
            exec: {
              command: [
                'sh',
                '-ec',
                'chown 1000:1000 /data /run/paperclip-jam-public; chmod 700 /data; chmod 755 /run/paperclip-jam-public',
              ],
              user: 'root',
            },
            requires: [],
          }
        : null,
    )
    .addDaemon('jam-rpc', () =>
      jamEnabled
        ? {
            subcontainer: sdk.SubContainer.of(
              effects,
              { imageId: 'jam' },
              sdk.Mounts.of()
                .mountDependency({
                  dependencyId: 'knots-blake2b',
                  volumeId: 'main',
                  subpath: null,
                  mountpoint: '/mnt/xbt-node',
                  readonly: true,
                })
                .mountVolume({
                  volumeId: 'jam-rpc',
                  subpath: null,
                  mountpoint: '/rpc-filter',
                  readonly: false,
                }),
              'jam-rpc',
            ),
            exec: {
              command: [
                '/opt/venv/bin/python',
                '/usr/local/lib/jm-xbt/paperclip-startos-rpc-entry.py',
              ],
              user: 'root',
              env: { PAPERCLIP_NODE_RPC_URL: jamRpcURL },
              sigtermTimeout: 30000,
            },
            ready: {
              display: i18n('Jars node connection'),
              fn: () =>
                sdk.healthCheck.checkPortListening(effects, 28187, {
                  successMessage: i18n(
                    'The restricted Jars RPC listener is ready',
                  ),
                  errorMessage: i18n('The Jars RPC listener is not ready'),
                }),
            },
            requires: [],
          }
        : null,
    )
    .addDaemon('jam', () =>
      jamEnabled
        ? {
            subcontainer: sdk.SubContainer.of(
              effects,
              { imageId: 'jam' },
              sdk.Mounts.of()
                .mountVolume({
                  volumeId: 'jam',
                  subpath: null,
                  mountpoint: '/data',
                  readonly: false,
                })
                .mountVolume({
                  volumeId: 'jam-rpc',
                  subpath: null,
                  mountpoint: '/run/jm-xbt-rpc',
                  readonly: true,
                })
                .mountVolume({
                  volumeId: 'jam-public',
                  subpath: null,
                  mountpoint: '/run/paperclip-jam-public',
                  readonly: false,
                }),
              'jam',
            ),
            exec: {
              command: sdk.useEntrypoint(),
              user: 'jm',
              runAsInit: true,
              sigtermTimeout: 120000,
              env: {
                JMWALLETD_HOST: '127.0.0.1',
                JM_XBT_RPC_FILTER: 'external',
                BITCOIN_RPC_URL: 'http://127.0.0.1:28187',
                BITCOIN_RPC_COOKIE: '/run/jm-xbt-rpc/client.cookie',
                PAPERCLIP_JAM_PUBLIC_CERT_FILE:
                  '/run/paperclip-jam-public/cert.pem',
              },
            },
            ready: {
              display: i18n('Jars wallet'),
              gracePeriod: 240000,
              fn: () =>
                sdk.healthCheck.checkPortListening(effects, 28183, {
                  successMessage: i18n(
                    'The local Jars HTTPS listener is ready',
                  ),
                  errorMessage: i18n(
                    'The local Jars HTTPS listener is not ready',
                  ),
                }),
            },
            requires: ['jam-directories', 'jam-rpc'],
          }
        : null,
    )
})
