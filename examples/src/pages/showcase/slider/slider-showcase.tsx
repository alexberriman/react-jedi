import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function SliderShowcase() {
  usePageMetadata({
    title: "Slider Component",
    description:
      "An accessible and customizable slider component for selecting values from a range. Perfect for volume controls, progress indicators, and numeric input.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "range-slider", label: "Range Slider" },
    { id: "step-values", label: "Step Values" },
    { id: "custom-range", label: "Custom Range" },
    { id: "disabled-state", label: "Disabled State" },
    { id: "vertical-orientation", label: "Vertical Orientation" },
    { id: "styled-examples", label: "Styled Examples" },
    { id: "form-integration", label: "Form Integration" },
    { id: "props", label: "Props & Options" },
  ];

  // Basic slider specification
  const basicSliderSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", children: "Volume", className: "mb-2 block" },
          { type: "Slider", defaultValue: [50] },
        ],
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Drag the slider to adjust the value",
      },
    ],
  };

  // Range slider (multiple handles) specification
  const rangeSliderSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", children: "Price Range", className: "mb-2 block" },
          { type: "Slider", defaultValue: [25, 75], max: 100 },
        ],
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Select a price range between 0 and 100",
      },
    ],
  };

  // Step values specification
  const stepValuesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-md",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", children: "Step: 10", className: "mb-2 block" },
          { type: "Slider", defaultValue: [30], step: 10 },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Step: 0.1", className: "mb-2 block" },
          { type: "Slider", defaultValue: [0.5], min: 0, max: 1, step: 0.1 },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Step: 25", className: "mb-2 block" },
          { type: "Slider", defaultValue: [50], step: 25 },
        ],
      },
    ],
  };

  // Custom range specification
  const customRangeSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-md",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", children: "Temperature (°C)", className: "mb-2 block" },
          { type: "Slider", defaultValue: [20], min: -10, max: 40 },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Year", className: "mb-2 block" },
          { type: "Slider", defaultValue: [2023], min: 1900, max: 2030, step: 1 },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Percentage", className: "mb-2 block" },
          { type: "Slider", defaultValue: [65], min: 0, max: 100, step: 5 },
        ],
      },
    ],
  };

  // Disabled state specification
  const disabledStateSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", children: "Disabled Slider", className: "mb-2 block" },
          { type: "Slider", defaultValue: [30], disabled: true },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Disabled Range Slider", className: "mb-2 block" },
          { type: "Slider", defaultValue: [20, 80], disabled: true },
        ],
      },
    ],
  };

  // Vertical orientation specification
  const verticalOrientationSpec: UISpecification = {
    type: "Group",
    spacing: "8",
    children: [
      {
        type: "Box",
        className: "text-center",
        children: [
          { type: "Label", children: "Bass", className: "mb-4 block" },
          {
            type: "Box",
            className: "h-48 flex justify-center",
            children: { type: "Slider", defaultValue: [60], orientation: "vertical" },
          },
        ],
      },
      {
        type: "Box",
        className: "text-center",
        children: [
          { type: "Label", children: "Mid", className: "mb-4 block" },
          {
            type: "Box",
            className: "h-48 flex justify-center",
            children: { type: "Slider", defaultValue: [40], orientation: "vertical" },
          },
        ],
      },
      {
        type: "Box",
        className: "text-center",
        children: [
          { type: "Label", children: "Treble", className: "mb-4 block" },
          {
            type: "Box",
            className: "h-48 flex justify-center",
            children: { type: "Slider", defaultValue: [70], orientation: "vertical" },
          },
        ],
      },
    ],
  };

  // Styled examples specification
  const styledExamplesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-md",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", children: "Thick Track", className: "mb-2 block" },
          {
            type: "Slider",
            defaultValue: [40],
            className: "[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6",
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Custom Colors", className: "mb-2 block" },
          {
            type: "Slider",
            defaultValue: [60],
            className: "[&_[data-slot=slider-range]]:bg-green-500 [&_[data-slot=slider-thumb]]:border-green-500",
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", children: "Gradient Track", className: "mb-2 block" },
          {
            type: "Slider",
            defaultValue: [75],
            className: "[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-blue-500 [&_[data-slot=slider-range]]:to-purple-500",
          },
        ],
      },
    ],
  };

  // Form integration example
  const formIntegrationSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Audio Settings" },
          { type: "CardDescription", children: "Adjust your audio preferences" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "6",
          children: [
            {
              type: "Box",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  className: "mb-2",
                  children: [
                    { type: "Label", children: "Master Volume" },
                    { type: "Text", size: "small", variant: "muted", children: "75%" },
                  ],
                },
                { type: "Slider", name: "masterVolume", defaultValue: [75] },
              ],
            },
            {
              type: "Box",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  className: "mb-2",
                  children: [
                    { type: "Label", children: "Balance" },
                    { type: "Text", size: "small", variant: "muted", children: "Center" },
                  ],
                },
                { type: "Slider", name: "balance", defaultValue: [50], min: 0, max: 100 },
              ],
            },
            {
              type: "Separator",
            },
            {
              type: "Box",
              children: [
                { type: "Label", children: "Equalizer", className: "mb-4 block font-semibold" },
                {
                  type: "Stack",
                  spacing: "3",
                  children: [
                    {
                      type: "Flex",
                      align: "center",
                      gap: "3",
                      children: [
                        { type: "Text", size: "small", className: "w-16", children: "Bass" },
                        { type: "Slider", name: "bass", defaultValue: [60], className: "flex-1" },
                      ],
                    },
                    {
                      type: "Flex",
                      align: "center",
                      gap: "3",
                      children: [
                        { type: "Text", size: "small", className: "w-16", children: "Mid" },
                        { type: "Slider", name: "mid", defaultValue: [50], className: "flex-1" },
                      ],
                    },
                    {
                      type: "Flex",
                      align: "center",
                      gap: "3",
                      children: [
                        { type: "Text", size: "small", className: "w-16", children: "Treble" },
                        { type: "Slider", name: "treble", defaultValue: [40], className: "flex-1" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        className: "flex gap-3",
        children: [
          { type: "Button", variant: "outline", children: "Reset", className: "flex-1" },
          { type: "Button", variant: "primary", children: "Save Settings", className: "flex-1" },
        ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Slider Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              An accessible and customizable slider component for selecting values from a continuous or discrete range. Built on Radix UI primitives with full keyboard and screen reader support.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Slider component provides an intuitive way for users to select a value or range of values by dragging handles along a track. It&apos;s perfect for settings like volume controls, price ranges, or any numeric input where visual feedback is helpful.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Single or multi-handle (range) selection</li>
                <li>Horizontal and vertical orientations</li>
                <li>Customizable min, max, and step values</li>
                <li>Full keyboard navigation (arrow keys, Home, End)</li>
                <li>Screen reader accessible with ARIA attributes</li>
                <li>Touch-friendly and responsive</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Customizable styling with Tailwind classes</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple slider with default settings (0-100 range, single handle).
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSliderSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicSliderSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Range Slider Section */}
          <section id="range-slider" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Range Slider</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use multiple handles to select a range of values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(rangeSliderSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(rangeSliderSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Step Values Section */}
          <section id="step-values" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Step Values</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the granularity of value selection with the step prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(stepValuesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(stepValuesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Custom Range Section */}
          <section id="custom-range" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Range</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Set custom min and max values for specific use cases.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(customRangeSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customRangeSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Disabled State Section */}
          <section id="disabled-state" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Disabled State</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sliders can be disabled to prevent user interaction.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(disabledStateSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(disabledStateSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Vertical Orientation Section */}
          <section id="vertical-orientation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Vertical Orientation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sliders can be oriented vertically for specific UI needs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(verticalOrientationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(verticalOrientationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Styled Examples Section */}
          <section id="styled-examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Styled Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the appearance using Tailwind classes to target specific parts of the slider.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(styledExamplesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(styledExamplesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Form Integration Section */}
          <section id="form-integration" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A complete example showing sliders integrated in a form with labels and values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(formIntegrationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(formIntegrationSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Slider&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
                    <td className="py-3 px-4 font-mono">number[]</td>
                    <td className="py-3 px-4">[0]</td>
                    <td className="py-3 px-4">Default value(s) for uncontrolled mode</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">number[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Controlled value(s)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">min</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">0</td>
                    <td className="py-3 px-4">Minimum value</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">max</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">100</td>
                    <td className="py-3 px-4">Maximum value</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">step</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Step increment between values</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Disable slider interaction</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">orientation</td>
                    <td className="py-3 px-4 font-mono">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                    <td className="py-3 px-4">&quot;horizontal&quot;</td>
                    <td className="py-3 px-4">Slider orientation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">inverted</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Invert the slider direction</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">name</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Name attribute for form submission</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onValueChange</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Callback when value changes</td>
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
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h3 className="font-medium mb-2">Styling Parts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                The slider component exposes data-slot attributes for styling specific parts:
              </p>
              <ul className="text-sm space-y-1">
                <li><code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">data-slot=&quot;slider&quot;</code> - The root element</li>
                <li><code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">data-slot=&quot;slider-track&quot;</code> - The track container</li>
                <li><code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">data-slot=&quot;slider-range&quot;</code> - The filled range</li>
                <li><code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">data-slot=&quot;slider-thumb&quot;</code> - The draggable handle(s)</li>
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