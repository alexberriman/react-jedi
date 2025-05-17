import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRovingTabIndex } from "./roving-tabindex";

describe("useRovingTabIndex", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should manage tabindex for list items", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <ul>
        <li role="option">Item 1</li>
        <li role="option">Item 2</li>
        <li role="option">Item 3</li>
      </ul>
    `;
    document.body.append(container);

    const containerRef = { current: container };

    renderHook(() => useRovingTabIndex(containerRef));

    const items = container.querySelectorAll('[role="option"]');

    // First item should have tabindex="0", others should have tabindex="-1"
    expect(items[0].getAttribute("tabindex")).toBe("0");
    expect(items[1].getAttribute("tabindex")).toBe("-1");
    expect(items[2].getAttribute("tabindex")).toBe("-1");
  });

  it("should handle arrow key navigation", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <ul>
        <li role="option">Item 1</li>
        <li role="option">Item 2</li>
        <li role="option">Item 3</li>
      </ul>
    `;
    document.body.append(container);

    const containerRef = { current: container };

    const { result } = renderHook(() => useRovingTabIndex(containerRef));

    // Simulate ArrowDown key press
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      container.dispatchEvent(event);
    });

    expect(result.current.focusedIndex).toBe(1);
  });

  it("should handle Home and End keys", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <ul>
        <li role="option">Item 1</li>
        <li role="option">Item 2</li>
        <li role="option">Item 3</li>
      </ul>
    `;
    document.body.append(container);

    const containerRef = { current: container };

    const { result } = renderHook(() => useRovingTabIndex(containerRef));

    // Move to middle item
    act(() => {
      result.current.setFocusedIndex(1);
    });

    // Simulate End key press
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "End" });
      container.dispatchEvent(event);
    });

    expect(result.current.focusedIndex).toBe(2);

    // Simulate Home key press
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Home" });
      container.dispatchEvent(event);
    });

    expect(result.current.focusedIndex).toBe(0);
  });

  it("should handle looping when enabled", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <ul>
        <li role="option">Item 1</li>
        <li role="option">Item 2</li>
      </ul>
    `;
    document.body.append(container);

    const containerRef = { current: container };

    const { result } = renderHook(() => useRovingTabIndex(containerRef, { loop: true }));

    // Move to last item
    act(() => {
      result.current.setFocusedIndex(1);
    });

    // Simulate ArrowDown key press (should loop to first)
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      container.dispatchEvent(event);
    });

    expect(result.current.focusedIndex).toBe(0);
  });

  it("should handle RTL direction", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <ul>
        <li role="option">Item 1</li>
        <li role="option">Item 2</li>
        <li role="option">Item 3</li>
      </ul>
    `;
    document.body.append(container);

    const containerRef = { current: container };

    const { result } = renderHook(() =>
      useRovingTabIndex(containerRef, {
        orientation: "horizontal",
        rtl: true,
      })
    );

    // Simulate ArrowRight key press (should go left in RTL)
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
      container.dispatchEvent(event);
    });

    // In RTL, right arrow goes to previous item
    expect(result.current.focusedIndex).toBe(2); // Wrapped to last item
  });

  it("should provide navigation helper methods", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <ul>
        <li role="option">Item 1</li>
        <li role="option">Item 2</li>
        <li role="option">Item 3</li>
      </ul>
    `;
    document.body.append(container);

    const containerRef = { current: container };

    const { result } = renderHook(() => useRovingTabIndex(containerRef));

    act(() => {
      result.current.focusNext();
    });
    expect(result.current.focusedIndex).toBe(1);

    act(() => {
      result.current.focusPrevious();
    });
    expect(result.current.focusedIndex).toBe(0);

    act(() => {
      result.current.focusLast();
    });
    expect(result.current.focusedIndex).toBe(2);

    act(() => {
      result.current.focusFirst();
    });
    expect(result.current.focusedIndex).toBe(0);
  });
});
