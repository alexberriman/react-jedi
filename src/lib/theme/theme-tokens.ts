/**
 * Theme Token Architecture
 *
 * This file defines the core token architecture for the theme system.
 * It provides a structured approach to design tokens, enabling consistent
 * styling throughout the application.
 */

import type { ThemeToken } from "../../types/schema/theme";
import type { ThemeSpecification } from "../../types/schema/specification";

/**
 * Token Category Types
 * These categories allow for organizing tokens by their purpose
 */
export type TokenCategory = 
  | "color" 
  | "typography" 
  | "spacing" 
  | "borderRadius" 
  | "shadow" 
  | "animation" 
  | "breakpoint"
  | "zIndex";

/**
 * Token Reference Format
 * Format used to reference a token in style values
 * Example: "token(colors.primary.500)"
 */
export const TOKEN_REF_REGEX = /^token\(([a-zA-Z0-9.\-_]+)\)$/;

/**
 * Design Token - Core interface for all design tokens
 */
export interface DesignToken<T = unknown> {
  /**
   * Unique identifier for the token
   */
  id: string;
  
  /**
   * Human-readable name
   */
  name: string;
  
  /**
   * Value of the token
   */
  value: T;
  
  /**
   * Category of the token
   */
  category: TokenCategory;
  
  /**
   * Description of token's purpose
   */
  description?: string;
  
  /**
   * CSS variable name
   */
  cssVariable: string;
  
  /**
   * Reference path for accessing via token()
   */
  path: string;
}

/**
 * Token Collection - Organizes tokens by category
 */
export interface TokenCollection {
  /**
   * Color tokens
   */
  colors: Record<string, DesignToken<string>>;
  
  /**
   * Typography tokens
   */
  typography: Record<string, DesignToken<string | number>>;
  
  /**
   * Spacing tokens
   */
  spacing: Record<string, DesignToken<string>>;
  
  /**
   * Border radius tokens
   */
  borderRadius: Record<string, DesignToken<string>>;
  
  /**
   * Shadow tokens
   */
  shadows: Record<string, DesignToken<string>>;
  
  /**
   * Animation tokens
   */
  animations: Record<string, DesignToken<Record<string, unknown>>>;
  
  /**
   * Breakpoint tokens
   */
  breakpoints: Record<string, DesignToken<string>>;
  
  /**
   * Z-index tokens
   */
  zIndices: Record<string, DesignToken<number>>;
  
  /**
   * Get all tokens as a flat array
   */
  all: DesignToken[];
  
  /**
   * Get a token by its path
   */
  getByPath: (path: string) => DesignToken | undefined;
}

/**
 * Extracts tokens from a theme specification
 * @param theme - Theme specification to extract tokens from
 * @param prefix - CSS variable prefix (default: "--theme")
 * @returns Array of design tokens
 */
export function extractTokensFromTheme(
  theme: ThemeSpecification,
  prefix = "--theme"
): DesignToken[] {
  const tokens: DesignToken[] = [];
  
  // Extract all token paths and values
  const rawTokens = generateTokens(theme);
  
  // Convert raw tokens to DesignToken objects
  for (const { path, value, category } of rawTokens) {
    const parts = path.split(".");
    const name = parts[parts.length - 1];
    const id = path.replace(/\./g, "-");
    
    tokens.push({
      id,
      name: formatTokenName(name),
      value,
      category: determineCategoryFromPath(path),
      cssVariable: `${prefix}-${id}`,
      path,
    });
  }
  
  return tokens;
}

/**
 * Creates a token collection from design tokens
 * @param tokens - Array of design tokens
 * @returns Token collection organized by category
 */
export function createTokenCollection(tokens: DesignToken[]): TokenCollection {
  const collection: Partial<TokenCollection> = {
    colors: {},
    typography: {},
    spacing: {},
    borderRadius: {},
    shadows: {},
    animations: {},
    breakpoints: {},
    zIndices: {},
  };
  
  // Organize tokens by category
  for (const token of tokens) {
    const category = token.category as keyof Omit<TokenCollection, "all" | "getByPath">;
    if (category && collection[category]) {
      (collection[category] as Record<string, DesignToken>)[token.id] = token;
    }
  }
  
  // Create token lookup by path
  const tokenByPath: Record<string, DesignToken> = {};
  for (const token of tokens) {
    tokenByPath[token.path] = token;
  }
  
  return {
    ...collection as Omit<TokenCollection, "all" | "getByPath">,
    all: tokens,
    getByPath: (path) => tokenByPath[path],
  };
}

/**
 * Converts ThemeTokens to DesignTokens
 * @param themeTokens - Theme tokens from schema
 * @param prefix - CSS variable prefix
 * @returns Array of design tokens
 */
export function convertThemeTokens(
  themeTokens: ThemeToken[],
  prefix = "--theme"
): DesignToken[] {
  return themeTokens.map((token) => {
    const id = token.token.replace(/\./g, "-");
    const parts = token.token.split(".");
    const name = parts[parts.length - 1];
    
    return {
      id,
      name: formatTokenName(name),
      value: token.value,
      category: token.category,
      description: token.description,
      cssVariable: `${prefix}-${id}`,
      path: token.token,
    };
  });
}

/**
 * Helper function to generate tokens from a theme
 * @param theme - Theme specification
 * @returns Array of raw tokens with path, value, and category
 */
function generateTokens(theme: ThemeSpecification): Array<{
  path: string;
  value: unknown;
  category: TokenCategory;
}> {
  const tokens: Array<{ path: string; value: unknown; category: TokenCategory }> = [];
  
  // Helper function to process nested objects
  function processObject(obj: Record<string, unknown>, path: string[] = []) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    
    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...path, key];
      const pathStr = newPath.join(".");
      
      if (value && typeof value === "object" && !Array.isArray(value)) {
        processObject(value as Record<string, unknown>, newPath);
      } else if (value !== undefined && value !== null) {
        tokens.push({ 
          path: pathStr, 
          value,
          category: determineCategoryFromPath(pathStr),
        });
      }
    }
  }
  
  processObject(theme as unknown as Record<string, unknown>);
  
  return tokens;
}

/**
 * Determines token category based on its path
 * @param path - Token path (e.g. "colors.primary.500")
 * @returns Token category
 */
function determineCategoryFromPath(path: string): TokenCategory {
  const topLevel = path.split(".")[0];
  
  switch (topLevel) {
    case "colors":
    case "background":
    case "text":
    case "border":
      return "color";
    case "typography":
    case "fontSizes":
    case "fontWeights":
    case "lineHeights":
    case "letterSpacings":
    case "fonts":
      return "typography";
    case "spacing":
      return "spacing";
    case "borderRadius":
      return "borderRadius";
    case "shadows":
      return "shadow";
    case "animations":
      return "animation";
    case "breakpoints":
      return "breakpoint";
    case "zIndices":
      return "zIndex";
    default:
      // Default to most likely category based on value type
      return "color";
  }
}

/**
 * Formats token name for display
 * @param key - Raw token key
 * @returns Formatted token name
 */
function formatTokenName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\./g, " ") // Replace dots with spaces
    .trim();
}