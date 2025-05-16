import React, { useRef, useCallback } from "react";
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "../../../../src/lib/theme/theme-provider";
import { Box, Text, Button, Card, Heading } from "../../components";
import { presets } from "../../../../src/lib/theme/brand-presets";

// Polyfill for performance in case it's not available
const getPerformance = () => {
  if (typeof globalThis.window === "object" && globalThis.performance) {
    return globalThis.performance;
  }
  return {
    now: () => Date.now(),
    memory: undefined,
  };
};

// Component without theme - raw Tailwind classes only
const ComponentWithoutTheme: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-2">Component {i + 1}</h3>
            <p className="text-gray-600 mb-4">This is a test component without theming</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Click me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component with theme - using theme system
const ComponentWithTheme: React.FC = () => {
  return (
    <Container>
      <Box className="grid grid-cols-3 gap-4">
        {Array.from({ length: 100 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Heading asChild>
              <h3>Component {i + 1}</h3>
            </Heading>
            <Text className="mb-4">This is a test component with theming</Text>
            <Button>Click me</Button>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

// Container that's not from our component library
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container mx-auto p-4">{children}</div>
);

export interface BenchmarkResult {
  withTheme: {
    renderTime: number;
    memoryUsed: number;
    componentCount: number;
  };
  withoutTheme: {
    renderTime: number;
    memoryUsed: number;
    componentCount: number;
  };
}

type PerformanceWithMemory = Performance & {
  memory?: {
    usedJSHeapSize: number;
  };
};

export const runThemeBenchmark = async (): Promise<BenchmarkResult> => {
  const iterations = 10;
  const results: BenchmarkResult = {
    withTheme: { renderTime: 0, memoryUsed: 0, componentCount: 100 },
    withoutTheme: { renderTime: 0, memoryUsed: 0, componentCount: 100 },
  };

  const perf = getPerformance() as PerformanceWithMemory;

  // Benchmark without theme
  let totalWithoutTheme = 0;
  const memBeforeWithout = perf.memory?.usedJSHeapSize || 0;

  for (let i = 0; i < iterations; i++) {
    const start = perf.now();
    renderToString(<ComponentWithoutTheme />);
    const end = perf.now();
    totalWithoutTheme += end - start;
  }

  const memAfterWithout = perf.memory?.usedJSHeapSize || 0;
  results.withoutTheme.renderTime = totalWithoutTheme / iterations;
  results.withoutTheme.memoryUsed = (memAfterWithout - memBeforeWithout) / (1024 * 1024); // Convert to MB

  // Benchmark with theme
  let totalWithTheme = 0;
  const memBeforeWith = perf.memory?.usedJSHeapSize || 0;

  for (let i = 0; i < iterations; i++) {
    const start = perf.now();
    renderToString(
      <ThemeProvider theme={presets.modern}>
        <ComponentWithTheme />
      </ThemeProvider>
    );
    const end = perf.now();
    totalWithTheme += end - start;
  }

  const memAfterWith = perf.memory?.usedJSHeapSize || 0;
  results.withTheme.renderTime = totalWithTheme / iterations;
  results.withTheme.memoryUsed = (memAfterWith - memBeforeWith) / (1024 * 1024); // Convert to MB

  return results;
};

// Live rendering benchmark component
export const LiveBenchmark: React.FC<{
  onResults: (results: BenchmarkResult) => void;
}> = ({ onResults }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const runLiveBenchmark = useCallback(() => {
    const results: BenchmarkResult = {
      withTheme: { renderTime: 0, memoryUsed: 0, componentCount: 100 },
      withoutTheme: { renderTime: 0, memoryUsed: 0, componentCount: 100 },
    };

    const perf = getPerformance() as PerformanceWithMemory;

    // Measure without theme
    const startWithout = perf.now();
    const memBeforeWithout = perf.memory?.usedJSHeapSize || 0;

    if (containerRef.current) {
      const root = containerRef.current;
      root.innerHTML = "";
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = renderToString(<ComponentWithoutTheme />);
      root.append(tempDiv);
    }

    const endWithout = perf.now();
    const memAfterWithout = perf.memory?.usedJSHeapSize || 0;

    results.withoutTheme.renderTime = endWithout - startWithout;
    results.withoutTheme.memoryUsed = (memAfterWithout - memBeforeWithout) / (1024 * 1024);

    // Measure with theme
    const startWith = perf.now();
    const memBeforeWith = perf.memory?.usedJSHeapSize || 0;

    if (containerRef.current) {
      const root = containerRef.current;
      root.innerHTML = "";
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = renderToString(
        <ThemeProvider theme={presets.modern}>
          <ComponentWithTheme />
        </ThemeProvider>
      );
      root.append(tempDiv);
    }

    const endWith = perf.now();
    const memAfterWith = perf.memory?.usedJSHeapSize || 0;

    results.withTheme.renderTime = endWith - startWith;
    results.withTheme.memoryUsed = (memAfterWith - memBeforeWith) / (1024 * 1024);

    onResults(results);
  }, [onResults]);

  return (
    <div>
      <button
        onClick={runLiveBenchmark}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Run Live Benchmark
      </button>
      <div ref={containerRef} style={{ display: "none" }} />
    </div>
  );
};
