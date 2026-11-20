import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.10.0:14',
  releaseNotes: {
    en_US:
      'Fixes HTTPS phone pairing when StartOS serves different verified certificates to different devices. Unlock Jars, choose Pair a phone, and create a fresh QR code. Includes selected-coin fidelity bonds and separate Ark and on-chain wallet actions.',
  },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
