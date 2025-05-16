import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createStateManager,
  type StateManager,
  type StateManagerOptions,
} from "./state-management";

describe("State Management", () => {
  let manager: StateManager;
  const initialState = { count: 0, name: "test" };

  beforeEach(() => {
    manager = createStateManager({ initialState });
  });

  describe("createStateManager", () => {
    it("should create a state manager with initial state", () => {
      const state = manager.getState();
      expect(state).toEqual(initialState);
    });

    it("should handle empty initial state", () => {
      const emptyManager = createStateManager({ initialState: {} });
      expect(emptyManager.getState()).toEqual({});
    });
  });

  describe("setState", () => {
    it("should update state with new values", () => {
      manager.setState({ count: 5 });

      const state = manager.getState();
      expect(state.count).toBe(5);
      expect(state.name).toBe("test");
    });

    it("should merge state updates", () => {
      manager.setState({ count: 5 });
      manager.setState({ name: "updated" });

      const state = manager.getState();
      expect(state).toEqual({ count: 5, name: "updated" });
    });

    it("should handle new properties", () => {
      manager.setState({ newProp: "value" });

      const state = manager.getState();
      expect(state).toHaveProperty("newProp", "value");
    });
  });

  describe("subscribe", () => {
    it("should notify subscribers on state change", () => {
      const callback = vi.fn();
      manager.subscribe(callback);

      manager.setState({ count: 1 });

      expect(callback).toHaveBeenCalledWith({ count: 1, name: "test" });
    });

    it("should return unsubscribe function", () => {
      const callback = vi.fn();
      const unsubscribe = manager.subscribe(callback);

      unsubscribe();
      manager.setState({ count: 1 });

      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle multiple subscribers", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      manager.subscribe(callback1);
      manager.subscribe(callback2);

      manager.setState({ count: 1 });

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe("dispatch", () => {
    it("should handle SET_STATE action", () => {
      manager.dispatch({
        type: "SET_STATE",
        payload: { count: 10 },
      });

      const state = manager.getState();
      expect(state.count).toBe(10);
    });

    it("should ignore unknown actions", () => {
      const stateBefore = manager.getState();

      manager.dispatch({
        type: "UNKNOWN_ACTION",
        payload: { count: 10 },
      });

      const stateAfter = manager.getState();
      expect(stateAfter).toEqual(stateBefore);
    });
  });

  describe("reset", () => {
    it("should reset state to initial", () => {
      manager.setState({ count: 5, name: "changed" });
      manager.reset();

      const state = manager.getState();
      expect(state).toEqual(initialState);
    });

    it("should notify subscribers on reset", () => {
      const callback = vi.fn();
      manager.subscribe(callback);

      manager.setState({ count: 5 });
      callback.mockClear();

      manager.reset();

      expect(callback).toHaveBeenCalledWith(initialState);
    });
  });

  describe("computed values", () => {
    it("should compute derived values", () => {
      const options: StateManagerOptions = {
        initialState: { a: 5, b: 3 },
        computed: {
          sum: {
            dependencies: ["a", "b"],
            expression: "a + b",
          },
          product: {
            dependencies: ["a", "b"],
            expression: "a * b",
          },
        },
      };

      const computedManager = createStateManager(options);
      const state = computedManager.getState();

      expect(state.sum).toBe(8);
      expect(state.product).toBe(15);
    });

    it("should update computed values when dependencies change", () => {
      const options: StateManagerOptions = {
        initialState: { value: 10 },
        computed: {
          double: {
            dependencies: ["value"],
            expression: "value * 2",
          },
        },
      };

      const computedManager = createStateManager(options);
      computedManager.setState({ value: 20 });

      const state = computedManager.getState();
      expect(state.double).toBe(40);
    });

    it("should handle computed value errors gracefully", () => {
      const options: StateManagerOptions = {
        initialState: { value: 10 },
        computed: {
          invalid: {
            dependencies: ["value"],
            expression: "value.nonexistent.property",
          },
        },
      };

      const computedManager = createStateManager(options);
      const state = computedManager.getState();

      expect(state.invalid).toBeUndefined();
    });
  });

  describe("persistence", () => {
    it("should persist state to storage", () => {
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      // Mock global localStorage
      globalThis.localStorage = mockStorage as unknown as Storage;

      const options: StateManagerOptions = {
        initialState: { count: 0 },
        persistence: {
          type: "local",
          key: "test-state",
        },
      };

      const persistedManager = createStateManager(options);
      persistedManager.setState({ count: 5 });

      expect(mockStorage.setItem).toHaveBeenCalledWith("test-state", JSON.stringify({ count: 5 }));
    });

    it("should load persisted state on initialization", () => {
      const mockStorage = {
        getItem: vi.fn().mockReturnValue(JSON.stringify({ count: 10 })),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      globalThis.localStorage = mockStorage as unknown as Storage;

      const options: StateManagerOptions = {
        initialState: { count: 0 },
        persistence: {
          type: "local",
          key: "test-state",
        },
      };

      const persistedManager = createStateManager(options);
      const state = persistedManager.getState();

      expect(state.count).toBe(10);
    });

    it("should filter state for persistence with include", () => {
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      globalThis.localStorage = mockStorage as unknown as Storage;

      const options: StateManagerOptions = {
        initialState: { public: "yes", private: "no" },
        persistence: {
          type: "local",
          key: "test-state",
          include: ["public"],
        },
      };

      const persistedManager = createStateManager(options);
      persistedManager.setState({ public: "updated", private: "changed" });

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-state",
        JSON.stringify({ public: "updated" })
      );
    });

    it("should filter state for persistence with exclude", () => {
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      globalThis.localStorage = mockStorage as unknown as Storage;

      const options: StateManagerOptions = {
        initialState: { public: "yes", private: "no" },
        persistence: {
          type: "local",
          key: "test-state",
          exclude: ["private"],
        },
      };

      const persistedManager = createStateManager(options);
      persistedManager.setState({ public: "updated", private: "changed" });

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "test-state",
        JSON.stringify({ public: "updated" })
      );
    });
  });

  describe("debug mode", () => {
    it("should log state changes when debug is enabled", () => {
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const options: StateManagerOptions = {
        initialState: { count: 0 },
        debug: {
          enabled: true,
          logStateChanges: true,
        },
      };

      const debugManager = createStateManager(options);
      debugManager.setState({ count: 1 });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[StateManager]"),
        expect.any(Object)
      );

      consoleLogSpy.mockRestore();
    });

    it("should log actions when debug is enabled", () => {
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const options: StateManagerOptions = {
        initialState: { count: 0 },
        debug: {
          enabled: true,
          logActions: true,
        },
      };

      const debugManager = createStateManager(options);
      debugManager.dispatch({ type: "TEST_ACTION" });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining("[StateManager]"),
        expect.any(Object)
      );

      consoleLogSpy.mockRestore();
    });
  });
});
