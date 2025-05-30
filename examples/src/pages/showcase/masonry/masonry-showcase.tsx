import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function MasonryShowcase() {
  usePageMetadata({
    title: "Masonry Component",
    description:
      "A comprehensive showcase of the React Jedi Masonry component with Pinterest-style layouts, responsive columns, animations, and advanced features.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic-usage", label: "Basic Usage" },
    { id: "responsive-columns", label: "Responsive Columns" },
    { id: "different-gaps", label: "Gap Variations" },
    { id: "animations", label: "Animations" },
    { id: "glassmorphic", label: "Glassmorphic Effects" },
    { id: "auto-fit", label: "Auto-Fit Columns" },
    { id: "mixed-content", label: "Mixed Content Types" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic masonry specification
  const basicMasonrySpec: UISpecification = {
    type: "Masonry",
    columns: 3,
    gap: 4,
    children: [
      {
        type: "Card",
        className: "h-48 bg-gradient-to-br from-blue-500 to-purple-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-6 h-full flex items-center justify-center",
            children: {
              type: "Text",
              className: "text-lg font-semibold text-center",
              children: "Card 1",
            },
          },
        ],
      },
      {
        type: "Card",
        className: "h-64 bg-gradient-to-br from-green-500 to-teal-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-6 h-full flex items-center justify-center",
            children: {
              type: "Text",
              className: "text-lg font-semibold text-center",
              children: "Card 2",
            },
          },
        ],
      },
      {
        type: "Card",
        className: "h-56 bg-gradient-to-br from-orange-500 to-red-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-6 h-full flex items-center justify-center",
            children: {
              type: "Text",
              className: "text-lg font-semibold text-center",
              children: "Card 3",
            },
          },
        ],
      },
      {
        type: "Card",
        className: "h-72 bg-gradient-to-br from-pink-500 to-rose-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-6 h-full flex items-center justify-center",
            children: {
              type: "Text",
              className: "text-lg font-semibold text-center",
              children: "Card 4",
            },
          },
        ],
      },
      {
        type: "Card",
        className: "h-44 bg-gradient-to-br from-indigo-500 to-blue-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-6 h-full flex items-center justify-center",
            children: {
              type: "Text",
              className: "text-lg font-semibold text-center",
              children: "Card 5",
            },
          },
        ],
      },
      {
        type: "Card",
        className: "h-60 bg-gradient-to-br from-yellow-500 to-orange-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-6 h-full flex items-center justify-center",
            children: {
              type: "Text",
              className: "text-lg font-semibold text-center",
              children: "Card 6",
            },
          },
        ],
      },
    ],
  };

  // Responsive columns specification
  const responsiveSpec: UISpecification = {
    type: "Masonry",
    columns: { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
    gap: 4,
    children: [
      {
        type: "Card",
        className: "h-52 bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-between",
            children: [
              {
                type: "Badge",
                variant: "secondary",
                className: "w-fit",
                children: "Tech",
              },
              {
                type: "Heading",
                level: 4,
                className: "text-white",
                children: "Responsive Layout",
              },
              {
                type: "Text",
                size: "small",
                className: "text-blue-100",
                children: "Adapts to screen size",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-64 bg-gradient-to-br from-emerald-500 to-green-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-between",
            children: [
              {
                type: "Badge",
                variant: "secondary",
                className: "w-fit",
                children: "Design",
              },
              {
                type: "Heading",
                level: 4,
                className: "text-white",
                children: "Mobile First",
              },
              {
                type: "Text",
                size: "small",
                className: "text-green-100",
                children: "Optimized for mobile devices",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-48 bg-gradient-to-br from-violet-500 to-purple-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-between",
            children: [
              {
                type: "Badge",
                variant: "secondary",
                className: "w-fit",
                children: "UX",
              },
              {
                type: "Heading",
                level: 4,
                className: "text-white",
                children: "Fluid Grid",
              },
              {
                type: "Text",
                size: "small",
                className: "text-violet-100",
                children: "Seamless transitions",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-56 bg-gradient-to-br from-amber-500 to-orange-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-between",
            children: [
              {
                type: "Badge",
                variant: "secondary",
                className: "w-fit",
                children: "Performance",
              },
              {
                type: "Heading",
                level: 4,
                className: "text-white",
                children: "Optimized",
              },
              {
                type: "Text",
                size: "small",
                className: "text-amber-100",
                children: "Fast rendering",
              },
            ],
          },
        ],
      },
    ],
  };

  // Different gap sizes
  const gapVariationsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3",
            children: "Gap 1 (4px)",
          },
          {
            type: "Masonry",
            columns: 4,
            gap: 1,
            children: [
              {
                type: "Card",
                className: "h-24 bg-blue-100 dark:bg-blue-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "1" },
              },
              {
                type: "Card",
                className: "h-32 bg-green-100 dark:bg-green-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "2" },
              },
              {
                type: "Card",
                className: "h-28 bg-purple-100 dark:bg-purple-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "3" },
              },
              {
                type: "Card",
                className: "h-36 bg-orange-100 dark:bg-orange-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "4" },
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3",
            children: "Gap 4 (16px)",
          },
          {
            type: "Masonry",
            columns: 4,
            gap: 4,
            children: [
              {
                type: "Card",
                className: "h-24 bg-blue-100 dark:bg-blue-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "1" },
              },
              {
                type: "Card",
                className: "h-32 bg-green-100 dark:bg-green-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "2" },
              },
              {
                type: "Card",
                className: "h-28 bg-purple-100 dark:bg-purple-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "3" },
              },
              {
                type: "Card",
                className: "h-36 bg-orange-100 dark:bg-orange-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "4" },
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3",
            children: "Gap 8 (32px)",
          },
          {
            type: "Masonry",
            columns: 4,
            gap: 8,
            children: [
              {
                type: "Card",
                className: "h-24 bg-blue-100 dark:bg-blue-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "1" },
              },
              {
                type: "Card",
                className: "h-32 bg-green-100 dark:bg-green-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "2" },
              },
              {
                type: "Card",
                className: "h-28 bg-purple-100 dark:bg-purple-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "3" },
              },
              {
                type: "Card",
                className: "h-36 bg-orange-100 dark:bg-orange-900 flex items-center justify-center",
                children: { type: "Text", size: "small", children: "4" },
              },
            ],
          },
        ],
      },
    ],
  };

  // Animations specification
  const animationsSpec: UISpecification = {
    type: "Masonry",
    columns: 3,
    gap: 4,
    animation: {
      duration: 0.6,
      stagger: 0.1,
    },
    children: [
      {
        type: "Card",
        className: "h-48 bg-gradient-to-br from-rose-500 to-pink-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center items-center",
            children: [
              {
                type: "Text",
                className: "text-2xl mb-2",
                children: "🎭",
              },
              {
                type: "Heading",
                level: 5,
                className: "text-white text-center",
                children: "Animated Entry",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-56 bg-gradient-to-br from-indigo-500 to-blue-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center items-center",
            children: [
              {
                type: "Text",
                className: "text-2xl mb-2",
                children: "⚡",
              },
              {
                type: "Heading",
                level: 5,
                className: "text-white text-center",
                children: "Staggered Animation",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-52 bg-gradient-to-br from-teal-500 to-green-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center items-center",
            children: [
              {
                type: "Text",
                className: "text-2xl mb-2",
                children: "🌟",
              },
              {
                type: "Heading",
                level: 5,
                className: "text-white text-center",
                children: "Smooth Transitions",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-44 bg-gradient-to-br from-purple-500 to-violet-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center items-center",
            children: [
              {
                type: "Text",
                className: "text-2xl mb-2",
                children: "🎨",
              },
              {
                type: "Heading",
                level: 5,
                className: "text-white text-center",
                children: "Custom Duration",
              },
            ],
          },
        ],
      },
    ],
  };

  // Glassmorphic effects
  const glassmorphicSpec: UISpecification = {
    type: "Box",
    className: "relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 rounded-xl overflow-hidden",
    children: [
      {
        type: "Masonry",
        columns: 2,
        gap: 6,
        glassmorphic: true,
        children: [
          {
            type: "Card",
            className: "h-40 p-4 flex flex-col justify-center",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "text-white mb-2",
                children: "Glassmorphic Card",
              },
              {
                type: "Text",
                size: "small",
                className: "text-white/80",
                children: "Beautiful glass-like effects with backdrop blur",
              },
            ],
          },
          {
            type: "Card",
            className: "h-48 p-4 flex flex-col justify-center",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "text-white mb-2",
                children: "Modern Design",
              },
              {
                type: "Text",
                size: "small",
                className: "text-white/80",
                children: "Enhances visual depth and hierarchy",
              },
            ],
          },
          {
            type: "Card",
            className: "h-44 p-4 flex flex-col justify-center",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "text-white mb-2",
                children: "Interactive",
              },
              {
                type: "Text",
                size: "small",
                className: "text-white/80",
                children: "Hover effects and smooth animations",
              },
            ],
          },
        ],
      },
    ],
  };

  // Auto-fit columns
  const autoFitSpec: UISpecification = {
    type: "Masonry",
    autoFit: true,
    minColWidth: "200px",
    gap: 4,
    children: [
      {
        type: "Card",
        className: "h-40 bg-gradient-to-br from-slate-500 to-gray-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "text-white mb-2",
                children: "Auto-Fit",
              },
              {
                type: "Text",
                size: "small",
                className: "text-gray-100",
                children: "Columns adjust automatically based on container width",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-48 bg-gradient-to-br from-red-500 to-rose-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "text-white mb-2",
                children: "Responsive",
              },
              {
                type: "Text",
                size: "small",
                className: "text-red-100",
                children: "Minimum column width ensures readability",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-44 bg-gradient-to-br from-yellow-500 to-amber-600 text-white",
        children: [
          {
            type: "CardContent",
            className: "p-4 h-full flex flex-col justify-center",
            children: [
              {
                type: "Heading",
                level: 5,
                className: "text-white mb-2",
                children: "Flexible",
              },
              {
                type: "Text",
                size: "small",
                className: "text-yellow-100",
                children: "Perfect for unknown content amounts",
              },
            ],
          },
        ],
      },
    ],
  };

  // Mixed content types
  const mixedContentSpec: UISpecification = {
    type: "Masonry",
    columns: 3,
    gap: 4,
    children: [
      {
        type: "Card",
        className: "h-64 overflow-hidden",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/400x300/EEE/31343C",
            alt: "Architecture",
            className: "w-full h-32 object-cover",
          },
          {
            type: "CardContent",
            className: "p-4",
            children: [
              {
                type: "Badge",
                variant: "secondary",
                className: "mb-2",
                children: "Architecture",
              },
              {
                type: "Heading",
                level: 5,
                className: "mb-2",
                children: "Modern Building",
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Contemporary architectural design with clean lines and geometric patterns.",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-48 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900",
        children: [
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                className: "text-3xl",
                children: "📊",
              },
              {
                type: "Heading",
                level: 5,
                children: "Statistics",
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Key performance metrics and data insights for better decision making.",
              },
              {
                type: "Progress",
                value: 75,
                className: "w-full",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-56 p-4",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Heading",
                level: 5,
                children: "Quick Actions",
              },
              {
                type: "Group",
                spacing: "2",
                children: [
                  {
                    type: "Button",
                    size: "sm",
                    variant: "primary",
                    children: "Create",
                  },
                  {
                    type: "Button",
                    size: "sm",
                    variant: "outline",
                    children: "Edit",
                  },
                ],
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Perform common actions quickly with these buttons.",
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-52 p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900",
        children: [
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Flex",
                align: "center",
                gap: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-2xl",
                    children: "✅",
                  },
                  {
                    type: "Heading",
                    level: 5,
                    children: "Tasks Complete",
                  },
                ],
              },
              {
                type: "Text",
                className: "text-2xl font-bold text-green-600 dark:text-green-400",
                children: "24/30",
              },
              {
                type: "Text",
                size: "small",
                variant: "muted",
                children: "Great progress! You&apos;re almost done with this week&apos;s goals.",
              },
            ],
          },
        ],
      },
    ],
  };

  // Photography gallery example
  const photographyGallerySpec: UISpecification = {
    type: "Masonry",
    columns: { base: 1, sm: 2, md: 3, lg: 4 },
    gap: 4,
    animation: { duration: 0.5, stagger: 0.08 },
    children: [
      {
        type: "Card",
        className: "h-64 overflow-hidden group cursor-pointer",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/600x400/EEE/31343C",
            alt: "Modern Architecture",
            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
          },
          {
            type: "Box",
            className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            children: [
              {
                type: "Box",
                className: "absolute bottom-4 left-4 right-4",
                children: [
                  {
                    type: "Badge",
                    variant: "secondary",
                    className: "mb-2",
                    children: "Architecture",
                  },
                  {
                    type: "Heading",
                    level: 6,
                    className: "text-white",
                    children: "Modern Building",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-80 overflow-hidden group cursor-pointer",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/600x600/EEE/31343C",
            alt: "Portrait",
            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
          },
          {
            type: "Box",
            className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            children: [
              {
                type: "Box",
                className: "absolute bottom-4 left-4 right-4",
                children: [
                  {
                    type: "Badge",
                    variant: "secondary",
                    className: "mb-2",
                    children: "Portrait",
                  },
                  {
                    type: "Heading",
                    level: 6,
                    className: "text-white",
                    children: "Professional Portrait",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-56 overflow-hidden group cursor-pointer",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/600x400/EEE/31343C",
            alt: "Nature",
            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
          },
          {
            type: "Box",
            className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            children: [
              {
                type: "Box",
                className: "absolute bottom-4 left-4 right-4",
                children: [
                  {
                    type: "Badge",
                    variant: "secondary",
                    className: "mb-2",
                    children: "Nature",
                  },
                  {
                    type: "Heading",
                    level: 6,
                    className: "text-white",
                    children: "Mountain Vista",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "Card",
        className: "h-72 overflow-hidden group cursor-pointer",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/600x500/EEE/31343C",
            alt: "Urban",
            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
          },
          {
            type: "Box",
            className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            children: [
              {
                type: "Box",
                className: "absolute bottom-4 left-4 right-4",
                children: [
                  {
                    type: "Badge",
                    variant: "secondary",
                    className: "mb-2",
                    children: "Urban",
                  },
                  {
                    type: "Heading",
                    level: 6,
                    className: "text-white",
                    children: "City Streets",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Masonry Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A Pinterest-style masonry layout component that creates beautiful, responsive grids with dynamic content distribution. Perfect for galleries, portfolios, and card-based layouts.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Masonry component creates elegant grid layouts where items flow vertically into columns of equal width. Unlike traditional grids, masonry layouts fill gaps efficiently by placing items in the shortest column, creating a more dynamic and visually interesting arrangement.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Responsive column configuration with breakpoint support</li>
                <li>Customizable gap spacing between items</li>
                <li>Auto-fit columns based on minimum width</li>
                <li>Built-in animations with stagger effects</li>
                <li>Optional glassmorphic styling for modern designs</li>
                <li>Custom item wrapper components</li>
                <li>Optimized for performance with virtual scrolling support</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic-usage" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start with a simple masonry layout using default settings.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicMasonrySpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicMasonrySpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Responsive Columns Section */}
          <section id="responsive-columns" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Responsive Columns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure different column counts for various screen sizes using breakpoint objects.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(responsiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(responsiveSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Gap Variations Section */}
          <section id="different-gaps" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Gap Variations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control spacing between masonry items with different gap values.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(gapVariationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(gapVariationsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Animations Section */}
          <section id="animations" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Animations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add smooth entry animations with customizable duration and stagger timing.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(animationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(animationsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Glassmorphic Effects Section */}
          <section id="glassmorphic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Glassmorphic Effects</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enable beautiful glass-like effects with backdrop blur and transparency.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(glassmorphicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(glassmorphicSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Auto-Fit Columns Section */}
          <section id="auto-fit" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Auto-Fit Columns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Let the masonry automatically determine column count based on container width and minimum column width.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(autoFitSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(autoFitSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Mixed Content Section */}
          <section id="mixed-content" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Mixed Content Types</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Combine different types of content within the same masonry layout.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(mixedContentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(mixedContentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
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
                    <td className="py-3 px-4 font-mono">&quot;Masonry&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">columns</td>
                    <td className="py-3 px-4 font-mono">number | ResponsiveValue</td>
                    <td className="py-3 px-4">3</td>
                    <td className="py-3 px-4">Number of columns or responsive breakpoint object</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">gap</td>
                    <td className="py-3 px-4 font-mono">number | ResponsiveValue</td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Gap between items in Tailwind units</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">autoFit</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Use auto-fit columns based on container width</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">minColWidth</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;250px&quot;</td>
                    <td className="py-3 px-4">Minimum column width when using autoFit</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">animation</td>
                    <td className="py-3 px-4 font-mono">AnimationConfig</td>
                    <td className="py-3 px-4">{"{ duration: 0.3, stagger: 0.05 }"}</td>
                    <td className="py-3 px-4">Animation settings for item entry</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">glassmorphic</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Apply glassmorphic effects to items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">itemComponent</td>
                    <td className="py-3 px-4 font-mono">ElementType</td>
                    <td className="py-3 px-4">&quot;div&quot;</td>
                    <td className="py-3 px-4">Custom wrapper component for items</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Array of child components to display in the masonry</td>
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
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">ResponsiveValue Type</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                ResponsiveValue allows you to specify different values for different breakpoints:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm">
{`{
  base: 1,    // Default (mobile)
  sm: 2,      // >= 640px
  md: 3,      // >= 768px
  lg: 4,      // >= 1024px
  xl: 5,      // >= 1280px
  "2xl": 6    // >= 1536px
}`}
              </pre>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showcasing different use cases for the Masonry component.
            </p>
            
            <div className="space-y-8">
              {/* Photography Gallery */}
              <div>
                <h3 className="text-lg font-medium mb-3">Photography Gallery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A responsive photo gallery with hover effects and image overlays.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(photographyGallerySpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(photographyGallerySpec, null, 2)}
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
                to="/documentation/layout-components"
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