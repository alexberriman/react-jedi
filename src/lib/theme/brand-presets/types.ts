/**
 * Brand preset types
 *
 * Defines the structure for brand preset themes and utilities
 */

import type { ThemeSpecification } from "../../../types/schema/specification";

/**
 * Brand preset definition
 */
export interface BrandPreset {
  id: string;
  name: string;
  description: string;
  category: BrandCategory;
  colors: BrandColors;
  typography: BrandTypography;
  personality: BrandPersonality;
  settings?: Partial<ThemeSpecification>;
}

/**
 * Brand categories
 */
export type BrandCategory =
  | "technology"
  | "finance"
  | "healthcare"
  | "education"
  | "retail"
  | "creative"
  | "professional"
  | "minimal"
  | "luxury"
  | "startup";

/**
 * Brand colors configuration
 */
export interface BrandColors {
  primary: string;
  secondary?: string;
  accent?: string;
  neutral?: string;
  background?: string;
  foreground?: string;
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

/**
 * Brand typography configuration
 */
export interface BrandTypography {
  fontFamily?: {
    heading?: string;
    body?: string;
    mono?: string;
  };
  fontWeight?: {
    light?: number;
    regular?: number;
    medium?: number;
    semibold?: number;
    bold?: number;
  };
  letterSpacing?: string;
  lineHeight?: string;
}

/**
 * Brand personality traits
 */
export interface BrandPersonality {
  modern: number; // 0-100
  professional: number; // 0-100
  playful: number; // 0-100
  minimal: number; // 0-100
  bold: number; // 0-100
  elegant: number; // 0-100
}

/**
 * Brand theme generation options
 */
export interface BrandThemeOptions {
  preset?: string;
  colors?: Partial<BrandColors>;
  typography?: Partial<BrandTypography>;
  personality?: Partial<BrandPersonality>;
  overrides?: Partial<ThemeSpecification>;
}

/**
 * Generated brand theme
 */
export interface GeneratedBrandTheme {
  theme: ThemeSpecification;
  preset: BrandPreset;
  metadata: {
    generatedAt: string;
    version: string;
  };
}
