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
import {
  RichSnippet,
  createBlogPostSnippet,
  createEcommerceProductSnippet,
  createFAQPageSnippet,
  createWebsiteBreadcrumbs,
  createLocalBusinessSnippet,
} from "../../../../../src/lib/seo/rich-snippets";

export const RichSnippetsPage: React.FC = () => {
  // Blog post snippet
  const blogSnippet = createBlogPostSnippet({
    title: "Getting Started with Rich Snippets",
    description: "Learn how to implement structured data for better search results",
    author: "Jane Developer",
    publishedDate: new Date("2024-01-15"),
    modifiedDate: new Date("2024-01-18"),
    imageUrl: "https://example.com/blog-image.jpg",
    organizationName: "Tech Blog Inc.",
    organizationLogo: "https://example.com/logo.png",
    url: "https://example.com/blog/rich-snippets",
  });

  // Product snippet
  const productSnippet = createEcommerceProductSnippet({
    name: "Premium React Component Library",
    description: "A comprehensive set of React components for building modern UIs",
    price: 149,
    currency: "USD",
    availability: "InStock",
    brand: "React Jedi",
    images: ["https://example.com/product1.jpg", "https://example.com/product2.jpg"],
    rating: { value: 4.8, count: 256 },
    sku: "RJ-001",
    url: "https://example.com/products/react-jedi",
  });

  // FAQ snippet
  const faqSnippet = createFAQPageSnippet([
    {
      question: "What are rich snippets?",
      answer:
        "Rich snippets are structured data markup that helps search engines understand your content better, resulting in enhanced search results.",
    },
    {
      question: "How do I implement rich snippets?",
      answer:
        "You can implement rich snippets using JSON-LD structured data. React Jedi provides utilities to generate this data automatically.",
    },
    {
      question: "Which rich snippet types are supported?",
      answer:
        "React Jedi supports Product, Article, FAQ, Organization, Event, Local Business, and many other schema.org types.",
    },
  ]);

  // Breadcrumb snippet
  const breadcrumbSnippet = createWebsiteBreadcrumbs([
    { name: "Home", url: "/" },
    { name: "Examples", url: "/examples" },
    { name: "Rich Snippets" },
  ]);

  // Local business snippet
  const businessSnippet = createLocalBusinessSnippet({
    name: "React Jedi Development Studio",
    telephone: "+1-555-0123",
    address: {
      street: "123 Developer Lane",
      city: "San Francisco",
      state: "CA",
      postalCode: "94101",
      country: "US",
    },
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    priceRange: "$$",
    openingHours: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    rating: { value: 4.9, count: 150 },
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
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(blogSnippet, null, 2)}</code>
                </pre>
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
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(productSnippet, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>

            {/* FAQ Example */}
            <Card>
              <CardHeader>
                <CardTitle>FAQ Rich Snippet</CardTitle>
                <CardDescription>FAQ page structured data for Q&A content</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(faqSnippet, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Breadcrumb Example */}
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb Rich Snippet</CardTitle>
                <CardDescription>Navigation breadcrumb structured data</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(breadcrumbSnippet, null, 2)}</code>
                </pre>
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
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify(businessSnippet, null, 2)}</code>
                </pre>
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
                  <pre className="bg-gray-100 p-3 rounded">
                    <code>
                      {
                        "import { RichSnippet, createBlogPostSnippet } from '@banja/react-jedi/lib/seo/rich-snippets';"
                      }
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Generate snippet data</h3>
                  <pre className="bg-gray-100 p-3 rounded">
                    <code>{`const snippet = createBlogPostSnippet({
  title: 'My Blog Post',
  author: 'John Doe',
  // ... other properties
});`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Render the snippet</h3>
                  <pre className="bg-gray-100 p-3 rounded">
                    <code>{`<RichSnippet snippet={snippet} />`}</code>
                  </pre>
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
