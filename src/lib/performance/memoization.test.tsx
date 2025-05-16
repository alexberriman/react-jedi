import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { renderHook } from "./test-utils"; // We'll create a test utils file
import {
  shouldMemoizeComponent,
  createPropsComparator,
  createMemoizedComponent,
  useMemoizedValue,
  useMemoizedCallback,
  getRenderMetrics,
  clearRenderMetrics,
  getComponentMetrics,
  defaultMemoizationOptions,
} from "./memoization";
import type { ComponentProps } from "../../types/schema/components";

// Test components
const TestComponent = ({ spec }: ComponentProps) => {
  return React.createElement("div", null, spec.type);
};

// Helper comparison function
const numberCompareFn = (prev: { count: number }, next: { count: number }) =>
  prev.count === next.count;

// Helper callback factory
const createCallback = (value: number) => () => value;

describe("Memoization", () => {
  beforeEach(() => {
    clearRenderMetrics();
  });

  describe("shouldMemoizeComponent", () => {
    it("should return false when memoization is disabled", () => {
      const options = { ...defaultMemoizationOptions, enabled: false };
      expect(shouldMemoizeComponent("Button", options)).toBe(false);
    });

    it("should return true for components in alwaysMemoize list", () => {
      const options = {
        ...defaultMemoizationOptions,
        alwaysMemoize: ["CustomComponent"],
      };
      expect(shouldMemoizeComponent("CustomComponent", options)).toBe(true);
    });

    it("should return false for components in neverMemoize list", () => {
      const options = {
        ...defaultMemoizationOptions,
        neverMemoize: ["SimpleText"],
      };
      expect(shouldMemoizeComponent("SimpleText", options)).toBe(false);
    });

    it("should memoize interactive components by default", () => {
      expect(shouldMemoizeComponent("Button")).toBe(true);
      expect(shouldMemoizeComponent("Input")).toBe(true);
      expect(shouldMemoizeComponent("Select")).toBe(true);
      expect(shouldMemoizeComponent("Switch")).toBe(true);
    });

    it("should not memoize simple container components by default", () => {
      expect(shouldMemoizeComponent("Box")).toBe(false);
      expect(shouldMemoizeComponent("Container")).toBe(false);
      expect(shouldMemoizeComponent("Grid")).toBe(false);
    });
  });

  describe("createPropsComparator", () => {
    const comparator = createPropsComparator("TestComponent");

    it("should return true for identical props", () => {
      const props: ComponentProps = {
        spec: { type: "Test", id: "test1" },
        theme: { primary: "blue" },
        state: { count: 0 },
      };
      expect(comparator(props, props)).toBe(true);
    });

    it("should return false for different spec", () => {
      const props1: ComponentProps = {
        spec: { type: "Test", id: "test1" },
      };
      const props2: ComponentProps = {
        spec: { type: "Test", id: "test2" },
      };
      expect(comparator(props1, props2)).toBe(false);
    });

    it("should return false for different state", () => {
      const props1: ComponentProps = {
        spec: { type: "Test" },
        state: { count: 0 },
      };
      const props2: ComponentProps = {
        spec: { type: "Test" },
        state: { count: 1 },
      };
      expect(comparator(props1, props2)).toBe(false);
    });

    it("should return true for same theme reference", () => {
      const theme = { primary: "blue" };
      const props1: ComponentProps = {
        spec: { type: "Test" },
        theme,
      };
      const props2: ComponentProps = {
        spec: { type: "Test" },
        theme,
      };
      expect(comparator(props1, props2)).toBe(true);
    });

    it("should handle children comparison correctly", () => {
      const element = React.createElement("div", null, "Hello");
      const props1: ComponentProps = {
        spec: { type: "Test" },
        children: element,
      };
      const props2: ComponentProps = {
        spec: { type: "Test" },
        children: element,
      };
      expect(comparator(props1, props2)).toBe(true);
    });

    it("should return false for different children text", () => {
      const props1: ComponentProps = {
        spec: { type: "Test" },
        children: "Hello",
      };
      const props2: ComponentProps = {
        spec: { type: "Test" },
        children: "World",
      };
      expect(comparator(props1, props2)).toBe(false);
    });

    it("should handle array children comparison", () => {
      const children = [
        React.createElement("div", { key: "1" }, "Item 1"),
        React.createElement("div", { key: "2" }, "Item 2"),
      ];
      const props1: ComponentProps = {
        spec: { type: "Test" },
        children,
      };
      const props2: ComponentProps = {
        spec: { type: "Test" },
        children,
      };
      expect(comparator(props1, props2)).toBe(true);
    });
  });

  describe("createMemoizedComponent", () => {
    it("should return original component when memoization is disabled", () => {
      const options = { ...defaultMemoizationOptions, enabled: false };
      const MemoizedComponent = createMemoizedComponent(TestComponent, "Test", options);
      expect(MemoizedComponent).toBe(TestComponent);
    });

    it("should return memoized component when enabled", () => {
      const MemoizedComponent = createMemoizedComponent(TestComponent, "Test");
      expect(MemoizedComponent).not.toBe(TestComponent);
      expect(MemoizedComponent.displayName).toBe("MemoizedTest");
    });

    it("should add render tracking when trackPerformance is true", () => {
      const options = {
        ...defaultMemoizationOptions,
        trackPerformance: true,
      };
      const MemoizedComponent = createMemoizedComponent(TestComponent, "Test", options);
      expect(MemoizedComponent).not.toBe(TestComponent);
    });
  });

  describe("useMemoizedValue", () => {
    it("should memoize value based on dependencies", () => {
      const stableValue = { count: 0 };
      const newValue = { count: 1 };

      const { result, rerender } = renderHook(
        ({ value, deps }: { value: { count: number }; deps: React.DependencyList }) =>
          useMemoizedValue(value, deps),
        {
          initialProps: { value: stableValue, deps: [0] },
        }
      );

      const initialValue = result.current;

      // Same dependencies, same value reference
      rerender({ value: stableValue, deps: [0] });
      expect(result.current).toBe(initialValue);

      // Different dependencies, new value
      rerender({ value: newValue, deps: [1] });
      expect(result.current).not.toBe(initialValue);
    });

    it("should use custom comparison function", () => {
      const value1 = { count: 0 };
      const value2 = { count: 0 }; // Different reference, same count
      const value3 = { count: 1 };

      const { result, rerender } = renderHook(
        ({ value, deps }: { value: { count: number }; deps: React.DependencyList }) =>
          useMemoizedValue(value, deps, numberCompareFn),
        {
          initialProps: { value: value1, deps: [0] },
        }
      );

      const initialValue = result.current;

      // Same dependencies, same count with different reference, should return previous value
      rerender({ value: value2, deps: [0] });
      expect(result.current).toBe(initialValue);

      // Different count with same dependencies, should return new value
      rerender({ value: value3, deps: [0] });
      expect(result.current).toBe(value3);

      // Different dependencies, should return new value regardless of comparison
      rerender({ value: value2, deps: [1] });
      expect(result.current).toBe(value2);
    });
  });

  describe("useMemoizedCallback", () => {
    it("should memoize callback based on dependencies", () => {
      const { result, rerender } = renderHook(
        ({ value }: { value: number }) => useMemoizedCallback(createCallback(value), [value]),
        {
          initialProps: { value: 0 },
        }
      );

      const initialCallback = result.current;

      // Same dependency, same callback reference
      rerender({ value: 0 });
      expect(result.current).toBe(initialCallback);

      // Different dependency, new callback
      rerender({ value: 1 });
      expect(result.current).not.toBe(initialCallback);
    });
  });

  describe("render metrics", () => {
    it("should track render metrics", () => {
      // Mock performance.now
      let time = 0;
      vi.spyOn(globalThis.performance, "now").mockImplementation(() => {
        return time++;
      });

      // This is a simplified test - in real usage, metrics would be
      // collected during actual component rendering
      const metrics = getComponentMetrics("TestComponent");
      expect(metrics).toBeUndefined();

      // After clearing, metrics should be empty
      clearRenderMetrics();
      const allMetrics = getRenderMetrics();
      expect(allMetrics.size).toBe(0);

      vi.restoreAllMocks();
    });
  });
});
