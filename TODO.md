# Release acceptance

## 0.10.0 candidate

- Replace the manifest's 0.9.3 image pin with the verified 0.10.0 multi-architecture digest before building a release.
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
