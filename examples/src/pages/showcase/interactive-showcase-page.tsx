import React, { useState } from "react";
import { render } from "@banja/react-jedi";
import type { UISpecification } from "@banja/react-jedi";
import { Link } from "react-router-dom";

// Interactive component demonstrations
const interactiveDemos = {
  form: {
    name: "Form Components",
    description: "Complex form with validation, dynamic fields, and various input types",
    specification: {
      version: "1.0",
      root: {
        type: "Container",
        className: "max-w-2xl mx-auto",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "mb-6",
            props: {
              children: "User Registration Form",
            },
          },
          {
            type: "Box",
            className: "space-y-6",
            children: [
              {
                type: "Grid",
                columns: 2,
                gap: "md",
                children: [
                  {
                    type: "Box",
                    className: "space-y-2",
                    children: [
                      { type: "Label", props: { htmlFor: "firstName", children: "First Name" } },
                      { type: "Input", id: "firstName", name: "firstName", required: true },
                      {
                        type: "Text",
                        size: "sm",
                        variant: "muted",
                        props: { children: "Please enter your first name" },
                      },
                    ],
                  },
                  {
                    type: "Box",
                    className: "space-y-2",
                    children: [
                      { type: "Label", props: { htmlFor: "lastName", children: "Last Name" } },
                      { type: "Input", id: "lastName", name: "lastName", required: true },
                      {
                        type: "Text",
                        size: "sm",
                        variant: "muted",
                        props: { children: "Please enter your last name" },
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", props: { htmlFor: "email", children: "Email Address" } },
                  {
                    type: "Input",
                    id: "email",
                    name: "email",
                    props: { type: "email", required: true },
                  },
                  {
                    type: "Text",
                    size: "sm",
                    variant: "muted",
                    props: { children: "We'll never share your email with anyone else" },
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", props: { htmlFor: "bio", children: "Bio" } },
                  {
                    type: "Textarea",
                    id: "bio",
                    name: "bio",
                    placeholder: "Tell us about yourself...",
                    rows: 4,
                  },
                  {
                    type: "Text",
                    size: "sm",
                    variant: "muted",
                    props: { children: "Optional: Share a brief bio" },
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", props: { children: "Notification Preferences" } },
                  {
                    type: "Flex",
                    direction: "column",
                    gap: "sm",
                    children: [
                      {
                        type: "Flex",
                        align: "center",
                        gap: "sm",
                        children: [
                          { type: "Checkbox", id: "emailNotifs", name: "emailNotifs" },
                          {
                            type: "Label",
                            props: { htmlFor: "emailNotifs", children: "Email notifications" },
                          },
                        ],
                      },
                      {
                        type: "Flex",
                        align: "center",
                        gap: "sm",
                        children: [
                          { type: "Checkbox", id: "smsNotifs", name: "smsNotifs" },
                          {
                            type: "Label",
                            props: { htmlFor: "smsNotifs", children: "SMS notifications" },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", props: { children: "Account Type" } },
                  {
                    type: "RadioGroup",
                    props: { name: "accountType", defaultValue: "personal" },
                    children: [
                      {
                        type: "Flex",
                        align: "center",
                        gap: "sm",
                        children: [
                          { type: "RadioGroupItem", value: "personal", id: "personal" },
                          { type: "Label", props: { htmlFor: "personal", children: "Personal" } },
                        ],
                      },
                      {
                        type: "Flex",
                        align: "center",
                        gap: "sm",
                        children: [
                          { type: "RadioGroupItem", value: "business", id: "business" },
                          { type: "Label", props: { htmlFor: "business", children: "Business" } },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                className: "space-y-2",
                children: [
                  { type: "Label", props: { htmlFor: "country", children: "Country" } },
                  {
                    type: "Select",
                    name: "country",
                    children: [
                      {
                        type: "SelectTrigger",
                        children: [{ type: "SelectValue", placeholder: "Select your country" }],
                      },
                      {
                        type: "SelectContent",
                        children: [
                          { type: "SelectItem", value: "us", props: { children: "United States" } },
                          {
                            type: "SelectItem",
                            value: "uk",
                            props: { children: "United Kingdom" },
                          },
                          { type: "SelectItem", value: "ca", props: { children: "Canada" } },
                          { type: "SelectItem", value: "au", props: { children: "Australia" } },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Flex",
                gap: "md",
                children: [
                  { type: "Button", props: { type: "submit", children: "Submit" } },
                  {
                    type: "Button",
                    props: { type: "button", variant: "outline", children: "Cancel" },
                  },
                ],
              },
            ],
          },
        ],
      },
    } as UISpecification,
  },
  toggles: {
    name: "Toggle Components",
    description: "Various toggle components including switches, checkboxes, and toggle groups",
    specification: {
      version: "1.0",
      root: {
        type: "Container",
        className: "max-w-2xl mx-auto space-y-8",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", props: { children: "Switch Components" } },
                  { type: "CardDescription", props: { children: "Turn features on and off" } },
                ],
              },
              {
                type: "CardContent",
                className: "space-y-4",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    align: "center",
                    children: [
                      { type: "Text", props: { children: "Enable Notifications" } },
                      { type: "Switch", id: "notifications" },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "between",
                    align: "center",
                    children: [
                      { type: "Text", props: { children: "Dark Mode" } },
                      { type: "Switch", id: "darkMode", defaultChecked: true },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "between",
                    align: "center",
                    children: [
                      { type: "Text", props: { children: "Auto-save" } },
                      { type: "Switch", id: "autoSave", disabled: true },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", props: { children: "Toggle Buttons" } },
                  { type: "CardDescription", props: { children: "Individual toggle buttons" } },
                ],
              },
              {
                type: "CardContent",
                className: "space-y-4",
                children: [
                  { type: "Text", props: { children: "Text Formatting:" } },
                  {
                    type: "Flex",
                    gap: "sm",
                    children: [
                      { type: "Toggle", props: { children: "Bold" }, "aria-label": "Toggle bold" },
                      {
                        type: "Toggle",
                        props: { children: "Italic" },
                        "aria-label": "Toggle italic",
                      },
                      {
                        type: "Toggle",
                        props: { children: "Underline" },
                        "aria-label": "Toggle underline",
                      },
                    ],
                  },
                  { type: "Separator", className: "my-4" },
                  { type: "Text", props: { children: "Exclusive Options (Toggle Group):" } },
                  {
                    type: "ToggleGroup",
                    defaultValue: "center",
                    children: [
                      { type: "ToggleGroupItem", value: "left", props: { children: "Left" } },
                      { type: "ToggleGroupItem", value: "center", props: { children: "Center" } },
                      { type: "ToggleGroupItem", value: "right", props: { children: "Right" } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    } as UISpecification,
  },
  sliders: {
    name: "Slider & Range Controls",
    description: "Interactive sliders for selecting values within a range",
    specification: {
      version: "1.0",
      root: {
        type: "Container",
        className: "max-w-2xl mx-auto space-y-8",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", props: { children: "Volume Controls" } },
                  { type: "CardDescription", props: { children: "Adjust audio settings" } },
                ],
              },
              {
                type: "CardContent",
                className: "space-y-6",
                children: [
                  {
                    type: "Box",
                    children: [
                      { type: "Label", props: { htmlFor: "volume", children: "Master Volume" } },
                      {
                        type: "Slider",
                        id: "volume",
                        defaultValue: [75],
                        max: 100,
                        step: 1,
                        className: "mt-3",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    children: [
                      { type: "Label", props: { htmlFor: "bass", children: "Bass" } },
                      {
                        type: "Slider",
                        id: "bass",
                        defaultValue: [0],
                        min: -10,
                        max: 10,
                        step: 1,
                        className: "mt-3",
                      },
                    ],
                  },
                  {
                    type: "Box",
                    children: [
                      { type: "Label", props: { htmlFor: "treble", children: "Treble" } },
                      {
                        type: "Slider",
                        id: "treble",
                        defaultValue: [0],
                        min: -10,
                        max: 10,
                        step: 1,
                        className: "mt-3",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", props: { children: "Range Selection" } },
                  {
                    type: "CardDescription",
                    props: { children: "Select ranges with multiple handles" },
                  },
                ],
              },
              {
                type: "CardContent",
                className: "space-y-6",
                children: [
                  {
                    type: "Box",
                    children: [
                      { type: "Label", props: { children: "Price Range" } },
                      {
                        type: "Slider",
                        defaultValue: [20, 80],
                        max: 100,
                        step: 5,
                        className: "mt-3",
                      },
                      {
                        type: "Flex",
                        justify: "between",
                        className: "mt-2",
                        children: [
                          {
                            type: "Text",
                            size: "sm",
                            variant: "muted",
                            props: { children: "$20" },
                          },
                          {
                            type: "Text",
                            size: "sm",
                            variant: "muted",
                            props: { children: "$80" },
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
    } as UISpecification,
  },
  collapsible: {
    name: "Collapsible & Expandable",
    description: "Show and hide content interactively",
    specification: {
      version: "1.0",
      root: {
        type: "Container",
        className: "max-w-2xl mx-auto space-y-8",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  { type: "CardTitle", props: { children: "FAQ Section" } },
                  { type: "CardDescription", props: { children: "Click to expand answers" } },
                ],
              },
              {
                type: "CardContent",
                className: "space-y-4",
                children: [
                  {
                    type: "Collapsible",
                    children: [
                      {
                        type: "CollapsibleTrigger",
                        className: "w-full",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "px-4 py-3 hover:bg-muted rounded-lg cursor-pointer",
                            children: [
                              {
                                type: "Text",
                                weight: "medium",
                                props: { children: "What is React Jedi?" },
                              },
                              { type: "Text", variant: "muted", props: { children: "+" } },
                            ],
                          },
                        ],
                      },
                      {
                        type: "CollapsibleContent",
                        className: "px-4 py-3",
                        children: [
                          {
                            type: "Text",
                            variant: "muted",
                            props: {
                              children:
                                "React Jedi is a server-driven UI library that allows you to create React components using JSON specifications. It provides a declarative way to build interfaces without writing JSX directly.",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Collapsible",
                    children: [
                      {
                        type: "CollapsibleTrigger",
                        className: "w-full",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "px-4 py-3 hover:bg-muted rounded-lg cursor-pointer",
                            children: [
                              {
                                type: "Text",
                                weight: "medium",
                                props: { children: "How does theming work?" },
                              },
                              { type: "Text", variant: "muted", props: { children: "+" } },
                            ],
                          },
                        ],
                      },
                      {
                        type: "CollapsibleContent",
                        className: "px-4 py-3",
                        children: [
                          {
                            type: "Text",
                            variant: "muted",
                            props: {
                              children:
                                "The theming system allows you to customize colors, typography, spacing, and more through a JSON-based theme configuration. Themes can be nested and inherit from parent contexts.",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Collapsible",
                    children: [
                      {
                        type: "CollapsibleTrigger",
                        className: "w-full",
                        children: [
                          {
                            type: "Flex",
                            justify: "between",
                            align: "center",
                            className: "px-4 py-3 hover:bg-muted rounded-lg cursor-pointer",
                            children: [
                              {
                                type: "Text",
                                weight: "medium",
                                props: { children: "Can I use custom components?" },
                              },
                              { type: "Text", variant: "muted", props: { children: "+" } },
                            ],
                          },
                        ],
                      },
                      {
                        type: "CollapsibleContent",
                        className: "px-4 py-3",
                        children: [
                          {
                            type: "Text",
                            variant: "muted",
                            props: {
                              children:
                                "Yes! You can register custom components with the component resolver. This allows you to extend the system with your own components while maintaining the JSON-driven architecture.",
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
        ],
      },
    } as UISpecification,
  },
};

export function InteractiveShowcasePage() {
  const [activeDemo, setActiveDemo] = useState<keyof typeof interactiveDemos>("form");
  const [showCode, setShowCode] = useState(false);

  const currentDemo = interactiveDemos[activeDemo];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Interactive Component Showcase
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Explore the interactive components from Milestone 3. These components demonstrate state
            management, event handling, and dynamic behavior through JSON specifications.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-zinc-800">
          <nav className="flex space-x-8 overflow-x-auto">
            {Object.entries(interactiveDemos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key as keyof typeof interactiveDemos)}
                className={`pb-4 px-1 border-b-2 transition-colors whitespace-nowrap ${
                  activeDemo === key
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {demo.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Demo */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Live Demo</h2>
              <span className="text-sm text-zinc-400">{currentDemo.description}</span>
            </div>
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              {render(currentDemo.specification)}
            </div>
          </div>

          {/* Code View */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">JSON Specification</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                {showCode ? "Hide" : "Show"} Code
              </button>
            </div>
            {showCode ? (
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 overflow-hidden">
                <pre className="text-sm text-zinc-300 overflow-x-auto">
                  {JSON.stringify(currentDemo.specification, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <p className="text-zinc-400 text-center">
                  Click &quot;Show Code&quot; to see the JSON specification for this demo
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 mb-4 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">State Management</h3>
            <p className="text-zinc-400">
              Local and global state defined declaratively in JSON specifications with automatic
              reactivity.
            </p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 mb-4 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <path d="M12 2v4"></path>
                <path d="m16.2 7.8 2.9-2.9"></path>
                <path d="M18 12h4"></path>
                <path d="m16.2 16.2 2.9 2.9"></path>
                <path d="M12 18v4"></path>
                <path d="m4.9 19.1 2.9-2.9"></path>
                <path d="M2 12h4"></path>
                <path d="m4.9 4.9 2.9 2.9"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Event Handling</h3>
            <p className="text-zinc-400">
              JSON-defined event handlers mapped to component callbacks with action dispatch system.
            </p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <div className="w-12 h-12 mb-4 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Conditional Rendering</h3>
            <p className="text-zinc-400">
              Show or hide components dynamically based on state values with expression evaluation.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-16 flex gap-4 justify-center">
          <Link
            to="/showcase"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            View All Components
          </Link>
          <Link
            to="/state"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            State Examples
          </Link>
          <Link
            to="/documentation"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
