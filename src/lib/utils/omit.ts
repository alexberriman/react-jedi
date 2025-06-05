/**
 * Creates a new object with specified keys omitted
 * @param obj - The source object
 * @param keys - Array of keys to omit from the object
 * @returns A new object without the specified keys
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}