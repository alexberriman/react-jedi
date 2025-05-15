/**
 * JSON Schema Creator
 *
 * Provides utilities to convert Zod schemas to JSON Schema format.
 * This allows for schema documentation, validation in other tools, and
 * compatibility with JSON Schema tooling.
 */

import { z } from "zod";

/**
 * JSON Schema type definition (simplified)
 */
export interface JSONSchema {
  type?: string | string[];
  properties?: Record<string, JSONSchema>;
  required?: string[];
  items?: JSONSchema;
  enum?: unknown[];
  allOf?: JSONSchema[];
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  not?: JSONSchema;
  definitions?: Record<string, JSONSchema>;
  $ref?: string;
  description?: string;
  title?: string;
  format?: string;
  default?: unknown;
  examples?: unknown[];
  additionalProperties?: boolean | JSONSchema;
  [key: string]: unknown;
}

/**
 * Options for JSON Schema conversion
 */
export interface JSONSchemaOptions {
  /**
   * Schema ID
   */
  $id?: string;
  
  /**
   * Schema title
   */
  title?: string;
  
  /**
   * Schema description
   */
  description?: string;
  
  /**
   * JSON Schema version
   */
  $schema?: string;
}

/**
 * Default JSON Schema options
 */
const DEFAULT_OPTIONS: JSONSchemaOptions = {
  $schema: "http://json-schema.org/draft-07/schema#",
};

/**
 * Class that converts Zod schemas to JSON Schema
 */
export class JSONSchemaConverter {
  /**
   * Converts a Zod schema to a JSON Schema object
   * 
   * @param schema - The Zod schema to convert
   * @param options - Options for the JSON Schema
   * @returns A JSON Schema object
   */
  static zodToJSONSchema(schema: z.ZodType<any>, options: JSONSchemaOptions = {}): JSONSchema {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    const baseSchema = this.convertZodSchema(schema);
    
    // Add metadata
    return {
      ...baseSchema,
      $schema: mergedOptions.$schema,
      $id: mergedOptions.$id,
      title: mergedOptions.title || baseSchema.title,
      description: mergedOptions.description || baseSchema.description,
    };
  }
  
  /**
   * Internal method to convert any Zod schema to JSON Schema
   * 
   * @param schema - The Zod schema to convert
   * @returns A JSON Schema object
   */
  private static convertZodSchema(schema: z.ZodType<any>): JSONSchema {
    // Handle different schema types
    if (schema instanceof z.ZodString) {
      return this.convertString(schema);
    } else if (schema instanceof z.ZodNumber) {
      return this.convertNumber(schema);
    } else if (schema instanceof z.ZodBoolean) {
      return { type: "boolean" };
    } else if (schema instanceof z.ZodNull) {
      return { type: "null" };
    } else if (schema instanceof z.ZodArray) {
      return this.convertArray(schema);
    } else if (schema instanceof z.ZodObject) {
      return this.convertObject(schema);
    } else if (schema instanceof z.ZodEnum) {
      return this.convertEnum(schema);
    } else if (schema instanceof z.ZodLiteral) {
      return this.convertLiteral(schema);
    } else if (schema instanceof z.ZodUnion) {
      return this.convertUnion(schema);
    } else if (schema instanceof z.ZodOptional) {
      return this.convertOptional(schema);
    } else if (schema instanceof z.ZodDefault) {
      return this.convertDefault(schema);
    } else if (schema instanceof z.ZodRecord) {
      return this.convertRecord(schema);
    } else if (schema instanceof z.ZodNullable) {
      return this.convertNullable(schema);
    }
    
    // Fallback for unhandled schema types
    return { description: "Unsupported schema type" };
  }
  
  /**
   * Converts a ZodString schema to JSON Schema
   */
  private static convertString(schema: z.ZodString): JSONSchema {
    const jsonSchema: JSONSchema = { type: "string" };
    
    // Extract string validations from the schema
    const checks = this.getChecks(schema);
    
    for (const check of checks) {
      if (check.kind === "min") {
        jsonSchema.minLength = check.value as number;
      } else if (check.kind === "max") {
        jsonSchema.maxLength = check.value as number;
      } else if (check.kind === "regex") {
        const regex = check.value as RegExp;
        jsonSchema.pattern = regex.source;
      } else if (check.kind === "email") {
        jsonSchema.format = "email";
      } else if (check.kind === "url") {
        jsonSchema.format = "uri";
      } else if (check.kind === "uuid") {
        jsonSchema.format = "uuid";
      } else if (check.kind === "datetime") {
        jsonSchema.format = "date-time";
      }
    }
    
    return jsonSchema;
  }
  
  /**
   * Converts a ZodNumber schema to JSON Schema
   */
  private static convertNumber(schema: z.ZodNumber): JSONSchema {
    const jsonSchema: JSONSchema = { type: "number" };
    
    // Extract number validations from the schema
    const checks = this.getChecks(schema);
    
    for (const check of checks) {
      if (check.kind === "min") {
        jsonSchema.minimum = check.value as number;
        if (check.inclusive === false) {
          jsonSchema.exclusiveMinimum = true;
        }
      } else if (check.kind === "max") {
        jsonSchema.maximum = check.value as number;
        if (check.inclusive === false) {
          jsonSchema.exclusiveMaximum = true;
        }
      } else if (check.kind === "int") {
        jsonSchema.type = "integer";
      } else if (check.kind === "multipleOf") {
        jsonSchema.multipleOf = check.value as number;
      }
    }
    
    return jsonSchema;
  }
  
  /**
   * Converts a ZodArray schema to JSON Schema
   */
  private static convertArray(schema: z.ZodArray<any>): JSONSchema {
    return {
      type: "array",
      items: this.convertZodSchema(schema._def.type),
      ...(schema._def.minLength !== null ? { minItems: schema._def.minLength.value } : {}),
      ...(schema._def.maxLength !== null ? { maxItems: schema._def.maxLength.value } : {}),
    };
  }
  
  /**
   * Converts a ZodObject schema to JSON Schema
   */
  private static convertObject(schema: z.ZodObject<any>): JSONSchema {
    const properties: Record<string, JSONSchema> = {};
    const required: string[] = [];
    
    // Process each property in the object
    const shape = schema._def.shape();
    
    for (const key of Object.keys(shape)) {
      const propertySchema = shape[key];
      properties[key] = this.convertZodSchema(propertySchema);
      
      // Check if the property is required
      if (!(propertySchema instanceof z.ZodOptional) && 
          !(propertySchema instanceof z.ZodDefault)) {
        required.push(key);
      }
    }
    
    return {
      type: "object",
      properties,
      ...(required.length > 0 ? { required } : {}),
      ...(schema._def.catchall instanceof z.ZodNever
        ? { additionalProperties: false }
        : { additionalProperties: this.convertZodSchema(schema._def.catchall) }),
    };
  }
  
  /**
   * Converts a ZodEnum schema to JSON Schema
   */
  private static convertEnum(schema: z.ZodEnum<any>): JSONSchema {
    return {
      type: "string",
      enum: schema._def.values,
    };
  }
  
  /**
   * Converts a ZodLiteral schema to JSON Schema
   */
  private static convertLiteral(schema: z.ZodLiteral<any>): JSONSchema {
    const value = schema._def.value;
    const type = typeof value;
    
    return {
      type: type as string,
      enum: [value],
    };
  }
  
  /**
   * Converts a ZodUnion schema to JSON Schema
   */
  private static convertUnion(schema: z.ZodUnion<any>): JSONSchema {
    return {
      anyOf: schema._def.options.map((option: z.ZodType<any>) => 
        this.convertZodSchema(option)
      ),
    };
  }
  
  /**
   * Converts a ZodOptional schema to JSON Schema
   */
  private static convertOptional(schema: z.ZodOptional<any>): JSONSchema {
    return {
      ...this.convertZodSchema(schema._def.innerType),
    };
  }
  
  /**
   * Converts a ZodDefault schema to JSON Schema
   */
  private static convertDefault(schema: z.ZodDefault<any>): JSONSchema {
    return {
      ...this.convertZodSchema(schema._def.innerType),
      default: schema._def.defaultValue(),
    };
  }
  
  /**
   * Converts a ZodRecord schema to JSON Schema
   */
  private static convertRecord(schema: z.ZodRecord): JSONSchema {
    return {
      type: "object",
      additionalProperties: this.convertZodSchema(schema._def.valueType),
    };
  }
  
  /**
   * Converts a ZodNullable schema to JSON Schema
   */
  private static convertNullable(schema: z.ZodNullable<any>): JSONSchema {
    const innerSchema = this.convertZodSchema(schema._def.innerType);
    return {
      anyOf: [
        innerSchema,
        { type: "null" },
      ],
    };
  }
  
  /**
   * Helper method to extract validation checks from a schema
   * This relies on internal Zod structure and may break with Zod updates
   */
  private static getChecks(schema: any): any[] {
    // Access internal _def.checks if available
    if (schema._def && Array.isArray(schema._def.checks)) {
      return schema._def.checks;
    }
    return [];
  }
}

export default JSONSchemaConverter;