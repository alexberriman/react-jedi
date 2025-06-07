import * as React from "react";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { getFormControlAriaProps } from "../../../lib/accessibility";
import { useSDUIFormField } from "../../../lib/form/sdui-form-wrapper";

// Convert string boolean values to boolean
function convertToBoolean(
  value: boolean | "true" | "false" | "grammar" | "spelling" | undefined
): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  if (typeof value === "boolean") return value;
  return undefined;
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({
    className,
    type,
    name,
    value: propValue,
    onChange: propOnChange,
    onBlur: propOnBlur,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    "aria-readonly": ariaReadOnly,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel,
    ...props
  }, ref) => {
  const cleanProps = cleanDOMProps(
    props as Record<string, unknown>
  ) as React.ComponentProps<"input">;

  // Connect to SDUI form context if available
  const formField = useSDUIFormField(name);
  
  // Use form field values if connected, otherwise use props
  // Convert boolean values to empty string for input elements
  const fieldValue = formField ? formField.value : propValue;
  const value = typeof fieldValue === 'boolean' ? '' : fieldValue;
  const hasError = formField ? !!formField.error : false;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formField) {
      formField.onChange(e.target.value);
    }
    if (propOnChange) {
      propOnChange(e);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (formField) {
      formField.onBlur();
    }
    if (propOnBlur) {
      propOnBlur(e);
    }
  };

  const ariaProps = getFormControlAriaProps({
    ariaInvalid: hasError || convertToBoolean(ariaInvalid),
    ariaRequired: convertToBoolean(ariaRequired),
    ariaReadOnly: convertToBoolean(ariaReadOnly),
    ariaDescribedBy,
    ariaLabelledBy,
    ariaLabel,
  });

    return (
      <input
        type={type || "text"}
        ref={ref}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          hasError && "border-destructive",
          className
        )}
        {...ariaProps}
      {...cleanProps}
    />
  );
});

Input.displayName = "Input";

export { Input };
