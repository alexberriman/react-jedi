/**
 * Typography Hooks
 * 
 * This module provides React hooks for working with typography in the theme system.
 */

import { useCallback, useMemo } from "react";
import { useTheme } from "../use-theme";
import type { FluidTypographyConfig } from "./fluid-typography";
import { enhanceWithFluidTypography, isFluidTypography } from "./fluid-typography";
import type { ThemeTypography } from "@/types/schema/specification";

/**
 * Hook to access typography settings from the theme
 */
export function useTypography(): ThemeTypography {
  const { theme } = useTheme();
  return theme.typography || {};
}

/**
 * Hook to get font size from the theme
 * 
 * @param size Size token name (e.g., 'sm', 'lg', '2xl')
 * @returns CSS font size value
 */
export function useFontSize(size: string = "base"): string {
  const typography = useTypography();
  const fontSizes = typography.fontSizes || {};
  
  return fontSizes[size] || fontSizes.base || "1rem";
}

/**
 * Hook to access and modify fluid typography settings
 */
export function useFluidTypography(): {
  isFluid: boolean;
  enableFluidTypography: (config?: Partial<FluidTypographyConfig>) => void;
  disableFluidTypography: () => void;
} {
  const { theme, updateTheme } = useTheme();
  
  // Wrap typography value in useMemo to prevent dependency changes on every render
  const typography = useMemo(() => theme.typography || {}, [theme.typography]);
  
  // Check if fluid typography is currently enabled
  const isFluid = useMemo(() => isFluidTypography(typography), [typography]);
  
  // Enable fluid typography with custom configuration
  const enableFluidTypography = useCallback((config?: Partial<FluidTypographyConfig>) => {
    if (isFluid) return; // Already enabled
    
    const enhancedTypography = enhanceWithFluidTypography(typography, config);
    
    updateTheme({
      typography: enhancedTypography
    });
  }, [isFluid, typography, updateTheme]);
  
  // Disable fluid typography and revert to static font sizes
  const disableFluidTypography = useCallback(() => {
    if (!isFluid) return; // Already disabled
    
    // Generate static font sizes for the typography system
    // This preserves all other typography settings
    updateTheme({
      typography: {
        ...typography,
        fontSizes: {} // This will be regenerated with static values
      }
    });
  }, [isFluid, typography, updateTheme]);
  
  return {
    isFluid,
    enableFluidTypography,
    disableFluidTypography
  };
}

/**
 * Hook to get line height from the theme
 * 
 * @param size Line height token name (e.g., 'tight', 'normal', 'relaxed')
 * @returns CSS line height value
 */
export function useLineHeight(size: string = "normal"): string | number {
  const typography = useTypography();
  const lineHeights = typography.lineHeights || {};
  
  return lineHeights[size] || lineHeights.normal || 1.5;
}

/**
 * Hook to get letter spacing from the theme
 * 
 * @param size Letter spacing token name (e.g., 'tight', 'normal', 'wide')
 * @returns CSS letter spacing value
 */
export function useLetterSpacing(size: string = "normal"): string {
  const typography = useTypography();
  const letterSpacings = typography.letterSpacings || {};
  
  return letterSpacings[size] || letterSpacings.normal || "0";
}

/**
 * Hook to get font family from the theme
 * 
 * @param category Font category name (e.g., 'sans', 'serif', 'mono')
 * @returns CSS font family value
 */
export function useFontFamily(category: string = "sans"): string {
  const typography = useTypography();
  const fontFamilies = typography.fontFamilies || {};
  
  const family = fontFamilies[category];
  
  if (!family) {
    return fontFamilies.sans ? 
      fontFamilies.sans.join(", ") : 
      "system-ui, sans-serif";
  }
  
  return family.join(", ");
}

/**
 * Hook to get font weight from the theme
 * 
 * @param weight Font weight token name (e.g., 'normal', 'bold', 'semibold')
 * @returns CSS font weight value
 */
export function useFontWeight(weight: string = "normal"): number {
  const typography = useTypography();
  const fontWeights = typography.fontWeights || {};
  
  return fontWeights[weight] || fontWeights.normal || 400;
}