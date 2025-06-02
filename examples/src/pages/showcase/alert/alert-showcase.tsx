import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function AlertShowcasePage() {
  usePageMetadata({
    title: "Alert Component - React Jedi Showcase",
    description: "Display important messages and notifications with the Alert component in React Jedi",
  });

  const [activeSection, setActiveSection] = useState("overview");

  const tableOfContents = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "variants", label: "Variants" },
    { id: "with-title", label: "With Title & Description" },
    { id: "dismissible", label: "Dismissible Alerts" },
    { id: "real-world", label: "Real World Examples" },
    { id: "props", label: "Props & Options" },
  ];

  // Basic alert example
  const basicAlertSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      children: "This is a basic alert message to inform users.",
    },
  };

  // Alert with default variant
  const defaultAlertSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      variant: "default",
      children: "Default alert with standard styling for general information.",
    },
  };

  // Alert with destructive variant
  const destructiveAlertSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      variant: "destructive",
      children: "Destructive alert for errors or critical warnings.",
    },
  };

  // Alert with title and description
  const alertWithTitleSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      children: [
        {
          type: "AlertTitle",
          children: "Heads up!",
        },
        {
          type: "AlertDescription",
          children: "You can add components to your app using the cli. This alert has both a title and description.",
        },
      ],
    },
  };

  // Destructive alert with title
  const destructiveWithTitleSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      variant: "destructive",
      children: [
        {
          type: "AlertTitle",
          children: "Error",
        },
        {
          type: "AlertDescription",
          children: "Your session has expired. Please log in again to continue.",
        },
      ],
    },
  };

  // Success alert example
  const successAlertSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
      children: [
        {
          type: "AlertTitle",
          className: "text-green-800 dark:text-green-200",
          children: "Success!",
        },
        {
          type: "AlertDescription",
          className: "text-green-700 dark:text-green-300",
          children: "Your changes have been saved successfully.",
        },
      ],
    },
  };

  // Warning alert example
  const warningAlertSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      className: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
      children: [
        {
          type: "AlertTitle",
          className: "text-yellow-800 dark:text-yellow-200",
          children: "Warning",
        },
        {
          type: "AlertDescription",
          className: "text-yellow-700 dark:text-yellow-300",
          children: "Your subscription will expire in 5 days. Please renew to avoid service interruption.",
        },
      ],
    },
  };

  // Info alert example
  const infoAlertSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Alert",
      className: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
      children: [
        {
          type: "AlertTitle",
          className: "text-blue-800 dark:text-blue-200",
          children: "Information",
        },
        {
          type: "AlertDescription",
          className: "text-blue-700 dark:text-blue-300",
          children: "New features are now available. Check out our changelog for more details.",
        },
      ],
    },
  };

  // Dismissible alert example with state
  const DismissibleAlertExample = () => {
    const [isVisible, setIsVisible] = useState(true);

    const dismissibleAlertSpec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Alert",
        className: isVisible ? "" : "hidden",
        children: [
          {
            type: "Flex",
            justify: "between",
            align: "start",
            children: [
              {
                type: "Box",
                children: [
                  {
                    type: "AlertTitle",
                    children: "Privacy Notice",
                  },
                  {
                    type: "AlertDescription",
                    children: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
                  },
                ],
              },
              {
                type: "Button",
                variant: "ghost",
                size: "sm",
                onClick: () => setIsVisible(false),
                children: "✕",
              },
            ],
          },
        ],
      },
    };

    return (
      <div>
        {render(dismissibleAlertSpec)}
        {!isVisible && (
          <button
            onClick={() => setIsVisible(true)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            Show alert again
          </button>
        )}
      </div>
    );
  };

  // Complete real-world example
  const accountVerificationSpec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Stack",
      spacing: 4,
      children: [
        {
          type: "Alert",
          className: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
          children: [
            {
              type: "AlertTitle",
              className: "text-yellow-800 dark:text-yellow-200",
              children: "Account Verification Required",
            },
            {
              type: "AlertDescription",
              className: "text-yellow-700 dark:text-yellow-300",
              children: [
                {
                  type: "Stack",
                  spacing: 3,
                  children: [
                    {
                      type: "Text",
                      children: "Please verify your email address to unlock all features. We&apos;ve sent a verification link to your registered email.",
                    },
                    {
                      type: "Group",
                      children: [
                        {
                          type: "Button",
                          size: "sm",
                          children: "Resend Email",
                        },
                        {
                          type: "Button",
                          variant: "outline",
                          size: "sm",
                          children: "Update Email",
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            to="/showcase"
            className="hover:text-gray-900 dark:hover:text-gray-100"
          >
            Showcase
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">Alert</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            Alert Component
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Display important messages and notifications to users with customizable alert components.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Table of Contents */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-8">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                On This Page
              </h2>
              <nav>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(item.id);
                          document.querySelector(`#${item.id}`)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                        className={`block rounded px-3 py-2 text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Overview
              </h2>
              <div className="prose prose-gray max-w-none dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-400">
                  The Alert component is used to display important messages and
                  notifications to users. It supports different variants for various
                  message types, can include titles and descriptions, and can be
                  styled to match your application&apos;s design system.
                </p>
                <h3 className="mt-6 text-lg font-medium">Key Features</h3>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Multiple variants for different message types</li>
                  <li>• Support for titles and descriptions</li>
                  <li>• Customizable styling with className</li>
                  <li>• Accessible with proper ARIA attributes</li>
                  <li>• Can be made dismissible with custom logic</li>
                  <li>• Dark mode support</li>
                </ul>
              </div>
            </section>

            {/* Basic Usage */}
            <section id="basic-usage" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Basic Usage
              </h2>
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  {render(basicAlertSpec)}
                </div>
                <details className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <summary className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json">
{JSON.stringify(basicAlertSpec, null, 2)}
                  </CodeBlock>
                </details>
              </div>
            </section>

            {/* Variants */}
            <section id="variants" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Variants
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Default Variant</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                    {render(defaultAlertSpec)}
                  </div>
                  <details className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <summary className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                      View JSON Specification
                    </summary>
                    <CodeBlock language="json">
{JSON.stringify(defaultAlertSpec, null, 2)}
                    </CodeBlock>
                  </details>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Destructive Variant</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                    {render(destructiveAlertSpec)}
                  </div>
                  <details className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <summary className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                      View JSON Specification
                    </summary>
                    <CodeBlock language="json">
{JSON.stringify(destructiveAlertSpec, null, 2)}
                    </CodeBlock>
                  </details>
                </div>
              </div>
            </section>

            {/* With Title & Description */}
            <section id="with-title" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                With Title & Description
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Default with Title</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                    {render(alertWithTitleSpec)}
                  </div>
                  <details className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <summary className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                      View JSON Specification
                    </summary>
                    <CodeBlock language="json">
{JSON.stringify(alertWithTitleSpec, null, 2)}
                    </CodeBlock>
                  </details>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Destructive with Title</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                    {render(destructiveWithTitleSpec)}
                  </div>
                  <details className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <summary className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                      View JSON Specification
                    </summary>
                    <CodeBlock language="json">
{JSON.stringify(destructiveWithTitleSpec, null, 2)}
                    </CodeBlock>
                  </details>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Custom Alert Styles</h3>
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                      {render(successAlertSpec)}
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                      {render(warningAlertSpec)}
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                      {render(infoAlertSpec)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dismissible Alerts */}
            <section id="dismissible" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Dismissible Alerts
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Alerts can be made dismissible by combining them with state management
                  and interactive components.
                </p>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <DismissibleAlertExample />
                </div>
              </div>
            </section>

            {/* Real World Examples */}
            <section id="real-world" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Real World Examples
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Account Verification Alert</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                    {render(accountVerificationSpec)}
                  </div>
                  <details className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <summary className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                      View JSON Specification
                    </summary>
                    <CodeBlock language="json">
{JSON.stringify(accountVerificationSpec, null, 2)}
                    </CodeBlock>
                  </details>
                </div>
              </div>
            </section>

            {/* Props & Options */}
            <section id="props" className="scroll-mt-20">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Props & Options
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                        Prop
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                        Default
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                          variant
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        &quot;default&quot; | &quot;destructive&quot;
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        &quot;default&quot;
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        The visual style variant of the alert
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                          children
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        string | UISpecification | UISpecification[]
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        -
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        Content of the alert, can include AlertTitle and AlertDescription components
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                          className
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        string
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        -
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        Additional CSS classes for custom styling
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                          role
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        string
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        &quot;alert&quot;
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        ARIA role for accessibility
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                          aria-live
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        &quot;polite&quot; | &quot;assertive&quot; | &quot;off&quot;
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        -
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        Controls how assistive technology announces the alert
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-medium">Child Components</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                    <h4 className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                      AlertTitle
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Used for the alert&apos;s title text. Automatically styled with appropriate font weight and spacing.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                    <h4 className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                      AlertDescription
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Used for the alert&apos;s description text. Provides appropriate spacing and text styling.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Back to Showcase */}
            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
              <Link
                to="/showcase"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                ← Back to Component Showcase
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}