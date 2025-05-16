import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createStateManager } from "@/lib/state";
import {
  createOptimizedStateManager,
  defaultStateOptimizationConfig,
  type StateOptimizationConfig,
} from "./state-optimizations";

describe("state-optimizations", () => {
  let baseManager: ReturnType<typeof createStateManager>;

  beforeEach(() => {
    baseManager = createStateManager({
      initialState: { count: 0, value: "test" },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("createOptimizedStateManager", () => {
    it("batches multiple setState calls", async () => {
      const setStateSpy = vi.spyOn(baseManager, "setState");
      const optimizedManager = createOptimizedStateManager(baseManager);

      // Make multiple updates
      optimizedManager.setState({ count: 1 });
      optimizedManager.setState({ value: "updated" });
      optimizedManager.setState({ count: 2 });

      // Verify setState wasn't called immediately
      expect(setStateSpy).not.toHaveBeenCalled();

      // Fast-forward time to trigger batch flush
      vi.advanceTimersByTime(defaultStateOptimizationConfig.batchDebounceMs!);

      // Verify setState was called once with merged updates
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(setStateSpy).toHaveBeenCalledWith({
        count: 2,
        value: "updated",
      });
    });

    it("respects maxBatchSize configuration", () => {
      const setStateSpy = vi.spyOn(baseManager, "setState");
      const config: StateOptimizationConfig = {
        batchUpdates: true,
        maxBatchSize: 2,
        batchDebounceMs: 10,
      };
      const optimizedManager = createOptimizedStateManager(baseManager, config);

      // Make updates up to max batch size
      optimizedManager.setState({ count: 1 });
      optimizedManager.setState({ value: "test1" });

      // Should flush immediately when reaching max size
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(setStateSpy).toHaveBeenCalledWith({
        count: 1,
        value: "test1",
      });

      // Additional updates should start a new batch
      optimizedManager.setState({ count: 2 });
      expect(setStateSpy).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(config.batchDebounceMs!);
      expect(setStateSpy).toHaveBeenCalledTimes(2);
      expect(setStateSpy).toHaveBeenLastCalledWith({ count: 2 });
    });

    it("bypasses batching when disabled", () => {
      const setStateSpy = vi.spyOn(baseManager, "setState");
      const config: StateOptimizationConfig = {
        batchUpdates: false,
      };
      const optimizedManager = createOptimizedStateManager(baseManager, config);

      // Make updates
      optimizedManager.setState({ count: 1 });
      optimizedManager.setState({ value: "updated" });

      // Should call setState immediately
      expect(setStateSpy).toHaveBeenCalledTimes(2);
      expect(setStateSpy).toHaveBeenNthCalledWith(1, { count: 1 });
      expect(setStateSpy).toHaveBeenNthCalledWith(2, { value: "updated" });
    });

    it("supports selective subscriptions", () => {
      const config: StateOptimizationConfig = {
        selectiveSubscriptions: true,
      };
      const optimizedManager = createOptimizedStateManager(baseManager, config);

      const callback = vi.fn();
      // Use selector to only subscribe to "count" property
      const unsubscribe = optimizedManager.subscribe(callback, ["count"]);

      // Update state
      optimizedManager.setState({ count: 5, value: "ignored" });

      // Wait for batch to flush
      vi.advanceTimersByTime(defaultStateOptimizationConfig.batchDebounceMs!);

      // Callback should receive only selected state
      expect(callback).toHaveBeenCalledWith({ count: 5 });

      // Clean up
      unsubscribe();
    });

    it("returns promise that resolves when batch is flushed", async () => {
      const optimizedManager = createOptimizedStateManager(baseManager);

      const result1 = optimizedManager.setState({ count: 1 });
      const result2 = optimizedManager.setState({ value: "test" });

      // Results should be promises
      expect(result1).toBeInstanceOf(Promise);
      expect(result2).toBeInstanceOf(Promise);

      // Promises should be pending
      let resolved = false;
      Promise.all([result1, result2]).then(() => {
        resolved = true;
      });

      expect(resolved).toBe(false);

      // Advance time to flush batch
      vi.advanceTimersByTime(defaultStateOptimizationConfig.batchDebounceMs!);

      // Wait for promises to resolve
      await Promise.all([result1, result2]);
      expect(resolved).toBe(true);

      // Verify state was updated
      expect(baseManager.getState()).toEqual({
        count: 1,
        value: "test",
      });
    });
  });
});
