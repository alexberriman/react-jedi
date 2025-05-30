import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function SkeletonShowcase() {
  usePageMetadata({
    title: "Skeleton Component",
    description:
      "A comprehensive showcase of the React Jedi Skeleton component for displaying loading states with various shapes, sizes, and animations.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Usage" },
    { id: "sizes", label: "Sizes & Shapes" },
    { id: "animation", label: "Animation Controls" },
    { id: "cards", label: "Card Skeletons" },
    { id: "lists", label: "List Skeletons" },
    { id: "forms", label: "Form Skeletons" },
    { id: "complex", label: "Complex Layouts" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic skeleton specification
  const basicSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Text",
        children: "Default skeleton with pulse animation:",
        variant: "muted",
        size: "small",
      },
      {
        type: "Skeleton",
        className: "h-4 w-full",
      },
      {
        type: "Text",
        children: "Multiple skeletons to simulate paragraph:",
        variant: "muted",
        size: "small",
        className: "mt-4",
      },
      {
        type: "Stack",
        spacing: "2",
        children: [
          { type: "Skeleton", className: "h-4 w-full" },
          { type: "Skeleton", className: "h-4 w-full" },
          { type: "Skeleton", className: "h-4 w-3/4" },
        ],
      },
    ],
  };

  // Sizes and shapes specification
  const sizesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            children: "Different sizes:",
            variant: "muted",
            size: "small",
            className: "mb-3",
          },
          {
            type: "Stack",
            spacing: "3",
            children: [
              { type: "Skeleton", className: "h-2 w-32" },
              { type: "Skeleton", className: "h-4 w-48" },
              { type: "Skeleton", className: "h-6 w-64" },
              { type: "Skeleton", className: "h-8 w-80" },
              { type: "Skeleton", className: "h-12 w-96" },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            children: "Different shapes:",
            variant: "muted",
            size: "small",
            className: "mb-3",
          },
          {
            type: "Group",
            spacing: "4",
            align: "center",
            children: [
              { type: "Skeleton", className: "h-12 w-12 rounded-full" },
              { type: "Skeleton", className: "h-12 w-12 rounded-none" },
              { type: "Skeleton", className: "h-12 w-12 rounded-md" },
              { type: "Skeleton", className: "h-12 w-12 rounded-lg" },
              { type: "Skeleton", className: "h-12 w-24 rounded-full" },
            ],
          },
        ],
      },
    ],
  };

  // Animation controls specification
  const animationSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            children: "With animation (default):",
            variant: "muted",
            size: "small",
            className: "mb-2",
          },
          { type: "Skeleton", className: "h-4 w-64", animate: true },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            children: "Without animation:",
            variant: "muted",
            size: "small",
            className: "mb-2",
          },
          { type: "Skeleton", className: "h-4 w-64", animate: false },
        ],
      },
    ],
  };

  // Card skeleton specification
  const cardSkeletonSpec: UISpecification = {
    type: "Grid",
    columns: { default: 1, sm: 2, lg: 3 },
    gap: "6",
    children: [
      // Basic card skeleton
      {
        type: "Card",
        className: "w-full",
        children: {
          type: "Stack",
          spacing: "4",
          className: "p-6",
          children: [
            { type: "Skeleton", className: "h-4 w-3/4" },
            { type: "Skeleton", className: "h-4 w-1/2" },
            {
              type: "Stack",
              spacing: "2",
              className: "mt-4",
              children: [
                { type: "Skeleton", className: "h-3 w-full" },
                { type: "Skeleton", className: "h-3 w-full" },
                { type: "Skeleton", className: "h-3 w-2/3" },
              ],
            },
          ],
        },
      },
      // Profile card skeleton
      {
        type: "Card",
        className: "w-full",
        children: {
          type: "Stack",
          spacing: "4",
          className: "p-6",
          children: [
            {
              type: "Flex",
              align: "center",
              gap: "4",
              children: [
                { type: "Skeleton", className: "h-12 w-12 rounded-full" },
                {
                  type: "Stack",
                  spacing: "2",
                  className: "flex-1",
                  children: [
                    { type: "Skeleton", className: "h-4 w-32" },
                    { type: "Skeleton", className: "h-3 w-24" },
                  ],
                },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Skeleton", className: "h-3 w-full" },
                { type: "Skeleton", className: "h-3 w-full" },
                { type: "Skeleton", className: "h-3 w-3/4" },
              ],
            },
          ],
        },
      },
      // Image card skeleton
      {
        type: "Card",
        className: "w-full overflow-hidden",
        children: [
          { type: "Skeleton", className: "h-48 w-full" },
          {
            type: "Stack",
            spacing: "3",
            className: "p-6",
            children: [
              { type: "Skeleton", className: "h-5 w-3/4" },
              { type: "Skeleton", className: "h-4 w-1/2" },
              {
                type: "Flex",
                justify: "between",
                align: "center",
                className: "mt-4",
                children: [
                  { type: "Skeleton", className: "h-8 w-24 rounded-md" },
                  { type: "Skeleton", className: "h-8 w-20 rounded-md" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // List skeleton specification
  const listSkeletonSpec: UISpecification = {
    type: "Stack",
    spacing: "4",
    children: [
      {
        type: "Card",
        children: {
          type: "Stack",
          spacing: "0",
          children: [
            // List item 1
            {
              type: "Flex",
              align: "center",
              gap: "3",
              className: "p-4 border-b",
              children: [
                { type: "Skeleton", className: "h-10 w-10 rounded-md" },
                {
                  type: "Stack",
                  spacing: "2",
                  className: "flex-1",
                  children: [
                    { type: "Skeleton", className: "h-4 w-48" },
                    { type: "Skeleton", className: "h-3 w-32" },
                  ],
                },
                { type: "Skeleton", className: "h-4 w-16" },
              ],
            },
            // List item 2
            {
              type: "Flex",
              align: "center",
              gap: "3",
              className: "p-4 border-b",
              children: [
                { type: "Skeleton", className: "h-10 w-10 rounded-md" },
                {
                  type: "Stack",
                  spacing: "2",
                  className: "flex-1",
                  children: [
                    { type: "Skeleton", className: "h-4 w-56" },
                    { type: "Skeleton", className: "h-3 w-40" },
                  ],
                },
                { type: "Skeleton", className: "h-4 w-16" },
              ],
            },
            // List item 3
            {
              type: "Flex",
              align: "center",
              gap: "3",
              className: "p-4",
              children: [
                { type: "Skeleton", className: "h-10 w-10 rounded-md" },
                {
                  type: "Stack",
                  spacing: "2",
                  className: "flex-1",
                  children: [
                    { type: "Skeleton", className: "h-4 w-52" },
                    { type: "Skeleton", className: "h-3 w-36" },
                  ],
                },
                { type: "Skeleton", className: "h-4 w-16" },
              ],
            },
          ],
        },
      },
    ],
  };

  // Form skeleton specification
  const formSkeletonSpec: UISpecification = {
    type: "Card",
    className: "w-full max-w-md",
    children: [
      {
        type: "CardHeader",
        children: [
          { type: "Skeleton", className: "h-6 w-48 mb-2" },
          { type: "Skeleton", className: "h-4 w-64" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "Stack",
          spacing: "6",
          children: [
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Skeleton", className: "h-4 w-20 mb-1" },
                { type: "Skeleton", className: "h-10 w-full rounded-md" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Skeleton", className: "h-4 w-24 mb-1" },
                { type: "Skeleton", className: "h-10 w-full rounded-md" },
              ],
            },
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Skeleton", className: "h-4 w-32 mb-1" },
                { type: "Skeleton", className: "h-10 w-full rounded-md" },
              ],
            },
          ],
        },
      },
      {
        type: "CardFooter",
        className: "flex gap-3",
        children: [
          { type: "Skeleton", className: "h-10 flex-1 rounded-md" },
          { type: "Skeleton", className: "h-10 flex-1 rounded-md" },
        ],
      },
    ],
  };

  // Complex layout specification
  const complexLayoutSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      // Dashboard header skeleton
      {
        type: "Card",
        children: {
          type: "Flex",
          justify: "between",
          align: "center",
          className: "p-6",
          children: [
            {
              type: "Stack",
              spacing: "2",
              children: [
                { type: "Skeleton", className: "h-8 w-48" },
                { type: "Skeleton", className: "h-4 w-32" },
              ],
            },
            {
              type: "Group",
              spacing: "3",
              children: [
                { type: "Skeleton", className: "h-10 w-32 rounded-md" },
                { type: "Skeleton", className: "h-10 w-10 rounded-full" },
              ],
            },
          ],
        },
      },
      // Stats cards
      {
        type: "Grid",
        columns: { default: 1, sm: 2, lg: 4 },
        gap: "4",
        children: [
          {
            type: "Card",
            children: {
              type: "Stack",
              spacing: "3",
              className: "p-4",
              children: [
                { type: "Skeleton", className: "h-4 w-24" },
                { type: "Skeleton", className: "h-8 w-32" },
                { type: "Skeleton", className: "h-3 w-20" },
              ],
            },
          },
          {
            type: "Card",
            children: {
              type: "Stack",
              spacing: "3",
              className: "p-4",
              children: [
                { type: "Skeleton", className: "h-4 w-28" },
                { type: "Skeleton", className: "h-8 w-36" },
                { type: "Skeleton", className: "h-3 w-24" },
              ],
            },
          },
          {
            type: "Card",
            children: {
              type: "Stack",
              spacing: "3",
              className: "p-4",
              children: [
                { type: "Skeleton", className: "h-4 w-32" },
                { type: "Skeleton", className: "h-8 w-28" },
                { type: "Skeleton", className: "h-3 w-20" },
              ],
            },
          },
          {
            type: "Card",
            children: {
              type: "Stack",
              spacing: "3",
              className: "p-4",
              children: [
                { type: "Skeleton", className: "h-4 w-24" },
                { type: "Skeleton", className: "h-8 w-40" },
                { type: "Skeleton", className: "h-3 w-28" },
              ],
            },
          },
        ],
      },
      // Content area
      {
        type: "Grid",
        columns: { default: 1, lg: 3 },
        gap: "6",
        children: [
          {
            type: "Card",
            className: "lg:col-span-2",
            children: {
              type: "Stack",
              spacing: "4",
              className: "p-6",
              children: [
                { type: "Skeleton", className: "h-6 w-48" },
                { type: "Skeleton", className: "h-64 w-full rounded-md" },
                {
                  type: "Stack",
                  spacing: "2",
                  children: [
                    { type: "Skeleton", className: "h-4 w-full" },
                    { type: "Skeleton", className: "h-4 w-full" },
                    { type: "Skeleton", className: "h-4 w-3/4" },
                  ],
                },
              ],
            },
          },
          {
            type: "Card",
            children: {
              type: "Stack",
              spacing: "4",
              className: "p-6",
              children: [
                { type: "Skeleton", className: "h-6 w-32" },
                {
                  type: "Stack",
                  spacing: "3",
                  children: Array.from({ length: 5 }, (_, i) => ({
                    type: "Flex" as const,
                    align: "center" as const,
                    gap: "3",
                    children: [
                      { type: "Skeleton" as const, className: "h-8 w-8 rounded-full" },
                      {
                        type: "Stack" as const,
                        spacing: "1",
                        className: "flex-1",
                        children: [
                          { type: "Skeleton" as const, className: "h-3 w-24" },
                          { type: "Skeleton" as const, className: "h-2 w-16" },
                        ],
                      },
                    ],
                  })),
                },
              ],
            },
          },
        ],
      },
    ],
  };

  // Complete example - Product page skeleton
  const productPageSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      // Breadcrumb skeleton
      {
        type: "Flex",
        gap: "2",
        align: "center",
        children: [
          { type: "Skeleton", className: "h-4 w-12" },
          { type: "Text", children: "/", variant: "muted" },
          { type: "Skeleton", className: "h-4 w-20" },
          { type: "Text", children: "/", variant: "muted" },
          { type: "Skeleton", className: "h-4 w-32" },
        ],
      },
      // Product details
      {
        type: "Grid",
        columns: { default: 1, lg: 2 },
        gap: "8",
        children: [
          // Product images
          {
            type: "Stack",
            spacing: "4",
            children: [
              { type: "Skeleton", className: "h-96 w-full rounded-lg" },
              {
                type: "Grid",
                columns: 4,
                gap: "2",
                children: Array.from({ length: 4 }, () => ({
                  type: "Skeleton" as const,
                  className: "h-20 w-full rounded-md",
                })),
              },
            ],
          },
          // Product info
          {
            type: "Stack",
            spacing: "6",
            children: [
              { type: "Skeleton", className: "h-8 w-3/4" },
              {
                type: "Flex",
                gap: "3",
                align: "center",
                children: [
                  { type: "Skeleton", className: "h-6 w-24" },
                  { type: "Skeleton", className: "h-6 w-32" },
                ],
              },
              { type: "Skeleton", className: "h-10 w-32" },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  { type: "Skeleton", className: "h-4 w-full" },
                  { type: "Skeleton", className: "h-4 w-full" },
                  { type: "Skeleton", className: "h-4 w-3/4" },
                ],
              },
              {
                type: "Stack",
                spacing: "3",
                children: [
                  { type: "Skeleton", className: "h-4 w-16 mb-2" },
                  {
                    type: "Group",
                    spacing: "2",
                    children: Array.from({ length: 4 }, () => ({
                      type: "Skeleton" as const,
                      className: "h-10 w-10 rounded-md",
                    })),
                  },
                ],
              },
              {
                type: "Flex",
                gap: "3",
                children: [
                  { type: "Skeleton", className: "h-12 flex-1 rounded-md" },
                  { type: "Skeleton", className: "h-12 w-12 rounded-md" },
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skeleton Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Display placeholder content while data is loading. The Skeleton component provides visual feedback that content is being loaded, improving perceived performance and user experience.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Skeleton component is essential for creating smooth loading states in your application. It provides a visual placeholder that mimics the shape and structure of the content that will eventually load.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Flexible sizing with Tailwind classes</li>
                <li>Multiple shape options (rectangular, circular, rounded)</li>
                <li>Smooth pulse animation by default</li>
                <li>Customizable animation duration</li>
                <li>Composable for complex loading layouts</li>
                <li>Accessible with proper ARIA attributes</li>
              </ul>
            </div>
          </section>

          {/* Basic Usage Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Skeleton component is highly flexible and uses Tailwind classes for sizing and styling.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Sizes & Shapes Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Sizes & Shapes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create skeletons of any size and shape using Tailwind utility classes.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(sizesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(sizesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Animation Controls Section */}
          <section id="animation" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Animation Controls</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the skeleton&apos;s animation behavior with the animate prop.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(animationSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(animationSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Card Skeletons Section */}
          <section id="cards" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Card Skeletons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Common skeleton patterns for card-based layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(cardSkeletonSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(cardSkeletonSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* List Skeletons Section */}
          <section id="lists" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">List Skeletons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Skeleton patterns for list and table views.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(listSkeletonSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(listSkeletonSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Form Skeletons Section */}
          <section id="forms" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Form Skeletons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Loading states for forms and input fields.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(formSkeletonSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(formSkeletonSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Complex Layouts Section */}
          <section id="complex" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complex Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Compose multiple skeletons to create complex loading states for dashboards and data-heavy interfaces.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(complexLayoutSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(complexLayoutSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;Skeleton&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Tailwind CSS classes for sizing and styling</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">width</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Width of the skeleton (e.g., &quot;100px&quot;, &quot;50%&quot;, &quot;full&quot;)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">height</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Height of the skeleton (e.g., &quot;20px&quot;, &quot;h-4&quot;)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">rounded</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether the skeleton should be rounded</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">radius</td>
                    <td className="py-3 px-4 font-mono">&quot;none&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot; | &quot;3xl&quot; | &quot;full&quot;</td>
                    <td className="py-3 px-4">&quot;md&quot;</td>
                    <td className="py-3 px-4">Border radius of the skeleton</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">animate</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Whether to show pulse animation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">animationDuration</td>
                    <td className="py-3 px-4 font-mono">number</td>
                    <td className="py-3 px-4">1500</td>
                    <td className="py-3 px-4">Animation duration in milliseconds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples of skeleton loading states.
            </p>
            
            <div className="space-y-8">
              {/* Product Page Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">E-commerce Product Page Skeleton</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(productPageSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(productPageSpec, null, 2)}
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