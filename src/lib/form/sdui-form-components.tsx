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
interface SDUIFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  parentContext?: unknown;
}

export const SDUIFormField = React.forwardRef<
  HTMLDivElement,
  SDUIFormFieldProps
>(({ children, name, parentContext, ...props }, ref) => {
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

  // Filter out parentContext to avoid React warnings
  const cleanProps = omit(props as Record<string, unknown>, ['parentContext']);

  return (
    <FormFieldContext.Provider value={{ fieldName }}>
      <div ref={ref} data-field-name={fieldName} {...cleanProps}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
});
SDUIFormField.displayName = 'SDUIFormField';

/**
 * SDUI-aware FormItem component
 */
interface SDUIFormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  parentContext?: unknown;
}

export const SDUIFormItem = React.forwardRef<
  HTMLDivElement,
  SDUIFormItemProps
>(({ className, parentContext, ...props }, ref) => {
  // Filter out parentContext to avoid React warnings
  const cleanProps = omit(props as Record<string, unknown>, ['parentContext']);
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...cleanProps} />
  );
});
SDUIFormItem.displayName = 'SDUIFormItem';

/**
 * SDUI-aware FormLabel component
 */
interface SDUIFormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  fieldName?: string;
  parentContext?: unknown;
}

export const SDUIFormLabel = React.forwardRef<
  HTMLLabelElement,
  SDUIFormLabelProps
>(({ className, fieldName, parentContext, ...props }, ref) => {
  const formContext = useOptionalFormContext();
  const hasError = fieldName && formContext?.errors[fieldName];

  // Filter out parentContext to avoid React warnings
  const cleanProps = omit(props as Record<string, unknown>, ['parentContext']);

  return (
    <Label
      ref={ref}
      className={cn(hasError && "text-destructive", className)}
      {...cleanProps}
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
interface SDUIFormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  parentContext?: unknown;
}

export const SDUIFormDescription = React.forwardRef<
  HTMLParagraphElement,
  SDUIFormDescriptionProps
>(({ className, parentContext, ...props }, ref) => {
  // Filter out parentContext to avoid React warnings
  const cleanProps = omit(props as Record<string, unknown>, ['parentContext']);
  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...cleanProps}
    />
  );
});
SDUIFormDescription.displayName = 'SDUIFormDescription';

/**
 * SDUI-aware FormMessage component
 * Displays validation errors from the form context
 */
interface SDUIFormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  fieldName?: string;
  parentContext?: unknown;
}

export const SDUIFormMessage = React.forwardRef<
  HTMLParagraphElement,
  SDUIFormMessageProps
>(({ className, children, fieldName, parentContext, ...props }, ref) => {
  const formContext = useOptionalFormContext();
  const fieldContext = useFormFieldContext();
  
  // Use provided fieldName, then context fieldName, then nothing
  const effectiveFieldName = fieldName || fieldContext.fieldName;
  const error = effectiveFieldName && formContext?.errors[effectiveFieldName];
  
  const body = error || children;

  if (!body) {
    return null;
  }

  // Filter out parentContext to avoid React warnings
  const cleanProps = omit(props as Record<string, unknown>, ['parentContext']);

  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...cleanProps}
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
  parentContext?: unknown;
}

export const SDUIForm = React.forwardRef<
  HTMLFormElement,
  SDUIFormProps
>(({ onSubmit, defaultValues, parentContext, ...props }, ref) => {
  const formContext = useOptionalFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formContext) {
      formContext.handleSubmit()(e);
    } else if (onSubmit) {
      onSubmit(e);
    }
  };

  // Filter out defaultValues and parentContext as they're not valid form element props
  const cleanProps = omit(props as Record<string, unknown>, ['defaultValues', 'parentContext']);

  return <form ref={ref} onSubmit={handleSubmit} {...cleanProps} />;
});
SDUIForm.displayName = 'SDUIForm';