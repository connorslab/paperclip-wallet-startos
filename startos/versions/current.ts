import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.4:0',
  releaseNotes: { en_US: 'Keep pending receive state and report an error when the server refuses cancellation. Includes the prior fee RPC resilience fixes.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
