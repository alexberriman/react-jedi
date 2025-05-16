import { EventHandlerSpec, EventRegistration, EventListener, ActionSpec } from "../../types/events";
import { ComponentState } from "../../types/state";
import { generateUniqueId } from "./unique-id";

export interface EventContext {
  state: ComponentState;
  setState: (state: ComponentState) => void;
  dispatch: (action: ActionSpec) => void;
}

export class EventRegistry {
  private registrations: Map<string, EventRegistration[]> = new Map();
  private debugMode: boolean = false;
  private eventHistory: unknown[] = [];
  private maxHistorySize: number = 100;

  constructor(debugMode: boolean = false) {
    this.debugMode = debugMode;
  }

  registerEvent(element: HTMLElement, spec: EventHandlerSpec, context: EventContext): void {
    const {
      type,
      handler,
      preventDefault,
      stopPropagation,
      capture,
      passive,
      once,
      debounce,
      throttle,
    } = spec;

    let listener: EventListener = (event: Event) => {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();

      const action = typeof handler === "string" ? { type: handler } : handler;

      if (this.debugMode) {
        this.logEvent(event, action, context.state);
      }

      context.dispatch(action);
    };

    // Apply debounce if specified
    if (debounce) {
      listener = this.debounce(listener, debounce);
    }

    // Apply throttle if specified
    if (throttle) {
      listener = this.throttle(listener, throttle);
    }

    const options = { capture, passive, once };
    element.addEventListener(type, listener, options);

    const registration: EventRegistration = {
      element,
      type,
      listener,
      options,
    };

    const key = this.getKey(element);
    const existing = this.registrations.get(key) || [];
    this.registrations.set(key, [...existing, registration]);
  }

  unregisterEvents(element: HTMLElement): void {
    const key = this.getKey(element);
    const registrations = this.registrations.get(key);

    if (registrations) {
      for (const { element, type, listener, options } of registrations) {
        element.removeEventListener(type, listener as EventListener, options);
      }

      this.registrations.delete(key);
    }
  }

  clear(): void {
    for (const registrations of this.registrations.values()) {
      for (const { element, type, listener, options } of registrations) {
        element.removeEventListener(type, listener as EventListener, options);
      }
    }

    this.registrations.clear();
    this.eventHistory = [];
  }

  private getKey(element: HTMLElement): string {
    if (!element.dataset.reactJediId) {
      element.dataset.reactJediId = generateUniqueId("element");
    }
    return element.dataset.reactJediId;
  }

  private debounce(func: EventListener, wait: number): EventListener {
    let timeout: ReturnType<typeof globalThis.setTimeout>;

    return function (this: unknown, event: Event) {
      globalThis.clearTimeout(timeout);
      timeout = globalThis.setTimeout(() => func.call(this, event), wait);
    };
  }

  private throttle(func: EventListener, wait: number): EventListener {
    let lastTime = 0;

    return function (this: unknown, event: Event) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        func.call(this, event);
        lastTime = now;
      }
    };
  }

  private logEvent(event: Event, action: ActionSpec, state: ComponentState): void {
    const debugInfo = {
      timestamp: Date.now(),
      eventType: event.type,
      target: (event.target as HTMLElement)?.tagName || "unknown",
      action,
      state,
      propagationStopped: event.bubbles && event.eventPhase === Event.BUBBLING_PHASE,
      defaultPrevented: event.defaultPrevented,
    };

    this.eventHistory.push(debugInfo);

    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    if (this.debugMode) {
      console.log("[ReactJedi Event]", debugInfo);
    }
  }

  getEventHistory(): unknown[] {
    return [...this.eventHistory];
  }

  setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }
}
