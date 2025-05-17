import * as React from "react";
import {
  useMutation as useQueryMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { StateContext } from "../lib/state/state-context";
import { DataFetcher, DataFetchError } from "../lib/data/data-fetcher";
import {
  createOptimisticMutation,
  OptimisticMutationOptions,
  OptimisticUpdateConfig,
} from "../lib/data/optimistic-updates";
import type { MutationSpecification } from "../types/data";

/**
 * Hook for mutations with optimistic update support
 */
export interface UseMutationConfig<TData = unknown, TVariables = unknown> {
  /**
   * Mutation specification from JSON
   */
  mutation: MutationSpecification;

  /**
   * Optimistic update configuration
   */
  optimistic?: OptimisticUpdateConfig<TVariables, TData>;

  /**
   * Additional React Query options including custom mutationFn
   */
  options?: UseMutationOptions<TData, DataFetchError, TVariables>;

  /**
   * Data fetcher instance (optional)
   */
  fetcher?: DataFetcher;
}

/**
 * Custom mutation hook with optimistic update support
 */
export function useMutation<TData = unknown, TVariables = unknown>(
  config: UseMutationConfig<TData, TVariables>
) {
  const queryClient = useQueryClient();

  // Always call the hook, but check if context is available
  const stateContext = React.useContext(StateContext);
  const stateManager = stateContext || undefined;

  const fetcher = config.fetcher || new DataFetcher();

  // Create mutation function based on specification or use the provided one
  const mutationFn =
    config.options?.mutationFn ||
    (async (variables: TVariables): Promise<TData> => {
      const { endpoint, method = "POST", headers = {} } = config.mutation;

      // Replace variables in endpoint
      let finalEndpoint = endpoint;
      if (variables && typeof variables === "object") {
        for (const [key, value] of Object.entries(variables as Record<string, unknown>)) {
          finalEndpoint = finalEndpoint.replace(`{${key}}`, String(value));
        }
      }

      const result = await fetcher.fetch({
        id: config.mutation.id,
        type: "rest",
        config: {
          url: finalEndpoint,
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: variables as unknown,
        },
      });

      if (!result.ok) {
        throw result.val;
      }

      return result.val as TData;
    });

  // Create optimistic mutation options
  const optimisticOptions: OptimisticMutationOptions<TData, DataFetchError, TVariables> = {
    mutationFn,
    ...config.options,
    optimistic: config.optimistic,
  };

  // Apply optimistic updates if configured
  const finalOptions = config.optimistic
    ? createOptimisticMutation(optimisticOptions, stateManager)
    : optimisticOptions;

  // Use React Query mutation
  const mutation = useQueryMutation<TData, DataFetchError, TVariables>({
    ...finalOptions,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries
      if (config.mutation.invalidates) {
        for (const key of config.mutation.invalidates) {
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      }

      // Call original onSuccess
      finalOptions.onSuccess?.(data, variables, context);
    },
  });

  return {
    ...mutation,

    // Enhanced mutate with optimistic state
    mutateOptimistic: (variables: TVariables) => {
      // Apply optimistic update immediately
      if (config.optimistic && stateManager) {
        const optimisticData = config.optimistic.getOptimisticData(variables);
        if (config.optimistic.updateLocalState) {
          config.optimistic.updateLocalState(stateManager, optimisticData, variables);
        }
      }

      // Execute mutation
      return mutation.mutate(variables);
    },
  };
}
