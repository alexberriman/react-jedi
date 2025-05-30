import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePageMetadata } from "../../../lib/meta";

export function SpacerShowcase(): JSX.Element {
  usePageMetadata({
    title: "Spacer Component - React Jedi",
    description: "Create flexible spacing in your layouts with the Spacer component. Control spacing with precise sizes and orientation options.",
  });

  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const basicSpacerSpec: UISpecification = {
    type: "Spacer",
    size: "md"
  };

  const horizontalSpacerSpec: UISpecification = {
    type: "Stack",
    direction: "row",
    spacing: "sm",
    children: [
      { type: "Button", children: "First" },
      { type: "Spacer", size: "lg", orientation: "horizontal" },
      { type: "Button", children: "Second" }
    ]
  };

  const verticalLayoutSpec: UISpecification = {
    type: "Stack",
    direction: "column",
    className: "max-w-md",
    children: [
      { type: "Text", children: "Header Content", className: "font-semibold text-lg" },
      { type: "Spacer", size: "md" },
      { type: "Text", children: "This is some body content that comes after the header with proper spacing." },
      { type: "Spacer", size: "lg" },
      { type: "Button", children: "Action Button", variant: "default" }
    ]
  };

  const sizeVariationsSpec: UISpecification = {
    type: "Grid",
    cols: 2,
    gap: "md",
    className: "max-w-4xl",
    children: [
      {
        type: "Stack",
        direction: "column",
        children: [
          { type: "Text", children: "Extra Small (xs)", className: "text-sm font-medium" },
          { type: "Box", className: "bg-blue-100 dark:bg-blue-900 h-4", children: [] },
          { type: "Spacer", size: "xs", showGuide: true },
          { type: "Box", className: "bg-blue-100 dark:bg-blue-900 h-4", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "column",
        children: [
          { type: "Text", children: "Small (sm)", className: "text-sm font-medium" },
          { type: "Box", className: "bg-green-100 dark:bg-green-900 h-4", children: [] },
          { type: "Spacer", size: "sm", showGuide: true },
          { type: "Box", className: "bg-green-100 dark:bg-green-900 h-4", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "column",
        children: [
          { type: "Text", children: "Medium (md)", className: "text-sm font-medium" },
          { type: "Box", className: "bg-yellow-100 dark:bg-yellow-900 h-4", children: [] },
          { type: "Spacer", size: "md", showGuide: true },
          { type: "Box", className: "bg-yellow-100 dark:bg-yellow-900 h-4", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "column",
        children: [
          { type: "Text", children: "Large (lg)", className: "text-sm font-medium" },
          { type: "Box", className: "bg-red-100 dark:bg-red-900 h-4", children: [] },
          { type: "Spacer", size: "lg", showGuide: true },
          { type: "Box", className: "bg-red-100 dark:bg-red-900 h-4", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "column",
        children: [
          { type: "Text", children: "Extra Large (xl)", className: "text-sm font-medium" },
          { type: "Box", className: "bg-purple-100 dark:bg-purple-900 h-4", children: [] },
          { type: "Spacer", size: "xl", showGuide: true },
          { type: "Box", className: "bg-purple-100 dark:bg-purple-900 h-4", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "column",
        children: [
          { type: "Text", children: "2X Large (2xl)", className: "text-sm font-medium" },
          { type: "Box", className: "bg-indigo-100 dark:bg-indigo-900 h-4", children: [] },
          { type: "Spacer", size: "2xl", showGuide: true },
          { type: "Box", className: "bg-indigo-100 dark:bg-indigo-900 h-4", children: [] }
        ]
      }
    ]
  };

  const horizontalSizesSpec: UISpecification = {
    type: "Stack",
    direction: "column",
    spacing: "lg",
    children: [
      {
        type: "Stack",
        direction: "row",
        className: "items-center",
        children: [
          { type: "Text", children: "Small", className: "w-16 text-sm" },
          { type: "Box", className: "bg-blue-200 dark:bg-blue-800 w-4 h-8", children: [] },
          { type: "Spacer", size: "sm", orientation: "horizontal", showGuide: true },
          { type: "Box", className: "bg-blue-200 dark:bg-blue-800 w-4 h-8", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "row",
        className: "items-center",
        children: [
          { type: "Text", children: "Medium", className: "w-16 text-sm" },
          { type: "Box", className: "bg-green-200 dark:bg-green-800 w-4 h-8", children: [] },
          { type: "Spacer", size: "md", orientation: "horizontal", showGuide: true },
          { type: "Box", className: "bg-green-200 dark:bg-green-800 w-4 h-8", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "row",
        className: "items-center",
        children: [
          { type: "Text", children: "Large", className: "w-16 text-sm" },
          { type: "Box", className: "bg-yellow-200 dark:bg-yellow-800 w-4 h-8", children: [] },
          { type: "Spacer", size: "lg", orientation: "horizontal", showGuide: true },
          { type: "Box", className: "bg-yellow-200 dark:bg-yellow-800 w-4 h-8", children: [] }
        ]
      },
      {
        type: "Stack",
        direction: "row",
        className: "items-center",
        children: [
          { type: "Text", children: "XL", className: "w-16 text-sm" },
          { type: "Box", className: "bg-red-200 dark:bg-red-800 w-4 h-8", children: [] },
          { type: "Spacer", size: "xl", orientation: "horizontal", showGuide: true },
          { type: "Box", className: "bg-red-200 dark:bg-red-800 w-4 h-8", children: [] }
        ]
      }
    ]
  };

  const formLayoutSpec: UISpecification = {
    type: "Form",
    className: "max-w-md space-y-0",
    children: [
      { type: "Heading", level: 3, children: "Contact Form" },
      { type: "Spacer", size: "lg" },
      { type: "Label", children: "Name", htmlFor: "name" },
      { type: "Spacer", size: "xs" },
      { type: "Input", placeholder: "Enter your name", id: "name" },
      { type: "Spacer", size: "md" },
      { type: "Label", children: "Email", htmlFor: "email" },
      { type: "Spacer", size: "xs" },
      { type: "Input", placeholder: "Enter your email", inputType: "email", id: "email" },
      { type: "Spacer", size: "lg" },
      { type: "Button", children: "Submit", buttonType: "submit", className: "w-full" }
    ]
  };

  const cardLayoutSpec: UISpecification = {
    type: "Grid",
    cols: 2,
    gap: "lg",
    className: "max-w-4xl",
    children: [
      {
        type: "Card",
        children: [
          { type: "Heading", level: 4, children: "Product A" },
          { type: "Spacer", size: "sm" },
          { type: "Text", children: "A brief description of this product and its key features." },
          { type: "Spacer", size: "md" },
          { type: "Text", children: "$99.99", className: "text-2xl font-bold text-primary" },
          { type: "Spacer", size: "lg" },
          { type: "Button", children: "Add to Cart", className: "w-full" }
        ]
      },
      {
        type: "Card",
        children: [
          { type: "Heading", level: 4, children: "Product B" },
          { type: "Spacer", size: "sm" },
          { type: "Text", children: "Another great product with excellent value and quality." },
          { type: "Spacer", size: "md" },
          { type: "Text", children: "$149.99", className: "text-2xl font-bold text-primary" },
          { type: "Spacer", size: "lg" },
          { type: "Button", children: "Add to Cart", className: "w-full" }
        ]
      }
    ]
  };

  const navigationBarSpec: UISpecification = {
    type: "Box",
    className: "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4",
    children: [
      {
        type: "Stack",
        direction: "row",
        className: "items-center max-w-6xl mx-auto",
        children: [
          { type: "Text", children: "Brand", className: "text-xl font-bold" },
          { type: "Spacer", size: "lg", orientation: "horizontal" },
          { type: "Button", children: "Home", variant: "ghost" },
          { type: "Spacer", size: "sm", orientation: "horizontal" },
          { type: "Button", children: "About", variant: "ghost" },
          { type: "Spacer", size: "sm", orientation: "horizontal" },
          { type: "Button", children: "Contact", variant: "ghost" },
          { type: "Spacer", size: "xl", orientation: "horizontal" },
          { type: "Button", children: "Login", variant: "outline" }
        ]
      }
    ]
  };

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "basic-usage", title: "Basic Usage" },
    { id: "size-variations", title: "Size Variations" },
    { id: "horizontal-spacing", title: "Horizontal Spacing" },
    { id: "form-layouts", title: "Form Layouts" },
    { id: "card-layouts", title: "Card Layouts" },
    { id: "navigation", title: "Navigation" },
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
            <h1 className="text-2xl font-bold mb-2">Spacer</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Create flexible spacing in your layouts
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
                The Spacer component provides a simple and flexible way to add consistent spacing between elements in your layouts. 
                It supports both vertical and horizontal spacing with predefined size tokens that align with your design system.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Pro tip:</strong> Use the <code>showGuide</code> prop during development to visualize spacing and ensure consistent layouts.
                </p>
              </div>
            </section>

            {/* Basic Usage */}
            <section id="basic-usage" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Basic Usage</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The simplest way to use Spacer is with default settings, which creates a medium-sized vertical space.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(basicSpacerSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(basicSpacerSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Size Variations */}
            <section id="size-variations" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Size Variations</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Spacer supports multiple predefined sizes from extra small (xs) to extra large (9xl). 
                The guide visualization shows the exact spacing for each size.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(sizeVariationsSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(sizeVariationsSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Horizontal Spacing */}
            <section id="horizontal-spacing" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Horizontal Spacing</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Set the orientation to "horizontal" to create spacing between elements in a row layout. 
                This is useful for navigation bars, button groups, and inline content.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Button Group Example</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    {render(horizontalSpacerSpec)}
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                      View JSON Specification
                    </summary>
                    <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                      {JSON.stringify(horizontalSpacerSpec, null, 2)}
                    </pre>
                  </details>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Horizontal Size Comparison</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                    {render(horizontalSizesSpec)}
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                      View JSON Specification
                    </summary>
                    <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                      {JSON.stringify(horizontalSizesSpec, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </section>

            {/* Form Layouts */}
            <section id="form-layouts" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Form Layouts</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Spacer is essential for creating well-structured forms with proper spacing between labels, inputs, and actions.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(formLayoutSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(formLayoutSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Card Layouts */}
            <section id="card-layouts" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Card Layouts</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Use consistent spacing within cards to create professional, readable layouts.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(cardLayoutSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(cardLayoutSpec, null, 2)}
                </pre>
              </details>
            </section>

            {/* Navigation */}
            <section id="navigation" className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Navigation</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create balanced navigation layouts with proper spacing between brand, menu items, and action buttons.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(navigationBarSpec)}
              </div>
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(navigationBarSpec, null, 2)}
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
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">size</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                          "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
                        </code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">"md"</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Controls the amount of space. Ranges from 0.25rem (xs) to 16rem (9xl).
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">orientation</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">"horizontal" | "vertical"</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">"vertical"</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Direction of spacing. Vertical creates height, horizontal creates width.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">showGuide</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">boolean</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">false</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Shows visual guide with dashed border in development mode only.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">className</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">string</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Additional CSS classes to apply to the spacer element.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-mono text-sm">style</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">CSSProperties</code>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">-</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                        Inline styles to apply to the spacer element.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Size Reference</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><code>xs</code>: 0.25rem (4px)</div>
                  <div><code>sm</code>: 0.5rem (8px)</div>
                  <div><code>md</code>: 1rem (16px)</div>
                  <div><code>lg</code>: 1.5rem (24px)</div>
                  <div><code>xl</code>: 2rem (32px)</div>
                  <div><code>2xl</code>: 3rem (48px)</div>
                  <div><code>3xl</code>: 4rem (64px)</div>
                  <div><code>4xl</code>: 6rem (96px)</div>
                  <div><code>5xl</code>: 8rem (128px)</div>
                </div>
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