import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePageMetadata } from "../../../lib/meta";

export function SeparatorShowcase(): JSX.Element {
  usePageMetadata({
    title: "Separator Component - React Jedi",
    description: "Visually separate content with the Separator component. Create thematic breaks with horizontal or vertical dividers.",
  });

  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const basicSeparatorSpec: UISpecification = {
    type: "Stack",
    spacing: "lg",
    children: [
      { type: "Text", children: "Content above the separator" },
      { type: "Separator" },
      { type: "Text", children: "Content below the separator" }
    ]
  };

  const verticalSeparatorSpec: UISpecification = {
    type: "Stack",
    direction: "row",
    spacing: "lg",
    className: "items-center",
    children: [
      { type: "Text", children: "Left content" },
      { type: "Separator", orientation: "vertical", className: "h-8" },
      { type: "Text", children: "Right content" }
    ]
  };

  const navigationExampleSpec: UISpecification = {
    type: "Box",
    className: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4",
    children: [
      {
        type: "Stack",
        spacing: "sm",
        children: [
          {
            type: "Stack",
            direction: "row",
            spacing: "md",
            className: "items-center",
            children: [
              { type: "Button", children: "Home", variant: "ghost", size: "sm" },
              { type: "Button", children: "About", variant: "ghost", size: "sm" },
              { type: "Button", children: "Services", variant: "ghost", size: "sm" },
              { type: "Button", children: "Contact", variant: "ghost", size: "sm" }
            ]
          },
          { type: "Separator" },
          { type: "Text", children: "Welcome to our website", className: "text-lg font-medium pt-2" }
        ]
      }
    ]
  };

  const listSeparatorSpec: UISpecification = {
    type: "Box",
    className: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg",
    children: [
      {
        type: "Stack",
        spacing: "none",
        children: [
          {
            type: "Box",
            className: "p-4",
            children: [
              { type: "Text", children: "First Item", className: "font-medium" },
              { type: "Text", children: "Description for the first item", className: "text-sm text-gray-600 dark:text-gray-400" }
            ]
          },
          { type: "Separator" },
          {
            type: "Box",
            className: "p-4",
            children: [
              { type: "Text", children: "Second Item", className: "font-medium" },
              { type: "Text", children: "Description for the second item", className: "text-sm text-gray-600 dark:text-gray-400" }
            ]
          },
          { type: "Separator" },
          {
            type: "Box",
            className: "p-4",
            children: [
              { type: "Text", children: "Third Item", className: "font-medium" },
              { type: "Text", children: "Description for the third item", className: "text-sm text-gray-600 dark:text-gray-400" }
            ]
          }
        ]
      }
    ]
  };

  const cardSeparatorSpec: UISpecification = {
    type: "Card",
    className: "max-w-md",
    children: [
      {
        type: "Stack",
        spacing: "lg",
        children: [
          {
            type: "Stack",
            spacing: "sm",
            children: [
              { type: "Heading", level: 3, children: "Account Settings" },
              { type: "Text", children: "Manage your account preferences", className: "text-sm text-gray-600 dark:text-gray-400" }
            ]
          },
          { type: "Separator" },
          {
            type: "Stack",
            spacing: "md",
            children: [
              { type: "Label", children: "Email Notifications" },
              {
                type: "Stack",
                direction: "row",
                className: "items-center justify-between",
                children: [
                  { type: "Text", children: "Receive marketing emails", className: "text-sm" },
                  { type: "Switch" }
                ]
              }
            ]
          },
          { type: "Separator" },
          {
            type: "Stack",
            spacing: "md",
            children: [
              { type: "Label", children: "Privacy Settings" },
              {
                type: "Stack",
                direction: "row",
                className: "items-center justify-between",
                children: [
                  { type: "Text", children: "Profile visible to others", className: "text-sm" },
                  { type: "Switch", defaultChecked: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const footerSeparatorSpec: UISpecification = {
    type: "Box",
    className: "bg-gray-50 dark:bg-gray-900 p-6 rounded-lg",
    children: [
      {
        type: "Stack",
        spacing: "md",
        children: [
          {
            type: "Stack",
            direction: "row",
            spacing: "lg",
            className: "items-center justify-center flex-wrap",
            children: [
              { type: "Button", children: "Terms", variant: "link", size: "sm" },
              { type: "Separator", orientation: "vertical", className: "h-4" },
              { type: "Button", children: "Privacy", variant: "link", size: "sm" },
              { type: "Separator", orientation: "vertical", className: "h-4" },
              { type: "Button", children: "Support", variant: "link", size: "sm" },
              { type: "Separator", orientation: "vertical", className: "h-4" },
              { type: "Button", children: "Contact", variant: "link", size: "sm" }
            ]
          },
          { type: "Separator" },
          { type: "Text", children: "© 2024 Your Company. All rights reserved.", className: "text-center text-sm text-gray-600 dark:text-gray-400" }
        ]
      }
    ]
  };

  const breadcrumbSeparatorSpec: UISpecification = {
    type: "Stack",
    direction: "row",
    spacing: "sm",
    className: "items-center text-sm",
    children: [
      { type: "Button", children: "Home", variant: "link", size: "sm", className: "p-0 h-auto" },
      { type: "Text", children: "/", className: "text-gray-400" },
      { type: "Button", children: "Products", variant: "link", size: "sm", className: "p-0 h-auto" },
      { type: "Text", children: "/", className: "text-gray-400" },
      { type: "Text", children: "Electronics", className: "text-gray-900 dark:text-gray-100" }
    ]
  };

  const toolbarSeparatorSpec: UISpecification = {
    type: "Box",
    className: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2",
    children: [
      {
        type: "Stack",
        direction: "row",
        spacing: "sm",
        className: "items-center",
        children: [
          { type: "Button", children: "Bold", variant: "outline", size: "sm" },
          { type: "Button", children: "Italic", variant: "outline", size: "sm" },
          { type: "Button", children: "Underline", variant: "outline", size: "sm" },
          { type: "Separator", orientation: "vertical", className: "h-6" },
          { type: "Button", children: "Align Left", variant: "outline", size: "sm" },
          { type: "Button", children: "Align Center", variant: "outline", size: "sm" },
          { type: "Button", children: "Align Right", variant: "outline", size: "sm" },
          { type: "Separator", orientation: "vertical", className: "h-6" },
          { type: "Button", children: "Link", variant: "outline", size: "sm" },
          { type: "Button", children: "Image", variant: "outline", size: "sm" }
        ]
      }
    ]
  };

  const semanticSeparatorSpec: UISpecification = {
    type: "Stack",
    spacing: "lg",
    className: "max-w-2xl",
    children: [
      {
        type: "Stack",
        spacing: "sm",
        children: [
          { type: "Heading", level: 2, children: "Chapter 1: Introduction" },
          { type: "Text", children: "This is the beginning of our story, where we set the scene and introduce the main characters..." }
        ]
      },
      { type: "Separator", decorative: false },
      {
        type: "Stack",
        spacing: "sm",
        children: [
          { type: "Heading", level: 2, children: "Chapter 2: The Journey Begins" },
          { type: "Text", children: "Our heroes embark on their quest, facing challenges and discovering new truths..." }
        ]
      }
    ]
  };

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "basic-usage", title: "Basic Usage" },
    { id: "orientations", title: "Orientations" },
    { id: "navigation", title: "Navigation Examples" },
    { id: "lists", title: "List Separators" },
    { id: "cards", title: "Card Layouts" },
    { id: "toolbars", title: "Toolbars" },
    { id: "semantic", title: "Semantic Breaks" },
    { id: "props", title: "Props" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto z-10">
          <div className="p-6">
            <div className="mb-6">
              <Link
                to="/showcase"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                ← Back to Showcase
              </Link>
            </div>
            <h1 className="text-2xl font-bold mb-2">Separator</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Visual divider for content sections
            </p>
            
            <nav>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Table of Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left text-sm w-full p-2 rounded transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1">
          <div className="max-w-4xl mx-auto p-8">
            {/* Overview */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The Separator component creates visual or semantic breaks between content sections. 
                It supports both horizontal and vertical orientations and can be used as a purely 
                decorative element or as a semantic divider that's announced by screen readers.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Accessibility tip:</strong> Use <code>decorative: false</code> when the separator 
                  represents a thematic break between sections that should be announced to screen reader users.
                </p>
              </div>
            </section>

            {/* Basic Usage */}
            <section id="basic-usage" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Basic Usage</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The simplest way to use Separator is with default settings, which creates a horizontal divider.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(basicSeparatorSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(basicSeparatorSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Orientations */}
            <section id="orientations" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Orientations</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Separators can be oriented horizontally (default) or vertically. Vertical separators 
                require an explicit height to be visible.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Horizontal Separator (Default)</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    {render(basicSeparatorSpec)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Vertical Separator</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    {render(verticalSeparatorSpec)}
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                      View JSON Specification
                    </summary>
                    <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                      {JSON.stringify(verticalSeparatorSpec, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </section>

            {/* Navigation Examples */}
            <section id="navigation" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Navigation Examples</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Separators are commonly used in navigation to create visual boundaries between sections.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Navigation Bar with Separator</h3>
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

                <div>
                  <h3 className="text-lg font-semibold mb-3">Breadcrumb Navigation</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    {render(breadcrumbSeparatorSpec)}
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                      View JSON Specification
                    </summary>
                    <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                      {JSON.stringify(breadcrumbSeparatorSpec, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </section>

            {/* List Separators */}
            <section id="lists" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">List Separators</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Use separators to divide items in lists for better visual organization.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(listSeparatorSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(listSeparatorSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Card Layouts */}
            <section id="cards" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Card Layouts</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Separators help organize content within cards by creating distinct sections.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(cardSeparatorSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(cardSeparatorSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Toolbars */}
            <section id="toolbars" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Toolbars</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Vertical separators work perfectly for grouping related actions in toolbars.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(toolbarSeparatorSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(toolbarSeparatorSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Semantic Breaks */}
            <section id="semantic" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Semantic Breaks</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                When content represents distinct sections or chapters, use non-decorative separators 
                that will be announced by screen readers as thematic breaks.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(semanticSeparatorSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(semanticSeparatorSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Props */}
            <section id="props" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Props</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold">Prop</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold">Type</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold">Default</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">orientation</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                          "horizontal" | "vertical"
                        </code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">"horizontal"</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        The orientation of the separator. Horizontal creates a line across, vertical creates a line up/down.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">decorative</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">boolean</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">true</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Whether the separator is decorative (visual only) or semantic (announced by screen readers).
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">className</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">string</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Additional CSS classes to apply to the separator element.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">style</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">CSSProperties</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Inline styles to apply to the separator element.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Usage Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>Vertical separators require an explicit height to be visible (e.g., <code>className="h-8"</code>).</li>
                  <li>Use decorative separators for purely visual divisions.</li>
                  <li>Use non-decorative separators for thematic breaks that should be announced to screen readers.</li>
                  <li>The default styling uses the border color from your theme's color scheme.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Footer Example</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(footerSeparatorSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(footerSeparatorSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </section>

            {/* Footer Navigation */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
              <div className="flex justify-between">
                <Link
                  to="/showcase"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← Back to Component Showcase
                </Link>
                <Link
                  to="/documentation"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}