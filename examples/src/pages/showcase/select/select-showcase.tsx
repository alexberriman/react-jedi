import { render, type UISpecification } from "@alexberriman/react-jedi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePageMetadata } from "../../../lib/meta";
import { Heading, Text, padding } from "../../../components/ui";
import { CodeBlock } from "../../../components/ui/code-block";

export function SelectShowcase() {
  usePageMetadata({
    title: "Select Component",
    description: "Comprehensive showcase of the Select component with variations, customization options, and real-world examples"
  });

  const [activeSection, setActiveSection] = useState<string>("overview");
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "sizes", label: "Sizes" },
    { id: "states", label: "States" },
    { id: "grouped", label: "Grouped Options" },
    { id: "controlled", label: "Controlled" },
    { id: "form", label: "Form Integration" },
    { id: "styling", label: "Custom Styling" },
    { id: "props", label: "Props & Options" }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: "smooth" });
  };

  // Basic Select
  const basicSelect: UISpecification = {
    type: "Select",
    defaultValue: "apple",
    children: [
      {
        type: "SelectTrigger",
        children: [
          {
            type: "SelectValue",
            placeholder: "Select a fruit"
          }
        ]
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "apple", children: "Apple" },
          { type: "SelectItem", value: "banana", children: "Banana" },
          { type: "SelectItem", value: "orange", children: "Orange" },
          { type: "SelectItem", value: "grape", children: "Grape" },
          { type: "SelectItem", value: "watermelon", children: "Watermelon" }
        ]
      }
    ]
  };

  // Select with small size
  const smallSelect: UISpecification = {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        props: { size: "sm" },
        children: [
          {
            type: "SelectValue",
            placeholder: "Small select"
          }
        ]
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "option1", children: "Option 1" },
          { type: "SelectItem", value: "option2", children: "Option 2" },
          { type: "SelectItem", value: "option3", children: "Option 3" }
        ]
      }
    ]
  };

  // Select with default size
  const defaultSelect: UISpecification = {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        props: { size: "default" },
        children: [
          {
            type: "SelectValue",
            placeholder: "Default select"
          }
        ]
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "option1", children: "Option 1" },
          { type: "SelectItem", value: "option2", children: "Option 2" },
          { type: "SelectItem", value: "option3", children: "Option 3" }
        ]
      }
    ]
  };

  // Disabled Select
  const disabledSelect: UISpecification = {
    type: "Select",
    props: { disabled: true },
    defaultValue: "disabled",
    children: [
      {
        type: "SelectTrigger",
        children: [
          {
            type: "SelectValue",
            placeholder: "Disabled select"
          }
        ]
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "disabled", children: "Cannot change" }
        ]
      }
    ]
  };

  // Select with disabled items
  const disabledItemsSelect: UISpecification = {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        children: [
          {
            type: "SelectValue",
            placeholder: "Select an option"
          }
        ]
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "available1", children: "Available Option 1" },
          { type: "SelectItem", value: "unavailable", props: { disabled: true }, children: "Unavailable Option" },
          { type: "SelectItem", value: "available2", children: "Available Option 2" },
          { type: "SelectItem", value: "soldout", props: { disabled: true }, children: "Sold Out" }
        ]
      }
    ]
  };

  // Grouped Select
  const groupedSelect: UISpecification = {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        children: [
          {
            type: "SelectValue",
            placeholder: "Select a country"
          }
        ]
      },
      {
        type: "SelectContent",
        children: [
          {
            type: "SelectGroup",
            children: [
              { type: "SelectLabel", children: "North America" },
              { type: "SelectItem", value: "us", children: "United States" },
              { type: "SelectItem", value: "ca", children: "Canada" },
              { type: "SelectItem", value: "mx", children: "Mexico" }
            ]
          },
          { type: "SelectSeparator" },
          {
            type: "SelectGroup",
            children: [
              { type: "SelectLabel", children: "Europe" },
              { type: "SelectItem", value: "uk", children: "United Kingdom" },
              { type: "SelectItem", value: "fr", children: "France" },
              { type: "SelectItem", value: "de", children: "Germany" },
              { type: "SelectItem", value: "it", children: "Italy" }
            ]
          },
          { type: "SelectSeparator" },
          {
            type: "SelectGroup",
            children: [
              { type: "SelectLabel", children: "Asia" },
              { type: "SelectItem", value: "jp", children: "Japan" },
              { type: "SelectItem", value: "cn", children: "China" },
              { type: "SelectItem", value: "kr", children: "South Korea" }
            ]
          }
        ]
      }
    ]
  };

  // Controlled Select
  const controlledSelect: UISpecification = {
    type: "Stack",
    children: [
      {
        type: "Text",
        className: "text-sm font-medium",
        children: "Selected value will appear below:"
      },
      {
        type: "Select",
        props: {
          value: "${state.selectedValue}",
          onValueChange: "handleSelectChange"
        },
        children: [
          {
            type: "SelectTrigger",
            children: [
              {
                type: "SelectValue",
                placeholder: "Choose an option"
              }
            ]
          },
          {
            type: "SelectContent",
            children: [
              { type: "SelectItem", value: "react", children: "React" },
              { type: "SelectItem", value: "vue", children: "Vue" },
              { type: "SelectItem", value: "angular", children: "Angular" },
              { type: "SelectItem", value: "svelte", children: "Svelte" }
            ]
          }
        ]
      },
      {
        type: "Text",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: "Selected: ${state.selectedValue || 'None&apos;}"
      }
    ],
    state: {
      selectedValue: ""
    },
    handlers: {
      handleSelectChange: {
        action: "setState",
        target: "selectedValue",
        value: "$event"
      }
    }
  };

  // Form Integration
  const formSelect: UISpecification = {
    type: "Form",
    className: "space-y-4",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Label",
            htmlFor: "category",
            children: "Product Category"
          },
          {
            type: "Select",
            props: { name: "category" },
            children: [
              {
                type: "SelectTrigger",
                props: { className: "w-full" },
                children: [
                  {
                    type: "SelectValue",
                    placeholder: "Select a category"
                  }
                ]
              },
              {
                type: "SelectContent",
                children: [
                  {
                    type: "SelectGroup",
                    children: [
                      { type: "SelectLabel", children: "Electronics" },
                      { type: "SelectItem", value: "phones", children: "Phones & Tablets" },
                      { type: "SelectItem", value: "computers", children: "Computers" },
                      { type: "SelectItem", value: "audio", children: "Audio & Video" }
                    ]
                  },
                  { type: "SelectSeparator" },
                  {
                    type: "SelectGroup",
                    children: [
                      { type: "SelectLabel", children: "Fashion" },
                      { type: "SelectItem", value: "clothing", children: "Clothing" },
                      { type: "SelectItem", value: "shoes", children: "Shoes" },
                      { type: "SelectItem", value: "accessories", children: "Accessories" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "Button",
        children: "Submit"
      }
    ]
  };

  // Custom Styled Select
  const styledSelect: UISpecification = {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        props: { 
          className: "w-64 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 focus:ring-2 focus:ring-purple-400" 
        },
        children: [
          {
            type: "SelectValue",
            placeholder: "Choose your style"
          }
        ]
      },
      {
        type: "SelectContent",
        props: { className: "bg-gray-900 border-gray-700" },
        children: [
          { 
            type: "SelectItem", 
            value: "modern", 
            props: { className: "text-white hover:bg-purple-600 focus:bg-purple-600" },
            children: "Modern" 
          },
          { 
            type: "SelectItem", 
            value: "classic", 
            props: { className: "text-white hover:bg-purple-600 focus:bg-purple-600" },
            children: "Classic" 
          },
          { 
            type: "SelectItem", 
            value: "minimal", 
            props: { className: "text-white hover:bg-purple-600 focus:bg-purple-600" },
            children: "Minimal" 
          },
          { 
            type: "SelectItem", 
            value: "bold", 
            props: { className: "text-white hover:bg-purple-600 focus:bg-purple-600" },
            children: "Bold" 
          }
        ]
      }
    ]
  };

  return (
    <div className="flex">
      {/* Table of Contents - Fixed Sidebar */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 hidden lg:block">
        <nav className="p-4">
          <div className="mb-4">
            <Link
              to="/showcase"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Showcase
            </Link>
          </div>
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Table of Contents</h3>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleSectionClick(item.id)}
                  className={`text-left w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        {/* Page Title */}
        <div className="mb-8">
          <Heading level={1} className="mb-4">Select Component</Heading>
          <Text size="lg" className="text-gray-600 dark:text-gray-400">
            A customizable dropdown selection component with support for grouped options, multiple sizes, and form integration.
          </Text>
        </div>

        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <Heading level={2} className="mb-4">Overview</Heading>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Select component provides a flexible dropdown interface for choosing from a list of options. 
              It supports various features including grouped options, disabled states, custom styling, and 
              seamless form integration.
            </p>
            <div className="mt-6">
              <Heading level={3} className="text-lg mb-3">Key Features</Heading>
              <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Multiple size variants (small, default)</li>
                <li>Grouped options with labels and separators</li>
                <li>Disabled state for both select and individual options</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Custom styling with className props</li>
                <li>Keyboard navigation support</li>
                <li>Form integration with name attribute</li>
                <li>Accessible with ARIA attributes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Basic Usage */}
        <section id="basic" className="mb-16">
          <Heading level={2} className="mb-4">Basic Usage</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>The simplest form of Select with a list of options to choose from.</p>
          </div>
          <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
            {render(basicSelect)}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "basic" ? null : "basic")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "basic" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "basic" && (
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicSelect, null, 2)}
              </CodeBlock>
            )}
          </div>
        </section>

        {/* Sizes */}
        <section id="sizes" className="mb-16">
          <Heading level={2} className="mb-4">Sizes</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>Select component supports different size variants to fit various UI contexts.</p>
          </div>
          <div className="space-y-6">
            <div>
              <Heading level={3} className="text-lg mb-3">Small Size</Heading>
              <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
                {render(smallSelect)}
              </div>
            </div>
            <div>
              <Heading level={3} className="text-lg mb-3">Default Size</Heading>
              <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
                {render(defaultSelect)}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "sizes" ? null : "sizes")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "sizes" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "sizes" && (
              <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify({ small: smallSelect, default: defaultSelect }, null, 2)}
              </pre>
            )}
          </div>
        </section>

        {/* States */}
        <section id="states" className="mb-16">
          <Heading level={2} className="mb-4">States</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>Select components can be disabled entirely or have individual disabled options.</p>
          </div>
          <div className="space-y-6">
            <div>
              <Heading level={3} className="text-lg mb-3">Disabled Select</Heading>
              <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
                {render(disabledSelect)}
              </div>
            </div>
            <div>
              <Heading level={3} className="text-lg mb-3">Select with Disabled Options</Heading>
              <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
                {render(disabledItemsSelect)}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "states" ? null : "states")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "states" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "states" && (
              <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify({ disabled: disabledSelect, disabledItems: disabledItemsSelect }, null, 2)}
              </pre>
            )}
          </div>
        </section>

        {/* Grouped Options */}
        <section id="grouped" className="mb-16">
          <Heading level={2} className="mb-4">Grouped Options</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>Organize related options into groups with labels and separators for better user experience.</p>
          </div>
          <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
            {render(groupedSelect)}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "grouped" ? null : "grouped")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "grouped" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "grouped" && (
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(groupedSelect, null, 2)}
              </CodeBlock>
            )}
          </div>
        </section>

        {/* Controlled */}
        <section id="controlled" className="mb-16">
          <Heading level={2} className="mb-4">Controlled Mode</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>Use controlled mode to manage the select value with state and event handlers.</p>
          </div>
          <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
            {render(controlledSelect)}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "controlled" ? null : "controlled")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "controlled" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "controlled" && (
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(controlledSelect, null, 2)}
              </CodeBlock>
            )}
          </div>
        </section>

        {/* Form Integration */}
        <section id="form" className="mb-16">
          <Heading level={2} className="mb-4">Form Integration</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>Easily integrate Select components into forms with proper labeling and name attributes.</p>
          </div>
          <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
            {render(formSelect)}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "form" ? null : "form")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "form" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "form" && (
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(formSelect, null, 2)}
              </CodeBlock>
            )}
          </div>
        </section>

        {/* Custom Styling */}
        <section id="styling" className="mb-16">
          <Heading level={2} className="mb-4">Custom Styling</Heading>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>Apply custom styles to create unique select components that match your design system.</p>
          </div>
          <div className={`${padding.large} bg-gray-50 dark:bg-gray-900 rounded-lg mb-4`}>
            {render(styledSelect)}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpandedCode(expandedCode === "styling" ? null : "styling")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {expandedCode === "styling" ? "Hide" : "Show"} JSON Specification
            </button>
            {expandedCode === "styling" && (
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(styledSelect, null, 2)}
              </CodeBlock>
            )}
          </div>
        </section>

        {/* Props & Options */}
        <section id="props" className="mb-16">
          <Heading level={2} className="mb-6">Props & Options</Heading>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-medium">Component</th>
                  <th className="text-left p-4 font-medium">Prop</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-4 font-mono text-sm" rowSpan={8}>Select</td>
                  <td className="p-4 font-mono text-sm">value</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Controlled selected value</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">defaultValue</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Default value for uncontrolled mode</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">disabled</td>
                  <td className="p-4 font-mono text-sm">boolean</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Whether the select is disabled</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">onValueChange</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Event handler name for value changes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">placeholder</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Placeholder text when no value is selected</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">name</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Name attribute for form submission</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">array</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">SelectTrigger and SelectContent components</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm" rowSpan={2}>SelectTrigger</td>
                  <td className="p-4 font-mono text-sm">size</td>
                  <td className="p-4 font-mono text-sm">&quot;sm&quot; | &quot;default&quot;</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Size variant of the trigger</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">SelectValue</td>
                  <td className="p-4 font-mono text-sm">placeholder</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Placeholder text</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm" rowSpan={2}>SelectContent</td>
                  <td className="p-4 font-mono text-sm">position</td>
                  <td className="p-4 font-mono text-sm">&quot;item-aligned&quot; | &quot;popper&quot;</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Positioning mode</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm" rowSpan={3}>SelectItem</td>
                  <td className="p-4 font-mono text-sm">value</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">The value of the item (required)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">disabled</td>
                  <td className="p-4 font-mono text-sm">boolean</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Whether the item is disabled</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <Link
              to="/showcase"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Showcase
            </Link>
            <Link
              to="/documentation"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2"
            >
              Documentation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}