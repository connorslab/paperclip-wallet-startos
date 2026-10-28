import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet', title: 'Paperclip Wallet Beta', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/', donationUrl: null,
  description: { short, long }, volumes: ['main'],
  images: { wallet: { source: { dockerTag: "ghcr.io/connorslab/paperclip-wallet-app:0.9.0@sha256:c59167fb46318c190de6972a439af4a9b7cacdae8bb2218102e7ed9acf4aaae5" }, arch: ['x86_64', 'aarch64'] } },
  dependencies: {
    'knots-blake2b': {
      description: 'Use the installed Blake2b node for wallet RPC.', optional: true,
      metadata: { title: 'Knots (BLAKE2b) Companion', icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png' },
    },
  },
})
