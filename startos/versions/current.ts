import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.7.1:0',
  releaseNotes: { en_US: 'Initial Paperclip beta for StartOS 0.4. Local keys, Paperclip server preset, automatic VTXO refresh, and bundled optional pruned-node adapter.' },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
