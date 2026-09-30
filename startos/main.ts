import { sdk } from './sdk'
import { i18n } from './i18n'
import { uiPort } from './utils'
export const main = sdk.setupMain(async ({ effects }) => {
  const subcontainer = sdk.SubContainer.of(effects, { imageId: 'wallet' },
    sdk.Mounts.of().mountVolume({ volumeId: 'main', subpath: null, mountpoint: '/data', readonly: false }), 'wallet')
  return sdk.Daemons.of(effects).addDaemon('wallet', {
    subcontainer,
    exec: {
      command: ['/usr/bin/tini', '--', 'python3', '/usr/local/lib/paperclip/startos-entrypoint.py'],
      user: 'root', runAsInit: true,
      env: { BARKD_UI_DEFAULT_ARK_SERVER: 'https://ark.paperclippool.xyz', PAPERCLIP_XBT_MAINNET: '1' },
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
