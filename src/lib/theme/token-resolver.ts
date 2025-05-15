/**
 * Token Resolver
 *
 * This file provides utilities for resolving theme tokens at runtime,
 * enabling access to theme values in components and styles.
 */

import type { ThemeSpecification } from "../../types/schema/specification";
import type { TokenCollection } from "./theme-tokens";
import { TOKEN_REF_REGEX } from "./theme-tokens";

/**
 * Token Reference Options
 */
export interface TokenReferenceOptions {
  /**
   * Whether to allow fallback values
   */
  allowFallbacks?: boolean;
  
  /**
   * Whether to return CSS variable references instead of values
   */
  returnCssVariables?: boolean;
  
  /**
   * CSS variable prefix (default: "--theme")
   */
  cssPrefix?: string;
  
  /**
   * Function to format CSS variable references (useful for frameworks like Emotion)
   */
  cssFormatter?: (variable: string) => string;
}

/**
 * Token Resolver Interface
 */
export interface TokenResolver {
  /**
   * Resolves a token from a path
   * 
   * @param path - Token path (e.g., "colors.primary.500")
   * @param defaultValue - Default value if token not found
   */
  resolve: <T = unknown>(path: string, defaultValue?: T) => T | undefined;
  
  /**
   * Resolves a CSS variable for a token
   * 
   * @param path - Token path
   * @param defaultValue - Default value if token not found
   */
  resolveCssVar: (path: string, defaultValue?: string) => string;
  
  /**
   * Resolves a token reference in a value
   * 
   * @param value - Value that might contain token references
   */
  resolveReference: <T = unknown>(value: unknown) => T;
  
  /**
   * Resolves all token references in an object
   * 
   * @param obj - Object to resolve references in
   */
  resolveReferences: <T extends Record<string, unknown>>(obj: T) => T;
  
  /**
   * Returns all available tokens
   */
  getTokens: () => TokenCollection;
  
  /**
   * Returns the theme specification
   */
  getTheme: () => ThemeSpecification;
}

/**
 * Creates a token resolver for a theme
 * 
 * @param theme - Theme specification
 * @param tokens - Token collection
 * @param options - Token resolver options
 * @returns Token resolver
 */
export function createTokenResolver(
  theme: ThemeSpecification,
  tokens: TokenCollection,
  options: TokenReferenceOptions = {}
): TokenResolver {
  const {
    allowFallbacks = true,
    returnCssVariables = false,
    cssPrefix = "--theme",
    cssFormatter = (v) => `var(${v})`,
  } = options;
  
  /**
   * Resolves a token value from a path
   */
  const resolve = <T = unknown>(path: string, defaultValue?: T): T | undefined => {
    // Try to find in token collection first
    const token = tokens.getByPath(path);
    
    if (token) {
      if (returnCssVariables) {
        return cssFormatter(token.cssVariable) as unknown as T;
      }
      return token.value as T;
    }
    
    // Fall back to direct theme lookup
    const value = resolveThemeValue(theme, path);
    
    if (value !== undefined) {
      return value as T;
    }
    
    return defaultValue;
  };
  
  /**
   * Resolves a CSS variable for a token
   */
  const resolveCssVar = (path: string, defaultValue?: string): string => {
    const token = tokens.getByPath(path);
    
    if (token) {
      return cssFormatter(token.cssVariable);
    }
    
    // Generate a CSS variable name from the path
    const cssVarName = `${cssPrefix}-${path.replaceAll(".", "-")}`;
    
    if (defaultValue) {
      return `var(${cssVarName}, ${defaultValue})`;
    }
    
    return `var(${cssVarName})`;
  };
  
  /**
   * Resolves a token reference in a value
   */
  const resolveReference = <T = unknown>(value: unknown): T => {
    if (typeof value !== "string") {
      return value as T;
    }
    
    const match = TOKEN_REF_REGEX.exec(value);
    
    if (!match) {
      return value as T;
    }
    
    const path = match[1];
    const resolved = resolve<T>(path);
    
    if (resolved !== undefined) {
      return resolved;
    }
    
    // Return original value if reference can't be resolved and fallbacks aren't allowed
    if (!allowFallbacks) {
      return value as T;
    }
    
    // For CSS variables, return a variable reference
    if (returnCssVariables) {
      return resolveCssVar(path) as unknown as T;
    }
    
    // Default to original value
    return value as T;
  };
  
  /**
   * Resolves all token references in an object
   */
  const resolveReferences = <T extends Record<string, unknown>>(obj: T): T => {
    const result = { ...obj } as Record<string, unknown>;
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        result[key] = resolveReference(value);
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        result[key] = resolveReferences(value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
    
    return result as T;
  };
  
  /**
   * Returns all available tokens
   */
  const getTokens = (): TokenCollection => tokens;
  
  /**
   * Returns the theme specification
   */
  const getTheme = (): ThemeSpecification => theme;
  
  return {
    resolve,
    resolveCssVar,
    resolveReference,
    resolveReferences,
    getTokens,
    getTheme,
  };
}

/**
 * Resolves a value from a theme using a path
 * 
 * @param theme - Theme specification
 * @param path - Path to the value (e.g., "colors.primary.500")
 * @returns The value at the path or undefined
 */
export function resolveThemeValue(theme: ThemeSpecification, path: string): unknown {
  const parts = path.split(".");
  let current: Record<string, unknown> = theme as Record<string, unknown>;
  
  for (const part of parts) {
    if (current == null) {
      return undefined;
    }
    
    current = current[part] as Record<string, unknown>;
    
    if (current == null) {
      return undefined;
    }
    
    // If we've reached a primitive value, return it
    if (typeof current !== "object") {
      return current;
    }
  }
  
  return current;
}

/**
 * Creates a CSS variable reference
 * 
 * @param name - CSS variable name without the leading --
 * @param defaultValue - Optional default value
 * @returns CSS variable reference (e.g., "var(--name, defaultValue)")
 */
export function cssVar(name: string, defaultValue?: string): string {
  if (defaultValue) {
    return `var(--${name}, ${defaultValue})`;
  }
  return `var(--${name})`;
}