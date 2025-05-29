import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function TabsShowcase() {
  usePageMetadata({
    title: "Tabs Component",
    description:
      "A comprehensive showcase of the React Jedi Tabs component with all variations, orientations, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Tabs" },
    { id: "default-tab", label: "Default Tab Selection" },
    { id: "vertical", label: "Vertical Tabs" },
    { id: "disabled", label: "Disabled Tabs" },
    { id: "with-icons", label: "Tabs with Icons" },
    { id: "nested-content", label: "Complex Content" },
    { id: "controlled", label: "Controlled Tabs" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic tabs specification
  const basicTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "account",
    className: "w-full max-w-md",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "account", children: "Account" },
          { type: "TabsTrigger", value: "password", children: "Password" },
          { type: "TabsTrigger", value: "settings", children: "Settings" },
        ],
      },
      {
        type: "TabsContent",
        value: "account",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Account" },
                { type: "CardDescription", children: "Make changes to your account here. Click save when you're done." },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Box",
                    children: [
                      { type: "Label", htmlFor: "name", children: "Name" },
                      { type: "Input", id: "name", defaultValue: "John Doe" },
                    ],
                  },
                  {
                    type: "Box",
                    children: [
                      { type: "Label", htmlFor: "username", children: "Username" },
                      { type: "Input", id: "username", defaultValue: "@johndoe" },
                    ],
                  },
                ],
              },
            },
            {
              type: "CardFooter",
              children: { type: "Button", variant: "primary", children: "Save changes" },
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "password",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Password" },
                { type: "CardDescription", children: "Change your password here. After saving, you'll be logged out." },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Box",
                    children: [
                      { type: "Label", htmlFor: "current", children: "Current password" },
                      { type: "Input", id: "current", inputType: "password" },
                    ],
                  },
                  {
                    type: "Box",
                    children: [
                      { type: "Label", htmlFor: "new", children: "New password" },
                      { type: "Input", id: "new", inputType: "password" },
                    ],
                  },
                ],
              },
            },
            {
              type: "CardFooter",
              children: { type: "Button", variant: "primary", children: "Save password" },
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "settings",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Settings" },
                { type: "CardDescription", children: "Manage your account settings and preferences." },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    align: "center",
                    children: [
                      {
                        type: "Box",
                        children: [
                          { type: "Text", className: "font-medium", children: "Email notifications" },
                          { type: "Text", size: "small", variant: "muted", children: "Receive emails about your account activity" },
                        ],
                      },
                      { type: "Switch", defaultChecked: true },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "between",
                    align: "center",
                    children: [
                      {
                        type: "Box",
                        children: [
                          { type: "Text", className: "font-medium", children: "Marketing emails" },
                          { type: "Text", size: "small", variant: "muted", children: "Receive emails about new features and updates" },
                        ],
                      },
                      { type: "Switch" },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };

  // Default tab selection
  const defaultTabSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "tab2",
    className: "w-full max-w-sm",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "tab1", children: "Tab 1" },
          { type: "TabsTrigger", value: "tab2", children: "Tab 2 (Default)" },
          { type: "TabsTrigger", value: "tab3", children: "Tab 3" },
        ],
      },
      {
        type: "TabsContent",
        value: "tab1",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "Content for Tab 1",
        },
      },
      {
        type: "TabsContent",
        value: "tab2",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "This tab is selected by default",
        },
      },
      {
        type: "TabsContent",
        value: "tab3",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "Content for Tab 3",
        },
      },
    ],
  };

  // Vertical tabs
  const verticalTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "overview",
    orientation: "vertical",
    className: "flex h-full w-full max-w-2xl gap-4",
    children: [
      {
        type: "TabsList",
        className: "h-auto w-[200px] flex-col",
        children: [
          { type: "TabsTrigger", value: "overview", className: "w-full justify-start", children: "Overview" },
          { type: "TabsTrigger", value: "analytics", className: "w-full justify-start", children: "Analytics" },
          { type: "TabsTrigger", value: "reports", className: "w-full justify-start", children: "Reports" },
          { type: "TabsTrigger", value: "notifications", className: "w-full justify-start", children: "Notifications" },
        ],
      },
      {
        type: "TabsContent",
        value: "overview",
        className: "flex-1",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Overview" },
                { type: "CardDescription", children: "Your dashboard overview and key metrics" },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Welcome to your dashboard. Here you can see an overview of your account activity.",
              },
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "analytics",
        className: "flex-1",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Analytics" },
                { type: "CardDescription", children: "Detailed analytics and insights" },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "View detailed analytics about your performance and user engagement.",
              },
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "reports",
        className: "flex-1",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Reports" },
                { type: "CardDescription", children: "Generate and download reports" },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Create custom reports based on your data and export them in various formats.",
              },
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "notifications",
        className: "flex-1",
        children: {
          type: "Card",
          children: [
            {
              type: "CardHeader",
              children: [
                { type: "CardTitle", children: "Notifications" },
                { type: "CardDescription", children: "Manage your notification preferences" },
              ],
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Configure how and when you receive notifications about important events.",
              },
            },
          ],
        },
      },
    ],
  };

  // Disabled tabs
  const disabledTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "active",
    className: "w-full max-w-md",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-4",
        children: [
          { type: "TabsTrigger", value: "active", children: "Active" },
          { type: "TabsTrigger", value: "disabled1", disabled: true, children: "Disabled" },
          { type: "TabsTrigger", value: "enabled", children: "Enabled" },
          { type: "TabsTrigger", value: "disabled2", disabled: true, children: "Also Disabled" },
        ],
      },
      {
        type: "TabsContent",
        value: "active",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "This tab is active and clickable",
        },
      },
      {
        type: "TabsContent",
        value: "enabled",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "This tab is also enabled",
        },
      },
    ],
  };

  // Tabs with icons
  const iconTabsSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "dashboard",
    className: "w-full max-w-lg",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-4",
        children: [
          {
            type: "TabsTrigger",
            value: "dashboard",
            children: {
              type: "Flex",
              align: "center",
              gap: "2",
              children: [
                { type: "Text", children: "📊" },
                { type: "Text", children: "Dashboard" },
              ],
            },
          },
          {
            type: "TabsTrigger",
            value: "users",
            children: {
              type: "Flex",
              align: "center",
              gap: "2",
              children: [
                { type: "Text", children: "👥" },
                { type: "Text", children: "Users" },
              ],
            },
          },
          {
            type: "TabsTrigger",
            value: "settings",
            children: {
              type: "Flex",
              align: "center",
              gap: "2",
              children: [
                { type: "Text", children: "⚙️" },
                { type: "Text", children: "Settings" },
              ],
            },
          },
          {
            type: "TabsTrigger",
            value: "help",
            children: {
              type: "Flex",
              align: "center",
              gap: "2",
              children: [
                { type: "Text", children: "❓" },
                { type: "Text", children: "Help" },
              ],
            },
          },
        ],
      },
      {
        type: "TabsContent",
        value: "dashboard",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "Dashboard content with analytics and metrics",
        },
      },
      {
        type: "TabsContent",
        value: "users",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "User management and permissions",
        },
      },
      {
        type: "TabsContent",
        value: "settings",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "Application settings and configuration",
        },
      },
      {
        type: "TabsContent",
        value: "help",
        children: {
          type: "Text",
          className: "p-4 text-center",
          children: "Help documentation and support",
        },
      },
    ],
  };

  // Complex nested content
  const nestedContentSpec: UISpecification = {
    type: "Tabs",
    defaultValue: "products",
    className: "w-full max-w-3xl",
    children: [
      {
        type: "TabsList",
        className: "grid w-full grid-cols-3",
        children: [
          { type: "TabsTrigger", value: "products", children: "Products" },
          { type: "TabsTrigger", value: "customers", children: "Customers" },
          { type: "TabsTrigger", value: "analytics", children: "Analytics" },
        ],
      },
      {
        type: "TabsContent",
        value: "products",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            {
              type: "Flex",
              justify: "between",
              align: "center",
              children: [
                { type: "Heading", level: 3, children: "Product Inventory" },
                { type: "Button", variant: "primary", size: "sm", children: "Add Product" },
              ],
            },
            {
              type: "SimpleGrid",
              columns: { base: 1, md: 2 },
              gap: "4",
              children: [
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      children: [
                        { type: "CardTitle", children: "Product A" },
                        { type: "Badge", variant: "default", children: "In Stock" },
                      ],
                    },
                    {
                      type: "CardContent",
                      children: {
                        type: "Text",
                        size: "small",
                        children: "Premium quality product with excellent features",
                      },
                    },
                    {
                      type: "CardFooter",
                      children: {
                        type: "Flex",
                        justify: "between",
                        children: [
                          { type: "Text", className: "font-semibold", children: "$99.99" },
                          { type: "Button", size: "sm", variant: "outline", children: "Edit" },
                        ],
                      },
                    },
                  ],
                },
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      children: [
                        { type: "CardTitle", children: "Product B" },
                        { type: "Badge", variant: "secondary", children: "Low Stock" },
                      ],
                    },
                    {
                      type: "CardContent",
                      children: {
                        type: "Text",
                        size: "small",
                        children: "Popular item with great customer reviews",
                      },
                    },
                    {
                      type: "CardFooter",
                      children: {
                        type: "Flex",
                        justify: "between",
                        children: [
                          { type: "Text", className: "font-semibold", children: "$149.99" },
                          { type: "Button", size: "sm", variant: "outline", children: "Edit" },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "customers",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            { type: "Heading", level: 3, children: "Customer List" },
            {
              type: "Box",
              className: "border rounded-lg",
              children: {
                type: "Stack",
                spacing: "0",
                children: [
                  {
                    type: "Flex",
                    className: "p-4 border-b",
                    justify: "between",
                    align: "center",
                    children: [
                      {
                        type: "Box",
                        children: [
                          { type: "Text", className: "font-medium", children: "Jane Smith" },
                          { type: "Text", size: "small", variant: "muted", children: "jane@example.com" },
                        ],
                      },
                      { type: "Badge", variant: "outline", children: "Premium" },
                    ],
                  },
                  {
                    type: "Flex",
                    className: "p-4 border-b",
                    justify: "between",
                    align: "center",
                    children: [
                      {
                        type: "Box",
                        children: [
                          { type: "Text", className: "font-medium", children: "John Doe" },
                          { type: "Text", size: "small", variant: "muted", children: "john@example.com" },
                        ],
                      },
                      { type: "Badge", variant: "outline", children: "Standard" },
                    ],
                  },
                  {
                    type: "Flex",
                    className: "p-4",
                    justify: "between",
                    align: "center",
                    children: [
                      {
                        type: "Box",
                        children: [
                          { type: "Text", className: "font-medium", children: "Alice Johnson" },
                          { type: "Text", size: "small", variant: "muted", children: "alice@example.com" },
                        ],
                      },
                      { type: "Badge", variant: "outline", children: "Premium" },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
      {
        type: "TabsContent",
        value: "analytics",
        children: {
          type: "Stack",
          spacing: "4",
          children: [
            { type: "Heading", level: 3, children: "Analytics Overview" },
            {
              type: "SimpleGrid",
              columns: { base: 1, md: 3 },
              gap: "4",
              children: [
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      className: "pb-2",
                      children: {
                        type: "Text",
                        size: "small",
                        variant: "muted",
                        children: "Total Revenue",
                      },
                    },
                    {
                      type: "CardContent",
                      children: {
                        type: "Text",
                        className: "text-2xl font-bold",
                        children: "$45,231.89",
                      },
                    },
                    {
                      type: "CardFooter",
                      children: {
                        type: "Text",
                        size: "small",
                        className: "text-green-600",
                        children: "+20.1% from last month",
                      },
                    },
                  ],
                },
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      className: "pb-2",
                      children: {
                        type: "Text",
                        size: "small",
                        variant: "muted",
                        children: "Active Users",
                      },
                    },
                    {
                      type: "CardContent",
                      children: {
                        type: "Text",
                        className: "text-2xl font-bold",
                        children: "2,350",
                      },
                    },
                    {
                      type: "CardFooter",
                      children: {
                        type: "Text",
                        size: "small",
                        className: "text-green-600",
                        children: "+180 new users",
                      },
                    },
                  ],
                },
                {
                  type: "Card",
                  children: [
                    {
                      type: "CardHeader",
                      className: "pb-2",
                      children: {
                        type: "Text",
                        size: "small",
                        variant: "muted",
                        children: "Conversion Rate",
                      },
                    },
                    {
                      type: "CardContent",
                      children: {
                        type: "Text",
                        className: "text-2xl font-bold",
                        children: "3.2%",
                      },
                    },
                    {
                      type: "CardFooter",
                      children: {
                        type: "Text",
                        size: "small",
                        className: "text-red-600",
                        children: "-0.4% from last month",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Product details example
  const productDetailsSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-2xl",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Product Details" },
          { type: "CardDescription", children: "Comprehensive information about this product" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Tabs",
          defaultValue: "description",
          children: [
            {
              type: "TabsList",
              className: "grid w-full grid-cols-4",
              children: [
                { type: "TabsTrigger", value: "description", children: "Description" },
                { type: "TabsTrigger", value: "specifications", children: "Specs" },
                { type: "TabsTrigger", value: "reviews", children: "Reviews" },
                { type: "TabsTrigger", value: "shipping", children: "Shipping" },
              ],
            },
            {
              type: "TabsContent",
              value: "description",
              children: {
                type: "Stack",
                spacing: "3",
                children: [
                  {
                    type: "Text",
                    children: "This premium product combines cutting-edge technology with elegant design. Perfect for professionals and enthusiasts alike.",
                  },
                  {
                    type: "Text",
                    children: "Key features include advanced performance metrics, intuitive user interface, and seamless integration with existing workflows.",
                  },
                ],
              },
            },
            {
              type: "TabsContent",
              value: "specifications",
              children: {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    className: "py-2 border-b",
                    children: [
                      { type: "Text", variant: "muted", children: "Dimensions" },
                      { type: "Text", children: "10 x 8 x 2 inches" },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "between",
                    className: "py-2 border-b",
                    children: [
                      { type: "Text", variant: "muted", children: "Weight" },
                      { type: "Text", children: "2.5 lbs" },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "between",
                    className: "py-2 border-b",
                    children: [
                      { type: "Text", variant: "muted", children: "Material" },
                      { type: "Text", children: "Aluminum & Glass" },
                    ],
                  },
                  {
                    type: "Flex",
                    justify: "between",
                    className: "py-2",
                    children: [
                      { type: "Text", variant: "muted", children: "Warranty" },
                      { type: "Text", children: "2 years" },
                    ],
                  },
                ],
              },
            },
            {
              type: "TabsContent",
              value: "reviews",
              children: {
                type: "Stack",
                spacing: "4",
                children: [
                  {
                    type: "Flex",
                    justify: "between",
                    align: "center",
                    children: [
                      { type: "Text", className: "font-semibold", children: "Customer Reviews" },
                      { type: "Badge", children: "4.8/5.0" },
                    ],
                  },
                  {
                    type: "Box",
                    className: "border rounded-lg p-4",
                    children: {
                      type: "Stack",
                      spacing: "2",
                      children: [
                        {
                          type: "Flex",
                          justify: "between",
                          children: [
                            { type: "Text", className: "font-medium", children: "Sarah M." },
                            { type: "Text", size: "small", variant: "muted", children: "2 days ago" },
                          ],
                        },
                        { type: "Text", children: "⭐⭐⭐⭐⭐" },
                        {
                          type: "Text",
                          size: "small",
                          children: "Excellent quality! Exceeded my expectations in every way.",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              type: "TabsContent",
              value: "shipping",
              children: {
                type: "Stack",
                spacing: "3",
                children: [
                  { type: "Text", className: "font-medium", children: "Shipping Information" },
                  {
                    type: "Text",
                    size: "small",
                    children: "Free standard shipping on orders over $50. Express shipping available.",
                  },
                  {
                    type: "Text",
                    size: "small",
                    variant: "muted",
                    children: "Estimated delivery: 3-5 business days",
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tabs Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A set of layered sections of content—known as tab panels—that are displayed one at a time. Perfect for organizing related information and reducing cognitive load.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Tabs component provides an accessible way to organize and display content in a compact space. Users can switch between different views or sections without leaving the page.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Horizontal and vertical orientations</li>
                <li>Keyboard navigation support (Arrow keys, Tab, Enter/Space)</li>
                <li>Controlled and uncontrolled modes</li>
                <li>Support for disabled tabs</li>
                <li>Automatic and manual activation modes</li>
                <li>RTL support with dir prop</li>
                <li>ARIA compliant with proper roles and attributes</li>
                <li>Customizable styling with className</li>
              </ul>
            </div>
          </section>

          {/* Basic Tabs Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Tabs</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple tabs implementation with three panels containing forms and settings.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicTabsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicTabsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Default Tab Section */}
          <section id="default-tab" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Default Tab Selection</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Set a default active tab using the defaultValue prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(defaultTabSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(defaultTabSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Vertical Tabs Section */}
          <section id="vertical" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Vertical Tabs</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tabs can be oriented vertically, perfect for side navigation patterns.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 min-h-[300px]">
              {render(verticalTabsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(verticalTabsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Disabled Tabs Section */}
          <section id="disabled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Disabled Tabs</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Individual tabs can be disabled to prevent user interaction.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(disabledTabsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(disabledTabsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Tabs with Icons Section */}
          <section id="with-icons" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Tabs with Icons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance tab labels with icons for better visual recognition.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(iconTabsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(iconTabsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Complex Content Section */}
          <section id="nested-content" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complex Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tabs can contain any type of content, including cards, forms, and nested components.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(nestedContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(nestedContentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Controlled Tabs Section */}
          <section id="controlled" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Controlled Tabs</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Tabs can be controlled by using the <code>value</code> and <code>onValueChange</code> props. This allows you to manage the active tab state externally, enabling features like:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Syncing tab state with URL parameters</li>
                <li>Persisting tab selection in localStorage</li>
                <li>Programmatically changing tabs</li>
                <li>Analytics tracking on tab changes</li>
              </ul>
              <p className="mt-4">
                To use controlled mode, provide both <code>value</code> and <code>onValueChange</code> props instead of <code>defaultValue</code>.
              </p>
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            
            <h3 className="text-lg font-medium mb-3">Tabs Props</h3>
            <div className="overflow-x-auto mb-8">
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
                    <td className="py-3 px-4 font-mono">"Tabs"</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">The default active tab (uncontrolled)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">The controlled active tab</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onValueChange</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Event handler key for tab changes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">orientation</td>
                    <td className="py-3 px-4 font-mono">"horizontal" | "vertical"</td>
                    <td className="py-3 px-4">"horizontal"</td>
                    <td className="py-3 px-4">The orientation of the tabs</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">dir</td>
                    <td className="py-3 px-4 font-mono">"ltr" | "rtl"</td>
                    <td className="py-3 px-4">"ltr"</td>
                    <td className="py-3 px-4">Reading direction</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">activationMode</td>
                    <td className="py-3 px-4 font-mono">"automatic" | "manual"</td>
                    <td className="py-3 px-4">"automatic"</td>
                    <td className="py-3 px-4">How tabs are activated with keyboard</td>
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

            <h3 className="text-lg font-medium mb-3">TabsList Props</h3>
            <div className="overflow-x-auto mb-8">
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
                    <td className="py-3 px-4 font-mono">"TabsList"</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">loop</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether keyboard navigation loops</td>
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

            <h3 className="text-lg font-medium mb-3">TabsTrigger Props</h3>
            <div className="overflow-x-auto mb-8">
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
                    <td className="py-3 px-4 font-mono">"TabsTrigger"</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Unique identifier for the tab</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the tab is disabled</td>
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

            <h3 className="text-lg font-medium mb-3">TabsContent Props</h3>
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
                    <td className="py-3 px-4 font-mono">"TabsContent"</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Tab identifier to show content for</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">forceMount</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Keep content mounted when inactive</td>
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
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing tabs in common use cases.
            </p>
            
            <div className="space-y-8">
              {/* Product Details Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Product Details Page</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A common e-commerce pattern using tabs to organize product information.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(productDetailsSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(productDetailsSpec, null, 2)}
                  </pre>
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