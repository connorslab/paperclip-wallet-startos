import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.8.0:0',
  releaseNotes: { en_US: 'Reusable BOLT12 receiving, local receive QR codes, and on-chain message signing. Keep the wallet service online for offer requests. Back up the complete wallet before upgrading; older binaries cannot read the new offer checkpoint. Beta, not independently audited.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
