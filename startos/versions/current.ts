import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.9.3:0',
  releaseNotes: { en_US: "Fixes blockchain RPC connections that could remain stuck after a canceled request or a closed server connection, leaving Ark balances unavailable. Connections can recover without restarting the wallet. Existing keys, authentication, settings, fees, recovery data, and older-client compatibility are unchanged. Interrupted payments are not automatically retried. Back up the complete wallet before updating." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
