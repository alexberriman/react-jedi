import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useMutation } from "./use-mutation";
import { StateContextProvider } from "../lib/state/state-context";
import { StateManager } from "../lib/state/state-management";
import { DataFetcher } from "../lib/data/data-fetcher";

// Mock DataFetcher
vi.mock("../lib/data/data-fetcher", () => ({
  DataFetcher: vi.fn().mockImplementation(() => ({
    fetch: vi.fn().mockResolvedValue({
      isOk: () => true,
      value: { id: 1, name: "Updated" },
    }),
  })),
  DataFetchError: class DataFetchError extends Error {
    constructor(message: string, public source: string, public cause?: unknown) {
      super(message);
    }
  },
}));

describe("useMutation", () => {
  let queryClient: QueryClient;
  let stateManager: StateManager;
  let wrapper: ({ children }: { children: ReactNode }) => React.JSX.Element;
  
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    stateManager = new StateManager();
    
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <StateContextProvider stateManager={stateManager}>
          {children}
        </StateContextProvider>
      </QueryClientProvider>
    );
    
    vi.clearAllMocks();
  });
  
  it("should execute mutation successfully", async () => {
    const { result } = renderHook(
      () => useMutation({
        mutation: {
          id: "updateUser",
          endpoint: "/users/{id}",
          method: "PUT",
        },
      }),
      { wrapper }
    );
    
    result.current.mutate({ id: 1, name: "John" });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual({ id: 1, name: "Updated" });
    });
  });
  
  it("should apply optimistic updates", async () => {
    const mockUpdateLocalState = vi.fn();
    
    const { result } = renderHook(
      () => useMutation({
        mutation: {
          id: "updateUser",
          endpoint: "/users/{id}",
          method: "PUT",
        },
        optimistic: {
          getOptimisticData: (variables: { id: number; name: string }) => ({ 
            id: variables.id, 
            name: "Optimistic Name" 
          }),
          updateLocalState: mockUpdateLocalState,
        },
      }),
      { wrapper }
    );
    
    result.current.mutateOptimistic({ id: 1, name: "John" });
    
    // Check optimistic update was applied
    expect(mockUpdateLocalState).toHaveBeenCalledWith(
      stateManager,
      { id: 1, name: "Optimistic Name" },
      { id: 1, name: "John" }
    );
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
  
  it("should invalidate queries on success", async () => {
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    
    const { result } = renderHook(
      () => useMutation({
        mutation: {
          id: "updateUser",
          endpoint: "/users/{id}",
          method: "PUT",
          invalidates: ["users", "user:1"],
        },
      }),
      { wrapper }
    );
    
    result.current.mutate({ id: 1, name: "John" });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["users"] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["user:1"] });
  });
  
  it("should handle mutation errors", async () => {
    const mockFetcher = new DataFetcher();
    mockFetcher.fetch = vi.fn().mockResolvedValue({
      isErr: () => true,
      error: new Error("Request failed"),
    });
    
    const { result } = renderHook(
      () => useMutation({
        mutation: {
          id: "updateUser",
          endpoint: "/users/{id}",
          method: "PUT",
        },
        fetcher: mockFetcher,
      }),
      { wrapper }
    );
    
    result.current.mutate({ id: 1, name: "John" });
    
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error?.message).toBe("Request failed");
    });
  });
  
  it("should replace variables in endpoint", async () => {
    const mockFetcher = new DataFetcher();
    mockFetcher.fetch = vi.fn().mockResolvedValue({
      isOk: () => true,
      value: { success: true },
    });
    
    const { result } = renderHook(
      () => useMutation({
        mutation: {
          id: "updateUser",
          endpoint: "/users/{userId}/posts/{postId}",
          method: "PUT",
        },
        fetcher: mockFetcher,
      }),
      { wrapper }
    );
    
    result.current.mutate({ userId: 123, postId: 456, title: "Test" });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(mockFetcher.fetch).toHaveBeenCalledWith({
      id: "updateUser",
      type: "rest",
      config: {
        endpoint: "/users/123/posts/456",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { userId: 123, postId: 456, title: "Test" },
      },
    });
  });
});