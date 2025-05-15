/**
 * Tests for Container Queries System
 */

import { describe, it, expect } from "vitest";
import {
  generateContainerQueryString,
  createContainerDefinition,
  containerQueryFromSize,
  containerQuery,
  applyContainerQuery,
  createContainerStyles,
  useContainerQuery,
  createHybridResponsiveStyles,
  type ContainerQueryCondition,
  type ContainerDefinition,
} from "./container-queries";
import { DEFAULT_BREAKPOINTS } from "./responsive-system";

describe("Container Queries System", () => {
  describe("generateContainerQueryString", () => {
    it("should generate basic min-width query", () => {
      const conditions: ContainerQueryCondition = { minWidth: "500px" };
      const result = generateContainerQueryString(conditions);
      expect(result).toBe("@container (min-width: 500px)");
    });

    it("should generate query with container name", () => {
      const conditions: ContainerQueryCondition = { minWidth: "500px" };
      const result = generateContainerQueryString(conditions, { container: "card" });
      expect(result).toBe("@container card (min-width: 500px)");
    });

    it("should generate query with multiple conditions", () => {
      const conditions: ContainerQueryCondition = {
        minWidth: "400px",
        maxWidth: "800px",
        orientation: "landscape",
      };
      const result = generateContainerQueryString(conditions);
      expect(result).toBe(
        "@container (min-width: 400px) and (max-width: 800px) and (orientation: landscape)"
      );
    });

    it("should generate query with aspect ratio", () => {
      const conditions: ContainerQueryCondition = {
        aspectRatio: "16/9",
      };
      const result = generateContainerQueryString(conditions);
      expect(result).toBe("@container (aspect-ratio: 16/9)");
    });

    it("should throw error for empty conditions", () => {
      const conditions: ContainerQueryCondition = {};
      expect(() => generateContainerQueryString(conditions)).toThrow(
        "Container query must have at least one condition"
      );
    });
  });

  describe("createContainerDefinition", () => {
    it("should create container definition with name", () => {
      const definition: ContainerDefinition = {
        name: "card",
        type: "inline-size",
      };
      const result = createContainerDefinition(".card", definition);
      expect(result).toBe(".card { container-name: card; container-type: inline-size; }");
    });

    it("should handle array of names", () => {
      const definition: ContainerDefinition = {
        name: ["card", "wrapper"],
        type: "size",
      };
      const result = createContainerDefinition(".component", definition);
      expect(result).toBe(".component { container-name: card wrapper; container-type: size; }");
    });

    it("should include custom styles", () => {
      const definition: ContainerDefinition = {
        name: "card",
        type: "inline-size",
        style: {
          position: "relative",
          overflow: "hidden",
        },
      };
      const result = createContainerDefinition(".card", definition);
      expect(result).toBe(
        ".card { container-name: card; container-type: inline-size; position: relative; overflow: hidden; }"
      );
    });
  });

  describe("containerQueryFromSize", () => {
    it("should create query from preset size", () => {
      const result = containerQueryFromSize("md");
      expect(result).toBe("@container (min-width: 448px)");
    });

    it("should use custom size if not preset", () => {
      const result = containerQueryFromSize("600px");
      expect(result).toBe("@container (min-width: 600px)");
    });

    it("should include container name", () => {
      const result = containerQueryFromSize("md", { container: "card" });
      expect(result).toBe("@container card (min-width: 448px)");
    });
  });

  describe("containerQuery utilities", () => {
    it("should create min-width query", () => {
      const result = containerQuery.minWidth("500px");
      expect(result).toBe("@container (min-width: 500px)");
    });

    it("should create max-width query", () => {
      const result = containerQuery.maxWidth("800px");
      expect(result).toBe("@container (max-width: 800px)");
    });

    it("should create between query", () => {
      const result = containerQuery.between("400px", "800px");
      expect(result).toBe("@container (min-width: 400px) and (max-width: 800px)");
    });

    it("should create exact width query", () => {
      const result = containerQuery.width("600px");
      expect(result).toBe("@container (width: 600px)");
    });

    it("should create aspect ratio query", () => {
      const result = containerQuery.aspectRatio("16/9");
      expect(result).toBe("@container (aspect-ratio: 16/9)");
    });

    it("should create orientation query", () => {
      const result = containerQuery.orientation("portrait");
      expect(result).toBe("@container (orientation: portrait)");
    });

    it("should create size query from preset", () => {
      const result = containerQuery.size("lg");
      expect(result).toBe("@container (min-width: 512px)");
    });

    it("should include container name in utilities", () => {
      const result = containerQuery.minWidth("500px", "card");
      expect(result).toBe("@container card (min-width: 500px)");
    });
  });

  describe("applyContainerQuery", () => {
    it("should apply single value", () => {
      const result = applyContainerQuery("padding", "1rem", v => v);
      expect(result).toEqual({ padding: "1rem" });
    });

    it("should apply container responsive values", () => {
      const value = {
        base: "1rem",
        "@container (min-width: 400px)": "1.5rem",
        "@container (min-width: 800px)": "2rem",
      };
      const result = applyContainerQuery("padding", value, v => v);
      expect(result).toEqual({
        padding: "1rem",
        "@container (min-width: 400px)": { padding: "1.5rem" },
        "@container (min-width: 800px)": { padding: "2rem" },
      });
    });

    it("should use transformer function", () => {
      const value = {
        base: 4,
        "@container (min-width: 400px)": 6,
      };
      const result = applyContainerQuery("margin", value, v => `${v * 4}px`);
      expect(result).toEqual({
        margin: "16px",
        "@container (min-width: 400px)": { margin: "24px" },
      });
    });
  });

  describe("createContainerStyles", () => {
    it("should create complete container styles", () => {
      const definition: ContainerDefinition = {
        name: "card",
        type: "inline-size",
      };
      const styles = {
        padding: {
          base: "1rem",
          "@container card (min-width: 400px)": "1.5rem",
        },
        fontSize: {
          base: "14px",
          "@container card (min-width: 600px)": "16px",
        },
      };
      
      const result = createContainerStyles("responsive-card", definition, styles);
      expect(result).toContain(".responsive-card { container-name: card; container-type: inline-size; }");
      expect(result).toContain(".responsive-card { padding: 1rem; }");
      expect(result).toContain("@container card (min-width: 400px) { .responsive-card { padding: 1.5rem; } }");
    });
  });

  describe("useContainerQuery", () => {
    const utils = useContainerQuery();

    it("should provide container query utilities", () => {
      expect(utils.container.minWidth("500px")).toBe("@container (min-width: 500px)");
    });

    it("should provide apply function", () => {
      const result = utils.apply("padding", "1rem");
      expect(result).toEqual({ padding: "1rem" });
    });

    it("should provide define function", () => {
      const definition: ContainerDefinition = { name: "test", type: "size" };
      const result = utils.define(".test", definition);
      expect(result).toBe(".test { container-name: test; container-type: size; }");
    });

    it("should provide access to container sizes", () => {
      expect(utils.sizes.md).toBe("448px");
    });
  });

  describe("createHybridResponsiveStyles", () => {
    it("should combine media queries and container queries", () => {
      const mediaValues = {
        base: "1rem",
        md: "1.5rem",
      };
      const containerValues = {
        "@container (min-width: 400px)": "1.25rem",
        "@container (min-width: 800px)": "2rem",
      };
      
      const result = createHybridResponsiveStyles(
        "padding",
        mediaValues,
        containerValues,
        DEFAULT_BREAKPOINTS
      );
      
      expect(result).toEqual({
        padding: "1rem",
        "@media (min-width: 768px)": { padding: "1.5rem" },
        "@container (min-width: 400px)": { padding: "1.25rem" },
        "@container (min-width: 800px)": { padding: "2rem" },
      });
    });
  });
});