import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function DrawerShowcase() {
  usePageMetadata({
    title: "Drawer Component",
    description:
      "A comprehensive showcase of the React Jedi Drawer component with directional variations, interactive features, and mobile-optimized gestures.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "directional", label: "Directional Drawers" },
    { id: "sticky-sections", label: "Sticky Sections" },
    { id: "nested", label: "Nested Drawers" },
    { id: "interactive", label: "Interactive Features" },
    { id: "customization", label: "Customization" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Real-World Examples" },
  ];

  // Basic drawer from bottom
  const basicDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      trigger: {
        type: "Button",
        children: "Open Drawer",
      },
      content: {
        header: {
          title: "Basic Drawer",
          description: "This is a simple drawer example with basic content.",
        },
        sections: [
          {
            content: {
              type: "Text",
              children: "This is the main content area of the drawer. You can place any content here including forms, lists, or other components.",
              className: "py-4",
            },
          },
        ],
        footer: {
          actions: [
            {
              type: "Button",
              variant: "default",
              children: "Save Changes",
            },
            {
              type: "Button",
              variant: "outline",
              children: "Cancel",
              onClick: "closeDrawer",
            },
          ],
        },
      },
    },
  };

  // Top drawer
  const topDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      direction: "top",
      trigger: {
        type: "Button",
        variant: "outline",
        children: "Open from Top",
      },
      content: {
        header: {
          title: "Top Drawer",
          description: "This drawer slides in from the top of the screen.",
        },
        sections: [
          {
            content: {
              type: "Flex",
              direction: "column",
              gap: "4",
              children: [
                {
                  type: "Text",
                  children: "Perfect for notifications, alerts, or quick actions that need user attention.",
                },
                {
                  type: "Alert",
                  children: [
                    {
                      type: "AlertDescription",
                      children: "This drawer appears from the top and can contain important information.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  };

  // Right drawer
  const rightDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      direction: "right",
      trigger: {
        type: "Button",
        variant: "outline",
        children: "Open from Right",
      },
      content: {
        header: {
          title: "Right Panel",
          description: "A side panel that slides in from the right.",
        },
        sections: [
          {
            content: {
              type: "Stack",
              children: [
                {
                  type: "Text",
                  children: "Right-side drawers are great for:",
                  className: "font-semibold",
                },
                {
                  type: "ul",
                  className: "list-disc pl-6 space-y-2",
                  children: [
                    { type: "li", children: "Settings panels" },
                    { type: "li", children: "Navigation menus" },
                    { type: "li", children: "Detail views" },
                    { type: "li", children: "Filter controls" },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  };

  // Left drawer
  const leftDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      direction: "left",
      trigger: {
        type: "Button",
        variant: "outline",
        children: "Open from Left",
      },
      content: {
        header: {
          title: "Navigation Drawer",
          description: "Common pattern for mobile navigation.",
        },
        sections: [
          {
            content: {
              type: "Stack",
              children: [
                {
                  type: "Button",
                  variant: "ghost",
                  className: "justify-start",
                  children: "🏠 Home",
                },
                {
                  type: "Button",
                  variant: "ghost",
                  className: "justify-start",
                  children: "📊 Dashboard",
                },
                {
                  type: "Button",
                  variant: "ghost",
                  className: "justify-start",
                  children: "⚙️ Settings",
                },
                {
                  type: "Button",
                  variant: "ghost",
                  className: "justify-start",
                  children: "👤 Profile",
                },
              ],
            },
          },
        ],
      },
    },
  };

  // Sticky sections drawer
  const stickyDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      trigger: {
        type: "Button",
        variant: "secondary",
        children: "Open Sticky Drawer",
      },
      content: {
        header: {
          title: "Sticky Header Example",
          description: "The header stays fixed while content scrolls.",
          sticky: true,
          className: "bg-background/95 backdrop-blur-sm",
        },
        sections: [
          {
            content: {
              type: "Stack",
              children: Array.from({length: 20}).fill(null).map((_, i) => ({
                type: "Card",
                children: [
                  {
                    type: "CardContent",
                    className: "py-4",
                    children: `Item ${i + 1}: This is scrollable content. The header and footer remain fixed.`,
                  },
                ],
              })),
            },
          },
        ],
        footer: {
          sticky: true,
          className: "bg-background/95 backdrop-blur-sm",
          actions: [
            {
              type: "Button",
              variant: "default",
              children: "Fixed Action",
            },
            {
              type: "Button",
              variant: "outline",
              children: "Close",
              onClick: "closeDrawer",
            },
          ],
        },
      },
    },
  };

  // Nested drawers
  const nestedDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      trigger: {
        type: "Button",
        variant: "secondary",
        children: "Open Parent Drawer",
      },
      content: {
        header: {
          title: "Parent Drawer",
          description: "This drawer contains another drawer.",
        },
        sections: [
          {
            content: {
              type: "Stack",
              children: [
                {
                  type: "Text",
                  children: "You can nest drawers for complex workflows.",
                },
                {
                  type: "drawer",
                  props: {
                    trigger: {
                      type: "Button",
                      variant: "default",
                      children: "Open Nested Drawer",
                    },
                    content: {
                      header: {
                        title: "Nested Drawer",
                        description: "This drawer is inside another drawer.",
                      },
                      sections: [
                        {
                          content: {
                            type: "Text",
                            children: "Nested drawers are useful for multi-step processes or hierarchical content.",
                          },
                        },
                      ],
                      footer: {
                        actions: [
                          {
                            type: "Button",
                            variant: "outline",
                            children: "Close Nested",
                            onClick: "closeDrawer",
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };

  // Form drawer example
  const formDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      trigger: {
        type: "Button",
        variant: "default",
        children: "Create New Item",
      },
      content: {
        header: {
          title: "Create New Item",
          description: "Fill out the form below to create a new item.",
        },
        sections: [
          {
            content: {
              type: "Form",
              children: [
                {
                  type: "Stack",
                  children: [
                    {
                      type: "Label",
                      htmlFor: "name",
                      children: "Name",
                    },
                    {
                      type: "Input",
                      id: "name",
                      placeholder: "Enter item name",
                    },
                    {
                      type: "Label",
                      htmlFor: "description",
                      children: "Description",
                    },
                    {
                      type: "Textarea",
                      id: "description",
                      placeholder: "Enter item description",
                      rows: 4,
                    },
                    {
                      type: "Label",
                      htmlFor: "category",
                      children: "Category",
                    },
                    {
                      type: "Select",
                      id: "category",
                      options: [
                        { value: "electronics", label: "Electronics" },
                        { value: "clothing", label: "Clothing" },
                        { value: "food", label: "Food" },
                        { value: "other", label: "Other" },
                      ],
                      placeholder: "Select a category",
                    },
                  ],
                },
              ],
            },
          },
        ],
        footer: {
          actions: [
            {
              type: "Button",
              variant: "default",
              children: "Create Item",
            },
            {
              type: "Button",
              variant: "outline",
              children: "Cancel",
              onClick: "closeDrawer",
            },
          ],
        },
      },
    },
  };

  // Custom styled drawer
  const customStyledDrawerSpec: UISpecification = {
    type: "drawer",
    props: {
      trigger: {
        type: "Button",
        variant: "outline",
        children: "Open Custom Drawer",
      },
      content: {
        className: "bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
        showHandle: false,
        header: {
          title: "Customized Drawer",
          description: "With custom colors and no drag handle.",
          className: "text-purple-900 dark:text-purple-100",
        },
        sections: [
          {
            content: {
              type: "Stack",
              className: "p-4",
              children: [
                {
                  type: "Card",
                  className: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-800",
                  children: [
                    {
                      type: "CardHeader",
                      children: [
                        {
                          type: "CardTitle",
                          children: "Beautiful Design",
                        },
                        {
                          type: "CardDescription",
                          children: "Drawers can be styled to match your brand perfectly.",
                        },
                      ],
                    },
                    {
                      type: "CardContent",
                      children: "Use className props to customize the appearance of any part of the drawer.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  };

  // Settings panel example
  const settingsPanelSpec: UISpecification = {
    type: "Card",
    className: "w-full",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "User Settings Panel" },
          { type: "CardDescription", children: "A comprehensive settings interface using a drawer" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "drawer",
          props: {
            direction: "right",
            trigger: {
              type: "Button",
              variant: "outline",
              className: "w-full",
              children: [
                {
                  type: "Flex",
                  align: "center",
                  justify: "between",
                  className: "w-full",
                  children: [
                    { type: "span", children: "⚙️ Open Settings" },
                    { type: "span", children: "→" },
                  ],
                },
              ],
            },
            content: {
              header: {
                title: "Settings",
                description: "Manage your account preferences",
                sticky: true,
              },
              sections: [
                {
                  content: {
                    type: "Stack",
                    children: [
                      {
                        type: "Text",
                        children: "Profile",
                        className: "font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                      },
                      {
                        type: "Stack",
                        gap: "2",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            children: [
                              { type: "Text", children: "Public Profile" },
                              { type: "Switch", defaultChecked: true },
                            ],
                          },
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            children: [
                              { type: "Text", children: "Show Email" },
                              { type: "Switch" },
                            ],
                          },
                        ],
                      },
                      {
                        type: "Separator",
                        className: "my-4",
                      },
                      {
                        type: "Text",
                        children: "Notifications",
                        className: "font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                      },
                      {
                        type: "Stack",
                        gap: "2",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            children: [
                              { type: "Text", children: "Email Notifications" },
                              { type: "Switch", defaultChecked: true },
                            ],
                          },
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            children: [
                              { type: "Text", children: "Push Notifications" },
                              { type: "Switch", defaultChecked: true },
                            ],
                          },
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            children: [
                              { type: "Text", children: "SMS Alerts" },
                              { type: "Switch" },
                            ],
                          },
                        ],
                      },
                      {
                        type: "Separator",
                        className: "my-4",
                      },
                      {
                        type: "Text",
                        children: "Appearance",
                        className: "font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                      },
                      {
                        type: "RadioGroup",
                        defaultValue: "system",
                        options: [
                          { value: "light", label: "Light Mode" },
                          { value: "dark", label: "Dark Mode" },
                          { value: "system", label: "System Default" },
                        ],
                      },
                    ],
                  },
                },
              ],
              footer: {
                sticky: true,
                actions: [
                  {
                    type: "Button",
                    variant: "default",
                    children: "Save Settings",
                  },
                  {
                    type: "Button",
                    variant: "outline",
                    children: "Cancel",
                    onClick: "closeDrawer",
                  },
                ],
              },
            },
          },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Drawer Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible drawer component built on Vaul that provides sliding panels from any direction. Perfect for mobile navigation, settings panels, forms, and detail views with support for touch gestures and nested content.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Drawer component is a powerful overlay that slides in from any edge of the screen. Built on top of the Vaul library, it provides a smooth, accessible, and mobile-optimized experience with touch gesture support.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Four directional variations: top, right, bottom, left</li>
                <li>Touch gesture support for mobile devices</li>
                <li>Sticky headers and footers for fixed content</li>
                <li>Nested drawer support for complex workflows</li>
                <li>Customizable drag handle</li>
                <li>Modal and non-modal modes</li>
                <li>Smooth animations with configurable direction</li>
                <li>Full keyboard navigation and accessibility</li>
                <li>Responsive sizing and mobile optimization</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest drawer configuration with a trigger button and content sections.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Basic Bottom Drawer</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(basicDrawerSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicDrawerSpec, null, 2)}
              </CodeBlock>
              </details>
            </div>
          </section>

          {/* Directional Drawers Section */}
          <section id="directional" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Directional Drawers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Drawers can slide in from any edge of the screen to suit different use cases.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Top Drawer</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(topDrawerSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(topDrawerSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Right Drawer</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(rightDrawerSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(rightDrawerSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Left Drawer</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(leftDrawerSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(leftDrawerSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>
            </div>
          </section>

          {/* Sticky Sections */}
          <section id="sticky-sections" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Sticky Sections</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Headers and footers can be made sticky to remain visible while scrolling content.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Sticky Header & Footer</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(stickyDrawerSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(stickyDrawerSpec, null, 2)}
              </CodeBlock>
              </details>
            </div>
          </section>

          {/* Nested Drawers */}
          <section id="nested" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Drawers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Drawers can be nested for multi-step workflows or hierarchical content.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Parent and Child Drawers</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(nestedDrawerSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(nestedDrawerSpec, null, 2)}
              </CodeBlock>
              </details>
            </div>
          </section>

          {/* Interactive Features */}
          <section id="interactive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Interactive Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Drawers support forms, actions, and complex interactive content.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Form in Drawer</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(formDrawerSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(formDrawerSpec, null, 2)}
              </CodeBlock>
              </details>
            </div>
          </section>

          {/* Customization */}
          <section id="customization" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Customization</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the appearance with className props and styling options.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Custom Styled Drawer</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(customStyledDrawerSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customStyledDrawerSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;drawer&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.open</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Controlled open state</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.defaultOpen</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Initial open state for uncontrolled usage</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.direction</td>
                    <td className="py-3 px-4 font-mono">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</td>
                    <td className="py-3 px-4">&quot;bottom&quot;</td>
                    <td className="py-3 px-4">Direction from which drawer opens</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.modal</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether to render as modal</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.dismissible</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether drawer can be dismissed</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.trigger</td>
                    <td className="py-3 px-4 font-mono">UISpecification</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">The trigger element for the drawer</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.content.header</td>
                    <td className="py-3 px-4 font-mono">object</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Header configuration (title, description, sticky)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.content.sections</td>
                    <td className="py-3 px-4 font-mono">array</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Array of content sections</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.content.footer</td>
                    <td className="py-3 px-4 font-mono">object</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Footer configuration (actions, sticky)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">props.content.showHandle</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether to show drag handle</td>
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

            <h3 className="text-lg font-medium mt-6 mb-3">Header Configuration</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Prop</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">The drawer title</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">The drawer description</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">sticky</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">Whether header should be sticky</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">Additional CSS classes for header</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Real-World Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete implementations showing drawers in real application contexts.
            </p>
            
            <div className="space-y-8">
              {/* Settings Panel */}
              <div>
                <h3 className="text-lg font-medium mb-3">Settings Panel</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(settingsPanelSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(settingsPanelSpec, null, 2)}
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