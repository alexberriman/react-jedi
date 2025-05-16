import * as React from "react";
import { render } from "../render";
import type { UISpecification } from "../../types/schema/specification";

// Example specification that demonstrates state optimization benefits
const stateOptimizationExample: UISpecification = {
  version: "1.0",
  root: {
    type: "Container",
    children: [
      {
        type: "Heading",
        props: {
          level: 1,
          children: "State Optimization Example",
        },
      },
      {
        type: "Text",
        props: {
          children:
            "This example demonstrates how state batching improves performance when multiple state updates occur rapidly.",
        },
      },
      {
        type: "Grid",
        props: {
          columns: 2,
          gap: 4,
        },
        children: [
          {
            type: "Card",
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  children: "Counter Controls",
                },
              },
              {
                type: "Flex",
                props: {
                  direction: "column",
                  gap: 2,
                },
                children: [
                  {
                    type: "Button",
                    props: {
                      variant: "default",
                      onClick: "incrementAll",
                    },
                    children: "Increment All Counters",
                  },
                  {
                    type: "Button",
                    props: {
                      variant: "secondary",
                      onClick: "resetAll",
                    },
                    children: "Reset All Counters",
                  },
                  {
                    type: "Button",
                    props: {
                      variant: "outline",
                      onClick: "randomizeAll",
                    },
                    children: "Randomize All Counters",
                  },
                ],
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "Heading",
                props: {
                  level: 3,
                  children: "Performance Metrics",
                },
              },
              {
                type: "Flex",
                props: {
                  direction: "column",
                  gap: 2,
                },
                children: [
                  {
                    type: "Text",
                    props: {
                      size: "sm",
                      children: {
                        $bind: "renderMetrics.updateCount",
                        $format: "Updates: {{value}}",
                      },
                    },
                  },
                  {
                    type: "Text",
                    props: {
                      size: "sm",
                      children: {
                        $bind: "renderMetrics.batchCount",
                        $format: "Batches: {{value}}",
                      },
                    },
                  },
                  {
                    type: "Text",
                    props: {
                      size: "sm",
                      variant: "muted",
                      children:
                        "With optimization, multiple updates are batched into fewer renders",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Separator",
        props: {
          className: "my-6",
        },
      },
      {
        type: "Grid",
        props: {
          columns: 4,
          gap: 4,
        },
        children: Array.from({ length: 12 }, (_, i) => ({
          type: "Card",
          children: [
            {
              type: "Flex",
              props: {
                direction: "column",
                align: "center",
                gap: 2,
              },
              children: [
                {
                  type: "Text",
                  props: {
                    size: "lg",
                    weight: "bold",
                    children: {
                      $bind: `counters.counter${i}`,
                      $default: 0,
                    },
                  },
                },
                {
                  type: "Text",
                  props: {
                    size: "sm",
                    variant: "muted",
                    children: `Counter ${i + 1}`,
                  },
                },
                {
                  type: "Button",
                  props: {
                    size: "sm",
                    variant: "outline",
                    onClick: {
                      type: "updateState",
                      payload: {
                        path: `counters.counter${i}`,
                        operation: "increment",
                      },
                    },
                  },
                  children: "+1",
                },
              ],
            },
          ],
        })),
      },
    ],
  },
  state: {
    initial: {
      counters: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`counter${i}`, 0])),
      renderMetrics: {
        updateCount: 0,
        batchCount: 0,
      },
    },
  },
};

// Example component that demonstrates the optimization
export function StateOptimizationDemo() {
  return (
    <>
      <h2>Without Optimization</h2>
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "2rem" }}>
        {render(stateOptimizationExample, {
          stateOptimization: {
            batchUpdates: false,
          },
        })}
      </div>

      <h2>With Optimization</h2>
      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
        {render(stateOptimizationExample, {
          stateOptimization: {
            batchUpdates: true,
            batchDebounceMs: 10,
            maxBatchSize: 25,
          },
        })}
      </div>
    </>
  );
}

// Example usage
export default function Example() {
  return <StateOptimizationDemo />;
}
