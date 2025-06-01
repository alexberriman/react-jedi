import React, { useState, useEffect, useRef, useCallback } from "react";
import { render } from "@alexberriman/react-jedi";
import { Container, Box, Flex, Grid, Text, Heading, Button, Card } from "@alexberriman/react-jedi";

export interface BenchmarkResult {
  jsonBased: {
    renderTime: number;
    memoryUsed: number;
    iterations: number;
  };
  codeBased: {
    renderTime: number;
    memoryUsed: number;
    iterations: number;
  };
}

interface BenchmarkProps {
  onResults?: (results: BenchmarkResult) => void;
  iterations?: number;
}

// JSON specification for a complex UI structure
const jsonSpecification = {
  type: "Container",
  children: [
    {
      type: "Box",
      props: {
        className: "p-8",
      },
      children: [
        {
          type: "Heading",
          props: {
            className: "text-3xl font-bold mb-4",
          },
          children: "Dashboard Overview",
        },
        {
          type: "Grid",
          props: {
            columns: 3,
            gap: 6,
            className: "mb-8",
          },
          children: [
            {
              type: "Card",
              children: [
                {
                  type: "CardContent",
                  props: {
                    className: "p-6",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className: "text-gray-600 mb-2",
                      },
                      children: "Total Users",
                    },
                    {
                      type: "Heading",
                      props: {
                        asChild: true,
                        className: "text-2xl font-bold",
                      },
                      children: {
                        type: "div",
                        children: "1,234",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "Card",
              children: [
                {
                  type: "CardContent",
                  props: {
                    className: "p-6",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className: "text-gray-600 mb-2",
                      },
                      children: "Revenue",
                    },
                    {
                      type: "Heading",
                      props: {
                        asChild: true,
                        className: "text-2xl font-bold",
                      },
                      children: {
                        type: "div",
                        children: "$45,678",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "Card",
              children: [
                {
                  type: "CardContent",
                  props: {
                    className: "p-6",
                  },
                  children: [
                    {
                      type: "Text",
                      props: {
                        className: "text-gray-600 mb-2",
                      },
                      children: "Growth",
                    },
                    {
                      type: "Heading",
                      props: {
                        asChild: true,
                        className: "text-2xl font-bold",
                      },
                      children: {
                        type: "div",
                        children: "+23%",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Flex",
          props: {
            direction: "column",
            gap: 4,
          },
          children: Array.from({ length: 10 })
            .fill(null)
            .map((_, i) => ({
              type: "Box",
              props: {
                className: "p-4 bg-gray-100 rounded-lg",
              },
              children: [
                {
                  type: "Heading",
                  props: {
                    asChild: true,
                    className: "text-lg font-semibold mb-2",
                  },
                  children: {
                    type: "h3",
                    children: `Item ${i + 1}`,
                  },
                },
                {
                  type: "Text",
                  props: {
                    className: "text-gray-600",
                  },
                  children: `Performance metrics for item ${i + 1}. Response time: ${((i + 1) * 0.03 + 0.1).toFixed(3)}s, CPU usage: ${((i + 1) * 2 + 20) % 50}%`,
                },
              ],
            })),
        },
      ],
    },
  ],
};

// Code-based React component equivalent
const CodeBasedDashboard: React.FC = () => {
  return (
    <Container>
      <Box className="p-8">
        <Heading className="text-3xl font-bold mb-4">Dashboard Overview</Heading>
        <Grid columns={3} gap={6} className="mb-8">
          <Card>
            <Box className="p-6">
              <Text className="text-gray-600 mb-2">Total Users</Text>
              <div className="text-2xl font-bold">1,234</div>
            </Box>
          </Card>
          <Card>
            <Box className="p-6">
              <Text className="text-gray-600 mb-2">Revenue</Text>
              <div className="text-2xl font-bold">$45,678</div>
            </Box>
          </Card>
          <Card>
            <Box className="p-6">
              <Text className="text-gray-600 mb-2">Growth</Text>
              <div className="text-2xl font-bold">+23%</div>
            </Box>
          </Card>
        </Grid>
        <Flex direction="column" gap={4}>
          {Array.from({ length: 10 })
            .fill(null)
            .map((_, i) => (
              <Box key={i} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Item {i + 1}</h3>
                <Text className="text-gray-600">
                  Performance metrics for item {i + 1}. Response time:{" "}
                  {((i + 1) * 0.03 + 0.1).toFixed(3)}s, CPU usage: {((i + 1) * 2 + 20) % 50}%
                </Text>
              </Box>
            ))}
        </Flex>
      </Box>
    </Container>
  );
};

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
  };
}

const measurePerformance = async (
  renderFn: () => void
): Promise<{ renderTime: number; memoryUsed: number }> => {
  const performanceWithMemory = globalThis.performance as PerformanceWithMemory;
  const hasMemoryAPI = "memory" in performanceWithMemory;
  const startMemory = hasMemoryAPI ? performanceWithMemory.memory?.usedJSHeapSize || 0 : 0;
  const startTime = globalThis.performance.now();

  renderFn();

  const endTime = globalThis.performance.now();
  const endMemory = hasMemoryAPI ? performanceWithMemory.memory?.usedJSHeapSize || 0 : 0;

  return {
    renderTime: endTime - startTime,
    memoryUsed: (endMemory - startMemory) / (1024 * 1024), // Convert to MB
  };
};

export const JsonVsCodeBenchmark: React.FC<BenchmarkProps> = ({ onResults, iterations = 100 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const runBenchmark = useCallback(async () => {
    setIsRunning(true);

    // Create separate containers for each test
    const jsonContainer = document.createElement("div");
    const codeContainer = document.createElement("div");
    jsonContainer.style.display = "none";
    codeContainer.style.display = "none";

    document.body.append(jsonContainer);
    document.body.append(codeContainer);

    const jsonResults: number[] = [];
    const codeResults: number[] = [];
    let jsonMemory = 0;
    let codeMemory = 0;

    try {
      // Warm up runs
      for (let i = 0; i < 5; i++) {
        const ReactDOM = await import("react-dom/client");
        const jsonRoot = ReactDOM.createRoot(jsonContainer);
        const codeRoot = ReactDOM.createRoot(codeContainer);

        jsonRoot.render(render(jsonSpecification));
        codeRoot.render(<CodeBasedDashboard />);

        await new Promise((resolve) => globalThis.setTimeout(resolve, 10));

        jsonRoot.unmount();
        codeRoot.unmount();
      }

      // Actual benchmark runs
      for (let i = 0; i < iterations; i++) {
        const ReactDOM = await import("react-dom/client");

        // Clear containers
        jsonContainer.innerHTML = "";
        codeContainer.innerHTML = "";

        // Measure JSON-based rendering
        const jsonStats = await measurePerformance(() => {
          const jsonRoot = ReactDOM.createRoot(jsonContainer);
          jsonRoot.render(render(jsonSpecification));
        });
        jsonResults.push(jsonStats.renderTime);
        jsonMemory += jsonStats.memoryUsed;

        // Measure code-based rendering
        const codeStats = await measurePerformance(() => {
          const codeRoot = ReactDOM.createRoot(codeContainer);
          codeRoot.render(<CodeBasedDashboard />);
        });
        codeResults.push(codeStats.renderTime);
        codeMemory += codeStats.memoryUsed;

        // Small delay between iterations
        await new Promise((resolve) => globalThis.setTimeout(resolve, 5));
      }

      const results: BenchmarkResult = {
        jsonBased: {
          renderTime: jsonResults.reduce((a, b) => a + b, 0) / jsonResults.length,
          memoryUsed: jsonMemory / iterations,
          iterations: iterations,
        },
        codeBased: {
          renderTime: codeResults.reduce((a, b) => a + b, 0) / codeResults.length,
          memoryUsed: codeMemory / iterations,
          iterations: iterations,
        },
      };

      if (onResults) {
        onResults(results);
      }
    } finally {
      // Cleanup
      jsonContainer.remove();
      codeContainer.remove();
      setIsRunning(false);
    }
  }, [iterations, onResults]);

  useEffect(() => {
    if (containerRef.current) {
      const benchmark = async () => {
        await runBenchmark();
      };
      benchmark();
    }
  }, [iterations, onResults, runBenchmark]);

  return (
    <div ref={containerRef}>
      <Flex justify="between" align="center" className="mb-4">
        <Heading asChild className="text-xl">
          <h3>JSON vs Code Performance</h3>
        </Heading>
        <Button
          onClick={runBenchmark}
          disabled={isRunning}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isRunning ? "Running Benchmark..." : "Run Benchmark"}
        </Button>
      </Flex>
      {isRunning && (
        <Box className="p-4 bg-blue-50 rounded-lg">
          <Text>Running {iterations} iterations...</Text>
        </Box>
      )}
    </div>
  );
};

export const LiveJsonVsCodeBenchmark: React.FC<BenchmarkProps> = ({ onResults }) => {
  const [result, setResult] = useState<BenchmarkResult | null>(null);

  const handleResults = (results: BenchmarkResult) => {
    setResult(results);
    if (onResults) {
      onResults(results);
    }
  };

  return (
    <Box>
      <JsonVsCodeBenchmark iterations={50} onResults={handleResults} />
      {result && (
        <Box className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <Grid columns={2} gap={4}>
            <Box>
              <Text className="font-semibold text-purple-600">JSON-based</Text>
              <Text>Render: {result.jsonBased.renderTime.toFixed(2)}ms</Text>
              <Text>Memory: {result.jsonBased.memoryUsed.toFixed(2)}MB</Text>
            </Box>
            <Box>
              <Text className="font-semibold text-pink-600">Code-based</Text>
              <Text>Render: {result.codeBased.renderTime.toFixed(2)}ms</Text>
              <Text>Memory: {result.codeBased.memoryUsed.toFixed(2)}MB</Text>
            </Box>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
