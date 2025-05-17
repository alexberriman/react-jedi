import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createDeveloperError,
  formatErrorWithContext,
  ErrorCodes,
  createMissingComponentError,
} from "./error-messages";
import { createLinter, SpecificationLinter, type LintResult } from "./spec-linter";
import { createFormatter } from "./spec-formatter";
import { Debug, DebugLevel, createDebugRender } from "./debug-utils";
import type { SpecificationSchema } from "../../types/schema/specification";

describe("Developer Tools", () => {
  describe("Error Messages", () => {
    it("should create developer errors with enhanced information", () => {
      const error = createDeveloperError(
        ErrorCodes.COMPONENT_NOT_FOUND,
        "Component 'Buttn' not found",
        {
          component: "Buttn" as never,
          suggestion: "Did you mean 'Button'?",
          documentation: "https://docs.example.com/components/button",
        }
      );

      expect(error.code).toBe(ErrorCodes.COMPONENT_NOT_FOUND);
      expect(error.message).toBe("Component 'Buttn' not found");
      expect(error.suggestion).toBe("Did you mean 'Button'?");
      expect(error.documentation).toBe("https://docs.example.com/components/button");
    });

    it("should format errors with context", () => {
      const error = createDeveloperError(ErrorCodes.INVALID_SCHEMA, "Invalid component props", {
        component: "Button" as never,
        path: ["root", "children", "0", "props"],
        suggestion: "Check the Button component documentation",
        severity: "error",
      });

      const formatted = formatErrorWithContext(error);
      expect(formatted).toContain("[INVALID_SCHEMA]");
      expect(formatted).toContain("Invalid component props");
      expect(formatted).toContain("Component: Button");
      expect(formatted).toContain("Path: root → children → 0 → props");
      expect(formatted).toContain("💡 Suggestion:");
    });

    it("should suggest similar component names", () => {
      const error = createMissingComponentError("Buton", ["Button", "Badge", "Box", "Input"]);

      expect(error.suggestion).toContain("Did you mean: Button");
    });
  });

  describe("Specification Linter", () => {
    let linter: SpecificationLinter;
    let testSpec: SpecificationSchema;

    beforeEach(() => {
      linter = createLinter();
      testSpec = {
        version: "1.0",
        root: {
          type: "Box",
          props: {
            className: "container",
          },
          children: [],
        },
      };
    });

    it("should detect empty children arrays", () => {
      const results = linter.lint(testSpec);
      const emptyChildrenResults = results.filter((r) => r.rule === "no-empty-children");

      expect(emptyChildrenResults).toHaveLength(1);
      expect(emptyChildrenResults[0].severity).toBe("warning");
    });

    it("should detect missing image alt text", () => {
      const specWithImage: SpecificationSchema = {
        version: "1.0",
        root: {
          type: "Image",
          props: {
            src: "test.jpg",
          },
        },
      };

      const results = linter.lint(specWithImage);
      const altTextResults = results.filter((r) => r.rule === "accessibility-alt-text");

      expect(altTextResults).toHaveLength(1);
      expect(altTextResults[0].severity).toBe("error");
      expect(altTextResults[0].suggestion).toContain("Add an 'alt' prop");
    });

    it("should format lint results nicely", () => {
      const results: LintResult[] = [
        {
          rule: "test-rule",
          message: "Test error message",
          severity: "error",
          path: ["root", "props"],
        },
        {
          rule: "test-warning",
          message: "Test warning message",
          severity: "warning",
        },
      ];

      const formatted = linter.formatResults(results, false);
      expect(formatted).toContain("ERRORS (1)");
      expect(formatted).toContain("WARNINGS (1)");
      expect(formatted).toContain("Found 2 issues");
    });
  });

  describe("Specification Formatter", () => {
    let formatter: ReturnType<typeof createFormatter>;

    beforeEach(() => {
      formatter = createFormatter();
    });

    it("should format specifications with consistent ordering", () => {
      const spec: SpecificationSchema = {
        root: {
          type: "Box",
          props: { className: "test" },
          id: "main",
        },
        version: "1.0",
        theme: {
          colors: {
            primary: "#000",
          },
        },
      };

      const formatted = formatter.format(spec);
      const parsed = JSON.parse(formatted);
      const keys = Object.keys(parsed);

      // Check that version comes before root
      expect(keys.indexOf("version")).toBeLessThan(keys.indexOf("root"));
      // Check that theme comes before root
      expect(keys.indexOf("theme")).toBeLessThan(keys.indexOf("root"));
    });

    it("should format component properties in correct order", () => {
      const spec: SpecificationSchema = {
        version: "1.0",
        root: {
          children: [],
          props: { className: "test" },
          type: "Box",
          id: "main",
        },
      };

      const formatted = formatter.formatInPlace(spec);
      const rootKeys = Object.keys(formatted.root);

      // Check component property order
      expect(rootKeys[0]).toBe("type");
      expect(rootKeys[1]).toBe("id");
      expect(rootKeys[2]).toBe("props");
      expect(rootKeys[3]).toBe("children");
    });

    it("should format component tree for debugging", () => {
      const spec: SpecificationSchema = {
        version: "1.0",
        root: {
          type: "Box",
          id: "container",
          children: [
            {
              type: "Button",
              id: "submit-btn",
              props: { variant: "primary" },
            },
            {
              type: "Text",
              props: { children: "Hello" },
            },
          ],
        },
      };

      const tree = formatter.formatComponentTree(spec, false);
      expect(tree).toContain("Box (container)");
      expect(tree).toContain("├── Button (submit-btn)");
      expect(tree).toContain("└── Text");
    });
  });

  describe("Debug Utils", () => {
    beforeEach(() => {
      // Reset debug configuration
      Debug.configure({ enabled: false });
      Debug.clear();

      // Spy on console methods
      vi.spyOn(console, "log").mockImplementation(() => {});
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    it("should configure debug settings", () => {
      Debug.configure({
        enabled: true,
        level: DebugLevel.DEBUG,
        logComponentRenders: true,
      });

      const config = Debug.getConfig();
      expect(config.enabled).toBe(true);
      expect(config.level).toBe(DebugLevel.DEBUG);
      expect(config.logComponentRenders).toBe(true);
    });

    it("should log messages based on debug level", () => {
      Debug.configure({
        enabled: true,
        level: DebugLevel.WARN,
      });

      Debug.log(DebugLevel.ERROR, "Error message");
      Debug.log(DebugLevel.WARN, "Warning message");
      Debug.log(DebugLevel.INFO, "Info message"); // Should not log

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining("Info message"));
    });

    it("should profile function execution", () => {
      Debug.configure({ enabled: true });

      const mockFn = vi.fn(() => {
        // Simulate work
        for (let i = 0; i < 1_000_000; i++) {
          if (i > 0) {
            const sqrt = Math.sqrt(i);
            if (sqrt) {
              // Ensure the calculation is used
            }
          }
        }
        return "result";
      });

      const result = Debug.profile("Test Function", mockFn);

      expect(result).toBe("result");
      expect(mockFn).toHaveBeenCalled();
    });

    it("should create debug report", () => {
      Debug.configure({ enabled: true });

      // Simulate some activity
      Debug.logRender(
        { type: "Button" },
        {
          componentPath: ["App", "Button"],
          renderCount: 1,
          renderTime: 5,
          props: { variant: "primary" },
          errors: [],
        }
      );

      const report = Debug.createDebugReport();

      expect(report).toContain("React Jedi Debug Report");
      expect(report).toContain("Render Statistics");
      expect(report).toContain("State History");
      expect(report).toContain("Configuration");
    });

    it("should wrap render functions with debugging", () => {
      Debug.configure({ enabled: true });

      const mockRender = vi.fn((props: { text: string }) => `Rendered ${props.text}`);
      const debugRender = createDebugRender(mockRender, "TestComponent");

      const result = debugRender({ text: "Hello" });

      expect(result).toBe("Rendered Hello");
      expect(mockRender).toHaveBeenCalledWith({ text: "Hello" });
    });
  });
});
