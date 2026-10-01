import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.5:0',
  releaseNotes: { en_US: 'Clearer Lightning flow, activity and VTXO dashboards, expiry warnings, tab session memory, live balance refresh, and corrected text encoding.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
