import { RefObject, useEffect, useRef, useState } from "react";

export interface RovingTabIndexOptions {
  orientation?: "horizontal" | "vertical" | "both";
  loop?: boolean;
  rtl?: boolean;
  preventScroll?: boolean;
}

export function useRovingTabIndex(
  containerRef: RefObject<HTMLElement>,
  options: RovingTabIndexOptions = {}
) {
  const { orientation = "both", loop = true, rtl = false, preventScroll = false } = options;

  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper function to calculate next index - defined inside useEffect to avoid dependency warnings
    const calculateNextIndex = (
      currentIndex: number,
      direction: number,
      maxIndex: number
    ): number => {
      let nextIndex = currentIndex + direction;

      if (nextIndex > maxIndex) {
        return loop ? 0 : maxIndex;
      } else if (nextIndex < 0) {
        return loop ? maxIndex : 0;
      }

      return nextIndex;
    };

    // Helper function to check if navigation is allowed
    const isNavigationAllowed = (key: string): boolean => {
      switch (key) {
        case "ArrowDown":
        case "ArrowUp": {
          return orientation === "vertical" || orientation === "both";
        }
        case "ArrowRight":
        case "ArrowLeft": {
          return orientation === "horizontal" || orientation === "both";
        }
        default: {
          return true;
        }
      }
    };

    // Helper function to get navigation direction
    const getNavigationDirection = (key: string): number => {
      switch (key) {
        case "ArrowDown": {
          return 1;
        }
        case "ArrowUp": {
          return -1;
        }
        case "ArrowRight": {
          return rtl ? -1 : 1;
        }
        case "ArrowLeft": {
          return rtl ? 1 : -1;
        }
        default: {
          return 0;
        }
      }
    };

    // Get all focusable items within the container
    const updateItems = () => {
      const selector = '[role="option"], [role="menuitem"], [role="tab"], [data-roving-tabindex]';
      itemsRef.current = [...container.querySelectorAll<HTMLElement>(selector)];

      // Update tabindex attributes
      for (const [index, item] of itemsRef.current.entries()) {
        item.setAttribute("tabindex", index === focusedIndex ? "0" : "-1");
      }
    };

    updateItems();

    // MutationObserver to track DOM changes
    const observer = new MutationObserver(updateItems);
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["role", "data-roving-tabindex"],
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      let nextIndex = focusedIndex;
      const lastIndex = items.length - 1;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft": {
          if (isNavigationAllowed(event.key)) {
            event.preventDefault();
            const direction = getNavigationDirection(event.key);
            nextIndex = calculateNextIndex(focusedIndex, direction, lastIndex);
          }
          break;
        }

        case "Home": {
          event.preventDefault();
          nextIndex = 0;
          break;
        }

        case "End": {
          event.preventDefault();
          nextIndex = lastIndex;
          break;
        }

        default: {
          return;
        }
      }

      if (nextIndex !== focusedIndex) {
        setFocusedIndex(nextIndex);
        items[nextIndex].focus({ preventScroll });
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const index = itemsRef.current.indexOf(target);
      if (index !== -1) {
        setFocusedIndex(index);
      }
    };

    // Add event listeners
    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("focusin", handleFocus);

    // Cleanup
    return () => {
      observer.disconnect();
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("focusin", handleFocus);
    };
  }, [containerRef, focusedIndex, orientation, loop, rtl, preventScroll]);

  return {
    focusedIndex,
    setFocusedIndex,
    focusNext: () => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      let nextIndex = focusedIndex + 1;
      if (nextIndex >= items.length) {
        nextIndex = loop ? 0 : items.length - 1;
      }

      setFocusedIndex(nextIndex);
      items[nextIndex].focus({ preventScroll });
    },
    focusPrevious: () => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      let nextIndex = focusedIndex - 1;
      if (nextIndex < 0) {
        nextIndex = loop ? items.length - 1 : 0;
      }

      setFocusedIndex(nextIndex);
      items[nextIndex].focus({ preventScroll });
    },
    focusFirst: () => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      setFocusedIndex(0);
      items[0].focus({ preventScroll });
    },
    focusLast: () => {
      const items = itemsRef.current;
      if (items.length === 0) return;

      const lastIndex = items.length - 1;
      setFocusedIndex(lastIndex);
      items[lastIndex].focus({ preventScroll });
    },
  };
}
