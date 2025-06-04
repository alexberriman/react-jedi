import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Heading, Text, spacing } from "../../../components/ui";
import { PageHeader } from "../../../components/ui/page-header";
import { CodeBlock } from "../../../components/ui/code-block";
import { ChevronDown } from "lucide-react";

type BlockCategory = {
  id: string;
  title: string;
  description: string;
  blocks: {
    name: string;
    description: string;
    status: "completed" | "pending";
    path?: string;
  }[];
};

const blockCategories: BlockCategory[] = [
  {
    id: "layout",
    title: "Layout Blocks",
    description: "Essential blocks for page structure and layout.",
    blocks: [
      {
        name: "Header",
        description: "Flexible header block with logo, navigation, and actions.",
        status: "completed",
        path: "/showcase/header",
      },
      {
        name: "Footer",
        description: "Multi-column footer with social links and newsletter signup.",
        status: "completed",
        path: "/showcase/blocks/footer",
      },
      {
        name: "Page Section",
        description: "Wrapper block for creating cohesive page sections.",
        status: "completed",
        path: "/showcase/blocks/page-section",
      },
    ],
  },
  {
    id: "hero",
    title: "Hero & Headers",
    description: "Eye-catching hero sections and page headers.",
    blocks: [
      {
        name: "Page Hero Header",
        description: "Main hero section for marketing pages with multiple variants.",
        status: "completed",
        path: "/showcase/page-hero-header",
      },
      {
        name: "Call to Action",
        description: "Advanced CTA blocks with multiple variants, form integration, and rich visual features.",
        status: "completed",
        path: "/showcase/blocks/call-to-action",
      },
    ],
  },
  {
    id: "content",
    title: "Content Blocks",
    description: "Blocks for displaying various types of content.",
    blocks: [
      {
        name: "Features",
        description: "Comprehensive features block with multiple variants: grid, alternating, tabbed, icon-focused, and comparison layouts.",
        status: "completed",
        path: "/showcase/blocks/features",
      },
      {
        name: "Feature Card",
        description: "Showcase product features with icons and descriptions.",
        status: "completed",
        path: "/showcase/blocks/feature-card",
      },
      {
        name: "Testimonial",
        description: "Customer testimonials with ratings, avatars, carousel, and video support.",
        status: "completed",
        path: "/showcase/blocks/testimonial",
      },
      {
        name: "Timeline",
        description: "Display chronological events with various layouts.",
        status: "completed",
        path: "/showcase/blocks/timeline",
      },
      {
        name: "FAQ",
        description: "Frequently asked questions with search and categories.",
        status: "completed",
        path: "/showcase/blocks/faq",
      },
      {
        name: "Service List",
        description: "Display services or products with icons and CTAs.",
        status: "completed",
        path: "/showcase/blocks/service-list",
      },
      {
        name: "Restaurant Menu",
        description: "Comprehensive menu display with categories, dietary restrictions, search, and multiple layout variants.",
        status: "completed",
        path: "/showcase/blocks/restaurant-menu",
      },
      {
        name: "Process Steps",
        description: "Visual workflow blocks for 'How it works' sections with multiple layouts including horizontal timeline, vertical steps, circular process, numbered cards, and branching paths.",
        status: "completed",
        path: "/showcase/blocks/process-steps",
      },
    ],
  },
  {
    id: "data",
    title: "Data Display",
    description: "Blocks for presenting data and information.",
    blocks: [
      {
        name: "Pricing Table",
        description: "Tiered pricing with feature comparison, monthly/yearly toggle, and multiple variants.",
        status: "completed",
        path: "/showcase/blocks/pricing-table",
      },
      {
        name: "Team Grid",
        description: "Display team members with photos, bios, filtering, and detailed modal views.",
        status: "completed",
        path: "/showcase/blocks/team-grid",
      },
      {
        name: "Blog Post Grid",
        description: "Grid layout for blog posts with filtering, search, sorting, and multiple display variants.",
        status: "completed",
        path: "/showcase/blocks/blog-post-grid",
      },
      {
        name: "Blog Post Detail",
        description: "Full blog post layout with TOC and related posts.",
        status: "completed",
        path: "/showcase/blocks/blog-post-detail",
      },
      {
        name: "Job Listings",
        description: "Display job openings with filtering, search, salary ranges, and multiple layout variants.",
        status: "completed",
        path: "/showcase/blocks/job-listings",
      },
      {
        name: "Portfolio Case Studies",
        description: "Showcase work with stunning portfolio layouts, project metrics, before/after views, and client testimonials.",
        status: "completed",
        path: "/showcase/blocks/portfolio-case-studies",
      },
      {
        name: "Location Hours",
        description: "Display business hours, contact info, and location details with timezone support, status indicators, and multiple layout variants.",
        status: "completed",
        path: "/showcase/blocks/location-hours",
      },
    ],
  },
  {
    id: "interactive",
    title: "Interactive Blocks",
    description: "Blocks with user interaction and dynamic content.",
    blocks: [
      {
        name: "Icon",
        description: "Comprehensive icon component with react-icons library, search, categories, animations, and size/color variants.",
        status: "completed",
        path: "/showcase/blocks/icon",
      },
      {
        name: "Carousel",
        description: "Enhanced carousel with multiple variants: image gallery, content cards, testimonials, product showcase, and fullscreen modes.",
        status: "completed",
        path: "/showcase/blocks/carousel",
      },
      {
        name: "Contact Form",
        description: "Contact forms with validation and map integration.",
        status: "completed",
        path: "/showcase/blocks/contact-form",
      },
      {
        name: "Newsletter Signup",
        description: "Email capture with various display modes, GDPR compliance, and multiple variants.",
        status: "completed",
        path: "/showcase/blocks/newsletter-signup",
      },
      {
        name: "Social Share Bar",
        description: "Content sharing with multiple platforms, layouts, and animation effects.",
        status: "completed",
        path: "/showcase/blocks/social-share-bar",
      },
      {
        name: "Map",
        description: "Interactive map block with Leaflet featuring clean, flat map styles, custom markers, and multiple location displays.",
        status: "completed",
        path: "/showcase/blocks/map",
      },
      {
        name: "Photo Gallery",
        description: "Stunning photo gallery with multiple layouts (masonry, grid, carousel), lightbox modal, category filtering, lazy loading, and zoom functionality.",
        status: "completed",
        path: "/showcase/blocks/photo-gallery",
      },
      {
        name: "Photo Flip Card",
        description: "Interactive photo cards with elegant hover animations, multiple transition effects, and responsive design.",
        status: "completed",
        path: "/showcase/blocks/photo-flip-card",
      },
      {
        name: "Typewriter Text",
        description: "Dynamic text animations with typewriter effects, multiple text rotation, cursor styling, and accessibility support.",
        status: "completed",
        path: "/showcase/blocks/typewriter-text",
      },
      {
        name: "Cookie Consent Banner",
        description: "GDPR-compliant cookie consent banner with multiple variants, preference management, and animations.",
        status: "completed",
        path: "/showcase/blocks/cookie-consent-banner",
      },
      {
        name: "Announcement Bar",
        description: "Versatile announcement bar for important notices, alerts, and time-sensitive information with multiple variants.",
        status: "completed",
        path: "/showcase/blocks/announcement-bar",
      },
      {
        name: "Event Listings",
        description: "Comprehensive event listings with calendar view, timeline format, search, filtering, and registration features for conferences, webinars, and meetups.",
        status: "completed",
        path: "/showcase/blocks/event-listings",
      },
    ],
  },
  {
    id: "social",
    title: "Social Proof",
    description: "Build trust with social proof elements.",
    blocks: [
      {
        name: "Brand Logo Bar",
        description: "Display partner or client logos with animations.",
        status: "completed",
        path: "/showcase/blocks/brand-logo-bar",
      },
      {
        name: "Latest News",
        description: "Recent articles or updates for homepages.",
        status: "completed",
        path: "/showcase/blocks/latest-news",
      },
    ],
  },
  {
    id: "data",
    title: "Data & Forms",
    description: "Display data and collect user input.",
    blocks: [
      {
        name: "Stat Block",
        description: "Display key metrics and statistics with animated counters, trend indicators, and multiple layout options.",
        status: "completed",
        path: "/showcase/blocks/stat-block",
      },
      {
        name: "Contact Form Enhanced",
        description: "Advanced contact form with conditional fields, file uploads, phone formatting, wizard steps, and CRM integration.",
        status: "completed",
        path: "/showcase/blocks/contact-form-enhanced",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Blocks for building online stores and product displays.",
    blocks: [
      {
        name: "Product Showcase",
        description: "Versatile product display with grid, list, featured, comparison, and category views. Includes wishlist, quick add, ratings, and filtering.",
        status: "completed",
        path: "/showcase/blocks/product-showcase",
      },
    ],
  },
  {
    id: "pages",
    title: "Page Templates",
    description: "Complete page templates for common scenarios.",
    blocks: [
      {
        name: "Error Page",
        description: "Customizable error pages for 404, 500, maintenance, and coming soon scenarios. Features search, popular links, animations, and clear recovery paths.",
        status: "completed",
        path: "/showcase/blocks/error-page",
      },
    ],
  },
];

// Dropdown component for filters
interface FilterDropdownProps {
  readonly label: string;
  readonly value: string;
  readonly options: readonly { readonly label: string; readonly value: string }[];
  readonly onChange: (value: string) => void;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}:</span>
        <span className="text-sm text-gray-900 dark:text-white">{selectedOption?.label || "All"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            role="button"
            tabIndex={0}
            aria-label="Close dropdown"
          />
          <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-40">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    value === option.value
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function BlocksShowcasePage() {
  usePageMetadata({
    title: "Component Blocks",
    description:
      "Pre-built, advanced components for quickly building modern websites with React Jedi",
  });

  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "pending">("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [showJson, setShowJson] = useState<string | null>(null);

  const filteredCategories = blockCategories
    .map((category) => ({
      ...category,
      blocks: category.blocks.filter(
        (block) => activeFilter === "all" || block.status === activeFilter
      ),
    }))
    .filter((category) => category.blocks.length > 0)
    .filter((category) => !activeCategory || category.id === activeCategory);

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Coming Soon", value: "pending" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    ...blockCategories.map((cat) => ({ label: cat.title, value: cat.id })),
  ];

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <PageHeader 
        title="Component Blocks"
        description="Advanced, pre-built components that allow you to create fully functioning websites quickly. These blocks combine multiple UI components into complete, production-ready sections."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/showcase"
            className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <span className="relative z-10">Browse Components</span>
          </Link>
          <Link
            to="/documentation"
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            View Documentation
          </Link>
        </div>
      </PageHeader>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8">
        <div className={`${spacing.default}`}>
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-8">
            <div className="max-w-3xl">
              <Heading as="h2" size="section" className="mb-4">
                What are Component Blocks?
              </Heading>
              <Text size="large" className="text-gray-600 dark:text-gray-400 mb-6">
                Component Blocks are advanced, composable sections that combine multiple UI components 
                into complete, production-ready features. Unlike basic components that serve as building 
                blocks, these are full sections ready to drop into your application.
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Text className="font-semibold mb-1">🚀 Production Ready</Text>
                  <Text size="small" variant="muted">
                    Fully styled and responsive out of the box
                  </Text>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Text className="font-semibold mb-1">🎨 Highly Flexible</Text>
                  <Text size="small" variant="muted">
                    Multiple variants and customization options
                  </Text>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Text className="font-semibold mb-1">⚡ JSON Driven</Text>
                  <Text size="small" variant="muted">
                    Configure entirely through JSON specs
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="sticky top-24 z-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filters:</span>
              <FilterDropdown
                label="Status"
                value={activeFilter}
                options={statusOptions}
                onChange={(value) => setActiveFilter(value as "all" | "completed" | "pending")}
              />
              <FilterDropdown
                label="Category"
                value={activeCategory || "all"}
                options={categoryOptions}
                onChange={(value) => setActiveCategory(value === "all" ? null : value)}
              />
            </div>
          </div>

          {/* Categories */}
          {filteredCategories.map((category) => (
            <section key={category.id} className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.blocks.map((block) => (
                  <div
                    key={block.name}
                    className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800"
                  >
                    {/* Block Preview Placeholder */}
                    {block.status === "completed" && blockPreviews[block.name] && (
                      <div
                        className={`bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-200 dark:border-gray-700 ${
                          expandedBlock === block.name ? "" : "max-h-64 overflow-hidden"
                        }`}
                      >
                        <div className="rounded-lg overflow-hidden">
                          {render(blockPreviews[block.name])}
                        </div>
                      </div>
                    )}

                    <div className="p-6 relative">
                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            block.status === "completed" ? "bg-green-500" : "bg-amber-500"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          {block.status === "completed" ? "Available" : "Coming Soon"}
                        </span>
                      </div>

                      <Heading
                        as="h3"
                        size="card"
                        className={`${spacing.xs} flex items-center gap-2`}
                      >
                        {block.name}
                      </Heading>

                      <Text size="base" variant="muted" className={spacing.small}>
                        {block.description}
                      </Text>

                      <div className="flex items-center gap-3 mt-auto pt-2">
                        {block.path && (
                          <Link
                            to={block.path}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            View Demo
                          </Link>
                        )}

                        {/* Toggle Preview */}
                        {blockPreviews[block.name] && (
                          <button
                            onClick={() =>
                              setExpandedBlock(
                                expandedBlock === block.name ? null : block.name
                              )
                            }
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            {expandedBlock === block.name ? "Collapse" : "Expand"}
                          </button>
                        )}

                        <button
                          onClick={() =>
                            setShowJson(showJson === block.name ? null : block.name)
                          }
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                          {showJson === block.name ? "Hide JSON" : "See JSON"}
                        </button>
                      </div>

                      {/* JSON Display */}
                      {showJson === block.name && blockPreviews[block.name] && (
                        <div className="mt-4">
                          <CodeBlock language="json">
                            {JSON.stringify(blockPreviews[block.name], null, 2)}
                          </CodeBlock>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Coming Soon Message */}
          {filteredCategories.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
              <Text className="font-semibold mb-2">🚧 More Blocks Coming Soon!</Text>
              <Text variant="muted">
                We&apos;re actively building more component blocks. Check back regularly for updates.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Block preview specifications (placeholder for now, will be populated as blocks are built)
const blockPreviews: Record<string, ComponentSpec> = {
  Footer: {
    type: "Footer",
    props: {
      layout: "standard",
      companyInfo: {
        name: "React Jedi",
        logo: {
          type: "Text",
          className: "text-xl font-bold text-blue-600",
          children: "React Jedi",
        },
        description: "Build modern React interfaces with JSON specifications",
      },
      sections: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Documentation", href: "#docs" },
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
      ],
      socialLinks: [
        { platform: "github", href: "https://github.com" },
        { platform: "twitter", href: "https://twitter.com" },
      ],
      newsletter: {
        title: "Stay Updated",
        description: "Get the latest updates on new features and releases",
        placeholder: "your@email.com",
      },
      copyright: "© 2024 React Jedi. All rights reserved.",
      legalLinks: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ],
    },
  },
  Header: {
    type: "Header",
    props: {
      logo: {
        type: "text",
        text: "YourBrand",
        href: "#",
      },
      navigation: [
        {
          label: "Products",
          items: [
            {
              label: "Analytics",
              href: "#analytics",
              description: "Powerful analytics tools",
            },
            {
              label: "Security",
              href: "#security",
              description: "Enterprise-grade security",
            },
          ],
        },
        {
          label: "Pricing",
          href: "#pricing",
        },
      ],
      actions: [
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
      ],
      showDarkModeToggle: true,
    },
  },
  "Page Hero Header": {
    type: "PageHeroHeader",
    props: {
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
      spacing: "tight",
    },
  },
  Features: {
    type: "Features",
    props: {
      variant: "grid",
      gridColumns: 3,
      title: "Powerful Features",
      features: [
        {
          id: "1",
          title: "Fast Performance",
          description: "Lightning-fast load times for better user experience.",
          icon: "FiZap",
          status: "available",
        },
        {
          id: "2",
          title: "Secure Platform",
          description: "Enterprise-grade security to protect your data.",
          icon: "FiShield",
          status: "available",
        },
        {
          id: "3",
          title: "AI-Powered",
          description: "Smart features powered by machine learning.",
          icon: "FiTrendingUp",
          status: "coming-soon",
        },
      ]
    }
  },
  "Feature Card": {
    type: "FeatureCardGrid",
    props: {
      columns: "3",
      gap: "md",
      cards: [
        {
          title: "Lightning Fast",
          description: "Experience blazing fast performance with our optimized infrastructure.",
          icon: "⚡",
          iconColor: "#FFB800",
          variant: "default",
        },
        {
          title: "Secure by Design",
          description: "Enterprise-grade security built into every layer of our platform.",
          icon: "🔒",
          iconColor: "#4ECDC4",
          variant: "gradient",
          gradientFrom: "#667eea",
          gradientTo: "#764ba2",
        },
        {
          title: "Scale Infinitely",
          description: "Handle millions of users without breaking a sweat.",
          icon: "🚀",
          iconColor: "#FF6B6B",
          variant: "bordered",
          highlight: true,
          highlightColor: "#FF6B6B",
        },
      ],
    },
  },
  "Pricing Table": {
    type: "PricingTable",
    props: {
      showToggle: true,
      defaultBillingCycle: "monthly",
      variant: "cards",
      columns: 3,
      tiers: [
        {
          name: "Starter",
          description: "Perfect for small projects",
          price: 9,
          monthlyPrice: 9,
          yearlyPrice: 90,
          currency: "$",
          period: "month",
          features: [
            { text: "5 Projects", included: true },
            { text: "Up to 10 users", included: true },
            { text: "2GB Storage", included: true },
            { text: "Community Support", included: true },
            { text: "Advanced Analytics", included: false },
            { text: "Custom Domain", included: false },
          ],
          cta: {
            text: "Get Started",
            variant: "outline",
          },
          savings: "Save $18/year",
        },
        {
          name: "Professional",
          description: "Best for growing teams",
          price: 29,
          monthlyPrice: 29,
          yearlyPrice: 290,
          currency: "$",
          period: "month",
          badge: "Most Popular",
          highlighted: true,
          features: [
            { text: "Unlimited Projects", included: true },
            { text: "Up to 50 users", included: true },
            { text: "50GB Storage", included: true },
            { text: "Priority Support", included: true },
            { text: "Advanced Analytics", included: true },
            { text: "Custom Domain", included: true },
          ],
          cta: {
            text: "Start Free Trial",
            variant: "default",
          },
          savings: "Save $58/year",
        },
        {
          name: "Enterprise",
          description: "For large organizations",
          price: "Custom",
          features: [
            { text: "Unlimited Projects", included: true },
            { text: "Unlimited Users", included: true },
            { text: "Unlimited Storage", included: true },
            { text: "24/7 Dedicated Support", included: true },
            { text: "Advanced Analytics", included: true },
            { text: "Custom Domain", included: true },
          ],
          cta: {
            text: "Contact Sales",
            variant: "outline",
          },
        },
      ],
    },
  },
  "Call to Action": {
    type: "CallToAction",
    props: {
      variant: "gradient",
      animated: true,
      title: "Ready to Transform Your Business?",
      subtitle: "Join 10,000+ companies",
      description: "Start your journey with our platform and see results within days",
      primaryAction: {
        label: "Start Free Trial",
        variant: "default",
      },
      secondaryAction: {
        label: "Watch Demo",
      },
      trustIndicators: [
        { label: "Active Users", value: "50K+" },
        { label: "Rating", value: "4.9/5" },
      ],
      size: "default",
    },
  },
  Timeline: {
    type: "Timeline",
    variant: "vertical-alternating",
    animated: true,
    items: [
      {
        id: "1",
        date: "2023 Q1",
        title: "Project Kickoff",
        description: "Initial planning and team assembly",
        icon: "🚀",
        isMilestone: true,
        isPast: true,
        badge: "Start",
      },
      {
        id: "2",
        date: "2023 Q2",
        title: "Design Phase",
        description: "UI/UX design and prototyping completed",
        icon: "🎨",
        isPast: true,
      },
      {
        id: "3",
        date: "2023 Q3",
        title: "Development Sprint",
        description: "Core features implementation",
        icon: "💻",
        isPast: true,
      },
      {
        id: "4",
        date: "2023 Q4",
        title: "Beta Launch",
        description: "Released to early adopters for testing",
        icon: "🎯",
        isMilestone: true,
        badge: "Current",
      },
      {
        id: "5",
        date: "2024 Q1",
        title: "Public Release",
        description: "Full market launch planned",
        icon: "🎉",
        badge: "Upcoming",
      },
    ],
  },
  "Testimonial": {
    type: "Testimonial",
    props: {
      variant: "grid",
      layout: "card",
      columns: 3,
      testimonials: [
        {
          id: "1",
          author: {
            name: "Sarah Chen",
            role: "Product Designer",
            company: "Tech Corp",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            companyLogo: "https://logo.clearbit.com/google.com"
          },
          content: "This library has transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster and deliver beautiful experiences.",
          rating: 5,
          date: "November 2024"
        },
        {
          id: "2",
          author: {
            name: "James Wilson",
            role: "Frontend Engineer",
            company: "WebDev Inc",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
            companyLogo: "https://logo.clearbit.com/microsoft.com"
          },
          content: "Best UI library I've worked with. The attention to detail is remarkable and the performance is outstanding.",
          rating: 5,
          featured: true,
          date: "December 2024"
        },
        {
          id: "3",
          author: {
            name: "Emma Thompson",
            role: "UX Designer",
            company: "Creative Agency",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
          },
          content: "Beautiful components that are a joy to work with. Highly recommended!",
          rating: 5,
          date: "October 2024"
        }
      ]
    }
  },
  Carousel: {
    type: "Carousel",
    variant: "gallery",
    showArrows: true,
    showDots: true,
    autoplay: {
      enabled: true,
      delay: 4000,
      stopOnMouseEnter: true,
    },
    data: {
      images: [
        {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
          alt: "Mountain landscape",
          title: "Mountain Vista",
          description: "Breathtaking mountain scenery",
        },
        {
          src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop",
          alt: "Ocean waves",
          title: "Ocean Waves", 
          description: "The endless rhythm of the sea",
        },
        {
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
          alt: "Forest path",
          title: "Forest Trail",
          description: "A peaceful walk through nature",
        },
      ],
      enableKenBurns: true,
      enableZoom: true,
      showThumbnails: true,
    },
  },
  FAQ: {
    type: "FAQ",
    variant: "accordion",
    showSearch: true,
    showCategories: true,
    animated: true,
    items: [
      {
        id: "1",
        question: "What is React Jedi?",
        answer: "React Jedi is a server-driven UI library that enables developers to build modern React interfaces using JSON specifications.",
        category: "general",
        tags: ["react", "ui", "json"],
        isPopular: true,
      },
      {
        id: "2",
        question: "How do I get started?",
        answer: "<p>Getting started is easy! Install the package using <code>npm install react-jedi</code> and start building with JSON specifications.</p>",
        category: "getting-started",
        tags: ["install", "setup"],
      },
      {
        id: "3",
        question: "Is it production ready?",
        answer: "Yes, React Jedi is production ready with comprehensive testing, accessibility features, and performance optimizations.",
        category: "general",
        tags: ["production", "stability"],
      },
    ],
    categories: [
      { id: "general", name: "General", count: 2 },
      { id: "getting-started", name: "Getting Started", count: 1 },
    ],
    search: {
      enabled: true,
      placeholder: "Search FAQs...",
      searchInAnswers: true,
    },
    voting: {
      enabled: true,
      showVoteCount: true,
    },
    contactSupport: {
      enabled: true,
      title: "Still need help?",
      description: "Can't find what you're looking for?",
      buttonText: "Contact Support",
    },
  },
  "Team Grid": {
    type: "team-grid",
    props: {
      variant: "grid",
      columns: "3",
      gap: "md",
      showDepartmentFilter: true,
      showSearch: true,
      showModal: true,
      showSocialLinks: true,
      showContactInfo: false,
      showBio: true,
      maxBioLength: 80,
      avatarSize: "md",
      alignment: "center",
      animated: true,
      hoverEffect: "lift",
      members: [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "CEO",
          department: "Executive",
          bio: "Visionary leader with 15+ years of experience in tech startups.",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face",
          socialLinks: [
            { platform: "linkedin", url: "https://linkedin.com/in/sarah-johnson" },
            { platform: "twitter", url: "https://twitter.com/sarahjohnson" },
          ],
        },
        {
          id: "2",
          name: "Michael Chen",
          role: "CTO",
          department: "Engineering",
          bio: "Full-stack engineer turned technical leader with scalable architecture expertise.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          socialLinks: [
            { platform: "linkedin", url: "https://linkedin.com/in/michael-chen" },
          ],
        },
        {
          id: "3",
          name: "Emily Rodriguez",
          role: "Head of Design",
          department: "Design",
          bio: "Award-winning UX designer passionate about beautiful user experiences.",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          socialLinks: [
            { platform: "linkedin", url: "https://linkedin.com/in/emily-rodriguez" },
            { platform: "twitter", url: "https://twitter.com/emilydesigns" },
          ],
        },
      ],
    },
  },
  "Blog Post Grid": {
    type: "BlogPostGrid",
    props: {
      variant: "cards",
      showFilters: true,
      showSearch: true,
      showPagination: true,
      postsPerPage: 3,
      posts: [
        {
          id: "1",
          title: "Getting Started with React Jedi",
          excerpt: "Learn how to build modern React interfaces using JSON specifications with React Jedi's powerful render engine.",
          featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
          category: "Tutorial",
          author: {
            name: "John Smith",
            avatar: "https://i.pravatar.cc/150?img=8"
          },
          publishDate: "2024-01-15T10:00:00Z",
          readTime: 5,
          slug: "getting-started-react-jedi"
        },
        {
          id: "2",
          title: "Building Scalable Component Systems",
          excerpt: "Discover best practices for creating reusable component libraries that scale with your application.",
          featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
          category: "Architecture",
          author: {
            name: "Emily Chen",
            avatar: "https://i.pravatar.cc/150?img=5"
          },
          publishDate: "2024-01-10T14:30:00Z",
          readTime: 8,
          isFeatured: true,
          slug: "building-scalable-component-systems"
        },
        {
          id: "3",
          title: "Performance Optimization Tips",
          excerpt: "Master the art of optimizing React applications for better performance and user experience.",
          featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
          category: "Performance",
          author: {
            name: "Mike Johnson",
            avatar: "https://i.pravatar.cc/150?img=12"
          },
          publishDate: "2024-01-05T09:15:00Z",
          readTime: 12,
          slug: "performance-optimization-tips"
        }
      ]
    }
  },
  "Job Listings": {
    type: "JobListings",
    props: {
      variant: "grid",
      columns: "3",
      showFilters: true,
      showSearch: true,
      showSalary: true,
      animated: true,
      jobs: [
        {
          id: "1",
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "San Francisco, CA",
          type: "full-time",
          salaryRange: {
            min: 150_000,
            max: 200_000,
            currency: "$",
            period: "yearly"
          },
          description: "Join our engineering team to build cutting-edge web applications using React, TypeScript, and modern frontend technologies.",
          requirements: [
            "5+ years of React experience",
            "Strong TypeScript skills",
            "Experience with modern frontend tools"
          ],
          posted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          featured: true,
          experienceLevel: "senior",
          companyName: "TechCorp"
        },
        {
          id: "2",
          title: "Product Designer",
          department: "Design",
          location: "Remote",
          type: "full-time",
          salaryRange: {
            min: 120_000,
            max: 160_000,
            currency: "$",
            period: "yearly"
          },
          description: "We're looking for a talented Product Designer to create beautiful and intuitive user experiences.",
          requirements: [
            "3+ years of product design experience",
            "Proficiency in Figma",
            "Strong portfolio"
          ],
          posted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          experienceLevel: "mid",
          companyName: "Innovation Labs"
        },
        {
          id: "3",
          title: "Marketing Manager",
          department: "Marketing",
          location: "New York, NY",
          type: "full-time",
          salaryRange: {
            min: 100_000,
            max: 130_000,
            currency: "$",
            period: "yearly"
          },
          description: "Lead our marketing efforts and help us grow our brand presence in the market.",
          requirements: [
            "5+ years of marketing experience",
            "Experience with digital marketing",
            "Strong analytical skills"
          ],
          posted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          experienceLevel: "mid",
          companyName: "Digital Solutions"
        }
      ]
    }
  },
  "Blog Post Detail": {
    type: "BlogPostDetail",
    props: {
      variant: "minimal",
      title: "Getting Started with React Jedi",
      content: "<p>Learn how to build modern React interfaces using JSON specifications...</p>",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      publishDate: "2024-01-15T10:00:00Z",
      categories: ["Tutorial"],
      showComments: false,
      showShareButtons: false,
      showProgressBar: false
    }
  },
  "Service List": {
    type: "ServiceList",
    props: {
      variant: "cards",
      columns: 3,
      animated: true,
      services: [
        {
          id: "1",
          title: "Cloud Storage",
          description: "Secure and scalable cloud storage solution",
          features: ["Unlimited storage", "99.9% uptime", "Auto-backup"],
          pricing: { price: "9.99", period: "month" },
          badge: "popular",
          ctaText: "Get Started",
          ctaLink: "#"
        },
        {
          id: "2",
          title: "Security Suite",
          description: "Enterprise-grade security for your business",
          features: ["Real-time monitoring", "Threat detection", "Firewall protection"],
          pricing: { price: "29.99", period: "month" },
          ctaText: "Start Trial",
          ctaLink: "#"
        },
        {
          id: "3",
          title: "Performance Boost",
          description: "Optimize your applications for maximum speed",
          features: ["CDN integration", "Caching optimization", "Load balancing"],
          pricing: { price: "19.99", period: "month" },
          badge: "new",
          ctaText: "Learn More",
          ctaLink: "#"
        }
      ]
    }
  },
  "Page Section": {
    type: "PageSection",
    props: {
      variant: "full-width",
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      heading: {
        title: "Flexible Page Sections",
        subtitle: "Create beautiful sections with backgrounds, dividers, and animations",
        alignment: "center"
      },
      padding: "lg",
      dividerBottom: "wave",
      dividerColor: "#ffffff"
    },
    children: [
      {
        type: "Grid",
        props: {
          columns: "3",
          gap: "md",
          className: "text-white"
        },
        children: [
          {
            type: "Card",
            props: {
              className: "p-6 bg-white/10 backdrop-blur border-white/20"
            },
            children: [
              {
                type: "Heading",
                props: {
                  as: "h3",
                  size: "card",
                  className: "mb-2"
                },
                children: "Multiple Variants"
              },
              {
                type: "Text",
                props: {
                  variant: "muted",
                  className: "text-white/90"
                },
                children: "Full-width, contained, split backgrounds, and more"
              }
            ]
          },
          {
            type: "Card",
            props: {
              className: "p-6 bg-white/10 backdrop-blur border-white/20"
            },
            children: [
              {
                type: "Heading",
                props: {
                  as: "h3",
                  size: "card",
                  className: "mb-2"
                },
                children: "Rich Backgrounds"
              },
              {
                type: "Text",
                props: {
                  variant: "muted",
                  className: "text-white/90"
                },
                children: "Colors, gradients, images, and patterns"
              }
            ]
          },
          {
            type: "Card",
            props: {
              className: "p-6 bg-white/10 backdrop-blur border-white/20"
            },
            children: [
              {
                type: "Heading",
                props: {
                  as: "h3",
                  size: "card",
                  className: "mb-2"
                },
                children: "Shape Dividers"
              },
              {
                type: "Text",
                props: {
                  variant: "muted",
                  className: "text-white/90"
                },
                children: "Wave, angle, and curve dividers for smooth transitions"
              }
            ]
          }
        ]
      }
    ]
  },
  "Contact Form": {
    type: "ContactForm",
    variant: "simple",
    title: "Get in Touch",
    description: "We'd love to hear from you. Send us a message!",
    submitText: "Send Message",
    animated: true,
  },
  "Social Share Bar": {
    type: "SocialShareBar",
    props: {
      variant: "horizontal",
      url: "https://example.com/article",
      title: "Check out this amazing content!",
      description: "An insightful article about modern web development",
      platforms: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
      showLabels: true,
      size: "md",
      colorScheme: "brand",
      animated: true,
    },
  },
  "Cookie Consent Banner": {
    type: "Box",
    props: {
      className: "relative h-[400px] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden",
      children: [
        {
          type: "CookieConsentBanner",
          props: {
            variant: "bottom-banner",
            title: "We value your privacy",
            description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
            cookiePolicyUrl: "/cookies",
            privacyPolicyUrl: "/privacy",
            categories: [
              {
                id: "necessary",
                name: "Necessary",
                description: "Essential for the website to function properly",
                required: true,
              },
              {
                id: "analytics",
                name: "Analytics",
                description: "Help us understand how visitors interact with our website",
              },
              {
                id: "marketing",
                name: "Marketing",
                description: "Used to track visitors for marketing purposes",
              },
            ],
            animated: true,
          },
        },
      ],
    },
  },
  Icon: {
    type: "Flex",
    props: {
      gap: "xl",
      align: "center",
      justify: "center",
      wrap: true,
      className: "p-6"
    },
    children: [
      {
        type: "Icon",
        props: {
          icon: "AiOutlineHome",
          size: "xl",
          color: "#3b82f6"
        }
      },
      {
        type: "Icon",
        props: {
          icon: "AiOutlineHeart",
          size: "xl",
          color: "#ef4444",
          animated: true,
          animationType: "pulse"
        }
      },
      {
        type: "Icon",
        props: {
          icon: "AiOutlineStar",
          size: "xl",
          color: "#f59e0b",
          variant: "background",
          background: "#fef3c7"
        }
      },
      {
        type: "Icon",
        props: {
          icon: "AiOutlineCheck",
          size: "xl",
          color: "#10b981",
          variant: "background",
          background: "#d1fae5"
        }
      }
    ]
  },
  "Photo Gallery": {
    type: "PhotoGallery",
    props: {
      variant: "grid",
      columns: 3,
      enableLightbox: true,
      enableZoom: true,
      enableFiltering: true,
      animated: true,
      aspectRatio: "landscape",
      gap: "md",
      photos: [
        {
          id: "1",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          alt: "Mountain landscape",
          title: "Majestic Mountains",
          description: "Beautiful mountain landscape with snow-capped peaks",
          category: "Nature",
          tags: ["mountains", "landscape", "snow"],
        },
        {
          id: "2",
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop",
          alt: "Forest path",
          title: "Enchanted Forest",
          description: "A mysterious path through an ancient forest",
          category: "Nature",
          tags: ["forest", "trees", "path"],
        },
        {
          id: "3",
          src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop",
          alt: "Ocean sunset",
          title: "Golden Hour",
          description: "Spectacular sunset over the ocean waves",
          category: "Seascape",
          tags: ["ocean", "sunset", "waves"],
        },
        {
          id: "4",
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
          alt: "Desert landscape",
          title: "Desert Dunes",
          description: "Rolling sand dunes in the desert",
          category: "Desert",
          tags: ["desert", "sand", "dunes"],
        },
        {
          id: "5",
          src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=1000&fit=crop",
          alt: "Urban architecture",
          title: "City Skyline",
          description: "Modern skyscrapers reaching toward the sky",
          category: "Architecture",
          tags: ["city", "skyscrapers", "urban"],
        },
        {
          id: "6",
          src: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=800&h=600&fit=crop",
          alt: "Tropical beach",
          title: "Paradise Beach",
          description: "Crystal clear waters and white sand beach",
          category: "Seascape",
          tags: ["beach", "tropical", "paradise"],
        },
      ],
    },
  },
  "Typewriter Text": {
    type: "TypewriterText",
    props: {
      variant: "rotation",
      texts: [
        "Build amazing websites",
        "Create beautiful interfaces",
        "Ship products faster",
        "Scale with confidence"
      ],
      typeSpeed: 80,
      deleteSpeed: 50,
      pauseDuration: 1500,
      deleteDelay: 1000,
      textSize: "2xl",
      fontWeight: "bold",
      textColor: "#059669",
      cursorColor: "#10b981",
      cursorStyle: "line",
      alignment: "center",
      showCursor: true,
      cursorBlink: true,
      animated: true,
    },
  },
  "Process Steps": {
    type: "ProcessSteps",
    props: {
      variant: "horizontal",
      currentStep: 2,
      animated: true,
      interactive: true,
      steps: [
        {
          title: "Sign Up",
          description: "Create your account",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineUserAdd",
              color: "currentColor"
            }
          },
        },
        {
          title: "Verify Email",
          description: "Confirm your email",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineMail",
              color: "currentColor"
            }
          },
        },
        {
          title: "Complete Profile",
          description: "Add your details",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineProfile",
              color: "currentColor"
            }
          },
        },
        {
          title: "Get Started",
          description: "Start using the app",
          icon: {
            type: "Icon",
            props: {
              icon: "AiOutlineRocket",
              color: "currentColor"
            }
          },
        },
      ],
    },
  },
  "Announcement Bar": {
    type: "Box",
    props: {
      className: "relative h-[200px] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden",
      children: [
        {
          type: "AnnouncementBar",
          props: {
            variant: "top-banner",
            message: "🎉 New feature released! Check out our latest updates and improvements.",
            actions: [
              { label: "Learn More", variant: "primary" },
              { label: "Dismiss", variant: "link" }
            ],
            colorScheme: "info",
            sticky: false,
            animated: true
          }
        }
      ]
    }
  },
  "Error Page": {
    type: "Box",
    props: {
      className: "relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden",
      children: [
        {
          type: "ErrorPage",
          props: {
            variant: "friendly-404",
            title: "Oops! Page Not Found",
            description: "The page you're looking for seems to have wandered off. Don't worry, we'll help you find your way back.",
            showIcon: true,
            homeLink: "#",
            homeLinkText: "Return Home",
            contactEmail: "support@example.com",
            contactText: "Contact Support",
            searchConfig: {
              enabled: true,
              placeholder: "Search for pages...",
            },
            popularLinks: [
              { label: "Documentation", href: "#docs", description: "Browse our guides" },
              { label: "Support", href: "#support", description: "Get help from our team" },
              { label: "Status", href: "#status", description: "Check system status" },
            ],
            animated: true,
          }
        }
      ]
    }
  },
  "Event Listings": {
    type: "EventListings",
    props: {
      variant: "cards",
      showSearch: true,
      showFilters: true,
      showCountdown: true,
      showCapacity: true,
      animated: true,
      events: [
        {
          id: "1",
          title: "React Conference 2024",
          description: "The biggest React conference of the year featuring the latest updates and best practices.",
          startDate: "2024-06-15T09:00:00Z",
          endDate: "2024-06-17T17:00:00Z",
          location: { name: "San Francisco Convention Center", address: "747 Howard St, San Francisco, CA" },
          speakers: [
            { name: "Dan Abramov", title: "React Team Lead" },
            { name: "Sophie Alpert", title: "Former React Team Manager" }
          ],
          category: "Conference",
          registrationUrl: "#",
          capacity: 1000,
          registeredCount: 847,
          featured: true,
          tags: ["React", "JavaScript", "Frontend"],
          price: { amount: 299, currency: "USD" },
          image: "/api/placeholder/400/200",
          status: "upcoming"
        },
        {
          id: "2",
          title: "JavaScript Workshop: Advanced Patterns",
          description: "Deep dive into advanced JavaScript patterns and performance optimization techniques.",
          startDate: "2024-05-20T14:00:00Z",
          endDate: "2024-05-20T18:00:00Z",
          location: { name: "Tech Hub Downtown", virtual: false },
          speakers: [{ name: "Kyle Simpson", title: "JavaScript Expert" }],
          category: "Workshop",
          registrationUrl: "#",
          capacity: 50,
          registeredCount: 23,
          tags: ["JavaScript", "Performance"],
          price: { amount: 89, currency: "USD" },
          status: "upcoming"
        },
        {
          id: "3",
          title: "Free Webinar: Getting Started with TypeScript",
          description: "Introduction to TypeScript for JavaScript developers. Perfect for beginners.",
          startDate: "2024-05-25T19:00:00Z",
          endDate: "2024-05-25T20:30:00Z",
          location: { name: "Online", virtual: true },
          speakers: [{ name: "Anders Hejlsberg", title: "TypeScript Creator" }],
          category: "Webinar",
          registrationUrl: "#",
          capacity: 500,
          registeredCount: 342,
          tags: ["TypeScript", "Beginner"],
          price: { free: true, amount: 0, currency: "USD" },
          status: "upcoming"
        }
      ]
    }
  },
  "Location Hours": {
    type: "LocationHours",
    props: {
      variant: "single-location",
      locations: [
        {
          id: "downtown",
          name: "Downtown Office",
          description: "Our main office in the heart of the city",
          businessHours: [
            { day: "monday", openTime: "09:00", closeTime: "17:00", closed: false },
            { day: "tuesday", openTime: "09:00", closeTime: "17:00", closed: false },
            { day: "wednesday", openTime: "09:00", closeTime: "17:00", closed: false },
            { day: "thursday", openTime: "09:00", closeTime: "17:00", closed: false },
            { day: "friday", openTime: "09:00", closeTime: "17:00", closed: false },
            { day: "saturday", openTime: "10:00", closeTime: "14:00", closed: false },
            { day: "sunday", openTime: "00:00", closeTime: "00:00", closed: true }
          ],
          specialSchedules: [
            {
              date: "2024-12-25",
              name: "Christmas Day",
              closed: true,
              message: "Closed for Christmas. Happy Holidays!"
            }
          ],
          contact: {
            phone: "+1 (555) 123-4567",
            email: "downtown@company.com",
            website: "https://company.com",
            address: {
              street: "123 Main Street",
              city: "New York",
              state: "NY",
              zipCode: "10001",
              country: "USA"
            }
          },
          timezone: "America/New_York",
          services: ["Consulting", "Support", "Training"],
          appointmentBookingUrl: "https://company.com/book-appointment"
        }
      ],
      showCurrentStatus: true,
      showSpecialSchedules: true,
      showContactInfo: true,
      showServices: true,
      showAppointmentBooking: true
    }
  },
};