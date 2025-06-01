import React, { useState, useMemo } from "react";
import { render } from "@alexberriman/react-jedi";
import { runThemeBenchmark, LiveBenchmark, type BenchmarkResult } from "./theme-benchmark";
import { JsonCodeComparison } from "./json-code-comparison";
import { usePageMetadata } from "../../lib/meta";
import { motion, AnimatePresence } from "framer-motion";

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
  usePageMetadata({
    title: "Performance",
    description:
      "React Jedi performance benchmarks and optimizations. Compare JSON-driven vs traditional React components.",
  });

  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"theme" | "json">("theme");

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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const overheadPercentage = useMemo(() => {
    if (!metrics) return "0";
    const withThemeTime = metrics.withTheme.renderTime;
    const withoutThemeTime = metrics.withoutTheme.renderTime;
    return (((withThemeTime - withoutThemeTime) / withoutThemeTime) * 100).toFixed(1);
  }, [metrics]);

  const createPageSpec = () => ({
    type: "Container",
    props: {
      className: "min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800"
    },
    children: [
      // Hero Section
      {
        type: "Box",
        props: {
          className: "relative overflow-hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700"
        },
        children: [
          {
            type: "Container",
            props: { className: "py-16 px-4 sm:px-6 lg:px-8" },
            children: [
              {
                type: "Box",
                props: { className: "text-center max-w-3xl mx-auto" },
                children: [
                  {
                    type: "Heading",
                    props: {
                      level: "h1",
                      className: "text-5xl font-bold text-zinc-900 dark:text-white mb-4"
                    },
                    children: ["Performance Metrics"]
                  },
                  {
                    type: "Text",
                    props: {
                      className: "text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
                    },
                    children: ["Measure and analyze React Jedi&apos;s performance with real-time benchmarks"]
                  }
                ]
              }
            ]
          },
          // Decorative gradient orb
          {
            type: "Box",
            props: {
              className: "absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            }
          }
        ]
      },
      // Tab Navigation
      {
        type: "Container",
        props: { className: "py-8 px-4 sm:px-6 lg:px-8" },
        children: [
          {
            type: "Flex",
            props: {
              justify: "center",
              className: "mb-12"
            },
            children: [
              {
                type: "Box",
                props: {
                  className: "inline-flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                },
                children: [
                  {
                    type: "Button",
                    props: {
                      onClick: () => setActiveTab("theme"),
                      className: `px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                        activeTab === "theme"
                          ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`
                    },
                    children: ["Theme Performance"]
                  },
                  {
                    type: "Button",
                    props: {
                      onClick: () => setActiveTab("json"),
                      className: `px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                        activeTab === "json"
                          ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`
                    },
                    children: ["JSON vs Code"]
                  }
                ]
              }
            ]
          }
        ]
      },
      // Content Area
      {
        type: "Container",
        props: { className: "px-4 sm:px-6 lg:px-8 pb-16" },
        children: activeTab === "theme" ? createThemeContent() : createJsonContent()
      }
    ]
  });

  const createThemeContent = () => ({
    type: "Box",
    props: { className: "max-w-6xl mx-auto space-y-8" },
    children: [
      // Theme Benchmark Card
      {
        type: "Card",
        props: {
          className: "bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-zinc-800/50 border-0 overflow-hidden"
        },
        children: [
          {
            type: "Box",
            props: { className: "p-8" },
            children: [
              {
                type: "Flex",
                props: {
                  justify: "between",
                  align: "center",
                  className: "mb-8"
                },
                children: [
                  {
                    type: "Box",
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: "h2",
                          className: "text-3xl font-bold text-zinc-900 dark:text-white mb-2"
                        },
                        children: ["Theme System Benchmark"]
                      },
                      {
                        type: "Text",
                        props: {
                          className: "text-zinc-600 dark:text-zinc-400"
                        },
                        children: ["Measure the performance impact of the theme system"]
                      }
                    ]
                  },
                  {
                    type: "Button",
                    props: {
                      onClick: runBenchmark,
                      disabled: isRunning,
                      className: `px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium
                        hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                        transform transition-all duration-200 hover:scale-105 active:scale-95`
                    },
                    children: [isRunning ? "Running..." : "Run Benchmark"]
                  }
                ]
              },
              // Live Benchmark Component
              {
                type: "Box",
                props: { className: "mb-8" },
                children: [<LiveBenchmark key="live-benchmark" onResults={handleLiveBenchmarkResults} />]
              },
              // Results Section
              metrics && {
                type: "Box",
                props: { className: "space-y-8" },
                children: [
                  // Performance Comparison
                  createPerformanceComparison(),
                  // Metrics Grid
                  createMetricsGrid(),
                  // Insights Card
                  createInsightsCard()
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  const createJsonContent = () => ({
    type: "Box",
    props: { className: "max-w-6xl mx-auto" },
    children: [
      {
        type: "Card",
        props: {
          className: "bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-zinc-800/50 border-0 overflow-hidden"
        },
        children: [
          {
            type: "Box",
            props: { className: "p-8" },
            children: [<JsonCodeComparison key="json-comparison" />]
          }
        ]
      }
    ]
  });

  const createPerformanceComparison = () => ({
    type: "Box",
    props: {
      className: "bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl p-8"
    },
    children: [
      {
        type: "Heading",
        props: {
          level: "h3",
          className: "text-2xl font-bold text-zinc-900 dark:text-white mb-6"
        },
        children: ["Render Time Analysis"]
      },
      {
        type: "Box",
        props: { className: "space-y-6" },
        children: [
          // Without Theme Bar
          {
            type: "Box",
            children: [
              {
                type: "Flex",
                props: {
                  justify: "between",
                  className: "mb-2"
                },
                children: [
                  {
                    type: "Text",
                    props: { className: "font-medium text-zinc-700 dark:text-zinc-300" },
                    children: ["Without Theme"]
                  },
                  {
                    type: "Text",
                    props: { className: "font-bold text-green-600 dark:text-green-400" },
                    children: [`${metrics?.withoutTheme.renderTime.toFixed(1)}ms`]
                  }
                ]
              },
              {
                type: "Box",
                props: {
                  className: "h-12 bg-zinc-200 dark:bg-zinc-600 rounded-lg overflow-hidden"
                },
                children: [
                  {
                    type: "Box",
                    props: {
                      className: "h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-end px-4",
                      style: { width: "65%" }
                    },
                    children: [
                      {
                        type: "Text",
                        props: { className: "text-white font-medium text-sm" },
                        children: ["Baseline"]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          // With Theme Bar
          {
            type: "Box",
            children: [
              {
                type: "Flex",
                props: {
                  justify: "between",
                  className: "mb-2"
                },
                children: [
                  {
                    type: "Text",
                    props: { className: "font-medium text-zinc-700 dark:text-zinc-300" },
                    children: ["With Theme"]
                  },
                  {
                    type: "Text",
                    props: { className: "font-bold text-blue-600 dark:text-blue-400" },
                    children: [`${metrics?.withTheme.renderTime.toFixed(1)}ms`]
                  }
                ]
              },
              {
                type: "Box",
                props: {
                  className: "h-12 bg-zinc-200 dark:bg-zinc-600 rounded-lg overflow-hidden"
                },
                children: [
                  {
                    type: "Box",
                    props: {
                      className: "h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-end px-4",
                      style: { width: "100%" }
                    },
                    children: [
                      {
                        type: "Badge",
                        props: {
                          className: "bg-white/20 text-white border-0"
                        },
                        children: [`+${overheadPercentage}%`]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  const createMetricsGrid = () => ({
    type: "Grid",
    props: {
      columns: { base: 1, md: 3 },
      gap: 6
    },
    children: [
      // Render Time Card
      {
        type: "Card",
        props: {
          className: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0"
        },
        children: [
          {
            type: "Box",
            props: { className: "p-6" },
            children: [
              {
                type: "Box",
                props: {
                  className: "inline-flex p-3 bg-blue-500 text-white rounded-lg mb-4"
                },
                children: [
                  {
                    type: "svg",
                    props: {
                      className: "w-6 h-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    },
                    children: [
                      {
                        type: "path",
                        props: {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M13 10V3L4 14h7v7l9-11h-7z"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: "Text",
                props: { className: "text-zinc-600 dark:text-zinc-400 mb-1" },
                children: ["Avg. Render Time"]
              },
              {
                type: "Heading",
                props: {
                  level: "h3",
                  className: "text-3xl font-bold text-zinc-900 dark:text-white"
                },
                children: [`${((metrics?.withTheme.renderTime || 0) + (metrics?.withoutTheme.renderTime || 0)) / 2}ms`]
              }
            ]
          }
        ]
      },
      // Memory Usage Card
      {
        type: "Card",
        props: {
          className: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0"
        },
        children: [
          {
            type: "Box",
            props: { className: "p-6" },
            children: [
              {
                type: "Box",
                props: {
                  className: "inline-flex p-3 bg-purple-500 text-white rounded-lg mb-4"
                },
                children: [
                  {
                    type: "svg",
                    props: {
                      className: "w-6 h-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    },
                    children: [
                      {
                        type: "path",
                        props: {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: "Text",
                props: { className: "text-zinc-600 dark:text-zinc-400 mb-1" },
                children: ["Memory Impact"]
              },
              {
                type: "Heading",
                props: {
                  level: "h3",
                  className: "text-3xl font-bold text-zinc-900 dark:text-white"
                },
                children: [`+${((metrics?.withTheme.memoryUsed || 0) - (metrics?.withoutTheme.memoryUsed || 0)).toFixed(1)}MB`]
              }
            ]
          }
        ]
      },
      // Component Count Card
      {
        type: "Card",
        props: {
          className: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0"
        },
        children: [
          {
            type: "Box",
            props: { className: "p-6" },
            children: [
              {
                type: "Box",
                props: {
                  className: "inline-flex p-3 bg-green-500 text-white rounded-lg mb-4"
                },
                children: [
                  {
                    type: "svg",
                    props: {
                      className: "w-6 h-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    },
                    children: [
                      {
                        type: "path",
                        props: {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: "Text",
                props: { className: "text-zinc-600 dark:text-zinc-400 mb-1" },
                children: ["Components Tested"]
              },
              {
                type: "Heading",
                props: {
                  level: "h3",
                  className: "text-3xl font-bold text-zinc-900 dark:text-white"
                },
                children: [`${metrics?.withTheme.components || 0}`]
              }
            ]
          }
        ]
      }
    ]
  });

  const createInsightsCard = () => ({
    type: "Card",
    props: {
      className: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-0"
    },
    children: [
      {
        type: "Box",
        props: { className: "p-8" },
        children: [
          {
            type: "Flex",
            props: {
              align: "center",
              gap: 3,
              className: "mb-6"
            },
            children: [
              {
                type: "Box",
                props: {
                  className: "inline-flex p-3 bg-amber-500 text-white rounded-lg"
                },
                children: [
                  {
                    type: "svg",
                    props: {
                      className: "w-6 h-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    },
                    children: [
                      {
                        type: "path",
                        props: {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: "Heading",
                props: {
                  level: "h3",
                  className: "text-2xl font-bold text-zinc-900 dark:text-white"
                },
                children: ["Performance Insights"]
              }
            ]
          },
          {
            type: "Box",
            props: { className: "space-y-4" },
            children: [
              {
                type: "Flex",
                props: {
                  gap: 3,
                  align: "start"
                },
                children: [
                  {
                    type: "Box",
                    props: {
                      className: "w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    }
                  },
                  {
                    type: "Text",
                    props: { className: "text-zinc-700 dark:text-zinc-300 leading-relaxed" },
                    children: [`The theme system adds approximately ${overheadPercentage}% overhead to render times, which is ${(() => {
                      const overhead = Number(overheadPercentage);
                      if (overhead < 30) return "minimal";
                      if (overhead < 60) return "moderate";
                      return "significant";
                    })()} for production use.`]
                  }
                ]
              },
              {
                type: "Flex",
                props: {
                  gap: 3,
                  align: "start"
                },
                children: [
                  {
                    type: "Box",
                    props: {
                      className: "w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    }
                  },
                  {
                    type: "Text",
                    props: { className: "text-zinc-700 dark:text-zinc-300 leading-relaxed" },
                    children: [`Memory usage increases by ${(
                      ((metrics?.withTheme.memoryUsed || 0) - (metrics?.withoutTheme.memoryUsed || 0)) /
                      (metrics?.withoutTheme.memoryUsed || 1) *
                      100
                    ).toFixed(1)}% with theming enabled, providing rich styling capabilities.`]
                  }
                ]
              },
              {
                type: "Flex",
                props: {
                  gap: 3,
                  align: "start"
                },
                children: [
                  {
                    type: "Box",
                    props: {
                      className: "w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    }
                  },
                  {
                    type: "Text",
                    props: { className: "text-zinc-700 dark:text-zinc-300 leading-relaxed" },
                    children: ["The performance impact remains consistent across different component counts, ensuring predictable behavior at scale."]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  // Render the page using React Jedi's JSON specification
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="performance-page"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInUp}
      >
        {render(createPageSpec())}
      </motion.div>
    </AnimatePresence>
  );
};