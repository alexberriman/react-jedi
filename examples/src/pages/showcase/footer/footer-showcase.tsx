import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function FooterShowcase() {
  usePageMetadata({
    title: "Footer Component",
    description:
      "A comprehensive showcase of the React Jedi Footer component with all variations, layouts, and configuration options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Footer Variants" },
    { id: "layouts", label: "Layout Options" },
    { id: "sections", label: "Content Sections" },
    { id: "social", label: "Social Links" },
    { id: "contact", label: "Contact Information" },
    { id: "newsletter", label: "Newsletter Signup" },
    { id: "complex", label: "Complete Examples" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Real-World Examples" },
  ];

  // Basic footer variants
  const variantsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-4",
            children: "Default Footer",
          },
          {
            type: "Footer",
            variant: "default",
            size: "sm",
            logo: {
              type: "Text",
              className: "text-xl font-bold text-blue-600",
              children: "React Jedi",
            },
            description: "Building the future of web development with server-driven UI.",
            copyright: "© 2024 React Jedi. All rights reserved.",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-4",
            children: "Light Footer",
          },
          {
            type: "Footer",
            variant: "light",
            size: "sm",
            logo: {
              type: "Text",
              className: "text-xl font-bold text-blue-600",
              children: "React Jedi",
            },
            description: "Perfect for light-themed websites.",
            copyright: "© 2024 React Jedi. All rights reserved.",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-4",
            children: "Gradient Footer",
          },
          {
            type: "Footer",
            variant: "gradient",
            size: "sm",
            logo: {
              type: "Text",
              className: "text-xl font-bold text-white",
              children: "React Jedi",
            },
            description: "Eye-catching gradient background.",
            copyright: "© 2024 React Jedi. All rights reserved.",
          },
        ],
      },
    ],
  };

  // Layout options
  const layoutsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-4",
            children: "Default Layout",
          },
          {
            type: "Footer",
            layout: "default",
            size: "sm",
            logo: {
              type: "Text",
              className: "text-xl font-bold text-blue-600",
              children: "React Jedi",
            },
            description: "Multi-column layout with brand, links, and contact sections.",
            sections: [
              {
                title: "Product",
                links: [
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "API", href: "#api" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "About", href: "#about" },
                  { label: "Team", href: "#team" },
                  { label: "Careers", href: "#careers" },
                ],
              },
            ],
            socialLinks: [
              { platform: "github", href: "https://github.com" },
              { platform: "twitter", href: "https://twitter.com" },
            ],
            copyright: "© 2024 React Jedi. All rights reserved.",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-4",
            children: "Centered Layout",
          },
          {
            type: "Footer",
            layout: "centered",
            size: "sm",
            logo: {
              type: "Text",
              className: "text-xl font-bold text-blue-600",
              children: "React Jedi",
            },
            description: "Everything centered for a clean, focused design.",
            sections: [
              {
                title: "Navigation",
                links: [
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                  { label: "Privacy", href: "#privacy" },
                ],
              },
            ],
            socialLinks: [
              { platform: "facebook", href: "https://facebook.com" },
              { platform: "instagram", href: "https://instagram.com" },
              { platform: "linkedin", href: "https://linkedin.com" },
            ],
            copyright: "© 2024 React Jedi. All rights reserved.",
          },
        ],
      },
      {
        type: "Box",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-4",
            children: "Minimal Layout",
          },
          {
            type: "Footer",
            variant: "minimal",
            layout: "minimal",
            size: "sm",
            logo: {
              type: "Text",
              className: "text-lg font-semibold text-gray-900",
              children: "React Jedi",
            },
            sections: [
              {
                title: "Links",
                links: [
                  { label: "Privacy", href: "#privacy" },
                  { label: "Terms", href: "#terms" },
                  { label: "Support", href: "#support" },
                ],
              },
            ],
            socialLinks: [
              { platform: "github", href: "https://github.com" },
              { platform: "twitter", href: "https://twitter.com" },
            ],
            copyright: "© 2024 React Jedi",
          },
        ],
      },
    ],
  };

  // Content sections example
  const sectionsSpec: UISpecification = {
    type: "Footer",
    size: "sm",
    logo: {
      type: "Text",
      className: "text-xl font-bold text-blue-600",
      children: "React Jedi",
    },
    description: "The most powerful server-driven UI library for React.",
    sections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Documentation", href: "#docs" },
          { label: "API Reference", href: "#api" },
          { label: "Examples", href: "#examples" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#about" },
          { label: "Our Team", href: "#team" },
          { label: "Careers", href: "#careers" },
          { label: "Press Kit", href: "#press" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "#blog" },
          { label: "Community", href: "#community" },
          { label: "Support Center", href: "#support" },
          { label: "Status Page", href: "#status", external: true },
          { label: "GitHub", href: "https://github.com", external: true },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#privacy" },
          { label: "Terms of Service", href: "#terms" },
          { label: "Cookie Policy", href: "#cookies" },
          { label: "GDPR", href: "#gdpr" },
        ],
      },
    ],
    copyright: "© 2024 React Jedi. All rights reserved.",
  };

  // Social links example
  const socialSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Footer",
        variant: "dark",
        size: "sm",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-white",
          children: "Social Media Footer",
        },
        description: "Connect with us on all platforms.",
        socialLinks: [
          { platform: "facebook", href: "https://facebook.com", label: "Follow on Facebook" },
          { platform: "twitter", href: "https://twitter.com", label: "Follow on Twitter" },
          { platform: "instagram", href: "https://instagram.com", label: "Follow on Instagram" },
          { platform: "linkedin", href: "https://linkedin.com", label: "Connect on LinkedIn" },
          { platform: "youtube", href: "https://youtube.com", label: "Subscribe on YouTube" },
          { platform: "github", href: "https://github.com", label: "Star on GitHub" },
        ],
        copyright: "© 2024 Follow us everywhere.",
      },
    ],
  };

  // Contact information example
  const contactSpec: UISpecification = {
    type: "Footer",
    size: "sm",
    logo: {
      type: "Text",
      className: "text-xl font-bold text-blue-600",
      children: "Contact Us",
    },
    description: "Get in touch with our team.",
    contactInfo: {
      email: "hello@reactjedi.com",
      phone: "+1 (555) 123-4567",
      address: "123 Developer Street, San Francisco, CA 94107",
    },
    sections: [
      {
        title: "Office Hours",
        links: [
          { label: "Monday - Friday: 9am - 6pm PST", href: "#" },
          { label: "Saturday: 10am - 4pm PST", href: "#" },
          { label: "Sunday: Closed", href: "#" },
        ],
      },
    ],
    copyright: "© 2024 React Jedi. All rights reserved.",
  };

  // Newsletter signup example
  const newsletterSpec: UISpecification = {
    type: "Footer",
    size: "sm",
    logo: {
      type: "Text",
      className: "text-xl font-bold text-blue-600",
      children: "Stay Updated",
    },
    description: "Subscribe to our newsletter for the latest updates.",
    newsletter: {
      title: "Newsletter",
      description: "Get weekly updates about new features and improvements.",
      placeholder: "Enter your email address",
      buttonText: "Subscribe",
    },
    sections: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "#home" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    socialLinks: [
      { platform: "twitter", href: "https://twitter.com" },
      { platform: "github", href: "https://github.com" },
    ],
    copyright: "© 2024 React Jedi. All rights reserved.",
  };

  // Complete corporate footer
  const corporateSpec: UISpecification = {
    type: "Footer",
    logo: {
      type: "Text",
      className: "text-2xl font-bold text-blue-600",
      children: "React Jedi",
    },
    description: "The most powerful server-driven UI library for React. Build dynamic interfaces with JSON specifications.",
    sections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Enterprise", href: "#enterprise" },
          { label: "API", href: "#api" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "Documentation", href: "#docs" },
          { label: "API Reference", href: "#api-ref" },
          { label: "Examples", href: "#examples" },
          { label: "GitHub", href: "https://github.com", external: true },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Blog", href: "#blog" },
          { label: "Careers", href: "#careers" },
          { label: "Press", href: "#press" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#help" },
          { label: "Community", href: "#community" },
          { label: "Contact Us", href: "#contact" },
          { label: "Status", href: "#status", external: true },
        ],
      },
    ],
    socialLinks: [
      { platform: "twitter", href: "https://twitter.com" },
      { platform: "github", href: "https://github.com" },
      { platform: "linkedin", href: "https://linkedin.com" },
    ],
    newsletter: {
      title: "Stay in the loop",
      description: "Get the latest updates, tips, and announcements delivered to your inbox.",
      placeholder: "your@email.com",
      buttonText: "Subscribe",
    },
    copyright: "© 2024 React Jedi Inc. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  };

  // Startup footer example
  const startupSpec: UISpecification = {
    type: "Footer",
    variant: "gradient",
    logo: {
      type: "Text",
      className: "text-2xl font-bold text-white",
      children: "🚀 StartupCo",
    },
    description: "We&apos;re revolutionizing the way teams collaborate and build products together.",
    layout: "centered",
    sections: [
      {
        title: "Navigation",
        links: [
          { label: "Product", href: "#product" },
          { label: "About", href: "#about" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
          { label: "Blog", href: "#blog" },
        ],
      },
    ],
    socialLinks: [
      { platform: "twitter", href: "https://twitter.com" },
      { platform: "instagram", href: "https://instagram.com" },
      { platform: "linkedin", href: "https://linkedin.com" },
    ],
    newsletter: {
      title: "Join our journey",
      description: "Be the first to know about our product updates and milestones.",
      placeholder: "Enter your email",
      buttonText: "Join",
    },
    copyright: "© 2024 StartupCo. Built with ❤️ in San Francisco.",
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Footer Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A comprehensive footer component with multiple layout options, social links, contact information,
              newsletter signup, and extensive customization capabilities.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Footer component is a versatile and comprehensive footer solution for React Jedi applications.
                It supports multiple layout options, various visual styles, and can include logo, navigation links,
                social media links, contact information, and newsletter signup functionality.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multiple visual variants (default, light, dark, gradient, minimal)</li>
                <li>Three layout options (default, centered, minimal)</li>
                <li>Organized link sections with external link indicators</li>
                <li>Social media integration with platform-specific icons</li>
                <li>Contact information display with icons</li>
                <li>Newsletter signup functionality</li>
                <li>Copyright and legal links support</li>
                <li>Fully responsive design</li>
                <li>Dark mode compatibility</li>
                <li>Customizable sizing and spacing</li>
              </ul>
            </div>
          </section>

          {/* Footer Variants Section */}
          <section id="variants" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Footer Variants</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from different visual styles to match your application&apos;s design.
            </p>
            <div className="space-y-6">
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

          {/* Layout Options Section */}
          <section id="layouts" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Layout Options</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Footer component supports three layout patterns: default (multi-column), centered, and minimal.
            </p>
            <div className="space-y-8">
              {render(layoutsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(layoutsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Content Sections */}
          <section id="sections" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Content Sections</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Organize links into logical sections with titles. External links are automatically marked with an icon.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(sectionsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(sectionsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Social Links Section */}
          <section id="social" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add social media links with platform-specific icons. Supports Facebook, Twitter, Instagram, LinkedIn, YouTube, and GitHub.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(socialSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(socialSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Contact Information Section */}
          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Display contact information with appropriate icons. Email and phone numbers are automatically linked.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(contactSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(contactSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Newsletter Section */}
          <section id="newsletter" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Newsletter Signup</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Include a newsletter signup form with customizable title, description, and placeholder text.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(newsletterSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(newsletterSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Complete Examples Section */}
          <section id="complex" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Comprehensive footer examples showing all features working together.
            </p>

            <div className="space-y-12">
              {/* Corporate Footer */}
              <div>
                <h3 className="text-lg font-medium mb-3">Corporate Footer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Full-featured footer suitable for enterprise applications and corporate websites.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(corporateSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(corporateSpec, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Startup Footer */}
              <div>
                <h3 className="text-lg font-medium mb-3">Startup Footer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Modern, centered footer design perfect for startups and creative agencies.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(startupSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(startupSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="space-y-6">
              {/* Main Footer Props */}
              <div>
                <h3 className="text-lg font-medium mb-3">Footer Component</h3>
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
                        <td className="py-3 px-4 font-mono">&quot;Footer&quot;</td>
                        <td className="py-3 px-4">required</td>
                        <td className="py-3 px-4">Component type identifier</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                        <td className="py-3 px-4 font-mono">"default" | "light" | &quot;dark&quot; | &quot;gradient&quot; | &quot;minimal&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Visual style variant</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                        <td className="py-3 px-4 font-mono">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Padding and spacing size</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">layout</td>
                        <td className="py-3 px-4 font-mono">&quot;default&quot; | &quot;centered&quot; | &quot;minimal&quot;</td>
                        <td className="py-3 px-4">&quot;default&quot;</td>
                        <td className="py-3 px-4">Layout pattern</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">logo</td>
                        <td className="py-3 px-4 font-mono">ComponentSpec</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Logo or brand element</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Brand description text</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">sections</td>
                        <td className="py-3 px-4 font-mono">FooterSection[]</td>
                        <td className="py-3 px-4">[]</td>
                        <td className="py-3 px-4">Link sections with titles</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">socialLinks</td>
                        <td className="py-3 px-4 font-mono">SocialLink[]</td>
                        <td className="py-3 px-4">[]</td>
                        <td className="py-3 px-4">Social media links</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">contactInfo</td>
                        <td className="py-3 px-4 font-mono">ContactInfo</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Contact information</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">newsletter</td>
                        <td className="py-3 px-4 font-mono">NewsletterConfig</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Newsletter signup configuration</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">copyright</td>
                        <td className="py-3 px-4 font-mono">string</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">Copyright text</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">legalLinks</td>
                        <td className="py-3 px-4 font-mono">FooterLink[]</td>
                        <td className="py-3 px-4">[]</td>
                        <td className="py-3 px-4">Legal/policy links</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showDivider</td>
                        <td className="py-3 px-4 font-mono">boolean</td>
                        <td className="py-3 px-4">true</td>
                        <td className="py-3 px-4">Show divider above bottom section</td>
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
              </div>

              {/* Data Types */}
              <div>
                <h3 className="text-lg font-medium mb-3">Data Types</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">FooterSection</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">{`{
  title: string;
  links: FooterLink[];
}`}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">FooterLink</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">{`{
  label: string;
  href: string;
  external?: boolean; // Shows external link icon
}`}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">SocialLink</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">{`{
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube" | "github";
  href: string;
  label?: string; // Accessibility label
}`}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">ContactInfo</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">{`{
  email?: string;
  phone?: string;
  address?: string;
}`}</pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">NewsletterConfig</h4>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">{`{
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See how the Footer component is used in different types of applications.
            </p>

            <div className="space-y-8">
              {/* E-commerce Footer */}
              <div>
                <h3 className="text-lg font-medium mb-3">E-commerce Footer</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Footer",
                    logo: {
                      type: "Text",
                      className: "text-2xl font-bold text-purple-600",
                      children: "🛍️ ShopNow",
                    },
                    description: "Your one-stop shop for everything you need. Fast shipping, great prices, excellent service.",
                    sections: [
                      {
                        title: "Shop",
                        links: [
                          { label: "New Arrivals", href: "#new" },
                          { label: "Best Sellers", href: "#bestsellers" },
                          { label: "Sale", href: "#sale" },
                          { label: "Gift Cards", href: "#gifts" },
                        ],
                      },
                      {
                        title: "Customer Service",
                        links: [
                          { label: "Contact Us", href: "#contact" },
                          { label: "Shipping Info", href: "#shipping" },
                          { label: "Returns", href: "#returns" },
                          { label: "Size Guide", href: "#sizes" },
                        ],
                      },
                      {
                        title: "Company",
                        links: [
                          { label: "About Us", href: "#about" },
                          { label: "Careers", href: "#careers" },
                          { label: "Sustainability", href: "#sustainability" },
                          { label: "Press", href: "#press" },
                        ],
                      },
                    ],
                    socialLinks: [
                      { platform: "instagram", href: "https://instagram.com" },
                      { platform: "facebook", href: "https://facebook.com" },
                      { platform: "twitter", href: "https://twitter.com" },
                    ],
                    newsletter: {
                      title: "Get exclusive deals",
                      description: "Subscribe to our newsletter and be the first to know about sales and new products.",
                      placeholder: "Enter your email",
                      buttonText: "Subscribe",
                    },
                    copyright: "© 2024 ShopNow Inc. All rights reserved.",
                    legalLinks: [
                      { label: "Privacy Policy", href: "#privacy" },
                      { label: "Terms of Service", href: "#terms" },
                      { label: "Accessibility", href: "#accessibility" },
                    ],
                  })}
                </div>
              </div>

              {/* SaaS Footer */}
              <div>
                <h3 className="text-lg font-medium mb-3">SaaS Application Footer</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render({
                    type: "Footer",
                    variant: "light",
                    logo: {
                      type: "Text",
                      className: "text-2xl font-bold text-blue-600",
                      children: "⚡ ProductivityPro",
                    },
                    description: "The all-in-one workspace for teams to collaborate, plan, and get work done.",
                    sections: [
                      {
                        title: "Product",
                        links: [
                          { label: "Features", href: "#features" },
                          { label: "Integrations", href: "#integrations" },
                          { label: "Security", href: "#security" },
                          { label: "Enterprise", href: "#enterprise" },
                        ],
                      },
                      {
                        title: "Resources",
                        links: [
                          { label: "Documentation", href: "#docs" },
                          { label: "API Reference", href: "#api" },
                          { label: "Help Center", href: "#help" },
                          { label: "Community", href: "#community" },
                        ],
                      },
                      {
                        title: "Company",
                        links: [
                          { label: "About", href: "#about" },
                          { label: "Blog", href: "#blog" },
                          { label: "Careers", href: "#careers" },
                          { label: "Partners", href: "#partners" },
                        ],
                      },
                    ],
                    socialLinks: [
                      { platform: "linkedin", href: "https://linkedin.com" },
                      { platform: "twitter", href: "https://twitter.com" },
                      { platform: "github", href: "https://github.com" },
                    ],
                    contactInfo: {
                      email: "support@productivitypro.com",
                      phone: "+1 (555) 987-6543",
                    },
                    copyright: "© 2024 ProductivityPro. All rights reserved.",
                    legalLinks: [
                      { label: "Privacy", href: "#privacy" },
                      { label: "Terms", href: "#terms" },
                      { label: "Security", href: "#security" },
                    ],
                  })}
                </div>
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