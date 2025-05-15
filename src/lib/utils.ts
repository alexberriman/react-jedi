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
export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
) {
  const formatOptions = options ?? DEFAULT_DATE_FORMAT_OPTIONS;
  return new Intl.DateTimeFormat("en-US", formatOptions).format(new Date(date));
}
