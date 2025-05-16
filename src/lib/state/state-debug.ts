import type { StateManager } from "./state-management";

/**
 * State debugger configuration
 */
export interface StateDebuggerConfig {
  enabled: boolean;
  logLevel: "verbose" | "info" | "warn" | "error";
  includeTimestamp: boolean;
  includeStackTrace: boolean;
  formatters?: {
    state?: (state: Record<string, unknown>) => string;
    action?: (action: { type: string; payload?: unknown }) => string;
  };
}

/**
 * State change event
 */
export interface StateChangeEvent {
  type: "state-change";
  timestamp: number;
  previousState: Record<string, unknown>;
  currentState: Record<string, unknown>;
  changedKeys: string[];
}

/**
 * Action event
 */
export interface ActionEvent {
  type: "action";
  timestamp: number;
  action: { type: string; payload?: unknown };
  stateBefore: Record<string, unknown>;
  stateAfter: Record<string, unknown>;
}

/**
 * Debug event
 */
export type DebugEvent = StateChangeEvent | ActionEvent;

/**
 * State debugger class
 */
export class StateDebugger {
  private config: StateDebuggerConfig;
  private events: DebugEvent[] = [];
  private listeners: ((event: DebugEvent) => void)[] = [];

  constructor(config: Partial<StateDebuggerConfig> = {}) {
    this.config = {
      enabled: true,
      logLevel: "info",
      includeTimestamp: true,
      includeStackTrace: false,
      ...config,
    };
  }

  /**
   * Log a state change event
   */
  logStateChange(
    previousState: Record<string, unknown>,
    currentState: Record<string, unknown>
  ): void {
    if (!this.config.enabled) return;

    const changedKeys = this.getChangedKeys(previousState, currentState);

    if (changedKeys.length === 0) return;

    const event: StateChangeEvent = {
      type: "state-change",
      timestamp: Date.now(),
      previousState,
      currentState,
      changedKeys,
    };

    this.events.push(event);
    this.notifyListeners(event);
    this.logToConsole(event);
  }

  /**
   * Log an action event
   */
  logAction(
    action: { type: string; payload?: unknown },
    stateBefore: Record<string, unknown>,
    stateAfter: Record<string, unknown>
  ): void {
    if (!this.config.enabled) return;

    const event: ActionEvent = {
      type: "action",
      timestamp: Date.now(),
      action,
      stateBefore,
      stateAfter,
    };

    this.events.push(event);
    this.notifyListeners(event);
    this.logToConsole(event);
  }

  /**
   * Add event listener
   */
  addEventListener(listener: (event: DebugEvent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get debug events
   */
  getEvents(): DebugEvent[] {
    return [...this.events];
  }

  /**
   * Clear debug events
   */
  clearEvents(): void {
    this.events = [];
  }

  /**
   * Export events as JSON
   */
  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }

  /**
   * Get changed keys between states
   */
  private getChangedKeys(
    previousState: Record<string, unknown>,
    currentState: Record<string, unknown>
  ): string[] {
    const allKeys = new Set([...Object.keys(previousState), ...Object.keys(currentState)]);

    const changedKeys: string[] = [];

    for (const key of allKeys) {
      if (previousState[key] !== currentState[key]) {
        changedKeys.push(key);
      }
    }

    return changedKeys;
  }

  /**
   * Notify event listeners
   */
  private notifyListeners(event: DebugEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  /**
   * Log event to console
   */
  private logToConsole(event: DebugEvent): void {
    const logMethod = this.getLogMethod();
    const message = this.formatEventMessage(event);

    if (this.config.includeTimestamp) {
      const timestamp = new Date(event.timestamp).toISOString();
      logMethod(`[${timestamp}] ${message}`);
    } else {
      logMethod(message);
    }

    if (this.config.includeStackTrace) {
      console.trace();
    }
  }

  /**
   * Get console log method based on level
   */
  private getLogMethod(): (...args: unknown[]) => void {
    switch (this.config.logLevel) {
      case "verbose": {
        return console.debug;
      }
      case "info": {
        return console.info;
      }
      case "warn": {
        return console.warn;
      }
      case "error": {
        return console.error;
      }
      default: {
        return console.log;
      }
    }
  }

  /**
   * Format event message
   */
  private formatEventMessage(event: DebugEvent): string {
    if (event.type === "state-change") {
      const formatter = this.config.formatters?.state;

      if (formatter) {
        return formatter(event.currentState);
      }

      return `State changed: ${event.changedKeys.join(", ")}`;
    } else {
      const formatter = this.config.formatters?.action;

      if (formatter) {
        return formatter(event.action);
      }

      return `Action: ${event.action.type}`;
    }
  }
}

/**
 * Create a debug-enabled state manager
 */
export function createDebugStateManager(
  manager: StateManager,
  debugConfig?: Partial<StateDebuggerConfig>
): StateManager {
  const stateDebugger = new StateDebugger(debugConfig);
  let previousState = manager.getState();

  // Wrap setState to log changes
  const originalSetState = manager.setState.bind(manager);
  manager.setState = (updates: Record<string, unknown>) => {
    const stateBefore = manager.getState();
    originalSetState(updates);
    const stateAfter = manager.getState();
    stateDebugger.logStateChange(stateBefore, stateAfter);
  };

  // Wrap dispatch to log actions
  const originalDispatch = manager.dispatch.bind(manager);
  manager.dispatch = (action: { type: string; payload?: unknown }) => {
    const stateBefore = manager.getState();
    originalDispatch(action);
    const stateAfter = manager.getState();
    stateDebugger.logAction(action, stateBefore, stateAfter);
  };

  // Subscribe to state changes
  manager.subscribe((state) => {
    stateDebugger.logStateChange(previousState, state);
    previousState = state;
  });

  return manager;
}

/**
 * State inspector component for development
 */
export interface StateInspectorConfig {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  theme?: "light" | "dark";
  collapsed?: boolean;
}

/**
 * Format state for display
 */
export function formatStateForDisplay(
  state: Record<string, unknown>,
  maxDepth: number = 3
): string {
  return JSON.stringify(state, null, 2);
}

/**
 * State diff utility
 */
export function getStateDiff(
  previousState: Record<string, unknown>,
  currentState: Record<string, unknown>
): Record<string, { previous: unknown; current: unknown }> {
  const diff: Record<string, { previous: unknown; current: unknown }> = {};

  const allKeys = new Set([...Object.keys(previousState), ...Object.keys(currentState)]);

  for (const key of allKeys) {
    const prevValue = previousState[key];
    const currValue = currentState[key];

    if (prevValue !== currValue) {
      diff[key] = {
        previous: prevValue,
        current: currValue,
      };
    }
  }

  return diff;
}
