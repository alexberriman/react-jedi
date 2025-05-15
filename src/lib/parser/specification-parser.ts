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
import {
  isComponentSpec,
  isComponentSpecArray,
  isTextContent,
} from "@/types/schema/guards";
import Validator, { type ValidationError } from "@/lib/validation/validator";

/**
 * Error types for the specification parser
 */
export enum SpecificationParserErrorType {
  INVALID_FORMAT = "INVALID_FORMAT",
  SCHEMA_VALIDATION = "SCHEMA_VALIDATION",
  COMPONENT_RESOLUTION = "COMPONENT_RESOLUTION",
  REFERENCE_RESOLUTION = "REFERENCE_RESOLUTION",
  EXPRESSION_PARSING = "EXPRESSION_PARSING",
}

/**
 * Error interface for specification parsing errors
 */
export interface SpecificationParserError {
  /**
   * Type of the error
   */
  type: SpecificationParserErrorType;

  /**
   * Error message
   */
  message: string;

  /**
   * Path to the error location in the specification
   */
  path?: string[];

  /**
   * Original validation errors (if applicable)
   */
  validationErrors?: ValidationError[];

  /**
   * Additional context information
   */
  context?: Record<string, unknown>;
}

/**
 * Result type for specification parser operations
 */
export type SpecificationParserResult<T> = Result<T, SpecificationParserError>;

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
   * Creates a new SpecificationParser instance
   *
   * @param options - Parser options
   */
  constructor(options: SpecificationParserOptions = {}) {
    this.options = { ...DEFAULT_PARSER_OPTIONS, ...options };
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
            type: SpecificationParserErrorType.INVALID_FORMAT,
            message: `Invalid JSON: ${
              error instanceof Error ? error.message : "Unknown parsing error"
            }`,
          });
        }
      }

      // Handle object input
      return this.parseObject(input);
    } catch (error) {
      return Err({
        type: SpecificationParserErrorType.INVALID_FORMAT,
        message: `Parsing error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }

  /**
   * Parses an object as a UI specification
   *
   * @param input - Raw object to parse
   * @returns Parsed UI specification or error
   */
  private parseObject(
    input: unknown
  ): SpecificationParserResult<UISpecification | ComponentSpec> {
    // Handle null or non-object input
    if (input === null || typeof input !== "object") {
      return Err({
        type: SpecificationParserErrorType.INVALID_FORMAT,
        message: `Invalid specification format: Expected object, got ${
          input === null ? "null" : typeof input
        }`,
      });
    }

    // Check if it's a UI specification (has version and root)
    if ("version" in input && "root" in input) {
      return this.parseUISpecification(input as Record<string, unknown>);
    }

    // Check if it's a component specification (has type)
    if ("type" in input && typeof input.type === "string") {
      return this.parseComponentSpec(input as Record<string, unknown>);
    }

    // Neither a UI specification nor a component specification
    return Err({
      type: SpecificationParserErrorType.INVALID_FORMAT,
      message: "Invalid specification format: Missing required properties",
    });
  }

  /**
   * Parses a UI specification
   *
   * @param input - Raw UI specification object
   * @returns Parsed UI specification or error
   */
  private parseUISpecification(
    input: Record<string, unknown>
  ): SpecificationParserResult<UISpecification> {
    try {
      // Basic structure validation
      if (typeof input.version !== "string") {
        return Err({
          type: SpecificationParserErrorType.INVALID_FORMAT,
          message: "Invalid specification: version must be a string",
        });
      }

      if (!input.root || typeof input.root !== "object") {
        return Err({
          type: SpecificationParserErrorType.INVALID_FORMAT,
          message: "Invalid specification: root must be an object",
        });
      }

      // Convert to UISpecification type with basic properties
      const spec: UISpecification = {
        version: input.version,
        root: input.root as ComponentSpec,
      };

      // Add optional properties if present
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

      // Parse the root component spec
      const rootResult = this.parseComponentSpec(spec.root as Record<string, unknown>);
      if (rootResult.err) {
        return Err({
          ...rootResult.val,
          path: ["root", ...(rootResult.val.path || [])],
        });
      }

      // Replace the root with the parsed component spec
      spec.root = rootResult.unwrap();

      // Process children recursively - not needed here since parseComponentSpec
      // already handles child components recursively
      
      // Runtime schema validation not implemented yet - part of the next task

      return Ok(spec);
    } catch (error) {
      return Err({
        type: SpecificationParserErrorType.INVALID_FORMAT,
        message: `Error parsing UI specification: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }

  /**
   * Parses a component specification
   *
   * @param input - Raw component specification object
   * @returns Parsed component specification or error
   */
  private parseComponentSpec(
    input: Record<string, unknown>
  ): SpecificationParserResult<ComponentSpec> {
    try {
      // Basic structure validation
      if (typeof input.type !== "string") {
        return Err({
          type: SpecificationParserErrorType.INVALID_FORMAT,
          message: "Invalid component: type must be a string",
        });
      }

      // Create a shallow copy of the input to be safe
      const component = { ...input } as ComponentSpec;

      // Process children if present
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

      // Process events if present
      if (component.events && typeof component.events === "object") {
        // Simple validation for now - could be enhanced for better event parsing
        for (const [eventName, handler] of Object.entries(component.events)) {
          if (
            typeof handler !== "object" ||
            handler === null ||
            !("action" in handler) ||
            typeof handler.action !== "string"
          ) {
            return Err({
              type: SpecificationParserErrorType.INVALID_FORMAT,
              message: `Invalid event handler for '${eventName}': Missing required 'action' property`,
              path: ["events", eventName],
            });
          }
        }
      }

      // Process accessibility props if present
      if (component.a11y && typeof component.a11y === "object") {
        // Basic validation - could be enhanced for more specific a11y validation
      }

      // Runtime schema validation not implemented yet - part of the next task

      return Ok(component);
    } catch (error) {
      return Err({
        type: SpecificationParserErrorType.INVALID_FORMAT,
        message: `Error parsing component specification: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
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
      
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        
        if (child === null || typeof child !== "object" || !("type" in child)) {
          return Err({
            type: SpecificationParserErrorType.INVALID_FORMAT,
            message: "Invalid child component: Missing required 'type' property",
            path: [i.toString()],
          });
        }
        
        const childResult = this.parseComponentSpec(child as Record<string, unknown>);
        if (childResult.err) {
          return Err({
            ...childResult.val,
            path: [i.toString(), ...(childResult.val.path || [])],
          });
        }
        
        parsedChildren.push(childResult.unwrap());
      }
      
      return Ok(parsedChildren);
    }

    // Invalid children format
    return Err({
      type: SpecificationParserErrorType.INVALID_FORMAT,
      message: `Invalid children format: Expected string, component, or array of components, got ${typeof children}`,
    });
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