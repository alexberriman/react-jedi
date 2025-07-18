import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS classes
 *
 * This utility function merges multiple class names intelligently,
 * resolving conflicts between Tailwind CSS utility classes.
 *
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Default date format options
 */
const DEFAULT_DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

/**
 * Format a date with various options
 *
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions) {
  const formatOptions = options ?? DEFAULT_DATE_FORMAT_OPTIONS;
  return new Intl.DateTimeFormat("en-US", formatOptions).format(new Date(date));
}

/**
 * Omit specified keys from an object
 *
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without specified keys
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Custom props that should be filtered out before being passed to DOM elements
 */
export const CUSTOM_PROPS_TO_FILTER = [
  "parentContext",
  "spec",
  "theme",
  "state",
  "conditionalProps",
  "isPrimary",
  "computedProps",
  "when",
  "actions",
  "inputType",
  "maxWidth",
  "highlight",
  "cols",
  "colsMd",
  "colsSm",
  "colsLg",
  "colsXl",
  "cols2xl",
] as const;

/**
 * Type for filtered props
 */
export type CustomFilterProps = (typeof CUSTOM_PROPS_TO_FILTER)[number];

/**
 * Helper to clean props for DOM elements
 */
export function cleanDOMProps<T extends object>(props: T): Omit<T, CustomFilterProps> {
  const filtered = { ...props };
  for (const key of CUSTOM_PROPS_TO_FILTER) {
    delete filtered[key as keyof T];
  }
  return filtered as Omit<T, CustomFilterProps>;
}

/**
 * Re-export utility modules
 */
export { cn as classNames } from "./utils/cn";
export * from "./utils/cn";
export * from "./utils/result";
export * from "./utils/merge";
export * from "./utils/meta";
