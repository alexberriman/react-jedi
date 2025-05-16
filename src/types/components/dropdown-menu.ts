import type { BaseComponentSpec } from "../schema/base";

export interface DropdownMenuItemSpecification {
  type: "item";
  text: string;
  icon?: string;
  shortcut?: string;
  variant?: "default" | "destructive";
  disabled?: boolean;
  inset?: boolean;
  onClick?: Record<string, unknown>;
}

export interface DropdownMenuLabelSpecification {
  type: "label";
  text: string;
  inset?: boolean;
}

export interface DropdownMenuSeparatorSpecification {
  type: "separator";
}

export interface DropdownMenuCheckboxSpecification {
  type: "checkbox";
  text: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: Record<string, unknown>;
}

export interface DropdownMenuRadioItemSpecification {
  value: string;
  text: string;
  icon?: string;
  disabled?: boolean;
}

export interface DropdownMenuRadioGroupSpecification {
  type: "radioGroup";
  value?: string;
  onValueChange?: Record<string, unknown>;
  items: DropdownMenuRadioItemSpecification[];
}

export interface DropdownMenuGroupSpecification {
  type: "group";
  items: DropdownMenuContentItem[];
}

export interface DropdownMenuSubSpecification {
  type: "sub";
  text: string;
  icon?: string;
  inset?: boolean;
  content: {
    items: DropdownMenuContentItem[];
  };
}

export type DropdownMenuContentItem =
  | DropdownMenuItemSpecification
  | DropdownMenuLabelSpecification
  | DropdownMenuSeparatorSpecification
  | DropdownMenuCheckboxSpecification
  | DropdownMenuRadioGroupSpecification
  | DropdownMenuGroupSpecification
  | DropdownMenuSubSpecification;

export interface DropdownMenuProps extends BaseComponentSpec {
  type: "dropdownMenu";
  trigger: {
    component: Record<string, unknown>;
    asChild?: boolean;
  };
  content: {
    className?: string;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    collisionPadding?: number;
    avoidCollisions?: boolean;
    items: DropdownMenuContentItem[];
  };
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  onOpenChange?: Record<string, unknown>;
}
