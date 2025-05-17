/**
 * Rich Snippet Presets
 * Common patterns and configurations for rich snippets
 */

import {
  generateArticleSnippet,
  generateOrganizationSnippet,
  generateProductSnippet,
  generateLocalBusinessSnippet,
  generateBreadcrumbSnippet,
  createBreadcrumbItems,
  generateFAQSnippet,
  createFAQItems,
} from "./generators";
import { ArticleSnippet, LocalBusinessSnippet, OrganizationSnippet, ProductSnippet } from "./types";

/**
 * Blog post preset - creates an Article snippet with common blog fields
 */
export function createBlogPostSnippet(params: {
  title: string;
  description: string;
  author: string;
  publishedDate: Date;
  modifiedDate?: Date;
  imageUrl?: string;
  organizationName: string;
  organizationLogo?: string;
  url: string;
}): ArticleSnippet {
  return generateArticleSnippet(
    {
      headline: params.title,
      description: params.description,
      datePublished: params.publishedDate.toISOString(),
      dateModified: params.modifiedDate?.toISOString() || params.publishedDate.toISOString(),
      author: {
        "@type": "Person",
        name: params.author,
      },
      publisher: {
        "@type": "Organization",
        name: params.organizationName,
        ...(params.organizationLogo && {
          logo: {
            "@type": "ImageObject",
            url: params.organizationLogo,
          },
        }),
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": params.url,
      },
      ...(params.imageUrl && { image: params.imageUrl }),
    },
    "BlogPosting"
  );
}

/**
 * E-commerce product preset - creates a Product snippet with common fields
 */
export function createEcommerceProductSnippet(params: {
  name: string;
  description: string;
  price: number;
  currency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  brand: string;
  images?: string[];
  rating?: {
    value: number;
    count: number;
  };
  sku?: string;
  url?: string;
}): ProductSnippet {
  return generateProductSnippet({
    name: params.name,
    description: params.description,
    ...(params.images && { image: params.images }),
    brand: {
      "@type": "Brand",
      name: params.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: params.currency,
      price: params.price.toString(),
      availability: `https://schema.org/${params.availability}`,
      ...(params.url && { url: params.url }),
    },
    ...(params.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: params.rating.value,
        ratingCount: params.rating.count,
      },
    }),
    ...(params.sku && { sku: params.sku }),
  });
}

/**
 * Company organization preset - creates an Organization snippet
 */
export function createCompanySnippet(params: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  socialProfiles?: string[];
  contactInfo?: {
    phone: string;
    email?: string;
    type: string;
  }[];
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}): OrganizationSnippet {
  return generateOrganizationSnippet({
    name: params.name,
    url: params.url,
    ...(params.logo && { logo: params.logo }),
    ...(params.description && { description: params.description }),
    ...(params.socialProfiles && { sameAs: params.socialProfiles }),
    ...(params.contactInfo && {
      contactPoint: params.contactInfo.map((contact) => ({
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: contact.type,
        ...(contact.email && { email: contact.email }),
      })),
    }),
    ...(params.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: params.address.street,
        addressLocality: params.address.city,
        addressRegion: params.address.state,
        postalCode: params.address.postalCode,
        addressCountry: params.address.country,
      },
    }),
  });
}

/**
 * Local business preset - creates a LocalBusiness snippet
 */
export function createLocalBusinessSnippet(params: {
  name: string;
  telephone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  images?: string[];
  openingHours?: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>;
  rating?: {
    value: number;
    count: number;
  };
  url?: string;
}): LocalBusinessSnippet {
  return generateLocalBusinessSnippet({
    name: params.name,
    telephone: params.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: params.address.street,
      addressLocality: params.address.city,
      addressRegion: params.address.state,
      postalCode: params.address.postalCode,
      addressCountry: params.address.country,
    },
    ...(params.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: params.coordinates.latitude,
        longitude: params.coordinates.longitude,
      },
    }),
    ...(params.priceRange && { priceRange: params.priceRange }),
    ...(params.images && { image: params.images }),
    ...(params.openingHours && {
      openingHoursSpecification: params.openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.days,
        opens: hours.opens,
        closes: hours.closes,
      })),
    }),
    ...(params.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: params.rating.value,
        reviewCount: params.rating.count,
      },
    }),
    ...(params.url && { url: params.url }),
  });
}

/**
 * Website breadcrumb preset - creates a breadcrumb trail
 */
export function createWebsiteBreadcrumbs(
  pages: Array<{
    name: string;
    url?: string;
  }>
) {
  return generateBreadcrumbSnippet({
    itemListElement: createBreadcrumbItems(pages),
  });
}

/**
 * FAQ page preset - creates a FAQ snippet from Q&A pairs
 */
export function createFAQPageSnippet(
  faqs: Array<{
    question: string;
    answer: string;
  }>
) {
  return generateFAQSnippet({
    mainEntity: createFAQItems(faqs),
  });
}

/**
 * Website with search preset - adds search action to organization
 */
export function createWebsiteWithSearch(params: {
  name: string;
  url: string;
  searchUrl: string;
  logo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: params.name,
    url: params.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${params.searchUrl}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    ...(params.logo && {
      publisher: {
        "@type": "Organization",
        name: params.name,
        logo: {
          "@type": "ImageObject",
          url: params.logo,
        },
      },
    }),
  };
}
