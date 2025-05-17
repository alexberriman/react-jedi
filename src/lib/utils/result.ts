/**
 * Result type for functional error handling
 */
export type Result<T, E> = 
  | { ok: true; val: T }
  | { ok: false; val: E };

/**
 * Create a successful result
 */
export function Ok<T>(value: T): Result<T, never> {
  return { ok: true, val: value };
}

/**
 * Create an error result
 */
export function Err<E>(error: E): Result<never, E> {
  return { ok: false, val: error };
}

/**
 * Check if a result is successful
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true; val: T } {
  return result.ok;
}

/**
 * Check if a result is an error
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false; val: E } {
  return !result.ok;
}

/**
 * Map over a successful result
 */
export function mapResult<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  if (result.ok) {
    return Ok(fn(result.val));
  }
  return result;
}

/**
 * Map over an error result
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  if (!result.ok) {
    return Err(fn(result.val));
  }
  return result;
}

/**
 * Chain results together
 */
export function andThen<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  if (result.ok) {
    return fn(result.val);
  }
  return result;
}

/**
 * Provide a default value for an error result
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (result.ok) {
    return result.val;
  }
  return defaultValue;
}

/**
 * Execute a function for its side effects on success
 */
export function ifOk<T, E>(
  result: Result<T, E>,
  fn: (value: T) => void
): Result<T, E> {
  if (result.ok) {
    fn(result.val);
  }
  return result;
}

/**
 * Execute a function for its side effects on error
 */
export function ifErr<T, E>(
  result: Result<T, E>,
  fn: (error: E) => void
): Result<T, E> {
  if (!result.ok) {
    fn(result.val);
  }
  return result;
}