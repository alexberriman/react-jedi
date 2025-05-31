import { render } from "@banja/react-jedi";
import type { UISpecification } from "@banja/react-jedi";
import { usePageMetadata } from "../../lib/meta";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/ui/code-block";

export function RadioGroupDemo() {
  usePageMetadata({
    title: "RadioGroup Component Demo - React Jedi",
    description: "Complete guide to the RadioGroup component with interactive examples, JSON specifications, and implementation details.",
  });

  // Basic RadioGroup example
  const basicRadioGroupSpec: UISpecification = {
    type: "RadioGroup",
    defaultValue: "option1",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option1", id: "basic-1" },
          { type: "Label", htmlFor: "basic-1", children: "Option 1" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option2", id: "basic-2" },
          { type: "Label", htmlFor: "basic-2", children: "Option 2" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option3", id: "basic-3" },
          { type: "Label", htmlFor: "basic-3", children: "Option 3" },
        ],
      },
    ],
  };

  // Horizontal RadioGroup example
  const horizontalRadioGroupSpec: UISpecification = {
    type: "RadioGroup",
    defaultValue: "small",
    className: "flex flex-row gap-4",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "small", id: "size-small" },
          { type: "Label", htmlFor: "size-small", children: "Small" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "medium", id: "size-medium" },
          { type: "Label", htmlFor: "size-medium", children: "Medium" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "large", id: "size-large" },
          { type: "Label", htmlFor: "size-large", children: "Large" },
        ],
      },
    ],
  };

  // Disabled RadioGroup example
  const disabledRadioGroupSpec: UISpecification = {
    type: "RadioGroup",
    defaultValue: "option2",
    disabled: true,
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option1", id: "disabled-1" },
          { type: "Label", htmlFor: "disabled-1", children: "Option 1" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option2", id: "disabled-2" },
          { type: "Label", htmlFor: "disabled-2", children: "Option 2 (Selected)" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option3", id: "disabled-3" },
          { type: "Label", htmlFor: "disabled-3", children: "Option 3" },
        ],
      },
    ],
  };

  // Individual disabled items example
  const individualDisabledSpec: UISpecification = {
    type: "RadioGroup",
    defaultValue: "available1",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "available1", id: "ind-1" },
          { type: "Label", htmlFor: "ind-1", children: "Available Option 1" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "unavailable", id: "ind-2", disabled: true },
          { type: "Label", htmlFor: "ind-2", children: "Unavailable Option" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "available2", id: "ind-3" },
          { type: "Label", htmlFor: "ind-3", children: "Available Option 2" },
        ],
      },
    ],
  };

  // Card-style RadioGroup example
  const cardStyleRadioGroupSpec: UISpecification = {
    type: "RadioGroup",
    defaultValue: "plan1",
    children: [
      {
        type: "Box",
        className: "relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50",
        children: [
          {
            type: "Flex",
            align: "center",
            children: {
              type: "RadioGroupItem",
              value: "plan1",
              id: "plan-1",
            },
          },
          {
            type: "Box",
            className: "ml-3 flex flex-col",
            children: [
              {
                type: "Label",
                htmlFor: "plan-1",
                className: "font-medium cursor-pointer",
                children: "Free Plan",
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Perfect for getting started. Limited features.",
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        className: "relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50",
        children: [
          {
            type: "Flex",
            align: "center",
            children: {
              type: "RadioGroupItem",
              value: "plan2",
              id: "plan-2",
            },
          },
          {
            type: "Box",
            className: "ml-3 flex flex-col",
            children: [
              {
                type: "Label",
                htmlFor: "plan-2",
                className: "font-medium cursor-pointer",
                children: "Pro Plan",
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Advanced features for power users.",
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        className: "relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50",
        children: [
          {
            type: "Flex",
            align: "center",
            children: {
              type: "RadioGroupItem",
              value: "plan3",
              id: "plan-3",
            },
          },
          {
            type: "Box",
            className: "ml-3 flex flex-col",
            children: [
              {
                type: "Label",
                htmlFor: "plan-3",
                className: "font-medium cursor-pointer",
                children: "Enterprise Plan",
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "All features with priority support.",
              },
            ],
          },
        ],
      },
    ],
  };

  // Custom styled RadioGroup example
  const customStyledSpec: UISpecification = {
    type: "RadioGroup",
    defaultValue: "style1",
    className: "gap-6",
    children: [
      {
        type: "Box",
        className: "group relative flex items-center space-x-2 rounded-md p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20",
        children: [
          {
            type: "RadioGroupItem",
            value: "style1",
            id: "style-1",
            className: "text-blue-600",
          },
          {
            type: "Label",
            htmlFor: "style-1",
            className: "cursor-pointer text-lg font-semibold text-blue-900 dark:text-blue-100",
            children: "Blue Theme",
          },
        ],
      },
      {
        type: "Box",
        className: "group relative flex items-center space-x-2 rounded-md p-3 hover:bg-green-50 dark:hover:bg-green-900/20",
        children: [
          {
            type: "RadioGroupItem",
            value: "style2",
            id: "style-2",
            className: "text-green-600",
          },
          {
            type: "Label",
            htmlFor: "style-2",
            className: "cursor-pointer text-lg font-semibold text-green-900 dark:text-green-100",
            children: "Green Theme",
          },
        ],
      },
      {
        type: "Box",
        className: "group relative flex items-center space-x-2 rounded-md p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20",
        children: [
          {
            type: "RadioGroupItem",
            value: "style3",
            id: "style-3",
            className: "text-purple-600",
          },
          {
            type: "Label",
            htmlFor: "style-3",
            className: "cursor-pointer text-lg font-semibold text-purple-900 dark:text-purple-100",
            children: "Purple Theme",
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link to="/showcase" className="hover:text-gray-900 dark:hover:text-gray-200">
            Showcase
          </Link>
          <span>/</span>
          <span>RadioGroup</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">RadioGroup Component</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A collection of radio buttons that allows users to select a single option from a set of choices.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
        <nav className="space-y-2">
          <a href="#basic-usage" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Basic Usage
          </a>
          <a href="#horizontal-layout" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Horizontal Layout
          </a>
          <a href="#disabled-states" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Disabled States
          </a>
          <a href="#card-style" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Card Style
          </a>
          <a href="#custom-styling" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Custom Styling
          </a>
          <a href="#properties" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Properties
          </a>
          <a href="#accessibility" className="block text-blue-600 dark:text-blue-400 hover:underline">
            Accessibility
          </a>
        </nav>
      </div>

      {/* Basic Usage */}
      <section id="basic-usage" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The RadioGroup component provides a vertical layout by default. Users can select only one option from the available choices.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 mb-6">
          {render(basicRadioGroupSpec)}
        </div>

        <div className="bg-gray-950 rounded-lg border p-4">
          <h3 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h3>
          <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicRadioGroupSpec, null, 2)}
              </CodeBlock>
        </div>
      </section>

      {/* Horizontal Layout */}
      <section id="horizontal-layout" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Horizontal Layout</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          RadioGroup can be arranged horizontally using flexbox classes for compact layouts.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 mb-6">
          {render(horizontalRadioGroupSpec)}
        </div>

        <div className="bg-gray-950 rounded-lg border p-4">
          <h3 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h3>
          <CodeBlock language="json" className="mt-2">
                {JSON.stringify(horizontalRadioGroupSpec, null, 2)}
              </CodeBlock>
        </div>
      </section>

      {/* Disabled States */}
      <section id="disabled-states" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Disabled States</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          RadioGroup supports both fully disabled state and individually disabled items.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Fully Disabled</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 mb-6">
              {render(disabledRadioGroupSpec)}
            </div>
            <div className="bg-gray-950 rounded-lg border p-4 mb-8">
              <h4 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h4>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(disabledRadioGroupSpec, null, 2)}
              </CodeBlock>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Individual Disabled Items</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 mb-6">
              {render(individualDisabledSpec)}
            </div>
            <div className="bg-gray-950 rounded-lg border p-4">
              <h4 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h4>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(individualDisabledSpec, null, 2)}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Card Style */}
      <section id="card-style" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Card Style</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Create card-like radio options with descriptions and enhanced visual styling.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 mb-6">
          {render(cardStyleRadioGroupSpec)}
        </div>

        <div className="bg-gray-950 rounded-lg border p-4">
          <h3 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h3>
          <CodeBlock language="json" className="mt-2">
                {JSON.stringify(cardStyleRadioGroupSpec, null, 2)}
              </CodeBlock>
        </div>
      </section>

      {/* Custom Styling */}
      <section id="custom-styling" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Custom Styling</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Apply custom colors and styling to match your brand or design system.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 mb-6">
          {render(customStyledSpec)}
        </div>

        <div className="bg-gray-950 rounded-lg border p-4">
          <h3 className="text-sm font-mono text-emerald-400 mb-2">JSON Specification:</h3>
          <CodeBlock language="json" className="mt-2">
                {JSON.stringify(customStyledSpec, null, 2)}
              </CodeBlock>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Component Properties</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-4">RadioGroup Properties</h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="font-mono text-sm font-medium">type</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">&quot;RadioGroup&quot;</code> - Component type identifier
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">value</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - The value of the selected item (controlled)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">defaultValue</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - The default value of the selected item (uncontrolled)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">disabled</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">boolean</code> - Whether the entire radio group is disabled (default: false)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">onValueChangeAction</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - Action to dispatch on value change
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">className</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - Custom CSS class names
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">orientation</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">&quot;horizontal&quot; | &quot;vertical&quot;</code> - Layout orientation (default: &quot;vertical&quot;)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">children</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ComponentChildren</code> - Child RadioGroupItem elements
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-4">RadioGroupItem Properties</h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="font-mono text-sm font-medium">type</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">&quot;RadioGroupItem&quot;</code> - Component type identifier
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">value</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - The value of the radio item (required)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">disabled</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">boolean</code> - Whether the item is disabled (default: false)
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">id</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - ID for label association
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">className</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - Custom CSS class names
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">ariaLabel</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - Accessible label for screen readers
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">ariaLabelledby</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - ID of element that labels this radio item
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-sm font-medium">ariaDescribedby</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code> - ID of element that describes this radio item
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility Features</h2>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Keyboard Navigation</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Tab</code> - Move focus to radio group</li>
                <li>• <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Arrow Keys</code> - Navigate between options</li>
                <li>• <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Space</code> - Select focused option</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Screen Reader Support</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Proper ARIA roles and attributes</li>
                <li>• Label association with radio items</li>
                <li>• Group announcement and selection state</li>
                <li>• Disabled state communication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Focus Management</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Visible focus indicators</li>
                <li>• Focus trap within radio group</li>
                <li>• Logical tab order</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Best Practices</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Always provide clear labels</li>
                <li>• Use fieldset and legend for groups</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Test with screen readers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link 
          to="/showcase" 
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Showcase
        </Link>
        <Link 
          to="/documentation" 
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          View Documentation
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}