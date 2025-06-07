import type { BaseComponentSpec, ComponentChildren } from "../schema/base";

/**
 * Individual menu item specification
 */
export interface MenuItemSpec {
  /** Unique identifier for the menu item */
  id: string;
  /** Display label for the menu item */
  label: string;
  /** Icon name to display (from lucide icons) */
  icon?: string;
  /** Keyboard shortcut to display */
  shortcut?: string;
  /** Whether the menu item is disabled */
  disabled?: boolean;
  /** Action handler name to call when item is selected */
  action?: string;
  /** Nested submenu items */
  submenu?: MenuItemSpec[];
}

/**
 * KeyboardNavigationMenu component specification
 */
export interface KeyboardNavigationMenuSpec extends BaseComponentSpec {
  type: "KeyboardNavigationMenu" | "keyboardNavigationMenu" | "keyboard-navigation-menu";
  /** Array of menu items */
  items: MenuItemSpec[];
  /** Whether to show keyboard shortcuts */
  showShortcuts?: boolean;
  /** Menu orientation */
  orientation?: "horizontal" | "vertical";
  /** ARIA role for the menu */
  role?: "menu" | "navigation";
  /** Handler name to call when an item is selected */
  onSelectAction?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * KeyboardNavigationMenuItem component specification for custom menu items
 */
export interface KeyboardNavigationMenuItemSpec extends BaseComponentSpec {
  type: "KeyboardNavigationMenuItem" | "keyboardNavigationMenuItem" | "keyboard-navigation-menu-item";
  /** Display label for the menu item */
  label?: string;
  /** Icon name to display */
  icon?: string;
  /** Keyboard shortcut to display */
  shortcut?: string;
  /** Whether the menu item is disabled */
  disabled?: boolean;
  /** Children elements */
  children?: ComponentChildren;
}