import { ActionSpec } from "../../types/events";
import { ComponentState } from "../../types/state";

export type ActionHandler = (state: ComponentState, action: ActionSpec) => ComponentState;
export type MiddlewareFunction = (
  state: ComponentState,
  action: ActionSpec,
  next: ActionHandler
) => ComponentState;

export class ActionDispatcher {
  private handlers: Map<string, ActionHandler> = new Map();
  private middleware: MiddlewareFunction[] = [];
  private debugMode: boolean = false;

  constructor(debugMode: boolean = false) {
    this.debugMode = debugMode;
    this.registerDefaultHandlers();
  }

  registerHandler(actionType: string, handler: ActionHandler): void {
    this.handlers.set(actionType, handler);
  }

  registerMiddleware(middleware: MiddlewareFunction): void {
    this.middleware.push(middleware);
  }

  dispatch(
    state: ComponentState,
    action: ActionSpec,
    setState: (state: ComponentState) => void
  ): void {
    if (this.debugMode) {
      console.log("[ReactJedi Action]", action);
    }

    const handler = this.handlers.get(action.type);

    if (!handler) {
      console.warn(`No handler registered for action type: ${action.type}`);
      return;
    }

    // Build the middleware chain
    const middlewareArray = [...this.middleware];
    let chain = handler;

    for (let i = middlewareArray.length - 1; i >= 0; i--) {
      const middleware = middlewareArray[i];
      const previousNext = chain;
      chain = (state: ComponentState, action: ActionSpec) =>
        middleware(state, action, previousNext);
    }

    const newState = chain(state, action);
    setState(newState);
  }

  private registerDefaultHandlers(): void {
    // Update value action
    this.registerHandler("UPDATE_VALUE", (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }));

    // Toggle boolean action
    this.registerHandler("TOGGLE", (state, action) => ({
      ...state,
      [action.payload.key]: !state[action.payload.key],
    }));

    // Increment action
    this.registerHandler("INCREMENT", (state, action) => ({
      ...state,
      [action.payload.key]: (state[action.payload.key] || 0) + (action.payload.amount || 1),
    }));

    // Decrement action
    this.registerHandler("DECREMENT", (state, action) => ({
      ...state,
      [action.payload.key]: (state[action.payload.key] || 0) - (action.payload.amount || 1),
    }));

    // Add to array action
    this.registerHandler("ADD_TO_ARRAY", (state, action) => ({
      ...state,
      [action.payload.key]: [...(state[action.payload.key] || []), action.payload.value],
    }));

    // Remove from array action
    this.registerHandler("REMOVE_FROM_ARRAY", (state, action) => ({
      ...state,
      [action.payload.key]: (state[action.payload.key] || []).filter(
        (item: unknown) => item !== action.payload.value
      ),
    }));

    // Set state action
    this.registerHandler("SET_STATE", (state, action) => ({
      ...state,
      ...action.payload,
    }));

    // Reset state action
    this.registerHandler("RESET_STATE", (state, action) => action.payload || {});
  }
}
