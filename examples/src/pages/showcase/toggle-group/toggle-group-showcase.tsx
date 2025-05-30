import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ToggleGroupShowcase() {
  usePageMetadata({
    title: "ToggleGroup Component",
    description:
      "A group of toggle buttons that work together with single or multiple selection modes. Perfect for toolbars, filters, and multi-option controls.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "selection-types", label: "Selection Types" },
    { id: "variants", label: "Visual Variants" },
    { id: "sizes", label: "Size Options" },
    { id: "states", label: "States & Disabled" },
    { id: "text-formatting", label: "Text Formatting Example" },
    { id: "alignment-controls", label: "Alignment Controls" },
    { id: "view-options", label: "View Options" },
    { id: "filter-controls", label: "Filter Controls" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic toggle group specification
  const basicSpec: UISpecification = {
    type: "ToggleGroup",
    selectionType: "single",
    defaultValue: "center",
    children: [
      { type: "ToggleGroupItem", value: "left", children: "Left" },
      { type: "ToggleGroupItem", value: "center", children: "Center" },
      { type: "ToggleGroupItem", value: "right", children: "Right" },
    ],
  };

  // Selection types specifications
  const singleSelectionSpec: UISpecification = {
    type: "ToggleGroup",
    selectionType: "single",
    defaultValue: "bold",
    variant: "outline",
    children: [
      { type: "ToggleGroupItem", value: "bold", children: "𝐁", ariaLabel: "Bold" },
      { type: "ToggleGroupItem", value: "italic", children: "𝐼", ariaLabel: "Italic" },
      { type: "ToggleGroupItem", value: "underline", children: "U̲", ariaLabel: "Underline" },
    ],
  };

  const multipleSelectionSpec: UISpecification = {
    type: "ToggleGroup",
    selectionType: "multiple",
    defaultValue: ["bold", "italic"],
    variant: "outline",
    children: [
      { type: "ToggleGroupItem", value: "bold", children: "𝐁", ariaLabel: "Bold" },
      { type: "ToggleGroupItem", value: "italic", children: "𝐼", ariaLabel: "Italic" },
      { type: "ToggleGroupItem", value: "underline", children: "U̲", ariaLabel: "Underline" },
      { type: "ToggleGroupItem", value: "strikethrough", children: "S̶", ariaLabel: "Strikethrough" },
    ],
  };

  // Variants specification
  const variantsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Default Variant" },
          {
            type: "ToggleGroup",
            variant: "default",
            defaultValue: "center",
            children: [
              { type: "ToggleGroupItem", value: "left", children: "⬅" },
              { type: "ToggleGroupItem", value: "center", children: "↔" },
              { type: "ToggleGroupItem", value: "right", children: "➡" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Outline Variant" },
          {
            type: "ToggleGroup",
            variant: "outline",
            defaultValue: "center",
            children: [
              { type: "ToggleGroupItem", value: "left", children: "⬅" },
              { type: "ToggleGroupItem", value: "center", children: "↔" },
              { type: "ToggleGroupItem", value: "right", children: "➡" },
            ],
          },
        ],
      },
    ],
  };

  // Sizes specification
  const sizesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Small Size" },
          {
            type: "ToggleGroup",
            variant: "outline",
            size: "sm",
            defaultValue: "bold",
            children: [
              { type: "ToggleGroupItem", value: "bold", children: "𝐁" },
              { type: "ToggleGroupItem", value: "italic", children: "𝐼" },
              { type: "ToggleGroupItem", value: "underline", children: "U̲" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Default Size" },
          {
            type: "ToggleGroup",
            variant: "outline",
            size: "default",
            defaultValue: "bold",
            children: [
              { type: "ToggleGroupItem", value: "bold", children: "𝐁" },
              { type: "ToggleGroupItem", value: "italic", children: "𝐼" },
              { type: "ToggleGroupItem", value: "underline", children: "U̲" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Large Size" },
          {
            type: "ToggleGroup",
            variant: "outline",
            size: "lg",
            defaultValue: "bold",
            children: [
              { type: "ToggleGroupItem", value: "bold", children: "𝐁" },
              { type: "ToggleGroupItem", value: "italic", children: "𝐼" },
              { type: "ToggleGroupItem", value: "underline", children: "U̲" },
            ],
          },
        ],
      },
    ],
  };

  // States specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Normal State" },
          {
            type: "ToggleGroup",
            variant: "outline",
            defaultValue: "center",
            children: [
              { type: "ToggleGroupItem", value: "left", children: "Left" },
              { type: "ToggleGroupItem", value: "center", children: "Center" },
              { type: "ToggleGroupItem", value: "right", children: "Right" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Disabled Group" },
          {
            type: "ToggleGroup",
            variant: "outline",
            disabled: true,
            defaultValue: "center",
            children: [
              { type: "ToggleGroupItem", value: "left", children: "Left" },
              { type: "ToggleGroupItem", value: "center", children: "Center" },
              { type: "ToggleGroupItem", value: "right", children: "Right" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Individual Item Disabled" },
          {
            type: "ToggleGroup",
            variant: "outline",
            defaultValue: "center",
            children: [
              { type: "ToggleGroupItem", value: "left", children: "Left" },
              { type: "ToggleGroupItem", value: "center", children: "Center" },
              { type: "ToggleGroupItem", value: "right", children: "Right", disabled: true },
            ],
          },
        ],
      },
    ],
  };

  // Text formatting example
  const textFormattingSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Text Formatting" },
          { type: "CardDescription", children: "Rich text editor controls" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "ToggleGroup",
              selectionType: "multiple",
              variant: "outline",
              size: "sm",
              defaultValue: ["bold"],
              children: [
                { type: "ToggleGroupItem", value: "bold", children: "𝐁", ariaLabel: "Bold" },
                { type: "ToggleGroupItem", value: "italic", children: "𝐼", ariaLabel: "Italic" },
                { type: "ToggleGroupItem", value: "underline", children: "U̲", ariaLabel: "Underline" },
                { type: "ToggleGroupItem", value: "strikethrough", children: "S̶", ariaLabel: "Strikethrough" },
              ],
            },
            {
              type: "Box",
              className: "p-3 border border-gray-200 dark:border-gray-700 rounded min-h-20 bg-gray-50 dark:bg-gray-900",
              children: {
                type: "Text",
                className: "text-sm font-bold",
                children: "Sample text with bold formatting applied",
              },
            },
          ],
        },
      },
    ],
  };

  // Alignment controls example
  const alignmentControlsSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Text Alignment" },
          { type: "CardDescription", children: "Document formatting controls" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "ToggleGroup",
              selectionType: "single",
              variant: "outline",
              defaultValue: "left",
              children: [
                { type: "ToggleGroupItem", value: "left", children: "⬅", ariaLabel: "Align left" },
                { type: "ToggleGroupItem", value: "center", children: "↔", ariaLabel: "Align center" },
                { type: "ToggleGroupItem", value: "right", children: "➡", ariaLabel: "Align right" },
                { type: "ToggleGroupItem", value: "justify", children: "⬌", ariaLabel: "Justify" },
              ],
            },
            {
              type: "Box",
              className: "p-3 border border-gray-200 dark:border-gray-700 rounded min-h-20 bg-gray-50 dark:bg-gray-900",
              children: {
                type: "Text",
                className: "text-sm text-left",
                children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This text is left-aligned based on the control above.",
              },
            },
          ],
        },
      },
    ],
  };

  // View options example
  const viewOptionsSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "View Options" },
          { type: "CardDescription", children: "Choose how to display content" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "ToggleGroup",
              selectionType: "single",
              variant: "outline",
              defaultValue: "grid",
              children: [
                { type: "ToggleGroupItem", value: "list", children: "☰", ariaLabel: "List view" },
                { type: "ToggleGroupItem", value: "grid", children: "⊞", ariaLabel: "Grid view" },
                { type: "ToggleGroupItem", value: "card", children: "▢", ariaLabel: "Card view" },
              ],
            },
            {
              type: "Box",
              className: "p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900",
              children: {
                type: "Flex",
                gap: "2",
                wrap: true,
                children: [
                  { type: "Box", className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-800", children: "" },
                  { type: "Box", className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-800", children: "" },
                  { type: "Box", className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-800", children: "" },
                  { type: "Box", className: "w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-800", children: "" },
                ],
              },
            },
            {
              type: "Text",
              size: "small",
              variant: "muted",
              children: "Grid view is currently selected",
            },
          ],
        },
      },
    ],
  };

  // Filter controls example
  const filterControlsSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-lg",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Content Filters" },
          { type: "CardDescription", children: "Filter content by category" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "ToggleGroup",
              selectionType: "multiple",
              variant: "outline",
              size: "sm",
              defaultValue: ["articles", "videos"],
              children: [
                { type: "ToggleGroupItem", value: "articles", children: "📄 Articles" },
                { type: "ToggleGroupItem", value: "videos", children: "🎥 Videos" },
                { type: "ToggleGroupItem", value: "podcasts", children: "🎧 Podcasts" },
                { type: "ToggleGroupItem", value: "images", children: "🖼 Images" },
              ],
            },
            {
              type: "Text",
              size: "small",
              variant: "muted",
              children: "Showing: Articles, Videos (2 of 4 filters active)",
            },
          ],
        },
      },
    ],
  };

  // Complete toolbar example
  const toolbarExampleSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Rich Text Editor" },
          { type: "CardDescription", children: "Full-featured editing toolbar" },
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
              gap: "4",
              wrap: true,
              children: [
                {
                  type: "ToggleGroup",
                  selectionType: "multiple",
                  variant: "outline",
                  size: "sm",
                  defaultValue: ["bold"],
                  children: [
                    { type: "ToggleGroupItem", value: "bold", children: "𝐁", ariaLabel: "Bold" },
                    { type: "ToggleGroupItem", value: "italic", children: "𝐼", ariaLabel: "Italic" },
                    { type: "ToggleGroupItem", value: "underline", children: "U̲", ariaLabel: "Underline" },
                  ],
                },
                {
                  type: "ToggleGroup",
                  selectionType: "single",
                  variant: "outline",
                  size: "sm",
                  defaultValue: "left",
                  children: [
                    { type: "ToggleGroupItem", value: "left", children: "⬅", ariaLabel: "Align left" },
                    { type: "ToggleGroupItem", value: "center", children: "↔", ariaLabel: "Align center" },
                    { type: "ToggleGroupItem", value: "right", children: "➡", ariaLabel: "Align right" },
                  ],
                },
                {
                  type: "ToggleGroup",
                  selectionType: "multiple",
                  variant: "outline",
                  size: "sm",
                  children: [
                    { type: "ToggleGroupItem", value: "list", children: "☰", ariaLabel: "Bulleted list" },
                    { type: "ToggleGroupItem", value: "numbered", children: "①", ariaLabel: "Numbered list" },
                    { type: "ToggleGroupItem", value: "indent", children: "⇥", ariaLabel: "Increase indent" },
                  ],
                },
              ],
            },
            {
              type: "Box",
              className: "p-4 border border-gray-200 dark:border-gray-700 rounded min-h-32 bg-gray-50 dark:bg-gray-900",
              children: {
                type: "Text",
                className: "text-sm font-bold",
                children: "This is sample editor content with bold formatting applied. You can use the toolbar above to format text, adjust alignment, and create lists.",
              },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ToggleGroup Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A group of toggle buttons that work together with single or multiple selection modes. Perfect for toolbars, filters, and multi-option controls.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The ToggleGroup component provides a container for related toggle buttons that work together as a cohesive unit. Unlike individual toggles, toggle groups allow you to manage the selection state across multiple options with either single or multiple selection modes.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Single selection mode (radio-like behavior)</li>
                <li>Multiple selection mode (checkbox-like behavior)</li>
                <li>Two visual variants (default and outline)</li>
                <li>Three size options (small, default, large)</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Group-level and individual item disabled states</li>
                <li>Perfect for toolbars, filters, and settings panels</li>
                <li>Accessible with proper ARIA attributes and keyboard navigation</li>
                <li>Seamless visual grouping of related options</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create a toggle group by wrapping ToggleGroupItem components with a ToggleGroup container.
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

          {/* Selection Types Section */}
          <section id="selection-types" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Selection Types</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose between single selection (radio-like) or multiple selection (checkbox-like) behavior.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Single Selection</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Only one item can be selected at a time. Selecting a new item deselects the current one.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(singleSelectionSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(singleSelectionSpec, null, 2)}
                  </pre>
                </details>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Multiple Selection</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Multiple items can be selected simultaneously. Each item can be toggled independently.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(multipleSelectionSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(multipleSelectionSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Visual Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from two visual variants to match your design needs.
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

          {/* Sizes Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Size Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Toggle groups come in three sizes to fit different contexts and layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(sizesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(sizesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* States Section */}
          <section id="states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">States & Disabled</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Toggle groups support disabled states at both the group level and individual item level.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(statesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(statesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Text Formatting Section */}
          <section id="text-formatting" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Text Formatting Example</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A common use case for multiple selection toggle groups in rich text editors.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(textFormattingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(textFormattingSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Alignment Controls Section */}
          <section id="alignment-controls" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Alignment Controls</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Single selection toggle groups work perfectly for mutually exclusive options like text alignment.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentControlsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignmentControlsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* View Options Section */}
          <section id="view-options" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">View Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use single selection toggle groups for view mode controls and display options.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(viewOptionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(viewOptionsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Filter Controls Section */}
          <section id="filter-controls" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Filter Controls</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Multiple selection toggle groups are ideal for filter interfaces where users can select multiple categories.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(filterControlsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(filterControlsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The ToggleGroup component is built with accessibility in mind:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper ARIA attributes including <code>role="group"</code> and <code>aria-pressed</code></li>
                <li>Full keyboard support (Arrow keys for navigation, Space/Enter to toggle)</li>
                <li>Focus management within the group</li>
                <li>Screen reader announcements for selection changes</li>
                <li><code>ariaLabel</code> and <code>ariaDescription</code> support for individual items</li>
                <li>Clear visual indicators for selected/unselected states</li>
                <li>Roving tabindex for efficient keyboard navigation</li>
              </ul>
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">ToggleGroup Props</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;ToggleGroup&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">selectionType</td>
                        <td className="py-3 px-4 font-mono">"single" | &quot;multiple&quot;</td>
                        <td className="py-3 px-4">&quot;single&quot;</td>
                        <td className="py-3 px-4">Selection behavior mode</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                        <td className="py-3 px-4 font-mono">"default" | &quot;outline&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Visual style variant</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                        <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;sm&quot; | &quot;lg&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Size of all toggle items</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                        <td className="py-3 px-4 font-mono">string | string[]</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Controlled selection value(s)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
                        <td className="py-3 px-4 font-mono">string | string[]</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Default selection for uncontrolled mode</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the entire group is disabled</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onValueChangeAction</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Event handler name for value changes</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                        <td className="py-3 px-4 font-mono">ToggleGroupItemSpec[]</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Array of ToggleGroupItem components</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">ToggleGroupItem Props</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;ToggleGroupItem&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Unique value for this item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                        <td className="py-3 px-4 font-mono">string | ComponentSpec</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Item content (text or icon)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether this specific item is disabled</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaLabel</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Accessible label for the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">ariaDescription</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Accessible description for the item</td>
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
              See how toggle groups work in real-world application scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Rich Text Editor Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Rich Text Editor Toolbar</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(toolbarExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(toolbarExampleSpec, null, 2)}
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