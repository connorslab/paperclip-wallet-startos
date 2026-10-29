import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.9.1:0',
  releaseNotes: { en_US: "Fixes new-wallet ASP defaults and setup layout. Paperclip is prefilled, configured custom servers are respected, and switching node modes preserves edits. Checkboxes and action buttons now have separate layouts. Existing wallet data, recovery formats, and fees are unchanged. Update in place after backing up the complete wallet." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
