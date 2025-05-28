import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Global test setup for Vitest
// This file imports the necessary matchers for the testing library

// Note: React Testing Library v16 already applies strict mode configuration automatically
// No explicit configuration needed for reactStrictMode anymore

// Setup fake timers and mocks before each test
beforeEach(() => {
  // Use fake timers by default for all tests
  vi.useFakeTimers();
  
  // Mock global fetch API with default responses
  globalThis.fetch = vi.fn().mockImplementation((url: string) => {
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
  });
});

// Cleanup after each test to avoid memory leaks
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.restoreAllMocks();
  // Run all pending timers and restore real timers
  try {
    vi.runOnlyPendingTimers();
  } catch {
    // Ignore error if timers aren't mocked
  }
  vi.useRealTimers();
});

// Configure global act() handling for React
// We need to extend the global type to include this property
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Mock window.scrollTo for tests
if (!globalThis.window.scrollTo) {
  globalThis.window.scrollTo = vi.fn();
}

// Mock IntersectionObserver for tests
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

// Mock ResizeObserver for tests
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

// Mock matchMedia for tests
if (!globalThis.matchMedia) {
  globalThis.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
