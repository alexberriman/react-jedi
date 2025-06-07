import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createSimpleEventHandler, mapStringEventHandlers } from "./simple-handlers";
import { ActionDispatcher } from "./action-dispatcher";
import { imperativeAPIRegistry } from "../toast";
import type React from "react";

describe("simple-handlers", () => {
  let mockEvent: React.SyntheticEvent;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      target: {},
    } as unknown as React.SyntheticEvent;
    
    // Mock console.warn to suppress expected warnings in tests
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up global functions
    delete (globalThis as Record<string, unknown>).testFunction;
    delete (globalThis as Record<string, unknown>).toast;
    
    // Restore console.warn
    consoleWarnSpy.mockRestore();
  });

  describe("createSimpleEventHandler", () => {
    it("should handle dispatch actions", () => {
      const dispatcher = new ActionDispatcher();
      const dispatchSpy = vi.spyOn(dispatcher, "dispatch");
      
      const handler = createSimpleEventHandler("dispatch:TEST_ACTION", dispatcher);
      handler(mockEvent);
      
      expect(dispatchSpy).toHaveBeenCalledWith(
        {},
        { type: "TEST_ACTION", payload: { event: mockEvent } },
        expect.any(Function)
      );
    });

    it("should call global functions", () => {
      const mockFunction = vi.fn();
      (globalThis as Record<string, unknown>).testFunction = mockFunction;
      
      const handler = createSimpleEventHandler("testFunction");
      handler(mockEvent);
      
      expect(mockFunction).toHaveBeenCalledWith(mockEvent);
    });

    it("should call functions from imperative API registry", () => {
      const mockAPI = vi.fn();
      imperativeAPIRegistry.register("testAPI", mockAPI);
      
      const handler = createSimpleEventHandler("testAPI");
      handler(mockEvent);
      
      expect(mockAPI).toHaveBeenCalledWith(mockEvent);
      
      imperativeAPIRegistry.unregister("testAPI");
    });

    it("should handle function calls with string arguments", () => {
      const mockToast = vi.fn();
      imperativeAPIRegistry.register("toast", mockToast);
      
      const handler = createSimpleEventHandler("toast('Hello World')");
      handler(mockEvent);
      
      expect(mockToast).toHaveBeenCalledWith("Hello World");
      
      imperativeAPIRegistry.unregister("toast");
    });

    it("should handle function calls with multiple arguments", () => {
      const mockFunction = vi.fn();
      (globalThis as Record<string, unknown>).testFunction = mockFunction;
      
      const handler = createSimpleEventHandler("testFunction('arg1', 'arg2', 'arg3')");
      handler(mockEvent);
      
      expect(mockFunction).toHaveBeenCalledWith("arg1", "arg2", "arg3");
    });

    it("should handle function calls with number arguments", () => {
      const mockFunction = vi.fn();
      (globalThis as Record<string, unknown>).testFunction = mockFunction;
      
      const handler = createSimpleEventHandler("testFunction(42, 3.14, -10)");
      handler(mockEvent);
      
      expect(mockFunction).toHaveBeenCalledWith(42, 3.14, -10);
    });

    it("should handle function calls with boolean arguments", () => {
      const mockFunction = vi.fn();
      (globalThis as Record<string, unknown>).testFunction = mockFunction;
      
      const handler = createSimpleEventHandler("testFunction(true, false)");
      handler(mockEvent);
      
      expect(mockFunction).toHaveBeenCalledWith(true, false);
    });

    it("should handle function calls with mixed quotes", () => {
      const mockFunction = vi.fn();
      (globalThis as Record<string, unknown>).testFunction = mockFunction;
      
      const handler = createSimpleEventHandler('testFunction("double quotes", \'single quotes\')');
      handler(mockEvent);
      
      expect(mockFunction).toHaveBeenCalledWith("double quotes", "single quotes");
    });

    it("should warn when function is not found", () => {
      const handler = createSimpleEventHandler("nonExistentFunction");
      handler(mockEvent);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith('Event handler "nonExistentFunction" not found');
    });

    it("should handle errors in function calls gracefully", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const mockFunction = vi.fn().mockImplementation(() => {
        throw new Error("Test error");
      });
      (globalThis as Record<string, unknown>).testFunction = mockFunction;
      
      const handler = createSimpleEventHandler("testFunction()");
      handler(mockEvent);
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error calling function "testFunction":',
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe("mapStringEventHandlers", () => {
    it("should map multiple string handlers to event handlers", () => {
      const mockFunction1 = vi.fn();
      const mockFunction2 = vi.fn();
      (globalThis as Record<string, unknown>).handler1 = mockFunction1;
      (globalThis as Record<string, unknown>).handler2 = mockFunction2;
      
      const handlers = mapStringEventHandlers({
        onClick: "handler1",
        onSubmit: "handler2",
      });
      
      expect(typeof handlers.onClick).toBe("function");
      expect(typeof handlers.onSubmit).toBe("function");
      
      handlers.onClick(mockEvent);
      expect(mockFunction1).toHaveBeenCalledWith(mockEvent);
      
      handlers.onSubmit(mockEvent);
      expect(mockFunction2).toHaveBeenCalledWith(mockEvent);
      
      delete (globalThis as Record<string, unknown>).handler1;
      delete (globalThis as Record<string, unknown>).handler2;
    });

    it("should handle dispatch actions in mapped handlers", () => {
      const dispatcher = new ActionDispatcher();
      const dispatchSpy = vi.spyOn(dispatcher, "dispatch");
      
      const handlers = mapStringEventHandlers({
        onClick: "dispatch:CLICK_ACTION",
      }, dispatcher);
      
      handlers.onClick(mockEvent);
      
      expect(dispatchSpy).toHaveBeenCalledWith(
        {},
        { type: "CLICK_ACTION", payload: { event: mockEvent } },
        expect.any(Function)
      );
    });
  });
});