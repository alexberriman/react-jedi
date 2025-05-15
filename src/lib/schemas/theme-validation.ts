/**
 * Theme Validation Utilities
 *
 * This file provides utilities for validating theme specifications
 * and managing theme inheritance and composition.
 */

import { type Result, Ok, Err } from "ts-results";
import { enhancedThemeSpecificationSchema, themePresetSchema, themeSpecificationSchema } from "./theme-schema";
import type { EnhancedThemeSpecification, ThemeExtension, ThemePreset } from "../../types/schema/theme";
import type { ThemeSpecification } from "../../types/schema/specification";

/**
 * Error type for theme validation errors
 */
export interface ThemeValidationError {
  code: string;
  message: string;
  path?: string[];
  details?: unknown;
}

/**
 * Validates a theme specification against the schema
 *
 * @param theme - The theme specification to validate
 * @returns Result containing the validated theme or validation errors
 */
export function validateTheme(theme: unknown): Result<ThemeSpecification, ThemeValidationError[]> {
  try {
    const result = themeSpecificationSchema.safeParse(theme);
    
    if (result.success) {
      return Ok(result.data);
    } else {
      return Err(
        result.error.errors.map((err) => ({
          code: "INVALID_THEME",
          message: err.message,
          path: err.path.map(String),
          details: err,
        }))
      );
    }
  } catch (error) {
    return Err([
      {
        code: "VALIDATION_ERROR",
        message: error instanceof Error ? error.message : "Unknown validation error",
        details: error,
      },
    ]);
  }
}

/**
 * Validates an enhanced theme specification against the schema
 *
 * @param theme - The enhanced theme specification to validate
 * @returns Result containing the validated enhanced theme or validation errors
 */
export function validateEnhancedTheme(theme: unknown): Result<EnhancedThemeSpecification, ThemeValidationError[]> {
  try {
    const result = enhancedThemeSpecificationSchema.safeParse(theme);
    
    if (result.success) {
      return Ok(result.data as EnhancedThemeSpecification);
    } else {
      return Err(
        result.error.errors.map((err) => ({
          code: "INVALID_ENHANCED_THEME",
          message: err.message,
          path: err.path.map(String),
          details: err,
        }))
      );
    }
  } catch (error) {
    return Err([
      {
        code: "VALIDATION_ERROR",
        message: error instanceof Error ? error.message : "Unknown validation error",
        details: error,
      },
    ]);
  }
}

/**
 * Validates a theme preset against the schema
 *
 * @param preset - The theme preset to validate
 * @returns Result containing the validated preset or validation errors
 */
export function validateThemePreset(preset: unknown): Result<ThemePreset, ThemeValidationError[]> {
  try {
    const result = themePresetSchema.safeParse(preset);
    
    if (result.success) {
      return Ok(result.data as ThemePreset);
    } else {
      return Err(
        result.error.errors.map((err) => ({
          code: "INVALID_THEME_PRESET",
          message: err.message,
          path: err.path.map(String),
          details: err,
        }))
      );
    }
  } catch (error) {
    return Err([
      {
        code: "VALIDATION_ERROR",
        message: error instanceof Error ? error.message : "Unknown validation error",
        details: error,
      },
    ]);
  }
}

/**
 * Deep merges two theme objects
 *
 * @param target - The target theme object
 * @param source - The source theme object to merge into the target
 * @returns The merged theme object
 */
export function mergeThemes<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target } as T;
  
  if (!source || typeof source !== "object") {
    return output;
  }
  
  Object.keys(source).forEach((key) => {
    const targetValue = output[key as keyof T];
    const sourceValue = source[key as keyof Partial<T>];
    
    if (
      targetValue && 
      sourceValue && 
      typeof targetValue === "object" && 
      typeof sourceValue === "object" &&
      !Array.isArray(targetValue) &&
      !Array.isArray(sourceValue)
    ) {
      (output as any)[key] = mergeThemes(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      (output as any)[key] = Array.isArray(sourceValue) ? [...sourceValue] : sourceValue;
    }
  });
  
  return output;
}

/**
 * Composes a theme by inheriting from a parent theme
 *
 * @param theme - The child theme with inheritance configuration
 * @param parentTheme - The parent theme to inherit from
 * @returns The composed theme
 */
export function composeTheme(
  theme: ThemeExtension,
  parentTheme: ThemeSpecification
): ThemeSpecification {
  if (!theme.inheritance) {
    return theme;
  }
  
  const { strategy, exclude = [] } = theme.inheritance;
  
  // Create a copy of the parent theme without excluded properties
  const filteredParent = { ...parentTheme };
  exclude.forEach((key) => {
    delete filteredParent[key as keyof ThemeSpecification];
  });
  
  // Apply the composition strategy
  if (strategy === "merge") {
    return mergeThemes(filteredParent, theme);
  } else {
    // For replace strategy, start with parent and overwrite with child properties
    return { ...filteredParent, ...theme };
  }
}

/**
 * Extracts CSS variables from a theme specification
 *
 * @param theme - The theme specification
 * @param prefix - Prefix for CSS variable names (default: "--theme")
 * @returns Object containing CSS variables
 */
export function extractCssVariables(
  theme: ThemeSpecification,
  prefix = "--theme"
): Record<string, string> {
  const variables: Record<string, string> = {};
  
  // Helper function to process nested objects
  function processObject(obj: any, path: string[] = []) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = [...path, key];
      
      if (value && typeof value === "object" && !Array.isArray(value)) {
        processObject(value, newPath);
      } else if (typeof value === "string" || typeof value === "number") {
        const variableName = `${prefix}-${newPath.join("-")}`;
        variables[variableName] = String(value);
      }
    });
  }
  
  processObject(theme);
  
  return variables;
}

/**
 * Resolves a theme value from a token path
 *
 * @param theme - The theme specification
 * @param tokenPath - Dot-notation path to the theme value (e.g., "colors.primary.500")
 * @returns The theme value or undefined if not found
 */
export function resolveThemeToken(
  theme: ThemeSpecification,
  tokenPath: string
): unknown {
  const parts = tokenPath.split(".");
  let current: any = theme;
  
  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined;
    }
    
    current = current[part];
  }
  
  return current;
}

/**
 * Generates a flattened list of theme tokens from a theme specification
 *
 * @param theme - The theme specification
 * @returns Array of token objects with paths and values
 */
export function generateThemeTokens(theme: ThemeSpecification): Array<{
  path: string;
  value: unknown;
  category: string;
}> {
  const tokens: Array<{ path: string; value: unknown; category: string }> = [];
  
  // Helper function to process nested objects
  function processObject(obj: any, path: string[] = [], category = "unknown") {
    if (!obj || typeof obj !== "object") {
      return;
    }
    
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = [...path, key];
      const pathStr = newPath.join(".");
      
      // Determine category based on top-level key
      const topCategory = path.length === 0 ? key : path[0];
      
      if (value && typeof value === "object" && !Array.isArray(value)) {
        processObject(value, newPath, topCategory);
      } else if (value !== undefined && value !== null) {
        tokens.push({ 
          path: pathStr, 
          value,
          category: topCategory
        });
      }
    });
  }
  
  processObject(theme);
  
  return tokens;
}