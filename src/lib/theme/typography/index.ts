/**
 * Typography System
 *
 * This module provides a comprehensive typography system for the theme,
 * including font families, type scales, line heights, and letter spacing.
 * It exports utilities for generating and managing typography tokens.
 */

import type { ThemeTypography } from "@/types/schema/specification";

// Import necessary functions from individual modules
import { fontFamiliesToVariables, defaultFontStacks } from "./font-family";
import { fontSizesToVariables, generateTypeScale, generateFluidTypeScale, ScaleRatio } from "./type-scale";
import { lineHeightsToVariables, letterSpacingsToVariables, DEFAULT_LINE_HEIGHTS, DEFAULT_LETTER_SPACINGS } from "./spacing";
import { 
  generateBreakpointFluidTypeScale, 
  generateOptimizedFluidTypeScale, 
  type FluidTypographyConfig, 
  DEFAULT_FLUID_TYPOGRAPHY_CONFIG 
} from "./fluid-typography";

// Export all typography system components
export * from "./font-family";
export * from "./type-scale";
export * from "./spacing";
export * from "./fluid-typography";
export * from "./hooks";

/**
 * Generate CSS variables for the entire typography system
 */
export function generateTypographyVariables(
  typography?: ThemeTypography
): Record<string, string> {
  
  // Generate all typography-related CSS variables
  return {
    ...fontFamiliesToVariables(typography),
    ...fontSizesToVariables(typography),
    ...lineHeightsToVariables(typography),
    ...letterSpacingsToVariables(typography),
  };
}

/**
 * Apply typography variables to a DOM element
 */
export function applyTypographyVariables(
  element: HTMLElement,
  typography?: ThemeTypography
): void {
  const variables = generateTypographyVariables(typography);
  
  for (const [property, value] of Object.entries(variables)) {
    element.style.setProperty(property, value);
  }
}

/**
 * Generate a complete typography system from base configuration
 */
export function generateTypographySystem(config: {
  baseFontSize?: number;
  scaleRatio?: number | ScaleRatio;
  primaryFont?: string[];
  headingFont?: string[];
  monoFont?: string[];
  baseLineHeight?: number | string;
  headingLineHeight?: number | string;
  baseFontWeight?: number;
  headingFontWeight?: number;
  fluid?: boolean;
  fluidConfig?: Partial<FluidTypographyConfig>;
} = {}): ThemeTypography {
  // Use imported functions and constants from the module imports
  
  // Set defaults
  const {
    baseFontSize = 16,
    scaleRatio = "perfectFourth" as ScaleRatio, // Using scale ratio constant from type-scale.ts
    primaryFont = defaultFontStacks.sans,
    headingFont = defaultFontStacks.display,
    monoFont = defaultFontStacks.mono,
    baseLineHeight = DEFAULT_LINE_HEIGHTS.normal,
    headingLineHeight = DEFAULT_LINE_HEIGHTS.heading,
    baseFontWeight = 400,
    headingFontWeight = 700,
    fluid = false,
    fluidConfig = {},
  } = config;
  
  // If fluid typography is enabled, use the new advanced fluid typography system
  let fontSizes;
  if (fluid) {
    // If breakpoints are specified, use the breakpoint-based fluid type scale
    if (fluidConfig.breakpoints && fluidConfig.breakpoints.length >= 2) {
      fontSizes = generateBreakpointFluidTypeScale({
        ...fluidConfig,
        defaultBaseFontSize: baseFontSize,
        defaultScaleRatio: scaleRatio,
      });
    } else {
      // For backwards compatibility, use the optimized version of original fluid type scale
      fontSizes = generateOptimizedFluidTypeScale({
        ...fluidConfig,
        defaultBaseFontSize: baseFontSize,
        defaultScaleRatio: scaleRatio,
      });
    }
  } else {
    // Use static type scale
    fontSizes = generateTypeScale({ 
      baseFontSize: baseFontSize,
      scaleRatio: scaleRatio,
    });
  }
  
  // Create typography system
  const typography: ThemeTypography = {
    fontFamilies: {
      sans: primaryFont,
      serif: defaultFontStacks.serif,
      mono: monoFont,
      display: headingFont,
    },
    fontSizes,
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
      body: baseFontWeight,
      heading: headingFontWeight,
    },
    lineHeights: {
      ...DEFAULT_LINE_HEIGHTS,
      body: baseLineHeight,
      heading: headingLineHeight,
    },
    letterSpacings: {
      ...DEFAULT_LETTER_SPACINGS,
    },
  };
  
  return typography;
}