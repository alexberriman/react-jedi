import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";
import { PrevNextNavigation } from "../../../components/documentation";
import { getDocumentationNavigation } from "../../../lib/documentation-navigation";
import { useLocation } from "react-router-dom";

export function SEOMetadataPage() {
  usePageMetadata({
    title: "SEO & Metadata",
    description:
      "React Jedi SEO and metadata documentation - Configure meta tags, Open Graph, Twitter Cards, and structured data through JSON specifications.",
  });
  
  const location = useLocation();
  const { prev, next } = getDocumentationNavigation(location.pathname);
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        SEO & Metadata Management
      </h2>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          React Jedi provides comprehensive SEO and metadata management capabilities that work seamlessly
          with JSON specifications. Configure everything from basic meta tags to structured data through
          your server-driven UI specifications.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-900/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Metadata Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Page titles & descriptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Open Graph tags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Twitter Card metadata</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Canonical URLs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Favicon management</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-900/50">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Structured Data
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>JSON-LD support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Microdata attributes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Schema.org types</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Rich snippets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-gray-100 mr-2">•</span>
                  <span>Breadcrumbs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Basic SEO Configuration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Configure SEO metadata directly in your JSON specification using the <code>head-manager</code> component:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
{`{
  "type": "head-manager",
  "metadata": {
    "title": "My Product Page",
    "description": "Discover our amazing product that solves all your problems",
    "keywords": ["product", "solution", "innovation"],
    "author": "Your Company Name"
  },
  "children": [
    {
      "type": "container",
      "children": [
        {
          "type": "heading",
          "level": 1,
          "text": "Welcome to My Product"
        }
      ]
    }
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Complete SEO Configuration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          For comprehensive SEO optimization, include social media tags and additional metadata:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
{`{
  "type": "head-manager",
  "metadata": {
    "title": "Revolutionary Widget | ACME Corp",
    "description": "Transform your workflow with our innovative widget technology",
    "keywords": ["widget", "technology", "innovation", "productivity"],
    "author": "ACME Corporation",
    
    // Open Graph tags for Facebook, LinkedIn, etc.
    "ogTitle": "Revolutionary Widget by ACME",
    "ogDescription": "Experience the future of productivity",
    "ogImage": "https://example.com/images/widget-og.jpg",
    "ogType": "product",
    "ogUrl": "https://example.com/products/widget",
    
    // Twitter Card metadata
    "twitterCard": "summary_large_image",
    "twitterTitle": "Check out ACME's Revolutionary Widget!",
    "twitterDescription": "Game-changing technology that transforms workflows",
    "twitterImage": "https://example.com/images/widget-twitter.jpg",
    "twitterSite": "@acmecorp",
    "twitterCreator": "@acmecorp",
    
    // SEO essentials
    "canonicalUrl": "https://example.com/products/widget",
    "robots": "index, follow",
    
    // Favicon configuration
    "favicon": {
      "default": "/favicon.ico",
      "apple": "/apple-touch-icon.png",
      "png16": "/favicon-16x16.png",
      "png32": "/favicon-32x32.png",
      "png192": "/android-chrome-192x192.png",
      "png512": "/android-chrome-512x512.png"
    }
  },
  "titleSuffix": " | ACME Corp",
  "defaultTitle": "Welcome to ACME",
  "children": [
    // Your page content
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Server-Driven SEO
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          When using server-driven UI, your API can return dynamic SEO metadata based on the content:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="typescript" className="relative">
{`// Fetch page specification from your API
async function loadPage(pageId: string) {
  const response = await fetch(\`/api/pages/\${pageId}\`);
  const specification = await response.json();
  return specification;
}

// Example API response with dynamic SEO
{
  "type": "head-manager",
  "metadata": {
    "title": "iPhone 15 Pro - Latest Features",
    "description": "Discover the iPhone 15 Pro with titanium design, A17 Pro chip, and advanced camera system",
    "ogImage": "https://cdn.example.com/products/iphone-15-pro.jpg",
    "canonicalUrl": "https://example.com/products/iphone-15-pro"
  },
  "children": [
    // Dynamic page content
  ]
}

// Render the page with SEO metadata
const spec = await loadPage("iphone-15-pro");
render(spec);`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Metadata Properties Reference
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Complete list of available metadata properties:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>title</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Page title (appears in browser tab and search results)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>description</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Meta description for search engines (155-160 characters recommended)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>keywords</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string[]
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Array of keywords (less important for modern SEO)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>author</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Author or company name
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>ogTitle</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Open Graph title for social media sharing
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>ogDescription</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Open Graph description
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>ogImage</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Open Graph image URL (1200x630px recommended)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>twitterCard</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Type of Twitter card: &ldquo;summary&rdquo;, &ldquo;summary_large_image&rdquo;, &ldquo;app&rdquo;, or &ldquo;player&rdquo;
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>canonicalUrl</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Canonical URL to prevent duplicate content issues
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <code>favicon</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  string | object
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  Favicon path or object with multiple favicon formats
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Dynamic Metadata with Variables
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          You can use state values or data bindings in your metadata:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
{`{
  "state": {
    "product": {
      "name": "Ultra Widget Pro",
      "price": 99.99,
      "description": "Professional-grade widget for power users"
    }
  },
  "children": [
    {
      "type": "head-manager",
      "metadata": {
        "title": "$state.product.name",
        "description": "$state.product.description",
        "ogTitle": "$state.product.name - Only $$state.product.price"
      },
      "children": [
        // Product page content
      ]
    }
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Best Practices
        </h3>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">SEO Guidelines</h4>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Keep titles under 60 characters to avoid truncation</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Write descriptions between 150-160 characters</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Use high-quality images (1200x630px) for social sharing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Always set canonical URLs to avoid duplicate content</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Include structured data for rich search results</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Structured Data Support with ExtendedHeadManager
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          React Jedi now supports structured data (JSON-LD) through JSON specifications using the <code>extended-head-manager</code> component.
          This enables rich snippets in search results without writing any React code.
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
{`{
  "type": "extended-head-manager",
  "metadata": {
    "title": "Executive Anvil - Premium Quality",
    "description": "Sleek and durable executive anvil for professionals",
    "ogImage": "https://example.com/anvil-og.jpg"
  },
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Executive Anvil",
    "image": "https://example.com/anvil.jpg",
    "description": "Sleek and durable anvil for the modern executive",
    "sku": "0446310786",
    "brand": {
      "@type": "Organization",
      "name": "ACME Corporation"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://example.com/products/executive-anvil",
      "priceCurrency": "USD",
      "price": "119.99",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.4,
      "reviewCount": 89
    }
  },
  "children": [
    // Your product page content
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Multiple Structured Data Objects
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          You can include multiple structured data objects by passing an array:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="json" className="relative">
{`{
  "type": "extended-head-manager",
  "metadata": {
    "title": "ACME Corporation - Official Website"
  },
  "structuredData": [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ACME Corporation",
      "url": "https://example.com",
      "logo": "https://example.com/logo.png",
      "sameAs": [
        "https://facebook.com/acmecorp",
        "https://twitter.com/acmecorp",
        "https://linkedin.com/company/acmecorp"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://example.com",
      "name": "ACME Corporation",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://example.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ],
  "children": [
    // Page content
  ]
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Supported Schema Types
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          React Jedi supports all major Schema.org types for structured data:
        </p>

        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Content Types</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Article / BlogPosting</li>
              <li>• NewsArticle</li>
              <li>• WebPage</li>
              <li>• FAQPage</li>
              <li>• BreadcrumbList</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Commerce Types</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Product</li>
              <li>• Offer</li>
              <li>• AggregateRating</li>
              <li>• Review</li>
              <li>• Organization</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Other Types</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Person</li>
              <li>• Event</li>
              <li>• Recipe</li>
              <li>• VideoObject</li>
              <li>• WebSite</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Server-Driven SEO with Structured Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Your API can dynamically generate both metadata and structured data:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="typescript" className="relative">
{`// Example API endpoint returning complete SEO configuration
app.get('/api/products/:id', async (req, res) => {
  const product = await getProduct(req.params.id);
  
  res.json({
    type: "extended-head-manager",
    metadata: {
      title: \`\${product.name} - \${product.brand}\`,
      description: product.shortDescription,
      ogImage: product.socialImage,
      canonicalUrl: \`https://example.com/products/\${product.slug}\`
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.images,
      description: product.description,
      sku: product.sku,
      brand: {
        "@type": "Organization",
        name: product.brand
      },
      offers: {
        "@type": "Offer",
        url: product.url,
        priceCurrency: product.currency,
        price: product.price,
        availability: product.inStock ? 
          "https://schema.org/InStock" : 
          "https://schema.org/OutOfStock"
      },
      aggregateRating: product.rating ? {
        "@type": "AggregateRating",
        ratingValue: product.rating.average,
        reviewCount: product.rating.count
      } : undefined
    },
    children: [
      // Dynamic product page content
    ]
  });
});`}
          </CodeBlock>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Pro Tips</h4>
          <ul className="space-y-2 text-green-800 dark:text-green-200">
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>Use <code>extended-head-manager</code> when you need structured data support</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>Test your structured data with Google&apos;s Rich Results Test tool</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>Keep structured data in sync with your visible content</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>Include all required properties for each schema type</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          For more examples and implementation details, visit the <a href="/examples/seo-metadata" className="text-blue-600 dark:text-blue-400 hover:underline">SEO examples page</a>.
        </p>

        <PrevNextNavigation prev={prev} next={next} />
      </div>
    </div>
  );
}