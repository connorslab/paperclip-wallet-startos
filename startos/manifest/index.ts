import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet', title: 'Paperclip Wallet Beta', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/', donationUrl: null,
  description: { short, long }, volumes: ['main'],
  images: { wallet: { source: { dockerTag: "ghcr.io/connorslab/paperclip-wallet-app:beta-36924199628@sha256:ad2f40de6d8cd8eeeecb50a9eae851e932b9423592616943660d142d7b70df99" }, arch: ['x86_64', 'aarch64'] } },
  dependencies: {},
})
