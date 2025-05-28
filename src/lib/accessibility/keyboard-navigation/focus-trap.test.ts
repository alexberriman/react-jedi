import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react/pure";
import {
  useFocusTrap,
  getFocusableElements,
  getFirstFocusableElement,
  getLastFocusableElement,
} from "./focus-trap";

describe("Focus Trap Utilities", () => {
  describe("getFocusableElements", () => {
    it("should find all focusable elements in a container", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button>Button 1</button>
        <input type="text" />
        <a href="#">Link</a>
        <textarea></textarea>
        <button disabled>Disabled Button</button>
        <div tabindex="0">Focusable Div</div>
        <div tabindex="-1">Non-focusable Div</div>
      `;
      document.body.append(container);

      const focusableElements = getFocusableElements(container);

      expect(focusableElements).toHaveLength(5);
      expect(focusableElements[0].tagName).toBe("BUTTON");
      expect(focusableElements[1].tagName).toBe("INPUT");
      expect(focusableElements[2].tagName).toBe("A");
      expect(focusableElements[3].tagName).toBe("TEXTAREA");
      expect(focusableElements[4].tagName).toBe("DIV");

      container.remove();
    });

    it("should filter out hidden elements", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button>Visible Button</button>
        <button style="display: none;">Hidden Button</button>
        <button style="visibility: hidden;">Invisible Button</button>
      `;
      document.body.append(container);

      const focusableElements = getFocusableElements(container);

      expect(focusableElements).toHaveLength(1);
      expect(focusableElements[0].textContent).toBe("Visible Button");

      container.remove();
    });
  });

  describe("getFirstFocusableElement", () => {
    it("should return the first focusable element", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <div>Non-focusable</div>
        <button>First Button</button>
        <input type="text" />
      `;
      document.body.append(container);

      const firstElement = getFirstFocusableElement(container);

      expect(firstElement?.tagName).toBe("BUTTON");
      expect(firstElement?.textContent).toBe("First Button");

      container.remove();
    });

    it("should return null if no focusable elements", () => {
      const container = document.createElement("div");
      container.innerHTML = "<div>Non-focusable</div>";

      const firstElement = getFirstFocusableElement(container);
      expect(firstElement).toBeNull();
    });
  });

  describe("getLastFocusableElement", () => {
    it("should return the last focusable element", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button>First Button</button>
        <input type="text" />
        <a href="#">Last Link</a>
      `;
      document.body.append(container);

      const lastElement = getLastFocusableElement(container);

      expect(lastElement?.tagName).toBe("A");
      expect(lastElement?.textContent).toBe("Last Link");

      container.remove();
    });
  });

  describe("useFocusTrap", () => {
    beforeEach(() => {
      // Clear the DOM
      document.body.innerHTML = "";
    });

    it("should trap focus within container", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      `;
      document.body.append(container);

      const containerRef = { current: container };

      renderHook(() => useFocusTrap(containerRef));

      // Wait for the focus to be set (uses setTimeout)
      act(() => {
        vi.runAllTimers();
      });

      // Focus should be trapped within the container
      const buttons = container.querySelectorAll("button");
      expect(document.activeElement).toBe(buttons[0]);
    });

    it("should handle Tab key navigation", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button>Button 1</button>
        <button>Button 2</button>
      `;
      document.body.append(container);

      const containerRef = { current: container };

      renderHook(() => useFocusTrap(containerRef));

      const buttons = container.querySelectorAll("button");
      buttons[1].focus();

      // Simulate Tab key press
      const tabEvent = new KeyboardEvent("keydown", { key: "Tab" });
      document.dispatchEvent(tabEvent);

      // Should wrap to first element
      expect(document.activeElement).toBe(buttons[0]);
    });

    it("should handle Escape key when enabled", () => {
      const container = document.createElement("div");
      container.innerHTML = "<button>Button</button>";
      document.body.append(container);

      // Set a focusable element outside the trap
      const outsideButton = document.createElement("button");
      outsideButton.textContent = "Outside";
      document.body.append(outsideButton);
      outsideButton.focus();

      const containerRef = { current: container };

      renderHook(() => useFocusTrap(containerRef, { escapeDeactivates: true }));

      // Simulate Escape key press
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escapeEvent);

      // Focus should return to previously focused element
      expect(document.activeElement).toBe(outsideButton);
    });
  });
});
