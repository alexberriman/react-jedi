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
] as const;

/**
 * Type for filtered props
 */
export type CustomFilterProps = (typeof CUSTOM_PROPS_TO_FILTER)[number];

/**
 * Helper to clean props for DOM elements
 */
export function cleanDOMProps<T extends Record<string, unknown>>(
  props: T
): Omit<T, CustomFilterProps> {
  const cleanProps = { ...props };
  for (const key of CUSTOM_PROPS_TO_FILTER) {
    delete cleanProps[key];
  }
  return cleanProps;
}