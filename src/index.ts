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

// Export all components through the barrel file using path aliases
export * from "@components/index";

// Export utilities using path aliases
export * from "@lib/index";

// Export UI components directly
export * from "@ui/index";

// Export schemas
export * from "@schemas/index";

// Export types
export * from "@types/index";

// Export hooks if available
// export * from "@hooks/index";
