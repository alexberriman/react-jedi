import * as React from "react";
import { iconRegistry } from "./icon-registry";
import { cn } from "../utils";

export interface SDUIIconProps {
  /**
   * The registered icon name to render
   */
  name: string;
  
  /**
   * Icon size (number in pixels or string with units)
   */
  size?: string | number;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Stroke width for line icons
   */
  strokeWidth?: string | number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  ariaLabel?: string;
}

/**
 * Icon component for SDUI that resolves icons from the registry
 * This component is used internally by the SDUI renderer when it encounters icon references
 */
export function SDUIIcon({
  name,
  size,
  color = "currentColor",
  strokeWidth,
  className,
  style,
  ariaLabel,
}: Readonly<SDUIIconProps>): React.ReactElement | null {
  const entry = iconRegistry.get(name);
  
  if (!entry) {
    // In development, show a placeholder for missing icons
    if (process.env.NODE_ENV === "development") {
      return (
        <span
          className={cn(
            "inline-flex items-center justify-center border border-dashed border-red-500 bg-red-50 text-red-700 text-xs rounded",
            className
          )}
          style={{
            width: size || 24,
            height: size || 24,
            ...style,
          }}
          aria-label={ariaLabel || `Missing icon: ${name}`}
        >
          {name}
        </span>
      );
    }
    return null;
  }
  
  const IconComponent = entry.component;
  const iconSize = size || entry.defaultSize || 24;
  const iconStrokeWidth = strokeWidth || entry.defaultStrokeWidth;
  
  // Props to pass to the icon component
  const iconProps: Record<string, unknown> = {
    size: iconSize,
    color: color || entry.defaultColor || "currentColor",
    className: cn("sdui-icon", className),
    style,
    "aria-label": ariaLabel,
    "aria-hidden": !ariaLabel,
  };
  
  // Add strokeWidth if specified
  if (iconStrokeWidth !== undefined) {
    iconProps.strokeWidth = iconStrokeWidth;
  }
  
  return React.createElement(IconComponent, iconProps);
}

/**
 * Helper function to check if a component spec is an icon reference
 */
interface IconReference {
  type: string;
  name: string;
  [key: string]: unknown;
}

export function isIconReference(spec: unknown): spec is IconReference {
  return (
    typeof spec === "object" &&
    spec !== null &&
    "type" in spec &&
    (spec as Record<string, unknown>).type === "Icon" &&
    "name" in spec &&
    typeof (spec as Record<string, unknown>).name === "string"
  );
}

/**
 * Transform icon references in component specs
 * This is used by the SDUI renderer to handle icon children
 */
export function transformIconReference(spec: unknown): React.ReactElement | null {
  if (!isIconReference(spec)) {
    return null;
  }
  
  // Extract known props from the spec
  const { name, size, color, strokeWidth, className, style, ariaLabel } = spec;
  
  return (
    <SDUIIcon
      name={name}
      size={size as string | number | undefined}
      color={color as string | undefined}
      strokeWidth={strokeWidth as string | number | undefined}
      className={className as string | undefined}
      style={style as React.CSSProperties | undefined}
      ariaLabel={ariaLabel as string | undefined}
    />
  );
}