/**
 * Integration between the specification system and rich snippets
 */

import { ComponentSpec } from "../../../types/schema/components";
import { RichSnippet } from "./types";
import {
  generateProductSnippet,
  generateArticleSnippet,
  generateFAQSnippet,
  generateBreadcrumbSnippet,
  generateOrganizationSnippet,
  generateEventSnippet,
  generateLocalBusinessSnippet,
  createBreadcrumbItems,
  createFAQItems,
} from "./generators";

// Type for component specifications with specific properties
interface ExtendedComponentSpec {
  metadata?: {
    richSnippet?: RichSnippet;
  };
  [key: string]: unknown;
}

// Type for FAQ items
interface FAQItem {
  question: string;
  answer: string;
}

// Type for breadcrumb items
interface BreadcrumbItem {
  name: string;
  url?: string;
  href?: string;
}

// Type for contact points
interface ContactPoint {
  phone?: string;
  telephone?: string;
  type?: string;
}

// Type for opening hours
interface OpeningHours {
  days?: string[];
  dayOfWeek?: string[];
  opens?: string;
  openTime?: string;
  closes?: string;
  closeTime?: string;
}

// Interface for product spec properties
interface ProductSpecProps extends ExtendedComponentSpec {
  name?: string;
  description?: string;
  image?: string | string[];
  brand?: string | { name: string };
  price?: string | number;
  currency?: string;
  availability?: string;
  url?: string;
  rating?: number | { value: number; count: number };
  sku?: string;
}

// Interface for article spec properties
interface ArticleSpecProps extends ExtendedComponentSpec {
  title?: string;
  author?: string | { name: string };
  publishDate?: string;
  publisher?: {
    name: string;
    logo?: string;
  };
  siteName?: string;
  description?: string;
  modifiedDate?: string;
  image?: string | string[];
  url?: string;
  articleType?: string;
}

// Interface for FAQ spec properties
interface FAQSpecProps extends ExtendedComponentSpec {
  items?: unknown[];
}

// Interface for breadcrumb spec properties
interface BreadcrumbSpecProps extends ExtendedComponentSpec {
  items?: unknown[];
}

// Interface for organization spec properties
interface OrganizationSpecProps extends ExtendedComponentSpec {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  socialProfiles?: string[];
  contactPoints?: ContactPoint[];
  address?: {
    street?: string;
    streetAddress?: string;
    city?: string;
    addressLocality?: string;
    state?: string;
    addressRegion?: string;
    zip?: string;
    postalCode?: string;
    country?: string;
    addressCountry?: string;
  };
}

// Interface for event spec properties
interface EventSpecProps extends ExtendedComponentSpec {
  name?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  image?: string | string[];
  location?: string | EventLocation;
  organizer?: string | EventOrganizer;
  performer?: string | { name: string };
  offers?: {
    url?: string;
    price?: string | number;
    currency?: string;
    availability?: string;
  };
}

// Interface for local business spec properties
interface LocalBusinessSpecProps extends ExtendedComponentSpec {
  name?: string;
  address?: {
    street?: string;
    streetAddress?: string;
    city?: string;
    addressLocality?: string;
    state?: string;
    addressRegion?: string;
    zip?: string;
    postalCode?: string;
    country?: string;
    addressCountry?: string;
  };
  telephone?: string;
  geo?: {
    latitude?: number;
    lat?: number;
    longitude?: number;
    lng?: number;
  };
  priceRange?: string;
  image?: string | string[];
  openingHours?: OpeningHours[];
  rating?: number | { value: number; count: number };
  url?: string;
}

/**
 * Extracts rich snippet data from a component specification
 */
export function extractRichSnippetFromSpec(spec: ComponentSpec): RichSnippet | null {
  // Cast spec to ExtendedComponentSpec to access metadata properties
  const extendedSpec = spec as ExtendedComponentSpec;

  // Check for explicit rich snippet data in metadata
  if (extendedSpec.metadata?.richSnippet) {
    return extendedSpec.metadata.richSnippet;
  }

  // Auto-detect based on component type and properties
  switch (spec.type) {
    case "ProductCard":
    case "Product": {
      return extractProductSnippet(spec);
    }

    case "Article":
    case "BlogPost": {
      return extractArticleSnippet(spec);
    }

    case "FAQ":
    case "FAQAccordion": {
      return extractFAQSnippet(spec);
    }

    case "Breadcrumb": {
      return extractBreadcrumbSnippet(spec);
    }

    case "Organization":
    case "CompanyInfo": {
      return extractOrganizationSnippet(spec);
    }

    case "Event":
    case "EventCard": {
      return extractEventSnippet(spec);
    }

    case "LocalBusiness":
    case "BusinessCard": {
      return extractLocalBusinessSnippet(spec);
    }

    default: {
      return null;
    }
  }
}

/**
 * Extract product snippet from specification
 */
function extractProductSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as ProductSpecProps;
  if (!props?.name) return null;

  return generateProductSnippet({
    name: props.name,
    ...(props.description && { description: props.description }),
    ...(props.image && { image: Array.isArray(props.image) ? props.image : [props.image] }),
    ...(props.brand && {
      brand: {
        "@type": "Brand",
        name: typeof props.brand === "string" ? props.brand : props.brand.name,
      },
    }),
    ...(props.price &&
      props.currency && {
        offers: {
          "@type": "Offer",
          price: props.price,
          priceCurrency: props.currency,
          availability: props.availability || "https://schema.org/InStock",
          ...(props.url && { url: props.url }),
        },
      }),
    ...(props.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: typeof props.rating === "object" ? props.rating.value : props.rating,
        ratingCount: typeof props.rating === "object" ? props.rating.count : 1,
      },
    }),
    ...(props.sku && { sku: props.sku }),
  });
}

/**
 * Extract article snippet from specification
 */
function extractArticleSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as ArticleSpecProps;
  if (!props?.title || !props?.author || !props?.publishDate) return null;

  return generateArticleSnippet(
    {
      headline: props.title,
      datePublished: props.publishDate,
      author: {
        "@type": "Person",
        name: typeof props.author === "string" ? props.author : props.author.name,
      },
      publisher: {
        "@type": "Organization",
        name: props.publisher?.name || props.siteName || "Publisher",
        ...(props.publisher?.logo && {
          logo: {
            "@type": "ImageObject",
            url: props.publisher.logo,
          },
        }),
      },
      ...(props.description && { description: props.description }),
      ...(props.modifiedDate && { dateModified: props.modifiedDate }),
      ...(props.image && { image: Array.isArray(props.image) ? props.image : [props.image] }),
      ...(props.url && {
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.url,
        },
      }),
    },
    (props.articleType as "Article" | "NewsArticle" | "BlogPosting") || "Article"
  );
}

/**
 * Extract FAQ snippet from specification
 */
function extractFAQSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as FAQSpecProps;
  if (!props?.items || !Array.isArray(props.items)) return null;

  const faqs = props.items
    .filter(
      (item: unknown): item is FAQItem =>
        typeof item === "object" && item !== null && "question" in item && "answer" in item
    )
    .map((item: FAQItem) => ({
      question: item.question,
      answer: item.answer,
    }));

  if (faqs.length === 0) return null;

  return generateFAQSnippet({
    mainEntity: createFAQItems(faqs),
  });
}

/**
 * Extract breadcrumb snippet from specification
 */
function extractBreadcrumbSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as BreadcrumbSpecProps;
  if (!props?.items || !Array.isArray(props.items)) return null;

  const breadcrumbs = props.items
    .filter(
      (item: unknown): item is BreadcrumbItem =>
        typeof item === "object" && item !== null && "name" in item
    )
    .map((item: BreadcrumbItem) => ({
      name: item.name,
      url: item.url || item.href,
    }));

  if (breadcrumbs.length === 0) return null;

  return generateBreadcrumbSnippet({
    itemListElement: createBreadcrumbItems(breadcrumbs),
  });
}

/**
 * Extract organization snippet from specification
 */
function extractOrganizationSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as OrganizationSpecProps;
  if (!props?.name || !props?.url) return null;

  return generateOrganizationSnippet({
    name: props.name,
    url: props.url,
    ...(props.logo && { logo: props.logo }),
    ...(props.description && { description: props.description }),
    ...(props.socialProfiles && { sameAs: props.socialProfiles }),
    ...(props.contactPoints && {
      contactPoint: props.contactPoints
        .filter((contact: ContactPoint) => contact.phone || contact.telephone)
        .map((contact: ContactPoint) => ({
          "@type": "ContactPoint",
          telephone: (contact.phone || contact.telephone) as string,
          contactType: contact.type || "customer service",
        })),
    }),
    ...(props.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: props.address.street || props.address.streetAddress,
        addressLocality: props.address.city || props.address.addressLocality,
        addressRegion: props.address.state || props.address.addressRegion,
        postalCode: props.address.zip || props.address.postalCode,
        addressCountry: props.address.country || props.address.addressCountry,
      },
    }),
  });
}

interface EventAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface EventLocation {
  name: string;
  address?: EventAddress;
}

interface EventOrganizer {
  name: string;
  url?: string;
}

/**
 * Extract event location from props
 */
function extractEventLocation(location: string | EventLocation): {
  "@type": "Place";
  name: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
} {
  const baseLocation = {
    "@type": "Place" as const,
    name: typeof location === "string" ? location : location.name,
  };

  if (typeof location === "object" && location.address) {
    return {
      ...baseLocation,
      address: {
        "@type": "PostalAddress" as const,
        streetAddress: location.address.street,
        addressLocality: location.address.city,
        addressRegion: location.address.state,
        postalCode: location.address.zip,
        addressCountry: location.address.country,
      },
    };
  }

  return baseLocation;
}

/**
 * Extract event organizer from props
 */
function extractEventOrganizer(organizer: string | EventOrganizer): {
  "@type": "Organization";
  name: string;
  url?: string;
} {
  const baseOrganizer = {
    "@type": "Organization" as const,
    name: typeof organizer === "string" ? organizer : organizer.name,
  };

  if (typeof organizer === "object" && organizer.url) {
    return { ...baseOrganizer, url: organizer.url };
  }

  return baseOrganizer;
}

/**
 * Extract event snippet from specification
 */
function extractEventSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as EventSpecProps;
  if (!props?.name || !props?.startDate || !props?.location) return null;

  return generateEventSnippet({
    name: props.name,
    startDate: props.startDate,
    ...(props.endDate && { endDate: props.endDate }),
    ...(props.description && { description: props.description }),
    ...(props.image && { image: Array.isArray(props.image) ? props.image : [props.image] }),
    location: extractEventLocation(props.location),
    ...(props.organizer && { organizer: extractEventOrganizer(props.organizer) }),
    ...(props.performer && {
      performer: {
        "@type": "Person",
        name: typeof props.performer === "string" ? props.performer : props.performer.name,
      },
    }),
    ...(props.offers && {
      offers: {
        "@type": "Offer",
        ...(props.offers.url && { url: props.offers.url }),
        ...(props.offers.price && { price: String(props.offers.price) }),
        ...(props.offers.currency && { priceCurrency: props.offers.currency }),
        ...(props.offers.availability && { availability: props.offers.availability }),
      },
    }),
  });
}

/**
 * Extract local business snippet from specification
 */
function extractLocalBusinessSnippet(spec: ComponentSpec): RichSnippet | null {
  const props = spec as LocalBusinessSpecProps;
  if (!props?.name || !props?.address || !props?.telephone) return null;

  return generateLocalBusinessSnippet({
    name: props.name,
    telephone: props.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: props.address.street || props.address.streetAddress || "",
      addressLocality: props.address.city || props.address.addressLocality || "",
      addressRegion: props.address.state || props.address.addressRegion || "",
      postalCode: props.address.zip || props.address.postalCode || "",
      addressCountry: props.address.country || props.address.addressCountry || "",
    },
    ...(props.geo &&
      (props.geo.latitude || props.geo.lat) &&
      (props.geo.longitude || props.geo.lng) && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: (props.geo.latitude || props.geo.lat) as number,
          longitude: (props.geo.longitude || props.geo.lng) as number,
        },
      }),
    ...(props.priceRange && { priceRange: props.priceRange }),
    ...(props.image && { image: Array.isArray(props.image) ? props.image : [props.image] }),
    ...(props.openingHours && {
      openingHoursSpecification: props.openingHours
        .filter(
          (hours: OpeningHours) =>
            (hours.days || hours.dayOfWeek) &&
            (hours.opens || hours.openTime) &&
            (hours.closes || hours.closeTime)
        )
        .map((hours: OpeningHours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: (hours.days || hours.dayOfWeek) as string | string[],
          opens: (hours.opens || hours.openTime) as string,
          closes: (hours.closes || hours.closeTime) as string,
        })),
    }),
    ...(props.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: typeof props.rating === "object" ? props.rating.value : props.rating,
        reviewCount: typeof props.rating === "object" ? props.rating.count : 1,
      },
    }),
    ...(props.url && { url: props.url }),
  });
}

/**
 * Extract all rich snippets from a specification tree
 */
export function extractAllRichSnippets(spec: ComponentSpec): RichSnippet[] {
  const snippets: RichSnippet[] = [];

  // Extract from current component
  const snippet = extractRichSnippetFromSpec(spec);
  if (snippet) {
    snippets.push(snippet);
  }

  // Extract from children recursively
  if (spec.children) {
    if (Array.isArray(spec.children)) {
      for (const child of spec.children) {
        if (typeof child === "object" && child !== null) {
          snippets.push(...extractAllRichSnippets(child as ComponentSpec));
        }
      }
    } else if (typeof spec.children === "object" && spec.children != null) {
      snippets.push(...extractAllRichSnippets(spec.children as ComponentSpec));
    }
  }

  return snippets;
}
