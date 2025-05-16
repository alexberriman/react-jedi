import type { ComponentSpec } from "../types/schema/components";
import type { StateSpecification } from "../types/schema/specification";
import type { StateManager } from "./state-management";

/**
 * Component state configuration
 */
export interface ComponentStateConfig {
  initial?: Record<string, unknown>;
  reducers?: Record<
    string,
    (state: Record<string, unknown>, payload: unknown) => Record<string, unknown>
  >;
  effects?: Record<string, (state: Record<string, unknown>) => void | (() => void)>;
}

/**
 * Extract state configuration from component spec
 */
export function extractStateConfig(spec: ComponentSpec): ComponentStateConfig | null {
  if (!spec.state) {
    return null;
  }

  // Handle string state references (for global state keys)
  if (typeof spec.state === "string") {
    return {
      initial: { value: spec.state },
    };
  }

  // Handle object state configurations
  if (typeof spec.state === "object" && spec.state) {
    const stateObj = spec.state as Record<string, unknown>;

    return {
      initial: (stateObj.initial as Record<string, unknown>) || {},
      reducers: stateObj.reducers as ComponentStateConfig["reducers"],
      effects: stateObj.effects as ComponentStateConfig["effects"],
    };
  }

  return null;
}

/**
 * Initialize component state within a state manager
 */
export function initializeComponentState(
  componentId: string,
  stateConfig: ComponentStateConfig,
  manager: StateManager
): void {
  if (!stateConfig.initial) {
    return;
  }

  // Namespace the state keys with component ID
  const namespacedState: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(stateConfig.initial)) {
    namespacedState[`${componentId}.${key}`] = value;
  }

  manager.setState(namespacedState);
}

/**
 * Create state initialization from UI specification
 */
export function createStateInitialization(specification: {
  state?: StateSpecification;
}): Record<string, unknown> {
  if (!specification.state?.initial) {
    return {};
  }

  return specification.state.initial;
}

/**
 * Parse state expressions (simple implementation)
 * In production, use a proper expression parser
 */
export function parseStateExpression(
  expression: string,
  context: Record<string, unknown>
): unknown {
  try {
    // Simple property access
    if (expression.startsWith("state.")) {
      const path = expression.split(".");
      let value: unknown = context;

      for (const key of path) {
        if (value && typeof value === "object") {
          value = (value as Record<string, unknown>)[key];
        } else {
          return undefined;
        }
      }

      return value;
    }

    // For more complex expressions, we'd need a proper parser
    return expression;
  } catch (error) {
    console.error("Failed to parse state expression:", expression, error);
    return undefined;
  }
}

/**
 * Resolve state bindings in component props
 */
export function resolveStateBindings(
  props: Record<string, unknown>,
  state: Record<string, unknown>
): Record<string, unknown> {
  const resolved: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (typeof value === "string" && value.startsWith("{{") && value.endsWith("}}")) {
      // Extract expression from template syntax
      const expression = value.slice(2, -2).trim();
      resolved[key] = parseStateExpression(expression, { state });
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Recursively resolve nested objects
      resolved[key] = resolveStateBindings(value as Record<string, unknown>, state);
    } else {
      resolved[key] = value;
    }
  }

  return resolved;
}

/**
 * Extract state dependencies from component spec
 */
export function extractStateDependencies(spec: ComponentSpec): string[] {
  const dependencies: string[] = [];

  // Helper function to find state references in values
  const findStateRefs = (value: unknown): void => {
    if (typeof value === "string") {
      const matches = value.match(/\{\{state\.(\w+(?:\.\w+)*)\}\}/g);
      if (matches) {
        for (const match of matches) {
          const key = match.slice(8, -2); // Extract key from {{state.key}}
          if (!dependencies.includes(key)) {
            dependencies.push(key);
          }
        }
      }
    } else if (typeof value === "object" && value !== null) {
      for (const nestedValue of Object.values(value)) {
        findStateRefs(nestedValue);
      }
    }
  };

  // Check all spec properties for state references
  for (const value of Object.values(spec)) {
    findStateRefs(value);
  }

  return dependencies;
}

/**
 * Create a local state manager for a component
 */
export function createComponentStateManager(
  componentId: string,
  stateConfig: ComponentStateConfig,
  globalManager?: StateManager
): StateManager {
  // Implementation would create a scoped state manager
  // that can interact with the global state if needed
  throw new Error("Component state manager not yet implemented");
}
