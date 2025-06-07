import * as React from "react";
import { KeyboardNavigationMenu, type MenuItem } from "./keyboard-navigation-menu";
import type { KeyboardNavigationMenuSpec } from "../../../types/components/keyboard-navigation-menu";
import { render } from "../../../lib/render";
import { isComponentSpecArray } from "../../../types/schema/guards";
import { SDUIIcon } from "../../../lib/icons";

/**
 * SDUI wrapper component for KeyboardNavigationMenu
 * Maps JSON specifications to the KeyboardNavigationMenu component
 */
export function KeyboardNavigationMenuComponent(props: Readonly<Record<string, unknown>>) {
  const menuProps = props as unknown as KeyboardNavigationMenuSpec;
  const {
    items = [],
    showShortcuts = true,
    orientation = "vertical",
    role = "menu",
    className,
    onSelectAction,
  } = menuProps;

  // Get handlers from parent context
  const parentContext = props.parentContext as { handlers?: Record<string, (...args: unknown[]) => unknown> } | undefined;
  const handlers = parentContext?.handlers;

  // Convert specification items to MenuItem format
  const convertItems = (specItems: typeof items): MenuItem[] => {
    return specItems.map((item) => {
      const menuItem: MenuItem = {
        id: item.id,
        label: item.label,
        disabled: item.disabled,
        shortcut: item.shortcut,
      };

      // Handle icon
      if (item.icon) {
        menuItem.icon = <SDUIIcon name={item.icon} size={16} />;
      }

      // Handle action
      if (item.action && handlers?.[item.action]) {
        menuItem.action = handlers[item.action] as () => void;
      }

      // Handle submenu recursively
      if (item.submenu) {
        menuItem.submenu = convertItems(item.submenu);
      }

      return menuItem;
    });
  };

  const menuItems = convertItems(items);

  // Handle selection
  const handleSelect = (item: MenuItem) => {
    // Call the item's action if it has one
    item.action?.();

    // Call the global onSelect handler if specified
    if (onSelectAction && handlers?.[onSelectAction]) {
      const handler = handlers[onSelectAction];
      handler(item);
    }
  };

  return (
    <KeyboardNavigationMenu
      items={menuItems}
      onSelect={handleSelect}
      className={className}
      showShortcuts={showShortcuts}
      orientation={orientation}
      role={role}
    />
  );
}

// For granular control, we can also expose individual menu item rendering
export function KeyboardNavigationMenuItemComponent(props: Readonly<Record<string, unknown>>) {
  const { id, label, icon, shortcut, disabled, children } = props as {
    id?: string;
    label?: string;
    icon?: string;
    shortcut?: string;
    disabled?: boolean;
    children?: unknown;
  };

  return (
    <div
      role="menuitem"
      id={id}
      aria-disabled={disabled}
      className="keyboard-nav-menu-item flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="flex items-center gap-2">
        {icon && <SDUIIcon name={icon} size={16} />}
        <span>{label}</span>
        {children && isComponentSpecArray(children)
          ? children.map((child, index) => (
              <React.Fragment key={`menu-item-child-${index}`}>{render(child)}</React.Fragment>
            ))
          : null}
      </div>
      {shortcut && (
        <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">{shortcut}</kbd>
      )}
    </div>
  );
}