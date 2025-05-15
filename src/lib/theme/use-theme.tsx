/**
 * useTheme Hook
 *
 * A custom hook for accessing and manipulating the theme within components.
 * Provides convenient access to theme values, color mode, and theme manipulation functions.
 */

import type { ThemeSpecification } from "../../types/schema/specification";
import type { ThemeMode } from "../../types/schema/theme";
import { useThemeContext } from "./theme-context";

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
   * All CSS variables as a Record
   */
  cssVariables: Record<string, string>;
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
  const getValue = <T>(path: string, defaultValue?: T): T | undefined => {
    const value = context.resolveToken(path);
    return (value === undefined ? defaultValue : value) as T | undefined;
  };
  
  /**
   * Gets a CSS variable name for a theme path
   * 
   * @param path - Dot notation path to the value (e.g., "colors.primary.500")
   * @returns CSS variable name (e.g., "--theme-colors-primary-500")
   */
  const getCssVar = (path: string): string => {
    return `--theme-${path.replace(/\./g, "-")}`;
  };
  
  return {
    theme: context.theme,
    colorMode: context.colorMode,
    updateTheme: context.updateTheme,
    setColorMode: context.setColorMode,
    toggleColorMode: context.toggleColorMode,
    getValue,
    getCssVar,
    cssVariables: context.cssVariables,
  };
}