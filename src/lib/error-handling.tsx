import * as React from "react";
import type { ComponentSpec, ComponentProps } from "../types/schema/components";

/**
 * Props for the ErrorFallback component
 */
interface ErrorFallbackProps {
  /**
   * The error that occurred
   */
  readonly error: Error;

  /**
   * The component specification that caused the error
   */
  readonly spec?: ComponentSpec;

  /**
   * Callback to reset the error state
   */
  readonly resetErrorBoundary?: () => void;

  /**
   * Whether to show detailed error information
   * @default false
   */
  readonly showDetails?: boolean;
}

/**
 * Default fallback component for rendering errors
 *
 * This component displays error information with optional details
 * and a reset button.
 */
export function ErrorFallback({
  error,
  spec,
  resetErrorBoundary,
  showDetails = false,
}: ErrorFallbackProps) {
  return (
    <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Error Rendering {spec?.type || "Component"}</h3>
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="px-2 py-1 rounded-md bg-destructive text-white text-sm hover:bg-destructive/90"
          >
            Retry
          </button>
        )}
      </div>

      <p className="mt-2">{error.message}</p>

      {showDetails && (
        <div className="mt-4">
          <details>
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="mt-2 p-2 bg-slate-800 text-white text-xs rounded overflow-auto max-h-[200px]">
              {error.stack}
            </pre>
            {spec && (
              <div className="mt-2">
                <h4 className="font-medium mb-1">Component Specification:</h4>
                <pre className="p-2 bg-slate-800 text-white text-xs rounded overflow-auto max-h-[200px]">
                  {JSON.stringify(spec, null, 2)}
                </pre>
              </div>
            )}
          </details>
        </div>
      )}
    </div>
  );
}

/**
 * Format an error message for display
 *
 * @param error The error object
 * @param componentType The type of component that caused the error
 * @returns Formatted error message
 */
export function formatErrorMessage(error: Error, componentType?: string): string {
  if (componentType) {
    return `Error rendering ${componentType}: ${error.message}`;
  }
  return error.message;
}

/**
 * Create a placeholder component for missing components
 *
 * @param type Component type that's missing
 * @returns React component that shows a placeholder
 */
export function createMissingComponentPlaceholder(type: string): React.FC<ComponentProps> {
  return function MissingComponent(props) {
    return (
      <div className="p-4 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-md">
        <p className="text-yellow-700 font-medium">
          Component Not Found: <code className="font-mono">{type}</code>
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-yellow-600">Show Props</summary>
          <pre className="mt-2 p-2 bg-white text-xs rounded overflow-auto max-h-[150px]">
            {JSON.stringify(props, null, 2)}
          </pre>
        </details>
      </div>
    );
  };
}

/**
 * Registry of custom error handlers
 */
type ErrorHandler = (error: Error, componentType: string) => void;
const errorHandlers: ErrorHandler[] = [];

/**
 * Register a global error handler
 *
 * @param handler Error handler function
 */
export function registerErrorHandler(handler: ErrorHandler): void {
  errorHandlers.push(handler);
}

/**
 * Handle a rendering error by notifying all registered handlers
 *
 * @param error The error that occurred
 * @param componentType The type of component that caused the error
 */
export function handleRenderError(error: Error, componentType: string): void {
  // Call all registered error handlers
  for (const handler of errorHandlers) {
    try {
      handler(error, componentType);
    } catch (handlerError) {
      console.error("Error in error handler:", handlerError);
    }
  }

  // Always log the error to console
  console.error(`Error rendering component "${componentType}":`, error);
}
