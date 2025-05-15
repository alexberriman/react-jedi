import { describe, it, expect } from "vitest";
import {
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
  assert,
  ensureArray,
  typedKeys,
  typedEntries,
  safeJsonParse,
  safeJsonStringify,
  getPath,
} from "./type-safety";

describe("Result type", () => {
  it("should handle success case", () => {
    const result = ok(42);
    
    expect(result.isOk).toBe(true);
    expect(result.isErr).toBe(false);
    expect(result.unwrap()).toBe(42);
    expect(result.unwrapOr(0)).toBe(42);
    
    const mapped = result.map(x => x * 2);
    expect(mapped.unwrap()).toBe(84);
    
    const chain = result.andThen(x => ok(x.toString()));
    expect(chain.unwrap()).toBe("42");
  });
  
  it("should handle error case", () => {
    const error = new Error("test error");
    const result = err(error);
    
    expect(result.isOk).toBe(false);
    expect(result.isErr).toBe(true);
    expect(result.unwrapOr(42)).toBe(42);
    expect(() => result.unwrap()).toThrow("test error");
    
    const mapped = result.map(x => x * 2);
    expect(mapped.isErr).toBe(true);
    
    const mappedErr = result.mapErr(e => new Error(`Mapped: ${e.message}`));
    expect(mappedErr.isErr).toBe(true);
    expect(() => mappedErr.unwrap()).toThrow("Mapped: test error");
    
    // Fix: Remove the implicit 'never' type assertion by providing a concrete type
    const chain = result.andThen(x => ok(String(x)));
    expect(chain.isErr).toBe(true);
  });
});

// Type guard for positive numbers
const isPositiveNumber = (value: unknown): boolean => 
  typeof value === "number" && value > 0;

describe("Type guards", () => {
  it("should check if a value is not null or undefined", () => {
    expect(isNotNullOrUndefined(42)).toBe(true);
    expect(isNotNullOrUndefined("")).toBe(true);
    expect(isNotNullOrUndefined(null)).toBe(false);
    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });
  
  it("should check if a value is of a specific type", () => {
    expect(isOfType<number>(42, isPositiveNumber)).toBe(true);
    expect(isOfType<number>(-1, isPositiveNumber)).toBe(false);
    expect(isOfType<number>("42", isPositiveNumber)).toBe(false);
  });
  
  it("should check if an object has a property", () => {
    expect(hasProperty({ name: "test" }, "name")).toBe(true);
    expect(hasProperty({ name: "test" }, "age")).toBe(false);
    expect(hasProperty(null, "name")).toBe(false);
    expect(hasProperty(42, "toString")).toBe(false); // Only works with object literals
  });
  
  it("should check if an object has a property of a specific type", () => {
    expect(hasPropertyOfType({ name: "test" }, "name", isString)).toBe(true);
    expect(hasPropertyOfType({ name: 42 }, "name", isString)).toBe(false);
    expect(hasPropertyOfType({ age: 42 }, "age", isNumber)).toBe(true);
    expect(hasPropertyOfType({ age: "42" }, "age", isNumber)).toBe(false);
  });
  
  it("should check primitive types", () => {
    expect(isString("test")).toBe(true);
    expect(isString(42)).toBe(false);
    
    expect(isNumber(42)).toBe(true);
    expect(isNumber("42")).toBe(false);
    expect(isNumber(Number.NaN)).toBe(false);
    
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean("true")).toBe(false);
    
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
    expect(isFunction({})).toBe(false);
  });
  
  it("should check object and array types", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    
    expect(isArrayOf([1, 2, 3], isNumber)).toBe(true);
    expect(isArrayOf([1, "2", 3], isNumber)).toBe(false);
  });
});

describe("Utility functions", () => {
  it("should safely access object properties", () => {
    const obj = { a: 1, b: { c: 2 } };
    
    expect(prop(obj, "a", 0)).toBe(1);
    expect(prop(obj, "c" as keyof typeof obj, 3)).toBe(3);
    expect(prop(null as unknown as typeof obj, "a", 4)).toBe(4);
  });
  
  it("should safely execute functions", () => {
    const success = tryExec(() => 42);
    expect(success.isOk).toBe(true);
    expect(success.unwrap()).toBe(42);
    
    const failure = tryExec(() => { throw new Error("boom"); });
    expect(failure.isErr).toBe(true);
    expect(() => failure.unwrap()).toThrow("boom");
  });
  
  it("should provide assert functions", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(false)).toThrow("Assertion failed");
    expect(() => assert(false, "Custom message")).toThrow("Custom message");
  });
  
  it("should ensure a value is an array", () => {
    expect(ensureArray(42)).toEqual([42]);
    expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
  });
  
  it("should safely access nested properties", () => {
    const obj = { a: { b: { c: 42 } }, d: null };
    
    expect(getPath(obj, "a.b.c")).toBe(42);
    expect(getPath(obj, "a.b.d")).toBeUndefined();
    expect(getPath(obj, "d.e" as keyof typeof obj & string)).toBeUndefined();
    
    // Fix: Use a properly typed object for the default value
    const defaultObj = { b: { c: 99 } };
    expect(getPath(obj, "x.y.z" as keyof typeof obj & string, defaultObj)).toEqual(defaultObj);
    
    expect(getPath(obj, "a" as keyof typeof obj)).toEqual({ b: { c: 42 } });
  });
  
  it("should provide type-safe versions of Object methods", () => {
    const obj = { a: 1, b: "test", c: true };
    
    const keys = typedKeys(obj);
    expect(keys).toEqual(["a", "b", "c"]);
    
    const entries = typedEntries(obj);
    expect(entries).toEqual([["a", 1], ["b", "test"], ["c", true]]);
  });
  
  it("should safely parse and stringify JSON", () => {
    const obj = { a: 1, b: "test" };
    const json = '{"a":1,"b":"test"}';
    
    const parsed = safeJsonParse(json);
    expect(parsed.isOk).toBe(true);
    expect(parsed.unwrap()).toEqual(obj);
    
    const stringified = safeJsonStringify(obj);
    expect(stringified.isOk).toBe(true);
    expect(stringified.unwrap()).toBe(json);
    
    const invalidJson = '{a:1}';
    const parseFailed = safeJsonParse(invalidJson);
    expect(parseFailed.isErr).toBe(true);
    
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    const stringifyFailed = safeJsonStringify(circular);
    expect(stringifyFailed.isErr).toBe(true);
  });
});