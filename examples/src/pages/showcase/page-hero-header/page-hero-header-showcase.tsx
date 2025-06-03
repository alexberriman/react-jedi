import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { ShowcaseWrapper } from "@/components/ui/showcase-wrapper";

export function PageHeroHeaderShowcase() {
  usePageMetadata({
    title: "Page Hero Header Block",
    description:
      "A flexible hero header component for marketing pages with multiple variants, CTA options, and layout configurations.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "centered", label: "Centered Variant" },
    { id: "split", label: "Split Layout" },
    { id: "fullscreen", label: "Fullscreen Hero" },
    { id: "minimal", label: "Minimal Style" },
    { id: "with-stats", label: "With Statistics" },
    { id: "background-image", label: "Background Images" },
    { id: "cta-options", label: "CTA Options" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Centered hero specification
  const centeredSpec: UISpecification = {
    type: "PageHeroHeader",
    variant: "centered",
    title: "Build Amazing Products Faster",
    subtitle: "The modern way to create exceptional user experiences",
    description: "Our platform provides everything you need to design, develop, and deploy beautiful applications at scale.",
    primaryCTA: {
      label: "Get Started Free",
      variant: "default",
      size: "lg",
      icon: "arrow",
    },
    secondaryCTA: {
      label: "Watch Demo",
      variant: "outline",
      size: "lg",
      icon: "play",
    },
    badges: [
      { text: "New", variant: "default" },
      { text: "v2.0 Released", variant: "secondary" },
    ],
  };

  // Split layout specification
  const splitSpec: UISpecification = {
    type: "PageHeroHeader",
    variant: "split",
    title: "Welcome to the Future of Development",
    description: "Experience a new way of building applications with our cutting-edge tools.",
    primaryCTA: {
      label: "Start Building",
      variant: "default",
      size: "lg",
    },
    secondaryCTA: {
      label: "Learn More",
      variant: "ghost",
      size: "lg",
    },
    image: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      alt: "Dashboard preview",
      position: "right",
    },
  };

  // Fullscreen hero specification
  const fullscreenSpec: UISpecification = {
    type: "PageHeroHeader",
    variant: "fullscreen",
    title: "Unleash Your Creativity",
    subtitle: "Design without limits",
    description: "Join a community of creators building the next generation of digital experiences.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
      size: "lg",
    },
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80",
      overlay: "gradient",
      overlayOpacity: 0.6,
    },
    height: "full",
    alignment: "center",
  };

  // Minimal style specification
  const minimalSpec: UISpecification = {
    type: "PageHeroHeader",
    variant: "minimal",
    title: "Simple. Powerful. Yours.",
    description: "Everything you need to succeed, nothing you don't.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
    },
    alignment: "center",
    spacing: "tight",
  };

  // With statistics specification
  const statsSpec: UISpecification = {
    type: "PageHeroHeader",
    variant: "centered",
    title: "Trusted by Teams Worldwide",
    description: "Join thousands of companies using our platform to build better products faster.",
    primaryCTA: {
      label: "Start Free Trial",
      variant: "default",
      size: "lg",
    },
    stats: [
      { value: "10K+", label: "Active Users" },
      { value: "50M+", label: "API Requests" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Support" },
    ],
  };

  // Background variations
  const backgroundVariations: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "PageHeroHeader",
        variant: "centered",
        title: "Gradient Background",
        subtitle: "Stand out with colors",
        primaryCTA: {
          label: "Get Started",
          variant: "secondary",
        },
        backgroundColor: "bg-gradient-to-br from-purple-600 to-blue-600",
        textColor: "white",
        height: "medium",
      },
      {
        type: "PageHeroHeader",
        variant: "centered",
        title: "Dark Background",
        subtitle: "Professional and sleek",
        primaryCTA: {
          label: "Learn More",
          variant: "outline",
        },
        backgroundColor: "bg-gray-900",
        textColor: "white",
        height: "medium",
      },
    ],
  };

  // CTA variations
  const ctaVariations: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "PageHeroHeader",
        variant: "left-aligned",
        title: "Multiple CTAs",
        description: "Provide multiple actions for different user intents.",
        primaryCTA: {
          label: "Primary Action",
          variant: "default",
        },
        secondaryCTA: {
          label: "Secondary Action",
          variant: "outline",
        },
        tertiaryLink: {
          label: "Learn more about features →",
          href: "#features",
        },
      },
      {
        type: "PageHeroHeader",
        variant: "centered",
        title: "Icon CTAs",
        description: "Add visual hints with icons.",
        primaryCTA: {
          label: "Play Video",
          variant: "default",
          icon: "play",
        },
        secondaryCTA: {
          label: "Next Steps",
          variant: "ghost",
          icon: "chevron",
        },
      },
    ],
  };

  // Complete marketing example
  const marketingExample: UISpecification = {
    type: "PageHeroHeader",
    variant: "split",
    title: "Transform Your Business Today",
    subtitle: "Enterprise-grade solutions for modern teams",
    description: "Streamline workflows, enhance collaboration, and drive growth with our comprehensive suite of tools.",
    primaryCTA: {
      label: "Request Demo",
      variant: "default",
      size: "lg",
    },
    secondaryCTA: {
      label: "Contact Sales",
      variant: "outline",
      size: "lg",
    },
    badges: [
      { text: "SOC 2 Certified", variant: "outline" },
      { text: "99.9% Uptime", variant: "outline" },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      alt: "Analytics dashboard",
      position: "right",
    },
    stats: [
      { value: "500+", label: "Enterprise Clients" },
      { value: "$2.5B", label: "Processed Annually" },
      { value: "150+", label: "Countries" },
    ],
  };

  const propsData = [
    {
      prop: "variant",
      type: "'centered' | 'split' | 'fullscreen' | 'minimal' | 'left-aligned' | 'right-aligned' | 'multi-column'",
      default: "'centered'",
      description: "Layout variant of the hero header",
    },
    {
      prop: "title",
      type: "string",
      required: true,
      description: "Main heading text",
    },
    {
      prop: "titleLevel",
      type: "'h1' | 'h2' | 'h3'",
      default: "'h1'",
      description: "HTML heading element to use",
    },
    {
      prop: "subtitle",
      type: "string",
      description: "Secondary heading text",
    },
    {
      prop: "description",
      type: "string",
      description: "Descriptive paragraph text",
    },
    {
      prop: "primaryCTA",
      type: "PageHeroHeaderCTAProperties",
      description: "Primary call-to-action button configuration",
    },
    {
      prop: "secondaryCTA",
      type: "PageHeroHeaderCTAProperties",
      description: "Secondary call-to-action button configuration",
    },
    {
      prop: "tertiaryLink",
      type: "{ label: string; href: string }",
      description: "Tertiary text link",
    },
    {
      prop: "badges",
      type: "Array<{ text: string; variant?: BadgeVariant }>",
      description: "Badge elements to display above the title",
    },
    {
      prop: "stats",
      type: "Array<{ value: string; label: string }>",
      description: "Statistics to display below the content",
    },
    {
      prop: "image",
      type: "{ src: string; alt: string; position?: 'right' | 'left' | 'background' | 'bottom'; objectFit?: string }",
      description: "Image configuration for split layouts",
    },
    {
      prop: "backgroundImage",
      type: "{ src: string; overlay?: 'dark' | 'light' | 'gradient' | 'none'; overlayOpacity?: number }",
      description: "Background image configuration",
    },
    {
      prop: "height",
      type: "'full' | 'large' | 'medium' | 'auto'",
      default: "'large'",
      description: "Height of the hero section",
    },
    {
      prop: "alignment",
      type: "'left' | 'center' | 'right'",
      default: "variant-dependent",
      description: "Text alignment within the hero",
    },
    {
      prop: "spacing",
      type: "'tight' | 'normal' | 'loose'",
      default: "'normal'",
      description: "Vertical padding of the section",
    },
    {
      prop: "backgroundColor",
      type: "string",
      description: "Background color CSS class",
    },
    {
      prop: "textColor",
      type: "string",
      description: "Text color CSS value",
    },
    {
      prop: "animated",
      type: "boolean",
      default: "true",
      description: "Enable entrance animations",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link
            to="/showcase"
            className="mr-6 flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to Showcase
          </Link>
          <div className="flex-1" />
          <Link
            to="/showcase/blocks"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View All Blocks →
          </Link>
        </div>
      </div>

      <div className="container flex gap-8 py-8">
        {/* Sidebar Table of Contents */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <h3 className="mb-4 text-sm font-semibold">On This Page</h3>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-16">
          {/* Overview Section */}
          <section id="overview" className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold">Page Hero Header</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                A flexible hero header component for marketing pages with multiple variants, CTA options, and layout configurations.
              </p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-6">
              <h3 className="mb-2 font-semibold">Key Features</h3>
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li>• Multiple layout variants (centered, split, fullscreen)</li>
                <li>• Flexible CTA configurations with icons</li>
                <li>• Support for background images and videos</li>
                <li>• Statistics display for social proof</li>
                <li>• Badge support for announcements</li>
                <li>• Fully responsive design</li>
                <li>• Customizable height and spacing</li>
                <li>• Dark/light theme support</li>
              </ul>
            </div>
          </section>

          {/* Centered Variant */}
          <section id="centered" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Centered Variant</h2>
              <p className="text-muted-foreground">
                The default centered layout is perfect for focused messaging and clear calls to action.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(centeredSpec)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(centeredSpec, null, 2)}
              language="json"
              title="centered-hero.json"
            />
          </section>

          {/* Split Layout */}
          <section id="split" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Split Layout</h2>
              <p className="text-muted-foreground">
                Combine text content with images for visual impact and better engagement.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(splitSpec)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(splitSpec, null, 2)}
              language="json"
              title="split-hero.json"
            />
          </section>

          {/* Fullscreen Hero */}
          <section id="fullscreen" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Fullscreen Hero</h2>
              <p className="text-muted-foreground">
                Create immersive experiences with fullscreen backgrounds and overlay text.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(fullscreenSpec)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(fullscreenSpec, null, 2)}
              language="json"
              title="fullscreen-hero.json"
            />
          </section>

          {/* Minimal Style */}
          <section id="minimal" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Minimal Style</h2>
              <p className="text-muted-foreground">
                Clean and simple design for when less is more.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(minimalSpec)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(minimalSpec, null, 2)}
              language="json"
              title="minimal-hero.json"
            />
          </section>

          {/* With Statistics */}
          <section id="with-stats" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">With Statistics</h2>
              <p className="text-muted-foreground">
                Add social proof with impressive statistics and metrics.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(statsSpec)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(statsSpec, null, 2)}
              language="json"
              title="hero-with-stats.json"
            />
          </section>

          {/* Background Images */}
          <section id="background-image" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Background Variations</h2>
              <p className="text-muted-foreground">
                Use gradients, solid colors, or images for different visual styles.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(backgroundVariations)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(backgroundVariations, null, 2)}
              language="json"
              title="background-variations.json"
            />
          </section>

          {/* CTA Options */}
          <section id="cta-options" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">CTA Options</h2>
              <p className="text-muted-foreground">
                Configure multiple call-to-action buttons with different styles and icons.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(ctaVariations)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(ctaVariations, null, 2)}
              language="json"
              title="cta-variations.json"
            />
          </section>

          {/* Props Table */}
          <section id="props" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Props & Options</h2>
              <p className="text-muted-foreground">
                Complete reference of all available properties for the PageHeroHeader component.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Prop</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Default</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {propsData.map((prop) => (
                    <tr key={prop.prop} className="hover:bg-muted/25">
                      <td className="px-4 py-3 font-mono text-sm">
                        {prop.prop}
                        {prop.required && <span className="ml-1 text-destructive">*</span>}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {prop.type}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                        {prop.default || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Complete Examples */}
          <section id="examples" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Complete Example</h2>
              <p className="text-muted-foreground">
                A comprehensive marketing hero with all features combined.
              </p>
            </div>

            <ShowcaseWrapper fullWidth>{render(marketingExample)}</ShowcaseWrapper>

            <CodeBlock
              code={JSON.stringify(marketingExample, null, 2)}
              language="json"
              title="complete-marketing-hero.json"
            />
          </section>
        </main>
      </div>
    </div>
  );
}