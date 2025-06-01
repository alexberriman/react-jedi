import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function CheckboxShowcase() {
  usePageMetadata({
    title: "Checkbox Component",
    description:
      "A comprehensive showcase of the React Jedi Checkbox component with all variants, states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "states", label: "Checkbox States" },
    { id: "with-labels", label: "With Labels" },
    { id: "forms", label: "Form Integration" },
    { id: "validation", label: "Validation States" },
    { id: "groups", label: "Checkbox Groups" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic usage specification
  const basicUsageSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      { type: "Checkbox" },
      { type: "Checkbox", checked: true },
      { type: "Checkbox", defaultChecked: true },
    ],
  };

  // Checkbox states specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Checkbox" },
          { type: "Checkbox", checked: true },
          { type: "Checkbox", disabled: true },
          { type: "Checkbox", checked: true, disabled: true },
        ],
      },
      {
        type: "Group",
        spacing: "4",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: [
          { type: "Text", children: "Unchecked" },
          { type: "Text", children: "Checked" },
          { type: "Text", children: "Disabled" },
          { type: "Text", children: "Checked + Disabled" },
        ],
      },
    ],
  };

  // Checkboxes with labels
  const withLabelsSpec: UISpecification = {
    type: "Stack",
    spacing: "3",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "Checkbox", id: "terms" },
          { type: "Label", htmlFor: "terms", children: "I agree to the terms and conditions" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "Checkbox", id: "newsletter", defaultChecked: true },
          { type: "Label", htmlFor: "newsletter", children: "Subscribe to our newsletter" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "Checkbox", id: "marketing", disabled: true },
          { type: "Label", htmlFor: "marketing", children: "Receive marketing emails (disabled)" },
        ],
      },
    ],
  };

  // Form integration
  const formIntegrationSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Account Preferences" },
          { type: "CardDescription", children: "Customize your account settings" },
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
              spacing: "3",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "notifications", name: "notifications", value: "enabled" },
                    { type: "Label", htmlFor: "notifications", children: "Enable notifications" },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "analytics", name: "analytics", value: "enabled", defaultChecked: true },
                    { type: "Label", htmlFor: "analytics", children: "Help improve our service" },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "beta", name: "beta", value: "enabled" },
                    { type: "Label", htmlFor: "beta", children: "Join beta testing program" },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: [
          { type: "Button", variant: "outline", children: "Cancel", className: "flex-1" },
          { type: "Button", variant: "primary", children: "Save Preferences", className: "flex-1" },
        ],
      },
    ],
  };

  // Validation states
  const validationSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Flex",
            align: "center",
            gap: "2",
            children: [
              { type: "Checkbox", id: "required-field", required: true, "aria-describedby": "required-help" },
              { type: "Label", htmlFor: "required-field", children: "Required field *" },
            ],
          },
          {
            type: "Text",
            id: "required-help",
            className: "text-sm text-red-600 dark:text-red-400",
            children: "This field is required",
          },
        ],
      },
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Flex",
            align: "center",
            gap: "2",
            children: [
              { type: "Checkbox", id: "valid-field", checked: true, "aria-describedby": "valid-help" },
              { type: "Label", htmlFor: "valid-field", children: "Valid selection" },
            ],
          },
          {
            type: "Text",
            id: "valid-help",
            className: "text-sm text-green-600 dark:text-green-400",
            children: "✓ Selection confirmed",
          },
        ],
      },
    ],
  };

  // Checkbox groups
  const groupsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Heading", level: 4, children: "Select your interests" },
          {
            type: "Stack",
            spacing: "3",
            className: "mt-3",
            children: [
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  { type: "Checkbox", id: "tech", name: "interests", value: "technology" },
                  { type: "Label", htmlFor: "tech", children: "Technology" },
                ],
              },
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  { type: "Checkbox", id: "design", name: "interests", value: "design", defaultChecked: true },
                  { type: "Label", htmlFor: "design", children: "Design" },
                ],
              },
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  { type: "Checkbox", id: "business", name: "interests", value: "business" },
                  { type: "Label", htmlFor: "business", children: "Business" },
                ],
              },
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  { type: "Checkbox", id: "marketing", name: "interests", value: "marketing", defaultChecked: true },
                  { type: "Label", htmlFor: "marketing", children: "Marketing" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Heading", level: 4, children: "Privacy settings" },
          {
            type: "Stack",
            spacing: "3",
            className: "mt-3",
            children: [
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  { type: "Checkbox", id: "public-profile", name: "privacy", value: "public" },
                  { type: "Label", htmlFor: "public-profile", children: "Make profile public" },
                ],
              },
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  { type: "Checkbox", id: "contact-info", name: "privacy", value: "contact", defaultChecked: true },
                  { type: "Label", htmlFor: "contact-info", children: "Show contact information" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Accessibility example
  const accessibilitySpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Flex",
            align: "center",
            gap: "2",
            children: [
              { 
                type: "Checkbox", 
                id: "aria-checkbox", 
                "aria-label": "Accept privacy policy",
                "aria-describedby": "privacy-description"
              },
              { type: "Label", htmlFor: "aria-checkbox", children: "I accept the privacy policy" },
            ],
          },
          {
            type: "Text",
            id: "privacy-description",
            className: "text-sm text-gray-600 dark:text-gray-400",
            children: "By checking this box, you agree to our data collection and usage terms.",
          },
        ],
      },
      {
        type: "Box",
        className: "space-y-2",
        children: [
          {
            type: "Flex",
            align: "center",
            gap: "2",
            children: [
              { 
                type: "Checkbox", 
                id: "labelledby-checkbox",
                "aria-labelledby": "group-label",
                name: "communication",
                value: "email"
              },
              { type: "Label", htmlFor: "labelledby-checkbox", children: "Email updates" },
            ],
          },
          {
            type: "Text",
            id: "group-label",
            className: "text-sm font-medium",
            children: "Communication preferences",
          },
        ],
      },
    ],
  };

  // Complete checkout example
  const checkoutExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-lg",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Complete Your Order" },
          { type: "CardDescription", children: "Review and confirm your purchase" },
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
              className: "p-4 bg-gray-50 dark:bg-gray-900 rounded-lg",
              children: [
                { type: "Text", className: "font-medium", children: "Order Summary" },
                { type: "Text", className: "text-2xl font-bold mt-1", children: "$49.99" },
              ],
            },
            {
              type: "Stack",
              spacing: "4",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "terms-checkout", required: true },
                    {
                      type: "Label",
                      htmlFor: "terms-checkout",
                      className: "text-sm",
                      children: "I agree to the Terms of Service and Privacy Policy",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "newsletter-checkout", defaultChecked: true },
                    {
                      type: "Label",
                      htmlFor: "newsletter-checkout",
                      className: "text-sm",
                      children: "Send me updates about new products and features",
                    },
                  ],
                },
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "save-payment" },
                    {
                      type: "Label",
                      htmlFor: "save-payment",
                      className: "text-sm",
                      children: "Save payment method for future purchases",
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
        children: [
          { type: "Button", variant: "outline", children: "Back to Cart", className: "flex-1" },
          { type: "Button", variant: "primary", children: "Complete Order", className: "flex-1" },
        ],
      },
    ],
  };

  // Settings panel example
  const settingsExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Notification Settings" },
          { type: "CardDescription", children: "Manage how you receive notifications" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Box",
              children: [
                { type: "Text", className: "font-medium text-sm mb-3", children: "Email Notifications" },
                {
                  type: "Stack",
                  spacing: "3",
                  children: [
                    {
                      type: "Flex",
                      align: "center",
                      gap: "2",
                      children: [
                        { type: "Checkbox", id: "email-updates", defaultChecked: true },
                        { type: "Label", htmlFor: "email-updates", className: "text-sm", children: "Product updates" },
                      ],
                    },
                    {
                      type: "Flex",
                      align: "center",
                      gap: "2",
                      children: [
                        { type: "Checkbox", id: "email-security" },
                        { type: "Label", htmlFor: "email-security", className: "text-sm", children: "Security alerts" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Text", className: "font-medium text-sm mb-3", children: "Push Notifications" },
                {
                  type: "Stack",
                  spacing: "3",
                  children: [
                    {
                      type: "Flex",
                      align: "center",
                      gap: "2",
                      children: [
                        { type: "Checkbox", id: "push-messages", defaultChecked: true },
                        { type: "Label", htmlFor: "push-messages", className: "text-sm", children: "New messages" },
                      ],
                    },
                    {
                      type: "Flex",
                      align: "center",
                      gap: "2",
                      children: [
                        { type: "Checkbox", id: "push-mentions" },
                        { type: "Label", htmlFor: "push-mentions", className: "text-sm", children: "Mentions & replies" },
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
        children: [
          { type: "Button", variant: "primary", children: "Save Settings", className: "w-full" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Checkbox Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile checkbox component for selecting one or multiple options. Perfect for forms, settings panels, and multi-selection interfaces with full accessibility support.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Checkbox component provides an accessible way to allow users to select multiple options from a set of choices. Built on Radix UI primitives, it ensures consistent behavior across browsers and assistive technologies.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accessible by default with proper ARIA attributes</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Disabled and required states</li>
                <li>Form integration with name and value attributes</li>
                <li>Custom styling support</li>
                <li>Keyboard navigation support</li>
                <li>Screen reader announcements</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Basic checkbox usage with different initial states.
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

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Checkbox States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Checkboxes support various states including checked, unchecked, and disabled.
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
            <h2 className="text-2xl font-semibold mb-4">With Labels</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Pair checkboxes with labels for better accessibility and user experience.
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

          {/* Form Integration Section */}
          <section id="forms" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use checkboxes in forms with proper name and value attributes for data collection.
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

          {/* Validation Section */}
          <section id="validation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Validation States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Show validation feedback with helpful messages and visual cues.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(validationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(validationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Groups Section */}
          <section id="groups" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Checkbox Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Group related checkboxes together for better organization and user experience.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(groupsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(groupsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Examples showing proper ARIA attributes and accessibility patterns.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(accessibilitySpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(accessibilitySpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Checkbox&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
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
                    <td className="py-3 px-4">Default checked state for uncontrolled usage</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Disable checkbox interactions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">required</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Mark as required for form validation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">name</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Form field name</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Form field value</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Unique identifier for label association</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onCheckedChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler for checked state changes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-label</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Accessibility label</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-labelledby</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Reference to labeling element</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-describedby</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Reference to describing element</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing checkboxes in common use cases.
            </p>
            
            <div className="space-y-8">
              {/* Checkout Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">E-commerce Checkout</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(checkoutExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(checkoutExampleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Settings Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Settings Panel</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(settingsExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(settingsExampleSpec, null, 2)}
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
                to="/documentation/form-components"
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