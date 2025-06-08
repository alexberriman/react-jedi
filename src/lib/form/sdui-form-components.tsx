import React from 'react';
import { cn, omit } from '@/lib/utils';
import { useOptionalFormContext } from '@/lib/state/form-context';
import { Label } from '@/components/ui/label';

// Context for passing field name from FormField to children
const FormFieldContext = React.createContext<{ fieldName?: string }>({});

export const useFormFieldContext = () => {
  return React.useContext(FormFieldContext);
};

/**
 * SDUI-aware FormField component
 * In SDUI mode, this component tracks field names for validation
 */
export const SDUIFormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { name?: string }
>(({ children, name, ...props }, ref) => {
  const [fieldName, setFieldName] = React.useState(name);

  // Extract field name from children if not provided
  React.useEffect(() => {
    if (!name && React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      if (typeof childProps.name === 'string') {
        setFieldName(childProps.name);
      }
    }
  }, [children, name]);

  return (
    <FormFieldContext.Provider value={{ fieldName }}>
      <div ref={ref} data-field-name={fieldName} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
});
SDUIFormField.displayName = 'SDUIFormField';

/**
 * SDUI-aware FormItem component
 */
export const SDUIFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  );
});
SDUIFormItem.displayName = 'SDUIFormItem';

/**
 * SDUI-aware FormLabel component
 */
export const SDUIFormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { fieldName?: string }
>(({ className, fieldName, ...props }, ref) => {
  const formContext = useOptionalFormContext();
  const hasError = fieldName && formContext?.errors[fieldName];

  return (
    <Label
      ref={ref}
      className={cn(hasError && "text-destructive", className)}
      {...props}
    />
  );
});
SDUIFormLabel.displayName = 'SDUIFormLabel';

/**
 * SDUI-aware FormControl component
 * This wraps form inputs and provides context
 */
interface SDUIFormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  parentContext?: unknown;
}

export const SDUIFormControl = React.forwardRef<
  HTMLDivElement,
  SDUIFormControlProps
>(({ children, parentContext, ...props }, ref) => {
  // Filter out parentContext to avoid React warnings
  const cleanProps = omit(props as Record<string, unknown>, ['parentContext']);
  return (
    <div ref={ref} {...cleanProps}>
      {children}
    </div>
  );
});
SDUIFormControl.displayName = 'SDUIFormControl';

/**
 * SDUI-aware FormDescription component
 */
export const SDUIFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
SDUIFormDescription.displayName = 'SDUIFormDescription';

/**
 * SDUI-aware FormMessage component
 * Displays validation errors from the form context
 */
export const SDUIFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { fieldName?: string }
>(({ className, children, fieldName, ...props }, ref) => {
  const formContext = useOptionalFormContext();
  const fieldContext = useFormFieldContext();
  
  // Use provided fieldName, then context fieldName, then nothing
  const effectiveFieldName = fieldName || fieldContext.fieldName;
  const error = effectiveFieldName && formContext?.errors[effectiveFieldName];
  
  const body = error || children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
SDUIFormMessage.displayName = 'SDUIFormMessage';

/**
 * SDUI Form component that handles form submission
 */
interface SDUIFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  defaultValues?: Record<string, unknown>;
}

export const SDUIForm = React.forwardRef<
  HTMLFormElement,
  SDUIFormProps
>(({ onSubmit, defaultValues, ...props }, ref) => {
  const formContext = useOptionalFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formContext) {
      formContext.handleSubmit()(e);
    } else if (onSubmit) {
      onSubmit(e);
    }
  };

  // Filter out defaultValues as it's not a valid form element prop
  const cleanProps = omit(props as Record<string, unknown>, ['defaultValues']);

  return <form ref={ref} onSubmit={handleSubmit} {...cleanProps} />;
});
SDUIForm.displayName = 'SDUIForm';