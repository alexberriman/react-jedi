/**
 * Simple event handler utilities for component event mapping
 * These utilities provide a way to handle string-based event
 * specifications in components without the complexity of the
 * full event delegation system.
 */

import type React from "react";
import type { ActionDispatcher } from "./action-dispatcher";
import { imperativeAPIRegistry } from "../toast";

/**
 * Creates a simple event handler function from a string specification
 * @param handlerSpec - The handler specification (function name or action)
 * @param actionDispatcher - Optional action dispatcher
 * @returns Event handler function
 */
// No-op state setter for dispatch actions
const noOpSetState = (newState: Record<string, unknown>) => {};

function handleDispatchAction(
  handlerSpec: string,
  actionDispatcher: ActionDispatcher,
  event: React.SyntheticEvent
): void {
  const actionName = handlerSpec.slice(9); // Remove "dispatch:" prefix
  const action = {
    type: actionName,
    payload: { event },
  };
  actionDispatcher.dispatch({}, action, noOpSetState);
}

function parseArguments(argsString: string): unknown[] {
  return argsString
    .split(",")
    .map(arg => arg.trim())
    .filter(arg => arg.length > 0)
    .map(arg => {
      // Remove quotes for string literals
      if ((arg.startsWith('"') && arg.endsWith('"')) || 
          (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      // Try to parse as JSON for other types
      try {
        return JSON.parse(arg);
      } catch {
        return arg;
      }
    });
}

function callFunction(functionName: string, args: unknown[]): void {
  // First check imperative API registry
  let func = imperativeAPIRegistry.get(functionName);
  
  // Then check global scope
  if (!func) {
    func = (globalThis as Record<string, unknown>)[functionName];
  }
  
  if (typeof func === "function") {
    try {
      func(...args);
    } catch (error) {
      console.error(`Error calling function "${functionName}":`, error);
    }
  } else {
    console.warn(`Function "${functionName}" not found`);
  }
}

function handleFunctionCall(handlerSpec: string, event: React.SyntheticEvent): void {
  const functionCallRegex = /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((.*)\)$/;
  const match = functionCallRegex.exec(handlerSpec);
  
  if (match) {
    const [, functionName, argsString] = match;
    const args = parseArguments(argsString);
    callFunction(functionName, args);
  } else {
    // Simple function name without arguments
    const func = imperativeAPIRegistry.get(handlerSpec) || 
                 (globalThis as Record<string, unknown>)[handlerSpec];
    
    if (typeof func === "function") {
      func(event);
    } else {
      console.warn(`Event handler "${handlerSpec}" not found`);
    }
  }
}

export function createSimpleEventHandler(
  handlerSpec: string,
  actionDispatcher?: ActionDispatcher
): (event: React.SyntheticEvent) => void {
  return (event: React.SyntheticEvent) => {
    if (handlerSpec.startsWith("dispatch:") && actionDispatcher) {
      handleDispatchAction(handlerSpec, actionDispatcher, event);
    } else {
      handleFunctionCall(handlerSpec, event);
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
