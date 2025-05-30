import React, { useState } from "react";
import { render } from "@banja/react-jedi";
import {
  Container,
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Button,
  Card,
  CardContent,
} from "@banja/react-jedi";

export interface JsonCodeComparisonResult {
  jsonBased: {
    renderTime: number;
    iterations: number;
  };
  codeBased: {
    renderTime: number;
    iterations: number;
  };
}

// JSON specification for a complex UI structure
const createJsonSpecification = (itemCount: number) => ({
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
            level: 2,
            className: "text-3xl font-bold mb-4",
          },
          children: ["Dashboard Overview"],
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
                  props: { className: "p-6" },
                  children: [
                    {
                      type: "Text",
                      props: { className: "text-gray-600 mb-2" },
                      children: ["Total Users"],
                    },
                    {
                      type: "Heading",
                      props: { level: 3, className: "text-2xl font-bold" },
                      children: ["1,234"],
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
                  props: { className: "p-6" },
                  children: [
                    {
                      type: "Text",
                      props: { className: "text-gray-600 mb-2" },
                      children: ["Revenue"],
                    },
                    {
                      type: "Heading",
                      props: { level: 3, className: "text-2xl font-bold" },
                      children: ["$45,678"],
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
                  props: { className: "p-6" },
                  children: [
                    {
                      type: "Text",
                      props: { className: "text-gray-600 mb-2" },
                      children: ["Growth"],
                    },
                    {
                      type: "Heading",
                      props: { level: 3, className: "text-2xl font-bold" },
                      children: ["+23%"],
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
          children: Array.from({ length: itemCount }).map((_, i) => ({
            type: "Box",
            props: {
              className: "p-4 bg-gray-100 rounded-lg",
            },
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  className: "text-lg font-semibold mb-2",
                },
                children: [`Item ${i + 1}`],
              },
              {
                type: "Text",
                props: {
                  className: "text-gray-600",
                },
                children: [
                  `Processing ${(i + 1) * 125} operations/sec, Memory: ${((i + 1) * 0.5 + 5).toFixed(1)}MB`,
                ],
              },
            ],
          })),
        },
      ],
    },
  ],
});

// Code-based React component equivalent
const CodeBasedDashboard: React.FC<{ itemCount: number }> = ({ itemCount }) => {
  return (
    <Container>
      <Box className="p-8">
        <Heading level="h2" className="text-3xl font-bold mb-4">
          Dashboard Overview
        </Heading>
        <Grid columns={3} gap={6} className="mb-8">
          <Card>
            <CardContent className="p-6">
              <Text className="text-gray-600 mb-2">Total Users</Text>
              <Heading level="h3" className="text-2xl font-bold">
                1,234
              </Heading>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Text className="text-gray-600 mb-2">Revenue</Text>
              <Heading level="h3" className="text-2xl font-bold">
                $45,678
              </Heading>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Text className="text-gray-600 mb-2">Growth</Text>
              <Heading level="h3" className="text-2xl font-bold">
                +23%
              </Heading>
            </CardContent>
          </Card>
        </Grid>
        <Flex direction="column" gap={4}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <Box key={i} className="p-4 bg-gray-100 rounded-lg">
              <Heading level="h3" className="text-lg font-semibold mb-2">
                Item {i + 1}
              </Heading>
              <Text className="text-gray-600">
                Processing {(i + 1) * 125} operations/sec, Memory: {((i + 1) * 0.5 + 5).toFixed(1)}
                MB
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Container>
  );
};

export const JsonCodeComparison: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<JsonCodeComparisonResult | null>(null);
  const [itemCount, setItemCount] = useState(20);
  const iterations = 50;

  const runBenchmark = async () => {
    setIsRunning(true);

    const jsonTimes: number[] = [];
    const codeTimes: number[] = [];

    // Create test container
    const testContainer = document.createElement("div");
    testContainer.style.display = "none";
    document.body.append(testContainer);

    try {
      // Run benchmarks
      for (let i = 0; i < iterations; i++) {
        // Clear container
        testContainer.innerHTML = "";

        // Measure JSON-based rendering
        const jsonStart = globalThis.performance.now();
        const jsonRoot = document.createElement("div");
        testContainer.append(jsonRoot);
        const ReactDOM = await import("react-dom/client");
        const root1 = ReactDOM.createRoot(jsonRoot);
        root1.render(render(createJsonSpecification(itemCount)));
        const jsonEnd = globalThis.performance.now();
        jsonTimes.push(jsonEnd - jsonStart);

        // Clear for next test
        root1.unmount();
        testContainer.innerHTML = "";

        // Measure code-based rendering
        const codeStart = globalThis.performance.now();
        const codeRoot = document.createElement("div");
        testContainer.append(codeRoot);
        const root2 = ReactDOM.createRoot(codeRoot);
        root2.render(<CodeBasedDashboard itemCount={itemCount} />);
        const codeEnd = globalThis.performance.now();
        codeTimes.push(codeEnd - codeStart);

        root2.unmount();

        // Small delay between iterations
        await new Promise((resolve) => globalThis.setTimeout(resolve, 10));
      }

      const avgJsonTime = jsonTimes.reduce((a, b) => a + b, 0) / jsonTimes.length;
      const avgCodeTime = codeTimes.reduce((a, b) => a + b, 0) / codeTimes.length;

      setResults({
        jsonBased: {
          renderTime: avgJsonTime,
          iterations,
        },
        codeBased: {
          renderTime: avgCodeTime,
          iterations,
        },
      });
    } finally {
      testContainer.remove();
      setIsRunning(false);
    }
  };

  const overhead = results
    ? ((results.jsonBased.renderTime - results.codeBased.renderTime) /
        results.codeBased.renderTime) *
      100
    : 0;

  return (
    <Box className="space-y-8">
      <Flex justify="between" align="center" className="flex-col sm:flex-row gap-4">
        <Box>
          <Heading level="h3" className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            JSON vs Code Performance
          </Heading>
          <Text className="text-zinc-600 dark:text-zinc-400">
            Comparing React Jedi JSON specifications against traditional React code
          </Text>
        </Box>
        <Flex gap={4} align="center">
          <Box className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2">
            <label htmlFor="item-count" className="text-sm text-zinc-600 dark:text-zinc-400">
              Items:
            </label>
            <input
              id="item-count"
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="ml-2 px-2 py-1 bg-transparent border-0 text-zinc-900 dark:text-white font-medium w-16 text-center"
              min={1}
              max={100}
              disabled={isRunning}
            />
          </Box>
          <Button
            onClick={runBenchmark}
            disabled={isRunning}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-3 rounded-lg transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? `Running (${iterations} iterations)...` : "Run Benchmark"}
          </Button>
        </Flex>
      </Flex>

      {results && (
        <Box className="space-y-8">
          <Box className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl p-8">
            <Heading level="h4" className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Benchmark Results
            </Heading>
            <Text className="text-zinc-600 dark:text-zinc-400 mb-8">
              {itemCount} components × {iterations} iterations
            </Text>

            <Grid columns={2} gap={6} className="mb-8">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
                <CardContent className="p-6">
                  <Box className="inline-flex p-3 bg-green-500 text-white rounded-lg mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </Box>
                  <Text className="text-zinc-600 dark:text-zinc-400 mb-1">Traditional React</Text>
                  <Text className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {results.codeBased.renderTime.toFixed(2)}ms
                  </Text>
                  <Text className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Average render time</Text>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
                <CardContent className="p-6">
                  <Box className="inline-flex p-3 bg-purple-500 text-white rounded-lg mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </Box>
                  <Text className="text-zinc-600 dark:text-zinc-400 mb-1">React Jedi (JSON)</Text>
                  <Text className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {results.jsonBased.renderTime.toFixed(2)}ms
                  </Text>
                  <Text className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Average render time</Text>
                </CardContent>
              </Card>
            </Grid>

            <Box className="p-6 bg-white dark:bg-zinc-900 rounded-xl">
              <Flex justify="between" align="center">
                <Text className="font-medium text-zinc-700 dark:text-zinc-300">Performance Overhead:</Text>
                <Box
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${(() => {
                    if (overhead < 30) return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
                    if (overhead < 60) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400";
                    return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
                  })()}`}
                >
                  {overhead > 0 ? "+" : ""}
                  {overhead.toFixed(1)}%
                </Box>
              </Flex>
            </Box>
          </Box>

          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-0">
            <CardContent className="p-8">
              <Flex align="center" gap={3} className="mb-6">
                <Box className="inline-flex p-3 bg-indigo-500 text-white rounded-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Box>
                <Heading level="h4" className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Performance Analysis
                </Heading>
              </Flex>
              <Box className="space-y-4">
                <Flex gap={3} align="start">
                  <Box className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <Text className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    JSON-based rendering is {overhead > 0 ? "slower" : "faster"} by{" "}
                    <span className="font-bold">{Math.abs(overhead).toFixed(1)}%</span> compared to traditional React components.
                  </Text>
                </Flex>
                <Flex gap={3} align="start">
                  <Box className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <Text className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    The overhead is {(() => {
                      if (overhead < 30) return <span className="font-bold text-green-600 dark:text-green-400">minimal</span>;
                      if (overhead < 60) return <span className="font-bold text-yellow-600 dark:text-yellow-400">moderate</span>;
                      return <span className="font-bold text-red-600 dark:text-red-400">significant</span>;
                    })()} for {itemCount} components, making it suitable for {overhead < 60 ? "production" : "specific"} use cases.
                  </Text>
                </Flex>
                <Flex gap={3} align="start">
                  <Box className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <Text className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Server-driven UI provides unmatched flexibility at a {overhead < 30 ? "minimal" : "reasonable"} performance cost.
                  </Text>
                </Flex>
                <Flex gap={3} align="start">
                  <Box className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <Text className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Key benefits include dynamic theming, reduced bundle size, runtime adaptability, and zero lock-in architecture.
                  </Text>
                </Flex>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};
