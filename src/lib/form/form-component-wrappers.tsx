import React from 'react';
import * as UI from '@/components/ui';
import { 
  SDUIForm, 
  SDUIFormField, 
  SDUIFormItem, 
  SDUIFormLabel, 
  SDUIFormControl, 
  SDUIFormDescription, 
  SDUIFormMessage 
} from './sdui-form-components';
import { useOptionalFormContext } from '@/lib/state/form-context';

/**
 * Wrapper for Form component that works in both React and SDUI modes
 */
export const FormWrapper = React.forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<{ className?: string; onSubmit?: React.FormEventHandler<HTMLFormElement> }>
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  // In SDUI mode with form context, use SDUIForm
  if (formContext) {
    return <SDUIForm ref={ref} {...props} />;
  }
  
  // In React mode, we can't use the original Form as it expects react-hook-form props
  // Just render a regular form element
  return <form ref={ref} {...props} />;
});
FormWrapper.displayName = 'FormWrapper';

/**
 * Wrapper for FormField component
 * In SDUI mode, this component doesn't use react-hook-form
 */
export const FormFieldWrapper = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ name?: string; className?: string }>
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  // In SDUI mode, use SDUIFormField
  if (formContext) {
    const { name, children, ...rest } = props;
    return (
      <SDUIFormField ref={ref} name={name} {...rest}>
        {children}
      </SDUIFormField>
    );
  }
  
  // In React mode, use the original FormField
  // Note: This won't work directly as FormField expects react-hook-form props
  // In practice, we should detect if we're in SDUI mode differently
  return <div ref={ref} {...props} />;
});
FormFieldWrapper.displayName = 'FormFieldWrapper';

/**
 * Wrapper for FormItem component
 */
export const FormItemWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  if (formContext) {
    return <SDUIFormItem ref={ref} {...props} />;
  }
  
  return <UI.FormItem ref={ref} {...props} />;
});
FormItemWrapper.displayName = 'FormItemWrapper';

/**
 * Wrapper for FormLabel component
 */
export const FormLabelWrapper = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof UI.FormLabel> & { fieldName?: string }
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  if (formContext) {
    return <SDUIFormLabel ref={ref} {...props} />;
  }
  
  return <UI.FormLabel ref={ref} {...props} />;
});
FormLabelWrapper.displayName = 'FormLabelWrapper';

/**
 * Wrapper for FormControl component
 */
export const FormControlWrapper = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof UI.FormControl>
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  if (formContext) {
    return <SDUIFormControl ref={ref as React.Ref<HTMLDivElement>} {...props} />;
  }
  
  return <UI.FormControl ref={ref} {...props} />;
});
FormControlWrapper.displayName = 'FormControlWrapper';

/**
 * Wrapper for FormDescription component
 */
export const FormDescriptionWrapper = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  if (formContext) {
    return <SDUIFormDescription ref={ref} {...props} />;
  }
  
  return <UI.FormDescription ref={ref} {...props} />;
});
FormDescriptionWrapper.displayName = 'FormDescriptionWrapper';

/**
 * Wrapper for FormMessage component
 */
export const FormMessageWrapper = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { fieldName?: string }
>((props, ref) => {
  const formContext = useOptionalFormContext();
  
  if (formContext) {
    // Extract field name from parent context or props
    const fieldName = props.fieldName || extractFieldNameFromParent();
    return <SDUIFormMessage ref={ref} fieldName={fieldName} {...props} />;
  }
  
  return <UI.FormMessage ref={ref} {...props} />;
});
FormMessageWrapper.displayName = 'FormMessageWrapper';

/**
 * Helper to extract field name from parent FormField
 * This is a simplified implementation
 */
function extractFieldNameFromParent(): string | undefined {
  // In a real implementation, we'd use React Context
  // to pass the field name from FormField to FormMessage
  return undefined;
}