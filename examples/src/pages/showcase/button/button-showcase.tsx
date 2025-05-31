import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function ButtonShowcase() {
  usePageMetadata({
    title: "Button Component",
    description:
      "A comprehensive showcase of the React Jedi Button component with all variants, sizes, states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Button Variants" },
    { id: "sizes", label: "Button Sizes" },
    { id: "states", label: "Button States" },
    { id: "with-icons", label: "Buttons with Icons" },
    { id: "loading", label: "Loading States" },
    { id: "full-width", label: "Full Width Buttons" },
    { id: "button-groups", label: "Button Groups" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Button variants specification
  const variantsSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      { type: "Button", children: "Default", variant: "default" },
      { type: "Button", children: "Primary", variant: "primary" },
      { type: "Button", children: "Secondary", variant: "secondary" },
      { type: "Button", children: "Outline", variant: "outline" },
      { type: "Button", children: "Ghost", variant: "ghost" },
      { type: "Button", children: "Link", variant: "link" },
      { type: "Button", children: "Destructive", variant: "destructive" },
    ],
  };

  // Button sizes specification
  const sizesSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    align: "center",
    children: [
      { type: "Button", children: "Small", size: "sm", variant: "outline" },
      { type: "Button", children: "Default", size: "default", variant: "outline" },
      { type: "Button", children: "Large", size: "lg", variant: "outline" },
      { type: "Button", children: "Icon", size: "icon", variant: "outline", icon: "➕" },
    ],
  };

  // Button states specification
  const statesSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      { type: "Button", children: "Normal", variant: "primary" },
      { type: "Button", children: "Disabled", variant: "primary", disabled: true },
      { type: "Button", children: "Loading", variant: "primary", loading: true },
    ],
  };

  // Buttons with icons (simulated with emoji for now)
  const iconsSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      { type: "Button", children: "✉️ Send Email", variant: "default" },
      { type: "Button", children: "⬇️ Download", variant: "secondary" },
      { type: "Button", children: "Settings ⚙️", variant: "outline" },
    ],
  };

  // Loading states
  const loadingSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "3",
        children: [
          { type: "Button", children: "Loading...", variant: "default", loading: true },
          { type: "Button", children: "Processing", variant: "primary", loading: true },
          { type: "Button", children: "Please wait", variant: "secondary", loading: true },
        ],
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Loading buttons are disabled by default and show a loading spinner",
      },
    ],
  };

  // Full width buttons
  const fullWidthSpec: UISpecification = {
    type: "Stack",
    spacing: "3",
    className: "w-full max-w-sm",
    children: [
      { type: "Button", children: "Full Width Default", className: "w-full" },
      { type: "Button", children: "Full Width Primary", variant: "primary", className: "w-full" },
      { type: "Button", children: "Full Width Secondary", variant: "secondary", className: "w-full" },
    ],
  };

  // Button groups
  const buttonGroupSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "0",
        className: "rounded-lg overflow-hidden",
        children: [
          { type: "Button", children: "Left", variant: "outline", className: "rounded-none border-r-0" },
          { type: "Button", children: "Center", variant: "outline", className: "rounded-none border-r-0" },
          { type: "Button", children: "Right", variant: "outline", className: "rounded-none" },
        ],
      },
      {
        type: "Group",
        spacing: "2",
        children: [
          { type: "Button", children: "Save", variant: "primary", size: "sm" },
          { type: "Button", children: "Cancel", variant: "outline", size: "sm" },
        ],
      },
    ],
  };

  // Complete form example
  const formExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Create Account" },
          { type: "CardDescription", children: "Fill in your details to get started" },
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
                { type: "Label", htmlFor: "name", children: "Name" },
                { type: "Input", id: "name", placeholder: "John Doe" },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "email", children: "Email" },
                { type: "Input", id: "email", inputType: "email", placeholder: "john@example.com" },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "password", children: "Password" },
                { type: "Input", id: "password", inputType: "password", placeholder: "••••••••" },
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
          { type: "Button", variant: "primary", children: "Create Account", className: "flex-1" },
        ],
      },
    ],
  };

  // Action buttons example
  const actionButtonsSpec: UISpecification = {
    type: "Alert",
    className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
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
                children: "🎉",
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Text",
                    className: "font-semibold",
                    children: "Welcome to React Jedi!",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Your account has been successfully created.",
                  },
                ],
              },
            ],
          },
          {
            type: "Group",
            spacing: "2",
            children: [
              { type: "Button", size: "sm", variant: "primary", children: "Get Started" },
              { type: "Button", size: "sm", variant: "ghost", children: "Learn More" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Button Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile button component that supports multiple variants, sizes, and states. Perfect for actions, forms, and navigation throughout your application.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Button component is one of the most fundamental UI elements in React Jedi. It provides a clickable element that can trigger actions, submit forms, or navigate to different parts of your application.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple visual variants (default, primary, secondary, outline, ghost, link, destructive)</li>
                <li>Four size options (small, default, large, icon)</li>
                <li>Built-in loading and disabled states</li>
                <li>Full keyboard navigation support</li>
                <li>Accessible by default with proper ARIA attributes</li>
                <li>Customizable with className prop</li>
              </ul>
            </div>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from seven different button variants to match your design needs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(variantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(variantsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Sizes Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Buttons come in four sizes to fit different contexts and layouts.
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

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Button States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Buttons can be disabled or show a loading state to indicate processing.
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

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Buttons with Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance buttons with icons for better visual communication.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(iconsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(iconsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Loading States Section */}
          <section id="loading" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Loading States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Show loading states to indicate that an action is being processed.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(loadingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(loadingSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Full Width Section */}
          <section id="full-width" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Full Width Buttons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Buttons can expand to fill their container width using the className prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(fullWidthSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(fullWidthSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Button Groups Section */}
          <section id="button-groups" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Button Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Group related buttons together for better organization.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(buttonGroupSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(buttonGroupSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Button&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">string | ComponentSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Button content</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;primary&quot; | &quot;secondary&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;link&quot; | &quot;destructive&quot;</td>
                    <td className="py-3 px-4">&quot;default&quot;</td>
                    <td className="py-3 px-4">Visual style variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                    <td className="py-3 px-4 font-mono">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot; | &quot;icon&quot;</td>
                    <td className="py-3 px-4">&quot;default&quot;</td>
                    <td className="py-3 px-4">Button size</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Disable button interactions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">loading</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Show loading spinner and disable button</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">buttonType</td>
                    <td className="py-3 px-4 font-mono">&quot;button&quot; | &quot;submit&quot; | &quot;reset&quot;</td>
                    <td className="py-3 px-4">&quot;button&quot;</td>
                    <td className="py-3 px-4">HTML button type attribute</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onClick</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Click event handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how buttons work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Form with Action Buttons</h3>
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

              {/* Action Buttons Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Alert with Action Buttons</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(actionButtonsSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
{JSON.stringify(actionButtonsSpec, null, 2)}
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