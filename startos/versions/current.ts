import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.8.3:0',
  releaseNotes: { en_US: "Checks Lightning invoices before committing funds on compatible servers. Tracks ASP-funded reimbursement for eligible failures before payment dispatch, including pending and retried refunds. Lightning initiation is no longer described as successful payment. Recovery reserves remain funded. Older wallets can receive eligible credits through their existing Ark inbox. Back up the complete wallet before upgrading; do not downgrade with pending transfers or reimbursements. Beta, not independently audited." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
