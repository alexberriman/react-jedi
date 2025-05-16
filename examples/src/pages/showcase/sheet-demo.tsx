import React from "react";
import { render, ComponentSpec } from "../../../../src";

const sheetDemo: ComponentSpec = {
  type: "Container",
  className: "min-h-screen py-12",
  children: [
    {
      type: "Heading",
      level: "h1",
      className: "text-4xl font-bold mb-8 text-center",
      children: "Sheet Component Examples",
    },
    {
      type: "Container",
      className: "space-y-12",
      children: [
        // Basic Sheet example
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Basic Sheet",
            },
            {
              type: "Container",
              className: "flex gap-4",
              children: {
                type: "Sheet",
                children: [
                  {
                    type: "SheetTrigger",
                    asChild: true,
                    children: {
                      type: "Button",
                      variant: "outline",
                      children: "Open Basic Sheet",
                    },
                  },
                  {
                    type: "SheetContent",
                    children: [
                      {
                        type: "SheetHeader",
                        children: [
                          {
                            type: "SheetTitle",
                            children: "Sheet Title",
                          },
                          {
                            type: "SheetDescription",
                            children:
                              "This is a sheet description. Sheets are used for tasks that don't require the user to leave the current page.",
                          },
                        ],
                      },
                      {
                        type: "Container",
                        className: "py-4",
                        children: {
                          type: "Text",
                          children: "Sheet content goes here.",
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // Sheet with Form
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Sheet with Form",
            },
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    children: "Edit Profile",
                  },
                },
                {
                  type: "SheetContent",
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          children: "Edit profile",
                        },
                        {
                          type: "SheetDescription",
                          children:
                            "Make changes to your profile here. Click save when you're done.",
                        },
                      ],
                    },
                    {
                      type: "Container",
                      className: "grid gap-4 py-4",
                      children: [
                        {
                          type: "Container",
                          className: "grid grid-cols-4 items-center gap-4",
                          children: [
                            {
                              type: "Label",
                              htmlFor: "name",
                              className: "text-right",
                              children: "Name",
                            },
                            {
                              type: "Input",
                              id: "name",
                              className: "col-span-3",
                              placeholder: "Enter your name",
                            },
                          ],
                        },
                        {
                          type: "Container",
                          className: "grid grid-cols-4 items-center gap-4",
                          children: [
                            {
                              type: "Label",
                              htmlFor: "username",
                              className: "text-right",
                              children: "Username",
                            },
                            {
                              type: "Input",
                              id: "username",
                              className: "col-span-3",
                              placeholder: "Enter your username",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "SheetFooter",
                      children: {
                        type: "SheetClose",
                        asChild: true,
                        children: {
                          type: "Button",
                          children: "Save changes",
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Different Sheet Positions
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Sheet Positions",
            },
            {
              type: "Container",
              className: "grid grid-cols-2 gap-4",
              children: [
                {
                  type: "Sheet",
                  children: [
                    {
                      type: "SheetTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "outline",
                        children: "Open from Left",
                      },
                    },
                    {
                      type: "SheetContent",
                      side: "left",
                      children: {
                        type: "SheetHeader",
                        children: [
                          {
                            type: "SheetTitle",
                            children: "Left Sheet",
                          },
                          {
                            type: "SheetDescription",
                            children: "This sheet slides in from the left.",
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: "Sheet",
                  children: [
                    {
                      type: "SheetTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "outline",
                        children: "Open from Right",
                      },
                    },
                    {
                      type: "SheetContent",
                      side: "right",
                      children: {
                        type: "SheetHeader",
                        children: [
                          {
                            type: "SheetTitle",
                            children: "Right Sheet",
                          },
                          {
                            type: "SheetDescription",
                            children: "This sheet slides in from the right (default).",
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: "Sheet",
                  children: [
                    {
                      type: "SheetTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "outline",
                        children: "Open from Top",
                      },
                    },
                    {
                      type: "SheetContent",
                      side: "top",
                      children: {
                        type: "SheetHeader",
                        children: [
                          {
                            type: "SheetTitle",
                            children: "Top Sheet",
                          },
                          {
                            type: "SheetDescription",
                            children: "This sheet slides in from the top.",
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: "Sheet",
                  children: [
                    {
                      type: "SheetTrigger",
                      asChild: true,
                      children: {
                        type: "Button",
                        variant: "outline",
                        children: "Open from Bottom",
                      },
                    },
                    {
                      type: "SheetContent",
                      side: "bottom",
                      children: {
                        type: "SheetHeader",
                        children: [
                          {
                            type: "SheetTitle",
                            children: "Bottom Sheet",
                          },
                          {
                            type: "SheetDescription",
                            children: "This sheet slides in from the bottom.",
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
        // Custom Styled Sheet
        {
          type: "Container",
          className: "space-y-4",
          children: [
            {
              type: "Heading",
              level: "h2",
              className: "text-2xl font-semibold",
              children: "Custom Styled Sheet",
            },
            {
              type: "Sheet",
              children: [
                {
                  type: "SheetTrigger",
                  asChild: true,
                  children: {
                    type: "Button",
                    variant: "secondary",
                    children: "Open Custom Sheet",
                  },
                },
                {
                  type: "SheetContent",
                  className:
                    "w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
                  children: [
                    {
                      type: "SheetHeader",
                      children: [
                        {
                          type: "SheetTitle",
                          className:
                            "text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                          children: "Premium Features",
                        },
                        {
                          type: "SheetDescription",
                          className: "text-purple-700 dark:text-purple-300",
                          children: "Unlock exclusive features with our premium plan.",
                        },
                      ],
                    },
                    {
                      type: "Container",
                      className: "py-8 space-y-4",
                      children: [
                        {
                          type: "Container",
                          className: "p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",
                          children: [
                            {
                              type: "Heading",
                              level: "h4",
                              className: "font-semibold text-purple-900 dark:text-purple-100",
                              children: "🚀 Unlimited Projects",
                            },
                            {
                              type: "Text",
                              className: "text-sm text-purple-700 dark:text-purple-300",
                              children: "Create as many projects as you need.",
                            },
                          ],
                        },
                        {
                          type: "Container",
                          className: "p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur",
                          children: [
                            {
                              type: "Heading",
                              level: "h4",
                              className: "font-semibold text-purple-900 dark:text-purple-100",
                              children: "⚡ Priority Support",
                            },
                            {
                              type: "Text",
                              className: "text-sm text-purple-700 dark:text-purple-300",
                              children: "Get help when you need it most.",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "SheetFooter",
                      children: [
                        {
                          type: "SheetClose",
                          asChild: true,
                          children: {
                            type: "Button",
                            variant: "outline",
                            children: "Maybe Later",
                          },
                        },
                        {
                          type: "Button",
                          className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
                          children: "Upgrade Now",
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
};

export function SheetDemo() {
  return render(sheetDemo);
}
