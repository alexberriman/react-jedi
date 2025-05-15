/**
 * JSON Schema Validator
 *
 * Provides a central validation system for JSON schemas using Zod.
 * This module allows for runtime validation of UI specifications with detailed error messages.
 */

import { z } from "zod";
import { Result, Ok, Err } from "ts-results";

/**
 * Validation error interface
 */
export interface ValidationError {
  path: string[];
  message: string;
  code?: string;
}

/**
 * Validation result type
 * Either returns the validated data or a list of validation errors
 */
export type ValidationResult<T> = Result<T, ValidationError[]>;

/**
 * Options for customizing validation behavior
 */
export interface ValidationOptions {
  /**
   * Whether to strip unknown properties from the validated object
   */
  stripUnknown?: boolean;
  
  /**
   * Whether to allow additional properties not defined in the schema
   */
  allowAdditionalProperties?: boolean;
  
  /**
   * Path prefix to add to error paths for nested validation
   */
  pathPrefix?: string[];
}

/**
 * Default validation options
 */
const DEFAULT_OPTIONS: ValidationOptions = {
  stripUnknown: false,
  allowAdditionalProperties: false,
  pathPrefix: [],
};

/**
 * Class for validating objects against schemas
 */
export class Validator {
  /**
   * Validates data against a Zod schema
   * 
   * @param schema - The Zod schema to validate against
   * @param data - The data to validate
   * @param options - Validation options
   * @returns A Result containing either the validated data or validation errors
   */
  static validate<T>(
    schema: z.ZodType<T>,
    data: unknown,
    options: ValidationOptions = DEFAULT_OPTIONS
  ): ValidationResult<T> {
    try {
      const merged = { ...DEFAULT_OPTIONS, ...options };
      const parseResult = schema.safeParse(data);
      
      if (parseResult.success) {
        return Ok(parseResult.data);
      } else {
        const errors = this.formatZodErrors(parseResult.error, merged.pathPrefix || []);
        return Err(errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown validation error";
      return Err([{ path: options.pathPrefix || [], message, code: "VALIDATION_ERROR" }]);
    }
  }

  /**
   * Formats Zod validation errors into a standardized format
   * 
   * @param error - Zod error object
   * @param pathPrefix - Optional path prefix for nested validation
   * @returns Array of ValidationError objects
   */
  private static formatZodErrors(error: z.ZodError, pathPrefix: string[] = []): ValidationError[] {
    return error.errors.map(err => {
      const fullPath = [...pathPrefix, ...err.path];
      return {
        path: fullPath,
        message: err.message,
        code: err.code
      };
    });
  }

  /**
   * Creates a custom Zod schema that additionally checks for required properties
   * and provides better error messages
   * 
   * @param schema - The base Zod object schema
   * @param requiredProps - Array of required property names
   * @returns Enhanced Zod schema with better validation
   */
  static enhanceObjectSchema<T extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    requiredProps: string[] = []
  ): z.ZodObject<T> {
    // We can't directly modify the schema, but we can create a refined version
    // that performs additional validations
    return schema.superRefine((data, ctx) => {
      for (const prop of requiredProps) {
        if (data[prop as keyof typeof data] === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Required property '${prop}' is missing`,
            path: [prop],
          });
        }
      }
    });
  }
  
  /**
   * Converts a validation error array to a user-friendly string message
   * 
   * @param errors - Array of validation errors
   * @returns Formatted error message string
   */
  static formatErrorsToString(errors: ValidationError[]): string {
    if (errors.length === 0) return "Validation failed with no specific errors";
    
    return errors.map(err => {
      const path = err.path.length > 0 ? `at '${err.path.join(".")}': ` : "";
      return `${path}${err.message}`;
    }).join("\n");
  }
}

export default Validator;