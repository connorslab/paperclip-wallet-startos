import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'

export const setDependencies = sdk.setupDependencies(
  async ({ effects }) => {
    const backend = await storeJson.read(s => s.backend).const(effects)
    if (backend !== 'knots-blake2b') return {}
    return { 'knots-blake2b': { kind: 'running', versionRange: '>=1.0.0', healthChecks: [] } }
  },
)
