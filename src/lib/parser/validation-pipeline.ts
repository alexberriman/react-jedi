/**
 * Validation Pipeline
 *
 * This file provides a structured validation pipeline for UI specifications,
 * with comprehensive error reporting and suggestions for fixing issues.
 */

import { Result, Ok, Err } from "ts-results";
import {
  type ComponentSpec,
  type UISpecification,
} from "@/types/schema/components";
import { type ValidationError, ValidationSeverity } from "@/lib/validation/validator";
import { defaultValidator } from "./specification-validator";
import {
  isGrid,
  isContainer,
  isFlex,
  isHeading,
  isText,
  isButton,
  isCard,
} from "@/types/schema/guards";
import { 
  SpecificationErrorType,
  type SpecificationError
} from "./shared-types";

/**
 * Type of validation stage
 */
export enum ValidationStageType {
  /** Pre-validation preparation stage */
  PREPROCESSING = "preprocessing",
  /** Basic schema structure validation */
  SCHEMA = "schema",
  /** Component-specific semantic validation */
  SEMANTIC = "semantic",
  /** Cross-component relationship validation */
  RELATIONAL = "relational",
  /** Custom business rule validation */
  CUSTOM = "custom",
}

/**
 * Result of a validation stage
 */
export type ValidationStageResult<T> = Result<
  T,
  ValidationStageError[]
>;

/**
 * Enhanced validation error with stage information and suggestions
 */
export interface ValidationStageError {
  /** Path to the error location in the specification */
  path: string[];
  
  /** Error message */
  message: string;
  
  /** Type of validation stage that found the error */
  stage: ValidationStageType;
  
  /** Error severity */
  severity: ValidationSeverity;
  
  /** Original validation error (if available) */
  originalError?: ValidationError;
  
  /** Error code */
  code?: string;
  
  /** Value that caused the error */
  invalidValue?: unknown;
  
  /** Suggested fixes for the error */
  suggestions?: string[];
  
  /** Related documentation URL */
  documentationUrl?: string;
}

/**
 * Context for validation stages
 */
export interface ValidationContext {
  /** Whether running in development mode */
  development: boolean;
  
  /** Custom validation rules to apply */
  customRules?: Record<string, unknown>;
  
  /** Whether to stop at the first error */
  stopAtFirstError: boolean;
  
  /** Parent component hierarchy (for relational validation) */
  parentHierarchy?: ComponentSpec[];
  
  /** Additional metadata for the current validation context */
  metadata?: Record<string, unknown>;
  
  /** Collected errors from previous stages */
  previousErrors: ValidationStageError[];
}

/**
 * Interface for a validation stage function
 */
export interface ValidationStage<T> {
  name: string;
  type: ValidationStageType;
  validate: (input: T, context: ValidationContext) => ValidationStageResult<T>;
}

/**
 * Options for the validation pipeline
 */
export interface ValidationPipelineOptions {
  /** Whether to run in development mode with additional checks */
  development?: boolean;
  
  /** Whether to stop at the first error */
  stopAtFirstError?: boolean;
  
  /** Custom components schemas to validate */
  customComponentSchemas?: Record<string, unknown>;
  
  /** Additional validation stages */
  additionalStages?: ValidationStage<unknown>[];
  
  /** Whether to include suggestions for fixing errors */
  includeSuggestions?: boolean;
  
  /** Base URL for documentation references */
  documentationBaseUrl?: string;
}

/**
 * Default pipeline options
 */
const DEFAULT_PIPELINE_OPTIONS: Required<ValidationPipelineOptions> = {
  development: false,
  stopAtFirstError: false,
  customComponentSchemas: {},
  additionalStages: [],
  includeSuggestions: true,
  documentationBaseUrl: "https://react-jedi.org/docs/validation/",
};

/**
 * ValidationPipeline class for comprehensive UI specification validation
 */
export class ValidationPipeline {
  /** Pipeline options */
  private options: Required<ValidationPipelineOptions>;
  
  /** Preprocessing stages for any specification */
  private preprocessingStages: ValidationStage<unknown>[] = [];
  
  /** Schema validation stages for UI specifications */
  private uiSchemaStages: ValidationStage<UISpecification>[] = [];
  
  /** Schema validation stages for component specifications */
  private componentSchemaStages: ValidationStage<ComponentSpec>[] = [];
  
  /** Semantic validation stages for component specifications */
  private componentSemanticStages: ValidationStage<ComponentSpec>[] = [];
  
  /** Relational validation stages for component specifications */
  private componentRelationalStages: ValidationStage<ComponentSpec>[] = [];
  
  /** Custom validation stages */
  private customStages: ValidationStage<unknown>[] = [];

  /**
   * Creates a new ValidationPipeline
   * 
   * @param options - Pipeline options
   */
  constructor(options: ValidationPipelineOptions = {}) {
    this.options = { ...DEFAULT_PIPELINE_OPTIONS, ...options };
    
    // Initialize the validation stages
    this.initializeStages();
  }
  
  /**
   * Initialize all validation stages
   */
  private initializeStages(): void {
    // Initialize preprocessing stages (format validation, etc.)
    this.initializePreprocessingStages();
    
    // Initialize UI schema validation stages
    this.initializeUISchemaStages();
    
    // Initialize component schema validation stages
    this.initializeComponentSchemaStages();
    
    // Initialize component semantic validation stages
    this.initializeComponentSemanticStages();
    
    // Initialize component relational validation stages
    this.initializeComponentRelationalStages();
    
    // Add custom stages
    this.customStages = this.options.additionalStages;
  }
  
  /**
   * Initialize preprocessing validation stages
   */
  private initializePreprocessingStages(): void {
    // Format validation stage (checks if input is valid JSON, object, etc.)
    this.preprocessingStages.push({
      name: "Format Validation",
      type: ValidationStageType.PREPROCESSING,
      validate: (input: unknown, context: ValidationContext) => {
        // Check if input is null or undefined
        if (input === null || input === undefined) {
          return Err([{
            path: [],
            message: "Specification cannot be null or undefined",
            stage: ValidationStageType.PREPROCESSING,
            severity: ValidationSeverity.ERROR,
            code: "SPEC_NULL_OR_UNDEFINED",
            suggestions: ["Provide a valid specification object"],
          }]);
        }
        
        // Check if input is an object
        if (typeof input !== "object") {
          return Err([{
            path: [],
            message: `Specification must be an object, got ${typeof input}`,
            stage: ValidationStageType.PREPROCESSING,
            severity: ValidationSeverity.ERROR,
            code: "SPEC_INVALID_TYPE",
            invalidValue: input,
            suggestions: ["Provide a valid specification object"],
          }]);
        }
        
        return Ok(input);
      }
    });
  }
  
  /**
   * Initialize UI schema validation stages
   */
  private initializeUISchemaStages(): void {
    // Basic UI specification schema validation
    this.uiSchemaStages.push({
      name: "UI Schema Validation",
      type: ValidationStageType.SCHEMA,
      validate: (spec: UISpecification, context: ValidationContext) => {
        const result = defaultValidator.validateUISpecification(spec);
        
        if (result.err) {
          const errors = this.convertValidationErrorToStageErrors(
            result.val,
            ValidationStageType.SCHEMA
          );
          return Err(errors);
        }
        
        return Ok(spec);
      }
    });
  }
  
  /**
   * Initialize component schema validation stages
   */
  private initializeComponentSchemaStages(): void {
    // Basic component specification schema validation
    this.componentSchemaStages.push({
      name: "Component Schema Validation",
      type: ValidationStageType.SCHEMA,
      validate: (component: ComponentSpec, context: ValidationContext) => {
        const result = defaultValidator.validateComponentSpec(component);
        
        if (result.err) {
          const errors = this.convertValidationErrorToStageErrors(
            result.val,
            ValidationStageType.SCHEMA
          );
          return Err(errors);
        }
        
        return Ok(component);
      }
    });
  }
  
  /**
   * Convert validation error to stage errors
   */
  private convertValidationErrorToStageErrors(
    error: SpecificationError,
    stage: ValidationStageType
  ): ValidationStageError[] {
    // If there are validation errors, convert each one
    if (error.validationErrors && error.validationErrors.length > 0) {
      return error.validationErrors.map(validationError => {
        // Generate suggestions based on validation error
        const suggestions = this.generateSuggestionsForValidationError(validationError);
        
        return {
          path: validationError.path || error.path || [],
          message: validationError.message,
          stage,
          severity: validationError.severity || ValidationSeverity.ERROR,
          originalError: validationError,
          code: validationError.code,
          invalidValue: validationError.invalidValue,
          suggestions: this.options.includeSuggestions ? suggestions : undefined,
          documentationUrl: validationError.documentationUrl,
        };
      });
    }
    
    // Generate suggestions based on error type
    const suggestions = this.generateSuggestionsForError(error);
    
    // Create a default stage error from the parser error
    return [{
      path: error.path || [],
      message: error.message,
      stage,
      severity: ValidationSeverity.ERROR,
      code: error.type,
      invalidValue: error.context?.invalidValue,
      suggestions: this.options.includeSuggestions ? suggestions : undefined,
      documentationUrl: this.options.documentationBaseUrl
        ? `${this.options.documentationBaseUrl}${error.type.toLowerCase()}`
        : undefined,
    }];
  }
  
  /**
   * Validate Grid component semantics
   */
  private validateGridComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    
    // Use type guard to narrow the type
    if (isGrid(component) && component.columns !== undefined) {
      const cols = Number(component.columns);
      if (Number.isNaN(cols) || cols < 1 || cols > 12) {
        errors.push({
          path: ["columns"],
          message: "Grid columns must be between 1 and 12",
          stage: ValidationStageType.SEMANTIC,
          severity: ValidationSeverity.ERROR,
          code: "GRID_INVALID_COLUMNS",
          invalidValue: component.columns,
          suggestions: ["Use a value between 1 and 12 for columns"],
        });
      }
    }
    
    // Check if items are provided for grid
    const hasChildren = Boolean(component.children);
    const isEmptyArray = Array.isArray(component.children) && component.children.length === 0;
    
    if (!hasChildren || isEmptyArray) {
      errors.push({
        path: ["children"],
        message: "Grid should contain at least one child item",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.WARNING,
        code: "GRID_EMPTY",
        suggestions: ["Add child components to the grid"],
      });
    }
    
    return errors;
  }
  
  /**
   * Validate Flex component semantics
   */
  private validateFlexComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    const validDirections = ["row", "column", "row-reverse", "column-reverse"];
    
    // Use type guard to narrow the type
    if (isFlex(component) && component.direction && !validDirections.includes(component.direction)) {
      errors.push({
        path: ["direction"],
        message: "Invalid flex direction",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.ERROR,
        code: "FLEX_INVALID_DIRECTION",
        invalidValue: component.direction,
        suggestions: [`Use one of: ${validDirections.join(", ")}`],
      });
    }
    
    return errors;
  }
  
  /**
   * Validate Container component semantics
   */
  private validateContainerComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    const hasChildren = Boolean(component.children);
    
    if (!hasChildren) {
      errors.push({
        path: ["children"],
        message: "Container should contain child content",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.WARNING,
        code: "CONTAINER_EMPTY",
        suggestions: ["Add child components to the container"],
      });
    }
    
    return errors;
  }
  
  /**
   * Validate Button component semantics
   */
  private validateButtonComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    const hasChildren = Boolean(component.children);
    const hasAriaLabel = component.a11y && component.a11y.ariaLabel;
    
    if (!hasChildren && !hasAriaLabel) {
      errors.push({
        path: ["children"],
        message: "Button should have either children or ariaLabel",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.WARNING,
        code: "BUTTON_NO_LABEL",
        suggestions: [
          "Add text content to the button",
          "Add ariaLabel property to a11y object",
        ],
      });
    }
    
    return errors;
  }
  
  /**
   * Validate Card component semantics
   */
  private validateCardComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    const hasChildren = Boolean(component.children);
    
    if (!hasChildren) {
      errors.push({
        path: ["children"],
        message: "Card should contain content",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.WARNING,
        code: "CARD_EMPTY",
        suggestions: ["Add child components to the card"],
      });
    }
    
    return errors;
  }
  
  /**
   * Validate Text component semantics
   */
  private validateTextComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    const hasChildren = Boolean(component.children);
    
    if (!hasChildren) {
      errors.push({
        path: ["children"],
        message: "Text component should contain content",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.WARNING,
        code: "TEXT_EMPTY",
        suggestions: ["Add text content"],
      });
    }
    
    return errors;
  }
  
  /**
   * Validate Heading component semantics
   */
  private validateHeadingComponent(component: ComponentSpec): ValidationStageError[] {
    const errors: ValidationStageError[] = [];
    const hasChildren = Boolean(component.children);
    
    if (!hasChildren) {
      errors.push({
        path: ["children"],
        message: "Heading should contain content",
        stage: ValidationStageType.SEMANTIC,
        severity: ValidationSeverity.WARNING,
        code: "HEADING_EMPTY",
        suggestions: ["Add heading text content"],
      });
    }
    
    // Use type guard to narrow the type
    if (isHeading(component) && component.level !== undefined) {
      if (typeof component.level === "string" && component.level.startsWith("h")) {
        // Handle string level values like "h1", "h2", etc.
        const levelStr = component.level.slice(1);
        const level = Number(levelStr);
        if (Number.isNaN(level) || level < 1 || level > 6) {
          errors.push({
            path: ["level"],
            message: "Heading level must be between 1 and 6",
            stage: ValidationStageType.SEMANTIC,
            severity: ValidationSeverity.ERROR,
            code: "HEADING_INVALID_LEVEL",
            invalidValue: component.level,
            suggestions: ["Use a value between h1 and h6 for heading level"],
          });
        }
      } else if (typeof component.level === "number") {
        // Handle numeric level values
        const level = component.level;
        if (level < 1 || level > 6) {
          errors.push({
            path: ["level"],
            message: "Heading level must be between 1 and 6",
            stage: ValidationStageType.SEMANTIC,
            severity: ValidationSeverity.ERROR,
            code: "HEADING_INVALID_LEVEL",
            invalidValue: component.level,
            suggestions: ["Use a value between 1 and 6 for heading level"],
          });
        }
      }
    }
    
    return errors;
  }

  /**
   * Initialize component semantic validation stages
   */
  private initializeComponentSemanticStages(): void {
    // Component type-specific semantic validation
    this.componentSemanticStages.push({
      name: "Component Semantic Validation",
      type: ValidationStageType.SEMANTIC,
      validate: (component: ComponentSpec, context: ValidationContext) => {
        let errors: ValidationStageError[] = [];
        
        // Validate specific component types
        if (isGrid(component)) {
          errors = [...errors, ...this.validateGridComponent(component)];
        }
        
        if (isFlex(component)) {
          errors = [...errors, ...this.validateFlexComponent(component)];
        }
        
        if (isContainer(component)) {
          errors = [...errors, ...this.validateContainerComponent(component)];
        }
        
        if (isButton(component)) {
          errors = [...errors, ...this.validateButtonComponent(component)];
        }
        
        if (isCard(component)) {
          errors = [...errors, ...this.validateCardComponent(component)];
        }
        
        if (isText(component)) {
          errors = [...errors, ...this.validateTextComponent(component)];
        }
        
        if (isHeading(component)) {
          errors = [...errors, ...this.validateHeadingComponent(component)];
        }
        
        if (errors.length > 0) {
          // Add component path prefix to all errors
          const errorsWithPath = errors.map(err => ({
            ...err,
            path: [component.type, ...err.path],
          }));
          return Err(errorsWithPath);
        }
        
        return Ok(component);
      }
    });
  }
  
  /**
   * Initialize component relational validation stages
   */
  private initializeComponentRelationalStages(): void {
    // Validate component relationships and nesting
    this.componentRelationalStages.push({
      name: "Component Relationship Validation",
      type: ValidationStageType.RELATIONAL,
      validate: (component: ComponentSpec, context: ValidationContext) => {
        const errors: ValidationStageError[] = [];
        const parentHierarchy = context.parentHierarchy || [];
        
        // Check for excessive nesting depth
        if (parentHierarchy.length > 10) {
          errors.push({
            path: [],
            message: "Component nesting is too deep (> 10 levels)",
            stage: ValidationStageType.RELATIONAL,
            severity: ValidationSeverity.WARNING,
            code: "EXCESSIVE_NESTING",
            suggestions: [
              "Simplify component structure",
              "Extract deeply nested content into separate components",
            ],
          });
        }
        
        // Check if this component type is valid inside its parent
        if (parentHierarchy.length > 0) {
          const parent = parentHierarchy.at(-1);
          
          // Add specific parent-child relationship validations here
          // For example, some components shouldn't be nested inside others
          
          if (parent && isHeading(component) && isHeading(parent)) {
            errors.push({
              path: [],
              message: "Heading components should not be nested inside other headings",
              stage: ValidationStageType.RELATIONAL,
              severity: ValidationSeverity.WARNING,
              code: "INVALID_HEADING_NESTING",
              suggestions: [
                "Use Text component instead of nested Heading",
                "Place headings in separate container components",
              ],
            });
          }
        }
        
        if (errors.length > 0) {
          return Err(errors);
        }
        
        return Ok(component);
      }
    });
  }

  /**
   * Validates a UI specification through the pipeline
   * 
   * @param spec - UI specification to validate
   * @returns Validation result
   */
  validateUISpecification(
    spec: unknown
  ): Result<UISpecification, ValidationStageError[]> {
    // Create initial validation context
    const context: ValidationContext = {
      development: this.options.development,
      stopAtFirstError: this.options.stopAtFirstError,
      previousErrors: [],
    };
    
    // Run preprocessing stages
    const preprocessingResult = this.runStages(
      this.preprocessingStages,
      spec,
      context
    );
    
    if (preprocessingResult.err) {
      return Err(preprocessingResult.val);
    }
    
    // Type check for UI specification
    const uiSpec = preprocessingResult.val as UISpecification;
    
    // Check if it has required UI specification properties
    if (!("version" in uiSpec) || !("root" in uiSpec)) {
      return Err([{
        path: [],
        message: "Invalid UI specification: missing required properties (version, root)",
        stage: ValidationStageType.SCHEMA,
        severity: ValidationSeverity.ERROR,
        code: "UI_SPEC_MISSING_PROPS",
        suggestions: [
          "Add version property (string)",
          "Add root property (component specification)",
        ],
      }]);
    }
    
    // Run UI schema stages
    const schemaResult = this.runStages(
      this.uiSchemaStages,
      uiSpec,
      context
    );
    
    if (schemaResult.err) {
      return Err(schemaResult.val);
    }
    
    // Validate the root component recursively
    const rootValidationResult = this.validateComponentSpecRecursively(
      uiSpec.root,
      [...context.previousErrors],
      []
    );
    
    if (rootValidationResult.err) {
      return Err([
        ...context.previousErrors,
        ...rootValidationResult.val.map(err => ({
          ...err,
          path: ["root", ...err.path],
        })),
      ]);
    }
    
    // Run custom stages
    const customResult = this.runStages(
      this.customStages,
      uiSpec,
      {
        ...context,
        // Only add rootValidationResult errors if it's an error result
        previousErrors: (() => {
          if (rootValidationResult.err) {
            // Safe unwrapping of error value
            // We already checked that rootValidationResult.err is true
            // so we know it's an error variant
            const errVal = (rootValidationResult as Result<never, ValidationStageError[]>).val;
            if (Array.isArray(errVal)) {
              return [...context.previousErrors, ...errVal];
            }
          }
          return [...context.previousErrors];
        })(),
      }
    );
    
    if (customResult.err) {
      const errors: ValidationStageError[] = [
        ...context.previousErrors
      ];
      
      // Only add rootValidationResult errors if it's an error result
      if (rootValidationResult.err) {
        // Safe unwrapping of error value using type assertion
        const errVal = (rootValidationResult as Result<never, ValidationStageError[]>).val;
        if (Array.isArray(errVal)) {
          errors.push(...errVal);
        }
      }
      
      // Add customResult errors
      if (customResult.err) {
        // Safe unwrapping of error value using type assertion
        // We already checked that customResult.err is true
        const errVal = (customResult as Result<never, ValidationStageError[]>).val;
        if (Array.isArray(errVal)) {
          errors.push(...errVal);
        }
      }
      
      return Err(errors) as Result<never, ValidationStageError[]>;
    }
    
    return Ok(uiSpec);
  }
  
  /**
   * Validates a component specification
   * 
   * @param component - Component specification to validate
   * @returns Validation result
   */
  validateComponentSpec(
    component: unknown
  ): Result<ComponentSpec, ValidationStageError[]> {
    // Create initial validation context
    const context: ValidationContext = {
      development: this.options.development,
      stopAtFirstError: this.options.stopAtFirstError,
      previousErrors: [],
    };
    
    // Run preprocessing stages
    const preprocessingResult = this.runStages(
      this.preprocessingStages,
      component,
      context
    );
    
    if (preprocessingResult.err) {
      return Err(preprocessingResult.val);
    }
    
    // Type check for component specification
    const componentSpec = preprocessingResult.val as ComponentSpec;
    
    // Check if it has required component properties
    if (!("type" in componentSpec) || typeof componentSpec.type !== "string") {
      return Err([{
        path: [],
        message: "Invalid component specification: missing 'type' property or 'type' is not a string",
        stage: ValidationStageType.SCHEMA,
        severity: ValidationSeverity.ERROR,
        code: "COMPONENT_MISSING_TYPE",
        suggestions: [
          "Add type property (string)",
          "Ensure type property is a valid component type",
        ],
      }]);
    }
    
    // Perform recursive validation
    return this.validateComponentSpecRecursively(componentSpec, [], []);
  }
  
  /**
   * Validates a component specification with all validation stages
   */
  private validateComponentWithAllStages(
    component: ComponentSpec,
    context: ValidationContext
  ): Result<ComponentSpec, ValidationStageError[]> {
    // Run schema validation stages
    const schemaResult = this.runStages(
      this.componentSchemaStages,
      component,
      context
    );
    
    if (schemaResult.err) {
      return Err(schemaResult.val);
    }
    
    // Run semantic validation stages
    const semanticResult = this.runStages(
      this.componentSemanticStages,
      component,
      {
        ...context,
        previousErrors: context.previousErrors,
      }
    );
    
    if (semanticResult.err) {
      return Err(semanticResult.val);
    }
    
    // Run relational validation stages
    const relationalResult = this.runStages(
      this.componentRelationalStages,
      component,
      {
        ...context,
        previousErrors: context.previousErrors,
      }
    );
    
    if (relationalResult.err) {
      return Err(relationalResult.val);
    }
    
    // Run custom stages
    const customResult = this.runStages(
      this.customStages,
      component,
      {
        ...context,
        previousErrors: context.previousErrors,
      }
    );
    
    if (customResult.err) {
      return Err(customResult.val);
    }
    
    return Ok(component);
  }
  
  /**
   * Validates a single child component
   */
  private validateSingleChildComponent(
    childComponent: ComponentSpec,
    previousErrors: ValidationStageError[],
    parentHierarchy: ComponentSpec[]
  ): Result<ComponentSpec, ValidationStageError[]> {
    const childResult = this.validateComponentSpecRecursively(
      childComponent,
      previousErrors,
      parentHierarchy
    );
    
    if (childResult.err) {
      return Err(
        childResult.val.map(err => ({
          ...err,
          path: ["children", ...err.path],
        }))
      );
    }
    
    return Ok(childComponent);
  }
  
  /**
   * Validates each child component in an array
   */
  private validateChildComponentArray(
    children: unknown[],
    component: ComponentSpec,
    previousErrors: ValidationStageError[],
    parentHierarchy: ComponentSpec[]
  ): ValidationStageError[] {
    const allChildErrors: ValidationStageError[] = [];
    
    for (const [index, child] of children.entries()) {
      const childErrors = this.validateArrayChildComponent(
        child, 
        index, 
        component, 
        previousErrors, 
        parentHierarchy
      );
      
      if (childErrors.length > 0) {
        allChildErrors.push(...childErrors);
        
        // If stopping at first error, break the loop
        if (this.options.stopAtFirstError) {
          break;
        }
      }
    }
    
    return allChildErrors;
  }
  
  /**
   * Validates a single component within an array of children
   */
  private validateArrayChildComponent(
    child: unknown,
    index: number,
    component: ComponentSpec,
    previousErrors: ValidationStageError[],
    parentHierarchy: ComponentSpec[]
  ): ValidationStageError[] {
    // Skip non-object children
    if (child === null || typeof child !== "object") {
      return [{
        path: ["children", index.toString()],
        message: "Child component must be an object",
        stage: ValidationStageType.SCHEMA,
        severity: ValidationSeverity.ERROR,
        code: "CHILD_NOT_OBJECT",
        invalidValue: child,
        suggestions: ["Provide a valid component specification object"],
      }];
    }
    
    // Handle child without type property
    if (!("type" in child) || typeof child.type !== "string") {
      return [{
        path: [component.type, "children", index.toString()],
        message: "Child component is missing required 'type' property",
        stage: ValidationStageType.SCHEMA,
        severity: ValidationSeverity.ERROR,
        code: "CHILD_MISSING_TYPE",
        invalidValue: child,
        suggestions: ["Add a 'type' property to the child component"],
      }];
    }
    
    const childComponent = child as ComponentSpec;
    const childResult = this.validateComponentSpecRecursively(
      childComponent,
      previousErrors,
      [...parentHierarchy, component]
    );
    
    if (childResult.err) {
      // Update the path for each error to include the component hierarchy
      return childResult.val.map(err => {
        // If the path doesn't already have component type information, add it
        const updatedPath = err.path.length > 0 && !err.path[0].includes(childComponent.type)
          ? [childComponent.type, ...err.path]
          : err.path;
        
        return {
          ...err,
          path: ["children", index.toString(), ...updatedPath],
        };
      });
    }
    
    return [];
  }

  /**
   * Processes and validates component children
   */
  private validateComponentChildren(
    component: ComponentSpec,
    previousErrors: ValidationStageError[],
    parentHierarchy: ComponentSpec[]
  ): Result<ComponentSpec, ValidationStageError[]> {
    if (!component.children) {
      return Ok(component);
    }
    
    // Handle string children (text content)
    if (typeof component.children === "string") {
      // Text content is always valid
      return Ok(component);
    }
    
    // Handle single component child
    if (!Array.isArray(component.children) && typeof component.children === "object") {
      const childComponent = component.children as ComponentSpec;
      const result = this.validateSingleChildComponent(
        childComponent, 
        previousErrors, 
        [...parentHierarchy, component]
      );
      
      if (result.err) {
        return Err([...previousErrors, ...result.val]);
      }
      
      return Ok(component);
    }
    
    // Handle array of component children
    if (Array.isArray(component.children)) {
      const childErrors = this.validateChildComponentArray(
        component.children,
        component,
        previousErrors,
        parentHierarchy
      );
      
      if (childErrors.length > 0) {
        return Err([...previousErrors, ...childErrors]);
      }
    }
    
    return Ok(component);
  }

  /**
   * Validates a component specification recursively
   * 
   * @param component - Component specification to validate
   * @param previousErrors - Errors from previous validation stages
   * @param parentHierarchy - Parent component hierarchy
   * @returns Validation result
   */
  private validateComponentSpecRecursively(
    component: ComponentSpec,
    previousErrors: ValidationStageError[],
    parentHierarchy: ComponentSpec[]
  ): Result<ComponentSpec, ValidationStageError[]> {
    // Create validation context
    const context: ValidationContext = {
      development: this.options.development,
      stopAtFirstError: this.options.stopAtFirstError,
      previousErrors,
      parentHierarchy,
    };
    
    // First validate the component itself with all stages
    const componentResult = this.validateComponentWithAllStages(component, context);
    
    if (componentResult.err) {
      return Err([...previousErrors, ...componentResult.val]);
    }
    
    // Then validate its children recursively
    const childrenResult = this.validateComponentChildren(
      component,
      previousErrors,
      parentHierarchy
    );
    
    if (childrenResult.err) {
      return Err(childrenResult.val);
    }
    
    return Ok(component);
  }
  
  /**
   * Runs a series of validation stages on an input
   * 
   * @param stages - Validation stages to run
   * @param input - Input to validate
   * @param context - Validation context
   * @returns Result of validation
   */
  private runStages<T>(
    stages: ValidationStage<T>[],
    input: T,
    context: ValidationContext
  ): Result<T, ValidationStageError[]> {
    let currentInput = input;
    const allErrors: ValidationStageError[] = [...context.previousErrors];
    const warnings: ValidationStageError[] = [];
    
    for (const stage of stages) {
      const result = stage.validate(currentInput, {
        ...context,
        previousErrors: allErrors,
      });
      
      if (result.err) {
        // Separate errors from warnings
        const newErrors = result.val.filter(e => e.severity === ValidationSeverity.ERROR);
        const newWarnings = result.val.filter(e => e.severity === ValidationSeverity.WARNING);
        
        // Add warnings to warning collection
        warnings.push(...newWarnings);
        
        // If there are actual errors (not just warnings), process them
        if (newErrors.length > 0) {
          allErrors.push(...newErrors);
          
          // If stopping at first error, return immediately
          if (context.stopAtFirstError) {
            return Err([...allErrors, ...warnings]);
          }
        }
      }
      
      // Update input for next stage (even if there were warnings)
      if (result.ok) {
        currentInput = result.val;
      }
    }
    
    // Only return error if there are actual errors (not just warnings)
    const actualErrors = allErrors.filter(e => e.severity === ValidationSeverity.ERROR);
    return actualErrors.length > 0 
      ? Err([...actualErrors, ...warnings])
      : Ok(currentInput);
  }
  
  /**
   * Validates a specification (either UI specification or component specification)
   * 
   * @param spec - Specification to validate
   * @param options - Optional validation options override
   * @returns Validation result
   */
  validateSpecification(
    spec: unknown,
    options: Partial<ValidationPipelineOptions> = {}
  ): Result<UISpecification | ComponentSpec, ValidationStageError[]> {
    // Create a new validation pipeline with merged options if needed
    const pipeline = options && Object.keys(options).length > 0
      ? new ValidationPipeline({ ...this.options, ...options })
      : this;
    
    // Check if it's a UI specification or component specification
    return (spec && typeof spec === "object" && "version" in spec && "root" in spec)
      ? pipeline.validateUISpecification(spec)
      : pipeline.validateComponentSpec(spec);
  }
  
  /**
   * Generates suggestions for fixing a validation error
   * 
   * @param error - Validation error
   * @returns Array of suggestions
   */
  private generateSuggestionsForValidationError(error: ValidationError): string[] {
    const suggestions: string[] = [];
    
    // If we already have valid examples, use them
    if (error.validExamples && error.validExamples.length > 0) {
      const examples = error.validExamples
        .map(ex => typeof ex === "string" ? `"${ex}"` : JSON.stringify(ex))
        .join(", ");
      
      suggestions.push(`Try one of these valid values: ${examples}`);
    }
    
    // Add suggestions based on error code
    if (error.code) {
      switch (error.code) {
        case "invalid_type": {
          suggestions.push("Check the type of the property");
          if (error.path && error.path.length > 0) {
            suggestions.push(`Ensure '${error.path.join(".")}' has the correct type`);
          }
          break;
        }
          
        case "invalid_enum_value": {
          suggestions.push("Check that the value is one of the allowed options");
          break;
        }
          
        case "invalid_string": {
          suggestions.push("Ensure the string format is correct");
          break;
        }
          
        case "too_small": {
          suggestions.push("Increase the value to meet the minimum requirement");
          break;
        }
          
        case "too_big": {
          suggestions.push("Decrease the value to meet the maximum requirement");
          break;
        }
          
        case "custom": {
          suggestions.push("Check the property value against the specific rules");
          break;
        }
      }
    }
    
    // Add a generic suggestion if we haven't added any
    if (suggestions.length === 0) {
      suggestions.push("Check the property value and ensure it meets the requirements");
    }
    
    return suggestions;
  }
  
  /**
   * Generates suggestions for fixing an error
   * 
   * @param error - Error object
   * @returns Array of suggestions
   */
  private generateSuggestionsForError(error: SpecificationError): string[] {
    const suggestions: string[] = [];
    
    // Return existing suggestions if available
    if (error.suggestions && error.suggestions.length > 0) {
      return error.suggestions;
    }
    
    // Add suggestions based on error type
    switch (error.type) {
      case SpecificationErrorType.INVALID_FORMAT: {
        suggestions.push(
          "Check the format of your specification",
          "Ensure all required properties are present",
          "Validate your JSON syntax"
        );
        break;
      }
        
      case SpecificationErrorType.SCHEMA_VALIDATION: {
        suggestions.push(
          "Validate your specification against the schema",
          "Check property types and required fields"
        );
        break;
      }
        
      case SpecificationErrorType.COMPONENT_RESOLUTION: {
        suggestions.push(
          "Ensure the component type is registered",
          "Check for typos in component type name"
        );
        break;
      }
        
      case SpecificationErrorType.REFERENCE_RESOLUTION: {
        suggestions.push(
          "Check that all referenced components exist",
          "Ensure references are correctly formatted"
        );
        break;
      }
        
      case SpecificationErrorType.EXPRESSION_PARSING: {
        suggestions.push(
          "Validate your expression syntax",
          "Ensure all variables used in expressions are defined"
        );
        break;
      }
        
      case SpecificationErrorType.SEMANTIC_VALIDATION: {
        suggestions.push(
          "Check that component properties satisfy semantic constraints",
          "Review component-specific requirements"
        );
        break;
      }
        
      case SpecificationErrorType.RELATIONAL_VALIDATION: {
        suggestions.push(
          "Check that component nesting is valid",
          "Ensure parent-child relationships are appropriate"
        );
        break;
      }
    }
    
    return suggestions;
  }
  
  /**
   * Formats validation errors into a human-readable string
   * 
   * @param errors - Array of validation errors
   * @returns Formatted error message
   */
  formatErrors(errors: ValidationStageError[]): string {
    if (errors.length === 0) {
      return "No errors";
    }
    
    return errors.map((error, index) => {
      const location = error.path.length > 0
        ? ` at '${error.path.join(".")}'`
        : "";
      
      const severity = error.severity === ValidationSeverity.WARNING
        ? "Warning"
        : "Error";
      
      let message = `${severity} ${index + 1}${location}: ${error.message}`;
      
      // Add suggestions if available
      if (error.suggestions && error.suggestions.length > 0) {
        message += "\nSuggestions:";
        for (const suggestion of error.suggestions) {
          message += `\n - ${suggestion}`;
        }
      }
      
      // Add documentation link if available
      if (error.documentationUrl) {
        message += `\nDocumentation: ${error.documentationUrl}`;
      }
      
      return message;
    }).join("\n\n");
  }
  
  /**
   * Count errors by severity
   */
  private countErrorsBySeverity(errors: ValidationStageError[]): {
    errorCount: number;
    warningCount: number;
    infoCount: number;
  } {
    return {
      errorCount: errors.filter(e => e.severity === ValidationSeverity.ERROR).length,
      warningCount: errors.filter(e => e.severity === ValidationSeverity.WARNING).length,
      infoCount: errors.filter(e => e.severity === ValidationSeverity.INFO).length
    };
  }
  
  /**
   * Group errors by validation stage
   */
  private groupErrorsByStage(errors: ValidationStageError[]): Record<string, ValidationStageError[]> {
    const errorsByStage: Record<string, ValidationStageError[]> = {};
    
    for (const error of errors) {
      const stage = error.stage;
      if (!errorsByStage[stage]) {
        errorsByStage[stage] = [];
      }
      errorsByStage[stage].push(error);
    }
    
    return errorsByStage;
  }
  
  /**
   * Creates a summary of error counts
   */
  private createErrorCountSummary(errors: ValidationStageError[]): string {
    let summary = `Found ${errors.length} issue${errors.length === 1 ? "" : "s"}:`;
    
    const { errorCount, warningCount, infoCount } = this.countErrorsBySeverity(errors);
    
    // Append error count if there are errors
    if (errorCount > 0) {
      summary += `\n- ${errorCount} error${errorCount === 1 ? "" : "s"}`;
    }
    
    // Append warning count if there are warnings 
    if (warningCount > 0) {
      summary += `\n- ${warningCount} warning${warningCount === 1 ? "" : "s"}`;
    }
    
    // Append info count if there are info messages
    if (infoCount > 0) {
      summary += `\n- ${infoCount} info message${infoCount === 1 ? "" : "s"}`;
    }
    
    return summary;
  }
  
  /**
   * Creates a detailed error entry for the report
   */
  private formatErrorEntry(error: ValidationStageError, index: number): string {
    const location = error.path.length > 0
      ? ` at '${error.path.join(".")}'`
      : "";
    
    let severity: string;
    if (error.severity === ValidationSeverity.WARNING) {
      severity = "Warning";
    } else if (error.severity === ValidationSeverity.INFO) {
      severity = "Info";
    } else {
      severity = "Error";
    }
    
    let entry = `${severity} ${index + 1}${location}: ${error.message}\n`;
    
    // Add invalid value if available
    if (error.invalidValue !== undefined) {
      entry += `Value: ${JSON.stringify(error.invalidValue)}\n`;
    }
    
    // Add suggestions if available
    if (error.suggestions && error.suggestions.length > 0) {
      entry += "Suggestions:\n";
      for (const suggestion of error.suggestions) {
        entry += `- ${suggestion}\n`;
      }
    }
    
    // Add documentation link if available
    if (error.documentationUrl) {
      entry += `Documentation: ${error.documentationUrl}\n`;
    }
    
    return entry;
  }
  
  /**
   * Creates a section of errors for a specific validation stage
   */
  private createStageErrorsSection(
    stage: string, 
    stageErrors: ValidationStageError[]
  ): string {
    if (!stageErrors || stageErrors.length === 0) {
      return "";
    }
    
    let section = `${stage} Stage Errors\n${"-".repeat(stage.length + 13)}\n\n`;
    
    for (const [index, error] of stageErrors.entries()) {
      section += `${this.formatErrorEntry(error, index)}\n`;
    }
    
    return section;
  }
  
  /**
   * Creates common fixes section for error report
   */
  private createCommonFixesSection(): string {
    return "Common Fixes\n------------\n\n" +
      "1. Check that all required properties are defined\n" +
      "2. Ensure property types match the schema requirements\n" +
      "3. Validate nested component specifications\n" +
      "4. Check for typos in property names\n";
  }

  /**
   * Creates a detailed error report with colorized output for development
   * 
   * @param errors - Array of validation errors
   * @returns Formatted error report
   */
  createDetailedErrorReport(errors: ValidationStageError[]): string {
    if (errors.length === 0) {
      return "No errors found";
    }
    
    // Group errors by stage
    const errorsByStage = this.groupErrorsByStage(errors);
    
    // Create report
    let report = "Validation Error Report\n=====================\n\n";
    
    // Add error count summary
    report += this.createErrorCountSummary(errors) + "\n\n";
    
    // Add errors by stage
    for (const stage of Object.keys(ValidationStageType)) {
      const stageEnum = ValidationStageType[stage as keyof typeof ValidationStageType];
      const stageErrors = errorsByStage[stageEnum];
      
      report += this.createStageErrorsSection(stage, stageErrors);
    }
    
    // Add common fixes section
    report += this.createCommonFixesSection();
    
    return report;
  }
}

/**
 * Creates a new ValidationPipeline
 * 
 * @param options - Pipeline options
 * @returns ValidationPipeline instance
 */
export function createValidationPipeline(
  options: ValidationPipelineOptions = {}
): ValidationPipeline {
  return new ValidationPipeline(options);
}

/**
 * Default validation pipeline instance
 */
export const defaultValidationPipeline = createValidationPipeline();

/**
 * Validates a specification (either UI or component)
 * 
 * @param spec - Specification to validate
 * @param options - Validation options
 * @returns Validation result
 */
export function validateSpecification(
  spec: unknown,
  options: ValidationPipelineOptions = {}
): Result<UISpecification | ComponentSpec, ValidationStageError[]> {
  const pipeline = createValidationPipeline(options);
  return pipeline.validateSpecification(spec);
}