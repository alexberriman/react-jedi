import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { CodeBlock } from "../../../components/ui/code-block";

export function SimpleGridShowcase() {
  usePageMetadata({
    title: "SimpleGrid Component",
    description:
      "A comprehensive showcase of the React Jedi SimpleGrid component with responsive columns, spacing options, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "responsive-columns", label: "Responsive Columns" },
    { id: "spacing-options", label: "Spacing Options" },
    { id: "auto-fit", label: "Auto-Fit Layout" },
    { id: "content-cards", label: "Content Cards" },
    { id: "mixed-heights", label: "Mixed Heights" },
    { id: "large-grids", label: "Large Grids" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic usage specification
  const basicUsageSpec: UISpecification = {
    type: "SimpleGrid",
    columns: 3,
    spacing: "4",
    children: [
      {
        type: "Box",
        className: "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg",
        children: "Item 1",
      },
      {
        type: "Box",
        className: "bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg",
        children: "Item 2",
      },
      {
        type: "Box",
        className: "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg",
        children: "Item 3",
      },
      {
        type: "Box",
        className: "bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg",
        children: "Item 4",
      },
      {
        type: "Box",
        className: "bg-gradient-to-br from-teal-500 to-green-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg",
        children: "Item 5",
      },
      {
        type: "Box",
        className: "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-6 h-32 flex items-center justify-center font-bold text-lg shadow-lg",
        children: "Item 6",
      },
    ],
  };

  // Responsive columns specification
  const responsiveColumnsSpec: UISpecification = {
    type: "SimpleGrid",
    columns: {
      base: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
    spacing: "6",
    children: [
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "1 col",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "2 cols",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "3 cols",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "4 cols",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "5 cols",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "Responsive",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "Layout",
      },
      {
        type: "Box",
        className: "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-24 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium",
        children: "Demo",
      },
    ],
  };

  // Spacing options specification
  const spacingOptionsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-600 dark:text-gray-400 mb-3",
            children: "Small spacing (spacing: '2')",
          },
          {
            type: "SimpleGrid",
            columns: 3,
            spacing: "2",
            children: [
              {
                type: "Box",
                className: "bg-blue-200 dark:bg-blue-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "1",
              },
              {
                type: "Box",
                className: "bg-blue-200 dark:bg-blue-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "2",
              },
              {
                type: "Box",
                className: "bg-blue-200 dark:bg-blue-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "3",
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
            className: "text-sm font-medium text-gray-600 dark:text-gray-400 mb-3",
            children: "Medium spacing (spacing: '4')",
          },
          {
            type: "SimpleGrid",
            columns: 3,
            spacing: "4",
            children: [
              {
                type: "Box",
                className: "bg-green-200 dark:bg-green-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "1",
              },
              {
                type: "Box",
                className: "bg-green-200 dark:bg-green-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "2",
              },
              {
                type: "Box",
                className: "bg-green-200 dark:bg-green-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "3",
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
            className: "text-sm font-medium text-gray-600 dark:text-gray-400 mb-3",
            children: "Large spacing (spacing: '8')",
          },
          {
            type: "SimpleGrid",
            columns: 3,
            spacing: "8",
            children: [
              {
                type: "Box",
                className: "bg-purple-200 dark:bg-purple-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "1",
              },
              {
                type: "Box",
                className: "bg-purple-200 dark:bg-purple-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "2",
              },
              {
                type: "Box",
                className: "bg-purple-200 dark:bg-purple-800 rounded p-3 h-16 flex items-center justify-center text-xs font-medium",
                children: "3",
              },
            ],
          },
        ],
      },
    ],
  };

  // Auto-fit specification
  const autoFitSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: "Resize your browser to see how the grid automatically adjusts columns based on the minimum child width of 200px.",
      },
      {
        type: "SimpleGrid",
        minChildWidth: "200px",
        spacing: "4",
        children: [
          {
            type: "Box",
            className: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg p-4 h-32 flex items-center justify-center font-semibold shadow-lg",
            children: "Auto 1",
          },
          {
            type: "Box",
            className: "bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-lg p-4 h-32 flex items-center justify-center font-semibold shadow-lg",
            children: "Auto 2",
          },
          {
            type: "Box",
            className: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg p-4 h-32 flex items-center justify-center font-semibold shadow-lg",
            children: "Auto 3",
          },
          {
            type: "Box",
            className: "bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg p-4 h-32 flex items-center justify-center font-semibold shadow-lg",
            children: "Auto 4",
          },
          {
            type: "Box",
            className: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-lg p-4 h-32 flex items-center justify-center font-semibold shadow-lg",
            children: "Auto 5",
          },
          {
            type: "Box",
            className: "bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-lg p-4 h-32 flex items-center justify-center font-semibold shadow-lg",
            children: "Auto 6",
          },
        ],
      },
    ],
  };

  // Content cards specification
  const contentCardsSpec: UISpecification = {
    type: "SimpleGrid",
    columns: {
      base: 1,
      sm: 2,
      lg: 3,
    },
    spacing: "6",
    children: [
      {
        type: "Card",
        className: "hover:shadow-lg transition-shadow",
        children: [
          {
            type: "Box",
            className: "h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-t-lg",
          },
          {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h3",
                size: "lg",
                className: "mb-3",
                children: "Product Feature",
              },
              {
                type: "Text",
                className: "text-gray-600 dark:text-gray-400",
                children: "This is a feature card in a SimpleGrid layout. It demonstrates how real content looks in a responsive grid.",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "hover:shadow-lg transition-shadow",
        children: [
          {
            type: "Box",
            className: "h-40 bg-gradient-to-br from-green-400 to-blue-600 rounded-t-lg",
          },
          {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h3",
                size: "lg",
                className: "mb-3",
                children: "Service Offering",
              },
              {
                type: "Text",
                className: "text-gray-600 dark:text-gray-400",
                children: "Another card showing how SimpleGrid handles content of varying lengths and maintains consistent layouts.",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "hover:shadow-lg transition-shadow",
        children: [
          {
            type: "Box",
            className: "h-40 bg-gradient-to-br from-purple-400 to-pink-600 rounded-t-lg",
          },
          {
            type: "CardContent",
            className: "p-6",
            children: [
              {
                type: "Heading",
                level: "h3",
                size: "lg",
                className: "mb-3",
                children: "Company Benefit",
              },
              {
                type: "Text",
                className: "text-gray-600 dark:text-gray-400",
                children: "SimpleGrid ensures equal column widths and proper spacing between cards, creating professional layouts.",
              },
            ],
          },
        ],
      },
    ],
  };

  // Mixed heights specification
  const mixedHeightsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: "Notice how each row adjusts its height to accommodate the tallest item in that row.",
      },
      {
        type: "SimpleGrid",
        columns: 4,
        spacing: "4",
        children: [
          {
            type: "Box",
            className: "bg-red-500 text-white rounded p-4 h-32 flex items-center justify-center font-semibold",
            children: "Normal",
          },
          {
            type: "Box",
            className: "bg-blue-500 text-white rounded p-4 h-48 flex items-center justify-center font-semibold",
            children: "Tall",
          },
          {
            type: "Box",
            className: "bg-green-500 text-white rounded p-4 h-32 flex items-center justify-center font-semibold",
            children: "Normal",
          },
          {
            type: "Box",
            className: "bg-yellow-500 text-black rounded p-4 h-40 flex items-center justify-center font-semibold",
            children: "Medium",
          },
          {
            type: "Box",
            className: "bg-purple-500 text-white rounded p-4 h-32 flex items-center justify-center font-semibold",
            children: "Normal",
          },
          {
            type: "Box",
            className: "bg-pink-500 text-white rounded p-4 h-56 flex items-center justify-center font-semibold",
            children: "Tallest",
          },
          {
            type: "Box",
            className: "bg-orange-500 text-white rounded p-4 h-32 flex items-center justify-center font-semibold",
            children: "Normal",
          },
          {
            type: "Box",
            className: "bg-teal-500 text-white rounded p-4 h-36 flex items-center justify-center font-semibold",
            children: "Medium+",
          },
        ],
      },
    ],
  };

  // Large grid specification
  const largeGridSpec: UISpecification = {
    type: "SimpleGrid",
    columns: {
      base: 3,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 10,
    },
    spacing: "3",
    children: Array.from({ length: 30 }, (_, i) => ({
      type: "Box",
      className: "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded p-2 h-16 flex items-center justify-center text-sm font-medium",
      children: (i + 1).toString(),
    })),
  };

  // Product showcase example
  const productShowcaseSpec: UISpecification = {
    type: "SimpleGrid",
    columns: {
      base: 1,
      sm: 2,
      md: 3,
    },
    spacing: "6",
    children: [
      {
        type: "Card",
        className: "hover:shadow-xl transition-all duration-300 overflow-hidden",
        children: [
          {
            type: "Box",
            className: "relative",
            children: [
              {
                type: "Image",
                src: "https://placehold.co/400x250/EEE/31343C",
                alt: "Wireless Headphones",
                className: "w-full h-48 object-cover",
              },
              {
                type: "Badge",
                className: "absolute top-3 left-3 bg-red-500 text-white",
                children: "Sale",
              },
            ],
          },
          {
            type: "CardContent",
            className: "p-4",
            children: [
              {
                type: "Heading",
                level: "h3",
                size: "lg",
                className: "mb-2",
                children: "Wireless Headphones",
              },
              {
                type: "Text",
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: "High-quality wireless headphones with noise cancellation and premium sound quality.",
              },
              {
                type: "Flex",
                justify: "between",
                align: "center",
                children: [
                  {
                    type: "Box",
                    children: [
                      {
                        type: "Text",
                        className: "text-2xl font-bold text-green-600",
                        children: "$199",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-500 line-through",
                        children: "$299",
                      },
                    ],
                  },
                  {
                    type: "Button",
                    variant: "primary",
                    size: "sm",
                    children: "Add to Cart",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "hover:shadow-xl transition-all duration-300 overflow-hidden",
        children: [
          {
            type: "Box",
            className: "relative",
            children: [
              {
                type: "Image",
                src: "https://placehold.co/400x250/EEE/31343C",
                alt: "Smart Watch",
                className: "w-full h-48 object-cover",
              },
              {
                type: "Badge",
                className: "absolute top-3 left-3 bg-blue-500 text-white",
                children: "New",
              },
            ],
          },
          {
            type: "CardContent",
            className: "p-4",
            children: [
              {
                type: "Heading",
                level: "h3",
                size: "lg",
                className: "mb-2",
                children: "Smart Watch",
              },
              {
                type: "Text",
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: "Advanced smartwatch with health monitoring, GPS, and week-long battery life.",
              },
              {
                type: "Flex",
                justify: "between",
                align: "center",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl font-bold text-gray-900 dark:text-white",
                    children: "$399",
                  },
                  {
                    type: "Button",
                    variant: "primary",
                    size: "sm",
                    children: "Add to Cart",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "hover:shadow-xl transition-all duration-300 overflow-hidden",
        children: [
          {
            type: "Box",
            className: "relative",
            children: [
              {
                type: "Image",
                src: "https://placehold.co/400x250/EEE/31343C",
                alt: "Laptop Stand",
                className: "w-full h-48 object-cover",
              },
            ],
          },
          {
            type: "CardContent",
            className: "p-4",
            children: [
              {
                type: "Heading",
                level: "h3",
                size: "lg",
                className: "mb-2",
                children: "Laptop Stand",
              },
              {
                type: "Text",
                className: "text-gray-600 dark:text-gray-400 mb-3",
                children: "Ergonomic aluminum laptop stand with adjustable height and cooling ventilation.",
              },
              {
                type: "Flex",
                justify: "between",
                align: "center",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl font-bold text-gray-900 dark:text-white",
                    children: "$89",
                  },
                  {
                    type: "Button",
                    variant: "primary",
                    size: "sm",
                    children: "Add to Cart",
                  },
                ],
              },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SimpleGrid Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A responsive grid layout component that creates equal-width columns with flexible spacing. Perfect for creating uniform grids of content like product cards, image galleries, or feature grids.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The SimpleGrid component provides an easy way to create responsive grid layouts with equal-sized cells. Unlike the more complex Grid component, SimpleGrid focuses on simplicity and uniformity, making it ideal for displaying sets of similar content.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Equal-width grid columns with automatic sizing</li>
                <li>Responsive column configuration with breakpoint support</li>
                <li>Flexible spacing options between grid items</li>
                <li>Auto-fit layout with minimum child width option</li>
                <li>Support for mixed-height content with proper row alignment</li>
                <li>Customizable with className prop for additional styling</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The most basic usage of SimpleGrid with fixed columns and spacing.
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

          {/* Responsive Columns Section */}
          <section id="responsive-columns" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Columns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure different column counts for different screen sizes. Resize your browser to see the responsive behavior.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(responsiveColumnsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(responsiveColumnsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Spacing Options Section */}
          <section id="spacing-options" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Spacing Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the spacing between grid items using Tailwind spacing values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(spacingOptionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(spacingOptionsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Auto-Fit Section */}
          <section id="auto-fit" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Auto-Fit Layout</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use minChildWidth to create grids that automatically adjust the number of columns based on available space.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(autoFitSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(autoFitSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Content Cards Section */}
          <section id="content-cards" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Content Cards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              SimpleGrid works perfectly with cards and other content components.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(contentCardsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(contentCardsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Mixed Heights Section */}
          <section id="mixed-heights" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Mixed Heights</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              SimpleGrid handles content of different heights gracefully, with each row adjusting to its tallest item.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(mixedHeightsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(mixedHeightsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Large Grids Section */}
          <section id="large-grids" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Large Grids</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              SimpleGrid scales well for large numbers of items with responsive column configurations.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(largeGridSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
{JSON.stringify(largeGridSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;SimpleGrid&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">columns</td>
                    <td className="py-3 px-4 font-mono">number | ResponsiveValue</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Number of columns (supports responsive breakpoints)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">spacing</td>
                    <td className="py-3 px-4 font-mono">string | ResponsiveValue</td>
                    <td className="py-3 px-4">&quot;4&quot;</td>
                    <td className="py-3 px-4">Spacing between grid items (Tailwind spacing scale)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">minChildWidth</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Minimum width for grid children (enables auto-fit)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Child components to render in the grid</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">ResponsiveValue Type</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Responsive values can be specified as an object with breakpoint keys: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{`{ base?: T, sm?: T, md?: T, lg?: T, xl?: T }`}</code>
              </p>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples of SimpleGrid in action.
            </p>
            
            <div className="space-y-8">
              {/* Product Showcase Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">E-commerce Product Grid</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(productShowcaseSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
{JSON.stringify(productShowcaseSpec, null, 2)}
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