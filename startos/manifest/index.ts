import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet', title: 'Paperclip Wallet Beta', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/', donationUrl: null,
  description: { short, long }, volumes: ['main'],
  images: { wallet: { source: { dockerTag: "ghcr.io/connorslab/paperclip-wallet-app:beta-41126306588@sha256:5da1bc86c801af9d61af2af9f0f6f501a51f36963885c2eaf8d652f0fe183877" }, arch: ['x86_64', 'aarch64'] } },
  dependencies: {
    'knots-blake2b': {
      description: 'Use the installed Blake2b node for wallet RPC.', optional: true,
      metadata: { title: 'Knots (BLAKE2b) Companion', icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png' },
    },
  },
})
