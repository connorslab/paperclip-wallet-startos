import { sdk } from './sdk'
import { i18n } from './i18n'
import { uiPort } from './utils'
import { storeJson } from './fileModels/store.json'
export const main = sdk.setupMain(async ({ effects }) => {
  const backend = await storeJson.read(s => s.backend).const(effects)
  let mounts = sdk.Mounts.of().mountVolume({ volumeId: 'main', subpath: null, mountpoint: '/data', readonly: false })
  const nodeEnv: Record<string, string> = {}
  if (backend === 'knots-blake2b') {
    const rpc = await sdk.host.getBridgeAddress(effects, {
      packageId: 'knots-blake2b', hostId: 'rpc', internalPort: 18443, ssl: false,
    }).const()
    if (rpc) {
      mounts = mounts.mountDependency({ dependencyId: 'knots-blake2b', volumeId: 'main', subpath: null, mountpoint: '/mnt/xbt-node', readonly: true })
      nodeEnv.PAPERCLIP_NODE_RPC_URL = `http://${rpc}`
      nodeEnv.PAPERCLIP_NODE_RPC_COOKIE = '/mnt/xbt-node/.cookie'
    }
  }
  const subcontainer = sdk.SubContainer.of(effects, { imageId: 'wallet' },
    mounts, 'wallet')
  return sdk.Daemons.of(effects).addDaemon('wallet', {
    subcontainer,
    exec: {
      command: ['/usr/bin/tini', '--', 'python3', '/usr/local/lib/paperclip/startos-entrypoint.py'],
      user: 'root', runAsInit: true,
      env: { BARKD_UI_DEFAULT_ARK_SERVER: 'https://ark.paperclippool.xyz', PAPERCLIP_XBT_MAINNET: '1', ...nodeEnv },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () => sdk.healthCheck.checkPortListening(effects, uiPort, {
        successMessage: i18n('The web interface is ready'),
        errorMessage: i18n('The web interface is not ready'),
      }),
    },
    requires: [],
  })
})
