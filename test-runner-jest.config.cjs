const { getJestConfig } = require('@storybook/test-runner');

// The default Jest configuration comes from @storybook/test-runner
const testRunnerConfig = getJestConfig();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...testRunnerConfig,
  testEnvironmentOptions: {
    ...testRunnerConfig.testEnvironmentOptions,
    "jest-playwright": {
      ...testRunnerConfig.testEnvironmentOptions?.["jest-playwright"],
      browsers: ["chromium"],
      launchOptions: {
        headless: true, // Always run headless
      },
    },
  },
  testTimeout: 15000,
  maxWorkers: 4, // Optimal for 6-core CPU with 16GB RAM
};
