import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function FeatureCardShowcase() {
  usePageMetadata({
    title: "FeatureCard Component",
    description:
      "A comprehensive showcase of the React Jedi FeatureCard component with all variants, orientations, states, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Card Variants" },
    { id: "orientations", label: "Layout Orientations" },
    { id: "alignments", label: "Content Alignment" },
    { id: "badges", label: "With Badges" },
    { id: "highlighting", label: "Highlighting" },
    { id: "interactive", label: "Interactive Cards" },
    { id: "grid-layouts", label: "Grid Layouts" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic variants specification
  const variantsSpec: UISpecification = {
    type: "Group",
    spacing: "6",
    children: [
      {
        type: "FeatureCard",
        title: "Default Variant",
        description: "Standard card styling with border, background, and shadow.",
        variant: "default",
      },
      {
        type: "FeatureCard",
        title: "Highlighted Variant",
        description: "Enhanced styling with gradient background and larger shadow.",
        variant: "highlighted",
      },
      {
        type: "FeatureCard",
        title: "Minimal Variant",
        description: "Clean design with no border or background.",
        variant: "minimal",
      },
      {
        type: "FeatureCard",
        title: "Bordered Variant",
        description: "Emphasized border with semi-transparent background.",
        variant: "bordered",
      },
    ],
  };

  // Orientation examples
  const orientationsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Stack",
        spacing: "3",
        children: [
          {
            type: "Text",
            className: "text-lg font-medium",
            children: "Vertical Layout (Default)",
          },
          {
            type: "FeatureCard",
            title: "Lightning Fast Performance",
            description: "Experience blazing fast performance with our optimized architecture and advanced caching mechanisms.",
            orientation: "vertical",
            className: "max-w-sm",
          },
        ],
      },
      {
        type: "Stack",
        spacing: "3",
        children: [
          {
            type: "Text",
            className: "text-lg font-medium",
            children: "Horizontal Layout",
          },
          {
            type: "FeatureCard",
            title: "Real-time Collaboration",
            description: "Work together seamlessly with your team in real-time.",
            orientation: "horizontal",
            className: "max-w-2xl",
          },
        ],
      },
    ],
  };

  // Alignment examples
  const alignmentsSpec: UISpecification = {
    type: "Grid",
    columns: "1",
    gap: "6",
    className: "md:grid-cols-3",
    children: [
      {
        type: "FeatureCard",
        title: "Left Aligned",
        description: "Content aligned to the left side.",
        align: "left",
        variant: "bordered",
      },
      {
        type: "FeatureCard",
        title: "Center Aligned",
        description: "Content centered for balanced presentation.",
        align: "center",
        variant: "bordered",
      },
      {
        type: "FeatureCard",
        title: "Right Aligned",
        description: "Content aligned to the right side.",
        align: "right",
        variant: "bordered",
      },
    ],
  };

  // Badge examples
  const badgesSpec: UISpecification = {
    type: "Grid",
    columns: "1",
    gap: "4",
    className: "md:grid-cols-2",
    children: [
      {
        type: "FeatureCard",
        title: "Popular Feature",
        description: "Most requested feature by our users.",
        badge: "Popular",
        badgeVariant: "default",
      },
      {
        type: "FeatureCard",
        title: "New Release",
        description: "Fresh features just launched.",
        badge: "New",
        badgeVariant: "secondary",
      },
      {
        type: "FeatureCard",
        title: "Enterprise Only",
        description: "Advanced capabilities for enterprise customers.",
        badge: "Pro",
        badgeVariant: "outline",
      },
      {
        type: "FeatureCard",
        title: "Beta Feature",
        description: "Early access to experimental functionality.",
        badge: "Beta",
        badgeVariant: "destructive",
      },
    ],
  };

  // Highlighting examples
  const highlightingSpec: UISpecification = {
    type: "Grid",
    columns: "1",
    gap: "6",
    className: "md:grid-cols-3",
    children: [
      {
        type: "FeatureCard",
        title: "Standard",
        description: "Regular feature without highlighting.",
        variant: "default",
      },
      {
        type: "FeatureCard",
        title: "Highlighted",
        description: "Featured option with custom highlight.",
        variant: "highlighted",
        highlight: true,
        highlightColor: "#3b82f6",
        badge: "Recommended",
      },
      {
        type: "FeatureCard",
        title: "Premium",
        description: "Top-tier option with premium styling.",
        variant: "highlighted",
        highlight: true,
        highlightColor: "#8b5cf6",
        badge: "Premium",
      },
    ],
  };

  // Interactive examples (simulated)
  const interactiveSpec: UISpecification = {
    type: "Grid",
    columns: "1",
    gap: "4",
    className: "md:grid-cols-2",
    children: [
      {
        type: "FeatureCard",
        title: "Clickable Card",
        description: "This card can handle click events for navigation or actions.",
        variant: "default",
        className: "cursor-pointer hover:shadow-lg transition-shadow",
      },
      {
        type: "FeatureCard",
        title: "Link Card",
        description: "Cards can also function as navigation links to other pages.",
        variant: "outlined",
        className: "cursor-pointer hover:shadow-lg transition-shadow",
      },
    ],
  };

  // Grid layout example
  const gridLayoutSpec: UISpecification = {
    type: "Grid",
    columns: "1",
    gap: "6",
    className: "md:grid-cols-2 lg:grid-cols-3",
    children: [
      {
        type: "FeatureCard",
        title: "Fast Performance",
        description: "Lightning-fast loading and response times.",
        badge: "Core",
      },
      {
        type: "FeatureCard",
        title: "Secure by Default",
        description: "Enterprise-grade security built into every component.",
        badge: "Security",
        badgeVariant: "secondary",
      },
      {
        type: "FeatureCard",
        title: "Scalable Architecture",
        description: "Designed to grow with your application needs.",
        badge: "Performance",
        badgeVariant: "outline",
      },
      {
        type: "FeatureCard",
        title: "Developer Experience",
        description: "Intuitive APIs and comprehensive documentation.",
        variant: "highlighted",
        highlight: true,
        badge: "DX",
      },
      {
        type: "FeatureCard",
        title: "Mobile Responsive",
        description: "Perfect display across all device sizes.",
        variant: "bordered",
      },
      {
        type: "FeatureCard",
        title: "Customizable",
        description: "Extensive theming and styling options.",
        variant: "minimal",
      },
    ],
  };

  // Pricing comparison example
  const pricingComparisonSpec: UISpecification = {
    type: "Grid",
    columns: "1",
    gap: "6",
    className: "md:grid-cols-3",
    children: [
      {
        type: "FeatureCard",
        title: "Starter",
        description: "Perfect for small projects and prototypes.",
        variant: "default",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Text",
                className: "text-3xl font-bold",
                children: "Free",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    size: "small",
                    children: "• Up to 3 projects",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Community support",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Basic components",
                  },
                ],
              },
              {
                type: "Button",
                variant: "outline",
                children: "Get Started",
                className: "w-full",
              },
            ],
          },
        ],
      },
      {
        type: "FeatureCard",
        title: "Professional",
        description: "Ideal for growing teams and businesses.",
        variant: "highlighted",
        highlight: true,
        highlightColor: "#3b82f6",
        badge: "Popular",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Flex",
                align: "baseline",
                gap: "2",
                children: [
                  {
                    type: "Text",
                    className: "text-3xl font-bold",
                    children: "$29",
                  },
                  {
                    type: "Text",
                    size: "small",
                    variant: "muted",
                    children: "/month",
                  },
                ],
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    size: "small",
                    children: "• Unlimited projects",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Priority support",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Advanced components",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Custom themes",
                  },
                ],
              },
              {
                type: "Button",
                variant: "primary",
                children: "Upgrade Now",
                className: "w-full",
              },
            ],
          },
        ],
      },
      {
        type: "FeatureCard",
        title: "Enterprise",
        description: "Advanced features for large organizations.",
        variant: "default",
        children: [
          {
            type: "Stack",
            spacing: "4",
            children: [
              {
                type: "Text",
                className: "text-3xl font-bold",
                children: "Custom",
              },
              {
                type: "Stack",
                spacing: "2",
                children: [
                  {
                    type: "Text",
                    size: "small",
                    children: "• Everything in Pro",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Dedicated support",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• Custom integrations",
                  },
                  {
                    type: "Text",
                    size: "small",
                    children: "• SLA guarantee",
                  },
                ],
              },
              {
                type: "Button",
                variant: "outline",
                children: "Contact Sales",
                className: "w-full",
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">FeatureCard Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A versatile card component designed to showcase features, benefits, or key information. Perfect for marketing pages, feature lists, and product showcases with support for multiple variants, orientations, and interactive states.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The FeatureCard component is a specialized card designed to highlight features, capabilities, or key selling points. It provides a clean, professional layout with support for icons, badges, and various styling options.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Four visual variants (default, highlighted, minimal, bordered)</li>
                <li>Flexible layout orientations (vertical, horizontal)</li>
                <li>Content alignment options (left, center, right)</li>
                <li>Badge support with multiple variants</li>
                <li>Highlighting and custom color options</li>
                <li>Interactive capabilities with click handlers and links</li>
                <li>Support for custom content and child elements</li>
                <li>Fully accessible with proper ARIA attributes</li>
              </ul>
            </div>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Card Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from four visual variants to match your design needs and hierarchy.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(variantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(variantsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Orientations Section */}
          <section id="orientations" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Layout Orientations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              FeatureCards support both vertical and horizontal layouts to fit different design contexts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(orientationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(orientationsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Alignments Section */}
          <section id="alignments" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Content Alignment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the alignment of content within the card for optimal visual balance.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignmentsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Badges Section */}
          <section id="badges" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Badges</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add badges to highlight special attributes, status, or categories.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(badgesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(badgesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Highlighting Section */}
          <section id="highlighting" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Highlighting</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Emphasize important cards with highlighting and custom colors.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(highlightingSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(highlightingSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Interactive Section */}
          <section id="interactive" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Interactive Cards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Make cards interactive with click handlers or navigation links.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(interactiveSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(interactiveSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Grid Layouts Section */}
          <section id="grid-layouts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Grid Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organize multiple feature cards in responsive grid layouts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(gridLayoutSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(gridLayoutSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">&quot;FeatureCard&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">The feature title</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Feature description text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">"default" | &quot;highlighted&quot; | &quot;minimal&quot; | &quot;bordered&quot;</td>
                    <td className="py-3 px-4">&quot;default&quot;</td>
                    <td className="py-3 px-4">Visual style variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">orientation</td>
                    <td className="py-3 px-4 font-mono">"vertical" | &quot;horizontal&quot;</td>
                    <td className="py-3 px-4">&quot;vertical&quot;</td>
                    <td className="py-3 px-4">Layout orientation</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                    <td className="py-3 px-4 font-mono">&quot;left&quot; | &quot;center&quot; | &quot;right&quot;</td>
                    <td className="py-3 px-4">&quot;left&quot;</td>
                    <td className="py-3 px-4">Content alignment</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">badge</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Badge text to display</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">badgeVariant</td>
                    <td className="py-3 px-4 font-mono">"default" | &quot;secondary&quot; | &quot;destructive&quot; | &quot;outline&quot;</td>
                    <td className="py-3 px-4">&quot;secondary&quot;</td>
                    <td className="py-3 px-4">Badge style variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">highlight</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Whether to highlight the card</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">highlightColor</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;hsl(var(--primary))&quot;</td>
                    <td className="py-3 px-4">Custom highlight color</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Icon name or reference</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">iconColor</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;currentColor&quot;</td>
                    <td className="py-3 px-4">Color for the icon</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">link</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">URL to navigate to when clicked</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onClick</td>
                    <td className="py-3 px-4 font-mono">ActionSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Click event handler</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec[]</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Nested child components</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how FeatureCards work in real-world scenarios.
            </p>
            
            <div className="space-y-8">
              {/* Pricing Comparison Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Pricing Comparison</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(pricingComparisonSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(pricingComparisonSpec, null, 2)}
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