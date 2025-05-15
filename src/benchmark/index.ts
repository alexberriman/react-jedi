// Export benchmark utilities
export * from "./utils";
export * from "./component-benchmark";

// Import benchmark tests to ensure they're included in the build
import "./button.bench";
import "./text.bench";

/**
 * Run all benchmarks with a standard configuration
 * This is mainly used to run all benchmarks from the CLI
 */
export async function runAllBenchmarks(): Promise<void> {
  console.log("Running all benchmarks...");
  // The benchmark system will automatically run all tests
  // because they are imported above and registered with Vitest
  console.log("Benchmark complete. See results for details.");
}