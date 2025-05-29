import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function CallToActionShowcase() {
  usePageMetadata({
    title: "CallToAction Component",
    description:
      "A comprehensive showcase of the React Jedi CallToAction component with all variants, sizes, alignments, and usage examples.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "CTA Variants" },
    { id: "sizes", label: "CTA Sizes" },
    { id: "alignments", label: "Alignment Options" },
    { id: "with-actions", label: "Action Buttons" },
    { id: "with-images", label: "Background Images" },
    { id: "decorative", label: "Decorative Elements" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // CTA variants specification
  const variantsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "CallToAction",
        title: "Default Variant",
        description: "This is the default call-to-action style with clean, minimal design.",
        variant: "default",
        primaryAction: {
          label: "Get Started",
        },
      },
      {
        type: "CallToAction",
        title: "Primary Variant",
        description: "Eye-catching primary style perfect for main conversion points.",
        variant: "primary",
        primaryAction: {
          label: "Start Free Trial",
        },
      },
      {
        type: "CallToAction",
        title: "Secondary Variant",
        description: "Subtle secondary style for less prominent CTAs.",
        variant: "secondary",
        primaryAction: {
          label: "Learn More",
        },
      },
      {
        type: "CallToAction",
        title: "Gradient Variant",
        description: "Beautiful gradient background for maximum visual impact.",
        variant: "gradient",
        primaryAction: {
          label: "Join Now",
        },
      },
      {
        type: "CallToAction",
        title: "Dark Variant",
        description: "Dark themed CTA for light backgrounds.",
        variant: "dark",
        primaryAction: {
          label: "Explore Features",
        },
      },
      {
        type: "CallToAction",
        title: "Light Variant",
        description: "Light themed CTA for dark backgrounds.",
        variant: "light",
        primaryAction: {
          label: "View Demo",
        },
      },
    ],
  };

  // CTA sizes specification
  const sizesSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "CallToAction",
        title: "Small Size CTA",
        description: "Compact size for sidebar or inline placements.",
        size: "sm",
        variant: "primary",
        primaryAction: {
          label: "Sign Up",
        },
      },
      {
        type: "CallToAction",
        title: "Default Size CTA",
        description: "Standard size suitable for most use cases.",
        size: "default",
        variant: "primary",
        primaryAction: {
          label: "Sign Up",
        },
      },
      {
        type: "CallToAction",
        title: "Large Size CTA",
        description: "Large size for hero sections and landing pages.",
        size: "lg",
        variant: "primary",
        primaryAction: {
          label: "Sign Up",
        },
      },
    ],
  };

  // Alignment options
  const alignmentSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "CallToAction",
        title: "Left Aligned",
        description: "Content aligned to the left side.",
        align: "left",
        variant: "default",
        primaryAction: {
          label: "Get Started",
        },
      },
      {
        type: "CallToAction",
        title: "Center Aligned",
        description: "Content centered for balanced appearance.",
        align: "center",
        variant: "default",
        primaryAction: {
          label: "Get Started",
        },
      },
      {
        type: "CallToAction",
        title: "Right Aligned",
        description: "Content aligned to the right side.",
        align: "right",
        variant: "default",
        primaryAction: {
          label: "Get Started",
        },
      },
    ],
  };

  // With action buttons
  const actionsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "CallToAction",
        title: "Single Action",
        description: "Simple CTA with one primary action button.",
        variant: "gradient",
        primaryAction: {
          label: "Start Now",
        },
      },
      {
        type: "CallToAction",
        title: "Dual Actions",
        description: "CTA with both primary and secondary actions for more options.",
        variant: "gradient",
        primaryAction: {
          label: "Start Free Trial",
        },
        secondaryAction: {
          label: "Watch Demo",
        },
      },
      {
        type: "CallToAction",
        title: "With Arrow",
        description: "Primary action with an arrow indicator.",
        variant: "primary",
        primaryAction: {
          label: "Get Started",
        },
        showArrow: true,
      },
      {
        type: "CallToAction",
        title: "Without Arrow",
        description: "Clean button without arrow indicator.",
        variant: "primary",
        primaryAction: {
          label: "Get Started",
        },
        showArrow: false,
      },
    ],
  };

  // With background images
  const imageSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "CallToAction",
        title: "Transform Your Business Today",
        description: "Join thousands of companies already using our platform.",
        variant: "dark",
        backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
        overlay: true,
        primaryAction: {
          label: "Start Free Trial",
        },
        secondaryAction: {
          label: "Book a Demo",
        },
      },
      {
        type: "CallToAction",
        title: "Build Something Amazing",
        description: "Everything you need to create your next big project.",
        variant: "light",
        backgroundImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200",
        overlay: false,
        primaryAction: {
          label: "Get Started",
        },
      },
    ],
  };

  // Decorative elements
  const decorativeSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "CallToAction",
        title: "With Decorative Elements",
        description: "Beautiful background patterns and shapes for visual interest.",
        variant: "gradient",
        decorative: true,
        primaryAction: {
          label: "Explore Now",
        },
      },
      {
        type: "CallToAction",
        title: "Without Decorative Elements",
        description: "Clean and minimal without extra visual elements.",
        variant: "gradient",
        decorative: false,
        primaryAction: {
          label: "Explore Now",
        },
      },
      {
        type: "CallToAction",
        title: "With Icon",
        description: "Add an icon to make your CTA more recognizable.",
        variant: "primary",
        icon: "🚀",
        primaryAction: {
          label: "Launch Your Project",
        },
      },
    ],
  };

  // Complete examples
  const heroExampleSpec: UISpecification = {
    type: "Box",
    className: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-12 rounded-2xl",
    children: {
      type: "CallToAction",
      title: "Ready to Transform Your Workflow?",
      description: "Join over 10,000 teams who are already building amazing products with React Jedi. Start your free trial today and see the difference.",
      variant: "gradient",
      size: "lg",
      decorative: true,
      icon: "✨",
      primaryAction: {
        label: "Start Your Free Trial",
      },
      secondaryAction: {
        label: "Schedule a Demo",
      },
    },
  };

  const newsletterExampleSpec: UISpecification = {
    type: "Card",
    className: "max-w-2xl mx-auto",
    children: [
      {
        type: "CardContent",
        className: "p-0",
        children: {
          type: "CallToAction",
          title: "Stay Updated",
          description: "Get the latest updates, tutorials, and best practices delivered to your inbox.",
          variant: "secondary",
          align: "center",
          size: "sm",
          icon: "📬",
          primaryAction: {
            label: "Subscribe to Newsletter",
          },
        },
      },
    ],
  };

  const featureExampleSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "SimpleGrid",
        columns: 3,
        spacing: "6",
        children: [
          {
            type: "Card",
            children: [
              {
                type: "CardHeader",
                children: [
                  {
                    type: "Text",
                    className: "text-3xl mb-2",
                    children: "⚡",
                  },
                  {
                    type: "CardTitle",
                    children: "Lightning Fast",
                  },
                ],
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  variant: "muted",
                  children: "Build and deploy in minutes, not hours.",
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
                  {
                    type: "Text",
                    className: "text-3xl mb-2",
                    children: "🎨",
                  },
                  {
                    type: "CardTitle",
                    children: "Beautiful Design",
                  },
                ],
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  variant: "muted",
                  children: "Stunning components out of the box.",
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
                  {
                    type: "Text",
                    className: "text-3xl mb-2",
                    children: "🔧",
                  },
                  {
                    type: "CardTitle",
                    children: "Fully Customizable",
                  },
                ],
              },
              {
                type: "CardContent",
                children: {
                  type: "Text",
                  variant: "muted",
                  children: "Adapt every component to your needs.",
                },
              },
            ],
          },
        ],
      },
      {
        type: "CallToAction",
        title: "Experience the Power of React Jedi",
        description: "Everything you need to build modern web applications with ease.",
        variant: "primary",
        size: "lg",
        primaryAction: {
          label: "Get Started for Free",
        },
        secondaryAction: {
          label: "View Documentation",
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">CallToAction Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A powerful call-to-action component designed to drive user engagement and conversions. Perfect for hero sections, feature highlights, and conversion points throughout your application.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The CallToAction component is designed to grab user attention and encourage specific actions. It combines compelling copy, visual appeal, and clear action buttons to maximize conversion rates.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Six visual variants (default, primary, secondary, gradient, dark, light)</li>
                <li>Three size options (small, default, large)</li>
                <li>Flexible alignment (left, center, right)</li>
                <li>Support for primary and secondary actions</li>
                <li>Background image support with overlay options</li>
                <li>Decorative elements and animations</li>
                <li>Icon support for visual enhancement</li>
                <li>Fully responsive and accessible</li>
              </ul>
            </div>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">CTA Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from six different variants to match your design needs and importance levels.
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

          {/* Sizes Section */}
          <section id="sizes" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">CTA Sizes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Three size options to fit different contexts and importance levels.
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

          {/* Alignment Section */}
          <section id="alignments" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Alignment Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Control the text alignment within your call-to-action sections.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(alignmentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(alignmentSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Action Buttons Section */}
          <section id="with-actions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Action Buttons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure primary and secondary actions to guide users effectively.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(actionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(actionsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Background Images Section */}
          <section id="with-images" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Background Images</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add visual impact with background images and overlay options.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(imageSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(imageSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Decorative Elements Section */}
          <section id="decorative" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Decorative Elements</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance visual appeal with decorative elements and icons.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(decorativeSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(decorativeSpec, null, 2)}
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
                    <td className="py-3 px-4 font-mono">"CallToAction"</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Main heading text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Supporting description text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">"default" | "primary" | "secondary" | "gradient" | "dark" | "light"</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Visual style variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                    <td className="py-3 px-4 font-mono">"sm" | "default" | "lg"</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Component size</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">align</td>
                    <td className="py-3 px-4 font-mono">"left" | "center" | "right"</td>
                    <td className="py-3 px-4">"center"</td>
                    <td className="py-3 px-4">Text alignment</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">primaryAction</td>
                    <td className="py-3 px-4 font-mono">{`{ label: string, href?: string, onClick?: ActionSpec }`}</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Primary action button configuration</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">secondaryAction</td>
                    <td className="py-3 px-4 font-mono">{`{ label: string, href?: string, onClick?: ActionSpec }`}</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Secondary action button configuration</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">backgroundImage</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">URL for background image</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">overlay</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show overlay on background image</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">icon</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Icon to display above title</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showArrow</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show arrow in primary button</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">decorative</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Show decorative elements</td>
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
              Real-world examples showing CallToAction components in context.
            </p>
            
            <div className="space-y-8">
              {/* Hero Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Hero Section CTA</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(heroExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(heroExampleSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Newsletter Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Newsletter Signup</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(newsletterExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(newsletterExampleSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Feature Section Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Feature Section with CTA</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(featureExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(featureExampleSpec, null, 2)}
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