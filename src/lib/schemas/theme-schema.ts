/**
 * Theme Specification Zod Schema
 *
 * This file defines the Zod validation schemas for the theme specification system.
 * It provides runtime validation for theme-related structures.
 */

import { z } from "zod";

/**
 * Animation preset schema
 */
const animationPresetSchema = z.object({
  duration: z.string(),
  easing: z.string(),
  delay: z.string().optional(),
  iterations: z.number().optional(),
  direction: z.enum(["normal", "reverse", "alternate", "alternate-reverse"]).optional(),
  fillMode: z.enum(["none", "forwards", "backwards", "both"]).optional(),
});

/**
 * Color scale schema with numeric shade keys
 */
const colorScaleSchema = z.record(
  z.string().regex(/^\d+$/),
  z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i).or(z.string().regex(/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i)).or(z.string().regex(/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([01]|0?\.\d+)\s*\)$/i)).or(z.string().regex(/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/i)).or(z.string().regex(/^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*([01]|0?\.\d+)\s*\)$/i))
);

/**
 * Theme colors schema
 */
const themeColorsSchema = z.object({
  primary: colorScaleSchema.optional(),
  secondary: colorScaleSchema.optional(),
  accent: colorScaleSchema.optional(),
  neutral: colorScaleSchema.optional(),
  success: colorScaleSchema.optional(),
  warning: colorScaleSchema.optional(),
  error: colorScaleSchema.optional(),
  info: colorScaleSchema.optional(),
  background: z.record(z.string(), z.string()).optional(),
  text: z.record(z.string(), z.string()).optional(),
  border: z.record(z.string(), z.string()).optional(),
}).catchall(colorScaleSchema.or(z.record(z.string(), z.string())));

/**
 * Theme typography schema
 */
const themeTypographySchema = z.object({
  fontFamilies: z.object({
    sans: z.array(z.string()).optional(),
    serif: z.array(z.string()).optional(),
    mono: z.array(z.string()).optional(),
    display: z.array(z.string()).optional(),
  }).catchall(z.array(z.string())).optional(),
  fontSizes: z.record(z.string(), z.string()).optional(),
  fontWeights: z.record(z.string(), z.number()).optional(),
  lineHeights: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  letterSpacings: z.record(z.string(), z.string()).optional(),
});

/**
 * Base theme specification schema
 */
export const themeSpecificationSchema = z.object({
  base: z.string().optional(),
  colors: themeColorsSchema.optional(),
  typography: themeTypographySchema.optional(),
  fonts: z.record(z.string(), z.array(z.string())).optional(),
  spacing: z.record(z.string(), z.string()).optional(),
  borderRadius: z.record(z.string(), z.string()).optional(),
  shadows: z.record(z.string(), z.string()).optional(),
  breakpoints: z.record(z.string(), z.string()).optional(),
  zIndices: z.record(z.string(), z.number()).optional(),
  animations: z.record(z.string(), animationPresetSchema).optional(),
});

/**
 * Theme mode schema
 */
const themeModeSchema = z.enum(["light", "dark", "system"]);

/**
 * Theme color mode preset schema
 */
const themeColorModePresetSchema = z.object({
  colors: themeColorsSchema,
  background: z.record(z.string(), z.string()).optional(),
  text: z.record(z.string(), z.string()).optional(),
  border: z.record(z.string(), z.string()).optional(),
});

/**
 * Color mode settings schema
 */
const colorModeSettingsSchema = z.object({
  defaultMode: themeModeSchema,
  respectSystemPreference: z.boolean(),
  storageKey: z.string().optional(),
  transition: z.object({
    duration: z.number(),
    easing: z.string(),
  }).optional(),
  light: themeColorModePresetSchema,
  dark: themeColorModePresetSchema,
});

/**
 * Theme variant schema
 */
const themeVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  componentType: z.string(),
  overrides: themeSpecificationSchema.partial(),
});

/**
 * Extended theme specification schema with advanced features
 */
export const enhancedThemeSpecificationSchema = themeSpecificationSchema.extend({
  colorMode: colorModeSettingsSchema.optional(),
  variants: z.record(z.string(), themeVariantSchema).optional(),
  components: z.record(z.string(), themeSpecificationSchema.partial()).optional(),
  inheritance: z.object({
    parent: z.string().optional(),
    strategy: z.enum(["merge", "replace"]),
    exclude: z.array(z.string()).optional(),
  }).optional(),
  metadata: z.object({
    name: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    version: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  mediaQueries: z.record(z.string(), z.string()).optional(),
  containerQueries: z.record(z.string(), z.string()).optional(),
});

/**
 * Theme token schema
 */
export const themeTokenSchema = z.object({
  token: z.string(),
  value: z.union([z.string(), z.number(), z.record(z.string(), z.unknown())]),
  category: z.enum([
    "color", 
    "typography", 
    "spacing", 
    "borderRadius", 
    "shadow", 
    "animation", 
    "breakpoint",
    "zIndex"
  ]),
  description: z.string().optional(),
});

/**
 * Theme generator configuration schema
 */
export const themeGeneratorConfigSchema = z.object({
  baseColors: z.object({
    primary: z.string(),
    secondary: z.string().optional(),
    accent: z.string().optional(),
    neutral: z.string().optional(),
  }),
  typography: z.object({
    primaryFont: z.array(z.string()),
    headingFont: z.array(z.string()).optional(),
    monoFont: z.array(z.string()).optional(),
    baseFontSize: z.number(),
    scaleFactor: z.number(),
  }),
  borderRadius: z.object({
    base: z.string(),
    rounded: z.boolean(),
  }),
  spacing: z.object({
    baseUnit: z.number(),
    scaleFactor: z.number(),
  }),
});

/**
 * Theme preset schema
 */
export const themePresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  theme: enhancedThemeSpecificationSchema,
  isDefault: z.boolean().optional(),
});

// Export types inferred from schemas
export type ThemeSpecificationSchema = z.infer<typeof themeSpecificationSchema>;
export type EnhancedThemeSpecificationSchema = z.infer<typeof enhancedThemeSpecificationSchema>;
export type ThemeTokenSchema = z.infer<typeof themeTokenSchema>;
export type ThemeGeneratorConfigSchema = z.infer<typeof themeGeneratorConfigSchema>;
export type ThemePresetSchema = z.infer<typeof themePresetSchema>;