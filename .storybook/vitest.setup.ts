import { beforeAll, vi } from "vitest";
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "./preview";

const annotations = setProjectAnnotations([previewAnnotations]);

// Configure global act() handling for React to prevent warnings
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
