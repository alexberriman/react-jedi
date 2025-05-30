import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function FlexShowcase() {
  usePageMetadata({
    title: "Flex Component",
    description:
      "A comprehensive showcase of the React Jedi Flex component with direction, alignment, justification, gap, and wrap options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "direction", label: "Flex Direction" },
    { id: "justify", label: "Justify Content" },
    { id: "align", label: "Align Items" },
    { id: "gap", label: "Gap Spacing" },
    { id: "wrap", label: "Flex Wrap" },
    { id: "responsive", label: "Responsive Flex" },
    { id: "nested", label: "Nested Layouts" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Direction examples
  const directionSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Row (default)" },
          {
            type: "Flex",
            direction: "row",
            gap: "md",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", children: "Item 1" },
              { type: "Badge", children: "Item 2" },
              { type: "Badge", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Row Reverse" },
          {
            type: "Flex",
            direction: "rowReverse",
            gap: "md",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", children: "Item 1" },
              { type: "Badge", children: "Item 2" },
              { type: "Badge", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Column" },
          {
            type: "Flex",
            direction: "column",
            gap: "md",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", children: "Item 1" },
              { type: "Badge", children: "Item 2" },
              { type: "Badge", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Column Reverse" },
          {
            type: "Flex",
            direction: "columnReverse",
            gap: "md",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", children: "Item 1" },
              { type: "Badge", children: "Item 2" },
              { type: "Badge", children: "Item 3" },
            ],
          },
        ],
      },
    ],
  };

  // Justify content examples
  const justifySpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify Start (default)" },
          {
            type: "Flex",
            justify: "start",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[80px]",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "1" },
              { type: "Button", size: "sm", variant: "outline", children: "2" },
              { type: "Button", size: "sm", variant: "outline", children: "3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify End" },
          {
            type: "Flex",
            justify: "end",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[80px]",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "1" },
              { type: "Button", size: "sm", variant: "outline", children: "2" },
              { type: "Button", size: "sm", variant: "outline", children: "3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify Center" },
          {
            type: "Flex",
            justify: "center",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[80px]",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "1" },
              { type: "Button", size: "sm", variant: "outline", children: "2" },
              { type: "Button", size: "sm", variant: "outline", children: "3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify Between" },
          {
            type: "Flex",
            justify: "between",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[80px]",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "1" },
              { type: "Button", size: "sm", variant: "outline", children: "2" },
              { type: "Button", size: "sm", variant: "outline", children: "3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify Around" },
          {
            type: "Flex",
            justify: "around",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[80px]",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "1" },
              { type: "Button", size: "sm", variant: "outline", children: "2" },
              { type: "Button", size: "sm", variant: "outline", children: "3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify Evenly" },
          {
            type: "Flex",
            justify: "evenly",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[80px]",
            children: [
              { type: "Button", size: "sm", variant: "outline", children: "1" },
              { type: "Button", size: "sm", variant: "outline", children: "2" },
              { type: "Button", size: "sm", variant: "outline", children: "3" },
            ],
          },
        ],
      },
    ],
  };

  // Align items examples
  const alignSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Align Start" },
          {
            type: "Flex",
            align: "start",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[120px]",
            children: [
              { type: "Box", className: "bg-blue-500 text-white p-4 rounded", children: { type: "Text", children: "Small" } },
              { type: "Box", className: "bg-blue-500 text-white p-6 rounded", children: { type: "Text", children: "Medium" } },
              { type: "Box", className: "bg-blue-500 text-white p-8 rounded", children: { type: "Text", children: "Large" } },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Align End" },
          {
            type: "Flex",
            align: "end",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[120px]",
            children: [
              { type: "Box", className: "bg-blue-500 text-white p-4 rounded", children: { type: "Text", children: "Small" } },
              { type: "Box", className: "bg-blue-500 text-white p-6 rounded", children: { type: "Text", children: "Medium" } },
              { type: "Box", className: "bg-blue-500 text-white p-8 rounded", children: { type: "Text", children: "Large" } },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Align Center" },
          {
            type: "Flex",
            align: "center",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[120px]",
            children: [
              { type: "Box", className: "bg-blue-500 text-white p-4 rounded", children: { type: "Text", children: "Small" } },
              { type: "Box", className: "bg-blue-500 text-white p-6 rounded", children: { type: "Text", children: "Medium" } },
              { type: "Box", className: "bg-blue-500 text-white p-8 rounded", children: { type: "Text", children: "Large" } },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Align Baseline" },
          {
            type: "Flex",
            align: "baseline",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[120px]",
            children: [
              { type: "Text", size: "small", className: "bg-blue-500 text-white p-2 rounded", children: "Small Text" },
              { type: "Text", size: "medium", className: "bg-blue-500 text-white p-2 rounded", children: "Medium Text" },
              { type: "Text", size: "large", className: "bg-blue-500 text-white p-2 rounded", children: "Large Text" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Align Stretch" },
          {
            type: "Flex",
            align: "stretch",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[120px]",
            children: [
              { type: "Box", className: "bg-blue-500 text-white p-4 rounded", children: { type: "Text", children: "Item 1" } },
              { type: "Box", className: "bg-blue-500 text-white p-4 rounded", children: { type: "Text", children: "Item 2" } },
              { type: "Box", className: "bg-blue-500 text-white p-4 rounded", children: { type: "Text", children: "Item 3" } },
            ],
          },
        ],
      },
    ],
  };

  // Gap spacing examples
  const gapSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "No Gap" },
          {
            type: "Flex",
            gap: "none",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Extra Small Gap (xs)" },
          {
            type: "Flex",
            gap: "xs",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Small Gap (sm)" },
          {
            type: "Flex",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Medium Gap (md)" },
          {
            type: "Flex",
            gap: "md",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Large Gap (lg)" },
          {
            type: "Flex",
            gap: "lg",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Extra Large Gap (xl)" },
          {
            type: "Flex",
            gap: "xl",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Badge", variant: "secondary", children: "Item 1" },
              { type: "Badge", variant: "secondary", children: "Item 2" },
              { type: "Badge", variant: "secondary", children: "Item 3" },
            ],
          },
        ],
      },
    ],
  };

  // Wrap examples
  const wrapSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "No Wrap (default)" },
          {
            type: "Flex",
            wrap: "nowrap",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto",
            children: Array.from({ length: 10 }, (_, i) => ({
              type: "Badge" as const,
              variant: "outline" as const,
              children: `Item ${i + 1}`,
            })),
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Wrap" },
          {
            type: "Flex",
            wrap: "wrap",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: Array.from({ length: 10 }, (_, i) => ({
              type: "Badge" as const,
              variant: "outline" as const,
              children: `Item ${i + 1}`,
            })),
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Wrap Reverse" },
          {
            type: "Flex",
            wrap: "wrapReverse",
            gap: "sm",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: Array.from({ length: 10 }, (_, i) => ({
              type: "Badge" as const,
              variant: "outline" as const,
              children: `Item ${i + 1}`,
            })),
          },
        ],
      },
    ],
  };

  // Responsive flex example
  const responsiveSpec: UISpecification = {
    type: "Box",
    className: "space-y-4",
    children: [
      {
        type: "Text",
        variant: "muted",
        children: "Resize your browser to see responsive behavior",
      },
      {
        type: "Flex",
        className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex-col md:flex-row",
        gap: "md",
        children: [
          {
            type: "Card",
            className: "flex-1",
            children: [
              { type: "CardHeader", children: { type: "CardTitle", children: "Card 1" } },
              { type: "CardContent", children: { type: "Text", children: "This layout stacks on mobile and aligns horizontally on desktop." } },
            ],
          },
          {
            type: "Card",
            className: "flex-1",
            children: [
              { type: "CardHeader", children: { type: "CardTitle", children: "Card 2" } },
              { type: "CardContent", children: { type: "Text", children: "Using Tailwind classes with Flex component." } },
            ],
          },
          {
            type: "Card",
            className: "flex-1",
            children: [
              { type: "CardHeader", children: { type: "CardTitle", children: "Card 3" } },
              { type: "CardContent", children: { type: "Text", children: "Responsive design made easy." } },
            ],
          },
        ],
      },
    ],
  };

  // Nested layouts example
  const nestedSpec: UISpecification = {
    type: "Flex",
    direction: "column",
    gap: "lg",
    className: "bg-gray-100 dark:bg-gray-800 p-6 rounded-lg",
    children: [
      {
        type: "Flex",
        justify: "between",
        align: "center",
        children: [
          { type: "Heading", level: 3, children: "Nested Flex Layout" },
          { type: "Badge", variant: "secondary", children: "Header" },
        ],
      },
      {
        type: "Flex",
        gap: "md",
        className: "flex-col lg:flex-row",
        children: [
          {
            type: "Box",
            className: "flex-1 bg-white dark:bg-gray-900 p-4 rounded",
            children: {
              type: "Flex",
              direction: "column",
              gap: "sm",
              children: [
                { type: "Text", weight: "semibold", children: "Sidebar" },
                { type: "Text", variant: "muted", children: "Navigation items would go here" },
                {
                  type: "Flex",
                  direction: "column",
                  gap: "xs",
                  className: "mt-2",
                  children: [
                    { type: "Button", variant: "ghost", size: "sm", className: "justify-start", children: "Home" },
                    { type: "Button", variant: "ghost", size: "sm", className: "justify-start", children: "About" },
                    { type: "Button", variant: "ghost", size: "sm", className: "justify-start", children: "Contact" },
                  ],
                },
              ],
            },
          },
          {
            type: "Box",
            className: "flex-[2] bg-white dark:bg-gray-900 p-4 rounded",
            children: {
              type: "Flex",
              direction: "column",
              gap: "md",
              children: [
                { type: "Text", weight: "semibold", children: "Main Content" },
                { type: "Text", children: "This demonstrates how Flex components can be nested to create complex layouts." },
                {
                  type: "Flex",
                  gap: "sm",
                  wrap: "wrap",
                  children: [
                    { type: "Badge", children: "Tag 1" },
                    { type: "Badge", children: "Tag 2" },
                    { type: "Badge", children: "Tag 3" },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  };

  // Complete form example with Flex
  const formExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "User Profile Form" },
          { type: "CardDescription", children: "Example of form layout using Flex component" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Flex",
          direction: "column",
          gap: "lg",
          children: [
            {
              type: "Flex",
              gap: "md",
              className: "flex-col sm:flex-row",
              children: [
                {
                  type: "Box",
                  className: "flex-1",
                  children: [
                    { type: "Label", htmlFor: "firstName", children: "First Name" },
                    { type: "Input", id: "firstName", placeholder: "John" },
                  ],
                },
                {
                  type: "Box",
                  className: "flex-1",
                  children: [
                    { type: "Label", htmlFor: "lastName", children: "Last Name" },
                    { type: "Input", id: "lastName", placeholder: "Doe" },
                  ],
                },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "email", children: "Email Address" },
                { type: "Input", id: "email", inputType: "email", placeholder: "john.doe@example.com" },
              ],
            },
            {
              type: "Box",
              children: [
                { type: "Label", htmlFor: "bio", children: "Bio" },
                { type: "Textarea", id: "bio", placeholder: "Tell us about yourself...", rows: 4 },
              ],
            },
            {
              type: "Flex",
              justify: "between",
              align: "center",
              className: "pt-4",
              children: [
                {
                  type: "Flex",
                  gap: "sm",
                  align: "center",
                  children: [
                    { type: "Checkbox", id: "newsletter" },
                    { type: "Label", htmlFor: "newsletter", children: "Subscribe to newsletter" },
                  ],
                },
                {
                  type: "Flex",
                  gap: "sm",
                  children: [
                    { type: "Button", variant: "outline", children: "Cancel" },
                    { type: "Button", variant: "primary", children: "Save Profile" },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Navigation bar example
  const navbarExampleSpec: UISpecification = {
    type: "Box",
    className: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm",
    children: {
      type: "Container",
      padding: "4",
      children: {
        type: "Flex",
        justify: "between",
        align: "center",
        children: [
          {
            type: "Flex",
            align: "center",
            gap: "lg",
            children: [
              { type: "Text", size: "large", weight: "bold", children: "React Jedi" },
              {
                type: "Flex",
                gap: "md",
                className: "hidden md:flex",
                children: [
                  { type: "Button", variant: "ghost", size: "sm", children: "Home" },
                  { type: "Button", variant: "ghost", size: "sm", children: "Features" },
                  { type: "Button", variant: "ghost", size: "sm", children: "Pricing" },
                  { type: "Button", variant: "ghost", size: "sm", children: "About" },
                ],
              },
            ],
          },
          {
            type: "Flex",
            gap: "sm",
            align: "center",
            children: [
              { type: "Button", variant: "ghost", size: "sm", children: "Sign In" },
              { type: "Button", variant: "primary", size: "sm", children: "Get Started" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Flex Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful flexbox layout component that provides flexible one-dimensional layouts with support for direction, alignment, justification, gaps, and wrapping.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Flex component is a fundamental layout primitive in React Jedi that leverages CSS Flexbox to create flexible, responsive layouts. It provides an intuitive API for controlling flex direction, alignment, justification, gaps, and wrapping behavior.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Four direction options (row, row-reverse, column, column-reverse)</li>
                <li>Six justification options for main axis alignment</li>
                <li>Five alignment options for cross axis alignment</li>
                <li>Six predefined gap sizes from none to extra large</li>
                <li>Three wrap behaviors (nowrap, wrap, wrap-reverse)</li>
                <li>Fully responsive with Tailwind utility classes</li>
                <li>Composable with other React Jedi components</li>
              </ul>
            </div>
          </section>

          {/* Direction Section */}
          <section id="direction" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Flex Direction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the main axis and direction of flex items with the direction prop.
            </p>
            <div className="space-y-6">
              {render(directionSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(directionSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Justify Section */}
          <section id="justify" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Justify Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Align flex items along the main axis using the justify prop.
            </p>
            <div className="space-y-6">
              {render(justifySpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(justifySpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Align Section */}
          <section id="align" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Align Items</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Align flex items along the cross axis using the align prop.
            </p>
            <div className="space-y-6">
              {render(alignSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Gap Section */}
          <section id="gap" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Gap Spacing</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the spacing between flex items using the gap prop.
            </p>
            <div className="space-y-6">
              {render(gapSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(gapSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Wrap Section */}
          <section id="wrap" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Flex Wrap</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control how flex items wrap when they overflow the container.
            </p>
            <div className="space-y-6">
              {render(wrapSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(wrapSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Responsive Section */}
          <section id="responsive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Flex</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create responsive layouts by combining Flex with Tailwind utility classes.
            </p>
            <div>
              {render(responsiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(responsiveSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Nested Layouts Section */}
          <section id="nested" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Flex components can be nested to create complex, multi-level layouts.
            </p>
            <div>
              {render(nestedSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(nestedSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Flex&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">direction</td>
                    <td className="py-3 px-4 font-mono">&quot;row&quot; | &quot;rowReverse&quot; | &quot;column&quot; | &quot;columnReverse&quot;</td>
                    <td className="py-3 px-4">&quot;row&quot;</td>
                    <td className="py-3 px-4">The direction of the flex container</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">justify</td>
                    <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;end&quot; | &quot;center&quot; | &quot;between&quot; | &quot;around&quot; | &quot;evenly&quot;</td>
                    <td className="py-3 px-4">&quot;start&quot;</td>
                    <td className="py-3 px-4">Alignment along the main axis</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                    <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;end&quot; | &quot;center&quot; | &quot;baseline&quot; | &quot;stretch&quot;</td>
                    <td className="py-3 px-4">&quot;start&quot;</td>
                    <td className="py-3 px-4">Alignment along the cross axis</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">gap</td>
                    <td className="py-3 px-4 font-mono">&quot;none&quot; | &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot;</td>
                    <td className="py-3 px-4">&quot;none&quot;</td>
                    <td className="py-3 px-4">Spacing between flex items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">wrap</td>
                    <td className="py-3 px-4 font-mono">&quot;nowrap&quot; | &quot;wrap&quot; | &quot;wrapReverse&quot;</td>
                    <td className="py-3 px-4">&quot;nowrap&quot;</td>
                    <td className="py-3 px-4">Whether flex items should wrap</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec | ComponentSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Child components to render</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples demonstrating Flex component usage.
            </p>
            
            <div className="space-y-8">
              {/* Form Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Form Layout with Flex</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(formExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(formExampleSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Navigation Bar Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Navigation Bar with Flex</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(navbarExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(navbarExampleSpec, null, 2)}
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