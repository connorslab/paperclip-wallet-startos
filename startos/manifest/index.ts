import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
export const manifest = setupManifest({
  id: 'paperclip-wallet',
  title: 'Paperclip Wallet Beta',
  license: 'MIT',
  packageRepo: 'https://github.com/connorslab/paperclip-wallet-startos',
  upstreamRepo: 'https://github.com/connorslab/paperclip-wallet-app',
  marketingUrl: 'https://ark.paperclippool.xyz/wallet/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'jam', 'jam-rpc', 'jam-public'],
  images: {
    wallet: {
      source: {
        dockerBuild: {
          workdir: './upstream',
          dockerfile: './upstream/deployment/Dockerfile',
          buildArgs: {
            BARK_VERSION: '0.10.0',
            GIT_HASH: 'b8ab59c3f76cffc54f8c7d6b9fd3fad136aa344f',
          },
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
    jam: {
      source: {
        dockerBuild: {
          workdir: './upstream',
          dockerfile: './upstream/deployment/jam/Dockerfile',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    'knots-blake2b': {
      description: 'Use the installed Blake2b node for wallet RPC.',
      optional: true,
      metadata: {
        title: 'Knots (BLAKE2b) Companion',
        icon: 'https://raw.githubusercontent.com/paulscode/knots-blake2b-startos/main/dep-icon.png',
      },
    },
  },
})
