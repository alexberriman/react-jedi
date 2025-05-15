/**
 * Component Validator
 *
 * Provides validation for UI component specifications using JSON schemas.
 * This module handles validation of all component types and provides detailed error messages.
 */

import { z } from "zod";
import { Result, Ok, Err } from "ts-results";
import { Validator, ValidationResult, ValidationError } from "./validator";
import { JSONSchemaConverter } from "./json-schema";
import { baseComponentSchema } from "../schemas/base-schema";
import { headingSchema } from "../../components/ui/heading/heading.schema";
import { ComponentSpec, isComponentType } from "../../types/schema";

/**
 * Component validation error interface
 */
export interface ComponentValidationError extends ValidationError {
  componentType?: string;
}

/**
 * Component validation result type
 */
export type ComponentValidationResult = Result<ComponentSpec, ComponentValidationError[]>;

/**
 * Cache of component schemas for faster validation
 */
const schemaCache = new Map<string, z.ZodType<any>>();

/**
 * Class for validating UI component specifications
 */
export class ComponentValidator {
  /**
   * Initialize schema cache
   */
  static {
    // Pre-populate schema cache with known schemas
    schemaCache.set("heading", headingSchema);
    // Add other component schemas here
  }

  /**
   * Validates a component specification against its schema
   * 
   * @param spec - The component specification to validate
   * @returns A Result containing either the validated spec or validation errors
   */
  static validateComponent(spec: unknown): ComponentValidationResult {
    if (!spec || typeof spec !== "object") {
      return Err([{
        path: [],
        message: "Component specification must be an object",
        code: "INVALID_TYPE"
      }]);
    }
    
    // Check if spec has a type property
    if (!("type" in spec) || typeof spec.type !== "string") {
      return Err([{
        path: ["type"],
        message: "Component specification must have a 'type' property",
        code: "MISSING_REQUIRED"
      }]);
    }
    
    const componentType = spec.type as string;
    
    // Validate against the appropriate schema based on type
    const schema = this.getSchemaForType(componentType);
    if (!schema) {
      return Err([{
        path: ["type"],
        message: `Unknown component type: ${componentType}`,
        code: "INVALID_TYPE",
        componentType
      }]);
    }
    
    // Validate the specification
    const result = Validator.validate(schema, spec);
    
    if (result.err) {
      // Add component type to error info
      const errors = result.val.map(err => ({
        ...err,
        componentType
      }));
      return Err(errors);
    }
    
    return Ok(result.val as ComponentSpec);
  }
  
  /**
   * Validates a component tree recursively
   * 
   * @param spec - The root component specification
   * @returns A Result containing either the validated spec or validation errors
   */
  static validateComponentTree(spec: unknown): ComponentValidationResult {
    // First validate the root component
    const rootResult = this.validateComponent(spec);
    if (rootResult.err) {
      return rootResult;
    }
    
    const validatedSpec = rootResult.val;
    const errors: ComponentValidationError[] = [];
    
    // Recursively validate children if present
    if (this.hasChildren(validatedSpec)) {
      const childrenResult = this.validateChildren(validatedSpec);
      if (childrenResult.err) {
        errors.push(...childrenResult.val);
      }
    }
    
    return errors.length > 0 ? Err(errors) : Ok(validatedSpec);
  }
  
  /**
   * Gets the Zod schema for a component type
   * 
   * @param type - The component type
   * @returns The Zod schema or undefined if not found
   */
  static getSchemaForType(type: string): z.ZodType<any> | undefined {
    return schemaCache.get(type);
  }
  
  /**
   * Registers a new component schema
   * 
   * @param type - The component type
   * @param schema - The Zod schema for the component
   */
  static registerSchema(type: string, schema: z.ZodType<any>): void {
    schemaCache.set(type, schema);
  }
  
  /**
   * Gets the JSON Schema for a component type
   * 
   * @param type - The component type
   * @returns The JSON Schema or undefined if not found
   */
  static getJSONSchemaForType(type: string): Record<string, any> | undefined {
    const schema = this.getSchemaForType(type);
    if (!schema) return undefined;
    
    return JSONSchemaConverter.zodToJSONSchema(schema, {
      $id: `https://react-jedi.org/schemas/components/${type}.json`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Component Schema`,
      description: `JSON Schema for ${type} component specifications`
    });
  }
  
  /**
   * Checks if a component can have children
   */
  private static hasChildren(spec: ComponentSpec): boolean {
    return "children" in spec && spec.children !== undefined;
  }
  
  /**
   * Validates all children of a component recursively
   */
  private static validateChildren(spec: ComponentSpec): Result<ComponentSpec, ComponentValidationError[]> {
    const errors: ComponentValidationError[] = [];
    
    // Handle different types of children (string, component, or array)
    if (typeof spec.children === "string") {
      // Text content is valid
      return Ok(spec);
    } else if (Array.isArray(spec.children)) {
      // Validate each child in array
      spec.children.forEach((child, index) => {
        if (typeof child === "string") {
          // Text content is valid
          return;
        }
        
        const childResult = this.validateComponentTree(child);
        if (childResult.err) {
          // Add array index to error path
          const childErrors = childResult.val.map(err => ({
            ...err,
            path: ["children", index.toString(), ...err.path]
          }));
          errors.push(...childErrors);
        }
      });
    } else if (typeof spec.children === "object") {
      // Single child object
      const childResult = this.validateComponentTree(spec.children);
      if (childResult.err) {
        // Add children to error path
        const childErrors = childResult.val.map(err => ({
          ...err,
          path: ["children", ...err.path]
        }));
        errors.push(...childErrors);
      }
    }
    
    return errors.length > 0 ? Err(errors) : Ok(spec);
  }
}

export default ComponentValidator;