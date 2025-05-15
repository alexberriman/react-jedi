import React from "react";
import { createRoot } from "react-dom/client";
import type { ComponentType } from "react";
import { Result, Ok, Err } from "ts-results";

/**
 * Creates a non-generic wrapper around a component to fix type issues
 */
function createTestWrapper<P extends object>(Component: ComponentType<P>, props: P): React.ReactElement {
  return React.createElement(Component, props);
}

// Define a type for performance measurement
type TimeMeasurement = {
  now: () => number;
};

/**
 * Benchmark result containing timing information
 */
export interface BenchmarkResult {
  /** Component name that was benchmarked */
  componentName: string;
  /** Render time in milliseconds */
  renderTimeMs: number;
  /** Update time in milliseconds (if applicable) */
  updateTimeMs?: number;
  /** Unmount time in milliseconds */
  unmountTimeMs: number;
  /** Total operations count */
  operationsCount: number;
  /** Operations per second */
  opsPerSecond: number;
  /** Memory usage in bytes */
  memoryUsageBytes?: number;
  /** Timestamp when the benchmark was run */
  timestamp: string;
}

/**
 * Options for component benchmarking
 */
export interface BenchmarkOptions {
  /** Number of iterations to run (higher gives more accurate results) */
  iterations?: number;
  /** Whether to measure memory usage (may affect performance) */
  measureMemory?: boolean;
  /** Whether to measure component updates */
  measureUpdates?: boolean;
  /** Custom props to pass to the component */
  props?: Record<string, unknown>;
  /** Props to use for update measurements */
  updateProps?: Record<string, unknown>;
}

/**
 * Default benchmark options
 */
const DEFAULT_OPTIONS: BenchmarkOptions = {
  iterations: 100,
  measureMemory: false,
  measureUpdates: true,
  props: {},
  updateProps: {},
};

/**
 * Creates a DOM container for benchmarking
 * @returns DOM element to use for rendering
 */
function createContainer(): HTMLDivElement {
  const container = document.createElement("div");
  document.body.append(container);
  return container;
}

/**
 * Removes a DOM container after benchmarking
 * @param container DOM element to remove
 */
function removeContainer(container: HTMLDivElement): void {
  if (container) {
    container.remove();
  }
}

/**
 * Measure the memory usage if garbage collection is available
 * @returns The current memory usage in bytes
 */
function measureMemory(): number {
  if (typeof globalThis !== "undefined" && "gc" in globalThis) {
    ((globalThis as unknown) as { gc: () => void }).gc();
    return process.memoryUsage().heapUsed;
  }
  return 0;
}

/**
 * Perform render benchmarking
 * @param Component The component to render
 * @param props The props to pass to the component
 * @param container The DOM container
 * @param iterations Number of iterations to perform
 * @param timer The time measurement function
 * @returns Total render time in ms
 */
function benchmarkRender<P extends object>(
  Component: ComponentType<P>,
  props: P,
  container: HTMLDivElement,
  iterations: number,
  timer: TimeMeasurement
): number {
  let totalRenderTime = 0;
  
  for (let i = 0; i < iterations; i++) {
    const start = timer.now();
    const root = createRoot(container);
    const wrapper = createTestWrapper(Component, props);
    root.render(wrapper);
    const end = timer.now();
    totalRenderTime += (end - start);
    
    // Cleanup between iterations
    root.unmount();
  }
  
  return totalRenderTime;
}

/**
 * Perform update benchmarking
 * @param Component The component to update
 * @param initialProps The initial props
 * @param updateProps The props for updates
 * @param container The DOM container
 * @param iterations Number of iterations to perform
 * @param timer The time measurement function
 * @returns Total update time in ms
 */
function benchmarkUpdate<P extends object>(
  Component: ComponentType<P>,
  initialProps: P,
  updateProps: P,
  container: HTMLDivElement,
  iterations: number,
  timer: TimeMeasurement
): number {
  let totalUpdateTime = 0;
  
  // Render the component first
  const root = createRoot(container);
  const initialWrapper = createTestWrapper(Component, initialProps);
  root.render(initialWrapper);
  
  // Then benchmark updates
  for (let i = 0; i < iterations; i++) {
    const updateStart = timer.now();
    const updateWrapper = createTestWrapper(Component, updateProps);
    root.render(updateWrapper);
    const updateEnd = timer.now();
    totalUpdateTime += (updateEnd - updateStart);
  }
  
  // Clean up after updates
  root.unmount();
  
  return totalUpdateTime;
}

/**
 * Perform unmount benchmarking
 * @param Component The component to unmount
 * @param props The props to pass to the component
 * @param container The DOM container
 * @param timer The time measurement function
 * @returns Unmount time in ms
 */
function benchmarkUnmount<P extends object>(
  Component: ComponentType<P>,
  props: P,
  container: HTMLDivElement,
  timer: TimeMeasurement
): number {
  const root = createRoot(container);
  const wrapper = createTestWrapper(Component, props);
  root.render(wrapper);
  
  const unmountStart = timer.now();
  root.unmount();
  const unmountEnd = timer.now();
  
  return unmountEnd - unmountStart;
}

/**
 * Benchmark a React component's render performance
 * @param Component The React component to benchmark
 * @param options Benchmark options
 * @returns Result containing benchmark data or error
 */
export function benchmarkComponent<P extends object = Record<string, unknown>>(
  Component: ComponentType<P>,
  options: BenchmarkOptions = {}
): Result<BenchmarkResult, Error> {
  try {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const container = createContainer();
    const componentName = Component.displayName || Component.name || "UnnamedComponent";
    
    // Prepare for benchmarking
    const iterations = opts.iterations || 100;
    // Create a timer for measurement
    let timer: TimeMeasurement = { now: Date.now };
    
    // Use performance API if available
    if (typeof globalThis !== "undefined" && 
        globalThis && 
        globalThis.performance) {
      timer = globalThis.performance;
    }
    
    // Measure memory before if requested
    const memoryBefore = opts.measureMemory ? measureMemory() : 0;
    
    // Benchmark render, update, and unmount operations
    const totalRenderTime = benchmarkRender(
      Component, 
      opts.props as P, 
      container, 
      iterations, 
      timer
    );
    
    const totalUpdateTime = opts.measureUpdates 
      ? benchmarkUpdate(
          Component, 
          opts.props as P, 
          opts.updateProps as P, 
          container, 
          iterations, 
          timer
        ) 
      : 0;
    
    const totalUnmountTime = benchmarkUnmount(
      Component, 
      opts.props as P, 
      container, 
      timer
    );
    
    // Measure memory after if requested
    const memoryAfter = opts.measureMemory ? measureMemory() : 0;
    
    // Calculate final results
    const avgRenderTime = totalRenderTime / iterations;
    const avgUpdateTime = opts.measureUpdates ? totalUpdateTime / iterations : undefined;
    const memoryUsage = opts.measureMemory ? memoryAfter - memoryBefore : undefined;
    const operationsCount = opts.measureUpdates ? iterations * 2 : iterations;
    const totalTime = totalRenderTime + (totalUpdateTime || 0);
    const opsPerSecond = operationsCount / (totalTime / 1000);
    
    removeContainer(container);
    
    return Ok({
      componentName,
      renderTimeMs: avgRenderTime,
      updateTimeMs: avgUpdateTime,
      unmountTimeMs: totalUnmountTime,
      operationsCount,
      opsPerSecond,
      memoryUsageBytes: memoryUsage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Format benchmark results as a human-readable string
 * @param result The benchmark result to format
 * @returns Formatted string representation of the results
 */
export function formatBenchmarkResult(result: BenchmarkResult): string {
  const { 
    componentName, 
    renderTimeMs, 
    updateTimeMs, 
    unmountTimeMs, 
    opsPerSecond,
    memoryUsageBytes
  } = result;
  
  let output = `Benchmark: ${componentName}\n`;
  output += `  Render time: ${renderTimeMs.toFixed(3)}ms\n`;
  
  if (updateTimeMs !== undefined) {
    output += `  Update time: ${updateTimeMs.toFixed(3)}ms\n`;
  }
  
  output += `  Unmount time: ${unmountTimeMs.toFixed(3)}ms\n`;
  output += `  Operations/sec: ${Math.round(opsPerSecond)}\n`;
  
  if (memoryUsageBytes !== undefined) {
    const memoryInMB = memoryUsageBytes / (1024 * 1024);
    output += `  Memory delta: ${memoryInMB.toFixed(2)}MB\n`;
  }
  
  return output;
}

/**
 * Runs a suite of benchmarks and returns combined results
 * @param benchmarks Map of benchmark names to component/options pairs
 * @returns Results for all benchmarks
 */
export async function runBenchmarkSuite(
  benchmarks: Record<string, [ComponentType<Record<string, unknown> & object>, BenchmarkOptions?]>
): Promise<Record<string, BenchmarkResult>> {
  const results: Record<string, BenchmarkResult> = {};
  
  for (const [name, [Component, options]] of Object.entries(benchmarks)) {
    const result = benchmarkComponent(Component, options);
    
    if (result.ok) {
      results[name] = result.val;
    } else {
      console.error(`Benchmark '${name}' failed:`, result.val);
    }
  }
  
  return results;
}

/**
 * Saves benchmark results to local storage for trending
 * @param result Benchmark result to save
 * @param storageKey Key to use for local storage
 */
export function saveBenchmarkResult(result: BenchmarkResult, storageKey: string): void {
  if (typeof localStorage !== "undefined") {
    try {
      // Get existing results
      const existingData = localStorage.getItem(storageKey);
      const existingResults = existingData ? JSON.parse(existingData) : [];
      
      // Add new result
      existingResults.push(result);
      
      // Save back to storage (keep last 100 results)
      localStorage.setItem(
        storageKey, 
        JSON.stringify(existingResults.slice(-100))
      );
    } catch (error) {
      console.error("Failed to save benchmark result to local storage:", error);
    }
  }
}

/**
 * Gets benchmark history from local storage
 * @param storageKey Key to retrieve from local storage
 * @returns Array of historical benchmark results
 */
export function getBenchmarkHistory(storageKey: string): BenchmarkResult[] {
  if (typeof localStorage !== "undefined") {
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to retrieve benchmark history:", error);
      return [];
    }
  }
  return [];
}