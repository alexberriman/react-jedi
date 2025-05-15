import { cn } from "./utils";
import type { ClassValue } from "clsx";

/**
 * Style processing utilities for TailwindCSS
 * 
 * This module provides utilities for processing and generating TailwindCSS classes
 * from component specifications in a Server-Driven UI architecture.
 */

export type ResponsiveValue<T> = T | Record<string, T>;
export type StyleValue = string | null | undefined;
export type StyleObject = Record<string, StyleValue>;
export type StyleProcessor<T, R = string> = (value: T) => R;

/**
 * Default breakpoints for responsive styles
 */
export const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Process responsive styles with Tailwind's mobile-first approach
 * 
 * This function handles responsive values for style properties by generating
 * appropriate Tailwind classes for each breakpoint.
 * 
 * @param value Responsive value object or single value
 * @param processor Function to process each value into a Tailwind class
 * @returns Combined Tailwind classes for all breakpoints
 * 
 * @example
 * processResponsive({ base: "red", md: "blue" }, (color) => `text-${color}`)
 * // Returns: "text-red md:text-blue"
 */
export function processResponsive<T>(
  value: ResponsiveValue<T> | undefined,
  processor: StyleProcessor<T>
): string {
  if (value === undefined || value === null) return "";
  
  // Handle non-responsive values
  if (typeof value !== "object") {
    return processor(value);
  }
  
  // Base/default classes (mobile-first approach)
  const classes: string[] = [];
  
  // Handle base/default value (no breakpoint prefix)
  if ("base" in value) {
    classes.push(processor(value.base as T));
  } else if ("default" in value) {
    classes.push(processor(value.default as T));
  }
  
  // Handle breakpoint-specific values
  const breakpoints = Object.keys(value).filter(
    (bp) => bp !== "base" && bp !== "default"
  );
  
  for (const breakpoint of breakpoints) {
    const breakpointValue = value[breakpoint] as T;
    if (breakpointValue !== undefined) {
      const breakpointClass = breakpoint === "base" || breakpoint === "default"
        ? processor(breakpointValue)
        : `${breakpoint}:${processor(breakpointValue)}`;
      
      classes.push(breakpointClass);
    }
  }
  
  return classes.filter(Boolean).join(" ");
}

/**
 * Process margin values into Tailwind classes
 * 
 * @param margin Margin value or responsive object
 * @returns Tailwind margin classes
 */
export function processMargin(margin: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(margin, (value) => {
    if (typeof value === "number") {
      return `m-${value}`;
    }
    return `m-${value}`;
  });
}

/**
 * Process padding values into Tailwind classes
 * 
 * @param padding Padding value or responsive object
 * @returns Tailwind padding classes
 */
export function processPadding(padding: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(padding, (value) => {
    if (typeof value === "number") {
      return `p-${value}`;
    }
    return `p-${value}`;
  });
}

/**
 * Process width values into Tailwind classes
 * 
 * @param width Width value or responsive object
 * @returns Tailwind width classes
 */
export function processWidth(width: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(width, (value) => {
    if (value === "full") return "w-full";
    if (value === "screen") return "w-screen";
    if (value === "auto") return "w-auto";
    
    if (typeof value === "number") {
      // Handle numeric values as fractions (divide by 12 for a 12-column grid)
      if (value <= 12) {
        return `w-${value}/12`;
      }
      return `w-[${value}px]`;
    }
    
    return `w-${value}`;
  });
}

/**
 * Process height values into Tailwind classes
 * 
 * @param height Height value or responsive object
 * @returns Tailwind height classes
 */
export function processHeight(height: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(height, (value) => {
    if (value === "full") return "h-full";
    if (value === "screen") return "h-screen";
    if (value === "auto") return "h-auto";
    
    if (typeof value === "number") {
      return `h-[${value}px]`;
    }
    
    return `h-${value}`;
  });
}

/**
 * Process color values for text
 * 
 * @param color Color value or responsive object
 * @returns Tailwind text color classes
 */
export function processTextColor(color: ResponsiveValue<string> | undefined): string {
  return processResponsive(color, (value) => `text-${value}`);
}

/**
 * Process color values for backgrounds
 * 
 * @param color Color value or responsive object
 * @returns Tailwind background color classes
 */
export function processBackgroundColor(color: ResponsiveValue<string> | undefined): string {
  return processResponsive(color, (value) => `bg-${value}`);
}

/**
 * Process border values
 * 
 * @param border Border value or responsive object
 * @returns Tailwind border classes
 */
export function processBorder(border: ResponsiveValue<string | boolean> | undefined): string {
  return processResponsive(border, (value) => {
    if (value === true) return "border";
    if (value === false) return "";
    return `border border-${value}`;
  });
}

/**
 * Process border radius values
 * 
 * @param radius Border radius value or responsive object
 * @returns Tailwind border radius classes
 */
export function processBorderRadius(radius: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(radius, (value) => {
    if (value === "full") return "rounded-full";
    if (typeof value === "number") {
      return `rounded-[${value}px]`;
    }
    return `rounded-${value}`;
  });
}

/**
 * Process flex direction values
 * 
 * @param direction Flex direction value or responsive object
 * @returns Tailwind flex direction classes
 */
export function processFlexDirection(direction: ResponsiveValue<string> | undefined): string {
  return processResponsive(direction, (value) => `flex-${value}`);
}

/**
 * Process flex wrap values
 * 
 * @param wrap Flex wrap value or responsive object
 * @returns Tailwind flex wrap classes
 */
export function processFlexWrap(wrap: ResponsiveValue<string> | undefined): string {
  return processResponsive(wrap, (value) => `flex-${value}`);
}

/**
 * Process gap values for grid and flex layouts
 * 
 * @param gap Gap value or responsive object
 * @returns Tailwind gap classes
 */
export function processGap(gap: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(gap, (value) => {
    if (typeof value === "number") {
      return `gap-${value}`;
    }
    return `gap-${value}`;
  });
}

/**
 * Process text alignment values
 * 
 * @param align Text alignment value or responsive object
 * @returns Tailwind text alignment classes
 */
export function processTextAlign(align: ResponsiveValue<string> | undefined): string {
  return processResponsive(align, (value) => `text-${value}`);
}

/**
 * Process font size values
 * 
 * @param size Font size value or responsive object
 * @returns Tailwind font size classes
 */
export function processFontSize(size: ResponsiveValue<string> | undefined): string {
  return processResponsive(size, (value) => `text-${value}`);
}

/**
 * Process font weight values
 * 
 * @param weight Font weight value or responsive object
 * @returns Tailwind font weight classes
 */
export function processFontWeight(weight: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(weight, (value) => `font-${value}`);
}

/**
 * Process shadow values
 * 
 * @param shadow Shadow value or responsive object
 * @returns Tailwind shadow classes
 */
export function processShadow(shadow: ResponsiveValue<string | boolean> | undefined): string {
  return processResponsive(shadow, (value) => {
    if (value === true) return "shadow";
    if (value === false) return "";
    return `shadow-${value}`;
  });
}

/**
 * Process z-index values
 * 
 * @param zIndex Z-index value or responsive object
 * @returns Tailwind z-index classes
 */
export function processZIndex(zIndex: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(zIndex, (value) => `z-${value}`);
}

/**
 * Process display values
 * 
 * @param display Display value or responsive object
 * @returns Tailwind display classes
 */
export function processDisplay(display: ResponsiveValue<string> | undefined): string {
  return processResponsive(display, (value) => value);
}

/**
 * Process overflow values
 * 
 * @param overflow Overflow value or responsive object
 * @returns Tailwind overflow classes
 */
export function processOverflow(overflow: ResponsiveValue<string> | undefined): string {
  return processResponsive(overflow, (value) => `overflow-${value}`);
}

/**
 * Process position values
 * 
 * @param position Position value or responsive object
 * @returns Tailwind position classes
 */
export function processPosition(position: ResponsiveValue<string> | undefined): string {
  return processResponsive(position, (value) => value);
}

/**
 * Process position offset values (top, right, bottom, left)
 * 
 * @param offset Offset value or responsive object
 * @param side Side to offset (top, right, bottom, left)
 * @returns Tailwind offset classes
 */
export function processOffset(
  offset: ResponsiveValue<string | number> | undefined,
  side: "top" | "right" | "bottom" | "left"
): string {
  if (offset === undefined) return "";
  
  return processResponsive(offset, (value) => {
    if (value === 0 || value === "0") {
      return `${side}-[0px]`;
    }
    if (typeof value === "number") {
      return `${side}-[${value}px]`;
    }
    return `${side}-${value}`;
  });
}

/**
 * Process opacity values
 * 
 * @param opacity Opacity value or responsive object (0-100)
 * @returns Tailwind opacity classes
 */
export function processOpacity(opacity: ResponsiveValue<string | number> | undefined): string {
  return processResponsive(opacity, (value) => `opacity-${value}`);
}

/**
 * Process transition properties
 * 
 * @param transition Transition value or responsive object
 * @returns Tailwind transition classes
 */
export function processTransition(transition: ResponsiveValue<string | boolean> | undefined): string {
  return processResponsive(transition, (value) => {
    if (value === true) return "transition";
    if (value === false) return "";
    return `transition-${value}`;
  });
}

/**
 * Process Tailwind arbitrary values
 * 
 * Allows for using arbitrary values with Tailwind's square bracket syntax
 * 
 * @param property The CSS property name
 * @param value The arbitrary value
 * @returns Tailwind arbitrary value class
 * 
 * @example
 * arbitrary("margin-top", "17px")
 * // Returns: "[margin-top:17px]"
 */
export function arbitrary(property: string, value: string | number): string {
  return `[${property}:${value}]`;
}

/**
 * Extract style object from component props
 * 
 * This function extracts style-related props from a component specification
 * and transforms them into Tailwind CSS classes.
 * 
 * @param props Component props
 * @param styleProps List of style properties to extract
 * @returns Combined Tailwind classes
 */
export function extractStyles(
  props: Record<string, any>,
  styleProps: Record<string, (value: any) => string>
): string {
  const classes: ClassValue[] = [];
  
  for (const [propName, processor] of Object.entries(styleProps)) {
    if (props[propName] !== undefined) {
      classes.push(processor(props[propName]));
    }
  }
  
  return cn(...classes);
}

/**
 * Generate conditional Tailwind classes based on a condition
 * 
 * @param condition Boolean condition
 * @param trueClasses Classes to use when condition is true
 * @param falseClasses Optional classes to use when condition is false
 * @returns Selected Tailwind classes
 */
export function conditionalClasses(
  condition: boolean,
  trueClasses: ClassValue,
  falseClasses?: ClassValue
): string {
  return cn(condition ? trueClasses : falseClasses);
}

/**
 * Generate state-based Tailwind classes
 * 
 * @param state Current component state
 * @param stateClasses Record of state-to-classes mappings
 * @returns Tailwind classes for the current state
 */
export function stateClasses(
  state: string,
  stateClasses: Record<string, ClassValue>
): string {
  return cn(stateClasses[state] || "");
}

/**
 * Standard style processors for common component properties
 */
export const styleProcessors = {
  margin: processMargin,
  padding: processPadding,
  width: processWidth,
  height: processHeight,
  color: processTextColor,
  backgroundColor: processBackgroundColor,
  border: processBorder,
  borderRadius: processBorderRadius,
  flexDirection: processFlexDirection,
  flexWrap: processFlexWrap,
  gap: processGap,
  textAlign: processTextAlign,
  fontSize: processFontSize,
  fontWeight: processFontWeight,
  shadow: processShadow,
  zIndex: processZIndex,
  display: processDisplay,
  overflow: processOverflow,
  position: processPosition,
  opacity: processOpacity,
  transition: processTransition,
};

/**
 * Process standard style props from a component specification
 * 
 * @param props Component props
 * @returns Combined Tailwind classes for all style props
 */
export function processStyleProps(props: Record<string, any>): string {
  return extractStyles(props, styleProcessors);
}