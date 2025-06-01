import React from "react";
import { render } from "@alexberriman/react-jedi";
import type { UISpecification } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../lib/meta";

const scrollAreaDemo: UISpecification = {
  type: "Container",
  maxWidth: "4xl",
  className: "py-10",
  children: [
    {
      type: "Box",
      className: "space-y-8",
      children: [
        {
          type: "Heading",
          level: 2,
          className: "text-3xl font-bold text-center mb-8",
          children: "ScrollArea Component Demo",
        },
        {
          type: "Grid",
          columns: { base: 1, md: 2 },
          gap: "8",
          children: [
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "text-xl font-semibold mb-4",
                  children: "Vertical Scroll",
                },
                {
                  type: "ScrollArea",
                  height: "300px",
                  className: "w-full rounded-md border",
                  children: {
                    type: "Box",
                    className: "p-4",
                    children: Array.from({ length: 20 }).map((_, i) => ({
                      type: "Box",
                      key: `item-${i}`,
                      className: "py-2 border-b last:border-0",
                      children: {
                        type: "Text",
                        children: `Item ${i + 1}: This is some content that will scroll vertically`,
                      },
                    })),
                  },
                },
              ],
            },
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "text-xl font-semibold mb-4",
                  children: "Horizontal Scroll",
                },
                {
                  type: "ScrollArea",
                  className: "w-full rounded-md border",
                  children: {
                    type: "Flex",
                    className: "w-max space-x-4 p-4",
                    children: Array.from({ length: 15 }).map((_, i) => ({
                      type: "Box",
                      key: `card-${i}`,
                      className:
                        "w-32 h-24 bg-gray-100 rounded-md flex items-center justify-center shrink-0",
                      children: {
                        type: "Text",
                        className: "font-medium",
                        children: `Card ${i + 1}`,
                      },
                    })),
                  },
                },
              ],
            },
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "text-xl font-semibold mb-4",
                  children: "Both Directions",
                },
                {
                  type: "ScrollArea",
                  height: "300px",
                  className: "w-full rounded-md border",
                  children: {
                    type: "Box",
                    className: "p-4",
                    children: {
                      type: "Box",
                      className: "w-[600px]",
                      children: Array.from({ length: 30 }).map((_, i) => ({
                        type: "Text",
                        key: `long-text-${i}`,
                        className: "whitespace-nowrap py-1",
                        children: `Line ${i + 1}: This is a very long line of text that extends beyond the viewport width and requires horizontal scrolling to read fully`,
                      })),
                    },
                  },
                },
              ],
            },
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  className: "text-xl font-semibold mb-4",
                  children: "Custom Styled ScrollArea",
                },
                {
                  type: "ScrollArea",
                  height: "300px",
                  className: "w-full rounded-lg border-2 border-blue-500 bg-blue-50",
                  children: {
                    type: "Box",
                    className: "p-6",
                    children: [
                      {
                        type: "Heading",
                        level: 4,
                        className: "text-lg font-semibold text-blue-900 mb-4",
                        children: "Custom Styled Content",
                      },
                      ...Array.from({ length: 15 }).map((_, i) => ({
                        type: "Box",
                        key: `styled-item-${i}`,
                        className: "mb-3",
                        children: {
                          type: "Box",
                          className: "p-3 bg-white rounded-lg shadow-sm",
                          children: [
                            {
                              type: "Text",
                              className: "font-medium text-blue-900",
                              children: `Version ${i + 1}.0.0`,
                            },
                            {
                              type: "Text",
                              className: "text-sm text-blue-600",
                              children: `Released on ${new Date(2024, 0, i + 1).toLocaleDateString()}`,
                            },
                          ],
                        },
                      })),
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export function ScrollAreaDemo() {
  usePageMetadata({
    title: "Scroll Area Demo",
    description:
      "React Jedi ScrollArea component demo showcasing custom scrollbars and overflow handling.",
  });

  return <div>{render(scrollAreaDemo)}</div>;
}
