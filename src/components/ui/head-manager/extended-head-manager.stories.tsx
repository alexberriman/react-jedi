import type { Meta, StoryObj } from "@storybook/react";
import { ExtendedHeadManager } from "@/lib/seo";
import {
  type OrganizationSchema,
  type ArticleSchema,
  type ProductSchema,
  type BreadcrumbSchema,
  type FAQSchema,
  type WebSiteSchema,
} from "@/lib/seo";

const meta = {
  title: "Components/UI/ExtendedHeadManager",
  component: ExtendedHeadManager,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Head Manager with Structured Data Support (JSON-LD)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    metadata: {
      description: "Page metadata configuration",
    },
    structuredData: {
      description: "Structured data schemas for SEO",
    },
  },
} satisfies Meta<typeof ExtendedHeadManager>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to show the actual JSON-LD output
function JsonLdDisplay({ schema }: Readonly<{ schema: unknown }>) {
  return (
    <div className="w-full max-w-2xl bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Generated JSON-LD:</h3>
      <pre className="text-xs overflow-auto whitespace-pre-wrap bg-white p-3 rounded border">
        {JSON.stringify(schema, null, 2)}
      </pre>
    </div>
  );
}

export const Organization: Story = {
  args: {
    metadata: {
      title: "ACME Corporation",
      description: "Leading provider of innovative solutions",
      ogTitle: "ACME Corporation - Innovation Leaders",
      ogDescription: "Discover our cutting-edge products and services",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ACME Corporation",
      url: "https://acme.com",
      logo: "https://acme.com/logo.png",
      description: "Leading provider of innovative solutions",
      sameAs: [
        "https://facebook.com/acmecorp",
        "https://twitter.com/acmecorp",
        "https://linkedin.com/company/acmecorp",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-555-0123",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish"],
      },
    } as OrganizationSchema,
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">This component modifies the document head</p>
        <p className="text-sm font-medium">Check the page title and browser dev tools</p>
      </div>
      <ExtendedHeadManager {...args} />
      <JsonLdDisplay schema={args.structuredData} />
    </div>
  ),
};

export const Article: Story = {
  args: {
    metadata: {
      title: "Understanding Server-Driven UI",
      description: "Learn how SDUI can transform your development workflow",
      author: "Jane Doe",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Understanding Server-Driven UI",
      author: {
        "@type": "Person",
        name: "Jane Doe",
        url: "https://janedoe.com",
      },
      datePublished: "2024-01-15",
      dateModified: "2024-01-16",
      description: "A comprehensive guide to Server-Driven UI patterns",
      image: ["https://example.com/article-hero.jpg", "https://example.com/article-thumb.jpg"],
      publisher: {
        "@type": "Organization",
        name: "Tech Blog",
        logo: "https://techblog.com/logo.png",
      },
    } as ArticleSchema,
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Article Page</h2>
        <p className="text-sm text-gray-600">With Article structured data</p>
      </div>
      <ExtendedHeadManager {...args} />
      <JsonLdDisplay schema={args.structuredData} />
    </div>
  ),
};

export const Product: Story = {
  args: {
    metadata: {
      title: "Premium Widget Pro",
      description: "The ultimate widget for professionals",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Premium Widget Pro",
      description: "The ultimate widget for professionals",
      image: ["https://example.com/widget-1.jpg", "https://example.com/widget-2.jpg"],
      brand: {
        "@type": "Organization",
        name: "Widget Co",
      },
      offers: {
        "@type": "Offer",
        url: "https://example.com/widgets/pro",
        priceCurrency: "USD",
        price: "99.99",
        priceValidUntil: "2025-12-31",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.8,
        reviewCount: 127,
      },
    } as ProductSchema,
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Product Page</h2>
        <p className="text-sm text-gray-600">With Product structured data</p>
      </div>
      <ExtendedHeadManager {...args} />
      <JsonLdDisplay schema={args.structuredData} />
    </div>
  ),
};

export const Breadcrumb: Story = {
  args: {
    metadata: {
      title: "Smartphones - Electronics - ACME Store",
      description: "Browse our collection of smartphones",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://acme.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Electronics",
          item: "https://acme.com/electronics",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Smartphones",
          item: "https://acme.com/electronics/smartphones",
        },
      ],
    } as BreadcrumbSchema,
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-orange-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Category Page</h2>
        <p className="text-sm text-gray-600">With Breadcrumb structured data</p>
      </div>
      <ExtendedHeadManager {...args} />
      <JsonLdDisplay schema={args.structuredData} />
    </div>
  ),
};

export const FAQ: Story = {
  args: {
    metadata: {
      title: "Frequently Asked Questions - ACME Corp",
      description: "Find answers to common questions about our products and services",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Server-Driven UI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Server-Driven UI is an architectural pattern where the server controls the structure and behavior of the user interface through declarative specifications.",
          },
        },
        {
          "@type": "Question",
          name: "How does JSON-LD help with SEO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JSON-LD provides structured data that helps search engines understand your content better, potentially leading to rich results and improved visibility.",
          },
        },
        {
          "@type": "Question",
          name: "Is React Jedi suitable for production?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, React Jedi is designed for production use with performance optimization, comprehensive testing, and enterprise-ready features.",
          },
        },
      ],
    } as FAQSchema,
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">FAQ Page</h2>
        <p className="text-sm text-gray-600">With FAQ structured data</p>
      </div>
      <ExtendedHeadManager {...args} />
      <JsonLdDisplay schema={args.structuredData} />
    </div>
  ),
};

export const MultipleSchemas: Story = {
  args: {
    metadata: {
      title: "ACME Corporation - Leading Innovation",
      description: "Discover ACME's cutting-edge products and services",
    },
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ACME Corporation",
        url: "https://acme.com",
        logo: "https://acme.com/logo.png",
      } as OrganizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://acme.com",
        name: "ACME Corporation",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://acme.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      } as WebSiteSchema,
    ],
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-indigo-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Homepage</h2>
        <p className="text-sm text-gray-600">With Organization + WebSite structured data</p>
      </div>
      <ExtendedHeadManager {...args} />
      {Array.isArray(args.structuredData) &&
        args.structuredData.map((schema, index) => <JsonLdDisplay key={index} schema={schema} />)}
    </div>
  ),
};
