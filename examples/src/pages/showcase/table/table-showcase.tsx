import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function TableShowcase() {
  usePageMetadata({
    title: "Table Component",
    description:
      "A comprehensive showcase of the React Jedi Table component with various configurations, styling options, and content types.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-table", label: "Basic Table" },
    { id: "with-header", label: "Table with Header" },
    { id: "with-footer", label: "Table with Footer" },
    { id: "alignment", label: "Cell Alignment" },
    { id: "with-components", label: "Tables with Components" },
    { id: "row-states", label: "Row States" },
    { id: "complex-content", label: "Complex Content" },
    { id: "responsive", label: "Responsive Tables" },
    { id: "variants", label: "Table Variants" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic table specification
  const basicTableSpec: UISpecification = {
    type: "Table",
    body: {
      rows: [
        {
          cells: [
            { content: "Apple" },
            { content: "$2.50" },
            { content: "In Stock" },
          ],
        },
        {
          cells: [
            { content: "Banana" },
            { content: "$1.20" },
            { content: "In Stock" },
          ],
        },
        {
          cells: [
            { content: "Orange" },
            { content: "$3.00" },
            { content: "Out of Stock" },
          ],
        },
      ],
    },
  };

  // Table with header specification
  const headerTableSpec: UISpecification = {
    type: "Table",
    head: {
      rows: [
        {
          cells: [
            { content: "Product", align: "left" },
            { content: "Price", align: "center" },
            { content: "Status", align: "right" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            { content: "MacBook Pro" },
            { content: "$1,999.00", align: "center" },
            { content: "Available", align: "right" },
          ],
        },
        {
          cells: [
            { content: "iPhone 15" },
            { content: "$999.00", align: "center" },
            { content: "Pre-order", align: "right" },
          ],
        },
        {
          cells: [
            { content: "Apple Watch" },
            { content: "$399.00", align: "center" },
            { content: "Available", align: "right" },
          ],
        },
      ],
    },
  };

  // Table with footer specification
  const footerTableSpec: UISpecification = {
    type: "Table",
    caption: "Quarterly Sales Report",
    head: {
      rows: [
        {
          cells: [
            { content: "Quarter" },
            { content: "Revenue", align: "right" },
            { content: "Growth", align: "right" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            { content: "Q1 2024" },
            { content: "$125,000", align: "right" },
            { content: "+12%", align: "right" },
          ],
        },
        {
          cells: [
            { content: "Q2 2024" },
            { content: "$142,000", align: "right" },
            { content: "+18%", align: "right" },
          ],
        },
        {
          cells: [
            { content: "Q3 2024" },
            { content: "$156,000", align: "right" },
            { content: "+22%", align: "right" },
          ],
        },
      ],
    },
    footer: {
      rows: [
        {
          cells: [
            { content: "Total", className: "font-semibold" },
            { content: "$423,000", align: "right", className: "font-semibold" },
            { content: "+17%", align: "right", className: "font-semibold" },
          ],
        },
      ],
    },
  };

  // Cell alignment examples
  const alignmentTableSpec: UISpecification = {
    type: "Table",
    head: {
      rows: [
        {
          cells: [
            { content: "Left Aligned", align: "left" },
            { content: "Center Aligned", align: "center" },
            { content: "Right Aligned", align: "right" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            { content: "Default alignment", align: "left" },
            { content: "Centered text", align: "center" },
            { content: "Right aligned", align: "right" },
          ],
        },
        {
          cells: [
            { content: "Long text that demonstrates left alignment behavior", align: "left" },
            { content: "Short", align: "center" },
            { content: "123.45", align: "right" },
          ],
        },
      ],
    },
  };

  // Table with components
  const componentsTableSpec: UISpecification = {
    type: "Table",
    head: {
      rows: [
        {
          cells: [
            { content: "User" },
            { content: "Role" },
            { content: "Status" },
            { content: "Actions" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            { content: "John Doe" },
            {
              content: {
                type: "Badge",
                variant: "secondary",
                children: "Admin",
              },
            },
            {
              content: {
                type: "Badge",
                variant: "default",
                children: "Active",
                className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
              },
            },
            {
              content: {
                type: "Group",
                spacing: "2",
                children: [
                  {
                    type: "Button",
                    size: "sm",
                    variant: "outline",
                    children: "Edit",
                  },
                  {
                    type: "Button",
                    size: "sm",
                    variant: "destructive",
                    children: "Delete",
                  },
                ],
              },
            },
          ],
        },
        {
          cells: [
            { content: "Jane Smith" },
            {
              content: {
                type: "Badge",
                variant: "outline",
                children: "Editor",
              },
            },
            {
              content: {
                type: "Badge",
                variant: "default",
                children: "Active",
                className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
              },
            },
            {
              content: {
                type: "Group",
                spacing: "2",
                children: [
                  {
                    type: "Button",
                    size: "sm",
                    variant: "outline",
                    children: "Edit",
                  },
                  {
                    type: "Button",
                    size: "sm",
                    variant: "destructive",
                    children: "Delete",
                  },
                ],
              },
            },
          ],
        },
        {
          cells: [
            { content: "Bob Wilson" },
            {
              content: {
                type: "Badge",
                variant: "outline",
                children: "Viewer",
              },
            },
            {
              content: {
                type: "Badge",
                variant: "secondary",
                children: "Inactive",
                className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
              },
            },
            {
              content: {
                type: "Group",
                spacing: "2",
                children: [
                  {
                    type: "Button",
                    size: "sm",
                    variant: "outline",
                    children: "Edit",
                  },
                  {
                    type: "Button",
                    size: "sm",
                    variant: "destructive",
                    children: "Delete",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  };

  // Row states table
  const rowStatesSpec: UISpecification = {
    type: "Table",
    head: {
      rows: [
        {
          cells: [
            { content: "ID" },
            { content: "Name" },
            { content: "Email" },
            { content: "Selected" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            { content: "1" },
            { content: "Alice Johnson" },
            { content: "alice@example.com" },
            { content: "No" },
          ],
        },
        {
          selected: true,
          cells: [
            { content: "2" },
            { content: "Bob Smith" },
            { content: "bob@example.com" },
            { content: "Yes" },
          ],
        },
        {
          cells: [
            { content: "3" },
            { content: "Carol Davis" },
            { content: "carol@example.com" },
            { content: "No" },
          ],
        },
        {
          selected: true,
          cells: [
            { content: "4" },
            { content: "David Wilson" },
            { content: "david@example.com" },
            { content: "Yes" },
          ],
        },
      ],
    },
  };

  // Complex content table
  const complexContentSpec: UISpecification = {
    type: "Table",
    head: {
      rows: [
        {
          cells: [
            { content: "Product" },
            { content: "Details" },
            { content: "Metrics" },
          ],
        },
      ],
    },
    body: {
      rows: [
        {
          cells: [
            {
              content: {
                type: "Flex",
                align: "center",
                gap: "3",
                children: [
                  {
                    type: "Box",
                    className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center",
                    children: {
                      type: "Text",
                      className: "text-2xl",
                      children: "📱",
                    },
                  },
                  {
                    type: "Box",
                    children: [
                      {
                        type: "Text",
                        className: "font-semibold",
                        children: "Smartphone Pro",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Latest model",
                      },
                    ],
                  },
                ],
              },
            },
            {
              content: {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Group",
                    spacing: "2",
                    children: [
                      {
                        type: "Badge",
                        variant: "secondary",
                        children: "128GB",
                      },
                      {
                        type: "Badge",
                        variant: "outline",
                        children: "5G",
                      },
                    ],
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "6.1\" display, A17 chip",
                  },
                ],
              },
            },
            {
              content: {
                type: "Stack",
                spacing: "1",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl font-bold",
                    children: "$999",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-green-600 dark:text-green-400",
                    children: "In Stock",
                  },
                  {
                    type: "Progress",
                    value: 75,
                    className: "w-20",
                  },
                ],
              },
            },
          ],
        },
        {
          cells: [
            {
              content: {
                type: "Flex",
                align: "center",
                gap: "3",
                children: [
                  {
                    type: "Box",
                    className: "w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center",
                    children: {
                      type: "Text",
                      className: "text-2xl",
                      children: "💻",
                    },
                  },
                  {
                    type: "Box",
                    children: [
                      {
                        type: "Text",
                        className: "font-semibold",
                        children: "Laptop Ultra",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Professional grade",
                      },
                    ],
                  },
                ],
              },
            },
            {
              content: {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Group",
                    spacing: "2",
                    children: [
                      {
                        type: "Badge",
                        variant: "secondary",
                        children: "16GB RAM",
                      },
                      {
                        type: "Badge",
                        variant: "outline",
                        children: "M3 Chip",
                      },
                    ],
                  },
                  {
                    type: "Text",
                    className: "text-sm",
                    children: "14\" Retina display",
                  },
                ],
              },
            },
            {
              content: {
                type: "Stack",
                spacing: "1",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl font-bold",
                    children: "$1,999",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-yellow-600 dark:text-yellow-400",
                    children: "Low Stock",
                  },
                  {
                    type: "Progress",
                    value: 25,
                    className: "w-20",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  };

  // Responsive table example
  const responsiveTableSpec: UISpecification = {
    type: "Box",
    className: "w-full max-w-2xl",
    children: {
      type: "Table",
      head: {
        rows: [
          {
            cells: [
              { content: "Feature" },
              { content: "Basic", align: "center" },
              { content: "Pro", align: "center" },
              { content: "Enterprise", align: "center" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              { content: "Storage" },
              { content: "10GB", align: "center" },
              { content: "100GB", align: "center" },
              { content: "Unlimited", align: "center" },
            ],
          },
          {
            cells: [
              { content: "Users" },
              { content: "1", align: "center" },
              { content: "10", align: "center" },
              { content: "Unlimited", align: "center" },
            ],
          },
          {
            cells: [
              { content: "Support" },
              { content: "Email", align: "center" },
              { content: "Priority", align: "center" },
              { content: "24/7 Phone", align: "center" },
            ],
          },
        ],
      },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Table Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible table component that supports headers, footers, cell alignment, and complex content including nested components. Perfect for displaying structured data with rich formatting.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Table component provides a complete solution for displaying tabular data in React Jedi. It supports a wide range of content types, from simple text to complex nested components, making it perfect for everything from basic data tables to rich data dashboards.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple style variants (default, striped, bordered, minimal, compact, modern)</li>
                <li>Support for headers, body, and footer sections</li>
                <li>Flexible cell content (text, components, or React nodes)</li>
                <li>Cell alignment options (left, center, right)</li>
                <li>Row selection states</li>
                <li>Column spanning capabilities</li>
                <li>Responsive design with horizontal scrolling</li>
                <li>Custom styling with className support</li>
                <li>Optional table captions for accessibility</li>
                <li>Configurable hover effects</li>
                <li>Smooth transitions and animations</li>
              </ul>
            </div>
          </section>

          {/* Basic Table Section */}
          <section id="basic-table" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Table</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple table with just a body section containing string content.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Table with Header Section */}
          <section id="with-header" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Table with Header</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add a header section to provide column labels and structure.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(headerTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(headerTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Table with Footer Section */}
          <section id="with-footer" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Table with Footer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Include a footer section for totals, summaries, or additional information. This example also includes a caption.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(footerTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(footerTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Cell Alignment Section */}
          <section id="alignment" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Cell Alignment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control text alignment within cells using the align property.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(alignmentTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Tables with Components Section */}
          <section id="with-components" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Tables with Components</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Table cells can contain any React Jedi component, allowing for rich interactive content.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(componentsTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(componentsTableSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Row States Section */}
          <section id="row-states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Row States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Rows can be marked as selected to indicate user selection or highlight important data.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(rowStatesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(rowStatesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Complex Content Section */}
          <section id="complex-content" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complex Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Demonstrate advanced usage with complex nested components in table cells.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(complexContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(complexContentSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Responsive Tables Section */}
          <section id="responsive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Tables</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tables automatically handle overflow with horizontal scrolling on smaller screens.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(responsiveTableSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(responsiveTableSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Table&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">caption</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Optional table caption for accessibility</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">head</td>
                    <td className="py-3 px-4 font-mono">TableHeadSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Optional header section with rows</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">body</td>
                    <td className="py-3 px-4 font-mono">TableBodySpec</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Table body containing data rows</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">footer</td>
                    <td className="py-3 px-4 font-mono">TableFooterSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Optional footer section with summary rows</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">"default" | "striped" | "bordered" | "minimal" | "compact" | "modern"</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Visual style variant of the table</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">hoverable</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether to show hover effects on rows</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-4">Row Properties</h3>
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
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">cells</td>
                    <td className="py-3 px-4 font-mono">TableCellSpec[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of cell specifications</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">selected</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Mark row as selected</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes for the row</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-4">Cell Properties</h3>
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
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content</td>
                    <td className="py-3 px-4 font-mono">string | ComponentSpec | ReactNode</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Cell content (text, component, or React node)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                    <td className="py-3 px-4 font-mono">&quot;left&quot; | &quot;center&quot; | &quot;right&quot;</td>
                    <td className="py-3 px-4">&quot;left&quot;</td>
                    <td className="py-3 px-4">Text alignment within the cell</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">colSpan</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Number of columns to span</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes for the cell</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Table Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Table Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Table component now supports multiple visual variants to match different design needs. Each variant offers a unique style while maintaining full functionality.
            </p>

            {/* Default Variant */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Default Variant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Clean standard table with subtle hover effects and modern styling.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "default",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Product" },
                        { content: "Category" },
                        { content: "Price", align: "right" },
                        { content: "Status" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      {
                        cells: [
                          { content: "MacBook Pro" },
                          { content: "Electronics" },
                          { content: "$2,399", align: "right" },
                          { content: { type: "Badge", variant: "default", children: "In Stock" } }
                        ]
                      },
                      {
                        cells: [
                          { content: "iPhone 15" },
                          { content: "Electronics" },
                          { content: "$999", align: "right" },
                          { content: { type: "Badge", variant: "secondary", children: "Low Stock" } }
                        ]
                      }
                    ]
                  }
                })}
              </div>
            </div>

            {/* Striped Variant */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Striped Variant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Alternating row colors for better readability with large datasets.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "striped",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Employee" },
                        { content: "Department" },
                        { content: "Role" },
                        { content: "Salary", align: "right" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      {
                        cells: [
                          { content: "Sarah Anderson" },
                          { content: "Engineering" },
                          { content: "Senior Developer" },
                          { content: "$125,000", align: "right" }
                        ]
                      },
                      {
                        cells: [
                          { content: "Michael Chen" },
                          { content: "Product" },
                          { content: "Product Manager" },
                          { content: "$115,000", align: "right" }
                        ]
                      },
                      {
                        cells: [
                          { content: "Emma Wilson" },
                          { content: "Design" },
                          { content: "UX Designer" },
                          { content: "$95,000", align: "right" }
                        ]
                      },
                      {
                        cells: [
                          { content: "James Smith" },
                          { content: "Marketing" },
                          { content: "Marketing Lead" },
                          { content: "$105,000", align: "right" }
                        ]
                      }
                    ]
                  }
                })}
              </div>
            </div>

            {/* Bordered Variant */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Bordered Variant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Full borders around all cells for clear data separation.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "bordered",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Feature" },
                        { content: "Free", align: "center" },
                        { content: "Pro", align: "center" },
                        { content: "Enterprise", align: "center" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      {
                        cells: [
                          { content: "Users" },
                          { content: "5", align: "center" },
                          { content: "Unlimited", align: "center" },
                          { content: "Unlimited", align: "center" }
                        ]
                      },
                      {
                        cells: [
                          { content: "Storage" },
                          { content: "10GB", align: "center" },
                          { content: "100GB", align: "center" },
                          { content: "1TB", align: "center" }
                        ]
                      },
                      {
                        cells: [
                          { content: "Support" },
                          { content: "Community", align: "center" },
                          { content: "Priority", align: "center" },
                          { content: "24/7 Phone", align: "center" }
                        ]
                      }
                    ]
                  }
                })}
              </div>
            </div>

            {/* Minimal Variant */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Minimal Variant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ultra-clean design with minimal borders and subtle styling.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "minimal",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Task" },
                        { content: "Assignee" },
                        { content: "Priority" },
                        { content: "Due Date" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      {
                        cells: [
                          { content: "Update documentation" },
                          { content: "John Doe" },
                          { content: { type: "Badge", variant: "secondary", children: "Medium" } },
                          { content: "Dec 15, 2024" }
                        ]
                      },
                      {
                        cells: [
                          { content: "Fix login bug" },
                          { content: "Jane Smith" },
                          { content: { type: "Badge", variant: "destructive", children: "High" } },
                          { content: "Dec 12, 2024" }
                        ]
                      },
                      {
                        cells: [
                          { content: "Design new landing" },
                          { content: "Bob Wilson" },
                          { content: { type: "Badge", variant: "outline", children: "Low" } },
                          { content: "Dec 20, 2024" }
                        ]
                      }
                    ]
                  }
                })}
              </div>
            </div>

            {/* Compact Variant */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Compact Variant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Reduced padding for dense data display, perfect for dashboards and metrics.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "compact",
                  caption: "Server metrics for the last hour",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Server" },
                        { content: "CPU %", align: "center" },
                        { content: "Memory %", align: "center" },
                        { content: "Status" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      {
                        cells: [
                          { content: "web-01", className: "font-mono text-xs" },
                          { content: "45%", align: "center" },
                          { content: "62%", align: "center" },
                          { content: { type: "Badge", variant: "default", className: "h-5 text-xs", children: "Healthy" } }
                        ]
                      },
                      {
                        cells: [
                          { content: "web-02", className: "font-mono text-xs" },
                          { content: "89%", align: "center" },
                          { content: "91%", align: "center" },
                          { content: { type: "Badge", variant: "destructive", className: "h-5 text-xs", children: "Critical" } }
                        ]
                      },
                      {
                        cells: [
                          { content: "db-01", className: "font-mono text-xs" },
                          { content: "23%", align: "center" },
                          { content: "45%", align: "center" },
                          { content: { type: "Badge", variant: "default", className: "h-5 text-xs", children: "Healthy" } }
                        ]
                      },
                      {
                        cells: [
                          { content: "cache-01", className: "font-mono text-xs" },
                          { content: "12%", align: "center" },
                          { content: "28%", align: "center" },
                          { content: { type: "Badge", variant: "default", className: "h-5 text-xs", children: "Healthy" } }
                        ]
                      }
                    ]
                  }
                })}
              </div>
            </div>

            {/* Modern Variant */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Modern Variant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sleek design with shadows, gradients, and enhanced hover effects for a premium look.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "modern",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Customer" },
                        { content: "Order Date" },
                        { content: "Total", align: "right" },
                        { content: "Actions" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      {
                        cells: [
                          { 
                            content: {
                              type: "Box",
                              children: [
                                { type: "Text", className: "font-medium", children: "Acme Corporation" },
                                { type: "Text", className: "text-sm text-muted-foreground", children: "contact@acme.com" }
                              ]
                            }
                          },
                          { content: "Dec 10, 2024" },
                          { content: "$1,249.00", align: "right", className: "font-medium" },
                          { 
                            content: {
                              type: "Button",
                              variant: "ghost",
                              size: "sm",
                              children: "View Details"
                            }
                          }
                        ]
                      },
                      {
                        cells: [
                          { 
                            content: {
                              type: "Box",
                              children: [
                                { type: "Text", className: "font-medium", children: "Globex Industries" },
                                { type: "Text", className: "text-sm text-muted-foreground", children: "info@globex.com" }
                              ]
                            }
                          },
                          { content: "Dec 09, 2024" },
                          { content: "$2,859.00", align: "right", className: "font-medium" },
                          { 
                            content: {
                              type: "Button",
                              variant: "ghost",
                              size: "sm",
                              children: "View Details"
                            }
                          }
                        ]
                      },
                      {
                        cells: [
                          { 
                            content: {
                              type: "Box",
                              children: [
                                { type: "Text", className: "font-medium", children: "Soylent Corp" },
                                { type: "Text", className: "text-sm text-muted-foreground", children: "hello@soylent.com" }
                              ]
                            }
                          },
                          { content: "Dec 08, 2024" },
                          { content: "$649.00", align: "right", className: "font-medium" },
                          { 
                            content: {
                              type: "Button",
                              variant: "ghost",
                              size: "sm",
                              children: "View Details"
                            }
                          }
                        ]
                      }
                    ]
                  }
                })}
              </div>
            </div>

            {/* Hoverable Property */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-3">Hover Effects Control</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You can disable hover effects by setting <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">hoverable: false</code>.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render({
                  type: "Table",
                  variant: "default",
                  hoverable: false,
                  caption: "Table without hover effects",
                  head: {
                    rows: [{
                      cells: [
                        { content: "Feature" },
                        { content: "Enabled" }
                      ]
                    }]
                  },
                  body: {
                    rows: [
                      { cells: [{ content: "Hover Effects" }, { content: "No" }] },
                      { cells: [{ content: "Click Selection" }, { content: "Yes" }] },
                      { cells: [{ content: "Keyboard Navigation" }, { content: "Yes" }] }
                    ]
                  }
                })}
              </div>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing table usage in different contexts.
            </p>
            
            <div className="space-y-8">
              {/* Dashboard Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Dashboard Metrics Table</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Card",
                    className: "w-full",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          { type: "CardTitle", children: "Performance Metrics" },
                          { type: "CardDescription", children: "Key performance indicators for the current quarter" },
                        ],
                      },
                      {
                        type: "CardContent",
                        children: {
                          type: "Table",
                          head: {
                            rows: [
                              {
                                cells: [
                                  { content: "Metric" },
                                  { content: "Current", align: "center" },
                                  { content: "Target", align: "center" },
                                  { content: "Status", align: "center" },
                                ],
                              },
                            ],
                          },
                          body: {
                            rows: [
                              {
                                cells: [
                                  { content: "Revenue" },
                                  { content: "$142,000", align: "center" },
                                  { content: "$150,000", align: "center" },
                                  {
                                    content: {
                                      type: "Badge",
                                      variant: "secondary",
                                      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
                                      children: "94.7%",
                                    },
                                    align: "center",
                                  },
                                ],
                              },
                              {
                                cells: [
                                  { content: "New Customers" },
                                  { content: "1,247", align: "center" },
                                  { content: "1,200", align: "center" },
                                  {
                                    content: {
                                      type: "Badge",
                                      variant: "default",
                                      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
                                      children: "103.9%",
                                    },
                                    align: "center",
                                  },
                                ],
                              },
                              {
                                cells: [
                                  { content: "Satisfaction" },
                                  { content: "4.2/5", align: "center" },
                                  { content: "4.5/5", align: "center" },
                                  {
                                    content: {
                                      type: "Badge",
                                      variant: "destructive",
                                      children: "93.3%",
                                    },
                                    align: "center",
                                  },
                                ],
                              },
                            ],
                          },
                        },
                      },
                    ],
                  })}
                </div>
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