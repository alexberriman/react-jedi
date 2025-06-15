/**
 * Component Validator
 *
 * Provides validation for UI component specifications using JSON schemas.
 * This module handles validation of all component types and provides detailed error messages.
 */

import { z } from "zod";
import { Result, Ok, Err } from "ts-results";
import { Validator, ValidationError, ValidationOptions, ValidationSeverity } from "./validator";
import { JSONSchemaConverter } from "./json-schema";
import { ComponentSpec } from "../../types/schema";
import { schemaRegistry } from "./registry";

/**
 * Component validation error interface with enhanced context
 */
export interface ComponentValidationError extends ValidationError {
  /** The component type that had the validation error */
  componentType?: string;
  
  /** Component-specific schema documentation URL */
  schemaDocUrl?: string;
  
  /** Component schema examples */
  schemaExamples?: unknown[];
}

/**
 * Component validation result type
 */
export type ComponentValidationResult = Result<ComponentSpec, ComponentValidationError[]>;

/**
 * Component validation options
 */
export interface ComponentValidationOptions extends ValidationOptions {
  /** Include schema examples in error messages */
  includeSchemaExamples?: boolean;
  
  /** Add links to component documentation */
  includeDocLinks?: boolean;
  
  /** Base URL for component documentation */
  componentDocsBaseUrl?: string;
}

/**
 * Default validation options for components
 */
const DEFAULT_COMPONENT_OPTIONS: ComponentValidationOptions = {
  stripUnknown: false,
  allowAdditionalProperties: false,
  includeExamples: true,
  includeSchemaExamples: true,
  includeDocLinks: true,
  componentDocsBaseUrl: "https://react-jedi.org/docs/components/",
  documentationBaseUrl: "https://react-jedi.org/docs/validation/"
};

/**
 * Class for validating UI component specifications
 */
export class ComponentValidator {
  /**
   * Validates a component specification against its schema
   * 
   * @param spec - The component specification to validate
   * @param options - Validation options
   * @returns A Result containing either the validated spec or validation errors
   */
  static validateComponent(
    spec: unknown, 
    options: ComponentValidationOptions = DEFAULT_COMPONENT_OPTIONS
  ): ComponentValidationResult {
    const mergedOptions = { ...DEFAULT_COMPONENT_OPTIONS, ...options };
    
    if (!spec || typeof spec !== "object") {
      return Err([{
        path: [],
        message: "Component specification must be an object",
        code: "INVALID_TYPE",
        severity: ValidationSeverity.ERROR,
        invalidValue: spec,
        validExamples: [{ type: "heading", content: "Example Heading" }],
        documentationUrl: `${mergedOptions.documentationBaseUrl}component-basics`
      }]);
    }
    
    // Check if spec has a type property
    if (!("type" in spec) || typeof spec.type !== "string") {
      return Err([{
        path: ["type"],
        message: "Component specification must have a 'type' property",
        code: "MISSING_REQUIRED",
        severity: ValidationSeverity.ERROR,
        invalidValue: spec,
        validExamples: this.getAllComponentTypes().map(type => ({ type }))
      }]);
    }
    
    const componentType = spec.type as string;
    
    // Validate against the appropriate schema based on type
    const schema = this.getSchemaForType(componentType);
    if (!schema) {
      return Err([{
        path: ["type"],
        message: `Unknown component type: ${componentType}. Valid types are: ${this.getAllComponentTypes().join(", ")}`,
        code: "INVALID_TYPE",
        componentType,
        severity: ValidationSeverity.ERROR,
        invalidValue: componentType,
        validExamples: this.getAllComponentTypes(),
        schemaExamples: this.getAllComponentExamples().slice(0, 2)
      }]);
    }
    
    // Prepare component-specific context for validation
    const validationContext = {
      componentType,
      allowedProps: this.getComponentProps(schema)
    };
    
    // Set up component-specific validation options
    const componentOptions: ValidationOptions = {
      ...mergedOptions,
      context: validationContext,
      documentationBaseUrl: mergedOptions.documentationBaseUrl
    };
    
    // Validate the specification
    const result = Validator.validate(schema, spec, componentOptions);
    
    if (result.err) {
      // Enhance errors with component-specific information
      const errors = result.val.map(err => {
        const schemaDocUrl = mergedOptions.includeDocLinks && mergedOptions.componentDocsBaseUrl 
          ? `${mergedOptions.componentDocsBaseUrl}${componentType.toLowerCase()}` 
          : undefined;
        
        const schemaExamples = mergedOptions.includeSchemaExamples 
          ? this.getComponentExamples(componentType) 
          : undefined;
        
        return {
          ...err,
          componentType,
          schemaDocUrl,
          schemaExamples
        } as ComponentValidationError;
      });
      
      return Err(errors);
    }
    
    return Ok(result.val as ComponentSpec);
  }
  
  /**
   * Validates a component tree recursively
   * 
   * @param spec - The root component specification
   * @param options - Validation options
   * @returns A Result containing either the validated spec or validation errors
   */
  static validateComponentTree(
    spec: unknown,
    options: ComponentValidationOptions = DEFAULT_COMPONENT_OPTIONS
  ): ComponentValidationResult {
    // First validate the root component
    const rootResult = this.validateComponent(spec, options);
    if (rootResult.err) {
      return rootResult;
    }
    
    const validatedSpec = rootResult.val;
    const errors: ComponentValidationError[] = [];
    
    // Recursively validate children if present
    if (this.hasChildren(validatedSpec)) {
      const childrenResult = this.validateChildren(validatedSpec, options);
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
  static getSchemaForType(type: string): z.ZodType<ComponentSpec> | undefined {
    return schemaRegistry.getSchema(type);
  }
  
  /**
   * Registers a new component schema
   * 
   * @param type - The component type
   * @param schema - The Zod schema for the component
   * @param examples - Optional examples for this component type
   */
  static registerSchema(
    type: string, 
    schema: z.ZodType<ComponentSpec>,
    examples?: unknown[]
  ): void {
    schemaRegistry.registerSchema(type, schema, examples);
  }
  
  /**
   * Gets the JSON Schema for a component type
   * 
   * @param type - The component type
   * @returns The JSON Schema or undefined if not found
   */
  static getJSONSchemaForType(type: string): Record<string, unknown> | undefined {
    const schema = this.getSchemaForType(type);
    if (!schema) return undefined;
    
    return JSONSchemaConverter.zodToJSONSchema(schema, {
      $id: `https://react-jedi.org/schemas/components/${type}.json`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Component Schema`,
      description: `JSON Schema for ${type} component specifications`
    });
  }
  
  /**
   * Gets a list of all registered component types
   * 
   * @returns Array of component type names
   */
  static getAllComponentTypes(): string[] {
    return schemaRegistry.getAllTypes();
  }
  
  /**
   * Gets all component examples
   * 
   * @returns Array of component examples
   */
  static getAllComponentExamples(): unknown[] {
    return schemaRegistry.getAllExamples();
  }
  
  /**
   * Gets examples for a specific component type
   * 
   * @param type - The component type
   * @returns Array of examples or undefined if not found
   */
  static getComponentExamples(type: string): unknown[] | undefined {
    return schemaRegistry.getExamples(type);
  }
  
  /**
   * Extract the property names from a Zod schema
   * 
   * @param schema - The Zod schema
   * @returns Array of property names
   */
  static getComponentProps(schema: z.ZodType<unknown>): string[] {
    if (schema instanceof z.ZodObject) {
      return Object.keys(schema.shape);
    }
    return [];
  }
  
  /**
   * Formats component validation errors to a user-friendly string
   * 
   * @param errors - Array of component validation errors
   * @returns Formatted error message string
   */
  static formatComponentErrorsToString(errors: ComponentValidationError[]): string {
    if (errors.length === 0) return "Validation failed with no specific errors";
    
    return errors.map(err => {
      const componentInfo = err.componentType ? `[${err.componentType}] ` : "";
      const path = err.path.length > 0 ? `at '${err.path.join(".")}': ` : "";
      let message = `${componentInfo}${path}${err.message}`;
      
      // Add valid examples if available
      if (err.validExamples && err.validExamples.length > 0) {
        const examples = err.validExamples
          .map(ex => typeof ex === "string" ? `"${ex}"` : JSON.stringify(ex))
          .join(", ");
        message += `\nValid values: ${examples}`;
      }
      
      // Add schema examples if available
      if (err.schemaExamples && err.schemaExamples.length > 0) {
        message += `\nComponent example: ${JSON.stringify(err.schemaExamples[0], null, 2)}`;
      }
      
      // Add documentation link if available
      if (err.schemaDocUrl) {
        message += `\nDocumentation: ${err.schemaDocUrl}`;
      }
      
      return message;
    }).join("\n\n");
  }
  
  /**
   * Group validation errors by component type
   */
  private static groupErrorsByComponentType(errors: ComponentValidationError[]): Record<string, ComponentValidationError[]> {
    const errorsByComponent: Record<string, ComponentValidationError[]> = {};
    
    for (const err of errors) {
      const type = err.componentType || "unknown";
      if (!errorsByComponent[type]) {
        errorsByComponent[type] = [];
      }
      errorsByComponent[type].push(err);
    }
    
    return errorsByComponent;
  }
  
  /**
   * Format a single error for the validation report
   */
  private static formatSingleErrorReport(err: ComponentValidationError): string {
    const path = err.path.length > 0 ? `'${err.path.join(".")}'` : "root";
    let errorReport = `### Error at ${path}\n\n`;
    errorReport += `- **Message**: ${err.message}\n`;
    
    if (err.invalidValue !== undefined) {
      errorReport += `- **Received**: \`${JSON.stringify(err.invalidValue)}\`\n`;
    }
    
    if (err.validExamples && err.validExamples.length > 0) {
      const examples = err.validExamples
        .map(ex => `\`${JSON.stringify(ex)}\``)
        .join(", ");
      errorReport += `- **Valid values**: ${examples}\n`;
    }
    
    if (err.schemaDocUrl) {
      errorReport += `- **Documentation**: [Component docs](${err.schemaDocUrl})\n`;
    }
    
    return errorReport + "\n";
  }
  
  /**
   * Add component example to the validation report
   */
  private static addComponentExampleToReport(componentType: string): string {
    const examples = this.getComponentExamples(componentType);
    if (!examples || examples.length === 0) {
      return "";
    }
    
    let exampleSection = `### Example of valid ${componentType} component\n\n`;
    exampleSection += "```json\n";
    exampleSection += JSON.stringify(examples[0], null, 2);
    exampleSection += "\n```\n\n";
    
    return exampleSection;
  }
  
  /**
   * Creates a detailed validation error report for a component specification
   * 
   * @param errors - Array of component validation errors
   * @returns Detailed error report string
   */
  static createValidationErrorReport(errors: ComponentValidationError[]): string {
    if (errors.length === 0) {
      return "No validation errors found.";
    }
    
    let report = `# Component Validation Error Report\n\n`;
    report += `Found ${errors.length} validation error${errors.length === 1 ? "" : "s"}.\n\n`;
    
    // Group errors by component type
    const errorsByComponent = this.groupErrorsByComponentType(errors);
    
    // Create report sections by component type
    for (const [componentType, componentErrors] of Object.entries(errorsByComponent)) {
      report += `## Errors in ${componentType} component\n\n`;
      
      // Add all errors for this component
      for (const err of componentErrors) {
        report += this.formatSingleErrorReport(err);
      }
      
      // Add example of valid component if available
      report += this.addComponentExampleToReport(componentType);
    }
    
    return report;
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
  private static validateChildren(
    spec: ComponentSpec, 
    options: ComponentValidationOptions
  ): Result<ComponentSpec, ComponentValidationError[]> {
    const errors: ComponentValidationError[] = [];
    
    // Handle different types of children (string, component, or array)
    if (typeof spec.children === "string") {
      // Text content is valid
      return Ok(spec);
    } else if (Array.isArray(spec.children)) {
      // Validate each child in array
      for (const [index, child] of spec.children.entries()) {
        if (typeof child === "string") {
          // Text content is valid
          continue;
        }
        
        const childResult = this.validateComponentTree(child, options);
        if (childResult.err) {
          // Add array index to error path
          const childErrors = childResult.val.map(err => ({
            ...err,
            path: ["children", index.toString(), ...err.path]
          }));
          errors.push(...childErrors);
        }
      }
    } else if (typeof spec.children === "object") {
      // Single child object
      const childResult = this.validateComponentTree(spec.children, options);
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