import React from "react";
import { render, HeadManager } from "@banja/react-jedi";
import { Navigation } from "@/components/layouts/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";
import { StructuredDataDemo } from "@/components/seo/structured-data-demo";
import { MicrodataDemo } from "@/components/seo/microdata-demo";

const SEOMetadataPage: React.FC = () => {
  // SEO Metadata Example 1: Basic metadata
  const basicMetadataSpec = {
    type: "head-manager",
    metadata: {
      title: "SEO and Metadata Management",
      description:
        "Learn how to manage SEO metadata, structured data, microdata, and social media tags with React Jedi",
      keywords: [
        "SEO",
        "metadata",
        "React",
        "structured data",
        "microdata",
        "Open Graph",
        "Twitter Cards",
      ],
    },
    children: [
      {
        type: "container",
        className: "py-12",
        children: [
          {
            type: "heading",
            level: 1,
            text: "SEO & Metadata Management",
            className: "text-4xl font-bold text-center mb-8",
          },
          {
            type: "text",
            text: "Complete SEO toolkit: meta tags, structured data, microdata, and social sharing optimization.",
            className: "text-lg text-center text-muted-foreground mb-12",
          },
        ],
      },
    ],
  };

  // Example 2: Complete metadata with Open Graph
  const completeMetadataSpec = {
    type: "container",
    className: "py-8",
    children: [
      {
        type: "head-manager",
        metadata: {
          title: "Product Page - Amazing Widget",
          description: "Discover our revolutionary widget that changes everything",
          keywords: ["product", "widget", "innovation"],
          author: "My Company Inc.",
          ogTitle: "Amazing Widget - Revolutionary Technology",
          ogDescription: "Experience the future with our cutting-edge widget",
          ogImage: "https://example.com/widget-og.jpg",
          twitterCard: "summary_large_image",
          twitterTitle: "Check out this Amazing Widget!",
          twitterDescription: "Transform your workflow with our innovation",
          twitterImage: "https://example.com/widget-twitter.jpg",
          canonicalUrl: "https://example.com/products/amazing-widget",
        },
        titleSuffix: " | MyCompany",
        children: [
          {
            type: "card",
            children: [
              {
                type: "card-header",
                children: [
                  {
                    type: "card-title",
                    text: "Complete SEO Metadata Example",
                  },
                  {
                    type: "card-description",
                    text: "All metadata types including Open Graph and Twitter Cards",
                  },
                ],
              },
              {
                type: "card-content",
                children: [
                  {
                    type: "grid",
                    columns: 2,
                    gap: 4,
                    children: [
                      {
                        type: "div",
                        children: [
                          {
                            type: "badge",
                            variant: "outline",
                            text: "Standard Meta",
                            className: "mb-2",
                          },
                          {
                            type: "text",
                            className: "text-sm",
                            children: [
                              {
                                type: "span",
                                text: "Title, Description, Keywords, Author",
                                className: "font-mono",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "div",
                        children: [
                          {
                            type: "badge",
                            variant: "outline",
                            text: "Open Graph",
                            className: "mb-2",
                          },
                          {
                            type: "text",
                            className: "text-sm",
                            children: [
                              {
                                type: "span",
                                text: "og:title, og:description, og:image",
                                className: "font-mono",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "div",
                        children: [
                          {
                            type: "badge",
                            variant: "outline",
                            text: "Twitter Cards",
                            className: "mb-2",
                          },
                          {
                            type: "text",
                            className: "text-sm",
                            children: [
                              {
                                type: "span",
                                text: "twitter:card, twitter:title, twitter:image",
                                className: "font-mono",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "div",
                        children: [
                          {
                            type: "badge",
                            variant: "outline",
                            text: "Canonical URL",
                            className: "mb-2",
                          },
                          {
                            type: "text",
                            className: "text-sm",
                            children: [
                              {
                                type: "span",
                                text: "Prevents duplicate content issues",
                                className: "font-mono",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Example 3: Favicon management
  const faviconSpec = {
    type: "head-manager",
    metadata: {
      title: "Favicon Management",
      favicon: {
        default: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        icon16: "/favicon-16x16.png",
        icon32: "/favicon-32x32.png",
        manifest: "/site.webmanifest",
      },
    },
    children: [
      {
        type: "card",
        className: "mb-8",
        children: [
          {
            type: "card-header",
            children: [
              {
                type: "card-title",
                text: "Favicon Configuration",
              },
              {
                type: "card-description",
                text: "Support for multiple favicon formats and sizes",
              },
            ],
          },
          {
            type: "card-content",
            children: [
              {
                type: "div",
                className: "space-y-2",
                children: [
                  {
                    type: "text",
                    className: "text-sm",
                    children: [
                      { type: "badge", text: "Default", className: "mr-2" },
                      { type: "span", text: "/favicon.ico", className: "font-mono" },
                    ],
                  },
                  {
                    type: "text",
                    className: "text-sm",
                    children: [
                      { type: "badge", text: "Apple", className: "mr-2" },
                      { type: "span", text: "/apple-touch-icon.png", className: "font-mono" },
                    ],
                  },
                  {
                    type: "text",
                    className: "text-sm",
                    children: [
                      { type: "badge", text: "16x16", className: "mr-2" },
                      { type: "span", text: "/favicon-16x16.png", className: "font-mono" },
                    ],
                  },
                  {
                    type: "text",
                    className: "text-sm",
                    children: [
                      { type: "badge", text: "32x32", className: "mr-2" },
                      { type: "span", text: "/favicon-32x32.png", className: "font-mono" },
                    ],
                  },
                  {
                    type: "text",
                    className: "text-sm",
                    children: [
                      { type: "badge", text: "Manifest", className: "mr-2" },
                      { type: "span", text: "/site.webmanifest", className: "font-mono" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Code examples
  const jsonLdExample = `import { useStructuredData } from "@banja/react-jedi";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Executive Anvil",
  image: "https://example.com/anvil.jpg",
  description: "Sleek and durable anvil",
  sku: "0446310786",
  brand: {
    "@type": "Brand",
    name: "ACME"
  },
  offers: {
    "@type": "Offer",
    url: "https://example.com/anvil",
    priceCurrency: "USD",
    price: "119.99",
    priceValidUntil: "2024-11-20",
    availability: "https://schema.org/InStock"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    reviewCount: "89"
  }
};

function ProductPage() {
  useStructuredData(productSchema);
  
  return <div>Product content...</div>;
}`;

  const microdataExample = `import { MicrodataElement, BreadcrumbMicrodata } from "@banja/react-jedi";

function ArticlePage() {
  return (
    <>
      <BreadcrumbMicrodata
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Article Title" }
        ]}
      />
      
      <article
        itemScope
        itemType="https://schema.org/Article"
      >
        <h1 itemProp="headline">Article Title</h1>
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">John Doe</span>
        </div>
        <time itemProp="datePublished" dateTime="2024-05-18">
          May 18, 2024
        </time>
        <div itemProp="articleBody">
          Article content...
        </div>
      </article>
    </>
  );
}`;

  const headManagerExample = `import { HeadManager } from "@banja/react-jedi";

function MyPage() {
  return (
    <HeadManager
      metadata={{
        title: "My Page Title",
        description: "Page description for SEO",
        keywords: ["keyword1", "keyword2"],
        author: "John Doe",
        ogTitle: "Open Graph Title",
        ogDescription: "Social media description",
        ogImage: "https://example.com/og-image.jpg",
        twitterCard: "summary_large_image",
        canonicalUrl: "https://example.com/my-page",
        favicon: {
          default: "/favicon.ico",
          apple: "/apple-touch-icon.png"
        }
      }}
      titleSuffix=" - My Site"
      defaultTitle="Welcome"
    >
      <div>Page content here</div>
    </HeadManager>
  );
}`;

  return (
    <>
      <Navigation />
      <HeadManager
        metadata={{
          title: "SEO & Metadata Examples",
          description:
            "Complete guide to SEO, structured data, and metadata management with React Jedi",
          keywords: ["SEO", "structured data", "microdata", "JSON-LD", "React", "metadata"],
          ogTitle: "React Jedi SEO & Metadata Guide",
          ogDescription: "Learn to implement structured data, microdata, and meta tags",
          canonicalUrl: "/examples/seo-metadata",
        }}
      />
      <main className="container mx-auto px-4 pb-12 pt-20">
        {render(basicMetadataSpec)}

        <Tabs defaultValue="structured-data" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="structured-data">Structured Data</TabsTrigger>
            <TabsTrigger value="metadata">Meta Tags</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="code">Code Samples</TabsTrigger>
          </TabsList>

          <TabsContent value="structured-data">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>JSON-LD Structured Data</CardTitle>
                  <CardDescription>
                    The recommended format for structured data. Clean, separate from HTML.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StructuredDataDemo />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Microdata</CardTitle>
                  <CardDescription>
                    Embed structured data directly in HTML using special attributes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MicrodataDemo />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metadata">
            {render(completeMetadataSpec)}
            {render(faviconSpec)}
          </TabsContent>

          <TabsContent value="examples">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rich Snippets</CardTitle>
                  <CardDescription>Enable enhanced search results</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Product ratings and prices</li>
                    <li>Recipe cards with images</li>
                    <li>Event dates and locations</li>
                    <li>Article author and publish date</li>
                    <li>FAQ expandable results</li>
                    <li>Video thumbnails and duration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Schema Types</CardTitle>
                  <CardDescription>Supported schema.org types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Organization & Person</li>
                    <li>Article & BlogPosting</li>
                    <li>Product & Offer</li>
                    <li>Event & Place</li>
                    <li>Recipe & FAQPage</li>
                    <li>Video & BreadcrumbList</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Testing Tools</CardTitle>
                <CardDescription>Validate your structured data implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Google Rich Results Test</h4>
                    <p className="text-sm text-muted-foreground">
                      Test how your pages might appear in Google Search results
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Schema.org Validator</h4>
                    <p className="text-sm text-muted-foreground">
                      Validate your structured data against schema.org specifications
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Facebook Sharing Debugger</h4>
                    <p className="text-sm text-muted-foreground">
                      Preview how your content appears when shared on Facebook
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Twitter Card Validator</h4>
                    <p className="text-sm text-muted-foreground">
                      Check how your Twitter Cards will display
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>JSON-LD Example</CardTitle>
                  <CardDescription>Using structured data with React hooks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Code language="typescript" code={jsonLdExample} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Microdata Example</CardTitle>
                  <CardDescription>Embedding structured data in HTML</CardDescription>
                </CardHeader>
                <CardContent>
                  <Code language="typescript" code={microdataExample} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Head Manager Example</CardTitle>
                  <CardDescription>Complete metadata management</CardDescription>
                </CardHeader>
                <CardContent>
                  <Code language="typescript" code={headManagerExample} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>SEO Best Practices</CardTitle>
            <CardDescription>Guidelines for optimal search engine optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">📊 Structured Data</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Use JSON-LD for cleaner implementation</li>
                  <li>Test with Google Rich Results Test</li>
                  <li>Keep data accurate and up-to-date</li>
                  <li>Include all required properties</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">🏷️ Meta Tags</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Unique title and description per page</li>
                  <li>Optimal lengths (60/155 characters)</li>
                  <li>Include target keywords naturally</li>
                  <li>Use Open Graph for social sharing</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">🔗 Technical SEO</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Set canonical URLs correctly</li>
                  <li>Implement proper redirects</li>
                  <li>Create XML sitemaps</li>
                  <li>Optimize page load speed</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">📱 Mobile & Social</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Mobile-first responsive design</li>
                  <li>Twitter Card implementation</li>
                  <li>Open Graph optimization</li>
                  <li>High-quality preview images</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default SEOMetadataPage;
