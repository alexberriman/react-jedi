import React from "react";
import { render } from "@banja/react-jedi";
import type { UISpecification } from "@banja/react-jedi";

export function ConditionalPage() {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [userRole, setUserRole] = React.useState<"guest" | "user" | "admin">("guest");
  const [isLoading, setIsLoading] = React.useState(false);

  const specification: UISpecification = {
    root: {
      type: "Container",
      className: "space-y-6 pb-12",
      children: [
        {
          type: "Heading",
          level: "h1",
          className: "text-4xl font-bold mb-4",
          children: "Conditional Rendering Demo",
        },
        {
          type: "Text",
          className: "text-lg text-zinc-400 mb-8",
          children:
            "This example demonstrates conditional visibility and dynamic properties based on application state.",
        },
        {
          type: "Box",
          className: "space-y-6",
          children: [
            // Control panel
            {
              type: "Box",
              className: "p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-4",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-semibold mb-4",
                  children: "Controls",
                },
                {
                  type: "Flex",
                  className: "gap-4 flex-wrap",
                  children: [
                    {
                      type: "Button",
                      onClick: () => setShowAdvanced(!showAdvanced),
                      children: showAdvanced ? "Hide Advanced" : "Show Advanced",
                      variant: showAdvanced ? "default" : "outline",
                    },
                    {
                      type: "Button",
                      onClick: () => setTheme(theme === "light" ? "dark" : "light"),
                      children: theme === "light" ? "Switch to Dark" : "Switch to Light",
                      variant: "outline",
                    },
                    {
                      type: "Button",
                      onClick: () => {
                        const roles: ("guest" | "user" | "admin")[] = ["guest", "user", "admin"];
                        const currentIndex = roles.indexOf(userRole);
                        const nextIndex = (currentIndex + 1) % roles.length;
                        setUserRole(roles[nextIndex]);
                      },
                      children: `Role: ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`,
                      variant: (() => {
                        if (userRole === "admin") return "destructive";
                        if (userRole === "user") return "default";
                        return "secondary";
                      })(),
                    },
                    {
                      type: "Button",
                      onClick: () => {
                        setIsLoading(true);
                        globalThis.setTimeout(() => setIsLoading(false), 2000);
                      },
                      disabled: isLoading,
                      children: isLoading ? "Loading..." : "Simulate Loading",
                      variant: "outline",
                    },
                  ],
                },
              ],
            },

            // Conditional visibility example
            {
              type: "Box",
              className: "p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-semibold mb-4",
                  children: "Conditional Visibility",
                },
                {
                  type: "Text",
                  className: "text-zinc-400 mb-4",
                  children: "Components can be shown or hidden based on state conditions.",
                },
                {
                  type: "Box",
                  when: "state.showAdvanced",
                  className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg",
                  children: {
                    type: "Text",
                    children:
                      "🎉 Advanced options are now visible! This box only appears when 'Show Advanced' is active.",
                  },
                },
                {
                  type: "Box",
                  when: "!state.showAdvanced",
                  className: "p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg",
                  children: {
                    type: "Text",
                    children: "Basic view is active. Click 'Show Advanced' to see more options.",
                  },
                },
              ],
            },

            // Role-based content
            {
              type: "Box",
              className: "p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-semibold mb-4",
                  children: "Role-Based Content",
                },
                {
                  type: "Text",
                  className: "text-zinc-400 mb-4",
                  children: "Different content appears based on the user's role.",
                },
                {
                  type: "Box",
                  when: 'state.userRole === "guest"',
                  className: "p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg",
                  children: [
                    {
                      type: "Text",
                      className: "mb-3",
                      children: "👋 Welcome, Guest! You have limited access.",
                    },
                    {
                      type: "Button",
                      variant: "outline",
                      children: "Sign In to Continue",
                    },
                  ],
                },
                {
                  type: "Box",
                  when: 'state.userRole === "user"',
                  className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg",
                  children: [
                    {
                      type: "Text",
                      className: "mb-3",
                      children: "🎯 Welcome back, User! You have standard access.",
                    },
                    {
                      type: "Flex",
                      className: "gap-3",
                      children: [
                        {
                          type: "Button",
                          variant: "default",
                          children: "View Dashboard",
                        },
                        {
                          type: "Button",
                          variant: "outline",
                          children: "Settings",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "Box",
                  when: 'state.userRole === "admin"',
                  className: "p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg",
                  children: [
                    {
                      type: "Text",
                      className: "mb-3",
                      children: "⚡ Welcome, Admin! You have full system access.",
                    },
                    {
                      type: "Flex",
                      className: "gap-3",
                      children: [
                        {
                          type: "Button",
                          variant: "default",
                          children: "Admin Panel",
                        },
                        {
                          type: "Button",
                          variant: "destructive",
                          children: "System Settings",
                        },
                        {
                          type: "Button",
                          variant: "outline",
                          children: "User Management",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Conditional properties
            {
              type: "Box",
              className: "p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-semibold mb-4",
                  children: "Conditional Properties",
                },
                {
                  type: "Text",
                  className: "text-zinc-400 mb-4",
                  children: "Component properties can change dynamically based on state.",
                },
                {
                  type: "Flex",
                  className: "gap-4 flex-wrap",
                  children: [
                    {
                      type: "Button",
                      conditionalProps: {
                        variant: {
                          'state.theme === "dark"': "default",
                          'state.theme === "light"': "outline",
                        },
                        children: {
                          'state.theme === "dark"': "🌙 Dark Mode",
                          'state.theme === "light"': "☀️ Light Mode",
                        },
                      },
                    },
                    {
                      type: "Badge",
                      conditionalProps: {
                        variant: {
                          'state.userRole === "admin"': "destructive",
                          'state.userRole === "user"': "default",
                          'state.userRole === "guest"': "secondary",
                        },
                        children: {
                          'state.userRole === "admin"': "Admin Access",
                          'state.userRole === "user"': "User Access",
                          'state.userRole === "guest"': "Guest Access",
                        },
                      },
                    },
                    {
                      type: "Button",
                      conditionalProps: {
                        disabled: {
                          "state.isLoading": true,
                        },
                        children: {
                          "state.isLoading": "Processing...",
                          "!state.isLoading": "Submit Form",
                        },
                      },
                    },
                  ],
                },
              ],
            },

            // Complex conditions
            {
              type: "Box",
              className: "p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-semibold mb-4",
                  children: "Complex Conditions",
                },
                {
                  type: "Text",
                  className: "text-zinc-400 mb-4",
                  children: "Combine multiple conditions with logical operators.",
                },
                {
                  type: "Box",
                  when: 'state.showAdvanced && state.userRole !== "guest"',
                  className: "p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-3",
                  children: {
                    type: "Text",
                    children:
                      "✅ This message appears only for logged-in users when advanced mode is enabled.",
                  },
                },
                {
                  type: "Box",
                  when: '(state.theme === "dark" && state.userRole === "admin") || state.isLoading',
                  className: "p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg",
                  children: {
                    type: "Text",
                    children: "🔮 This appears for admins in dark mode OR during loading states.",
                  },
                },
              ],
            },

            // Theme-aware components
            {
              type: "Box",
              conditionalProps: {
                className: {
                  'state.theme === "dark"': "p-6 bg-zinc-900 border border-zinc-700 rounded-lg",
                  'state.theme === "light"': "p-6 bg-white border border-zinc-200 rounded-lg",
                },
              },
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-semibold mb-4",
                  conditionalProps: {
                    className: {
                      'state.theme === "dark"': "text-xl font-semibold mb-4 text-white",
                      'state.theme === "light"': "text-xl font-semibold mb-4 text-zinc-900",
                    },
                  },
                  children: "Theme-Aware Styling",
                },
                {
                  type: "Text",
                  conditionalProps: {
                    className: {
                      'state.theme === "dark"': "text-zinc-300",
                      'state.theme === "light"': "text-zinc-600",
                    },
                  },
                  children:
                    "This section adapts its styling based on the current theme setting. Try switching between light and dark modes to see the changes.",
                },
              ],
            },
          ],
        },
      ],
    },
    state: {
      initial: {
        showAdvanced,
        theme,
        userRole,
        isLoading,
      },
    },
  };

  return render(specification);
}
