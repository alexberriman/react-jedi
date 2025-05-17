import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getAriaProps,
  getButtonAriaProps,
  getNavigationAriaProps,
  getAlertAriaProps,
  getFormControlAriaProps,
  getListAriaProps,
  getHeadingAriaProps,
  getProgressAriaProps,
  getTabsAriaProps,
  getTabAriaProps,
  getTabPanelAriaProps,
  handleArrowKeyNavigation,
  announceToScreenReader,
  trapFocus,
} from "./aria-attributes";
import { getFocusableElements } from "./focus-management";

describe("ARIA Attributes", () => {
  describe("getAriaProps", () => {
    it("should return empty object when no options provided", () => {
      expect(getAriaProps()).toEqual({});
    });

    it("should include all provided ARIA attributes", () => {
      const result = getAriaProps({
        label: "Test label",
        labelledBy: "label-id",
        describedBy: "description-id",
        controls: "controlled-id",
        expanded: true,
        selected: false,
        checked: true,
        disabled: false,
        hidden: true,
        live: "polite",
        role: "button",
        level: 3,
        orientation: "horizontal",
        valueMin: 0,
        valueMax: 100,
        valueNow: 50,
        multiSelectable: true,
        pressed: false,
        readOnly: true,
        required: true,
        invalid: false,
        busy: true,
        current: "page",
      });

      expect(result).toEqual({
        "aria-label": "Test label",
        "aria-labelledby": "label-id",
        "aria-describedby": "description-id",
        "aria-controls": "controlled-id",
        "aria-expanded": true,
        "aria-selected": false,
        "aria-checked": true,
        "aria-disabled": false,
        "aria-hidden": true,
        "aria-live": "polite",
        role: "button",
        "aria-level": 3,
        "aria-orientation": "horizontal",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 50,
        "aria-multiselectable": true,
        "aria-pressed": false,
        "aria-readonly": true,
        "aria-required": true,
        "aria-invalid": false,
        "aria-busy": true,
        "aria-current": "page",
      });
    });

    it("should exclude undefined values", () => {
      const result = getAriaProps({
        label: "Test",
        expanded: undefined,
        selected: true,
      });

      expect(result).toEqual({
        "aria-label": "Test",
        "aria-selected": true,
      });
    });
  });

  describe("Role-specific helpers", () => {
    it("getButtonAriaProps should return button role with attributes", () => {
      const result = getButtonAriaProps({
        pressed: true,
        expanded: false,
        label: "Click me",
        disabled: true,
      });

      expect(result).toEqual({
        role: "button",
        "aria-pressed": true,
        "aria-expanded": false,
        "aria-label": "Click me",
        "aria-disabled": true,
      });
    });

    it("getNavigationAriaProps should return navigation role", () => {
      const result = getNavigationAriaProps({
        label: "Main navigation",
        current: "page",
      });

      expect(result).toEqual({
        role: "navigation",
        "aria-label": "Main navigation",
        "aria-current": "page",
      });
    });

    it("getAlertAriaProps should return alert role with live region", () => {
      const result = getAlertAriaProps({
        live: "assertive",
        role: "status",
      });

      expect(result).toEqual({
        role: "status",
        "aria-live": "assertive",
      });
    });

    it("getFormControlAriaProps should return form-related attributes", () => {
      const result = getFormControlAriaProps({
        invalid: true,
        required: true,
        readOnly: false,
        label: "Email address",
      });

      expect(result).toEqual({
        "aria-invalid": true,
        "aria-required": true,
        "aria-readonly": false,
        "aria-label": "Email address",
      });
    });

    it("getListAriaProps should return list role with attributes", () => {
      const result = getListAriaProps({
        role: "menu",
        orientation: "vertical",
        multiSelectable: true,
        label: "Options menu",
      });

      expect(result).toEqual({
        role: "menu",
        "aria-orientation": "vertical",
        "aria-multiselectable": true,
        "aria-label": "Options menu",
      });
    });

    it("getHeadingAriaProps should return heading role with level", () => {
      const result = getHeadingAriaProps(2, { label: "Section title" });

      expect(result).toEqual({
        role: "heading",
        "aria-level": 2,
        "aria-label": "Section title",
      });
    });

    it("getProgressAriaProps should return progressbar role with values", () => {
      const result = getProgressAriaProps({
        valueMin: 0,
        valueMax: 100,
        valueNow: 75,
        label: "Loading progress",
      });

      expect(result).toEqual({
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 75,
        "aria-label": "Loading progress",
      });
    });

    it("getTabsAriaProps should return tablist role", () => {
      const result = getTabsAriaProps({
        orientation: "horizontal",
        label: "Product tabs",
      });

      expect(result).toEqual({
        role: "tablist",
        "aria-orientation": "horizontal",
        "aria-label": "Product tabs",
      });
    });

    it("getTabAriaProps should return tab role", () => {
      const result = getTabAriaProps({
        selected: true,
        controls: "panel-1",
        label: "Overview",
      });

      expect(result).toEqual({
        role: "tab",
        "aria-selected": true,
        "aria-controls": "panel-1",
        "aria-label": "Overview",
      });
    });

    it("getTabPanelAriaProps should return tabpanel role", () => {
      const result = getTabPanelAriaProps({
        labelledBy: "tab-1",
        hidden: false,
      });

      expect(result).toEqual({
        role: "tabpanel",
        "aria-labelledby": "tab-1",
        "aria-hidden": false,
      });
    });
  });

  describe("handleArrowKeyNavigation", () => {
    const mockOnIndexChange = vi.fn();
    const mockPreventDefault = vi.fn();

    beforeEach(() => {
      mockOnIndexChange.mockClear();
      mockPreventDefault.mockClear();
    });

    const createKeyEvent = (key: string) =>
      ({
        key,
        preventDefault: mockPreventDefault,
      }) as unknown as KeyboardEvent;

    it("should handle horizontal arrow navigation", () => {
      handleArrowKeyNavigation(createKeyEvent("ArrowRight"), {
        orientation: "horizontal",
        currentIndex: 0,
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
      });

      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockOnIndexChange).toHaveBeenCalledWith(1);
    });

    it("should handle vertical arrow navigation", () => {
      handleArrowKeyNavigation(createKeyEvent("ArrowDown"), {
        orientation: "vertical",
        currentIndex: 1,
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
      });

      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockOnIndexChange).toHaveBeenCalledWith(2);
    });

    it("should loop when reaching the end", () => {
      handleArrowKeyNavigation(createKeyEvent("ArrowRight"), {
        orientation: "horizontal",
        currentIndex: 2,
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
        loop: true,
      });

      expect(mockOnIndexChange).toHaveBeenCalledWith(0);
    });

    it("should not loop when loop is false", () => {
      handleArrowKeyNavigation(createKeyEvent("ArrowRight"), {
        orientation: "horizontal",
        currentIndex: 2, // At the last item
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
        loop: false,
      });

      // When not looping and at the last item, it stays at the current index
      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockOnIndexChange).not.toHaveBeenCalled(); // No change since we're staying at the same index
    });

    it("should handle Home key", () => {
      handleArrowKeyNavigation(createKeyEvent("Home"), {
        currentIndex: 2,
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
      });

      expect(mockOnIndexChange).toHaveBeenCalledWith(0);
    });

    it("should handle End key", () => {
      handleArrowKeyNavigation(createKeyEvent("End"), {
        currentIndex: 0,
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
      });

      expect(mockOnIndexChange).toHaveBeenCalledWith(2);
    });

    it("should ignore unhandled keys", () => {
      handleArrowKeyNavigation(createKeyEvent("Enter"), {
        currentIndex: 0,
        totalItems: 3,
        onIndexChange: mockOnIndexChange,
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockOnIndexChange).not.toHaveBeenCalled();
    });
  });

  describe("announceToScreenReader", () => {
    let originalBody: HTMLElement;

    beforeEach(() => {
      originalBody = document.body;
      document.body = document.createElement("body");
    });

    afterEach(() => {
      document.body = originalBody;
    });

    it("should create and remove announcement element", async () => {
      announceToScreenReader("Test announcement", "polite");

      const announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeTruthy();
      expect(announcement?.getAttribute("aria-live")).toBe("polite");
      expect(announcement?.textContent).toBe("Test announcement");

      // Wait for removal
      await new Promise((resolve) => globalThis.setTimeout(resolve, 1100));
      expect(document.querySelector('[role="status"]')).toBeFalsy();
    });
  });

  describe("getFocusableElements", () => {
    it("should return all focusable elements in container", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <a href="#link">Link</a>
        <button>Button</button>
        <button disabled>Disabled Button</button>
        <input type="text" />
        <input type="text" disabled />
        <div tabindex="0">Focusable div</div>
        <div tabindex="-1">Non-focusable div</div>
      `;

      const focusableElements = getFocusableElements(container);
      expect(focusableElements.length).toBe(4);
    });
  });

  describe("trapFocus", () => {
    it("should trap focus within container", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      `;
      document.body.append(container);

      const firstButton = container.querySelector("#first") as HTMLElement;
      const lastButton = container.querySelector("#last") as HTMLElement;

      // Mock activeElement and focus method
      vi.spyOn(firstButton, "focus").mockImplementation(() => {
        Object.defineProperty(document, "activeElement", {
          value: firstButton,
          configurable: true,
          writable: true,
        });
      });
      vi.spyOn(lastButton, "focus").mockImplementation(() => {
        Object.defineProperty(document, "activeElement", {
          value: lastButton,
          configurable: true,
          writable: true,
        });
      });

      const cleanup = trapFocus(container);

      // Simulate Tab from last element
      Object.defineProperty(document, "activeElement", {
        value: lastButton,
        configurable: true,
        writable: true,
      });

      const tabEvent = new KeyboardEvent("keydown", { key: "Tab", shiftKey: false });
      tabEvent.preventDefault = vi.fn();
      container.dispatchEvent(tabEvent);

      expect(firstButton.focus).toHaveBeenCalled();
      expect(tabEvent.preventDefault).toHaveBeenCalled();

      // Simulate Shift+Tab from first element
      Object.defineProperty(document, "activeElement", {
        value: firstButton,
        configurable: true,
        writable: true,
      });

      const shiftTabEvent = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true });
      shiftTabEvent.preventDefault = vi.fn();
      container.dispatchEvent(shiftTabEvent);

      expect(lastButton.focus).toHaveBeenCalled();
      expect(shiftTabEvent.preventDefault).toHaveBeenCalled();

      if (cleanup) {
        cleanup();
      }
      container.remove();
    });
  });
});
