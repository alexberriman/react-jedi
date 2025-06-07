import type { FormValidationSpec } from '@/types/components/form';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
}

type FieldValidationRules = FormValidationSpec[string];

export class FormValidator {
  private validationSpec: FormValidationSpec;

  constructor(validationSpec: FormValidationSpec = {}) {
    this.validationSpec = validationSpec;
  }

  private checkRequired(fieldName: string, value: unknown, rule: boolean | string): FieldValidationResult | null {
    const isEmpty = value === undefined || value === null || value === '' || 
      (Array.isArray(value) && value.length === 0);
    
    if (isEmpty) {
      const message = typeof rule === 'string' ? rule : `${fieldName} is required`;
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private checkMinLength(fieldName: string, value: string, rule: number | { value: number; message: string }): FieldValidationResult | null {
    const minLength = typeof rule === 'number' ? rule : rule.value;
    
    if (value.length < minLength) {
      const message = typeof rule === 'object' && rule.message
        ? rule.message
        : `${fieldName} must be at least ${minLength} characters`;
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private checkMaxLength(fieldName: string, value: string, rule: number | { value: number; message: string }): FieldValidationResult | null {
    const maxLength = typeof rule === 'number' ? rule : rule.value;
    
    if (value.length > maxLength) {
      const message = typeof rule === 'object' && rule.message
        ? rule.message
        : `${fieldName} must be no more than ${maxLength} characters`;
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private checkPattern(fieldName: string, value: string, rule: string | { value: string; message: string }): FieldValidationResult | null {
    const pattern = typeof rule === 'string' ? rule : rule.value;
    const regex = new RegExp(pattern);
    
    if (!regex.test(value)) {
      const message = typeof rule === 'object' && rule.message
        ? rule.message
        : `${fieldName} format is invalid`;
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private checkEmail(value: string, rule: boolean | string): FieldValidationResult | null {
    // Safer email regex that avoids catastrophic backtracking
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(value)) {
      const message = typeof rule === 'string' ? rule : 'Please enter a valid email address';
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private checkMin(fieldName: string, value: number, rule: number | { value: number; message: string }): FieldValidationResult | null {
    const min = typeof rule === 'number' ? rule : rule.value;
    
    if (value < min) {
      const message = typeof rule === 'object' && rule.message
        ? rule.message
        : `${fieldName} must be at least ${min}`;
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private checkMax(fieldName: string, value: number, rule: number | { value: number; message: string }): FieldValidationResult | null {
    const max = typeof rule === 'number' ? rule : rule.value;
    
    if (value > max) {
      const message = typeof rule === 'object' && rule.message
        ? rule.message
        : `${fieldName} must be no more than ${max}`;
      return { isValid: false, error: message };
    }
    
    return null;
  }

  private validateString(fieldName: string, value: string, rules: FieldValidationRules): FieldValidationResult | null {
    if (rules.minLength !== undefined) {
      const result = this.checkMinLength(fieldName, value, rules.minLength);
      if (result) return result;
    }

    if (rules.maxLength !== undefined) {
      const result = this.checkMaxLength(fieldName, value, rules.maxLength);
      if (result) return result;
    }

    if (rules.pattern) {
      const result = this.checkPattern(fieldName, value, rules.pattern);
      if (result) return result;
    }

    if (rules.email) {
      const result = this.checkEmail(value, rules.email);
      if (result) return result;
    }

    return null;
  }

  private validateNumber(fieldName: string, value: number, rules: FieldValidationRules): FieldValidationResult | null {
    if (rules.min !== undefined) {
      const result = this.checkMin(fieldName, value, rules.min);
      if (result) return result;
    }

    if (rules.max !== undefined) {
      const result = this.checkMax(fieldName, value, rules.max);
      if (result) return result;
    }

    return null;
  }

  validateField(fieldName: string, value: unknown): FieldValidationResult {
    const fieldValidation = this.validationSpec[fieldName];
    if (!fieldValidation) {
      return { isValid: true };
    }

    // Required validation
    if (fieldValidation.required) {
      const result = this.checkRequired(fieldName, value, fieldValidation.required);
      if (result) return result;
    }

    // String validations
    if (typeof value === 'string') {
      const result = this.validateString(fieldName, value, fieldValidation);
      if (result) return result;
    }

    // Number validations
    if (typeof value === 'number' || (typeof value === 'string' && !Number.isNaN(Number(value)))) {
      const numValue = Number(value);
      const result = this.validateNumber(fieldName, numValue, fieldValidation);
      if (result) return result;
    }

    return { isValid: true };
  }

  validateForm(values: Record<string, unknown>): ValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate each field
    for (const fieldName in this.validationSpec) {
      const result = this.validateField(fieldName, values[fieldName]);
      if (!result.isValid && result.error) {
        errors[fieldName] = result.error;
        isValid = false;
      }
    }

    return { isValid, errors };
  }

  // Async validation support
  async validateFieldAsync(
    fieldName: string, 
    value: unknown, 
    asyncValidator?: (value: unknown) => Promise<string | undefined>
  ): Promise<FieldValidationResult> {
    // First run sync validation
    const syncResult = this.validateField(fieldName, value);
    if (!syncResult.isValid) {
      return syncResult;
    }

    // Then run async validation if provided
    if (asyncValidator) {
      try {
        const error = await asyncValidator(value);
        if (error) {
          return { isValid: false, error };
        }
      } catch {
        return { isValid: false, error: 'Validation failed' };
      }
    }

    return { isValid: true };
  }
}

// Helper functions to reduce cognitive complexity
function isValidObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFormFieldChild(child: unknown): child is Record<string, unknown> {
  return isValidObject(child) && (child as Record<string, unknown>).type === 'FormField';
}

function extractTopLevelValidation(spec: Record<string, unknown>): Partial<FormValidationSpec> {
  if (spec.validation && typeof spec.validation === 'object') {
    return spec.validation as FormValidationSpec;
  }
  return {};
}

function extractFieldValidation(child: Record<string, unknown>): [string, FieldValidationRules] | null {
  if (!child.properties || !isValidObject(child.properties)) {
    return null;
  }

  const props = child.properties;
  const name = props.name;
  const validation = props.validation;

  if (typeof name === 'string' && validation) {
    return [name, validation as FieldValidationRules];
  }

  return null;
}

function extractChildrenValidations(children: unknown[]): FormValidationSpec {
  const validations: FormValidationSpec = {};

  for (const child of children) {
    if (!isFormFieldChild(child)) continue;

    const fieldValidation = extractFieldValidation(child);
    if (fieldValidation) {
      const [name, rules] = fieldValidation;
      validations[name] = rules;
    }
  }

  return validations;
}

// Helper to extract validation spec from form spec
export function extractValidationSpec(formSpec: unknown): FormValidationSpec {
  if (!isValidObject(formSpec)) {
    return {};
  }

  const spec = formSpec;
  const validationSpec: FormValidationSpec = {};

  // Extract top-level validation
  Object.assign(validationSpec, extractTopLevelValidation(spec));

  // Extract nested field validations
  if (Array.isArray(spec.children)) {
    Object.assign(validationSpec, extractChildrenValidations(spec.children));
  }

  return validationSpec;
}