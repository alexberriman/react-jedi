import { useEffect, useRef, useMemo } from "react";
import { EventHandlerSpec, EventHandlerType } from "../../types/events";
import { ComponentState } from "../../types/state";
import { EventRegistry } from "./event-registry";
import { ActionDispatcher } from "./action-dispatcher";

export interface UseEventHandlersOptions {
  eventHandlers?: Record<string, EventHandlerSpec>;
  state: ComponentState;
  setState: (state: ComponentState) => void;
  debugMode?: boolean;
}

export function useEventHandlers({
  eventHandlers,
  state,
  setState,
  debugMode = false,
}: UseEventHandlersOptions) {
  const elementRef = useRef<HTMLElement | null>(null);
  const registryRef = useRef<EventRegistry>();
  const dispatcherRef = useRef<ActionDispatcher>();

  // Initialize registry and dispatcher
  useMemo(() => {
    registryRef.current = new EventRegistry(debugMode);
    dispatcherRef.current = new ActionDispatcher(debugMode);
  }, [debugMode]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !eventHandlers || !registryRef.current || !dispatcherRef.current) {
      return;
    }

    const registry = registryRef.current;
    const dispatcher = dispatcherRef.current;

    // Register all event handlers
    for (const [eventType, spec] of Object.entries(eventHandlers)) {
      const fullSpec =
        spec.type === eventType ? spec : { ...spec, type: eventType as EventHandlerType };

      registry.registerEvent(element, fullSpec, {
        state,
        setState,
        dispatch: (action) => dispatcher.dispatch(state, action, setState),
      });
    }

    // Cleanup
    return () => {
      registry.unregisterEvents(element);
    };
  }, [eventHandlers, state, setState]);

  return {
    elementRef,
    getEventHistory: () => registryRef.current?.getEventHistory() || [],
    setDebugMode: (enabled: boolean) => {
      registryRef.current?.setDebugMode(enabled);
      if (dispatcherRef.current) {
        dispatcherRef.current = new ActionDispatcher(enabled);
      }
    },
  };
}
