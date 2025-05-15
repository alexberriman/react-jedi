import React from "react";
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import type { ComponentType } from "react";

/**
 * Creates a non-generic wrapper around a component to fix type issues
 */
function createTestWrapper<P extends object>(Component: ComponentType<P>, props: P): React.ReactElement {
  return React.createElement(Component, props);
}

/**
 * Options for component benchmark tests
 */
export interface ComponentBenchmarkOptions<P extends object = Record<string, unknown>> {
  /** Component to benchmark */
  component: ComponentType<P>;
  /** Component display name for test output */
  name?: string;
  /** Initial props to render with */
  initialProps?: P;
  /** Props for update benchmarks */
  updateProps?: P;
  /** Time budget in milliseconds (max acceptable time) */
  timeBudgetMs?: number;
}

/**
 * Creates a standard benchmark test suite for a React component
 * @param options Benchmark options
 */
export function createComponentBenchmark<P extends object = Record<string, unknown>>(
  options: ComponentBenchmarkOptions<P>
): void {
  const {
    component: Component,
    name = Component.displayName || Component.name || "UnnamedComponent",
    initialProps = {} as P,
    updateProps = {} as P,
    timeBudgetMs = 16.67, // Default to 60fps threshold (1000ms / 60 = 16.67ms)
  } = options;

  describe(`${name} Benchmark`, () => {
    bench(`${name} - initial render`, () => {
      // Create wrapper to avoid generic type issues
      const wrapper = createTestWrapper(Component, initialProps);
      const { unmount } = render(wrapper);
      cleanup();
      unmount();
    });

    bench(`${name} - render update`, () => {
      const initialWrapper = createTestWrapper(Component, initialProps);
      const { rerender, unmount } = render(initialWrapper);
      const updateWrapper = createTestWrapper(Component, updateProps);
      rerender(updateWrapper);
      cleanup();
      unmount();
    });

    bench(`${name} - render -> unmount cycle`, () => {
      const wrapper = createTestWrapper(Component, initialProps);
      const { unmount } = render(wrapper);
      unmount();
      cleanup();
    });

    bench.todo(`${name} - meets performance budget (${timeBudgetMs}ms)`);
  });
}

/**
 * Creates a benchmark test that compares multiple component variants
 * @param options Benchmark configuration for each variant
 */
export function createComponentComparisonBenchmark<P extends object = Record<string, unknown>>(
  baseComponent: ComponentType<P>,
  variants: Record<string, ComponentType<P>>,
  props: P = {} as P
): void {
  const baseName = baseComponent.displayName || baseComponent.name || "BaseComponent";
  
  describe(`${baseName} Variants Comparison`, () => {
    // Benchmark base component
    bench(`${baseName} (base)`, () => {
      const wrapper = createTestWrapper(baseComponent, props);
      const { unmount } = render(wrapper);
      cleanup();
      unmount();
    });
    
    // Benchmark each variant
    for (const [variantName, VariantComponent] of Object.entries(variants)) {
      bench(`${variantName}`, () => {
        const wrapper = createTestWrapper(VariantComponent, props);
        const { unmount } = render(wrapper);
        cleanup();
        unmount();
      });
    }
  });
}

/**
 * Creates a benchmark for testing component scaling performance
 * with increasing complexity (e.g., more items in a list)
 * @param options Benchmark configuration
 */
export function createScalingBenchmark<T, P extends { items: Array<T> } & object>(
  Component: ComponentType<P>,
  baseProps: Omit<P, "items">,
  itemCounts: number[] = [10, 100, 1000]
): void {
  const name = Component.displayName || Component.name || "Component";
  
  describe(`${name} Scaling Performance`, () => {
    for (const count of itemCounts) {
      bench(`${name} with ${count} items`, () => {
        // Generate dummy items based on count
        const items = Array.from({ length: count }, (_, i) => ({
          id: `item-${i}`,
          value: `Value ${i}`,
        }));
        
        const props = {
          ...baseProps,
          items,
        } as P;
        
        const wrapper = createTestWrapper(Component, props);
        const { unmount } = render(wrapper);
        cleanup();
        unmount();
      });
    }
  });
}