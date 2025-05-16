import * as React from "react";
import type { StateManager } from "../lib/state";

/**
 * Extended state manager interface to support optional promise returns from setState
 * and selective subscriptions
 */
export interface OptimizedStateManager extends StateManager {
  setState(updates: Record<string, unknown>): void | Promise<void>;
  subscribe(callback: (state: Record<string, unknown>) => void, selector?: string[]): () => void;
}

/**
 * State optimization configuration
 */
export interface StateOptimizationConfig {
  /**
   * Enable automatic batching of state updates
   */
  batchUpdates?: boolean;

  /**
   * Debounce time for batched updates (milliseconds)
   */
  batchDebounceMs?: number;

  /**
   * Maximum number of updates to batch
   */
  maxBatchSize?: number;

  /**
   * Enable selective state subscriptions
   */
  selectiveSubscriptions?: boolean;
}

/**
 * Default optimization configuration
 */
export const defaultStateOptimizationConfig: StateOptimizationConfig = {
  batchUpdates: true,
  batchDebounceMs: 10,
  maxBatchSize: 25,
  selectiveSubscriptions: true,
};

/**
 * State update batch
 */
interface StateUpdateBatch {
  updates: Record<string, unknown>[];
  timeoutId?: ReturnType<typeof globalThis.setTimeout>;
  resolveCallbacks: Array<() => void>;
}

/**
 * Create an optimized state manager wrapper
 */
export function createOptimizedStateManager(
  baseManager: StateManager,
  config: StateOptimizationConfig = defaultStateOptimizationConfig
): OptimizedStateManager {
  let updateBatch: StateUpdateBatch | null = null;
  const subscriptionCache = new Map<string, Set<(state: Record<string, unknown>) => void>>();

  // Function to flush batched updates
  const flushBatch = () => {
    if (!updateBatch || updateBatch.updates.length === 0) return;

    // Merge all updates into a single object
    let mergedUpdates: Record<string, unknown> = {};
    for (const update of updateBatch.updates) {
      mergedUpdates = { ...mergedUpdates, ...update };
    }

    // Apply the merged update once
    baseManager.setState(mergedUpdates);

    // Resolve all callbacks
    for (const callback of updateBatch.resolveCallbacks) {
      callback();
    }

    // Clear the batch
    updateBatch = null;
  };

  // Optimized setState with batching
  const setState = (updates: Record<string, unknown>): void | Promise<void> => {
    if (!config.batchUpdates) {
      baseManager.setState(updates);
      return;
    }

    // Create new batch if needed
    if (!updateBatch) {
      updateBatch = {
        updates: [],
        resolveCallbacks: [],
      };
    }

    // Add updates to batch
    updateBatch.updates.push(updates);

    // Clear existing timeout
    if (updateBatch.timeoutId) {
      globalThis.clearTimeout(updateBatch.timeoutId);
    }

    // Check if we've reached max batch size
    if (config.maxBatchSize && updateBatch.updates.length >= config.maxBatchSize) {
      flushBatch();
    } else {
      // Schedule flush
      updateBatch.timeoutId = globalThis.setTimeout(flushBatch, config.batchDebounceMs!);
    }

    // Return a promise that resolves when the batch is flushed
    return new Promise<void>((resolve) => {
      if (!updateBatch) {
        resolve();
        return;
      }
      updateBatch.resolveCallbacks.push(resolve);
    });
  };

  // Optimized subscribe with selective subscriptions
  const subscribe = (callback: (state: Record<string, unknown>) => void, selector?: string[]) => {
    if (!config.selectiveSubscriptions || !selector) {
      return baseManager.subscribe(callback);
    }

    // Create selective subscription
    const selectiveCallback = (state: Record<string, unknown>) => {
      const selectedState: Record<string, unknown> = {};
      for (const key of selector) {
        selectedState[key] = state[key];
      }

      callback(selectedState);
    };

    // Cache the subscription for efficiency
    for (const key of selector) {
      const keyCache = subscriptionCache.get(key) || new Set();
      keyCache.add(selectiveCallback);
      subscriptionCache.set(key, keyCache);
    }

    // Subscribe with the selective callback
    const unsubscribe = baseManager.subscribe(selectiveCallback);

    // Return unsubscribe function that cleans up cache
    return () => {
      unsubscribe();
      for (const key of selector) {
        subscriptionCache.get(key)?.delete(selectiveCallback);
      }
    };
  };

  // Create optimized manager
  return {
    ...baseManager,
    setState,
    subscribe,
  };
}

/**
 * Hook for optimized state subscription
 */
export function useOptimizedStateSubscription<T = unknown>(
  manager: StateManager,
  selector: (state: Record<string, unknown>) => T,
  dependencies?: string[]
): T {
  const [selectedState, setSelectedState] = React.useState<T>(() => selector(manager.getState()));

  React.useEffect(() => {
    const updateState = (state: Record<string, unknown>) => {
      const newSelectedState = selector(state);
      setSelectedState(newSelectedState);
    };

    // Subscribe with selective dependencies if provided
    const unsubscribe = manager.subscribe(updateState);

    // Initial update
    updateState(manager.getState());

    return unsubscribe;
  }, [manager, selector, dependencies]);

  return selectedState;
}

/**
 * Hook for optimized state value access
 */
export function useOptimizedStateValue(
  manager: StateManager,
  key: string
): [unknown, (value: unknown) => void] {
  const value = useOptimizedStateSubscription(manager, (state) => state[key], [key]);

  const setValue = React.useCallback(
    (newValue: unknown) => {
      manager.setState({ [key]: newValue });
    },
    [manager, key]
  );

  return [value, setValue];
}

/**
 * Hook for batched state updates
 */
export function useBatchedStateUpdates(manager: StateManager) {
  const batchRef = React.useRef<Record<string, unknown>>({});
  const timeoutRef = React.useRef<ReturnType<typeof globalThis.setTimeout>>();

  const scheduleUpdate = React.useCallback(() => {
    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = globalThis.setTimeout(() => {
      if (Object.keys(batchRef.current).length > 0) {
        manager.setState(batchRef.current);
        batchRef.current = {};
      }
    }, 0);
  }, [manager]);

  const batchedSetState = React.useCallback(
    (updates: Record<string, unknown>) => {
      Object.assign(batchRef.current, updates);
      scheduleUpdate();
    },
    [scheduleUpdate]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return batchedSetState;
}

/**
 * React context for optimized state management
 */
export const OptimizedStateContext = React.createContext<StateManager | null>(null);

/**
 * Provider for optimized state management
 */
export function OptimizedStateProvider({
  children,
  stateManager,
  optimization = defaultStateOptimizationConfig,
}: {
  children: React.ReactNode;
  stateManager: StateManager;
  optimization?: StateOptimizationConfig;
}): React.ReactElement {
  const optimizedManager = React.useMemo(
    () => createOptimizedStateManager(stateManager, optimization),
    [stateManager, optimization]
  );

  return React.createElement(OptimizedStateContext.Provider, { value: optimizedManager }, children);
}

/**
 * Hook to use optimized state context
 */
export function useOptimizedStateContext(): StateManager {
  const context = React.useContext(OptimizedStateContext);
  if (!context) {
    throw new Error("useOptimizedStateContext must be used within OptimizedStateProvider");
  }
  return context;
}
