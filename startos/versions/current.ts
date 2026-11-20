import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.10.0:12',
  releaseNotes: {
    en_US:
      'Jars now opens the order book on a market summary and searchable offer table. Offers load automatically. Includes the previous HTTPS phone pairing and IPv6 startup fixes. Back up your wallet before updating in place.',
  },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
