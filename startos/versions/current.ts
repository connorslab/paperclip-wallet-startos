import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.8.2:0',
  releaseNotes: { en_US: "Reduces ordinary Ark-to-Ark recovery allocations by 33.5% on compatible servers: 2,660 sats without change or 3,990 with change for one input. Preserves funded unilateral recovery and compatibility with older servers and recipients. Lightning reserves are unchanged. Back up the complete wallet before upgrading; do not downgrade with pending transfers. Beta, not independently audited." },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
