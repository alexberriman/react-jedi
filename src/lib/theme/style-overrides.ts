/**
 * Component Style Overrides System
 * 
 * This module provides a system for overriding component styles through the
 * theme system, allowing Server-Driven UI specifications to customize
 * component appearance at runtime.
 */

import { cn } from "../utils";
import type { ComponentSpec } from "@/types/schema/components";
import type { 
  ThemeSpecification,
  ComponentStyleOverrides,
  ComponentStyleOverride,
  StyleOverride 
} from "@/types/schema/specification";
import { type TokenResolver } from "./token-resolver";

/**
 * Style function type for dynamic styling
 */
export type StyleFunction = (props: {
  theme: ThemeSpecification;
  tokens: TokenResolver;
  spec: ComponentSpec;
}) => {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Process style overrides for a component
 */
export function processStyleOverrides(
  spec: ComponentSpec,
  theme: ThemeSpecification,
  tokenResolver: TokenResolver
): {
  className?: string;
  style?: React.CSSProperties;
} {
  const componentType = spec.type;
  const overrides = theme.components?.[componentType];
  
  if (!overrides) {
    return {};
  }
  
  const classes: string[] = [];
  const styles: React.CSSProperties = {};
  
  // Apply global overrides
  if (overrides.global) {
    if (overrides.global.className) {
      classes.push(overrides.global.className);
    }
    if (overrides.global.styles) {
      Object.assign(styles, overrides.global.styles);
    }
    if (overrides.global.tokens) {
      applyTokenStyles(overrides.global.tokens, styles, tokenResolver);
    }
  }
  
  // Apply variant-specific overrides
  const variant = getComponentVariant(spec);
  if (variant && overrides.variants?.[variant]) {
    const variantOverride = overrides.variants[variant];
    if (variantOverride.className) {
      classes.push(variantOverride.className);
    }
    if (variantOverride.styles) {
      Object.assign(styles, variantOverride.styles);
    }
    if (variantOverride.tokens) {
      applyTokenStyles(variantOverride.tokens, styles, tokenResolver);
    }
  }
  
  // Apply size-specific overrides
  const size = getComponentSize(spec);
  if (size && overrides.sizes?.[size]) {
    const sizeOverride = overrides.sizes[size];
    if (sizeOverride.className) {
      classes.push(sizeOverride.className);
    }
    if (sizeOverride.styles) {
      Object.assign(styles, sizeOverride.styles);
    }
    if (sizeOverride.tokens) {
      applyTokenStyles(sizeOverride.tokens, styles, tokenResolver);
    }
  }
  
  // Apply combination overrides
  if (overrides.combinations) {
    for (const combo of overrides.combinations) {
      if (matchesCombination(spec, combo)) {
        if (combo.className) {
          classes.push(combo.className);
        }
        if (combo.styles) {
          Object.assign(styles, combo.styles);
        }
        if (combo.tokens) {
          applyTokenStyles(combo.tokens, styles, tokenResolver);
        }
      }
    }
  }
  
  // Apply spec-level style overrides
  if (spec.className) {
    classes.push(spec.className);
  }
  if (spec.style) {
    Object.assign(styles, spec.style);
  }
  
  return {
    className: cn(...classes),
    style: Object.keys(styles).length > 0 ? styles : undefined,
  };
}

/**
 * Create a style function from overrides
 */
export function createStyleFunction(overrides: StyleOverride[]): StyleFunction {
  return ({ theme, tokens, spec }) => {
    const classes: string[] = [];
    const styles: React.CSSProperties = {};
    
    for (const override of overrides) {
      if (override.component !== spec.type) continue;
      
      if (override.variant && getComponentVariant(spec) !== override.variant) continue;
      if (override.size && getComponentSize(spec) !== override.size) continue;
      
      if (override.className) {
        classes.push(override.className);
      }
      if (override.styles) {
        Object.assign(styles, override.styles);
      }
      if (override.tokens) {
        applyTokenStyles(override.tokens, styles, tokens);
      }
    }
    
    return {
      className: cn(...classes),
      style: Object.keys(styles).length > 0 ? styles : undefined,
    };
  };
}

/**
 * Apply token-based styles
 */
function applyTokenStyles(
  tokens: Record<string, string>,
  styles: React.CSSProperties,
  tokenResolver: TokenResolver
): void {
  for (const [property, token] of Object.entries(tokens)) {
    const value = tokenResolver.resolve(token);
    if (value !== undefined) {
      // Convert CSS property names from camelCase to kebab-case if needed
      const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
      (styles as Record<string, unknown>)[cssProperty] = value;
    }
  }
}

/**
 * Get component variant from spec
 */
function getComponentVariant(spec: ComponentSpec): string | undefined {
  // Cast to any to access variant property if it exists
  const anySpec = spec as Record<string, unknown>;
  if ("variant" in anySpec && typeof anySpec.variant === "string") {
    return anySpec.variant;
  }
  return undefined;
}

/**
 * Get component size from spec
 */
function getComponentSize(spec: ComponentSpec): string | undefined {
  // Cast to any to access size property if it exists
  const anySpec = spec as Record<string, unknown>;
  if ("size" in anySpec && typeof anySpec.size === "string") {
    return anySpec.size;
  }
  return undefined;
}

/**
 * Check if spec matches a combination override
 */
function matchesCombination(spec: ComponentSpec, combo: StyleOverride): boolean {
  if (combo.variant && getComponentVariant(spec) !== combo.variant) return false;
  if (combo.size && getComponentSize(spec) !== combo.size) return false;
  
  return true;
}

/**
 * Style merge utilities for cascading styles
 */
export function mergeStyles(
  base: { className?: string; style?: React.CSSProperties },
  override: { className?: string; style?: React.CSSProperties }
): { className?: string; style?: React.CSSProperties } {
  return {
    className: cn(base.className, override.className),
    style: {
      ...base.style,
      ...override.style,
    },
  };
}

/**
 * Create style cascade from multiple sources
 */
export function cascadeStyles(
  ...sources: Array<{ className?: string; style?: React.CSSProperties }>
): { className?: string; style?: React.CSSProperties } {
  return sources.reduce((acc, source) => mergeStyles(acc, source), {});
}