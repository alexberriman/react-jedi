import type { BaseComponentSpec } from "../schema/base";
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

  // Add index signature for compatibility
  [key: string]: unknown;
}
