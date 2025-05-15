/**
 * useTheme Hook
 *
 * A custom hook for accessing and manipulating the theme within components.
 * Provides convenient access to theme values, color mode, and theme manipulation functions.
 */

import type { ThemeSpecification } from "../../types/schema/specification";
import type { ThemeMode } from "../../types/schema/theme";
import { useThemeContext } from "./theme-context";
import type { TokenCollection } from "./theme-tokens";
import type { TokenResolver } from "./token-resolver";

/**
 * UseTheme Hook Result Interface
 */
export interface UseThemeResult {
  /**
   * The current theme specification
   */
  theme: ThemeSpecification;
  
  /**
   * Current color mode (light/dark/system)
   */
  colorMode?: ThemeMode;
  
  /**
   * Update the current theme with partial changes
   */
  updateTheme: (newTheme: Partial<ThemeSpecification>) => void;
  
  /**
   * Set the color mode
   */
  setColorMode?: (mode: ThemeMode) => void;
  
  /**
   * Toggle between light and dark modes
   */
  toggleColorMode?: () => void;
  
  /**
   * Get a specific value from the theme using dot notation
   * e.g., getValue("colors.primary.500")
   */
  getValue: <T>(path: string, defaultValue?: T) => T | undefined;
  
  /**
   * Get a CSS variable name for a theme path
   * e.g., getCssVar("colors.primary.500") returns "--theme-colors-primary-500"
   */
  getCssVar: (path: string) => string;
  
  /**
   * Get a CSS variable reference for a theme path
   * e.g., cssVar("colors.primary.500") returns "var(--theme-colors-primary-500)"
   */
  cssVar: (path: string, defaultValue?: string) => string;
  
  /**
   * All CSS variables as a Record
   */
  cssVariables: Record<string, string>;
  
  /**
   * Token collection organized by category
   */
  tokens?: TokenCollection;
  
  /**
   * Token resolver for advanced token operations
   */
  tokenResolver?: TokenResolver;
  
  /**
   * Resolves token references in values
   * e.g., resolveReference("token(colors.primary.500)") returns the actual color value
   */
  resolveReference: <T>(value: unknown) => T;
}

/**
 * Gets a CSS variable name for a theme path
 * 
 * @param path - Dot notation path to the value (e.g., "colors.primary.500")
 * @returns CSS variable name (e.g., "--theme-colors-primary-500")
 */
function getCssVar(path: string): string {
  return `--theme-${path.replaceAll(".", "-")}`;
}

/**
 * Hook for accessing and manipulating the theme
 * 
 * @returns UseThemeResult - Object containing theme values and manipulation functions
 */
export function useTheme(): UseThemeResult {
  const context = useThemeContext();
  
  /**
   * Gets a specific value from the theme using dot notation
   * 
   * @param path - Dot notation path to the value (e.g., "colors.primary.500")
   * @param defaultValue - Default value to return if the path doesn't exist
   * @returns The value at the specified path or the default value
   */
  const getValue = function<T>(path: string, defaultValue?: T): T | undefined {
    const value = context.resolveToken(path);
    return (value === undefined ? defaultValue : value) as T | undefined;
  };
  
  /**
   * Gets a CSS variable reference for a theme path
   * 
   * @param path - Dot notation path to the value
   * @param defaultValue - Default value to use if the variable isn't defined
   * @returns CSS variable reference (e.g., "var(--theme-colors-primary-500)")
   */
  const cssVar = function(path: string, defaultValue?: string): string {
    const varName = getCssVar(path);
    return defaultValue ? `var(${varName}, ${defaultValue})` : `var(${varName})`;
  };
  
  /**
   * Resolves a token reference in a value
   * 
   * @param value - Value that might contain token references
   * @returns Resolved value
   */
  const resolveReference = function<T>(value: unknown): T {
    if (context.tokenResolver) {
      return context.tokenResolver.resolveReference<T>(value);
    }
    
    // Fallback implementation if tokenResolver isn't available
    if (typeof value === "string" && value.startsWith("token(") && value.endsWith(")")) {
      const path = value.slice(6, -1);
      const resolved = getValue<T>(path);
      return resolved === undefined ? value as unknown as T : resolved;
    }
    
    return value as unknown as T;
  };
  
  return {
    theme: context.theme,
    colorMode: context.colorMode,
    updateTheme: context.updateTheme,
    setColorMode: context.setColorMode,
    toggleColorMode: context.toggleColorMode,
    getValue,
    getCssVar,
    cssVar,
    cssVariables: context.cssVariables,
    tokens: context.tokens,
    tokenResolver: context.tokenResolver,
    resolveReference,
  };
}