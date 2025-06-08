import * as React from "react";
import { Select, SelectTrigger, SelectContent } from "./select";
import type { ComponentProps } from "../../../types/schema/components";

interface SelectWrapperProps {
  readonly spec?: ComponentProps["spec"];
  readonly defaultValue?: string;
  readonly value?: string;
  readonly onValueChange?: (value: string) => void;
  readonly disabled?: boolean;
  readonly defaultOpen?: boolean;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly dir?: "ltr" | "rtl";
  readonly name?: string;
  readonly autoComplete?: string;
  readonly required?: boolean;
  readonly children?: React.ReactNode;
  readonly parentContext?: {
    readonly handlers?: Record<string, (...args: unknown[]) => unknown>;
  };
  readonly [key: string]: unknown;
}

/**
 * Wrapper component for Select that ensures all children are rendered
 * within the same React context, which is required by Radix UI
 */
export function SelectWrapper({
  children,
  defaultValue,
  value,
  onValueChange,
  disabled,
  defaultOpen,
  open,
  onOpenChange,
  dir,
  name,
  autoComplete,
  required,
  parentContext,
  ...props
}: Readonly<SelectWrapperProps>): React.ReactElement {
  // Process children to extract trigger and content
  const childArray = React.Children.toArray(children);
  let trigger: React.ReactNode = null;
  let content: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  for (const child of childArray) {
    if (React.isValidElement(child)) {
      if (child.type === SelectTrigger || child.props?.type === "SelectTrigger") {
        trigger = child;
      } else if (child.type === SelectContent || child.props?.type === "SelectContent") {
        content = child;
      } else {
        otherChildren.push(child);
      }
    }
  }

  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      dir={dir}
      name={name}
      autoComplete={autoComplete}
      required={required}
      {...props}
    >
      {trigger}
      {content}
      {otherChildren}
    </Select>
  );
}

// Re-export all select components from select.tsx
export {
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "./select";