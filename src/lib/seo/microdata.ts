/**
 * Microdata implementation for structured data
 * Alternative to JSON-LD that embeds metadata directly into HTML elements
 */

export interface MicrodataAttributes {
  itemScope?: boolean;
  itemType?: string;
  itemProp?: string;
  itemId?: string;
  itemRef?: string;
}

export interface MicrodataSchema {
  type: string;
  properties: MicrodataProperties;
  id?: string;
  ref?: string;
}

export interface MicrodataProperties {
  [key: string]: unknown;
}

export interface NestedMicrodataSchema extends Omit<MicrodataSchema, "properties"> {
  properties: MicrodataProperties & {
    [key: string]:
      | string
      | number
      | boolean
      | NestedMicrodataSchema
      | NestedMicrodataSchema[]
      | undefined;
  };
}

// Type definitions for specific schema structures
export interface MicrodataBreadcrumbListSchema extends MicrodataSchema {
  type: "BreadcrumbList";
  properties: {
    itemListElement: Array<{
      type: "ListItem";
      properties: {
        position: number;
        item: {
          type: "Thing";
          id?: string;
          properties: {
            name: string;
          };
        };
      };
    }>;
  };
}

export interface MicrodataContactPointSchema {
  type: "ContactPoint";
  properties: {
    telephone?: string;
    contactType?: string;
  };
}

export interface MicrodataPostalAddressSchema {
  type: "PostalAddress";
  properties: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export interface MicrodataOrganizationSchema extends MicrodataSchema {
  type: "Organization";
  properties: {
    name: string;
    url?: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    contactPoint?: MicrodataContactPointSchema;
    address?: MicrodataPostalAddressSchema;
  };
}

export interface MicrodataPersonSchema {
  type: "Person";
  properties: {
    name: string;
    url?: string;
  };
}

export interface MicrodataArticleSchema extends MicrodataSchema {
  type: "Article";
  properties: {
    headline: string;
    datePublished: string;
    author: string | MicrodataPersonSchema;
    dateModified?: string;
    description?: string;
    image?: string | string[];
    publisher?: {
      type: "Organization";
      properties: {
        name: string;
        logo?: string;
      };
    };
  };
}

export interface MicrodataOfferSchema {
  type: "Offer";
  properties: {
    price: string | number;
    priceCurrency: string;
    availability?: string;
    url?: string;
  };
}

export interface MicrodataAggregateRatingSchema {
  type: "AggregateRating";
  properties: {
    ratingValue: number;
    reviewCount: number;
  };
}

export interface MicrodataProductSchema extends MicrodataSchema {
  type: "Product";
  properties: {
    name: string;
    description?: string;
    image?: string | string[];
    brand?: string | { type: "Organization"; properties: { name: string } };
    offers?: MicrodataOfferSchema;
    aggregateRating?: MicrodataAggregateRatingSchema;
  };
}

// Common schema.org item types with their microdata representation
export const SCHEMA_TYPES = {
  Organization: "https://schema.org/Organization",
  Person: "https://schema.org/Person",
  Article: "https://schema.org/Article",
  BlogPosting: "https://schema.org/BlogPosting",
  Product: "https://schema.org/Product",
  Event: "https://schema.org/Event",
  Recipe: "https://schema.org/Recipe",
  VideoObject: "https://schema.org/VideoObject",
  WebSite: "https://schema.org/WebSite",
  BreadcrumbList: "https://schema.org/BreadcrumbList",
  ListItem: "https://schema.org/ListItem",
  Question: "https://schema.org/Question",
  Answer: "https://schema.org/Answer",
  FAQPage: "https://schema.org/FAQPage",
  Review: "https://schema.org/Review",
  Rating: "https://schema.org/Rating",
  AggregateRating: "https://schema.org/AggregateRating",
  PostalAddress: "https://schema.org/PostalAddress",
  ContactPoint: "https://schema.org/ContactPoint",
  Place: "https://schema.org/Place",
  Thing: "https://schema.org/Thing",
} as const;

/**
 * Generate microdata attributes for an HTML element
 */
export function generateMicrodataAttributes(
  schema:
    | MicrodataSchema
    | MicrodataBreadcrumbListSchema
    | MicrodataOrganizationSchema
    | MicrodataArticleSchema
    | MicrodataProductSchema
): MicrodataAttributes {
  const attributes: MicrodataAttributes = {};

  if (schema.type) {
    attributes.itemScope = true;
    attributes.itemType = SCHEMA_TYPES[schema.type as keyof typeof SCHEMA_TYPES] ?? schema.type;
  }

  if (schema.id) {
    attributes.itemId = schema.id;
  }

  if (schema.ref) {
    attributes.itemRef = schema.ref;
  }

  return attributes;
}

/**
 * Convert React-friendly attribute names to HTML attribute names
 */
export function toHtmlAttributes(
  attributes: MicrodataAttributes
): Record<string, string | boolean> {
  const htmlAttrs: Record<string, string | boolean> = {};

  if (attributes.itemScope !== undefined) {
    htmlAttrs.itemscope = attributes.itemScope;
  }

  if (attributes.itemType) {
    htmlAttrs.itemtype = attributes.itemType;
  }

  if (attributes.itemProp) {
    htmlAttrs.itemprop = attributes.itemProp;
  }

  if (attributes.itemId) {
    htmlAttrs.itemid = attributes.itemId;
  }

  if (attributes.itemRef) {
    htmlAttrs.itemref = attributes.itemRef;
  }

  return htmlAttrs;
}

/**
 * Generate property attributes for nested items
 */
export function generatePropertyAttributes(propName: string): MicrodataAttributes {
  return {
    itemProp: propName,
  };
}

/**
 * Helper to create breadcrumb microdata structure
 */
export function createBreadcrumbMicrodata(
  items: Array<{ name: string; url?: string }>
): MicrodataBreadcrumbListSchema {
  return {
    type: "BreadcrumbList",
    properties: {
      itemListElement: items.map((item, index) => ({
        type: "ListItem",
        properties: {
          position: index + 1,
          item: {
            type: "Thing",
            id: item.url,
            properties: {
              name: item.name,
            },
          },
        },
      })),
    },
  };
}

/**
 * Helper to create organization microdata structure
 */
export function createOrganizationMicrodata(data: {
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    contactType?: string;
  };
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}): MicrodataOrganizationSchema {
  const microdata: MicrodataOrganizationSchema = {
    type: "Organization",
    properties: {
      name: data.name,
    },
  };

  if (data.url) microdata.properties.url = data.url;
  if (data.logo) microdata.properties.logo = data.logo;
  if (data.description) microdata.properties.description = data.description;
  if (data.sameAs) microdata.properties.sameAs = data.sameAs;

  if (data.contactPoint) {
    microdata.properties.contactPoint = {
      type: "ContactPoint",
      properties: {
        telephone: data.contactPoint.telephone,
        contactType: data.contactPoint.contactType,
      },
    };
  }

  if (data.address) {
    microdata.properties.address = {
      type: "PostalAddress",
      properties: {
        streetAddress: data.address.streetAddress,
        addressLocality: data.address.addressLocality,
        addressRegion: data.address.addressRegion,
        postalCode: data.address.postalCode,
        addressCountry: data.address.addressCountry,
      },
    };
  }

  return microdata;
}

/**
 * Helper to create article microdata structure
 */
export function createArticleMicrodata(data: {
  headline: string;
  author: string | { name: string; url?: string };
  datePublished: string;
  dateModified?: string;
  description?: string;
  image?: string | string[];
  publisher?: {
    name: string;
    logo?: string;
  };
}): MicrodataArticleSchema {
  const microdata: MicrodataArticleSchema = {
    type: "Article",
    properties: {
      headline: data.headline,
      datePublished: data.datePublished,
      author: "", // This will be set below
    },
  };

  microdata.properties.author =
    typeof data.author === "string"
      ? data.author
      : {
          type: "Person",
          properties: {
            name: data.author.name,
            url: data.author.url,
          },
        };

  if (data.dateModified) microdata.properties.dateModified = data.dateModified;
  if (data.description) microdata.properties.description = data.description;
  if (data.image) microdata.properties.image = data.image;

  if (data.publisher) {
    microdata.properties.publisher = {
      type: "Organization",
      properties: {
        name: data.publisher.name,
        logo: data.publisher.logo,
      },
    };
  }

  return microdata;
}

/**
 * Helper to create product microdata structure
 */
export function createProductMicrodata(data: {
  name: string;
  description?: string;
  image?: string | string[];
  brand?: string | { name: string };
  offers?: {
    price: string | number;
    priceCurrency: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}): MicrodataProductSchema {
  const microdata: MicrodataProductSchema = {
    type: "Product",
    properties: {
      name: data.name,
    },
  };

  if (data.description) microdata.properties.description = data.description;
  if (data.image) microdata.properties.image = data.image;

  if (data.brand) {
    microdata.properties.brand =
      typeof data.brand === "string"
        ? data.brand
        : {
            type: "Organization",
            properties: { name: data.brand.name },
          };
  }

  if (data.offers) {
    microdata.properties.offers = {
      type: "Offer",
      properties: {
        price: data.offers.price,
        priceCurrency: data.offers.priceCurrency,
        availability: data.offers.availability,
        url: data.offers.url,
      },
    };
  }

  if (data.aggregateRating) {
    microdata.properties.aggregateRating = {
      type: "AggregateRating",
      properties: {
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount,
      },
    };
  }

  return microdata;
}
