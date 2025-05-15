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
  static zodToJSONSchema<T>(schema: z.ZodType<T>, options: JSONSchemaOptions = {}): JSONSchema {
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
  private static convertZodSchema<T>(schema: z.ZodType<T>): JSONSchema {
    // Handle different schema types using switch pattern matching with instanceof
    switch (true) {
      case schema instanceof z.ZodString: {
        return this.convertString(schema as z.ZodString);
      }
      
      case schema instanceof z.ZodNumber: {
        return this.convertNumber(schema as z.ZodNumber);
      }
      
      case schema instanceof z.ZodBoolean: {
        return { type: "boolean" };
      }
      
      case schema instanceof z.ZodNull: {
        return { type: "null" };
      }
      
      case schema instanceof z.ZodArray: {
        return this.convertArray(schema as z.ZodArray<z.ZodType<unknown>>);
      }
      
      case schema instanceof z.ZodObject: {
        return this.convertObject(schema as z.ZodObject<z.ZodRawShape>);
      }
      
      case schema instanceof z.ZodEnum: {
        return this.convertEnum(schema as z.ZodEnum<[string, ...string[]]>);
      }
      
      case schema instanceof z.ZodLiteral: {
        return this.convertLiteral(schema as z.ZodLiteral<string | number | boolean>);
      }
      
      case schema instanceof z.ZodUnion: {
        return this.convertUnion(schema as z.ZodUnion<[z.ZodType<unknown>, ...z.ZodType<unknown>[]]>);
      }
      
      case schema instanceof z.ZodOptional: {
        return this.convertOptional(schema as z.ZodOptional<z.ZodType<unknown>>);
      }
      
      case schema instanceof z.ZodDefault: {
        return this.convertDefault(schema as z.ZodDefault<z.ZodType<unknown>>);
      }
      
      case schema instanceof z.ZodRecord: {
        return this.convertRecord(schema as z.ZodRecord);
      }
      
      case schema instanceof z.ZodNullable: {
        return this.convertNullable(schema as z.ZodNullable<z.ZodType<unknown>>);
      }
      
      default: {
        // Fallback for unhandled schema types
        return { description: "Unsupported schema type" };
      }
    }
  }
  
  /**
   * Converts a ZodString schema to JSON Schema
   */
  private static convertString(schema: z.ZodString): JSONSchema {
    const jsonSchema: JSONSchema = { type: "string" };
    
    // Extract string validations from the schema
    const checks = this.getChecks(schema);
    
    for (const check of checks) {
      switch (check.kind) {
        case "min": {
          jsonSchema.minLength = check.value as number;
          break;
        }
        
        case "max": {
          jsonSchema.maxLength = check.value as number;
          break;
        }
        
        case "regex": {
          const regex = check.value as RegExp;
          jsonSchema.pattern = regex.source;
          break;
        }
        
        case "email": {
          jsonSchema.format = "email";
          break;
        }
        
        case "url": {
          jsonSchema.format = "uri";
          break;
        }
        
        case "uuid": {
          jsonSchema.format = "uuid";
          break;
        }
        
        case "datetime": {
          jsonSchema.format = "date-time";
          break;
        }
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
      switch (check.kind) {
        case "min": {
          jsonSchema.minimum = check.value as number;
          if (check.inclusive === false) {
            jsonSchema.exclusiveMinimum = true;
          }
          break;
        }
        
        case "max": {
          jsonSchema.maximum = check.value as number;
          if (check.inclusive === false) {
            jsonSchema.exclusiveMaximum = true;
          }
          break;
        }
        
        case "int": {
          jsonSchema.type = "integer";
          break;
        }
        
        case "multipleOf": {
          jsonSchema.multipleOf = check.value as number;
          break;
        }
      }
    }
    
    return jsonSchema;
  }
  
  /**
   * Converts a ZodArray schema to JSON Schema
   */
  private static convertArray<T>(schema: z.ZodArray<z.ZodType<T>>): JSONSchema {
    return {
      type: "array",
      items: this.convertZodSchema(schema._def.type),
      ...(schema._def.minLength ? { minItems: schema._def.minLength.value } : {}),
      ...(schema._def.maxLength ? { maxItems: schema._def.maxLength.value } : {}),
    };
  }
  
  /**
   * Converts a ZodObject schema to JSON Schema
   */
  private static convertObject<T extends z.ZodRawShape>(schema: z.ZodObject<T>): JSONSchema {
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
  private static convertEnum<T extends [string, ...string[]]>(schema: z.ZodEnum<T>): JSONSchema {
    return {
      type: "string",
      enum: schema._def.values,
    };
  }
  
  /**
   * Converts a ZodLiteral schema to JSON Schema
   */
  private static convertLiteral<T extends string | number | boolean>(schema: z.ZodLiteral<T>): JSONSchema {
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
  private static convertUnion<T extends [z.ZodType<unknown>, ...z.ZodType<unknown>[]]>(schema: z.ZodUnion<T>): JSONSchema {
    return {
      anyOf: schema._def.options.map((option: z.ZodType<unknown>) => 
        this.convertZodSchema(option)
      ),
    };
  }
  
  /**
   * Converts a ZodOptional schema to JSON Schema
   */
  private static convertOptional<T>(schema: z.ZodOptional<z.ZodType<T>>): JSONSchema {
    return {
      ...this.convertZodSchema(schema._def.innerType),
    };
  }
  
  /**
   * Converts a ZodDefault schema to JSON Schema
   */
  private static convertDefault<T>(schema: z.ZodDefault<z.ZodType<T>>): JSONSchema {
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
  private static convertNullable<T>(schema: z.ZodNullable<z.ZodType<T>>): JSONSchema {
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
  private static getChecks(schema: z.ZodString | z.ZodNumber): Array<{ kind: string; value?: unknown; inclusive?: boolean }> {
    // Access internal _def.checks if available
    if (schema._def && Array.isArray(schema._def.checks)) {
      return schema._def.checks;
    }
    return [];
  }
}

export default JSONSchemaConverter;