import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useEscapeKey,
  useArrowNavigation,
  useKeyboardShortcuts,
  useHomeEndKeys,
  usePageNavigation,
  useTypeahead,
} from "./keyboard-hooks";

describe("Keyboard Hooks", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("useEscapeKey", () => {
    it("should call handler on Escape key press", () => {
      const handler = vi.fn();
      renderHook(() => useEscapeKey(handler));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not call handler when disabled", () => {
      const handler = vi.fn();
      renderHook(() => useEscapeKey(handler, { enabled: false }));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("useArrowNavigation", () => {
    it("should handle arrow key navigation", () => {
      const container = document.createElement("div");
      document.body.append(container);

      const containerRef = { current: container };

      const onNavigate = vi.fn();
      renderHook(() => useArrowNavigation(containerRef, { onNavigate }));

      // Test all arrow keys
      const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      const expectedDirections = ["up", "down", "left", "right"];

      for (const [index, key] of directions.entries()) {
        const event = new KeyboardEvent("keydown", { key });
        container.dispatchEvent(event);
        expect(onNavigate).toHaveBeenCalledWith(expectedDirections[index]);
      }
    });

    it("should respect orientation setting", () => {
      const container = document.createElement("div");
      document.body.append(container);

      const containerRef = { current: container };

      const onNavigate = vi.fn();
      renderHook(() =>
        useArrowNavigation(containerRef, {
          orientation: "horizontal",
          onNavigate,
        })
      );

      // Vertical keys should not trigger
      const verticalEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });
      container.dispatchEvent(verticalEvent);
      expect(onNavigate).not.toHaveBeenCalled();

      // Horizontal keys should trigger
      const horizontalEvent = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      container.dispatchEvent(horizontalEvent);
      expect(onNavigate).toHaveBeenCalledWith("left");
    });
  });

  describe("useKeyboardShortcuts", () => {
    it("should handle keyboard shortcuts", () => {
      const handler = vi.fn();
      const shortcuts = [{ key: "s", modifiers: ["ctrl"] as const, handler }];

      renderHook(() => useKeyboardShortcuts(shortcuts));

      const event = new KeyboardEvent("keydown", {
        key: "s",
        ctrlKey: true,
      });
      document.dispatchEvent(event);

      expect(handler).toHaveBeenCalledWith(event);
    });

    it("should handle multiple modifiers", () => {
      const handler = vi.fn();
      const shortcuts = [{ key: "s", modifiers: ["ctrl", "shift"] as const, handler }];

      renderHook(() => useKeyboardShortcuts(shortcuts));

      // Wrong modifier combination
      const wrongEvent = new KeyboardEvent("keydown", {
        key: "s",
        ctrlKey: true,
      });
      document.dispatchEvent(wrongEvent);
      expect(handler).not.toHaveBeenCalled();

      // Correct modifier combination
      const correctEvent = new KeyboardEvent("keydown", {
        key: "s",
        ctrlKey: true,
        shiftKey: true,
      });
      document.dispatchEvent(correctEvent);
      expect(handler).toHaveBeenCalledWith(correctEvent);
    });

    it("should handle preventDefault and stopPropagation", () => {
      const handler = vi.fn();
      const shortcuts = [
        {
          key: "s",
          handler,
          preventDefault: true,
          stopPropagation: true,
        },
      ];

      renderHook(() => useKeyboardShortcuts(shortcuts));

      const event = new KeyboardEvent("keydown", {
        key: "s",
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(event, "preventDefault");
      const stopPropagationSpy = vi.spyOn(event, "stopPropagation");

      document.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe("useHomeEndKeys", () => {
    it("should handle Home and End keys", () => {
      const container = document.createElement("div");
      document.body.append(container);

      const containerRef = { current: container };

      const onHome = vi.fn();
      const onEnd = vi.fn();

      renderHook(() => useHomeEndKeys(containerRef, { onHome, onEnd }));

      const homeEvent = new KeyboardEvent("keydown", { key: "Home" });
      container.dispatchEvent(homeEvent);
      expect(onHome).toHaveBeenCalled();

      const endEvent = new KeyboardEvent("keydown", { key: "End" });
      container.dispatchEvent(endEvent);
      expect(onEnd).toHaveBeenCalled();
    });
  });

  describe("usePageNavigation", () => {
    it("should handle Page Up/Down keys", () => {
      const container = document.createElement("div");
      document.body.append(container);

      const containerRef = { current: container };

      const onPageUp = vi.fn();
      const onPageDown = vi.fn();

      renderHook(() => usePageNavigation(containerRef, { onPageUp, onPageDown }));

      const pageUpEvent = new KeyboardEvent("keydown", { key: "PageUp" });
      container.dispatchEvent(pageUpEvent);
      expect(onPageUp).toHaveBeenCalled();

      const pageDownEvent = new KeyboardEvent("keydown", { key: "PageDown" });
      container.dispatchEvent(pageDownEvent);
      expect(onPageDown).toHaveBeenCalled();
    });
  });

  describe("useTypeahead", () => {
    it("should handle typeahead search", () => {
      vi.useFakeTimers();

      const container = document.createElement("div");
      document.body.append(container);

      const containerRef = { current: container };

      const onMatch = vi.fn();
      renderHook(() => useTypeahead(containerRef, { onMatch, timeout: 1000 }));

      // Type "test"
      const keys = ["t", "e", "s", "t"];
      for (const [index, key] of keys.entries()) {
        const event = new KeyboardEvent("keydown", { key });
        container.dispatchEvent(event);
        expect(onMatch).toHaveBeenCalledWith(keys.slice(0, index + 1).join(""));
      }

      // Wait for timeout
      vi.advanceTimersByTime(1000);

      // Type again after timeout
      const newEvent = new KeyboardEvent("keydown", { key: "a" });
      container.dispatchEvent(newEvent);
      expect(onMatch).toHaveBeenCalledWith("a");

      vi.useRealTimers();
    });

    it("should clear search string", () => {
      const container = document.createElement("div");
      document.body.append(container);

      const containerRef = { current: container };

      const onMatch = vi.fn();
      const { result } = renderHook(() => useTypeahead(containerRef, { onMatch }));

      // Type something
      const event = new KeyboardEvent("keydown", { key: "t" });
      container.dispatchEvent(event);

      // Clear search
      result.current.clearSearch();

      // Type again
      const newEvent = new KeyboardEvent("keydown", { key: "a" });
      container.dispatchEvent(newEvent);

      // Should only have 'a', not 'ta'
      expect(onMatch).toHaveBeenLastCalledWith("a");
    });
  });
});
