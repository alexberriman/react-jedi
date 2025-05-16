import type { StateSpecification } from "@/types/schema/specification";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * State action for updating state
 */
export interface StateAction {
  type: string;
  payload?: unknown;
}

/**
 * State mutation function type
 */
export type StateMutation = (state: Record<string, unknown>) => Record<string, unknown>;

/**
 * State reducer function type
 */
export type StateReducer = (
  state: Record<string, unknown>,
  action: StateAction
) => Record<string, unknown>;

/**
 * State subscription callback
 */
export type StateSubscription = (state: Record<string, unknown>) => void;

/**
 * Storage provider interface
 */
export interface StorageProvider {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * State persistence configuration
 */
export interface StatePersistenceConfig {
  type: "local" | "session" | "memory";
  key: string;
  include?: string[];
  exclude?: string[];
}

/**
 * State debug configuration
 */
export interface StateDebugConfig {
  enabled: boolean;
  logActions?: boolean;
  logStateChanges?: boolean;
  logComputed?: boolean;
}

/**
 * State manager options
 */
export interface StateManagerOptions {
  initialState: Record<string, unknown>;
  persistence?: StatePersistenceConfig;
  debug?: StateDebugConfig;
  computed?: StateSpecification["computed"];
}

/**
 * State manager interface
 */
export interface StateManager {
  getState(): Record<string, unknown>;
  setState(updates: Record<string, unknown>): void;
  dispatch(action: StateAction): void;
  subscribe(callback: StateSubscription): () => void;
  reset(): void;
  getComputedValues(): Record<string, unknown>;
}

/**
 * Get storage provider based on type
 */
function getStorageProvider(type: "local" | "session" | "memory"): StorageProvider {
  if (type === "memory" || globalThis.window == null) {
    // In-memory storage fallback
    const storage = new Map<string, string>();
    return {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    };
  }

  return type === "local" ? localStorage : sessionStorage;
}

/**
 * Filter state based on persistence configuration
 */
function filterStateForPersistence(
  state: Record<string, unknown>,
  config: StatePersistenceConfig
): Record<string, unknown> {
  const { include, exclude } = config;

  if (include) {
    const entries = Object.entries(state).filter(([key]) => include.includes(key));
    return Object.fromEntries(entries);
  }

  if (exclude) {
    const entries = Object.entries(state).filter(([key]) => !exclude.includes(key));
    return Object.fromEntries(entries);
  }

  return state;
}

/**
 * Load persisted state from storage
 */
function loadPersistedState(
  config: StatePersistenceConfig,
  initialState: Record<string, unknown>
): Record<string, unknown> {
  try {
    const storage = getStorageProvider(config.type);
    const stored = storage.getItem(config.key);

    if (!stored) {
      return initialState;
    }

    const parsed = JSON.parse(stored);
    return { ...initialState, ...parsed };
  } catch (error) {
    console.error("Failed to load persisted state:", error);
    return initialState;
  }
}

/**
 * Save state to storage
 */
function persistState(state: Record<string, unknown>, config: StatePersistenceConfig): void {
  try {
    const storage = getStorageProvider(config.type);
    const filtered = filterStateForPersistence(state, config);
    storage.setItem(config.key, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to persist state:", error);
  }
}

/**
 * Create a state manager instance
 */
export function createStateManager(options: StateManagerOptions): StateManager {
  const { initialState, persistence, debug, computed } = options;

  // Load initial state with persisted data if available
  let state: Record<string, unknown> = persistence
    ? loadPersistedState(persistence, initialState)
    : initialState;

  // Subscribers
  const subscribers = new Set<StateSubscription>();

  // Debug logging
  const log = (message: string, data?: unknown) => {
    if (debug?.enabled) {
      console.log(`[StateManager] ${message}`, data);
    }
  };

  // Notify subscribers of state changes
  const notifySubscribers = () => {
    for (const callback of subscribers) {
      callback(state);
    }
  };

  // Compute derived values
  const computeDerivedValues = (): Record<string, unknown> => {
    if (!computed) return {};

    const computedValues: Record<string, unknown> = {};

    for (const [key, config] of Object.entries(computed)) {
      try {
        // Simple expression evaluation - this is a limited implementation
        // In production, use a proper expression parser/evaluator library like expr-eval
        // This implementation only supports basic arithmetic and property access
        const deps = config.dependencies.map((dep) => state[dep]);

        // Create a simple evaluator for basic expressions
        const evaluator = createSimpleEvaluator(config.expression, config.dependencies);
        const result = evaluator(...deps);
        computedValues[key] = result;

        if (debug?.logComputed) {
          log(`Computed value: ${key}`, { dependencies: deps, result });
        }
      } catch (error) {
        console.error(`Failed to compute ${key}:`, error);
      }
    }

    return computedValues;
  };

  // Simple expression evaluator for basic arithmetic
  const createSimpleEvaluator = (expression: string, dependencies: string[]) => {
    // This is a very limited implementation that only supports basic operations
    // For production use, integrate a proper expression parser library
    return (...args: unknown[]) => {
      const context = Object.fromEntries(dependencies.map((key, index) => [key, args[index]]));

      // Very simple evaluation - only supports basic arithmetic
      // Replace with proper expression parser in production
      if (expression.includes("+")) {
        const parts = expression.split("+").map((p) => p.trim());
        let sum = 0;
        for (const part of parts) {
          const value = context[part] ?? Number.parseFloat(part) ?? 0;
          sum += value as number;
        }
        return sum;
      } else if (expression.includes("*")) {
        const parts = expression.split("*").map((p) => p.trim());
        let product = 1;
        for (const part of parts) {
          const value = context[part] ?? Number.parseFloat(part) ?? 1;
          product *= value as number;
        }
        return product;
      } else if (expression.includes(".")) {
        // Property access - check if it's a nested property that might fail
        const parts = expression.split(".");
        let value: unknown = context[parts[0]];

        for (let i = 1; i < parts.length; i++) {
          if (value === null || value === undefined) {
            // Property access on null/undefined - this would cause an error
            throw new Error(`Cannot access property ${parts[i]} on null/undefined`);
          }
          value = (value as Record<string, unknown>)[parts[i]];
        }

        return value;
      }

      // Direct property access
      return context[expression] ?? undefined;
    };
  };

  // Get current state including computed values
  const getState = (): Record<string, unknown> => {
    return { ...state, ...computeDerivedValues() };
  };

  // Set state with updates
  const setState = (updates: Record<string, unknown>) => {
    const prevState = state;
    state = { ...state, ...updates };

    if (debug?.logStateChanges) {
      log("State updated", { prevState, updates, newState: state });
    }

    if (persistence) {
      persistState(state, persistence);
    }

    notifySubscribers();
  };

  // Dispatch actions (for future event handling)
  const dispatch = (action: StateAction) => {
    if (debug?.logActions) {
      log("Action dispatched", action);
    }

    // For now, just treat actions as state updates
    if (action.type === "SET_STATE" && typeof action.payload === "object") {
      setState(action.payload as Record<string, unknown>);
    }
  };

  // Subscribe to state changes
  const subscribe = (callback: StateSubscription): (() => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  // Reset state to initial
  const reset = () => {
    state = initialState;

    if (persistence) {
      const storage = getStorageProvider(persistence.type);
      storage.removeItem(persistence.key);
    }

    if (debug?.enabled) {
      log("State reset to initial");
    }

    notifySubscribers();
  };

  return {
    getState,
    setState,
    dispatch,
    subscribe,
    reset,
    getComputedValues: computeDerivedValues,
  };
}

/**
 * React hook for using state manager
 */
export function useStateManager(options: StateManagerOptions): StateManager {
  const managerRef = useRef<StateManager>();

  if (!managerRef.current) {
    managerRef.current = createStateManager(options);
  }

  return managerRef.current;
}

/**
 * React hook for subscribing to state manager
 */
export function useStateSubscription(
  manager: StateManager,
  selector?: (state: Record<string, unknown>) => unknown
): unknown {
  const [state, setState] = useState(selector ? selector(manager.getState()) : manager.getState());

  useEffect(() => {
    const updateState = (newState: Record<string, unknown>) => {
      setState(selector ? selector(newState) : newState);
    };

    const unsubscribe = manager.subscribe(updateState);
    return unsubscribe;
  }, [manager, selector]);

  return state;
}

/**
 * React hook for state value
 */
export function useStateValue(
  manager: StateManager,
  key: string
): [unknown, (value: unknown) => void] {
  const value = useStateSubscription(manager, (state) => state[key]);

  const setValue = useCallback(
    (newValue: unknown) => {
      manager.setState({ [key]: newValue });
    },
    [manager, key]
  );

  return [value, setValue];
}
