/**
 * State management module for React Jedi
 *
 * This module provides a comprehensive state management system for
 * JSON-defined components with support for:
 * - Local component state
 * - Global application state
 * - State persistence
 * - Computed values
 * - Debug utilities
 */

export * from "./state-management";
export * from "./state-initialization";
export * from "./state-context";
export * from "./state-debug";

// Re-export with specific names to avoid conflicts
export { useStateManager } from "./state-management";
export { useStateContext } from "./state-context";
