import { describe, it, expect } from "vitest";
import { evaluateCondition, validateConditionExpression } from "./condition-parser";

describe("Condition Parser", () => {
  describe("evaluateCondition", () => {
    it("should handle boolean literals", () => {
      expect(evaluateCondition(true, {})).toBe(true);
      expect(evaluateCondition(false, {})).toBe(false);
    });

    it("should handle empty conditions", () => {
      expect(evaluateCondition("", {})).toBe(true);
      expect(evaluateCondition("   ", {})).toBe(true);
    });

    it("should handle state access", () => {
      const context = {
        state: {
          isVisible: true,
          count: 5,
          user: {
            name: "John",
            active: false,
          },
        },
      };

      expect(evaluateCondition("state.isVisible", context)).toBe(true);
      expect(evaluateCondition("state.count", context)).toBe(true);
      expect(evaluateCondition("state.user.active", context)).toBe(false);
      expect(evaluateCondition("state.nonexistent", context)).toBe(false);
    });

    it("should handle props access", () => {
      const context = {
        props: {
          type: "primary",
          disabled: false,
        },
      };

      expect(evaluateCondition('props.type === "primary"', context)).toBe(true);
      expect(evaluateCondition("props.disabled", context)).toBe(false);
    });

    it("should handle comparison operators", () => {
      const context = {
        state: {
          count: 5,
          name: "test",
        },
      };

      expect(evaluateCondition("state.count === 5", context)).toBe(true);
      expect(evaluateCondition("state.count !== 10", context)).toBe(true);
      expect(evaluateCondition("state.count > 3", context)).toBe(true);
      expect(evaluateCondition("state.count < 10", context)).toBe(true);
      expect(evaluateCondition("state.count >= 5", context)).toBe(true);
      expect(evaluateCondition("state.count <= 5", context)).toBe(true);
      expect(evaluateCondition('state.name === "test"', context)).toBe(true);
    });

    it("should handle logical operators", () => {
      const context = {
        state: {
          a: true,
          b: false,
          c: true,
        },
      };

      expect(evaluateCondition("state.a && state.c", context)).toBe(true);
      expect(evaluateCondition("state.a && state.b", context)).toBe(false);
      expect(evaluateCondition("state.a || state.b", context)).toBe(true);
      expect(evaluateCondition("state.b || state.b", context)).toBe(false);
      expect(evaluateCondition("!state.b", context)).toBe(true);
      expect(evaluateCondition("!state.a", context)).toBe(false);
    });

    it("should handle parentheses", () => {
      const context = {
        state: {
          a: true,
          b: false,
          c: true,
        },
      };

      expect(evaluateCondition("(state.a && state.b) || state.c", context)).toBe(true);
      expect(evaluateCondition("state.a && (state.b || state.c)", context)).toBe(true);
      expect(evaluateCondition("!(state.a && state.b)", context)).toBe(true);
    });

    it("should handle complex expressions", () => {
      const context = {
        state: {
          count: 7,
          status: "active",
          user: {
            role: "admin",
            verified: true,
          },
        },
      };

      expect(
        evaluateCondition(
          'state.count > 5 && state.status === "active" && state.user.role === "admin"',
          context
        )
      ).toBe(true);

      expect(
        evaluateCondition("(state.count < 10 || state.count > 20) && state.user.verified", context)
      ).toBe(true);
    });

    it("should handle environment variables", () => {
      const context = {
        env: {
          MODE: "production",
          DEBUG: "true",
        },
      };

      expect(evaluateCondition('env.MODE === "production"', context)).toBe(true);
      expect(evaluateCondition('env.DEBUG === "true"', context)).toBe(true);
    });

    it("should gracefully handle errors", () => {
      const context = { state: {} };

      expect(evaluateCondition("invalid syntax &&", context)).toBe(false);
      expect(evaluateCondition("state.foo.bar.baz", context)).toBe(false);
    });
  });

  describe("validateConditionExpression", () => {
    it("should validate valid expressions", () => {
      expect(validateConditionExpression("state.isVisible")).toEqual({ valid: true });
      expect(validateConditionExpression("state.count > 5")).toEqual({ valid: true });
      expect(validateConditionExpression("state.a && state.b")).toEqual({ valid: true });
      expect(validateConditionExpression("(state.a || state.b) && state.c")).toEqual({
        valid: true,
      });
    });

    it("should catch unbalanced parentheses", () => {
      expect(validateConditionExpression("(state.a && state.b")).toEqual({
        valid: false,
        error: "Unbalanced parentheses",
      });
      expect(validateConditionExpression("state.a && state.b)")).toEqual({
        valid: false,
        error: "Unbalanced parentheses",
      });
    });

    it("should catch invalid operator usage", () => {
      expect(validateConditionExpression("&& state.a")).toEqual({
        valid: false,
        error: 'Binary operator "&&" requires operands on both sides',
      });
      expect(validateConditionExpression("state.a ||")).toEqual({
        valid: false,
        error: 'Binary operator "||" requires operands on both sides',
      });
      expect(validateConditionExpression("!")).toEqual({
        valid: false,
        error: 'Negation operator "!" requires an operand',
      });
    });
  });
});
