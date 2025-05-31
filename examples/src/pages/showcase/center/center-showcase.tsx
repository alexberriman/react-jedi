import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function CenterShowcase() {
  usePageMetadata({
    title: "Center Component",
    description:
      "A comprehensive showcase of the React Jedi Center component for perfectly centered layouts with horizontal, vertical, or bidirectional alignment.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-centering", label: "Basic Centering" },
    { id: "directional-centering", label: "Directional Centering" },
    { id: "full-dimensions", label: "Full Width & Height" },
    { id: "responsive-centering", label: "Responsive Centering" },
    { id: "nested-centers", label: "Nested Centers" },
    { id: "complex-layouts", label: "Complex Layouts" },
    { id: "real-world", label: "Real-World Examples" },
    { id: "props", label: "Props & Options" },
  ];

  // Basic centering specification
  const basicCenteringSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        className: "w-full",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Default centering (both directions)",
          },
          {
            type: "Center",
            className: "h-40 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700",
            children: {
              type: "Box",
              className: "p-4 bg-white dark:bg-gray-900 rounded shadow-md",
              children: {
                type: "Text",
                className: "font-semibold",
                children: "Perfectly Centered",
              },
            },
          },
        ],
      },
    ],
  };

  // Directional centering specification
  const directionalCenteringSpec: UISpecification = {
    type: "Grid",
    cols: 3,
    gap: 4,
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Horizontal Only",
          },
          {
            type: "Center",
            centerDirection: "horizontal",
            className: "h-32 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800",
            children: {
              type: "Badge",
              variant: "secondary",
              children: "Horizontally Centered",
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Vertical Only",
          },
          {
            type: "Center",
            centerDirection: "vertical",
            className: "h-32 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800",
            children: {
              type: "Badge",
              variant: "outline",
              children: "Vertically Centered",
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Both Directions",
          },
          {
            type: "Center",
            centerDirection: "both",
            className: "h-32 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800",
            children: {
              type: "Badge",
              variant: "default",
              children: "Both Centered",
            },
          },
        ],
      },
    ],
  };

  // Full dimensions specification
  const fullDimensionsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Full Width Center",
          },
          {
            type: "Center",
            fullWidth: true,
            className: "h-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg",
            children: {
              type: "Text",
              className: "font-medium text-blue-600 dark:text-blue-400",
              children: "This center takes full width of its container",
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            children: "Note: fullHeight creates a min-height of viewport height",
          },
          {
            type: "Center",
            className: "h-32 bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg",
            children: {
              type: "Text",
              className: "font-medium text-green-600 dark:text-green-400",
              children: "Regular height center (fullHeight would fill viewport)",
            },
          },
        ],
      },
    ],
  };

  // Responsive centering specification
  const responsiveCenteringSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Center",
        className: "h-48 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 rounded-lg",
        children: {
          type: "Box",
          className: "text-center p-6",
          children: [
            {
              type: "Text",
              className: "text-2xl font-bold mb-2",
              children: "Responsive Center",
            },
            {
              type: "Text",
              className: "text-gray-600 dark:text-gray-400 mb-4",
              children: "Content stays centered at all screen sizes",
            },
            {
              type: "Group",
              spacing: "2",
              children: [
                { type: "Button", size: "sm", variant: "primary", children: "Action 1" },
                { type: "Button", size: "sm", variant: "outline", children: "Action 2" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Nested centers specification
  const nestedCentersSpec: UISpecification = {
    type: "Grid",
    cols: 2,
    gap: 4,
    children: [
      {
        type: "Center",
        className: "h-64 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg",
        children: {
          type: "Center",
          className: "w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg",
          children: {
            type: "Center",
            className: "w-32 h-32 bg-white dark:bg-gray-900 rounded-lg shadow-inner",
            children: {
              type: "Text",
              className: "font-bold text-blue-600 dark:text-blue-400",
              children: "Nested",
            },
          },
        },
      },
      {
        type: "Center",
        className: "h-64 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg",
        children: {
          type: "Stack",
          spacing: "4",
          align: "center",
          children: [
            {
              type: "Center",
              className: "w-24 h-24 bg-green-500 rounded-full",
              children: {
                type: "Text",
                className: "text-white font-bold",
                children: "1",
              },
            },
            {
              type: "Center",
              className: "w-32 h-8 bg-green-600 rounded-full",
              children: {
                type: "Text",
                className: "text-white text-sm",
                children: "Stacked Centers",
              },
            },
          ],
        },
      },
    ],
  };

  // Complex layouts specification
  const complexLayoutsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      // Card with centered icon
      {
        type: "Card",
        className: "overflow-hidden",
        children: [
          {
            type: "Center",
            className: "h-48 bg-gradient-to-br from-purple-500 to-pink-500",
            children: {
              type: "Box",
              className: "text-center",
              children: [
                {
                  type: "Text",
                  className: "text-6xl mb-2",
                  children: "🚀",
                },
                {
                  type: "Text",
                  className: "text-white font-bold text-xl",
                  children: "Launch Ready",
                },
              ],
            },
          },
          {
            type: "CardContent",
            children: {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "CardTitle", children: "Centered Hero Section" },
                { type: "CardDescription", children: "Perfect for feature highlights and call-to-action areas" },
              ],
            },
          },
        ],
      },
      // Grid of centered items
      {
        type: "Grid",
        cols: 4,
        gap: 3,
        children: [
          {
            type: "Center",
            className: "aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg",
            children: { type: "Text", className: "text-2xl", children: "📊" },
          },
          {
            type: "Center",
            className: "aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg",
            children: { type: "Text", className: "text-2xl", children: "💡" },
          },
          {
            type: "Center",
            className: "aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg",
            children: { type: "Text", className: "text-2xl", children: "⚡" },
          },
          {
            type: "Center",
            className: "aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg",
            children: { type: "Text", className: "text-2xl", children: "🎯" },
          },
        ],
      },
    ],
  };

  // Real-world examples
  const loadingStateSpec: UISpecification = {
    type: "Center",
    className: "h-64 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800",
    children: {
      type: "Stack",
      spacing: "4",
      align: "center",
      children: [
        {
          type: "Progress",
          value: 65,
          className: "w-16 h-16",
        },
        {
          type: "Text",
          className: "font-medium text-gray-700 dark:text-gray-300",
          children: "Loading content...",
        },
      ],
    },
  };

  const emptyStateSpec: UISpecification = {
    type: "Center",
    className: "h-96 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700",
    children: {
      type: "Box",
      className: "text-center p-8",
      children: [
        {
          type: "Text",
          className: "text-6xl mb-4",
          children: "📭",
        },
        {
          type: "Heading",
          level: 3,
          className: "text-xl font-semibold mb-2",
          children: "No items found",
        },
        {
          type: "Text",
          className: "text-gray-600 dark:text-gray-400 mb-6 max-w-sm",
          children: "Get started by creating your first item. It only takes a few seconds.",
        },
        {
          type: "Button",
          variant: "primary",
          children: "Create First Item",
        },
      ],
    },
  };

  const modalContentSpec: UISpecification = {
    type: "Box",
    className: "relative",
    children: [
      {
        type: "Center",
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm",
        children: {
          type: "Card",
          className: "w-full max-w-md mx-4",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Centered Modal" },
                { type: "CardDescription", children: "This modal is perfectly centered on the screen" },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Center components are perfect for modal dialogs, ensuring they stay centered regardless of viewport size.",
              },
            },
            {
              type: "CardFooter",
              className: "gap-2",
              children: [
                { type: "Button", variant: "outline", children: "Cancel", className: "flex-1" },
                { type: "Button", variant: "primary", children: "Confirm", className: "flex-1" },
              ],
            },
          ],
        },
      },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.querySelector(`#${sectionId}`);
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Center Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible layout component that centers its children horizontally, vertically, or both using flexbox. Perfect for hero sections, empty states, modals, and any content that needs perfect alignment.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Center component is a fundamental layout utility in React Jedi that provides a simple way to center content using CSS flexbox. Unlike traditional centering methods, it offers precise control over centering direction and can adapt to various layout requirements.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Three centering modes: horizontal, vertical, or both</li>
                <li>Full width and height options for viewport-filling layouts</li>
                <li>Nestable for complex centered layouts</li>
                <li>Responsive and works with any content type</li>
                <li>Lightweight with minimal CSS overhead</li>
                <li>Semantic HTML element selection with the &apos;as&apos; prop</li>
              </ul>
            </div>
          </section>

          {/* Basic Centering Section */}
          <section id="basic-centering" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Centering</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              By default, the Center component centers content both horizontally and vertically within its container.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicCenteringSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(basicCenteringSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Directional Centering Section */}
          <section id="directional-centering" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Directional Centering</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the centering direction with the centerDirection prop. Choose between horizontal, vertical, or both (default).
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(directionalCenteringSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(directionalCenteringSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Full Dimensions Section */}
          <section id="full-dimensions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Full Width & Height</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use fullWidth and fullHeight props to make the center container fill its parent or viewport dimensions.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(fullDimensionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(fullDimensionsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Responsive Centering Section */}
          <section id="responsive-centering" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Centering</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Center components maintain their alignment across all screen sizes, making them perfect for responsive designs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(responsiveCenteringSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(responsiveCenteringSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Nested Centers Section */}
          <section id="nested-centers" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Centers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Center components can be nested to create complex centered layouts with multiple alignment points.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(nestedCentersSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(nestedCentersSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Complex Layouts Section */}
          <section id="complex-layouts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complex Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Combine Center with other components to build sophisticated layouts while maintaining perfect alignment.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(complexLayoutsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(complexLayoutsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Real-World Examples Section */}
          <section id="real-world" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Common use cases for the Center component in production applications.
            </p>
            
            <div className="space-y-8">
              {/* Loading State */}
              <div>
                <h3 className="text-lg font-medium mb-3">Loading State</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(loadingStateSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
{JSON.stringify(loadingStateSpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>

              {/* Empty State */}
              <div>
                <h3 className="text-lg font-medium mb-3">Empty State</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(emptyStateSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
{JSON.stringify(emptyStateSpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>

              {/* Modal Dialog */}
              <div>
                <h3 className="text-lg font-medium mb-3">Modal Dialog (Simulated)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 relative h-96 overflow-hidden">
                  {render(modalContentSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
{JSON.stringify(modalContentSpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
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
                    <td className="py-3 px-4 font-mono">&quot;Center&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec | ComponentSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Content to be centered</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">as</td>
                    <td className="py-3 px-4 font-mono">&quot;div&quot; | &quot;section&quot; | &quot;main&quot; | &quot;article&quot;</td>
                    <td className="py-3 px-4">&quot;div&quot;</td>
                    <td className="py-3 px-4">HTML element to render</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">centerDirection</td>
                    <td className="py-3 px-4 font-mono">&quot;horizontal&quot; | &quot;vertical&quot; | &quot;both&quot;</td>
                    <td className="py-3 px-4">&quot;both&quot;</td>
                    <td className="py-3 px-4">Direction to center content</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">fullWidth</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether to take full width of parent</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">fullHeight</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether to take full viewport height (min-height: 100vh)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">style</td>
                    <td className="py-3 px-4 font-mono">object</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Inline styles</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Usage Tips</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Use <code>centerDirection</code> when you only need alignment in one direction</li>
                <li>• Combine with <code>fullHeight</code> for full-screen hero sections</li>
                <li>• The <code>as</code> prop helps maintain semantic HTML structure</li>
                <li>• Center components are flex containers, so children maintain their natural dimensions</li>
              </ul>
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
                to="/documentation/layout-components"
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