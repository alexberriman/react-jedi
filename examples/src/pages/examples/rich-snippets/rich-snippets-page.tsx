/**
 * Rich Snippets Example Page
 * Demonstrates various rich snippet implementations
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import {
  RichSnippet,
  generateArticleSnippet,
  generateProductSnippet,
  generateFAQSnippet,
  generateBreadcrumbSnippet,
  generateLocalBusinessSnippet,
} from "@banja/react-jedi";

export const RichSnippetsPage: React.FC = () => {
  // Blog post snippet
  const blogSnippet = generateArticleSnippet(
    {
      headline: "Getting Started with Rich Snippets",
      datePublished: "2024-01-15",
      dateModified: "2024-01-18",
      author: {
        "@type": "Person",
        name: "Jane Developer",
      },
      publisher: {
        "@type": "Organization",
        name: "Tech Blog Inc.",
        logo: {
          "@type": "ImageObject",
          url: "https://example.com/logo.png",
        },
      },
      image: "https://example.com/blog-image.jpg",
    },
    "BlogPosting"
  );

  // Product snippet
  const productSnippet = generateProductSnippet({
    name: "Premium React Component Library",
    description: "A comprehensive set of React components for building modern UIs",
    brand: {
      "@type": "Brand",
      name: "React Jedi",
    },
    offers: {
      "@type": "Offer",
      price: 149,
      priceCurrency: "USD",
      availability: "InStock",
      url: "https://example.com/products/react-jedi",
    },
    image: ["https://example.com/product1.jpg", "https://example.com/product2.jpg"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 256,
    },
    sku: "RJ-001",
  });

  // FAQ snippet
  const faqSnippet = generateFAQSnippet({
    mainEntity: [
      {
        "@type": "Question",
        name: "What are rich snippets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rich snippets are structured data markup that helps search engines understand your content better, resulting in enhanced search results.",
        },
      },
      {
        "@type": "Question",
        name: "How do I implement rich snippets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can implement rich snippets using JSON-LD structured data. React Jedi provides utilities to generate this data automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Which rich snippet types are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "React Jedi supports Product, Article, FAQ, Organization, Event, Local Business, and many other schema.org types.",
        },
      },
    ],
  });

  // Breadcrumb snippet
  const breadcrumbSnippet = generateBreadcrumbSnippet({
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Examples", item: "/examples" },
      { "@type": "ListItem", position: 3, name: "Rich Snippets", item: "/examples/rich-snippets" },
    ],
  });

  // Local business snippet
  const businessSnippet = generateLocalBusinessSnippet({
    name: "React Jedi Development Studio",
    telephone: "+1-555-0123",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Developer Lane",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94101",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 150,
    },
    url: "https://example.com",
  });

  return (
    <>
      {/* Inject all rich snippets */}
      <RichSnippet
        snippet={[blogSnippet, productSnippet, faqSnippet, breadcrumbSnippet, businessSnippet]}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Rich Snippets Example</h1>
            <p className="text-xl text-gray-700">Enhancing search results with structured data</p>
          </div>

          <div className="grid gap-8">
            {/* Blog Post Example */}
            <Card>
              <CardHeader>
                <CardTitle>Blog Post Rich Snippet</CardTitle>
                <CardDescription>
                  Article structured data for blog posts and news articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="json">
                  {JSON.stringify(blogSnippet, null, 2)}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Product Example */}
            <Card>
              <CardHeader>
                <CardTitle>Product Rich Snippet</CardTitle>
                <CardDescription>
                  E-commerce product structured data with pricing and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="json">
                  {JSON.stringify(productSnippet, null, 2)}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* FAQ Example */}
            <Card>
              <CardHeader>
                <CardTitle>FAQ Rich Snippet</CardTitle>
                <CardDescription>FAQ page structured data for Q&A content</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="json">
                  {JSON.stringify(faqSnippet, null, 2)}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Breadcrumb Example */}
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb Rich Snippet</CardTitle>
                <CardDescription>Navigation breadcrumb structured data</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="json">
                  {JSON.stringify(breadcrumbSnippet, null, 2)}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Local Business Example */}
            <Card>
              <CardHeader>
                <CardTitle>Local Business Rich Snippet</CardTitle>
                <CardDescription>
                  Local business structured data with location and hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="json">
                  {JSON.stringify(businessSnippet, null, 2)}
                </CodeBlock>
              </CardContent>
            </Card>

            {/* Usage Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guide</CardTitle>
                <CardDescription>
                  How to use React Jedi&apos;s rich snippet utilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Import the utilities</h3>
                  <CodeBlock language="javascript">
                    {"import { RichSnippet, createBlogPostSnippet } from '@banja/react-jedi';"}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Generate snippet data</h3>
                  <CodeBlock language="javascript">
                    {`const snippet = createBlogPostSnippet({
  title: 'My Blog Post',
  author: 'John Doe',
  // ... other properties
});`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Render the snippet</h3>
                  <CodeBlock language="javascript">
                    {`<RichSnippet snippet={snippet} />`}
                  </CodeBlock>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Rich snippets are rendered as invisible JSON-LD script
                    tags that are read by search engines. View the page source to see the generated
                    structured data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
