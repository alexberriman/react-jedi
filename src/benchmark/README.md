# React Jedi Performance Benchmarking

This directory contains performance benchmarking tools and tests for the React Jedi component library.

## Overview

The benchmarking system helps measure and track the performance of React components, ensuring they meet performance budgets and identifying performance regressions.

## Running Benchmarks

To run all benchmarks:

```bash
npm run benchmark
```

To run benchmarks with the Vitest UI (interactive mode):

```bash
npm run benchmark:ui
```

To generate a JSON report of benchmark results:

```bash
npm run benchmark:report
```

## Creating Component Benchmarks

To benchmark a component, create a new file with the `.bench.tsx` extension in the `src/benchmark` directory.

### Basic Component Benchmark

```tsx
import { createComponentBenchmark } from "./component-benchmark";
import { YourComponent } from "@/components/your-component";

createComponentBenchmark({
  component: YourComponent,
  name: "YourComponent",
  initialProps: { /* initial props */ },
  updateProps: { /* props for update test */ },
  timeBudgetMs: 5, // performance budget in milliseconds
});
```

### Custom Benchmark Tests

For more control, create custom benchmarks:

```tsx
import { describe, bench } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { YourComponent } from "@/components/your-component";

describe("YourComponent Performance Tests", () => {
  bench("YourComponent - basic render", () => {
    const { unmount } = render(<YourComponent />);
    cleanup();
    unmount();
  });
  
  // More custom benchmarks...
});
```

## Available Utilities

The benchmarking system provides several utilities:

### `benchmarkComponent`

Function for programmatically benchmarking a component and getting detailed results.

```tsx
import { benchmarkComponent } from "./utils";
import { Button } from "@/components/ui/button";

const result = benchmarkComponent(Button, {
  iterations: 100,
  measureMemory: true,
  measureUpdates: true,
  props: { children: "Click me" },
  updateProps: { children: "Updated", disabled: true },
});

if (result.ok) {
  console.log(result.val.renderTimeMs); // Average render time in ms
  console.log(result.val.opsPerSecond); // Operations per second
}
```

### `createComponentBenchmark`

Helper function to quickly create a standardized benchmark test suite for a component.

### `createComponentComparisonBenchmark`

Helper to benchmark and compare multiple component variants.

### `createScalingBenchmark`

Helper to test how a component's performance scales with increasing data volume.

## Performance Budgets

Component performance budgets are defined as `timeBudgetMs` in the benchmark configuration:

- Simple components: 1-3ms
- Medium complexity: 3-5ms
- Complex components: 5-10ms

Anything exceeding these budgets should be optimized.

## Interpreting Results

Benchmark results include:

- **Render time**: Time to mount the component (lower is better)
- **Update time**: Time to re-render with new props (lower is better)
- **Operations per second**: How many renders can be performed per second (higher is better)
- **Memory usage**: Memory impact when rendering many instances (lower is better)

Compare these metrics over time to identify performance regressions.

## Best Practices

1. Benchmark components in isolation
2. Include tests for all component variants and sizes
3. Test with both simple and complex props
4. Run benchmarks on development environment before committing
5. Track performance changes over time
6. Focus optimization efforts on frequently used components

## Continuous Integration

Benchmarks can be run in CI to detect performance regressions automatically.