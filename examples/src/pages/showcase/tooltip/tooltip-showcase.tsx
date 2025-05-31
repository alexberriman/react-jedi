import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function TooltipShowcase() {
  usePageMetadata({
    title: "Tooltip Component",
    description:
      "A comprehensive showcase of the React Jedi Tooltip component with positioning, delays, and various trigger elements.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "positioning", label: "Positioning" },
    { id: "triggers", label: "Different Triggers" },
    { id: "delays", label: "Delays & Timing" },
    { id: "styling", label: "Custom Styling" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Real-world Examples" },
  ];

  // Basic tooltip specification
  const basicTooltipSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    align: "center",
    children: [
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Hover me", variant: "outline" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "This is a tooltip!" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Click me", variant: "default" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Tooltips work on focus too" }],
          },
        ],
      },
    ],
  };

  // Positioning variations
  const positioningSpec: UISpecification = {
    type: "Grid",
    columns: { base: 2, md: 4 },
    gap: "4",
    className: "place-items-center",
    children: [
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Top", variant: "outline", size: "sm" }],
          },
          {
            type: "TooltipContent",
            props: { side: "top" },
            children: [{ type: "Text", children: "Top tooltip" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Right", variant: "outline", size: "sm" }],
          },
          {
            type: "TooltipContent",
            props: { side: "right" },
            children: [{ type: "Text", children: "Right tooltip" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Bottom", variant: "outline", size: "sm" }],
          },
          {
            type: "TooltipContent",
            props: { side: "bottom" },
            children: [{ type: "Text", children: "Bottom tooltip" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Left", variant: "outline", size: "sm" }],
          },
          {
            type: "TooltipContent",
            props: { side: "left" },
            children: [{ type: "Text", children: "Left tooltip" }],
          },
        ],
      },
    ],
  };

  // Different trigger elements
  const triggersSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    align: "center",
    children: [
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Button Trigger", variant: "default" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Tooltip on a button" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Badge", children: "Badge Trigger" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Tooltip on a badge" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Text", children: "Text Trigger", className: "cursor-help underline decoration-dashed" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Tooltip on text" }],
          },
        ],
      },
    ],
  };

  // Delay variations
  const delaysSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    align: "center",
    children: [
      {
        type: "Tooltip",
        props: { delayDuration: 0 },
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "No Delay", variant: "outline" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Appears immediately" }],
          },
        ],
      },
      {
        type: "Tooltip",
        props: { delayDuration: 500 },
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "500ms Delay", variant: "outline" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Takes 500ms to appear" }],
          },
        ],
      },
      {
        type: "Tooltip",
        props: { delayDuration: 1000 },
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "1s Delay", variant: "outline" }],
          },
          {
            type: "TooltipContent",
            children: [{ type: "Text", children: "Takes 1 second to appear" }],
          },
        ],
      },
    ],
  };

  // Custom styling
  const stylingSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    align: "center",
    children: [
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Custom Style", variant: "outline" }],
          },
          {
            type: "TooltipContent",
            props: { className: "bg-purple-600 text-white border-purple-700" },
            children: [{ type: "Text", children: "Custom purple tooltip" }],
          },
        ],
      },
      {
        type: "Tooltip",
        children: [
          {
            type: "TooltipTrigger",
            children: [{ type: "Button", children: "Rich Content", variant: "outline" }],
          },
          {
            type: "TooltipContent",
            props: { className: "max-w-xs" },
            children: [
              {
                type: "Stack",
                spacing: "2",
                children: [
                  { type: "Text", children: "Rich Tooltip", weight: "semibold" },
                  { type: "Text", children: "Tooltips can contain multiple elements and custom styling.", size: "small", variant: "muted" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Real-world examples
  const examplesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        className: "w-full max-w-md",
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: "User Profile" },
              { type: "CardDescription", children: "Hover over elements for more information" },
            ],
          },
          {
            type: "CardContent",
            children: [
              {
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Group",
                    spacing: "2",
                    align: "center",
                    children: [
                      { type: "Label", children: "Username:" },
                      {
                        type: "Tooltip",
                        children: [
                          {
                            type: "TooltipTrigger",
                            children: [{ type: "Text", children: "johndoe", className: "cursor-help" }],
                          },
                          {
                            type: "TooltipContent",
                            children: [{ type: "Text", children: "This username was created on March 15, 2024" }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Group",
                    spacing: "2",
                    align: "center",
                    children: [
                      { type: "Label", children: "Status:" },
                      {
                        type: "Tooltip",
                        children: [
                          {
                            type: "TooltipTrigger",
                            children: [{ type: "Badge", children: "Active", className: "bg-green-100 text-green-800" }],
                          },
                          {
                            type: "TooltipContent",
                            children: [{ type: "Text", children: "Last seen 2 minutes ago" }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Group",
                    spacing: "2",
                    align: "center",
                    children: [
                      {
                        type: "Tooltip",
                        children: [
                          {
                            type: "TooltipTrigger",
                            children: [{ type: "Button", children: "Edit Profile", variant: "outline", size: "sm" }],
                          },
                          {
                            type: "TooltipContent",
                            children: [{ type: "Text", children: "Click to edit user profile information" }],
                          },
                        ],
                      },
                      {
                        type: "Tooltip",
                        children: [
                          {
                            type: "TooltipTrigger",
                            children: [{ type: "Button", children: "Delete", variant: "destructive", size: "sm" }],
                          },
                          {
                            type: "TooltipContent",
                            children: [{ type: "Text", children: "⚠️ This action cannot be undone" }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="flex">
      {/* Sidebar Table of Contents */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
        <nav>
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
            On This Page
          </h3>
          <ul className="space-y-1">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                    document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block py-1 px-2 text-sm rounded transition-colors ${
                    activeSection === item.id
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-3">Quick Links</h4>
          <div className="space-y-2">
            <Link
              to="/showcase"
              className="block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              ← Back to Showcase
            </Link>
            <Link
              to="/documentation"
              className="block text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-20">
          <h1 className="text-4xl font-bold mb-4">Tooltip Component</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            A popup that displays brief information when users hover over or focus on an element.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Tooltips are perfect for providing additional context without cluttering the interface. They support
            custom positioning, delays, rich content, and are fully accessible with keyboard navigation and screen readers.
          </p>
        </section>

        {/* Basic Usage Section */}
        <section id="basic" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The simplest tooltip consists of a trigger element and tooltip content. Hover or focus to see the tooltip.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(basicTooltipSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicTooltipSpec, null, 2)}
              </CodeBlock>
          </details>
        </section>

        {/* Positioning Section */}
        <section id="positioning" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Positioning</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Control where the tooltip appears relative to its trigger using the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">side</code> prop.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(positioningSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <CodeBlock language="json" className="mt-2">
                {JSON.stringify(positioningSpec, null, 2)}
              </CodeBlock>
          </details>
        </section>

        {/* Different Triggers Section */}
        <section id="triggers" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Different Trigger Elements</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tooltips can be attached to any interactive or focusable element.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(triggersSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <CodeBlock language="json" className="mt-2">
                {JSON.stringify(triggersSpec, null, 2)}
              </CodeBlock>
          </details>
        </section>

        {/* Delays & Timing Section */}
        <section id="delays" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Delays & Timing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Control when tooltips appear and disappear using delay properties.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(delaysSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <CodeBlock language="json" className="mt-2">
                {JSON.stringify(delaysSpec, null, 2)}
              </CodeBlock>
          </details>
        </section>

        {/* Custom Styling Section */}
        <section id="styling" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Customize tooltip appearance and include rich content like multiple text elements.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(stylingSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <CodeBlock language="json" className="mt-2">
                {JSON.stringify(stylingSpec, null, 2)}
              </CodeBlock>
          </details>
        </section>

        {/* Accessibility Section */}
        <section id="accessibility" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Accessibility Features</h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200">
              <li>• Tooltips are announced to screen readers</li>
              <li>• Keyboard navigation support (focus and blur)</li>
              <li>• Proper ARIA attributes automatically added</li>
              <li>• ESC key dismisses tooltips</li>
              <li>• Respects reduced motion preferences</li>
            </ul>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The tooltip component follows WAI-ARIA guidelines and provides a fully accessible experience.
            It automatically manages focus, keyboard interactions, and screen reader announcements.
          </p>
        </section>

        {/* Props & Options Section */}
        <section id="props" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100">Prop</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100">Type</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100">Default</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-gray-100">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-mono text-sm">delayDuration</td>
                  <td className="p-3 text-sm">number</td>
                  <td className="p-3 text-sm">0</td>
                  <td className="p-3 text-sm">Delay in milliseconds before tooltip appears</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">skipDelayDuration</td>
                  <td className="p-3 text-sm">number</td>
                  <td className="p-3 text-sm">300</td>
                  <td className="p-3 text-sm">Duration from when mouse enters trigger until tooltip opens</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">disableHoverableContent</td>
                  <td className="p-3 text-sm">boolean</td>
                  <td className="p-3 text-sm">false</td>
                  <td className="p-3 text-sm">Disable hovering content to keep tooltip open</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">defaultOpen</td>
                  <td className="p-3 text-sm">boolean</td>
                  <td className="p-3 text-sm">false</td>
                  <td className="p-3 text-sm">The open state when initially rendered</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">side</td>
                  <td className="p-3 text-sm">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</td>
                  <td className="p-3 text-sm">&quot;top&quot;</td>
                  <td className="p-3 text-sm">Preferred side to render against trigger</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">sideOffset</td>
                  <td className="p-3 text-sm">number</td>
                  <td className="p-3 text-sm">0</td>
                  <td className="p-3 text-sm">Distance in pixels from the trigger</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">align</td>
                  <td className="p-3 text-sm">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td>
                  <td className="p-3 text-sm">&quot;center&quot;</td>
                  <td className="p-3 text-sm">Preferred alignment against the trigger</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">avoidCollisions</td>
                  <td className="p-3 text-sm">boolean</td>
                  <td className="p-3 text-sm">true</td>
                  <td className="p-3 text-sm">Whether to avoid viewport collisions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-world Examples Section */}
        <section id="examples" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-world Examples</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Here&apos;s how tooltips can enhance user interfaces in practical applications.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {render(examplesSpec)}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              View JSON Specification
            </summary>
            <CodeBlock language="json" className="mt-2">
                {JSON.stringify(examplesSpec, null, 2)}
              </CodeBlock>
          </details>
        </section>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <Link
              to="/showcase"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              ← Back to Component Showcase
            </Link>
            <Link
              to="/documentation"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              View Full Documentation →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}