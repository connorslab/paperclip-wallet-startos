import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet', title: 'Paperclip Wallet Beta', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/', donationUrl: null,
  description: { short, long }, volumes: ['main'],
  images: { wallet: { source: { dockerTag: "ghcr.io/connorslab/paperclip-wallet-app:beta-36796846848@sha256:e7e7d46513f1816e6df1484b5bf65c8fac14abc170e22bebde9bcd999d7574f1" }, arch: ['x86_64', 'aarch64'] } },
  dependencies: {},
})
