import { UISpecification, DataSourceSpecification as BaseDataSourceSpecification } from "./schema/specification";

/**
 * Defines how data should be fetched from external sources (extended)
 */
export interface ExtendedDataSourceSpecification {
  /** Unique identifier for this data source */
  id: string;
  /** Type of data source */
  type: "rest" | "graphql" | "static" | "websocket" | "function";
  /** Data source configuration */
  config: Record<string, unknown>;
  /** URL or endpoint to fetch data from */
  url: string;
  /** HTTP method to use */
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body for POST/PUT/PATCH requests */
  body?: unknown;
  /** Query parameters */
  params?: Record<string, string | number | boolean>;
  /** Transform response before returning */
  transform?: DataTransformation;
  /** Caching configuration */
  cache?: DataCache;
  /** Retry configuration */
  retry?: {
    attempts?: number;
    delay?: number;
    backoff?: "linear" | "exponential";
  };
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Mutation specification for data updates
 */
export interface MutationSpecification {
  /** Unique identifier for this mutation */
  id: string;
  /** REST endpoint for the mutation */
  endpoint: string;
  /** HTTP method (POST, PUT, DELETE, PATCH) */
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  /** Request headers */
  headers?: Record<string, string>;
  /** Query keys to invalidate on success */
  invalidates?: string[];
  /** Optimistic update configuration */
  optimistic?: {
    /** Function to get optimistic data */
    getOptimisticData: string;
    /** State updates to apply */
    stateUpdates?: Record<string, unknown>;
    /** Rollback strategy */
    rollback?: "snapshot" | "custom";
  };
  /** Success message to display */
  successMessage?: string;
  /** Error message template */
  errorMessage?: string;
}

/**
 * Configuration options for the data fetching system
 */
export interface DataFetcherOptions {
  /** Base URL for all requests */
  baseURL?: string;
  /** Default headers for all requests */
  defaultHeaders?: Record<string, string>;
  /** Global error handler */
  onError?: (error: DataFetchError) => void;
  /** Global success handler */
  onSuccess?: (data: unknown) => void;
  /** Default cache configuration */
  defaultCache?: DataCache;
  /** Enable request deduplication */
  dedupe?: boolean;
  /** Enable automatic retries */
  autoRetry?: boolean;
}

/**
 * Transformation configuration for fetched data
 */
export interface DataTransformation {
  /** Type of transformation */
  type: "map" | "filter" | "reduce" | "custom";
  /** Path to extract data from response (dot notation) */
  extract?: string;
  /** Mapping function for map transformations */
  mapper?: (item: unknown) => unknown;
  /** Filter predicate for filter transformations */
  predicate?: (item: unknown) => boolean;
  /** Reducer function for reduce transformations */
  reducer?: (accumulator: unknown, current: unknown) => unknown;
  /** Initial value for reduce transformations */
  initialValue?: unknown;
  /** Custom transformation function */
  custom?: (data: unknown) => unknown;
}

/**
 * Configuration for binding fetched data to component props
 */
export interface DataBindingConfiguration {
  /** Data source ID to bind from */
  sourceId: string;
  /** Target prop name on the component */
  targetProp: string;
  /** Optional transformation before binding */
  transform?: DataTransformation;
  /** Path within the data to bind (dot notation) */
  path?: string;
  /** Default value if data is not available */
  defaultValue?: unknown;
  /** Whether to pass loading state to component */
  includeLoadingState?: boolean;
  /** Whether to pass error state to component */
  includeErrorState?: boolean;
  /** Custom loading prop name */
  loadingProp?: string;
  /** Custom error prop name */
  errorProp?: string;
}

/**
 * Result of a data fetch operation
 */
export interface DataQueryResult<T = unknown> {
  /** The fetched data */
  data: T | null;
  /** Loading state */
  loading: boolean;
  /** Error if the fetch failed */
  error: DataFetchError | null;
  /** Whether the data is stale */
  isStale: boolean;
  /** Whether the data is being refetched */
  isRefetching: boolean;
  /** Timestamp of last successful fetch */
  lastFetchTime: number | null;
  /** Manually trigger a refetch */
  refetch: () => Promise<void>;
  /** Manually set the data */
  setData: (data: T) => void;
  /** Clear the cached data */
  clear: () => void;
}

/**
 * Error type for data fetching operations
 */
export interface DataFetchError {
  /** Error message */
  message: string;
  /** HTTP status code if applicable */
  statusCode?: number;
  /** Original error object */
  originalError?: Error;
  /** Request URL that failed */
  url?: string;
  /** Error timestamp */
  timestamp: number;
}

/**
 * Cache configuration for data sources
 */
export interface DataCache {
  /** Cache strategy */
  strategy: "memory" | "localStorage" | "sessionStorage" | "none";
  /** Time to live in milliseconds */
  ttl?: number;
  /** Maximum number of items in cache */
  maxSize?: number;
  /** Cache key generator function */
  keyGenerator?: (source: ExtendedDataSourceSpecification) => string;
  /** Whether to cache error responses */
  cacheErrors?: boolean;
  /** Stale-while-revalidate duration */
  staleTime?: number;
  /** Background refetch interval */
  refetchInterval?: number;
  /** Conditions when to bypass cache */
  bypass?: {
    /** Bypass cache on specific HTTP methods */
    methods?: ExtendedDataSourceSpecification["method"][];
    /** Custom bypass predicate */
    predicate?: (source: ExtendedDataSourceSpecification) => boolean;
  };
}

/**
 * Component specification with data integration
 */
export interface DataIntegratedSpecification extends UISpecification {
  /** Data sources to fetch */
  dataSources?: BaseDataSourceSpecification[];
  /** Data binding configuration */
  dataBindings?: DataBindingConfiguration[];
  /** Whether to fetch data on mount */
  fetchOnMount?: boolean;
  /** Dependencies that trigger refetch */
  refetchDependencies?: string[];
  /** Global error boundary for data errors */
  dataErrorBoundary?: {
    fallback?: UISpecification;
    onError?: (error: DataFetchError) => void;
  };
}

/**
 * Hook result for data fetching
 */
export interface UseDataSourceResult<T = unknown> extends DataQueryResult<T> {
  /** Update query parameters */
  updateParams: (params: Record<string, unknown>) => void;
  /** Update request headers */
  updateHeaders: (headers: Record<string, string>) => void;
  /** Cancel ongoing request */
  cancel: () => void;
}

/**
 * Data provider props
 */
export interface DataProviderProps {
  /** Data fetcher options */
  options?: DataFetcherOptions;
  /** Child components */
  children: React.ReactNode;
  /** Initial data cache */
  initialCache?: Record<string, unknown>;
}

/**
 * Data polling configuration
 */
export interface DataPollingConfig {
  /** Polling interval in milliseconds */
  interval: number;
  /** Whether polling is enabled */
  enabled?: boolean;
  /** Stop polling after certain number of attempts */
  maxAttempts?: number;
  /** Stop polling on error */
  stopOnError?: boolean;
  /** Dynamic interval based on data */
  dynamicInterval?: (data: unknown) => number;
}

/**
 * Batch request configuration
 */
export interface BatchRequestConfig {
  /** Maximum number of requests to batch */
  maxBatchSize?: number;
  /** Delay before executing batch */
  batchDelay?: number;
  /** Custom batch resolver */
  resolver?: (requests: ExtendedDataSourceSpecification[]) => Promise<unknown[]>;
}

/**
 * Data source lifecycle hooks
 */
export interface DataSourceLifecycle {
  /** Called before fetch */
  onBeforeFetch?: (source: ExtendedDataSourceSpecification) => void | Promise<void>;
  /** Called after successful fetch */
  onAfterFetch?: (data: unknown, source: ExtendedDataSourceSpecification) => void;
  /** Called on fetch error */
  onFetchError?: (error: DataFetchError, source: ExtendedDataSourceSpecification) => void;
  /** Called when data is cached */
  onCache?: (data: unknown, key: string) => void;
  /** Called when data is retrieved from cache */
  onCacheHit?: (data: unknown, key: string) => void;
}

/**
 * Type guards for data types
 */
export const isDataSourceSpecification = (obj: unknown): obj is ExtendedDataSourceSpecification => {
  return typeof obj === "object" && obj !== null && "id" in obj && "url" in obj;
};

export const isDataFetchError = (error: unknown): error is DataFetchError => {
  return typeof error === "object" && error !== null && "message" in error && "timestamp" in error;
};

export const isDataQueryResult = (obj: unknown): obj is DataQueryResult => {
  return typeof obj === "object" && obj !== null && 
    "data" in obj && "loading" in obj && "error" in obj;
};