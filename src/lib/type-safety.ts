/**
 * Type Safety Utilities
 *
 * This file provides robust type safety utilities and patterns 
 * to ensure type safety throughout the codebase.
 */

/**
 * Result type for functional error handling.
 * Represents either a successful operation with a value,
 * or a failed operation with an error.
 */
export type Result<T, E = Error> = Ok<T> | Err<E>;

/**
 * Represents a successful operation with a value.
 */
export class Ok<T> {
  readonly value: T;
  readonly isOk = true;
  readonly isErr = false;

  constructor(value: T) {
    this.value = value;
  }

  /**
   * Transforms the success value.
   */
  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Ok(fn(this.value));
  }

  /**
   * Identity operation for errors (returns this Result since it's not an error).
   */
  mapErr<F>(_fn: (error: never) => F): Result<T, F> {
    return this as unknown as Result<T, F>;
  }

  /**
   * Transforms the success value with a function that returns a Result.
   */
  andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return fn(this.value);
  }

  /**
   * Returns the success value or a default value.
   */
  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  /**
   * Returns the success value.
   */
  unwrap(): T {
    return this.value;
  }

  /**
   * Returns the success value or throws the provided error.
   */
  expect(_message: string): T {
    return this.value;
  }
}

/**
 * Represents a failed operation with an error.
 */
export class Err<E> {
  readonly error: E;
  readonly isOk = false;
  readonly isErr = true;

  constructor(error: E) {
    this.error = error;
  }

  /**
   * Identity operation for success (returns this Result since it's not a success).
   */
  map<U>(_fn: (value: never) => U): Result<U, E> {
    return this as unknown as Result<U, E>;
  }

  /**
   * Transforms the error value.
   */
  mapErr<F>(fn: (error: E) => F): Result<never, F> {
    return new Err(fn(this.error));
  }

  /**
   * Identity operation for andThen (returns this Result since it's not a success).
   */
  andThen<U, F>(_fn: (value: never) => Result<U, F>): Result<U, E | F> {
    return this as unknown as Result<U, E | F>;
  }

  /**
   * Returns a default value since this Result is an error.
   */
  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }

  /**
   * Throws the error.
   */
  unwrap(): never {
    throw this.error;
  }

  /**
   * Throws the error with a custom message.
   */
  expect(message: string): never {
    if (this.error instanceof Error) {
      const error = this.error;
      error.message = `${message}: ${error.message}`;
      throw error;
    }
    throw new Error(`${message}: ${String(this.error)}`);
  }
}

/**
 * Creates a successful Result with the given value.
 */
export function ok<T>(value: T): Ok<T> {
  return new Ok(value);
}

/**
 * Creates a failed Result with the given error.
 */
export function err<E>(error: E): Err<E> {
  return new Err(error);
}

/**
 * Type guard for checking if a value is not null or undefined.
 */
export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard for narrowing an unknown value to a specific type.
 */
export function isOfType<T>(
  value: unknown,
  typeGuard: (value: unknown) => boolean
): value is T {
  return typeGuard(value);
}

/**
 * Type guard for checking if an object has a specific property.
 */
export function hasProperty<K extends string, T>(
  obj: unknown,
  property: K
): obj is Record<K, T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    property in obj
  );
}

/**
 * Type guard for checking if an object has a specific property of a given type.
 */
export function hasPropertyOfType<K extends string, T>(
  obj: unknown,
  property: K,
  typeGuard: (value: unknown) => value is T
): obj is Record<K, T> {
  return (
    hasProperty(obj, property) &&
    typeGuard((obj as Record<string, unknown>)[property])
  );
}

/**
 * Type guard for checking if a value is a string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard for checking if a value is a number.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Type guard for checking if a value is a boolean.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Type guard for checking if a value is a function.
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

/**
 * Type guard for checking if a value is an object.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Type guard for checking if a value is an array.
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Type guard for checking if a value is an array of a specific type.
 */
export function isArrayOf<T>(
  value: unknown,
  typeGuard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(typeGuard);
}

/**
 * Creates a type-safe property accessor with a default value.
 */
export function prop<T, K extends keyof T>(
  obj: T,
  key: K,
  defaultValue: T[K]
): T[K] {
  return obj && key in obj ? obj[key] : defaultValue;
}

/**
 * Safely tries to execute a function that might throw, returning a Result.
 */
export function tryExec<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn());
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Safely tries to execute an async function that might throw, returning a Result.
 */
export async function tryExecAsync<T>(
  fn: () => Promise<T>
): Promise<Result<T, Error>> {
  try {
    return ok(await fn());
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Type-safe assertion function that throws if the condition is false.
 */
export function assert(
  condition: boolean,
  message = "Assertion failed"
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Type-safe assertion function that throws if the value is null or undefined.
 */
export function assertNotNull<T>(
  value: T | null | undefined,
  message = "Value is null or undefined"
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

/**
 * Creates a typed version of Record.
 */
export type TypedRecord<K extends string | number | symbol, T> = Record<K, T>;

/**
 * Creates a deep readonly version of a type.
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

/**
 * Creates a deep partial version of a type.
 */
export type DeepPartial<T> = T extends (infer R)[]
  ? DeepPartial<R>[]
  : T extends Function
  ? T
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

/**
 * A utility type for discriminated unions with a type property.
 */
export type Discriminated<
  TType extends string,
  TBase = {}
> = TBase & {
  type: TType;
};

/**
 * Extracts the type of a promise.
 */
export type Awaited<T> = T extends Promise<infer R> ? R : T;

/**
 * Extracts the type of an array's elements.
 */
export type ElementOf<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never;

/**
 * Ensures a value is an array.
 */
export function ensureArray<T>(valueOrArray: T | T[]): T[] {
  return Array.isArray(valueOrArray) ? valueOrArray : [valueOrArray];
}

/**
 * A utility type for component props with a base type and optional extensions.
 */
export type ComponentPropsWithBase<Base, Extensions = {}> = Base & Extensions;

/**
 * Creates a type-safe mapping function that preserves the array type.
 */
export function mapArray<T, U>(
  array: T[],
  fn: (item: T, index: number) => U
): U[] {
  return array.map(fn);
}

/**
 * Safely accesses a deep property path in an object.
 */
export function getPath<T extends object, K extends keyof T>(
  obj: T,
  path: K | string,
  defaultValue?: T[K]
): T[K] | undefined {
  if (!obj) return defaultValue;
  
  if (typeof path === "string" && path.includes(".")) {
    const keys = path.split(".");
    let current: any = obj;
    
    for (const key of keys) {
      if (current === null || current === undefined) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current !== undefined ? current : defaultValue;
  }
  
  return (obj as any)[path] !== undefined ? (obj as any)[path] : defaultValue;
}

/**
 * Type-safe version of Object.keys that returns a typed array of keys.
 */
export function typedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Type-safe version of Object.entries that returns a typed array of entries.
 */
export function typedEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Safely parses JSON, returning a Result.
 */
export function safeJsonParse<T>(json: string): Result<T, Error> {
  return tryExec(() => JSON.parse(json) as T);
}

/**
 * Safely stringifies JSON, returning a Result.
 */
export function safeJsonStringify<T>(value: T): Result<string, Error> {
  return tryExec(() => JSON.stringify(value));
}