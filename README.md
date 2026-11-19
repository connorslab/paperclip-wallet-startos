# Paperclip Wallet for StartOS 0.4 · Beta

## Private test candidate 0.10.0:6

This branch builds wallet source `d90af29e4b5628ee00b8e6c63a1b1699ebd758c8`
from `./upstream` using the manifest's Docker build source. The branch/manual
`test-candidate.yml` workflow checks out that exact revision, runs isolated daemon
tests and signs both architectures with the existing package identity. It uploads
test artifacts only; it does not publish a registry entry, image or release.
The candidate includes first-run Jars creation and password-verified backup in
the owner UI, current payment-recovery fixes, and reusable BOLT12 Bridge conversions. Phone grants cannot create wallets or export recovery words.
Locally, place that exact source revision at `./upstream` before running `make`.
The package ID, main volume, existing connections and token remain unchanged.
An in-place update requires a complete stopped-wallet backup first. Production,
restore, ARM hardware and live payment acceptance remain separate gates.

This wrapper packages the public Paperclip wallet image for x86_64 and aarch64.
New wallets point to https://ark.paperclippool.xyz. Keys stay on the user's host.
The Paperclip Ark service is open in beta. Check its live status before funding.

Package revision **0.10.0:0** integrates Bark 0.8.1 with XBT support. It improves
Lightning payment recovery, rejects expired WebSocket login tickets, fixes
payment parsing, and updates on-chain signing. It retains the connection fixes
from 0.9.3, responsive login, and clear transaction result screens. Interrupted
payments are not automatically retried.

Wallet keys, authentication, connection settings, fees, and recovery formats are
preserved. This release does not change the recovery allocations introduced in
0.9.0: 1,056 sats without change or 1,584 sats with change for an ordinary
single-input Ark send on compatible servers. Lightning reserves are unchanged.

It retains Lightning input selection for fragmented Ark balances and cost estimates.
It retains reusable BOLT12 receiving through a compatible ASP,
local QR codes for on-chain/Ark/Lightning receiving, and BIP322-simple on-chain
message signing. Keep the wallet service online to answer new offer requests.
Existing BOLT11 payments and Ark-send cost estimates remain supported.
Back up the complete wallet before upgrading; do not downgrade after creating
an offer because older binaries cannot read its new persistent checkpoint.
It retains the unaudited-code warnings and setup risk acknowledgment. It includes the 0.7.5 Lightning flow, activity and VTXO dashboards,
expiry warnings, tab session memory, live balance updates, and encoding fixes. Existing wallet data and authentication tokens are preserved.

The image pin is in `startos/manifest/index.ts`. The `main` volume mounts at `/data` in the wallet container and holds wallet
data, authentication, and the optional pruned index. Separate `jam`, `jam-rpc`
and `jam-public` volumes hold the Jars wallet, filter-client credentials and
public HTTPS certificate. Complete backups include all four volumes.
The entrypoint initializes directory ownership then drops to uid/gid 1000.
Only the authenticated wallet interface on port 3000 is exported. The optional
adapter listens at 127.0.0.1:18336 inside the same container.

The owner-only access-token action reads the wallet's native persisted token;
it never generates a replacement token or returns a mnemonic. Automatic refresh
runs while the service is online. A withdrawn or exiting VTXO is not selected
for refresh. See `instructions.md` for setup and complete backup requirements.

Build with the official StartOS 0.4 workspace and start-cli 2.1.0: `npm ci`,
`npm run check`, then `make universal`. A successful package build does not prove
installation or backup restoration on a StartOS device. Those acceptance tests
remain required before a production-ready claim. Version 0.9.2 was installed in place over 0.9.1 on an x86-64 StartOS device.
Login, navigation, bounded connection checks, and key/configuration preservation
passed. Complete backup restoration and ARM device installation remain unverified.

Source: https://github.com/connorslab/paperclip-wallet-app. Based on Bark by
Second and its contributors. MIT license.

## Install and update from the registry

In StartOS 0.4, open **Marketplace**, open the registry selector, and choose
**Add**. Enter `https://start9.paperclip-xbt.xyz`, save, then select **Paperclip**.
Open **Paperclip Wallet Beta** to install. Existing installations can use the
same registry to find updates in **Updates**; do not uninstall the wallet.
Back up the complete wallet before upgrading.

The registry provides the signed x86-64 and ARM64 packages from the release.
[Registry setup guide](https://start9.paperclip-xbt.xyz) ·
[Signed release downloads](https://github.com/connorslab/paperclip-wallet-startos/releases/tag/v0.9.3-beta.1)

## Not independently audited

Paperclip Wallet and its Ark integration have not received an independent
security audit. Experimental software, no warranty. Tests do not guarantee
security or recovery. Bugs can cause loss of funds. Use only amounts you can
afford to lose.

Ark transfers show the recovery reserve and total balance reduction before
confirmation. A higher send-time cost requires a new review. Quotes do not
reserve funds. Recovery reserves are not separately refundable deposits.

## 0.8.2 recovery allocation update

Reduces ordinary Ark-to-Ark recovery allocations by 33.5% on compatible servers: 2,660 sats without change or 3,990 with change for one input. Preserves funded unilateral recovery and compatibility with older servers and recipients. Lightning reserves are unchanged. Back up the complete wallet before upgrading; do not downgrade with pending transfers. Beta, not independently audited.


## Installed node setup

The wrapper provides a **Node connection** action. Select the
installed Knots Blake2b companion to reuse its RPC address and rotating cookie.
The wallet can use a synchronized transaction index directly or the bundled
private adapter when historical transactions need fetching. Manual connections
remain available, and existing wallet configuration is preserved.

Published packages pin the wallet image by digest; this candidate builds the
source revision recorded above. Package and container
checks do not replace cookie-rotation, dependency-restart, ARM installation, or full
backup/restore acceptance; those checks remain unverified for this release.


## Release signatures

Verify the release SHA256SUMS with the standard Paperclip OpenPGP key in
RELEASE-SIGNING.md. StartOS also checks its native package signature. The build
requires the persistent DEV_KEY repository secret and fails if it is missing;
it must not create a disposable signing identity. Version 0.9.0 establishes this
persistent package identity after earlier CI builds used temporary keys. Follow
any StartOS developer-trust prompt and verify the GPG-signed manifest first.

## 0.9.1 setup hotfix

Fixes new-wallet ASP defaults and setup layout. Paperclip is prefilled, configured custom servers are respected, and switching node modes preserves edits. Checkboxes and action buttons now have separate layouts. Existing wallet data, recovery formats, and fees are unchanged. Update in place after backing up the complete wallet.


## Bundled JoinBlaket candidate

The companion is built from the same pinned wallet source. Its Dockerfile pins
Kilombino's multi-architecture Jam/XBT base by digest and applies the reviewed
Paperclip companion. This is candidate packaging, not a production-ready image.

The **Jars wallet** action is disabled by default and requires the installed
Knots (BLAKE2b) backend. Enabling/disabling it changes service configuration and
restarts Paperclip; it must not be changed during an active operation. Disabling
it does not delete the separate Jam wallet or recovery journal.

`jam-rpc` has the read-only dependency mount. Its small root supervisor copies
the rotating cookie into its private container directory and starts the actual
RPC listener as uid/gid1001 with no new privileges/capabilities. `jam` runs as
uid1000 and mounts only the filter client cookie read-only, never the node volume.
The client cookie is group-readable by1000 and persisted separately. Invalid or
missing node cookies stop the filter. The upstream allowlist remains enforced.

Jam uses its original entrypoint/Tor/TLS startup, binding HTTPS only to loopback.
The wallet receives the exported public certificate and validates HTTPS to
localhost:28183. It does not mount Jam wallet files or the TLS private key. The
wallet daemon has no Jam startup dependency. No raw Jam, Tor or filter port is
exported by StartOS; port3000 remains the sole authenticated interface.

TypeScript and JavaScript checks establish packaging consistency only. Native
installation, cookie rotation across an actual dependency restart, node RPC
permissions, TLS/certificate renewal, full backup restoration, mobile pairing,
and live Jam payments remain acceptance gates. Mobile pairing is not implemented
by exposing this loopback API. The port health checks assert listener readiness,
not node synchronization, signer readiness or payment settlement.


The candidate also supports **Jars → Pair a phone** for a running, unlocked Jam
wallet. Use the Paperclip HTTPS/onion address, scan the private code in mobile
Jars, review its wallet and scope, then verify/save. Access covers receiving,
maker controls and status for up to 30 days; it does not grant main-wallet
access, key export or payments. Individual devices can be revoked on the host.
Jam lock/restart invalidates pairing sessions; unlock and create a new pairing.
No raw Jam API port is exposed. Actual host pairing/Tor/TLS and restore tests
remain required, as do installed-host wallet creation/backup acceptance and reviewed Jam payment flows.

Candidate 0.10.0:4 was cancelled before acceptance because the workflow checkout
remained at an older source than the manifest. Do not use its artifacts. Revision
0.10.0:6 reads the checkout commit from the manifest, rejects tracked source drift,
checks the built daemon version and retains source provenance with the package.
