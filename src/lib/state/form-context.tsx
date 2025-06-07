import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { FormValidator, ValidationResult, FieldValidationResult } from '@/lib/validation/form-validation';
import type { FormValidationSpec } from '@/types/components/form';

export type FormValue = string | number | boolean | null | undefined;
export type FormValues = Record<string, FormValue>;

export interface FormContextValue {
  values: FormValues;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValidating: boolean;
  setValue: (name: string, value: FormValue) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  validateField: (name: string) => Promise<FieldValidationResult>;
  validateForm: () => Promise<ValidationResult>;
  handleSubmit: (onSubmit?: (values: FormValues) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  registerField: (name: string, defaultValue?: FormValue) => void;
  unregisterField: (name: string) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const useOptionalFormContext = () => {
  return useContext(FormContext);
};

interface FormProviderProps {
  children: React.ReactNode;
  defaultValues?: FormValues;
  validationSpec?: FormValidationSpec;
  onSubmit?: (values: FormValues) => void | Promise<void>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  defaultValues = {},
  validationSpec = {},
  onSubmit
}) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  
  const validatorRef = useRef(new FormValidator(validationSpec || {}));
  const registeredFieldsRef = useRef(new Set<string>());

  // Update validator when validation spec changes
  React.useEffect(() => {
    validatorRef.current = new FormValidator(validationSpec || {});
  }, [validationSpec]);

  const setValue = useCallback((name: string, value: FormValue) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when value changes
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [errors]);

  const setError = useCallback((name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const setFieldTouched = useCallback((name: string, touchedValue: boolean) => {
    setTouched(prev => ({ ...prev, [name]: touchedValue }));
  }, []);

  const validateField = useCallback(async (name: string): Promise<FieldValidationResult> => {
    const result = validatorRef.current.validateField(name, values[name]);
    
    if (!result.isValid && result.error) {
      setError(name, result.error);
    } else {
      clearError(name);
    }
    
    return result;
  }, [values, setError, clearError]);

  const validateForm = useCallback(async (): Promise<ValidationResult> => {
    setIsValidating(true);
    
    try {
      const result = validatorRef.current.validateForm(values);
      
      // Set all errors at once
      setErrors(result.errors);
      
      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      for (const field of registeredFieldsRef.current) {
        allTouched[field] = true;
      }
      setTouched(allTouched);
      
      return result;
    } finally {
      setIsValidating(false);
    }
  }, [values]);

  const handleSubmit = useCallback((submitHandler?: (values: FormValues) => void | Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setIsSubmitting(true);
      
      try {
        // Validate form
        const validationResult = await validateForm();
        
        if (validationResult.isValid) {
          // Call the submit handler
          const handler = submitHandler || onSubmit;
          if (handler) {
            await handler(values);
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [validateForm, values, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsValidating(false);
  }, [defaultValues]);

  const registerField = useCallback((name: string, defaultValue?: FormValue) => {
    registeredFieldsRef.current.add(name);
    
    // Set default value if not already set
    if (!(name in values) && defaultValue !== undefined) {
      setValues(prev => ({ ...prev, [name]: defaultValue }));
    }
  }, [values]);

  const unregisterField = useCallback((name: string) => {
    registeredFieldsRef.current.delete(name);
  }, []);

  const contextValue: FormContextValue = {
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    setValue,
    setError,
    clearError,
    setTouched: setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    resetForm,
    registerField,
    unregisterField
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};