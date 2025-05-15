/**
 * Typography System
 *
 * This module provides a comprehensive typography system for the theme,
 * including font families, type scales, line heights, and letter spacing.
 * It exports utilities for generating and managing typography tokens.
 */

import type { ThemeTypography } from "@/types/schema/specification";

// Export all typography system components
export * from "./font-family";
export * from "./type-scale";
export * from "./spacing";

/**
 * Generate CSS variables for the entire typography system
 */
export function generateTypographyVariables(
  typography?: ThemeTypography
): Record<string, string> {
  // Import functions from individual modules
  const { fontFamiliesToVariables } = require("./font-family");
  const { fontSizesToVariables } = require("./type-scale");
  const { lineHeightsToVariables, letterSpacingsToVariables } = require("./spacing");
  
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
  
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

/**
 * Generate a complete typography system from base configuration
 */
export function generateTypographySystem(config: {
  baseFontSize?: number;
  scaleRatio?: number | string;
  primaryFont?: string[];
  headingFont?: string[];
  monoFont?: string[];
  baseLineHeight?: number | string;
  headingLineHeight?: number | string;
  baseFontWeight?: number;
  headingFontWeight?: number;
  fluid?: boolean;
} = {}): ThemeTypography {
  // Import necessary functions
  const { defaultFontStacks } = require("./font-family");
  const { generateTypeScale, generateFluidTypeScale, SCALE_RATIOS } = require("./type-scale");
  const { DEFAULT_LINE_HEIGHTS, DEFAULT_LETTER_SPACINGS } = require("./spacing");
  
  // Set defaults
  const {
    baseFontSize = 16,
    scaleRatio = "perfectFourth",
    primaryFont = defaultFontStacks.sans,
    headingFont = defaultFontStacks.display,
    monoFont = defaultFontStacks.mono,
    baseLineHeight = DEFAULT_LINE_HEIGHTS.normal,
    headingLineHeight = DEFAULT_LINE_HEIGHTS.heading,
    baseFontWeight = 400,
    headingFontWeight = 700,
    fluid = false,
  } = config;
  
  // Generate the font size scale
  const fontSizes = fluid 
    ? generateFluidTypeScale({ 
        baseFontSize: baseFontSize,
        scaleRatio: scaleRatio,
      }) 
    : generateTypeScale({ 
        baseFontSize: baseFontSize,
        scaleRatio: scaleRatio,
      });
  
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