import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.10.0:13',
  releaseNotes: {
    en_US:
      'Separate Ark and on-chain send and receive actions. Fund fidelity bonds from selected jar coins and review the fixed amount, mining fee and unlock date before sending. Back up your wallet before updating in place.',
  },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
