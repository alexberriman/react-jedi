import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ToggleShowcase() {
  usePageMetadata({
    title: "Toggle Component",
    description:
      "A toggle button component for on/off states. Perfect for toolbars, formatting controls, and toggleable UI features.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "variants", label: "Toggle Variants" },
    { id: "sizes", label: "Size Options" },
    { id: "states", label: "Toggle States" },
    { id: "with-icons", label: "Toggles with Icons" },
    { id: "toolbar", label: "Toolbar Examples" },
    { id: "groups", label: "Toggle Groups" },
    { id: "accessibility", label: "Accessibility" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic toggle specification
  const basicSpec: UISpecification = {
    type: "Toggle",
    children: "Toggle",
  };

  // Toggle variants specification
  const variantsSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    children: [
      { type: "Toggle", children: "Default", variant: "default" },
      { type: "Toggle", children: "Outline", variant: "outline" },
    ],
  };

  // Toggle sizes specification
  const sizesSpec: UISpecification = {
    type: "Group",
    spacing: "4",
    align: "center",
    children: [
      { type: "Toggle", children: "Small", size: "sm" },
      { type: "Toggle", children: "Default", size: "default" },
      { type: "Toggle", children: "Large", size: "lg" },
    ],
  };

  // Toggle states specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Toggle", children: "Unpressed" },
          { type: "Text", children: "Unpressed (default)" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Toggle", children: "Pressed", pressed: true },
          { type: "Text", children: "Pressed state" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Toggle", children: "Disabled", disabled: true },
          { type: "Text", children: "Disabled (unpressed)" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "4",
        children: [
          { type: "Toggle", children: "Disabled", disabled: true, pressed: true },
          { type: "Text", children: "Disabled (pressed)" },
        ],
      },
    ],
  };

  // Toggles with icons (using text icons for SDUI compatibility)
  const iconsSpec: UISpecification = {
    type: "Group",
    spacing: "2",
    children: [
      { type: "Toggle", children: "𝐁", variant: "outline", size: "default" },
      { type: "Toggle", children: "𝐼", variant: "outline", size: "default", pressed: true },
      { type: "Toggle", children: "U̲", variant: "outline", size: "default" },
      { type: "Toggle", children: "💎", variant: "outline", size: "default" },
    ],
  };

  // Toolbar example
  const toolbarSpec: UISpecification = {
    type: "Box",
    className: "border border-gray-200 dark:border-gray-800 rounded-lg p-3 bg-white dark:bg-gray-950",
    children: {
      type: "Flex",
      align: "center",
      gap: "1",
      children: [
        { type: "Toggle", children: "𝐁", variant: "outline", size: "sm" },
        { type: "Toggle", children: "𝐼", variant: "outline", size: "sm", pressed: true },
        { type: "Toggle", children: "U̲", variant: "outline", size: "sm" },
        {
          type: "Box",
          className: "mx-2 h-6 w-px bg-gray-200 dark:bg-gray-700",
          children: "",
        },
        { type: "Toggle", children: "⬅", variant: "outline", size: "sm", pressed: true },
        { type: "Toggle", children: "↔", variant: "outline", size: "sm" },
        { type: "Toggle", children: "➡", variant: "outline", size: "sm" },
        {
          type: "Box",
          className: "mx-2 h-6 w-px bg-gray-200 dark:bg-gray-700",
          children: "",
        },
        { type: "Toggle", children: "🔗", variant: "outline", size: "sm" },
        { type: "Toggle", children: "📷", variant: "outline", size: "sm" },
      ],
    },
  };

  // Toggle group examples
  const groupsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Text Alignment" },
          {
            type: "Group",
            spacing: "0",
            className: "rounded-lg overflow-hidden",
            children: [
              { type: "Toggle", children: "⬅", variant: "outline", className: "rounded-none border-r-0", pressed: true },
              { type: "Toggle", children: "↔", variant: "outline", className: "rounded-none border-r-0" },
              { type: "Toggle", children: "➡", variant: "outline", className: "rounded-none" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "Text Formatting" },
          {
            type: "Group",
            spacing: "1",
            children: [
              { type: "Toggle", children: "𝐁", variant: "outline", size: "sm" },
              { type: "Toggle", children: "𝐼", variant: "outline", size: "sm", pressed: true },
              { type: "Toggle", children: "U̲", variant: "outline", size: "sm" },
              { type: "Toggle", children: "S̶", variant: "outline", size: "sm" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", className: "font-medium mb-3", children: "View Options" },
          {
            type: "Group",
            spacing: "2",
            children: [
              { type: "Toggle", children: "Grid View", size: "sm", pressed: true },
              { type: "Toggle", children: "List View", size: "sm" },
              { type: "Toggle", children: "Card View", size: "sm" },
            ],
          },
        ],
      },
    ],
  };

  // Settings panel example
  const settingsPanelSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Display Settings" },
          { type: "CardDescription", children: "Customize your viewing preferences" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "6",
          children: [
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                {
                  type: "Box",
                  children: [
                    { type: "Text", className: "font-medium", children: "Compact Mode" },
                    { 
                      type: "Text", 
                      size: "small", 
                      variant: "muted", 
                      children: "Reduce spacing and padding" 
                    },
                  ],
                },
                { type: "Toggle", children: "📦", pressed: true },
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
                    { type: "Text", className: "font-medium", children: "Show Sidebar" },
                    { 
                      type: "Text", 
                      size: "small", 
                      variant: "muted", 
                      children: "Display navigation sidebar" 
                    },
                  ],
                },
                { type: "Toggle", children: "📐", pressed: true },
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
                    { type: "Text", className: "font-medium", children: "Auto-save" },
                    { 
                      type: "Text", 
                      size: "small", 
                      variant: "muted", 
                      children: "Automatically save changes" 
                    },
                  ],
                },
                { type: "Toggle", children: "💾" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Editor toolbar example
  const editorToolbarSpec: UISpecification = {
    type: "Box",
    className: "border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-950",
    children: {
      type: "Stack",
      spacing: "4",
      children: [
        {
          type: "Text",
          className: "font-medium text-sm text-gray-700 dark:text-gray-300",
          children: "Rich Text Editor",
        },
        {
          type: "Stack",
          spacing: "3",
          children: [
            {
              type: "Flex",
              align: "center",
              gap: "1",
              children: [
                { type: "Toggle", children: "𝐁", variant: "outline", size: "sm" },
                { type: "Toggle", children: "𝐼", variant: "outline", size: "sm", pressed: true },
                { type: "Toggle", children: "U̲", variant: "outline", size: "sm" },
                {
                  type: "Box",
                  className: "mx-2 h-6 w-px bg-gray-200 dark:bg-gray-700",
                  children: "",
                },
                { type: "Toggle", children: "⬅", variant: "outline", size: "sm", pressed: true },
                { type: "Toggle", children: "↔", variant: "outline", size: "sm" },
                { type: "Toggle", children: "➡", variant: "outline", size: "sm" },
              ],
            },
            {
              type: "Flex",
              align: "center",
              gap: "1",
              children: [
                { type: "Toggle", children: "🔗", variant: "outline", size: "sm" },
                { type: "Toggle", children: "📷", variant: "outline", size: "sm" },
                { type: "Toggle", children: "📝", variant: "outline", size: "sm" },
                {
                  type: "Box",
                  className: "mx-2 h-6 w-px bg-gray-200 dark:bg-gray-700",
                  children: "",
                },
                { type: "Toggle", children: "📋", variant: "outline", size: "sm" },
                { type: "Toggle", children: "🗑", variant: "outline", size: "sm" },
              ],
            },
          ],
        },
        {
          type: "Box",
          className: "mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded min-h-24 bg-gray-50 dark:bg-gray-900",
          children: {
            type: "Text",
            className: "text-sm text-gray-500 dark:text-gray-400 italic",
            children: "Editor content area...",
          },
        },
      ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Toggle Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A toggle button component for on/off states. Perfect for toolbars, formatting controls, and toggleable UI features.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Toggle component provides a pressable button that maintains an on/off state. Unlike regular buttons, toggles stay pressed when activated and can be pressed again to deactivate. They&apos;re commonly used in toolbars for formatting options, view toggles, and feature controls.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Persistent pressed/unpressed state (unlike regular buttons)</li>
                <li>Two visual variants (default and outline)</li>
                <li>Three size options (small, default, large)</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Disabled state support</li>
                <li>Perfect for toolbar controls and settings</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Keyboard navigation support (Space and Enter)</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The simplest way to use a Toggle component is to add it to your specification with content.
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

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Toggle Variants</h2>
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
              Toggles come in three sizes to fit different contexts and layouts.
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
            <h2 className="text-2xl font-semibold mb-4">Toggle States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Toggles can be pressed, unpressed, or disabled in either state.
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

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Toggles with Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Icons make toggles more recognizable and compact, especially in toolbars.
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

          {/* Toolbar Section */}
          <section id="toolbar" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Toolbar Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Toggles shine in toolbar contexts where users need to enable/disable features.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(toolbarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(toolbarSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Groups Section */}
          <section id="groups" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Toggle Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Group related toggles together for better organization and visual coherence.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(groupsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(groupsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Accessibility Section */}
          <section id="accessibility" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Toggle component is built with accessibility in mind:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper ARIA attributes including <code>aria-pressed</code> to indicate state</li>
                <li>Full keyboard support (Space and Enter keys to toggle)</li>
                <li>Focus indicators for keyboard navigation</li>
                <li>Screen reader announcements for state changes</li>
                <li>Consistent with native button behavior expectations</li>
                <li>Clear visual indicators for pressed/unpressed states</li>
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
                    <td className="py-3 px-4 font-mono">&quot;Toggle&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">string | ComponentSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Toggle content (text or icon)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;outline&quot;</td>
                    <td className="py-3 px-4">&quot;default&quot;</td>
                    <td className="py-3 px-4">Visual style variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                    <td className="py-3 px-4 font-mono">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td>
                    <td className="py-3 px-4">&quot;default&quot;</td>
                    <td className="py-3 px-4">Toggle size</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">pressed</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Controlled pressed state</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultPressed</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Default pressed state for uncontrolled mode</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the toggle is disabled</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onPressedChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler name for pressed state changes</td>
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
              See how toggles work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Settings Panel Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Settings Panel with Toggles</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(settingsPanelSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(settingsPanelSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Editor Toolbar Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Rich Text Editor Toolbar</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(editorToolbarSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(editorToolbarSpec, null, 2)}
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