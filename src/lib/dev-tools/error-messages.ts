import type { ValidationError } from "../validation";
import type { ComponentSpec, ComponentType } from "../../types/schema/components";

/**
 * Enhanced error message system for better developer experience
 */

export interface DeveloperError extends Error {
  code: string;
  component?: ComponentType;
  spec?: ComponentSpec;
  suggestion?: string;
  documentation?: string;
  path?: string[];
  severity?: "error" | "warning" | "info";
  metadata?: Record<string, unknown>;
}

/**
 * Error codes for categorizing errors
 */
export const ErrorCodes = {
  // Schema validation errors
  INVALID_SCHEMA: "INVALID_SCHEMA",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  INVALID_FIELD_TYPE: "INVALID_FIELD_TYPE",
  UNKNOWN_COMPONENT_TYPE: "UNKNOWN_COMPONENT_TYPE",
  INVALID_COMPONENT_PROPS: "INVALID_COMPONENT_PROPS",

  // Runtime errors
  COMPONENT_NOT_FOUND: "COMPONENT_NOT_FOUND",
  RENDER_ERROR: "RENDER_ERROR",
  STATE_INITIALIZATION_ERROR: "STATE_INITIALIZATION_ERROR",
  EVENT_HANDLER_ERROR: "EVENT_HANDLER_ERROR",

  // Configuration errors
  INVALID_THEME: "INVALID_THEME",
  MISSING_PROVIDER: "MISSING_PROVIDER",
  CIRCULAR_DEPENDENCY: "CIRCULAR_DEPENDENCY",

  // Performance warnings
  EXCESSIVE_RENDERS: "EXCESSIVE_RENDERS",
  LARGE_COMPONENT_TREE: "LARGE_COMPONENT_TREE",
  UNOPTIMIZED_PROPS: "UNOPTIMIZED_PROPS",
} as const;

/**
 * Create an enhanced developer error
 */
export function createDeveloperError(
  code: string,
  message: string,
  options?: Partial<DeveloperError>
): DeveloperError {
  const error = new Error(message) as DeveloperError;
  error.code = code;
  error.severity = options?.severity || "error";

  if (options) {
    Object.assign(error, options);
  }

  // Capture stack trace
  Error.captureStackTrace?.(error, createDeveloperError);

  return error;
}

/**
 * Format validation errors into developer-friendly messages
 */
export function formatValidationError(error: ValidationError): DeveloperError {
  const path = error.path?.join(".");
  const errorPrefix = "Validation error";
  const pathInfo = path ? " at " + path : "";
  const baseMessage = errorPrefix + pathInfo + ": " + error.message;

  // Enhanced error messages based on specific validation patterns
  let suggestion: string | undefined;
  let documentation: string | undefined;

  if (error.message.includes("type must be")) {
    suggestion = "Check the component type is one of the supported types.";
    documentation = "https://docs.example.com/components/types";
  } else if (error.message.includes("required property")) {
    const match = /required property '(\w+)'/.exec(error.message);
    const property = match?.[1];
    const propertyName = property || "unknown";
    suggestion = "Add the missing property to your specification: " + propertyName;
    const baseUrl = "https://docs.example.com/schema/";
    documentation = baseUrl + property;
  }

  return createDeveloperError(ErrorCodes.INVALID_SCHEMA, baseMessage, {
    path: error.path,
    suggestion,
    documentation,
    severity: "error",
    metadata: { originalError: error },
  });
}

/**
 * Create component-specific error messages
 */
export function createComponentError(
  componentType: ComponentType,
  error: Error,
  spec?: ComponentSpec
): DeveloperError {
  const componentErrors: Record<string, { suggestion: string; documentation: string }> = {
    Button: {
      suggestion:
        "Check that variant and size props are valid. Common variants: 'default', 'destructive', 'outline', 'secondary', 'ghost', 'link'",
      documentation: "https://docs.example.com/components/button",
    },
    Input: {
      suggestion: "Ensure the input type is valid and any validation rules are properly formatted.",
      documentation: "https://docs.example.com/components/input",
    },
    // Add more component-specific errors
  };

  const componentInfo = componentErrors[componentType] || {
    suggestion: `Check the ${componentType} component documentation for valid props.`,
    documentation: `https://docs.example.com/components/${componentType.toLowerCase()}`,
  };

  return createDeveloperError(
    ErrorCodes.RENDER_ERROR,
    `Error rendering ${componentType}: ${error.message}`,
    {
      component: componentType,
      spec,
      suggestion: componentInfo.suggestion,
      documentation: componentInfo.documentation,
      severity: "error",
      metadata: { originalError: error },
    }
  );
}

/**
 * Format error messages with helpful context
 */
export function formatErrorWithContext(error: DeveloperError, showStack = false): string {
  const parts: string[] = [];

  // Error code and severity
  const severityEmoji = {
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  parts.push(`${severityEmoji[error.severity || "error"]} [${error.code}] ${error.message}`);

  // Component context
  if (error.component) {
    parts.push(`Component: ${error.component}`);
  }

  // Path context
  if (error.path && error.path.length > 0) {
    parts.push(`Path: ${error.path.join(" → ")}`);
  }

  // Suggestion
  if (error.suggestion) {
    parts.push(`💡 Suggestion: ${error.suggestion}`);
  }

  // Documentation link
  if (error.documentation) {
    parts.push(`📚 Documentation: ${error.documentation}`);
  }

  // Stack trace
  if (showStack && error.stack) {
    parts.push("\nStack trace:", error.stack);
  }

  return parts.join("\n");
}

/**
 * Create a performance warning
 */
export function createPerformanceWarning(
  metric: string,
  value: number,
  threshold: number,
  suggestion: string
): DeveloperError {
  return createDeveloperError(
    ErrorCodes.EXCESSIVE_RENDERS,
    `Performance warning: ${metric} (${value}) exceeds threshold (${threshold})`,
    {
      severity: "warning",
      suggestion,
      metadata: { metric, value, threshold },
    }
  );
}

/**
 * Create a helpful error message for missing components
 */
export function createMissingComponentError(
  componentType: string,
  availableComponents: string[]
): DeveloperError {
  const similarComponents = findSimilarComponents(componentType, availableComponents);

  let suggestion = `Component '${componentType}' is not registered.`;
  if (similarComponents.length > 0) {
    suggestion += ` Did you mean: ${similarComponents.join(", ")}?`;
  }

  return createDeveloperError(
    ErrorCodes.COMPONENT_NOT_FOUND,
    `Component type '${componentType}' not found`,
    {
      component: componentType as ComponentType,
      suggestion,
      documentation: "https://docs.example.com/components/registry",
      metadata: { availableComponents, similarComponents },
    }
  );
}

/**
 * Find similar component names using Levenshtein distance
 */
function findSimilarComponents(target: string, available: string[]): string[] {
  const threshold = 3; // Maximum edit distance
  const similar: Array<{ name: string; distance: number }> = [];

  for (const name of available) {
    const distance = levenshteinDistance(target.toLowerCase(), name.toLowerCase());
    if (distance <= threshold) {
      similar.push({ name, distance });
    }
  }

  const sorted = [...similar].sort((a, b) => a.distance - b.distance);
  return sorted.slice(0, 3).map((item) => item.name);
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Create error for missing theme provider
 */
export function createMissingProviderError(providerName: string): DeveloperError {
  return createDeveloperError(
    ErrorCodes.MISSING_PROVIDER,
    `${providerName} is required but not found`,
    {
      suggestion: `Wrap your application with <${providerName}>`,
      documentation: `https://docs.example.com/providers/${providerName.toLowerCase()}`,
      severity: "error",
    }
  );
}

/**
 * Create error for circular dependencies
 */
export function createCircularDependencyError(path: string[]): DeveloperError {
  return createDeveloperError(
    ErrorCodes.CIRCULAR_DEPENDENCY,
    `Circular dependency detected: ${path.join(" → ")} → ${path[0]}`,
    {
      suggestion: "Check your component references and ensure they don't form a cycle",
      documentation: "https://docs.example.com/troubleshooting/circular-dependencies",
      severity: "error",
      path,
      metadata: { cycle: path },
    }
  );
}
