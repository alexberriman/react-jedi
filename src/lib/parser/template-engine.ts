import { Result, Ok, Err } from '../utils/result'

export interface TemplateVariable {
  [key: string]: string | number | boolean | TemplateVariable
}

interface TemplateOptions {
  fallbackOnMissing?: boolean
  escapeHtml?: boolean
}

/**
 * Reserved variables that are automatically available in all templates
 */
function getReservedVariables(): TemplateVariable {
  const now = new Date()
  return {
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
    currentDay: now.getDate(),
    currentDate: now.toISOString().split('T')[0],
    currentTime: now.toTimeString().split(' ')[0],
    currentDateTime: now.toISOString(),
    timestamp: now.getTime(),
    weekday: now.toLocaleDateString('en-US', { weekday: 'long' }),
    month: now.toLocaleDateString('en-US', { month: 'long' }),
  }
}

/**
 * Get nested property value from an object using dot notation
 */
function getNestedValue(obj: TemplateVariable, path: string): string | undefined {
  const parts = path.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }

  if (current === null || current === undefined) {
    return undefined
  }

  return String(current)
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replaceAll(/[&<>"']/g, (match) => htmlEscapes[match])
}

/**
 * Process a template string and replace variables
 */
export function processTemplate(
  template: string,
  variables: TemplateVariable = {},
  options: TemplateOptions = {}
): Result<string, Error> {
  try {
    const { fallbackOnMissing = false, escapeHtml: shouldEscapeHtml = true } = options
    const allVariables = { ...getReservedVariables(), ...variables }

    // Match {{variableName}} pattern
    // Using simple character class to avoid backtracking
    const variablePattern = /\{\{([\w\s.]+)\}\}/g

    const processed = template.replaceAll(variablePattern, (match, variableName) => {
      const value = getNestedValue(allVariables, variableName.trim())
      
      if (value === undefined) {
        if (fallbackOnMissing) {
          return ''
        }
        // Keep the original placeholder if variable not found
        return match
      }

      return shouldEscapeHtml ? escapeHtml(value) : value
    })

    return Ok(processed)
  } catch (error) {
    return Err(new Error(`Failed to process template: ${error instanceof Error ? error.message : String(error)}`))
  }
}

/**
 * Process all string values in a JSON object/array recursively
 */
export function processJsonTemplate<T = unknown>(
  json: T,
  variables: TemplateVariable = {},
  options: TemplateOptions = {}
): Result<T, Error> {
  try {
    const process = (value: unknown): unknown => {
      if (typeof value === 'string') {
        const result = processTemplate(value, variables, options)
        if (!result.ok) {
          throw result.val
        }
        return result.val
      }
      
      if (Array.isArray(value)) {
        return value.map((item) => process(item))
      }
      
      if (value !== null && typeof value === 'object') {
        const processed: Record<string, unknown> = {}
        for (const [key, val] of Object.entries(value)) {
          processed[key] = process(val)
        }
        return processed
      }
      
      return value
    }

    const result = process(json)
    return Ok(result as T)
  } catch (error) {
    return Err(new Error(`Failed to process JSON template: ${error instanceof Error ? error.message : String(error)}`))
  }
}

/**
 * Check if a string contains template variables
 */
export function hasTemplateVariables(template: string): boolean {
  // Check for {{variableName}} pattern
  const variablePattern = /\{\{[\w\s.]+\}\}/
  return variablePattern.test(template)
}

/**
 * Extract all variable names from a template string
 */
export function extractTemplateVariables(template: string): string[] {
  // Extract variable names from {{variableName}} patterns
  const variablePattern = /\{\{([\w\s.]+)\}\}/g
  const variables: string[] = []
  let match

  while ((match = variablePattern.exec(template)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1].trim())
    }
  }

  return variables
}