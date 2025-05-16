/**
 * Conditional Rendering Module
 *
 * Provides utilities for conditional rendering and property application
 * in the Server-Driven UI architecture.
 */

export {
  evaluateCondition,
  validateConditionExpression,
  type ConditionContext,
} from "./condition-parser";

import type { ComponentSpec } from "../types/schema/components";
import {
  evaluateCondition,
  type ConditionContext,
  type ConditionExpression,
} from "./condition-parser";

/**
 * Evaluates the visibility condition for a component
 */
export function shouldRenderComponent(spec: ComponentSpec, context: ConditionContext): boolean {
  if (spec.when === undefined || spec.when === null) {
    return true;
  }

  return evaluateCondition(spec.when as ConditionExpression, context);
}

/**
 * Applies conditional properties to a component spec
 */
export function applyConditionalProps(
  spec: ComponentSpec,
  context: ConditionContext
): ComponentSpec {
  if (!spec.conditionalProps) {
    return spec;
  }

  const appliedProps: Record<string, unknown> = {};

  for (const [propName, conditions] of Object.entries(spec.conditionalProps)) {
    for (const [condition, value] of Object.entries(conditions)) {
      if (evaluateCondition(condition, context)) {
        appliedProps[propName] = value;
        break; // First matching condition wins
      }
    }
  }

  return {
    ...spec,
    ...appliedProps,
  };
}

/**
 * Processes a component spec for conditional rendering and props
 */
export function processConditionals(
  spec: ComponentSpec,
  context: ConditionContext
): ComponentSpec | null {
  // Check visibility condition
  if (!shouldRenderComponent(spec, context)) {
    return null;
  }

  // Apply conditional props
  return applyConditionalProps(spec, context);
}
