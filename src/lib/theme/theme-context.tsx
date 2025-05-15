/**
 * Theme Context
 *
 * This file provides the React context for the theme system, allowing components
 * to access and update the current theme.
 */

import { createContext, useContext, type ReactNode } from "react";
import type { ColorModeSettings, EnhancedThemeSpecification, ThemeExtension, ThemeMode } from "../../types/schema/theme";
import type { ThemeSpecification } from "../../types/schema/specification";
import { mergeThemes } from "../schemas/theme-validation";

/**
 * Theme Context Interface
 * Defines the shape of the theme context value
 */
export interface ThemeContextValue {
  /**
   * The current theme specification
   */
  theme: ThemeSpecification;

  /**
   * Enhanced theme specification with additional features
   */
  enhancedTheme?: EnhancedThemeSpecification;

  /**
   * Current color mode (light/dark/system)
   */
  colorMode?: ThemeMode;

  /**
   * Update the current theme
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
   * CSS variables generated from the theme
   */
  cssVariables: Record<string, string>;

  /**
   * Resolve a theme token from a path (e.g., "colors.primary.500")
   */
  resolveToken: (tokenPath: string) => unknown;
}

// Create theme context with default values
export const ThemeContext = createContext<ThemeContextValue>({
  theme: {},
  cssVariables: {},
  updateTheme: () => {
    // Default no-op implementation
  },
  resolveToken: () => undefined,
});

/**
 * Theme Context Provider Props
 */
export interface ThemeContextProviderProps {
  /**
   * The initial theme specification
   */
  theme: ThemeSpecification;

  /**
   * Enhanced theme with additional features (optional)
   */
  enhancedTheme?: EnhancedThemeSpecification;

  /**
   * Color mode settings (optional)
   */
  colorModeSettings?: ColorModeSettings;

  /**
   * Initial color mode (optional)
   */
  initialColorMode?: ThemeMode;

  /**
   * CSS variables from the theme
   */
  cssVariables: Record<string, string>;

  /**
   * Function to resolve a theme token from a path
   */
  resolveToken: (tokenPath: string) => unknown;

  /**
   * Children components
   */
  children: ReactNode;
}

/**
 * Hook to access the theme context
 * @returns ThemeContextValue - The current theme context value
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  
  return context;
}

/**
 * Resolves the effective theme by applying theme extensions
 * @param baseTheme - The base theme specification
 * @param extensions - Optional theme extensions to apply
 * @returns The resolved theme specification
 */
export function resolveTheme(
  baseTheme: ThemeSpecification,
  extensions?: ThemeExtension[]
): ThemeSpecification {
  if (!extensions || extensions.length === 0) {
    return baseTheme;
  }
  
  let result = { ...baseTheme };
  
  for (const extension of extensions) {
    // Apply inheritance if configured
    if (extension.inheritance?.parent) {
      // For actual implementation, you would look up the parent theme
      // Here we just merge the extension with the current result
      result = mergeThemes(result, extension);
    } else {
      // Simple merge if no inheritance is specified
      result = mergeThemes(result, extension);
    }
  }
  
  return result;
}