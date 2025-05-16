let counter = 0;

/**
 * Generate a unique ID for elements and logs.
 * Uses timestamp and a counter to ensure uniqueness.
 */
export function generateUniqueId(prefix = "id"): string {
  counter = (counter + 1) % 100_000;
  return `${prefix}-${Date.now()}-${counter}`;
}
