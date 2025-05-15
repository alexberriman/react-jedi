/**
 * Border Radius Utilities
 *
 * This file provides utility functions for applying border radius styles to components.
 * These utilities make it easy to apply rounded corners with consistency.
 */

import type { CSSProperties } from "react";
import { getBorderRadius } from ".";
import type { ThemeSpecification } from "../../../types/schema/specification";

/**
 * Apply border radius to specific corners
 */
export interface CornerRadiusOptions {
  /**
   * Top-left corner radius
   */
  topLeft?: string;
  
  /**
   * Top-right corner radius
   */
  topRight?: string;
  
  /**
   * Bottom-right corner radius
   */
  bottomRight?: string;
  
  /**
   * Bottom-left corner radius
   */
  bottomLeft?: string;
}

/**
 * Create styles for specific corner radii
 * 
 * @param corners The corner radius options
 * @returns CSS properties object
 */
export function createCornerRadiusStyles(corners: CornerRadiusOptions): CSSProperties {
  const {
    topLeft = "0",
    topRight = "0",
    bottomRight = "0",
    bottomLeft = "0"
  } = corners;
  
  return {
    borderTopLeftRadius: topLeft,
    borderTopRightRadius: topRight,
    borderBottomRightRadius: bottomRight,
    borderBottomLeftRadius: bottomLeft,
  };
}

/**
 * Apply border radius from theme scale
 * 
 * @param theme The theme specification
 * @param key The border radius key from the scale
 * @returns CSS properties object
 */
export function applyBorderRadius(
  theme: ThemeSpecification | undefined,
  key: string
): CSSProperties {
  return {
    borderRadius: getBorderRadius(theme, key),
  };
}

/**
 * Create conditional border radius styles
 * 
 * @param theme The theme specification
 * @param condition The condition to evaluate
 * @param trueKey The border radius key to use if condition is true
 * @param falseKey The border radius key to use if condition is false
 * @returns CSS properties object
 */
export function conditionalBorderRadius(
  theme: ThemeSpecification | undefined,
  condition: boolean,
  trueKey: string,
  falseKey: string = "none"
): CSSProperties {
  const key = condition ? trueKey : falseKey;
  return applyBorderRadius(theme, key);
}

/**
 * Create responsive border radius styles
 * 
 * @param theme The theme specification
 * @param values The responsive values object
 * @returns CSS properties object
 */
export function responsiveBorderRadius(
  theme: ThemeSpecification | undefined,
  values: Record<string, string>
): CSSProperties {
  // For now, return the default value
  // In a full implementation, this would handle media queries
  const defaultValue = values.default || values.base || "none";
  return applyBorderRadius(theme, defaultValue);
}

/**
 * Border radius style builder class for fluent API
 */
export class BorderRadiusBuilder {
  private styles: CSSProperties = {};
  private theme: ThemeSpecification | undefined;
  
  constructor(theme?: ThemeSpecification) {
    this.theme = theme;
  }
  
  /**
   * Apply a border radius from the theme scale
   */
  radius(key: string): this {
    this.styles.borderRadius = getBorderRadius(this.theme, key);
    return this;
  }
  
  /**
   * Apply top corners only
   */
  top(key: string): this {
    const radius = getBorderRadius(this.theme, key);
    this.styles.borderTopLeftRadius = radius;
    this.styles.borderTopRightRadius = radius;
    return this;
  }
  
  /**
   * Apply right corners only
   */
  right(key: string): this {
    const radius = getBorderRadius(this.theme, key);
    this.styles.borderTopRightRadius = radius;
    this.styles.borderBottomRightRadius = radius;
    return this;
  }
  
  /**
   * Apply bottom corners only
   */
  bottom(key: string): this {
    const radius = getBorderRadius(this.theme, key);
    this.styles.borderBottomLeftRadius = radius;
    this.styles.borderBottomRightRadius = radius;
    return this;
  }
  
  /**
   * Apply left corners only
   */
  left(key: string): this {
    const radius = getBorderRadius(this.theme, key);
    this.styles.borderTopLeftRadius = radius;
    this.styles.borderBottomLeftRadius = radius;
    return this;
  }
  
  /**
   * Apply specific corner
   */
  corner(corner: "topLeft" | "topRight" | "bottomRight" | "bottomLeft", key: string): this {
    const radius = getBorderRadius(this.theme, key);
    const propertyMap = {
      topLeft: "borderTopLeftRadius",
      topRight: "borderTopRightRadius",
      bottomRight: "borderBottomRightRadius",
      bottomLeft: "borderBottomLeftRadius",
    };
    this.styles[propertyMap[corner] as keyof CSSProperties] = radius;
    return this;
  }
  
  /**
   * Get the built styles
   */
  build(): CSSProperties {
    return { ...this.styles };
  }
}