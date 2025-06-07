# ExtendedHeadManager SDUI Support

The ExtendedHeadManager component is fully supported in SDUI (Server-Driven UI) mode, providing comprehensive SEO and metadata management capabilities through JSON specifications.

## Overview

ExtendedHeadManager extends the base HeadManager component with structured data support, allowing you to manage:
- Document title and meta tags
- Open Graph metadata
- Twitter Card metadata
- JSON-LD structured data for SEO
- Multiple schema types (Organization, Article, Product, FAQ, etc.)

## SDUI Usage

### Basic Example

```json
{
  "type": "ExtendedHeadManager",
  "metadata": {
    "title": "My Page Title",
    "description": "Page description for SEO",
    "keywords": ["keyword1", "keyword2"],
    "author": "Author Name",
    "ogTitle": "Open Graph Title",
    "ogDescription": "Open Graph Description",
    "ogImage": "https://example.com/image.jpg",
    "ogType": "website",
    "canonicalUrl": "https://example.com/page"
  },
  "children": {
    "type": "Container",
    "children": "Your page content here"
  }
}
```

### With Structured Data

```json
{
  "type": "extended-head-manager",
  "metadata": {
    "title": "Product Page - Widget Pro",
    "description": "Professional-grade widget for advanced users"
  },
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Widget Pro",
    "description": "Professional widget with advanced features",
    "brand": {
      "@type": "Organization",
      "name": "Widget Co"
    },
    "offers": {
      "@type": "Offer",
      "price": "99.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }
}
```

### Multiple Schemas

```json
{
  "type": "ExtendedHeadManager",
  "structuredData": [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "My Company",
      "url": "https://mycompany.com"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://mycompany.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://mycompany.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

## Supported Type Aliases

The component can be referenced using any of these type names:
- `"extended-head-manager"` (kebab-case)
- `"extendedHeadManager"` (camelCase)
- `"ExtendedHeadManager"` (PascalCase)

## Metadata Properties

All properties from the base HeadManager are supported:

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Page title |
| `description` | string | Meta description |
| `keywords` | string[] | Meta keywords |
| `author` | string | Meta author |
| `ogTitle` | string | Open Graph title |
| `ogDescription` | string | Open Graph description |
| `ogImage` | string | Open Graph image URL |
| `ogType` | string | Open Graph type (website, article, product, etc.) |
| `ogUrl` | string | Open Graph URL |
| `twitterCard` | string | Twitter card type |
| `twitterSite` | string | Twitter @username |
| `twitterCreator` | string | Twitter creator @username |
| `canonicalUrl` | string | Canonical URL |
| `favicon` | string | Favicon URL |
| `titleSuffix` | string | Suffix added to all titles |
| `titleTemplate` | string | Template for title formatting |

## Structured Data Schemas

ExtendedHeadManager supports all Schema.org types, including:

### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://company.com",
  "logo": "https://company.com/logo.png",
  "sameAs": [
    "https://facebook.com/company",
    "https://twitter.com/company"
  ]
}
```

### Article
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-15T08:00:00Z",
  "image": "https://example.com/article-image.jpg"
}
```

### Product
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "brand": {
    "@type": "Organization",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD"
  }
}
```

### FAQ
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SDUI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Server-Driven UI is an architectural pattern..."
      }
    }
  ]
}
```

## Best Practices

1. **One ExtendedHeadManager per page**: Only use one instance to avoid conflicts
2. **Complete metadata**: Provide comprehensive metadata for better SEO
3. **Valid structured data**: Ensure your JSON-LD follows Schema.org specifications
4. **Test with validators**: Use Google's Rich Results Test to validate structured data
5. **Dynamic updates**: The component properly handles dynamic metadata changes

## Testing

A comprehensive test file is available at `/test-extended-head-manager.html` that demonstrates:
- Basic metadata management
- Various structured data schemas
- Multiple schemas support
- Dynamic updates
- Console logging for debugging

## Limitations and Considerations

- Head management works fully in SDUI mode with no limitations
- All metadata changes are properly cleaned up when the component unmounts
- Multiple ExtendedHeadManager instances will override each other's settings
- For SSR applications, ensure metadata is set server-side for optimal SEO

## Example Implementation

```javascript
import { render } from '@alexberriman/react-jedi';

const spec = {
  type: "ExtendedHeadManager",
  metadata: {
    title: "My SDUI App",
    description: "Built with React Jedi"
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "My SDUI App",
    "applicationCategory": "BusinessApplication"
  },
  children: {
    type: "Container",
    children: "App content"
  }
};

const element = render(spec);
```

## Conclusion

ExtendedHeadManager provides full SEO and metadata management capabilities in SDUI mode, making it possible to build SEO-friendly applications using server-driven UI patterns. The component handles all the complexities of managing document head elements while providing a simple JSON-based API.