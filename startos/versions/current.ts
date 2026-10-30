import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.9.2:0',
  releaseNotes: { en_US: "Sign-in stays responsive when a node is syncing or unavailable. Clear connection messages, partial balance and activity loading, and dedicated transaction result screens distinguish success, failure, pending confirmation, and unknown outcomes. Interrupted payments are never automatically retried. Existing wallet data, authentication, node connections, fees, and recovery formats are preserved." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
