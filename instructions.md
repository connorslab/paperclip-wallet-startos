# Paperclip Wallet Sideflash test

This is a separate **experimental, unaudited test app** for StartOS 0.4, x86-64 only. It does not upgrade an existing production app. It creates no channels, transfers no money, and copies no existing wallet data during installation. Runtime tests are not a StartOS device installation test.

Keep the entire app backup. Stop the app before a backup; the package refuses an active-state backup. Restore only with the original instance stopped. Never run both restored and original copies of the same Lightning or Ark identity. Never restore an old Lightning state over a live node.

## Documentation

- [Sideflash integration](https://github.com/connorslab/paperclip-wallet-app/blob/feature/sideflash/docs/sideflash.md)

## What this app provides

Bitcoin wallet with on-chain, Ark, Lightning, and compact Sideflash send/receive support. Sideflash sits under Send & receive.

Authenticated wallet UI/API: 3000. StartOS supplies browser HTTPS. The optional chain adapter is internal.

## Setup

1. Start the isolated Ark app and copy its **Ark endpoint** LAN address and external port.
2. Run **Configure test app**, set `asp_url` to that endpoint, and save the returned access token. Start the app and open **Wallet interface**.
3. Unlock with the access token. Onboarding still requires your XBT node RPC connection and explicit creation of a new wallet. Use a reachable LAN IP and the correct RPC port/credentials; an internal Docker hostname from another machine is not a usable RPC endpoint.
4. Create a fresh wallet, save its complete recovery backup, and verify the intended ASP identity. For a pruned backend, add `pruned: true`, `rpc_url`, `rpc_user`, and `rpc_password` to Configure test app. Restart, then use **Connection details and funding information** to obtain the internal adapter credentials for wallet onboarding. Wait for indexing before creating the wallet. The internal URL is for this wallet only, not another device.
5. Under **Send & receive**, open Sideflash identity information and give the recipient public key to the test ASP operator for its allowlist. The wallet creates a reusable offer automatically if none exists; disabled offers stay disabled. Once enabled, create the Sideflash address and QR code.

Sideflash receiving is a development feature: the address is valid for at most 24 hours and the daemon must remain online for new BOLT12 requests. Closing the browser does not stop the daemon. Same-server payments use Ark; other-server payments use the authenticated embedded Lightning offer. Trust the full server identity through a separate authenticated channel. Do not switch routes or create a new payment ID while a previous result is uncertain.

The setup ASP URL is an onboarding default. Changing it does not migrate an already-created wallet or its funds. Do not point this experimental wallet at production and assume Sideflash is enabled there.

```json
{
  "network": "bitcoin",
  "asp_url": "http://STARTOS_LAN_IP:ARK_INTERFACE_PORT"
}
```

## Backup and access

Stop the app, then use StartOS Backup. Back up all volumes, not only a seed. **Configure test app** can rotate the web access token while stopped. Client TLS credentials are independent of that token. Package signing keys are not wallet keys.

## Validation limits

See VALIDATION.md in the feature branch. These files have not been installed on a StartOS device by the builder. No mainnet funds are included. Start with tiny, disposable test amounts only after verifying connectivity, backup/restore and identity.

## Labeled configuration form

Configure test app now loads saved settings into separate fields. JSON examples above are reference only. Passwords and client private keys are masked. For Wallet, node RPC fields are only required when the pruned-node adapter is enabled; otherwise enter RPC settings during wallet onboarding. For Ark, enable Lightning and paste each certificate/key and endpoint into its matching field. Recipient public keys may be comma- or space-separated. Token rotation remains optional.

## Onboarding defaults (rc.5)

The new-wallet form loads the Ark server URL and network from StartOS settings when you unlock. Review the prefilled URL; no second entry is required. Existing wallets retain their persisted server and are not migrated by editing the StartOS default.
