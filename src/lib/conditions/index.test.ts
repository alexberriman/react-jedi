import { describe, it, expect } from "vitest";
import { shouldRenderComponent, applyConditionalProps, processConditionals } from "./index";
import type { ComponentSpec } from "@/types/schema/components";

describe("Conditional Rendering Module", () => {
  describe("shouldRenderComponent", () => {
    it("should return true when no condition is specified", () => {
      const spec: ComponentSpec = { type: "Box" };
      const context = { state: { isVisible: false } };

      expect(shouldRenderComponent(spec, context)).toBe(true);
    });

    it("should evaluate boolean conditions", () => {
      const spec1: ComponentSpec = { type: "Box", when: true };
      const spec2: ComponentSpec = { type: "Box", when: false };
      const context = {};

      expect(shouldRenderComponent(spec1, context)).toBe(true);
      expect(shouldRenderComponent(spec2, context)).toBe(false);
    });

    it("should evaluate string expressions", () => {
      const spec: ComponentSpec = { type: "Box", when: "state.isVisible" };
      const context1 = { state: { isVisible: true } };
      const context2 = { state: { isVisible: false } };

      expect(shouldRenderComponent(spec, context1)).toBe(true);
      expect(shouldRenderComponent(spec, context2)).toBe(false);
    });

    it("should handle complex conditions", () => {
      const spec: ComponentSpec = {
        type: "Box",
        when: "state.count > 5 && props.enabled !== false",
      };
      const context = {
        state: { count: 10 },
        props: { enabled: true },
      };

      expect(shouldRenderComponent(spec, context)).toBe(true);
    });
  });

  describe("applyConditionalProps", () => {
    it("should return spec unchanged when no conditional props", () => {
      const spec: ComponentSpec = { type: "Box", className: "test" };
      const context = {};

      expect(applyConditionalProps(spec, context)).toEqual(spec);
    });

    it("should apply matching conditional props", () => {
      const spec: ComponentSpec = {
        type: "Button",
        conditionalProps: {
          variant: {
            'props.type === "primary"': "default",
            'props.type === "secondary"': "outline",
          },
          disabled: {
            "state.loading": true,
          },
        },
      };

      const context = {
        props: { type: "primary" },
        state: { loading: true },
      };

      const result = applyConditionalProps(spec, context);
      expect((result as Record<string, unknown>).variant).toBe("default");
      expect((result as Record<string, unknown>).disabled).toBe(true);
    });

    it("should use first matching condition", () => {
      const spec: ComponentSpec = {
        type: "Box",
        conditionalProps: {
          className: {
            "state.status === 'active'": "bg-green-500",
            "state.status === 'inactive'": "bg-gray-500",
            true: "bg-default", // fallback
          },
        },
      };

      const context = {
        state: { status: "active" },
      };

      const result = applyConditionalProps(spec, context);
      expect((result as Record<string, unknown>).className).toBe("bg-green-500");
    });

    it("should handle no matching conditions", () => {
      const spec: ComponentSpec = {
        type: "Box",
        conditionalProps: {
          variant: {
            'props.type === "primary"': "default",
            'props.type === "secondary"': "outline",
          },
        },
      };

      const context = {
        props: { type: "tertiary" },
      };

      const result = applyConditionalProps(spec, context);
      expect((result as Record<string, unknown>).variant).toBeUndefined();
    });
  });

  describe("processConditionals", () => {
    it("should return null when visibility condition is false", () => {
      const spec: ComponentSpec = {
        type: "Box",
        when: false,
        className: "test",
      };
      const context = {};

      expect(processConditionals(spec, context)).toBeNull();
    });

    it("should apply conditional props when visible", () => {
      const spec: ComponentSpec = {
        type: "Button",
        when: "state.showButton",
        conditionalProps: {
          variant: {
            "props.isPrimary": "default",
            true: "outline",
          },
        },
      };

      const context = {
        state: { showButton: true },
        props: { isPrimary: true },
      };

      const result = processConditionals(spec, context);
      expect(result).not.toBeNull();
      expect((result as Record<string, unknown>)?.variant).toBe("default");
    });

    it("should handle complex scenarios", () => {
      const spec: ComponentSpec = {
        type: "Card",
        when: "state.user && state.user.authenticated",
        className: "user-card",
        conditionalProps: {
          className: {
            'state.user.role === "admin"': "user-card admin-card",
            'state.user.role === "user"': "user-card standard-card",
          },
          style: {
            'state.theme === "dark"': { backgroundColor: "#000", color: "#fff" },
            'state.theme === "light"': { backgroundColor: "#fff", color: "#000" },
          },
        },
      };

      const context = {
        state: {
          user: { authenticated: true, role: "admin" },
          theme: "dark",
        },
      };

      const result = processConditionals(spec, context);
      expect(result).not.toBeNull();
      expect((result as Record<string, unknown>)?.className).toBe("user-card admin-card");
      expect((result as Record<string, unknown>)?.style).toEqual({
        backgroundColor: "#000",
        color: "#fff",
      });
    });
  });
});
