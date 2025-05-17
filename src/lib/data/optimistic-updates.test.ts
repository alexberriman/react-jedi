import { describe, it, expect, vi, beforeEach } from "vitest";
import { createOptimisticMutation, createOptimisticUpdater, optimisticMutate } from "./optimistic-updates";
import { createStateManager, type StateManager } from "../state/state-management";
import { DataFetchError } from "./data-fetcher";

describe("Optimistic Updates", () => {
  let stateManager: StateManager;
  
  beforeEach(() => {
    stateManager = createStateManager({
      initialState: {},
    });
  });
  
  describe("createOptimisticMutation", () => {
    it("should apply optimistic update on mutation start", async () => {
      const mockMutationFn = vi.fn().mockResolvedValue({ id: 1, name: "Updated" });
      const mockUpdateLocalState = vi.fn();
      
      const options = createOptimisticMutation({
        mutationFn: mockMutationFn,
        optimistic: {
          getOptimisticData: (variables: { id: number }) => ({ id: variables.id, name: "Optimistic" }),
          updateLocalState: mockUpdateLocalState,
        },
      }, stateManager);
      
      // Execute onMutate
      const context = await options.onMutate?.({ id: 1 });
      
      expect(mockUpdateLocalState).toHaveBeenCalledWith(
        stateManager,
        { id: 1, name: "Optimistic" },
        { id: 1 }
      );
      expect(context).toHaveProperty("optimisticData");
      expect(context).toHaveProperty("previousSnapshot");
    });
    
    it("should rollback on error using snapshot", async () => {
      const initialState = { user: { id: 1, name: "Original" } };
      stateManager.setState({ user: initialState.user });
      
      const options = createOptimisticMutation({
        mutationFn: vi.fn().mockRejectedValue(new Error("Failed")),
        optimistic: {
          getOptimisticData: () => ({ id: 1, name: "Optimistic" }),
          updateLocalState: (sm, data) => sm.setState({ user: data }),
        },
      }, stateManager);
      
      // Apply optimistic update
      const context = await options.onMutate?.({ id: 1 });
      expect(stateManager.getState().user).toEqual({ id: 1, name: "Optimistic" });
      
      // Trigger rollback
      const error = new DataFetchError("Failed", "test");
      options.onError?.(error, { id: 1 }, context);
      
      // Check state is restored
      expect(stateManager.getState().user).toEqual(initialState.user);
    });
    
    it("should use custom rollback function if provided", async () => {
      const mockRollback = vi.fn();
      
      const options = createOptimisticMutation({
        mutationFn: vi.fn(),
        optimistic: {
          getOptimisticData: () => ({}),
          rollback: mockRollback,
        },
      }, stateManager);
      
      const error = new DataFetchError("Failed", "test");
      options.onError?.(error, { id: 1 }, {});
      
      expect(mockRollback).toHaveBeenCalledWith(stateManager, error, { id: 1 });
    });
    
    it("should handle success without cache invalidation", async () => {
      // Cache invalidation is handled by React Query, not in the optimistic update
      const onSuccessMock = vi.fn();
      
      const options = createOptimisticMutation({
        mutationFn: vi.fn().mockResolvedValue({ success: true }),
        optimistic: {
          getOptimisticData: () => ({}),
          invalidateKeys: ["users", "user:1"], // These are passed to React Query
        },
        onSuccess: onSuccessMock,
      }, stateManager);
      
      options.onSuccess?.({ success: true }, {}, {});
      
      // The original onSuccess should be called
      expect(onSuccessMock).toHaveBeenCalledWith({ success: true }, {}, {});
    });
  });
  
  describe("createOptimisticUpdater", () => {
    it("should create an updater function", () => {
      const updater = createOptimisticUpdater<{ count: number }, { increment: number }>(
        (current, variables) => ({ count: current.count + variables.increment })
      );
      
      const result = updater({ 
        increment: 5,
        current: { count: 10 }
      } as { increment: number; current: { count: number } });
      
      expect(result).toEqual({ count: 15 });
    });
  });
  
  describe("optimisticMutate", () => {
    it("should return Ok result on success", async () => {
      const mockMutationFn = vi.fn().mockResolvedValue({ success: true });
      
      const result = await optimisticMutate(mockMutationFn, { id: 1 });
      
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.val).toEqual({ success: true });
      }
    });
    
    it("should return Err result on failure", async () => {
      const mockError = new Error("Failed");
      const mockMutationFn = vi.fn().mockRejectedValue(mockError);
      
      const result = await optimisticMutate(mockMutationFn, { id: 1 });
      
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.val).toBeInstanceOf(DataFetchError);
        expect(result.val.message).toBe("Mutation failed");
        expect(result.val.cause).toBe(mockError);
      }
    });
  });
});