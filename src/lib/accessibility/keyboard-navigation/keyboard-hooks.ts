import { RefObject, useEffect, useRef } from "react";

export interface KeyboardShortcut {
  key: string;
  modifiers?: ("ctrl" | "alt" | "shift" | "meta")[];
  handler: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export function useEscapeKey(handler: () => void, options: { enabled?: boolean } = {}) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler, enabled]);
}

export function useArrowNavigation(
  containerRef: RefObject<HTMLElement>,
  options: {
    orientation?: "horizontal" | "vertical" | "both";
    onNavigate?: (direction: "up" | "down" | "left" | "right") => void;
    enabled?: boolean;
  } = {}
) {
  const { orientation = "both", onNavigate, enabled = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": {
          if (orientation === "vertical" || orientation === "both") {
            event.preventDefault();
            onNavigate?.("up");
          }
          break;
        }
        case "ArrowDown": {
          if (orientation === "vertical" || orientation === "both") {
            event.preventDefault();
            onNavigate?.("down");
          }
          break;
        }
        case "ArrowLeft": {
          if (orientation === "horizontal" || orientation === "both") {
            event.preventDefault();
            onNavigate?.("left");
          }
          break;
        }
        case "ArrowRight": {
          if (orientation === "horizontal" || orientation === "both") {
            event.preventDefault();
            onNavigate?.("right");
          }
          break;
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, orientation, onNavigate, enabled]);
}

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: { enabled?: boolean; scope?: "global" | "local"; target?: RefObject<HTMLElement> } = {}
) {
  const { enabled = true, scope = "global", target } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const modifiersMatch =
          !shortcut.modifiers ||
          shortcut.modifiers.every((modifier) => {
            switch (modifier) {
              case "ctrl": {
                return event.ctrlKey;
              }
              case "alt": {
                return event.altKey;
              }
              case "shift": {
                return event.shiftKey;
              }
              case "meta": {
                return event.metaKey;
              }
              default: {
                return false;
              }
            }
          });

        if (event.key === shortcut.key && modifiersMatch) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          if (shortcut.stopPropagation) {
            event.stopPropagation();
          }
          shortcut.handler(event);
          break;
        }
      }
    };

    const element = scope === "global" ? document : target?.current;
    if (!element) return;

    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, enabled, scope, target]);
}

export function useHomeEndKeys(
  containerRef: RefObject<HTMLElement>,
  options: {
    onHome?: () => void;
    onEnd?: () => void;
    enabled?: boolean;
  } = {}
) {
  const { onHome, onEnd, enabled = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Home": {
          event.preventDefault();
          onHome?.();
          break;
        }
        case "End": {
          event.preventDefault();
          onEnd?.();
          break;
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, onHome, onEnd, enabled]);
}

export function usePageNavigation(
  containerRef: RefObject<HTMLElement>,
  options: {
    onPageUp?: () => void;
    onPageDown?: () => void;
    enabled?: boolean;
  } = {}
) {
  const { onPageUp, onPageDown, enabled = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "PageUp": {
          event.preventDefault();
          onPageUp?.();
          break;
        }
        case "PageDown": {
          event.preventDefault();
          onPageDown?.();
          break;
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, onPageUp, onPageDown, enabled]);
}

export function useTypeahead(
  containerRef: RefObject<HTMLElement>,
  options: {
    onMatch?: (match: string) => void;
    timeout?: number;
    enabled?: boolean;
  } = {}
) {
  const { onMatch, timeout = 1000, enabled = true } = options;
  const searchStringRef = useRef("");
  const timeoutIdRef = useRef<ReturnType<typeof globalThis.setTimeout>>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle single character keys
      if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
        searchStringRef.current += event.key.toLowerCase();

        // Clear previous timeout
        if (timeoutIdRef.current) {
          globalThis.clearTimeout(timeoutIdRef.current);
        }

        // Set new timeout to clear search string
        timeoutIdRef.current = globalThis.setTimeout(() => {
          searchStringRef.current = "";
        }, timeout);

        onMatch?.(searchStringRef.current);
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (timeoutIdRef.current) {
        globalThis.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [containerRef, onMatch, timeout, enabled]);

  return {
    searchString: searchStringRef.current,
    clearSearch: () => {
      searchStringRef.current = "";
      if (timeoutIdRef.current) {
        globalThis.clearTimeout(timeoutIdRef.current);
      }
    },
  };
}
