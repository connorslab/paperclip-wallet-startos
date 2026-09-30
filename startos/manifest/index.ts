import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet', title: 'Paperclip Wallet Beta', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/', donationUrl: null,
  description: { short, long }, volumes: ['main'],
  images: { wallet: { source: { dockerTag: "ghcr.io/connorslab/paperclip-wallet-app:beta-bundled-36772076594@sha256:d9b3c2fc8840f7d96ae50eb8f7c9a4b2ddb2638d5f3156632495662b97889fce" }, arch: ['x86_64', 'aarch64'] } },
  dependencies: {},
})
