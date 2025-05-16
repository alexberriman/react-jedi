/**
 * Style Extension System
 *
 * This module provides a comprehensive style extension system that enables:
 * - Style inheritance from parent components
 * - Component style composition for combining multiple style sources
 * - Cascading style resolution following CSS-like precedence rules
 *
 * The system follows CSS principles while being optimized for React and TailwindCSS.
 */

import { cn } from "../utils";
import type { ComponentSpec } from "@/types/schema/components";
import type { ThemeSpecification, StyleOverride } from "@/types/schema/specification";
import type { TokenResolver } from "./token-resolver";

/**
 * Style context for tracking inherited styles through the component tree
 */
export interface StyleContext {
  /**
   * Accumulated className from parent components
   */
  inheritedClassName?: string;

  /**
   * Accumulated CSS properties from parent components
   */
  inheritedStyle?: React.CSSProperties;

  /**
   * Component-specific style overrides from parents
   */
  parentOverrides?: Record<string, StyleOverride>;

  /**
   * Component hierarchy path for cascade resolution
   */
  componentPath: string[];

  /**
   * Current theme being used
   */
  theme: ThemeSpecification;

  /**
   * Token resolver instance
   */
  tokens: TokenResolver;
}

/**
 * Style inheritance configuration
 */
export interface StyleInheritanceConfig {
  /**
   * CSS properties that should inherit by default
   * Based on CSS inheritance model
   */
  inheritableProperties: Set<string>;

  /**
   * Component types that should pass down inherited styles
   */
  inheritingComponents: Set<string>;

  /**
   * Component types that should reset inheritance
   */
  boundaryComponents: Set<string>;
}

/**
 * Default CSS properties that inherit in standard CSS
 * Based on MDN documentation and CSS specification
 */
export const DEFAULT_INHERITABLE_PROPERTIES = new Set([
  "color",
  "font",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "fontVariant",
  "lineHeight",
  "letterSpacing",
  "textAlign",
  "textIndent",
  "textTransform",
  "whiteSpace",
  "wordSpacing",
  "wordBreak",
  "wordWrap",
  "direction",
  "cursor",
  "listStyle",
  "listStyleType",
  "listStylePosition",
  "listStyleImage",
  "visibility",
  "quotes",
  "orphans",
  "widows",
  "borderCollapse",
  "borderSpacing",
  "emptyCells",
  "captionSide",
  "tableLayout",
]);

/**
 * Component types that typically inherit text styles
 */
export const DEFAULT_INHERITING_COMPONENTS = new Set([
  "Text",
  "Heading",
  "BlockQuote",
  "Badge",
  "Button",
  "Label",
]);

/**
 * Component types that create new stacking contexts or style boundaries
 */
export const DEFAULT_BOUNDARY_COMPONENTS = new Set([
  "Card",
  "Modal",
  "Dialog",
  "Popover",
  "Tooltip",
  "Sheet",
]);

/**
 * Default inheritance configuration
 */
export const DEFAULT_INHERITANCE_CONFIG: StyleInheritanceConfig = {
  inheritableProperties: DEFAULT_INHERITABLE_PROPERTIES,
  inheritingComponents: DEFAULT_INHERITING_COMPONENTS,
  boundaryComponents: DEFAULT_BOUNDARY_COMPONENTS,
};

/**
 * Extract inheritable styles from a style object
 */
export function extractInheritableStyles(
  styles: React.CSSProperties | undefined,
  config: StyleInheritanceConfig = DEFAULT_INHERITANCE_CONFIG
): React.CSSProperties {
  if (!styles) return {};

  const inheritable: React.CSSProperties = {};

  for (const [key, value] of Object.entries(styles)) {
    if (config.inheritableProperties.has(key)) {
      inheritable[key as keyof React.CSSProperties] = value;
    }
  }

  return inheritable;
}

/**
 * Extract styles that should not be inherited
 */
export function extractNonInheritableStyles(
  styles: React.CSSProperties | undefined,
  config: StyleInheritanceConfig = DEFAULT_INHERITANCE_CONFIG
): React.CSSProperties {
  if (!styles) return {};

  const nonInheritable: React.CSSProperties = {};

  for (const [key, value] of Object.entries(styles)) {
    if (!config.inheritableProperties.has(key)) {
      nonInheritable[key as keyof React.CSSProperties] = value;
    }
  }

  return nonInheritable;
}

/**
 * Determine if a component should inherit styles
 */
export function shouldInheritStyles(
  componentType: string,
  config: StyleInheritanceConfig = DEFAULT_INHERITANCE_CONFIG
): boolean {
  // Boundary components don't inherit
  if (config.boundaryComponents.has(componentType)) {
    return false;
  }

  // Explicitly marked components inherit
  return config.inheritingComponents.has(componentType);
}

/**
 * Create a new style context for a child component
 */
export function createChildStyleContext(
  parentContext: StyleContext,
  childSpec: ComponentSpec,
  childOverrides: { className?: string; style?: React.CSSProperties }
): StyleContext {
  const config = DEFAULT_INHERITANCE_CONFIG;
  const shouldInherit = shouldInheritStyles(childSpec.type, config);
  const isBoundary = config.boundaryComponents.has(childSpec.type);

  // If it's a boundary component, reset inheritance
  if (isBoundary) {
    return {
      theme: parentContext.theme,
      tokens: parentContext.tokens,
      componentPath: [...parentContext.componentPath, childSpec.type],
      // No inherited styles for boundary components
    };
  }

  // If component should inherit, merge parent styles
  if (shouldInherit) {
    const inheritableParentStyles = extractInheritableStyles(parentContext.inheritedStyle);
    const inheritableChildStyles = extractInheritableStyles(childOverrides.style);

    return {
      inheritedClassName: cn(parentContext.inheritedClassName, childOverrides.className),
      inheritedStyle: {
        ...inheritableParentStyles,
        ...inheritableChildStyles,
      },
      parentOverrides: parentContext.parentOverrides,
      theme: parentContext.theme,
      tokens: parentContext.tokens,
      componentPath: [...parentContext.componentPath, childSpec.type],
    };
  }

  // Otherwise, just maintain context without inheritance
  return {
    ...parentContext,
    componentPath: [...parentContext.componentPath, childSpec.type],
  };
}

/**
 * Style composition configuration
 */
export interface StyleCompositionConfig {
  /**
   * Order of style sources (later sources override earlier ones)
   */
  precedenceOrder: string[];

  /**
   * Whether to merge or replace array values
   */
  mergeArrays: boolean;

  /**
   * Custom merge functions for specific properties
   */
  propertyMergers?: Record<string, (a: unknown, b: unknown) => unknown>;
}

/**
 * Default style composition configuration
 */
export const DEFAULT_COMPOSITION_CONFIG: StyleCompositionConfig = {
  precedenceOrder: [
    "theme.defaults",
    "theme.components",
    "parent.inherited",
    "spec.style",
    "spec.className",
    "runtime.overrides",
  ],
  mergeArrays: false,
};

/**
 * Style source with metadata
 */
export interface StyleSource {
  /**
   * Source identifier for precedence
   */
  source: string;

  /**
   * CSS class names
   */
  className?: string;

  /**
   * CSS properties
   */
  style?: React.CSSProperties;

  /**
   * Priority weight (higher overrides lower)
   */
  priority?: number;
}

/**
 * Compose multiple style sources into final styles
 */
export function composeStyles(
  sources: StyleSource[],
  config: StyleCompositionConfig = DEFAULT_COMPOSITION_CONFIG
): { className?: string; style?: React.CSSProperties } {
  // Sort sources by precedence
  const sortedSources = [...sources].sort((a, b) => {
    const aPriority = a.priority ?? config.precedenceOrder.indexOf(a.source);
    const bPriority = b.priority ?? config.precedenceOrder.indexOf(b.source);
    return aPriority - bPriority;
  });

  let composedClassName = "";
  let composedStyle: React.CSSProperties = {};

  for (const source of sortedSources) {
    if (source.className) {
      composedClassName = cn(composedClassName, source.className);
    }

    if (source.style) {
      composedStyle = mergeStyleObjects(composedStyle, source.style, config.propertyMergers);
    }
  }

  return {
    className: composedClassName || undefined,
    style: Object.keys(composedStyle).length > 0 ? composedStyle : undefined,
  };
}

/**
 * Merge two style objects with custom property handling
 */
function mergeStyleObjects(
  base: React.CSSProperties,
  override: React.CSSProperties,
  propertyMergers?: Record<string, (a: unknown, b: unknown) => unknown>
): React.CSSProperties {
  const merged: React.CSSProperties = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const cssKey = key as keyof React.CSSProperties;

    if (propertyMergers?.[key]) {
      // Use custom merger for this property
      const mergedValue = propertyMergers[key](base[cssKey], value);

      // For property mergers, we need to cast the result
      // This is safe because propertyMergers should return appropriate values
      if (mergedValue !== undefined) {
        (merged as { [key: string]: unknown })[key] = mergedValue;
      }
    } else {
      // Type-safe property assignment
      (merged as { [key: string]: unknown })[key] = value;
    }
  }

  return merged;
}

/**
 * Create a style composer function
 */
export function createStyleComposer(
  config: StyleCompositionConfig = DEFAULT_COMPOSITION_CONFIG
): (sources: StyleSource[]) => { className?: string; style?: React.CSSProperties } {
  return (sources) => composeStyles(sources, config);
}

/**
 * Cascade resolution configuration
 */
export interface CascadeConfig {
  /**
   * Enable specificity calculation
   */
  useSpecificity: boolean;

  /**
   * Enable !important handling
   */
  handleImportant: boolean;

  /**
   * Custom specificity calculator
   */
  specificityCalculator?: (source: StyleSource) => number;
}

/**
 * Default cascade configuration
 */
export const DEFAULT_CASCADE_CONFIG: CascadeConfig = {
  useSpecificity: true,
  handleImportant: true,
};

/**
 * Calculate specificity for a style source
 * Based on CSS specificity rules adapted for our system
 */
export function calculateSpecificity(source: StyleSource): number {
  let specificity = 0;

  // Base specificity by source type
  switch (source.source) {
    case "theme.defaults": {
      specificity += 0; // Lowest
      break;
    }
    case "theme.components": {
      specificity += 10;
      break;
    }
    case "parent.inherited": {
      specificity += 20;
      break;
    }
    case "spec.style": {
      specificity += 30;
      break;
    }
    case "spec.className": {
      specificity += 40;
      break;
    }
    case "runtime.overrides": {
      specificity += 50; // Highest
      break;
    }
  }

  // Add priority if specified
  if (source.priority !== undefined) {
    specificity += source.priority * 100;
  }

  // Count selectors in className for additional specificity
  if (source.className) {
    const classCount = source.className.split(/\s+/).length;
    specificity += classCount;
  }

  return specificity;
}

/**
 * Extract important styles from a style object
 */
function extractImportantStyles(
  style: React.CSSProperties,
  config: CascadeConfig
): { regular: React.CSSProperties; important: React.CSSProperties } {
  const regular: React.CSSProperties = {};
  const important: React.CSSProperties = {};

  for (const [key, value] of Object.entries(style)) {
    if (config.handleImportant && typeof value === "string" && value.includes("!important")) {
      // Use indexOf/slice for safer string manipulation
      const importantIndex = value.indexOf("!important");
      const cleanValue = value.slice(0, importantIndex).trim();
      important[key as keyof React.CSSProperties] = cleanValue as never;
    } else {
      regular[key as keyof React.CSSProperties] = value;
    }
  }

  return { regular, important };
}

/**
 * Process a style source and apply it to the cascade
 */
function processStyleSource(
  source: StyleSource,
  cascadedClassName: string,
  cascadedStyle: React.CSSProperties,
  importantStyles: React.CSSProperties,
  config: CascadeConfig
): {
  className: string;
  style: React.CSSProperties;
  important: React.CSSProperties;
} {
  let className = cascadedClassName;
  let style = { ...cascadedStyle };
  let important = { ...importantStyles };

  if (source.className) {
    className = cn(className, source.className);
  }

  if (source.style) {
    const { regular, important: newImportant } = extractImportantStyles(source.style, config);

    // Apply regular styles if not overridden by important
    for (const [key, value] of Object.entries(regular)) {
      if (!important[key as keyof React.CSSProperties]) {
        style[key as keyof React.CSSProperties] = value;
      }
    }

    // Important styles override everything
    important = { ...important, ...newImportant };
  }

  return { className, style, important };
}

/**
 * Resolve cascading styles using CSS-like rules
 */
export function cascadeStyles(
  sources: StyleSource[],
  config: CascadeConfig = DEFAULT_CASCADE_CONFIG
): { className?: string; style?: React.CSSProperties } {
  if (!config.useSpecificity) {
    return composeStyles(sources);
  }

  // Sort by specificity
  const specificityCalculator = config.specificityCalculator || calculateSpecificity;
  const sortedSources = [...sources].sort((a, b) => {
    const aSpec = specificityCalculator(a);
    const bSpec = specificityCalculator(b);
    return aSpec - bSpec;
  });

  // Apply cascade resolution
  let result = {
    className: "",
    style: {} as React.CSSProperties,
    important: {} as React.CSSProperties,
  };

  for (const source of sortedSources) {
    result = processStyleSource(source, result.className, result.style, result.important, config);
  }

  // Merge important styles last
  const finalStyle = { ...result.style, ...result.important };

  return {
    className: result.className || undefined,
    style: Object.keys(finalStyle).length > 0 ? finalStyle : undefined,
  };
}

/**
 * Create a cascade resolver
 */
export function createCascadeResolver(
  config: CascadeConfig = DEFAULT_CASCADE_CONFIG
): (sources: StyleSource[]) => { className?: string; style?: React.CSSProperties } {
  return (sources) => cascadeStyles(sources, config);
}

/**
 * Complete style extension pipeline
 * Combines inheritance, composition, and cascade resolution
 */
export function resolveExtendedStyles(
  spec: ComponentSpec,
  context: StyleContext,
  themeOverrides: { className?: string; style?: React.CSSProperties },
  options?: {
    inheritance?: StyleInheritanceConfig;
    composition?: StyleCompositionConfig;
    cascade?: CascadeConfig;
  }
): { className?: string; style?: React.CSSProperties } {
  const sources: StyleSource[] = [];

  // Skip theme defaults as they're not part of ThemeSpecification

  // Add theme component overrides
  if (themeOverrides.className || themeOverrides.style) {
    sources.push({
      source: "theme.components",
      className: themeOverrides.className,
      style: themeOverrides.style,
    });
  }

  // Add inherited styles if applicable
  if (shouldInheritStyles(spec.type, options?.inheritance)) {
    sources.push({
      source: "parent.inherited",
      className: context.inheritedClassName,
      style: context.inheritedStyle,
    });
  }

  // Add spec styles
  if (spec.style) {
    sources.push({
      source: "spec.style",
      style: spec.style,
    });
  }

  if (spec.className) {
    sources.push({
      source: "spec.className",
      className: spec.className as string,
    });
  }

  // Apply cascade resolution
  return cascadeStyles(sources, options?.cascade);
}

/**
 * Create style extension utilities for a theme
 */
export function createStyleExtension(theme: ThemeSpecification) {
  const inheritanceConfig: StyleInheritanceConfig = {
    ...DEFAULT_INHERITANCE_CONFIG,
    ...(theme.styleExtension?.inheritance && {
      inheritableProperties: Array.isArray(theme.styleExtension.inheritance.inheritableProperties)
        ? new Set(theme.styleExtension.inheritance.inheritableProperties)
        : theme.styleExtension.inheritance.inheritableProperties ||
          DEFAULT_INHERITANCE_CONFIG.inheritableProperties,
      inheritingComponents: Array.isArray(theme.styleExtension.inheritance.inheritingComponents)
        ? new Set(theme.styleExtension.inheritance.inheritingComponents)
        : theme.styleExtension.inheritance.inheritingComponents ||
          DEFAULT_INHERITANCE_CONFIG.inheritingComponents,
      boundaryComponents: Array.isArray(theme.styleExtension.inheritance.boundaryComponents)
        ? new Set(theme.styleExtension.inheritance.boundaryComponents)
        : theme.styleExtension.inheritance.boundaryComponents ||
          DEFAULT_INHERITANCE_CONFIG.boundaryComponents,
    }),
  };

  const compositionConfig = {
    ...DEFAULT_COMPOSITION_CONFIG,
    ...theme.styleExtension?.composition,
  };

  const cascadeConfig = {
    ...DEFAULT_CASCADE_CONFIG,
    ...theme.styleExtension?.cascade,
  };

  return {
    extractInheritable: (styles: React.CSSProperties | undefined) =>
      extractInheritableStyles(styles, inheritanceConfig),

    shouldInherit: (componentType: string) => shouldInheritStyles(componentType, inheritanceConfig),

    compose: (sources: StyleSource[]) => composeStyles(sources, compositionConfig),

    cascade: (sources: StyleSource[]) => cascadeStyles(sources, cascadeConfig),

    resolve: (
      spec: ComponentSpec,
      context: StyleContext,
      themeOverrides: { className?: string; style?: React.CSSProperties }
    ) =>
      resolveExtendedStyles(spec, context, themeOverrides, {
        inheritance: inheritanceConfig,
        composition: compositionConfig,
        cascade: cascadeConfig,
      }),
  };
}
