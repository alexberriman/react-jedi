import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function CardShowcase() {
  usePageMetadata({
    title: "Card Component",
    description:
      "A comprehensive showcase of the React Jedi Card component with all variations, compositions, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Cards" },
    { id: "with-header", label: "Cards with Headers" },
    { id: "with-footer", label: "Cards with Footers" },
    { id: "complete", label: "Complete Cards" },
    { id: "interactive", label: "Interactive Cards" },
    { id: "layouts", label: "Card Layouts" },
    { id: "complex", label: "Complex Examples" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Real-World Examples" },
  ];

  // Basic card specification
  const basicCardSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        children: {
          type: "CardContent",
          children: {
            type: "Text",
            children: "This is a basic card with only content. Simple and clean.",
          },
        },
      },
      {
        type: "Card",
        className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
        children: {
          type: "CardContent",
          children: {
            type: "Text",
            children: "Card with custom background and border colors.",
          },
        },
      },
      {
        type: "Card",
        className: "shadow-xl",
        children: {
          type: "CardContent",
          children: {
            type: "Text",
            children: "Card with enhanced shadow for more depth.",
          },
        },
      },
    ],
  };

  // Cards with headers
  const headerCardSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: {
              type: "CardTitle",
              children: "Card Title",
            },
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "Card content goes here. This card has a title but no description.",
            },
          },
        ],
      },
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Card with Description",
              },
              {
                type: "CardDescription",
                children: "This subtitle provides additional context about the card content.",
              },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "Main content area with both title and description in the header.",
            },
          },
        ],
      },
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "Flex",
                justify: "between",
                align: "start",
                children: [
                  {
                    type: "Box",
                    children: [
                      {
                        type: "CardTitle",
                        children: "Card with Action",
                      },
                      {
                        type: "CardDescription",
                        children: "Header includes an action button",
                      },
                    ],
                  },
                  {
                    type: "Button",
                    size: "sm",
                    variant: "outline",
                    children: "Action",
                  },
                ],
              },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "Content area with action button in the header.",
            },
          },
        ],
      },
    ],
  };

  // Cards with footers
  const footerCardSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        children: [
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "Card content with a simple footer below.",
            },
          },
          {
            type: "CardFooter",
            children: {
              type: "Text",
              size: "small",
              variant: "muted",
              children: "Footer text",
            },
          },
        ],
      },
      {
        type: "Card",
        children: [
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "Card with action buttons in the footer.",
            },
          },
          {
            type: "CardFooter",
            className: "flex gap-2",
            children: [
              {
                type: "Button",
                variant: "outline",
                size: "sm",
                children: "Cancel",
              },
              {
                type: "Button",
                variant: "primary",
                size: "sm",
                children: "Save",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        children: [
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "Card with justified footer content.",
            },
          },
          {
            type: "CardFooter",
            className: "justify-between",
            children: [
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Last updated: 2 hours ago",
              },
              {
                type: "Button",
                variant: "ghost",
                size: "sm",
                children: "View Details →",
              },
            ],
          },
        ],
      },
    ],
  };

  // Complete cards
  const completeCardSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Complete Card Example",
              },
              {
                type: "CardDescription",
                children: "This card includes all sections: header, content, and footer.",
              },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children:
                "The main content area can contain any type of content including text, images, forms, or other components. Cards provide a flexible container for grouping related information.",
            },
          },
          {
            type: "CardFooter",
            children: {
              type: "Text",
              size: "small",
              variant: "muted",
              children: "Card footer with additional information",
            },
          },
        ],
      },
    ],
  };

  // Interactive cards
  const interactiveCardSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        className: "hover:shadow-lg transition-shadow cursor-pointer",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "Clickable Card",
              },
              {
                type: "CardDescription",
                children: "Hover to see the shadow effect",
              },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Text",
              children: "This entire card is clickable and shows a hover effect.",
            },
          },
        ],
      },
      {
        type: "Card",
        children: [
          {
            type: "CardHeader",
            children: {
              type: "CardTitle",
              children: "Card with Form",
            },
          },
          {
            type: "CardContent",
            children: {
              type: "Stack",
              spacing: "4",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Label",
                      htmlFor: "email",
                      children: "Email",
                    },
                    {
                      type: "Input",
                      id: "email",
                      inputType: "email",
                      placeholder: "Enter your email",
                    },
                  ],
                },
                {
                  type: "Box",
                  children: [
                    {
                      type: "Label",
                      htmlFor: "message",
                      children: "Message",
                    },
                    {
                      type: "Textarea",
                      id: "message",
                      placeholder: "Type your message here",
                      rows: 4,
                    },
                  ],
                },
              ],
            },
          },
          {
            type: "CardFooter",
            children: {
              type: "Button",
              variant: "primary",
              className: "w-full",
              children: "Send Message",
            },
          },
        ],
      },
    ],
  };

  // Card layouts
  const layoutsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "SimpleGrid",
        columns: 3,
        spacing: "4",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: {
                  type: "CardTitle",
                  children: "Card 1",
                },
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  children: "Grid layout with equal-width cards.",
                },
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: {
                  type: "CardTitle",
                  children: "Card 2",
                },
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  children: "Perfect for feature sections.",
                },
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: {
                  type: "CardTitle",
                  children: "Card 3",
                },
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  children: "Responsive grid adjusts on mobile.",
                },
              },
            ],
          },
        ],
      },
      {
        type: "Flex",
        gap: "4",
        wrap: true,
        children: [
          {
            type: "Card",
            className: "flex-1 min-w-[250px]",
            children: [
              {
                type: "CardHeader",
                children: {
                  type: "CardTitle",
                  children: "Flexible Card 1",
                },
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  children: "Cards in a flex container with wrapping.",
                },
              },
            ],
          },
          {
            type: "Card",
            className: "flex-1 min-w-[250px]",
            children: [
              {
                type: "CardHeader",
                children: {
                  type: "CardTitle",
                  children: "Flexible Card 2",
                },
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  children: "They grow to fill available space.",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  // Complex examples
  const userProfileSpec: UISpecification = {
    type: "Card",
    className: "max-w-md",
    children: [
      {
        type: "CardHeader",
        children: {
          type: "Flex",
          align: "center",
          gap: "4",
          children: [
            {
              type: "Avatar",
              src: "https://github.com/shadcn.png",
              alt: "User avatar",
              fallback: "JD",
              size: "lg",
            },
            {
              type: "Box",
              children: [
                {
                  type: "CardTitle",
                  children: "Jane Doe",
                },
                {
                  type: "CardDescription",
                  children: "jane.doe@example.com",
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Text",
              children:
                "Senior Software Engineer with 10+ years of experience in building scalable web applications.",
            },
            {
              type: "Flex",
              gap: "4",
              children: [
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-semibold",
                      children: "Location",
                    },
                    {
                      type: "Text",
                      size: "small",
                      variant: "muted",
                      children: "San Francisco, CA",
                    },
                  ],
                },
                {
                  type: "Box",
                  children: [
                    {
                      type: "Text",
                      className: "font-semibold",
                      children: "Joined",
                    },
                    {
                      type: "Text",
                      size: "small",
                      variant: "muted",
                      children: "March 2020",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        className: "gap-2",
        children: [
          {
            type: "Button",
            variant: "outline",
            size: "sm",
            className: "flex-1",
            children: "Message",
          },
          {
            type: "Button",
            variant: "primary",
            size: "sm",
            className: "flex-1",
            children: "Follow",
          },
        ],
      },
    ],
  };

  const pricingCardSpec: UISpecification = {
    type: "Card",
    className: "max-w-sm",
    children: [
      {
        type: "CardHeader",
        className: "text-center",
        children: [
          {
            type: "CardTitle",
            className: "text-2xl",
            children: "Pro Plan",
          },
          {
            type: "CardDescription",
            children: "Perfect for growing teams",
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "6",
          children: [
            {
              type: "Box",
              className: "text-center",
              children: [
                {
                  type: "Text",
                  className: "text-4xl font-bold",
                  children: "$49",
                },
                {
                  type: "Text",
                  variant: "muted",
                  children: "per month",
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                {
                  type: "Flex",
                  gap: "2",
                  align: "center",
                  children: [
                    {
                      type: "Text",
                      className: "text-green-600",
                      children: "✓",
                    },
                    {
                      type: "Text",
                      children: "Unlimited projects",
                    },
                  ],
                },
                {
                  type: "Flex",
                  gap: "2",
                  align: "center",
                  children: [
                    {
                      type: "Text",
                      className: "text-green-600",
                      children: "✓",
                    },
                    {
                      type: "Text",
                      children: "Advanced analytics",
                    },
                  ],
                },
                {
                  type: "Flex",
                  gap: "2",
                  align: "center",
                  children: [
                    {
                      type: "Text",
                      className: "text-green-600",
                      children: "✓",
                    },
                    {
                      type: "Text",
                      children: "24/7 Priority support",
                    },
                  ],
                },
                {
                  type: "Flex",
                  gap: "2",
                  align: "center",
                  children: [
                    {
                      type: "Text",
                      className: "text-green-600",
                      children: "✓",
                    },
                    {
                      type: "Text",
                      children: "Custom integrations",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        children: {
          type: "Button",
          variant: "primary",
          className: "w-full",
          size: "lg",
          children: "Get Started",
        },
      },
    ],
  };

  const statsCardSpec: UISpecification = {
    type: "SimpleGrid",
    columns: 4,
    spacing: "4",
    children: [
      {
        type: "Card",
        children: {
          type: "CardContent",
          className: "pt-6",
          children: {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Total Revenue",
              },
              {
                type: "Text",
                className: "text-2xl font-bold",
                children: "$45,231.89",
              },
              {
                type: "Text",
                size: "small",
                className: "text-green-600",
                children: "+20.1% from last month",
              },
            ],
          },
        },
      },
      {
        type: "Card",
        children: {
          type: "CardContent",
          className: "pt-6",
          children: {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Subscriptions",
              },
              {
                type: "Text",
                className: "text-2xl font-bold",
                children: "+2,350",
              },
              {
                type: "Text",
                size: "small",
                className: "text-green-600",
                children: "+180.1% from last month",
              },
            ],
          },
        },
      },
      {
        type: "Card",
        children: {
          type: "CardContent",
          className: "pt-6",
          children: {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Sales",
              },
              {
                type: "Text",
                className: "text-2xl font-bold",
                children: "+12,234",
              },
              {
                type: "Text",
                size: "small",
                className: "text-green-600",
                children: "+19% from last month",
              },
            ],
          },
        },
      },
      {
        type: "Card",
        children: {
          type: "CardContent",
          className: "pt-6",
          children: {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Active Now",
              },
              {
                type: "Text",
                className: "text-2xl font-bold",
                children: "+573",
              },
              {
                type: "Text",
                size: "small",
                className: "text-red-600",
                children: "-4% from last hour",
              },
            ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Card Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile container component for grouping and displaying content. Cards provide a
              clean way to organize information with optional header, content, and footer sections.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Card component is a fundamental building block in React Jedi. It provides a
                flexible container that can be composed with CardHeader, CardTitle, CardDescription,
                CardContent, and CardFooter to create various layouts and designs.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Flexible composition with header, content, and footer sections</li>
                <li>Clean, modern design with subtle shadows and borders</li>
                <li>Fully responsive and adapts to container width</li>
                <li>Dark mode support out of the box</li>
                <li>Customizable with className prop</li>
                <li>Semantic HTML structure</li>
                <li>Perfect for forms, profiles, stats, and content groups</li>
              </ul>
            </div>
          </section>

          {/* Basic Cards Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Cards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Simple card examples with content only, showing different styling options.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicCardSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicCardSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Cards with Headers Section */}
          <section id="with-header" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Cards with Headers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Cards can include headers with titles, descriptions, and actions.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(headerCardSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(headerCardSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Cards with Footers Section */}
          <section id="with-footer" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Cards with Footers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add footers to cards for actions, metadata, or additional information.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(footerCardSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(footerCardSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Complete Cards Section */}
          <section id="complete" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Cards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Full card examples with all sections: header, content, and footer.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(completeCardSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(completeCardSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Interactive Cards Section */}
          <section id="interactive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Interactive Cards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Cards can be interactive with hover effects, forms, and actions.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(interactiveCardSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(interactiveCardSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Card Layouts Section */}
          <section id="layouts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Card Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Cards work great in grid and flex layouts for creating responsive designs.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(layoutsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(layoutsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Complex Examples Section */}
          <section id="complex" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complex Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Advanced card compositions for real-world use cases.
            </p>

            <div className="space-y-8">
              {/* User Profile Card */}
              <div>
                <h3 className="text-lg font-medium mb-3">User Profile Card</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(userProfileSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(userProfileSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Pricing Card */}
              <div>
                <h3 className="text-lg font-medium mb-3">Pricing Card</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(pricingCardSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(pricingCardSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Stats Cards */}
              <div>
                <h3 className="text-lg font-medium mb-3">Dashboard Stats Cards</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(statsCardSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(statsCardSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-6">
              {/* Card Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Card Component</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;Card&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                          children
                        </td>
                        <td className="py-3 px-4 font-mono">ComponentSpec | ComponentSpec[]</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Card content (typically CardHeader, CardContent, CardFooter)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                          className
                        </td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CardHeader Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">CardHeader Component</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;CardHeader&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                          children
                        </td>
                        <td className="py-3 px-4 font-mono">ComponentSpec | ComponentSpec[]</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Header content (typically CardTitle and CardDescription)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                          className
                        </td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Other Card Components */}
              <div>
                <h3 className="text-lg font-medium mb-3">Other Card Components</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  All card sub-components (CardTitle, CardDescription, CardContent, CardFooter) follow the same pattern:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>
                    <code className="font-mono text-blue-600 dark:text-blue-400">type</code>: Component identifier (e.g., &quot;CardTitle&quot;, &quot;CardContent&quot;)
                  </li>
                  <li>
                    <code className="font-mono text-blue-600 dark:text-blue-400">children</code>: Content to display (string or components)
                  </li>
                  <li>
                    <code className="font-mono text-blue-600 dark:text-blue-400">className</code>: Optional CSS classes for styling
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how Cards are used in actual applications.
            </p>

            <div className="space-y-8">
              {/* Blog Post Card */}
              <div>
                <h3 className="text-lg font-medium mb-3">Blog Post Card</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Card",
                    className: "max-w-2xl hover:shadow-lg transition-shadow cursor-pointer",
                    children: [
                      {
                        type: "Image",
                        src: "https://placehold.co/800x400/EEE/31343C",
                        alt: "Blog post cover",
                        className: "w-full h-48 object-cover rounded-t-lg",
                      },
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "Flex",
                            gap: "2",
                            className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                            children: [
                              {
                                type: "Badge",
                                variant: "secondary",
                                children: "Technology",
                              },
                              {
                                type: "Text",
                                children: "5 min read",
                              },
                            ],
                          },
                          {
                            type: "CardTitle",
                            className: "text-xl",
                            children: "Building Modern Web Applications with React Jedi",
                          },
                          {
                            type: "CardDescription",
                            children: "Learn how to leverage the power of server-driven UI to create dynamic, maintainable applications.",
                          },
                        ],
                      },
                      {
                        type: "CardFooter",
                        className: "justify-between",
                        children: [
                          {
                            type: "Flex",
                            align: "center",
                            gap: "2",
                            children: [
                              {
                                type: "Avatar",
                                src: "https://github.com/shadcn.png",
                                alt: "Author",
                                size: "sm",
                                fallback: "AB",
                              },
                              {
                                type: "Box",
                                children: [
                                  {
                                    type: "Text",
                                    className: "text-sm font-medium",
                                    children: "Alex Brown",
                                  },
                                  {
                                    type: "Text",
                                    size: "small",
                                    variant: "muted",
                                    children: "March 15, 2024",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Button",
                            variant: "ghost",
                            size: "sm",
                            children: "Read More →",
                          },
                        ],
                      },
                    ],
                  })}
                </div>
              </div>

              {/* Settings Card */}
              <div>
                <h3 className="text-lg font-medium mb-3">Settings Card</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Card",
                    children: [
                      {
                        type: "CardHeader",
                        children: [
                          {
                            type: "CardTitle",
                            children: "Notifications",
                          },
                          {
                            type: "CardDescription",
                            children: "Configure how you receive notifications.",
                          },
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
                              children: [
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Text",
                                      className: "font-medium",
                                      children: "Email Notifications",
                                    },
                                    {
                                      type: "Text",
                                      size: "small",
                                      variant: "muted",
                                      children: "Receive notifications via email",
                                    },
                                  ],
                                },
                                {
                                  type: "Switch",
                                  defaultChecked: true,
                                },
                              ],
                            },
                            {
                              type: "Separator",
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
                                      className: "font-medium",
                                      children: "Push Notifications",
                                    },
                                    {
                                      type: "Text",
                                      size: "small",
                                      variant: "muted",
                                      children: "Receive push notifications on your device",
                                    },
                                  ],
                                },
                                {
                                  type: "Switch",
                                },
                              ],
                            },
                            {
                              type: "Separator",
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
                                      className: "font-medium",
                                      children: "Weekly Digest",
                                    },
                                    {
                                      type: "Text",
                                      size: "small",
                                      variant: "muted",
                                      children: "Get a weekly summary of your activity",
                                    },
                                  ],
                                },
                                {
                                  type: "Switch",
                                  defaultChecked: true,
                                },
                              ],
                            },
                          ],
                        },
                      },
                      {
                        type: "CardFooter",
                        children: {
                          type: "Button",
                          variant: "primary",
                          children: "Save Preferences",
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