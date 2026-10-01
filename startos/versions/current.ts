import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.3:0',
  releaseNotes: { en_US: 'Handle temporary chain RPC overload without crashing. Fee queries retry briefly; transaction broadcasts are never automatically replayed.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
