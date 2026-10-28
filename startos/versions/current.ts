import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.9.0:0',
  releaseNotes: { en_US: "Ordinary single-input Ark sends allocate 1,056 sats without change or 1,584 sats with change on compatible servers: about 60% less than 0.8.3. Existing signed exits and older-wallet support are preserved. Lightning and tree recovery budgets are unchanged. Smoother navigation, payment review and status, and clearer connection settings. Back up the complete wallet before upgrading; do not downgrade with pending transfers. Beta, not independently audited." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
