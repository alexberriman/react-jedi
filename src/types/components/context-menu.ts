import type { BaseComponent } from "./base";
import type { ComponentSpecification } from "../schema/specification";

export interface ContextMenuItem {
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
  items?: ContextMenuItem[];
}

export interface ContextMenuComponent extends BaseComponent {
  type: "context-menu";

  trigger: ComponentSpecification;

  items?: ContextMenuItem[];

  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: {
    action: string;
    [key: string]: unknown;
  };

  modal?: boolean;
}
