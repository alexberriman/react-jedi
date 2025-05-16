import type { BaseComponentSpec } from "../schema/base";

export interface MenubarItemSpec {
  type: "item";
  label: string;
  shortcut?: string;
  disabled?: boolean;
  inset?: boolean;
  icon?: string;
  variant?: "default" | "destructive";
  onClick?: () => void;
}

export interface MenubarSubmenuSpec {
  type: "submenu";
  trigger: string;
  inset?: boolean;
  items: (MenubarItemSpec | MenubarSeparatorSpec)[];
}

export interface MenubarCheckboxItemSpec {
  type: "checkbox";
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface MenubarRadioItemSpec {
  value: string;
  label: string;
}

export interface MenubarRadioGroupSpec {
  type: "radioGroup";
  value?: string;
  items: MenubarRadioItemSpec[];
  onValueChange?: (value: string) => void;
}

export interface MenubarSeparatorSpec {
  type: "separator";
}

export interface MenubarMenuSpec {
  trigger: string;
  items: (
    | MenubarItemSpec
    | MenubarSubmenuSpec
    | MenubarCheckboxItemSpec
    | MenubarRadioGroupSpec
    | MenubarSeparatorSpec
  )[];
}

export interface MenubarComponent extends BaseComponentSpec {
  type: "menubar";
  menus: MenubarMenuSpec[];
}
