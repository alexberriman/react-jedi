import { AriaAttributes } from "react";

// Common ARIA attribute sets
export type AriaProps = AriaAttributes & {
  // Additional custom accessibility properties
  role?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
};

// Creates an object with role and other ARIA properties, avoiding repetitive assignments
function createAriaPropsObject(
  role: string | undefined,
  ...entries: Array<[string, unknown]>
): AriaProps {
  const props: Record<string, unknown> = {};
  if (role) props.role = role;

  for (const [key, value] of entries) {
    if (value !== undefined && value !== null) {
      props[key] = value;
    }
  }

  return props as AriaProps;
}

// Helper function to apply ARIA attributes to components
export function getAriaProps(
  options: {
    label?: string;
    labelledBy?: string;
    describedBy?: string;
    controls?: string;
    expanded?: boolean;
    selected?: boolean;
    checked?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    live?: "polite" | "assertive" | "off";
    role?: string;
    level?: number;
    orientation?: "horizontal" | "vertical";
    valueMin?: number;
    valueMax?: number;
    valueNow?: number;
    multiSelectable?: boolean;
    pressed?: boolean | "mixed";
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    busy?: boolean;
    current?: boolean | "page" | "step" | "location" | "date" | "time";
  } = {}
): AriaProps {
  return createAriaPropsObject(
    options.role,
    ["aria-label", options.label],
    ["aria-labelledby", options.labelledBy],
    ["aria-describedby", options.describedBy],
    ["aria-controls", options.controls],
    ["aria-expanded", options.expanded],
    ["aria-selected", options.selected],
    ["aria-checked", options.checked],
    ["aria-disabled", options.disabled],
    ["aria-hidden", options.hidden],
    ["aria-live", options.live],
    ["aria-level", options.level],
    ["aria-orientation", options.orientation],
    ["aria-valuemin", options.valueMin],
    ["aria-valuemax", options.valueMax],
    ["aria-valuenow", options.valueNow],
    ["aria-multiselectable", options.multiSelectable],
    ["aria-pressed", options.pressed],
    ["aria-readonly", options.readOnly],
    ["aria-required", options.required],
    ["aria-invalid", options.invalid],
    ["aria-busy", options.busy],
    ["aria-current", options.current]
  );
}

// Role-specific helper functions
export function getButtonAriaProps(
  options: {
    pressed?: boolean;
    expanded?: boolean;
    label?: string;
    describedBy?: string;
    disabled?: boolean;
  } = {}
): AriaProps {
  return getAriaProps({
    role: "button",
    pressed: options.pressed,
    expanded: options.expanded,
    label: options.label,
    describedBy: options.describedBy,
    disabled: options.disabled,
  });
}

export function getNavigationAriaProps(
  options: {
    label?: string;
    current?: "page" | "step" | "location";
  } = {}
): AriaProps {
  return getAriaProps({
    role: "navigation",
    label: options.label,
    current: options.current,
  });
}

export function getAlertAriaProps(
  options: {
    live?: "polite" | "assertive" | "off";
    role?: "alert" | "alertdialog" | "status";
  } = {}
): AriaProps {
  return getAriaProps({
    role: options.role || "alert",
    live: options.live || "polite",
  });
}

export function getFormControlAriaProps(
  options: {
    invalid?: boolean;
    required?: boolean;
    readOnly?: boolean;
    describedBy?: string;
    labelledBy?: string;
    label?: string;
  } = {}
): AriaProps {
  return getAriaProps({
    invalid: options.invalid,
    required: options.required,
    readOnly: options.readOnly,
    describedBy: options.describedBy,
    labelledBy: options.labelledBy,
    label: options.label,
  });
}

export function getListAriaProps(
  options: {
    role?: "list" | "menu" | "listbox";
    orientation?: "horizontal" | "vertical";
    multiSelectable?: boolean;
    label?: string;
  } = {}
): AriaProps {
  return getAriaProps({
    role: options.role || "list",
    orientation: options.orientation,
    multiSelectable: options.multiSelectable,
    label: options.label,
  });
}

export function getHeadingAriaProps(level: number, options: { label?: string } = {}): AriaProps {
  return getAriaProps({
    role: "heading",
    level,
    label: options.label,
  });
}

export function getProgressAriaProps(
  options: {
    valueMin?: number;
    valueMax?: number;
    valueNow?: number;
    label?: string;
  } = {}
): AriaProps {
  return getAriaProps({
    role: "progressbar",
    valueMin: options.valueMin ?? 0,
    valueMax: options.valueMax ?? 100,
    valueNow: options.valueNow,
    label: options.label,
  });
}

export function getTabsAriaProps(
  options: {
    orientation?: "horizontal" | "vertical";
    label?: string;
  } = {}
): AriaProps {
  return getAriaProps({
    role: "tablist",
    orientation: options.orientation || "horizontal",
    label: options.label,
  });
}

export function getTabAriaProps(
  options: {
    selected?: boolean;
    controls?: string;
    label?: string;
  } = {}
): AriaProps {
  return getAriaProps({
    role: "tab",
    selected: options.selected,
    controls: options.controls,
    label: options.label,
  });
}

export function getTabPanelAriaProps(
  options: {
    labelledBy?: string;
    hidden?: boolean;
  } = {}
): AriaProps {
  return getAriaProps({
    role: "tabpanel",
    labelledBy: options.labelledBy,
    hidden: options.hidden,
  });
}

// Keyboard navigation helpers
export function handleArrowKeyNavigation(
  event: KeyboardEvent,
  options: {
    orientation?: "horizontal" | "vertical";
    currentIndex: number;
    totalItems: number;
    onIndexChange: (index: number) => void;
    loop?: boolean;
  }
) {
  const {
    orientation = "horizontal",
    currentIndex,
    totalItems,
    onIndexChange,
    loop = true,
  } = options;

  const isHorizontal = orientation === "horizontal";
  const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
  const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

  let newIndex = currentIndex;

  switch (event.key) {
    case nextKey: {
      event.preventDefault();
      newIndex = currentIndex + 1;
      if (newIndex >= totalItems) {
        newIndex = loop ? 0 : totalItems - 1;
      }
      break;
    }
    case prevKey: {
      event.preventDefault();
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = loop ? totalItems - 1 : 0;
      }
      break;
    }
    case "Home": {
      event.preventDefault();
      newIndex = 0;
      break;
    }
    case "End": {
      event.preventDefault();
      newIndex = totalItems - 1;
      break;
    }
    default: {
      return;
    }
  }

  if (newIndex !== currentIndex) {
    onIndexChange(newIndex);
  }
}

// Live region announcements
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.style.position = "absolute";
  announcement.style.left = "-9999px";
  announcement.style.width = "1px";
  announcement.style.height = "1px";
  announcement.style.overflow = "hidden";

  announcement.textContent = message;
  document.body.append(announcement);

  // Remove the announcement after a short delay
  globalThis.setTimeout(() => {
    announcement.remove();
  }, 1000);
}

// Focus management utilities
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    "a[href]:not([disabled])",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];

  return [...container.querySelectorAll<HTMLElement>(focusableSelectors.join(","))];
}

export function trapFocus(container: HTMLElement): (() => void) | undefined {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return undefined;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements.at(-1);

  function handleTabKey(event: KeyboardEvent) {
    if (event.key !== "Tab") return;

    if (event.shiftKey) {
      if (document.activeElement === (firstElement as Element)) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === (lastElement as Element)) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  container.addEventListener("keydown", handleTabKey);

  return () => {
    container.removeEventListener("keydown", handleTabKey);
  };
}
