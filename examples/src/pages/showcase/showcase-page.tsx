import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@banja/react-jedi";
import type { UISpecification, ComponentSpec } from "@banja/react-jedi";
import { usePageMetadata } from "../../lib/meta";
import { Heading, Text, spacing, padding } from "../../components/ui";

type ComponentCategory = {
  id: string;
  title: string;
  description: string;
  components: {
    name: string;
    description: string;
    status: "completed" | "in-progress" | "planned";
    type: "custom" | "shadcn";
  }[];
};

const categories: ComponentCategory[] = [
  {
    id: "layout",
    title: "Layout Components",
    description: "Essential components for creating layouts and structured content.",
    components: [
      {
        name: "Container",
        description: "A centered wrapper component with max-width and padding.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Box",
        description: "A primitive div-like component for general layout.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Grid",
        description: "CSS Grid-based layout system for complex arrangements.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Flex",
        description: "Flexbox-based layout with alignment and distribution options.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Stack",
        description: "Vertical stacking component for consistent spacing.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Spacer",
        description: "Flexible spacer component for custom gaps in layouts.",
        status: "completed",
        type: "custom",
      },
      {
        name: "SimpleGrid",
        description: "Simple responsive grid layout with automatic columns.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Center",
        description: "Centers content horizontally and vertically.",
        status: "completed",
        type: "custom",
      },
      {
        name: "ScrollArea",
        description: "Custom scrollbar area with smooth scrolling.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Resizable",
        description: "Resizable panels that users can drag to adjust sizes.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Group",
        description: "Group multiple elements with shared styling and behavior.",
        status: "completed",
        type: "custom",
      },
      {
        name: "AspectRatio",
        description: "Maintain aspect ratio for images and media.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Separator",
        description: "Visual separator for dividing content sections.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Masonry",
        description: "Pinterest-style masonry layout for variable height items.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Footer",
        description: "Responsive footer component with multiple sections.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Sidebar",
        description: "Collapsible sidebar navigation component.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "ui",
    title: "UI Components",
    description: "Core UI elements like buttons, cards, and interactive components.",
    components: [
      {
        name: "Button",
        description: "Customizable button component with variants and states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Card",
        description: "Container component with header, content, and footer sections.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Image",
        description: "Image component with lazy loading and optimization.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Avatar",
        description: "User avatar component with fallback states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Badge",
        description: "Label component for tags and statuses.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Skeleton",
        description: "Loading placeholder that mimics content structure.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Tooltip",
        description: "Hover tooltip for additional information.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Progress",
        description: "Progress bar for loading and completion states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "HoverCard",
        description: "Card that appears on hover with detailed content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Alert",
        description: "Alert message component with different variants.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "AlertDialog",
        description: "Modal dialog for important confirmations.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "form",
    title: "Form Components",
    description: "Form controls and input elements for user interaction.",
    components: [
      {
        name: "Form",
        description: "Form wrapper with built-in validation and state management.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Input",
        description: "Text input field with various types and states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Label",
        description: "Label component for form fields.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Textarea",
        description: "Multi-line text input for longer content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Checkbox",
        description: "Checkbox input with label and state management.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "RadioGroup",
        description: "Group of radio buttons for single selection.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Select",
        description: "Dropdown selection component with search.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Switch",
        description: "Toggle switch for on/off states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Slider",
        description: "Range slider for numeric value selection.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Collapsible",
        description: "Expandable/collapsible content section.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Toggle",
        description: "Toggle button for binary states.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "ToggleGroup",
        description: "Group of toggle buttons for multi-selection.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Text components for headings, paragraphs, and special formatting.",
    components: [
      {
        name: "Heading",
        description: "Heading component with multiple levels and styling options.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Text",
        description: "Basic text component with size and weight variants.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Blockquote",
        description: "Quoted text with attribution.",
        status: "completed",
        type: "custom",
      },
    ],
  },
  {
    id: "overlay",
    title: "Overlay Components",
    description: "Modal dialogs, sheets, and overlay elements.",
    components: [
      {
        name: "Sheet",
        description: "Sliding panel from the edge of the screen.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Tabs",
        description: "Tabbed interface for switching between views.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Accordion",
        description: "Collapsible sections for FAQ or content grouping.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Dialog",
        description: "Modal dialog overlay for important content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Popover",
        description: "Content popup that appears on click or hover.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Carousel",
        description: "Image/content carousel with navigation controls.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Sonner",
        description: "Toast notification system for alerts and messages.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Drawer",
        description: "Mobile-friendly drawer component.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation Components",
    description: "Navigation elements including menus, breadcrumbs, and toolbars.",
    components: [
      {
        name: "DropdownMenu",
        description: "Dropdown menu with nested items and keyboard navigation.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "ContextMenu",
        description: "Right-click context menu for actions.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Menubar",
        description: "Application menubar with dropdown menus.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "NavigationMenu",
        description: "Horizontal navigation menu with dropdowns.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Breadcrumb",
        description: "Breadcrumb navigation for page hierarchy.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Pagination",
        description: "Page navigation for lists and tables.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Command",
        description: "Command palette for search and actions.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "pickers",
    title: "Pickers",
    description: "Date, time, and value selection components.",
    components: [
      {
        name: "Calendar",
        description: "Calendar component for date selection.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "DatePicker",
        description: "Date picker with calendar dropdown.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Combobox",
        description: "Searchable select component with autocomplete.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "InputOTP",
        description: "One-time password input with auto-focus.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "data",
    title: "Data Components",
    description: "Components for displaying and visualizing data.",
    components: [
      {
        name: "Table",
        description: "Basic table component for tabular data.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "DataTable",
        description: "Advanced data table with sorting and filtering.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Chart",
        description: "Chart component for data visualization.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "business",
    title: "Business Components",
    description: "Complex components for business applications.",
    components: [
      {
        name: "Hero",
        description: "Hero section for landing pages.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Testimonial",
        description: "Customer testimonial component with avatar.",
        status: "completed",
        type: "custom",
      },
      {
        name: "PricingTable",
        description: "Pricing plans comparison table.",
        status: "completed",
        type: "custom",
      },
      {
        name: "CallToAction",
        description: "Call-to-action section with buttons.",
        status: "completed",
        type: "custom",
      },
      {
        name: "FeatureCard",
        description: "Feature showcase card with icon.",
        status: "completed",
        type: "custom",
      },
    ],
  },
];

const componentPreviews: Record<string, ComponentSpec> = {
  Container: {
    type: "Container",
    maxWidth: "prose",
    children: {
      type: "Text",
      className: "p-8 bg-gray-50 dark:bg-gray-900 rounded-lg text-center",
      children: "Container with max-width: prose",
    },
  },
  Box: {
    type: "Box",
    className: "p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border border-gray-200 dark:border-gray-800",
    children: "Simple Box Component",
  },
  Grid: {
    type: "Grid",
    columns: { base: 1, md: 3 },
    gap: "4",
    children: [
      {
        type: "Box",
        className: "bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center h-20 flex items-center justify-center",
        children: "1",
      },
      {
        type: "Box",
        className: "bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center h-20 flex items-center justify-center",
        children: "2",
      },
      {
        type: "Box",
        className: "bg-pink-100 dark:bg-pink-900 rounded-lg p-4 text-center h-20 flex items-center justify-center",
        children: "3",
      },
    ],
  },
  Flex: {
    type: "Flex",
    justify: "between",
    align: "center",
    className: "p-4 bg-gray-50 dark:bg-gray-900 rounded-lg",
    children: [
      { type: "Text", children: "Left" },
      { type: "Text", className: "text-blue-600 dark:text-blue-400", children: "Center" },
      { type: "Text", children: "Right" },
    ],
  },
  Stack: {
    type: "Stack",
    spacing: "3",
    children: [
      {
        type: "Box",
        className: "px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-md",
        children: "Item 1",
      },
      {
        type: "Box",
        className: "px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-md",
        children: "Item 2",
      },
      {
        type: "Box",
        className: "px-4 py-2 bg-pink-100 dark:bg-pink-900 rounded-md",
        children: "Item 3",
      },
    ],
  },
  Spacer: {
    type: "Flex",
    className: "bg-gray-50 dark:bg-gray-900 p-4 rounded-lg",
    children: [
      { type: "Text", children: "Left" },
      { type: "Spacer" },
      { type: "Text", children: "Right" },
    ],
  },
  SimpleGrid: {
    type: "SimpleGrid",
    columns: 3,
    gap: "3",
    children: Array.from({ length: 6 }, (_, i) => ({
      type: "Box",
      className: `bg-gradient-to-r ${
        i % 3 === 0
          ? "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800"
          : i % 3 === 1
          ? "from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800"
          : "from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800"
      } p-4 rounded-lg text-center`,
      children: `Cell ${i + 1}`,
    })),
  },
  Center: {
    type: "Center",
    className: "h-32 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700",
    children: {
      type: "Box",
      className: "px-4 py-2 bg-blue-600 text-white rounded-lg",
      children: "Centered Content",
    },
  },
  AspectRatio: {
    type: "AspectRatio",
    ratio: 16 / 9,
    children: {
      type: "Image",
      src: "https://images.unsplash.com/photo-1572177812156-58036aae439c?w=800&q=80",
      alt: "Project workspace",
      className: "rounded-lg object-cover w-full h-full",
    },
  },
  Separator: {
    type: "Box",
    className: "space-y-4",
    children: [
      { type: "Text", children: "Above separator" },
      { type: "Separator", orientation: "horizontal" },
      { type: "Text", children: "Below separator" },
    ],
  },
  Masonry: {
    type: "Masonry",
    columns: { base: 1, sm: 2, md: 3 },
    gap: "4",
    children: [
      {
        type: "Box",
        className: "bg-blue-100 dark:bg-blue-900 rounded-lg p-4 h-32",
        children: "Tall Item",
      },
      {
        type: "Box",
        className: "bg-purple-100 dark:bg-purple-900 rounded-lg p-4 h-24",
        children: "Medium Item",
      },
      {
        type: "Box",
        className: "bg-pink-100 dark:bg-pink-900 rounded-lg p-4 h-40",
        children: "Extra Tall",
      },
      {
        type: "Box",
        className: "bg-green-100 dark:bg-green-900 rounded-lg p-4 h-20",
        children: "Short Item",
      },
    ],
  },
  Button: {
    type: "Flex",
    gap: "3",
    wrap: true,
    children: [
      { type: "Button", variant: "default", children: "Default" },
      { type: "Button", variant: "secondary", children: "Secondary" },
      { type: "Button", variant: "outline", children: "Outline" },
      { type: "Button", variant: "ghost", children: "Ghost" },
      { type: "Button", variant: "link", children: "Link" },
    ],
  },
  Card: {
    type: "Card",
    className: "w-full max-w-sm",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Beautiful Card" },
          {
            type: "CardDescription",
            children: "This is a modern card component with clean styling.",
          },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Text",
          children: "Card content goes here. You can put any component inside.",
        },
      },
      {
        type: "CardFooter",
        children: {
          type: "Flex",
          gap: "3",
          children: [
            { type: "Button", variant: "default", size: "sm", children: "Save" },
            { type: "Button", variant: "outline", size: "sm", children: "Cancel" },
          ],
        },
      },
    ],
  },
  Image: {
    type: "Image",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    alt: "Modern furniture",
    className: "rounded-lg shadow-md",
  },
  Avatar: {
    type: "Flex",
    gap: "4",
    align: "center",
    children: [
      {
        type: "Avatar",
        children: [
          { type: "AvatarImage", src: "https://github.com/shadcn.png", alt: "User" },
          { type: "AvatarFallback", children: "CN" },
        ],
      },
      {
        type: "Avatar",
        children: [
          { type: "AvatarImage", src: "", alt: "User" },
          { type: "AvatarFallback", children: "JD" },
        ],
      },
    ],
  },
  Badge: {
    type: "Flex",
    gap: "2",
    wrap: true,
    children: [
      { type: "Badge", children: "Default" },
      { type: "Badge", variant: "secondary", children: "Secondary" },
      { type: "Badge", variant: "outline", children: "Outline" },
      { type: "Badge", variant: "destructive", children: "Destructive" },
    ],
  },
  Skeleton: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Skeleton", className: "h-4 w-[250px]" },
      { type: "Skeleton", className: "h-4 w-[200px]" },
      { type: "Skeleton", className: "h-4 w-[150px]" },
    ],
  },
  Tooltip: {
    type: "Tooltip",
    children: [
      {
        type: "TooltipTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Hover me",
        },
      },
      {
        type: "TooltipContent",
        children: "This is a helpful tooltip",
      },
    ],
  },
  Heading: {
    type: "Stack",
    spacing: "4",
    children: [
      { type: "Heading", level: "h1", children: "Heading Level 1" },
      { type: "Heading", level: "h2", children: "Heading Level 2" },
      { type: "Heading", level: "h3", children: "Heading Level 3" },
      { type: "Heading", level: "h4", children: "Heading Level 4" },
    ],
  },
  Text: {
    type: "Stack",
    spacing: "3",
    children: [
      { type: "Text", size: "xl", children: "Extra Large Text" },
      { type: "Text", size: "lg", children: "Large Text" },
      { type: "Text", size: "base", children: "Base Text" },
      { type: "Text", size: "sm", children: "Small Text" },
      { type: "Text", size: "xs", children: "Extra Small Text" },
    ],
  },
  Blockquote: {
    type: "Blockquote",
    children: "The best way to predict the future is to invent it.",
    citation: "Alan Kay",
  },
  Input: {
    type: "Stack",
    spacing: "4",
    children: [
      { type: "Input", placeholder: "Enter text..." },
      { type: "Input", inputType: "email", placeholder: "email@example.com" },
      { type: "Input", inputType: "password", placeholder: "Password" },
      { type: "Input", disabled: true, placeholder: "Disabled input" },
    ],
  },
  Label: {
    type: "Box",
    className: "space-y-2",
    children: [
      { type: "Label", htmlFor: "username", children: "Username" },
      { type: "Input", id: "username", placeholder: "Enter username" },
    ],
  },
  Hero: {
    type: "Hero",
    variant: "centered",
    className: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950",
    title: "Hero Component",
    subtitle: "Create stunning hero sections",
    cta: {
      primary: { label: "Get Started", href: "#" },
      secondary: { label: "Learn More", href: "#" },
    },
  },
  Testimonial: {
    type: "Testimonial",
    variant: "card",
    quote: "This is an amazing product that has transformed our workflow.",
    author: {
      name: "Jane Doe",
      role: "CEO, TechCorp",
      avatar: "https://github.com/shadcn.png",
    },
  },
  PricingTable: {
    type: "PricingTable",
    columns: { base: 1, md: 3 },
    tiers: [
      {
        name: "Basic",
        price: { amount: 9, currency: "$", period: "month" },
        features: ["1 User", "10 Projects", "Basic Support"],
        cta: { label: "Start Free", variant: "outline" },
      },
      {
        name: "Pro",
        price: { amount: 29, currency: "$", period: "month" },
        features: ["5 Users", "50 Projects", "Priority Support", "Advanced Features"],
        cta: { label: "Get Pro", variant: "default" },
        highlighted: true,
      },
    ],
  },
  Popover: {
    type: "Popover",
    children: [
      {
        type: "PopoverTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Open popover",
        },
      },
      {
        type: "PopoverContent",
        className: "w-80",
        children: [
          { type: "Text", className: "font-semibold", children: "Popover Content" },
          {
            type: "Text",
            className: "text-sm text-gray-600 dark:text-gray-400",
            children: "This is a popover with some content inside.",
          },
        ],
      },
    ],
  },
  Carousel: {
    type: "Carousel",
    className: "w-full max-w-sm",
    children: {
      type: "CarouselContent",
      children: Array.from({ length: 5 }).map((_, i) => ({
        type: "CarouselItem",
        children: {
          type: "Box",
          className: "p-1",
          children: {
            type: "Card",
            children: {
              type: "CardContent",
              className: "flex items-center justify-center p-6",
              children: {
                type: "Text",
                className: "text-4xl font-semibold",
                children: `${i + 1}`,
              },
            },
          },
        },
      })),
    },
  },
  Sheet: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Sheet component - View full demo →",
    },
  },
  Tabs: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Tabs component - View full demo →",
    },
  },
  Accordion: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Accordion component - View full demo →",
    },
  },
  Dialog: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Dialog component - View full demo →",
    },
  },
  ScrollArea: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "ScrollArea component - View full demo →",
    },
  },
  Resizable: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Resizable component - View full demo →",
    },
  },
  CallToAction: {
    type: "Box",
    className: "p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center",
    children: [
      {
        type: "Heading",
        level: "h3",
        className: "mb-4 text-white",
        children: "Ready to Get Started?",
      },
      {
        type: "Text",
        className: "mb-6 text-gray-100",
        children: "Join thousands of developers building with React Jedi",
      },
      {
        type: "Flex",
        justify: "center",
        gap: "4",
        children: [
          {
            type: "Button",
            size: "lg",
            children: "Start Building",
          },
          {
            type: "Button",
            variant: "outline",
            size: "lg",
            className: "text-white border-white hover:bg-white hover:text-blue-600",
            children: "Learn More",
          },
        ],
      },
    ],
  },
  FeatureCard: {
    type: "Card",
    className: "p-6",
    children: [
      {
        type: "Box",
        className: "mb-4 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center",
        children: {
          type: "Text",
          className: "text-blue-600 dark:text-blue-400 text-xl",
          children: "✨",
        },
      },
      {
        type: "Heading",
        level: "h4",
        className: "mb-2",
        children: "Feature Title",
      },
      {
        type: "Text",
        className: "text-gray-600 dark:text-gray-400",
        children: "This is a feature card component for showcasing product features with icons.",
      },
    ],
  },
  Footer: {
    type: "Box",
    className: "border-t border-gray-200 dark:border-gray-800 pt-8",
    children: [
      {
        type: "Grid",
        columns: { base: 1, md: 4 },
        gap: "8",
        className: "mb-8",
        children: [
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h5",
                className: "mb-4",
                children: "Company",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "About",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Team",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Careers",
                  },
                ],
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h5",
                className: "mb-4",
                children: "Product",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Features",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Pricing",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-gray-600 dark:text-gray-400",
                    children: "Docs",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Flex",
        justify: "between",
        align: "center",
        className: "pt-8 border-t border-gray-200 dark:border-gray-800",
        children: [
          {
            type: "Text",
            className: "text-sm text-gray-600 dark:text-gray-400",
            children: "© 2025 React Jedi. All rights reserved.",
          },
          {
            type: "Flex",
            gap: "4",
            children: [
              {
                type: "Text",
                className: "text-sm text-gray-600 dark:text-gray-400",
                children: "Privacy",
              },
              {
                type: "Text",
                className: "text-sm text-gray-600 dark:text-gray-400",
                children: "Terms",
              },
            ],
          },
        ],
      },
    ],
  },
  Drawer: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Drawer component - Dynamic sliding panel",
    },
  },
  DropdownMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Dropdown Menu - Interactive menu system",
    },
  },
  ContextMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Context Menu - Right-click menu",
    },
  },
  Menubar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Menubar - Application menubar",
    },
  },
  NavigationMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Navigation Menu - Site navigation",
    },
  },
  Breadcrumb: {
    type: "Box",
    className: "flex items-center gap-2 text-sm",
    children: [
      { type: "Text", className: "text-gray-600 dark:text-gray-400", children: "Home" },
      { type: "Text", className: "text-gray-500", children: "/" },
      { type: "Text", className: "text-gray-600 dark:text-gray-400", children: "Products" },
      { type: "Text", className: "text-gray-500", children: "/" },
      { type: "Text", className: "text-gray-900 dark:text-white", children: "React Jedi" },
    ],
  },
  Pagination: {
    type: "Flex",
    align: "center",
    gap: "2",
    children: [
      { type: "Button", variant: "outline", size: "sm", children: "Previous" },
      { type: "Button", variant: "ghost", size: "sm", children: "1" },
      { type: "Button", variant: "default", size: "sm", children: "2" },
      { type: "Button", variant: "ghost", size: "sm", children: "3" },
      { type: "Button", variant: "outline", size: "sm", children: "Next" },
    ],
  },
  Command: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Command Palette - Press ⌘K to open",
    },
  },
  Sidebar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Sidebar - App navigation sidebar",
    },
  },
  Calendar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Calendar - Date picker component",
    },
  },
  DatePicker: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Date Picker - Select date with calendar",
    },
  },
  Combobox: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Combobox - Searchable select input",
    },
  },
  InputOTP: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Input OTP - One-time password input",
    },
  },
  Table: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Table - Data table component",
    },
  },
  DataTable: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Data Table - Advanced sortable table",
    },
  },
  Chart: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Chart - Data visualization component",
    },
  },
  Progress: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Progress", value: 33, className: "h-2" },
      {
        type: "Text",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: "33% Complete",
      },
    ],
  },
  HoverCard: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Hover Card - Content on hover",
    },
  },
  Alert: {
    type: "Alert",
    className: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    children: [
      {
        type: "Text",
        className: "font-semibold",
        children: "Success!",
      },
      {
        type: "Text",
        className: "text-sm",
        children: "Your operation completed successfully.",
      },
    ],
  },
  AlertDialog: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Alert Dialog - Confirmation dialog",
    },
  },
  Form: {
    type: "Box",
    className: "space-y-4",
    children: [
      {
        type: "Box",
        children: [
          { type: "Label", htmlFor: "email", children: "Email" },
          { type: "Input", id: "email", inputType: "email", placeholder: "Enter email" },
        ],
      },
      {
        type: "Button",
        buttonType: "submit",
        children: "Submit Form",
      },
    ],
  },
  Textarea: {
    type: "Textarea",
    placeholder: "Enter your message here...",
    className: "resize-none h-24",
  },
  Checkbox: {
    type: "Flex",
    align: "center",
    gap: "2",
    children: [
      { type: "Checkbox", id: "terms" },
      { type: "Label", htmlFor: "terms", className: "text-sm", children: "I agree to the terms" },
    ],
  },
  RadioGroup: {
    type: "RadioGroup",
    defaultValue: "option1",
    children: [
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option1", id: "r1" },
          { type: "Label", htmlFor: "r1", children: "Option 1" },
        ],
      },
      {
        type: "Flex",
        align: "center",
        gap: "2",
        children: [
          { type: "RadioGroupItem", value: "option2", id: "r2" },
          { type: "Label", htmlFor: "r2", children: "Option 2" },
        ],
      },
    ],
  },
  Select: {
    type: "Select",
    children: [
      {
        type: "SelectTrigger",
        className: "w-[180px]",
        children: {
          type: "SelectValue",
          placeholder: "Select an option",
        },
      },
      {
        type: "SelectContent",
        children: [
          { type: "SelectItem", value: "light", children: "Light" },
          { type: "SelectItem", value: "dark", children: "Dark" },
          { type: "SelectItem", value: "system", children: "System" },
        ],
      },
    ],
  },
  Switch: {
    type: "Flex",
    align: "center",
    gap: "2",
    children: [
      { type: "Switch", id: "airplane-mode" },
      { type: "Label", htmlFor: "airplane-mode", children: "Airplane Mode" },
    ],
  },
  Slider: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Slider", defaultValue: [50], max: 100, step: 1 },
      {
        type: "Text",
        className: "text-sm text-gray-600 dark:text-gray-400",
        children: "Volume: 50%",
      },
    ],
  },
  Collapsible: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Collapsible - Expandable content section",
    },
  },
  Toggle: {
    type: "Toggle",
    children: "Bold",
  },
  ToggleGroup: {
    type: "ToggleGroup",
    variant: "default",
    children: [
      { type: "ToggleGroupItem", value: "bold", children: "B" },
      { type: "ToggleGroupItem", value: "italic", children: "I" },
      { type: "ToggleGroupItem", value: "underline", children: "U" },
    ],
  },
  Sonner: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-gray-600 dark:text-gray-400",
      children: "Sonner - Toast notifications",
    },
  },
};

export function ShowcasePage() {
  usePageMetadata({
    title: "Component Showcase",
    description:
      "Explore the complete React Jedi component library. Browse through layout components, UI elements, form controls, typography, and more with live examples.",
  });

  const [showJson, setShowJson] = useState<string | null>(null);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  return (
    <div className={`container mx-auto ${padding.container} ${padding.page}`}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Component Showcase
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore all the available components. Each component is rendered live below and can be
            defined via JSON specification using React Jedi's server-driven UI architecture.
          </p>
        </div>

        {/* Filter & Navigation Section */}
        <div className="sticky top-20 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl mb-8 sm:mb-12 py-3 sm:py-4 px-4 sm:px-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <a
              href="#all"
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all whitespace-nowrap font-medium"
            >
              All Components
            </a>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all whitespace-nowrap"
              >
                {category.title}
              </a>
            ))}
          </div>
          <Link
            to="/documentation"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span className="hidden sm:inline">View Documentation</span>
            <span className="sm:hidden">Docs</span>
          </Link>
        </div>

        {/* Component Categories */}
        <div className="space-y-20">
          {categories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-32">
              <div className={`flex items-center gap-3 ${spacing.small} sm:mb-6`}>
                <Heading as="h2" size="section">
                  {category.title}
                </Heading>
                <div className="h-px flex-grow bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
              </div>
              <Text size="lg" variant="description" className={`sm:text-xl ${spacing.heading}`}>
                {category.description}
              </Text>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.components.map((component) => (
                  <div
                    key={component.name}
                    className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800"
                  >
                    {/* Component Preview - Always visible by default */}
                    {component.status === "completed" && componentPreviews[component.name] && (
                      <div
                        className={`bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-700 ${
                          expandedComponent === component.name ? "" : "max-h-64 overflow-hidden"
                        }`}
                      >
                        <div className="rounded-lg overflow-hidden">
                          {render(componentPreviews[component.name])}
                        </div>
                      </div>
                    )}

                    <div className="p-6 relative">
                      {/* Type Badge */}
                      <div className="absolute -top-2 right-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            component.type === "custom"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {component.type === "custom" ? "Custom" : "@shadcn/ui"}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            (component.status === "completed" && "bg-green-500") ||
                            (component.status === "in-progress" && "bg-amber-500") ||
                            "bg-gray-500"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          {(component.status === "completed" && "Ready") ||
                            (component.status === "in-progress" && "In Progress") ||
                            "Planned"}
                        </span>
                      </div>

                      <Heading
                        as="h3"
                        size="card"
                        className={`${spacing.xs} flex items-center gap-2`}
                      >
                        {component.name}
                      </Heading>

                      <Text size="base" variant="muted" className={spacing.small}>
                        {component.description}
                      </Text>

                      <div className="flex items-center gap-3 mt-auto pt-2">
                        {component.name === "ScrollArea" ||
                        component.name === "Resizable" ||
                        component.name === "Sheet" ||
                        component.name === "Tabs" ||
                        component.name === "Accordion" ||
                        component.name === "Dialog" ||
                        component.name === "Hero" ? (
                          <Link
                            to={`/showcase/${component.name.toLowerCase()}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Full Demo
                          </Link>
                        ) : null}

                        {/* Toggle Preview */}
                        {componentPreviews[component.name] && (
                          <button
                            onClick={() =>
                              setExpandedComponent(
                                expandedComponent === component.name ? null : component.name
                              )
                            }
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            {expandedComponent === component.name ? "Collapse" : "Expand"}
                          </button>
                        )}

                        <button
                          onClick={() =>
                            setShowJson(showJson === component.name ? null : component.name)
                          }
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                          {showJson === component.name ? "Hide JSON" : "See JSON"}
                        </button>
                      </div>

                      {/* JSON Display */}
                      {showJson === component.name && componentPreviews[component.name] && (
                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                            {JSON.stringify(componentPreviews[component.name], null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 sm:mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 lg:p-10 text-center text-white">
          <div className="inline-block mb-4 p-3 bg-white/20 rounded-full">
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
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Interactive Components Now Available!
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6">
            This showcase displays Milestone 1 components. Check out our new interactive components
            showcase featuring form elements, toggles, sliders, and more!
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6">
            <div className="px-3 sm:px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-sm sm:text-base">
              Milestone 2: Theming System
            </div>
            <div className="px-3 sm:px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-sm sm:text-base">
              Milestone 3: Interactive Components
            </div>
            <div className="px-3 sm:px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-sm sm:text-base">
              Milestone 4: Advanced Layouts
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/showcase/interactive"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              View Interactive Components
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}