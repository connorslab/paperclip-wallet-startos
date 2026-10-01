import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.8.1:0',
  releaseNotes: { en_US: 'Fixes Lightning input selection for fragmented Ark balances. Builder-validated cost estimates include recovery reserves, with a total preview for entered amounts. No automatic payment retry or consolidation. Retains reusable BOLT12, QR codes, and message signing. Back up the complete wallet before upgrading. Beta, not independently audited.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
