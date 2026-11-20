# Release acceptance

## 0.10.0:10 test candidate

- [x] Pin the current UI, BOLT12 Bridge and payment recovery source at b82cbbdf116064d34a0fac0164a8068bc4d4ef81.
- [x] Include owner-only Jars creation, password-verified backup and interrupted-creation recovery.
- [x] Include scoped phone-pairing clients/proxy; installed-host acceptance and paired sends remain open.
- [x] Enable integrated bundled Jam by default with separate volumes, loopback HTTPS, restricted RPC and complete-volume backup definitions.
- [x] Build and verify candidate 0.10.0:6 on both architectures; retained signed private artifacts.
- [x] Separate the Jars node dependency from the main wallet backend; preserve explicit disable choices.
- [x] Execute fresh/upgrade/disabled/missing-node daemon definitions in isolated contract tests.
- [x] Validate existing onion-address discovery, absence fallback and unchanged main-wallet backend.
- [x] Build candidate 0.10.0:8 with the Tor pairing source pin in CI (artifact-only; not distributed).
- [x] Build and verify 0.10.0:9 with the Jars order-book source pin; x86_64 delivered. User reported startup failure on a scoped IPv6 URL.
- [x] Reproduce the reported ERR_INVALID_URL before the fix; verify malformed/scoped IPv6 entries do not block wallet/Jars startup or later onion selection.
- [x] Build and verify 0.10.0:10 x86_64 with the wrapper-only startup fix (CI 44762325376, wrapper f78fccb1755cc26baea712e8aa3da0c2644a903c). Native signature, checksum, source pin and complete archive integrity verified.
- [ ] Download and verify the 0.10.0:10 ARM64 artifact separately.
- [ ] Confirm the corrected package starts on the affected host after user sideload.
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
0.10.0:6 reads the checkout commit from the manifest, rejects tracked source drift,
checks the built daemon version and retains source provenance with the package.

Candidate 0.10.0:6 supersedes the older 0.10.0:5 test artifacts. It preserves the
package identity, all volumes and optional Jam setting. This is an authorized
private test update; public production acceptance remains incomplete.
