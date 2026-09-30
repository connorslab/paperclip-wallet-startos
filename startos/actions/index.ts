import { sdk } from '../sdk'
import { i18n } from '../i18n'
const accessToken = sdk.Action.withoutInput('access-token', async () => ({
  name: i18n('Show wallet access token'),
  description: i18n('Retrieve the private token for the wallet interface.'),
  warning: i18n('This token grants spending access. Keep it private.'),
  allowedStatuses: 'any', group: null, visibility: 'enabled', access: 'user',
}), async () => {
  const token = String(await sdk.volumes.main.readFile('wallet/auth_token', 'utf8')).trim()
  if (!token) throw new Error('Start the wallet once to create its private token.')
  return { version: '1', title: i18n('Wallet access'), message: i18n('Paste this token into the wallet. Do not share it.'),
    result: { type: 'single', name: i18n('Access token'), description: null, value: token, masked: true, copyable: true, qr: false } }
})
export const actions = sdk.Actions.of().addAction(accessToken)
