import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DataFetcher, DataFetchError, cacheManager } from "./data-fetcher";
import type { DataSourceSpecification } from "../../types/schema/specification";

// Mock fetch API
globalThis.fetch = vi.fn();

// Helper to create delayed promises
const timeout = (delay: number, response: unknown) => 
  new Promise((resolve) => {
    globalThis.setTimeout(resolve, delay, response);
  });

describe("DataFetcher", () => {
  let fetcher: DataFetcher;

  beforeEach(() => {
    fetcher = new DataFetcher();
    cacheManager.clearCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe("REST data source", () => {
    it("should fetch data from REST API", async () => {
      const mockData = { users: [{ id: 1, name: "John" }] };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/users", {
        method: "GET",
        headers: {},
        body: undefined,
        signal: expect.any(AbortSignal),
      });
    });

    it("should handle REST API errors", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(false);
      expect(result.val).toBeInstanceOf(DataFetchError);
    });

    it("should interpolate URL parameters", async () => {
      const mockData = { user: { id: 123, name: "John" } };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "user",
        type: "rest",
        config: {
          url: "https://api.example.com/users/{userId}",
          method: "GET",
        },
      };

      const context = { userId: 123 };
      const result = await fetcher.fetch(spec, context);

      expect(result.ok).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.example.com/users/123",
        expect.any(Object)
      );
    });

    it("should retry on failure", async () => {
      const mockError = new Error("Network error");
      vi.mocked(fetch)
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response);

      const fetcher = new DataFetcher({ maxRetries: 2, retryDelay: 10 });
      const spec: DataSourceSpecification = {
        id: "flaky-api",
        type: "rest",
        config: {
          url: "https://api.example.com/flaky",
          method: "GET",
        },
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(3);
    });
  });

  describe("GraphQL data source", () => {
    it("should fetch data from GraphQL API", async () => {
      const mockData = { data: { users: [{ id: 1, name: "John" }] } };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "graphql",
        config: {
          url: "https://api.example.com/graphql",
          query: "query GetUsers { users { id name } }",
        },
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual(mockData.data);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "query GetUsers { users { id name } }",
          variables: undefined,
        }),
        signal: expect.any(AbortSignal),
      });
    });

    it("should handle GraphQL errors", async () => {
      const mockData = {
        errors: [{ message: "GraphQL error" }],
      };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "graphql",
        config: {
          url: "https://api.example.com/graphql",
          query: "query GetUsers { users { id name } }",
        },
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(false);
      expect(result.val).toBeInstanceOf(DataFetchError);
    });
  });

  describe("Static data source", () => {
    it("should return static data", async () => {
      const staticData = { users: [{ id: 1, name: "John" }] };
      const spec: DataSourceSpecification = {
        id: "static-users",
        type: "static",
        config: {
          data: staticData,
        },
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual(staticData);
    });
  });

  describe("Caching", () => {
    it("should cache successful responses", async () => {
      const mockData = { users: [{ id: 1, name: "John" }] };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "cached-users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
        cache: {
          ttl: 60,
        },
      };

      // First fetch
      const result1 = await fetcher.fetch(spec);
      expect(result1.ok).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(1);

      // Second fetch should use cache
      const result2 = await fetcher.fetch(spec);
      expect(result2.ok).toBe(true);
      expect(result2.val).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1); // Still only 1 call
    });

    it("should handle stale-while-revalidate", async () => {
      const mockData1 = { users: [{ id: 1, name: "John" }] };
      const mockData2 = { users: [{ id: 1, name: "John Updated" }] };

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData1,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData2,
        } as Response);

      const spec: DataSourceSpecification = {
        id: "swr-users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
        cache: {
          ttl: 0, // Expire immediately
          staleWhileRevalidate: 60,
        },
      };

      // First fetch
      const result1 = await fetcher.fetch(spec);
      expect(result1.ok).toBe(true);
      expect(result1.val).toEqual(mockData1);

      // Second fetch should return stale data and trigger revalidation
      await new Promise((resolve) => globalThis.setTimeout(resolve, 10));
      const result2 = await fetcher.fetch(spec);
      expect(result2.ok).toBe(true);
      expect(result2.val).toEqual(mockData1); // Still returns stale data

      // Wait for background revalidation
      await new Promise((resolve) => globalThis.setTimeout(resolve, 50));
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe("Transformations", () => {
    it("should apply map transformation", async () => {
      const mockData = {
        users: [
          { id: 1, name: "John", age: 30 },
          { id: 2, name: "Jane", age: 25 },
        ],
      };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
        transforms: [
          {
            type: "map",
            config: {
              expression: "item.name",
            },
          },
        ],
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual({ users: ["John", "Jane"] });
    });

    it("should apply filter transformation", async () => {
      const mockData = [
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", age: 25 },
        { id: 3, name: "Bob", age: 35 },
      ];
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
        transforms: [
          {
            type: "filter",
            config: {
              condition: "item.age > 30",
            },
          },
        ],
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual([{ id: 3, name: "Bob", age: 35 }]);
    });

    it("should apply sort transformation", async () => {
      const mockData = [
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", age: 25 },
        { id: 3, name: "Bob", age: 35 },
      ];
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
        transforms: [
          {
            type: "sort",
            config: {
              field: "age",
              order: "desc",
            },
          },
        ],
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual([
        { id: 3, name: "Bob", age: 35 },
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", age: 25 },
      ]);
    });

    it("should apply slice transformation", async () => {
      const mockData = [1, 2, 3, 4, 5];
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const spec: DataSourceSpecification = {
        id: "numbers",
        type: "rest",
        config: {
          url: "https://api.example.com/numbers",
          method: "GET",
        },
        transforms: [
          {
            type: "slice",
            config: {
              start: 1,
              end: 4,
            },
          },
        ],
      };

      const result = await fetcher.fetch(spec);

      expect(result.ok).toBe(true);
      expect(result.val).toEqual([2, 3, 4]);
    });
  });

  describe("Request deduplication", () => {
    it("should deduplicate concurrent requests", async () => {
      const mockData = { users: [{ id: 1, name: "John" }] };
      const resolveResponse = {
        ok: true,
        json: async () => mockData,
      };
      const fetchPromise = timeout(50, resolveResponse);

      vi.mocked(fetch).mockReturnValueOnce(fetchPromise as Promise<Response>);

      const spec: DataSourceSpecification = {
        id: "users",
        type: "rest",
        config: {
          url: "https://api.example.com/users",
          method: "GET",
        },
      };

      // Start multiple concurrent requests
      const promises = [
        fetcher.fetch(spec),
        fetcher.fetch(spec),
        fetcher.fetch(spec),
      ];

      const results = await Promise.all(promises);

      // All should succeed with the same data
      for (const result of results) {
        expect(result.ok).toBe(true);
        expect(result.val).toEqual(mockData);
      }

      // But fetch should only be called once
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Cache Manager", () => {
  beforeEach(() => {
    cacheManager.clearCache();
  });

  it("should clear the cache", () => {
    const fetcher = new DataFetcher();
    const spec: DataSourceSpecification = {
      id: "test",
      type: "static",
      config: { data: { test: true } },
      cache: { ttl: 60 },
    };

    fetcher.fetch(spec);
    expect(cacheManager.getCacheSize()).toBeGreaterThan(0);

    cacheManager.clearCache();
    expect(cacheManager.getCacheSize()).toBe(0);
  });

  it("should evict specific entries", async () => {
    const fetcher = new DataFetcher();
    const spec1: DataSourceSpecification = {
      id: "test1",
      type: "static",
      config: { data: { test: 1 } },
      cache: { ttl: 60 },
    };
    const spec2: DataSourceSpecification = {
      id: "test2",
      type: "static",
      config: { data: { test: 2 } },
      cache: { ttl: 60 },
    };

    await fetcher.fetch(spec1);
    await fetcher.fetch(spec2);
    expect(cacheManager.getCacheSize()).toBe(2);

    const key1 = JSON.stringify({ id: spec1.id, config: spec1.config, context: undefined });
    cacheManager.evictEntry(key1);
    expect(cacheManager.getCacheSize()).toBe(1);
  });

  it("should purge expired entries", async () => {
    const fetcher = new DataFetcher();
    const spec: DataSourceSpecification = {
      id: "test",
      type: "static",
      config: { data: { test: true } },
      cache: { ttl: 0 }, // Expires immediately
    };

    await fetcher.fetch(spec);
    expect(cacheManager.getCacheSize()).toBe(1);

    // Wait a bit
    await new Promise((resolve) => globalThis.setTimeout(resolve, 10));

    const purged = cacheManager.purgeExpired();
    expect(purged).toBe(1);
    expect(cacheManager.getCacheSize()).toBe(0);
  });
});