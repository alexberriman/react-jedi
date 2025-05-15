import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import type { ComponentType } from "react";
import { Result, Ok, Err } from "ts-results";

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
  document.body.appendChild(container);
  return container;
}

/**
 * Removes a DOM container after benchmarking
 * @param container DOM element to remove
 */
function removeContainer(container: HTMLDivElement): void {
  if (container && container.parentNode) {
    unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }
}

/**
 * Benchmark a React component's render performance
 * @param Component The React component to benchmark
 * @param options Benchmark options
 * @returns Result containing benchmark data or error
 */
export function benchmarkComponent<P = Record<string, unknown>>(
  Component: ComponentType<P>,
  options: BenchmarkOptions = {}
): Result<BenchmarkResult, Error> {
  try {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const container = createContainer();
    const componentName = Component.displayName || Component.name || "UnnamedComponent";
    
    // Prepare for benchmarking
    const iterations = opts.iterations || 100;
    let totalRenderTime = 0;
    let totalUpdateTime = 0;
    let totalUnmountTime = 0;
    let memoryBefore = 0;
    let memoryAfter = 0;
    
    if (opts.measureMemory && global.gc) {
      // Force garbage collection if available
      global.gc();
      memoryBefore = process.memoryUsage().heapUsed;
    }
    
    // Benchmark initial render
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      render(React.createElement(Component, opts.props as P), container);
      const end = performance.now();
      totalRenderTime += (end - start);
      
      // Cleanup between iterations
      unmountComponentAtNode(container);
    }
    
    // Benchmark updates if requested
    if (opts.measureUpdates) {
      // Render the component first
      render(React.createElement(Component, opts.props as P), container);
      
      // Then benchmark updates
      for (let i = 0; i < iterations; i++) {
        const updateStart = performance.now();
        render(React.createElement(Component, opts.updateProps as P), container);
        const updateEnd = performance.now();
        totalUpdateTime += (updateEnd - updateStart);
      }
    }
    
    // Benchmark unmount
    render(React.createElement(Component, opts.props as P), container);
    const unmountStart = performance.now();
    unmountComponentAtNode(container);
    const unmountEnd = performance.now();
    totalUnmountTime = unmountEnd - unmountStart;
    
    if (opts.measureMemory && global.gc) {
      global.gc();
      memoryAfter = process.memoryUsage().heapUsed;
    }
    
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
  benchmarks: Record<string, [ComponentType<any>, BenchmarkOptions?]>
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