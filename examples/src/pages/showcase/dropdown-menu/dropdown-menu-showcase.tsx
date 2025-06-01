import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function DropdownMenuShowcase() {
  usePageMetadata({
    title: "DropdownMenu Component",
    description:
      "A comprehensive showcase of the React Jedi DropdownMenu component with all item types, configurations, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Dropdown" },
    { id: "with-icons", label: "With Icons" },
    { id: "with-shortcuts", label: "With Shortcuts" },
    { id: "checkbox-items", label: "Checkbox Items" },
    { id: "radio-groups", label: "Radio Groups" },
    { id: "separators", label: "Separators & Groups" },
    { id: "submenu", label: "Nested Submenus" },
    { id: "destructive", label: "Destructive Actions" },
    { id: "disabled", label: "Disabled States" },
    { id: "alignment", label: "Alignment Options" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic dropdown specification
  const basicSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Open Menu",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuItem", children: "Profile" },
          { type: "DropdownMenuItem", children: "Settings" },
          { type: "DropdownMenuItem", children: "Team" },
          { type: "DropdownMenuItem", children: "New Team" },
        ],
      },
    ],
  };

  // With icons specification
  const withIconsSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Actions",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", className: "mr-2", children: "👤" },
              { type: "Text", children: "Profile" },
            ],
          },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", className: "mr-2", children: "⚙️" },
              { type: "Text", children: "Settings" },
            ],
          },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", className: "mr-2", children: "💳" },
              { type: "Text", children: "Billing" },
            ],
          },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", className: "mr-2", children: "🚪" },
              { type: "Text", children: "Sign out" },
            ],
          },
        ],
      },
    ],
  };

  // With shortcuts specification
  const withShortcutsSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Edit",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", children: "Undo" },
              { type: "DropdownMenuShortcut", children: "⌘Z" },
            ],
          },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", children: "Redo" },
              { type: "DropdownMenuShortcut", children: "⌘Y" },
            ],
          },
          { type: "DropdownMenuSeparator" },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", children: "Cut" },
              { type: "DropdownMenuShortcut", children: "⌘X" },
            ],
          },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", children: "Copy" },
              { type: "DropdownMenuShortcut", children: "⌘C" },
            ],
          },
          {
            type: "DropdownMenuItem",
            children: [
              { type: "Text", children: "Paste" },
              { type: "DropdownMenuShortcut", children: "⌘V" },
            ],
          },
        ],
      },
    ],
  };

  // Checkbox items specification
  const checkboxSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "View",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuLabel", children: "Panel Visibility" },
          { type: "DropdownMenuSeparator" },
          { type: "DropdownMenuCheckboxItem", checked: true, children: "Status Bar" },
          { type: "DropdownMenuCheckboxItem", checked: false, children: "Activity Bar" },
          { type: "DropdownMenuCheckboxItem", checked: true, children: "Side Bar" },
          { type: "DropdownMenuSeparator" },
          { type: "DropdownMenuCheckboxItem", checked: false, children: "Minimap" },
          { type: "DropdownMenuCheckboxItem", checked: true, children: "Breadcrumbs" },
        ],
      },
    ],
  };

  // Radio group specification
  const radioGroupSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Theme",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuLabel", children: "Select Theme" },
          { type: "DropdownMenuSeparator" },
          {
            type: "DropdownMenuRadioGroup",
            value: "light",
            children: [
              { type: "DropdownMenuRadioItem", value: "light", children: "Light" },
              { type: "DropdownMenuRadioItem", value: "dark", children: "Dark" },
              { type: "DropdownMenuRadioItem", value: "system", children: "System" },
            ],
          },
        ],
      },
    ],
  };

  // Separators and groups specification
  const groupsSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Options",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuLabel", children: "Personal" },
          {
            type: "DropdownMenuGroup",
            children: [
              { type: "DropdownMenuItem", children: "Profile" },
              { type: "DropdownMenuItem", children: "Settings" },
              { type: "DropdownMenuItem", children: "Preferences" },
            ],
          },
          { type: "DropdownMenuSeparator" },
          { type: "DropdownMenuLabel", children: "Team" },
          {
            type: "DropdownMenuGroup",
            children: [
              { type: "DropdownMenuItem", children: "Invite Members" },
              { type: "DropdownMenuItem", children: "Team Settings" },
              { type: "DropdownMenuItem", children: "Billing" },
            ],
          },
          { type: "DropdownMenuSeparator" },
          { type: "DropdownMenuItem", children: "Log out" },
        ],
      },
    ],
  };

  // Submenu specification
  const submenuSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "More Options",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuItem", children: "New File" },
          { type: "DropdownMenuItem", children: "Open File" },
          { type: "DropdownMenuSeparator" },
          {
            type: "DropdownMenuSub",
            children: [
              { type: "DropdownMenuSubTrigger", children: "Share" },
              {
                type: "DropdownMenuSubContent",
                children: [
                  { type: "DropdownMenuItem", children: "Email" },
                  { type: "DropdownMenuItem", children: "Message" },
                  { type: "DropdownMenuSeparator" },
                  {
                    type: "DropdownMenuSub",
                    children: [
                      { type: "DropdownMenuSubTrigger", children: "Social" },
                      {
                        type: "DropdownMenuSubContent",
                        children: [
                          { type: "DropdownMenuItem", children: "Twitter" },
                          { type: "DropdownMenuItem", children: "Facebook" },
                          { type: "DropdownMenuItem", children: "LinkedIn" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "DropdownMenuSeparator" },
          { type: "DropdownMenuItem", children: "Print" },
        ],
      },
    ],
  };

  // Destructive actions specification
  const destructiveSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Account",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuItem", children: "Profile" },
          { type: "DropdownMenuItem", children: "Settings" },
          { type: "DropdownMenuItem", children: "Support" },
          { type: "DropdownMenuSeparator" },
          {
            type: "DropdownMenuItem",
            variant: "destructive",
            children: [
              { type: "Text", className: "mr-2", children: "🗑️" },
              { type: "Text", children: "Delete Account" },
            ],
          },
        ],
      },
    ],
  };

  // Disabled states specification
  const disabledSpec: UISpecification = {
    type: "DropdownMenu",
    children: [
      {
        type: "DropdownMenuTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Actions",
        },
      },
      {
        type: "DropdownMenuContent",
        className: "w-56",
        children: [
          { type: "DropdownMenuItem", children: "Enabled Action" },
          { type: "DropdownMenuItem", disabled: true, children: "Disabled Action" },
          { type: "DropdownMenuSeparator" },
          { type: "DropdownMenuCheckboxItem", children: "Enabled Checkbox" },
          { type: "DropdownMenuCheckboxItem", disabled: true, checked: true, children: "Disabled Checkbox" },
          { type: "DropdownMenuSeparator" },
          {
            type: "DropdownMenuRadioGroup",
            value: "option1",
            children: [
              { type: "DropdownMenuRadioItem", value: "option1", children: "Enabled Option" },
              { type: "DropdownMenuRadioItem", value: "option2", disabled: true, children: "Disabled Option" },
            ],
          },
        ],
      },
    ],
  };

  // Alignment options specification
  const alignmentSpec: UISpecification = {
    type: "Group",
    spacing: "8",
    className: "flex-wrap",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", className: "mb-2", children: "Align: Start" },
          {
            type: "DropdownMenu",
            children: [
              {
                type: "DropdownMenuTrigger",
                asChild: true,
                children: {
                  type: "Button",
                  variant: "outline",
                  size: "sm",
                  children: "Start",
                },
              },
              {
                type: "DropdownMenuContent",
                align: "start",
                className: "w-40",
                children: [
                  { type: "DropdownMenuItem", children: "Item 1" },
                  { type: "DropdownMenuItem", children: "Item 2" },
                  { type: "DropdownMenuItem", children: "Item 3" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", className: "mb-2", children: "Align: Center" },
          {
            type: "DropdownMenu",
            children: [
              {
                type: "DropdownMenuTrigger",
                asChild: true,
                children: {
                  type: "Button",
                  variant: "outline",
                  size: "sm",
                  children: "Center",
                },
              },
              {
                type: "DropdownMenuContent",
                align: "center",
                className: "w-40",
                children: [
                  { type: "DropdownMenuItem", children: "Item 1" },
                  { type: "DropdownMenuItem", children: "Item 2" },
                  { type: "DropdownMenuItem", children: "Item 3" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "small", variant: "muted", className: "mb-2", children: "Align: End" },
          {
            type: "DropdownMenu",
            children: [
              {
                type: "DropdownMenuTrigger",
                asChild: true,
                children: {
                  type: "Button",
                  variant: "outline",
                  size: "sm",
                  children: "End",
                },
              },
              {
                type: "DropdownMenuContent",
                align: "end",
                className: "w-40",
                children: [
                  { type: "DropdownMenuItem", children: "Item 1" },
                  { type: "DropdownMenuItem", children: "Item 2" },
                  { type: "DropdownMenuItem", children: "Item 3" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Complete user menu example
  const userMenuSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-sm",
    children: [
      {
        type: "CardHeader",
        className: "pb-3",
        children: [
          {
            type: "Flex",
            justify: "space-between",
            align: "center",
            children: [
              { type: "CardTitle", children: "Dashboard" },
              {
                type: "DropdownMenu",
                children: [
                  {
                    type: "DropdownMenuTrigger",
                    asChild: true,
                    children: {
                      type: "Button",
                      variant: "ghost",
                      size: "icon",
                      children: {
                        type: "Avatar",
                        children: [
                          { type: "AvatarImage", src: "https://github.com/shadcn.png" },
                          { type: "AvatarFallback", children: "CN" },
                        ],
                      },
                    },
                  },
                  {
                    type: "DropdownMenuContent",
                    align: "end",
                    className: "w-56",
                    children: [
                      {
                        type: "DropdownMenuLabel",
                        children: {
                          type: "Stack",
                          spacing: "1",
                          children: [
                            { type: "Text", className: "font-semibold", children: "shadcn" },
                            { type: "Text", size: "small", variant: "muted", children: "m@example.com" },
                          ],
                        },
                      },
                      { type: "DropdownMenuSeparator" },
                      {
                        type: "DropdownMenuGroup",
                        children: [
                          {
                            type: "DropdownMenuItem",
                            children: [
                              { type: "Text", className: "mr-2", children: "👤" },
                              { type: "Text", children: "Profile" },
                              { type: "DropdownMenuShortcut", children: "⇧⌘P" },
                            ],
                          },
                          {
                            type: "DropdownMenuItem",
                            children: [
                              { type: "Text", className: "mr-2", children: "💳" },
                              { type: "Text", children: "Billing" },
                              { type: "DropdownMenuShortcut", children: "⌘B" },
                            ],
                          },
                          {
                            type: "DropdownMenuItem",
                            children: [
                              { type: "Text", className: "mr-2", children: "⚙️" },
                              { type: "Text", children: "Settings" },
                              { type: "DropdownMenuShortcut", children: "⌘S" },
                            ],
                          },
                          {
                            type: "DropdownMenuItem",
                            children: [
                              { type: "Text", className: "mr-2", children: "⌨️" },
                              { type: "Text", children: "Keyboard shortcuts" },
                              { type: "DropdownMenuShortcut", children: "⌘K" },
                            ],
                          },
                        ],
                      },
                      { type: "DropdownMenuSeparator" },
                      {
                        type: "DropdownMenuGroup",
                        children: [
                          {
                            type: "DropdownMenuItem",
                            children: [
                              { type: "Text", className: "mr-2", children: "👥" },
                              { type: "Text", children: "Team" },
                            ],
                          },
                          {
                            type: "DropdownMenuSub",
                            children: [
                              {
                                type: "DropdownMenuSubTrigger",
                                children: [
                                  { type: "Text", className: "mr-2", children: "➕" },
                                  { type: "Text", children: "Invite users" },
                                ],
                              },
                              {
                                type: "DropdownMenuSubContent",
                                children: [
                                  {
                                    type: "DropdownMenuItem",
                                    children: [
                                      { type: "Text", className: "mr-2", children: "✉️" },
                                      { type: "Text", children: "Email" },
                                    ],
                                  },
                                  {
                                    type: "DropdownMenuItem",
                                    children: [
                                      { type: "Text", className: "mr-2", children: "💬" },
                                      { type: "Text", children: "Message" },
                                    ],
                                  },
                                  { type: "DropdownMenuSeparator" },
                                  {
                                    type: "DropdownMenuItem",
                                    children: [
                                      { type: "Text", className: "mr-2", children: "➕" },
                                      { type: "Text", children: "More..." },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "DropdownMenuItem",
                            children: [
                              { type: "Text", className: "mr-2", children: "➕" },
                              { type: "Text", children: "New Team" },
                              { type: "DropdownMenuShortcut", children: "⌘+T" },
                            ],
                          },
                        ],
                      },
                      { type: "DropdownMenuSeparator" },
                      {
                        type: "DropdownMenuItem",
                        children: [
                          { type: "Text", className: "mr-2", children: "🔗" },
                          { type: "Text", children: "GitHub" },
                        ],
                      },
                      {
                        type: "DropdownMenuItem",
                        children: [
                          { type: "Text", className: "mr-2", children: "🆘" },
                          { type: "Text", children: "Support" },
                        ],
                      },
                      {
                        type: "DropdownMenuItem",
                        disabled: true,
                        children: [
                          { type: "Text", className: "mr-2", children: "🔧" },
                          { type: "Text", children: "API" },
                        ],
                      },
                      { type: "DropdownMenuSeparator" },
                      {
                        type: "DropdownMenuItem",
                        children: [
                          { type: "Text", className: "mr-2", children: "🚪" },
                          { type: "Text", children: "Log out" },
                          { type: "DropdownMenuShortcut", children: "⇧⌘Q" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Text",
          variant: "muted",
          children: "Click the avatar to see a complete user menu with all dropdown features.",
        },
      },
    ],
  };

  // Table actions example
  const tableActionsSpec: UISpecification = {
    type: "Box",
    className: "w-full",
    children: {
      type: "Table",
      head: {
        rows: [
          {
            cells: [
              { content: "Name" },
              { content: "Status" },
              { content: "Role" },
              { content: "", align: "right" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              { content: "John Doe" },
              { content: { type: "Badge", variant: "secondary", children: "Active" } },
              { content: "Admin" },
              {
                content: {
                  type: "DropdownMenu",
                  children: [
                    {
                      type: "DropdownMenuTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-8 w-8",
                        children: "⋮",
                      },
                    },
                    {
                      type: "DropdownMenuContent",
                      align: "end",
                      children: [
                        { type: "DropdownMenuLabel", children: "Actions" },
                        { type: "DropdownMenuItem", children: "View profile" },
                        { type: "DropdownMenuItem", children: "Edit user" },
                        { type: "DropdownMenuSeparator" },
                        { type: "DropdownMenuItem", children: "Reset password" },
                        { type: "DropdownMenuItem", variant: "destructive", children: "Delete user" },
                      ],
                    },
                  ],
                },
                align: "right",
              },
            ],
          },
          {
            cells: [
              { content: "Jane Smith" },
              { content: { type: "Badge", variant: "secondary", children: "Active" } },
              { content: "User" },
              {
                content: {
                  type: "DropdownMenu",
                  children: [
                    {
                      type: "DropdownMenuTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-8 w-8",
                        children: "⋮",
                      },
                    },
                    {
                      type: "DropdownMenuContent",
                      align: "end",
                      children: [
                        { type: "DropdownMenuLabel", children: "Actions" },
                        { type: "DropdownMenuItem", children: "View profile" },
                        { type: "DropdownMenuItem", children: "Edit user" },
                        { type: "DropdownMenuSeparator" },
                        { type: "DropdownMenuItem", children: "Reset password" },
                        { type: "DropdownMenuItem", variant: "destructive", children: "Delete user" },
                      ],
                    },
                  ],
                },
                align: "right",
              },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">DropdownMenu Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile dropdown menu component that provides a list of options or actions. Perfect for context menus, user account menus, and action buttons with multiple choices.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The DropdownMenu component is a powerful UI element that displays a list of options when triggered. It supports various item types including regular items, checkbox items, radio groups, separators, and nested submenus.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple item types (regular, checkbox, radio, separator)</li>
                <li>Nested submenus for complex hierarchies</li>
                <li>Keyboard navigation support</li>
                <li>Icon and shortcut support</li>
                <li>Destructive action styling</li>
                <li>Disabled states for items</li>
                <li>Flexible alignment and positioning</li>
                <li>Fully accessible with ARIA attributes</li>
              </ul>
            </div>
          </section>

          {/* Basic Dropdown Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Dropdown</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple dropdown menu with basic menu items.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(basicSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance menu items with icons for better visual communication.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withIconsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(withIconsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* With Shortcuts Section */}
          <section id="with-shortcuts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Shortcuts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display keyboard shortcuts alongside menu items.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(withShortcutsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(withShortcutsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Checkbox Items Section */}
          <section id="checkbox-items" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Checkbox Items</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use checkbox items for toggleable options where multiple selections are allowed.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(checkboxSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(checkboxSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Radio Groups Section */}
          <section id="radio-groups" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Radio Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Use radio groups for mutually exclusive options where only one selection is allowed.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(radioGroupSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(radioGroupSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Separators & Groups Section */}
          <section id="separators" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Separators & Groups</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organize menu items with separators and groups for better structure.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(groupsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(groupsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Submenu Section */}
          <section id="submenu" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Nested Submenus</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create hierarchical menus with nested submenus for complex navigation structures.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(submenuSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(submenuSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Destructive Actions Section */}
          <section id="destructive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Destructive Actions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Highlight dangerous or destructive actions with the destructive variant.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(destructiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(destructiveSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Disabled States Section */}
          <section id="disabled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Disabled States</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Disable individual items or groups to prevent interaction.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(disabledSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(disabledSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Alignment Options Section */}
          <section id="alignment" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Alignment Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control how the dropdown aligns relative to the trigger element.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
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

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-6">
              {/* DropdownMenu Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">DropdownMenu Props</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;DropdownMenu&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">open</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Controlled open state</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultOpen</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Default open state</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">modal</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">true</td>
                        <td className="py-3 px-4">Whether the dropdown is modal</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onOpenChange</td>
                        <td className="py-3 px-4 font-mono">ActionSpec</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Callback when open state changes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DropdownMenuContent Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">DropdownMenuContent Props</h3>
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
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                        <td className="py-3 px-4 font-mono">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td>
                        <td className="py-3 px-4">&quot;center&quot;</td>
                        <td className="py-3 px-4">Alignment relative to trigger</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">side</td>
                        <td className="py-3 px-4 font-mono">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</td>
                        <td className="py-3 px-4">&quot;bottom&quot;</td>
                        <td className="py-3 px-4">Side of trigger to render</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">sideOffset</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">4</td>
                        <td className="py-3 px-4">Offset from the side</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">alignOffset</td>
                        <td className="py-3 px-4 font-mono">number</td>
                        <td className="py-3 px-4">0</td>
                        <td className="py-3 px-4">Offset from the align option</td>
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

              {/* DropdownMenuItem Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">DropdownMenuItem Props</h3>
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
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                        <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;destructive&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Visual variant of the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether the item is disabled</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">inset</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">false</td>
                        <td className="py-3 px-4">Whether to inset the item</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onClick</td>
                        <td className="py-3 px-4 font-mono">ActionSpec</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Click event handler</td>
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
              See how dropdown menus work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* User Menu Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">User Account Menu</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(userMenuSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(userMenuSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Table Actions Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Table Row Actions</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(tableActionsSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(tableActionsSpec, null, 2)}
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