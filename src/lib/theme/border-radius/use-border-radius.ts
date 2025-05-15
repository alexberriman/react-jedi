/**
 * Use Border Radius Hook
 *
 * This file provides a React hook for accessing border radius values from the theme.
 * It provides a consistent interface for components to retrieve and apply border radius values.
 */

import { useMemo } from "react";
import { useTheme } from "../use-theme";
import { 
  createBorderRadiusResolver, 
  createBorderRadiusScale,
  createBorderRadiusCSSVariables 
} from ".";

/**
 * Result object returned by the useBorderRadius hook
 */
export interface UseBorderRadiusResult {
  /**
   * Get a border radius value by its key
   */
  get: (key: string) => string;
  
  /**
   * The complete border radius scale object
   */
  scale: Record<string, string>;
  
  /**
   * CSS variables for the border radius scale
   */
  cssVariables: Record<string, string>;
  
  /**
   * Apply a border radius to a style object
   */
  apply: (style: Record<string, string | number>, key: string) => Record<string, string | number>;
}

/**
 * React hook for accessing the current theme's border radius scale
 * 
 * @returns An object with methods to access and use border radius values
 */
export function useBorderRadius(): UseBorderRadiusResult {
  const { theme } = useTheme();
  
  // Create memoized scale and utilities
  const scale = useMemo(() => {
    if (!theme || !theme.borderRadius) {
      return createBorderRadiusScale();
    }
    return createBorderRadiusScale(theme.borderRadius);
  }, [theme]);
  
  const resolver = useMemo(() => {
    return createBorderRadiusResolver(theme);
  }, [theme]);
  
  const cssVariables = useMemo(() => {
    return createBorderRadiusCSSVariables(scale);
  }, [scale]);
  
  // Create the apply function
  const apply = useMemo(() => {
    return (style: Record<string, string | number>, key: string): Record<string, string | number> => {
      return {
        ...style,
        borderRadius: resolver(key),
      };
    };
  }, [resolver]);
  
  return {
    get: resolver,
    scale,
    cssVariables,
    apply,
  };
}