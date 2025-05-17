import type { UISpecification } from "../../types/schema/specification";
import type { ComponentSpec } from "../../types/schema/components";

/**
 * Configuration options for the formatter
 */
export interface FormatterOptions {
  /**
   * Number of spaces for indentation
   * @default 2
   */
  indent?: number;

  /**
   * Sort object keys alphabetically
   * @default true
   */
  sortKeys?: boolean;

  /**
   * Compact arrays on single line if they fit
   * @default true
   */
  compactArrays?: boolean;

  /**
   * Maximum line length before wrapping
   * @default 80
   */
  maxLineLength?: number;

  /**
   * Add trailing commas
   * @default true
   */
  trailingCommas?: boolean;

  /**
   * Order of top-level keys in specifications
   */
  topLevelOrder?: string[];

  /**
   * Order of component property keys
   */
  componentOrder?: string[];
}

const defaultOptions: Required<FormatterOptions> = {
  indent: 2,
  sortKeys: true,
  compactArrays: true,
  maxLineLength: 80,
  trailingCommas: true,
  topLevelOrder: ["version", "metadata", "theme", "imports", "state", "root"],
  componentOrder: ["type", "id", "props", "children", "condition", "styles"],
};

/**
 * Specification formatter for consistent, readable JSON
 */
export class SpecificationFormatter {
  private options: Required<FormatterOptions>;

  constructor(options: FormatterOptions = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Format a specification to a consistent structure
   */
  format(spec: UISpecification): string {
    const formatted = this.formatObject(spec, 0, this.options.topLevelOrder);
    return JSON.stringify(formatted, null, this.options.indent);
  }

  /**
   * Format a specification in place (mutates the original)
   */
  formatInPlace(spec: UISpecification): UISpecification {
    return this.formatObject(spec, 0, this.options.topLevelOrder) as UISpecification;
  }

  /**
   * Format an object with proper key ordering
   */
  private formatObject(obj: unknown, depth: number, keyOrder?: string[]): unknown {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return this.formatArray(obj, depth);

    const typedObj = obj as Record<string, unknown>;
    const ordered: Record<string, unknown> = {};
    const keys = Object.keys(obj);

    // First, add keys in specified order
    if (keyOrder) {
      for (const key of keyOrder) {
        if (key in obj) {
          ordered[key] = this.formatValue(typedObj[key], depth + 1, this.getKeyOrder(key));
        }
      }
    }

    // Then add remaining keys
    const remainingKeys = keys.filter((key) => !keyOrder || !keyOrder.includes(key));
    if (this.options.sortKeys) {
      remainingKeys.sort((a, b) => a.localeCompare(b));
    }

    for (const key of remainingKeys) {
      ordered[key] = this.formatValue(typedObj[key], depth + 1, this.getKeyOrder(key));
    }

    return ordered;
  }

  /**
   * Format an array with optional compacting
   */
  private formatArray(arr: unknown[], depth: number): unknown[] {
    return arr.map((item) => this.formatValue(item, depth + 1));
  }

  /**
   * Format a single value
   */
  private formatValue(value: unknown, depth: number, keyOrder?: string[]): unknown {
    if (value === null || value === undefined) return value;
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return this.formatArray(value, depth);
      }
      return this.formatObject(value, depth, keyOrder);
    }
    return value;
  }

  /**
   * Get the key order for nested objects
   */
  private getKeyOrder(key: string): string[] | undefined {
    if (key === "root" || key === "children") {
      return this.options.componentOrder;
    }
    if (key === "theme") {
      return ["colors", "spacing", "typography", "components"];
    }
    if (key === "props") {
      return ["className", "style", "onClick", "onChange"];
    }
    return undefined;
  }

  /**
   * Pretty print a specification with syntax highlighting (for terminal)
   */
  prettyPrint(spec: UISpecification, colorize = true): string {
    const formatted = this.format(spec);
    if (!colorize) return formatted;

    // Apply syntax highlighting
    return (
      formatted
        // Keys
        .replaceAll(/"([^"]+)":/g, '\u001B[36m"$1":\u001B[0m')
        // String values
        .replaceAll(/: "([^"]+)"/g, ': \u001B[32m"$1"\u001B[0m')
        // Numbers
        .replaceAll(/: (\d+)/g, ": \u001B[33m$1\u001B[0m")
        // Booleans
        .replaceAll(/: (true|false)/g, ": \u001B[35m$1\u001B[0m")
        // Null
        .replaceAll(": null", ": \u001B[31mnull\u001B[0m")
    );
  }

  /**
   * Format component tree structure (for debugging)
   */
  formatComponentTree(spec: UISpecification, colorize = true): string {
    const lines: string[] = [];

    function traverse(component: ComponentSpec, depth = 0, isLast = true, prefix = ""): void {
      let indent = "";
      if (depth > 0) {
        indent = prefix + (isLast ? "└── " : "├── ");
      }
      const idInfo = component.id ? ` (${component.id})` : "";
      const typeInfo = component.type;
      const componentInfo = `${typeInfo}${idInfo}`;

      if (colorize) {
        lines.push(`${indent}\u001B[36m${componentInfo}\u001B[0m`);
      } else {
        lines.push(`${indent}${componentInfo}`);
      }

      if (component.children && Array.isArray(component.children)) {
        let childPrefix = "";
        if (depth > 0) {
          childPrefix = prefix + (isLast ? "    " : "│   ");
        }
        for (const [index, child] of component.children.entries()) {
          const childrenLength = component.children?.length ?? 0;
          const isLastChild = index === childrenLength - 1;
          traverse(child, depth + 1, isLastChild, childPrefix);
        }
      }
    }

    traverse(spec.root);
    return lines.join("\n");
  }

  /**
   * Format a specification diff (for debugging updates)
   */
  formatDiff(before: UISpecification, after: UISpecification): string {
    const beforeStr = this.format(before);
    const afterStr = this.format(after);

    const beforeLines = beforeStr.split("\n");
    const afterLines = afterStr.split("\n");

    const diff: string[] = [];
    const maxLength = Math.max(beforeLines.length, afterLines.length);

    for (let i = 0; i < maxLength; i++) {
      const beforeLine = beforeLines[i] || "";
      const afterLine = afterLines[i] || "";

      if (beforeLine === afterLine) {
        diff.push(`  ${beforeLine}`);
      } else {
        if (beforeLine && !afterLine) {
          diff.push(`\u001B[31m- ${beforeLine}\u001B[0m`);
        } else if (!beforeLine && afterLine) {
          diff.push(`\u001B[32m+ ${afterLine}\u001B[0m`);
        } else {
          diff.push(`\u001B[31m- ${beforeLine}\u001B[0m`, `\u001B[32m+ ${afterLine}\u001B[0m`);
        }
      }
    }

    return diff.join("\n");
  }
}

/**
 * Create a preconfigured formatter
 */
export function createFormatter(options?: FormatterOptions): SpecificationFormatter {
  return new SpecificationFormatter(options);
}

/**
 * Format a specification with default options
 */
export function formatSpecification(spec: UISpecification, options?: FormatterOptions): string {
  const formatter = new SpecificationFormatter(options);
  return formatter.format(spec);
}

/**
 * Format and validate a specification
 */
export function formatAndValidate(
  spec: UISpecification,
  options?: FormatterOptions
): {
  formatted: string;
  isValid: boolean;
  errors?: string[];
} {
  try {
    const formatter = new SpecificationFormatter(options);
    const formatted = formatter.format(spec);

    // Try to parse the formatted JSON to ensure it's valid
    JSON.parse(formatted);

    return {
      formatted,
      isValid: true,
    };
  } catch (error) {
    return {
      formatted: "",
      isValid: false,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}
