import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Heading, Text, spacing } from "../../../components/ui";
import { PageHeader } from "../../../components/ui/page-header";
import { CodeBlock } from "@/components/ui/code-block";
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
        status: "pending",
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
        description: "CTA sections with gradient backgrounds and multiple styles.",
        status: "pending",
        path: "/showcase/call-to-action",
      },
    ],
  },
  {
    id: "content",
    title: "Content Blocks",
    description: "Blocks for displaying various types of content.",
    blocks: [
      {
        name: "Feature Card",
        description: "Showcase product features with icons and descriptions.",
        status: "completed",
        path: "/showcase/blocks/feature-card",
      },
      {
        name: "Testimonial",
        description: "Customer testimonials with ratings and avatars.",
        status: "pending",
        path: "/showcase/testimonial",
      },
      {
        name: "Timeline",
        description: "Display chronological events with various layouts.",
        status: "pending",
      },
      {
        name: "FAQ",
        description: "Frequently asked questions with search and categories.",
        status: "pending",
      },
      {
        name: "Service List",
        description: "Display services or products with icons and CTAs.",
        status: "pending",
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
        description: "Display team members with photos and bios.",
        status: "pending",
      },
      {
        name: "Blog Post Grid",
        description: "Grid layout for blog posts with filtering.",
        status: "pending",
      },
      {
        name: "Blog Post Detail",
        description: "Full blog post layout with TOC and related posts.",
        status: "pending",
      },
    ],
  },
  {
    id: "interactive",
    title: "Interactive Blocks",
    description: "Blocks with user interaction and dynamic content.",
    blocks: [
      {
        name: "Carousel",
        description: "Image and content carousel with navigation.",
        status: "pending",
        path: "/showcase/carousel",
      },
      {
        name: "Contact Form",
        description: "Contact forms with validation and map integration.",
        status: "pending",
      },
      {
        name: "Newsletter Signup",
        description: "Email capture with various display modes.",
        status: "pending",
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
        status: "pending",
      },
      {
        name: "Latest News",
        description: "Recent articles or updates for homepages.",
        status: "pending",
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
};