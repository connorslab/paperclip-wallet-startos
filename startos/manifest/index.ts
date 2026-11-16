import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet', title: 'Paperclip Wallet Beta', license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/', donationUrl: null,
  description: { short, long }, volumes: ['main'],
  images: { wallet: { source: { dockerBuild: {
    workdir: './upstream', dockerfile: './upstream/deployment/Dockerfile',
    buildArgs: { BARK_VERSION: '0.10.0', GIT_HASH: 'dcce6d557a174074f4d8198214aca0dcd0fb351d' },
  } }, arch: ['x86_64', 'aarch64'] } },
  dependencies: {
    'knots-blake2b': {
      description: 'Use the installed Blake2b node for wallet RPC.', optional: true,
      metadata: { title: 'Knots (BLAKE2b) Companion', icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png' },
    },
  },
})
