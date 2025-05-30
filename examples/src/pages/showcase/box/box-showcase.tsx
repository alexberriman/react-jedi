import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function BoxShowcase() {
  usePageMetadata({
    title: "Box Component",
    description:
      "A comprehensive showcase of the React Jedi Box component - a primitive building block for layouts with extensive styling options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "display-modes", label: "Display Modes" },
    { id: "spacing", label: "Spacing & Padding" },
    { id: "dimensions", label: "Width & Height" },
    { id: "backgrounds", label: "Backgrounds & Colors" },
    { id: "borders", label: "Borders & Shadows" },
    { id: "flexbox", label: "Flexbox Properties" },
    { id: "effects", label: "Visual Effects" },
    { id: "positioning", label: "Positioning" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic usage example
  const basicUsageSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: "Simple Box with no styling",
      },
      {
        type: "Box",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        children: "Box with padding, background, and rounded corners",
      },
      {
        type: "Box",
        padding: "lg",
        backgroundColor: "card",
        borderWidth: "thin",
        borderColor: "default",
        rounded: "lg",
        shadow: "md",
        children: "Card-like Box with border and shadow",
      },
    ],
  };

  // Display modes examples
  const displayModesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        display: "flex",
        gap: "sm",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        children: [
          { type: "Box", padding: "sm", backgroundColor: "primary", textColor: "primary", rounded: "sm", children: "Flex 1" },
          { type: "Box", padding: "sm", backgroundColor: "secondary", textColor: "secondary", rounded: "sm", children: "Flex 2" },
          { type: "Box", padding: "sm", backgroundColor: "accent", textColor: "accent", rounded: "sm", children: "Flex 3" },
        ],
      },
      {
        type: "Box",
        display: "grid",
        className: "grid-cols-3",
        gap: "sm",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        children: [
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Grid 1" },
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Grid 2" },
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Grid 3" },
        ],
      },
    ],
  };

  // Spacing and padding examples
  const spacingSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Box", padding: "xs", backgroundColor: "muted", rounded: "sm", children: "xs padding" },
          { type: "Box", padding: "sm", backgroundColor: "muted", rounded: "sm", children: "sm padding" },
          { type: "Box", padding: "md", backgroundColor: "muted", rounded: "sm", children: "md padding" },
          { type: "Box", padding: "lg", backgroundColor: "muted", rounded: "sm", children: "lg padding" },
          { type: "Box", padding: "xl", backgroundColor: "muted", rounded: "sm", children: "xl padding" },
        ],
      },
      {
        type: "Box",
        backgroundColor: "muted",
        padding: "md",
        rounded: "md",
        children: {
          type: "Stack",
          spacing: "2",
          children: [
            { type: "Box", margin: "sm", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Margin sm" },
            { type: "Box", margin: "md", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Margin md" },
            { type: "Box", margin: "auto", padding: "sm", backgroundColor: "card", rounded: "sm", className: "w-fit", children: "Margin auto (centered)" },
          ],
        },
      },
    ],
  };

  // Width and height examples
  const dimensionsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        children: {
          type: "Stack",
          spacing: "2",
          children: [
            { type: "Box", width: "half", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Width: half" },
            { type: "Box", width: "third", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Width: third" },
            { type: "Box", width: "quarter", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Width: quarter" },
            { type: "Box", width: "fit", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Width: fit-content" },
          ],
        },
      },
      {
        type: "Box",
        height: "screen",
        className: "max-h-64",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        overflow: "y-auto",
        children: {
          type: "Stack",
          spacing: "2",
          children: Array.from({ length: 10 }).map((_, i) => ({
            type: "Box",
            padding: "sm",
            backgroundColor: "card",
            rounded: "sm",
            children: `Scrollable content ${i + 1}`,
          })),
        },
      },
    ],
  };

  // Background colors and text colors
  const colorsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Grid",
        columns: { base: 2, md: 3 },
        gap: "4",
        children: [
          { type: "Box", padding: "md", backgroundColor: "primary", textColor: "primary", rounded: "md", children: "Primary" },
          { type: "Box", padding: "md", backgroundColor: "secondary", textColor: "secondary", rounded: "md", children: "Secondary" },
          { type: "Box", padding: "md", backgroundColor: "accent", textColor: "accent", rounded: "md", children: "Accent" },
          { type: "Box", padding: "md", backgroundColor: "muted", textColor: "muted", rounded: "md", children: "Muted" },
          { type: "Box", padding: "md", backgroundColor: "card", textColor: "card", rounded: "md", children: "Card" },
          { type: "Box", padding: "md", backgroundColor: "destructive", textColor: "destructive", rounded: "md", children: "Destructive" },
        ],
      },
    ],
  };

  // Borders and shadows
  const bordersSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Box", padding: "md", borderWidth: "thin", borderColor: "default", rounded: "md", children: "Thin border" },
          { type: "Box", padding: "md", borderWidth: "thick", borderColor: "primary", rounded: "md", children: "Thick border" },
          { type: "Box", padding: "md", borderWidth: "thicker", borderColor: "secondary", rounded: "md", children: "Thicker border" },
        ],
      },
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Box", padding: "md", backgroundColor: "card", shadow: "sm", rounded: "md", children: "Small shadow" },
          { type: "Box", padding: "md", backgroundColor: "card", shadow: "md", rounded: "md", children: "Medium shadow" },
          { type: "Box", padding: "md", backgroundColor: "card", shadow: "lg", rounded: "md", children: "Large shadow" },
          { type: "Box", padding: "md", backgroundColor: "card", shadow: "xl", rounded: "md", children: "XL shadow" },
        ],
      },
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Box", padding: "md", backgroundColor: "muted", rounded: "xs", children: "Rounded xs" },
          { type: "Box", padding: "md", backgroundColor: "muted", rounded: "sm", children: "Rounded sm" },
          { type: "Box", padding: "md", backgroundColor: "muted", rounded: "md", children: "Rounded md" },
          { type: "Box", padding: "md", backgroundColor: "muted", rounded: "lg", children: "Rounded lg" },
          { type: "Box", padding: "md", backgroundColor: "muted", rounded: "full", children: "Rounded full" },
        ],
      },
    ],
  };

  // Flexbox properties
  const flexboxSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        children: [
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Start" },
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Center" },
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "End" },
        ],
      },
      {
        type: "Box",
        display: "flex",
        flexDirection: "col",
        alignItems: "center",
        gap: "md",
        padding: "md",
        backgroundColor: "muted",
        rounded: "md",
        children: [
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Column 1" },
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Column 2" },
          { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Column 3" },
        ],
      },
    ],
  };

  // Visual effects
  const effectsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Text",
        children: "Glassmorphism Effects",
        className: "font-semibold",
      },
      {
        type: "Box",
        className: "relative h-48 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg overflow-hidden",
        children: {
          type: "Group",
          spacing: "4",
          className: "absolute inset-0 flex items-center justify-center",
          children: [
            { type: "Box", padding: "md", glassmorphism: "light", rounded: "md", children: "Light Glass" },
            { type: "Box", padding: "md", glassmorphism: "medium", rounded: "md", children: "Medium Glass" },
            { type: "Box", padding: "md", glassmorphism: "strong", rounded: "md", children: "Strong Glass" },
          ],
        },
      },
      {
        type: "Text",
        children: "Neumorphism Effects",
        className: "font-semibold mt-4",
      },
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Box", padding: "md", neumorphism: "light", rounded: "md", children: "Light Neumorphism" },
          { type: "Box", padding: "md", neumorphism: "medium", rounded: "md", children: "Medium Neumorphism" },
          { type: "Box", padding: "md", neumorphism: "strong", rounded: "md", children: "Strong Neumorphism" },
        ],
      },
      {
        type: "Text",
        children: "Blur Effects",
        className: "font-semibold mt-4",
      },
      {
        type: "Group",
        spacing: "4",
        children: [
          { type: "Box", padding: "md", backgroundColor: "muted", blur: "sm", rounded: "md", children: "Small blur" },
          { type: "Box", padding: "md", backgroundColor: "muted", blur: "md", rounded: "md", children: "Medium blur" },
          { type: "Box", padding: "md", backgroundColor: "muted", blur: "lg", rounded: "md", children: "Large blur" },
        ],
      },
    ],
  };

  // Positioning examples
  const positioningSpec: UISpecification = {
    type: "Box",
    position: "relative",
    height: "fit",
    className: "min-h-[200px]",
    padding: "md",
    backgroundColor: "muted",
    rounded: "md",
    children: [
      {
        type: "Box",
        padding: "sm",
        backgroundColor: "card",
        rounded: "sm",
        children: "Static (default)",
      },
      {
        type: "Box",
        position: "absolute",
        className: "top-4 right-4",
        padding: "sm",
        backgroundColor: "primary",
        textColor: "primary",
        rounded: "sm",
        children: "Absolute top-right",
      },
      {
        type: "Box",
        position: "absolute",
        className: "bottom-4 left-4",
        padding: "sm",
        backgroundColor: "secondary",
        textColor: "secondary",
        rounded: "sm",
        children: "Absolute bottom-left",
      },
      {
        type: "Box",
        position: "relative",
        className: "mt-16",
        padding: "sm",
        backgroundColor: "accent",
        textColor: "accent",
        rounded: "sm",
        zIndex: 10,
        children: "Relative with z-index",
      },
    ],
  };

  // Complete card example
  const cardExampleSpec: UISpecification = {
    type: "Box",
    width: "full",
    className: "max-w-md",
    backgroundColor: "card",
    borderWidth: "thin",
    borderColor: "default",
    rounded: "lg",
    shadow: "lg",
    overflow: "hidden",
    children: [
      {
        type: "Box",
        className: "h-48 bg-gradient-to-r from-blue-500 to-purple-600",
        children: {
          type: "Box",
          display: "flex",
          alignItems: "end",
          height: "full",
          padding: "lg",
          children: {
            type: "Text",
            size: "large",
            weight: "bold",
            className: "text-white",
            children: "Featured Content",
          },
        },
      },
      {
        type: "Box",
        padding: "lg",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Box",
              children: [
                { type: "Heading", level: "h3", children: "Box Component Card" },
                { type: "Text", variant: "muted", children: "Built entirely with Box components" },
              ],
            },
            {
              type: "Box",
              children: {
                type: "Text",
                children: "This card demonstrates how the Box component can be used as a building block to create complex UI elements. It combines multiple Box properties including padding, backgrounds, borders, shadows, and flexbox layout.",
              },
            },
            {
              type: "Box",
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
              children: [
                {
                  type: "Group",
                  spacing: "2",
                  children: [
                    { type: "Button", size: "sm", variant: "primary", children: "Learn More" },
                    { type: "Button", size: "sm", variant: "outline", children: "Share" },
                  ],
                },
                {
                  type: "Text",
                  size: "small",
                  variant: "muted",
                  children: "5 min read",
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Dashboard layout example
  const dashboardSpec: UISpecification = {
    type: "Box",
    display: "flex",
    gap: "lg",
    className: "min-h-[400px]",
    children: [
      {
        type: "Box",
        width: "quarter",
        padding: "md",
        backgroundColor: "muted",
        rounded: "lg",
        children: {
          type: "Stack",
          spacing: "2",
          children: [
            { type: "Text", weight: "semibold", children: "Sidebar" },
            { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Menu Item 1" },
            { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Menu Item 2" },
            { type: "Box", padding: "sm", backgroundColor: "card", rounded: "sm", children: "Menu Item 3" },
          ],
        },
      },
      {
        type: "Box",
        className: "flex-1",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Box",
              padding: "lg",
              backgroundColor: "card",
              borderWidth: "thin",
              borderColor: "default",
              rounded: "lg",
              shadow: "sm",
              children: {
                type: "Stack",
                spacing: "2",
                children: [
                  { type: "Heading", level: "h3", children: "Main Content Area" },
                  { type: "Text", variant: "muted", children: "This layout demonstrates using Box components to create a dashboard-style interface." },
                ],
              },
            },
            {
              type: "Grid",
              columns: { base: 1, md: 3 },
              gap: "4",
              children: [
                {
                  type: "Box",
                  padding: "md",
                  backgroundColor: "primary",
                  textColor: "primary",
                  rounded: "md",
                  children: {
                    type: "Stack",
                    spacing: "1",
                    children: [
                      { type: "Text", size: "large", weight: "bold", children: "124" },
                      { type: "Text", size: "small", children: "Total Users" },
                    ],
                  },
                },
                {
                  type: "Box",
                  padding: "md",
                  backgroundColor: "secondary",
                  textColor: "secondary",
                  rounded: "md",
                  children: {
                    type: "Stack",
                    spacing: "1",
                    children: [
                      { type: "Text", size: "large", weight: "bold", children: "$12,543" },
                      { type: "Text", size: "small", children: "Revenue" },
                    ],
                  },
                },
                {
                  type: "Box",
                  padding: "md",
                  backgroundColor: "accent",
                  textColor: "accent",
                  rounded: "md",
                  children: {
                    type: "Stack",
                    spacing: "1",
                    children: [
                      { type: "Text", size: "large", weight: "bold", children: "89%" },
                      { type: "Text", size: "small", children: "Satisfaction" },
                    ],
                  },
                },
              ],
            },
          ],
        },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Box Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A primitive building block component that serves as the foundation for creating layouts. Box provides extensive styling options including display modes, spacing, colors, borders, shadows, and special effects.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Box component is the most fundamental layout primitive in React Jedi. It&apos;s a versatile container that can be styled in numerous ways to create everything from simple wrappers to complex card layouts.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple display modes (block, flex, grid, inline)</li>
                <li>Comprehensive spacing system (padding, margin, gap)</li>
                <li>Flexible dimensions (width, height with responsive options)</li>
                <li>Rich color system for backgrounds, text, and borders</li>
                <li>Border styles, rounded corners, and shadows</li>
                <li>Advanced effects like glassmorphism and neumorphism</li>
                <li>Positioning and z-index control</li>
                <li>Overflow and scrolling behavior</li>
                <li>Transition and animation support</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start with simple Box components and progressively add styling properties.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicUsageSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicUsageSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Display Modes Section */}
          <section id="display-modes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Display Modes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control how the Box behaves in the document flow with different display modes.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(displayModesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(displayModesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Spacing Section */}
          <section id="spacing" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Spacing & Padding</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control internal and external spacing with padding and margin properties.
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

          {/* Dimensions Section */}
          <section id="dimensions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Width & Height</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Set dimensions using fractional, fit-content, or full values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(dimensionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(dimensionsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Colors Section */}
          <section id="backgrounds" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Backgrounds & Colors</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Apply semantic color values for backgrounds and text that adapt to theme.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(colorsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(colorsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Borders Section */}
          <section id="borders" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Borders & Shadows</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add depth and definition with borders, shadows, and rounded corners.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(bordersSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(bordersSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Flexbox Section */}
          <section id="flexbox" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Flexbox Properties</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use flexbox properties to create flexible layouts with alignment control.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(flexboxSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(flexboxSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Effects Section */}
          <section id="effects" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Visual Effects</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Apply modern visual effects like glassmorphism, neumorphism, and blur.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(effectsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(effectsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Positioning Section */}
          <section id="positioning" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Positioning</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control element positioning with position types and z-index.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(positioningSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(positioningSpec, null, 2)}
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
                    <th className="text-left py-3 px-4 font-medium">Options</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                    <td className="py-3 px-4 font-mono">&quot;Box&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">display</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;flex&quot; | &quot;block&quot; | &quot;inline&quot; | &quot;grid&quot; | &quot;none&quot;</td>
                    <td className="py-3 px-4">Display type</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">position</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;static&quot; | &quot;relative&quot; | &quot;absolute&quot; | &quot;fixed&quot; | &quot;sticky&quot;</td>
                    <td className="py-3 px-4">Position type</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">padding</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot;</td>
                    <td className="py-3 px-4">Internal spacing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">margin</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;auto&quot;</td>
                    <td className="py-3 px-4">External spacing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">width</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;auto&quot; | &quot;full&quot; | &quot;screen&quot; | &quot;fit&quot; | &quot;half&quot; | &quot;third&quot; | &quot;quarter&quot;</td>
                    <td className="py-3 px-4">Width sizing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">height</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;auto&quot; | &quot;full&quot; | &quot;screen&quot; | &quot;fit&quot; | &quot;half&quot; | &quot;third&quot; | &quot;quarter&quot;</td>
                    <td className="py-3 px-4">Height sizing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">backgroundColor</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;transparent&quot; | &quot;primary&quot; | &quot;secondary&quot; | &quot;accent&quot; | &quot;muted&quot; | &quot;card&quot; | &quot;destructive&quot;</td>
                    <td className="py-3 px-4">Background color</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">textColor</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;primary&quot; | &quot;secondary&quot; | &quot;accent&quot; | &quot;muted&quot; | &quot;foreground&quot; | &quot;destructive&quot;</td>
                    <td className="py-3 px-4">Text color</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">borderWidth</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;thin&quot; | &quot;thick&quot; | &quot;thicker&quot; | &quot;thickest&quot;</td>
                    <td className="py-3 px-4">Border thickness</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">rounded</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;3xl&quot; | &quot;full&quot;</td>
                    <td className="py-3 px-4">Border radius</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">shadow</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;inner&quot;</td>
                    <td className="py-3 px-4">Box shadow</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">glassmorphism</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;light&quot; | &quot;medium&quot; | &quot;strong&quot; | &quot;dark&quot; | &quot;dark-medium&quot; | &quot;dark-strong&quot;</td>
                    <td className="py-3 px-4">Glass effect</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">neumorphism</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;none&quot; | &quot;light&quot; | &quot;medium&quot; | &quot;strong&quot; | &quot;dark&quot; | &quot;dark-medium&quot; | &quot;dark-strong&quot;</td>
                    <td className="py-3 px-4">Neumorphic effect</td>
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
              See how Box components combine to create real-world UI patterns.
            </p>
            
            <div className="space-y-8">
              {/* Card Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Feature Card</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(cardExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(cardExampleSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Dashboard Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Dashboard Layout</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(dashboardSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(dashboardSpec, null, 2)}
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