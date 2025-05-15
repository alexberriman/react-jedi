/**
 * Validation Module Tests
 *
 * Unit tests for the validation modules to ensure correct schema validation.
 */

import { describe, it, expect } from "vitest";
import { Validator } from "./validator";
import { JSONSchemaConverter } from "./json-schema";
import { ComponentValidator } from "./component-validator";
import { z } from "zod";
import { headingSchema } from "../../components/ui/heading/heading.schema";

// Register the heading schema for component validation tests
ComponentValidator.registerSchema("heading", headingSchema);

describe("Validator", () => {
  it("should validate data against a schema", () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().min(0),
    });
    
    const validData = { name: "John", age: 30 };
    const invalidData = { name: "John", age: -5 };
    
    const validResult = Validator.validate(schema, validData);
    const invalidResult = Validator.validate(schema, invalidData);
    
    expect(validResult.ok).toBe(true);
    expect(invalidResult.ok).toBe(false);
    
    if (validResult.ok) {
      expect(validResult.val).toEqual(validData);
    }
    
    if (invalidResult.ok === false) {
      expect(invalidResult.val.length).toBeGreaterThan(0);
      expect(invalidResult.val[0].path).toContain("age");
    }
  });
  
  it("should enhance object schemas with required properties", () => {
    const baseSchema = z.object({
      name: z.string(),
      age: z.number().optional(),
    });
    
    const enhancedSchema = Validator.enhanceObjectSchema(baseSchema, ["name"]);
    
    const validData = { name: "John" };
    const invalidData = { age: 30 };
    
    const validResult = enhancedSchema.safeParse(validData);
    const invalidResult = enhancedSchema.safeParse(invalidData);
    
    expect(validResult.success).toBe(true);
    expect(invalidResult.success).toBe(false);
  });
  
  it("should format errors to a readable string", () => {
    const errors = [
      { path: ["user", "name"], message: "Required", code: "required" },
      { path: ["user", "age"], message: "Must be positive", code: "min" },
    ];
    
    const formatted = Validator.formatErrorsToString(errors);
    
    expect(formatted).toContain("user.name");
    expect(formatted).toContain("user.age");
    expect(formatted).toContain("Required");
    expect(formatted).toContain("Must be positive");
  });
});

describe("JSONSchemaConverter", () => {
  it("should convert a Zod object schema to JSON Schema", () => {
    const zodSchema = z.object({
      name: z.string().min(2),
      age: z.number().min(0),
      email: z.string().email().optional(),
      preferences: z.object({
        theme: z.enum(["light", "dark"]),
        notifications: z.boolean(),
      }),
    });
    
    const jsonSchema = JSONSchemaConverter.zodToJSONSchema(zodSchema, {
      title: "User Schema",
      description: "Schema for user data",
    });
    
    expect(jsonSchema.type).toBe("object");
    expect(jsonSchema.title).toBe("User Schema");
    expect(jsonSchema.properties).toBeDefined();
    expect(jsonSchema.properties?.name).toBeDefined();
    expect(jsonSchema.properties?.age).toBeDefined();
    expect(jsonSchema.properties?.email).toBeDefined();
    expect(jsonSchema.properties?.preferences).toBeDefined();
    expect(jsonSchema.required).toContain("name");
    expect(jsonSchema.required).toContain("age");
    expect(jsonSchema.required).toContain("preferences");
    expect(jsonSchema.required).not.toContain("email");
  });
  
  it("should convert a Zod enum schema to JSON Schema", () => {
    const zodSchema = z.enum(["draft", "published", "archived"]);
    
    const jsonSchema = JSONSchemaConverter.zodToJSONSchema(zodSchema);
    
    expect(jsonSchema.type).toBe("string");
    expect(jsonSchema.enum).toEqual(["draft", "published", "archived"]);
  });
});

describe("ComponentValidator", () => {
  it("should validate a valid heading component", () => {
    const validHeading = {
      type: "heading",
      level: "h1",
      text: "Hello World",
      align: "center",
    };
    
    const result = ComponentValidator.validateComponent(validHeading);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.val.type).toBe("heading");
      expect(result.val.text).toBe("Hello World");
    }
  });
  
  it("should reject an invalid heading component", () => {
    const invalidHeading = {
      type: "heading",
      level: "h7", // Invalid level
      text: "Hello World",
    };
    
    const result = ComponentValidator.validateComponent(invalidHeading);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.val.length).toBeGreaterThan(0);
      expect(result.val[0].path).toContain("level");
    }
  });
  
  it("should reject unknown component types", () => {
    const unknownComponent = {
      type: "nonexistent",
      value: "Some value",
    };
    
    const result = ComponentValidator.validateComponent(unknownComponent);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.val[0].message).toContain("Unknown component type");
    }
  });
  
  it("should get JSON Schema for a component type", () => {
    const schema = ComponentValidator.getJSONSchemaForType("heading");
    
    expect(schema).toBeDefined();
    expect(schema?.title).toContain("Heading");
    expect(schema?.properties?.text).toBeDefined();
    expect(schema?.properties?.level).toBeDefined();
  });
});