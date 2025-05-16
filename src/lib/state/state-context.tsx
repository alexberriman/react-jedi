import * as React from "react";
import type { StateManager } from "./state-management";
import { createStateManager, useStateSubscription, useStateValue } from "./state-management";
import type { StateSpecification } from "@/types/schema/specification";

/**
 * State context for providing state management to components
 */
const StateContext = React.createContext<StateManager | null>(null);

/**
 * State provider props
 */
export interface StateProviderProps {
  readonly children: React.ReactNode;
  readonly specification?: { state?: StateSpecification };
  readonly initialState?: Record<string, unknown>;
  readonly debug?: boolean;
}

/**
 * State provider component
 */
export function StateProvider({
  children,
  specification,
  initialState = {},
  debug = false,
}: StateProviderProps): React.ReactElement {
  const managerRef = React.useRef<StateManager>();

  if (!managerRef.current) {
    // Create state manager from specification or initial state
    const state = specification?.state?.initial || initialState;
    const persistence = specification?.state?.persistence;
    const computed = specification?.state?.computed;

    managerRef.current = createStateManager({
      initialState: state,
      persistence,
      computed,
      debug: debug ? { enabled: true, logActions: true, logStateChanges: true } : undefined,
    });
  }

  return <StateContext.Provider value={managerRef.current}>{children}</StateContext.Provider>;
}

/**
 * Hook to access the state manager from context
 */
export function useStateContext(): StateManager {
  const manager = React.useContext(StateContext);

  if (!manager) {
    throw new Error("useStateContext must be used within a StateProvider");
  }

  return manager;
}

/**
 * Hook to access entire state
 */
export function useState(): Record<string, unknown> {
  const manager = useStateContext();
  return useStateSubscription(manager) as Record<string, unknown>;
}

/**
 * Hook to access specific state value
 */
export function useStateItem(key: string): [unknown, (value: unknown) => void] {
  const manager = useStateContext();
  return useStateValue(manager, key);
}

/**
 * Hook to access computed values
 */
export function useComputedValues(): Record<string, unknown> {
  const manager = useStateContext();
  const [computed, setComputed] = React.useState(manager.getComputedValues());

  React.useEffect(() => {
    const unsubscribe = manager.subscribe(() => {
      setComputed(manager.getComputedValues());
    });

    return unsubscribe;
  }, [manager]);

  return computed;
}

/**
 * Hook to dispatch actions
 */
export function useDispatch(): (action: { type: string; payload?: unknown }) => void {
  const manager = useStateContext();
  return React.useCallback((action) => manager.dispatch(action), [manager]);
}

/**
 * Higher-order component for injecting state
 */
export function withState<P extends object>(
  Component: React.ComponentType<P & { state: Record<string, unknown> }>
): React.ComponentType<P> {
  return function WithStateComponent(props: P) {
    const state = useState();
    return <Component {...props} state={state} />;
  };
}
