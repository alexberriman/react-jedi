import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function BreadcrumbShowcase() {
  usePageMetadata({
    title: "Breadcrumb Component",
    description:
      "A comprehensive showcase of the React Jedi Breadcrumb component with navigation patterns, separators, and accessibility features.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Breadcrumb" },
    { id: "separators", label: "Custom Separators" },
    { id: "with-icons", label: "With Icons" },
    { id: "current-page", label: "Current Page" },
    { id: "navigation", label: "Complex Navigation" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic breadcrumb specification
  const basicSpec: UISpecification = {
    type: "breadcrumb",
    items: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings" },
    ],
  };

  // Different separators specification
  const separatorsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Default (Chevron)" },
          {
            type: "breadcrumb",
            items: [
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Laptops" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Slash Separator" },
          {
            type: "breadcrumb",
            separator: "slash",
            items: [
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Laptops" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Custom Separator" },
          {
            type: "breadcrumb",
            separator: "•",
            items: [
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Laptops" },
            ],
          },
        ],
      },
    ],
  };

  // Breadcrumbs with icons
  const iconsSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "breadcrumb",
        items: [
          { label: "Home", href: "/", icon: "🏠" },
          { label: "Products", href: "/products", icon: "📦" },
          { label: "Electronics", href: "/electronics", icon: "💻" },
          { label: "Laptops", icon: "🖥️" },
        ],
      },
      {
        type: "breadcrumb",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: "📊" },
          { label: "Analytics", href: "/analytics", icon: "📈" },
          { label: "Reports", icon: "📋" },
        ],
      },
    ],
  };

  // Current page examples
  const currentPageSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Standard Navigation" },
          {
            type: "breadcrumb",
            items: [
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "React Jedi Tutorial", isCurrentPage: true },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Deep Navigation Path" },
          {
            type: "breadcrumb",
            items: [
              { label: "Admin", href: "/admin" },
              { label: "Users", href: "/admin/users" },
              { label: "User Management", href: "/admin/users/management" },
              { label: "Edit Profile", isCurrentPage: true },
            ],
          },
        ],
      },
    ],
  };

  // Complex navigation patterns
  const complexNavSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "E-commerce Navigation" },
          {
            type: "breadcrumb",
            items: [
              { label: "Home", href: "/", icon: "🏠" },
              { label: "Categories", href: "/categories" },
              { label: "Electronics", href: "/categories/electronics" },
              { label: "Computers", href: "/categories/electronics/computers" },
              { label: "MacBook Pro 16\"", isCurrentPage: true },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Documentation Site" },
          {
            type: "breadcrumb",
            separator: "/",
            items: [
              { label: "Docs", href: "/docs", icon: "📚" },
              { label: "Components", href: "/docs/components" },
              { label: "Navigation", href: "/docs/components/navigation" },
              { label: "Breadcrumb", isCurrentPage: true },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "File System Navigation" },
          {
            type: "breadcrumb",
            separator: "/",
            items: [
              { label: "root", href: "/", icon: "💻" },
              { label: "home", href: "/home" },
              { label: "user", href: "/home/user" },
              { label: "documents", href: "/home/user/documents" },
              { label: "projects", isCurrentPage: true, icon: "📁" },
            ],
          },
        ],
      },
    ],
  };

  // Accessibility example with custom aria label
  const accessibilitySpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Custom Aria Label" },
          {
            type: "breadcrumb",
            ariaLabel: "Page navigation",
            items: [
              { label: "Home", href: "/" },
              { label: "Accessibility", href: "/accessibility" },
              { label: "Guidelines", isCurrentPage: true },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", children: "Form Navigation" },
          {
            type: "breadcrumb",
            ariaLabel: "Form steps",
            items: [
              { label: "Personal Info", href: "/form/step1" },
              { label: "Address", href: "/form/step2" },
              { label: "Payment", href: "/form/step3" },
              { label: "Review", isCurrentPage: true },
            ],
          },
        ],
      },
    ],
  };

  // Complete page example
  const pageExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full",
    children: [
      {
        type: "CardContent",
        className: "p-6",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "breadcrumb",
              items: [
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: "Tech Articles", href: "/blog/tech" },
                { label: "React Jedi Deep Dive", isCurrentPage: true },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Heading", size: "large", children: "React Jedi Deep Dive" },
                { type: "Text", variant: "muted", children: "Published on March 15, 2024" },
              ],
            },
            {
              type: "Text",
              children: "This comprehensive guide explores advanced patterns and techniques for building dynamic UIs with React Jedi's server-driven approach...",
            },
            {
              type: "Group",
              spacing: "2",
              children: [
                { type: "Button", variant: "primary", size: "sm", children: "Read Article" },
                { type: "Button", variant: "outline", size: "sm", children: "Share" },
                { type: "Button", variant: "ghost", size: "sm", children: "Bookmark" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Dashboard example
  const dashboardExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full",
    children: [
      {
        type: "CardHeader",
        children: [
          {
            type: "breadcrumb",
            items: [
              { label: "Dashboard", href: "/dashboard", icon: "📊" },
              { label: "Analytics", href: "/dashboard/analytics", icon: "📈" },
              { label: "User Engagement", isCurrentPage: true, icon: "👥" },
            ],
          },
          { type: "CardTitle", children: "User Engagement Analytics" },
          { type: "CardDescription", children: "Track and analyze user behavior patterns" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Grid",
              columns: 3,
              gap: "4",
              children: [
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      className: "pb-2",
                      children: [
                        { type: "CardDescription", children: "Total Users" },
                        { type: "Text", size: "2xl", className: "font-bold", children: "12,543" },
                      ],
                    },
                  ],
                },
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      className: "pb-2",
                      children: [
                        { type: "CardDescription", children: "Active Sessions" },
                        { type: "Text", size: "2xl", className: "font-bold", children: "8,234" },
                      ],
                    },
                  ],
                },
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      className: "pb-2",
                      children: [
                        { type: "CardDescription", children: "Bounce Rate" },
                        { type: "Text", size: "2xl", className: "font-bold", children: "23.5%" },
                      ],
                    },
                  ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Breadcrumb Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A navigation component that provides context about the user&apos;s current location within the application hierarchy. Essential for complex navigation structures and improved user experience.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Breadcrumb component displays a navigation trail that shows the user&apos;s current location within the application&apos;s hierarchy. It provides an easy way for users to understand where they are and navigate back to previous levels.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Customizable separators (chevron, slash, or custom text/emoji)</li>
                <li>Support for icons alongside breadcrumb labels</li>
                <li>Current page indication with proper accessibility attributes</li>
                <li>Fully accessible with proper ARIA labels and navigation structure</li>
                <li>Responsive design that works across all screen sizes</li>
                <li>Flexible styling with className support</li>
              </ul>
            </div>
          </section>

          {/* Basic Breadcrumb Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Breadcrumb</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple breadcrumb navigation with linked items and a current page.
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

          {/* Custom Separators Section */}
          <section id="separators" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Separators</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the separator between breadcrumb items to match your design system.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(separatorsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(separatorsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Breadcrumbs with Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance breadcrumbs with icons for better visual communication and context.
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

          {/* Current Page Section */}
          <section id="current-page" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Current Page Indication</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Mark the current page with proper accessibility attributes and distinct styling.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(currentPageSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(currentPageSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Complex Navigation Section */}
          <section id="navigation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complex Navigation Patterns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Examples of breadcrumbs in different application contexts and navigation patterns.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(complexNavSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(complexNavSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Breadcrumbs with custom ARIA labels for enhanced screen reader support.
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
                    <td className="py-3 px-4 font-mono">&quot;breadcrumb&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">items</td>
                    <td className="py-3 px-4 font-mono">BreadcrumbItemSpec[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of breadcrumb items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">separator</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;chevron&quot;</td>
                    <td className="py-3 px-4">Separator style (chevron, slash, or custom text)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaLabel</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;Breadcrumb&quot;</td>
                    <td className="py-3 px-4">Accessibility label for navigation</td>
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
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">BreadcrumbItemSpec Properties</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 px-4 font-medium">Prop</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Required</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">label</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">✓</td>
                      <td className="py-3 px-4">Text to display for this breadcrumb item</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">href</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Link URL (omit for non-clickable items)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Icon to display before the label</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">isCurrentPage</td>
                      <td className="py-3 px-4 font-mono">boolean</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Mark as current page (non-clickable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how breadcrumbs work in real-world application scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Blog Page Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Blog Article Page</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(pageExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(pageExampleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Dashboard Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Dashboard Analytics Page</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(dashboardExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(dashboardExampleSpec, null, 2)}
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
                to="/documentation/navigation-components"
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