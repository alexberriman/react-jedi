import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function ProgressShowcase() {
  usePageMetadata({
    title: "Progress Component",
    description:
      "A comprehensive showcase of the React Jedi Progress component with all variants, sizes, states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "progress-values", label: "Progress Values" },
    { id: "custom-styling", label: "Custom Styling" },
    { id: "with-labels", label: "Progress with Labels" },
    { id: "sizes", label: "Different Sizes" },
    { id: "colors", label: "Custom Colors" },
    { id: "animated", label: "Animated Progress" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic progress examples
  const basicUsageSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      { type: "Progress", value: 60 },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Default progress bar at 60%",
      },
    ],
  };

  // Different progress values
  const progressValuesSpec: UISpecification = {
    type: "Stack",
    spacing: "3",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 0 },
          { type: "Text", size: "small", children: "0% - Empty" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 25 },
          { type: "Text", size: "small", children: "25% - Quarter" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 50 },
          { type: "Text", size: "small", children: "50% - Half" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 75 },
          { type: "Text", size: "small", children: "75% - Three quarters" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 100 },
          { type: "Text", size: "small", children: "100% - Complete" },
        ],
      },
    ],
  };

  // Custom styling examples
  const customStylingSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-lg",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 40, className: "w-96" },
          { type: "Text", size: "small", children: "Custom width (384px)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 70, className: "h-4" },
          { type: "Text", size: "small", children: "Custom height (16px)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 85, className: "rounded-none" },
          { type: "Text", size: "small", children: "No border radius" },
        ],
      },
    ],
  };

  // Progress with labels
  const withLabelsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "Flex",
            justify: "between",
            children: [
              { type: "Text", size: "small", children: "File Upload" },
              { type: "Text", size: "small", variant: "muted", children: "65%" },
            ],
          },
          { type: "Progress", value: 65 },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          {
            type: "Flex",
            justify: "between",
            children: [
              { type: "Text", size: "small", children: "Download Progress" },
              { type: "Text", size: "small", variant: "muted", children: "32 MB / 100 MB" },
            ],
          },
          { type: "Progress", value: 32 },
        ],
      },
    ],
  };

  // Different sizes
  const sizesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 60, className: "h-1" },
          { type: "Text", size: "small", children: "Thin (4px)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 60 },
          { type: "Text", size: "small", children: "Default (8px)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 60, className: "h-4" },
          { type: "Text", size: "small", children: "Medium (16px)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 60, className: "h-6" },
          { type: "Text", size: "small", children: "Large (24px)" },
        ],
      },
    ],
  };

  // Custom colors
  const colorsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Progress", value: 60 },
          { type: "Text", size: "small", children: "Default (Primary)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Progress", 
            value: 75, 
            className: "bg-green-100 [&_[data-slot='progress-indicator']]:bg-green-500" 
          },
          { type: "Text", size: "small", children: "Success (Green)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Progress", 
            value: 45, 
            className: "bg-yellow-100 [&_[data-slot='progress-indicator']]:bg-yellow-500" 
          },
          { type: "Text", size: "small", children: "Warning (Yellow)" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Progress", 
            value: 30, 
            className: "bg-red-100 [&_[data-slot='progress-indicator']]:bg-red-500" 
          },
          { type: "Text", size: "small", children: "Error (Red)" },
        ],
      },
    ],
  };

  // Animated progress example
  const animatedProgressSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Installation Progress" },
          { type: "CardDescription", children: "Installing package dependencies..." },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            { type: "Progress", value: 67 },
            {
              type: "Flex",
              justify: "between",
              children: [
                { type: "Text", size: "small", variant: "muted", children: "Installing..." },
                { type: "Text", size: "small", variant: "muted", children: "67%" },
              ],
            },
          ],
        },
      },
    ],
  };

  // File upload example
  const fileUploadExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-lg",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "File Upload" },
          { type: "CardDescription", children: "Upload multiple files with progress tracking" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  children: [
                    { type: "Text", size: "small", children: "📄 document.pdf" },
                    { type: "Text", size: "small", variant: "muted", children: "2.5 MB" },
                  ],
                },
                { type: "Progress", value: 100 },
                { type: "Text", size: "tiny", variant: "muted", children: "Complete" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  children: [
                    { type: "Text", size: "small", children: "🖼️ image.jpg" },
                    { type: "Text", size: "small", variant: "muted", children: "1.8 MB" },
                  ],
                },
                { type: "Progress", value: 73 },
                { type: "Text", size: "tiny", variant: "muted", children: "Uploading... 73%" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  children: [
                    { type: "Text", size: "small", children: "📊 spreadsheet.xlsx" },
                    { type: "Text", size: "small", variant: "muted", children: "4.2 MB" },
                  ],
                },
                { type: "Progress", value: 0 },
                { type: "Text", size: "tiny", variant: "muted", children: "Queued" },
              ],
            },
          ],
        },
      },
    ],
  };

  // System stats example
  const systemStatsSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "System Resources" },
          { type: "CardDescription", children: "Current usage statistics" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  children: [
                    { type: "Text", size: "small", children: "CPU Usage" },
                    { type: "Text", size: "small", variant: "muted", children: "42%" },
                  ],
                },
                { 
                  type: "Progress", 
                  value: 42, 
                  className: "bg-blue-100 [&_[data-slot='progress-indicator']]:bg-blue-500" 
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  children: [
                    { type: "Text", size: "small", children: "Memory" },
                    { type: "Text", size: "small", variant: "muted", children: "68%" },
                  ],
                },
                { 
                  type: "Progress", 
                  value: 68, 
                  className: "bg-green-100 [&_[data-slot='progress-indicator']]:bg-green-500" 
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  children: [
                    { type: "Text", size: "small", children: "Storage" },
                    { type: "Text", size: "small", variant: "muted", children: "84%" },
                  ],
                },
                { 
                  type: "Progress", 
                  value: 84, 
                  className: "bg-orange-100 [&_[data-slot='progress-indicator']]:bg-orange-500" 
                },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Progress Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile progress indicator component that visually represents the completion of a task or process. Perfect for showing upload progress, loading states, and system metrics.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Progress component provides a clean and accessible way to display progress information to users. Built on Radix UI primitives, it ensures proper accessibility features and smooth animations.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Values from 0 to 100 representing percentage completion</li>
                <li>Customizable width, height, and colors via className</li>
                <li>Built-in accessibility with proper ARIA attributes</li>
                <li>Smooth visual transitions</li>
                <li>Support for custom styling and theming</li>
                <li>Responsive design that works across all screen sizes</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest way to use the Progress component is to specify a value between 0 and 100.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicUsageSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicUsageSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Progress Values Section */}
          <section id="progress-values" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Progress Values</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Progress bars can represent any value from 0% (empty) to 100% (complete).
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(progressValuesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(progressValuesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Custom Styling Section */}
          <section id="custom-styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the progress bar&apos;s appearance using the className prop to modify width, height, and shape.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(customStylingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customStylingSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Labels Section */}
          <section id="with-labels" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Progress with Labels</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance progress bars with descriptive labels and percentage indicators.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withLabelsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(withLabelsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Sizes Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Different Sizes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Progress bars can be made thinner or thicker to fit different design contexts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(sizesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(sizesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Colors Section */}
          <section id="colors" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Colors</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Change the progress bar colors to indicate different states or match your brand.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(colorsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(colorsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Animated Section */}
          <section id="animated" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Animated Progress</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Progress bars include smooth transitions when values change, perfect for real-time updates.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(animatedProgressSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(animatedProgressSpec, null, 2)}
              </CodeBlock>
            </details>
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
                    <td className="py-3 px-4 font-mono">&quot;Progress&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">0</td>
                    <td className="py-3 px-4">Progress value from 0 to 100</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes for styling</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">style</td>
                    <td className="py-3 px-4 font-mono">object</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Inline styles for the component</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaLabel</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Accessible label for the progress bar</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaValueText</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Accessible description of the current value</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">max</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">100</td>
                    <td className="py-3 px-4">Maximum value of the progress indicator</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how progress bars work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* File Upload Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">File Upload Progress</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(fileUploadExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(fileUploadExampleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* System Stats Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">System Resource Monitoring</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(systemStatsSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(systemStatsSpec, null, 2)}
              </CodeBlock>
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