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
    
    // Mock fetch API and timers for all stories
    await page.addInitScript(() => {
      // Mock fetch to prevent real API calls
      window.fetch = (url) => {
        // Mock responses for common test URLs
        if (url.includes('jsonplaceholder.typicode.com/users')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ])
          });
        }
        
        if (url.includes('jsonplaceholder.typicode.com/posts')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: 1, userId: 1, title: 'Test Post', body: 'Test content' },
              { id: 2, userId: 1, title: 'Another Post', body: 'More content' }
            ])
          });
        }
        
        if (url.includes('jsonplaceholder.typicode.com/comments')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: 1, postId: 1, email: 'test@example.com', body: 'Test comment' }
            ])
          });
        }
        
        if (url.includes('jsonplaceholder.typicode.com/todos')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: 1, title: 'Test Todo', completed: false },
              { id: 2, title: 'Completed Todo', completed: true }
            ])
          });
        }
        
        // Default mock for API calls
        if (url.includes('/api/')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true, data: {} })
          });
        }
        
        // Simulate network error for invalid URLs
        return Promise.reject(new Error(`Network error: ${url}`));
      };
      
      // Override setTimeout to make delays instant in tests
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = (fn, delay, ...args) => {
        // Make all delays instant (0ms) in tests
        return originalSetTimeout(fn, 0, ...args);
      };
    });
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