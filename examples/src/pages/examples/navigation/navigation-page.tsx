import React from "react";
import { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";

const navigationSpec: UISpecification = {
  version: "1.0.0",
  metadata: {
    title: "Navigation Components Showcase",
    description: "Modern navigation components with 2025 design aesthetics",
  },
  theme: {
    dark: {
      background: "#0a0a0b",
      foreground: "#ffffff",
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      muted: "#18181b",
      mutedForeground: "#a1a1aa",
      border: "#27272a",
    },
    radius: "medium",
    borderWidth: "1",
  },
  root: {
    type: "Container",
    className:
      "bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black min-h-screen",
    children: [
      // Hero Section
      {
        type: "Box",
        className: "relative mb-12 pt-8",
        children: [
          {
            type: "Box",
            className:
              "absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl",
          },
          {
            type: "Box",
            className: "relative z-10",
            children: [
              {
                type: "Heading",
                level: 1,
                children: ["✨ Navigation Components"],
                className:
                  "text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4",
              },
              {
                type: "Text",
                children: ["Modern navigation patterns for cutting-edge web applications"],
                className: "text-xl text-gray-600 dark:text-gray-300",
              },
            ],
          },
        ],
      },

      // Navigation Menu Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["🚀 Navigation Menu"],
            className: "text-3xl font-bold mb-6",
          },
          {
            type: "Card",
            className:
              "overflow-hidden shadow-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-800",
            children: [
              {
                type: "Box",
                className: "p-6",
                children: [
                  {
                    type: "NavigationMenu",
                    items: [
                      {
                        trigger: "Products",
                        content: {
                          type: "Box",
                          className: "w-[600px] p-6",
                          children: [
                            {
                              type: "Grid",
                              columns: 2,
                              gap: 4,
                              children: [
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Heading",
                                      level: 3,
                                      children: ["🎯 React Jedi"],
                                      className: "font-semibold mb-2",
                                    },
                                    {
                                      type: "Text",
                                      children: ["Server-driven UI framework"],
                                      className: "text-sm text-gray-600 dark:text-gray-400",
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Heading",
                                      level: 3,
                                      children: ["🎨 Design System"],
                                      className: "font-semibold mb-2",
                                    },
                                    {
                                      type: "Text",
                                      children: ["Component library and themes"],
                                      className: "text-sm text-gray-600 dark:text-gray-400",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                      {
                        trigger: "Solutions",
                        href: "/solutions",
                      },
                      {
                        trigger: "Resources",
                        content: {
                          type: "Box",
                          className: "w-[400px] p-6",
                          children: [
                            {
                              type: "Stack",
                              direction: "vertical",
                              spacing: 4,
                              children: [
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Text",
                                      children: ["📚 Documentation"],
                                      className:
                                        "font-medium hover:text-purple-600 transition-colors cursor-pointer",
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Text",
                                      children: ["🚀 Getting Started"],
                                      className:
                                        "font-medium hover:text-purple-600 transition-colors cursor-pointer",
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  children: [
                                    {
                                      type: "Text",
                                      children: ["💡 Examples"],
                                      className:
                                        "font-medium hover:text-purple-600 transition-colors cursor-pointer",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Breadcrumb Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["🍞 Breadcrumb Navigation"],
            className: "text-3xl font-bold mb-6",
          },
          {
            type: "Grid",
            columns: 2,
            gap: 4,
            children: [
              {
                type: "Card",
                className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
                children: [
                  {
                    type: "Text",
                    children: ["Modern Breadcrumb"],
                    className: "mb-4 font-semibold text-lg",
                  },
                  {
                    type: "breadcrumb",
                    items: [
                      { label: "Home", href: "/", icon: "🏠" },
                      { label: "Products", href: "/products", icon: "📦" },
                      { label: "React Jedi", href: "/products/react-jedi", icon: "⚛️" },
                      { label: "Components", isCurrentPage: true, icon: "🧩" },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
                children: [
                  {
                    type: "Text",
                    children: ["Minimal Style"],
                    className: "mb-4 font-semibold text-lg",
                  },
                  {
                    type: "breadcrumb",
                    separator: "→",
                    items: [
                      { label: "Dashboard", href: "/" },
                      { label: "Analytics", href: "/analytics" },
                      { label: "Reports", isCurrentPage: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Command Palette Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["⌘ Command Palette"],
            className: "text-3xl font-bold mb-6",
          },
          {
            type: "Card",
            className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
            children: [
              {
                type: "Box",
                className: "mb-4",
                children: [
                  {
                    type: "Text",
                    children: ["Press ⌘K to open command palette"],
                    className: "text-gray-600 dark:text-gray-400",
                  },
                ],
              },
              {
                type: "Command",
                open: true,
                groups: [
                  {
                    heading: "Suggestions",
                    items: [
                      { value: "calendar", label: "📅 Calendar" },
                      { value: "search-emoji", label: "😀 Search Emoji" },
                      { value: "calculator", label: "🧮 Calculator" },
                    ],
                  },
                  {
                    heading: "Settings",
                    items: [
                      { value: "profile", label: "👤 Profile" },
                      { value: "billing", label: "💳 Billing" },
                      { value: "settings", label: "⚙️ Settings" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Menu Components Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📋 Menu Components"],
            className: "text-3xl font-bold mb-6",
          },
          {
            type: "Grid",
            columns: 3,
            gap: 4,
            children: [
              // Dropdown Menu
              {
                type: "Card",
                className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
                children: [
                  {
                    type: "Text",
                    children: ["Dropdown Menu"],
                    className: "mb-4 font-semibold text-lg",
                  },
                  {
                    type: "DropdownMenu",
                    trigger: {
                      type: "Button",
                      variant: "outline",
                      children: ["Options"],
                    },
                    items: [
                      { type: "label", label: "My Account" },
                      { type: "separator" },
                      { label: "Profile", shortcut: "⇧⌘P" },
                      { label: "Billing", shortcut: "⌘B" },
                      { label: "Team", shortcut: "⌘T" },
                      { label: "Subscription", shortcut: "⌘S" },
                      { type: "separator" },
                      { label: "Log out", shortcut: "⇧⌘Q" },
                    ],
                  },
                ],
              },

              // Context Menu
              {
                type: "Card",
                className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
                children: [
                  {
                    type: "Text",
                    children: ["Context Menu"],
                    className: "mb-4 font-semibold text-lg",
                  },
                  {
                    type: "ContextMenu",
                    trigger: {
                      type: "Box",
                      className:
                        "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition-colors",
                      children: [
                        {
                          type: "Text",
                          children: ["Right click me"],
                          className: "text-gray-600",
                        },
                      ],
                    },
                    items: [
                      { label: "Copy", shortcut: "⌘C" },
                      { label: "Cut", shortcut: "⌘X" },
                      { label: "Paste", shortcut: "⌘V" },
                      { type: "separator" },
                      { label: "Delete", shortcut: "⌫" },
                    ],
                  },
                ],
              },

              // Menubar
              {
                type: "Card",
                className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
                children: [
                  {
                    type: "Text",
                    children: ["Menubar"],
                    className: "mb-4 font-semibold text-lg",
                  },
                  {
                    type: "Menubar",
                    menus: [
                      {
                        trigger: "File",
                        items: [
                          { label: "New File", shortcut: "⌘N" },
                          { label: "Open", shortcut: "⌘O" },
                          { type: "separator" },
                          { label: "Save", shortcut: "⌘S" },
                          { label: "Save As", shortcut: "⇧⌘S" },
                        ],
                      },
                      {
                        trigger: "Edit",
                        items: [
                          { label: "Undo", shortcut: "⌘Z" },
                          { label: "Redo", shortcut: "⇧⌘Z" },
                          { type: "separator" },
                          { label: "Cut", shortcut: "⌘X" },
                          { label: "Copy", shortcut: "⌘C" },
                          { label: "Paste", shortcut: "⌘V" },
                        ],
                      },
                      {
                        trigger: "View",
                        items: [
                          { label: "Zoom In", shortcut: "⌘+" },
                          { label: "Zoom Out", shortcut: "⌘-" },
                          { type: "separator" },
                          { label: "Full Screen", shortcut: "⌃⌘F" },
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

      // Sidebar Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📱 Sidebar Navigation"],
            className: "text-3xl font-bold mb-6",
          },
          {
            type: "Box",
            className: "h-[600px] border rounded-lg overflow-hidden shadow-xl",
            children: [
              {
                type: "Flex",
                className: "h-full",
                children: [
                  {
                    type: "Box",
                    className: "w-64 bg-gray-50 dark:bg-gray-900 border-r",
                    children: [
                      {
                        type: "Sidebar",
                        className: "w-64",
                        header: {
                          type: "Box",
                          className: "p-4",
                          children: [
                            {
                              type: "Heading",
                              level: 3,
                              children: ["🚀 React Jedi"],
                              className: "font-bold",
                            },
                          ],
                        },
                        content: {
                          type: "Stack",
                          direction: "vertical",
                          spacing: 1,
                          className: "p-4",
                          children: [
                            {
                              type: "Box",
                              className:
                                "px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors",
                              children: [
                                {
                                  type: "Text",
                                  children: ["🏠 Dashboard"],
                                  className: "font-medium",
                                },
                              ],
                            },
                            {
                              type: "Box",
                              className:
                                "px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors",
                              children: [
                                {
                                  type: "Text",
                                  children: ["📦 Components"],
                                  className: "font-medium",
                                },
                              ],
                            },
                            {
                              type: "Box",
                              className:
                                "px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors",
                              children: [
                                {
                                  type: "Text",
                                  children: ["🎨 Themes"],
                                  className: "font-medium",
                                },
                              ],
                            },
                            {
                              type: "Separator",
                              className: "my-4",
                            },
                            {
                              type: "Box",
                              className:
                                "px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors",
                              children: [
                                {
                                  type: "Text",
                                  children: ["⚙️ Settings"],
                                  className: "font-medium",
                                },
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "flex-1 p-8",
                    children: [
                      {
                        type: "Heading",
                        level: 3,
                        children: ["Main Content Area"],
                        className: "mb-4",
                      },
                      {
                        type: "Text",
                        children: [
                          "This is where your main application content would go. The sidebar provides navigation while the main area displays the selected content.",
                        ],
                        className: "text-gray-600 dark:text-gray-400",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Pagination Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📄 Pagination"],
            className: "text-3xl font-bold mb-6",
          },
          {
            type: "Card",
            className: "p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50",
            children: [
              {
                type: "Flex",
                justify: "center",
                children: [
                  {
                    type: "Pagination",
                    currentPage: 3,
                    totalPages: 10,
                    showPreviousNext: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export function NavigationPage() {
  return render(navigationSpec);
}
