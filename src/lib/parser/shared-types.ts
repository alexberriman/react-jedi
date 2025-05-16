/**
 * Shared Types for Specification Parser and Validation Pipeline
 *
 * This file contains common types and enums used by both the specification parser
 * and validation pipeline to avoid circular dependencies.
 */

import { type ValidationError } from "../lib/validation/validator";

/**
 * Error types for specification validation
 */
export enum SpecificationErrorType {
  INVALID_FORMAT = "INVALID_FORMAT",
  SCHEMA_VALIDATION = "SCHEMA_VALIDATION",
  COMPONENT_RESOLUTION = "COMPONENT_RESOLUTION",
  REFERENCE_RESOLUTION = "REFERENCE_RESOLUTION",
  EXPRESSION_PARSING = "EXPRESSION_PARSING",
  SEMANTIC_VALIDATION = "SEMANTIC_VALIDATION",
  RELATIONAL_VALIDATION = "RELATIONAL_VALIDATION",
}

/**
 * Error interface for specification parsing and validation errors
 */
export interface SpecificationError {
  /**
   * Type of the error
   */
  type: SpecificationErrorType;

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

  /**
   * Suggested fixes for the error
   */
  suggestions?: string[];

  /**
   * Related documentation URL
   */
  documentationUrl?: string;
}
