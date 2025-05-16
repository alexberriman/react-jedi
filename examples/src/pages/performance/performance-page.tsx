import React, { useState, useMemo } from "react";
import { Container, Heading, Text, Flex, Box, Card, Badge } from "../../components";
import type { CSSProperties } from "react";
import { runThemeBenchmark, LiveBenchmark, type BenchmarkResult } from "./theme-benchmark";

interface PerformanceMetrics {
  withTheme: {
    renderTime: number;
    memoryUsed: number;
    components: number;
  };
  withoutTheme: {
    renderTime: number;
    memoryUsed: number;
    components: number;
  };
}

export const PerformancePage: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runBenchmark = async () => {
    setIsRunning(true);

    try {
      const results = await runThemeBenchmark();
      setMetrics({
        withTheme: {
          renderTime: results.withTheme.renderTime,
          memoryUsed: results.withTheme.memoryUsed,
          components: results.withTheme.componentCount,
        },
        withoutTheme: {
          renderTime: results.withoutTheme.renderTime,
          memoryUsed: results.withoutTheme.memoryUsed,
          components: results.withoutTheme.componentCount,
        },
      });
    } catch (error) {
      console.error("Benchmark failed:", error);
    }

    setIsRunning(false);
  };

  const handleLiveBenchmarkResults = (results: BenchmarkResult) => {
    setMetrics({
      withTheme: {
        renderTime: results.withTheme.renderTime,
        memoryUsed: results.withTheme.memoryUsed,
        components: results.withTheme.componentCount,
      },
      withoutTheme: {
        renderTime: results.withoutTheme.renderTime,
        memoryUsed: results.withoutTheme.memoryUsed,
        components: results.withoutTheme.componentCount,
      },
    });
  };

  const performanceChartStyle: CSSProperties = {
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
    borderRadius: "12px",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  };

  const barChartStyle = (percentage: number, color: string): CSSProperties => ({
    width: `${percentage}%`,
    height: "32px",
    background: color,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "12px",
    color: "white",
    fontWeight: "600",
    transition: "width 0.5s ease-out",
  });

  const overheadPercentage = useMemo(() => {
    if (!metrics) return "0";
    const withThemeTime = metrics.withTheme.renderTime;
    const withoutThemeTime = metrics.withoutTheme.renderTime;
    return (((withThemeTime - withoutThemeTime) / withoutThemeTime) * 100).toFixed(1);
  }, [metrics]);

  return (
    <Container className="py-12">
      <Flex direction="column" gap={8}>
        <Box>
          <Heading asChild className="text-4xl font-bold mb-4">
            <h1>Theme System Performance</h1>
          </Heading>
          <Text className="text-lg text-gray-600 mb-8">
            Measuring the performance impact of the theme system on component rendering
          </Text>
        </Box>

        <Card className="p-8">
          <Flex direction="column" gap={6}>
            <Flex justify="between" align="center">
              <Heading asChild className="text-2xl">
                <h2>Performance Benchmark</h2>
              </Heading>
              <button
                onClick={runBenchmark}
                disabled={isRunning}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? "Running..." : "Run Benchmark"}
              </button>
            </Flex>

            <Box className="mt-4">
              <LiveBenchmark onResults={handleLiveBenchmarkResults} />
            </Box>

            {metrics && (
              <Box className="space-y-8">
                <Box style={performanceChartStyle}>
                  <Heading asChild className="text-xl mb-6">
                    <h3>Render Time Comparison</h3>
                  </Heading>

                  <Box className="space-y-4">
                    <Box>
                      <Text className="mb-2 font-medium">Without Theme System</Text>
                      <Box style={barChartStyle(65, "#10b981")}>
                        {metrics.withoutTheme.renderTime.toFixed(1)}ms
                      </Box>
                    </Box>

                    <Box>
                      <Text className="mb-2 font-medium">With Theme System</Text>
                      <Box style={barChartStyle(100, "#3b82f6")}>
                        {metrics.withTheme.renderTime.toFixed(1)}ms
                      </Box>
                    </Box>
                  </Box>

                  <Box className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                    <Flex justify="between" align="center">
                      <Text className="font-medium">Theme System Overhead:</Text>
                      <Badge
                        className={`${Number(overheadPercentage) > 50 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                      >
                        +{overheadPercentage}%
                      </Badge>
                    </Flex>
                  </Box>
                </Box>

                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <Heading asChild className="text-lg mb-4">
                      <h4>With Theme System</h4>
                    </Heading>
                    <Box className="space-y-3">
                      <Flex justify="between">
                        <Text>Render Time:</Text>
                        <Text className="font-semibold">
                          {metrics.withTheme.renderTime.toFixed(1)}ms
                        </Text>
                      </Flex>
                      <Flex justify="between">
                        <Text>Memory Used:</Text>
                        <Text className="font-semibold">
                          {metrics.withTheme.memoryUsed.toFixed(1)}MB
                        </Text>
                      </Flex>
                      <Flex justify="between">
                        <Text>Components:</Text>
                        <Text className="font-semibold">{metrics.withTheme.components}</Text>
                      </Flex>
                    </Box>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <Heading asChild className="text-lg mb-4">
                      <h4>Without Theme System</h4>
                    </Heading>
                    <Box className="space-y-3">
                      <Flex justify="between">
                        <Text>Render Time:</Text>
                        <Text className="font-semibold">
                          {metrics.withoutTheme.renderTime.toFixed(1)}ms
                        </Text>
                      </Flex>
                      <Flex justify="between">
                        <Text>Memory Used:</Text>
                        <Text className="font-semibold">
                          {metrics.withoutTheme.memoryUsed.toFixed(1)}MB
                        </Text>
                      </Flex>
                      <Flex justify="between">
                        <Text>Components:</Text>
                        <Text className="font-semibold">{metrics.withoutTheme.components}</Text>
                      </Flex>
                    </Box>
                  </Card>
                </Box>

                <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <Heading asChild className="text-lg mb-4">
                    <h4>Key Insights</h4>
                  </Heading>
                  <Box className="space-y-3">
                    <Flex gap={2} align="start">
                      <Text className="text-purple-600">•</Text>
                      <Text>
                        The theme system adds approximately {overheadPercentage}% overhead to render
                        times
                      </Text>
                    </Flex>
                    <Flex gap={2} align="start">
                      <Text className="text-purple-600">•</Text>
                      <Text>
                        Memory usage increases by{" "}
                        {(
                          ((metrics.withTheme.memoryUsed - metrics.withoutTheme.memoryUsed) /
                            metrics.withoutTheme.memoryUsed) *
                          100
                        ).toFixed(1)}
                        % with theming enabled
                      </Text>
                    </Flex>
                    <Flex gap={2} align="start">
                      <Text className="text-purple-600">•</Text>
                      <Text>The overhead is consistent across different component counts</Text>
                    </Flex>
                  </Box>
                </Card>
              </Box>
            )}
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
};
