import * as React from "react";
import type { ComponentProps } from "../../../types/schema/components";
import type { TextareaSpec } from "../../../types/schema/ui";
import { Textarea } from "./textarea";
import { cn } from "../../../lib/utils";

export const TextareaComponent: React.FC<Record<string, unknown>> = (props) => {
  const { spec, state } = props as unknown as ComponentProps;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { onChangeAction } = spec as TextareaSpec;
      if (onChangeAction && state && "dispatch" in state && typeof state.dispatch === "function") {
        state.dispatch({
          type: onChangeAction,
          payload: { value: e.target.value },
        });
      }
    },
    [spec, state]
  );

  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const { onFocusAction } = spec as TextareaSpec;
      if (onFocusAction && state && "dispatch" in state && typeof state.dispatch === "function") {
        state.dispatch({
          type: onFocusAction,
          payload: { value: e.target.value },
        });
      }
    },
    [spec, state]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const { onBlurAction } = spec as TextareaSpec;
      if (onBlurAction && state && "dispatch" in state && typeof state.dispatch === "function") {
        state.dispatch({
          type: onBlurAction,
          payload: { value: e.target.value },
        });
      }
    },
    [spec, state]
  );

  // Type guard to ensure we have a TextareaSpec
  if (spec.type !== "Textarea") {
    return null;
  }
  const textareaSpec = spec as TextareaSpec;
  const {
    name,
    placeholder,
    defaultValue,
    rows = 4,
    maxLength,
    required,
    disabled,
    readonly,
    resize = "auto",
    autoComplete,
    spellCheck,
    wrap,
    className,
    style,
    // Exclude properties that shouldn't be passed to HTML elements
    children,
    type,
    eventHandlers,
    autoFocus,
    onChangeAction,
    onFocusAction,
    onBlurAction,
    ...restProps
  } = textareaSpec;

  // Handle resize styles
  const resizeClasses = {
    none: "resize-none",
    both: "resize",
    horizontal: "resize-x",
    vertical: "resize-y",
    auto: "", // Default browser behavior
  };

  return (
    <Textarea
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      rows={rows}
      maxLength={maxLength}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      wrap={wrap}
      className={cn(resizeClasses[resize], className)}
      style={style}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...restProps}
    />
  );
};
