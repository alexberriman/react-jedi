import { describe, it, expect, vi, beforeEach } from "vitest";
import { ActionDispatcher } from "./action-dispatcher";
import type { ActionSpec } from "../../types/events";
import type { ComponentState } from "../../types/state";

describe("ActionDispatcher", () => {
  let dispatcher: ActionDispatcher;
  let setState: ReturnType<typeof vi.fn>;
  let initialState: ComponentState;

  beforeEach(() => {
    dispatcher = new ActionDispatcher();
    setState = vi.fn();
    initialState = { count: 0, text: "", items: [] };
  });

  describe("default handlers", () => {
    it("should handle UPDATE_VALUE action", () => {
      const action: ActionSpec = {
        type: "UPDATE_VALUE",
        payload: {
          key: "text",
          value: "Hello World",
        },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        text: "Hello World",
      });
    });

    it("should handle TOGGLE action", () => {
      const state = { ...initialState, isActive: true };
      const action: ActionSpec = {
        type: "TOGGLE",
        payload: {
          key: "isActive",
        },
      };

      dispatcher.dispatch(state, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...state,
        isActive: false,
      });
    });

    it("should handle INCREMENT action", () => {
      const action: ActionSpec = {
        type: "INCREMENT",
        payload: {
          key: "count",
          amount: 5,
        },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        count: 5,
      });
    });

    it("should handle DECREMENT action", () => {
      const state = { ...initialState, count: 10 };
      const action: ActionSpec = {
        type: "DECREMENT",
        payload: {
          key: "count",
          amount: 3,
        },
      };

      dispatcher.dispatch(state, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...state,
        count: 7,
      });
    });

    it("should handle ADD_TO_ARRAY action", () => {
      const action: ActionSpec = {
        type: "ADD_TO_ARRAY",
        payload: {
          key: "items",
          value: "new item",
        },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        items: ["new item"],
      });
    });

    it("should handle REMOVE_FROM_ARRAY action", () => {
      const state = { ...initialState, items: ["item1", "item2", "item3"] };
      const action: ActionSpec = {
        type: "REMOVE_FROM_ARRAY",
        payload: {
          key: "items",
          value: "item2",
        },
      };

      dispatcher.dispatch(state, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...state,
        items: ["item1", "item3"],
      });
    });

    it("should handle SET_STATE action", () => {
      const action: ActionSpec = {
        type: "SET_STATE",
        payload: {
          count: 42,
          text: "Updated",
        },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        count: 42,
        text: "Updated",
      });
    });

    it("should handle RESET_STATE action", () => {
      const action: ActionSpec = {
        type: "RESET_STATE",
        payload: { count: 0, text: "", items: [] },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(setState).toHaveBeenCalledWith({
        count: 0,
        text: "",
        items: [],
      });
    });
  });

  describe("custom handlers", () => {
    it("should register and use custom handlers", () => {
      const customHandler = vi.fn((state, action) => ({
        ...state,
        custom: action.payload,
      }));

      dispatcher.registerHandler("CUSTOM_ACTION", customHandler);

      const action: ActionSpec = {
        type: "CUSTOM_ACTION",
        payload: "custom value",
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(customHandler).toHaveBeenCalledWith(initialState, action);
      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        custom: "custom value",
      });
    });

    it("should warn when no handler is registered", () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const action: ActionSpec = {
        type: "UNKNOWN_ACTION",
        payload: {},
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "No handler registered for action type: UNKNOWN_ACTION"
      );
      expect(setState).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });

  describe("middleware", () => {
    it("should apply middleware in correct order", () => {
      const middleware1 = vi.fn((state, action, next) => {
        const newState = next(state, action);
        return { ...newState, middleware1: true };
      });

      const middleware2 = vi.fn((state, action, next) => {
        const newState = next(state, action);
        return { ...newState, middleware2: true };
      });

      dispatcher.registerMiddleware(middleware1);
      dispatcher.registerMiddleware(middleware2);

      const action: ActionSpec = {
        type: "UPDATE_VALUE",
        payload: {
          key: "text",
          value: "test",
        },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(middleware1).toHaveBeenCalled();
      expect(middleware2).toHaveBeenCalled();
      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        text: "test",
        middleware1: true,
        middleware2: true,
      });
    });

    it("should allow middleware to modify actions", () => {
      const modifyingMiddleware = vi.fn((state, action, next) => {
        const modifiedAction = {
          ...action,
          payload: {
            ...action.payload,
            value: action.payload.value.toUpperCase(),
          },
        };
        return next(state, modifiedAction);
      });

      dispatcher.registerMiddleware(modifyingMiddleware);

      const action: ActionSpec = {
        type: "UPDATE_VALUE",
        payload: {
          key: "text",
          value: "hello",
        },
      };

      dispatcher.dispatch(initialState, action, setState);

      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        text: "HELLO",
      });
    });
  });

  describe("debug mode", () => {
    it("should log actions in debug mode", () => {
      const debugDispatcher = new ActionDispatcher(true);
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const action: ActionSpec = {
        type: "UPDATE_VALUE",
        payload: {
          key: "text",
          value: "debug",
        },
      };

      debugDispatcher.dispatch(initialState, action, setState);

      expect(consoleLogSpy).toHaveBeenCalledWith("[ReactJedi Action]", action);

      consoleLogSpy.mockRestore();
    });
  });
});
