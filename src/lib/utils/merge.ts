/**
 * Deep merge two objects
 * 
 * @param target - Target object
 * @param source - Source object to merge into target
 * @returns Merged object
 */
export function merge<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  const result = { ...target } as T & U;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = (result as Record<string, unknown>)[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        (result as Record<string, unknown>)[key] = merge(targetValue, sourceValue);
      } else {
        (result as Record<string, unknown>)[key] = sourceValue;
      }
    }
  }

  return result;
}

/**
 * Check if a value is a plain object
 */
function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}