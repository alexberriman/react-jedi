/**
 * Font Family Management System
 *
 * This module provides utilities for managing font families in the typography system.
 * It includes default font stacks, font family generation, and font loading utilities.
 */

import type { ThemeTypography } from "@/types/schema/specification";

/**
 * Default font stacks for different font categories
 */
export const defaultFontStacks = {
  /**
   * Sans-serif font stack (system-ui first approach)
   */
  sans: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],

  /**
   * Serif font stack
   */
  serif: [
    "ui-serif",
    "Georgia",
    "Cambria",
    "Times New Roman",
    "Times",
    "serif",
  ],

  /**
   * Monospace font stack
   */
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],

  /**
   * Display font stack (optimized for headings)
   */
  display: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
};

/**
 * Font categories for different UI elements
 */
export type FontCategory = "sans" | "serif" | "mono" | "display" | string;

/**
 * Font family configuration interface
 */
export interface FontFamilyConfig {
  /**
   * Primary font for general text
   */
  primary: string[];

  /**
   * Font for headings
   */
  heading?: string[];

  /**
   * Font for code blocks
   */
  code?: string[];

  /**
   * Custom font categories
   */
  [key: string]: string[] | undefined;
}

/**
 * Generate CSS font-family value from array of font names
 */
export function fontStackToString(fonts: string[]): string {
  return fonts.map((font) => {
    // If font name contains spaces and doesn't have quotes, add quotes
    if (font.includes(" ") && !font.startsWith('"') && !font.startsWith("'")) {
      return `"${font}"`;
    }
    return font;
  }).join(", ");
}

/**
 * Get default font stack by category
 */
export function getDefaultFontStack(category: FontCategory): string[] {
  return defaultFontStacks[category as keyof typeof defaultFontStacks] || defaultFontStacks.sans;
}

/**
 * Extract font family configuration from theme typography
 */
export function extractFontFamilies(typography?: ThemeTypography): Record<string, string[]> {
  if (!typography) {
    return {
      sans: defaultFontStacks.sans,
      serif: defaultFontStacks.serif,
      mono: defaultFontStacks.mono,
      display: defaultFontStacks.display,
    };
  }

  const families: Record<string, string[]> = {};
  
  // Extract from fontFamilies object
  if (typography.fontFamilies) {
    for (const [key, value] of Object.entries(typography.fontFamilies)) {
      if (value) {
        families[key] = value;
      }
    }
  }

  // If no sans font is defined, add the default
  if (!families.sans) {
    families.sans = defaultFontStacks.sans;
  }

  // If no serif font is defined, add the default
  if (!families.serif) {
    families.serif = defaultFontStacks.serif;
  }

  // If no mono font is defined, add the default
  if (!families.mono) {
    families.mono = defaultFontStacks.mono;
  }

  // If no display font is defined, add the default
  if (!families.display) {
    families.display = defaultFontStacks.display;
  }

  return families;
}

/**
 * Generate CSS variables for font families
 */
export function generateFontFamilyVariables(
  families: Record<string, string[]>,
  prefix = "--font"
): Record<string, string> {
  const variables: Record<string, string> = {};

  for (const [key, value] of Object.entries(families)) {
    variables[`${prefix}-${key}`] = fontStackToString(value);
  }

  return variables;
}

/**
 * Convert font families to CSS variables mapping
 */
export function fontFamiliesToVariables(
  typography?: ThemeTypography
): Record<string, string> {
  const families = extractFontFamilies(typography);
  return generateFontFamilyVariables(families);
}