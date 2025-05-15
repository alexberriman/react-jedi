/**
 * Specification Parser
 *
 * This file provides utilities for parsing, validating, and manipulating UI specifications.
 * It enables runtime validation and transformation of JSON specifications before rendering.
 */

import { Result, Ok, Err } from "ts-results";
import {
  type ComponentSpec,
  type UISpecification,
} from "@/types/schema/components";
import { isTextContent } from "@/types/schema/guards";
import {
  ValidationPipeline,
  createValidationPipeline,
  type ValidationStageError,
  ValidationStageType,
} from "./validation-pipeline";
import {
  SpecificationErrorType,
  type SpecificationError,
} from "./shared-types";

/**
 * Result type for specification parser operations
 */
export type SpecificationParserResult<T> = Result<T, SpecificationError>;

/**
 * Parser options interface
 */
export interface SpecificationParserOptions {
  /**
   * Whether to allow referential component specs
   * @default true
   */
  allowReferences?: boolean;

  /**
   * Whether to resolve expressions in the specification
   * @default true
   */
  resolveExpressions?: boolean;

  /**
   * Whether to validate component specs against schemas
   * @default true
   */
  validateSchemas?: boolean;

  /**
   * Whether to process in development mode with additional checks
   * @default false
   */
  development?: boolean;

  /**
   * Context variables for expression resolution
   */
  context?: Record<string, unknown>;
  
  /**
   * Whether to stop validation at the first error
   * @default false
   */
  stopAtFirstError?: boolean;
  
  /**
   * Whether to include suggestions for fixing errors
   * @default true
   */
  includeSuggestions?: boolean;
  
  /**
   * Base URL for documentation references
   * @default "https://react-jedi.org/docs/validation/"
   */
  documentationBaseUrl?: string;
}

/**
 * Default parser options
 */
const DEFAULT_PARSER_OPTIONS: Required<SpecificationParserOptions> = {
  allowReferences: true,
  resolveExpressions: true,
  validateSchemas: true,
  development: false,
  context: {},
  stopAtFirstError: false,
  includeSuggestions: true,
  documentationBaseUrl: "https://react-jedi.org/docs/validation/",
};

/**
 * SpecificationParser class
 *
 * Provides utilities for parsing, validating, and transforming UI specifications.
 */
export class SpecificationParser {
  /**
   * Parser options
   */
  private options: Required<SpecificationParserOptions>;
  
  /**
   * Validation pipeline instance
   */
  private validationPipeline: ValidationPipeline;

  /**
   * Creates a new SpecificationParser instance
   *
   * @param options - Parser options
   */
  constructor(options: SpecificationParserOptions = {}) {
    this.options = { ...DEFAULT_PARSER_OPTIONS, ...options };
    
    // Create validation pipeline with the same options
    this.validationPipeline = createValidationPipeline({
      development: this.options.development,
      stopAtFirstError: this.options.stopAtFirstError,
      includeSuggestions: this.options.includeSuggestions,
      documentationBaseUrl: this.options.documentationBaseUrl,
    });
  }

  /**
   * Parses a UI specification
   *
   * @param input - Raw UI specification or JSON string
   * @returns Parsed UI specification or error
   */
  parse(
    input: unknown
  ): SpecificationParserResult<UISpecification | ComponentSpec> {
    try {
      // Handle string input (JSON)
      if (typeof input === "string") {
        try {
          const parsed = JSON.parse(input);
          return this.parseObject(parsed);
        } catch (error) {
          return Err({
            type: SpecificationErrorType.INVALID_FORMAT,
            message: `Invalid JSON: ${
              error instanceof Error ? error.message : "Unknown parsing error"
            }`,
            suggestions: [
              "Check your JSON syntax",
              "Ensure your JSON is properly formatted",
              "Validate your JSON with a validator",
            ],
          });
        }
      }

      // Handle object input
      return this.parseObject(input);
    } catch (error) {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: `Parsing error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        suggestions: [
          "Check the format of your specification",
          "Ensure all required properties are present",
        ],
      });
    }
  }

  /**
   * Converts validation stage errors to parser errors
   * 
   * @param errors - Validation stage errors
   * @returns Parser error
   */
  private convertValidationErrorsToParserError(
    errors: ValidationStageError[]
  ): SpecificationError {
    if (errors.length === 0) {
      return {
        type: SpecificationErrorType.SCHEMA_VALIDATION,
        message: "Validation failed with no specific errors",
      };
    }
    
    // Use the first error as the primary error
    const primaryError = errors[0];
    
    // Map validation stage type to parser error type
    let errorType: SpecificationErrorType;
    switch (primaryError.stage) {
      case ValidationStageType.PREPROCESSING: {
        errorType = SpecificationErrorType.INVALID_FORMAT;
        break;
      }
      case ValidationStageType.SCHEMA: {
        errorType = SpecificationErrorType.SCHEMA_VALIDATION;
        break;
      }
      case ValidationStageType.SEMANTIC: {
        errorType = SpecificationErrorType.SEMANTIC_VALIDATION;
        break;
      }
      case ValidationStageType.RELATIONAL: {
        errorType = SpecificationErrorType.RELATIONAL_VALIDATION;
        break;
      }
      default: {
        errorType = SpecificationErrorType.SCHEMA_VALIDATION;
      }
    }
    
    // Create comprehensive error message
    let message: string;
    if (errors.length === 1) {
      message = primaryError.message;
    } else {
      const errorText = errors.length === 2 ? "error" : "errors";
      message = `${primaryError.message} (and ${errors.length - 1} more validation ${errorText})`;
    }
    
    // Collect all validation errors
    const validationErrors = errors
      .filter(e => e.originalError)
      .map(e => e.originalError!);
    
    // Collect suggestions from all errors
    const allSuggestions = errors
      .filter(e => e.suggestions && e.suggestions.length > 0)
      .flatMap(e => e.suggestions!);
    
    // Remove duplicate suggestions
    const uniqueSuggestions = [...new Set(allSuggestions)];
    
    // For backward compatibility, map certain specific error cases to INVALID_FORMAT
    if (errors.some(e => e.path.includes("children") && e.message.includes("Invalid child component"))) {
      errorType = SpecificationErrorType.INVALID_FORMAT;
    }
    
    // Create parser error
    return {
      type: errorType,
      message,
      path: primaryError.path,
      validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
      suggestions: uniqueSuggestions.length > 0 ? uniqueSuggestions : undefined,
      documentationUrl: primaryError.documentationUrl,
      context: {
        invalidValue: primaryError.invalidValue,
        errors: this.options.development ? errors : undefined,
      },
    };
  }

  /**
   * Parses an object as a UI specification
   *
   * @param input - Raw object to parse
   * @returns Parsed UI specification or error
   */
  /**
   * Handles validation errors with special cases for backward compatibility
   * 
   * @param input - The input object that failed validation
   * @param validationResult - The validation error result
   * @returns Error result with appropriate error details
   */
  private handleValidationError(
    input: unknown,
    validationResult: Result<ValidationStageError[], UISpecification | ComponentSpec>
  ): SpecificationParserResult<never> {
    // Handle special cases for certain error types for backward compatibility
    if (input && typeof input === "object") {
      if (!('version' in input) && 'root' in input) {
        return Err({
          type: SpecificationErrorType.INVALID_FORMAT,
          message: "Invalid specification format: version must be a string",
          suggestions: ["Add a version string to the specification"],
        });
      } else if ('version' in input && !('root' in input)) {
        return Err({
          type: SpecificationErrorType.INVALID_FORMAT,
          message: "Invalid specification format: root must be an object",
          suggestions: ["Add a root component to the specification"],
        });
      }
    }
    
    // Check if validationResult is an error result and contains ValidationStageError[]
    if (validationResult.err && Array.isArray(validationResult.val)) {
      return Err(this.convertValidationErrorsToParserError(validationResult.val));
    }
    
    // Fallback for other error cases
    return Err({
      type: SpecificationErrorType.INVALID_FORMAT,
      message: "Invalid specification format: unknown validation error",
      suggestions: ["Check the specification structure and properties"],
    });
  }

  /**
   * Checks for partial UI specification with missing required fields
   * 
   * @param input - The input object to check
   * @returns Error result if the input is a partial specification with missing fields
   */
  private checkPartialUISpecification(
    input: Record<string, unknown>
  ): SpecificationParserResult<never> | null {
    if ("version" in input && !("root" in input)) {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: "Invalid specification format: root must be an object",
        suggestions: ["Add a root component to the specification"],
      });
    } 
    
    if ("root" in input && !("version" in input)) {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: "Invalid specification format: version must be a string",
        suggestions: ["Add a version string to the specification"],
      });
    }
    
    return null;
  }

  private parseObject(
    input: unknown
  ): SpecificationParserResult<UISpecification | ComponentSpec> {
    // Use validation pipeline for initial validation
    if (this.options.validateSchemas) {
      const validationResult = this.validationPipeline.validateSpecification(input, {
        development: this.options.development,
        stopAtFirstError: this.options.stopAtFirstError,
      });
      
      if (validationResult.err) {
        return this.handleValidationError(input, validationResult as Result<ValidationStageError[], never>);
      }
      
      return Ok(validationResult.val as UISpecification | ComponentSpec);
    }
    
    // If schema validation is disabled, perform basic structure validation
    
    // Handle null or non-object input
    if (input === null || typeof input !== "object") {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: `Invalid specification format: Expected object, got ${
          input === null ? "null" : typeof input
        }`,
        suggestions: ["Provide a valid specification object"],
      });
    }

    const inputObj = input as Record<string, unknown>;

    // Check if it's a UI specification (has version and root)
    if ("version" in inputObj && "root" in inputObj) {
      return this.parseUISpecification(inputObj);
    }

    // Check if it's a component specification (has type)
    if ("type" in inputObj && typeof inputObj.type === "string") {
      return this.parseComponentSpec(inputObj);
    }

    // Check for partial UI specification with missing required fields
    const partialSpecResult = this.checkPartialUISpecification(inputObj);
    if (partialSpecResult) {
      return partialSpecResult;
    }
    
    // Neither a UI specification nor a component specification
    return Err({
      type: SpecificationErrorType.INVALID_FORMAT,
      message: "Invalid specification format: Missing required properties",
      suggestions: [
        "Add type property for a component specification",
        "Add version and root properties for a UI specification",
      ],
    });
  }

  /**
   * Parses a UI specification
   *
   * @param input - Raw UI specification object
   * @returns Parsed UI specification or error
   */
  /**
   * Adds optional properties to a UI specification if they exist in the input
   * 
   * @param spec - UI specification to update
   * @param input - Input object containing potential optional properties
   */
  private addOptionalPropertiesToUISpec(
    spec: UISpecification,
    input: Record<string, unknown>
  ): void {
    if (input.metadata && typeof input.metadata === "object") {
      spec.metadata = input.metadata as UISpecification["metadata"];
    }

    if (input.theme && typeof input.theme === "object") {
      spec.theme = input.theme as UISpecification["theme"];
    }

    if (input.state && typeof input.state === "object") {
      spec.state = input.state as UISpecification["state"];
    }

    if (
      input.dataSources &&
      Array.isArray(input.dataSources) &&
      input.dataSources.every((ds) => typeof ds === "object" && ds !== null)
    ) {
      spec.dataSources = input.dataSources as UISpecification["dataSources"];
    }
  }

  private parseUISpecification(
    input: Record<string, unknown>
  ): SpecificationParserResult<UISpecification> {
    try {
      // Basic structure validation
      if (typeof input.version !== "string") {
        return Err({
          type: SpecificationErrorType.INVALID_FORMAT,
          message: "Invalid specification: version must be a string",
          suggestions: ["Provide a string value for the version property"],
        });
      }

      if (!input.root || typeof input.root !== "object") {
        return Err({
          type: SpecificationErrorType.INVALID_FORMAT,
          message: "Invalid specification: root must be an object",
          suggestions: ["Provide a valid component object for the root property"],
        });
      }

      // Convert to UISpecification type with basic properties
      const spec: UISpecification = {
        version: input.version,
        root: input.root as ComponentSpec,
      };

      // Add optional properties if present
      this.addOptionalPropertiesToUISpec(spec, input);

      // Parse the root component spec
      // First ensure we have a valid record type for parsing
      const rootObj = spec.root as unknown as Record<string, unknown>;
      const rootResult = this.parseComponentSpec(rootObj);
      if (rootResult.err) {
        return Err({
          ...rootResult.val,
          path: ["root", ...(rootResult.val.path || [])],
        });
      }

      // Replace the root with the parsed component spec
      spec.root = rootResult.unwrap();

      // If validateSchemas is enabled, validate the parsed specification
      if (this.options.validateSchemas) {
        const validationResult = this.validationPipeline.validateUISpecification(spec);
        if (validationResult.err) {
          return Err(this.convertValidationErrorsToParserError(validationResult.val));
        }
      }

      return Ok(spec);
    } catch (error) {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: `Error parsing UI specification: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        suggestions: [
          "Check the structure of your UI specification",
          "Ensure all properties have the correct types",
        ],
      });
    }
  }

  /**
   * Validates a component specification's events
   * 
   * @param events - The events object from a component specification
   * @returns Success result or error with details
   */
  private validateComponentEvents(
    events: Record<string, unknown>
  ): SpecificationParserResult<void> {
    for (const [eventName, handler] of Object.entries(events)) {
      if (
        typeof handler !== "object" ||
        handler === null ||
        !("action" in handler) ||
        typeof handler.action !== "string"
      ) {
        return Err({
          type: SpecificationErrorType.INVALID_FORMAT,
          message: `Invalid event handler for '${eventName}': Missing required 'action' property`,
          path: ["events", eventName],
          suggestions: [
            `Add a string 'action' property to the '${eventName}' event handler`,
            "Event handlers must include an 'action' property",
          ],
        });
      }
    }
    return Ok(undefined);
  }

  /**
   * Parses a component specification
   *
   * @param input - Raw component specification object
   * @returns Parsed component specification or error
   */
  /**
   * Validates the basic structure of a component specification
   * 
   * @param input - Component input to validate
   * @returns Error result if validation fails, null otherwise
   */
  private validateComponentStructure(
    input: Record<string, unknown>
  ): SpecificationParserResult<never> | null {
    if (typeof input.type !== "string") {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: "Invalid component: type must be a string",
        suggestions: [
          "Add a string 'type' property to the component",
          "Ensure the 'type' property is a valid component type",
        ],
      });
    }
    return null;
  }

  /**
   * Processes the children property of a component specification
   * 
   * @param component - Component specification to process
   * @returns Error result if processing fails, null otherwise
   */
  private processComponentChildren(
    component: ComponentSpec
  ): SpecificationParserResult<never> | null {
    if ("children" in component) {
      const childrenResult = this.parseChildren(component.children);
      if (childrenResult.err) {
        return Err({
          ...childrenResult.val,
          path: ["children", ...(childrenResult.val.path || [])],
        });
      }
      component.children = childrenResult.unwrap();
    }
    return null;
  }

  private parseComponentSpec(
    input: Record<string, unknown>
  ): SpecificationParserResult<ComponentSpec> {
    try {
      // Basic structure validation
      const structureError = this.validateComponentStructure(input);
      if (structureError) {
        return structureError;
      }
      
      // Create a shallow copy of the input and cast to ComponentSpec
      // This is safe because we've already verified the 'type' property exists and is a string
      const component = { ...input } as unknown as ComponentSpec;

      // Process children if present
      const childrenError = this.processComponentChildren(component);
      if (childrenError) {
        return childrenError;
      }

      // Process events if present
      if (component.events && typeof component.events === "object") {
        const eventsResult = this.validateComponentEvents(component.events);
        if (eventsResult.err) {
          return eventsResult;
        }
      }

      // Process accessibility props if present
      if (component.a11y && typeof component.a11y === "object") {
        // Basic validation is handled by the validation pipeline
      }

      // If validateSchemas is enabled, validate the parsed component
      if (this.options.validateSchemas) {
        const validationResult = this.validationPipeline.validateComponentSpec(component);
        if (validationResult.err) {
          return Err(this.convertValidationErrorsToParserError(validationResult.val));
        }
      }

      return Ok(component);
    } catch (error) {
      return Err({
        type: SpecificationErrorType.INVALID_FORMAT,
        message: `Error parsing component specification: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        suggestions: [
          "Check the structure of your component specification",
          "Ensure all properties have the correct types",
        ],
      });
    }
  }

  /**
   * Parses component children
   *
   * @param children - Children value from a component specification
   * @returns Parsed children value or error
   */
  private parseChildren(
    children: unknown
  ): SpecificationParserResult<ComponentSpec | ComponentSpec[] | string> {
    // Handle string children (text content)
    if (isTextContent(children)) {
      return Ok(children);
    }

    // Handle single component child
    if (
      children !== null &&
      typeof children === "object" &&
      "type" in children &&
      typeof children.type === "string"
    ) {
      return this.parseComponentSpec(children as Record<string, unknown>);
    }

    // Handle array of component children
    if (Array.isArray(children)) {
      const parsedChildren: ComponentSpec[] = [];
      
      for (const [index, child] of children.entries()) {
        if (child === null || typeof child !== "object" || !("type" in child)) {
          return Err({
            type: SpecificationErrorType.INVALID_FORMAT,
            message: "Invalid child component: Missing required 'type' property",
            path: [index.toString()],
            suggestions: [
              "Add a 'type' property to the child component",
              "Ensure each child component has a valid 'type'",
            ],
          });
        }
        
        const childResult = this.parseComponentSpec(child as Record<string, unknown>);
        if (childResult.err) {
          return Err({
            ...childResult.val,
            path: [index.toString(), ...(childResult.val.path || [])],
          });
        }
        
        parsedChildren.push(childResult.unwrap());
      }
      
      return Ok(parsedChildren);
    }

    // Invalid children format
    return Err({
      type: SpecificationErrorType.INVALID_FORMAT,
      message: `Invalid children format: Expected string, component, or array of components, got ${typeof children}`,
      suggestions: [
        "Use a string for text content",
        "Use a component object with a 'type' property",
        "Use an array of component objects",
      ],
    });
  }
  
  /**
   * Creates a detailed validation report for the last parsing operation
   * 
   * @param spec - The specification that failed validation
   * @returns Detailed validation report
   */
  createValidationReport(spec: unknown): string {
    try {
      const validationResult = this.validationPipeline.validateSpecification(spec);
      
      if (validationResult.ok) {
        return "Specification is valid";
      }
      
      return this.validationPipeline.createDetailedErrorReport(validationResult.val);
    } catch (error) {
      return `Error generating validation report: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
    }
  }
  
  /**
   * Formats validation errors into a human-readable string
   * 
   * @param error - Parser error to format
   * @returns Formatted error message
   */
  formatError(error: SpecificationError): string {
    let message = `Error: ${error.message}`;
    
    if (error.path && error.path.length > 0) {
      message += ` at '${error.path.join(".")}'`;
    }
    
    if (error.suggestions && error.suggestions.length > 0) {
      message += "\nSuggestions:";
      for (const suggestion of error.suggestions) {
        message += `\n - ${suggestion}`;
      }
    }
    
    if (error.documentationUrl) {
      message += `\nDocumentation: ${error.documentationUrl}`;
    }
    
    if (error.validationErrors && error.validationErrors.length > 0) {
      message += `\n\nValidation Errors (${error.validationErrors.length}):`;
      for (const [index, validationError] of error.validationErrors.entries()) {
        const path = validationError.path.length > 0
          ? ` at '${validationError.path.join(".")}'`
          : "";
        
        message += `\n ${index + 1}. ${validationError.message}${path}`;
      }
    }
    
    return message;
  }
}

/**
 * Creates a new SpecificationParser with the given options
 *
 * @param options - Parser options
 * @returns SpecificationParser instance
 */
export function createParser(
  options: SpecificationParserOptions = {}
): SpecificationParser {
  return new SpecificationParser(options);
}

/**
 * Default parser instance with standard options
 */
export const defaultParser = createParser();

/**
 * Parses a UI specification or component specification
 *
 * @param spec - Raw specification object or JSON string
 * @param options - Parser options
 * @returns Parsed specification or error
 */
export function parseSpecification(
  spec: unknown,
  options: SpecificationParserOptions = {}
): SpecificationParserResult<UISpecification | ComponentSpec> {
  const parser = createParser(options);
  return parser.parse(spec);
}

/**
 * Creates a detailed validation report for a specification
 * 
 * @param spec - Specification to validate
 * @param options - Parser options
 * @returns Detailed validation report
 */
export function createValidationReport(
  spec: unknown,
  options: SpecificationParserOptions = {}
): string {
  const parser = createParser({
    ...options,
    development: true, // Enable development mode for detailed reports
  });
  return parser.createValidationReport(spec);
}

/**
 * Re-export SpecificationErrorType for backward compatibility
 */
export { SpecificationErrorType as SpecificationParserErrorType } from "./shared-types";
export type { SpecificationError as SpecificationParserError } from "./shared-types";