import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function LabelShowcase() {
  usePageMetadata({
    title: "Label Component",
    description:
      "A comprehensive showcase of the React Jedi Label component with accessibility features, form associations, and styling examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "form-labels", label: "Form Labels" },
    { id: "required-fields", label: "Required Fields" },
    { id: "accessibility", label: "Accessibility" },
    { id: "styling", label: "Custom Styling" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic usage specification
  const basicUsageSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      { type: "Label", children: "Simple Label" },
      { type: "Label", children: "Label with Text Content", className: "text-blue-600 dark:text-blue-400" },
      { type: "Label", children: "Styled Label", className: "font-semibold text-lg" },
    ],
  };

  // Form labels specification
  const formLabelsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Label", htmlFor: "email", children: "Email Address" },
          { type: "Input", id: "email", inputType: "email", placeholder: "Enter your email" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Label", htmlFor: "password", children: "Password" },
          { type: "Input", id: "password", inputType: "password", placeholder: "Enter your password" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Label", htmlFor: "message", children: "Message" },
          { type: "Textarea", id: "message", placeholder: "Type your message here..." },
        ],
      },
    ],
  };

  // Required fields specification
  const requiredFieldsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Label", 
            htmlFor: "username", 
            children: "Username *",
            className: "text-sm font-medium"
          },
          { type: "Input", id: "username", placeholder: "Choose a username", required: true },
          {
            type: "Text",
            children: "This field is required",
            size: "small",
            variant: "muted",
            className: "text-xs"
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Label", 
            htmlFor: "fullname", 
            children: "Full Name",
            className: "text-sm font-medium after:content-['*'] after:ml-1 after:text-red-500"
          },
          { type: "Input", id: "fullname", placeholder: "Enter your full name" },
        ],
      },
    ],
  };

  // Accessibility features specification
  const accessibilitySpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Label", htmlFor: "phone", children: "Phone Number" },
          { type: "Input", id: "phone", inputType: "tel", placeholder: "(555) 123-4567", "aria-describedby": "phone-help" },
          {
            type: "Text",
            id: "phone-help",
            children: "Include area code for best results",
            size: "small",
            variant: "muted",
            className: "text-xs"
          },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Label", htmlFor: "birthdate", children: "Date of Birth" },
          { type: "Input", id: "birthdate", inputType: "date", "aria-required": "true" },
        ],
      },
    ],
  };

  // Custom styling specification
  const stylingSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Label", 
            htmlFor: "styled1", 
            children: "Large Blue Label",
            className: "text-xl font-bold text-blue-600 dark:text-blue-400"
          },
          { type: "Input", id: "styled1", placeholder: "Input with styled label" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Label", 
            htmlFor: "styled2", 
            children: "🏷️ Label with Icon",
            className: "text-sm font-medium text-purple-600 dark:text-purple-400"
          },
          { type: "Input", id: "styled2", placeholder: "Input with icon label" },
        ],
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { 
            type: "Label", 
            htmlFor: "styled3", 
            children: "Uppercase Label",
            className: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
          },
          { type: "Input", id: "styled3", placeholder: "Input with uppercase label" },
        ],
      },
    ],
  };

  // Complete registration form example
  const registrationFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-lg",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Create Your Account" },
          { type: "CardDescription", children: "Fill in your information to get started" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Group",
              spacing: "4",
              children: [
                {
                  type: "Stack",
                  spacing: "2",
                  className: "flex-1",
                  children: [
                    { 
                      type: "Label", 
                      htmlFor: "firstname", 
                      children: "First Name *",
                      className: "text-sm font-medium"
                    },
                    { type: "Input", id: "firstname", placeholder: "John" },
                  ],
                },
                {
                  type: "Stack",
                  spacing: "2",
                  className: "flex-1",
                  children: [
                    { 
                      type: "Label", 
                      htmlFor: "lastname", 
                      children: "Last Name *",
                      className: "text-sm font-medium"
                    },
                    { type: "Input", id: "lastname", placeholder: "Doe" },
                  ],
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { 
                  type: "Label", 
                  htmlFor: "email-reg", 
                  children: "Email Address *",
                  className: "text-sm font-medium"
                },
                { type: "Input", id: "email-reg", inputType: "email", placeholder: "john@example.com" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { 
                  type: "Label", 
                  htmlFor: "password-reg", 
                  children: "Password *",
                  className: "text-sm font-medium"
                },
                { type: "Input", id: "password-reg", inputType: "password", placeholder: "••••••••" },
                {
                  type: "Text",
                  children: "Must be at least 8 characters",
                  size: "small",
                  variant: "muted",
                  className: "text-xs"
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { 
                  type: "Label", 
                  htmlFor: "company", 
                  children: "Company (Optional)",
                  className: "text-sm font-medium text-gray-600 dark:text-gray-400"
                },
                { type: "Input", id: "company", placeholder: "Acme Inc." },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: [
          { type: "Button", variant: "primary", children: "Create Account", className: "w-full" },
        ],
      },
    ],
  };

  // Contact form example with helper text
  const contactFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-lg",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Contact Us" },
          { type: "CardDescription", children: "We&apos;d love to hear from you" },
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
                  type: "Label", 
                  htmlFor: "contact-name", 
                  children: "Your Name",
                  className: "text-sm font-medium"
                },
                { type: "Input", id: "contact-name", placeholder: "Enter your full name" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { 
                  type: "Label", 
                  htmlFor: "contact-email", 
                  children: "Email Address",
                  className: "text-sm font-medium"
                },
                { type: "Input", id: "contact-email", inputType: "email", placeholder: "your@email.com" },
                {
                  type: "Text",
                  children: "We&apos;ll never share your email with anyone else",
                  size: "small",
                  variant: "muted",
                  className: "text-xs"
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { 
                  type: "Label", 
                  htmlFor: "subject", 
                  children: "Subject",
                  className: "text-sm font-medium"
                },
                { type: "Input", id: "subject", placeholder: "What&apos;s this about?" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { 
                  type: "Label", 
                  htmlFor: "contact-message", 
                  children: "Message",
                  className: "text-sm font-medium"
                },
                { type: "Textarea", id: "contact-message", placeholder: "Tell us more about your inquiry...", rows: "4" },
                {
                  type: "Text",
                  children: "Please be as detailed as possible",
                  size: "small",
                  variant: "muted",
                  className: "text-xs"
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
          { type: "Button", variant: "outline", children: "Cancel", className: "flex-1" },
          { type: "Button", variant: "primary", children: "Send Message", className: "flex-1" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Label Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              An accessible label component that provides clear text labels for form controls. Essential for creating inclusive and user-friendly forms with proper semantic associations.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Label component is a fundamental building block for accessible forms. It provides semantic labels for form controls, improving usability for all users and ensuring compatibility with assistive technologies like screen readers.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Semantic HTML label element with proper form associations</li>
                <li>Built-in accessibility features and ARIA support</li>
                <li>Visual indicators for required fields</li>
                <li>Flexible styling with className support</li>
                <li>Click-to-focus functionality for associated form controls</li>
                <li>Support for custom content including icons and formatting</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Labels can be used standalone or with the htmlFor prop to associate them with form controls.
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

          {/* Form Labels Section */}
          <section id="form-labels" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Labels</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use the htmlFor prop to associate labels with their corresponding form controls. This enables click-to-focus functionality and improves accessibility.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(formLabelsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(formLabelsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Required Fields Section */}
          <section id="required-fields" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Required Fields</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Indicate required fields visually using asterisks or other styling approaches.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(requiredFieldsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(requiredFieldsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Labels work seamlessly with ARIA attributes and assistive technologies.
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

          {/* Custom Styling Section */}
          <section id="styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize label appearance with the className prop to match your design system.
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
                    <td className="py-3 px-4 font-mono">&quot;Label&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">string | ComponentSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Label text content</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">htmlFor</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">ID of the form control this label describes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">required</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the label indicates a required field</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the label should appear disabled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes for custom styling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how labels work in complete form implementations.
            </p>
            
            <div className="space-y-8">
              {/* Registration Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Registration Form</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
                  {render(registrationFormSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(registrationFormSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Contact Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Contact Form with Helper Text</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 flex justify-center">
                  {render(contactFormSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(contactFormSpec, null, 2)}
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