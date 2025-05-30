import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function HoverCardShowcase() {
  usePageMetadata({
    title: "HoverCard Component",
    description:
      "A comprehensive showcase of the React Jedi HoverCard component with content previews, positioning options, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "content-types", label: "Content Types" },
    { id: "positioning", label: "Positioning" },
    { id: "timing", label: "Timing & Delays" },
    { id: "interactive", label: "Interactive Examples" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic hover card specification
  const basicSpec: UISpecification = {
    type: "HoverCard",
    children: [
      {
        type: "HoverCardTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "link",
          className: "h-auto p-0 text-base",
          children: "@nextjs",
        },
      },
      {
        type: "HoverCardContent",
        className: "w-80",
        children: {
          type: "Stack",
          spacing: "3",
          children: [
            {
              type: "Flex",
              justify: "between",
              align: "start",
              children: [
                {
                  type: "Avatar",
                  src: "https://github.com/vercel.png",
                  alt: "Next.js",
                  fallback: "NJ",
                },
                {
                  type: "Button",
                  size: "sm",
                  children: "Follow",
                },
              ],
            },
            {
              type: "Stack",
              spacing: "1",
              children: [
                {
                  type: "Heading",
                  level: 4,
                  children: "Next.js",
                },
                {
                  type: "Text",
                  size: "small",
                  variant: "muted",
                  children: "@nextjs",
                },
              ],
            },
            {
              type: "Text",
              size: "small",
              children: "The React Framework – created and maintained by Vercel.",
            },
            {
              type: "Flex",
              gap: "4",
              className: "text-sm text-muted-foreground",
              children: [
                {
                  type: "Flex",
                  gap: "1",
                  children: [
                    { type: "Text", className: "font-semibold", children: "1.2K" },
                    { type: "Text", children: "Following" },
                  ],
                },
                {
                  type: "Flex",
                  gap: "1",
                  children: [
                    { type: "Text", className: "font-semibold", children: "45.9K" },
                    { type: "Text", children: "Followers" },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Content types examples
  const contentTypesSpec: UISpecification = {
    type: "Group",
    spacing: "6",
    children: [
      // Simple text content
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Text",
              className: "underline decoration-dotted cursor-pointer",
              children: "Hover for definition",
            },
          },
          {
            type: "HoverCardContent",
            children: {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Text",
                  className: "font-semibold",
                  children: "Server-Driven UI (SDUI)",
                },
                {
                  type: "Text",
                  size: "small",
                  children: "An architectural pattern where the UI structure and content are defined by the server and rendered dynamically by the client.",
                },
              ],
            },
          },
        ],
      },
      // User profile card
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Flex",
              align: "center",
              gap: "2",
              className: "cursor-pointer",
              children: [
                {
                  type: "Avatar",
                  src: "https://github.com/shadcn.png",
                  alt: "User",
                  size: "sm",
                },
                {
                  type: "Text",
                  className: "font-medium",
                  children: "Sarah Chen",
                },
              ],
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            children: {
              type: "Card",
              children: [
                {
                  type: "CardHeader",
                  children: [
                    {
                      type: "Flex",
                      gap: "3",
                      align: "start",
                      children: [
                        {
                          type: "Avatar",
                          src: "https://github.com/shadcn.png",
                          alt: "Sarah Chen",
                          size: "lg",
                        },
                        {
                          type: "Box",
                          className: "flex-1",
                          children: [
                            {
                              type: "CardTitle",
                              children: "Sarah Chen",
                            },
                            {
                              type: "CardDescription",
                              children: "Senior Frontend Engineer",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "CardContent",
                  children: {
                    type: "Stack",
                    spacing: "3",
                    children: [
                      {
                        type: "Text",
                        size: "small",
                        children: "Building delightful user experiences with React and TypeScript. Passionate about design systems and accessibility.",
                      },
                      {
                        type: "Flex",
                        gap: "4",
                        className: "text-sm",
                        children: [
                          { type: "Text", children: "📍 San Francisco" },
                          { type: "Text", children: "🔗 github.com/sarahchen" },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  };

  // Positioning examples
  const positioningSpec: UISpecification = {
    type: "Grid",
    columns: 2,
    gap: "8",
    className: "items-center",
    children: [
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Top",
            },
          },
          {
            type: "HoverCardContent",
            side: "top",
            children: {
              type: "Text",
              children: "This hover card appears on top",
            },
          },
        ],
      },
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Right",
            },
          },
          {
            type: "HoverCardContent",
            side: "right",
            children: {
              type: "Text",
              children: "This hover card appears on the right",
            },
          },
        ],
      },
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Bottom",
            },
          },
          {
            type: "HoverCardContent",
            side: "bottom",
            children: {
              type: "Text",
              children: "This hover card appears on the bottom",
            },
          },
        ],
      },
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Button",
              variant: "outline",
              children: "Left",
            },
          },
          {
            type: "HoverCardContent",
            side: "left",
            children: {
              type: "Text",
              children: "This hover card appears on the left",
            },
          },
        ],
      },
    ],
  };

  // Timing examples
  const timingSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      {
        type: "HoverCard",
        openDelay: 0,
        closeDelay: 0,
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Badge",
              children: "Instant (0ms)",
            },
          },
          {
            type: "HoverCardContent",
            children: {
              type: "Text",
              size: "small",
              children: "Opens and closes immediately",
            },
          },
        ],
      },
      {
        type: "HoverCard",
        openDelay: 200,
        closeDelay: 100,
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Badge",
              variant: "secondary",
              children: "Fast (200ms open, 100ms close)",
            },
          },
          {
            type: "HoverCardContent",
            children: {
              type: "Text",
              size: "small",
              children: "Quick delay for better UX",
            },
          },
        ],
      },
      {
        type: "HoverCard",
        openDelay: 700,
        closeDelay: 300,
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Badge",
              variant: "outline",
              children: "Slow (700ms open, 300ms close)",
            },
          },
          {
            type: "HoverCardContent",
            children: {
              type: "Text",
              size: "small",
              children: "Longer delay prevents accidental triggers",
            },
          },
        ],
      },
    ],
  };

  // Interactive examples
  const interactiveSpec: UISpecification = {
    type: "Grid",
    columns: 2,
    gap: "6",
    children: [
      // Product preview
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Card",
              className: "cursor-pointer",
              children: [
                {
                  type: "CardHeader",
                  children: [
                    {
                      type: "CardTitle",
                      className: "text-base",
                      children: "MacBook Pro 14\"",
                    },
                    {
                      type: "CardDescription",
                      children: "$1,999",
                    },
                  ],
                },
              ],
            },
          },
          {
            type: "HoverCardContent",
            className: "w-80",
            side: "right",
            children: {
              type: "Stack",
              spacing: "3",
              children: [
                {
                  type: "AspectRatio",
                  ratio: 16 / 9,
                  children: {
                    type: "Box",
                    className: "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-md",
                  },
                },
                {
                  type: "Stack",
                  spacing: "2",
                  children: [
                    {
                      type: "Heading",
                      level: 4,
                      children: "MacBook Pro 14\"",
                    },
                    {
                      type: "Text",
                      size: "small",
                      children: "M3 Pro chip. Up to 18 hours battery life. Liquid Retina XDR display.",
                    },
                    {
                      type: "Flex",
                      gap: "2",
                      children: [
                        {
                          type: "Badge",
                          variant: "secondary",
                          children: "In Stock",
                        },
                        {
                          type: "Badge",
                          variant: "outline",
                          children: "Free Shipping",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      // Code snippet preview
      {
        type: "HoverCard",
        children: [
          {
            type: "HoverCardTrigger",
            children: {
              type: "Badge",
              variant: "secondary",
              className: "font-mono cursor-pointer",
              children: "useHoverCard()",
            },
          },
          {
            type: "HoverCardContent",
            className: "w-96",
            children: {
              type: "Stack",
              spacing: "3",
              children: [
                {
                  type: "Text",
                  className: "font-semibold",
                  children: "useHoverCard Hook",
                },
                {
                  type: "Box",
                  className: "bg-gray-100 dark:bg-gray-800 p-3 rounded-md",
                  children: {
                    type: "Text",
                    className: "font-mono text-sm",
                    children: `const { isOpen, openDelay } = useHoverCard({
  openDelay: 200,
  closeDelay: 100,
  onOpenChange: (open) => console.log(open)
});`,
                  },
                },
                {
                  type: "Text",
                  size: "small",
                  variant: "muted",
                  children: "Custom hook for controlling hover card behavior programmatically.",
                },
              ],
            },
          },
        ],
      },
    ],
  };

  // Complete example - GitHub-style user hover card
  const githubExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          {
            type: "CardTitle",
            children: "Recent Contributors",
          },
          {
            type: "CardDescription",
            children: "Hover over a contributor to see their profile",
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "3",
          children: [
            {
              type: "Flex",
              gap: "2",
              wrap: true,
              children: [
                {
                  type: "HoverCard",
                  openDelay: 200,
                  closeDelay: 100,
                  children: [
                    {
                      type: "HoverCardTrigger",
                      children: {
                        type: "Avatar",
                        src: "https://github.com/vercel.png",
                        alt: "Vercel",
                        className: "cursor-pointer",
                      },
                    },
                    {
                      type: "HoverCardContent",
                      className: "w-80",
                      children: {
                        type: "Stack",
                        spacing: "3",
                        children: [
                          {
                            type: "Flex",
                            gap: "3",
                            children: [
                              {
                                type: "Avatar",
                                src: "https://github.com/vercel.png",
                                alt: "Vercel",
                                size: "lg",
                              },
                              {
                                type: "Stack",
                                spacing: "1",
                                children: [
                                  {
                                    type: "Text",
                                    className: "font-semibold",
                                    children: "Vercel",
                                  },
                                  {
                                    type: "Text",
                                    size: "small",
                                    variant: "muted",
                                    children: "vercel",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Text",
                            size: "small",
                            children: "Develop. Preview. Ship. For the best frontend teams.",
                          },
                          {
                            type: "Stack",
                            spacing: "1",
                            className: "text-sm",
                            children: [
                              { type: "Text", children: "📍 Global" },
                              { type: "Text", children: "🔗 vercel.com" },
                              { type: "Text", children: "📊 142 repositories" },
                            ],
                          },
                          {
                            type: "Button",
                            size: "sm",
                            className: "w-full",
                            children: "View Profile",
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: "HoverCard",
                  openDelay: 200,
                  closeDelay: 100,
                  children: [
                    {
                      type: "HoverCardTrigger",
                      children: {
                        type: "Avatar",
                        src: "https://github.com/shadcn.png",
                        alt: "shadcn",
                        className: "cursor-pointer",
                      },
                    },
                    {
                      type: "HoverCardContent",
                      className: "w-80",
                      children: {
                        type: "Stack",
                        spacing: "3",
                        children: [
                          {
                            type: "Flex",
                            gap: "3",
                            children: [
                              {
                                type: "Avatar",
                                src: "https://github.com/shadcn.png",
                                alt: "shadcn",
                                size: "lg",
                              },
                              {
                                type: "Stack",
                                spacing: "1",
                                children: [
                                  {
                                    type: "Text",
                                    className: "font-semibold",
                                    children: "shadcn",
                                  },
                                  {
                                    type: "Text",
                                    size: "small",
                                    variant: "muted",
                                    children: "shadcn",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Text",
                            size: "small",
                            children: "Building things with Next.js and Tailwind CSS.",
                          },
                          {
                            type: "Stack",
                            spacing: "1",
                            className: "text-sm",
                            children: [
                              { type: "Text", children: "📍 UK" },
                              { type: "Text", children: "🔗 shadcn.com" },
                              { type: "Text", children: "📊 12 repositories" },
                            ],
                          },
                          {
                            type: "Button",
                            size: "sm",
                            className: "w-full",
                            children: "View Profile",
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "Text",
              size: "small",
              variant: "muted",
              children: "Last updated 2 hours ago",
            },
          ],
        },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">HoverCard Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A card component that displays rich content when hovering over a trigger element. Perfect for previews, tooltips with complex content, and user information cards.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The HoverCard component provides a floating card that appears when users hover over a trigger element. Unlike tooltips, hover cards can contain rich, interactive content including images, buttons, and complex layouts.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Rich content support with full component composition</li>
                <li>Configurable open and close delays</li>
                <li>Four positioning options (top, right, bottom, left)</li>
                <li>Alignment control (start, center, end)</li>
                <li>Collision detection and automatic repositioning</li>
                <li>Smooth animations and transitions</li>
                <li>Keyboard accessible with proper focus management</li>
                <li>Touch device support with fallback behavior</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple hover card showing user profile information, similar to social media platforms.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Content Types Section */}
          <section id="content-types" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Content Types</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              HoverCard can display various types of content, from simple text to complex layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(contentTypesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(contentTypesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Positioning Section */}
          <section id="positioning" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Positioning</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control where the hover card appears relative to its trigger using the side prop.
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

          {/* Timing Section */}
          <section id="timing" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Timing & Delays</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure open and close delays to optimize the user experience and prevent accidental triggers.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(timingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(timingSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Interactive Examples Section */}
          <section id="interactive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing hover cards for product previews and code documentation.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(interactiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(interactiveSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-8">
              {/* HoverCard Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">HoverCard</h3>
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
                        <td className="py-3 px-4 font-mono">"HoverCard"</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">openDelay</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">200</td>
                        <td className="py-3 px-4">Delay before opening (ms)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">closeDelay</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">0</td>
                        <td className="py-3 px-4">Delay before closing (ms)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultOpen</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Default open state</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">open</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Controlled open state</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onOpenChange</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Event handler ID for state changes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* HoverCardContent Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">HoverCardContent</h3>
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
                        <td className="py-3 px-4 font-mono">"HoverCardContent"</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">side</td>
                        <td className="py-3 px-4 font-mono">"top" | "right" | "bottom" | "left"</td>
                        <td className="py-3 px-4">"bottom"</td>
                        <td className="py-3 px-4">Preferred side to render against</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">sideOffset</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">4</td>
                        <td className="py-3 px-4">Distance in pixels from trigger</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                        <td className="py-3 px-4 font-mono">"start" | "center" | "end"</td>
                        <td className="py-3 px-4">"center"</td>
                        <td className="py-3 px-4">Alignment against the trigger</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">alignOffset</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">0</td>
                        <td className="py-3 px-4">Offset in pixels from alignment</td>
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
              </div>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Full examples demonstrating hover cards in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* GitHub-style example */}
              <div>
                <h3 className="text-lg font-medium mb-3">GitHub-Style User Cards</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(githubExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(githubExampleSpec, null, 2)}
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