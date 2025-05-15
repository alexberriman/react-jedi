/**
 * Library exports barrel file
 *
 * This file exports all utility functions, schemas, and other shared code.
 */

// Core utilities
export * from "./utils";
// Explicitly re-export from styles to avoid DEFAULT_BREAKPOINTS ambiguity
export {
  processResponsive, processMargin, processPadding, processWidth, 
  processHeight, processTextColor, processBackgroundColor, processBorder,
  processBorderRadius, processFlexDirection, processFlexWrap, processGap,
  processTextAlign, processFontSize, processFontWeight, processShadow,
  processZIndex, processDisplay, processOverflow, processPosition,
  processOffset, processOpacity, processTransition, arbitrary,
  extractStyles, conditionalClasses, stateClasses, styleProcessors,
  processStyleProps,
  // Types
  type ResponsiveValue, type StyleValue, type StyleObject, 
  type StyleProcessor, type StylePropertyValue, type StyleProps
} from "./styles";
export * from "./type-safety";

// Schemas and validation
export * from "./schemas";
export * from "./validation";

// Theme system
export * from "./theme";

// Specification parsing and validation
export * from "./parser";

// Server-Driven UI rendering system
export * from "./render";
export * from "./component-resolver";
export * from "./component-tree";
export * from "./error-handling";