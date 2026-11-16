# Release acceptance

## 0.10.0:5 test candidate

- [x] Pin the shared UI/payment improvements and Jam credential supervisor at 69c0cd8ae058dd1684139579ba888d305f53f8aa.
- [x] Include owner-only Jars creation, password-verified backup and interrupted-creation recovery.
- [x] Include scoped phone-pairing clients/proxy; installed-host acceptance and paired sends remain open.
- [x] Add optional bundled Jam with separate volumes, loopback HTTPS, restricted RPC and complete-volume backup definitions.
- [ ] Build the pinned wallet source on both architectures and retain signed test artifacts.
- Before a public release, replace the test Docker build source with a verified multi-architecture image digest.
- Validate the native package, install/update behavior, and complete-wallet preservation.
- Publish only after the compatible ASP is deployed and its readiness checks pass.
- Keep the existing native signing identity and sign release checksums with the standard release key.

Completed for 0.9.2:
- Built x86-64 and ARM64 packages with the existing native signing identity.
- Upgraded an existing x86-64 StartOS 0.4 wallet from 0.9.1 in place.
- Verified responsive login, navigation, bounded connection checks, and preserved
  mnemonic, authentication token, and saved configuration.
- Created and compared a stopped, complete-volume backup before installation.

Still requiring separate acceptance:
- Clean installation and first-run setup on StartOS hardware.
- ARM64 device installation.
- Full backup restoration to an isolated device.
- Cookie rotation and dependency-restart behavior.

No live payments were made. The test node's background transaction indexing was
still incomplete, so this test does not establish payment readiness or settlement.

Bundled Jam acceptance still open:
- Run the signed candidate on isolated StartOS hardware with Jam enabled/disabled.
- Check actual cookie rotation, filter permissions, local TLS renewal and Jam outage behavior.
- Restore all four volumes on an isolated host without starting a duplicate funded maker.
- Complete mobile pairing and reviewed Jar sends/bond flows before release.

Candidate 0.10.0:4 was cancelled before acceptance because the workflow checkout
remained at an older source than the manifest. Do not use its artifacts. Revision
0.10.0:5 reads the checkout commit from the manifest, rejects tracked source drift,
checks the built daemon version and retains source provenance with the package.
