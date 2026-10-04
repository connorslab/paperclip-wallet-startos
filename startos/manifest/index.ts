import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet-sideflash', title: 'Paperclip Wallet Sideflash', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz', donationUrl: null,
  description: {short, long}, volumes: ["main", "startos"],
  images: {"app": {"source": {"dockerTag": "paperclip-wallet-startos:sideflash-20261004-1"}, "arch": ["x86_64"]}}, dependencies: {},
})
