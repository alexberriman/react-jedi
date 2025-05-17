import { RefObject, useEffect, useRef } from "react";

export interface FocusTrapOptions {
  initialFocus?: RefObject<HTMLElement>;
  fallbackFocus?: RefObject<HTMLElement>;
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
  allowOutsideClick?: boolean;
  returnFocusOnDeactivate?: boolean;
  preventScroll?: boolean;
}

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "details",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(", ");

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = [...container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)];
  return elements.filter((element) => {
    const style = globalThis.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

export function getFirstFocusableElement(container: HTMLElement): HTMLElement | null {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
}

export function getLastFocusableElement(container: HTMLElement): HTMLElement | null {
  const focusableElements = getFocusableElements(container);
  return focusableElements.at(-1) || null;
}

export function useFocusTrap(containerRef: RefObject<HTMLElement>, options: FocusTrapOptions = {}) {
  const {
    initialFocus,
    fallbackFocus,
    escapeDeactivates = true,
    clickOutsideDeactivates = false,
    allowOutsideClick = false,
    returnFocusOnDeactivate = true,
    preventScroll = false,
  } = options;

  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store the previously focused element
    previousActiveElementRef.current = document.activeElement as HTMLElement;
    isActiveRef.current = true;

    // Set initial focus
    const setInitialFocus = () => {
      if (initialFocus?.current) {
        initialFocus.current.focus({ preventScroll });
      } else if (fallbackFocus?.current) {
        fallbackFocus.current.focus({ preventScroll });
      } else {
        const firstFocusable = getFirstFocusableElement(container);
        if (firstFocusable) {
          firstFocusable.focus({ preventScroll });
        }
      }
    };

    // Use a small delay to ensure the DOM is ready
    const timeoutId = globalThis.setTimeout(setInitialFocus, 0);

    // Handle Tab key navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActiveRef.current) return;

      if (event.key === "Tab") {
        const focusableElements = getFocusableElements(container);
        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus({ preventScroll });
        } else if (!event.shiftKey && document.activeElement === (lastElement as HTMLElement)) {
          event.preventDefault();
          firstElement.focus({ preventScroll });
        }
      } else if (event.key === "Escape" && escapeDeactivates) {
        isActiveRef.current = false;
        if (returnFocusOnDeactivate && previousActiveElementRef.current) {
          previousActiveElementRef.current.focus({ preventScroll });
        }
      }
    };

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (!isActiveRef.current || allowOutsideClick) return;

      const target = event.target as Node;
      if (!container.contains(target) && clickOutsideDeactivates) {
        isActiveRef.current = false;
        if (returnFocusOnDeactivate && previousActiveElementRef.current) {
          previousActiveElementRef.current.focus({ preventScroll });
        }
      } else if (!container.contains(target)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup
    return () => {
      globalThis.clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);

      if (returnFocusOnDeactivate && previousActiveElementRef.current && isActiveRef.current) {
        previousActiveElementRef.current.focus({ preventScroll });
      }
    };
  }, [
    containerRef,
    initialFocus,
    fallbackFocus,
    escapeDeactivates,
    clickOutsideDeactivates,
    allowOutsideClick,
    returnFocusOnDeactivate,
    preventScroll,
  ]);

  return {
    deactivate: () => {
      isActiveRef.current = false;
      if (returnFocusOnDeactivate && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus({ preventScroll });
      }
    },
  };
}
