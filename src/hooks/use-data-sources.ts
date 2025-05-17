/**
 * useDataSources Hook
 *
 * This hook processes data source specifications and provides data fetching functionality
 * for React Jedi components. It handles loading states, error states, and data binding.
 */

import * as React from "react";
import { useQuery, type QueryClient, type UseQueryResult } from "@tanstack/react-query";
import type { DataSourceSpecification } from "../types/schema/specification";
import { parseDataSource } from "../lib/parser/data-source-parser";

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
  args?: unknown[];
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
 * Helper hook that creates a stable array of queries
 * This ensures the hooks are called in the same order every render
 */
function useDataSourceQueries(
  parsedSpecs: DataSourceQuery[],
  options: UseDataSourcesOptions
): UseQueryResult[] {
  const { pollingInterval, enablePolling = false, retry = 3, fetcher = defaultFetcher } = options;
  
  // Call useQuery for each data source - hooks must be called in same order each render
  const query0 = useQuery({
    queryKey: parsedSpecs[0] ? ["dataSource", parsedSpecs[0].id, parsedSpecs[0].config] : ["unused", 0],
    queryFn: parsedSpecs[0] ? createFetchFunction(parsedSpecs[0], fetcher) : async () => null,
    enabled: !!parsedSpecs[0],
    retry: parsedSpecs[0] ? retry : false,
    staleTime: parsedSpecs[0]?.cache?.ttl ? parsedSpecs[0].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[0]?.polling?.interval && enablePolling ? parsedSpecs[0].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[0] ? !parsedSpecs[0].polling?.pauseWhenHidden : false,
  });
  
  const query1 = useQuery({
    queryKey: parsedSpecs[1] ? ["dataSource", parsedSpecs[1].id, parsedSpecs[1].config] : ["unused", 1],
    queryFn: parsedSpecs[1] ? createFetchFunction(parsedSpecs[1], fetcher) : async () => null,
    enabled: !!parsedSpecs[1],
    retry: parsedSpecs[1] ? retry : false,
    staleTime: parsedSpecs[1]?.cache?.ttl ? parsedSpecs[1].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[1]?.polling?.interval && enablePolling ? parsedSpecs[1].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[1] ? !parsedSpecs[1].polling?.pauseWhenHidden : false,
  });
  
  const query2 = useQuery({
    queryKey: parsedSpecs[2] ? ["dataSource", parsedSpecs[2].id, parsedSpecs[2].config] : ["unused", 2],
    queryFn: parsedSpecs[2] ? createFetchFunction(parsedSpecs[2], fetcher) : async () => null,
    enabled: !!parsedSpecs[2],
    retry: parsedSpecs[2] ? retry : false,
    staleTime: parsedSpecs[2]?.cache?.ttl ? parsedSpecs[2].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[2]?.polling?.interval && enablePolling ? parsedSpecs[2].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[2] ? !parsedSpecs[2].polling?.pauseWhenHidden : false,
  });
  
  const query3 = useQuery({
    queryKey: parsedSpecs[3] ? ["dataSource", parsedSpecs[3].id, parsedSpecs[3].config] : ["unused", 3],
    queryFn: parsedSpecs[3] ? createFetchFunction(parsedSpecs[3], fetcher) : async () => null,
    enabled: !!parsedSpecs[3],
    retry: parsedSpecs[3] ? retry : false,
    staleTime: parsedSpecs[3]?.cache?.ttl ? parsedSpecs[3].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[3]?.polling?.interval && enablePolling ? parsedSpecs[3].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[3] ? !parsedSpecs[3].polling?.pauseWhenHidden : false,
  });
  
  const query4 = useQuery({
    queryKey: parsedSpecs[4] ? ["dataSource", parsedSpecs[4].id, parsedSpecs[4].config] : ["unused", 4],
    queryFn: parsedSpecs[4] ? createFetchFunction(parsedSpecs[4], fetcher) : async () => null,
    enabled: !!parsedSpecs[4],
    retry: parsedSpecs[4] ? retry : false,
    staleTime: parsedSpecs[4]?.cache?.ttl ? parsedSpecs[4].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[4]?.polling?.interval && enablePolling ? parsedSpecs[4].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[4] ? !parsedSpecs[4].polling?.pauseWhenHidden : false,
  });
  
  const query5 = useQuery({
    queryKey: parsedSpecs[5] ? ["dataSource", parsedSpecs[5].id, parsedSpecs[5].config] : ["unused", 5],
    queryFn: parsedSpecs[5] ? createFetchFunction(parsedSpecs[5], fetcher) : async () => null,
    enabled: !!parsedSpecs[5],
    retry: parsedSpecs[5] ? retry : false,
    staleTime: parsedSpecs[5]?.cache?.ttl ? parsedSpecs[5].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[5]?.polling?.interval && enablePolling ? parsedSpecs[5].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[5] ? !parsedSpecs[5].polling?.pauseWhenHidden : false,
  });
  
  const query6 = useQuery({
    queryKey: parsedSpecs[6] ? ["dataSource", parsedSpecs[6].id, parsedSpecs[6].config] : ["unused", 6],
    queryFn: parsedSpecs[6] ? createFetchFunction(parsedSpecs[6], fetcher) : async () => null,
    enabled: !!parsedSpecs[6],
    retry: parsedSpecs[6] ? retry : false,
    staleTime: parsedSpecs[6]?.cache?.ttl ? parsedSpecs[6].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[6]?.polling?.interval && enablePolling ? parsedSpecs[6].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[6] ? !parsedSpecs[6].polling?.pauseWhenHidden : false,
  });
  
  const query7 = useQuery({
    queryKey: parsedSpecs[7] ? ["dataSource", parsedSpecs[7].id, parsedSpecs[7].config] : ["unused", 7],
    queryFn: parsedSpecs[7] ? createFetchFunction(parsedSpecs[7], fetcher) : async () => null,
    enabled: !!parsedSpecs[7],
    retry: parsedSpecs[7] ? retry : false,
    staleTime: parsedSpecs[7]?.cache?.ttl ? parsedSpecs[7].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[7]?.polling?.interval && enablePolling ? parsedSpecs[7].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[7] ? !parsedSpecs[7].polling?.pauseWhenHidden : false,
  });
  
  const query8 = useQuery({
    queryKey: parsedSpecs[8] ? ["dataSource", parsedSpecs[8].id, parsedSpecs[8].config] : ["unused", 8],
    queryFn: parsedSpecs[8] ? createFetchFunction(parsedSpecs[8], fetcher) : async () => null,
    enabled: !!parsedSpecs[8],
    retry: parsedSpecs[8] ? retry : false,
    staleTime: parsedSpecs[8]?.cache?.ttl ? parsedSpecs[8].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[8]?.polling?.interval && enablePolling ? parsedSpecs[8].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[8] ? !parsedSpecs[8].polling?.pauseWhenHidden : false,
  });
  
  const query9 = useQuery({
    queryKey: parsedSpecs[9] ? ["dataSource", parsedSpecs[9].id, parsedSpecs[9].config] : ["unused", 9],
    queryFn: parsedSpecs[9] ? createFetchFunction(parsedSpecs[9], fetcher) : async () => null,
    enabled: !!parsedSpecs[9],
    retry: parsedSpecs[9] ? retry : false,
    staleTime: parsedSpecs[9]?.cache?.ttl ? parsedSpecs[9].cache.ttl * 1000 : undefined,
    refetchInterval: parsedSpecs[9]?.polling?.interval && enablePolling ? parsedSpecs[9].polling.interval * 1000 : pollingInterval,
    refetchIntervalInBackground: parsedSpecs[9] ? !parsedSpecs[9].polling?.pauseWhenHidden : false,
  });
  
  const allQueries = [query0, query1, query2, query3, query4, query5, query6, query7, query8, query9];
  
  // Return only the queries that correspond to actual specs
  return allQueries.slice(0, parsedSpecs.length);
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
    if (result.err) {
      console.error("Error parsing data sources:", result.val);
      return [];
    }

    return Array.isArray(result.val) ? result.val : [result.val];
  }, [specifications]);

  // Use fixed hook calls
  const queries = useDataSourceQueries(parsedSpecs, options);

  // Compute state from queries
  const state = React.useMemo(() => {
    const sources: Record<string, DataSourceState> = {};
    
    for (let i = 0; i < parsedSpecs.length; i++) {
      const spec = parsedSpecs[i];
      const query = queries[i];
      
      sources[spec.id] = {
        data: query.data,
        loading: query.isLoading,
        error: query.error as Error | null,
        refetching: query.isRefetching,
        refetch: query.refetch,
      };
    }
    
    const isLoading = queries.some(q => q.isLoading);
    const hasLoaded = queries.every(q => !q.isLoading);
    const hasError = queries.some(q => q.error !== null);
    
    return {
      sources,
      isLoading,
      hasLoaded,
      hasError,
      refetchAll: () => {
        queries.forEach(q => q.refetch());
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
 * Hook to bind data from data sources to component props
 */
export function useDataBinding(
  props: Record<string, unknown>,
  dataSources: DataSourcesState
): Record<string, unknown> {
  return React.useMemo(() => {
    const boundProps: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(props)) {
      // Check if the value is a data binding expression
      if (typeof value === "string" && value.startsWith("$data.")) {
        const path = value.slice(6); // Remove "$data." prefix
        const [sourceId, ...propertyPath] = path.split(".");

        if (dataSources.sources[sourceId]) {
          const sourceData = dataSources.sources[sourceId].data;
          if (sourceData) {
            // Navigate through the property path
            let resolvedValue = sourceData;
            for (const prop of propertyPath) {
              if (resolvedValue && typeof resolvedValue === "object" && prop in resolvedValue) {
                resolvedValue = (resolvedValue as Record<string, unknown>)[prop];
              } else {
                resolvedValue = undefined;
                break;
              }
            }
            boundProps[key] = resolvedValue;
          } else {
            boundProps[key] = undefined;
          }
        } else {
          boundProps[key] = value;
        }
      } else {
        boundProps[key] = value;
      }
    }

    return boundProps;
  }, [props, dataSources]);
}