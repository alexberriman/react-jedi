import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function GroupShowcase() {
  usePageMetadata({
    title: "Group Component",
    description:
      "A comprehensive showcase of the React Jedi Group component for arranging inline elements horizontally with consistent spacing.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "spacing", label: "Spacing Options" },
    { id: "alignment", label: "Alignment" },
    { id: "justify", label: "Justification" },
    { id: "wrap", label: "Wrap Behavior" },
    { id: "grow", label: "Growth Options" },
    { id: "fullwidth", label: "Full Width" },
    { id: "responsive", label: "Responsive Groups" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Spacing examples
  const spacingSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "No Spacing" },
          {
            type: "Group",
            spacing: "none",
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
          { type: "Text", variant: "label", children: "Extra Small (xs)" },
          {
            type: "Group",
            spacing: "xs",
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
          { type: "Text", variant: "label", children: "Small (sm)" },
          {
            type: "Group",
            spacing: "sm",
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
          { type: "Text", variant: "label", children: "Medium (md) - default" },
          {
            type: "Group",
            spacing: "md",
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
          { type: "Text", variant: "label", children: "Large (lg)" },
          {
            type: "Group",
            spacing: "lg",
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
          { type: "Text", variant: "label", children: "Extra Large (xl)" },
          {
            type: "Group",
            spacing: "xl",
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
          { type: "Text", variant: "label", children: "2X Large (2xl)" },
          {
            type: "Group",
            spacing: "2xl",
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

  // Alignment examples
  const alignmentSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Align Start" },
          {
            type: "Group",
            align: "start",
            spacing: "md",
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
          { type: "Text", variant: "label", children: "Align Center (default)" },
          {
            type: "Group",
            align: "center",
            spacing: "md",
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
            type: "Group",
            align: "end",
            spacing: "md",
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
            type: "Group",
            align: "baseline",
            spacing: "md",
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
            type: "Group",
            align: "stretch",
            spacing: "md",
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

  // Justification examples
  const justifySpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Justify Start (default)" },
          {
            type: "Group",
            justify: "start",
            spacing: "sm",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
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
            type: "Group",
            justify: "center",
            spacing: "sm",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
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
            type: "Group",
            justify: "end",
            spacing: "sm",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
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
            type: "Group",
            justify: "between",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
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
            type: "Group",
            justify: "around",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
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
            type: "Group",
            justify: "evenly",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
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

  // Wrap examples
  const wrapSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "No Wrap" },
          {
            type: "Group",
            wrap: "nowrap",
            spacing: "sm",
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
          { type: "Text", variant: "label", children: "Wrap (default)" },
          {
            type: "Group",
            wrap: "wrap",
            spacing: "sm",
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
            type: "Group",
            wrap: "wrap-reverse",
            spacing: "sm",
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

  // Growth options examples
  const growthSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Without Grow (default)" },
          {
            type: "Group",
            spacing: "md",
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Input", placeholder: "First input" },
              { type: "Input", placeholder: "Second input" },
              { type: "Button", children: "Submit" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "With Grow" },
          {
            type: "Group",
            spacing: "md",
            grow: true,
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Input", placeholder: "First input" },
              { type: "Input", placeholder: "Second input" },
              { type: "Button", children: "Submit" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "With Prevent Grow" },
          {
            type: "Group",
            spacing: "md",
            preventGrow: true,
            fullWidth: true,
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: [
              { type: "Input", placeholder: "First input", className: "flex-1" },
              { type: "Input", placeholder: "Second input", className: "flex-1" },
              { type: "Button", children: "Submit" },
            ],
          },
        ],
      },
    ],
  };

  // Full width examples
  const fullWidthSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Inline Group (default)" },
          {
            type: "Box",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: {
              type: "Group",
              spacing: "sm",
              children: [
                { type: "Badge", children: "Inline" },
                { type: "Badge", children: "Group" },
                { type: "Badge", children: "Example" },
              ],
            },
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", variant: "label", children: "Full Width Group" },
          {
            type: "Box",
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
            children: {
              type: "Group",
              spacing: "sm",
              fullWidth: true,
              justify: "between",
              children: [
                { type: "Badge", children: "Full" },
                { type: "Badge", children: "Width" },
                { type: "Badge", children: "Group" },
              ],
            },
          },
        ],
      },
    ],
  };

  // Responsive group example
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
        type: "Group",
        spacing: "md",
        className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex-col sm:flex-row",
        fullWidth: true,
        children: [
          {
            type: "Card",
            className: "flex-1",
            children: [
              { type: "CardHeader", children: { type: "CardTitle", children: "Card 1" } },
              { type: "CardContent", children: { type: "Text", children: "Groups can be responsive with Tailwind classes." } },
            ],
          },
          {
            type: "Card",
            className: "flex-1",
            children: [
              { type: "CardHeader", children: { type: "CardTitle", children: "Card 2" } },
              { type: "CardContent", children: { type: "Text", children: "Stack vertically on mobile, horizontally on desktop." } },
            ],
          },
        ],
      },
    ],
  };

  // Button toolbar example
  const buttonToolbarSpec: UISpecification = {
    type: "Card",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Text Editor Toolbar" },
          { type: "CardDescription", children: "Group component for creating toolbars" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Group",
              spacing: "xs",
              children: [
                { type: "Button", variant: "outline", size: "sm", children: "B" },
                { type: "Button", variant: "outline", size: "sm", children: "I" },
                { type: "Button", variant: "outline", size: "sm", children: "U" },
                { type: "Separator", orientation: "vertical", className: "h-6" },
                { type: "Button", variant: "outline", size: "sm", children: "Left" },
                { type: "Button", variant: "outline", size: "sm", children: "Center" },
                { type: "Button", variant: "outline", size: "sm", children: "Right" },
                { type: "Separator", orientation: "vertical", className: "h-6" },
                { type: "Button", variant: "outline", size: "sm", children: "Link" },
                { type: "Button", variant: "outline", size: "sm", children: "Image" },
              ],
            },
            {
              type: "Textarea",
              placeholder: "Start typing...",
              rows: 5,
              className: "mt-2",
            },
          ],
        },
      },
    ],
  };

  // Tag list example
  const tagListSpec: UISpecification = {
    type: "Card",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Article Tags" },
          { type: "CardDescription", children: "Using Group for tag displays" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Text",
              variant: "label",
              children: "Categories:",
            },
            {
              type: "Group",
              spacing: "sm",
              wrap: "wrap",
              children: [
                { type: "Badge", variant: "secondary", children: "React" },
                { type: "Badge", variant: "secondary", children: "TypeScript" },
                { type: "Badge", variant: "secondary", children: "Server-Driven UI" },
                { type: "Badge", variant: "secondary", children: "Component Library" },
                { type: "Badge", variant: "secondary", children: "Frontend" },
                { type: "Badge", variant: "secondary", children: "Web Development" },
                { type: "Badge", variant: "secondary", children: "JSON Schema" },
                { type: "Badge", variant: "secondary", children: "UI Framework" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Social links example
  const socialLinksSpec: UISpecification = {
    type: "Card",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Connect With Us" },
          { type: "CardDescription", children: "Group component for social links" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Group",
          spacing: "md",
          align: "center",
          children: [
            { type: "Button", variant: "outline", size: "icon", children: "f" },
            { type: "Button", variant: "outline", size: "icon", children: "t" },
            { type: "Button", variant: "outline", size: "icon", children: "in" },
            { type: "Button", variant: "outline", size: "icon", children: "ig" },
            { type: "Separator", orientation: "vertical", className: "h-8" },
            { type: "Text", variant: "muted", children: "Follow us on social media" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Group Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible component for arranging inline elements horizontally with consistent spacing, perfect for creating toolbars, button groups, tag lists, and more.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Group component is designed for arranging inline elements in a horizontal layout with consistent spacing. Unlike the Flex component which provides full flexbox control, Group is optimized for common inline patterns like button groups, tag lists, and toolbars.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Seven predefined spacing options from none to 2xl</li>
                <li>Five alignment options for vertical positioning</li>
                <li>Six justification options for horizontal distribution</li>
                <li>Flexible wrap behavior with three options</li>
                <li>Growth control for child elements</li>
                <li>Full width display option</li>
                <li>Lightweight alternative to Flex for inline layouts</li>
              </ul>
              <h3 className="text-lg font-medium mt-4 mb-2">When to Use Group vs Flex</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use <strong>Group</strong> for inline element arrangements (buttons, badges, tags)</li>
                <li>Use <strong>Flex</strong> for complex layouts requiring full flexbox control</li>
                <li>Group defaults to horizontal layout with center alignment</li>
                <li>Group is optimized for common UI patterns like toolbars and tag lists</li>
              </ul>
            </div>
          </section>

          {/* Spacing Section */}
          <section id="spacing" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Spacing Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the space between group items with the spacing prop.
            </p>
            <div className="space-y-6">
              {render(spacingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(spacingSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Alignment Section */}
          <section id="alignment" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Alignment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Align items vertically within the group using the align prop.
            </p>
            <div className="space-y-6">
              {render(alignmentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(alignmentSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Justification Section */}
          <section id="justify" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Justification</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Distribute items horizontally within the group using the justify prop. Note: This works best with fullWidth enabled.
            </p>
            <div className="space-y-6">
              {render(justifySpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(justifySpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Wrap Section */}
          <section id="wrap" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Wrap Behavior</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control how items wrap when they exceed the container width.
            </p>
            <div className="space-y-6">
              {render(wrapSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(wrapSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Growth Options Section */}
          <section id="grow" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Growth Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control whether child elements grow to fill available space.
            </p>
            <div className="space-y-6">
              {render(growthSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(growthSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Full Width Section */}
          <section id="fullwidth" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Full Width</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control whether the group displays as an inline element or full-width block.
            </p>
            <div className="space-y-6">
              {render(fullWidthSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(fullWidthSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Responsive Section */}
          <section id="responsive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create responsive layouts by combining Group with Tailwind utility classes.
            </p>
            <div>
              {render(responsiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(responsiveSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Group&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">spacing</td>
                    <td className="py-3 px-4 font-mono">&quot;none&quot; | &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot;</td>
                    <td className="py-3 px-4">&quot;md&quot;</td>
                    <td className="py-3 px-4">The spacing between child elements</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                    <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;center&quot; | &quot;end&quot; | &quot;baseline&quot; | &quot;stretch&quot;</td>
                    <td className="py-3 px-4">&quot;center&quot;</td>
                    <td className="py-3 px-4">How children align vertically</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">justify</td>
                    <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;center&quot; | &quot;end&quot; | &quot;between&quot; | &quot;around&quot; | &quot;evenly&quot;</td>
                    <td className="py-3 px-4">&quot;start&quot;</td>
                    <td className="py-3 px-4">How children are distributed horizontally</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">wrap</td>
                    <td className="py-3 px-4 font-mono">&quot;wrap&quot; | &quot;nowrap&quot; | &quot;wrap-reverse&quot;</td>
                    <td className="py-3 px-4">&quot;wrap&quot;</td>
                    <td className="py-3 px-4">Whether child elements can wrap to the next line</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">grow</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether child elements should grow to fill available space</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">preventGrow</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Prevents individual child elements from growing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">fullWidth</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the group should display as a full-width block element</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">as</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;div&quot;</td>
                    <td className="py-3 px-4">The HTML element to render as</td>
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
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Child components to render in the group</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples demonstrating common Group component patterns.
            </p>
            
            <div className="space-y-8">
              {/* Button Toolbar Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Button Toolbar</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(buttonToolbarSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(buttonToolbarSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Tag List Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Tag List</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(tagListSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(tagListSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Social Links Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Social Links</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(socialLinksSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(socialLinksSpec, null, 2)}
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