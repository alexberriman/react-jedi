import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function InputShowcase() {
  usePageMetadata({
    title: "Input Component",
    description:
      "A comprehensive showcase of the React Jedi Input component with all variants, types, states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "input-types", label: "Input Types" },
    { id: "states", label: "Input States" },
    { id: "validation", label: "Validation States" },
    { id: "styling", label: "Custom Styling" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Input types specification
  const inputTypesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "text-input", children: "Text Input" },
          { type: "Input", id: "text-input", inputType: "text", placeholder: "Enter text here..." },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "email-input", children: "Email Input" },
          { type: "Input", id: "email-input", inputType: "email", placeholder: "user@example.com" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "password-input", children: "Password Input" },
          { type: "Input", id: "password-input", inputType: "password", placeholder: "••••••••" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "number-input", children: "Number Input" },
          { type: "Input", id: "number-input", inputType: "number", placeholder: "42", min: 0, max: 100 },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "tel-input", children: "Phone Input" },
          { type: "Input", id: "tel-input", inputType: "tel", placeholder: "+1 (555) 123-4567" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "url-input", children: "URL Input" },
          { type: "Input", id: "url-input", inputType: "url", placeholder: "https://example.com" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "search-input", children: "Search Input" },
          { type: "Input", id: "search-input", inputType: "search", placeholder: "Search for anything..." },
        ],
      },
    ],
  };

  // Input states specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "normal-input", children: "Normal State" },
          { type: "Input", id: "normal-input", placeholder: "This is a normal input" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "disabled-input", children: "Disabled State" },
          { type: "Input", id: "disabled-input", placeholder: "This input is disabled", disabled: true },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "readonly-input", children: "Read-only State" },
          { type: "Input", id: "readonly-input", defaultValue: "This input is read-only", readOnly: true },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "required-input", children: "Required Input (with asterisk)" },
          { type: "Input", id: "required-input", placeholder: "This field is required", required: true },
        ],
      },
    ],
  };

  // Validation states specification  
  const validationSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "valid-input", children: "Valid Input" },
          { type: "Input", id: "valid-input", defaultValue: "user@example.com", inputType: "email" },
          { type: "Text", size: "small", variant: "muted", children: "✅ This looks good!" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "error-input", children: "Input with Error" },
          { type: "Input", id: "error-input", defaultValue: "invalid-email", className: "border-red-500 focus:ring-red-500" },
          { type: "Text", size: "small", className: "text-red-600", children: "❌ Please enter a valid email address" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "warning-input", children: "Input with Warning" },
          { type: "Input", id: "warning-input", defaultValue: "john", className: "border-amber-500 focus:ring-amber-500" },
          { type: "Text", size: "small", className: "text-amber-600", children: "⚠️ Consider using a stronger password" },
        ],
      },
    ],
  };

  // Custom styling specification
  const stylingSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "large-input", children: "Large Input" },
          { type: "Input", id: "large-input", placeholder: "Large sized input", className: "h-12 text-lg" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "small-input", children: "Small Input" },
          { type: "Input", id: "small-input", placeholder: "Small sized input", className: "h-8 text-sm" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "rounded-input", children: "Rounded Input" },
          { type: "Input", id: "rounded-input", placeholder: "Fully rounded input", className: "rounded-full" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "colored-input", children: "Colored Border" },
          { type: "Input", id: "colored-input", placeholder: "Blue border input", className: "border-blue-500 focus:ring-blue-500" },
        ],
      },
    ],
  };

  // Accessibility demonstration
  const accessibilitySpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "accessible-input", children: "Properly Labeled Input" },
          { type: "Input", id: "accessible-input", placeholder: "This input is accessible", "aria-describedby": "input-help" },
          { type: "Text", id: "input-help", size: "small", variant: "muted", children: "This description helps screen readers" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "aria-label-input", children: "Input with ARIA Label" },
          { type: "Input", id: "aria-label-input", "aria-label": "Search for products", placeholder: "🔍" },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "invalid-input", children: "Invalid Input with ARIA" },
          { type: "Input", id: "invalid-input", "aria-invalid": true, "aria-describedby": "error-message", className: "border-red-500" },
          { type: "Text", id: "error-message", size: "small", className: "text-red-600", children: "This field contains invalid data" },
        ],
      },
    ],
  };

  // Contact form example
  const contactFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Contact Us" },
          { type: "CardDescription", children: "Send us a message and we&apos;ll get back to you." },
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
                { type: "Label", htmlFor: "contact-name", children: "Full Name" },
                { type: "Input", id: "contact-name", inputType: "text", placeholder: "John Doe", required: true },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "contact-email", children: "Email Address" },
                { type: "Input", id: "contact-email", inputType: "email", placeholder: "john@example.com", required: true },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "contact-phone", children: "Phone Number" },
                { type: "Input", id: "contact-phone", inputType: "tel", placeholder: "+1 (555) 123-4567" },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "contact-subject", children: "Subject" },
                { type: "Input", id: "contact-subject", inputType: "text", placeholder: "How can we help?" },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: [
          { type: "Button", variant: "outline", children: "Cancel", className: "flex-1" },
          { type: "Button", variant: "primary", children: "Send Message", className: "flex-1" },
        ],
      },
    ],
  };

  // Login form example
  const loginFormSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-sm",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Welcome Back" },
          { type: "CardDescription", children: "Enter your credentials to access your account." },
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
                { type: "Label", htmlFor: "login-email", children: "Email" },
                { type: "Input", id: "login-email", inputType: "email", placeholder: "m@example.com", required: true },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "login-password", children: "Password" },
                { type: "Input", id: "login-password", inputType: "password", placeholder: "••••••••", required: true },
              ],
            },
            {
              type: "Flex",
              justify: "space-between",
              align: "center",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  gap: "2",
                  children: [
                    { type: "Checkbox", id: "remember" },
                    { type: "Label", htmlFor: "remember", children: "Remember me" },
                  ],
                },
                { type: "Text", size: "small", className: "text-blue-600 hover:underline cursor-pointer", children: "Forgot password?" },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: [
          { type: "Button", variant: "primary", children: "Sign In", className: "w-full" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Input Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile input component that supports various input types, validation states, and accessibility features. Essential for forms and user data collection.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Input component is a fundamental form element in React Jedi that wraps the HTML input element with enhanced styling, accessibility features, and validation support.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Support for all HTML input types (text, email, password, number, etc.)</li>
                <li>Built-in accessibility with proper ARIA attributes</li>
                <li>Validation state styling and error handling</li>
                <li>Responsive design that adapts to different screen sizes</li>
                <li>Consistent styling across different browsers</li>
                <li>Full keyboard navigation support</li>
                <li>Customizable with className and style props</li>
              </ul>
            </div>
          </section>

          {/* Input Types Section */}
          <section id="input-types" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Input Types</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Input component supports all standard HTML input types for different data collection needs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(inputTypesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(inputTypesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Input States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Inputs can have different states to indicate their current status and interaction capability.
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

          {/* Validation Section */}
          <section id="validation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Validation States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Show validation feedback with different visual states and helper messages.
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

          {/* Styling Section */}
          <section id="styling" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize input appearance with different sizes, borders, and visual styles.
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
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Proper accessibility implementation with ARIA attributes and semantic markup.
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
                    <td className="py-3 px-4 font-mono">&quot;Input&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">inputType</td>
                    <td className="py-3 px-4 font-mono">&quot;text&quot; | &quot;email&quot; | &quot;password&quot; | &quot;number&quot; | &quot;tel&quot; | &quot;url&quot; | &quot;search&quot; | etc.</td>
                    <td className="py-3 px-4">&quot;text&quot;</td>
                    <td className="py-3 px-4">HTML input type</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">placeholder</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Placeholder text shown when input is empty</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Initial value of the input</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Disable input interactions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">readOnly</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Make input read-only</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">required</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Mark input as required for form validation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Unique identifier for accessibility and labels</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-label</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Accessibility label for screen readers</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-describedby</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">ID of element that describes the input</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-invalid</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Indicates if input value is invalid</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">min</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Minimum value (for number/date inputs)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">max</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Maximum value (for number/date inputs)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">step</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Step value for numeric inputs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how Input components work in real-world form scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Contact Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Contact Form</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
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

              {/* Login Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Login Form</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(loginFormSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(loginFormSpec, null, 2)}
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