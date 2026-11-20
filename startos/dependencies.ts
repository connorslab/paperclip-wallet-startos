import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const backend = await storeJson.read((s) => s.backend).const(effects)
  const bundledJam =
    (await storeJson.read((s) => s.bundledJam).const(effects)) ?? true
  if (backend !== 'knots-blake2b' && !bundledJam) return {}
  return {
    'knots-blake2b': {
      kind: 'running',
      versionRange: '>=1.0.0',
      healthChecks: [],
    },
  }
})
