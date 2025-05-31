import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function MenubarShowcase() {
  usePageMetadata({
    title: "Menubar Component",
    description:
      "A comprehensive showcase of the React Jedi Menubar component with all features, menu types, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Menubar" },
    { id: "with-icons", label: "With Icons" },
    { id: "with-shortcuts", label: "With Shortcuts" },
    { id: "submenus", label: "Submenus" },
    { id: "checkbox-items", label: "Checkbox Items" },
    { id: "radio-groups", label: "Radio Groups" },
    { id: "separators", label: "Separators" },
    { id: "variants", label: "Item Variants" },
    { id: "disabled-items", label: "Disabled Items" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic menubar specification
  const basicMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "File",
        items: [
          { type: "item", label: "New" },
          { type: "item", label: "Open" },
          { type: "item", label: "Save" },
          { type: "separator" },
          { type: "item", label: "Exit" },
        ],
      },
      {
        trigger: "Edit",
        items: [
          { type: "item", label: "Undo" },
          { type: "item", label: "Redo" },
          { type: "separator" },
          { type: "item", label: "Cut" },
          { type: "item", label: "Copy" },
          { type: "item", label: "Paste" },
        ],
      },
      {
        trigger: "View",
        items: [
          { type: "item", label: "Zoom In" },
          { type: "item", label: "Zoom Out" },
          { type: "item", label: "Reset Zoom" },
        ],
      },
    ],
  };

  // Menubar with icons specification
  const iconsMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "File",
        items: [
          { type: "item", label: "New File", icon: "📄" },
          { type: "item", label: "New Folder", icon: "📁" },
          { type: "separator" },
          { type: "item", label: "Open", icon: "📂" },
          { type: "item", label: "Save", icon: "💾" },
          { type: "separator" },
          { type: "item", label: "Print", icon: "🖨️" },
        ],
      },
      {
        trigger: "Tools",
        items: [
          { type: "item", label: "Settings", icon: "⚙️" },
          { type: "item", label: "Extensions", icon: "🧩" },
          { type: "separator" },
          { type: "item", label: "Terminal", icon: "⌨️" },
        ],
      },
    ],
  };

  // Menubar with shortcuts specification
  const shortcutsMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "File",
        items: [
          { type: "item", label: "New", shortcut: "Ctrl+N" },
          { type: "item", label: "Open", shortcut: "Ctrl+O" },
          { type: "item", label: "Save", shortcut: "Ctrl+S" },
          { type: "item", label: "Save As", shortcut: "Ctrl+Shift+S" },
          { type: "separator" },
          { type: "item", label: "Close", shortcut: "Ctrl+W" },
        ],
      },
      {
        trigger: "Edit",
        items: [
          { type: "item", label: "Undo", shortcut: "Ctrl+Z" },
          { type: "item", label: "Redo", shortcut: "Ctrl+Y" },
          { type: "separator" },
          { type: "item", label: "Cut", shortcut: "Ctrl+X" },
          { type: "item", label: "Copy", shortcut: "Ctrl+C" },
          { type: "item", label: "Paste", shortcut: "Ctrl+V" },
        ],
      },
    ],
  };

  // Menubar with submenus specification
  const submenusMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "File",
        items: [
          {
            type: "submenu",
            trigger: "New",
            items: [
              { type: "item", label: "Text File", shortcut: "Ctrl+N" },
              { type: "item", label: "Folder", shortcut: "Ctrl+Shift+N" },
              { type: "separator" },
              { type: "item", label: "From Template" },
            ],
          },
          {
            type: "submenu",
            trigger: "Recent Files",
            items: [
              { type: "item", label: "document.txt" },
              { type: "item", label: "project.json" },
              { type: "item", label: "readme.md" },
              { type: "separator" },
              { type: "item", label: "Clear Recent" },
            ],
          },
          { type: "separator" },
          { type: "item", label: "Exit" },
        ],
      },
      {
        trigger: "View",
        items: [
          {
            type: "submenu",
            trigger: "Zoom",
            items: [
              { type: "item", label: "Zoom In", shortcut: "Ctrl++" },
              { type: "item", label: "Zoom Out", shortcut: "Ctrl+-" },
              { type: "item", label: "Reset Zoom", shortcut: "Ctrl+0" },
            ],
          },
          {
            type: "submenu",
            trigger: "Layout",
            items: [
              { type: "item", label: "Single Column" },
              { type: "item", label: "Two Columns" },
              { type: "item", label: "Three Columns" },
            ],
          },
        ],
      },
    ],
  };

  // Menubar with checkbox items specification
  const checkboxMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "View",
        items: [
          { type: "checkbox", label: "Show Sidebar", checked: true },
          { type: "checkbox", label: "Show Minimap", checked: false },
          { type: "checkbox", label: "Show Line Numbers", checked: true },
          { type: "separator" },
          { type: "checkbox", label: "Word Wrap", checked: false },
          { type: "checkbox", label: "Show Whitespace", checked: false },
        ],
      },
      {
        trigger: "Debug",
        items: [
          { type: "checkbox", label: "Enable Debugging", checked: false },
          { type: "checkbox", label: "Show Console", checked: true },
          { type: "checkbox", label: "Break on Exceptions", checked: false },
        ],
      },
    ],
  };

  // Menubar with radio groups specification
  const radioMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "Theme",
        items: [
          {
            type: "radioGroup",
            value: "light",
            items: [
              { value: "light", label: "Light Theme" },
              { value: "dark", label: "Dark Theme" },
              { value: "auto", label: "Auto (System)" },
            ],
          },
        ],
      },
      {
        trigger: "Language",
        items: [
          {
            type: "radioGroup",
            value: "en",
            items: [
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
            ],
          },
        ],
      },
    ],
  };

  // Menubar with separators specification
  const separatorsMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "File",
        items: [
          { type: "item", label: "New", shortcut: "Ctrl+N" },
          { type: "item", label: "Open", shortcut: "Ctrl+O" },
          { type: "separator" },
          { type: "item", label: "Save", shortcut: "Ctrl+S" },
          { type: "item", label: "Save As", shortcut: "Ctrl+Shift+S" },
          { type: "separator" },
          { type: "item", label: "Import" },
          { type: "item", label: "Export" },
          { type: "separator" },
          { type: "item", label: "Print", shortcut: "Ctrl+P" },
          { type: "separator" },
          { type: "item", label: "Exit", shortcut: "Alt+F4" },
        ],
      },
    ],
  };

  // Menubar with variants specification
  const variantsMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "Actions",
        items: [
          { type: "item", label: "Save Document", variant: "default" },
          { type: "item", label: "Create Backup", variant: "default" },
          { type: "separator" },
          { type: "item", label: "Delete File", variant: "destructive" },
          { type: "item", label: "Reset Settings", variant: "destructive" },
          { type: "separator" },
          { type: "item", label: "Force Quit", variant: "destructive" },
        ],
      },
    ],
  };

  // Menubar with disabled items specification
  const disabledMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "Edit",
        items: [
          { type: "item", label: "Undo", shortcut: "Ctrl+Z", disabled: true },
          { type: "item", label: "Redo", shortcut: "Ctrl+Y", disabled: true },
          { type: "separator" },
          { type: "item", label: "Cut", shortcut: "Ctrl+X" },
          { type: "item", label: "Copy", shortcut: "Ctrl+C" },
          { type: "item", label: "Paste", shortcut: "Ctrl+V", disabled: true },
          { type: "separator" },
          { type: "item", label: "Select All", shortcut: "Ctrl+A" },
        ],
      },
      {
        trigger: "Tools",
        items: [
          { type: "item", label: "Spell Check", disabled: false },
          { type: "item", label: "Grammar Check", disabled: true },
          { type: "separator" },
          { type: "item", label: "Find References", disabled: false },
          { type: "item", label: "Go to Definition", disabled: true },
        ],
      },
    ],
  };

  // Complete application menubar example
  const applicationMenubarSpec: UISpecification = {
    type: "menubar",
    menus: [
      {
        trigger: "File",
        items: [
          {
            type: "submenu",
            trigger: "New",
            items: [
              { type: "item", label: "Document", icon: "📄", shortcut: "Ctrl+N" },
              { type: "item", label: "Folder", icon: "📁", shortcut: "Ctrl+Shift+N" },
              { type: "item", label: "Project", icon: "📦" },
            ],
          },
          { type: "item", label: "Open", icon: "📂", shortcut: "Ctrl+O" },
          {
            type: "submenu",
            trigger: "Recent",
            items: [
              { type: "item", label: "my-project.json" },
              { type: "item", label: "documentation.md" },
              { type: "separator" },
              { type: "item", label: "Clear Recent" },
            ],
          },
          { type: "separator" },
          { type: "item", label: "Save", icon: "💾", shortcut: "Ctrl+S" },
          { type: "item", label: "Save As", shortcut: "Ctrl+Shift+S" },
          { type: "separator" },
          { type: "item", label: "Print", icon: "🖨️", shortcut: "Ctrl+P" },
          { type: "separator" },
          { type: "item", label: "Exit", shortcut: "Alt+F4" },
        ],
      },
      {
        trigger: "Edit",
        items: [
          { type: "item", label: "Undo", shortcut: "Ctrl+Z", disabled: true },
          { type: "item", label: "Redo", shortcut: "Ctrl+Y", disabled: true },
          { type: "separator" },
          { type: "item", label: "Cut", shortcut: "Ctrl+X" },
          { type: "item", label: "Copy", shortcut: "Ctrl+C" },
          { type: "item", label: "Paste", shortcut: "Ctrl+V" },
          { type: "separator" },
          { type: "item", label: "Find", icon: "🔍", shortcut: "Ctrl+F" },
          { type: "item", label: "Replace", shortcut: "Ctrl+H" },
        ],
      },
      {
        trigger: "View",
        items: [
          { type: "checkbox", label: "Show Sidebar", checked: true },
          { type: "checkbox", label: "Show Minimap", checked: false },
          { type: "checkbox", label: "Show Status Bar", checked: true },
          { type: "separator" },
          {
            type: "submenu",
            trigger: "Zoom",
            items: [
              { type: "item", label: "Zoom In", shortcut: "Ctrl++" },
              { type: "item", label: "Zoom Out", shortcut: "Ctrl+-" },
              { type: "item", label: "Reset Zoom", shortcut: "Ctrl+0" },
            ],
          },
          { type: "separator" },
          {
            type: "radioGroup",
            value: "dark",
            items: [
              { value: "light", label: "Light Theme" },
              { value: "dark", label: "Dark Theme" },
              { value: "auto", label: "Auto" },
            ],
          },
        ],
      },
      {
        trigger: "Tools",
        items: [
          { type: "item", label: "Command Palette", icon: "⌘", shortcut: "Ctrl+Shift+P" },
          { type: "separator" },
          { type: "item", label: "Extensions", icon: "🧩" },
          { type: "item", label: "Settings", icon: "⚙️", shortcut: "Ctrl+," },
          { type: "separator" },
          { type: "item", label: "Developer Tools", shortcut: "F12" },
        ],
      },
      {
        trigger: "Help",
        items: [
          { type: "item", label: "Welcome", icon: "👋" },
          { type: "item", label: "Documentation", icon: "📚" },
          { type: "separator" },
          { type: "item", label: "Keyboard Shortcuts", shortcut: "Ctrl+K Ctrl+S" },
          { type: "item", label: "Report Issue", icon: "🐛" },
          { type: "separator" },
          { type: "item", label: "About", icon: "ℹ️" },
        ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Menubar Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands. Perfect for complex applications that need comprehensive navigation and actions.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Menubar component provides a traditional desktop-style menu interface with multiple menu triggers and comprehensive dropdown functionality. It&apos;s ideal for applications that need to offer many actions in an organized, accessible way.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple menu triggers with organized dropdowns</li>
                <li>Support for icons, keyboard shortcuts, and descriptions</li>
                <li>Nested submenus for hierarchical organization</li>
                <li>Checkbox and radio group items for state management</li>
                <li>Separators for visual grouping</li>
                <li>Disabled states and variant styling</li>
                <li>Full keyboard navigation support</li>
                <li>Accessible by default with proper ARIA attributes</li>
              </ul>
            </div>
          </section>

          {/* Basic Menubar Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Menubar</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple menubar with multiple menus and basic menu items.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance menu items with icons for better visual recognition and faster navigation.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(iconsMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(iconsMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Shortcuts Section */}
          <section id="with-shortcuts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Keyboard Shortcuts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display keyboard shortcuts to help users learn and use your application more efficiently.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(shortcutsMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(shortcutsMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Submenus Section */}
          <section id="submenus" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Submenus</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organize related actions into hierarchical submenus for complex functionality.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(submenusMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(submenusMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Checkbox Items Section */}
          <section id="checkbox-items" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Checkbox Items</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use checkbox items for toggleable options and settings.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(checkboxMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(checkboxMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Radio Groups Section */}
          <section id="radio-groups" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Radio Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use radio groups for mutually exclusive options where only one can be selected.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(radioMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(radioMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Separators Section */}
          <section id="separators" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Separators</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use separators to visually group related menu items.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(separatorsMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(separatorsMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Item Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use different variants to highlight destructive or important actions.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(variantsMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(variantsMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Disabled Items Section */}
          <section id="disabled-items" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Disabled Items</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Disable menu items that are not currently available or applicable.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(disabledMenubarSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(disabledMenubarSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-8">
              
              {/* Main Menubar Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Menubar Props</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;menubar&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">menus</td>
                        <td className="py-3 px-4 font-mono">MenuSpec[]</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Array of menu configurations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Menu Item Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Menu Item Props</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;item&quot; | &quot;submenu&quot; | &quot;checkbox&quot; | &quot;radioGroup&quot; | &quot;separator&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Type of menu item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">label</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Text displayed for the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">shortcut</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Keyboard shortcut display</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Icon to display with the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the item is disabled</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                        <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;destructive&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Visual variant of the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">inset</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the item should be inset</td>
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
              A comprehensive example showcasing all menubar features in a realistic application scenario.
            </p>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Complete Application Menubar</h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                {render(applicationMenubarSpec)}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  View JSON Specification
                </summary>
                <CodeBlock language="json" className="mt-2">
                {JSON.stringify(applicationMenubarSpec, null, 2)}
              </CodeBlock>
              </details>
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