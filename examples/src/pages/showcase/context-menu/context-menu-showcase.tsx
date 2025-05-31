import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function ContextMenuShowcase() {
  usePageMetadata({
    title: "Context Menu - React Jedi",
    description: "Comprehensive guide to the Context Menu component with examples and API documentation",
  });

  const [activeSection, setActiveSection] = useState("overview");

  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "items", label: "Menu Items" },
    { id: "icons", label: "With Icons" },
    { id: "shortcuts", label: "Keyboard Shortcuts" },
    { id: "nested", label: "Nested Menus" },
    { id: "states", label: "States & Variants" },
    { id: "checkbox-radio", label: "Checkbox & Radio" },
    { id: "complex", label: "Complex Examples" },
    { id: "props", label: "Props & Options" },
  ];

  const handleScroll = (id: string) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementTop = element.getBoundingClientRect().top;
      const scrollTop = window.scrollY + elementTop - offset;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Overview specification
  const overviewSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Heading",
        level: 3,
        text: "What is Context Menu?",
      },
      {
        type: "Text",
        text: "The Context Menu component provides a right-click menu interface that appears when users right-click on a trigger element. It's perfect for providing contextual actions and options without cluttering the main UI.",
      },
      {
        type: "Heading",
        level: 3,
        text: "Key Features",
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Text", text: "• Right-click activation on any element" },
          { type: "Text", text: "• Support for nested sub-menus" },
          { type: "Text", text: "• Keyboard navigation and shortcuts" },
          { type: "Text", text: "• Icons and custom content" },
          { type: "Text", text: "• Checkbox and radio items" },
          { type: "Text", text: "• Disabled states and separators" },
          { type: "Text", text: "• Accessible with ARIA support" },
          { type: "Text", text: "• Smart positioning to stay in viewport" },
        ],
      },
    ],
  };

  // Basic usage specification
  const basicSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click here",
              },
            ],
          },
        ],
        items: [
          { type: "item", label: "Back" },
          { type: "item", label: "Forward" },
          { type: "item", label: "Reload" },
          { type: "separator" },
          { type: "item", label: "Save As..." },
          { type: "item", label: "Print..." },
          { type: "item", label: "Cast..." },
          { type: "separator" },
          { type: "item", label: "View Page Source" },
          { type: "item", label: "Inspect" },
        ],
      },
    ],
  };

  // Menu items specification
  const itemsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click for different item types",
              },
            ],
          },
        ],
        items: [
          { type: "label", label: "Navigation" },
          { type: "item", label: "Home" },
          { type: "item", label: "About" },
          { type: "item", label: "Services" },
          { type: "separator" },
          { type: "label", label: "Actions" },
          { type: "item", label: "Create New" },
          { type: "item", label: "Edit" },
          { type: "item", label: "Delete", variant: "destructive" },
        ],
      },
    ],
  };

  // Icons specification
  const iconsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click for menu with icons",
              },
            ],
          },
        ],
        items: [
          { type: "item", label: "New File", icon: "Plus" },
          { type: "item", label: "Copy", icon: "Copy" },
          { type: "item", label: "Cut", icon: "Scissors" },
          { type: "item", label: "Paste", icon: "Clipboard" },
          { type: "separator" },
          { type: "item", label: "Delete", icon: "Trash2", variant: "destructive" },
        ],
      },
    ],
  };

  // Shortcuts specification
  const shortcutsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click for shortcuts menu",
              },
            ],
          },
        ],
        items: [
          { type: "item", label: "Undo", shortcut: "⌘Z" },
          { type: "item", label: "Redo", shortcut: "⌘⇧Z" },
          { type: "separator" },
          { type: "item", label: "Cut", shortcut: "⌘X" },
          { type: "item", label: "Copy", shortcut: "⌘C" },
          { type: "item", label: "Paste", shortcut: "⌘V" },
          { type: "separator" },
          { type: "item", label: "Select All", shortcut: "⌘A" },
        ],
      },
    ],
  };

  // Nested menus specification
  const nestedSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click for nested menus",
              },
            ],
          },
        ],
        items: [
          { type: "item", label: "New File" },
          { type: "item", label: "Open..." },
          {
            type: "sub",
            label: "Recent Files",
            items: [
              { type: "item", label: "document.pdf" },
              { type: "item", label: "image.png" },
              { type: "item", label: "spreadsheet.xlsx" },
              { type: "separator" },
              { type: "item", label: "Clear Recent" },
            ],
          },
          { type: "separator" },
          {
            type: "sub",
            label: "Share",
            items: [
              { type: "item", label: "Email", icon: "Mail" },
              { type: "item", label: "Messages", icon: "MessageSquare" },
              {
                type: "sub",
                label: "Social Media",
                items: [
                  { type: "item", label: "Twitter" },
                  { type: "item", label: "Facebook" },
                  { type: "item", label: "LinkedIn" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // States and variants specification
  const statesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click for states demo",
              },
            ],
          },
        ],
        items: [
          { type: "item", label: "Active Item" },
          { type: "item", label: "Disabled Item", disabled: true },
          { type: "separator" },
          { type: "item", label: "Default Variant" },
          { type: "item", label: "Destructive Variant", variant: "destructive" },
          { type: "separator" },
          { type: "item", label: "With Icon", icon: "Star", disabled: true },
          { type: "item", label: "With Shortcut", shortcut: "⌘K", disabled: true },
        ],
      },
    ],
  };

  // Checkbox and radio specification
  const checkboxRadioSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "ContextMenu",
        children: [
          {
            type: "Box",
            className: "flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm",
            children: [
              {
                type: "Text",
                text: "Right click for checkbox/radio items",
              },
            ],
          },
        ],
        items: [
          { type: "label", label: "Appearance" },
          { type: "checkbox", label: "Show Toolbar", checked: true },
          { type: "checkbox", label: "Show Sidebar", checked: false },
          { type: "checkbox", label: "Show Status Bar", checked: true },
          { type: "separator" },
          { type: "label", label: "Panel Position" },
          { type: "radio", label: "Left", value: "left", group: "position" },
          { type: "radio", label: "Right", value: "right", group: "position", checked: true },
          { type: "radio", label: "Bottom", value: "bottom", group: "position" },
        ],
      },
    ],
  };

  // Complex example specification
  const complexSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Card",
        className: "p-8",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "ContextMenu",
                children: [
                  {
                    type: "Image",
                    src: "https://placehold.co/600x400/EEE/31343C?text=Right+Click+Me",
                    alt: "Context menu demo image",
                    className: "rounded-lg",
                  },
                ],
                items: [
                  { type: "item", label: "Open", icon: "ExternalLink" },
                  { type: "item", label: "Open in New Tab", icon: "ExternalLink" },
                  { type: "separator" },
                  { type: "item", label: "Copy Image", icon: "Copy" },
                  { type: "item", label: "Copy Image Address", icon: "Link" },
                  { type: "separator" },
                  { type: "item", label: "Save Image As...", icon: "Download", shortcut: "⌘S" },
                  {
                    type: "sub",
                    label: "Share Image",
                    icon: "Share2",
                    items: [
                      { type: "item", label: "Email", icon: "Mail" },
                      { type: "item", label: "Messages", icon: "MessageSquare" },
                      { type: "item", label: "AirDrop", icon: "Wifi" },
                      { type: "separator" },
                      { type: "item", label: "More..." },
                    ],
                  },
                  { type: "separator" },
                  { type: "checkbox", label: "Show in Finder", checked: false },
                  { type: "separator" },
                  { type: "item", label: "Properties", icon: "Info", shortcut: "⌘I" },
                ],
              },
              {
                type: "Text",
                text: "Right-click on the image above to see a feature-rich context menu",
                className: "text-sm text-gray-600 text-center mt-2",
              },
            ],
          },
        ],
      },
    ],
  };

  // Props specification
  const propsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Table",
        data: [
          {
            prop: "children",
            type: "UISpecification[]",
            description: "The trigger element(s) that will show the context menu on right-click",
          },
          {
            prop: "items",
            type: "ContextMenuItem[]",
            description: "Array of menu items to display in the context menu",
          },
          {
            prop: "open",
            type: "boolean",
            description: "Controlled open state of the context menu",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Callback when the open state changes",
          },
          {
            prop: "modal",
            type: "boolean",
            description: "Whether the context menu should be modal (default: true)",
          },
        ],
        columns: [
          { key: "prop", header: "Property" },
          { key: "type", header: "Type" },
          { key: "description", header: "Description" },
        ],
        className: "w-full",
      },
      {
        type: "Heading",
        level: 3,
        text: "Context Menu Item Types",
      },
      {
        type: "Table",
        data: [
          {
            type: "item",
            props: "label, icon?, shortcut?, disabled?, variant?",
            description: "Standard clickable menu item",
          },
          {
            type: "checkbox",
            props: "label, checked?, disabled?",
            description: "Checkbox menu item with toggle state",
          },
          {
            type: "radio",
            props: "label, value, group, checked?, disabled?",
            description: "Radio button menu item for single selection",
          },
          {
            type: "sub",
            props: "label, icon?, items",
            description: "Submenu with nested items",
          },
          {
            type: "separator",
            props: "-",
            description: "Visual separator between menu sections",
          },
          {
            type: "label",
            props: "label",
            description: "Non-interactive label for menu sections",
          },
        ],
        columns: [
          { key: "type", header: "Item Type" },
          { key: "props", header: "Properties" },
          { key: "description", header: "Description" },
        ],
        className: "w-full",
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-gray-50 dark:bg-gray-900 p-6 fixed h-full overflow-y-auto">
        <Link
          to="/showcase"
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          ← Back to Showcase
        </Link>
        <h2 className="font-semibold text-lg mb-4">Context Menu</h2>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Context Menu Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile right-click menu component with support for nested menus, icons, shortcuts, and various interactive states.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20 space-y-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="prose dark:prose-invert max-w-none">
              {render(overviewSpec)}
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Basic Usage</h2>
              <p className="text-gray-600 dark:text-gray-400">
                A simple context menu with standard menu items and separators.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Menu Items Section */}
          <section id="items" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Menu Items</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different types of menu items including labels, regular items, and destructive variants.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(itemsSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(itemsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Icons Section */}
          <section id="icons" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">With Icons</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Menu items can include icons for better visual recognition.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(iconsSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(iconsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Shortcuts Section */}
          <section id="shortcuts" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Keyboard Shortcuts</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Display keyboard shortcuts for menu actions.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(shortcutsSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(shortcutsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Nested Menus Section */}
          <section id="nested" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Nested Menus</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Create hierarchical menu structures with sub-menus.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(nestedSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(nestedSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* States & Variants Section */}
          <section id="states" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">States & Variants</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different states and visual variants for menu items.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(statesSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(statesSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Checkbox & Radio Section */}
          <section id="checkbox-radio" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Checkbox & Radio Items</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive checkbox and radio button menu items for settings and options.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(checkboxRadioSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(checkboxRadioSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Complex Examples Section */}
          <section id="complex" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Complex Examples</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Real-world example showing a feature-rich context menu for an image.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(complexSpec)}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(complexSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Props & Options Section */}
          <section id="props" className="scroll-mt-20 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Props & Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Complete reference of all available properties and menu item types.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(propsSpec)}
            </div>
          </section>

          {/* Footer */}
          <div className="border-t pt-12 pb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need more examples? Check out the{" "}
              <Link to="/documentation" className="text-blue-600 hover:underline">
                full documentation
              </Link>{" "}
              for advanced usage patterns.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}