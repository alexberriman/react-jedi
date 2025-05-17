import { RefObject } from "react";

export interface KeyboardNavigationConfig {
  focusTrap?: boolean;
  rovingTabIndex?: boolean;
  escapeKey?: boolean;
  arrowKeys?: boolean;
  homeEndKeys?: boolean;
  pageKeys?: boolean;
  typeahead?: boolean;
}

export class KeyboardManager {
  private activeElements: Set<HTMLElement> = new Set();
  private listeners: Map<string, Set<(event: KeyboardEvent) => void>> = new Map();

  registerElement(element: HTMLElement, config: KeyboardNavigationConfig): void {
    this.activeElements.add(element);

    // Apply ARIA attributes based on config
    if (config.rovingTabIndex) {
      element.setAttribute("role", "group");
    }

    if (config.arrowKeys) {
      element.setAttribute("aria-keyshortcuts", "ArrowUp ArrowDown ArrowLeft ArrowRight");
    }

    if (config.homeEndKeys) {
      const existing = element.getAttribute("aria-keyshortcuts") || "";
      element.setAttribute("aria-keyshortcuts", `${existing} Home End`.trim());
    }
  }

  unregisterElement(element: HTMLElement): void {
    this.activeElements.delete(element);
  }

  addEventListener(key: string, handler: (event: KeyboardEvent) => void): void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(handler);
  }

  removeEventListener(key: string, handler: (event: KeyboardEvent) => void): void {
    this.listeners.get(key)?.delete(handler);
  }

  dispatchKeyEvent(event: KeyboardEvent): void {
    const handlers = this.listeners.get(event.key);
    if (handlers) {
      for (const handler of handlers) handler(event);
    }
  }

  isElementActive(element: HTMLElement): boolean {
    return this.activeElements.has(element);
  }

  getActiveElements(): HTMLElement[] {
    return [...this.activeElements];
  }
}

// Singleton instance
export const keyboardManager = new KeyboardManager();

// Helper functions for common patterns
export function createNavigableList(
  listRef: RefObject<HTMLElement>,
  options: {
    selector?: string;
    orientation?: "horizontal" | "vertical";
    loop?: boolean;
  } = {}
) {
  const {
    selector = '[role="option"], [role="menuitem"], li',
    orientation = "vertical",
    loop = true,
  } = options;

  let currentIndex = 0;

  const getItems = (): HTMLElement[] => {
    if (!listRef.current) return [];
    return [...listRef.current.querySelectorAll<HTMLElement>(selector)];
  };

  const focusItem = (index: number): void => {
    const items = getItems();
    if (items.length === 0) return;

    // Ensure index is within bounds
    if (index < 0) {
      currentIndex = loop ? items.length - 1 : 0;
    } else if (index >= items.length) {
      currentIndex = loop ? 0 : items.length - 1;
    } else {
      currentIndex = index;
    }

    // Update tabindex attributes
    for (const [i, item] of items.entries()) {
      item.setAttribute("tabindex", i === currentIndex ? "0" : "-1");
    }

    // Focus the current item
    items[currentIndex].focus();
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    const items = getItems();
    if (items.length === 0) return;

    switch (event.key) {
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.preventDefault();
          focusItem(currentIndex + 1);
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.preventDefault();
          focusItem(currentIndex - 1);
        }
        break;
      }
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.preventDefault();
          focusItem(currentIndex + 1);
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.preventDefault();
          focusItem(currentIndex - 1);
        }
        break;
      }
      case "Home": {
        event.preventDefault();
        focusItem(0);
        break;
      }
      case "End": {
        event.preventDefault();
        focusItem(items.length - 1);
        break;
      }
    }
  };

  return {
    initialize: () => {
      const list = listRef.current;
      if (!list) return;

      list.addEventListener("keydown", handleKeyDown);
      keyboardManager.registerElement(list, {
        arrowKeys: true,
        homeEndKeys: true,
        rovingTabIndex: true,
      });

      // Initialize first item as focusable
      focusItem(0);
    },
    cleanup: () => {
      const list = listRef.current;
      if (!list) return;

      list.removeEventListener("keydown", handleKeyDown);
      keyboardManager.unregisterElement(list);
    },
    focusNext: () => focusItem(currentIndex + 1),
    focusPrevious: () => focusItem(currentIndex - 1),
    focusFirst: () => focusItem(0),
    focusLast: () => focusItem(getItems().length - 1),
  };
}

export function createMenuNavigation(
  menuRef: RefObject<HTMLElement>,
  options: {
    orientation?: "horizontal" | "vertical";
    submenuSelector?: string;
    itemSelector?: string;
  } = {}
) {
  const {
    orientation = "vertical",
    submenuSelector = '[role="menu"]',
    itemSelector = '[role="menuitem"]',
  } = options;

  const navigation = createNavigableList(menuRef, {
    selector: itemSelector,
    orientation,
    loop: false,
  });

  const handleSubmenuNavigation = (event: KeyboardEvent): void => {
    const menu = menuRef.current;
    if (!menu) return;

    const activeElement = document.activeElement as HTMLElement;
    const hasSubmenu = activeElement.querySelector(submenuSelector);

    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "vertical" && hasSubmenu) {
          event.preventDefault();
          const submenu = activeElement.querySelector<HTMLElement>(submenuSelector);
          const firstItem = submenu?.querySelector<HTMLElement>(itemSelector);
          firstItem?.focus();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "vertical") {
          const parentMenu = activeElement.closest(submenuSelector)?.parentElement;
          if (parentMenu && menu.contains(parentMenu)) {
            event.preventDefault();
            (parentMenu as HTMLElement).focus();
          }
        }
        break;
      }
      case "Enter":
      case " ": {
        if (hasSubmenu) {
          event.preventDefault();
          const submenu = activeElement.querySelector<HTMLElement>(submenuSelector);
          const firstItem = submenu?.querySelector<HTMLElement>(itemSelector);
          firstItem?.focus();
        }
        break;
      }
    }
  };

  return {
    initialize: () => {
      navigation.initialize();
      const menu = menuRef.current;
      if (!menu) return;

      menu.addEventListener("keydown", handleSubmenuNavigation);
    },
    cleanup: () => {
      navigation.cleanup();
      const menu = menuRef.current;
      if (!menu) return;

      menu.removeEventListener("keydown", handleSubmenuNavigation);
    },
  };
}
