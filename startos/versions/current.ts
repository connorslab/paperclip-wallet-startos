import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.1:1',
  releaseNotes: { en_US: 'Preserve exact decimal amounts in the pruned-node adapter for CLN compatibility. Wallet keys and saved configuration are unchanged.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
