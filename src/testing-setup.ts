import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Global test setup for Vitest
// This file imports the necessary matchers for the testing library

// Note: React Testing Library v16 already applies strict mode configuration automatically
// No explicit configuration needed for reactStrictMode anymore

// Cleanup after each test to avoid memory leaks
afterEach(() => {
  cleanup();
});

// Configure global act() handling for React
// We need to extend the global type to include this property
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
