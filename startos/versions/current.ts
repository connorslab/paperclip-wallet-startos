import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.6:0',
  releaseNotes: { en_US: 'Add persistent unaudited-code warnings and a setup risk acknowledgment. No wallet data format changes.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
