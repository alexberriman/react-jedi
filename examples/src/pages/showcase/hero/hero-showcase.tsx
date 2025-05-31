import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../components/ui/code-block";

export function HeroShowcase() {
  usePageMetadata({
    title: "Hero Component",
    description:
      "A comprehensive showcase of the React Jedi Hero component with all variants, backgrounds, and usage examples for landing pages and hero sections.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Hero Variants" },
    { id: "backgrounds", label: "Background Options" },
    { id: "animations", label: "Animation Features" },
    { id: "actions", label: "Call-to-Action Buttons" },
    { id: "content", label: "Content Layout" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Hero variants specification
  const variantsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Hero",
        variant: "centered",
        title: "Centered Hero Layout",
        subtitle: "Default Variant",
        description: "Perfect for landing pages with centered content and strong visual impact.",
        primaryAction: {
          text: "Get Started",
          variant: "default",
        },
        secondaryAction: {
          text: "Learn More",
          variant: "outline",
        },
        className: "min-h-[400px]",
      },
      {
        type: "Hero",
        variant: "left-aligned",
        title: "Left-Aligned Hero",
        subtitle: "Content Focus",
        description: "Ideal for content-heavy pages where you want to maximize text readability.",
        primaryAction: {
          text: "Start Building",
          variant: "primary",
        },
        secondaryAction: {
          text: "View Docs",
          variant: "ghost",
        },
        className: "min-h-[400px]",
      },
      {
        type: "Hero",
        variant: "split",
        title: "Split Layout Hero",
        subtitle: "Media & Content",
        description: "Combines content with visual elements in a balanced two-column layout.",
        primaryAction: {
          text: "Try Demo",
          variant: "default",
        },
        children: [
          {
            type: "Box",
            className: "relative w-full aspect-video rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-blue-500 to-purple-600",
            children: [
              {
                type: "Flex",
                justify: "center",
                align: "center",
                className: "h-full text-white text-2xl font-bold",
                children: "Demo Content",
              },
            ],
          },
        ],
        className: "min-h-[400px]",
      },
    ],
  };

  // Background options specification
  const backgroundsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Hero",
        title: "Gradient Background",
        subtitle: "Visual Appeal",
        description: "Custom gradient backgrounds for modern, eye-catching designs.",
        backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        primaryAction: {
          text: "Explore",
          variant: "secondary",
        },
        className: "min-h-[300px] text-white",
      },
      {
        type: "Hero",
        title: "Image Background",
        subtitle: "Professional Look",
        description: "High-quality background images with overlay support for readability.",
        backgroundImage: "https://placehold.co/1920x1080/EEE/31343C",
        backgroundOverlay: true,
        primaryAction: {
          text: "Learn More",
          variant: "default",
        },
        className: "min-h-[300px] text-white",
      },
      {
        type: "Hero",
        title: "Clean & Minimal",
        subtitle: "Default Style",
        description: "Clean background with subtle animated gradient for professional appearance.",
        animated: true,
        primaryAction: {
          text: "Get Started",
          variant: "primary",
        },
        className: "min-h-[300px]",
      },
    ],
  };

  // Animation features specification
  const animationsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Hero",
        title: "Animated Hero",
        subtitle: "Motion Design",
        description: "Smooth animations enhance user experience with fade-ins and gradient effects.",
        animated: true,
        floatingShapes: true,
        primaryAction: {
          text: "See Animation",
          variant: "default",
        },
        className: "min-h-[350px]",
      },
      {
        type: "Text",
        size: "small",
        variant: "muted",
        children: "Animations include fade-in effects, floating shapes, and interactive elements.",
      },
    ],
  };

  // Call-to-action buttons specification
  const actionsSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Hero",
        title: "Single Action Hero",
        subtitle: "Focus",
        description: "Drive users toward a single, primary action for maximum conversion.",
        primaryAction: {
          text: "Primary Action",
          variant: "default",
        },
        className: "min-h-[250px]",
      },
      {
        type: "Hero",
        title: "Dual Action Hero",
        subtitle: "Choice",
        description: "Provide options with primary and secondary actions for different user needs.",
        primaryAction: {
          text: "Primary Action",
          variant: "primary",
        },
        secondaryAction: {
          text: "Secondary Action",
          variant: "outline",
        },
        className: "min-h-[250px]",
      },
      {
        type: "Hero",
        title: "Custom Button Variants",
        subtitle: "Flexibility",
        description: "Use different button variants to match your design system and brand.",
        primaryAction: {
          text: "Destructive Action",
          variant: "destructive",
        },
        secondaryAction: {
          text: "Ghost Action",
          variant: "ghost",
        },
        className: "min-h-[250px]",
      },
    ],
  };

  // Content layout specification
  const contentSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Hero",
        title: "Title Only",
        className: "min-h-[200px]",
      },
      {
        type: "Hero",
        title: "Title with Subtitle",
        subtitle: "Supporting Text",
        className: "min-h-[200px]",
      },
      {
        type: "Hero",
        title: "Complete Content",
        subtitle: "Full Feature Set",
        description: "Title, subtitle, description, and action buttons provide complete flexibility for your hero sections.",
        primaryAction: {
          text: "Action Button",
          variant: "default",
        },
        className: "min-h-[250px]",
      },
    ],
  };

  // Marketing landing example
  const marketingExampleSpec: UISpecification = {
    type: "Hero",
    variant: "centered",
    title: "Build the Future of Web Development",
    subtitle: "React Jedi",
    description: "Create stunning, accessible applications with our server-driven UI library. Deploy faster, maintain easier, and scale infinitely with JSON-powered components.",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    animated: true,
    floatingShapes: true,
    primaryAction: {
      text: "Start Building Free",
      variant: "secondary",
    },
    secondaryAction: {
      text: "View Live Demo",
      variant: "outline",
    },
    className: "min-h-[500px] text-white",
  };

  // Product showcase example
  const productExampleSpec: UISpecification = {
    type: "Hero",
    variant: "split",
    title: "See React Jedi in Action",
    subtitle: "Live Demo",
    description: "Watch how JSON specifications transform into beautiful, functional components. Experience the power of server-driven UI development firsthand.",
    primaryAction: {
      text: "Try Interactive Demo",
      variant: "primary",
    },
    secondaryAction: {
      text: "Read Documentation",
      variant: "ghost",
    },
    children: [
      {
        type: "Card",
        className: "w-full",
        children: [
          {
            type: "CardHeader",
            children: [
              {
                type: "CardTitle",
                children: "JSON → Component",
              },
              {
                type: "CardDescription",
                children: "Live transformation demo",
              },
            ],
          },
          {
            type: "CardContent",
            children: {
              type: "Box",
              className: "bg-gray-100 dark:bg-gray-800 p-4 rounded border-2 border-dashed border-gray-300 dark:border-gray-600",
              children: [
                {
                  type: "Text",
                  className: "font-mono text-sm text-green-600 dark:text-green-400",
                  children: '{ "type": "Button", "children": "Click me!" }',
                },
                {
                  type: "Text",
                  className: "text-center text-gray-500 my-2",
                  children: "↓",
                },
                {
                  type: "Button",
                  children: "Click me!",
                  variant: "outline",
                },
              ],
            },
          },
        ],
      },
    ],
    className: "min-h-[400px]",
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hero Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create stunning hero sections for landing pages, product showcases, and marketing content. Features multiple layouts, background options, and animation support.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Hero component is designed for creating impactful first impressions on landing pages, product showcases, and marketing content. It supports multiple layout variants, background options, and interactive elements to engage users effectively.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Three layout variants: centered, left-aligned, and split</li>
                <li>Multiple background options: gradients, images, videos, and custom styles</li>
                <li>Built-in animation support with floating shapes and parallax effects</li>
                <li>Flexible action buttons with customizable variants</li>
                <li>Responsive design that works on all screen sizes</li>
                <li>Accessibility-first approach with proper heading hierarchy</li>
                <li>Support for custom content through children prop</li>
              </ul>
            </div>
          </section>

          {/* Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Hero Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from three layout variants to match your content strategy and design requirements.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(variantsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(variantsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Backgrounds Section */}
          <section id="backgrounds" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Background Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enhance your hero sections with gradients, images, videos, or custom backgrounds.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(backgroundsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(backgroundsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Animations Section */}
          <section id="animations" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Animation Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add motion and interactivity to enhance user engagement and visual appeal.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(animationsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(animationsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Actions Section */}
          <section id="actions" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Call-to-Action Buttons</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Guide users with primary and secondary actions using customizable button variants.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(actionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(actionsSpec, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Content Section */}
          <section id="content" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Content Layout</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Flexible content structure supports different combinations of title, subtitle, and description.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(contentSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(contentSpec, null, 2)}
              </CodeBlock>
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
                    <td className="py-3 px-4 font-mono">&quot;Hero&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">&quot;Hero Title&quot;</td>
                    <td className="py-3 px-4">Main heading text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">subtitle</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Secondary heading above the title</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Descriptive text below the title</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td className="py-3 px-4 font-mono">&quot;centered&quot; | &quot;left-aligned&quot; | &quot;split&quot;</td>
                    <td className="py-3 px-4">&quot;centered&quot;</td>
                    <td className="py-3 px-4">Layout variant</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">primaryAction</td>
                    <td className="py-3 px-4 font-mono">ActionButton</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Primary call-to-action button</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">secondaryAction</td>
                    <td className="py-3 px-4 font-mono">ActionButton</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Secondary call-to-action button</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">backgroundImage</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Background image URL</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">backgroundVideo</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Background video URL</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">backgroundGradient</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">CSS gradient background</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">backgroundOverlay</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Add dark overlay for readability</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">animated</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">true</td>
                    <td className="py-3 px-4">Enable animations and transitions</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">floatingShapes</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Add floating decorative shapes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">parallax</td>
                    <td className="py-3 px-4 font-mono">boolean</td>
                    <td className="py-3 px-4">false</td>
                    <td className="py-3 px-4">Enable parallax effect for backgrounds</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 font-mono">ComponentSpec</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Custom content (used with split variant)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world examples showing how to use Hero components in different contexts.
            </p>
            
            <div className="space-y-8">
              {/* Marketing Landing Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Marketing Landing Page</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(marketingExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(marketingExampleSpec, null, 2)}
              </CodeBlock>
                </details>
              </div>

              {/* Product Showcase Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">Product Showcase</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(productExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <CodeBlock language="json" className="mt-2">
                {JSON.stringify(productExampleSpec, null, 2)}
              </CodeBlock>
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