import * as React from "react";
import { ComponentSpec, ComponentProps } from "@/types/schema/components";

/**
 * Memoization configuration options
 */
export interface MemoizationOptions {
  /**
   * Whether to enable memoization globally
   */
  enabled: boolean;

  /**
   * Component types that should always be memoized
   */
  alwaysMemoize?: string[];

  /**
   * Component types that should never be memoized
   */
  neverMemoize?: string[];

  /**
   * Maximum time (in ms) before considering a component "expensive" to render
   */
  expensiveRenderThreshold?: number;

  /**
   * Whether to track render performance metrics
   */
  trackPerformance?: boolean;
}

/**
 * Default memoization configuration
 */
export const defaultMemoizationOptions: MemoizationOptions = {
  enabled: true,
  alwaysMemoize: ["Form", "Table", "DataTable", "Chart", "Carousel"],
  neverMemoize: ["Text", "Label"],
  expensiveRenderThreshold: 5,
  trackPerformance: false,
};

/**
 * Performance metrics for component rendering
 */
export interface RenderMetrics {
  componentType: string;
  renderCount: number;
  totalRenderTime: number;
  averageRenderTime: number;
  maxRenderTime: number;
  lastRenderTime: number;
}

/**
 * Global render metrics store
 */
const renderMetrics = new Map<string, RenderMetrics>();

/**
 * Checks if a component should be memoized based on configuration
 */
export function shouldMemoizeComponent(
  componentType: string,
  options: MemoizationOptions = defaultMemoizationOptions
): boolean {
  if (!options.enabled) return false;

  // Check explicit lists
  if (options.alwaysMemoize?.includes(componentType)) return true;
  if (options.neverMemoize?.includes(componentType)) return false;

  // Default memoization rules for interactive components
  const interactiveComponents = [
    "Button",
    "Input",
    "Select",
    "Switch",
    "Checkbox",
    "RadioGroup",
    "Slider",
    "Toggle",
    "ToggleGroup",
    "Textarea",
    "Form",
  ];

  const containerComponents = ["Grid", "Flex", "Container", "Box", "Card", "AspectRatio"];

  // Check if component is expensive based on metrics
  const metrics = renderMetrics.get(componentType);
  const isExpensive =
    metrics &&
    options.expensiveRenderThreshold &&
    metrics.averageRenderTime > options.expensiveRenderThreshold;

  // Default memoization: expensive, interactive, or non-container components
  return (
    isExpensive ||
    interactiveComponents.includes(componentType) ||
    !containerComponents.includes(componentType)
  );
}

/**
 * Custom props comparator for React.memo
 *
 * This function performs a shallow comparison of props but handles
 * special cases like spec objects, children, and functions
 */
export function createPropsComparator(componentType: string) {
  return function propsAreEqual(prevProps: ComponentProps, nextProps: ComponentProps): boolean {
    // Handle spec changes
    if (!specAreEqual(prevProps.spec, nextProps.spec)) {
      return false;
    }

    // Handle theme changes
    if (!themeAreEqual(prevProps.theme, nextProps.theme)) {
      return false;
    }

    // Handle state changes
    if (!stateAreEqual(prevProps.state, nextProps.state)) {
      return false;
    }

    // Handle children changes
    if (!React.isValidElement(prevProps.children) && !React.isValidElement(nextProps.children)) {
      // For non-React elements (strings, numbers, etc.), use simple equality
      if (prevProps.children !== nextProps.children) {
        return false;
      }
    } else {
      // For React elements, compare more carefully
      if (!childrenAreEqual(prevProps.children, nextProps.children)) {
        return false;
      }
    }

    // Handle parent context changes
    return shallowEqual(prevProps.parentContext, nextProps.parentContext);
  };
}

/**
 * Compare component specifications for equality
 */
function specAreEqual(prevSpec?: ComponentSpec, nextSpec?: ComponentSpec): boolean {
  if (prevSpec === nextSpec) return true;
  if (!prevSpec || !nextSpec) return false;

  // Compare important spec properties
  const keys: (keyof ComponentSpec)[] = [
    "type",
    "id",
    "className",
    "style",
    "props",
    "events",
    "conditions",
    "state",
    "data",
    "a11y",
    "testId",
  ];

  for (const key of keys) {
    if (!shallowEqual(prevSpec[key], nextSpec[key])) {
      return false;
    }
  }

  // Special handling for children (already handled separately)
  return true;
}

/**
 * Compare themes for equality
 */
function themeAreEqual(
  prevTheme?: Record<string, unknown>,
  nextTheme?: Record<string, unknown>
): boolean {
  // For large theme objects, just check reference equality
  // Themes are typically stable and don't change often
  return prevTheme === nextTheme;
}

/**
 * Compare state for equality
 */
function stateAreEqual(
  prevState?: Record<string, unknown>,
  nextState?: Record<string, unknown>
): boolean {
  if (prevState === nextState) return true;
  if (!prevState || !nextState) return false;

  // Compare state keys and values
  const prevKeys = Object.keys(prevState);
  const nextKeys = Object.keys(nextState);

  return (
    prevKeys.length === nextKeys.length &&
    prevKeys.every((key) => key in nextState && Object.is(prevState[key], nextState[key]))
  );
}

/**
 * Compare children for equality
 */
function childrenAreEqual(prevChildren: React.ReactNode, nextChildren: React.ReactNode): boolean {
  // Use React's built-in comparison for most cases
  if (React.isValidElement(prevChildren) && React.isValidElement(nextChildren)) {
    // For React elements, check type and key
    return prevChildren.type === nextChildren.type && prevChildren.key === nextChildren.key;
  }

  // For arrays of children
  if (Array.isArray(prevChildren) && Array.isArray(nextChildren)) {
    if (prevChildren.length !== nextChildren.length) return false;

    for (const [i, prevChild] of prevChildren.entries()) {
      if (!childrenAreEqual(prevChild, nextChildren[i])) {
        return false;
      }
    }

    return true;
  }

  // For primitive values
  return Object.is(prevChildren, nextChildren);
}

/**
 * Shallow equality comparison for objects
 */
function shallowEqual(obj1: unknown, obj2: unknown): boolean {
  if (Object.is(obj1, obj2)) return true;

  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      !Object.is((obj1 as Record<string, unknown>)[key], (obj2 as Record<string, unknown>)[key])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Shallow equality comparison for arrays
 */
function shallowArrayEqual(arr1: React.DependencyList, arr2: React.DependencyList): boolean {
  if (arr1.length !== arr2.length) return false;

  for (const [i, value] of arr1.entries()) {
    if (!Object.is(value, arr2[i])) {
      return false;
    }
  }

  return true;
}

/**
 * HOC to track render performance
 */
export function withRenderTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentType: string
): React.ComponentType<P> {
  return function TrackedComponent(props: P) {
    const renderStartTime = globalThis.performance?.now() || Date.now();

    React.useEffect(() => {
      const renderEndTime = globalThis.performance?.now() || Date.now();
      const renderTime = renderEndTime - renderStartTime;

      // Update metrics
      const existing = renderMetrics.get(componentType) || {
        componentType,
        renderCount: 0,
        totalRenderTime: 0,
        averageRenderTime: 0,
        maxRenderTime: 0,
        lastRenderTime: 0,
      };

      const newMetrics: RenderMetrics = {
        componentType,
        renderCount: existing.renderCount + 1,
        totalRenderTime: existing.totalRenderTime + renderTime,
        averageRenderTime: (existing.totalRenderTime + renderTime) / (existing.renderCount + 1),
        maxRenderTime: Math.max(existing.maxRenderTime, renderTime),
        lastRenderTime: renderTime,
      };

      renderMetrics.set(componentType, newMetrics);
    });

    return React.createElement(Component, props);
  };
}

/**
 * Get render metrics for all components
 */
export function getRenderMetrics(): Map<string, RenderMetrics> {
  return new Map(renderMetrics);
}

/**
 * Clear all render metrics
 */
export function clearRenderMetrics(): void {
  renderMetrics.clear();
}

/**
 * Get render metrics for a specific component
 */
export function getComponentMetrics(componentType: string): RenderMetrics | undefined {
  return renderMetrics.get(componentType);
}

/**
 * Creates a memoized version of a component with custom comparison
 */
export function createMemoizedComponent<P extends ComponentProps>(
  Component: React.ComponentType<P>,
  componentType: string,
  options: MemoizationOptions = defaultMemoizationOptions
): React.ComponentType<P> {
  if (!shouldMemoizeComponent(componentType, options)) {
    return Component;
  }

  // Only memoize function components
  if (typeof Component !== "function") {
    return Component;
  }

  const MemoizedComponent = React.memo(
    Component as React.FunctionComponent<P>,
    createPropsComparator(componentType) as (prevProps: P, nextProps: P) => boolean
  );

  // Add display name for debugging
  MemoizedComponent.displayName = `Memoized${componentType}`;

  // Optionally add render tracking
  if (options.trackPerformance) {
    return withRenderTracking(MemoizedComponent as React.ComponentType<P>, componentType);
  }

  return MemoizedComponent as React.ComponentType<P>;
}

/**
 * Hook to use memoization for a value
 */
export function useMemoizedValue<T>(
  value: T,
  dependencies: React.DependencyList,
  compareFn?: (prevValue: T, nextValue: T) => boolean
): T {
  const previousValueRef = React.useRef<T>(value);
  const previousDepsRef = React.useRef(dependencies);

  // Determine if dependencies have changed
  const depsChanged = !shallowArrayEqual(previousDepsRef.current, dependencies);

  if (depsChanged) {
    previousDepsRef.current = dependencies;
    previousValueRef.current = value;
    return value;
  }

  // Dependencies haven't changed
  if (compareFn) {
    // Use custom comparison function
    if (compareFn(previousValueRef.current, value)) {
      return previousValueRef.current;
    }
  } else {
    // Default object reference equality
    if (previousValueRef.current === value) {
      return previousValueRef.current;
    }
  }

  // Value has changed even though deps haven't
  previousValueRef.current = value;
  return value;
}

/**
 * Hook to use memoized callbacks with proper dependency tracking
 */
export function useMemoizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  dependencies: React.DependencyList
): T {
  // Store callback in ref
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  // Track dependencies change
  const previousDepsRef = React.useRef(dependencies);
  const depsChanged = !shallowArrayEqual(previousDepsRef.current, dependencies);
  previousDepsRef.current = dependencies;

  // Create stable callback reference
  const stableCallbackRef = React.useRef<T>();
  if (!stableCallbackRef.current || depsChanged) {
    stableCallbackRef.current = ((...args: Parameters<T>) => callbackRef.current(...args)) as T;
  }

  return stableCallbackRef.current;
}

/**
 * Hook to get component render performance
 */
export function useRenderPerformance(componentType: string): RenderMetrics | undefined {
  const [metrics, setMetrics] = React.useState(() => getComponentMetrics(componentType));

  React.useEffect(() => {
    const interval = globalThis.setInterval(() => {
      setMetrics(getComponentMetrics(componentType));
    }, 1000);

    return () => globalThis.clearInterval(interval);
  }, [componentType]);

  return metrics;
}
