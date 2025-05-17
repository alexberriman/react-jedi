/**
 * Rich Snippet Type Definitions
 * Based on Schema.org structured data
 */

export interface RichSnippetBase {
  "@context": string;
  "@type": string;
}

/**
 * Product Rich Snippet
 * For e-commerce products and services
 */
export interface ProductSnippet extends RichSnippetBase {
  "@type": "Product";
  name: string;
  image?: string | string[];
  description?: string;
  brand?: {
    "@type": "Brand";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    url?: string;
    priceCurrency: string;
    price: string | number;
    priceValidUntil?: string;
    availability?: string;
    itemCondition?: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
    ratingCount: number;
    reviewCount?: number;
  };
  review?: Review[];
  sku?: string;
  gtin?: string;
  mpn?: string;
}

/**
 * Article Rich Snippet
 * For blog posts and news articles
 */
export interface ArticleSnippet extends RichSnippetBase {
  "@type": "Article" | "NewsArticle" | "BlogPosting";
  headline: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
      width?: number;
      height?: number;
    };
  };
  description?: string;
  articleBody?: string;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
}

/**
 * FAQ Rich Snippet
 * For frequently asked questions pages
 */
export interface FAQSnippet extends RichSnippetBase {
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

/**
 * Review Type for Product Snippets
 */
export interface Review {
  "@type": "Review";
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished: string;
  description?: string;
  name?: string;
  reviewRating: {
    "@type": "Rating";
    bestRating?: string;
    ratingValue: string;
    worstRating?: string;
  };
}

/**
 * HowTo Rich Snippet
 * For instructional content
 */
export interface HowToSnippet extends RichSnippetBase {
  "@type": "HowTo";
  name: string;
  description?: string;
  image?: string | string[];
  estimatedCost?: {
    "@type": "MonetaryAmount";
    currency: string;
    value: string;
  };
  supply?: Array<{
    "@type": "HowToSupply";
    name: string;
  }>;
  tool?: Array<{
    "@type": "HowToTool";
    name: string;
  }>;
  step: Array<{
    "@type": "HowToStep";
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  totalTime?: string;
  prepTime?: string;
  performTime?: string;
}

/**
 * Recipe Rich Snippet
 * For recipe content
 */
export interface RecipeSnippet extends RichSnippetBase {
  "@type": "Recipe";
  name: string;
  image?: string | string[];
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
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
    cholesterolContent?: string;
    fatContent?: string;
    fiberContent?: string;
    proteinContent?: string;
    saturatedFatContent?: string;
    servingSize?: string;
    sodiumContent?: string;
    sugarContent?: string;
    transFatContent?: string;
    unsaturatedFatContent?: string;
  };
  recipeIngredient: string[];
  recipeInstructions: Array<{
    "@type": "HowToStep";
    text: string;
    name?: string;
    url?: string;
  }>;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    ratingCount: number;
  };
  video?: {
    "@type": "VideoObject";
    name: string;
    description: string;
    thumbnailUrl: string[];
    uploadDate: string;
    duration?: string;
    embedUrl?: string;
  };
}

/**
 * Organization Rich Snippet
 * For company and organization pages
 */
export interface OrganizationSnippet extends RichSnippetBase {
  "@type": "Organization";
  name: string;
  alternateName?: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: Array<{
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    areaServed?: string | string[];
    availableLanguage?: string | string[];
  }>;
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

/**
 * Person Rich Snippet
 * For personal profiles and author pages
 */
export interface PersonSnippet extends RichSnippetBase {
  "@type": "Person";
  name: string;
  alternateName?: string;
  url?: string;
  image?: string;
  description?: string;
  email?: string;
  telephone?: string;
  jobTitle?: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
  sameAs?: string[];
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

/**
 * Breadcrumb Rich Snippet
 * For breadcrumb navigation
 */
export interface BreadcrumbSnippet extends RichSnippetBase {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * Video Rich Snippet
 * For video content
 */
export interface VideoSnippet extends RichSnippetBase {
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string[];
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

/**
 * Event Rich Snippet
 * For events and performances
 */
export interface EventSnippet extends RichSnippetBase {
  "@type": "Event";
  name: string;
  startDate: string;
  endDate?: string;
  description?: string;
  image?: string | string[];
  location: {
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
  offers?: {
    "@type": "Offer";
    url?: string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
    validFrom?: string;
  };
  performer?: {
    "@type": "Person" | "Organization";
    name: string;
  };
  organizer?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
}

/**
 * Local Business Rich Snippet
 * For local businesses and services
 */
export interface LocalBusinessSnippet extends RichSnippetBase {
  "@type": "LocalBusiness";
  name: string;
  image?: string | string[];
  "@id"?: string;
  url?: string;
  telephone?: string;
  priceRange?: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
  hasMap?: string;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
}

/**
 * Union type for all rich snippet types
 */
export type RichSnippet =
  | ProductSnippet
  | ArticleSnippet
  | FAQSnippet
  | HowToSnippet
  | RecipeSnippet
  | OrganizationSnippet
  | PersonSnippet
  | BreadcrumbSnippet
  | VideoSnippet
  | EventSnippet
  | LocalBusinessSnippet;
