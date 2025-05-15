/**
 * Container Spacing Presets
 *
 * This module provides a system for managing container spacing patterns
 * that can be applied consistently across different components.
 */

import type { ThemeSpecification } from "@/types/schema/specification";
import type { SpacingKey, SpacingScale } from "./scale";
import type { ResponsiveSpacingObject } from "./responsive";
import { extractSpacingScale, getSpacing } from "./scale";
import { resolveResponsiveSpacing } from "./responsive";

/**
 * Container spacing configuration
 */
export interface ContainerSpacing {
  /**
   * Padding for all sides
   */
  padding?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Horizontal padding (left and right)
   */
  paddingX?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Vertical padding (top and bottom)
   */
  paddingY?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Top padding
   */
  paddingTop?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Right padding
   */
  paddingRight?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Bottom padding
   */
  paddingBottom?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Left padding
   */
  paddingLeft?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Gap between children (for flex/grid containers)
   */
  gap?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Horizontal gap (for grid containers)
   */
  columnGap?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Vertical gap (for grid containers)
   */
  rowGap?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Margin around container
   */
  margin?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Horizontal margins (left and right)
   */
  marginX?: SpacingKey | string | ResponsiveSpacingObject;
  
  /**
   * Vertical margins (top and bottom)
   */
  marginY?: SpacingKey | string | ResponsiveSpacingObject;
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
  CONTENT_SPACIOUS = "content-spacious"
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
    
    if (typeof value === "string" || typeof value === "number") {
      css[cssProp] = getSpacing(value, scale);
    } else {
      // For responsive values, handle base case
      css[cssProp] = resolveResponsiveSpacing(value, "base", scale);
      
      // Media queries would be handled by the responsive spacing utilities
      // This is a simplification for direct usage
    }
  }
  
  // Padding properties
  if (spacing.padding) {
    resolveProperty("padding", "padding");
  } else {
    // Handle individual padding directions
    if (spacing.paddingX) {
      resolveProperty("paddingX", "padding-left");
      resolveProperty("paddingX", "padding-right");
    } else {
      resolveProperty("paddingLeft", "padding-left");
      resolveProperty("paddingRight", "padding-right");
    }
    
    if (spacing.paddingY) {
      resolveProperty("paddingY", "padding-top");
      resolveProperty("paddingY", "padding-bottom");
    } else {
      resolveProperty("paddingTop", "padding-top");
      resolveProperty("paddingBottom", "padding-bottom");
    }
  }
  
  // Gap properties
  if (spacing.gap) {
    resolveProperty("gap", "gap");
  } else {
    resolveProperty("rowGap", "row-gap");
    resolveProperty("columnGap", "column-gap");
  }
  
  // Margin properties
  if (spacing.margin) {
    resolveProperty("margin", "margin");
  } else {
    if (spacing.marginX) {
      resolveProperty("marginX", "margin-left");
      resolveProperty("marginX", "margin-right");
    }
    
    if (spacing.marginY) {
      resolveProperty("marginY", "margin-top");
      resolveProperty("marginY", "margin-bottom");
    }
  }
  
  return css;
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
  
  // Helper to add padding classes
  function addPaddingClasses(value: SpacingKey | string | ResponsiveSpacingObject, prefix: string) {
    if (typeof value === "string" || typeof value === "number") {
      classes.push(`${prefix}-${value}`);
    } else {
      // Handle responsive object
      for (const [breakpoint, bpValue] of Object.entries(value)) {
        if (breakpoint === "base") {
          classes.push(`${prefix}-${bpValue}`);
        } else {
          classes.push(`${breakpoint}:${prefix}-${bpValue}`);
        }
      }
    }
  }
  
  // Add padding classes
  if (spacing.padding) {
    addPaddingClasses(spacing.padding, "p");
  } else {
    if (spacing.paddingX) {
      addPaddingClasses(spacing.paddingX, "px");
    } else {
      if (spacing.paddingLeft) addPaddingClasses(spacing.paddingLeft, "pl");
      if (spacing.paddingRight) addPaddingClasses(spacing.paddingRight, "pr");
    }
    
    if (spacing.paddingY) {
      addPaddingClasses(spacing.paddingY, "py");
    } else {
      if (spacing.paddingTop) addPaddingClasses(spacing.paddingTop, "pt");
      if (spacing.paddingBottom) addPaddingClasses(spacing.paddingBottom, "pb");
    }
  }
  
  // Add gap classes
  if (spacing.gap) {
    addPaddingClasses(spacing.gap, "gap");
  } else {
    if (spacing.rowGap) addPaddingClasses(spacing.rowGap, "gap-y");
    if (spacing.columnGap) addPaddingClasses(spacing.columnGap, "gap-x");
  }
  
  // Add margin classes
  if (spacing.margin) {
    addPaddingClasses(spacing.margin, "m");
  } else {
    if (spacing.marginX) addPaddingClasses(spacing.marginX, "mx");
    if (spacing.marginY) addPaddingClasses(spacing.marginY, "my");
  }
  
  return classes;
}