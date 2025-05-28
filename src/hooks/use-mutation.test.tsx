import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useMutation } from "./use-mutation";
import { StateProvider } from "../lib/state/state-context";
import { DataFetcher } from "../lib/data/data-fetcher";

// Unmock first to ensure clean state
vi.unmock("../lib/data/data-fetcher");

// Mock DataFetcher
vi.mock("../lib/data/data-fetcher", () => ({
  DataFetcher: vi.fn().mockImplementation(() => ({
    fetch: vi.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        val: { id: 1, name: "Updated" },
      })
    ),
  })),
  DataFetchError: class DataFetchError extends Error {
    constructor(
      message: string,
      public source: string,
      public cause?: unknown
    ) {
      super(message);
    }
  },
}));

describe.skip("useMutation", () => {
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: ReactNode }) => React.JSX.Element;

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <StateProvider initialState={{}} debug={true}>
          {children}
        </StateProvider>
      </QueryClientProvider>
    );

    vi.clearAllMocks();
  });

  it("should execute mutation successfully", async () => {
    // Reset the mock to ensure it's properly set up
    vi.clearAllMocks();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      val: { id: 1, name: "Updated" },
    });
    
    // Create a new DataFetcher instance with the mocked fetch
    const mockFetcher = {
      fetch: mockFetch
    };
    
    const { result } = renderHook(
      () =>
        useMutation({
          mutation: {
            id: "updateUser",
            endpoint: "/users/{id}",
            method: "PUT",
          },
          fetcher: mockFetcher as unknown as DataFetcher,
        }),
      { wrapper }
    );

    act(() => {
      result.current.mutate({ id: 1, name: "John" });
    });

    // Flush all pending promises and timers
    await vi.runAllTimersAsync();
    
    expect(mockFetch).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 2000 });
    
    expect(result.current.data).toEqual({ id: 1, name: "Updated" });
  });

  it("should apply optimistic updates", async () => {
    const mockUpdateLocalState = vi.fn();

    const { result } = renderHook(
      () =>
        useMutation({
          mutation: {
            id: "updateUser",
            endpoint: "/users/{id}",
            method: "PUT",
          },
          optimistic: {
            getOptimisticData: (variables: { id: number; name: string }) => ({
              id: variables.id,
              name: "Optimistic Name",
            }),
            updateLocalState: mockUpdateLocalState,
          },
        }),
      { wrapper }
    );

    await act(async () => {
      result.current.mutateOptimistic({ id: 1, name: "John" });
    });

    // Check optimistic update was applied
    expect(mockUpdateLocalState).toHaveBeenCalledWith(
      expect.any(Object), // Any StateManager instance
      { id: 1, name: "Optimistic Name" },
      { id: 1, name: "John" }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 1000 });
  });

  it("should invalidate queries on success", async () => {
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(
      () =>
        useMutation({
          mutation: {
            id: "updateUser",
            endpoint: "/users/{id}",
            method: "PUT",
            invalidates: ["users", "user:1"],
          },
        }),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({ id: 1, name: "John" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 1000 });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["users"] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["user:1"] });
  });

  it("should handle mutation errors", async () => {
    const ErrorClass =
      (
        DataFetcher as unknown as {
          DataFetchError?: new (message: string, operation: string) => Error;
        }
      ).DataFetchError || Error;
    const mockFetcher = new DataFetcher();
    mockFetcher.fetch = vi.fn().mockResolvedValue({
      ok: false,
      val: new ErrorClass("Request failed", "updateUser"),
    });

    const { result } = renderHook(
      () =>
        useMutation({
          mutation: {
            id: "updateUser",
            endpoint: "/users/{id}",
            method: "PUT",
          },
          fetcher: mockFetcher,
        }),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({ id: 1, name: "John" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error?.message).toBe("Request failed");
    }, { timeout: 1000 });
  });

  it("should replace variables in endpoint", async () => {
    const mockFetcher = new DataFetcher();
    mockFetcher.fetch = vi.fn().mockResolvedValue({
      ok: true,
      val: { success: true },
    });

    const { result } = renderHook(
      () =>
        useMutation({
          mutation: {
            id: "updateUser",
            endpoint: "/users/{userId}/posts/{postId}",
            method: "PUT",
          },
          fetcher: mockFetcher,
        }),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({ userId: 123, postId: 456, title: "Test" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    }, { timeout: 1000 });

    expect(mockFetcher.fetch).toHaveBeenCalledWith({
      id: "updateUser",
      type: "rest",
      config: {
        url: "/users/123/posts/456",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { userId: 123, postId: 456, title: "Test" },
      },
    });
  });
});
