import * as React from "react";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { useSDUIFormField } from "../../../lib/form/sdui-form-wrapper";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, name, value: propValue, onChange: propOnChange, onBlur: propOnBlur, ...props }, ref) => {
  // Connect to SDUI form context if available
  const formField = useSDUIFormField(name);
  
  // Use form field values if connected, otherwise use props
  // Convert boolean values to empty string for textarea elements
  const fieldValue = formField ? formField.value : propValue;
  const value = typeof fieldValue === 'boolean' ? '' : fieldValue;
  const hasError = formField ? !!formField.error : false;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (formField) {
      formField.onChange(e.target.value);
    }
    if (propOnChange) {
      propOnChange(e);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (formField) {
      formField.onBlur();
    }
    if (propOnBlur) {
      propOnBlur(e);
    }
  };

  return (
    <textarea
      ref={ref}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        hasError && "border-destructive",
        className
      )}
      {...cleanDOMProps(props)}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
