import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const inputSpec = sdk.InputSpec.of({
  enabled: sdk.Value.select({
    name: i18n('Jars wallet'),
    description: i18n(
      'Run a separate JoinBlaket wallet inside Paperclip. Its keys and backups stay separate from your main wallet.',
    ),
    values: { disabled: 'Disabled', enabled: 'Run bundled JoinBlaket' },
    default: 'enabled',
  }),
})

export const bundledJam = sdk.Action.withInput(
  'bundled-jam',
  async () => ({
    name: i18n('Jars wallet'),
    description: i18n(
      'Manage the integrated Jars service. It runs by default and uses the installed Knots (BLAKE2b) node.',
    ),
    warning: i18n(
      'Changing this setting restarts Paperclip. Finish active payments first. Disabling Jars keeps its wallet files and recovery records. This test candidate has not passed host backup/restore or mobile pairing acceptance.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
    access: 'user',
  }),
  inputSpec,
  async () => ({
    enabled:
      ((await storeJson.read((s) => s.bundledJam).once()) ?? true)
        ? ('enabled' as const)
        : ('disabled' as const),
  }),
  async ({ effects, input }) => {
    await storeJson.merge(effects, { bundledJam: input.enabled === 'enabled' })
  },
)
