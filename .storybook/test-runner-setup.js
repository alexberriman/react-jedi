// Configure test runner for Storybook
const { injectAxe, checkA11y } = require("axe-playwright");

/*
 * Setup file for Storybook test runner
 * This runs before each test to configure the testing environment
 */

// Configure accessibility testing
module.exports = {
  async preVisit(page) {
    // Inject axe-core for accessibility testing
    await injectAxe(page);
  },
  
  async postVisit(page) {
    // Run accessibility checks after each story renders
    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // Configure axe rules
      axe: {
        rules: {
          // Disable specific rules if needed
          "color-contrast": { enabled: false }, // Example: disable if you handle dark mode separately
        },
      },
    });
  }
};