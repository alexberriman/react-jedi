import * as React from "react";
import { render } from "../render";
import { defaultComponentResolver } from "../component-resolver";
import type { UISpecification } from "@/types/schema/specification";

/**
 * Example UI specification for testing the render function
 */
const exampleSpecification: UISpecification = {
  version: "1.0.0",
  metadata: {
    title: "Basic Example",
    description: "A simple example to demonstrate the render function",
    author: "React Jedi",
    createdAt: new Date().toISOString(),
  },
  root: {
    type: "Container",
    children: [
      {
        type: "Box",
        padding: "lg",
        margin: "md",
        rounded: "md",
        backgroundColor: "card",
        shadow: "md",
        children: [
          {
            type: "Heading",
            level: "h1",
            children: "Server-Driven UI Example",
          },
          {
            type: "Text",
            size: "lg",
            children: "This UI is rendered from a JSON specification",
          },
          {
            type: "Separator",
            className: "my-4",
          },
          {
            type: "Flex",
            direction: "row",
            gap: "md",
            children: [
              {
                type: "Button",
                variant: "default",
                children: "Primary Action",
              },
              {
                type: "Button",
                variant: "outline",
                children: "Secondary Action",
              },
            ],
          },
        ],
      },
    ],
  },
  theme: {
    colors: {
      primary: {
        "500": "#3b82f6",
      },
    },
  },
  state: {
    initial: {
      counter: 0,
    },
  },
};

/**
 * Basic example component that demonstrates the render function
 */
export function BasicRenderExample() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Server-Driven UI Render Example</h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {render(exampleSpecification, {
          resolver: defaultComponentResolver,
          development: true,
        })}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Specification JSON:</h3>
        <pre className="p-4 bg-gray-100 rounded-lg overflow-auto text-xs">
          {JSON.stringify(exampleSpecification, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default BasicRenderExample;