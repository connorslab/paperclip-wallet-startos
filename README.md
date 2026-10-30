# Paperclip Wallet for StartOS 0.4 · Beta

This wrapper packages the public Paperclip wallet image for x86_64 and aarch64.
New wallets point to https://ark.paperclippool.xyz. Keys stay on the user's host.
The Paperclip Ark service is open in beta. Check its live status before funding.

Package revision **0.9.3:0** fixes stalled blockchain RPC connections that could
leave Ark balances unavailable after canceled requests or a server disconnect.
Connections can recover without restarting the wallet. Interrupted payments are
not automatically retried. It retains the responsive login and clear transaction
result screens introduced in 0.9.2.

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

The image pin is in `startos/manifest/index.ts`. The single `main` volume mounts
at `/data` and holds wallet data, authentication, and the optional pruned index.
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

The manifest pins the wallet image by digest. Package and container
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
