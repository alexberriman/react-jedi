import React, { ComponentType, forwardRef } from "react";
import { EventHandlerSpec } from "../../types/events";
import { ComponentState } from "../../types/state";
import { useEventHandlers } from "./use-event-handlers";

export interface WithEventHandlersProps {
  eventHandlers?: Record<string, EventHandlerSpec>;
  state?: ComponentState;
  onStateChange?: (state: ComponentState) => void;
  debugMode?: boolean;
}

export function withEventHandlers<P extends object>(
  Component: ComponentType<P>
): ComponentType<P & WithEventHandlersProps> {
  const WrappedComponent = forwardRef<HTMLDivElement, P & WithEventHandlersProps>((props, ref) => {
    const { eventHandlers, state = {}, onStateChange, debugMode, ...restProps } = props;

    const [localState, setLocalState] = React.useState<ComponentState>(state);

    const { elementRef } = useEventHandlers({
      eventHandlers,
      state: localState,
      setState: (newState) => {
        setLocalState(newState);
        onStateChange?.(newState);
      },
      debugMode,
    });

    // Merge refs
    React.useImperativeHandle(ref, () => elementRef.current as HTMLDivElement, [elementRef]);

    // Create a ref callback that combines both refs
    const combinedRef = (element: HTMLDivElement | null) => {
      (elementRef as React.MutableRefObject<HTMLElement | null>).current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <div ref={combinedRef}>
        <Component {...(restProps as P)} />
      </div>
    );
  });

  WrappedComponent.displayName = `withEventHandlers(${Component.displayName || Component.name})`;

  return WrappedComponent as unknown as ComponentType<P & WithEventHandlersProps>;
}
