import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@banja/react-jedi";
import type { UISpecification, ComponentSpec } from "@banja/react-jedi";

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
        name: "AspectRatio",
        description: "Maintains a consistent width-to-height ratio for content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Separator",
        description: "Horizontal or vertical dividing line for content sections.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Stack",
        description: "Vertical or horizontal stacking component with consistent spacing.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Center",
        description: "Centers its children horizontally and/or vertically using flexbox.",
        status: "completed",
        type: "custom",
      },
      {
        name: "SimpleGrid",
        description: "Responsive grid with equal-sized cells and automatic responsive behavior.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Masonry",
        description:
          "Pinterest-style grid layout with items flowing vertically, perfect for dynamic content.",
        status: "completed",
        type: "custom",
      },
      {
        name: "ScrollArea",
        description:
          "Customizable scrollbar component for overflowing content with smooth scrolling.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Resizable",
        description:
          "Split pane component with draggable dividers for creating resizable panels, supporting both horizontal and vertical layouts.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "typography",
    title: "Typography Components",
    description: "Components for text content with various styling options.",
    components: [
      {
        name: "Heading",
        description: "Heading component for h1-h6 elements with sizing variants.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Text",
        description: "Text component for paragraph and span elements with styling options.",
        status: "completed",
        type: "custom",
      },
      {
        name: "BlockQuote",
        description: "Stylized blockquote component for testimonials and citations.",
        status: "completed",
        type: "custom",
      },
    ],
  },
  {
    id: "ui",
    title: "UI Components",
    description: "Interactive and visual UI elements for user interfaces.",
    components: [
      {
        name: "Button",
        description: "Interactive button with variants, sizes, and icon support.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Card",
        description: "Container component for grouping related content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Badge",
        description: "Small status indicator component with variants.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Avatar",
        description: "User profile picture component with fallback support.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Skeleton",
        description: "Loading placeholder for content that's still loading.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Label",
        description: "Form label component for accessibility and styling.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Input",
        description: "Text input field with styling and validation options.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Tooltip",
        description: "Displays helpful information on hover or focus.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Carousel",
        description: "Displays multiple items in a scrollable slideshow format.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "media",
    title: "Media Components",
    description: "Components for displaying media content.",
    components: [
      {
        name: "Image",
        description: "Responsive image component with advanced styling options.",
        status: "completed",
        type: "custom",
      },
    ],
  },
  {
    id: "advanced-layout",
    title: "Advanced Layout Components",
    description: "Advanced layout and navigation components for complex interfaces.",
    components: [
      {
        name: "Stack",
        description: "Vertical or horizontal stacking with consistent spacing.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Group",
        description: "Inline elements with consistent spacing.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Center",
        description: "Centers children horizontally and vertically.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Spacer",
        description: "Adds flexible spacing.",
        status: "completed",
        type: "custom",
      },
      {
        name: "SimpleGrid",
        description: "Responsive grid with equal-sized cells.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Masonry",
        description: "Pinterest-style grid layout.",
        status: "completed",
        type: "custom",
      },
      {
        name: "ScrollArea",
        description: "Custom scrollbar container.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Resizable",
        description: "Resizable panel layout.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Sheet",
        description: "Slide-out panel component.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Tabs",
        description: "Tab-based navigation interface.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Accordion",
        description: "Collapsible content sections.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Dialog",
        description: "Modal dialog for important content.",
        status: "completed",
        type: "shadcn",
      },
      {
        name: "Popover",
        description: "Floating panel for contextual content and interactions.",
        status: "completed",
        type: "shadcn",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing Components",
    description:
      "Pre-built marketing components for creating stunning landing pages and marketing sites.",
    components: [
      {
        name: "Hero",
        description:
          "Full-width hero section with multiple layout variants, backgrounds, and animations.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Testimonial",
        description:
          "Customer testimonial component with multiple variants including card, minimal, large, and quote styles.",
        status: "completed",
        type: "custom",
      },
      {
        name: "PricingTable",
        description:
          "Pricing table component with support for multiple tiers, features, highlighting, and responsive columns.",
        status: "completed",
        type: "custom",
      },
      {
        name: "CallToAction",
        description:
          "Eye-catching call-to-action sections with various layouts and background options.",
        status: "completed",
        type: "custom",
      },
      {
        name: "FeatureCard",
        description:
          "Feature showcase cards with icons and descriptions for highlighting product benefits.",
        status: "completed",
        type: "custom",
      },
      {
        name: "Footer",
        description:
          "Website footer component with multiple sections for navigation, social links, and copyright.",
        status: "completed",
        type: "custom",
      },
    ],
  },
];

// Component preview specifications
const componentPreviews: Record<string, UISpecification | ComponentSpec> = {
  Container: {
    type: "Container",
    maxWidth: "4xl",
    className: "p-6 bg-zinc-800/30 rounded-lg border border-zinc-700",
    children: [
      {
        type: "Text",
        className: "text-zinc-300",
        children: "This is a Container component with maxWidth and padding",
      },
    ],
  },
  Box: {
    type: "Box",
    className: "p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/40",
    children: [
      {
        type: "Text",
        children: "Box component - a primitive div-like element",
      },
    ],
  },
  Grid: {
    type: "Grid",
    columns: { base: 1, md: 3 },
    gap: "4",
    children: [
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded", children: "Grid Item 1" },
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded", children: "Grid Item 2" },
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded", children: "Grid Item 3" },
    ],
  },
  Flex: {
    type: "Flex",
    align: "center",
    justify: "between",
    className: "p-4 bg-zinc-800/50 rounded",
    children: [
      { type: "Text", children: "Left aligned" },
      { type: "Text", children: "Right aligned" },
    ],
  },
  AspectRatio: {
    type: "AspectRatio",
    ratio: 16 / 9,
    children: {
      type: "Box",
      className:
        "bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg w-full h-full flex items-center justify-center",
      children: {
        type: "Text",
        className: "text-white font-semibold",
        children: "16:9 Aspect Ratio",
      },
    },
  },
  Separator: {
    type: "Box",
    children: [
      { type: "Text", className: "mb-2", children: "Above separator" },
      { type: "Separator" },
      { type: "Text", className: "mt-2", children: "Below separator" },
    ],
  },
  Stack: {
    type: "Stack",
    spacing: "4",
    children: [
      { type: "Box", className: "p-3 bg-zinc-800/50 rounded", children: "Stack Item 1" },
      { type: "Box", className: "p-3 bg-zinc-800/50 rounded", children: "Stack Item 2" },
      { type: "Box", className: "p-3 bg-zinc-800/50 rounded", children: "Stack Item 3" },
    ],
  },
  Center: {
    type: "Center",
    className: "h-32 bg-zinc-800/30 rounded-lg border border-zinc-700",
    children: {
      type: "Text",
      className: "text-emerald-400 font-semibold",
      children: "Centered Content",
    },
  },
  Heading: {
    type: "Box",
    className: "space-y-2",
    children: [
      { type: "Heading", level: 1, children: "Heading H1" },
      { type: "Heading", level: 2, children: "Heading H2" },
      { type: "Heading", level: 3, children: "Heading H3" },
    ],
  },
  Text: {
    type: "Box",
    className: "space-y-2",
    children: [
      { type: "Text", children: "Default text style" },
      { type: "Text", className: "text-sm text-zinc-400", children: "Small muted text" },
      {
        type: "Text",
        className: "text-lg font-semibold text-emerald-400",
        children: "Large bold colored text",
      },
    ],
  },
  BlockQuote: {
    type: "BlockQuote",
    className: "border-l-4 border-emerald-500 pl-4 italic",
    children: "This is a blockquote component for quotes and citations.",
  },
  Button: {
    type: "Flex",
    gap: "3",
    align: "center",
    children: [
      { type: "Button", children: "Default" },
      { type: "Button", variant: "secondary", children: "Secondary" },
      { type: "Button", variant: "outline", children: "Outline" },
      { type: "Button", variant: "destructive", children: "Destructive" },
    ],
  },
  Card: {
    type: "Card",
    className: "w-full max-w-sm",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "CardTitle", children: "Card Title" },
          { type: "CardDescription", children: "Card description goes here" },
        ],
      },
      {
        type: "CardContent",
        children: { type: "Text", children: "Card content area" },
      },
    ],
  },
  Badge: {
    type: "Flex",
    gap: "3",
    align: "center",
    children: [
      { type: "Badge", children: "Default" },
      { type: "Badge", variant: "secondary", children: "Secondary" },
      { type: "Badge", variant: "outline", children: "Outline" },
      { type: "Badge", variant: "destructive", children: "Destructive" },
    ],
  },
  Avatar: {
    type: "Flex",
    gap: "3",
    align: "center",
    children: [
      {
        type: "Avatar",
        children: [
          { type: "AvatarImage", src: "https://github.com/shadcn.png" },
          { type: "AvatarFallback", children: "JD" },
        ],
      },
      {
        type: "Avatar",
        children: [{ type: "AvatarFallback", children: "AB" }],
      },
    ],
  },
  Label: {
    type: "Box",
    className: "space-y-2",
    children: [
      { type: "Label", htmlFor: "email", children: "Email Address" },
      { type: "Input", id: "email", inputType: "email", placeholder: "Enter your email" },
    ],
  },
  Input: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Input", placeholder: "Default input" },
      { type: "Input", inputType: "email", placeholder: "Email input" },
      { type: "Input", disabled: true, value: "Disabled input" },
    ],
  },
  Image: {
    type: "Image",
    src: "https://via.placeholder.com/300x200",
    alt: "Placeholder image",
    className: "rounded-lg",
  },
  Group: {
    type: "Group",
    spacing: "4",
    children: [
      { type: "Button", size: "sm", variant: "outline", children: "Option 1" },
      { type: "Button", size: "sm", variant: "outline", children: "Option 2" },
      { type: "Button", size: "sm", variant: "outline", children: "Option 3" },
    ],
  },
  Spacer: {
    type: "Flex",
    className: "h-20 bg-zinc-800/30 rounded",
    children: [
      { type: "Text", className: "text-sm", children: "Left" },
      { type: "Spacer" },
      { type: "Text", className: "text-sm", children: "Right (with spacer between)" },
    ],
  },
  SimpleGrid: {
    type: "SimpleGrid",
    columns: { base: 2, md: 4 },
    spacing: "4",
    children: Array.from({ length: 8 }).map((_, i) => ({
      type: "Box",
      className: "p-4 bg-zinc-800/50 rounded text-center",
      children: `Item ${i + 1}`,
    })),
  },
  Skeleton: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Skeleton", className: "h-12 w-full" },
      { type: "Skeleton", className: "h-4 w-3/4" },
      { type: "Skeleton", className: "h-4 w-1/2" },
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
      { type: "TooltipContent", children: "This is a tooltip!" },
    ],
  },
  Masonry: {
    type: "Masonry",
    columns: { base: 2, md: 3 },
    spacing: "4",
    children: [
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded h-32", children: "Tall item" },
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded h-20", children: "Short item" },
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded h-40", children: "Very tall item" },
      { type: "Box", className: "p-4 bg-zinc-800/50 rounded h-24", children: "Medium item" },
    ],
  },
  Hero: {
    type: "Hero",
    variant: "default",
    className: "bg-gradient-to-br from-emerald-900/30 to-purple-900/30",
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
            className: "text-sm text-zinc-400",
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
      className: "text-center text-zinc-400",
      children: "Sheet component - View full demo →",
    },
  },
  Tabs: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Tabs component - View full demo →",
    },
  },
  Accordion: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Accordion component - View full demo →",
    },
  },
  Dialog: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Dialog component - View full demo →",
    },
  },
  ScrollArea: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "ScrollArea component - View full demo →",
    },
  },
  Resizable: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Resizable component - View full demo →",
    },
  },
  CallToAction: {
    type: "Box",
    className: "p-8 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 rounded-lg text-center",
    children: [
      {
        type: "Heading",
        level: 3,
        className: "mb-4 text-white",
        children: "Ready to Get Started?",
      },
      {
        type: "Text",
        className: "mb-6 text-zinc-300",
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
        className: "mb-4 h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center",
        children: {
          type: "Text",
          className: "text-emerald-400 text-xl",
          children: "✨",
        },
      },
      {
        type: "Heading",
        level: 4,
        className: "mb-2",
        children: "Feature Title",
      },
      {
        type: "Text",
        className: "text-zinc-400",
        children: "This is a feature card component for showcasing product features with icons.",
      },
    ],
  },
  Footer: {
    type: "Box",
    className: "border-t border-zinc-800 pt-8",
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
                level: 5,
                className: "mb-4",
                children: "Company",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  { type: "Text", className: "text-sm text-zinc-400", children: "About" },
                  { type: "Text", className: "text-sm text-zinc-400", children: "Team" },
                  { type: "Text", className: "text-sm text-zinc-400", children: "Careers" },
                ],
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "mb-4",
                children: "Product",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  { type: "Text", className: "text-sm text-zinc-400", children: "Features" },
                  { type: "Text", className: "text-sm text-zinc-400", children: "Pricing" },
                  { type: "Text", className: "text-sm text-zinc-400", children: "Docs" },
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
        className: "pt-8 border-t border-zinc-800",
        children: [
          {
            type: "Text",
            className: "text-sm text-zinc-400",
            children: "© 2025 React Jedi. All rights reserved.",
          },
          {
            type: "Flex",
            gap: "4",
            children: [
              { type: "Text", className: "text-sm text-zinc-400", children: "Privacy" },
              { type: "Text", className: "text-sm text-zinc-400", children: "Terms" },
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
      className: "text-center text-zinc-400",
      children: "Drawer component - Dynamic sliding panel",
    },
  },
  DropdownMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Dropdown Menu - Interactive menu system",
    },
  },
  ContextMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Context Menu - Right-click menu",
    },
  },
  Menubar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Menubar - Application menubar",
    },
  },
  NavigationMenu: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Navigation Menu - Site navigation",
    },
  },
  Breadcrumb: {
    type: "Box",
    className: "flex items-center gap-2 text-sm",
    children: [
      { type: "Text", className: "text-zinc-400", children: "Home" },
      { type: "Text", className: "text-zinc-500", children: "/" },
      { type: "Text", className: "text-zinc-400", children: "Products" },
      { type: "Text", className: "text-zinc-500", children: "/" },
      { type: "Text", className: "text-white", children: "React Jedi" },
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
      className: "text-center text-zinc-400",
      children: "Command Palette - Press ⌘K to open",
    },
  },
  Sidebar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Sidebar - App navigation sidebar",
    },
  },
  Calendar: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Calendar - Date picker component",
    },
  },
  DatePicker: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Date Picker - Select date with calendar",
    },
  },
  Combobox: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Combobox - Searchable select input",
    },
  },
  InputOTP: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Input OTP - One-time password input",
    },
  },
  Table: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Table - Data table component",
    },
  },
  DataTable: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Data Table - Advanced sortable table",
    },
  },
  Chart: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Chart - Data visualization component",
    },
  },
  Progress: {
    type: "Box",
    className: "space-y-3",
    children: [
      { type: "Progress", value: 33, className: "h-2" },
      { type: "Text", className: "text-sm text-zinc-400", children: "33% Complete" },
    ],
  },
  HoverCard: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
      children: "Hover Card - Content on hover",
    },
  },
  Alert: {
    type: "Alert",
    className: "bg-emerald-900/20 border-emerald-500/40",
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
      className: "text-center text-zinc-400",
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
      { type: "Text", className: "text-sm text-zinc-400", children: "Volume: 50%" },
    ],
  },
  Collapsible: {
    type: "Box",
    children: {
      type: "Text",
      className: "text-center text-zinc-400",
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
      className: "text-center text-zinc-400",
      children: "Sonner - Toast notifications",
    },
  },
};

export function ShowcasePage() {
  const [showJson, setShowJson] = useState<string | null>(null);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="rounded-xl sm:rounded-2xl mb-8 sm:mb-16 p-6 sm:p-8 bg-gradient-to-br from-emerald-900/30 via-zinc-900/50 to-violet-900/30 border border-emerald-500/20 backdrop-blur-sm">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Component Showcase
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl">
            Explore all the available components. Each component is rendered live below and can be
            defined via JSON specification using React Jedi&apos;s server-driven UI architecture.
          </p>
        </div>

        {/* Filter & Navigation Section */}
        <div className="sticky top-20 z-10 bg-zinc-900/80 backdrop-blur-xl mb-8 sm:mb-12 py-3 sm:py-4 px-4 sm:px-6 rounded-xl border border-zinc-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <a
              href="#all"
              className="px-4 py-2 bg-emerald-500/15 rounded-lg text-emerald-400 hover:bg-emerald-500/25 transition-all whitespace-nowrap"
            >
              All Components
            </a>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-all whitespace-nowrap"
              >
                {category.title}
              </a>
            ))}
          </div>
          <Link
            to="/documentation"
            className="px-4 py-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-all flex items-center gap-2 whitespace-nowrap"
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
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">{category.title}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
              </div>
              <p className="text-lg sm:text-xl text-zinc-300 mb-6 sm:mb-8">
                {category.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {category.components.map((component) => (
                  <div
                    key={component.name}
                    className="group relative bg-zinc-800/40 backdrop-blur-sm border border-zinc-700 rounded-xl overflow-hidden transition-all hover:bg-zinc-800/60 hover:border-emerald-500/40"
                  >
                    {/* Component Preview - Always visible by default */}
                    {component.status === "completed" && componentPreviews[component.name] && (
                      <div
                        className={`bg-zinc-900/50 p-6 border-b border-zinc-700 ${
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
                          className={`text-xs px-2 py-1 rounded-full ${
                            component.type === "custom"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-zinc-700/80 text-zinc-300"
                          }`}
                        >
                          {component.type === "custom" ? "Custom" : "@shadcn/ui"}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            (component.status === "completed" && "bg-emerald-500") ||
                            (component.status === "in-progress" && "bg-amber-500") ||
                            "bg-zinc-500"
                          }`}
                        ></div>
                        <span className="text-xs text-zinc-400 uppercase tracking-wider">
                          {(component.status === "completed" && "Ready") ||
                            (component.status === "in-progress" && "In Progress") ||
                            "Planned"}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        {component.name}
                      </h3>

                      <p className="text-sm sm:text-base text-zinc-400 mb-4">
                        {component.description}
                      </p>

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
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
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
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
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
                          className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors flex items-center gap-1"
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
                        <div className="mt-4 p-4 bg-zinc-900 rounded-lg border border-zinc-700">
                          <pre className="text-sm text-zinc-300 overflow-x-auto">
                            {JSON.stringify(componentPreviews[component.name], null, 2)}
                          </pre>
                        </div>
                      )}

                      {/* Hover effect with gradient */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 sm:mt-20 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-700/30 rounded-xl p-6 sm:p-8 lg:p-10 text-center">
          <div className="inline-block mb-4 p-3 bg-purple-500/20 rounded-full">
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
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
            Interactive Components Now Available!
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-6">
            This showcase displays Milestone 1 components. Check out our new interactive components
            showcase featuring form elements, toggles, sliders, and more!
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6">
            <div className="px-3 sm:px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 text-sm sm:text-base">
              Milestone 2: Theming System
            </div>
            <div className="px-3 sm:px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 text-sm sm:text-base">
              Milestone 3: Interactive Components
            </div>
            <div className="px-3 sm:px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 text-sm sm:text-base">
              Milestone 4: Advanced Layouts
            </div>
            <div className="px-3 sm:px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 text-sm sm:text-base">
              Milestone 5: Animations
            </div>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/showcase/interactive"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              View Interactive Components
            </Link>
            <Link
              to="/showcase/layout"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-medium hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              View Layout Showcase
            </Link>
            <Link
              to="/landing"
              className="px-6 py-3 bg-zinc-800/50 rounded-lg text-white font-medium hover:bg-zinc-700/50 transition-all border border-zinc-700"
            >
              Landing Page Example
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
