export interface JsonLdSchema {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

export interface OrganizationSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType?: string;
    availableLanguage?: string | string[];
  };
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export interface PersonSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "Person";
  name: string;
  url?: string;
  email?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: OrganizationSchema;
  sameAs?: string[];
}

export interface WebSiteSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "WebSite";
  url: string;
  name?: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface ArticleSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "Article" | "BlogPosting" | "NewsArticle";
  headline: string;
  author: PersonSchema | string;
  datePublished: string;
  dateModified?: string;
  description?: string;
  image?: string | string[];
  publisher?: OrganizationSchema;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
}

export interface ProductSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "Product";
  name: string;
  description?: string;
  image?: string | string[];
  brand?: OrganizationSchema | string;
  offers?: {
    "@type": "Offer";
    url?: string;
    priceCurrency: string;
    price: string | number;
    priceValidUntil?: string;
    itemCondition?: string;
    availability?: string;
    seller?: OrganizationSchema;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
}

export interface BreadcrumbSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface EventSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "Event";
  name: string;
  startDate: string;
  endDate?: string;
  description?: string;
  location?: {
    "@type": "Place";
    name: string;
    address?: {
      "@type": "PostalAddress";
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
  };
  image?: string | string[];
  offers?: {
    "@type": "Offer";
    url?: string;
    price?: string | number;
    priceCurrency?: string;
    availability?: string;
    validFrom?: string;
  };
  performer?: PersonSchema | OrganizationSchema;
  organizer?: OrganizationSchema;
}

export interface FAQSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface VideoSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  interactionStatistic?: {
    "@type": "InteractionCounter";
    interactionType: { "@type": "WatchAction" };
    userInteractionCount: number;
  };
}

export interface RecipeSchema extends Omit<JsonLdSchema, "@type"> {
  "@type": "Recipe";
  name: string;
  image?: string | string[];
  author?: PersonSchema | string;
  datePublished?: string;
  description?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  keywords?: string;
  recipeYield?: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  nutrition?: {
    "@type": "NutritionInformation";
    calories?: string;
    carbohydrateContent?: string;
    proteinContent?: string;
    fatContent?: string;
    saturatedFatContent?: string;
    cholesterolContent?: string;
    sodiumContent?: string;
    fiberContent?: string;
    sugarContent?: string;
  };
  recipeIngredient?: string[];
  recipeInstructions?: Array<{
    "@type": "HowToStep";
    name?: string;
    text: string;
    url?: string;
    image?: string;
  }>;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    ratingCount: number;
  };
  video?: VideoSchema;
}

export type StructuredDataSchema =
  | OrganizationSchema
  | PersonSchema
  | WebSiteSchema
  | ArticleSchema
  | ProductSchema
  | BreadcrumbSchema
  | EventSchema
  | FAQSchema
  | VideoSchema
  | RecipeSchema
  | JsonLdSchema;

export function generateJsonLd(schema: StructuredDataSchema): string {
  return JSON.stringify(schema, null, 2);
}

export function addJsonLdToDocument(schema: StructuredDataSchema): void {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = generateJsonLd(schema);
  script.dataset.structuredData = "true";
  document.head.append(script);
}

export function removeJsonLdFromDocument(): void {
  const scripts = document.querySelectorAll('script[data-structured-data="true"]');
  for (const script of scripts) script.remove();
}

export function updateJsonLdInDocument(schema: StructuredDataSchema): void {
  removeJsonLdFromDocument();
  addJsonLdToDocument(schema);
}
