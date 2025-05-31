import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function CollapsibleShowcase() {
  usePageMetadata({
    title: "Collapsible Component",
    description:
      "A comprehensive showcase of the React Jedi Collapsible component with all variants, states, and usage examples for expandable content areas.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "controlled", label: "Controlled State" },
    { id: "default-open", label: "Default Open" },
    { id: "with-icons", label: "With Icons" },
    { id: "disabled", label: "Disabled State" },
    { id: "multiple", label: "Multiple Collapsibles" },
    { id: "faq", label: "FAQ Style" },
    { id: "card-integration", label: "Card Integration" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic collapsible specification
  const basicSpec: UISpecification = {
    type: "Collapsible",
    children: [
      {
        type: "CollapsibleTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Toggle Content",
        },
      },
      {
        type: "CollapsibleContent",
        className: "mt-2",
        children: {
          type: "Box",
          className: "rounded-md border px-4 py-3 text-sm",
          children: "This is the collapsible content. It can be expanded or collapsed by clicking the trigger button above.",
        },
      },
    ],
  };

  // Controlled collapsible specification
  const controlledSpec: UISpecification = {
    type: "Stack",
    spacing: "2",
    children: [
      {
        type: "Collapsible",
        // Note: In real implementation, this would be controlled with state
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              children: "Show/Hide Content",
            },
          },
          {
            type: "CollapsibleContent",
            className: "mt-2",
            children: {
              type: "Box",
              className: "rounded-md border px-4 py-3 text-sm",
              children: "This collapsible is controlled by external state. You can programmatically open or close it.",
            },
          },
        ],
      },
      {
        type: "Group",
        spacing: "2",
        children: [
          {
            type: "Button",
            size: "sm",
            children: "Open",
          },
          {
            type: "Button",
            size: "sm",
            children: "Close",
          },
        ],
      },
    ],
  };

  // Default open specification
  const defaultOpenSpec: UISpecification = {
    type: "Collapsible",
    defaultOpen: true,
    children: [
      {
        type: "CollapsibleTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Toggle Content",
        },
      },
      {
        type: "CollapsibleContent",
        className: "mt-2",
        children: {
          type: "Box",
          className: "rounded-md border px-4 py-3 text-sm",
          children: "This collapsible starts in the open state by default. The content is visible immediately when the component mounts.",
        },
      },
    ],
  };

  // With icons specification
  const withIconsSpec: UISpecification = {
    type: "Collapsible",
    children: [
      {
        type: "CollapsibleTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "ghost",
          className: "flex items-center gap-2",
          children: "🔽 Advanced Settings",
        },
      },
      {
        type: "CollapsibleContent",
        className: "mt-2",
        children: {
          type: "Box",
          className: "space-y-2 rounded-md border p-4",
          children: [
            {
              type: "Flex",
              justify: "space-between",
              children: [
                {
                  type: "Text",
                  className: "text-sm font-medium",
                  children: "Auto-save",
                },
                {
                  type: "Text",
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "Enabled",
                },
              ],
            },
            {
              type: "Flex",
              justify: "space-between",
              children: [
                {
                  type: "Text",
                  className: "text-sm font-medium",
                  children: "Cache size",
                },
                {
                  type: "Text",
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "2.5 GB",
                },
              ],
            },
            {
              type: "Flex",
              justify: "space-between",
              children: [
                {
                  type: "Text",
                  className: "text-sm font-medium",
                  children: "Updates",
                },
                {
                  type: "Text",
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "Automatic",
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Disabled specification
  const disabledSpec: UISpecification = {
    type: "Collapsible",
    disabled: true,
    children: [
      {
        type: "CollapsibleTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          disabled: true,
          children: "Disabled Collapsible",
        },
      },
      {
        type: "CollapsibleContent",
        children: {
          type: "Box",
          className: "rounded-md border px-4 py-3 text-sm mt-2",
          children: "This content cannot be toggled because the collapsible is disabled.",
        },
      },
    ],
  };

  // Multiple collapsibles specification
  const multipleSpec: UISpecification = {
    type: "Stack",
    spacing: "2",
    children: [
      {
        type: "Collapsible",
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              className: "w-full justify-start",
              children: "Section 1",
            },
          },
          {
            type: "CollapsibleContent",
            className: "mt-1",
            children: {
              type: "Box",
              className: "rounded-md border px-4 py-3 text-sm",
              children: "Content for section 1. This can contain any elements like text, buttons, or other components.",
            },
          },
        ],
      },
      {
        type: "Collapsible",
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              className: "w-full justify-start",
              children: "Section 2",
            },
          },
          {
            type: "CollapsibleContent",
            className: "mt-1",
            children: {
              type: "Box",
              className: "rounded-md border px-4 py-3 text-sm",
              children: "Content for section 2. Multiple collapsibles can be used together, and each operates independently.",
            },
          },
        ],
      },
      {
        type: "Collapsible",
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "outline",
              className: "w-full justify-start",
              children: "Section 3",
            },
          },
          {
            type: "CollapsibleContent",
            className: "mt-1",
            children: {
              type: "Box",
              className: "rounded-md border px-4 py-3 text-sm",
              children: "Content for section 3. Each collapsible maintains its own state and can be opened or closed independently.",
            },
          },
        ],
      },
    ],
  };

  // FAQ style specification
  const faqSpec: UISpecification = {
    type: "Stack",
    spacing: "2",
    children: [
      {
        type: "Heading",
        level: "h3",
        className: "text-lg font-semibold mb-4",
        children: "Frequently Asked Questions",
      },
      {
        type: "Collapsible",
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "ghost",
              className: "w-full justify-between px-4 py-2 text-left font-medium",
              children: "What is React Jedi? 🔽",
            },
          },
          {
            type: "CollapsibleContent",
            children: {
              type: "Box",
              className: "px-4 py-2 text-sm text-gray-600 dark:text-gray-400",
              children: "React Jedi is a server-driven UI library that enables developers to build modern React interfaces using JSON specifications.",
            },
          },
        ],
      },
      {
        type: "Collapsible",
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "ghost",
              className: "w-full justify-between px-4 py-2 text-left font-medium",
              children: "How do I install React Jedi? 🔽",
            },
          },
          {
            type: "CollapsibleContent",
            children: {
              type: "Box",
              className: "px-4 py-2 text-sm text-gray-600 dark:text-gray-400",
              children: "You can install React Jedi using npm: npm install @banja/react-jedi",
            },
          },
        ],
      },
      {
        type: "Collapsible",
        children: [
          {
            type: "CollapsibleTrigger",
            asChild: true,
            children: {
              type: "Button",
              variant: "ghost",
              className: "w-full justify-between px-4 py-2 text-left font-medium",
              children: "What components are available? 🔽",
            },
          },
          {
            type: "CollapsibleContent",
            children: {
              type: "Box",
              className: "px-4 py-2 text-sm text-gray-600 dark:text-gray-400",
              children: "React Jedi includes layout components, UI components, typography, media components, and more. Visit the showcase to explore all available components.",
            },
          },
        ],
      },
    ],
  };

  // Card integration specification
  const cardIntegrationSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          {
            type: "CardTitle",
            children: "Order Summary",
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "2",
          children: [
            {
              type: "Flex",
              justify: "space-between",
              children: [
                { type: "Text", children: "Subtotal" },
                { type: "Text", children: "$99.00" },
              ],
            },
            {
              type: "Flex",
              justify: "space-between",
              children: [
                { type: "Text", children: "Tax" },
                { type: "Text", children: "$8.92" },
              ],
            },
            {
              type: "Collapsible",
              children: [
                {
                  type: "CollapsibleTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "link",
                    className: "h-auto p-0 text-sm",
                    children: "View tax details",
                  },
                },
                {
                  type: "CollapsibleContent",
                  children: {
                    type: "Stack",
                    spacing: "1",
                    className: "pt-2 text-sm text-gray-600 dark:text-gray-400",
                    children: [
                      {
                        type: "Flex",
                        justify: "space-between",
                        children: [
                          { type: "Text", children: "State Tax (8%)" },
                          { type: "Text", children: "$7.92" },
                        ],
                      },
                      {
                        type: "Flex",
                        justify: "space-between",
                        children: [
                          { type: "Text", children: "Local Tax (1%)" },
                          { type: "Text", children: "$1.00" },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              type: "Separator",
              className: "my-2",
            },
            {
              type: "Flex",
              justify: "space-between",
              className: "font-semibold",
              children: [
                { type: "Text", children: "Total" },
                { type: "Text", children: "$107.92" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Collapsible Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A collapsible component for showing and hiding content. Perfect for creating expandable sections, FAQ items, and organizing information in a space-efficient way.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Collapsible component provides an accessible way to toggle the visibility of content. It&apos;s built on top of Radix UI primitives and follows accessibility best practices for disclosure widgets.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Smooth expand/collapse animations</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Customizable trigger elements using asChild prop</li>
                <li>Accessible keyboard navigation</li>
                <li>Proper ARIA attributes and states</li>
                <li>Supports nested content and complex layouts</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest form of a collapsible with a trigger button and expandable content.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Controlled State Section */}
          <section id="controlled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Controlled State</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the collapsible state externally using the open prop and onOpenChange callback.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(controlledSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(controlledSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Default Open Section */}
          <section id="default-open" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Default Open</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Set the initial state to open using the defaultOpen prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(defaultOpenSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(defaultOpenSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance the trigger with icons to provide visual feedback about the state.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withIconsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(withIconsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Disabled State Section */}
          <section id="disabled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Disabled State</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Disable the collapsible to prevent user interaction.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(disabledSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(disabledSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Multiple Collapsibles Section */}
          <section id="multiple" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Multiple Collapsibles</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use multiple collapsibles together to create organized sections of content.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(multipleSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(multipleSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* FAQ Style Section */}
          <section id="faq" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">FAQ Style</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create FAQ-style layouts with question/answer pairs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(faqSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(faqSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Card Integration Section */}
          <section id="card-integration" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Card Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Integrate collapsibles within cards for detailed information disclosure.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(cardIntegrationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(cardIntegrationSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Collapsible&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Trigger and content components</td>
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
                    <td className="py-3 px-4">Default open state when uncontrolled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the collapsible is disabled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onOpenChange</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Called when the open state changes</td>
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
            
            <h3 className="text-lg font-medium mt-6 mb-3">Sub-components</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Component</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">CollapsibleTrigger</td>
                    <td className="py-3 px-4 font-mono">&quot;CollapsibleTrigger&quot;</td>
                    <td className="py-3 px-4">The trigger element that toggles the collapsible</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">CollapsibleContent</td>
                    <td className="py-3 px-4 font-mono">&quot;CollapsibleContent&quot;</td>
                    <td className="py-3 px-4">The content that expands and collapses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing how to use collapsibles in different contexts.
            </p>
            
            <div className="space-y-8">
              {/* Settings Panel Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Settings Panel with Collapsible Sections</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Card",
                    className: "w-full max-w-lg",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          { type: "CardTitle", children: "Application Settings" },
                          { type: "CardDescription", children: "Configure your application preferences" },
                        ],
                      },
                      {
                        type: "CardContent",
                        children: {
                          type: "Stack",
                          spacing: "4",
                          children: [
                            {
                              type: "Collapsible",
                              children: [
                                {
                                  type: "CollapsibleTrigger",
                                  asChild: true,
                                  children: {
                                    type: "Button",
                                    variant: "ghost",
                                    className: "w-full justify-between p-0 h-auto",
                                    children: "🔔 Notifications",
                                  },
                                },
                                {
                                  type: "CollapsibleContent",
                                  className: "mt-3",
                                  children: {
                                    type: "Stack",
                                    spacing: "3",
                                    className: "pl-4 border-l-2 border-gray-200 dark:border-gray-800",
                                    children: [
                                      {
                                        type: "Flex",
                                        align: "center",
                                        justify: "space-between",
                                        children: [
                                          { type: "Text", className: "text-sm", children: "Email notifications" },
                                          { type: "Switch" },
                                        ],
                                      },
                                      {
                                        type: "Flex",
                                        align: "center",
                                        justify: "space-between",
                                        children: [
                                          { type: "Text", className: "text-sm", children: "Push notifications" },
                                          { type: "Switch" },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            {
                              type: "Collapsible",
                              children: [
                                {
                                  type: "CollapsibleTrigger",
                                  asChild: true,
                                  children: {
                                    type: "Button",
                                    variant: "ghost",
                                    className: "w-full justify-between p-0 h-auto",
                                    children: "🎨 Appearance",
                                  },
                                },
                                {
                                  type: "CollapsibleContent",
                                  className: "mt-3",
                                  children: {
                                    type: "Stack",
                                    spacing: "3",
                                    className: "pl-4 border-l-2 border-gray-200 dark:border-gray-800",
                                    children: [
                                      {
                                        type: "Flex",
                                        align: "center",
                                        justify: "space-between",
                                        children: [
                                          { type: "Text", className: "text-sm", children: "Dark mode" },
                                          { type: "Switch" },
                                        ],
                                      },
                                      {
                                        type: "Flex",
                                        align: "center",
                                        justify: "space-between",
                                        children: [
                                          { type: "Text", className: "text-sm", children: "High contrast" },
                                          { type: "Switch" },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  })}
                </div>
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