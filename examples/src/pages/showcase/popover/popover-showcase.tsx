import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function PopoverShowcase() {
  usePageMetadata({
    title: "Popover Component",
    description:
      "A comprehensive showcase of the React Jedi Popover component with positioning options, alignment variations, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "positioning", label: "Positioning" },
    { id: "alignment", label: "Alignment" },
    { id: "advanced", label: "Advanced Content" },
    { id: "interactive", label: "Interactive Examples" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic popover specification
  const basicSpec: UISpecification = {
    type: "Popover",
    children: [
      {
        type: "PopoverTrigger",
        children: {
          type: "Button",
          variant: "outline",
          children: "Open Popover",
        },
      },
      {
        type: "PopoverContent",
        children: {
          type: "Stack",
          spacing: "3",
          children: [
            {
              type: "Heading",
              level: 4,
              children: "About Popovers",
            },
            {
              type: "Text",
              size: "small",
              children: "Popovers are floating containers that display additional content when triggered.",
            },
          ],
        },
      },
    ],
  };

  // Positioning examples
  const positioningSpec: UISpecification = {
    type: "Grid",
    columns: 2,
    gap: "4",
    children: [
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Top",
            },
          },
          {
            type: "PopoverContent",
            side: "top",
            children: {
              type: "Text",
              children: "This popover appears on top",
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Right",
            },
          },
          {
            type: "PopoverContent",
            side: "right",
            children: {
              type: "Text",
              children: "This popover appears on the right",
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Bottom",
            },
          },
          {
            type: "PopoverContent",
            side: "bottom",
            children: {
              type: "Text",
              children: "This popover appears on the bottom",
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Left",
            },
          },
          {
            type: "PopoverContent",
            side: "left",
            children: {
              type: "Text",
              children: "This popover appears on the left",
            },
          },
        ],
      },
    ],
  };

  // Alignment examples
  const alignmentSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Start Aligned",
            },
          },
          {
            type: "PopoverContent",
            align: "start",
            children: {
              type: "Text",
              children: "Aligned to start",
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Center Aligned",
            },
          },
          {
            type: "PopoverContent",
            align: "center",
            children: {
              type: "Text",
              children: "Aligned to center",
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "End Aligned",
            },
          },
          {
            type: "PopoverContent",
            align: "end",
            children: {
              type: "Text",
              children: "Aligned to end",
            },
          },
        ],
      },
    ],
  };

  // Advanced content examples
  const advancedContentSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "User Profile",
            },
          },
          {
            type: "PopoverContent",
            className: "w-80",
            children: {
              type: "Card",
              children: [
                {
                  type: "CardHeader",
                  children: [
                    {
                      type: "Flex",
                      align: "center",
                      gap: "3",
                      children: [
                        {
                          type: "Avatar",
                          src: "https://github.com/shadcn.png",
                          alt: "User Avatar",
                        },
                        {
                          type: "Box",
                          children: [
                            {
                              type: "CardTitle",
                              children: "John Doe",
                            },
                            {
                              type: "CardDescription",
                              children: "Software Engineer",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "CardContent",
                  children: {
                    type: "Text",
                    size: "small",
                    children: "Passionate about building great user experiences with modern web technologies.",
                  },
                },
              ],
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Settings Menu",
            },
          },
          {
            type: "PopoverContent",
            children: {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Text",
                  className: "font-medium",
                  children: "Settings",
                },
                {
                  type: "Separator",
                },
                {
                  type: "Stack",
                  spacing: "1",
                  children: [
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      className: "justify-start",
                      children: "⚙️ Preferences",
                    },
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      className: "justify-start",
                      children: "🔒 Privacy",
                    },
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      className: "justify-start",
                      children: "📊 Analytics",
                    },
                    {
                      type: "Button",
                      variant: "ghost",
                      size: "sm",
                      className: "justify-start",
                      children: "❓ Help",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  };

  // Interactive examples
  const interactiveSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              children: "📅 Date Picker",
            },
          },
          {
            type: "PopoverContent",
            children: {
              type: "Stack",
              spacing: "3",
              children: [
                {
                  type: "Text",
                  className: "font-medium",
                  children: "Select a date",
                },
                {
                  type: "Grid",
                  columns: 7,
                  gap: "1",
                  className: "text-center text-sm",
                  children: [
                    { type: "Text", children: "S", className: "font-medium p-2" },
                    { type: "Text", children: "M", className: "font-medium p-2" },
                    { type: "Text", children: "T", className: "font-medium p-2" },
                    { type: "Text", children: "W", className: "font-medium p-2" },
                    { type: "Text", children: "T", className: "font-medium p-2" },
                    { type: "Text", children: "F", className: "font-medium p-2" },
                    { type: "Text", children: "S", className: "font-medium p-2" },
                    { type: "Button", variant: "ghost", size: "sm", children: "1" },
                    { type: "Button", variant: "ghost", size: "sm", children: "2" },
                    { type: "Button", variant: "ghost", size: "sm", children: "3" },
                    { type: "Button", variant: "ghost", size: "sm", children: "4" },
                    { type: "Button", variant: "ghost", size: "sm", children: "5" },
                    { type: "Button", variant: "ghost", size: "sm", children: "6" },
                    { type: "Button", variant: "ghost", size: "sm", children: "7" },
                    { type: "Button", variant: "ghost", size: "sm", children: "8" },
                    { type: "Button", variant: "ghost", size: "sm", children: "9" },
                    { type: "Button", variant: "ghost", size: "sm", children: "10" },
                    { type: "Button", variant: "ghost", size: "sm", children: "11" },
                    { type: "Button", variant: "ghost", size: "sm", children: "12" },
                    { type: "Button", variant: "ghost", size: "sm", children: "13" },
                    { type: "Button", variant: "ghost", size: "sm", children: "14" },
                    { type: "Button", variant: "primary", size: "sm", children: "15" },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        type: "Popover",
        children: [
          {
            type: "PopoverTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "🎨 Color Picker",
            },
          },
          {
            type: "PopoverContent",
            children: {
              type: "Stack",
              spacing: "3",
              children: [
                {
                  type: "Text",
                  className: "font-medium",
                  children: "Choose a color",
                },
                {
                  type: "Grid",
                  columns: 6,
                  gap: "2",
                  children: [
                    { type: "Box", className: "w-8 h-8 bg-red-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-blue-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-green-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-yellow-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-purple-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-pink-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-orange-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-teal-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-indigo-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-gray-500 rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-black rounded cursor-pointer" },
                    { type: "Box", className: "w-8 h-8 bg-white border rounded cursor-pointer" },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex">
      {/* Table of Contents - Fixed Sidebar */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">On this page</h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/showcase"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            ← Back to Showcase
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popover Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A floating container component that displays rich content on top of the main page content. Perfect for tooltips, menus, forms, and contextual information.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Popover component provides a floating container that can display rich content relative to a trigger element. It's built on top of Radix UI's Popover primitive and offers precise positioning control.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Four positioning options (top, right, bottom, left)</li>
                <li>Three alignment options (start, center, end)</li>
                <li>Collision detection and automatic repositioning</li>
                <li>Modal and non-modal modes</li>
                <li>Controlled and uncontrolled state management</li>
                <li>Full keyboard navigation support</li>
                <li>Accessible by default with proper ARIA attributes</li>
                <li>Composable architecture with trigger, content, and anchor components</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple popover consists of a trigger and content wrapped in the main Popover component.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Positioning Section */}
          <section id="positioning" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Positioning</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control where the popover appears relative to its trigger using the side prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(positioningSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(positioningSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Alignment Section */}
          <section id="alignment" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Alignment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Fine-tune the popover alignment relative to the trigger element.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignmentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Advanced Content Section */}
          <section id="advanced" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Advanced Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Popovers can contain rich content including cards, forms, menus, and other components.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(advancedContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(advancedContentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Interactive Examples Section */}
          <section id="interactive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Popovers excel at creating interactive widgets and custom controls.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(interactiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(interactiveSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-8">
              {/* Popover Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Popover</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4 font-medium">Prop</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Default</th>
                        <th className="text-left py-3 px-4 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                        <td className="py-3 px-4 font-mono">"Popover"</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">open</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Controlled open state</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultOpen</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Default open state</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">modal</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the popover should be modal</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onOpenChange</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Event handler ID for state changes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PopoverContent Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">PopoverContent</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4 font-medium">Prop</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Default</th>
                        <th className="text-left py-3 px-4 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                        <td className="py-3 px-4 font-mono">"PopoverContent"</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">side</td>
                        <td className="py-3 px-4 font-mono">"top" | "right" | "bottom" | "left"</td>
                        <td className="py-3 px-4">"bottom"</td>
                        <td className="py-3 px-4">Preferred side to render against</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">sideOffset</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">4</td>
                        <td className="py-3 px-4">Distance in pixels from anchor</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                        <td className="py-3 px-4 font-mono">"start" | "center" | "end"</td>
                        <td className="py-3 px-4">"center"</td>
                        <td className="py-3 px-4">Alignment against the anchor</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">alignOffset</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">0</td>
                        <td className="py-3 px-4">Offset in pixels from alignment</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">avoidCollisions</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">true</td>
                        <td className="py-3 px-4">Prevent collisions with boundary edges</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">sticky</td>
                        <td className="py-3 px-4 font-mono">"partial" | "always"</td>
                        <td className="py-3 px-4">"partial"</td>
                        <td className="py-3 px-4">Keep popover in view when positioning</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">hideWhenDetached</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Hide when trigger is fully occluded</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing how popovers integrate into common UI patterns.
            </p>
            
            <div className="space-y-8">
              {/* Complex form example would go here but skipping for brevity */}
              <div>
                <h3 className="text-lg font-medium mb-3">User Action Menu</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(advancedContentSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(advancedContentSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <Link
                to="/showcase"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                ← Back to Component Showcase
              </Link>
              <Link
                to="/documentation/ui-components"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                View Documentation →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}