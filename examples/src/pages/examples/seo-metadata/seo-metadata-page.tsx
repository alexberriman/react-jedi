import React from "react";
import { render } from "@banja/react-jedi";
import { Navigation } from "@/components/layouts/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

const SEOMetadataPage: React.FC = () => {
  // SEO Metadata Example 1: Basic metadata
  const basicMetadataSpec = {
    type: "head-manager",
    metadata: {
      title: "SEO and Metadata Management",
      description:
        "Learn how to manage SEO metadata, Open Graph tags, and favicons with React Jedi",
      keywords: ["SEO", "metadata", "React", "Open Graph", "Twitter Cards"],
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
            text: "React Jedi provides built-in SEO metadata management through the HeadManager component.",
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
  const jsonExample = `{
  "type": "head-manager",
  "metadata": {
    "title": "My Page Title",
    "description": "Page description for SEO",
    "keywords": ["keyword1", "keyword2"],
    "ogTitle": "Open Graph Title",
    "ogDescription": "Social media description",
    "ogImage": "https://example.com/og-image.jpg",
    "canonicalUrl": "https://example.com/my-page"
  },
  "titleSuffix": " - My Site",
  "children": [/* your page content */]
}`;

  const tsxExample = `import { HeadManager } from "@banja/react-jedi";

function MyPage() {
  return (
    <HeadManager
      metadata={{
        title: "My Page Title",
        description: "Page description for SEO",
        ogTitle: "Open Graph Title",
        favicon: "/favicon.ico",
      }}
      titleSuffix=" - My Site"
    >
      <div>Page content here</div>
    </HeadManager>
  );
}`;

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 pb-12 pt-20">
        {render(basicMetadataSpec)}

        <Tabs defaultValue="examples" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="code">Code Samples</TabsTrigger>
          </TabsList>

          <TabsContent value="examples">
            {render(completeMetadataSpec)}
            {render(faviconSpec)}
          </TabsContent>

          <TabsContent value="code">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>JSON Schema Example</CardTitle>
                  <CardDescription>Using HeadManager with JSON specifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Code language="json" code={jsonExample} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>React Component Example</CardTitle>
                  <CardDescription>Using HeadManager directly in React</CardDescription>
                </CardHeader>
                <CardContent>
                  <Code language="typescript" code={tsxExample} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Additional Features</CardTitle>
            <CardDescription>Advanced metadata management capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">🔍 SEO Best Practices</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Automatic title suffix management</li>
                  <li>Default title fallback</li>
                  <li>Metadata cleanup on unmount</li>
                  <li>Previous values restoration</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">🌐 Social Media Support</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Open Graph protocol</li>
                  <li>Twitter Cards (all types)</li>
                  <li>Canonical URL handling</li>
                  <li>Multiple favicon formats</li>
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
