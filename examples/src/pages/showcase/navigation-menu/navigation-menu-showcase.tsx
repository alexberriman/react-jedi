import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function NavigationMenuShowcase() {
  usePageMetadata({
    title: "NavigationMenu Component",
    description:
      "A comprehensive showcase of the React Jedi NavigationMenu component with all variants, configurations, and usage examples for website navigation.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Navigation" },
    { id: "dropdown", label: "Dropdown Navigation" },
    { id: "nested", label: "Nested Content" },
    { id: "layout", label: "Layout Examples" },
    { id: "responsive", label: "Responsive Patterns" },
    { id: "accessibility", label: "Accessibility Features" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic navigation specification
  const basicNavigationSpec: UISpecification = {
    type: "NavigationMenu",
    className: "mx-auto",
    orientation: "horizontal",
    items: [
      {
        trigger: { label: "Home" },
        href: "/home"
      },
      {
        trigger: { label: "About" },
        href: "/about"
      },
      {
        trigger: { label: "Services" },
        href: "/services"
      },
      {
        trigger: { label: "Contact" },
        href: "/contact"
      }
    ]
  };

  // Dropdown navigation specification
  const dropdownNavigationSpec: UISpecification = {
    type: "NavigationMenu",
    className: "mx-auto",
    orientation: "horizontal",
    delayDuration: 300,
    skipDelayDuration: 400,
    items: [
      {
        trigger: { label: "Products" },
        content: {
          width: "md",
          items: [
            {
              title: "React Jedi Core",
              description: "Server-driven UI library for rapid development",
              href: "/products/core",
              icon: "⚡"
            },
            {
              title: "UI Components",
              description: "Beautiful built-in components for React Jedi",
              href: "/products/components",
              icon: "🎨"
            },
            {
              title: "Development Tools",
              description: "CLI tools and utilities for developers",
              href: "/products/tools",
              icon: "🛠️"
            }
          ]
        }
      },
      {
        trigger: { label: "Solutions" },
        content: {
          width: "lg",
          items: [
            {
              title: "Enterprise",
              description: "Solutions for large organizations",
              href: "/solutions/enterprise",
              icon: "🏢"
            },
            {
              title: "Startups",
              description: "Get up and running quickly",
              href: "/solutions/startups",
              icon: "🚀"
            },
            {
              title: "Education",
              description: "Resources for students and educators",
              href: "/solutions/education",
              icon: "🎓"
            },
            {
              title: "Open Source",
              description: "Community-driven projects",
              href: "/solutions/opensource",
              icon: "💻"
            }
          ]
        }
      },
      {
        trigger: { label: "Resources" },
        href: "/resources"
      }
    ]
  };

  // Complex nested content specification
  const nestedContentSpec: UISpecification = {
    type: "NavigationMenu",
    className: "mx-auto",
    items: [
      {
        trigger: { label: "Documentation" },
        content: {
          width: "xl",
          items: [
            {
              type: "Grid",
              cols: 3,
              gap: "6",
              className: "p-6",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      size: "lg",
                      weight: "semibold",
                      className: "mb-4",
                      children: "Getting Started"
                    },
                    {
                      type: "Stack",
                      spacing: "2",
                      children: [
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Installation"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Quick Start"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Configuration"
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      size: "lg",
                      weight: "semibold",
                      className: "mb-4",
                      children: "Components"
                    },
                    {
                      type: "Stack",
                      spacing: "2",
                      children: [
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Button"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Card"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Form"
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      size: "lg",
                      weight: "semibold",
                      className: "mb-4",
                      children: "Examples"
                    },
                    {
                      type: "Stack",
                      spacing: "2",
                      children: [
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Basic Usage"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Advanced Patterns"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground hover:text-foreground cursor-pointer",
                          children: "Best Practices"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        trigger: { label: "Community" },
        href: "/community"
      }
    ]
  };

  // Layout with branding example
  const layoutExampleSpec: UISpecification = {
    type: "Flex",
    justify: "between",
    align: "center",
    className: "w-full px-6 py-4 border-b",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "8",
        children: [
          {
            type: "Text",
            size: "xl",
            weight: "bold",
            children: "🚀 ACME"
          },
          {
            type: "NavigationMenu",
            items: [
              {
                trigger: { label: "Products" },
                href: "/products"
              },
              {
                trigger: { label: "Pricing" },
                href: "/pricing"
              },
              {
                trigger: { label: "Documentation" },
                href: "/docs"
              }
            ]
          }
        ]
      },
      {
        type: "Group",
        spacing: "3",
        children: [
          {
            type: "Button",
            variant: "ghost",
            size: "sm",
            children: "Sign In"
          },
          {
            type: "Button",
            variant: "primary",
            size: "sm",
            children: "Get Started"
          }
        ]
      }
    ]
  };

  // Responsive navigation example
  const responsiveNavigationSpec: UISpecification = {
    type: "NavigationMenu",
    className: "w-full",
    orientation: "horizontal",
    viewport: true,
    items: [
      {
        trigger: { label: "Platform" },
        content: {
          width: "2xl",
          items: [
            {
              type: "Grid",
              cols: 2,
              gap: "8",
              className: "p-8",
              children: [
                {
                  type: "Card",
                  className: "p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
                  children: [
                    {
                      type: "Flex",
                      direction: "column",
                      gap: "4",
                      children: [
                        {
                          type: "Text",
                          size: "3xl",
                          children: "⚡"
                        },
                        {
                          type: "Text",
                          size: "lg",
                          weight: "semibold",
                          children: "Lightning Fast"
                        },
                        {
                          type: "Text",
                          size: "sm",
                          className: "text-muted-foreground",
                          children: "Build UIs at the speed of thought with our server-driven approach."
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "Stack",
                  spacing: "4",
                  children: [
                    {
                      title: "Dashboard",
                      description: "Complete analytics and monitoring",
                      href: "/platform/dashboard",
                      icon: "📊"
                    },
                    {
                      title: "API Gateway",
                      description: "Secure and scalable API management",
                      href: "/platform/api",
                      icon: "🌐"
                    },
                    {
                      title: "Database",
                      description: "Managed database solutions",
                      href: "/platform/database",
                      icon: "🗄️"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        trigger: { label: "Developers" },
        content: {
          width: "lg",
          items: [
            {
              title: "Documentation",
              description: "Comprehensive guides and API reference",
              href: "/docs",
              icon: "📚"
            },
            {
              title: "Examples",
              description: "Code examples and templates",
              href: "/examples",
              icon: "💡"
            },
            {
              title: "Community",
              description: "Join our developer community",
              href: "/community",
              icon: "👥"
            },
            {
              title: "Support",
              description: "Get help when you need it",
              href: "/support",
              icon: "🛟"
            }
          ]
        }
      },
      {
        trigger: { label: "Company" },
        href: "/company"
      }
    ]
  };

  // Complete website header example
  const websiteHeaderSpec: UISpecification = {
    type: "Box",
    className: "w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    children: {
      type: "Container",
      maxWidth: "7xl",
      className: "px-6",
      children: {
        type: "Flex",
        justify: "between",
        align: "center",
        className: "h-16",
        children: [
          {
            type: "Flex",
            align: "center",
            gap: "8",
            children: [
              {
                type: "Text",
                size: "xl",
                weight: "bold",
                className: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                children: "React Jedi"
              },
              {
                type: "NavigationMenu",
                className: "hidden md:flex",
                items: [
                  {
                    trigger: { label: "Features" },
                    content: {
                      width: "lg",
                      items: [
                        {
                          title: "Server-Driven UI",
                          description: "Build interfaces with JSON specifications",
                          href: "/features/sdui",
                          icon: "🎛️"
                        },
                        {
                          title: "Component Library",
                          description: "Beautiful components out of the box",
                          href: "/features/components",
                          icon: "🧩"
                        },
                        {
                          title: "TypeScript First",
                          description: "Full type safety and IntelliSense",
                          href: "/features/typescript",
                          icon: "🔷"
                        },
                        {
                          title: "Performance",
                          description: "Optimized for speed and efficiency",
                          href: "/features/performance",
                          icon: "⚡"
                        }
                      ]
                    }
                  },
                  {
                    trigger: { label: "Learn" },
                    content: {
                      width: "md",
                      items: [
                        {
                          title: "Quick Start",
                          description: "Get up and running in minutes",
                          href: "/docs/quick-start"
                        },
                        {
                          title: "Tutorials",
                          description: "Step-by-step learning guides",
                          href: "/tutorials"
                        },
                        {
                          title: "Examples",
                          description: "Real-world usage examples",
                          href: "/examples"
                        }
                      ]
                    }
                  },
                  {
                    trigger: { label: "Pricing" },
                    href: "/pricing"
                  }
                ]
              }
            ]
          },
          {
            type: "Group",
            spacing: "2",
            className: "hidden sm:flex",
            children: [
              {
                type: "Button",
                variant: "ghost",
                size: "sm",
                children: "GitHub"
              },
              {
                type: "Button",
                variant: "outline",
                size: "sm",
                children: "Sign In"
              },
              {
                type: "Button",
                variant: "primary",
                size: "sm",
                children: "Get Started"
              }
            ]
          }
        ]
      }
    }
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">NavigationMenu Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful navigation component that creates accessible, flexible menus with dropdown support. Perfect for website headers, dashboards, and complex navigation structures.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The NavigationMenu component is built on top of Radix UI&apos;s Navigation Menu primitive, providing a robust foundation for creating complex navigation structures. It supports both simple links and dropdown menus with rich content.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Keyboard navigation with arrow keys and tab support</li>
                <li>Configurable timing for hover interactions</li>
                <li>Flexible content areas that can contain any component</li>
                <li>Responsive design with mobile-friendly patterns</li>
                <li>Full accessibility with proper ARIA attributes</li>
                <li>Smooth animations and transitions</li>
                <li>Support for both horizontal and vertical orientations</li>
              </ul>
            </div>
          </section>

          {/* Basic Navigation Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Navigation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Simple navigation menus with direct links are perfect for straightforward site navigation.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicNavigationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicNavigationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Dropdown Navigation Section */}
          <section id="dropdown" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Dropdown Navigation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create rich dropdown menus with multiple navigation options and content areas.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(dropdownNavigationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(dropdownNavigationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Nested Content Section */}
          <section id="nested" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              NavigationMenu supports complex nested content using the full React Jedi component system.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(nestedContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(nestedContentSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Layout Examples Section */}
          <section id="layout" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Layout Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Integrate NavigationMenu into larger layout patterns with branding and action buttons.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(layoutExampleSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(layoutExampleSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Responsive Patterns Section */}
          <section id="responsive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Patterns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Build responsive navigation that adapts to different screen sizes and content needs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(responsiveNavigationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(responsiveNavigationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                NavigationMenu includes comprehensive accessibility features to ensure your navigation works for all users:
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Keyboard Navigation</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Tab</kbd> - Navigate between menu items</li>
                <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Arrow Keys</kbd> - Move between items within the menu</li>
                <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Enter/Space</kbd> - Activate menu items</li>
                <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Escape</kbd> - Close open menus</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 mb-2">Screen Reader Support</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper ARIA roles and properties</li>
                <li>Descriptive labels for menu triggers</li>
                <li>Clear indication of expanded/collapsed states</li>
                <li>Semantic HTML structure</li>
              </ul>
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
                    <td className="py-3 px-4 font-mono">&quot;NavigationMenu&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">items</td>
                    <td className="py-3 px-4 font-mono">NavigationItem[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of navigation menu items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">orientation</td>
                    <td className="py-3 px-4 font-mono">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                    <td className="py-3 px-4">&quot;horizontal&quot;</td>
                    <td className="py-3 px-4">Menu orientation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">delayDuration</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">200</td>
                    <td className="py-3 px-4">Delay before showing content on hover (ms)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">skipDelayDuration</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">300</td>
                    <td className="py-3 px-4">Time to skip delay when moving between items (ms)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">viewport</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether to show content in a viewport</td>
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

            <h3 className="text-lg font-medium mt-6 mb-3">Navigation Item Structure</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Property</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">trigger</td>
                    <td className="py-3 px-4 font-mono">NavigationTrigger</td>
                    <td className="py-3 px-4">Label and optional icon for the menu item</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">content</td>
                    <td className="py-3 px-4 font-mono">NavigationContent</td>
                    <td className="py-3 px-4">Dropdown content with links and components</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">href</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">Direct link URL (alternative to content)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing NavigationMenu in complete website layouts.
            </p>
            
            <div className="space-y-8">
              {/* Website Header Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Complete Website Header</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(websiteHeaderSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(websiteHeaderSpec, null, 2)}
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