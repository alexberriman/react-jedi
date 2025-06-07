import React from 'react';
import { FormProvider as SDUIFormProvider, useOptionalFormContext, type FormValues } from '@/lib/state/form-context';
import { extractValidationSpec } from '@/lib/validation/form-validation';
import type { ComponentSpec } from '@/types/schema/components';
import type { FormSpec } from '@/types/components/form';

interface SDUIFormWrapperProps {
  readonly spec: ComponentSpec;
  readonly children: React.ReactNode;
  readonly onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
}

/**
 * Wrapper component that provides form context for SDUI mode
 * This component intercepts form specs and wraps them with validation context
 */
export function SDUIFormWrapper({ spec, children, onSubmit }: SDUIFormWrapperProps) {
  // Extract form-specific properties
  const formSpec = spec as unknown as FormSpec;
  const validationSpec = extractValidationSpec(formSpec);
  const defaultValues = formSpec.defaultValues || {};

  // Extract submit handler from spec
  // onSubmit can be a string (handler name) or a function
  const handleSubmit = onSubmit || (
    typeof formSpec.onSubmit === 'function' ? formSpec.onSubmit : undefined
  );

  return (
    <SDUIFormProvider
      defaultValues={defaultValues as FormValues}
      validationSpec={validationSpec}
      onSubmit={handleSubmit}
    >
      {children}
    </SDUIFormProvider>
  );
}

/**
 * Hook to connect form fields to the SDUI form context
 * This is used by Input and other form components to register with the form
 */
export function useSDUIFormField(name?: string) {
  const formContext = useOptionalFormContext();
  
  // Register field effect must be called unconditionally
  React.useEffect(() => {
    if (formContext && name) {
      formContext.registerField(name);
      return () => {
        formContext.unregisterField(name);
      };
    }
    return undefined;
  }, [name, formContext]);
  
  if (!formContext || !name) {
    return null;
  }

  const value = formContext.values[name] ?? '';
  const error = formContext.errors[name];
  const touched = formContext.touched[name];

  const handleChange = (newValue: string | number | boolean | null | undefined) => {
    formContext.setValue(name, newValue);
  };

  const handleBlur = () => {
    formContext.setTouched(name, true);
    formContext.validateField(name);
  };

  return {
    value,
    error,
    touched,
    onChange: handleChange,
    onBlur: handleBlur
  };
}