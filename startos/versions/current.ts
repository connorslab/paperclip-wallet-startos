import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.10.0:9',
  releaseNotes: {
    en_US:
      'Test candidate for cross-platform parity: direct CLN/LND connections, improved payment status and recovery, Bridge status, QR signing and refreshed navigation. Includes integrated JoinBlaket with separate data, restricted node RPC and complete-volume backup definitions. Includes revocable wallet-scoped phone pairing, reviewed Jars payments and bond management, reusable BOLT12 Bridge conversions, and current payment-recovery fixes. Jars starts by default using the installed Knots (BLAKE2b) node, independently of the main wallet connection. Existing explicit disable choices are preserved. The Jars page opens wallet creation or unlock directly. Lightning now separates Ark payments, connected nodes and the Bridge. Tor phone pairing can use the already-published Paperclip onion address automatically. Updated mobile clients show built-in Tor progress and retain certificate validation. No host Tor settings are changed. Adds a read-only Jars order book with public offers, fee and capacity sorting, bond eligibility filtering and pagination. Host restore and installed mobile pairing acceptance remain open. Production acceptance remains incomplete. Back up the complete wallet before updating in place. Preserves the main data volume and existing authentication. Never automatically retry an uncertain payment; do not downgrade with pending payments or exits.',
  },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
