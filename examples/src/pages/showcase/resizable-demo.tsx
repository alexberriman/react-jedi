import React from "react";
import { render, ComponentSpec } from "../../../../src";

const resizableDemo: ComponentSpec = {
  type: "Container",
  className: "min-h-screen py-12",
  children: [
    {
      type: "Heading",
      level: "h1",
      className: "text-4xl font-bold mb-8 text-center",
      children: "Resizable Component Examples",
    },
    {
      type: "Container",
      className: "space-y-12",
      children: [
        // Basic horizontal split
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Basic Horizontal Split",
            },
            {
              type: "Container",
              className: "h-[300px] border rounded-lg overflow-hidden",
              children: {
                type: "ResizablePanelGroup",
                direction: "horizontal",
                children: [
                  {
                    type: "ResizablePanel",
                    defaultSize: 50,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-blue-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold",
                        children: "Left Panel",
                      },
                    },
                  },
                  {
                    type: "ResizableHandle",
                  },
                  {
                    type: "ResizablePanel",
                    defaultSize: 50,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-green-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold",
                        children: "Right Panel",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        // Vertical split
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Vertical Split",
            },
            {
              type: "Container",
              className: "h-[400px] border rounded-lg overflow-hidden",
              children: {
                type: "ResizablePanelGroup",
                direction: "vertical",
                children: [
                  {
                    type: "ResizablePanel",
                    defaultSize: 50,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-purple-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold",
                        children: "Top Panel",
                      },
                    },
                  },
                  {
                    type: "ResizableHandle",
                  },
                  {
                    type: "ResizablePanel",
                    defaultSize: 50,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-orange-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold",
                        children: "Bottom Panel",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        // Three panels with constraints
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Three Panels with Size Constraints",
            },
            {
              type: "Container",
              className: "h-[300px] border rounded-lg overflow-hidden",
              children: {
                type: "ResizablePanelGroup",
                direction: "horizontal",
                children: [
                  {
                    type: "ResizablePanel",
                    defaultSize: 20,
                    minSize: 15,
                    maxSize: 30,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-red-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold text-center",
                        children: "Sidebar\n(15%-30%)",
                      },
                    },
                  },
                  {
                    type: "ResizableHandle",
                    withHandle: true,
                  },
                  {
                    type: "ResizablePanel",
                    defaultSize: 60,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-gray-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold",
                        children: "Main Content",
                      },
                    },
                  },
                  {
                    type: "ResizableHandle",
                    withHandle: true,
                  },
                  {
                    type: "ResizablePanel",
                    defaultSize: 20,
                    minSize: 15,
                    maxSize: 30,
                    children: {
                      type: "Container",
                      className: "h-full flex items-center justify-center bg-amber-50",
                      children: {
                        type: "Text",
                        variant: "p",
                        className: "font-semibold text-center",
                        children: "Sidebar\n(15%-30%)",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        // Nested panels
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Nested Panels (IDE Layout)",
            },
            {
              type: "Container",
              className: "h-[500px] border rounded-lg overflow-hidden",
              children: {
                type: "ResizablePanelGroup",
                direction: "horizontal",
                children: [
                  {
                    type: "ResizablePanel",
                    defaultSize: 20,
                    minSize: 15,
                    collapsible: true,
                    children: {
                      type: "Container",
                      className: "h-full bg-gray-800 text-zinc-900 dark:text-white p-4",
                      children: [
                        {
                          type: "Heading",
                          level: "h3",
                          className: "font-bold mb-4",
                          children: "File Explorer",
                        },
                        {
                          type: "Container",
                          className: "space-y-1",
                          children: [
                            { type: "Text", className: "pl-2", children: "📁 src" },
                            { type: "Text", className: "pl-6", children: "📄 index.ts" },
                            { type: "Text", className: "pl-6", children: "📄 app.tsx" },
                            { type: "Text", className: "pl-2", children: "📁 components" },
                            { type: "Text", className: "pl-2", children: "📁 utils" },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    type: "ResizableHandle",
                    withHandle: true,
                  },
                  {
                    type: "ResizablePanel",
                    defaultSize: 80,
                    children: {
                      type: "ResizablePanelGroup",
                      direction: "vertical",
                      children: [
                        {
                          type: "ResizablePanel",
                          defaultSize: 70,
                          children: {
                            type: "Container",
                            className: "h-full bg-gray-900 text-zinc-900 dark:text-white p-4",
                            children: [
                              {
                                type: "Heading",
                                level: "h3",
                                className: "font-bold mb-4",
                                children: "Editor",
                              },
                              {
                                type: "Text",
                                className: "font-mono text-sm text-green-400",
                                children: `function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}`,
                              },
                            ],
                          },
                        },
                        {
                          type: "ResizableHandle",
                          withHandle: true,
                        },
                        {
                          type: "ResizablePanel",
                          defaultSize: 30,
                          minSize: 10,
                          collapsible: true,
                          children: {
                            type: "Container",
                            className: "h-full bg-gray-800 text-zinc-900 dark:text-white p-4",
                            children: [
                              {
                                type: "Heading",
                                level: "h3",
                                className: "font-bold mb-2",
                                children: "Terminal",
                              },
                              {
                                type: "Container",
                                className: "font-mono text-sm",
                                children: [
                                  {
                                    type: "Text",
                                    className: "text-green-400",
                                    children: "➜ npm run dev",
                                  },
                                  {
                                    type: "Text",
                                    children: "Server running at http://localhost:3000",
                                  },
                                ],
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

export function ResizableDemo() {
  return render(resizableDemo);
}
