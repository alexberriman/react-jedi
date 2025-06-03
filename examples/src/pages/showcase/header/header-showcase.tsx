import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { ShowcaseWrapper } from "@/components/ui/showcase-wrapper";

export function HeaderShowcase() {
  usePageMetadata({
    title: "Header Block Component",
    description:
      "A flexible header component for building website navigation with multiple variants, mobile responsiveness, and customization options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Header Variants" },
    { id: "logos", label: "Logo Options" },
    { id: "navigation", label: "Navigation Menus" },
    { id: "actions", label: "Action Buttons" },
    { id: "sticky", label: "Sticky Headers" },
    { id: "responsive", label: "Mobile Responsive" },
    { id: "customization", label: "Customization" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Sample navigation items
  const navigationItems = [
    {
      label: "Products",
      items: [
        {
          label: "Analytics",
          href: "#analytics",
          description: "Powerful analytics and reporting tools",
        },
        {
          label: "Automation",
          href: "#automation",
          description: "Automate your workflow with AI",
        },
        {
          label: "Security",
          href: "#security",
          description: "Enterprise-grade security features",
        },
      ],
    },
    {
      label: "Solutions",
      items: [
        {
          label: "For Startups",
          href: "#startups",
          description: "Everything you need to launch fast",
        },
        {
          label: "For Enterprise",
          href: "#enterprise",
          description: "Scale with confidence",
        },
      ],
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "Docs",
      href: "#docs",
    },
  ];

  const actions = [
    {
      label: "Sign In",
      variant: "ghost",
      href: "#signin",
    },
    {
      label: "Get Started",
      variant: "default",
      href: "#signup",
    },
  ];

  // Default header specification
  const defaultHeaderSpec: UISpecification = {
    type: "Header",
    props: {
      logo: {
        type: "text",
        text: "YourBrand",
        href: "#",
      },
      navigation: navigationItems,
      actions: actions,
      showDarkModeToggle: true,
    },
  };

  // Minimal header specification
  const minimalHeaderSpec: UISpecification = {
    type: "Header",
    props: {
      variant: "minimal",
      logo: {
        type: "text",
        text: "Minimal",
        href: "#",
      },
      actions: [
        {
          label: "Contact",
          variant: "ghost",
        },
        {
          label: "Get Started",
          variant: "default",
        },
      ],
      showDarkModeToggle: true,
    },
  };

  // Centered header specification
  const centeredHeaderSpec: UISpecification = {
    type: "Header",
    props: {
      variant: "centered",
      logo: {
        type: "text",
        text: "Centered",
        href: "#",
      },
      navigation: [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
      actions: [
        {
          label: "Get Started",
          variant: "default",
        },
      ],
      showDarkModeToggle: true,
    },
  };

  // Split header specification
  const splitHeaderSpec: UISpecification = {
    type: "Header",
    props: {
      variant: "split",
      logo: {
        type: "text",
        text: "Split Layout",
        href: "#",
      },
      navigation: [
        { label: "Products", href: "#products" },
        { label: "Solutions", href: "#solutions" },
        { label: "Pricing", href: "#pricing" },
      ],
      actions: actions,
    },
  };

  // Image logo header specification
  const imageLogoSpec: UISpecification = {
    type: "Header",
    props: {
      logo: {
        type: "image",
        src: "https://via.placeholder.com/120x40/3b82f6/ffffff?text=Logo",
        alt: "Company Logo",
        href: "#",
      },
      navigation: navigationItems,
      actions: actions,
    },
  };

  // Custom styled header specification
  const customStyledSpec: UISpecification = {
    type: "Header",
    props: {
      backgroundColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      className: "text-white",
      blur: false,
      logo: {
        type: "text",
        text: "Gradient",
        href: "#",
      },
      navigation: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "About", href: "#about" },
      ],
      actions: [
        {
          label: "Get Started",
          variant: "secondary",
        },
      ],
    },
  };

  // Complete example specification
  const completeExampleSpec: UISpecification = {
    type: "Stack",
    spacing: "0",
    children: [
      {
        type: "Header",
        props: {
          sticky: true,
          logo: {
            type: "text",
            text: "React Jedi",
            href: "#",
          },
          navigation: navigationItems,
          actions: actions,
          showDarkModeToggle: true,
        },
      },
      {
        type: "Container",
        props: {
          className: "py-16",
          children: [
            {
              type: "Heading",
              level: 1,
              children: "Welcome to React Jedi",
              className: "text-center mb-4",
            },
            {
              type: "Text",
              children: "Build modern React interfaces with JSON specifications",
              className: "text-center text-muted-foreground",
            },
          ],
        },
      },
    ],
  };

  const codeExample = `// Basic header with navigation and actions
const headerSpec = {
  type: "Header",
  props: {
    logo: {
      type: "text",
      text: "YourBrand",
      href: "/"
    },
    navigation: [
      {
        label: "Products",
        items: [
          {
            label: "Analytics",
            href: "/analytics",
            description: "Powerful analytics tools"
          },
          {
            label: "Security",
            href: "/security",
            description: "Enterprise-grade security"
          }
        ]
      },
      {
        label: "Pricing",
        href: "/pricing"
      }
    ],
    actions: [
      {
        label: "Sign In",
        variant: "ghost",
        href: "/signin"
      },
      {
        label: "Get Started",
        variant: "default",
        href: "/signup"
      }
    ],
    showDarkModeToggle: true,
    sticky: true
  }
};

render(headerSpec, container);`;

  const propsTableRows = [
    {
      prop: "logo",
      type: "HeaderLogoProperties",
      description: "Logo configuration (type, src, text, href, etc.)",
    },
    {
      prop: "navigation",
      type: "HeaderNavigationItem[]",
      description: "Array of navigation menu items with optional dropdowns",
    },
    {
      prop: "actions",
      type: "HeaderAction[]",
      description: "Array of action buttons with variants and handlers",
    },
    {
      prop: "showDarkModeToggle",
      type: "boolean",
      description: "Show dark mode toggle button",
    },
    {
      prop: "sticky",
      type: "boolean",
      description: "Make header sticky on scroll",
    },
    {
      prop: "variant",
      type: "string",
      description: "Visual variant: default, minimal, centered, split",
    },
    {
      prop: "animated",
      type: "boolean",
      description: "Enable smooth transitions",
    },
    {
      prop: "backgroundColor",
      type: "string",
      description: "Custom background color class",
    },
    {
      prop: "blur",
      type: "boolean",
      description: "Add backdrop blur effect when sticky",
    },
    {
      prop: "shadow",
      type: "boolean",
      description: "Add shadow when scrolled (only with sticky)",
    },
    {
      prop: "maxWidth",
      type: "string",
      description: "Maximum width: sm, md, lg, xl, 2xl, full",
    },
    {
      prop: "height",
      type: "string",
      description: "Header height: sm, md, lg",
    },
    {
      prop: "mobileTriggerIcon",
      type: "string",
      description: "Mobile menu icon style: menu, dots",
    },
  ];

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Header Block Component</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A flexible header component for building website navigation with multiple variants,
          mobile responsiveness, and customization options. Perfect for landing pages, marketing
          sites, and web applications.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        {/* Table of Contents */}
        <nav className="space-y-1 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <p className="font-semibold mb-4">On this page</p>
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content Sections */}
        <div className="space-y-12 pb-12">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="text-muted-foreground">
                  The Header block component is a comprehensive navigation solution that combines
                  branding, navigation menus, action buttons, and optional features like dark mode
                  toggle into a cohesive header. It&apos;s fully responsive with built-in mobile menu
                  support.
                </p>
              </section>

              <ShowcaseWrapper title="Default Header">
                {render(defaultHeaderSpec)}
              </ShowcaseWrapper>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Multiple visual variants (default, minimal, centered, split)</li>
                  <li>Flexible logo support (text or image)</li>
                  <li>Multi-level navigation with dropdown menus</li>
                  <li>Customizable action buttons</li>
                  <li>Built-in dark mode toggle</li>
                  <li>Sticky header with blur and shadow effects</li>
                  <li>Fully responsive with mobile menu</li>
                  <li>Smooth animations (can be disabled)</li>
                </ul>
              </section>
            </div>
          )}

          {/* Variants Section */}
          {activeSection === "variants" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Header Variants</h2>
                <p className="text-muted-foreground">
                  Choose from multiple layout variants to match your design needs.
                </p>
              </section>

              <ShowcaseWrapper title="Default Variant">
                {render(defaultHeaderSpec)}
              </ShowcaseWrapper>

              <ShowcaseWrapper title="Minimal Variant">
                {render(minimalHeaderSpec)}
              </ShowcaseWrapper>

              <ShowcaseWrapper title="Centered Variant">
                {render(centeredHeaderSpec)}
              </ShowcaseWrapper>

              <ShowcaseWrapper title="Split Variant">
                {render(splitHeaderSpec)}
              </ShowcaseWrapper>
            </div>
          )}

          {/* Logo Options Section */}
          {activeSection === "logos" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Logo Options</h2>
                <p className="text-muted-foreground">
                  Headers can display either text-based logos or image logos with customizable links.
                </p>
              </section>

              <ShowcaseWrapper title="Text Logo">
                {render(defaultHeaderSpec)}
              </ShowcaseWrapper>

              <ShowcaseWrapper title="Image Logo">
                {render(imageLogoSpec)}
              </ShowcaseWrapper>
            </div>
          )}

          {/* Navigation Section */}
          {activeSection === "navigation" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Navigation Menus</h2>
                <p className="text-muted-foreground">
                  Create simple links or complex multi-level dropdown menus with descriptions.
                </p>
              </section>

              <ShowcaseWrapper title="Simple Navigation">
                {render({
                  type: "Header",
                  props: {
                    logo: { type: "text", text: "Simple Nav", href: "#" },
                    navigation: [
                      { label: "Home", href: "#" },
                      { label: "About", href: "#about" },
                      { label: "Services", href: "#services" },
                      { label: "Contact", href: "#contact" },
                    ],
                  },
                })}
              </ShowcaseWrapper>

              <ShowcaseWrapper title="Dropdown Navigation">
                {render({
                  type: "Header",
                  props: {
                    logo: { type: "text", text: "Dropdown Nav", href: "#" },
                    navigation: navigationItems,
                  },
                })}
              </ShowcaseWrapper>
            </div>
          )}

          {/* Actions Section */}
          {activeSection === "actions" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Action Buttons</h2>
                <p className="text-muted-foreground">
                  Add call-to-action buttons with various styles and sizes.
                </p>
              </section>

              <ShowcaseWrapper title="Multiple Actions">
                {render({
                  type: "Header",
                  props: {
                    logo: { type: "text", text: "Actions Demo", href: "#" },
                    navigation: [
                      { label: "Features", href: "#features" },
                      { label: "Pricing", href: "#pricing" },
                    ],
                    actions: [
                      { label: "Contact", variant: "ghost" },
                      { label: "Sign In", variant: "outline" },
                      { label: "Get Started", variant: "default" },
                    ],
                  },
                })}
              </ShowcaseWrapper>
            </div>
          )}

          {/* Sticky Section */}
          {activeSection === "sticky" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Sticky Headers</h2>
                <p className="text-muted-foreground">
                  Enable sticky positioning with optional blur and shadow effects on scroll.
                </p>
              </section>

              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  To see the sticky header in action, visit the complete example at the bottom
                  of this page and scroll down.
                </p>
              </div>

              <CodeBlock
                code={`{
  type: "Header",
  props: {
    sticky: true,
    blur: true,
    shadow: true,
    // ... other props
  }
}`}
                language="json"
              />
            </div>
          )}

          {/* Responsive Section */}
          {activeSection === "responsive" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Mobile Responsive</h2>
                <p className="text-muted-foreground">
                  All headers automatically adapt to mobile screens with a hamburger menu.
                  Navigation items and actions are moved to a mobile-friendly sheet.
                </p>
              </section>

              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Resize your browser window to see the mobile menu in action, or view this page
                  on a mobile device.
                </p>
              </div>

              <ShowcaseWrapper title="Mobile Menu Icons">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {render({
                    type: "Header",
                    props: {
                      logo: { type: "text", text: "Menu Icon", href: "#" },
                      navigation: [{ label: "Home", href: "#" }],
                      mobileTriggerIcon: "menu",
                    },
                  })}
                  {render({
                    type: "Header",
                    props: {
                      logo: { type: "text", text: "Dots Icon", href: "#" },
                      navigation: [{ label: "Home", href: "#" }],
                      mobileTriggerIcon: "dots",
                    },
                  })}
                </div>
              </ShowcaseWrapper>
            </div>
          )}

          {/* Customization Section */}
          {activeSection === "customization" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Customization</h2>
                <p className="text-muted-foreground">
                  Customize the appearance with background colors, heights, and max widths.
                </p>
              </section>

              <ShowcaseWrapper title="Custom Styled Header">
                {render(customStyledSpec)}
              </ShowcaseWrapper>

              <ShowcaseWrapper title="Different Heights">
                <div className="space-y-4">
                  {render({
                    type: "Header",
                    props: {
                      height: "sm",
                      logo: { type: "text", text: "Small Height", href: "#" },
                      navigation: [{ label: "Compact", href: "#" }],
                    },
                  })}
                  {render({
                    type: "Header",
                    props: {
                      height: "lg",
                      logo: { type: "text", text: "Large Height", href: "#" },
                      navigation: [{ label: "Spacious", href: "#" }],
                    },
                  })}
                </div>
              </ShowcaseWrapper>
            </div>
          )}

          {/* Props Section */}
          {activeSection === "props" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Props & Options</h2>
                <p className="text-muted-foreground">
                  Complete reference of all available properties and their types.
                </p>
              </section>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Property</th>
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-left py-2 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propsTableRows.map((row) => (
                      <tr key={row.prop} className="border-b">
                        <td className="py-2 px-4 font-mono text-xs">{row.prop}</td>
                        <td className="py-2 px-4 font-mono text-xs">{row.type}</td>
                        <td className="py-2 px-4 text-muted-foreground">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Examples Section */}
          {activeSection === "examples" && (
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Complete Examples</h2>
                <p className="text-muted-foreground">
                  Real-world examples showing how to integrate headers into your application.
                </p>
              </section>

              <ShowcaseWrapper title="Landing Page Header">
                {render(completeExampleSpec)}
              </ShowcaseWrapper>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Code Example</h3>
                <CodeBlock code={codeExample} language="javascript" />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}