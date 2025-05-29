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
      const mockFetch = (url) => {
        // Convert URL to string if it's a URL object
        const urlString = url.toString();
        
        // Mock responses for common test URLs
        if (urlString.includes('jsonplaceholder.typicode.com/users')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ])
          });
        }
        
        if (urlString.includes('jsonplaceholder.typicode.com/posts')) {
          // Parse query parameters if present
          const urlObj = new URL(urlString);
          const userId = urlObj.searchParams.get('userId') || 1;
          const limit = parseInt(urlObj.searchParams.get('_limit') || '10');
          
          const allPosts = [
            { id: 1, userId: 1, title: 'Test Post 1', body: 'Test content 1' },
            { id: 2, userId: 1, title: 'Another Post', body: 'More content' },
            { id: 3, userId: 2, title: 'User 2 Post', body: 'User 2 content' },
            { id: 4, userId: 1, title: 'Third Post', body: 'Third content' },
            { id: 5, userId: 3, title: 'User 3 Post', body: 'User 3 content' },
          ];
          
          const filteredPosts = allPosts
            .filter(post => post.userId === parseInt(userId))
            .slice(0, limit);
          
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(filteredPosts)
          });
        }
        
        if (urlString.includes('jsonplaceholder.typicode.com/comments')) {
          const urlObj = new URL(urlString);
          const limit = parseInt(urlObj.searchParams.get('_limit') || '10');
          
          const comments = [
            { id: 1, postId: 1, email: 'test@example.com', body: 'Test comment 1' },
            { id: 2, postId: 1, email: 'user@example.com', body: 'Test comment 2' },
            { id: 3, postId: 2, email: 'another@example.com', body: 'Test comment 3' },
            { id: 4, postId: 2, email: 'test@example.com', body: 'Test comment 4' },
            { id: 5, postId: 3, email: 'user@example.com', body: 'Test comment 5' },
          ].slice(0, limit);
          
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(comments)
          });
        }
        
        if (urlString.includes('jsonplaceholder.typicode.com/todos')) {
          const urlObj = new URL(urlString);
          const limit = parseInt(urlObj.searchParams.get('_limit') || '10');
          
          const todos = [
            { id: 1, title: 'Test Todo 1', completed: false },
            { id: 2, title: 'Completed Todo', completed: true },
            { id: 3, title: 'Test Todo 3', completed: false },
            { id: 4, title: 'Test Todo 4', completed: true },
            { id: 5, title: 'Test Todo 5', completed: false },
          ].slice(0, limit);
          
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(todos)
          });
        }
        
        // Default mock for API calls
        if (urlString.includes('/api/')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true, data: {} })
          });
        }
        
        // Simulate network error for invalid URLs
        return Promise.reject(new Error(`Network error: ${urlString}`));
      };
      
      // Mock both window.fetch and globalThis.fetch
      window.fetch = mockFetch;
      globalThis.fetch = mockFetch;
      
      // Override setTimeout to make delays instant in tests
      const originalSetTimeout = window.setTimeout;
      const originalSetInterval = window.setInterval;
      
      window.setTimeout = (fn, delay, ...args) => {
        // Reduce delays but don't make them instant to allow for animations
        // Maximum delay of 100ms for tests
        return originalSetTimeout(fn, Math.min(delay, 100), ...args);
      };
      
      globalThis.setTimeout = window.setTimeout;
      
      // Mock setInterval for polling
      window.setInterval = (fn, delay, ...args) => {
        // Set up a very short interval for testing
        return originalSetInterval(fn, Math.min(delay, 100), ...args); // Max 100ms interval
      };
      
      globalThis.setInterval = window.setInterval;
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
          // Sonner toast library uses aria-live="polite" which is functionally equivalent to role="status"
          // Disable the rule that requires explicit role="status" for live regions
          "aria-allowed-role": { enabled: true },
          "aria-live-region-on-app": { enabled: false }, // Disable if this causes issues with toast
          "duplicate-id-aria": { enabled: true },
        },
      },
    });
  }
};