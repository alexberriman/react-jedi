/**
 * useDataSources Hook
 *
 * This hook processes data source specifications and provides data fetching functionality
 * for React Jedi components. It handles loading states, error states, and data binding.
 */

import * as React from "react";
import { useQuery, type QueryClient, type UseQueryResult } from "@tanstack/react-query";
import type { DataSourceSpecification } from "../types/schema/specification";
import { parseDataSource, type ParsedDataSource } from "../lib/parser/data-source-parser";
import { Ok, Err } from "../lib/type-safety";

/**
 * Data source state for a single data source
 */
export interface DataSourceState {
  /**
   * The data fetched from the source
   */
  data: unknown;

  /**
   * Whether the data is currently being fetched
   */
  loading: boolean;

  /**
   * Error if the fetch failed
   */
  error: Error | null;

  /**
   * Whether the data is being refetched
   */
  refetching: boolean;

  /**
   * Function to manually refetch the data
   */
  refetch: () => void;
}

/**
 * Data sources state for all data sources
 */
export interface DataSourcesState {
  /**
   * Map of data source ID to its state
   */
  sources: Record<string, DataSourceState>;

  /**
   * Whether any data source is loading
   */
  isLoading: boolean;

  /**
   * Whether all data sources have loaded
   */
  hasLoaded: boolean;

  /**
   * Whether any data source has an error
   */
  hasError: boolean;

  /**
   * Function to refetch all data sources
   */
  refetchAll: () => void;
}

/**
 * Options for the useDataSources hook
 */
export interface UseDataSourcesOptions {
  /**
   * Query client to use for caching
   */
  queryClient?: QueryClient;

  /**
   * Global polling interval (milliseconds)
   */
  pollingInterval?: number;

  /**
   * Whether to enable polling
   */
  enablePolling?: boolean;

  /**
   * Whether to retry on error
   */
  retry?: boolean | number;

  /**
   * Custom data fetcher implementation
   */
  fetcher?: DataFetcher;

  /**
   * Context variables for data source expressions
   */
  context?: Record<string, unknown>;
}

/**
 * Configuration for REST data fetching
 */
export interface RestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: unknown;
}

/**
 * Configuration for GraphQL data fetching
 */
export interface GraphQLConfig {
  url: string;
  query: string;
  variables?: Record<string, unknown>;
  headers?: Record<string, string>;
}

/**
 * Configuration for static data
 */
export interface StaticConfig {
  data: unknown;
}

/**
 * Configuration for WebSocket connection
 */
export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  options?: Record<string, unknown>;
}

/**
 * Configuration for function execution
 */
export interface FunctionConfig {
  name: string;
  args?: Record<string, unknown>;
  context?: Record<string, unknown>;
}

export interface DataFetcher {
  /**
   * Fetch data from a REST endpoint
   */
  fetchRest: (config: RestConfig) => Promise<unknown>;

  /**
   * Fetch data from a GraphQL endpoint
   */
  fetchGraphQL: (config: GraphQLConfig) => Promise<unknown>;

  /**
   * Fetch static data
   */
  fetchStatic: (config: StaticConfig) => Promise<unknown>;

  /**
   * Connect to a WebSocket
   */
  connectWebSocket: (config: WebSocketConfig) => Promise<unknown>;

  /**
   * Execute a function
   */
  executeFunction: (config: FunctionConfig) => Promise<unknown>;
}

/**
 * Default data fetcher implementation
 */
const defaultFetcher: DataFetcher = {
  fetchRest: async (config: RestConfig) => {
    const { url, method = "GET", headers = {}, params, body } = config;

    // Build URL with params
    const urlObj = new URL(url);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        urlObj.searchParams.append(key, String(value));
      }
    }

    const response = await fetch(urlObj.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  fetchGraphQL: async (config: GraphQLConfig) => {
    const { url, query, variables = {}, headers = {} } = config;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  },

  fetchStatic: async (config: StaticConfig) => {
    return config.data;
  },

  connectWebSocket: async (_config: WebSocketConfig) => {
    // WebSocket implementation would go here
    // For now, throw an error as it's not implemented
    throw new Error("WebSocket data sources are not yet implemented");
  },

  executeFunction: async (_config: FunctionConfig) => {
    // Function execution would go here
    // For now, throw an error as it's not implemented
    throw new Error("Function data sources are not yet implemented");
  },
};

/**
 * Interface for data source query specification
 */
interface DataSourceQuery {
  id: string;
  type: "rest" | "graphql" | "static" | "websocket" | "function";
  config: RestConfig | GraphQLConfig | StaticConfig | WebSocketConfig | FunctionConfig;
  cache?: {
    ttl?: number;
  };
  polling?: {
    interval?: number;
    pauseWhenHidden?: boolean;
  };
}

/**
 * Create fetcher function based on data source type
 */
function createFetchFunction(spec: DataSourceQuery, fetcher: DataFetcher) {
  switch (spec.type) {
    case "rest": {
      return () => fetcher.fetchRest(spec.config as RestConfig);
    }
    case "graphql": {
      return () => fetcher.fetchGraphQL(spec.config as GraphQLConfig);
    }
    case "static": {
      return () => fetcher.fetchStatic(spec.config as StaticConfig);
    }
    case "websocket": {
      return () => fetcher.connectWebSocket(spec.config as WebSocketConfig);
    }
    case "function": {
      return () => fetcher.executeFunction(spec.config as FunctionConfig);
    }
    default: {
      return () => {
        throw new Error(`Unknown data source type: ${spec.type}`);
      };
    }
  }
}

/**
 * Helper function to create query options from a spec
 */
function createQueryOptions(
  spec: DataSourceQuery | undefined,
  index: number,
  options: UseDataSourcesOptions
): Parameters<typeof useQuery>[0] {
  const { pollingInterval, enablePolling = false, retry = 3, fetcher = defaultFetcher } = options;

  if (!spec) {
    return {
      queryKey: ["unused", index],
      queryFn: async () => null,
      enabled: false,
      retry: false,
    };
  }

  return {
    queryKey: ["dataSource", spec.id, spec.config],
    queryFn: createFetchFunction(spec, fetcher),
    enabled: true,
    retry,
    staleTime: spec.cache?.ttl ? spec.cache.ttl * 1000 : undefined,
    refetchInterval:
      spec.polling?.interval && enablePolling ? spec.polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: !spec.polling?.pauseWhenHidden,
  };
}

/**
 * Helper hook that creates a stable array of queries
 * This ensures the hooks are called in the same order every render
 */
function useDataSourceQueries(
  parsedSpecs: DataSourceQuery[],
  options: UseDataSourcesOptions
): UseQueryResult<unknown, Error>[] {
  // React hooks must be called in the same order every render
  // We have a fixed maximum of 10 queries to ensure this
  const query0 = useQuery(createQueryOptions(parsedSpecs[0], 0, options));
  const query1 = useQuery(createQueryOptions(parsedSpecs[1], 1, options));
  const query2 = useQuery(createQueryOptions(parsedSpecs[2], 2, options));
  const query3 = useQuery(createQueryOptions(parsedSpecs[3], 3, options));
  const query4 = useQuery(createQueryOptions(parsedSpecs[4], 4, options));
  const query5 = useQuery(createQueryOptions(parsedSpecs[5], 5, options));
  const query6 = useQuery(createQueryOptions(parsedSpecs[6], 6, options));
  const query7 = useQuery(createQueryOptions(parsedSpecs[7], 7, options));
  const query8 = useQuery(createQueryOptions(parsedSpecs[8], 8, options));
  const query9 = useQuery(createQueryOptions(parsedSpecs[9], 9, options));

  const allQueries = [
    query0,
    query1,
    query2,
    query3,
    query4,
    query5,
    query6,
    query7,
    query8,
    query9,
  ];

  // Return only the queries that correspond to actual specs
  return allQueries.slice(0, parsedSpecs.length) as UseQueryResult<unknown, Error>[];
}

/**
 * Processes data source specifications and manages their state
 */
export function useDataSources(
  specifications: DataSourceSpecification[] | undefined,
  options: UseDataSourcesOptions = {}
): DataSourcesState {
  // Parse data source specifications
  const parsedSpecs = React.useMemo(() => {
    if (!specifications) return [];

    const result = parseDataSource(specifications);
    if (result.isErr) {
      console.error("Error parsing data sources:", (result as Err<Error>).error);
      return [];
    }

    const successResult = result as Ok<ParsedDataSource | ParsedDataSource[]>;
    return Array.isArray(successResult.value) ? successResult.value : [successResult.value];
  }, [specifications]);

  // Use fixed hook calls
  const queries = useDataSourceQueries(parsedSpecs, options);

  // Compute state from queries
  const state = React.useMemo(() => {
    const sources: Record<string, DataSourceState> = {};

    for (const [index, spec] of parsedSpecs.entries()) {
      const query = queries[index];

      sources[spec.id] = {
        data: query.data,
        loading: query.isLoading,
        error: query.error as Error | null,
        refetching: query.isRefetching,
        refetch: query.refetch,
      };
    }

    const isLoading = queries.some((q) => q.isLoading);
    const hasLoaded = queries.every((q) => !q.isLoading);
    const hasError = queries.some((q) => q.error !== null);

    return {
      sources,
      isLoading,
      hasLoaded,
      hasError,
      refetchAll: () => {
        for (const query of queries) {
          query.refetch();
        }
      },
    };
  }, [parsedSpecs, queries]);

  return state;
}

/**
 * Hook to access a specific data source by ID
 */
export function useDataSource(
  dataSourceId: string,
  specifications: DataSourceSpecification[] | undefined,
  options: UseDataSourcesOptions = {}
): DataSourceState | undefined {
  const dataSources = useDataSources(specifications, options);
  return dataSources.sources[dataSourceId];
}

/**
 * Helper to resolve a property path from an object
 */
function resolvePropertyPath(data: unknown, propertyPath: string[]): unknown {
  let resolvedValue = data;

  for (const prop of propertyPath) {
    if (resolvedValue && typeof resolvedValue === "object" && prop in resolvedValue) {
      resolvedValue = (resolvedValue as Record<string, unknown>)[prop];
    } else {
      return undefined;
    }
  }

  return resolvedValue;
}

/**
 * Helper to resolve a single data binding
 */
function resolveDataBinding(value: unknown, dataSources: DataSourcesState): unknown {
  if (typeof value !== "string" || !value.startsWith("$data.")) {
    return value;
  }

  const path = value.slice(6); // Remove "$data." prefix
  const [sourceId, ...propertyPath] = path.split(".");

  const source = dataSources.sources[sourceId];
  if (!source) {
    return value;
  }

  const sourceData = source.data;
  if (!sourceData) {
    return undefined;
  }

  return resolvePropertyPath(sourceData, propertyPath);
}

/**
 * Hook to bind data from data sources to component props
 */
export function useDataBinding(
  props: Record<string, unknown>,
  dataSources: DataSourcesState
): Record<string, unknown> {
  return React.useMemo(() => {
    const boundProps: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(props)) {
      boundProps[key] = resolveDataBinding(value, dataSources);
    }

    return boundProps;
  }, [props, dataSources]);
}
