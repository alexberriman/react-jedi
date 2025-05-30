import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function BadgeShowcase() {
  usePageMetadata({
    title: "Badge Component",
    description:
      "A comprehensive showcase of the React Jedi Badge component with all variants and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Badge Variants" },
    { id: "with-icons", label: "Badges with Icons" },
    { id: "in-context", label: "Badges in Context" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Badge variants specification
  const variantsSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      { type: "Badge", children: "Default" },
      { type: "Badge", variant: "secondary", children: "Secondary" },
      { type: "Badge", variant: "outline", children: "Outline" },
      { type: "Badge", variant: "destructive", children: "Destructive" },
    ],
  };

  // Badges with icons (using emoji for demonstration)
  const iconsSpec: UISpecification = {
    type: "Group",
    spacing: "3",
    children: [
      { type: "Badge", children: "✅ Active" },
      { type: "Badge", variant: "secondary", children: "⏸️ Paused" },
      { type: "Badge", variant: "outline", children: "🔒 Locked" },
      { type: "Badge", variant: "destructive", children: "❌ Error" },
    ],
  };

  // Badges in different contexts
  const contextSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      // In a card header
      {
        type: "Card",
        className: "w-full max-w-md",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "center",
                children: [
                  { type: "CardTitle", children: "Premium Plan" },
                  { type: "Badge", variant: "secondary", children: "Popular" },
                ],
              },
              { type: "CardDescription", children: "Best for growing teams" },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "$49/month",
              className: "text-2xl font-bold",
            },
          },
        ],
      },
      // In a list
      {
        type: "Stack",
        spacing: "3",
        className: "w-full max-w-md",
        children: [
          {
            type: "Flex",
            justify: "between",
            align: "center",
            className: "p-3 rounded-lg border border-gray-200 dark:border-gray-800",
            children: [
              { type: "Text", children: "Production Server" },
              { type: "Badge", children: "Online" },
            ],
          },
          {
            type: "Flex",
            justify: "between",
            align: "center",
            className: "p-3 rounded-lg border border-gray-200 dark:border-gray-800",
            children: [
              { type: "Text", children: "Staging Server" },
              { type: "Badge", variant: "secondary", children: "Maintenance" },
            ],
          },
          {
            type: "Flex",
            justify: "between",
            align: "center",
            className: "p-3 rounded-lg border border-gray-200 dark:border-gray-800",
            children: [
              { type: "Text", children: "Development Server" },
              { type: "Badge", variant: "destructive", children: "Offline" },
            ],
          },
        ],
      },
    ],
  };

  // Complete example: Feature list with badges
  const featureListSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Feature Comparison" },
          { type: "CardDescription", children: "Compare features across different plans" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Flex",
              justify: "between",
              align: "center",
              className: "pb-3 border-b border-gray-200 dark:border-gray-800",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Text", className: "font-medium", children: "API Access" },
                    { type: "Text", size: "small", variant: "muted", children: "Full REST API with webhooks" },
                  ],
                },
                { type: "Badge", children: "Available" },
              ],
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              className: "pb-3 border-b border-gray-200 dark:border-gray-800",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Text", className: "font-medium", children: "Custom Domains" },
                    { type: "Text", size: "small", variant: "muted", children: "Use your own domain" },
                  ],
                },
                { type: "Badge", variant: "secondary", children: "Coming Soon" },
              ],
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              className: "pb-3 border-b border-gray-200 dark:border-gray-800",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Text", className: "font-medium", children: "Priority Support" },
                    { type: "Text", size: "small", variant: "muted", children: "24/7 dedicated support" },
                  ],
                },
                { type: "Badge", variant: "outline", children: "Premium Only" },
              ],
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Text", className: "font-medium", children: "Legacy Features" },
                    { type: "Text", size: "small", variant: "muted", children: "Old API endpoints" },
                  ],
                },
                { type: "Badge", variant: "destructive", children: "Deprecated" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Notification example with badges
  const notificationSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    className: "w-full max-w-md",
    children: [
      {
        type: "Alert",
        children: [
          {
            type: "Flex",
            align: "start",
            gap: "3",
            children: [
              { type: "Text", className: "text-2xl", children: "📦" },
              {
                type: "Box",
                className: "flex-1",
                children: [
                  {
                    type: "Flex",
                    align: "center",
                    gap: "2",
                    className: "mb-1",
                    children: [
                      { type: "Text", className: "font-semibold", children: "New Update Available" },
                      { type: "Badge", variant: "secondary", children: "v2.5.0" },
                    ],
                  },
                  {
                    type: "Text",
                    size: "small",
                    variant: "muted",
                    children: "This update includes bug fixes and performance improvements.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Alert",
        className: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
        children: [
          {
            type: "Flex",
            align: "start",
            gap: "3",
            children: [
              { type: "Text", className: "text-2xl", children: "⚠️" },
              {
                type: "Box",
                className: "flex-1",
                children: [
                  {
                    type: "Flex",
                    align: "center",
                    gap: "2",
                    className: "mb-1",
                    children: [
                      { type: "Text", className: "font-semibold", children: "Security Alert" },
                      { type: "Badge", variant: "destructive", children: "Critical" },
                    ],
                  },
                  {
                    type: "Text",
                    size: "small",
                    variant: "muted",
                    children: "Please update your password immediately.",
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
    const element = document.getElementById(sectionId);
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Badge Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Small status indicators and labels that help categorize and highlight important information in your interface.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Badge component is a compact visual element used to display short pieces of information, status indicators, or counts. It's commonly used to show tags, categories, notification counts, or status labels.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Four visual variants (default, secondary, outline, destructive)</li>
                <li>Flexible content support (text, icons, or mixed content)</li>
                <li>Accessible by default with proper semantic markup</li>
                <li>Lightweight and performant</li>
                <li>Dark mode compatible</li>
                <li>Customizable with className prop</li>
              </ul>
            </div>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Badge Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from four different badge variants to match your design needs and convey the right level of emphasis.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(variantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(variantsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Badges with Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance badges with icons to improve visual communication and make status indicators more recognizable.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(iconsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(iconsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* In Context Section */}
          <section id="in-context" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Badges in Context</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how badges work within different UI components and layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(contextSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(contextSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">"Badge"</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">string | ComponentSpec</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Badge content</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">"default" | "secondary" | "outline" | "destructive"</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Visual style variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">asChild</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Render as child slot element</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Optional icon component</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how badges enhance real-world UI scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Feature List Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Feature Comparison Table</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(featureListSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(featureListSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Notification Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Notifications with Status Badges</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(notificationSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(notificationSpec, null, 2)}
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