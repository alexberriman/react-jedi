/**
 * Rich Snippets Module
 * Exports all rich snippet functionality
 */

export * from "./types";
export * from "./generators";
export * from "./rich-snippet";

// Re-export commonly used functions for convenience
export {
  generateProductSnippet,
  generateArticleSnippet,
  generateFAQSnippet,
  generateBreadcrumbSnippet,
  generateOrganizationSnippet,
  generateEventSnippet,
  generateLocalBusinessSnippet,
  createBreadcrumbItems,
  createFAQItems,
  toScriptTag,
} from "./generators";

export { RichSnippet, useRichSnippet, withRichSnippet } from "./rich-snippet";
