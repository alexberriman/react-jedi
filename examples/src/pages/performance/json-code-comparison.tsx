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
        <Heading level={2} className="text-3xl font-bold mb-4">
          Dashboard Overview
        </Heading>
        <Grid columns={3} gap={6} className="mb-8">
          <Card>
            <CardContent className="p-6">
              <Text className="text-gray-600 mb-2">Total Users</Text>
              <Heading level={3} className="text-2xl font-bold">
                1,234
              </Heading>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Text className="text-gray-600 mb-2">Revenue</Text>
              <Heading level={3} className="text-2xl font-bold">
                $45,678
              </Heading>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Text className="text-gray-600 mb-2">Growth</Text>
              <Heading level={3} className="text-2xl font-bold">
                +23%
              </Heading>
            </CardContent>
          </Card>
        </Grid>
        <Flex direction="column" gap={4}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <Box key={i} className="p-4 bg-gray-100 rounded-lg">
              <Heading level={3} className="text-lg font-semibold mb-2">
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
    <Box className="space-y-6">
      <Flex justify="between" align="center">
        <Box>
          <Heading level={3} className="text-xl font-semibold">
            JSON vs Code Performance
          </Heading>
          <Text className="text-gray-600">
            Comparing React Jedi JSON specifications against traditional React code
          </Text>
        </Box>
        <Flex gap={4} align="center">
          <Box>
            <label htmlFor="item-count" className="text-sm text-gray-600">
              Items:
            </label>
            <input
              id="item-count"
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="ml-2 px-2 py-1 border rounded"
              min={1}
              max={100}
              disabled={isRunning}
            />
          </Box>
          <Button
            onClick={runBenchmark}
            disabled={isRunning}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isRunning ? `Running (${iterations} iterations)...` : "Run Benchmark"}
          </Button>
        </Flex>
      </Flex>

      {results && (
        <Box className="space-y-6">
          <Box className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <Heading level={4} className="text-lg font-semibold mb-4">
              Results ({itemCount} items, {iterations} iterations)
            </Heading>

            <Grid columns={2} gap={6}>
              <Card>
                <CardContent className="p-4">
                  <Text className="text-sm text-gray-600 mb-1">Traditional React</Text>
                  <Text className="text-2xl font-bold text-green-600">
                    {results.codeBased.renderTime.toFixed(2)}ms
                  </Text>
                  <Text className="text-xs text-gray-500">Average render time</Text>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <Text className="text-sm text-gray-600 mb-1">React Jedi (JSON)</Text>
                  <Text className="text-2xl font-bold text-purple-600">
                    {results.jsonBased.renderTime.toFixed(2)}ms
                  </Text>
                  <Text className="text-xs text-gray-500">Average render time</Text>
                </CardContent>
              </Card>
            </Grid>

            <Box className="mt-6 p-4 bg-white rounded-lg">
              <Flex justify="between" align="center">
                <Text className="font-medium">Performance Overhead:</Text>
                <Box
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${(() => {
                    if (overhead < 30) return "bg-green-100 text-green-800";
                    if (overhead < 60) return "bg-yellow-100 text-yellow-800";
                    return "bg-red-100 text-red-800";
                  })()}`}
                >
                  {overhead > 0 ? "+" : ""}
                  {overhead.toFixed(1)}%
                </Box>
              </Flex>
            </Box>
          </Box>

          <Card>
            <CardContent className="p-6">
              <Heading level={4} className="text-lg font-semibold mb-4">
                Performance Insights
              </Heading>
              <Box className="space-y-3">
                <Flex gap={2}>
                  <Text className="text-purple-600">•</Text>
                  <Text>
                    JSON-based rendering is {overhead > 0 ? "slower" : "faster"} by{" "}
                    {Math.abs(overhead).toFixed(1)}%
                  </Text>
                </Flex>
                <Flex gap={2}>
                  <Text className="text-purple-600">•</Text>
                  <Text>
                    The overhead{" "}
                    {(() => {
                      if (overhead < 30) return "is minimal";
                      if (overhead < 60) return "is moderate";
                      return "is significant";
                    })()}{" "}
                    for {itemCount} components
                  </Text>
                </Flex>
                <Flex gap={2}>
                  <Text className="text-purple-600">•</Text>
                  <Text>
                    Server-driven UI provides flexibility at a{" "}
                    {overhead < 30 ? "small" : "reasonable"} performance cost
                  </Text>
                </Flex>
                <Flex gap={2}>
                  <Text className="text-purple-600">•</Text>
                  <Text>
                    Benefits include dynamic theming, reduced bundle size, and runtime adaptability
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
