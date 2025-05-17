import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Result, Ok, Err } from "../utils/result";
import type {
  DataSourceSpecification,
  RestDataSourceConfig,
  GraphQLDataSourceConfig,
  StaticDataSourceConfig,
  WebSocketDataSourceConfig,
  FunctionDataSourceConfig,
} from "../../types/schema/specification";
import type { StateManager } from "../state/state-management";

/**
 * Error type for data fetching
 */
export class DataFetchError extends Error {
  constructor(
    message: string,
    public readonly source: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "DataFetchError";
  }
}

/**
 * Cache entry structure
 */
interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
  staleWhileRevalidate?: number;
}

/**
 * Data transformations
 */
export type DataTransformFunction = (data: unknown) => unknown;

/**
 * Data fetcher options
 */
export interface DataFetcherOptions {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  headers?: Record<string, string>;
  cache?: Map<string, CacheEntry>;
}

/**
 * Data fetcher response
 */
export interface DataFetcherResponse<T = unknown> {
  data: T | null;
  loading: boolean;
  error: DataFetchError | null;
  refetch: () => void;
}

/**
 * Retry configuration
 */
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  backoffMultiplier: number;
}

/**
 * Request deduplication map
 */
const pendingRequests = new Map<string, Promise<Result<unknown, DataFetchError>>>();

/**
 * Default cache instance for sharing across components
 */
const defaultCache = new Map<string, CacheEntry>();

/**
 * Data fetcher class for handling different data source types
 */
export class DataFetcher {
  private readonly options: Required<DataFetcherOptions>;
  private readonly retryConfig: RetryConfig;
  private readonly cache: Map<string, CacheEntry>;

  constructor(options: DataFetcherOptions = {}) {
    this.options = {
      maxRetries: options.maxRetries ?? 3,
      retryDelay: options.retryDelay ?? 1000,
      timeout: options.timeout ?? 30_000,
      headers: options.headers ?? {},
      cache: options.cache ?? defaultCache,
    };

    this.retryConfig = {
      maxRetries: this.options.maxRetries,
      baseDelay: this.options.retryDelay,
      backoffMultiplier: 2,
    };

    this.cache = this.options.cache;
  }

  /**
   * Fetch data from a data source specification
   */
  async fetch(
    spec: DataSourceSpecification,
    context?: Record<string, unknown>
  ): Promise<Result<unknown, DataFetchError>> {
    const cacheKey = this.getCacheKey(spec, context);

    // Check cache first
    const cached = this.getFromCache(cacheKey, spec.cache);
    if (cached) {
      if (cached.isStale && spec.cache?.staleWhileRevalidate) {
        // Return stale data and trigger revalidation in background
        this.revalidateInBackground(spec, context, cacheKey);
      }
      return Ok(cached.data);
    }

    // Check for pending request (deduplication)
    const pendingRequest = pendingRequests.get(cacheKey);
    if (pendingRequest) {
      return pendingRequest;
    }

    // Start new request
    const requestPromise = this.executeRequest(spec, context, cacheKey);
    pendingRequests.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      return result;
    } finally {
      pendingRequests.delete(cacheKey);
    }
  }

  /**
   * Execute the actual data fetching with retries
   */
  private async executeRequest(
    spec: DataSourceSpecification,
    context?: Record<string, unknown>,
    cacheKey?: string
  ): Promise<Result<unknown, DataFetchError>> {
    let lastError: DataFetchError | null = null;

    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const result = await this.fetchInternal(spec, context);

        // Apply transformations
        const transformed = this.applyTransformations(result, spec.transforms);

        // Cache the result
        if (cacheKey && spec.cache) {
          this.setInCache(cacheKey, transformed, spec.cache);
        }

        return Ok(transformed);
      } catch (error) {
        lastError = new DataFetchError(
          `Failed to fetch data from ${spec.id}`,
          spec.id,
          error
        );

        if (attempt < this.retryConfig.maxRetries) {
          const delay = this.calculateRetryDelay(attempt);
          await this.delay(delay);
        }
      }
    }

    return Err(lastError!);
  }

  /**
   * Internal fetch method for different source types
   */
  private async fetchInternal(
    spec: DataSourceSpecification,
    context?: Record<string, unknown>
  ): Promise<unknown> {
    switch (spec.type) {
      case "rest": {
        return this.fetchRest(spec.config as RestDataSourceConfig, context);
      }

      case "graphql": {
        return this.fetchGraphQL(spec.config as GraphQLDataSourceConfig, context);
      }

      case "static": {
        return this.fetchStatic(spec.config as StaticDataSourceConfig);
      }

      case "websocket": {
        return this.fetchWebSocket(spec.config as WebSocketDataSourceConfig, context);
      }

      case "function": {
        return this.fetchFunction(spec.config as FunctionDataSourceConfig, context);
      }

      default: {
        throw new Error(`Unsupported data source type: ${spec.type}`);
      }
    }
  }

  /**
   * Fetch data from REST API
   */
  private async fetchRest(
    config: RestDataSourceConfig,
    context?: Record<string, unknown>
  ): Promise<unknown> {
    const url = this.interpolateString(config.url, context);
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(() => controller.abort(), this.options.timeout);

    try {
      const response = await fetch(url, {
        method: config.method,
        headers: {
          ...this.options.headers,
          ...config.headers,
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  }

  /**
   * Fetch data from GraphQL API
   */
  private async fetchGraphQL(
    config: GraphQLDataSourceConfig,
    context?: Record<string, unknown>
  ): Promise<unknown> {
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(() => controller.abort(), this.options.timeout);

    try {
      const response = await fetch(config.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.options.headers,
          ...config.headers,
        },
        body: JSON.stringify({
          query: config.query,
          variables: this.interpolateObject(config.variables, context),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  }

  /**
   * Fetch static data
   */
  private async fetchStatic(config: StaticDataSourceConfig): Promise<unknown> {
    return config.data;
  }

  /**
   * Fetch data from WebSocket (placeholder implementation)
   */
  private async fetchWebSocket(
    config: WebSocketDataSourceConfig,
    context?: Record<string, unknown>
  ): Promise<unknown> {
    // Note: This is a simplified implementation
    // A full implementation would require proper WebSocket management
    throw new Error("WebSocket data source not yet implemented");
  }

  /**
   * Execute a custom function
   */
  private async fetchFunction(
    config: FunctionDataSourceConfig,
    context?: Record<string, unknown>
  ): Promise<unknown> {
    // Note: This would require a function registry in a real implementation
    throw new Error("Function data source not yet implemented");
  }

  /**
   * Apply data transformations
   */
  private applyTransformations(
    data: unknown,
    transforms?: DataSourceSpecification["transforms"]
  ): unknown {
    if (!transforms || transforms.length === 0) {
      return data;
    }

    let result = data;

    for (const transform of transforms) {
      result = this.applyTransform(result, transform);
    }

    return result;
  }

  private applyTransform(data: unknown, transform: DataSourceSpecification["transforms"][0]): unknown {
    if (!Array.isArray(data)) {
      return data;
    }

    switch (transform.type) {
      case "map": {
        return data.map((item) => this.evaluateExpression(item, transform.config));
      }
      case "filter": {
        return data.filter((item) => this.evaluateCondition(item, transform.config));
      }
      case "sort": {
        return this.sortArray(data, transform.config);
      }
      case "slice": {
        const { start = 0, end } = transform.config;
        return data.slice(start as number, end as number);
      }
      case "custom": {
        // Custom transformations would require a transformation registry
        return data;
      }
      default: {
        return data;
      }
    }
  }

  /**
   * Cache management utilities
   */
  private getCacheKey(
    spec: DataSourceSpecification,
    context?: Record<string, unknown>
  ): string {
    return JSON.stringify({ id: spec.id, config: spec.config, context });
  }

  private getFromCache(
    key: string,
    cacheConfig?: DataSourceSpecification["cache"]
  ): { data: unknown; isStale: boolean } | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;
    const isExpired = age > entry.ttl * 1000;

    if (isExpired && !entry.staleWhileRevalidate) {
      this.cache.delete(key);
      return null;
    }

    const isStale = isExpired && entry.staleWhileRevalidate !== undefined;
    return { data: entry.data, isStale };
  }

  private setInCache(
    key: string,
    data: unknown,
    cacheConfig: DataSourceSpecification["cache"]
  ): void {
    if (!cacheConfig) return;

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: cacheConfig.ttl,
      staleWhileRevalidate: cacheConfig.staleWhileRevalidate,
    });
  }

  private async revalidateInBackground(
    spec: DataSourceSpecification,
    context: Record<string, unknown> | undefined,
    cacheKey: string
  ): Promise<void> {
    // Fire and forget
    this.executeRequest(spec, context, cacheKey).catch(() => {
      // Ignore errors in background revalidation
    });
  }

  /**
   * Helper utilities
   */
  private interpolateString(
    template: string,
    context?: Record<string, unknown>
  ): string {
    if (!context) return template;

    return template.replaceAll(/\{([^{}]+)\}/g, (match, key) => {
      const value = this.getNestedValue(context, key);
      return value === undefined ? match : String(value);
    });
  }

  private interpolateObject(
    obj: Record<string, unknown> | undefined,
    context?: Record<string, unknown>
  ): Record<string, unknown> | undefined {
    if (!obj || !context) return obj;

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        result[key] = this.interpolateString(value, context);
      } else if (typeof value === "object" && value !== null) {
        result[key] = this.interpolateObject(
          value as Record<string, unknown>,
          context
        );
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    const keys = path.split(".");
    let value: unknown = obj;

    for (const key of keys) {
      if (value === null || value === undefined) return undefined;
      value = (value as Record<string, unknown>)[key];
    }

    return value;
  }

  private evaluateExpression(
    item: unknown,
    config: Record<string, unknown>
  ): unknown {
    // Simplified expression evaluation
    // In production, use a proper expression parser
    const expression = config.expression as string;
    if (expression.startsWith("item.")) {
      const path = expression.slice(5);
      return this.getNestedValue(item as Record<string, unknown>, path);
    }
    return item;
  }

  private evaluateCondition(
    item: unknown,
    config: Record<string, unknown>
  ): boolean {
    // Simplified condition evaluation
    // In production, use a proper expression parser
    const condition = config.condition as string;
    if (condition.includes(">")) {
      const [left, right] = condition.split(">").map((s) => s.trim());
      const leftValue = this.evaluateExpression(item, { expression: left });
      const rightValue = Number.parseFloat(right) || 0;
      return Number(leftValue) > rightValue;
    }
    return true;
  }

  private sortArray(
    array: unknown[],
    config: Record<string, unknown>
  ): unknown[] {
    const { field, order = "asc" } = config;
    const fieldPath = field as string;

    return [...array].sort((a, b) => {
      const aValue = this.getNestedValue(a as Record<string, unknown>, fieldPath);
      const bValue = this.getNestedValue(b as Record<string, unknown>, fieldPath);

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const result = aValue < bValue ? -1 : 1;
      return order === "desc" ? -result : result;
    });
  }

  private calculateRetryDelay(attempt: number): number {
    return this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
  }
}

/**
 * React hook for data fetching
 */
export function useDataSource<T = unknown>(
  spec: DataSourceSpecification,
  options?: {
    stateManager?: StateManager;
    dependencies?: string[];
    enabled?: boolean;
    fetcherOptions?: DataFetcherOptions;
  }
): DataFetcherResponse<T> {
  const {
    stateManager,
    dependencies = [],
    enabled = true,
    fetcherOptions,
  } = options ?? {};

  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: DataFetchError | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const fetcherRef = useRef<DataFetcher>();
  const pollingIntervalRef = useRef<number>();

  // Create fetcher instance
  const fetcher = useMemo(() => {
    if (!fetcherRef.current) {
      fetcherRef.current = new DataFetcher(fetcherOptions);
    }
    return fetcherRef.current;
  }, [fetcherOptions]);

  // Get context from state manager if available
  const context = useMemo(() => {
    if (!stateManager) return undefined;

    const state = stateManager.getState();
    const contextData: Record<string, unknown> = {};

    for (const dep of dependencies) {
      contextData[dep] = state[dep];
    }

    return contextData;
  }, [stateManager, dependencies]);

  // Fetch function
  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await fetcher.fetch(spec, context);

      if (result.ok) {
        setState({
          data: result.val as T,
          loading: false,
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: result.val,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: new DataFetchError("Unexpected error", spec.id, error),
      });
    }
  }, [fetcher, spec, context, enabled]);

  // Set up polling if configured
  useEffect(() => {
    if (!spec.polling || !enabled) return;

    const { interval, pauseWhenHidden } = spec.polling;

    const startPolling = () => {
      pollingIntervalRef.current = globalThis.setInterval(() => {
        if (pauseWhenHidden && document.hidden) return;
        fetchData();
      }, interval * 1000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        globalThis.clearInterval(pollingIntervalRef.current);
      } else {
        startPolling();
      }
    };

    startPolling();

    if (pauseWhenHidden) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      globalThis.clearInterval(pollingIntervalRef.current);
      if (pauseWhenHidden) {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };
  }, [spec.polling, fetchData, enabled]);

  // Initial fetch and refetch on dependency changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch: fetchData,
  };
}

/**
 * Cache management utilities
 */
export const cacheManager = {
  /**
   * Clear all cached data
   */
  clearCache(): void {
    defaultCache.clear();
  },

  /**
   * Clear specific cache entry
   */
  evictEntry(key: string): boolean {
    return defaultCache.delete(key);
  },

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return defaultCache.size;
  },

  /**
   * Get cache entries
   */
  getCacheEntries(): Map<string, CacheEntry> {
    return new Map(defaultCache);
  },

  /**
   * Purge expired entries
   */
  purgeExpired(): number {
    const now = Date.now();
    let purged = 0;

    for (const [key, entry] of defaultCache) {
      const age = now - entry.timestamp;
      const isExpired = age > entry.ttl * 1000;

      if (isExpired && !entry.staleWhileRevalidate) {
        defaultCache.delete(key);
        purged++;
      }
    }

    return purged;
  },
};

/**
 * Request deduplication utilities
 */
export const requestManager = {
  /**
   * Get pending requests count
   */
  getPendingCount(): number {
    return pendingRequests.size;
  },

  /**
   * Cancel all pending requests
   */
  cancelAllPending(): void {
    pendingRequests.clear();
  },
};