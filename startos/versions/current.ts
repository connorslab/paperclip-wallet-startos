import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.10.0:0',
  releaseNotes: { en_US: "Integrates Bark 0.8.1 with XBT support: improves Lightning payment recovery, rejects expired WebSocket login tickets, fixes payment parsing, and updates on-chain signing. Preserves the Paperclip server default, saved connections, keys, and funded recovery. No reduction to recovery allocations or automatic payment retries. Back up the complete wallet before updating; do not downgrade with pending payments or exits." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
