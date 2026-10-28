import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const inputSpec = sdk.InputSpec.of({
  backend: sdk.Value.select({
    name: i18n('Node connection'),
    description: i18n('Reuse the installed XBT node or enter RPC settings in the wallet.'),
    values: { manual: 'Manual RPC', 'knots-blake2b': 'Knots (BLAKE2b) Companion' },
    default: 'manual',
  }),
})

export const selectNode = sdk.Action.withInput('select-node', async () => ({
  name: i18n('Node connection'),
  description: i18n('Reuse the installed XBT node or enter RPC settings in the wallet.'),
  warning: i18n('This selects a connection for new wallets. Existing wallet settings are preserved.'),
  allowedStatuses: 'any', group: null, visibility: 'enabled', access: 'user',
}), inputSpec, async () => ({
  backend: (await storeJson.read(s => s.backend).once()) ?? 'manual',
}), async ({ effects, input }) => {
  await storeJson.merge(effects, { backend: input.backend })
})
