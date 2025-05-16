import type { BaseComponentSpec } from "../schema/base";
import type { ComponentSpec } from "@/types/schema/components";

export interface SidebarMenuItemAction {
  icon?: string;
  onClick?: string;
  showOnHover?: boolean;
}

export interface SidebarSubMenuItem {
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: string;
}

export interface SidebarMenuItem {
  label: string;
  icon?: string;
  href?: string;
  badge?: string | number;
  action?: SidebarMenuItemAction;
  tooltip?: string;
  isActive?: boolean;
  onClick?: string;
  subItems?: SidebarSubMenuItem[];
}

export interface SidebarMenu {
  items: SidebarMenuItem[];
}

export interface SidebarGroupAction {
  icon?: string;
  onClick?: string;
}

export interface SidebarGroup {
  label?: string;
  action?: SidebarGroupAction;
  items: SidebarMenuItem[];
}

export interface SidebarContent {
  groups: SidebarGroup[];
}

export interface SidebarInput {
  type: "search";
  placeholder?: string;
  value?: string;
  onChange?: string;
}

export interface SidebarSection {
  children?: (SidebarMenu | SidebarInput | ComponentSpec)[];
}

export interface SidebarComponentProps extends BaseComponentSpec {
  type: "sidebar";
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: string;
  header?: SidebarSection;
  content?: SidebarContent;
  footer?: SidebarSection;
}

export type SidebarSpecification = SidebarComponentProps;
