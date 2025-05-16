/**
 * Simple event handler utilities for component event mapping
 * These utilities provide a way to handle string-based event
 * specifications in components without the complexity of the
 * full event delegation system.
 */

import type React from "react";
import type { ActionDispatcher } from "./action-dispatcher";

/**
 * Creates a simple event handler function from a string specification
 * @param handlerSpec - The handler specification (function name or action)
 * @param actionDispatcher - Optional action dispatcher
 * @returns Event handler function
 */
export function createSimpleEventHandler(
  handlerSpec: string,
  actionDispatcher?: ActionDispatcher
): (event: React.SyntheticEvent) => void {
  return (event: React.SyntheticEvent) => {
    // If the spec starts with "dispatch:", treat it as an action
    if (handlerSpec.startsWith("dispatch:") && actionDispatcher) {
      const actionName = handlerSpec.slice(9); // Remove "dispatch:" prefix
      // Create a dummy action with context
      const action = {
        type: actionName,
        payload: { event },
      };
      // Simple state setter - just pass the current state
      const setState = (newState: Record<string, unknown>) => {};
      // Call with empty state
      actionDispatcher.dispatch({}, action, setState);
    } else {
      // Otherwise, try to find and call a global function
      const globalFunc = (globalThis as Record<string, unknown>)[handlerSpec] as
        | ((event: React.SyntheticEvent) => void)
        | undefined;
      if (typeof globalFunc === "function") {
        globalFunc(event);
      } else {
        console.warn(`Event handler "${handlerSpec}" not found`);
      }
    }
  };
}

/**
 * Maps string event handlers to event handler functions
 * @param handlers - Object of event handler strings
 * @param actionDispatcher - Optional action dispatcher
 * @returns Object of event handler functions
 */
export function mapStringEventHandlers(
  handlers: Record<string, string>,
  actionDispatcher?: ActionDispatcher
): Record<string, (event: React.SyntheticEvent) => void> {
  const mappedHandlers: Record<string, (event: React.SyntheticEvent) => void> = {};

  for (const [key, value] of Object.entries(handlers)) {
    mappedHandlers[key] = createSimpleEventHandler(value, actionDispatcher);
  }

  return mappedHandlers;
}
