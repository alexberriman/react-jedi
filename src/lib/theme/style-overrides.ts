/**
 * Component Style Overrides System
 *
 * This module provides a system for overriding component styles through the
 * theme system, allowing Server-Driven UI specifications to customize
 * component appearance at runtime.
 */

import { cn } from "../utils";
import type { ComponentSpec } from "../../types/schema/components";
import type { ThemeSpecification, StyleOverride } from "../../types/schema/specification";
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
 * Override result type for accumulating styles
 */
interface OverrideResult {
  classes: string[];
  styles: React.CSSProperties;
}

/**
 * Apply a single style override
 *
 * @param spec The component specification
 * @param override The style override to apply
 * @param tokens The token resolver instance
 * @param result The accumulated result object
 */
function applyOverride(
  override: StyleOverride | undefined,
  tokenResolver: TokenResolver
): OverrideResult {
  if (!override) {
    return { classes: [], styles: {} };
  }

  const result: OverrideResult = { classes: [], styles: {} };

  if (override.className) {
    result.classes.push(override.className);
  }
  if (override.styles) {
    Object.assign(result.styles, override.styles);
  }
  if (override.tokens) {
    applyTokenStyles(override.tokens, result.styles, tokenResolver);
  }

  return result;
}

/**
 * Merge override results
 */
function mergeOverrideResult(target: OverrideResult, source: OverrideResult): void {
  target.classes.push(...source.classes);
  Object.assign(target.styles, source.styles);
}

/**
 * Apply style override conditionally based on component spec
 */
function applyStyleOverride(
  spec: ComponentSpec,
  override: StyleOverride,
  tokens: TokenResolver,
  result: OverrideResult
): boolean {
  // Component type checking is done at a higher level
  if (override.variant && getComponentVariant(spec) !== override.variant) return false;
  if (override.size !== undefined && getComponentSize(spec) !== override.size) return false;

  if (override.className) {
    result.classes.push(override.className);
  }
  if (override.styles) {
    Object.assign(result.styles, override.styles);
  }
  if (override.tokens) {
    applyTokenStyles(override.tokens, result.styles, tokens);
  }

  return true;
}

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

  // Apply base override styles
  const result = applyOverride(overrides.global, tokenResolver);

  // Apply variant-specific overrides
  const variant = getComponentVariant(spec);
  if (variant && overrides.variants?.[variant]) {
    mergeOverrideResult(result, applyOverride(overrides.variants[variant], tokenResolver));
  }

  // Apply size-specific overrides
  const size = getComponentSize(spec);
  if (size && overrides.sizes?.[size]) {
    mergeOverrideResult(result, applyOverride(overrides.sizes[size], tokenResolver));
  }

  // Apply combination overrides
  if (overrides.combinations) {
    for (const combo of overrides.combinations) {
      if (matchesCombination(spec, combo)) {
        mergeOverrideResult(result, applyOverride(combo, tokenResolver));
      }
    }
  }

  // Apply spec-level style overrides
  if (spec.className) {
    result.classes.push(spec.className as string);
  }
  if (spec.style) {
    Object.assign(result.styles, spec.style);
  }

  return {
    className: cn(...result.classes),
    style: Object.keys(result.styles).length > 0 ? result.styles : undefined,
  };
}

/**
 * Create a style function from overrides
 */
export function createStyleFunction(overrides: StyleOverride[]): StyleFunction {
  return ({ tokens, spec }) => {
    const result = { classes: [] as string[], styles: {} as React.CSSProperties };

    for (const override of overrides) {
      if (!applyStyleOverride(spec, override, tokens, result)) {
        continue;
      }
    }

    return {
      className: cn(...result.classes),
      style: Object.keys(result.styles).length > 0 ? result.styles : undefined,
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
      // Use the property name as-is for React inline styles (should be camelCase)
      (styles as Record<string, unknown>)[property] = value;
    }
  }
}

/**
 * Get component variant from spec
 */
function getComponentVariant(spec: ComponentSpec): string | undefined {
  // Cast to any to access variant property if it exists
  const anySpec = spec as unknown as Record<string, unknown>;
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
  const anySpec = spec as unknown as Record<string, unknown>;
  if ("size" in anySpec && typeof anySpec.size === "string") {
    return anySpec.size;
  }
  return undefined;
}

/**
 * Check if spec matches a combination override
 */
function matchesCombination(spec: ComponentSpec, combo: StyleOverride): boolean {
  return (
    (!combo.variant || getComponentVariant(spec) === combo.variant) &&
    (combo.size === undefined || getComponentSize(spec) === combo.size)
  );
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
  let result = {} as { className?: string; style?: React.CSSProperties };

  for (const source of sources) {
    result = mergeStyles(result, source);
  }

  return result;
}
