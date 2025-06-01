import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function CommandShowcase() {
  usePageMetadata({
    title: "Command Component",
    description:
      "A comprehensive showcase of the React Jedi Command component with search functionality, keyboard navigation, grouped items, and dialog variants.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-command", label: "Basic Command" },
    { id: "grouped-commands", label: "Grouped Commands" },
    { id: "command-dialog", label: "Command Dialog" },
    { id: "with-shortcuts", label: "With Shortcuts" },
    { id: "navigation-palette", label: "Navigation Palette" },
    { id: "empty-states", label: "Empty States" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic command specification
  const basicCommandSpec: UISpecification = {
    type: "command",
    searchPlaceholder: "Type to search...",
    emptyMessage: "No results found.",
    items: [
      { id: "calendar", label: "Calendar", icon: "📅" },
      { id: "calculator", label: "Calculator", icon: "🧮" },
      { id: "camera", label: "Camera", icon: "📷" },
      { id: "contacts", label: "Contacts", icon: "👥" },
      { id: "files", label: "Files", icon: "📁" },
    ],
  };

  // Grouped commands specification
  const groupedCommandSpec: UISpecification = {
    type: "command",
    searchPlaceholder: "Search commands...",
    emptyMessage: "No commands found.",
    groups: [
      {
        heading: "Files",
        items: [
          { id: "new-file", label: "New File", icon: "📄" },
          { id: "open-file", label: "Open File", icon: "📂" },
          { id: "save-file", label: "Save File", icon: "💾" },
          { id: "close-file", label: "Close File", icon: "❌" },
        ],
      },
      {
        heading: "Edit",
        items: [
          { id: "copy", label: "Copy", icon: "📋" },
          { id: "paste", label: "Paste", icon: "📄" },
          { id: "cut", label: "Cut", icon: "✂️" },
          { id: "undo", label: "Undo", icon: "↩️" },
        ],
      },
      {
        heading: "View",
        items: [
          { id: "zoom-in", label: "Zoom In", icon: "🔍" },
          { id: "zoom-out", label: "Zoom Out", icon: "🔎" },
          { id: "fullscreen", label: "Full Screen", icon: "📺" },
        ],
      },
    ],
  };

  // Command with shortcuts specification
  const shortcutsCommandSpec: UISpecification = {
    type: "command",
    searchPlaceholder: "Search actions...",
    groups: [
      {
        heading: "Common Actions",
        items: [
          { id: "new", label: "New Document", icon: "➕", shortcut: "⌘N" },
          { id: "open", label: "Open", icon: "📁", shortcut: "⌘O" },
          { id: "save", label: "Save", icon: "💾", shortcut: "⌘S" },
          { id: "print", label: "Print", icon: "🖨️", shortcut: "⌘P" },
        ],
      },
      {
        heading: "Quick Actions",
        items: [
          { id: "search", label: "Search", icon: "🔍", shortcut: "⌘F" },
          { id: "replace", label: "Find & Replace", icon: "🔄", shortcut: "⌘H" },
          { id: "goto", label: "Go to Line", icon: "🎯", shortcut: "⌘G" },
          { id: "palette", label: "Command Palette", icon: "⌨️", shortcut: "⌘K" },
        ],
      },
    ],
  };

  // Navigation palette specification
  const navigationSpec: UISpecification = {
    type: "command",
    searchPlaceholder: "Navigate to...",
    emptyMessage: "No pages found.",
    groups: [
      {
        heading: "Main Pages",
        items: [
          { id: "dashboard", label: "Dashboard", icon: "📊" },
          { id: "projects", label: "Projects", icon: "📁" },
          { id: "team", label: "Team", icon: "👥" },
          { id: "settings", label: "Settings", icon: "⚙️" },
        ],
      },
      {
        heading: "Recent Files",
        items: [
          { id: "doc1", label: "Product Requirements.md", icon: "📄" },
          { id: "doc2", label: "Design System.figma", icon: "🎨" },
          { id: "doc3", label: "API Documentation.md", icon: "📚" },
          { id: "doc4", label: "Meeting Notes.txt", icon: "📝" },
        ],
      },
      {
        heading: "Quick Links",
        items: [
          { id: "help", label: "Help Center", icon: "❓" },
          { id: "feedback", label: "Send Feedback", icon: "💬" },
          { id: "shortcuts", label: "Keyboard Shortcuts", icon: "⌨️" },
        ],
      },
    ],
  };

  // Empty state example
  const emptyStateSpec: UISpecification = {
    type: "command",
    searchPlaceholder: "Search for something that doesn't exist...",
    emptyMessage: "🤷‍♂️ Oops! Nothing matches your search.",
    items: [
      { id: "one", label: "Apple", icon: "🍎" },
      { id: "two", label: "Banana", icon: "🍌" },
      { id: "three", label: "Cherry", icon: "🍒" },
    ],
  };

  // Command dialog example
  const commandDialogSpec: UISpecification = {
    type: "commandDialog",
    open: false,
    title: "Quick Actions",
    description: "Search for an action to perform",
    searchPlaceholder: "Type a command...",
    emptyMessage: "No actions found.",
    groups: [
      {
        heading: "Create",
        items: [
          { id: "new-project", label: "New Project", icon: "🚀" },
          { id: "new-task", label: "New Task", icon: "✅" },
          { id: "new-note", label: "New Note", icon: "📝" },
        ],
      },
      {
        heading: "Navigate",
        items: [
          { id: "go-home", label: "Go to Dashboard", icon: "🏠" },
          { id: "go-inbox", label: "Go to Inbox", icon: "📥" },
          { id: "go-calendar", label: "Go to Calendar", icon: "📅" },
        ],
      },
    ],
  };

  // Developer tools command palette
  const devToolsSpec: UISpecification = {
    type: "command",
    searchPlaceholder: "Developer tools...",
    className: "border-2 border-blue-200 dark:border-blue-800",
    groups: [
      {
        heading: "Debug",
        items: [
          { id: "inspect", label: "Inspect Element", icon: "🔍", shortcut: "F12" },
          { id: "console", label: "Console", icon: "💻", shortcut: "⌘J" },
          { id: "network", label: "Network Tab", icon: "🌐", shortcut: "⌘⇧E" },
          { id: "lighthouse", label: "Lighthouse", icon: "💡" },
        ],
      },
      {
        heading: "Tools",
        items: [
          { id: "format", label: "Format Document", icon: "✨", shortcut: "⌘⇧F" },
          { id: "terminal", label: "Terminal", icon: "⚫", shortcut: "⌘`" },
          { id: "git", label: "Git Commands", icon: "🌳", shortcut: "⌘⇧G" },
          { id: "extensions", label: "Extensions", icon: "🧩", shortcut: "⌘⇧X" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Command Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful command palette component for searching and executing commands. Built for keyboard-first navigation with search, filtering, and grouped organization.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Command component provides a flexible command palette interface that allows users to quickly search and execute commands. It supports both inline and dialog modes, with powerful search capabilities and keyboard navigation.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fuzzy search with instant filtering</li>
                <li>Keyboard navigation (arrow keys, Enter, Escape)</li>
                <li>Grouped command organization</li>
                <li>Keyboard shortcuts display</li>
                <li>Dialog and inline variants</li>
                <li>Icons and custom styling support</li>
                <li>Empty state customization</li>
                <li>Fully accessible with ARIA support</li>
              </ul>
            </div>
          </section>

          {/* Basic Command Section */}
          <section id="basic-command" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Command</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple command palette with ungrouped items. Try typing to search through the commands.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="max-w-md mx-auto">
                {render(basicCommandSpec)}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicCommandSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Grouped Commands Section */}
          <section id="grouped-commands" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Grouped Commands</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organize commands into logical groups with headings. Search works across all groups.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="max-w-md mx-auto">
                {render(groupedCommandSpec)}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(groupedCommandSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Command Dialog Section */}
          <section id="command-dialog" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Command Dialog</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Modal version of the command palette with title and description. Perfect for global command palettes.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Click the button below to open the command dialog
                </p>
                {/* Note: This would normally be interactive, but for showcase we show the structure */}
                <div className="inline-block p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <p className="text-sm">Command Dialog (Interactive)</p>
                  <p className="text-xs text-gray-500 mt-1">Structure shown in JSON below</p>
                </div>
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(commandDialogSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Shortcuts Section */}
          <section id="with-shortcuts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Keyboard Shortcuts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display keyboard shortcuts alongside command labels for better discoverability.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="max-w-md mx-auto">
                {render(shortcutsCommandSpec)}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(shortcutsCommandSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Navigation Palette Section */}
          <section id="navigation-palette" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Navigation Palette</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use command palettes for app navigation with recent files and quick links.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="max-w-md mx-auto">
                {render(navigationSpec)}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(navigationSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Empty States Section */}
          <section id="empty-states" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Custom Empty States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Customize the message shown when no search results are found. Try searching for &quot;xyz&quot; in the command below.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="max-w-md mx-auto">
                {render(emptyStateSpec)}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(emptyStateSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-8">
              {/* Command Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Command Properties</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;command&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">searchPlaceholder</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">&quot;Search commands...&quot;</td>
                        <td className="py-3 px-4">Placeholder text for search input</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">emptyMessage</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">&quot;No results found.&quot;</td>
                        <td className="py-3 px-4">Message shown when no results match</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">items</td>
                        <td className="py-3 px-4 font-mono">CommandItem[]</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Array of ungrouped command items</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">groups</td>
                        <td className="py-3 px-4 font-mono">CommandGroup[]</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Array of grouped command items</td>
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

              {/* CommandDialog Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">CommandDialog Properties</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;commandDialog&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">open</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the dialog is open</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">&quot;Command Palette&quot;</td>
                        <td className="py-3 px-4">Dialog title</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">&quot;Search for a command to run...&quot;</td>
                        <td className="py-3 px-4">Dialog description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CommandItem Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">CommandItem Properties</h3>
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
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">id</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Unique identifier for the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">label</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Display label for the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Icon to display (emoji or icon name)</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">shortcut</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Keyboard shortcut to display</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the item is disabled</td>
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
              Real-world command palette examples for different use cases.
            </p>
            
            <div className="space-y-8">
              {/* Developer Tools Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Developer Tools Command Palette</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A command palette designed for developer tools with debug options and shortcuts.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="max-w-md mx-auto">
                    {render(devToolsSpec)}
                  </div>
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(devToolsSpec, null, 2)}
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