# Paperclip Wallet · Beta

Wait for the Paperclip Ark service to open before funding. Start with a small
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

## Wallet 0.7.5

Use VTXOs & recovery to inspect spendable and locked funds, expiry block heights,
and refresh controls. Keep the service online for automatic maintenance.
The optional tab session survives page reloads; select Lock to clear it.
Emergency exit tools remain separate from routine refresh.
