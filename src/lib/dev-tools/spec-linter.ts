import type { UISpecification } from "../../types/schema/specification";
import type { ComponentSpec } from "../../types/schema/components";
import { validateUISpecification } from "../parser";
import { formatLintResults } from "./simplified-linter";

/**
 * Linting rules for specifications
 */
export interface LintRule {
  id: string;
  name: string;
  description: string;
  severity: "error" | "warning" | "info";
  check: (spec: UISpecification) => LintResult[];
}

export interface LintResult {
  rule: string;
  message: string;
  path?: string[];
  severity: "error" | "warning" | "info";
  suggestion?: string;
  line?: number;
  column?: number;
}

/**
 * Built-in linting rules
 */
export const builtInRules: LintRule[] = [
  {
    id: "no-empty-children",
    name: "No Empty Children Arrays",
    description: "Warns about components with empty children arrays",
    severity: "warning",
    check: (spec) => {
      const results: LintResult[] = [];

      function checkComponent(component: ComponentSpec, path: string[] = []): void {
        if (
          component.children &&
          Array.isArray(component.children) &&
          component.children.length === 0
        ) {
          results.push({
            rule: "no-empty-children",
            message: "Component has empty children array",
            path: [...path, "children"],
            severity: "warning",
            suggestion: "Remove the empty children array or add child components",
          });
        }

        if (component.children && Array.isArray(component.children)) {
          for (const [index, child] of component.children.entries()) {
            checkComponent(child, [...path, "children", index.toString()]);
          }
        }
      }

      checkComponent(spec.root);
      return results;
    },
  },

  {
    id: "no-inline-styles",
    name: "No Inline Styles",
    description: "Warns about inline style objects (prefer CSS classes)",
    severity: "warning",
    check: (spec) => {
      const results: LintResult[] = [];

      function checkComponent(component: ComponentSpec, path: string[] = []): void {
        const props = component.props as Record<string, unknown>;
        if (props?.style && typeof props.style === "object") {
          results.push({
            rule: "no-inline-styles",
            message: "Component uses inline styles",
            path: [...path, "props", "style"],
            severity: "warning",
            suggestion: "Use CSS classes instead of inline styles for better performance",
          });
        }

        if (component.children && Array.isArray(component.children)) {
          for (const [index, child] of component.children.entries()) {
            checkComponent(child, [...path, "children", index.toString()]);
          }
        }
      }

      checkComponent(spec.root);
      return results;
    },
  },

  {
    id: "consistent-naming",
    name: "Consistent Component IDs",
    description: "Ensures component IDs follow consistent naming convention",
    severity: "info",
    check: (spec) => {
      const results: LintResult[] = [];
      const kebabCaseRegex = /^[a-z][a-z0-9-]*$/;

      function checkComponent(component: ComponentSpec, path: string[] = []): void {
        const id = component.id as string | undefined;
        if (id && !kebabCaseRegex.test(id)) {
          results.push({
            rule: "consistent-naming",
            message: `Component ID '${id}' doesn't follow kebab-case convention`,
            path: [...path, "id"],
            severity: "info",
            suggestion: "Use kebab-case for component IDs (e.g., 'my-component')",
          });
        }

        if (component.children && Array.isArray(component.children)) {
          for (const [index, child] of component.children.entries()) {
            checkComponent(child, [...path, "children", index.toString()]);
          }
        }
      }

      checkComponent(spec.root);
      return results;
    },
  },

  {
    id: "accessibility-alt-text",
    name: "Image Alt Text",
    description: "Ensures all images have alt text for accessibility",
    severity: "error",
    check: (spec) => {
      const results: LintResult[] = [];

      function checkComponent(component: ComponentSpec, path: string[] = []): void {
        const props = component.props as Record<string, unknown>;
        if (component.type === "Image" && !props?.alt) {
          results.push({
            rule: "accessibility-alt-text",
            message: "Image component missing alt text",
            path: [...path, "props"],
            severity: "error",
            suggestion: "Add an 'alt' prop to describe the image for screen readers",
          });
        }

        if (component.children && Array.isArray(component.children)) {
          for (const [index, child] of component.children.entries()) {
            checkComponent(child, [...path, "children", index.toString()]);
          }
        }
      }

      checkComponent(spec.root);
      return results;
    },
  },

  {
    id: "form-labels",
    name: "Form Input Labels",
    description: "Ensures form inputs have associated labels",
    severity: "warning",
    check: (spec) => {
      const results: LintResult[] = [];

      function checkComponent(component: ComponentSpec, path: string[] = []): void {
        const formInputTypes = ["Input", "Select", "Textarea", "Checkbox", "RadioGroup"];
        const props = component.props as Record<string, unknown>;

        if (formInputTypes.includes(component.type) && !props?.label && !props?.["aria-label"]) {
          results.push({
            rule: "form-labels",
            message: `${component.type} component missing label`,
            path,
            severity: "warning",
            suggestion: `Add a 'label' prop or 'aria-label' for accessibility`,
          });
        }

        if (component.children && Array.isArray(component.children)) {
          for (const [index, child] of component.children.entries()) {
            checkComponent(child, [...path, "children", index.toString()]);
          }
        }
      }

      checkComponent(spec.root);
      return results;
    },
  },

  {
    id: "unused-state",
    name: "Unused State Variables",
    description: "Warns about state variables that are defined but never used",
    severity: "warning",
    check: (spec) => {
      const results: LintResult[] = [];

      if (spec.state) {
        const stateKeys = Object.keys(spec.state);
        const usedStateKeys = new Set<string>();

        // Check props for state references
        function checkPropsForState(
          props: unknown,
          stateKeys: string[],
          usedKeys: Set<string>
        ): void {
          if (!props) return;
          const propsString = JSON.stringify(props);
          for (const key of stateKeys) {
            if (propsString.includes(`{{state.${key}}}`) || propsString.includes(`state.${key}`)) {
              usedKeys.add(key);
            }
          }
        }

        // Check conditions for state references
        function checkConditionForState(
          condition: unknown,
          stateKeys: string[],
          usedKeys: Set<string>
        ): void {
          if (!condition || typeof condition !== "string") return;
          for (const key of stateKeys) {
            if (condition.includes(`state.${key}`)) {
              usedKeys.add(key);
            }
          }
        }

        // Find all state references in the spec
        function findStateReferences(component: ComponentSpec): void {
          checkPropsForState(component.props, stateKeys, usedStateKeys);
          checkConditionForState(component.condition, stateKeys, usedStateKeys);

          if (component.children && Array.isArray(component.children)) {
            for (const child of component.children) {
              findStateReferences(child);
            }
          }
        }

        findStateReferences(spec.root);

        // Report unused state variables
        for (const key of stateKeys) {
          if (!usedStateKeys.has(key)) {
            results.push({
              rule: "unused-state",
              message: `State variable '${key}' is defined but never used`,
              path: ["state", key],
              severity: "warning",
              suggestion: "Remove unused state variables or use them in your components",
            });
          }
        }
      }

      return results;
    },
  },

  {
    id: "excessive-nesting",
    name: "Excessive Component Nesting",
    description: "Warns about deeply nested component structures",
    severity: "warning",
    check: (spec) => {
      const results: LintResult[] = [];
      const maxDepth = 10;

      function checkDepth(component: ComponentSpec, path: string[] = [], depth: number = 0): void {
        if (depth > maxDepth) {
          results.push({
            rule: "excessive-nesting",
            message: `Component nesting exceeds ${maxDepth} levels`,
            path,
            severity: "warning",
            suggestion: "Consider breaking down complex components into smaller, reusable parts",
          });
          return;
        }

        if (component.children && Array.isArray(component.children)) {
          for (const [index, child] of component.children.entries()) {
            checkDepth(child, [...path, "children", index.toString()], depth + 1);
          }
        }
      }

      checkDepth(spec.root);
      return results;
    },
  },
];

/**
 * Specification linter
 */
export class SpecificationLinter {
  private rules: Map<string, LintRule> = new Map();
  private enabledRules: Set<string> = new Set();

  constructor(rules: LintRule[] = builtInRules) {
    for (const rule of rules) {
      this.rules.set(rule.id, rule);
      this.enabledRules.add(rule.id);
    }
  }

  /**
   * Enable a specific rule
   */
  enableRule(ruleId: string): void {
    if (this.rules.has(ruleId)) {
      this.enabledRules.add(ruleId);
    }
  }

  /**
   * Disable a specific rule
   */
  disableRule(ruleId: string): void {
    this.enabledRules.delete(ruleId);
  }

  /**
   * Add a custom rule
   */
  addRule(rule: LintRule): void {
    this.rules.set(rule.id, rule);
    this.enabledRules.add(rule.id);
  }

  /**
   * Lint a specification
   */
  lint(spec: UISpecification): LintResult[] {
    const results: LintResult[] = [];

    // First, validate the specification
    const validationResult = validateUISpecification(spec as UISpecification);
    if (validationResult.err) {
      results.push({
        rule: "schema-validation",
        message: validationResult.val.message,
        path: [],
        severity: "error",
      });
    }

    // Then run enabled lint rules
    for (const ruleId of this.enabledRules) {
      const rule = this.rules.get(ruleId);
      if (rule) {
        try {
          const ruleResults = rule.check(spec);
          results.push(...ruleResults);
        } catch (error) {
          results.push({
            rule: ruleId,
            message: `Error running lint rule '${ruleId}': ${error instanceof Error ? error.message : String(error)}`,
            severity: "error",
          });
        }
      }
    }

    return results;
  }

  /**
   * Format lint results for console output
   */
  formatResults(results: LintResult[], colorize = true): string {
    return formatLintResults(results, colorize);
  }
}

/**
 * Create a preconfigured linter with all built-in rules
 */
export function createLinter(customRules?: LintRule[]): SpecificationLinter {
  const allRules = [...builtInRules];
  if (customRules) {
    allRules.push(...customRules);
  }
  return new SpecificationLinter(allRules);
}
