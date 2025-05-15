/**
 * Specification Validator
 *
 * This file provides utilities for validating UI specifications against their schemas.
 * It integrates with the SpecificationParser to provide comprehensive validation.
 */

import { Result, Ok, Err } from "ts-results";
import { z } from "zod";
import {
  type ComponentSpec,
  type UISpecification,
} from "@/types/schema/components";
import {
  isBox,
  isContainer,
  isGrid,
  isFlex,
  isAspectRatio,
  isSeparator,
  isText,
  isHeading,
  isBlockQuote,
  isButton,
  isCard,
  isBadge,
  isAvatar,
  isImage,
  isSkeleton,
  isLabel,
  isInput,
} from "@/types/schema/guards";
import Validator, { type ValidationError } from "@/lib/validation/validator";
import { baseComponentSchema } from "@/lib/schemas/base-schema";
import { gridSchema } from "@/lib/schemas/grid-schema";
import {
  type SpecificationParserError,
  SpecificationParserErrorType,
} from "./specification-parser";

/**
 * Validation options interface
 */
export interface SpecificationValidationOptions {
  /**
   * Whether to validate component specs against schemas
   * @default true
   */
  validateSchemas?: boolean;

  /**
   * Whether to stop validation at the first error
   * @default false
   */
  stopAtFirstError?: boolean;

  /**
   * Whether to strip unknown properties from specifications
   * @default false
   */
  stripUnknown?: boolean;

  /**
   * Whether to process in development mode with additional checks
   * @default false
   */
  development?: boolean;
}

/**
 * Default validation options
 */
const DEFAULT_VALIDATION_OPTIONS: Required<SpecificationValidationOptions> = {
  validateSchemas: true,
  stopAtFirstError: false,
  stripUnknown: false,
  development: false,
};

/**
 * Result type for specification validation operations
 */
export type SpecificationValidationResult<T> = Result<T, SpecificationParserError>;

/**
 * UI Specification schema
 */
const uiSpecificationSchema = z.object({
  version: z.string(),
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      author: z.string().optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
      tags: z.array(z.string()).optional(),
    })
    .optional(),
  root: z.object({
    type: z.string(),
  }).passthrough(),
  theme: z.record(z.unknown()).optional(),
  state: z
    .object({
      initial: z.record(z.unknown()),
    })
    .optional(),
  dataSources: z.array(z.object({
    id: z.string(),
    type: z.enum(["rest", "graphql", "static", "websocket", "function"]),
    config: z.record(z.unknown()),
  })).optional(),
});

/**
 * SpecificationValidator class
 *
 * Provides utilities for validating UI specifications against schemas.
 */
export class SpecificationValidator {
  /**
   * Validation options
   */
  private options: Required<SpecificationValidationOptions>;

  /**
   * Creates a new SpecificationValidator instance
   *
   * @param options - Validation options
   */
  constructor(options: SpecificationValidationOptions = {}) {
    this.options = { ...DEFAULT_VALIDATION_OPTIONS, ...options };
  }

  /**
   * Validates a UI specification
   *
   * @param spec - UI specification to validate
   * @returns Validated UI specification or error
   */
  validateUISpecification(
    spec: UISpecification
  ): SpecificationValidationResult<UISpecification> {
    try {
      // Basic structure validation using Zod
      const result = Validator.validate(uiSpecificationSchema, spec);
      
      if (result.err) {
        return Err({
          type: SpecificationParserErrorType.SCHEMA_VALIDATION,
          message: "UI specification validation failed",
          validationErrors: result.val,
        });
      }

      // Further validation of the root component
      const rootResult = this.validateComponentSpec(spec.root);
      if (rootResult.err) {
        return Err({
          ...rootResult.val,
          path: ["root", ...(rootResult.val.path || [])],
        });
      }

      // Return the validated specification
      return Ok(spec);
    } catch (error) {
      return Err({
        type: SpecificationParserErrorType.SCHEMA_VALIDATION,
        message: `UI specification validation error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }

  /**
   * Validates a component specification
   *
   * @param component - Component specification to validate
   * @returns Validated component specification or error
   */
  validateComponentSpec(
    component: ComponentSpec
  ): SpecificationValidationResult<ComponentSpec> {
    try {
      // Skip schema validation if disabled
      if (!this.options.validateSchemas) {
        return Ok(component);
      }

      // Validate against the base component schema first
      const baseResult = Validator.validate(baseComponentSchema, component);
      
      if (baseResult.err) {
        return Err({
          type: SpecificationParserErrorType.SCHEMA_VALIDATION,
          message: `Component validation failed for type '${component.type}'`,
          validationErrors: baseResult.val,
        });
      }

      // Validate against specific component schemas
      let specificSchemaResult: Result<unknown, ValidationError[]> = Ok(component);
      
      // Validate Grid components
      if (isGrid(component)) {
        specificSchemaResult = Validator.validate(gridSchema, component);
      }
      
      // Additional component-specific schema validation will be added here
      // as more component schemas are implemented

      if (specificSchemaResult.err) {
        return Err({
          type: SpecificationParserErrorType.SCHEMA_VALIDATION,
          message: `Specific component validation failed for type '${component.type}'`,
          validationErrors: specificSchemaResult.val,
        });
      }

      // Validate children if present
      if (component.children) {
        // If children is a string, no validation needed
        if (typeof component.children === "string") {
          // Text content is always valid
        } 
        // If children is a component spec
        else if ("type" in component.children && typeof component.children.type === "string") {
          const childResult = this.validateComponentSpec(component.children as ComponentSpec);
          if (childResult.err) {
            return Err({
              ...childResult.val,
              path: ["children", ...(childResult.val.path || [])],
            });
          }
        } 
        // If children is an array of component specs
        else if (Array.isArray(component.children)) {
          for (let i = 0; i < component.children.length; i++) {
            const child = component.children[i];
            
            if (!("type" in child) || typeof child.type !== "string") {
              return Err({
                type: SpecificationParserErrorType.SCHEMA_VALIDATION,
                message: "Invalid child component: Missing required 'type' property",
                path: ["children", i.toString()],
              });
            }
            
            const childResult = this.validateComponentSpec(child);
            if (childResult.err) {
              return Err({
                ...childResult.val,
                path: ["children", i.toString(), ...(childResult.val.path || [])],
              });
            }
          }
        }
      }

      // Return the validated component
      return Ok(component);
    } catch (error) {
      return Err({
        type: SpecificationParserErrorType.SCHEMA_VALIDATION,
        message: `Component validation error for type '${component.type}': ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  }
}

/**
 * Creates a new SpecificationValidator with the given options
 *
 * @param options - Validation options
 * @returns SpecificationValidator instance
 */
export function createValidator(
  options: SpecificationValidationOptions = {}
): SpecificationValidator {
  return new SpecificationValidator(options);
}

/**
 * Default validator instance with standard options
 */
export const defaultValidator = createValidator();

/**
 * Validates a UI specification
 *
 * @param spec - UI specification to validate
 * @param options - Validation options
 * @returns Validated UI specification or error
 */
export function validateUISpecification(
  spec: UISpecification,
  options: SpecificationValidationOptions = {}
): SpecificationValidationResult<UISpecification> {
  const validator = createValidator(options);
  return validator.validateUISpecification(spec);
}

/**
 * Validates a component specification
 *
 * @param component - Component specification to validate
 * @param options - Validation options
 * @returns Validated component specification or error
 */
export function validateComponentSpec(
  component: ComponentSpec,
  options: SpecificationValidationOptions = {}
): SpecificationValidationResult<ComponentSpec> {
  const validator = createValidator(options);
  return validator.validateComponentSpec(component);
}