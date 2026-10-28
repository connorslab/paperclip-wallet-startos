import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/store.json' },
  z.object({ backend: z.enum(['manual', 'knots-blake2b']).catch('manual') }),
)
