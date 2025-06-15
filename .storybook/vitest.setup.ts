import { beforeAll, vi } from "vitest";
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "./preview";
// Import act from React for proper test environment setup
import { act } from "react";

const annotations = setProjectAnnotations([previewAnnotations]);

// Configure global act() handling for React to prevent warnings
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

// Set up React testing environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Make act available globally for the test environment
(globalThis as any).act = act;

// Mock IntersectionObserver for Storybook tests
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
    observe: vi.fn((target) => {
      // Simulate immediate intersection for testing
      // Use requestAnimationFrame to ensure it runs after React renders
      requestAnimationFrame(() => {
        callback([{ 
          isIntersecting: true, 
          target,
          intersectionRatio: 1,
          boundingClientRect: {},
          intersectionRect: {},
          rootBounds: null,
          time: Date.now()
        }]);
      });
    }),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

// Mock matchMedia for Storybook tests (required by Framer Motion)
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

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
