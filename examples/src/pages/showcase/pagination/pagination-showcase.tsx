import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function PaginationShowcase() {
  usePageMetadata({
    title: "Pagination Component",
    description:
      "A comprehensive showcase of the React Jedi Pagination component with all variants, states, and usage examples for navigating through pages of content.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "page-counts", label: "Different Page Counts" },
    { id: "current-page", label: "Current Page States" },
    { id: "with-ellipsis", label: "With Ellipsis" },
    { id: "navigation-controls", label: "Navigation Controls" },
    { id: "customization", label: "Customization Options" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic pagination
  const basicSpec: UISpecification = {
    type: "pagination",
    totalPages: 5,
    currentPage: 3,
    showPrevNext: true,
    showFirstLast: true,
  };

  // Small page count
  const smallPagesSpec: UISpecification = {
    type: "pagination",
    totalPages: 3,
    currentPage: 2,
    showPrevNext: true,
    showFirstLast: false,
  };

  // Large page count
  const largePagesSpec: UISpecification = {
    type: "pagination",
    totalPages: 20,
    currentPage: 10,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 1,
    boundaryCount: 1,
  };

  // First page state
  const firstPageSpec: UISpecification = {
    type: "pagination",
    totalPages: 10,
    currentPage: 1,
    showPrevNext: true,
    showFirstLast: true,
  };

  // Last page state
  const lastPageSpec: UISpecification = {
    type: "pagination",
    totalPages: 10,
    currentPage: 10,
    showPrevNext: true,
    showFirstLast: true,
  };

  // With ellipsis - beginning
  const ellipsisBeginSpec: UISpecification = {
    type: "pagination",
    totalPages: 15,
    currentPage: 3,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 1,
    boundaryCount: 1,
  };

  // With ellipsis - middle
  const ellipsisMiddleSpec: UISpecification = {
    type: "pagination",
    totalPages: 20,
    currentPage: 10,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 1,
    boundaryCount: 1,
  };

  // With ellipsis - end
  const ellipsisEndSpec: UISpecification = {
    type: "pagination",
    totalPages: 15,
    currentPage: 13,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 1,
    boundaryCount: 1,
  };

  // No navigation controls
  const noNavSpec: UISpecification = {
    type: "pagination",
    totalPages: 5,
    currentPage: 3,
    showPrevNext: false,
    showFirstLast: false,
  };

  // Custom sibling count
  const customSiblingSpec: UISpecification = {
    type: "pagination",
    totalPages: 15,
    currentPage: 8,
    showPrevNext: true,
    showFirstLast: true,
    siblingCount: 3,
    boundaryCount: 1,
  };

  // Data table example
  const dataTableExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-4xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "User Management" },
          { type: "CardDescription", children: "Manage users in your organization" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "SimpleGrid",
              columns: "1",
              spacing: "0",
              className: "border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden",
              children: [
                {
                  type: "Flex",
                  justify: "between",
                  className: "bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800",
                  children: [
                    { type: "Text", className: "font-medium", children: "Name" },
                    { type: "Text", className: "font-medium", children: "Email" },
                    { type: "Text", className: "font-medium", children: "Role" },
                    { type: "Text", className: "font-medium", children: "Status" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  className: "p-4 border-b border-gray-200 dark:border-gray-800",
                  children: [
                    { type: "Text", children: "John Doe" },
                    { type: "Text", children: "john@example.com" },
                    { type: "Text", children: "Admin" },
                    { type: "Badge", variant: "default", children: "Active" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  className: "p-4 border-b border-gray-200 dark:border-gray-800",
                  children: [
                    { type: "Text", children: "Jane Smith" },
                    { type: "Text", children: "jane@example.com" },
                    { type: "Text", children: "User" },
                    { type: "Badge", variant: "secondary", children: "Pending" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  className: "p-4 border-b border-gray-200 dark:border-gray-800",
                  children: [
                    { type: "Text", children: "Mike Johnson" },
                    { type: "Text", children: "mike@example.com" },
                    { type: "Text", children: "User" },
                    { type: "Badge", variant: "default", children: "Active" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  className: "p-4 border-b border-gray-200 dark:border-gray-800",
                  children: [
                    { type: "Text", children: "Sarah Wilson" },
                    { type: "Text", children: "sarah@example.com" },
                    { type: "Text", children: "Manager" },
                    { type: "Badge", variant: "default", children: "Active" },
                  ],
                },
                {
                  type: "Flex",
                  justify: "between",
                  className: "p-4",
                  children: [
                    { type: "Text", children: "Tom Brown" },
                    { type: "Text", children: "tom@example.com" },
                    { type: "Text", children: "User" },
                    { type: "Badge", variant: "outline", children: "Inactive" },
                  ],
                },
              ],
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
                  children: "Showing 1-5 of 247 results",
                },
                {
                  type: "pagination",
                  totalPages: 50,
                  currentPage: 1,
                  showPrevNext: true,
                  showFirstLast: false,
                  siblingCount: 1,
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Blog listing example
  const blogExampleSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    className: "w-full max-w-4xl",
    children: [
      {
        type: "Stack",
        spacing: "4",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardContent",
                className: "p-6",
                children: {
                  type: "Stack",
                  spacing: "3",
                  children: [
                    { type: "Heading", level: 3, children: "Getting Started with React Jedi" },
                    {
                      type: "Text",
                      variant: "muted",
                      children: "Learn how to build powerful UIs with our server-driven approach",
                    },
                    {
                      type: "Flex",
                      justify: "between",
                      align: "center",
                      children: [
                        { type: "Text", size: "small", variant: "muted", children: "Published 2 days ago" },
                        { type: "Button", variant: "ghost", size: "sm", children: "Read More →" },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "CardContent",
                className: "p-6",
                children: {
                  type: "Stack",
                  spacing: "3",
                  children: [
                    { type: "Heading", level: 3, children: "Advanced Component Patterns" },
                    {
                      type: "Text",
                      variant: "muted",
                      children: "Explore complex component compositions and state management",
                    },
                    {
                      type: "Flex",
                      justify: "between",
                      align: "center",
                      children: [
                        { type: "Text", size: "small", variant: "muted", children: "Published 5 days ago" },
                        { type: "Button", variant: "ghost", size: "sm", children: "Read More →" },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "CardContent",
                className: "p-6",
                children: {
                  type: "Stack",
                  spacing: "3",
                  children: [
                    { type: "Heading", level: 3, children: "Performance Optimization Tips" },
                    {
                      type: "Text",
                      variant: "muted",
                      children: "Learn how to optimize your React Jedi applications for speed",
                    },
                    {
                      type: "Flex",
                      justify: "between",
                      align: "center",
                      children: [
                        { type: "Text", size: "small", variant: "muted", children: "Published 1 week ago" },
                        { type: "Button", variant: "ghost", size: "sm", children: "Read More →" },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        type: "Center",
        children: {
          type: "pagination",
          totalPages: 12,
          currentPage: 3,
          showPrevNext: true,
          showFirstLast: true,
          siblingCount: 2,
          boundaryCount: 1,
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pagination Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible pagination component for navigating through pages of content. Supports various configurations including ellipsis, custom page ranges, and navigation controls.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Pagination component provides an accessible and intuitive way for users to navigate through multiple pages of content. It&apos;s designed to work seamlessly with large datasets while maintaining good performance and user experience.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Intelligent ellipsis placement for large page counts</li>
                <li>Configurable sibling and boundary page counts</li>
                <li>Optional first/last and previous/next navigation buttons</li>
                <li>Accessible keyboard navigation and screen reader support</li>
                <li>Responsive design that works on all screen sizes</li>
                <li>Customizable appearance and behavior</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple pagination with 5 pages, showing the current page as page 3.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Page Counts Section */}
          <section id="page-counts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Different Page Counts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Pagination adapts to different numbers of total pages automatically.
            </p>
            
            <div className="space-y-6">
              {/* Small Page Count */}
              <div>
                <h3 className="text-lg font-medium mb-3">Small Page Count (3 pages)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(smallPagesSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(smallPagesSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Large Page Count */}
              <div>
                <h3 className="text-lg font-medium mb-3">Large Page Count (20 pages)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(largePagesSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(largePagesSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>
            </div>
          </section>

          {/* Current Page States Section */}
          <section id="current-page" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Current Page States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how pagination handles edge cases like first and last pages.
            </p>
            
            <div className="space-y-6">
              {/* First Page */}
              <div>
                <h3 className="text-lg font-medium mb-3">First Page (page 1 of 10)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(firstPageSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(firstPageSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Last Page */}
              <div>
                <h3 className="text-lg font-medium mb-3">Last Page (page 10 of 10)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(lastPageSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(lastPageSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>
            </div>
          </section>

          {/* With Ellipsis Section */}
          <section id="with-ellipsis" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Ellipsis</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              When there are many pages, ellipsis (...) are used to indicate gaps in the page sequence.
            </p>
            
            <div className="space-y-6">
              {/* Ellipsis at beginning */}
              <div>
                <h3 className="text-lg font-medium mb-3">Ellipsis at Beginning (page 3 of 15)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(ellipsisBeginSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(ellipsisBeginSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Ellipsis in middle */}
              <div>
                <h3 className="text-lg font-medium mb-3">Ellipsis on Both Sides (page 10 of 20)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(ellipsisMiddleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(ellipsisMiddleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Ellipsis at end */}
              <div>
                <h3 className="text-lg font-medium mb-3">Ellipsis at End (page 13 of 15)</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(ellipsisEndSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(ellipsisEndSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>
            </div>
          </section>

          {/* Navigation Controls Section */}
          <section id="navigation-controls" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Navigation Controls</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control which navigation elements are displayed.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">No Navigation Controls</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(noNavSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(noNavSpec, null, 2)}
              </CodeBlock>
              </details>
            </div>
          </section>

          {/* Customization Section */}
          <section id="customization" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Customization Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the number of sibling pages shown around the current page.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Custom Sibling Count (3 siblings)</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(customSiblingSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customSiblingSpec, null, 2)}
              </CodeBlock>
              </details>
            </div>
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
                    <td className="py-3 px-4 font-mono">&quot;pagination&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">totalPages</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Total number of pages</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">currentPage</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Currently active page (1-indexed)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showFirstLast</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show first and last page numbers</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showPrevNext</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show previous and next navigation buttons</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">siblingCount</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Number of sibling pages to show around current page</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">boundaryCount</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Number of pages to show at the beginning and end</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onPageChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Action ID for page change handler</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaLabel</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Accessible label for the pagination navigation</td>
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
              See how pagination works in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Data Table Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Data Table with Pagination</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(dataTableExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(dataTableExampleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Blog Listing Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Blog Article Listing</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(blogExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(blogExampleSpec, null, 2)}
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