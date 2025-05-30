import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function InputOTPShowcase() {
  usePageMetadata({
    title: "InputOTP Component",
    description:
      "A comprehensive showcase of the React Jedi InputOTP component for one-time password and verification code inputs.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "rendering-styles", label: "Rendering Styles" },
    { id: "custom-patterns", label: "Custom Patterns" },
    { id: "validation", label: "Validation & Patterns" },
    { id: "states", label: "States & Interaction" },
    { id: "styling", label: "Custom Styling" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic OTP input
  const basicOTPSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        className: "text-sm font-medium",
        children: "Enter verification code:",
      },
      {
        type: "InputOTP",
        maxLength: 6,
        placeholder: "○",
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Enter the 6-digit code sent to your phone",
      },
    ],
  };

  // Different rendering styles
  const renderingStylesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Grouped Style (Default)",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            render: { type: "grouped" },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Segmented Style",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            render: { type: "segmented" },
          },
        ],
      },
    ],
  };

  // Custom patterns
  const customPatternsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Custom Pattern: XXX-XXX",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            render: { type: "custom", pattern: "xxx-xxx" },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Custom Pattern: XX XX XX",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            render: { type: "custom", pattern: "xx xx xx" },
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Custom Pattern: X-X-X-X-X-X",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            render: { type: "custom", pattern: "x-x-x-x-x-x" },
          },
        ],
      },
    ],
  };

  // Validation patterns
  const validationSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Numeric Only (0-9)",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            pattern: "^[0-9]+$",
            placeholder: "0",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            className: "mt-1",
            children: "Accepts only digits",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Alphanumeric (A-Z, 0-9)",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            pattern: "^[A-Z0-9]+$",
            placeholder: "•",
          },
          {
            type: "Text",
            size: "small",
            variant: "muted",
            className: "mt-1",
            children: "Accepts uppercase letters and digits",
          },
        ],
      },
    ],
  };

  // Different states
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Normal State",
          },
          {
            type: "InputOTP",
            maxLength: 4,
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Disabled State",
          },
          {
            type: "InputOTP",
            maxLength: 4,
            disabled: true,
            value: "1234",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Pre-filled Value",
          },
          {
            type: "InputOTP",
            maxLength: 4,
            value: "1234",
          },
        ],
      },
    ],
  };

  // Custom styling
  const customStylingSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Custom Container Styling",
          },
          {
            type: "InputOTP",
            maxLength: 6,
            containerClassName: "gap-4",
            className: "w-12 h-12 text-lg font-bold border-2 border-blue-500 focus:border-blue-600",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium mb-2",
            children: "Rounded Inputs",
          },
          {
            type: "InputOTP",
            maxLength: 4,
            className: "rounded-full",
            containerClassName: "gap-3",
          },
        ],
      },
    ],
  };

  // Complete verification form example
  const verificationFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          {
            type: "CardTitle",
            children: "Two-Factor Authentication",
          },
          {
            type: "CardDescription",
            children: "Enter the 6-digit code from your authenticator app",
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "InputOTP",
              maxLength: 6,
              render: { type: "segmented" },
              pattern: "^[0-9]+$",
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                {
                  type: "Text",
                  size: "small",
                  variant: "muted",
                  children: "Didn't receive a code?",
                },
                {
                  type: "Button",
                  variant: "link",
                  size: "sm",
                  children: "Resend",
                },
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
          className: "w-full",
          children: "Verify",
        },
      },
    ],
  };

  // SMS verification example
  const smsVerificationSpec: UISpecification = {
    type: "Alert",
    className: "max-w-md",
    children: {
      type: "Stack",
      spacing: "4",
      children: [
        {
          type: "Flex",
          gap: "3",
          align: "start",
          children: [
            {
              type: "Text",
              className: "text-2xl",
              children: "📱",
            },
            {
              type: "Box",
              className: "flex-1",
              children: [
                {
                  type: "Text",
                  className: "font-semibold mb-1",
                  children: "Verify your phone number",
                },
                {
                  type: "Text",
                  size: "small",
                  variant: "muted",
                  children: "We've sent a code to +1 (555) 123-4567",
                },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "text-sm font-medium mb-2",
              children: "Verification code",
            },
            {
              type: "InputOTP",
              maxLength: 6,
              render: { type: "custom", pattern: "xxx xxx" },
              pattern: "^[0-9]+$",
              placeholder: "0",
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
              variant: "primary",
              children: "Verify Number",
            },
            {
              type: "Button",
              size: "sm",
              variant: "outline",
              children: "Change Number",
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">InputOTP Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A specialized input component for entering one-time passwords, verification codes, and PINs with customizable rendering styles and validation patterns.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The InputOTP component provides an optimized interface for entering verification codes, one-time passwords (OTP), and PIN numbers. It automatically handles focus management between input fields and provides a smooth user experience for code entry.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple rendering styles (grouped, segmented, custom patterns)</li>
                <li>Automatic focus management between input fields</li>
                <li>Pattern-based validation (numeric, alphanumeric, custom)</li>
                <li>Customizable placeholder characters</li>
                <li>Keyboard navigation support</li>
                <li>Copy/paste support for entire codes</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Mobile-friendly with numeric keyboard support</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest way to use InputOTP is with just a maxLength prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicOTPSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicOTPSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Rendering Styles Section */}
          <section id="rendering-styles" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Rendering Styles</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from different visual styles to match your design needs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(renderingStylesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(renderingStylesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Custom Patterns Section */}
          <section id="custom-patterns" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Patterns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create custom grouping patterns for better readability.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(customPatternsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(customPatternsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Validation Section */}
          <section id="validation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Validation & Patterns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use regex patterns to restrict input to specific character sets.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(validationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(validationSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">States & Interaction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              InputOTP supports various states including disabled and pre-filled values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(statesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(statesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Custom Styling Section */}
          <section id="styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the appearance with className and containerClassName props.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(customStylingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(customStylingSpec, null, 2)}
              </pre>
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
                    <td className="py-3 px-4 font-mono">&quot;InputOTP&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">maxLength</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">6</td>
                    <td className="py-3 px-4">Maximum number of characters/digits</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">pattern</td>
                    <td className="py-3 px-4 font-mono">string (RegExp)</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Regular expression for input validation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Controlled value of the OTP input</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onValueChange</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Action to dispatch on value change</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onComplete</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Action to dispatch when OTP is complete</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">placeholder</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Placeholder character for empty slots</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">render</td>
                    <td className="py-3 px-4 font-mono">object</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Rendering configuration (type: &quot;grouped&quot; | &quot;segmented&quot; | &quot;custom&quot;)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the input is disabled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">CSS classes for individual input fields</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">containerClassName</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">CSS classes for the container element</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how InputOTP works in real-world authentication scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Two-Factor Authentication Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(verificationFormSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(verificationFormSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* SMS Verification Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">SMS Verification</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(smsVerificationSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(smsVerificationSpec, null, 2)}
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