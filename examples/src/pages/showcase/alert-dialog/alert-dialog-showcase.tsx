import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function AlertDialogShowcase() {
  usePageMetadata({
    title: "AlertDialog Component",
    description:
      "A comprehensive showcase of the React Jedi AlertDialog component for confirming destructive actions, with all variants, states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "destructive-actions", label: "Destructive Actions" },
    { id: "trigger-variants", label: "Trigger Variants" },
    { id: "action-variants", label: "Action Variants" },
    { id: "multiple-actions", label: "Multiple Actions" },
    { id: "long-content", label: "Long Content" },
    { id: "controlled-state", label: "Controlled State" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic alert dialog specification
  const basicSpec: UISpecification = {
    type: "AlertDialog",
    trigger: {
      type: "Button",
      variant: "outline",
      children: "Show Dialog",
    },
    content: {
      title: "Are you absolutely sure?",
      description: "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      actions: [
        {
          type: "Button",
          variant: "outline",
          children: "Cancel",
          action: "close",
        },
        {
          type: "Button",
          variant: "default",
          children: "Continue",
          action: "confirm",
        },
      ],
    },
  };

  // Destructive action specification
  const destructiveSpec: UISpecification = {
    type: "AlertDialog",
    trigger: {
      type: "Button",
      variant: "destructive",
      children: "Delete Account",
    },
    content: {
      title: "Delete Account",
      description: "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.",
      actions: [
        {
          type: "Button",
          variant: "outline",
          children: "Cancel",
          action: "close",
        },
        {
          type: "Button",
          variant: "destructive",
          children: "Yes, delete account",
          action: "confirm",
        },
      ],
    },
  };

  // Different trigger variants
  const triggerVariantsSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      {
        type: "AlertDialog",
        trigger: {
          type: "Button",
          variant: "default",
          children: "Default Trigger",
        },
        content: {
          title: "Default Trigger",
          description: "This alert was triggered by a default button.",
          actions: [
            { type: "Button", variant: "outline", children: "Cancel", action: "close" },
            { type: "Button", variant: "primary", children: "Confirm", action: "confirm" },
          ],
        },
      },
      {
        type: "AlertDialog",
        trigger: {
          type: "Button",
          variant: "secondary",
          children: "Secondary Trigger",
        },
        content: {
          title: "Secondary Trigger",
          description: "This alert was triggered by a secondary button.",
          actions: [
            { type: "Button", variant: "outline", children: "Cancel", action: "close" },
            { type: "Button", variant: "primary", children: "Confirm", action: "confirm" },
          ],
        },
      },
      {
        type: "AlertDialog",
        trigger: {
          type: "Button",
          variant: "ghost",
          children: "Ghost Trigger",
        },
        content: {
          title: "Ghost Trigger",
          description: "This alert was triggered by a ghost button.",
          actions: [
            { type: "Button", variant: "outline", children: "Cancel", action: "close" },
            { type: "Button", variant: "primary", children: "Confirm", action: "confirm" },
          ],
        },
      },
    ],
  };

  // Different action button variants
  const actionVariantsSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      {
        type: "AlertDialog",
        trigger: {
          type: "Button",
          variant: "outline",
          children: "Primary Action",
        },
        content: {
          title: "Confirm Action",
          description: "Are you sure you want to perform this action?",
          actions: [
            { type: "Button", variant: "outline", children: "Cancel", action: "close" },
            { type: "Button", variant: "primary", children: "Confirm", action: "confirm" },
          ],
        },
      },
      {
        type: "AlertDialog",
        trigger: {
          type: "Button",
          variant: "outline",
          children: "Secondary Action",
        },
        content: {
          title: "Confirm Action",
          description: "Are you sure you want to perform this action?",
          actions: [
            { type: "Button", variant: "outline", children: "Cancel", action: "close" },
            { type: "Button", variant: "secondary", children: "Confirm", action: "confirm" },
          ],
        },
      },
      {
        type: "AlertDialog",
        trigger: {
          type: "Button",
          variant: "outline",
          children: "Destructive Action",
        },
        content: {
          title: "Dangerous Action",
          description: "This action is potentially dangerous and cannot be undone.",
          actions: [
            { type: "Button", variant: "outline", children: "Cancel", action: "close" },
            { type: "Button", variant: "destructive", children: "Proceed", action: "confirm" },
          ],
        },
      },
    ],
  };

  // Multiple actions specification
  const multipleActionsSpec: UISpecification = {
    type: "AlertDialog",
    trigger: {
      type: "Button",
      variant: "outline",
      children: "Show Multiple Actions",
    },
    content: {
      title: "Save Changes?",
      description: "You have unsaved changes. What would you like to do?",
      actions: [
        { type: "Button", variant: "ghost", children: "Don't Save", action: "close" },
        { type: "Button", variant: "outline", children: "Cancel", action: "close" },
        { type: "Button", variant: "primary", children: "Save Changes", action: "confirm" },
      ],
    },
  };

  // Long content specification
  const longContentSpec: UISpecification = {
    type: "AlertDialog",
    trigger: {
      type: "Button",
      variant: "outline",
      children: "Show Long Content",
    },
    content: {
      title: "Terms of Service",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      actions: [
        { type: "Button", variant: "outline", children: "Decline", action: "close" },
        { type: "Button", variant: "primary", children: "Accept", action: "confirm" },
      ],
    },
  };

  // Complete form example with alert confirmation
  const formExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Delete User Account" },
          { type: "CardDescription", children: "This action requires confirmation" },
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
                { type: "Label", htmlFor: "username", children: "Username" },
                { type: "Input", id: "username", placeholder: "Enter username to confirm" },
              ],
            },
            {
              type: "Text",
              size: "small",
              variant: "muted",
              children: "Type the username to confirm deletion. This action cannot be undone.",
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: {
          type: "AlertDialog",
          trigger: {
            type: "Button",
            variant: "destructive",
            children: "Delete Account",
            className: "w-full",
          },
          content: {
            title: "Confirm Account Deletion",
            description: "Are you absolutely sure? This action cannot be undone and will permanently delete the user account and all associated data.",
            actions: [
              { type: "Button", variant: "outline", children: "Cancel", action: "close" },
              { type: "Button", variant: "destructive", children: "Yes, delete permanently", action: "confirm" },
            ],
          },
        },
      },
    ],
  };

  // Warning with actions example
  const warningExampleSpec: UISpecification = {
    type: "Alert",
    className: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
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
              {
                type: "Text",
                className: "text-2xl",
                children: "⚠️",
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Text",
                    className: "font-semibold text-yellow-800 dark:text-yellow-200",
                    children: "System Maintenance",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-yellow-700 dark:text-yellow-300",
                    children: "The system will undergo maintenance in 5 minutes. Save your work now.",
                  },
                ],
              },
            ],
          },
          {
            type: "Group",
            spacing: "2",
            children: [
              {
                type: "AlertDialog",
                trigger: {
                  type: "Button",
                  size: "sm",
                  variant: "outline",
                  children: "Force Save",
                  className: "border-yellow-300 text-yellow-800 dark:border-yellow-700 dark:text-yellow-200",
                },
                content: {
                  title: "Force Save All Changes",
                  description: "This will save all unsaved changes across the application. Are you sure you want to continue?",
                  actions: [
                    { type: "Button", variant: "outline", children: "Cancel", action: "close" },
                    { type: "Button", variant: "primary", children: "Save All", action: "confirm" },
                  ],
                },
              },
              { type: "Button", size: "sm", variant: "ghost", children: "Dismiss", className: "text-yellow-800 dark:text-yellow-200" },
            ],
          },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AlertDialog Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A modal dialog component for confirming destructive actions and important decisions. Built on Radix UI for accessibility and flexibility.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The AlertDialog component is designed to interrupt users and ask them to confirm an action, especially for destructive or irreversible operations. It provides a modal overlay that blocks interaction with the rest of the page until the user makes a decision.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Modal overlay that blocks background interaction</li>
                <li>Keyboard navigation support (Tab, Escape, Enter)</li>
                <li>Focus management and focus trapping</li>
                <li>Customizable trigger components (Button, Toggle, Text)</li>
                <li>Flexible action button configurations</li>
                <li>Built-in accessibility features and ARIA attributes</li>
                <li>Support for controlled and uncontrolled states</li>
                <li>Responsive design that works on all screen sizes</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple alert dialog with a title, description, and two action buttons.
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

          {/* Destructive Actions Section */}
          <section id="destructive-actions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Destructive Actions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use destructive variants for dangerous actions that cannot be undone.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(destructiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(destructiveSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Trigger Variants Section */}
          <section id="trigger-variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Trigger Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              AlertDialogs can be triggered by different button variants to match your design.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(triggerVariantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(triggerVariantsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Action Variants Section */}
          <section id="action-variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Action Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the appearance of action buttons to match the severity of the action.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(actionVariantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(actionVariantsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Multiple Actions Section */}
          <section id="multiple-actions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Multiple Actions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              AlertDialogs can have multiple action buttons for complex decision workflows.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(multipleActionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(multipleActionsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Long Content Section */}
          <section id="long-content" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Long Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              AlertDialogs can handle longer descriptions while maintaining proper scrolling behavior.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(longContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(longContentSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Controlled State Section */}
          <section id="controlled-state" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Controlled State</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the dialog state programmatically using the open prop and state management.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Controlled state requires external state management and event handlers. 
                This example shows the JSON structure, but full implementation would need React state.
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
                    <td className="py-3 px-4 font-mono">&quot;AlertDialog&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">trigger</td>
                    <td className="py-3 px-4 font-mono">TriggerSpec</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Button, Toggle, or Text component that opens the dialog</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content</td>
                    <td className="py-3 px-4 font-mono">ContentSpec</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Dialog content with title, description, and actions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content.title</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Title text for the dialog</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content.description</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Optional description text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content.actions</td>
                    <td className="py-3 px-4 font-mono">ActionSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Array of action buttons</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">action.variant</td>
                    <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;destructive&quot; | &quot;outline&quot; | &quot;secondary&quot; | &quot;ghost&quot; | &quot;link&quot;</td>
                    <td className="py-3 px-4">&quot;default&quot;</td>
                    <td className="py-3 px-4">Visual style for action buttons</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">action.action</td>
                    <td className="py-3 px-4 font-mono">&quot;close&quot; | &quot;confirm&quot;</td>
                    <td className="py-3 px-4">&quot;close&quot;</td>
                    <td className="py-3 px-4">Action type when button is clicked</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultOpen</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether dialog starts open</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">open</td>
                    <td className="py-3 px-4 font-mono">boolean | string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Controlled open state or state variable path</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onClose</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler when dialog closes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onConfirm</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler when confirm action is triggered</td>
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
              See how AlertDialogs work in real-world scenarios and complex interactions.
            </p>
            
            <div className="space-y-8">
              {/* Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Form with Confirmation Dialog</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(formExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                    {JSON.stringify(formExampleSpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>

              {/* Warning Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Alert with Confirmation Actions</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(warningExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                    {JSON.stringify(warningExampleSpec, null, 2)}
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