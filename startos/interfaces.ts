import { sdk } from './sdk'
import { i18n } from './i18n'
import { uiPort } from './utils'
export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const host = sdk.MultiHost.of(effects, 'wallet-ui')
  const origin = await host.bindPort(uiPort, { protocol: 'http' })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web Interface'), id: 'ui', description: i18n('Authenticated Paperclip wallet'),
    type: 'ui', masked: false, schemeOverride: null, username: null, path: '', query: {},
  })
  return [await origin.export([ui])]
})
