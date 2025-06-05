import { describe, it, expect } from "vitest";
import { omit } from "./omit";

describe("omit", () => {
  it("should omit specified keys from an object", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = omit(obj, ["b", "d"]);
    
    expect(result).toEqual({ a: 1, c: 3 });
    expect("b" in result).toBe(false);
    expect("d" in result).toBe(false);
  });

  it("should return a new object, not mutate the original", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["b"]);
    
    expect(result).not.toBe(obj);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should handle empty keys array", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj); // Still creates a new object
  });

  it("should handle non-existent keys gracefully", () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ["c" as keyof typeof obj, "d" as keyof typeof obj]);
    
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("should handle nested objects without deep cloning", () => {
    const nested = { x: 10, y: 20 };
    const obj = { a: 1, b: nested, c: 3 };
    const result = omit(obj, ["a"]);
    
    expect(result).toEqual({ b: nested, c: 3 });
    expect(result.b).toBe(nested); // Reference equality - shallow copy
  });

  it("should preserve type safety", () => {
    interface TestObj {
      id: number;
      name: string;
      email: string;
      password: string;
    }
    
    const user: TestObj = {
      id: 1,
      name: "John",
      email: "john@example.com",
      password: "secret"
    };
    
    const publicUser = omit(user, ["password"]);
    
    // TypeScript should know that password is not in publicUser
    // @ts-expect-error - password should not exist
    expect(publicUser.password).toBeUndefined();
    
    expect(publicUser.id).toBe(1);
    expect(publicUser.name).toBe("John");
    expect(publicUser.email).toBe("john@example.com");
  });

  it("should handle objects with symbol keys", () => {
    const sym = Symbol("test");
    const obj = { a: 1, b: 2, [sym]: 3 };
    const result = omit(obj, ["b"]);
    
    expect(result).toEqual({ a: 1, [sym]: 3 });
    expect(result[sym]).toBe(3);
  });

  it("should handle readonly arrays of keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keysToOmit = ["a", "c"] as const;
    const result = omit(obj, keysToOmit);
    
    expect(result).toEqual({ b: 2 });
  });
});