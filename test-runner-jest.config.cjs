const { getJestConfig } = require('@storybook/test-runner');

// The default Jest configuration comes from @storybook/test-runner
const defaultConfig = getJestConfig();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...defaultConfig,
  /** Custom configuration for React Jedi test runner */
  
  // Increase timeout for UI tests
  testTimeout: 60000,
  
  // Custom setup files
  setupFilesAfterEnv: [
    ...(defaultConfig.setupFilesAfterEnv || []),
  ],
  
  // Test environment options
  testEnvironmentOptions: {
    ...defaultConfig.testEnvironmentOptions,
    contextOptions: {
      ...defaultConfig.testEnvironmentOptions?.contextOptions,
      // Increase browser timeout
      timeout: 30000,
    },
  },
  
  // Ignore patterns
  testPathIgnorePatterns: [
    ...(defaultConfig.testPathIgnorePatterns || []),
    '/node_modules/',
    '/dist/',
    '/examples/',
  ],
  
  // Module name mapper to handle CSS modules
  moduleNameMapper: {
    ...defaultConfig.moduleNameMapper,
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};