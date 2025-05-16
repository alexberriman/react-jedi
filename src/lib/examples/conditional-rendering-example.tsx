/**
 * Conditional Rendering Example
 *
 * Demonstrates the conditional rendering capabilities of React Jedi
 */

import React from "react";
import { render } from "../render";
import type { UISpecification } from "../types/schema/specification";

export function ConditionalRenderingExample() {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [userRole, setUserRole] = React.useState<"guest" | "user" | "admin">("guest");

  const specification: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Container",
      className: "space-y-6",
      children: [
        {
          type: "Heading",
          level: "h1",
          children: "Conditional Rendering Demo",
        },
        {
          type: "Box",
          className: "space-y-4",
          children: [
            // Control panel
            {
              type: "Box",
              className: "p-4 border rounded-lg space-y-4",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  children: "Controls",
                },
                {
                  type: "Flex",
                  className: "gap-4",
                  children: [
                    {
                      type: "Button",
                      onClick: () => setShowAdvanced(!showAdvanced),
                      children: `${showAdvanced ? "Hide" : "Show"} Advanced Options`,
                    },
                    {
                      type: "Button",
                      onClick: () => setTheme(theme === "light" ? "dark" : "light"),
                      children: `Switch to ${theme === "light" ? "Dark" : "Light"} Theme`,
                    },
                    {
                      type: "Button",
                      onClick: () => {
                        const roles: ("guest" | "user" | "admin")[] = ["guest", "user", "admin"];
                        const currentIndex = roles.indexOf(userRole);
                        const nextIndex = (currentIndex + 1) % roles.length;
                        setUserRole(roles[nextIndex]);
                      },
                      children: `Role: ${userRole}`,
                    },
                  ],
                },
              ],
            },

            // Conditional visibility
            {
              type: "Box",
              className: "p-4 border rounded-lg",
              conditionalProps: {
                className: {
                  'state.theme === "dark"': "p-4 border rounded-lg bg-gray-800 text-white",
                  'state.theme === "light"': "p-4 border rounded-lg bg-white",
                },
              },
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  children: "Conditional Visibility",
                },
                {
                  type: "Text",
                  children: "This section demonstrates conditional visibility.",
                },
                {
                  type: "Box",
                  when: "state.showAdvanced",
                  className: "mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded",
                  children: {
                    type: "Text",
                    children: "Advanced options are now visible!",
                  },
                },
              ],
            },

            // Role-based content
            {
              type: "Box",
              className: "p-4 border rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  children: "Role-Based Content",
                },
                {
                  type: "Box",
                  when: 'state.userRole === "guest"',
                  children: {
                    type: "Text",
                    children: "Welcome, Guest! Please log in to see more content.",
                  },
                },
                {
                  type: "Box",
                  when: 'state.userRole === "user"',
                  children: [
                    {
                      type: "Text",
                      children: "Welcome, User! You have standard access.",
                    },
                    {
                      type: "Button",
                      className: "mt-2",
                      children: "User Actions",
                    },
                  ],
                },
                {
                  type: "Box",
                  when: 'state.userRole === "admin"',
                  children: [
                    {
                      type: "Text",
                      children: "Welcome, Admin! You have full access.",
                    },
                    {
                      type: "Flex",
                      className: "gap-2 mt-2",
                      children: [
                        {
                          type: "Button",
                          children: "Admin Panel",
                        },
                        {
                          type: "Button",
                          variant: "destructive",
                          children: "System Settings",
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
              className: "p-4 border rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  children: "Conditional Properties",
                },
                {
                  type: "Text",
                  children: "Buttons change based on state:",
                },
                {
                  type: "Flex",
                  className: "gap-4 mt-4",
                  children: [
                    {
                      type: "Button",
                      conditionalProps: {
                        variant: {
                          'state.theme === "dark"': "outline",
                          'state.theme === "light"': "default",
                        },
                        children: {
                          'state.theme === "dark"': "Dark Mode Active",
                          'state.theme === "light"': "Light Mode Active",
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
                          'state.userRole === "admin"': "Admin Badge",
                          'state.userRole === "user"': "User Badge",
                          'state.userRole === "guest"': "Guest Badge",
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
              className: "p-4 border rounded-lg",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  children: "Complex Conditions",
                },
                {
                  type: "Box",
                  when: 'state.showAdvanced && state.userRole !== "guest"',
                  children: {
                    type: "Alert",
                    children: "This alert only shows for logged-in users when advanced mode is on.",
                  },
                },
                {
                  type: "Box",
                  when: '(state.theme === "dark" && state.userRole === "admin") || state.showAdvanced',
                  className: "mt-2",
                  children: {
                    type: "Text",
                    children:
                      "This appears for dark-mode admins OR when advanced options are shown.",
                  },
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
      },
    },
  };

  return render(specification);
}
