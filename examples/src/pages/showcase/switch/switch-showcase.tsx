import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function SwitchShowcase() {
  usePageMetadata({
    title: "Switch Component",
    description:
      "A toggle switch component for boolean values. Perfect for settings, preferences, and feature toggles in your application.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "states", label: "Switch States" },
    { id: "with-labels", label: "Switches with Labels" },
    { id: "sizes", label: "Size Variations" },
    { id: "controlled", label: "Controlled Switches" },
    { id: "form-integration", label: "Form Integration" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic switch specification
  const basicSpec: UISpecification = {
    type: "Switch",
    id: "basic-switch",
  };

  // Switch states specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "unchecked-switch" },
          { type: "Text", children: "Unchecked (default)" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "checked-switch", defaultChecked: true },
          { type: "Text", children: "Checked" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "disabled-unchecked-switch", disabled: true },
          { type: "Text", children: "Disabled (unchecked)" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "disabled-checked-switch", disabled: true, defaultChecked: true },
          { type: "Text", children: "Disabled (checked)" },
        ],
      },
    ],
  };

  // Switches with labels
  const withLabelsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "Switch", id: "airplane-mode" },
          { type: "Label", htmlFor: "airplane-mode", children: "Airplane Mode" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "Label", htmlFor: "notifications", children: "Enable Notifications" },
          { type: "Switch", id: "notifications", defaultChecked: true },
        ],
      },
      {
        type: "Flex",
        justify: "between",
        align: "center",
        className: "w-full max-w-sm p-4 border rounded-lg",
        children: [
          {
            type: "Box",
            children: [
              { type: "Label", htmlFor: "marketing", className: "font-medium", children: "Marketing Emails" },
              { 
                type: "Text", 
                size: "small", 
                variant: "muted", 
                children: "Receive emails about new products and features" 
              },
            ],
          },
          { type: "Switch", id: "marketing" },
        ],
      },
    ],
  };

  // Size variations (using className for custom sizes)
  const sizesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "small-switch", className: "scale-75" },
          { type: "Text", children: "Small (75% scale)" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "default-switch" },
          { type: "Text", children: "Default size" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Switch", id: "large-switch", className: "scale-125" },
          { type: "Text", children: "Large (125% scale)" },
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
          { type: "CardTitle", children: "Privacy Settings" },
          { type: "CardDescription", children: "Manage your privacy preferences" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "6",
          children: [
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Label", htmlFor: "public-profile", className: "font-medium", children: "Public Profile" },
                    { 
                      type: "Text", 
                      size: "small", 
                      variant: "muted", 
                      children: "Make your profile visible to everyone" 
                    },
                  ],
                },
                { type: "Switch", id: "public-profile", name: "publicProfile", value: "true" },
              ],
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Label", htmlFor: "activity-status", className: "font-medium", children: "Activity Status" },
                    { 
                      type: "Text", 
                      size: "small", 
                      variant: "muted", 
                      children: "Show when you&apos;re active" 
                    },
                  ],
                },
                { type: "Switch", id: "activity-status", name: "activityStatus", value: "true", defaultChecked: true },
              ],
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Label", htmlFor: "read-receipts", className: "font-medium", children: "Read Receipts" },
                    { 
                      type: "Text", 
                      size: "small", 
                      variant: "muted", 
                      children: "Let others know when you&apos;ve read messages" 
                    },
                  ],
                },
                { type: "Switch", id: "read-receipts", name: "readReceipts", value: "true", defaultChecked: true },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: {
          type: "Button",
          variant: "primary",
          children: "Save Settings",
          className: "w-full",
        },
      },
    ],
  };

  // Settings panel example
  const settingsPanelSpec: UISpecification = {
    type: "Box",
    className: "w-full max-w-2xl",
    children: {
      type: "Stack",
      spacing: "8",
      children: [
        {
          type: "Box",
          children: [
            { type: "Heading", level: 3, children: "Appearance" },
            { type: "Text", variant: "muted", className: "mt-1", children: "Customize how the app looks on your device" },
            {
              type: "Stack",
              spacing: "4",
              className: "mt-6",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  className: "pb-4 border-b",
                  children: [
                    {
                      type: "Box",
                      children: [
                        { type: "Text", className: "font-medium", children: "Dark Mode" },
                        { 
                          type: "Text", 
                          size: "small", 
                          variant: "muted", 
                          children: "Use dark theme across the application" 
                        },
                      ],
                    },
                    { type: "Switch", id: "dark-mode" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  className: "pb-4 border-b",
                  children: [
                    {
                      type: "Box",
                      children: [
                        { type: "Text", className: "font-medium", children: "High Contrast" },
                        { 
                          type: "Text", 
                          size: "small", 
                          variant: "muted", 
                          children: "Increase contrast for better visibility" 
                        },
                      ],
                    },
                    { type: "Switch", id: "high-contrast" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  className: "pb-4",
                  children: [
                    {
                      type: "Box",
                      children: [
                        { type: "Text", className: "font-medium", children: "Reduce Motion" },
                        { 
                          type: "Text", 
                          size: "small", 
                          variant: "muted", 
                          children: "Minimize animations throughout the app" 
                        },
                      ],
                    },
                    { type: "Switch", id: "reduce-motion" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            { type: "Heading", level: 3, children: "Notifications" },
            { type: "Text", variant: "muted", className: "mt-1", children: "Choose what notifications you receive" },
            {
              type: "Stack",
              spacing: "4",
              className: "mt-6",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  className: "pb-4 border-b",
                  children: [
                    {
                      type: "Box",
                      children: [
                        { type: "Text", className: "font-medium", children: "Push Notifications" },
                        { 
                          type: "Text", 
                          size: "small", 
                          variant: "muted", 
                          children: "Receive push notifications on your device" 
                        },
                      ],
                    },
                    { type: "Switch", id: "push-notifications", defaultChecked: true },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  className: "pb-4 border-b",
                  children: [
                    {
                      type: "Box",
                      children: [
                        { type: "Text", className: "font-medium", children: "Email Notifications" },
                        { 
                          type: "Text", 
                          size: "small", 
                          variant: "muted", 
                          children: "Receive important updates via email" 
                        },
                      ],
                    },
                    { type: "Switch", id: "email-notifications", defaultChecked: true },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  align: "center",
                  className: "pb-4",
                  children: [
                    {
                      type: "Box",
                      children: [
                        { type: "Text", className: "font-medium", children: "Sound Effects" },
                        { 
                          type: "Text", 
                          size: "small", 
                          variant: "muted", 
                          children: "Play sounds for notifications and actions" 
                        },
                      ],
                    },
                    { type: "Switch", id: "sound-effects" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Switch Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A toggle switch component for boolean values. Perfect for settings, preferences, and feature toggles in your application.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Switch component provides a toggleable control that represents a boolean choice. It&apos;s commonly used in settings panels, forms, and anywhere users need to turn features on or off.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accessible by default with proper ARIA attributes and keyboard support</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Disabled state support</li>
                <li>Form integration with name and value attributes</li>
                <li>Customizable appearance with className</li>
                <li>Smooth transition animations</li>
                <li>Full keyboard navigation (Space to toggle)</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest way to use a Switch component is to add it to your specification.
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

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Switch States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Switches can be in different states: unchecked, checked, or disabled.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(statesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(statesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Labels Section */}
          <section id="with-labels" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Switches with Labels</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Combine switches with labels to provide clear context about what the toggle controls.
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

          {/* Size Variations Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Size Variations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              While the Switch component has a default size, you can use CSS transforms to create different sizes.
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

          {/* Controlled Switches Section */}
          <section id="controlled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Controlled Switches</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Switches can be controlled by providing a <code>checked</code> prop and handling the <code>onCheckedChange</code> event. This is useful when you need to sync the switch state with your application state.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> In the SDUI context, you would handle the <code>onCheckedChange</code> event through your event handling system.
                </p>
              </div>
            </div>
          </section>

          {/* Form Integration Section */}
          <section id="form-integration" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Switches work seamlessly in forms with proper name and value attributes.
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

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Switch component is built with accessibility in mind:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper ARIA attributes including <code>role=&quot;switch&quot;</code> and <code>aria-checked</code></li>
                <li>Full keyboard support (Space key to toggle)</li>
                <li>Focus indicators for keyboard navigation</li>
                <li>Screen reader announcements for state changes</li>
                <li>Associates with labels using <code>htmlFor</code> attribute</li>
                <li>Respects <code>prefers-reduced-motion</code> for animations</li>
              </ul>
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
                    <td className="py-3 px-4 font-mono">&quot;Switch&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Unique identifier for the switch</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">checked</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Controlled checked state</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultChecked</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Default checked state for uncontrolled mode</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the switch is disabled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onCheckedChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler name for state changes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Value for form submission</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">name</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Name attribute for form submission</td>
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
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how switches work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Settings Panel Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Comprehensive Settings Panel</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(settingsPanelSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(settingsPanelSpec, null, 2)}
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