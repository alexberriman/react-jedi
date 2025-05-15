/**
 * CSS Variable Generator
 *
 * This file provides utilities for generating CSS variables from theme tokens
 * and applying them to the DOM.
 */

import type { ThemeSpecification } from "../../types/schema/specification";
import type { DesignToken, TokenCollection } from "./theme-tokens";
import { extractTokensFromTheme, createTokenCollection } from "./theme-tokens";

/**
 * CSS Variable Output Format
 */
export interface CssVariableOutput {
  /**
   * CSS variable name (e.g., "--theme-colors-primary-500")
   */
  name: string;
  
  /**
   * CSS variable value (e.g., "#3b82f6")
   */
  value: string;
  
  /**
   * Original token path (e.g., "colors.primary.500")
   */
  tokenPath: string;
  
  /**
   * Token category
   */
  category: string;
}

/**
 * CSS Variable Set Options
 */
export interface CssVariableSetOptions {
  /**
   * Element to apply CSS variables to (default: `:root`)
   */
  target?: HTMLElement | string;
  
  /**
   * CSS variable prefix (default: "--theme")
   */
  prefix?: string;
  
  /**
   * Whether to create scoped CSS variables (default: false)
   * When true, variables will be scoped to a class instead of :root
   */
  scoped?: boolean;
  
  /**
   * Class name for scoped variables (default: "theme")
   */
  scopeClass?: string;
  
  /**
   * Style element ID for removing/updating variables (default: "theme-variables")
   */
  styleElementId?: string;
}

/**
 * Generates CSS variables from a theme specification
 * 
 * @param theme - Theme specification to generate variables from
 * @param options - CSS variable generation options
 * @returns Object containing variable map and token collection
 */
export function generateCssVariables(
  theme: ThemeSpecification,
  options: {
    prefix?: string;
    flatten?: boolean;
  } = {}
): {
  variables: Record<string, string>;
  tokens: TokenCollection;
} {
  const { prefix = "--theme", flatten = false } = options;
  
  // Extract tokens from theme
  const tokens = extractTokensFromTheme(theme, prefix);
  const tokenCollection = createTokenCollection(tokens);
  
  // Generate CSS variables
  const variables: Record<string, string> = {};
  
  for (const token of tokens) {
    // Skip non-primitive values that can't be used as CSS variables
    if (typeof token.value !== "string" && typeof token.value !== "number") {
      continue;
    }
    
    variables[token.cssVariable] = String(token.value);
    
    // For flattened output, also create simplified variable names 
    // for commonly used tokens like colors
    if (flatten && token.category === "color") {
      const simpleName = createSimplifiedVariableName(token, prefix);
      if (simpleName && !variables[simpleName]) {
        variables[simpleName] = String(token.value);
      }
    }
  }
  
  return { 
    variables,
    tokens: tokenCollection
  };
}

/**
 * Applies CSS variables to the DOM
 * 
 * @param variables - CSS variables to apply
 * @param options - Options for applying variables
 * @returns Cleanup function to remove the variables
 */
export function applyCssVariables(
  variables: Record<string, string>,
  options: CssVariableSetOptions = {}
): () => void {
  const {
    target = ":root",
    styleElementId = "theme-variables",
    scoped = false,
    scopeClass = "theme",
  } = options;
  
  // Determine if we're using an element or selector
  const isElement = typeof target !== "string";
  
  // For direct element targeting, apply styles directly
  if (isElement) {
    const element = target as HTMLElement;
    
    // Save original styles for cleanup
    const originalStyles = new Map<string, string>();
    
    // Apply variables
    for (const [name, value] of Object.entries(variables)) {
      if (element.style.getPropertyValue(name)) {
        originalStyles.set(name, element.style.getPropertyValue(name));
      }
      element.style.setProperty(name, value);
    }
    
    // Return cleanup function
    return () => {
      for (const name of Object.keys(variables)) {
        if (originalStyles.has(name)) {
          element.style.setProperty(name, originalStyles.get(name) || "");
        } else {
          element.style.removeProperty(name);
        }
      }
    };
  }
  
  // For selector targeting, create a style element
  let styleElement = document.querySelector(`#${styleElementId}`) as HTMLStyleElement;
  
  // Create style element if it doesn't exist
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleElementId;
    // Using append for DOM insertion
    document.head.append(styleElement);
  }
  
  // Build CSS content
  const selector = scoped ? `.${scopeClass}` : target;
  const cssContent = generateCssRules(variables, selector);
  
  // Apply CSS
  styleElement.textContent = cssContent;
  
  // Return cleanup function
  return () => {
    if (styleElement && styleElement.parentNode) {
      // Using remove for DOM element removal
      styleElement.remove();
    }
  };
}

/**
 * Generates CSS rules from variables
 * 
 * @param variables - CSS variables
 * @param selector - CSS selector to apply variables to
 * @returns CSS content as string
 */
export function generateCssRules(
  variables: Record<string, string>,
  selector = ":root"
): string {
  const entries = Object.entries(variables);
  
  if (entries.length === 0) {
    return "";
  }
  
  const rules = entries
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  
  return `${selector} {\n${rules}\n}`;
}

/**
 * Creates a simplified variable name for commonly used tokens
 * 
 * @param token - Design token
 * @param prefix - CSS variable prefix
 * @returns Simplified variable name or undefined
 */
function createSimplifiedVariableName(
  token: DesignToken,
  prefix: string
): string | undefined {
  // Only simplify color tokens for now
  if (token.category !== "color") {
    return undefined;
  }
  
  const path = token.path.split(".");
  
  // Handle color scales (e.g., colors.primary.500 -> --theme-primary-500)
  if (path.length === 3 && path[0] === "colors") {
    return `${prefix}-${path[1]}-${path[2]}`;
  }
  
  // Handle semantic colors (e.g., text.primary -> --theme-text-primary)
  if (path.length === 2 && (path[0] === "text" || path[0] === "background" || path[0] === "border")) {
    return `${prefix}-${path[0]}-${path[1]}`;
  }
  
  return undefined;
}