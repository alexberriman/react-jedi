import type { BaseComponentSpec } from "./base";
import type { ComponentSpec } from "../schema/components";

export interface ContextMenuItemSpec {
  type: "item" | "checkbox" | "radio" | "separator" | "label" | "sub";
  label?: string;
  icon?: string;
  shortcut?: string;
  variant?: "default" | "destructive";
  checked?: boolean;
  value?: string;
  onSelect?: {
    action: string;
    [key: string]: unknown;
  };
  disabled?: boolean;
  items?: ContextMenuItemSpec[];
}

export interface ContextMenuComponentSpec extends BaseComponentSpec {
  type: "context-menu";

  trigger: ComponentSpec;

  items?: ContextMenuItemSpec[];

  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: {
    action: string;
    [key: string]: unknown;
  };

  modal?: boolean;

  // Extend with all common properties to fix type issues
  children?: ComponentSpec | ComponentSpec[] | string;
  className?: string;
  style?: Record<string, unknown>;
  state?: Record<string, unknown>;
  visible?: boolean;
  when?: string;
  theme?: Record<string, unknown>;
  conditionalProps?: Record<string, unknown>;
  data?: Record<string, unknown>;
  a11y?: Record<string, unknown>;
  testId?: string;
  variant?: string;
  disabled?: boolean;
  columns?: number;
  direction?: string;
  level?: number;
  props?: Record<string, unknown>;
  conditions?: unknown;

  // Add index signature for compatibility
  [key: string]: unknown;
}
