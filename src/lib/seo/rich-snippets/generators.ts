/**
 * Rich Snippet Generator Functions
 * Creates valid JSON-LD structured data for various content types
 */

import {
  ArticleSnippet,
  BreadcrumbSnippet,
  EventSnippet,
  FAQSnippet,
  HowToSnippet,
  LocalBusinessSnippet,
  OrganizationSnippet,
  PersonSnippet,
  ProductSnippet,
  RecipeSnippet,
  VideoSnippet,
} from "./types";

const SCHEMA_CONTEXT = "https://schema.org";

/**
 * Generates a Product rich snippet
 */
export function generateProductSnippet(
  data: Omit<ProductSnippet, "@context" | "@type">
): ProductSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Product",
    ...data,
  };
}

/**
 * Generates an Article rich snippet
 */
export function generateArticleSnippet(
  data: Omit<ArticleSnippet, "@context" | "@type">,
  type: "Article" | "NewsArticle" | "BlogPosting" = "Article"
): ArticleSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": type,
    ...data,
  };
}

/**
 * Generates an FAQ rich snippet
 */
export function generateFAQSnippet(data: Omit<FAQSnippet, "@context" | "@type">): FAQSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    ...data,
  };
}

/**
 * Generates a HowTo rich snippet
 */
export function generateHowToSnippet(data: Omit<HowToSnippet, "@context" | "@type">): HowToSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "HowTo",
    ...data,
  };
}

/**
 * Generates a Recipe rich snippet
 */
export function generateRecipeSnippet(
  data: Omit<RecipeSnippet, "@context" | "@type">
): RecipeSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Recipe",
    ...data,
  };
}

/**
 * Generates an Organization rich snippet
 */
export function generateOrganizationSnippet(
  data: Omit<OrganizationSnippet, "@context" | "@type">
): OrganizationSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    ...data,
  };
}

/**
 * Generates a Person rich snippet
 */
export function generatePersonSnippet(
  data: Omit<PersonSnippet, "@context" | "@type">
): PersonSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Person",
    ...data,
  };
}

/**
 * Generates a Breadcrumb rich snippet
 */
export function generateBreadcrumbSnippet(
  data: Omit<BreadcrumbSnippet, "@context" | "@type">
): BreadcrumbSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    ...data,
  };
}

/**
 * Generates a Video rich snippet
 */
export function generateVideoSnippet(data: Omit<VideoSnippet, "@context" | "@type">): VideoSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "VideoObject",
    ...data,
  };
}

/**
 * Generates an Event rich snippet
 */
export function generateEventSnippet(data: Omit<EventSnippet, "@context" | "@type">): EventSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Event",
    ...data,
  };
}

/**
 * Generates a LocalBusiness rich snippet
 */
export function generateLocalBusinessSnippet(
  data: Omit<LocalBusinessSnippet, "@context" | "@type">
): LocalBusinessSnippet {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "LocalBusiness",
    ...data,
  };
}

/**
 * Converts a rich snippet object to JSON-LD script tag string
 */
export function toScriptTag(snippet: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(snippet, null, 2)}</script>`;
}

/**
 * Helper to create breadcrumb items from an array of pages
 */
export function createBreadcrumbItems(
  pages: Array<{ name: string; url?: string }>
): BreadcrumbSnippet["itemListElement"] {
  return pages.map((page, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: page.name,
    ...(page.url && index < pages.length - 1 ? { item: page.url } : {}),
  }));
}

/**
 * Helper to create FAQ items from Q&A pairs
 */
export function createFAQItems(
  faqs: Array<{ question: string; answer: string }>
): FAQSnippet["mainEntity"] {
  return faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
}

/**
 * Helper to create HowTo steps
 */
export function createHowToSteps(
  steps: Array<{ name: string; text: string; image?: string; url?: string }>
): HowToSnippet["step"] {
  return steps.map((step) => ({
    "@type": "HowToStep",
    name: step.name,
    text: step.text,
    ...(step.image && { image: step.image }),
    ...(step.url && { url: step.url }),
  }));
}

/**
 * Helper to create recipe instructions
 */
export function createRecipeInstructions(
  instructions: Array<string | { text: string; name?: string; url?: string }>
): RecipeSnippet["recipeInstructions"] {
  return instructions.map((instruction) => {
    if (typeof instruction === "string") {
      return {
        "@type": "HowToStep",
        text: instruction,
      };
    }
    return {
      "@type": "HowToStep",
      text: instruction.text,
      ...(instruction.name && { name: instruction.name }),
      ...(instruction.url && { url: instruction.url }),
    };
  });
}

/**
 * Validates availability value for products
 */
export function validateAvailability(availability: string): string {
  const validValues = [
    "InStock",
    "OutOfStock",
    "PreOrder",
    "BackOrder",
    "Discontinued",
    "InStoreOnly",
    "LimitedAvailability",
    "OnlineOnly",
    "SoldOut",
  ];

  return validValues.includes(availability) ? `https://schema.org/${availability}` : availability;
}

/**
 * Formats ISO 8601 duration string for recipes and HowTo snippets
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let duration = "PT";
  if (hours > 0) duration += `${hours}H`;
  if (mins > 0) duration += `${mins}M`;

  return duration;
}

/**
 * Generates a date in ISO 8601 format
 */
export function formatISODate(date: Date): string {
  return date.toISOString();
}

/**
 * Sanitizes text to prevent JSON-LD errors
 */
export function sanitizeText(text: string): string {
  // Remove control characters using code points
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.codePointAt(i);
    if (!code) continue;
    // Skip control characters (0x00-0x1F, 0x7F-0x9F)
    if ((code >= 0x00 && code <= 0x1f) || (code >= 0x7f && code <= 0x9f)) {
      continue;
    }
    result += text[i];
  }

  return result
    .replaceAll("\\", "\\\\") // Escape backslashes
    .replaceAll('"', String.raw`\"`); // Escape quotes
}

/**
 * Merges multiple rich snippets into a single JSON-LD output
 */
export function mergeSnippets(...snippets: unknown[]): string {
  if (snippets.length === 0) return "";
  if (snippets.length === 1) return toScriptTag(snippets[0]);

  return toScriptTag({
    "@context": SCHEMA_CONTEXT,
    "@graph": snippets,
  });
}
