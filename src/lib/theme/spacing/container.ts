/**
 * Container Spacing Presets
 *
 * This module provides a system for managing container spacing patterns
 * that can be applied consistently across different components.
 */

import type { ThemeSpecification } from "../../../types/schema/specification";
import type { SpacingKey } from "./scale";
import type { ResponsiveSpacingObject, BreakpointKey } from "./responsive";
import { extractSpacingScale, getSpacing } from "./scale";
import { resolveResponsiveSpacing } from "./responsive";

/**
 * Unified spacing value type that can be a direct value or responsive object
 */
export type SpacingValue = SpacingKey | string | ResponsiveSpacingObject;

/**
 * Container spacing configuration
 */
export interface ContainerSpacing {
  /**
   * Padding for all sides
   */
  padding?: SpacingValue;

  /**
   * Horizontal padding (left and right)
   */
  paddingX?: SpacingValue;

  /**
   * Vertical padding (top and bottom)
   */
  paddingY?: SpacingValue;

  /**
   * Top padding
   */
  paddingTop?: SpacingValue;

  /**
   * Right padding
   */
  paddingRight?: SpacingValue;

  /**
   * Bottom padding
   */
  paddingBottom?: SpacingValue;

  /**
   * Left padding
   */
  paddingLeft?: SpacingValue;

  /**
   * Gap between children (for flex/grid containers)
   */
  gap?: SpacingValue;

  /**
   * Horizontal gap (for grid containers)
   */
  columnGap?: SpacingValue;

  /**
   * Vertical gap (for grid containers)
   */
  rowGap?: SpacingValue;

  /**
   * Margin around container
   */
  margin?: SpacingValue;

  /**
   * Horizontal margins (left and right)
   */
  marginX?: SpacingValue;

  /**
   * Vertical margins (top and bottom)
   */
  marginY?: SpacingValue;
}

/**
 * Container spacing preset types with specific use cases
 */
export enum ContainerPresetType {
  // Layout presets
  LAYOUT_NONE = "layout-none",
  LAYOUT_TIGHT = "layout-tight",
  LAYOUT_COMPACT = "layout-compact",
  LAYOUT_NORMAL = "layout-normal",
  LAYOUT_RELAXED = "layout-relaxed",
  LAYOUT_SPACIOUS = "layout-spacious",

  // Section presets
  SECTION_HERO = "section-hero",
  SECTION_DEFAULT = "section-default",
  SECTION_FEATURE = "section-feature",
  SECTION_CTA = "section-cta",

  // Component presets
  CARD = "card",
  FORM = "form",
  MODAL = "modal",
  SIDEBAR = "sidebar",
  NAVBAR = "navbar",
  FOOTER = "footer",

  // Content presets
  CONTENT_DENSE = "content-dense",
  CONTENT_NORMAL = "content-normal",
  CONTENT_SPACIOUS = "content-spacious",
}

/**
 * Default container spacing presets with theme-aware values
 */
export const DEFAULT_CONTAINER_PRESETS: Record<ContainerPresetType, ContainerSpacing> = {
  // Layout presets
  [ContainerPresetType.LAYOUT_NONE]: {
    padding: "0",
    gap: "0",
  },
  [ContainerPresetType.LAYOUT_TIGHT]: {
    padding: "4",
    gap: "4",
  },
  [ContainerPresetType.LAYOUT_COMPACT]: {
    padding: "6",
    gap: "6",
  },
  [ContainerPresetType.LAYOUT_NORMAL]: {
    padding: { base: "4", md: "6", lg: "8" },
    gap: { base: "6", md: "8" },
  },
  [ContainerPresetType.LAYOUT_RELAXED]: {
    padding: { base: "6", md: "8", lg: "12" },
    gap: { base: "8", md: "10" },
  },
  [ContainerPresetType.LAYOUT_SPACIOUS]: {
    padding: { base: "8", md: "12", lg: "16" },
    gap: { base: "10", md: "12" },
  },

  // Section presets
  [ContainerPresetType.SECTION_HERO]: {
    paddingY: { base: "16", md: "20", lg: "24" },
    paddingX: { base: "4", md: "6", lg: "8" },
    gap: { base: "8", md: "12" },
  },
  [ContainerPresetType.SECTION_DEFAULT]: {
    paddingY: { base: "12", md: "16", lg: "20" },
    paddingX: { base: "4", md: "6", lg: "8" },
    gap: { base: "6", md: "10" },
  },
  [ContainerPresetType.SECTION_FEATURE]: {
    paddingY: { base: "12", md: "16", lg: "20" },
    paddingX: { base: "4", md: "6", lg: "8" },
    gap: { base: "8", md: "12" },
  },
  [ContainerPresetType.SECTION_CTA]: {
    paddingY: { base: "10", md: "12", lg: "16" },
    paddingX: { base: "4", md: "6", lg: "8" },
    gap: { base: "6", md: "8" },
  },

  // Component presets
  [ContainerPresetType.CARD]: {
    padding: { base: "4", md: "6" },
    gap: { base: "3", md: "4" },
  },
  [ContainerPresetType.FORM]: {
    padding: "4",
    gap: "6",
  },
  [ContainerPresetType.MODAL]: {
    padding: { base: "4", md: "6" },
    gap: { base: "4", md: "6" },
  },
  [ContainerPresetType.SIDEBAR]: {
    padding: { base: "3", md: "4" },
    gap: { base: "2", md: "3" },
  },
  [ContainerPresetType.NAVBAR]: {
    paddingY: { base: "3", md: "4" },
    paddingX: { base: "4", md: "6", lg: "8" },
    gap: "4",
  },
  [ContainerPresetType.FOOTER]: {
    paddingY: { base: "8", md: "12" },
    paddingX: { base: "4", md: "6", lg: "8" },
    gap: { base: "6", md: "8" },
  },

  // Content presets
  [ContainerPresetType.CONTENT_DENSE]: {
    padding: "3",
    gap: "2",
  },
  [ContainerPresetType.CONTENT_NORMAL]: {
    padding: "4",
    gap: "4",
  },
  [ContainerPresetType.CONTENT_SPACIOUS]: {
    padding: "6",
    gap: "6",
  },
};

/**
 * Get a container spacing preset
 * @param preset - Preset type
 * @param customPresets - Optional custom presets
 * @returns Container spacing configuration
 */
export function getContainerPreset(
  preset: ContainerPresetType,
  customPresets?: Record<ContainerPresetType, ContainerSpacing>
): ContainerSpacing {
  const presets = customPresets || DEFAULT_CONTAINER_PRESETS;
  return presets[preset] || DEFAULT_CONTAINER_PRESETS[ContainerPresetType.LAYOUT_NORMAL];
}

/**
 * Resolve a container spacing configuration to CSS properties
 * @param spacing - Container spacing configuration
 * @param theme - Theme specification
 * @returns CSS properties object
 */
export function resolveContainerSpacing(
  spacing: ContainerSpacing,
  theme?: ThemeSpecification
): Record<string, string> {
  const scale = extractSpacingScale(theme);
  const css: Record<string, string> = {};

  // Helper to resolve and set a CSS property
  function resolveProperty(spacingProp: keyof ContainerSpacing, cssProp: string) {
    const value = spacing[spacingProp];
    if (!value) return;

    css[cssProp] =
      typeof value === "string" || typeof value === "number"
        ? getSpacing(value, scale)
        : resolveResponsiveSpacing(value, "base" as BreakpointKey, scale);
  }

  // Process padding properties
  processPaddingProperties(spacing, resolveProperty);

  // Process gap properties
  processGapProperties(spacing, resolveProperty);

  // Process margin properties
  processMarginProperties(spacing, resolveProperty);

  return css;
}

/**
 * Helper function to process padding properties
 */
function processPaddingProperties(
  spacing: ContainerSpacing,
  resolver: (prop: keyof ContainerSpacing, cssProp: string) => void
): void {
  if (spacing.padding) {
    resolver("padding", "padding");
    return;
  }

  // Handle X axis (horizontal)
  if (spacing.paddingX) {
    resolver("paddingX", "padding-left");
    resolver("paddingX", "padding-right");
  } else {
    resolver("paddingLeft", "padding-left");
    resolver("paddingRight", "padding-right");
  }

  // Handle Y axis (vertical)
  if (spacing.paddingY) {
    resolver("paddingY", "padding-top");
    resolver("paddingY", "padding-bottom");
  } else {
    resolver("paddingTop", "padding-top");
    resolver("paddingBottom", "padding-bottom");
  }
}

/**
 * Helper function to process gap properties
 */
function processGapProperties(
  spacing: ContainerSpacing,
  resolver: (prop: keyof ContainerSpacing, cssProp: string) => void
): void {
  if (spacing.gap) {
    resolver("gap", "gap");
  } else {
    resolver("rowGap", "row-gap");
    resolver("columnGap", "column-gap");
  }
}

/**
 * Helper function to process margin properties
 */
function processMarginProperties(
  spacing: ContainerSpacing,
  resolver: (prop: keyof ContainerSpacing, cssProp: string) => void
): void {
  if (spacing.margin) {
    resolver("margin", "margin");
    return;
  }

  if (spacing.marginX) {
    resolver("marginX", "margin-left");
    resolver("marginX", "margin-right");
  }

  if (spacing.marginY) {
    resolver("marginY", "margin-top");
    resolver("marginY", "margin-bottom");
  }
}

/**
 * Create a custom container preset
 * @param base - Base preset to extend
 * @param overrides - Properties to override
 * @returns Custom container spacing configuration
 */
export function createCustomContainerPreset(
  base: ContainerPresetType,
  overrides: Partial<ContainerSpacing>
): ContainerSpacing {
  const basePreset = DEFAULT_CONTAINER_PRESETS[base];
  return { ...basePreset, ...overrides };
}

/**
 * Generate class names for container spacing
 * @param spacing - Container spacing configuration
 * @returns Array of Tailwind class names
 */
export function generateContainerClasses(spacing: ContainerSpacing): string[] {
  const classes: string[] = [];

  // Helper to add spacing classes based on value
  function addSpacingClasses(value: SpacingValue, prefix: string) {
    if (typeof value === "string" || typeof value === "number") {
      classes.push(`${prefix}-${value}`);
      return;
    }

    // Handle responsive object
    for (const [breakpoint, bpValue] of Object.entries(value)) {
      const classPrefix = breakpoint === "base" ? "" : `${breakpoint}:`;
      classes.push(`${classPrefix}${prefix}-${bpValue}`);
    }
  }

  // Process all spacing types using helper functions
  processPaddingClasses(spacing, addSpacingClasses);
  processGapClasses(spacing, addSpacingClasses);
  processMarginClasses(spacing, addSpacingClasses);

  return classes;
}

/**
 * Process padding classes
 */
function processPaddingClasses(
  spacing: ContainerSpacing,
  addClasses: (value: SpacingValue, prefix: string) => void
): void {
  if (spacing.padding) {
    addClasses(spacing.padding, "p");
    return;
  }

  // Process X-axis padding
  if (spacing.paddingX) {
    addClasses(spacing.paddingX, "px");
  } else {
    if (spacing.paddingLeft) addClasses(spacing.paddingLeft, "pl");
    if (spacing.paddingRight) addClasses(spacing.paddingRight, "pr");
  }

  // Process Y-axis padding
  if (spacing.paddingY) {
    addClasses(spacing.paddingY, "py");
  } else {
    if (spacing.paddingTop) addClasses(spacing.paddingTop, "pt");
    if (spacing.paddingBottom) addClasses(spacing.paddingBottom, "pb");
  }
}

/**
 * Process gap classes
 */
function processGapClasses(
  spacing: ContainerSpacing,
  addClasses: (value: SpacingValue, prefix: string) => void
): void {
  if (spacing.gap) {
    addClasses(spacing.gap, "gap");
    return;
  }

  if (spacing.rowGap) addClasses(spacing.rowGap, "gap-y");
  if (spacing.columnGap) addClasses(spacing.columnGap, "gap-x");
}

/**
 * Process margin classes
 */
function processMarginClasses(
  spacing: ContainerSpacing,
  addClasses: (value: SpacingValue, prefix: string) => void
): void {
  if (spacing.margin) {
    addClasses(spacing.margin, "m");
    return;
  }

  if (spacing.marginX) addClasses(spacing.marginX, "mx");
  if (spacing.marginY) addClasses(spacing.marginY, "my");
}
