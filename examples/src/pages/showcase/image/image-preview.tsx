import { useState } from "react";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";

export function ImagePreview() {
  usePageMetadata({
    title: "Image Component",
    description:
      "React Jedi Image component showcase featuring responsive images with various filters, hover effects, and styling options.",
  });
  const [selectedExample, setSelectedExample] = useState("basic");

  const examples = {
    basic: {
      name: "Basic Usage",
      description: "Simple image with responsive sizing and rounded corners",
      spec: {
        type: "Stack",
        spacing: "6",
        children: [
          {
            type: "Image",
            src: "https://placehold.co/800x600/EEE/31343C",
            alt: "Beautiful landscape with mountains and lake",
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            rounded: "lg",
          },
          {
            type: "Text",
            children: "A responsive landscape image with 16:9 aspect ratio",
            className: "text-center text-gray-600 dark:text-gray-400",
          },
        ],
      },
    },
    objectFit: {
      name: "Object Fit Variants",
      description: "Different object-fit options for image sizing within containers",
      spec: {
        type: "Grid",
        columns: { base: 1, md: 2, lg: 3 },
        gap: "6",
        children: [
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Cover (default)",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Mountain landscape",
                width: "100%",
                height: "200px",
                objectFit: "cover",
                rounded: "md",
                className: "border border-gray-200 dark:border-gray-700",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Contain",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Mountain landscape",
                width: "100%",
                height: "200px",
                objectFit: "contain",
                rounded: "md",
                className: "border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Fill",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Mountain landscape",
                width: "100%",
                height: "200px",
                objectFit: "fill",
                rounded: "md",
                className: "border border-gray-200 dark:border-gray-700",
              },
            ],
          },
        ],
      },
    },
    filters: {
      name: "Filter Effects",
      description: "CSS filter effects for artistic image treatments",
      spec: {
        type: "Grid",
        columns: { base: 1, md: 2, lg: 4 },
        gap: "6",
        children: [
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Original",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Starry night landscape",
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                rounded: "lg",
                filter: "none",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Grayscale",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Starry night landscape",
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                rounded: "lg",
                filter: "grayscale",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Sepia",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Starry night landscape",
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                rounded: "lg",
                filter: "sepia",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "3",
            children: [
              {
                type: "Text",
                children: "Blur",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Starry night landscape",
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                rounded: "lg",
                filter: "blur",
              },
            ],
          },
        ],
      },
    },
    hover: {
      name: "Hover Effects",
      description: "Interactive hover animations for enhanced user experience",
      spec: {
        type: "Stack",
        spacing: "8",
        children: [
          {
            type: "Text",
            children: "Hover over the images below to see the effects",
            className: "text-center text-gray-600 dark:text-gray-400 text-lg",
          },
          {
            type: "Grid",
            columns: { base: 1, md: 2, lg: 3 },
            gap: "6",
            children: [
              {
                type: "Stack",
                spacing: "3",
                children: [
                  {
                    type: "Text",
                    children: "Grow on Hover",
                    className: "font-semibold text-center",
                  },
                  {
                    type: "Image",
                    src: "https://placehold.co/600x400/EEE/31343C",
                    alt: "Sunset over lake",
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    rounded: "lg",
                    shadow: "md",
                    hover: "grow",
                  },
                ],
              },
              {
                type: "Stack",
                spacing: "3",
                children: [
                  {
                    type: "Text",
                    children: "Rotate on Hover",
                    className: "font-semibold text-center",
                  },
                  {
                    type: "Image",
                    src: "https://placehold.co/600x400/EEE/31343C",
                    alt: "Mountain range",
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    rounded: "lg",
                    shadow: "md",
                    hover: "rotate",
                  },
                ],
              },
              {
                type: "Stack",
                spacing: "3",
                children: [
                  {
                    type: "Text",
                    children: "Shrink on Hover",
                    className: "font-semibold text-center",
                  },
                  {
                    type: "Image",
                    src: "https://placehold.co/600x400/EEE/31343C",
                    alt: "Forest path",
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    rounded: "lg",
                    shadow: "md",
                    hover: "shrink",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    rounded: {
      name: "Border Radius Options",
      description: "Different border radius values for various design needs",
      spec: {
        type: "Grid",
        columns: { base: 2, md: 4, lg: 6 },
        gap: "4",
        children: [
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "None",
                className: "text-sm font-medium text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/200x200/EEE/31343C",
                alt: "Landscape",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                rounded: "none",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Small",
                className: "text-sm font-medium text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/200x200/EEE/31343C",
                alt: "Landscape",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                rounded: "sm",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Medium",
                className: "text-sm font-medium text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/200x200/EEE/31343C",
                alt: "Landscape",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                rounded: "md",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Large",
                className: "text-sm font-medium text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/200x200/EEE/31343C",
                alt: "Landscape",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                rounded: "lg",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "2XL",
                className: "text-sm font-medium text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/200x200/EEE/31343C",
                alt: "Landscape",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                rounded: "2xl",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "2",
            children: [
              {
                type: "Text",
                children: "Full",
                className: "text-sm font-medium text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/200x200/EEE/31343C",
                alt: "Landscape",
                width: "120px",
                height: "120px",
                objectFit: "cover",
                rounded: "full",
              },
            ],
          },
        ],
      },
    },
    shadow: {
      name: "Shadow Variants",
      description: "Box shadow effects to add depth and visual hierarchy",
      spec: {
        type: "Grid",
        columns: { base: 1, md: 2, lg: 3 },
        gap: "8",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Text",
                children: "Small Shadow",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Forest landscape",
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                rounded: "lg",
                shadow: "sm",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Text",
                children: "Medium Shadow",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Forest landscape",
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
              },
            ],
          },
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Text",
                children: "Large Shadow",
                className: "font-semibold text-center",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Forest landscape",
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                rounded: "lg",
                shadow: "xl",
              },
            ],
          },
        ],
      },
    },
    avatars: {
      name: "Avatar Gallery",
      description: "Perfect circular images for user profiles and avatars",
      spec: {
        type: "Stack",
        spacing: "8",
        children: [
          {
            type: "Text",
            children: "User Avatars",
            className: "text-2xl font-bold text-center",
          },
          {
            type: "Flex",
            justify: "center",
            align: "center",
            gap: "6",
            wrap: "wrap",
            children: [
              {
                type: "Stack",
                spacing: "2",
                align: "center",
                children: [
                  {
                    type: "Image",
                    src: "https://placehold.co/200x200/EEE/31343C",
                    alt: "Sarah Wilson",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    rounded: "full",
                    shadow: "lg",
                  },
                  {
                    type: "Text",
                    children: "Sarah Wilson",
                    className: "text-sm font-medium",
                  },
                ],
              },
              {
                type: "Stack",
                spacing: "2",
                align: "center",
                children: [
                  {
                    type: "Image",
                    src: "https://placehold.co/200x200/EEE/31343C",
                    alt: "John Doe",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    rounded: "full",
                    shadow: "lg",
                  },
                  {
                    type: "Text",
                    children: "John Doe",
                    className: "text-sm font-medium",
                  },
                ],
              },
              {
                type: "Stack",
                spacing: "2",
                align: "center",
                children: [
                  {
                    type: "Image",
                    src: "https://placehold.co/200x200/EEE/31343C",
                    alt: "Emily Chen",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    rounded: "full",
                    shadow: "lg",
                  },
                  {
                    type: "Text",
                    children: "Emily Chen",
                    className: "text-sm font-medium",
                  },
                ],
              },
              {
                type: "Stack",
                spacing: "2",
                align: "center",
                children: [
                  {
                    type: "Image",
                    src: "https://placehold.co/200x200/EEE/31343C",
                    alt: "Michael Brown",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    rounded: "full",
                    shadow: "lg",
                  },
                  {
                    type: "Text",
                    children: "Michael Brown",
                    className: "text-sm font-medium",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    gallery: {
      name: "Photo Gallery",
      description: "Responsive image gallery with mixed aspect ratios",
      spec: {
        type: "Stack",
        spacing: "6",
        children: [
          {
            type: "Text",
            children: "Nature Photography Collection",
            className: "text-2xl font-bold text-center",
          },
          {
            type: "Grid",
            columns: { base: 1, md: 2, lg: 3 },
            gap: "4",
            children: [
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Mountain peak at sunrise",
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
                hover: "grow",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Serene lake reflection",
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
                hover: "grow",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Dense forest canopy",
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
                hover: "grow",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Rocky coastline waves",
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
                hover: "grow",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Desert sand dunes",
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
                hover: "grow",
              },
              {
                type: "Image",
                src: "https://placehold.co/600x400/EEE/31343C",
                alt: "Misty valley landscape",
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                rounded: "lg",
                shadow: "md",
                hover: "grow",
              },
            ],
          },
        ],
      },
    },
  };

  const currentExample = examples[selectedExample];

  const tableOfContents = [
    { id: "basic", title: "Basic Usage" },
    { id: "objectFit", title: "Object Fit Options" },
    { id: "filters", title: "Filter Effects" },
    { id: "hover", title: "Hover Animations" },
    { id: "rounded", title: "Border Radius" },
    { id: "shadow", title: "Shadow Effects" },
    { id: "avatars", title: "Avatar Gallery" },
    { id: "gallery", title: "Photo Gallery" },
  ];

  const props = [
    {
      name: "src",
      type: "string",
      required: true,
      description: "The image source URL",
    },
    {
      name: "alt",
      type: "string",
      required: true,
      description: "Alternative text for accessibility",
    },
    {
      name: "width",
      type: "string | number",
      required: false,
      description: "Image width (CSS units or pixels)",
    },
    {
      name: "height", 
      type: "string | number",
      required: false,
      description: "Image height (CSS units or pixels)",
    },
    {
      name: "aspectRatio",
      type: "string",
      required: false,
      description: "CSS aspect-ratio property (e.g., '16/9', '4/3')",
    },
    {
      name: "objectFit",
      type: "'contain' | 'cover' | 'fill' | 'none' | 'scaleDown'",
      required: false,
      description: "How the image should fit within its container",
    },
    {
      name: "rounded",
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'",
      required: false,
      description: "Border radius for rounded corners",
    },
    {
      name: "shadow",
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      description: "Drop shadow intensity",
    },
    {
      name: "filter",
      type: "'none' | 'grayscale' | 'sepia' | 'blur' | 'invert'",
      required: false,
      description: "CSS filter effects",
    },
    {
      name: "hover",
      type: "'none' | 'grow' | 'shrink' | 'rotate' | 'shine' | 'glow' | 'pulse'",
      required: false,
      description: "Hover animation effect",
    },
    {
      name: "loading",
      type: "'eager' | 'lazy'",
      required: false,
      description: "Image loading strategy",
    },
    {
      name: "fallback",
      type: "string",
      required: false,
      description: "Fallback image URL if the main image fails to load",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Image Component</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Responsive images with filters, hover effects, and styling options
              </p>
            </div>
            <a
              href="/showcase"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              ← Back to Showcase
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedExample(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedExample === item.id
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>

              {/* Props Reference */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Props Reference</h2>
                <div className="space-y-3 text-sm">
                  {props.map((prop) => (
                    <div key={prop.name} className="border-b border-zinc-200 dark:border-zinc-700 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-blue-600 dark:text-blue-400 font-medium">
                          {prop.name}
                        </code>
                        {prop.required && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                        {prop.type}
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-300 text-xs">
                        {prop.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Example Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">{currentExample.name}</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {currentExample.description}
              </p>
            </div>

            {/* Code Preview */}
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700 mb-8">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  JSON Specification
                </span>
                <button
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(currentExample.spec, null, 2))
                  }
                >
                  Copy JSON
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-zinc-700 dark:text-zinc-300">
                  <code>{JSON.stringify(currentExample.spec, null, 2)}</code>
                </pre>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
              <h3 className="text-lg font-semibold mb-6">Live Preview</h3>
              <div className="min-h-[200px]">
                {render({ specification: currentExample.spec })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}