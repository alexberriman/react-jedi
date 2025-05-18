/**
 * Library exports barrel file
 *
 * This file exports all utility functions, schemas, and other shared code.
 */

// Core utilities
export * from "./utils";
// Explicitly re-export from styles to avoid DEFAULT_BREAKPOINTS ambiguity
export {
  processResponsive,
  processMargin,
  processPadding,
  processWidth,
  processHeight,
  processTextColor,
  processBackgroundColor,
  processBorder,
  processBorderRadius,
  processFlexDirection,
  processFlexWrap,
  processGap,
  processTextAlign,
  processFontSize,
  processFontWeight,
  processShadow,
  processZIndex,
  processDisplay,
  processOverflow,
  processPosition,
  processOffset,
  processOpacity,
  processTransition,
  arbitrary,
  extractStyles,
  conditionalClasses,
  stateClasses,
  styleProcessors,
  processStyleProps,
  // Types
  type ResponsiveValue,
  type StyleValue,
  type StyleObject,
  type StyleProcessor,
  type StylePropertyValue,
  type StyleProps,
} from "./styles";
// Export type-safety with explicit imports to avoid conflicts with utils
export {
  // Export constructors
  Ok,
  Err,
  // Export type guards and utilities
  ok,
  err,
  isNotNullOrUndefined,
  isOfType,
  hasProperty,
  hasPropertyOfType,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isArrayOf,
  prop,
  tryExec,
  tryExecAsync,
  assert,
  assertNotNull,
  ensureArray,
  mapArray,
  getPath,
  typedKeys,
  typedEntries,
  safeJsonParse,
  safeJsonStringify,
  // Export types
  type Result,
  type TypedRecord,
  type DeepReadonly,
  type DeepPartial,
  type Discriminated,
  type Awaited,
  type ElementOf,
  type ComponentPropsWithBase,
} from "./type-safety";

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

// Performance utilities
export {
  createMemoizedComponent,
  shouldMemoizeComponent,
  getRenderMetrics,
  clearRenderMetrics,
  getComponentMetrics,
  defaultMemoizationOptions,
  type MemoizationOptions,
  type RenderMetrics,
} from "./performance/memoization";

// Animation system
export * from "./animation";

// Accessibility system
export * from "./accessibility";

// Data fetching system
export * from "./data";

// Developer tools
export * from "./dev-tools";

// SEO and Structured Data
export * from "./seo";
