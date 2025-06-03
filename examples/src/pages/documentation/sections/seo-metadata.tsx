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
    
    // Twitter Card metadata
    "twitterCard": "summary_large_image",
    "twitterTitle": "Check out ACME's Revolutionary Widget!",
    "twitterDescription": "Game-changing technology that transforms workflows",
    "twitterImage": "https://example.com/images/widget-twitter.jpg",
    
    // SEO essentials
    "canonicalUrl": "https://example.com/products/widget",
    
    // Favicon configuration
    "favicon": {
      "default": "/favicon.ico",
      "apple": "/apple-touch-icon.png",
      "icon16": "/favicon-16x16.png",
      "icon32": "/favicon-32x32.png",
      "manifest": "/site.webmanifest"
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
          Structured Data Support
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          For structured data and rich snippets, use the <code>ExtendedHeadManager</code> component
          or the structured data hooks. See the <a href="/examples/seo-metadata" className="text-blue-600 dark:text-blue-400 hover:underline">SEO examples page</a> for
          detailed implementation guides.
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 hidden"></div>
          <CodeBlock language="typescript" className="relative">
{`import { render, ExtendedHeadManager } from "@alexberriman/react-jedi";

const pageWithStructuredData = {
  "type": "ExtendedHeadManager",
  "metadata": {
    "title": "Product Name",
    "description": "Product description"
  },
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Executive Anvil",
    "description": "Sleek and durable anvil",
    "offers": {
      "@type": "Offer",
      "price": "119.99",
      "priceCurrency": "USD"
    }
  },
  "children": [
    // Page content
  ]
};`}
          </CodeBlock>
        </div>

        <PrevNextNavigation prev={prev} next={next} />
      </div>
    </div>
  );
}