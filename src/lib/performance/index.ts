/**
 * Performance optimization module for React Jedi
 *
 * This module provides comprehensive performance optimization features:
 * - Component memoization with smart prop comparison
 * - State update batching and optimization
 * - Render performance tracking and metrics
 * - Selective state subscriptions
 */

export * from "./memoization";
export * from "./state-optimizations";

// Re-export key functions with specific names to avoid conflicts
export {
  createMemoizedComponent,
  shouldMemoizeComponent,
  defaultMemoizationOptions,
  createPropsComparator,
  getRenderMetrics,
  clearRenderMetrics,
  getComponentMetrics,
  useMemoizedValue,
  useMemoizedCallback,
  useRenderPerformance,
  type MemoizationOptions,
  type RenderMetrics,
} from "./memoization";

export {
  createOptimizedStateManager,
  defaultStateOptimizationConfig,
  useOptimizedStateSubscription,
  useOptimizedStateValue,
  useBatchedStateUpdates,
  OptimizedStateProvider,
  useOptimizedStateContext,
  type StateOptimizationConfig,
} from "./state-optimizations";
