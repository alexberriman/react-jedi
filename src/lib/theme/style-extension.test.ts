import { describe, it, expect } from "vitest";
import {
  extractInheritableStyles,
  extractNonInheritableStyles,
  shouldInheritStyles,
  createChildStyleContext,
  composeStyles,
  cascadeStyles,
  resolveExtendedStyles,
  createStyleExtension,
  type StyleContext,
  type StyleSource,
} from "./style-extension";
import type { ComponentSpec } from "../../types/schema/components";
import { defaultTheme } from "./theme-presets";
import { createTokenResolver } from "./token-resolver";
import { extractTokensFromTheme, createTokenCollection } from "./theme-tokens";

describe("Style Extension System", () => {
  // Mock token resolver
  const mockTokens = createTokenResolver(
    defaultTheme.theme,
    createTokenCollection(extractTokensFromTheme(defaultTheme.theme))
  );

  // Mock style context
  const mockContext: StyleContext = {
    theme: defaultTheme.theme,
    tokens: mockTokens,
    componentPath: ["root"],
  };

  describe("extractInheritableStyles", () => {
    it("should extract only inheritable CSS properties", () => {
      const styles: React.CSSProperties = {
        color: "red",
        fontSize: "16px",
        margin: "10px",
        padding: "5px",
        fontFamily: "Arial",
        backgroundColor: "blue",
      };

      const inheritable = extractInheritableStyles(styles);

      expect(inheritable).toEqual({
        color: "red",
        fontSize: "16px",
        fontFamily: "Arial",
      });
    });

    it("should return empty object for undefined styles", () => {
      const inheritable = extractInheritableStyles(undefined);
      expect(inheritable).toEqual({});
    });

    it("should respect custom inheritance configuration", () => {
      const styles: React.CSSProperties = {
        color: "red",
        margin: "10px",
      };

      const customConfig = {
        inheritableProperties: new Set(["margin"]),
        inheritingComponents: new Set<string>(),
        boundaryComponents: new Set<string>(),
      };

      const inheritable = extractInheritableStyles(styles, customConfig);
      expect(inheritable).toEqual({ margin: "10px" });
    });
  });

  describe("extractNonInheritableStyles", () => {
    it("should extract only non-inheritable CSS properties", () => {
      const styles: React.CSSProperties = {
        color: "red",
        fontSize: "16px",
        margin: "10px",
        padding: "5px",
        width: "100px",
        height: "50px",
      };

      const nonInheritable = extractNonInheritableStyles(styles);

      expect(nonInheritable).toEqual({
        margin: "10px",
        padding: "5px",
        width: "100px",
        height: "50px",
      });
    });
  });

  describe("shouldInheritStyles", () => {
    it("should return true for inheriting components", () => {
      expect(shouldInheritStyles("Text")).toBe(true);
      expect(shouldInheritStyles("Heading")).toBe(true);
      expect(shouldInheritStyles("Button")).toBe(true);
    });

    it("should return false for boundary components", () => {
      expect(shouldInheritStyles("Card")).toBe(false);
      expect(shouldInheritStyles("Modal")).toBe(false);
      expect(shouldInheritStyles("Dialog")).toBe(false);
    });

    it("should return false for unknown components", () => {
      expect(shouldInheritStyles("UnknownComponent")).toBe(false);
    });
  });

  describe("createChildStyleContext", () => {
    it("should create child context with inheritance for inheriting components", () => {
      const parentContext: StyleContext = {
        ...mockContext,
        inheritedClassName: "parent-class",
        inheritedStyle: { color: "blue", fontSize: "14px" },
      };

      const childSpec: ComponentSpec = {
        type: "Text",
        children: "Hello",
      };

      const childOverrides = {
        className: "child-class",
        style: { color: "red", fontWeight: "bold" },
      };

      const childContext = createChildStyleContext(parentContext, childSpec, childOverrides);

      expect(childContext.inheritedClassName).toBe("parent-class child-class");
      expect(childContext.inheritedStyle).toEqual({
        color: "red", // child overrides parent
        fontSize: "14px", // inherited from parent
        fontWeight: "bold", // from child
      });
      expect(childContext.componentPath).toEqual(["root", "Text"]);
    });

    it("should reset inheritance for boundary components", () => {
      const parentContext: StyleContext = {
        ...mockContext,
        inheritedClassName: "parent-class",
        inheritedStyle: { color: "blue", fontSize: "14px" },
      };

      const childSpec: ComponentSpec = {
        type: "Card",
        children: "Card content",
      };

      const childOverrides = {
        className: "card-class",
        style: { backgroundColor: "white" },
      };

      const childContext = createChildStyleContext(parentContext, childSpec, childOverrides);

      expect(childContext.inheritedClassName).toBeUndefined();
      expect(childContext.inheritedStyle).toBeUndefined();
      expect(childContext.componentPath).toEqual(["root", "Card"]);
    });
  });

  describe("composeStyles", () => {
    it("should compose multiple style sources in precedence order", () => {
      const sources: StyleSource[] = [
        {
          source: "theme.defaults",
          className: "default-class",
          style: { color: "black", fontSize: "12px" },
        },
        {
          source: "spec.style",
          className: "spec-class",
          style: { color: "blue", margin: "10px" },
        },
        {
          source: "runtime.overrides",
          className: "runtime-class",
          style: { color: "red" },
        },
      ];

      const composed = composeStyles(sources);

      expect(composed.className).toBe("default-class spec-class runtime-class");
      expect(composed.style).toEqual({
        color: "red", // runtime overrides spec and defaults
        fontSize: "12px", // from defaults
        margin: "10px", // from spec
      });
    });

    it("should respect custom priority", () => {
      const sources: StyleSource[] = [
        {
          source: "custom.low",
          style: { color: "low" },
          priority: 1,
        },
        {
          source: "custom.high",
          style: { color: "high" },
          priority: 10,
        },
      ];

      const composed = composeStyles(sources);
      expect(composed.style?.color).toBe("high");
    });
  });

  describe("cascadeStyles", () => {
    it("should apply CSS-like cascade resolution", () => {
      const sources: StyleSource[] = [
        {
          source: "theme.defaults",
          className: "btn",
          style: { color: "blue", padding: "5px" },
        },
        {
          source: "spec.className",
          className: "btn-primary btn-large",
          style: { color: "red" },
        },
      ];

      const cascaded = cascadeStyles(sources);

      expect(cascaded.className).toBe("btn btn-primary btn-large");
      expect(cascaded.style).toEqual({
        color: "red", // higher specificity wins
        padding: "5px",
      });
    });

    it("should handle !important declarations", () => {
      const sources: StyleSource[] = [
        {
          source: "theme.defaults",
          style: { color: "blue !important" },
        },
        {
          source: "spec.style",
          style: { color: "red" },
        },
      ];

      const cascaded = cascadeStyles(sources);
      expect(cascaded.style?.color).toBe("blue");
    });
  });

  describe("resolveExtendedStyles", () => {
    it("should resolve complete style pipeline", () => {
      const spec: ComponentSpec = {
        type: "Text",
        className: "custom-text",
        style: { fontWeight: "bold" },
        children: "Hello",
      };

      const context: StyleContext = {
        ...mockContext,
        inheritedClassName: "inherited-class",
        inheritedStyle: { color: "blue", fontSize: "14px" },
      };

      const themeOverrides = {
        className: "theme-text",
        style: { textAlign: "center" as const },
      };

      const resolved = resolveExtendedStyles(spec, context, themeOverrides);

      expect(resolved.className).toBe("theme-text inherited-class custom-text");
      expect(resolved.style).toEqual({
        color: "blue", // inherited
        fontSize: "14px", // inherited
        textAlign: "center", // theme override
        fontWeight: "bold", // spec style
      });
    });
  });

  describe("createStyleExtension", () => {
    it("should create a complete style extension utility", () => {
      const extension = createStyleExtension(defaultTheme.theme);

      expect(extension).toHaveProperty("extractInheritable");
      expect(extension).toHaveProperty("shouldInherit");
      expect(extension).toHaveProperty("compose");
      expect(extension).toHaveProperty("cascade");
      expect(extension).toHaveProperty("resolve");

      // Test utility functions
      const inheritable = extension.extractInheritable({ color: "red", margin: "10px" });
      expect(inheritable).toEqual({ color: "red" });

      expect(extension.shouldInherit("Text")).toBe(true);
      expect(extension.shouldInherit("Card")).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty style sources", () => {
      const sources: StyleSource[] = [];
      const composed = composeStyles(sources);

      expect(composed.className).toBeUndefined();
      expect(composed.style).toBeUndefined();
    });

    it("should handle undefined values in sources", () => {
      const sources: StyleSource[] = [{ source: "test", className: undefined, style: undefined }];

      const composed = composeStyles(sources);
      expect(composed.className).toBeUndefined();
      expect(composed.style).toBeUndefined();
    });

    it("should handle circular inheritance paths", () => {
      const context: StyleContext = {
        ...mockContext,
        componentPath: ["root", "container", "card", "container"],
      };

      const spec: ComponentSpec = {
        type: "Text",
        children: "Circular test",
      };

      // Should not throw error
      const childContext = createChildStyleContext(context, spec, {});
      expect(childContext.componentPath).toEqual([
        "root",
        "container",
        "card",
        "container",
        "Text",
      ]);
    });
  });
});
