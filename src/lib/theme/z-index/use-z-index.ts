/**
 * useZIndex Hook
 *
 * A React hook for accessing theme-aware z-index values in components.
 * This hook provides a convenient way to get z-index values that respect
 * the current theme configuration.
 */

import { useTheme } from "../use-theme";
import { getZIndex, getRelativeZIndex } from "./index";

/**
 * Hook result type
 */
export interface UseZIndexResult {
  /**
   * Get a z-index value by key
   * 
   * @param key The z-index key
   * @returns The z-index value
   */
  get: (key: string) => number;
  
  /**
   * Get a relative z-index value based on a base layer
   * 
   * @param baseLayer The base layer name
   * @param offset The offset from the base layer (default: 0)
   * @returns The calculated z-index value
   */
  getRelative: (baseLayer: string, offset?: number) => number;
  
  /**
   * Format a z-index value as a CSS property
   * 
   * @param key The z-index key or value
   * @returns A CSS z-index declaration
   */
  style: (key: string | number) => { zIndex: number };
}

/**
 * A hook for accessing z-index values from the current theme
 * 
 * @returns An object with methods to get z-index values
 */
export function useZIndex(): UseZIndexResult {
  const { theme } = useTheme();
  
  return {
    /**
     * Get a z-index value by key
     */
    get: (key: string): number => getZIndex(theme, key),
    
    /**
     * Get a relative z-index value based on a base layer
     */
    getRelative: (baseLayer: string, offset: number = 0): number => 
      getRelativeZIndex(theme, baseLayer, offset),
    
    /**
     * Format a z-index value as a CSS property
     */
    style: (key: string | number): { zIndex: number } => {
      if (typeof key === "number") {
        return { zIndex: key };
      }
      return { zIndex: getZIndex(theme, key) };
    }
  };
}