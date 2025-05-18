import React from "react";
import { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { PageHeader } from "../../../components/ui/page-header";

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
    shadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    },
  },
  root: {
    type: "Container",
    className:
      "bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black",
    children: [

      // Navigation Menu Section - Ultra-modern
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["🚀 Navigation Menu"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Box",
            className: "relative",
            children: [
              // Glowing background effect
              {
                type: "Box",
                className:
                  "absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl rounded-3xl",
              },
              {
                type: "Card",
                className:
                  "relative overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl",
                children: [
                  {
                    type: "Box",
                    className: "p-8",
                    children: [
                      {
                        type: "NavigationMenu",
                        className: "w-full",
                        items: [
                          {
                            trigger: "Products",
                            content: {
                              type: "Box",
                              className:
                                "w-[700px] p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl",
                              children: [
                                {
                                  type: "Heading",
                                  level: 3,
                                  children: ["Our Products"],
                                  className:
                                    "text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                                },
                                {
                                  type: "Grid",
                                  columns: 2,
                                  gap: 6,
                                  children: [
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Flex",
                                          align: "start",
                                          gap: 3,
                                          children: [
                                            {
                                              type: "Box",
                                              className: "text-3xl",
                                              children: ["🎯"],
                                            },
                                            {
                                              type: "Box",
                                              children: [
                                                {
                                                  type: "Heading",
                                                  level: 4,
                                                  children: ["React Jedi"],
                                                  className:
                                                    "font-semibold mb-1 group-hover:text-purple-600 transition-colors",
                                                },
                                                {
                                                  type: "Text",
                                                  children: [
                                                    "Server-driven UI framework for rapid development",
                                                  ],
                                                  className:
                                                    "text-sm text-gray-600 dark:text-gray-400",
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Flex",
                                          align: "start",
                                          gap: 3,
                                          children: [
                                            {
                                              type: "Box",
                                              className: "text-3xl",
                                              children: ["🎨"],
                                            },
                                            {
                                              type: "Box",
                                              children: [
                                                {
                                                  type: "Heading",
                                                  level: 4,
                                                  children: ["Design System"],
                                                  className:
                                                    "font-semibold mb-1 group-hover:text-pink-600 transition-colors",
                                                },
                                                {
                                                  type: "Text",
                                                  children: [
                                                    "Component library with modern themes",
                                                  ],
                                                  className:
                                                    "text-sm text-gray-600 dark:text-gray-400",
                                                },
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
                          },
                          {
                            trigger: "Solutions",
                            content: {
                              type: "Box",
                              className:
                                "w-[500px] p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl",
                              children: [
                                {
                                  type: "Stack",
                                  spacing: 4,
                                  children: [
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["💼 Enterprise Solutions"],
                                          className:
                                            "font-semibold text-lg group-hover:text-purple-600 transition-colors",
                                        },
                                      ],
                                    },
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["🚀 Startup Package"],
                                          className:
                                            "font-semibold text-lg group-hover:text-purple-600 transition-colors",
                                        },
                                      ],
                                    },
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["🎯 Custom Development"],
                                          className:
                                            "font-semibold text-lg group-hover:text-purple-600 transition-colors",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                          {
                            trigger: "Resources",
                            content: {
                              type: "Box",
                              className:
                                "w-[450px] p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl",
                              children: [
                                {
                                  type: "Stack",
                                  direction: "vertical",
                                  spacing: 4,
                                  children: [
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["📚 Documentation"],
                                          className:
                                            "font-medium text-lg group-hover:text-blue-600 transition-colors",
                                        },
                                      ],
                                    },
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["🚀 Getting Started"],
                                          className:
                                            "font-medium text-lg group-hover:text-green-600 transition-colors",
                                        },
                                      ],
                                    },
                                    {
                                      type: "Box",
                                      className:
                                        "group hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg p-4 transition-all cursor-pointer",
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["💡 Examples"],
                                          className:
                                            "font-medium text-lg group-hover:text-orange-600 transition-colors",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                          {
                            trigger: "Pricing",
                            href: "/pricing",
                          },
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

      // Breadcrumb Section - Multiple Styles
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["🍞 Breadcrumb Navigation"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 2,
            gap: 6,
            children: [
              // Modern Glassmorphic Breadcrumb
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["🌟 Modern Glassmorphic"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Breadcrumb",
                    className:
                      "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-2 px-4",
                    items: [
                      { label: "Home", href: "/", icon: "🏠" },
                      { label: "Products", href: "/products", icon: "📦" },
                      { label: "React Jedi", href: "/products/react-jedi", icon: "⚛️" },
                      { label: "Components", isCurrentPage: true, icon: "🧩" },
                    ],
                  },
                ],
              },
              // Minimal Arrow Style
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["➡️ Minimal Arrow"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Breadcrumb",
                    separator: "→",
                    className: "text-lg",
                    items: [
                      { label: "Dashboard", href: "/" },
                      { label: "Analytics", href: "/analytics" },
                      { label: "Reports", isCurrentPage: true },
                    ],
                  },
                ],
              },
              // Pill Style Breadcrumb
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["💊 Pill Style"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Breadcrumb",
                    className: "flex gap-2",
                    itemClassName:
                      "bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    currentItemClassName: "bg-purple-600 text-white",
                    items: [
                      { label: "Account", href: "/account" },
                      { label: "Settings", href: "/settings" },
                      { label: "Privacy", isCurrentPage: true },
                    ],
                  },
                ],
              },
              // Outlined Style
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["📐 Outlined Style"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Breadcrumb",
                    className: "flex gap-2",
                    itemClassName:
                      "border-2 border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors",
                    currentItemClassName: "border-purple-600 bg-purple-50 dark:bg-purple-900/20",
                    items: [
                      { label: "Store", href: "/store" },
                      { label: "Electronics", href: "/electronics" },
                      { label: "Laptops", href: "/laptops" },
                      { label: "MacBook Pro", isCurrentPage: true },
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
                      { id: "calendar", value: "calendar", label: "📅 Calendar" },
                      { id: "search-emoji", value: "search-emoji", label: "😀 Search Emoji" },
                      { id: "calculator", value: "calculator", label: "🧮 Calculator" },
                    ],
                  },
                  {
                    heading: "Settings",
                    items: [
                      { id: "profile", value: "profile", label: "👤 Profile" },
                      { id: "billing", value: "billing", label: "💳 Billing" },
                      { id: "settings", value: "settings", label: "⚙️ Settings" },
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

      // Sidebar Section - Multiple Variations
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📱 Sidebar Navigation"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 1,
            gap: 8,
            children: [
              // Modern Glassmorphic Sidebar
              {
                type: "Box",
                className:
                  "h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800",
                children: [
                  {
                    type: "Flex",
                    className: "h-full",
                    children: [
                      {
                        type: "Box",
                        className:
                          "w-80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30",
                        children: [
                          {
                            type: "Sidebar",
                            className: "w-full",
                            header: {
                              type: "Box",
                              className: "p-6 border-b border-gray-200/50 dark:border-gray-700/50",
                              children: [
                                {
                                  type: "Flex",
                                  align: "center",
                                  gap: 3,
                                  children: [
                                    {
                                      type: "Box",
                                      className:
                                        "w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg",
                                      children: ["RJ"],
                                    },
                                    {
                                      type: "Box",
                                      children: [
                                        {
                                          type: "Heading",
                                          level: 3,
                                          children: ["React Jedi"],
                                          className: "font-bold text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Admin Dashboard"],
                                          className: "text-sm text-gray-500 dark:text-gray-400",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            content: {
                              type: "Stack",
                              direction: "vertical",
                              spacing: 2,
                              className: "p-6",
                              children: [
                                {
                                  type: "Text",
                                  children: ["MAIN"],
                                  className:
                                    "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2",
                                },
                                {
                                  type: "Box",
                                  className:
                                    "px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg cursor-pointer transform transition-all hover:scale-105",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["🏠"],
                                          className: "text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Dashboard"],
                                          className: "font-medium",
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["📦"],
                                          className: "text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Components"],
                                          className: "font-medium",
                                        },
                                        {
                                          type: "Badge",
                                          children: ["New"],
                                          className: "ml-auto bg-green-500 text-white",
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["🎨"],
                                          className: "text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Themes"],
                                          className: "font-medium",
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["📊"],
                                          className: "text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Analytics"],
                                          className: "font-medium",
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Separator",
                                  className: "my-4",
                                },
                                {
                                  type: "Text",
                                  children: ["SETTINGS"],
                                  className:
                                    "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2",
                                },
                                {
                                  type: "Box",
                                  className:
                                    "px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["⚙️"],
                                          className: "text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Settings"],
                                          className: "font-medium",
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Text",
                                          children: ["👤"],
                                          className: "text-xl",
                                        },
                                        {
                                          type: "Text",
                                          children: ["Profile"],
                                          className: "font-medium",
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            footer: {
                              type: "Box",
                              className: "p-6 border-t border-gray-200/50 dark:border-gray-700/50",
                              children: [
                                {
                                  type: "Flex",
                                  align: "center",
                                  justify: "between",
                                  children: [
                                    {
                                      type: "Flex",
                                      align: "center",
                                      gap: 3,
                                      children: [
                                        {
                                          type: "Avatar",
                                          src: "https://github.com/shadcn.png",
                                          alt: "User",
                                        },
                                        {
                                          type: "Box",
                                          children: [
                                            {
                                              type: "Text",
                                              children: ["John Doe"],
                                              className: "font-medium",
                                            },
                                            {
                                              type: "Text",
                                              children: ["john@example.com"],
                                              className: "text-sm text-gray-500 dark:text-gray-400",
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      type: "Button",
                                      variant: "ghost",
                                      size: "sm",
                                      children: ["🚪"],
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
                            type: "Box",
                            className:
                              "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl",
                            children: [
                              {
                                type: "Heading",
                                level: 3,
                                children: ["Welcome to React Jedi Dashboard"],
                                className: "mb-4 text-2xl font-bold",
                              },
                              {
                                type: "Text",
                                children: [
                                  "This modern glassmorphic sidebar provides a beautiful and intuitive navigation experience. The sidebar includes sections, badges, user profile, and smooth hover effects.",
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
              // Minimal Sidebar
              {
                type: "Box",
                className:
                  "h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700",
                children: [
                  {
                    type: "Flex",
                    className: "h-full",
                    children: [
                      {
                        type: "Box",
                        className: "w-20 bg-white dark:bg-gray-900 border-r shadow-sm",
                        children: [
                          {
                            type: "Sidebar",
                            className: "w-full",
                            content: {
                              type: "Stack",
                              direction: "vertical",
                              spacing: 4,
                              className: "p-4",
                              align: "center",
                              children: [
                                {
                                  type: "Box",
                                  className:
                                    "w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg mb-4",
                                  children: ["R"],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all flex items-center justify-center text-2xl",
                                  children: ["🏠"],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all flex items-center justify-center text-2xl",
                                  children: ["📦"],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all flex items-center justify-center text-2xl",
                                  children: ["🎨"],
                                },
                                {
                                  type: "Box",
                                  className:
                                    "w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all flex items-center justify-center text-2xl",
                                  children: ["📊"],
                                },
                                {
                                  type: "Separator",
                                  className: "mx-auto w-8",
                                },
                                {
                                  type: "Box",
                                  className:
                                    "w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all flex items-center justify-center text-2xl",
                                  children: ["⚙️"],
                                },
                              ],
                            },
                          },
                        ],
                      },
                      {
                        type: "Box",
                        className: "flex-1 p-8 bg-gray-50 dark:bg-gray-800",
                        children: [
                          {
                            type: "Box",
                            className: "bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg",
                            children: [
                              {
                                type: "Heading",
                                level: 3,
                                children: ["Minimal Icon Sidebar"],
                                className: "mb-4 text-2xl font-bold",
                              },
                              {
                                type: "Text",
                                children: [
                                  "This minimal sidebar design uses only icons for navigation, perfect for applications that need more content space. Hover over icons to see tooltips in the actual implementation.",
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
            ],
          },
        ],
      },

      // Pagination Section - Different Styles
      {
        type: "Box",
        className: "mb-20",
        children: [
          {
            type: "Heading",
            level: 2,
            children: ["📄 Pagination"],
            className: "text-4xl font-bold mb-8 text-center",
          },
          {
            type: "Grid",
            columns: 2,
            gap: 6,
            children: [
              // Default Pagination
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["🔢 Default Style"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                  },
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
              // Compact Pagination
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["🎯 Compact Style"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Flex",
                    justify: "center",
                    children: [
                      {
                        type: "Pagination",
                        currentPage: 5,
                        totalPages: 20,
                        siblingCount: 1,
                        showPreviousNext: true,
                        compact: true,
                      },
                    ],
                  },
                ],
              },
              // Rounded Style
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["⭕ Rounded Pills"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Flex",
                    justify: "center",
                    children: [
                      {
                        type: "Pagination",
                        currentPage: 1,
                        totalPages: 5,
                        showPreviousNext: true,
                        className: "[&>*]:rounded-full",
                      },
                    ],
                  },
                ],
              },
              // Large Size
              {
                type: "Card",
                className:
                  "p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl",
                children: [
                  {
                    type: "Text",
                    children: ["🔍 Large Size"],
                    className:
                      "mb-4 font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent",
                  },
                  {
                    type: "Flex",
                    justify: "center",
                    children: [
                      {
                        type: "Pagination",
                        currentPage: 7,
                        totalPages: 15,
                        showPreviousNext: true,
                        size: "lg",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Final CTA Section
      {
        type: "Box",
        className: "mb-16",
        children: [
          {
            type: "Box",
            className:
              "text-center py-20 px-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl",
            children: [
              {
                type: "Heading",
                level: 2,
                children: ["🚀 Ready to Build Amazing Navigation?"],
                className:
                  "text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
              },
              {
                type: "Text",
                children: [
                  "Create beautiful, accessible navigation components with React Jedi's modern design system",
                ],
                className: "text-xl text-gray-600 dark:text-gray-300 mb-8",
              },
              {
                type: "Flex",
                justify: "center",
                gap: 4,
                children: [
                  {
                    type: "Button",
                    size: "lg",
                    className:
                      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
                    children: ["Get Started"],
                  },
                  {
                    type: "Button",
                    size: "lg",
                    variant: "outline",
                    children: ["View Documentation"],
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
  usePageMetadata({
    title: "Navigation Components",
    description:
      "React Jedi navigation components showcase featuring modern menus, breadcrumbs, and navigation patterns.",
  });

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Navigation Components Showcase"
        description="Modern navigation components with 2025 design aesthetics"
      />
      
      <div className="container mx-auto px-4 py-8">
        {render(navigationSpec)}
      </div>
    </div>
  );
}
