/**
 * React Jedi - Main Entry Point
 * 
 * This file exports everything from the library.
 */

// Version information
export const VERSION = "1.0.0";

// Default export with initialization function
export function createJedi() {
  return {
    // Framework initialization function for future implementation
    version: VERSION,
  };
}

// Export all components through the barrel file
export * from "./components";

// Export utilities
export * from "./lib";

// Export hooks if available
// export * from "./hooks";
