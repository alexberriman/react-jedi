/**
 * Validation Module Tests
 *
 * Unit tests for the validation modules to ensure correct schema validation.
 */

import { describe, it, expect } from "vitest";
import { Validator, ValidationSeverity } from "./validator";
import { JSONSchemaConverter } from "./json-schema";
import { ComponentValidator } from "./component-validator";
import { z } from "zod";
import { headingSchema } from "../../components/ui/heading/heading.schema";
import { flexSchema } from "../../components/ui/flex/flex.schema";
import { textSchema } from "../../components/ui/text/text.schema";

// Register the schemas for component validation tests
ComponentValidator.registerSchema("heading", headingSchema);
ComponentValidator.registerSchema("flex", flexSchema);
ComponentValidator.registerSchema("text", textSchema);

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
      expect(invalidResult.val[0].severity).toBe(ValidationSeverity.ERROR);
      expect(invalidResult.val[0].invalidValue).toBe(-5);
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
      { 
        path: ["user", "name"], 
        message: "Required", 
        code: "required", 
        severity: ValidationSeverity.ERROR,
        invalidValue: undefined 
      },
      { 
        path: ["user", "age"], 
        message: "Must be positive", 
        code: "min", 
        severity: ValidationSeverity.ERROR,
        invalidValue: -5,
        validExamples: [0, 1, 18, 21]
      },
    ];
    
    const formatted = Validator.formatErrorsToString(errors);
    
    expect(formatted).toContain("user.name");
    expect(formatted).toContain("user.age");
    expect(formatted).toContain("Required");
    expect(formatted).toContain("Must be positive");
    expect(formatted).toContain("Valid examples");
  });
  
  it("should provide enhanced error messages for different validation failures", () => {
    const schema = z.object({
      name: z.string().min(2),
      age: z.number().positive(),
      email: z.string().email(),
      role: z.enum(["admin", "user", "guest"]),
      settings: z.object({
        theme: z.enum(["light", "dark"]),
        notifications: z.boolean(),
      }),
    });
    
    const invalidData = {
      name: "A", // too short
      age: 0, // not positive
      email: "not-an-email",
      role: "moderator", // not in enum
      settings: {
        theme: "blue", // not in enum
        notifications: "yes", // not a boolean
      },
    };
    
    const result = Validator.validate(schema, invalidData);
    
    expect(result.ok).toBe(false);
    
    if (!result.ok) {
      expect(result.val.length).toBe(6); // 6 validation errors
      
      // Check for enhanced error messages
      const errorMessages = result.val.map(err => err.message);
      
      expect(errorMessages.some(msg => msg.includes("String must contain at least"))).toBeTruthy();
      expect(errorMessages.some(msg => msg.includes("Invalid enum value"))).toBeTruthy();
      expect(errorMessages.some(msg => msg.includes("Invalid email address format"))).toBeTruthy();
      
      // Check that we have some examples
      const hasExamples = result.val.some(err => 
        err.validExamples && err.validExamples.length > 0
      );
      expect(hasExamples).toBeTruthy();
      
      // Test detailed error explanation
      const detailedExplanation = Validator.formatDetailedErrorExplanation(result.val);
      expect(detailedExplanation).toContain("Error 1:");
      expect(detailedExplanation).toContain("Received:");
      expect(detailedExplanation).toContain("Valid examples:");
    }
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
      content: "Hello World",
      align: "center",
    };
    
    const result = ComponentValidator.validateComponent(validHeading);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.val.type).toBe("heading");
      // Since we know this is a heading component, access the text property safely
      const headingSpec = result.val as import("../../types/schema/typography").HeadingSpec;
      expect(headingSpec.content).toBe("Hello World");
    }
  });
  
  it("should reject an invalid heading component with detailed error messages", () => {
    const invalidHeading = {
      type: "heading",
      level: "h7", // Invalid level
      content: "Hello World",
    };
    
    const result = ComponentValidator.validateComponent(invalidHeading);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.val.length).toBeGreaterThan(0);
      expect(result.val[0].path).toContain("level");
      
      // Check for enhanced error details
      expect(result.val[0].componentType).toBe("heading");
      expect(result.val[0].severity).toBe(ValidationSeverity.ERROR);
      expect(result.val[0].invalidValue).toBe("h7");
      expect(result.val[0].message).toContain("Invalid enum value");
      
      // Should have valid examples
      expect(result.val[0].validExamples).toBeDefined();
      if (result.val[0].validExamples) {
        expect(result.val[0].validExamples.length).toBeGreaterThan(0);
      }
      
      // Should have a documentation URL
      expect(result.val[0].schemaDocUrl).toBeDefined();
      
      // Should have schema examples
      expect(result.val[0].schemaExamples).toBeDefined();
      
      // Test error formatting
      const formattedError = ComponentValidator.formatComponentErrorsToString(result.val);
      expect(formattedError).toContain("[heading]");
      expect(formattedError).toContain("level");
      expect(formattedError).toContain("Invalid enum value");
      expect(formattedError).toContain("Valid values");
      expect(formattedError).toContain("Component example");
    }
  });
  
  it("should reject unknown component types with suggestions", () => {
    const unknownComponent = {
      type: "nonexistent",
      value: "Some value",
    };
    
    const result = ComponentValidator.validateComponent(unknownComponent);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.val[0].message).toContain("Unknown component type");
      expect(result.val[0].message).toContain("Valid types are");
      
      // Should list available component types
      expect(result.val[0].validExamples).toBeDefined();
      if (result.val[0].validExamples) {
        expect(result.val[0].validExamples.length).toBeGreaterThan(0);
        expect(result.val[0].validExamples).toContain("heading");
      }
      
      // Should provide examples of valid components
      expect(result.val[0].schemaExamples).toBeDefined();
    }
  });
  
  it("should validate component tree with nested components", () => {
    const validComponentTree = {
      type: "flex",
      direction: "column",
      align: "center",
      gap: "md",
      children: [
        {
          type: "heading",
          level: "h1",
          content: "Welcome to Our App",
          align: "center"
        },
        {
          type: "text",
          text: "This is a description of our application.",
          variant: "muted",
          size: "lg"
        },
        // Invalid child component to test nested validation
        {
          type: "text",
          size: "unknown-size" // Invalid size
        }
      ]
    };
    
    const result = ComponentValidator.validateComponentTree(validComponentTree);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      // Should find the error in the nested component
      const nestedError = result.val.find(err => 
        err.path.includes("children") && 
        err.path.includes("2") && 
        err.path.includes("size")
      );
      
      expect(nestedError).toBeDefined();
      
      if (nestedError) {
        expect(nestedError.componentType).toBe("text");
        expect(nestedError.invalidValue).toBe("unknown-size");
        expect(nestedError.message).toContain("Invalid enum value");
      }
      
      // Format a detailed error report
      const errorReport = ComponentValidator.createValidationErrorReport(result.val);
      expect(errorReport).toContain("Component Validation Error Report");
      expect(errorReport).toContain("Errors in text component");
      expect(errorReport).toContain("Example of valid text component");
    }
  });
  
  it("should get JSON Schema for a component type", () => {
    const schema = ComponentValidator.getJSONSchemaForType("heading");
    
    expect(schema).toBeDefined();
    expect(schema?.title).toContain("Heading");
    
    // We need to check properties in a type-safe way
    if (schema && schema.properties) {
      // Cast to any to safely check for properties
      const properties = schema.properties as Record<string, unknown>;
      expect(properties.content).toBeDefined();
      expect(properties.level).toBeDefined();
    }
  });
  
  it("should get component examples for a component type", () => {
    const examples = ComponentValidator.getComponentExamples("heading");
    
    expect(examples).toBeDefined();
    expect(examples?.length).toBeGreaterThan(0);
    
    if (examples && examples.length > 0) {
      const example = examples[0] as { type: string; content?: string };
      expect(example.type).toBe("heading");
      expect(example.content).toBeDefined();
    }
  });
});