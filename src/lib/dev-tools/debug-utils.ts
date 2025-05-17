import type { SpecificationSchema } from "../../types/schema/specification";
import type { ComponentSpec } from "../../types/schema/components";
import type { StateValues } from "../../types/state";
import { formatSpecification } from "./spec-formatter";
import { createLinter } from "./spec-linter";

/**
 * Debug logging levels
 */
export enum DebugLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  TRACE = 5,
}

/**
 * Debug context for tracking component render information
 */
export interface DebugContext {
  componentPath: string[];
  renderCount: number;
  renderTime: number;
  props: Record<string, unknown>;
  state?: StateValues;
  errors: Error[];
}

/**
 * Global debug configuration
 */
export interface DebugConfig {
  enabled: boolean;
  level: DebugLevel;
  logComponentRenders: boolean;
  logStateChanges: boolean;
  logEventHandlers: boolean;
  performanceThreshold: number;
  breakOnError: boolean;
  consoleGroups: boolean;
}

const defaultConfig: DebugConfig = {
  enabled: false,
  level: DebugLevel.INFO,
  logComponentRenders: false,
  logStateChanges: false,
  logEventHandlers: false,
  performanceThreshold: 16, // 16ms for 60fps
  breakOnError: false,
  consoleGroups: true,
};

/**
 * Debug utilities for development
 */
export class DebugUtils {
  private static config: DebugConfig = { ...defaultConfig };
  private static renderCounts = new Map<string, number>();
  private static renderTimes = new Map<string, number[]>();
  private static stateHistory: Array<{ timestamp: number; state: StateValues; changes: string[] }> =
    [];

  /**
   * Configure debug settings
   */
  static configure(config: Partial<DebugConfig>): void {
    DebugUtils.config = { ...DebugUtils.config, ...config };

    if (config.enabled !== undefined) {
      if (config.enabled) {
        console.log("%c🔧 React Jedi Debug Mode Enabled", "color: #4CAF50; font-weight: bold");
      } else {
        console.log("%c🔧 React Jedi Debug Mode Disabled", "color: #9E9E9E");
      }
    }
  }

  /**
   * Get current debug configuration
   */
  static getConfig(): DebugConfig {
    return { ...DebugUtils.config };
  }

  /**
   * Log a debug message with appropriate level
   */
  static log(level: DebugLevel, message: string, data?: unknown): void {
    if (!DebugUtils.config.enabled || level > DebugUtils.config.level) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${DebugLevel[level]}]`;

    switch (level) {
      case DebugLevel.ERROR: {
        console.error(`${prefix} ${message}`, data);
        if (DebugUtils.config.breakOnError) {
          // Breakpoint for debugging - intentional use
          console.warn("Debug breakpoint hit", message);
        }
        break;
      }
      case DebugLevel.WARN: {
        console.warn(`${prefix} ${message}`, data);
        break;
      }
      case DebugLevel.INFO: {
        console.info(`${prefix} ${message}`, data);
        break;
      }
      case DebugLevel.DEBUG: {
        console.debug(`${prefix} ${message}`, data);
        break;
      }
      case DebugLevel.TRACE: {
        console.trace(`${prefix} ${message}`, data);
        break;
      }
    }
  }

  /**
   * Log component render
   */
  static logRender(component: ComponentSpec, context: Partial<DebugContext>): void {
    if (!DebugUtils.config.enabled || !DebugUtils.config.logComponentRenders) return;

    const path = context.componentPath?.join(" > ") || component.type;
    const count = (DebugUtils.renderCounts.get(path) || 0) + 1;
    DebugUtils.renderCounts.set(path, count);

    const startTime = globalThis.performance.now();

    if (DebugUtils.config.consoleGroups) {
      const labelColor = "color: #2196F3; font-weight: normal";
      const label = "🔄 Render #" + count + ": " + path;
      console.groupCollapsed(`%c${label}`, labelColor);
    }

    DebugUtils.log(DebugLevel.DEBUG, "Component render", {
      component: component.type,
      path,
      renderCount: count,
      props: context.props,
      state: context.state,
    });

    if (DebugUtils.config.consoleGroups) {
      console.groupEnd();
    }

    // Track render time
    const renderTime = globalThis.performance.now() - startTime;
    const times = DebugUtils.renderTimes.get(path) || [];
    times.push(renderTime);
    DebugUtils.renderTimes.set(path, times);

    // Warn about slow renders
    if (renderTime > DebugUtils.config.performanceThreshold) {
      DebugUtils.log(
        DebugLevel.WARN,
        `Slow render detected: ${path} took ${renderTime.toFixed(2)}ms`,
        { component: component.type, renderTime }
      );
    }
  }

  /**
   * Log state change
   */
  static logStateChange(oldState: StateValues, newState: StateValues, changes: string[]): void {
    if (!DebugUtils.config.enabled || !DebugUtils.config.logStateChanges) return;

    const timestamp = Date.now();
    DebugUtils.stateHistory.push({ timestamp, state: newState, changes });

    if (DebugUtils.config.consoleGroups) {
      console.groupCollapsed(`%c📊 State Change`, "color: #4CAF50; font-weight: normal");
    }

    DebugUtils.log(DebugLevel.INFO, "State updated", {
      changes,
      oldState,
      newState,
      diff: changes.map((key) => ({
        key,
        old: oldState[key],
        new: newState[key],
      })),
    });

    if (DebugUtils.config.consoleGroups) {
      console.groupEnd();
    }
  }

  /**
   * Log event handler execution
   */
  static logEvent(eventName: string, handler: string, data?: unknown): void {
    if (!DebugUtils.config.enabled || !DebugUtils.config.logEventHandlers) return;

    DebugUtils.log(DebugLevel.DEBUG, `Event: ${eventName}`, {
      handler,
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Create a debug report for the current render
   */
  static createDebugReport(): string {
    const report: string[] = [];
    report.push(
      "=== React Jedi Debug Report ===",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Render Statistics",
      ""
    );

    // Sort components by render count
    const renderStats = [...DebugUtils.renderCounts.entries()].sort((a, b) => b[1] - a[1]);

    for (const [path, count] of renderStats) {
      const times = DebugUtils.renderTimes.get(path) || [];
      const avgTime = times.length > 0 ? times.reduce((sum, t) => sum + t, 0) / times.length : 0;

      report.push(`- ${path}: ${count} renders (avg: ${avgTime.toFixed(2)}ms)`);
    }

    report.push("", "## State History", "");

    for (const { timestamp, changes } of DebugUtils.stateHistory.slice(-10)) {
      const time = new Date(timestamp).toLocaleTimeString();
      report.push(`- ${time}: ${changes.join(", ")}`);
    }

    report.push("", "## Configuration", "");
    const configString = JSON.stringify(DebugUtils.config, null, 2);
    report.push(configString);

    return report.join("\n");
  }

  /**
   * Clear all debug data
   */
  static clear(): void {
    DebugUtils.renderCounts.clear();
    DebugUtils.renderTimes.clear();
    DebugUtils.stateHistory = [];
    console.clear();
    DebugUtils.log(DebugLevel.INFO, "Debug data cleared");
  }

  /**
   * Performance profiler for components
   */
  static profile<T>(name: string, fn: () => T): T {
    if (!DebugUtils.config.enabled) return fn();

    const start = globalThis.performance.now();
    try {
      const result = fn();
      const duration = globalThis.performance.now() - start;

      if (duration > DebugUtils.config.performanceThreshold) {
        DebugUtils.log(
          DebugLevel.WARN,
          `Performance warning: ${name} took ${duration.toFixed(2)}ms`
        );
      }

      return result;
    } catch (error) {
      const duration = globalThis.performance.now() - start;
      DebugUtils.log(DebugLevel.ERROR, `Error in ${name} after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  }

  /**
   * Validate and debug a specification
   */
  static debugSpecification(spec: SpecificationSchema): void {
    if (!DebugUtils.config.enabled) return;

    console.group("%c🔍 Specification Debug", "color: #9C27B0; font-weight: bold");

    // Lint the specification
    const linter = createLinter();
    const lintResults = linter.lint(spec);

    if (lintResults.length > 0) {
      console.group("Lint Results");
      console.log(linter.formatResults(lintResults));
      console.groupEnd();
    }

    // Format and display the specification
    console.group("Formatted Specification");
    console.log(formatSpecification(spec));
    console.groupEnd();

    // Component tree
    console.group("Component Tree");
    const formatter = createLinter();
    console.log(formatter.formatResults(lintResults));
    console.groupEnd();

    console.groupEnd();
  }

  /**
   * Create a visual component tree representation
   */
  static visualizeComponentTree(spec: SpecificationSchema): void {
    if (!DebugUtils.config.enabled) return;

    function traverse(component: ComponentSpec, depth = 0): string[] {
      const lines: string[] = [];
      const indent = "  ".repeat(depth);
      const componentTypeInfo = component.type;
      const componentIdInfo = component.id ? ` #${component.id}` : "";
      const info = componentTypeInfo + componentIdInfo;

      const prefix = `${indent}📦 `;
      lines.push(prefix + info);

      if (component.props && Object.keys(component.props).length > 0) {
        lines.push(`${indent}  └─ props: ${JSON.stringify(component.props, null, 0)}`);
      }

      if (component.children && Array.isArray(component.children)) {
        for (const child of component.children) {
          lines.push(...traverse(child, depth + 1));
        }
      }

      return lines;
    }

    console.group("%c🌳 Component Tree", "color: #4CAF50; font-weight: bold");
    console.log(traverse(spec.root).join("\n"));
    console.groupEnd();
  }
}

/**
 * Create a debug-enabled render function wrapper
 */
export function createDebugRender<T extends (...args: never[]) => unknown>(
  renderFn: T,
  componentName: string
): T {
  return ((...args: Parameters<T>) => {
    if (!DebugUtils.getConfig().enabled) {
      return renderFn(...args);
    }

    return DebugUtils.profile(`Render ${componentName}`, () => renderFn(...args));
  }) as T;
}

/**
 * React hook for component debugging
 */
export function useDebug(componentName: string, props?: Record<string, unknown>): void {
  const renderCount = React.useRef(0);
  const previousProps = React.useRef(props);

  React.useEffect(() => {
    if (!DebugUtils.getConfig().enabled) return;

    renderCount.current++;

    DebugUtils.logRender({ type: componentName } as ComponentSpec, {
      componentPath: [componentName],
      renderCount: renderCount.current,
      renderTime: 0,
      props: props || {},
      errors: [],
    });

    // Log prop changes
    if (previousProps.current && props) {
      const changes = Object.keys(props).filter(
        (key) => props[key] !== previousProps.current![key]
      );

      if (changes.length > 0) {
        DebugUtils.log(DebugLevel.DEBUG, `Props changed in ${componentName}`, {
          changes,
          old: previousProps.current,
          new: props,
        });
      }
    }

    previousProps.current = props;
  });
}

// Export singleton instance for easier access
export const Debug = DebugUtils;
