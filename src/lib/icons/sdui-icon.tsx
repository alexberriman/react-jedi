import * as React from "react";
import { iconRegistry } from "./icon-registry";
import { cn } from "../utils";

// Size mapping for string sizes
const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// Type for animation type
type AnimationType = 'spin' | 'pulse' | 'bounce';

// Type for click handler
type ClickHandler = (() => void) | string;

// Type for size value
type SizeValue = string | number | keyof typeof sizeMap;

// Type for stroke width
type StrokeWidth = string | number;

export interface SDUIIconProps {
  /**
   * The registered icon name to render
   */
  name: string;
  
  /**
   * Icon size (number in pixels, string with units, or size name)
   */
  size?: SizeValue;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Stroke width for line icons
   */
  strokeWidth?: StrokeWidth;
  
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
  
  /**
   * Click handler - if provided, icon will be wrapped in a button
   */
  onClick?: ClickHandler;
  
  /**
   * Whether the icon should be animated
   */
  animated?: boolean;
  
  /**
   * Type of animation
   */
  animationType?: AnimationType;
  
  /**
   * Visual variant
   */
  variant?: 'default' | 'filled' | 'outlined' | 'background';
  
  /**
   * Background color when variant is 'background'
   */
  background?: string;
}

/**
 * Icon component for SDUI that resolves icons from the registry
 * This component is used internally by the SDUI renderer when it encounters icon references
 */
// Helper function to get icon size
function getIconSize(size: SizeValue | undefined, defaultSize: StrokeWidth | undefined = undefined): number {
  // First check if size is provided
  if (size !== undefined) {
    if (typeof size === 'string' && size in sizeMap) {
      return sizeMap[size as keyof typeof sizeMap];
    }
    if (typeof size === 'number') {
      return size;
    }
  }
  
  // Fall back to defaultSize if provided
  if (defaultSize !== undefined) {
    if (typeof defaultSize === 'string' && defaultSize in sizeMap) {
      return sizeMap[defaultSize as keyof typeof sizeMap];
    }
    if (typeof defaultSize === 'number') {
      return defaultSize;
    }
  }
  
  return 24; // Final fallback
}

// Helper function to wrap icon with background variant
function wrapIconWithBackground(
  iconElement: React.ReactElement,
  background: string | undefined,
  onClick: ClickHandler | undefined,
  className: string | undefined,
  style: React.CSSProperties | undefined,
  ariaLabel: string | undefined
): React.ReactElement {
  const wrapperStyle: React.CSSProperties = {
    ...style,
    backgroundColor: background || '#f3f4f6',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const handleClick = onClick && typeof onClick === 'function' ? onClick : undefined;
  const handleKeyDown = handleClick ? (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  } : undefined;
  
  return (
    <span
      className={cn('rounded-lg p-2', onClick && 'cursor-pointer transition-opacity hover:opacity-80', className)}
      style={wrapperStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {iconElement}
    </span>
  );
}

// Helper function to wrap icon with button
function wrapIconWithButton(
  iconElement: React.ReactElement,
  onClick: () => void,
  className: string | undefined,
  style: React.CSSProperties | undefined,
  ariaLabel: string | undefined
): React.ReactElement {
  return (
    <button
      type="button"
      className={cn('inline-flex items-center justify-center transition-opacity hover:opacity-80', className)}
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
    >
      {iconElement}
    </button>
  );
}

// Helper function to create icon element
function createIconElement(
  IconComponent: React.ComponentType<Record<string, unknown>>,
  iconSize: number,
  color: string,
  strokeWidth: StrokeWidth | undefined,
  animated: boolean,
  animationType: AnimationType,
  className: string | undefined,
  style: React.CSSProperties | undefined,
  ariaLabel: string | undefined,
  onClick?: ClickHandler
): React.ReactElement {
  const animationClasses = animated
    ? {
        spin: 'animate-spin',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
      }[animationType]
    : undefined;
  
  const iconProps: Record<string, unknown> = {
    size: iconSize,
    color,
    className: cn("sdui-icon", animationClasses, onClick ? "" : className),
    style: onClick ? undefined : style,
    "aria-label": ariaLabel,
    "aria-hidden": !ariaLabel,
  };
  
  if (strokeWidth !== undefined) {
    iconProps.strokeWidth = strokeWidth;
  }
  
  return React.createElement(IconComponent, iconProps);
}

export function SDUIIcon({
  name,
  size,
  color = "currentColor",
  strokeWidth,
  className,
  style,
  ariaLabel,
  onClick,
  animated = false,
  animationType = 'spin',
  variant = 'default',
  background,
}: Readonly<SDUIIconProps>): React.ReactElement | null {
  const entry = iconRegistry.get(name);
  
  if (!entry) {
    // In development, show a placeholder for missing icons
    if (process.env.NODE_ENV === "development") {
      const placeholderSize = getIconSize(size);
      
      return (
        <span
          className={cn(
            "inline-flex items-center justify-center border border-dashed border-red-500 bg-red-50 text-red-700 text-xs rounded",
            className
          )}
          style={{
            width: placeholderSize,
            height: placeholderSize,
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
  const iconSize = getIconSize(size, entry.defaultSize);
  const iconStrokeWidth = strokeWidth || entry.defaultStrokeWidth;
  const iconColor = color || entry.defaultColor || "currentColor";
  
  const iconElement = createIconElement(
    IconComponent,
    iconSize,
    iconColor,
    iconStrokeWidth,
    animated,
    animationType,
    className,
    style,
    ariaLabel,
    onClick
  );
  
  // Wrap icon based on variant and onClick
  if (variant === 'background') {
    return wrapIconWithBackground(iconElement, background, onClick, className, style, ariaLabel);
  }
  
  if (onClick && typeof onClick === 'function') {
    return wrapIconWithButton(iconElement, onClick, className, style, ariaLabel);
  }
  
  return iconElement;
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
  const { name, size, color, strokeWidth, className, style, ariaLabel, onClick, animated, animationType, variant, background } = spec;
  
  return (
    <SDUIIcon
      name={name}
      size={size as string | number | undefined}
      color={color as string | undefined}
      strokeWidth={strokeWidth as string | number | undefined}
      className={className as string | undefined}
      style={style as React.CSSProperties | undefined}
      ariaLabel={ariaLabel as string | undefined}
      onClick={onClick as ClickHandler | undefined}
      animated={animated as boolean | undefined}
      animationType={animationType as AnimationType | undefined}
      variant={variant as 'default' | 'filled' | 'outlined' | 'background' | undefined}
      background={background as string | undefined}
    />
  );
}