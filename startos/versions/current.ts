import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.10.0:5',
  releaseNotes: {
    en_US:
      'Test candidate for cross-platform parity: direct CLN/LND connections, improved payment status and recovery, Bridge status, QR signing and refreshed navigation. Includes optional bundled JoinBlaket with separate data, restricted node RPC and complete-volume backup definitions. Includes revocable, wallet-scoped phone pairing for receiving, maker controls and status; paired sends remain unavailable. Bundled Jars is disabled by default; host restore and mobile pairing acceptance remain open. Production acceptance remains incomplete. Back up the complete wallet before updating in place. Preserves the main data volume and existing authentication. Never automatically retry an uncertain payment; do not downgrade with pending payments or exits.',
  },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
