import { describe, it, expect } from "vitest";
import {
  extractStateConfig,
  createStateInitialization,
  parseStateExpression,
  resolveStateBindings,
  extractStateDependencies,
} from "./state-initialization";
import type { ComponentSpec } from "@/types/schema/components";

describe("State Initialization", () => {
  describe("extractStateConfig", () => {
    it("should extract state config from component spec", () => {
      const spec: ComponentSpec = {
        type: "Box",
        id: "test",
        state: {
          initial: { count: 0, text: "hello" },
          reducers: {
            increment: (state: { count: number; text: string }) => ({
              ...state,
              count: state.count + 1,
            }),
          },
        },
      };

      const config = extractStateConfig(spec);
      expect(config).toEqual({
        initial: { count: 0, text: "hello" },
        reducers: expect.any(Object),
        effects: undefined,
      });
    });

    it("should handle string state references", () => {
      const spec: ComponentSpec = {
        type: "Text",
        id: "test",
        state: "globalKey",
      };

      const config = extractStateConfig(spec);
      expect(config).toEqual({
        initial: { value: "globalKey" },
      });
    });

    it("should return null for missing state", () => {
      const spec: ComponentSpec = {
        type: "Box",
        id: "test",
      };

      const config = extractStateConfig(spec);
      expect(config).toBeNull();
    });
  });

  describe("createStateInitialization", () => {
    it("should create initial state from specification", () => {
      const specification = {
        state: {
          initial: {
            user: { name: "John", age: 30 },
            settings: { theme: "dark" },
          },
        },
      };

      const initial = createStateInitialization(specification);
      expect(initial).toEqual({
        user: { name: "John", age: 30 },
        settings: { theme: "dark" },
      });
    });

    it("should return empty object for missing state", () => {
      const specification = {};
      const initial = createStateInitialization(specification);
      expect(initial).toEqual({});
    });
  });

  describe("parseStateExpression", () => {
    it("should parse simple property access", () => {
      const context = {
        state: {
          user: { name: "John" },
        },
      };

      const result = parseStateExpression("state.user.name", context);
      expect(result).toBe("John");
    });

    it("should handle missing properties", () => {
      const context = {
        state: {
          user: {},
        },
      };

      const result = parseStateExpression("state.user.name", context);
      expect(result).toBeUndefined();
    });

    it("should return expression for non-state expressions", () => {
      const result = parseStateExpression("literalValue", {});
      expect(result).toBe("literalValue");
    });
  });

  describe("resolveStateBindings", () => {
    it("should resolve template expressions in props", () => {
      const props = {
        text: "{{state.message}}",
        count: "{{state.count}}",
        literal: "plain text",
      };

      const state = {
        message: "Hello World",
        count: 42,
      };

      const resolved = resolveStateBindings(props, state);
      expect(resolved).toEqual({
        text: "Hello World",
        count: 42,
        literal: "plain text",
      });
    });

    it("should handle nested objects", () => {
      const props = {
        user: {
          name: "{{state.userName}}",
          age: "{{state.userAge}}",
        },
      };

      const state = {
        userName: "John",
        userAge: 30,
      };

      const resolved = resolveStateBindings(props, state);
      expect(resolved).toEqual({
        user: {
          name: "John",
          age: 30,
        },
      });
    });

    it("should preserve non-template values", () => {
      const props = {
        text: "static text",
        number: 123,
        boolean: true,
        array: [1, 2, 3],
        object: { key: "value" },
      };

      const resolved = resolveStateBindings(props, {});
      expect(resolved).toEqual(props);
    });
  });

  describe("extractStateDependencies", () => {
    it("should extract state dependencies from component spec", () => {
      const spec: ComponentSpec = {
        type: "Text",
        id: "test",
        text: "{{state.message}}",
        className: "{{state.theme}}-text",
        style: {
          color: "{{state.textColor}}",
        },
      };

      const dependencies = extractStateDependencies(spec);
      expect(dependencies).toContain("message");
      expect(dependencies).toContain("theme");
      expect(dependencies).toContain("textColor");
    });

    it("should handle nested state references", () => {
      const spec: ComponentSpec = {
        type: "Box",
        id: "test",
        children: [
          {
            type: "Text",
            text: "{{state.user.name}}",
          },
        ],
      };

      const dependencies = extractStateDependencies(spec);
      expect(dependencies).toContain("user.name");
    });

    it("should avoid duplicate dependencies", () => {
      const spec: ComponentSpec = {
        type: "Box",
        id: "test",
        text: "{{state.message}}",
        title: "{{state.message}}",
        description: "{{state.message}}",
      };

      const dependencies = extractStateDependencies(spec);
      expect(dependencies).toEqual(["message"]);
    });

    it("should return empty array for no dependencies", () => {
      const spec: ComponentSpec = {
        type: "Box",
        id: "test",
        text: "static text",
      };

      const dependencies = extractStateDependencies(spec);
      expect(dependencies).toEqual([]);
    });
  });
});
