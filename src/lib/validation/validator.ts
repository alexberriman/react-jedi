/**
 * JSON Schema Validator
 *
 * Provides a central validation system for JSON schemas using Zod.
 * This module allows for runtime validation of UI specifications with detailed error messages.
 */

import { z } from "zod";
import { Result, Ok, Err } from "ts-results";

/**
 * Error severity levels
 */
export enum ValidationSeverity {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info"
}

/**
 * Validation error interface with enhanced context
 */
export interface ValidationError {
  /** Path to the property that failed validation */
  path: string[];
  
  /** Error message describing the issue */
  message: string;
  
  /** Error code for programmatic handling */
  code?: string;
  
  /** Severity level of the error */
  severity?: ValidationSeverity;
  
  /** Value that caused the error */
  invalidValue?: unknown;
  
  /** List of valid values or examples, when applicable */
  validExamples?: unknown[];
  
  /** Documentation URL or reference for this validation rule */
  documentationUrl?: string;
  
  /** Additional context for this error */
  context?: Record<string, unknown>;
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
  
  /**
   * Context data to add to validation errors
   */
  context?: Record<string, unknown>;
  
  /**
   * Include valid examples in error messages
   */
  includeExamples?: boolean;
  
  /**
   * Documentation base URL for error references
   */
  documentationBaseUrl?: string;
}

/**
 * Default validation options
 */
const DEFAULT_OPTIONS: ValidationOptions = {
  stripUnknown: false,
  allowAdditionalProperties: false,
  pathPrefix: [],
  includeExamples: true,
  documentationBaseUrl: "https://react-jedi.org/docs/validation/"
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
        const errors = this.formatZodErrors(
          parseResult.error, 
          merged.pathPrefix || [],
          data,
          merged
        );
        return Err(errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown validation error";
      return Err([{ 
        path: options.pathPrefix || [], 
        message, 
        code: "VALIDATION_ERROR",
        severity: ValidationSeverity.ERROR,
        invalidValue: data
      }]);
    }
  }

  /**
   * Formats Zod validation errors into a standardized enhanced format
   * 
   * @param error - Zod error object
   * @param pathPrefix - Optional path prefix for nested validation
   * @param data - The invalid data that was validated
   * @param options - Validation options
   * @returns Array of ValidationError objects
   */
  private static formatZodErrors(
    error: z.ZodError, 
    pathPrefix: string[] = [],
    data: unknown,
    options: ValidationOptions = {}
  ): ValidationError[] {
    return error.errors.map(err => {
      // Convert all path elements to strings to ensure type compatibility
      const fullPath = [...pathPrefix, ...err.path.map(String)];
      
      // Extract the invalid value using the path
      const invalidValue = this.getValueAtPath(data, err.path);
      
      // Generate examples based on the error code and expected type
      const validExamples = options.includeExamples 
        ? this.generateExamplesForError(err)
        : undefined;
      
      // Generate documentation URL if applicable
      const docUrl = options.documentationBaseUrl && err.code
        ? `${options.documentationBaseUrl}${err.code.toLowerCase()}`
        : undefined;
        
      // Create enhanced error object
      return {
        path: fullPath,
        message: this.enhanceErrorMessage(err),
        code: err.code,
        severity: ValidationSeverity.ERROR,
        invalidValue,
        validExamples,
        documentationUrl: docUrl,
        context: options.context
      };
    });
  }
  
  /**
   * Handle invalid type errors
   */
  private static handleInvalidTypeError(err: z.ZodInvalidTypeIssue): string {
    return `Expected ${err.expected}, received ${err.received}`;
  }
  
  /**
   * Handle invalid enum value errors
   */
  private static handleInvalidEnumError(err: z.ZodInvalidEnumValueIssue): string {
    const options = err.options.map(o => 
      typeof o === "string" ? `"${o}"` : String(o)
    ).join(", ");
    return `Invalid enum value. Expected one of: ${options}`;
  }
  
  /**
   * Handle invalid literal value errors
   */
  private static handleInvalidLiteralError(err: z.ZodInvalidLiteralIssue): string {
    return `Invalid literal value. Expected ${JSON.stringify(err.expected)}`;
  }
  
  /**
   * Handle invalid string errors (email, url, uuid, etc.)
   */
  private static handleInvalidStringError(err: z.ZodInvalidStringIssue): string {
    if ("validation" in err) {
      switch (err.validation) {
        case "url": {
          return "Invalid URL format";
        }
        case "email": {
          return "Invalid email address format";
        }
        case "uuid": {
          return "Invalid UUID format";
        }
        case "regex": {
          return "String does not match required pattern";
        }
      }
    }
    return err.message || "Invalid string format";
  }
  
  /**
   * Handle too small errors (string length, number min, array min)
   */
  private static handleTooSmallError(err: z.ZodTooSmallIssue): string {
    const inclusive = err.inclusive ? "or equal to " : "";
    
    switch (err.type) {
      case "string": {
        return `String must contain at least ${err.minimum} character${err.minimum === 1 ? "" : "s"}`;
      }
      case "number": {
        return `Number must be greater than ${inclusive}${err.minimum}`;
      }
      case "array": {
        return `Array must contain at least ${err.minimum} item${err.minimum === 1 ? "" : "s"}`;
      }
      default: {
        return err.message || "Value is too small";
      }
    }
  }
  
  /**
   * Handle too big errors (string length, number max, array max)
   */
  private static handleTooBigError(err: z.ZodTooBigIssue): string {
    const inclusive = err.inclusive ? "or equal to " : "";
    
    switch (err.type) {
      case "string": {
        return `String must contain at most ${err.maximum} character${err.maximum === 1 ? "" : "s"}`;
      }
      case "number": {
        return `Number must be less than ${inclusive}${err.maximum}`;
      }
      case "array": {
        return `Array must contain at most ${err.maximum} item${err.maximum === 1 ? "" : "s"}`;
      }
      default: {
        return err.message || "Value is too large";
      }
    }
  }
  
  /**
   * Enhances a Zod error message with more details
   */
  private static enhanceErrorMessage(err: z.ZodIssue): string {
    // Enhanced messages based on error code
    switch (err.code) {
      case z.ZodIssueCode.invalid_type: {
        return this.handleInvalidTypeError(err as z.ZodInvalidTypeIssue);
      }
      
      case z.ZodIssueCode.invalid_enum_value: {
        return this.handleInvalidEnumError(err as z.ZodInvalidEnumValueIssue);
      }
      
      case z.ZodIssueCode.invalid_literal: {
        return this.handleInvalidLiteralError(err as z.ZodInvalidLiteralIssue);
      }
      
      case z.ZodIssueCode.invalid_string: {
        return this.handleInvalidStringError(err as z.ZodInvalidStringIssue);
      }
      
      case z.ZodIssueCode.too_small: {
        return this.handleTooSmallError(err as z.ZodTooSmallIssue);
      }
      
      case z.ZodIssueCode.too_big: {
        return this.handleTooBigError(err as z.ZodTooBigIssue);
      }
      
      default: {
        return err.message;
      }
    }
  }
  
  /**
   * Generate examples for enum value errors
   */
  private static generateEnumExamples(err: z.ZodInvalidEnumValueIssue): unknown[] {
    // Return the first few enum options as examples
    return err.options.slice(0, 3);
  }
  
  /**
   * Generate examples for type errors based on expected type
   */
  private static generateTypeExamples(expected: string): unknown[] {
    switch (expected) {
      case "string": {
        return ["example", "value"];
      }
      case "number": {
        return [42, 3.14];
      }
      case "boolean": {
        return [true, false];
      }
      case "array": {
        return [[]];
      }
      case "object": {
        return [{}];
      }
      default: {
        return [];
      }
    }
  }
  
  /**
   * Generate examples for string validation errors
   */
  private static generateStringValidationExamples(validation: string | { includes: string; position?: number } | unknown): unknown[] {
    // Handle non-string validations
    if (typeof validation !== "string") {
      return [];
    }
    
    switch (validation) {
      case "url": {
        return ["https://example.com", "https://react-jedi.org"];
      }
      case "email": {
        return ["user@example.com", "contact@react-jedi.org"];
      }
      case "uuid": {
        return ["123e4567-e89b-12d3-a456-426614174000"];
      }
      default: {
        return [];
      }
    }
  }
  
  /**
   * Generate example values based on the error
   */
  private static generateExamplesForError(err: z.ZodIssue): unknown[] {
    switch (err.code) {
      case z.ZodIssueCode.invalid_enum_value: {
        return this.generateEnumExamples(err as z.ZodInvalidEnumValueIssue);
      }
      
      case z.ZodIssueCode.invalid_type: {
        const typeIssue = err as z.ZodInvalidTypeIssue;
        return this.generateTypeExamples(typeIssue.expected);
      }
      
      case z.ZodIssueCode.invalid_string: {
        const stringIssue = err as z.ZodInvalidStringIssue;
        if ("validation" in stringIssue) {
          return this.generateStringValidationExamples(stringIssue.validation);
        }
        return [];
      }
      
      default: {
        return [];
      }
    }
  }

  /**
   * Type guard to check if an object supports indexing
   */
  private static isIndexable(obj: unknown): obj is Record<string | number, unknown> {
    return typeof obj === "object" && obj !== null;
  }
  
  /**
   * Safely gets a value at a specific path in an object
   */
  private static getValueAtPath(obj: unknown, path: (string | number)[]): unknown {
    if (!obj || typeof obj !== "object" || path.length === 0) {
      return obj;
    }
    
    let current: unknown = obj;
    
    for (const key of path) {
      if (current === null || current === undefined) {
        return undefined;
      }
      
      if (!this.isIndexable(current)) {
        return undefined;
      }
      
      current = current[key];
    }
    
    return current;
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
    // We use refinement to add custom validation logic to ensure required properties
    const refined = schema.superRefine((data, ctx) => {
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
    
    // Cast the refined schema back to ZodObject to maintain type compatibility
    return refined as unknown as z.ZodObject<T>;
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
      let message = `${path}${err.message}`;
      
      // Add valid examples if available
      if (err.validExamples && err.validExamples.length > 0) {
        const examples = err.validExamples
          .map(ex => typeof ex === "string" ? `"${ex}"` : JSON.stringify(ex))
          .join(", ");
        message += `. Valid examples: ${examples}`;
      }
      
      return message;
    }).join("\n");
  }
  
  /**
   * Formats validation errors as a detailed, structured explanation
   * 
   * @param errors - Array of validation errors
   * @returns Detailed explanation string
   */
  static formatDetailedErrorExplanation(errors: ValidationError[]): string {
    if (errors.length === 0) return "Validation failed with no specific errors";
    
    return errors.map((err, index) => {
      const path = err.path.length > 0 ? `'${err.path.join(".")}':` : "";
      let result = `Error ${index + 1}: ${path} ${err.message}\n`;
      
      if (err.invalidValue !== undefined) {
        result += `  Received: ${JSON.stringify(err.invalidValue)}\n`;
      }
      
      if (err.validExamples && err.validExamples.length > 0) {
        const examples = err.validExamples
          .map(ex => typeof ex === "string" ? `"${ex}"` : JSON.stringify(ex))
          .join(", ");
        result += `  Valid examples: ${examples}\n`;
      }
      
      if (err.documentationUrl) {
        result += `  Documentation: ${err.documentationUrl}\n`;
      }
      
      return result;
    }).join("\n");
  }
}

export default Validator;