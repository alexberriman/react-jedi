/**
 * State types for React Jedi components
 *
 * Defines the types used for component state management
 * in the Server-Driven UI architecture.
 */

/**
 * Component state type - represents the state of a component
 * in the UI tree. This is a flexible Record type that allows
 * for any state shape to be defined in the specification.
 */
export type ComponentState = Record<string, unknown>;

/**
 * Global state type - represents the global state shared
 * across all components in the application.
 */
export type GlobalState = Record<string, unknown>;

/**
 * State manager interface for managing component and global state.
 */
export interface StateManager {
  /**
   * Get the current state value for a specific key
   */
  getState(key: string): unknown;

  /**
   * Set a state value
   */
  setState(key: string, value: unknown): void;

  /**
   * Subscribe to state changes
   */
  subscribe(callback: (state: ComponentState) => void): () => void;

  /**
   * Get the full state object
   */
  getFullState(): ComponentState;

  /**
   * Batch multiple state updates
   */
  batchUpdate(updates: Partial<ComponentState>): void;
}
