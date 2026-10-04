# Paperclip Wallet · Beta

Check the Paperclip Ark service's live status before funding. Start with a small
amount. This app is for Bitcoin Blake2b (XBT); SHA-256 BTC nodes are incompatible.

1. Start the app. Use **Actions → Show wallet access token**. Keep it private.
2. Open the wallet interface and paste the token.
3. Keep `https://ark.paperclippool.xyz` as the Ark server. Select XBT mainnet and
   configure your compatible private blockchain RPC endpoint.
4. Back up the complete app data before funding. A seed alone cannot restore all
   Ark recovery state. Track expiry deadlines.

Automatic VTXO refresh runs while the wallet service is online. Closing a browser
does not stop it. Refresh needs the Ark server and blockchain connection and may
cost fees. Stopping the service stops maintenance. Withdrawals and emergency exits
remove the affected VTXOs from refresh eligibility.

The pruned-node adapter is bundled but optional. Before creating a wallet with a
pruned backend, follow [the adapter guide](https://github.com/connorslab/paperclip-wallet-app/blob/main/deployment/BUNDLED-PRUNED.md).
Use the service container named `wallet`; run its helper as uid 1000. Indexing
must finish before creation. The adapter and its index stop and persist with the app.

Stop the service before a manual full-volume backup. Do not copy only the seed
or one SQLite file from a running wallet. Keep the complete wallet and recovery
data. Do not run two instances from the same backup. Restore acceptance testing
on a StartOS device remains pending for this beta.

## Wallet 0.8.3

Compatible servers check Lightning invoices before committing Ark funds. Eligible
failures before payment dispatch can receive an ASP-funded reimbursement. Keep the
wallet online to finish pending reimbursements. A payment being initiated does not
mean it has settled; check its final status. Recovery reserves remain funded.
Back up the complete app before upgrading and do not downgrade while a transfer or
reimbursement is pending. Older wallets may see the same eligible reimbursement as
a separate incoming Ark payment after syncing with an updated ASP.

Lightning sends now choose inputs that can form valid HTLCs and change after
recovery reserves. Enter an amount to review the estimated total before paying.
If no usable combination exists, refresh eligible inputs or add Ark funds.
The wallet does not automatically retry payments or consolidate funds.

Lightning now has a reusable BOLT12 offer. Keep the wallet service online to
answer new invoice requests; closing the browser is fine. Disabling an offer
stops new requests but preserves payments already issued. The ASP must support
reusable receiving. Existing BOLT11 payments continue to work.

Receive cards display QR codes generated locally. The On-chain page can sign
and verify exact messages with wallet-owned Taproot addresses using BIP322-simple.
Review the complete message before signing. This does not broadcast a transaction.

Back up the complete app before upgrading. After creating an offer, do not
downgrade to an older wallet binary; it cannot read the new offer checkpoint.

Use VTXOs & recovery to inspect spendable and locked funds, expiry block heights,
and refresh controls. Keep the service online for automatic maintenance.
The optional tab session survives page reloads; select Lock to clear it.
Emergency exit tools remain separate from routine refresh.

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
