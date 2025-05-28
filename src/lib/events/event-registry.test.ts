import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { EventRegistry, type EventContext } from "./event-registry";
import type { EventHandlerSpec } from "../../types/events";

describe("EventRegistry", () => {
  let registry: EventRegistry;
  let element: HTMLElement;
  let mockContext: EventContext;

  beforeEach(() => {
    registry = new EventRegistry();
    element = document.createElement("div");
    mockContext = {
      state: { count: 0 },
      setState: vi.fn(),
      dispatch: vi.fn(),
    };
  });

  afterEach(() => {
    registry.clear();
  });

  it("should register event listeners on elements", () => {
    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "INCREMENT" },
    };

    const addEventListenerSpy = vi.spyOn(element, "addEventListener");
    registry.registerEvent(element, spec, mockContext);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      expect.objectContaining({})
    );
  });

  it("should dispatch actions when events are triggered", () => {
    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "INCREMENT" },
    };

    registry.registerEvent(element, spec, mockContext);
    element.click();

    expect(mockContext.dispatch).toHaveBeenCalledWith({ type: "INCREMENT" });
  });

  it("should prevent default when specified", () => {
    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "SUBMIT" },
      preventDefault: true,
    };

    const mockEvent = new Event("click");
    const preventDefaultSpy = vi.spyOn(mockEvent, "preventDefault");

    registry.registerEvent(element, spec, mockContext);
    element.dispatchEvent(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("should stop propagation when specified", () => {
    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "SUBMIT" },
      stopPropagation: true,
    };

    const mockEvent = new Event("click", { bubbles: true });
    const stopPropagationSpy = vi.spyOn(mockEvent, "stopPropagation");

    registry.registerEvent(element, spec, mockContext);
    element.dispatchEvent(mockEvent);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it("should debounce event handlers when specified", () => {
    const spec: EventHandlerSpec = {
      type: "input",
      handler: { type: "UPDATE" },
      debounce: 100,
    };

    registry.registerEvent(element, spec, mockContext);

    // Trigger event multiple times quickly
    element.dispatchEvent(new Event("input"));
    element.dispatchEvent(new Event("input"));
    element.dispatchEvent(new Event("input"));

    // Should not have been called yet
    expect(mockContext.dispatch).not.toHaveBeenCalled();

    // Wait for debounce using fake timers
    vi.advanceTimersByTime(150);

    // Should have been called only once
    expect(mockContext.dispatch).toHaveBeenCalledTimes(1);
  });

  it("should throttle event handlers when specified", () => {
    const spec: EventHandlerSpec = {
      type: "mousemove",
      handler: { type: "TRACK" },
      throttle: 100,
    };

    registry.registerEvent(element, spec, mockContext);

    // Trigger event multiple times
    element.dispatchEvent(new Event("mousemove"));
    element.dispatchEvent(new Event("mousemove"));

    // Should have been called once immediately
    expect(mockContext.dispatch).toHaveBeenCalledTimes(1);

    // Wait less than throttle time
    vi.advanceTimersByTime(50);
    element.dispatchEvent(new Event("mousemove"));

    // Still should have been called only once
    expect(mockContext.dispatch).toHaveBeenCalledTimes(1);

    // Wait for throttle time to pass
    vi.advanceTimersByTime(100);
    element.dispatchEvent(new Event("mousemove"));

    // Now should have been called twice
    expect(mockContext.dispatch).toHaveBeenCalledTimes(2);
  });

  it("should unregister events from elements", () => {
    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "INCREMENT" },
    };

    const removeEventListenerSpy = vi.spyOn(element, "removeEventListener");

    registry.registerEvent(element, spec, mockContext);
    registry.unregisterEvents(element);

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      expect.any(Object)
    );
  });

  it("should log events in debug mode", () => {
    const debugRegistry = new EventRegistry(true);
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "INCREMENT" },
    };

    debugRegistry.registerEvent(element, spec, mockContext);
    element.click();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "[ReactJedi Event]",
      expect.objectContaining({
        eventType: "click",
        action: { type: "INCREMENT" },
      })
    );

    consoleLogSpy.mockRestore();
  });

  it("should maintain event history", () => {
    const debugRegistry = new EventRegistry(true);

    const spec: EventHandlerSpec = {
      type: "click",
      handler: { type: "INCREMENT" },
    };

    debugRegistry.registerEvent(element, spec, mockContext);
    element.click();
    element.click();

    const history = debugRegistry.getEventHistory();
    expect(history).toHaveLength(2);
    expect(history[0]).toMatchObject({
      eventType: "click",
      action: { type: "INCREMENT" },
    });
  });
});
