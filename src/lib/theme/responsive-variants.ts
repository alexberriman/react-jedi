/**
 * Responsive Variants System
 *
 * Creates responsive variants for all theme tokens including colors, typography,
 * spacing, and other design tokens.
 */

import type { ThemeSpecification } from "@/types/schema/specification";
import type { DesignToken, TokenCollection } from "./theme-tokens";
import type { 
  ResponsiveValue, 
  ResponsiveObject, 
  Breakpoints,
  BreakpointKey 
} from "./responsive-system";
import { 
  normalizeResponsiveValue,
  getResponsiveValue,
  createResponsiveUtils,
  extractBreakpoints 
} from "./responsive-system";

/**
 * Responsive token - extends design token with responsive values
 */
export interface ResponsiveDesignToken<T = unknown> extends Omit<DesignToken<T>, "value"> {
  value: ResponsiveValue<T>;
  responsive: boolean;
}

/**
 * Responsive token collection
 */
export interface ResponsiveTokenCollection {
  colors: Record<string, ResponsiveDesignToken<string>>;
  typography: Record<string, ResponsiveDesignToken<string | number>>;
  spacing: Record<string, ResponsiveDesignToken<string>>;
  borderRadius: Record<string, ResponsiveDesignToken<string>>;
  shadows: Record<string, ResponsiveDesignToken<string>>;
  breakpoints: Record<string, ResponsiveDesignToken<string>>;
  zIndex: Record<string, ResponsiveDesignToken<number>>;
  animations: Record<string, ResponsiveDesignToken<any>>;
}

/**
 * Options for creating responsive tokens
 */
export interface ResponsiveTokenOptions {
  prefix?: string;
  separator?: string;
  generateCssVars?: boolean;
}

/**
 * Create responsive design token
 */
export function createResponsiveToken<T>(
  base: DesignToken<T>,
  responsiveValue: ResponsiveValue<T>,
  breakpoints: Breakpoints
): ResponsiveDesignToken<T> {
  const normalizedValue = normalizeResponsiveValue(responsiveValue, breakpoints);
  const isResponsive = Object.keys(normalizedValue).length > 1 || 
    !normalizedValue.base;

  return {
    ...base,
    value: normalizedValue,
    responsive: isResponsive,
  };
}

/**
 * Generate CSS variables for responsive token
 */
export function generateResponsiveCssVars<T>(
  token: ResponsiveDesignToken<T>,
  breakpoints: Breakpoints,
  transformer?: (value: T) => string
): Record<string, string> {
  const cssVars: Record<string, string> = {};
  const normalizedValue = normalizeResponsiveValue(token.value, breakpoints);
  
  // Base value
  if (normalizedValue.base !== undefined) {
    const value = transformer ? transformer(normalizedValue.base) : String(normalizedValue.base);
    cssVars[token.cssVariable] = value;
  }
  
  // Breakpoint-specific values
  for (const [breakpoint, value] of Object.entries(normalizedValue)) {
    if (breakpoint !== "base" && value !== undefined) {
      const cssVarName = `${token.cssVariable}-${breakpoint}`;
      const transformedValue = transformer ? transformer(value) : String(value);
      cssVars[cssVarName] = transformedValue;
    }
  }
  
  return cssVars;
}

/**
 * Create responsive variant for a token collection category
 */
export function createResponsiveCategory<T>(
  tokens: Record<string, DesignToken<T>>,
  variants: Record<string, ResponsiveValue<T>>,
  breakpoints: Breakpoints
): Record<string, ResponsiveDesignToken<T>> {
  const responsiveTokens: Record<string, ResponsiveDesignToken<T>> = {};
  
  for (const [key, token] of Object.entries(tokens)) {
    const responsiveValue = variants[key] || token.value;
    responsiveTokens[key] = createResponsiveToken(token, responsiveValue, breakpoints);
  }
  
  return responsiveTokens;
}

/**
 * Create responsive token collection from theme
 */
export function createResponsiveTokenCollection(
  collection: TokenCollection,
  theme: ThemeSpecification
): ResponsiveTokenCollection {
  const breakpoints = extractBreakpoints(theme);
  
  return {
    colors: createResponsiveCategory(
      collection.colors,
      theme.colors || {},
      breakpoints
    ),
    typography: createResponsiveCategory(
      collection.typography,
      theme.typography || {},
      breakpoints
    ),
    spacing: createResponsiveCategory(
      collection.spacing,
      theme.spacing || {},
      breakpoints
    ),
    borderRadius: createResponsiveCategory(
      collection.borderRadius,
      theme.borderRadius || {},
      breakpoints
    ),
    shadows: createResponsiveCategory(
      collection.shadows,
      theme.shadows || {},
      breakpoints
    ),
    breakpoints: createResponsiveCategory(
      collection.breakpoints,
      theme.breakpoints || {},
      breakpoints
    ),
    zIndex: createResponsiveCategory(
      collection.zIndex,
      theme.zIndices || {},
      breakpoints
    ),
    animations: createResponsiveCategory(
      collection.animations,
      theme.animations || {},
      breakpoints
    ),
  };
}

/**
 * Resolve token value at breakpoint
 */
export function resolveTokenAtBreakpoint<T>(
  token: ResponsiveDesignToken<T>,
  breakpoint: BreakpointKey,
  breakpoints: Breakpoints
): T | undefined {
  return getResponsiveValue(token.value, breakpoint, breakpoints);
}

/**
 * Apply responsive token to styles
 */
export function applyResponsiveToken<T>(
  token: ResponsiveDesignToken<T>,
  property: string,
  transformer: (value: T) => string,
  breakpoints: Breakpoints
): Record<string, string> {
  const styles: Record<string, string> = {};
  const normalizedValue = normalizeResponsiveValue(token.value, breakpoints);
  const utils = createResponsiveUtils(breakpoints);
  
  // Base value
  if (normalizedValue.base !== undefined) {
    styles[property] = transformer(normalizedValue.base);
  }
  
  // Breakpoint values
  for (const [breakpoint, value] of Object.entries(normalizedValue)) {
    if (breakpoint !== "base" && value !== undefined) {
      const mediaQuery = utils.up(breakpoint);
      if (mediaQuery) {
        styles[mediaQuery] = { [property]: transformer(value) };
      }
    }
  }
  
  return styles;
}

/**
 * Create utility for working with responsive tokens
 */
export function createResponsiveTokenUtils(theme: ThemeSpecification) {
  const breakpoints = extractBreakpoints(theme);
  
  return {
    /**
     * Get token value at current breakpoint
     */
    getValue: <T>(
      token: ResponsiveDesignToken<T>,
      breakpoint: BreakpointKey
    ): T | undefined => {
      return resolveTokenAtBreakpoint(token, breakpoint, breakpoints);
    },
    
    /**
     * Apply token to CSS property
     */
    apply: <T>(
      token: ResponsiveDesignToken<T>,
      property: string,
      transformer: (value: T) => string = String
    ): Record<string, string> => {
      return applyResponsiveToken(token, property, transformer, breakpoints);
    },
    
    /**
     * Generate CSS variables
     */
    toCssVars: <T>(
      token: ResponsiveDesignToken<T>,
      transformer?: (value: T) => string
    ): Record<string, string> => {
      return generateResponsiveCssVars(token, breakpoints, transformer);
    },
    
    /**
     * Check if token is responsive
     */
    isResponsive: <T>(token: ResponsiveDesignToken<T>): boolean => {
      return token.responsive;
    },
  };
}

/**
 * Example utility for creating responsive color token
 */
export function createResponsiveColorToken(
  id: string,
  name: string,
  responsiveValue: ResponsiveValue<string>,
  theme: ThemeSpecification
): ResponsiveDesignToken<string> {
  const breakpoints = extractBreakpoints(theme);
  
  const baseToken: DesignToken<string> = {
    id,
    name,
    value: typeof responsiveValue === "string" ? responsiveValue : "",
    category: "color",
    cssVariable: `--color-${id}`,
    path: `colors.${id}`,
  };
  
  return createResponsiveToken(baseToken, responsiveValue, breakpoints);
}

/**
 * Example utility for creating responsive spacing token
 */
export function createResponsiveSpacingToken(
  id: string,
  name: string,
  responsiveValue: ResponsiveValue<string>,
  theme: ThemeSpecification
): ResponsiveDesignToken<string> {
  const breakpoints = extractBreakpoints(theme);
  
  const baseToken: DesignToken<string> = {
    id,
    name,
    value: typeof responsiveValue === "string" ? responsiveValue : "",
    category: "spacing",
    cssVariable: `--spacing-${id}`,
    path: `spacing.${id}`,
  };
  
  return createResponsiveToken(baseToken, responsiveValue, breakpoints);
}

/**
 * Example utility for creating responsive typography token
 */
export function createResponsiveTypographyToken(
  id: string,
  name: string,
  responsiveValue: ResponsiveValue<string | number>,
  theme: ThemeSpecification
): ResponsiveDesignToken<string | number> {
  const breakpoints = extractBreakpoints(theme);
  
  const baseToken: DesignToken<string | number> = {
    id,
    name,
    value: typeof responsiveValue === "string" || typeof responsiveValue === "number" 
      ? responsiveValue : "",
    category: "typography",
    cssVariable: `--typography-${id}`,
    path: `typography.${id}`,
  };
  
  return createResponsiveToken(baseToken, responsiveValue, breakpoints);
}