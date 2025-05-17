import type { MutationOptions, UseMutationOptions } from "@tanstack/react-query";
import type { StateManager } from "../state/state-management";
import { DataFetchError } from "./data-fetcher";
import { Result, Ok, Err } from "../utils/result";

/**
 * Optimistic update configuration
 */
export interface OptimisticUpdateConfig<TVariables = unknown, TData = unknown> {
  /**
   * Function to get the optimistic data
   */
  getOptimisticData: (variables: TVariables) => TData;
  
  /**
   * Function to update local state optimistically
   */
  updateLocalState?: (stateManager: StateManager, data: TData, variables: TVariables) => void;
  
  /**
   * Function to rollback on error
   */
  rollback?: (stateManager: StateManager, error: DataFetchError, variables: TVariables) => void;
  
  /**
   * Cache keys to invalidate on success
   */
  invalidateKeys?: string[];
  
  /**
   * Whether to retry on failure
   */
  retry?: boolean | number;
}

/**
 * Optimistic mutation options
 */
export interface OptimisticMutationOptions<TData = unknown, TError = DataFetchError, TVariables = unknown> 
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  optimistic?: OptimisticUpdateConfig<TVariables, TData>;
  mutationFn: (variables: TVariables) => Promise<TData>;
}

/**
 * Snapshot for rollback
 */
interface StateSnapshot {
  state: Record<string, unknown>;
  cache: Map<string, unknown>;
}

/**
 * Creates a mutation with optimistic update support
 */
export function createOptimisticMutation<TData = unknown, TVariables = unknown>(
  options: OptimisticMutationOptions<TData, DataFetchError, TVariables>,
  stateManager?: StateManager
): MutationOptions<TData, DataFetchError, TVariables> {
  const { optimistic, ...mutationOptions } = options;
  
  // Store snapshot for rollback
  let snapshot: StateSnapshot | null = null;
  
  return {
    ...mutationOptions,
    
    // On mutation start, apply optimistic update
    onMutate: async (variables: TVariables): Promise<{ optimisticData: TData; previousSnapshot: StateSnapshot | null }> => {
      // Call original onMutate if provided
      if (mutationOptions.onMutate) {
        await mutationOptions.onMutate(variables);
      }
      
      if (!optimistic) return;
      
      // Take snapshot for rollback
      if (stateManager) {
        snapshot = {
          state: { ...stateManager.getState() },
          cache: new Map(), // Cache is handled separately
        };
      }
      
      // Apply optimistic update
      const optimisticData = optimistic.getOptimisticData(variables);
      
      // Update local state if handler provided
      if (optimistic.updateLocalState && stateManager) {
        optimistic.updateLocalState(stateManager, optimisticData, variables);
      }
      
      return { optimisticData, previousSnapshot: snapshot };
    },
    
    // On error, rollback optimistic update
    onError: (error: DataFetchError, variables: TVariables, context?: { optimisticData: TData; previousSnapshot: StateSnapshot | null }) => {
      // Call original onError if provided
      if (mutationOptions.onError) {
        mutationOptions.onError(error, variables, context);
      }
      
      if (!optimistic) return;
      
      // Rollback using custom handler or snapshot
      if (optimistic.rollback && stateManager) {
        optimistic.rollback(stateManager, error, variables);
      } else if (snapshot && stateManager) {
        // Restore snapshot
        stateManager.setState(snapshot.state);
      }
    },
    
    // On success, invalidate cache keys
    onSuccess: (data: TData, variables: TVariables, context?: { optimisticData: TData; previousSnapshot: StateSnapshot | null }) => {
      // Call original onSuccess if provided
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
      
      if (!optimistic) return;
      
      // Clear snapshot
      snapshot = null;
      
      // Note: Cache invalidation should be handled by React Query
      // through the queryClient.invalidateQueries in the useMutation hook
    },
    
    // Apply retry configuration
    retry: optimistic?.retry ?? mutationOptions.retry,
  };
}

/**
 * Helper to create an optimistic update function
 */
export function createOptimisticUpdater<TData = unknown, TVariables = unknown>(
  updateFn: (current: TData, variables: TVariables) => TData
): (variables: TVariables) => TData {
  return (variables: TVariables) => {
    // In a real implementation, we'd get the current data from cache
    // For now, we'll assume it's passed in the variables
    const current = ((variables as Record<string, unknown>).current || {}) as TData;
    return updateFn(current, variables);
  };
}

/**
 * Result wrapper for optimistic mutations
 */
export async function optimisticMutate<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  variables: TVariables,
  optimistic?: OptimisticUpdateConfig<TVariables, TData>
): Promise<Result<TData, DataFetchError>> {
  try {
    const result = await mutationFn(variables);
    return Ok(result);
  } catch (error) {
    return Err(new DataFetchError(
      'Mutation failed',
      'optimisticMutate',
      error
    ));
  }
}