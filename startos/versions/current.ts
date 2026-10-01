import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.7:0',
  releaseNotes: { en_US: 'Preview Ark-send recovery reserves and total cost before payment. Reject costs above the approved debit. No wallet data format changes.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
