import type { UISpecification } from "@alexberriman/react-jedi";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeBlock } from "../../../../components/ui/code-block";

export function FooterBlockShowcase() {
  usePageMetadata({
    title: "Footer Block Component",
    description:
      "A comprehensive footer block with multiple layouts, social links, newsletter signup, and extensive customization options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");
  const currentYear = new Date().getFullYear();

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "layouts", label: "Layout Options" },
    { id: "variants", label: "Visual Variants" },
    { id: "columns", label: "Column Layouts" },
    { id: "features", label: "Key Features" },
    { id: "complete", label: "Complete Examples" },
    { id: "customization", label: "Customization" },
    { id: "props", label: "Props Reference" },
  ];

  // Layout examples
  const layoutExamples: Record<string, UISpecification> = {
    minimal: {
      type: "Footer",
      layout: "minimal",
      size: "minimal",
      variant: "minimal",
      companyInfo: { 
        logo: {
          type: "Text",
          className: "text-lg font-bold",
          children: "MinimalCo"
        }
      },
      sections: [{
        title: "Links",
        links: [
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
          { label: "Privacy", href: "#privacy" },
        ],
      }],
      socialLinks: [
        { platform: "github", href: "https://github.com" },
        { platform: "twitter", href: "https://twitter.com" },
      ],
      copyright: `© ${currentYear} MinimalCo`,
    },
    standard: {
      type: "Footer",
      layout: "standard",
      companyInfo: {
        name: "StandardCorp",
        logo: {
          type: "Text",
          className: "text-2xl font-bold text-blue-600",
          children: "StandardCorp",
        },
        description: "Leading the way in digital transformation",
      },
      sections: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Security", href: "#security" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#about" },
            { label: "Blog", href: "#blog" },
            { label: "Careers", href: "#careers" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "#help" },
            { label: "Documentation", href: "#docs" },
            { label: "API Status", href: "#status", external: true },
          ],
        },
      ],
      socialLinks: [
        { platform: "linkedin", href: "https://linkedin.com" },
        { platform: "twitter", href: "https://twitter.com" },
        { platform: "github", href: "https://github.com" },
      ],
      newsletter: {
        title: "Stay Updated",
        description: "Get product updates delivered to your inbox",
        placeholder: "your@email.com",
      },
      copyright: `© ${currentYear} StandardCorp. All rights reserved.`,
      legalLinks: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
      ],
    },
    expanded: {
      type: "Footer",
      layout: "expanded",
      size: "expanded",
      variant: "dark",
      companyInfo: {
        name: "ExpandedTech",
        logo: {
          type: "Text",
          className: "text-3xl font-bold text-white",
          children: "🚀 ExpandedTech",
        },
        description: "Enterprise solutions for the modern world",
        tagline: "Innovation at Scale",
        established: "2020",
        registration: "US123456789",
      },
      sections: [
        {
          title: "Products",
          links: [
            { label: "Analytics Platform", href: "#analytics" },
            { label: "Cloud Services", href: "#cloud" },
            { label: "Security Suite", href: "#security" },
            { label: "Developer Tools", href: "#devtools" },
            { label: "Enterprise Solutions", href: "#enterprise" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Documentation", href: "#docs" },
            { label: "Tutorials", href: "#tutorials" },
            { label: "API Reference", href: "#api" },
            { label: "Community Forum", href: "#forum" },
            { label: "System Status", href: "#status", external: true },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About Us", href: "#about" },
            { label: "Leadership", href: "#leadership" },
            { label: "Careers", href: "#careers" },
            { label: "Press Kit", href: "#press" },
            { label: "Investors", href: "#investors" },
          ],
        },
      ],
      contactInfo: {
        email: "contact@expandedtech.com",
        phone: "1-800-EXPANDED",
        address: "123 Innovation Drive, Tech City, CA 94000",
        hours: "24/7 Support Available",
        mapUrl: "https://maps.google.com",
      },
      socialLinks: [
        { platform: "facebook", href: "https://facebook.com", label: "Facebook" },
        { platform: "twitter", href: "https://twitter.com", label: "Twitter" },
        { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
        { platform: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
        { platform: "youtube", href: "https://youtube.com", label: "YouTube" },
        { platform: "github", href: "https://github.com", label: "GitHub" },
      ],
      newsletter: {
        title: "Tech Newsletter",
        description: "Join 50,000+ subscribers getting weekly tech insights",
        placeholder: "your@email.com",
        buttonText: "Subscribe",
        termsText: "By subscribing, you agree to our",
        termsLink: "#terms",
      },
      copyright: `© ${currentYear} ExpandedTech Inc. All rights reserved.`,
      legalLinks: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "GDPR", href: "#gdpr" },
        { label: "CCPA", href: "#ccpa" },
      ],
    },
    centered: {
      type: "Footer",
      layout: "centered",
      variant: "gradient",
      companyInfo: {
        name: "CenteredBrand",
        logo: {
          type: "Text",
          className: "text-2xl font-bold text-white",
          children: "CenteredBrand",
        },
        description: "Beautiful products, thoughtfully designed",
      },
      sections: [{
        title: "Navigation",
        links: [
          { label: "Home", href: "#home" },
          { label: "Products", href: "#products" },
          { label: "About", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Contact", href: "#contact" },
        ],
      }],
      socialLinks: [
        { platform: "instagram", href: "https://instagram.com" },
        { platform: "pinterest", href: "https://pinterest.com" },
        { platform: "twitter", href: "https://twitter.com" },
      ],
      newsletter: {
        title: "Join our creative community",
        description: "Get design inspiration and exclusive offers",
        placeholder: "Enter your email",
      },
      copyright: `© ${currentYear} CenteredBrand`,
      legalLinks: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ],
    },
  };

  // Column layout examples
  const columnExamples: Record<string, UISpecification> = {
    "2-columns": {
      type: "Footer",
      layout: "columns-2",
      columnGap: "normal",
      companyInfo: {
        name: "TwoColumn Co",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-blue-600",
          children: "TwoColumn Co",
        },
        description: "Simple and effective solutions",
      },
      sections: [{
        title: "Quick Links",
        links: [
          { label: "About Us", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Contact", href: "#contact" },
          { label: "Support", href: "#support" },
        ],
      }],
      copyright: `© ${currentYear} TwoColumn Co`,
    },
    "3-columns": {
      type: "Footer",
      layout: "columns-3",
      companyInfo: {
        name: "ThreeCol Inc",
        logo: {
          type: "Text",
          className: "text-xl font-bold",
          children: "ThreeCol",
        },
      },
      sections: [
        {
          title: "Products",
          links: [
            { label: "Product A", href: "#a" },
            { label: "Product B", href: "#b" },
            { label: "Product C", href: "#c" },
          ],
        },
      ],
      contactInfo: {
        email: "hello@threecol.com",
        phone: "+1 (555) 123-4567",
      },
      copyright: `© ${currentYear} ThreeCol Inc`,
    },
    "4-columns": {
      type: "Footer",
      layout: "columns-4",
      columnGap: "tight",
      companyInfo: {
        name: "FourSquare",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-purple-600",
          children: "FourSquare",
        },
      },
      sections: [
        {
          title: "Services",
          links: [
            { label: "Consulting", href: "#consulting" },
            { label: "Development", href: "#dev" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Blog", href: "#blog" },
            { label: "Docs", href: "#docs" },
          ],
        },
      ],
      newsletter: {
        title: "Updates",
        placeholder: "Email",
      },
      copyright: `© ${currentYear}`,
    },
    "6-columns": {
      type: "Footer",
      layout: "columns-6",
      columnGap: "tight",
      size: "lg",
      companyInfo: {
        logo: {
          type: "Text",
          className: "text-lg font-bold",
          children: "SixGrid",
        },
      },
      sections: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#about" },
            { label: "Blog", href: "#blog" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Docs", href: "#docs" },
            { label: "API", href: "#api" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help", href: "#help" },
            { label: "Contact", href: "#contact" },
          ],
        },
      ],
      socialLinks: [
        { platform: "twitter", href: "#" },
        { platform: "github", href: "#" },
      ],
      copyright: `© ${currentYear} SixGrid`,
    },
  };

  // Variant examples
  const variantExamples: Record<string, UISpecification> = {
    default: {
      type: "Footer",
      variant: "default",
      size: "sm",
      companyInfo: {
        name: "Default Style",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-blue-600",
          children: "Default",
        },
      },
      copyright: "© 2024 Default Style",
    },
    light: {
      type: "Footer",
      variant: "light",
      size: "sm",
      companyInfo: {
        name: "Light Theme",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-gray-900",
          children: "Light",
        },
      },
      copyright: "© 2024 Light Theme",
    },
    dark: {
      type: "Footer",
      variant: "dark",
      size: "sm",
      companyInfo: {
        name: "Dark Mode",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-white",
          children: "Dark",
        },
      },
      copyright: "© 2024 Dark Mode",
    },
    gradient: {
      type: "Footer",
      variant: "gradient",
      size: "sm",
      companyInfo: {
        name: "Gradient Style",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-white",
          children: "Gradient",
        },
      },
      copyright: "© 2024 Gradient Style",
    },
    brand: {
      type: "Footer",
      variant: "brand",
      size: "sm",
      className: "bg-purple-600",
      companyInfo: {
        name: "Brand Colors",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-white",
          children: "Brand",
        },
      },
      copyright: "© 2024 Brand Colors",
    },
  };

  // Complete example
  const completeExample: UISpecification = {
    type: "Footer",
    layout: "expanded",
    variant: "gradient",
    size: "lg",
    companyInfo: {
      name: "React Jedi",
      logo: {
        type: "Text",
        className: "text-3xl font-bold text-white",
        children: "⚡ React Jedi",
      },
      description: "The most powerful server-driven UI library for React. Build dynamic interfaces with JSON specifications.",
      tagline: "Code Less, Build More",
      established: "2024",
    },
    sections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features", icon: "✨" },
          { label: "Pricing", href: "#pricing", icon: "💰" },
          { label: "Enterprise", href: "#enterprise", icon: "🏢" },
          { label: "Changelog", href: "#changelog", icon: "📝" },
          { label: "Roadmap", href: "#roadmap", icon: "🗺️" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "Documentation", href: "#docs", icon: "📚" },
          { label: "API Reference", href: "#api", icon: "🔧" },
          { label: "Examples", href: "#examples", icon: "💡" },
          { label: "GitHub", href: "https://github.com", external: true, icon: "🐙" },
          { label: "Discord", href: "https://discord.com", external: true, icon: "💬" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Careers", href: "#careers" },
          { label: "Press Kit", href: "#press" },
          { label: "Partners", href: "#partners" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#help" },
          { label: "Community", href: "#community" },
          { label: "Contact Sales", href: "#sales" },
          { label: "System Status", href: "#status", external: true },
          { label: "Report a Bug", href: "#bugs" },
        ],
      },
    ],
    contactInfo: {
      email: "support@reactjedi.com",
      phone: "+1 (888) REACT-JS",
      address: "123 Component Street, Suite 456, React City, JS 12345",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM PST",
      mapUrl: "https://maps.google.com",
    },
    socialLinks: [
      { platform: "github", href: "https://github.com", label: "Star us on GitHub" },
      { platform: "twitter", href: "https://twitter.com", label: "Follow on Twitter" },
      { platform: "discord", href: "https://discord.com", label: "Join our Discord" },
      { platform: "youtube", href: "https://youtube.com", label: "Watch tutorials" },
      { platform: "linkedin", href: "https://linkedin.com", label: "Connect on LinkedIn" },
      { platform: "reddit", href: "https://reddit.com", label: "Join r/reactjedi" },
    ],
    newsletter: {
      title: "Developer Newsletter",
      description: "Join 20,000+ developers getting weekly tips, tutorials, and updates about React Jedi.",
      placeholder: "developer@example.com",
      buttonText: "Subscribe",
      successMessage: "Welcome aboard! Check your email for confirmation.",
      termsText: "By subscribing, you agree to our",
      termsLink: "#terms",
    },
    copyright: `© ${currentYear} React Jedi Inc. All rights reserved. Built with ❤️ by developers, for developers.`,
    legalLinks: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" },
      { label: "Accessibility", href: "#a11y" },
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
            to="/showcase/blocks"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            ← Back to Blocks
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Footer Block</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A comprehensive footer block with multiple layouts, social media integration, newsletter signup,
              and extensive customization options for building professional website footers.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Footer block is an advanced component that provides everything needed to create 
                professional, feature-rich footers for modern websites. It supports multiple layouts,
                visual variants, and can include company information, navigation links, social media,
                contact details, and newsletter signup functionality.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>5 pre-built layouts: minimal, standard, expanded, centered, and custom column layouts</li>
                <li>Flexible column systems (2-6 columns) with adjustable gaps</li>
                <li>5 visual variants: default, light, dark, gradient, and brand</li>
                <li>Social media integration with 12+ platform icons</li>
                <li>Newsletter signup with validation and loading states</li>
                <li>Contact information display with clickable links</li>
                <li>Company information section with logo and description</li>
                <li>Legal links row with external link indicators</li>
                <li>Fully responsive with mobile-first design</li>
                <li>Dark mode support</li>
                <li>Customizable sizing and spacing</li>
                <li>Background image and color support</li>
              </ul>
            </div>
          </section>

          {/* Layout Options */}
          <section id="layouts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Layout Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from multiple layout patterns to match your design needs.
            </p>
            <div className="space-y-8">
              {Object.entries(layoutExamples).map(([name, spec]) => (
                <div key={name}>
                  <h3 className="text-lg font-medium mb-3 capitalize">{name} Layout</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    {render(spec)}
                  </div>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                      View JSON
                    </summary>
                    <CodeBlock language="json" className="mt-2">
                      {JSON.stringify(spec, null, 2)}
                    </CodeBlock>
                  </details>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Variants */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Visual Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Multiple visual styles to match your brand and design system.
            </p>
            <div className="space-y-6">
              {Object.entries(variantExamples).map(([name, spec]) => (
                <div key={name}>
                  <h3 className="text-lg font-medium mb-3 capitalize">{name} Variant</h3>
                  <div className="rounded-lg overflow-hidden">
                    {render(spec)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Column Layouts */}
          <section id="columns" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Column Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Flexible column systems from 2 to 6 columns with adjustable gaps.
            </p>
            <div className="space-y-8">
              {Object.entries(columnExamples).map(([name, spec]) => (
                <div key={name}>
                  <h3 className="text-lg font-medium mb-3">{name.replace("-", " ").toUpperCase()}</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    {render(spec)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section id="features" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            
            <div className="space-y-8">
              {/* Social Media Integration */}
              <div>
                <h3 className="text-lg font-medium mb-3">Social Media Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Support for 12+ social platforms with hover effects and accessibility labels.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                  {render({
                    type: "Footer",
                    size: "sm",
                    variant: "dark",
                    companyInfo: {
                      name: "Social Demo",
                      logo: {
                        type: "Text",
                        className: "text-xl font-bold text-white",
                        children: "Social Demo",
                      },
                    },
                    socialLinks: [
                      { platform: "facebook", href: "#" },
                      { platform: "twitter", href: "#" },
                      { platform: "instagram", href: "#" },
                      { platform: "linkedin", href: "#" },
                      { platform: "youtube", href: "#" },
                      { platform: "github", href: "#" },
                      { platform: "tiktok", href: "#" },
                      { platform: "pinterest", href: "#" },
                      { platform: "discord", href: "#" },
                      { platform: "whatsapp", href: "#" },
                      { platform: "telegram", href: "#" },
                      { platform: "reddit", href: "#" },
                    ],
                    copyright: "© 2024 Social Demo",
                  })}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="text-lg font-medium mb-3">Newsletter Signup</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Integrated newsletter form with validation, loading states, and success feedback.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                  {render({
                    type: "Footer",
                    size: "sm",
                    layout: "centered",
                    newsletter: {
                      title: "Join 50,000+ subscribers",
                      description: "Get our weekly newsletter with tips, tutorials, and exclusive content.",
                      placeholder: "your@email.com",
                      buttonText: "Subscribe",
                      termsText: "By subscribing, you agree to our",
                      termsLink: "#terms",
                    },
                    copyright: "© 2024 Newsletter Demo",
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Display contact details with automatic link formatting for email and phone.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                  {render({
                    type: "Footer",
                    size: "sm",
                    contactInfo: {
                      email: "hello@example.com",
                      phone: "+1 (555) 123-4567",
                      address: "123 Main St, Suite 100, City, State 12345",
                      hours: "Mon-Fri: 9AM-6PM PST | Sat-Sun: 10AM-4PM PST",
                      mapUrl: "https://maps.google.com",
                    },
                    copyright: "© 2024 Contact Demo",
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Complete Example */}
          <section id="complete" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Example</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A fully-featured footer demonstrating all capabilities working together.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
              {render(completeExample)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View Complete JSON Specification
              </summary>
              <CodeBlock language="json" className="mt-2">
                {JSON.stringify(completeExample, null, 2)}
              </CodeBlock>
            </details>
          </section>

          {/* Customization */}
          <section id="customization" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Customization</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-medium mb-3">Background Options</h3>
              <p>Customize the footer background with colors or images:</p>
              <CodeBlock language="json">
{`{
  "type": "Footer",
  "backgroundColor": "#1a1a1a",
  "backgroundImage": "https://example.com/pattern.jpg",
  "className": "custom-footer-class"
}`}
              </CodeBlock>

              <h3 className="text-lg font-medium mb-3 mt-6">Container Width</h3>
              <p>Control the maximum width of the footer content:</p>
              <ul className="list-disc pl-6">
                <li><code>default</code> - Standard container width</li>
                <li><code>wide</code> - max-w-screen-2xl</li>
                <li><code>full</code> - Full width with padding</li>
              </ul>

              <h3 className="text-lg font-medium mb-3 mt-6">Column Gap</h3>
              <p>Adjust spacing between columns:</p>
              <ul className="list-disc pl-6">
                <li><code>tight</code> - Minimal spacing</li>
                <li><code>normal</code> - Default spacing</li>
                <li><code>wide</code> - Extra spacing</li>
              </ul>
            </div>
          </section>

          {/* Props Reference */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props Reference</h2>
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
                    <td className="py-3 px-4 font-mono text-blue-600">layout</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">"standard"</td>
                    <td className="py-3 px-4">Layout pattern: minimal, standard, expanded, centered, columns-2 through columns-6</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">variant</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Visual style: default, light, dark, gradient, minimal, brand</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">size</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Padding size: minimal, sm, default, lg, expanded</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">companyInfo</td>
                    <td className="py-3 px-4 font-mono">CompanyInfo</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Company details including name, logo, description, tagline</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">sections</td>
                    <td className="py-3 px-4 font-mono">FooterSection[]</td>
                    <td className="py-3 px-4">[]</td>
                    <td className="py-3 px-4">Navigation sections with titles and links</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">socialLinks</td>
                    <td className="py-3 px-4 font-mono">SocialLink[]</td>
                    <td className="py-3 px-4">[]</td>
                    <td className="py-3 px-4">Social media platform links</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">contactInfo</td>
                    <td className="py-3 px-4 font-mono">ContactInfo</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Contact details: email, phone, address, hours</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">newsletter</td>
                    <td className="py-3 px-4 font-mono">NewsletterConfig</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Newsletter signup configuration</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">copyright</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Copyright text</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">legalLinks</td>
                    <td className="py-3 px-4 font-mono">FooterLink[]</td>
                    <td className="py-3 px-4">[]</td>
                    <td className="py-3 px-4">Legal/policy links in bottom row</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">columnGap</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">"normal"</td>
                    <td className="py-3 px-4">Column spacing: tight, normal, wide</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600">containerWidth</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">"default"</td>
                    <td className="py-3 px-4">Container width: default, wide, full</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Type Definitions</h3>
                <CodeBlock language="typescript">
{`interface CompanyInfo {
  name?: string;
  logo?: React.ReactNode;
  description?: string;
  tagline?: string;
  established?: string;
  registration?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}

interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | 
            "youtube" | "github" | "tiktok" | "pinterest" | 
            "discord" | "whatsapp" | "telegram" | "reddit";
  href: string;
  label?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  mapUrl?: string;
}

interface NewsletterConfig {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  termsText?: string;
  termsLink?: string;
  onSubmit?: (email: string) => void | Promise<void>;
}`}
                </CodeBlock>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <Link
                to="/showcase/blocks"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                ← Back to Component Blocks
              </Link>
              <Link
                to="/documentation"
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