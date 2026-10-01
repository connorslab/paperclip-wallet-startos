# Paperclip Wallet for StartOS 0.4 · Beta

This wrapper packages the public Paperclip wallet image for x86_64 and aarch64.
New wallets point to https://ark.paperclippool.xyz. Keys stay on the user's host.
The Paperclip Ark service is open in beta. Check its live status before funding.

Package revision 0.8.1:0 fixes Lightning input selection for fragmented Ark balances
and adds builder-validated cost estimates. No ASP protocol or database change is required.
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
remain required before a production-ready claim. Owner device testing is in progress; this release does not claim complete
StartOS installation or backup/restore acceptance.

Source: https://github.com/connorslab/paperclip-wallet-app. Based on Bark by
Second and its contributors. MIT license.

## Not independently audited

Paperclip Wallet and its Ark integration have not received an independent
security audit. Experimental software, no warranty. Tests do not guarantee
security or recovery. Bugs can cause loss of funds. Use only amounts you can
afford to lose.

Ark transfers show the recovery reserve and total balance reduction before
confirmation. A higher send-time cost requires a new review. Quotes do not
reserve funds. Recovery reserves are not separately refundable deposits.
