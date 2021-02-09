// jest.config.ts
import type {Config} from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  reporters: [ 'default', 'jest-junit' ]
}

export default config
