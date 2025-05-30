import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function StackShowcase() {
  usePageMetadata({
    title: "Stack Component",
    description:
      "A comprehensive showcase of the React Jedi Stack component with spacing, alignment, orientation, and advanced layout examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Stack" },
    { id: "spacing", label: "Spacing Options" },
    { id: "alignment", label: "Alignment Options" },
    { id: "orientation", label: "Orientation" },
    { id: "dividers", label: "With Dividers" },
    { id: "responsive", label: "Responsive Stack" },
    { id: "nested", label: "Nested Stacks" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic stack specification
  const basicStackSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Card",
        className: "p-4",
        children: { type: "Text", children: "First Item" },
      },
      {
        type: "Card",
        className: "p-4",
        children: { type: "Text", children: "Second Item" },
      },
      {
        type: "Card",
        className: "p-4",
        children: { type: "Text", children: "Third Item" },
      },
    ],
  };

  // Spacing variations
  const spacingSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Spacing: none" },
          {
            type: "Stack",
            spacing: "none",
            children: [
              { type: "Badge", children: "Item 1" },
              { type: "Badge", children: "Item 2" },
              { type: "Badge", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Spacing: sm" },
          {
            type: "Stack",
            spacing: "sm",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Spacing: lg" },
          {
            type: "Stack",
            spacing: "lg",
            children: [
              { type: "Badge", variant: "outline", children: "Item 1" },
              { type: "Badge", variant: "outline", children: "Item 2" },
              { type: "Badge", variant: "outline", children: "Item 3" },
            ],
          },
        ],
      },
    ],
  };

  // Alignment options
  const alignmentSpec: UISpecification = {
    type: "Grid",
    columns: { base: 1, md: 2 },
    gap: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Align: start" },
          {
            type: "Box",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: {
              type: "Stack",
              spacing: "3",
              align: "start",
              children: [
                { type: "Button", size: "sm", children: "Short" },
                { type: "Button", size: "sm", children: "Medium length" },
                { type: "Button", size: "sm", children: "Very long button text" },
              ],
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Align: center" },
          {
            type: "Box",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: {
              type: "Stack",
              spacing: "3",
              align: "center",
              children: [
                { type: "Button", size: "sm", variant: "outline", children: "Short" },
                { type: "Button", size: "sm", variant: "outline", children: "Medium length" },
                { type: "Button", size: "sm", variant: "outline", children: "Very long button text" },
              ],
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Align: end" },
          {
            type: "Box",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: {
              type: "Stack",
              spacing: "3",
              align: "end",
              children: [
                { type: "Button", size: "sm", variant: "secondary", children: "Short" },
                { type: "Button", size: "sm", variant: "secondary", children: "Medium length" },
                { type: "Button", size: "sm", variant: "secondary", children: "Very long button text" },
              ],
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "text-sm font-medium mb-2", children: "Align: stretch" },
          {
            type: "Box",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: {
              type: "Stack",
              spacing: "3",
              align: "stretch",
              children: [
                { type: "Button", variant: "ghost", children: "Short" },
                { type: "Button", variant: "ghost", children: "Medium length" },
                { type: "Button", variant: "ghost", children: "Very long button text" },
              ],
            },
          },
        ],
      },
    ],
  };

  // Horizontal stack
  const horizontalStackSpec: UISpecification = {
    type: "Stack",
    orientation: "horizontal",
    spacing: "4",
    align: "center",
    children: [
      { type: "Badge", children: "React" },
      { type: "Badge", variant: "secondary", children: "TypeScript" },
      { type: "Badge", variant: "outline", children: "Tailwind CSS" },
      { type: "Badge", variant: "destructive", children: "Vite" },
    ],
  };

  // Stack with dividers
  const dividerStackSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    divider: { type: "Separator" },
    children: [
      {
        type: "Box",
        children: [
          { type: "Heading", level: "h4", children: "Section 1" },
          { type: "Text", size: "small", variant: "muted", children: "This is the first section with some content." },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Heading", level: "h4", children: "Section 2" },
          { type: "Text", size: "small", variant: "muted", children: "This is the second section with different content." },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Heading", level: "h4", children: "Section 3" },
          { type: "Text", size: "small", variant: "muted", children: "This is the third section with more content." },
        ],
      },
    ],
  };

  // Responsive stack
  const responsiveStackSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "md:flex-row",
    children: [
      {
        type: "Card",
        className: "flex-1",
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: "Mobile First" },
              { type: "CardDescription", children: "Stacks vertically on mobile" },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "This card is part of a responsive stack layout.",
            },
          },
        ],
      },
      {
        type: "Card",
        className: "flex-1",
        children: [
          {
            type: "CardHeader",
            children: [
              { type: "CardTitle", children: "Desktop Layout" },
              { type: "CardDescription", children: "Arranges horizontally on desktop" },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "The stack automatically adapts to screen size.",
            },
          },
        ],
      },
    ],
  };

  // Nested stacks
  const nestedStackSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "p-6 bg-gray-50 dark:bg-gray-900 rounded-lg",
    children: [
      { type: "Heading", level: "h3", children: "Nested Stack Example" },
      {
        type: "Stack",
        orientation: "horizontal",
        spacing: "4",
        children: [
          {
            type: "Stack",
            spacing: "2",
            className: "flex-1",
            children: [
              { type: "Text", size: "small", weight: "medium", children: "Left Column" },
              { type: "Button", size: "sm", variant: "outline", children: "Action 1" },
              { type: "Button", size: "sm", variant: "outline", children: "Action 2" },
            ],
          },
          { type: "Separator", orientation: "vertical", className: "h-auto" },
          {
            type: "Stack",
            spacing: "2",
            className: "flex-1",
            children: [
              { type: "Text", size: "small", weight: "medium", children: "Right Column" },
              { type: "Badge", children: "Status: Active" },
              { type: "Badge", variant: "secondary", children: "Priority: High" },
            ],
          },
        ],
      },
    ],
  };

  // Form example with Stack
  const formExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "User Profile" },
          { type: "CardDescription", children: "Update your profile information" },
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
                { type: "Label", htmlFor: "name", children: "Full Name" },
                { type: "Input", id: "name", placeholder: "John Doe" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Label", htmlFor: "email", children: "Email Address" },
                { type: "Input", id: "email", inputType: "email", placeholder: "john@example.com" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Label", htmlFor: "bio", children: "Bio" },
                { type: "Textarea", id: "bio", placeholder: "Tell us about yourself...", className: "min-h-[100px]" },
              ],
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "3",
              children: [
                { type: "Checkbox", id: "newsletter" },
                { type: "Label", htmlFor: "newsletter", children: "Subscribe to newsletter" },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: {
          type: "Stack",
          orientation: "horizontal",
          spacing: "3",
          justify: "end",
          className: "w-full",
          children: [
            { type: "Button", variant: "outline", children: "Cancel" },
            { type: "Button", variant: "primary", children: "Save Changes" },
          ],
        },
      },
    ],
  };

  // Navigation example
  const navigationExampleSpec: UISpecification = {
    type: "Box",
    className: "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6",
    children: {
      type: "Stack",
      spacing: "6",
      children: [
        {
          type: "Stack",
          orientation: "horizontal",
          spacing: "4",
          align: "center",
          justify: "between",
          children: [
            { type: "Heading", level: "h3", children: "Dashboard" },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "2",
              children: [
                { type: "Button", size: "sm", variant: "ghost", children: "Settings" },
                { type: "Button", size: "sm", variant: "primary", children: "New Project" },
              ],
            },
          ],
        },
        { type: "Separator" },
        {
          type: "Stack",
          spacing: "3",
          children: [
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "3",
              align: "center",
              className: "p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer",
              children: [
                { type: "Text", className: "text-2xl", children: "📊" },
                {
                  type: "Stack",
                  spacing: "1",
                  className: "flex-1",
                  children: [
                    { type: "Text", weight: "medium", children: "Analytics" },
                    { type: "Text", size: "small", variant: "muted", children: "View your site analytics" },
                  ],
                },
              ],
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "3",
              align: "center",
              className: "p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer",
              children: [
                { type: "Text", className: "text-2xl", children: "👥" },
                {
                  type: "Stack",
                  spacing: "1",
                  className: "flex-1",
                  children: [
                    { type: "Text", weight: "medium", children: "Users" },
                    { type: "Text", size: "small", variant: "muted", children: "Manage user accounts" },
                  ],
                },
              ],
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "3",
              align: "center",
              className: "p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer",
              children: [
                { type: "Text", className: "text-2xl", children: "⚙️" },
                {
                  type: "Stack",
                  spacing: "1",
                  className: "flex-1",
                  children: [
                    { type: "Text", weight: "medium", children: "Settings" },
                    { type: "Text", size: "small", variant: "muted", children: "Configure your preferences" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Stack Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile layout component that arranges children vertically or horizontally with consistent spacing. Perfect for building forms, navigation, and content sections.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Stack component is a fundamental layout primitive in React Jedi that simplifies the arrangement of child elements. It provides consistent spacing, alignment control, and can switch between vertical and horizontal orientations.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Vertical (default) or horizontal orientation</li>
                <li>Multiple spacing options from none to 3xl</li>
                <li>Flexible alignment control (start, center, end, stretch, baseline)</li>
                <li>Distribution options (justify) for main axis</li>
                <li>Optional dividers between items</li>
                <li>Wrap support for overflow handling</li>
                <li>Composable with other layout components</li>
              </ul>
            </div>
          </section>

          {/* Basic Stack Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Stack</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest Stack arranges items vertically with default spacing.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicStackSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicStackSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Spacing Options Section */}
          <section id="spacing" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Spacing Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the gap between items with predefined spacing values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(spacingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(spacingSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Alignment Options Section */}
          <section id="alignment" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Alignment Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Align items along the cross axis using different alignment values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignmentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Orientation Section */}
          <section id="orientation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Horizontal Orientation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Stack can arrange items horizontally, perfect for inline layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(horizontalStackSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(horizontalStackSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Dividers Section */}
          <section id="dividers" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Stack with Dividers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add visual separators between stack items automatically.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(dividerStackSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(dividerStackSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Responsive Stack Section */}
          <section id="responsive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Stack</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create responsive layouts that adapt orientation based on screen size.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(responsiveStackSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(responsiveStackSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Nested Stacks Section */}
          <section id="nested" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Stacks</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Combine multiple Stack components to create complex layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(nestedStackSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(nestedStackSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Stack&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Child components to arrange</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">orientation</td>
                    <td className="py-3 px-4 font-mono">"horizontal" | &quot;vertical&quot;</td>
                    <td className="py-3 px-4">&quot;vertical&quot;</td>
                    <td className="py-3 px-4">Stack direction</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">spacing</td>
                    <td className="py-3 px-4 font-mono">"none" | "xs" | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;3xl&quot; | string</td>
                    <td className="py-3 px-4">&quot;md&quot;</td>
                    <td className="py-3 px-4">Gap between items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                    <td className="py-3 px-4 font-mono">"start" | "center" | &quot;end&quot; | &quot;stretch&quot; | &quot;baseline&quot;</td>
                    <td className="py-3 px-4">&quot;stretch&quot;</td>
                    <td className="py-3 px-4">Cross axis alignment</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">justify</td>
                    <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;center&quot; | &quot;end&quot; | &quot;between&quot; | &quot;around&quot; | &quot;evenly&quot;</td>
                    <td className="py-3 px-4">&quot;start&quot;</td>
                    <td className="py-3 px-4">Main axis distribution</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">wrap</td>
                    <td className="py-3 px-4 font-mono">&quot;wrap&quot; | &quot;nowrap&quot; | &quot;wrap-reverse&quot;</td>
                    <td className="py-3 px-4">&quot;nowrap&quot;</td>
                    <td className="py-3 px-4">Whether items can wrap</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">divider</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Component to render between items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">as</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;div&quot;</td>
                    <td className="py-3 px-4">HTML element to render</td>
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
              See how Stack components work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Form Layout with Stack</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(formExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(formExampleSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Navigation Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Navigation Menu with Stack</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(navigationExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(navigationExampleSpec, null, 2)}
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
                to="/documentation/layout-components"
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