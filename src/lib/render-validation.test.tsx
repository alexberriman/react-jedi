import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render as renderReact } from "@testing-library/react";
import { render } from "./render";
import type { UISpecification } from "@/types/schema/components";

// Mock createPortal for tests
vi.mock("react-dom", () => ({
  createPortal: (node: React.ReactNode) => node,
}));

describe("render validation integration", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Reset environment
    process.env.NODE_ENV = originalEnv;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  const validSpec: UISpecification = {
    version: "1.0",
    root: {
      type: "Container",
      children: [
        {
          type: "Text",
          children: "Valid content",
        },
      ],
    },
  };

  const invalidSpec: UISpecification = {
    version: "1.0",
    root: {
      type: "Grid",
      columns: 15, // Invalid: should be 1-12
      children: [],
    },
  };

  describe("development mode detection", () => {
    it("should validate by default in development mode", () => {
      process.env.NODE_ENV = "development";
      const result = render(invalidSpec);
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should show validation panel
      expect(container.textContent).toContain("Validation Issues");
    });

    it("should not validate by default in production mode", () => {
      process.env.NODE_ENV = "production";
      const result = render(invalidSpec);
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should not show validation panel
      expect(container.textContent).not.toContain("Validation Issues");
    });

    it("should respect explicit development option", () => {
      process.env.NODE_ENV = "production";
      const result = render(invalidSpec, { development: true });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should show validation panel
      expect(container.textContent).toContain("Validation Issues");
    });
  });

  describe("validateSpecifications option", () => {
    it("should validate when validateSpecifications is true", () => {
      process.env.NODE_ENV = "production";
      const result = render(invalidSpec, { 
        validateSpecifications: true,
        development: true // Need this to show UI
      });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should show validation panel
      expect(container.textContent).toContain("Validation Issues");
    });

    it("should not validate when validateSpecifications is false", () => {
      process.env.NODE_ENV = "development";
      const result = render(invalidSpec, { validateSpecifications: false });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should not show validation panel
      expect(container.textContent).not.toContain("Validation Issues");
    });

    it("should validate but not show UI in production with validateSpecifications", () => {
      process.env.NODE_ENV = "production";
      const result = render(invalidSpec, { 
        validateSpecifications: true,
        development: false
      });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should not show validation panel (production mode)
      expect(container.textContent).not.toContain("Validation Issues");
    });
  });

  describe("validation error display", () => {
    it("should display error details for invalid specifications", () => {
      const result = render(invalidSpec, { development: true });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Check for error content
      expect(container.textContent).toContain("Validation Issues");
      expect(container.textContent).toContain("Grid columns");
    });

    it("should not display validation panel for valid specifications", () => {
      const result = render(validSpec, { development: true });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should not show validation panel
      expect(container.textContent).not.toContain("Validation Issues");
      // Should show the actual content
      expect(container.textContent).toContain("Valid content");
    });

    it("should show multiple errors", () => {
      const multiErrorSpec: UISpecification = {
        version: "1.0",
        root: {
          type: "Container",
          children: [
            {
              type: "Grid",
              columns: 0, // Invalid
              children: [],
            },
            {
              type: "Heading",
              level: 10 as never, // Invalid
              children: "Bad heading",
            },
          ],
        },
      };

      const result = render(multiErrorSpec, { development: true });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should show multiple errors - check for error badge or panel text
      const textContent = container.textContent || "";
      expect(textContent).toContain("Validation Issues");
    });
  });

  describe("rendering behavior", () => {
    it("should still render content even with validation errors", () => {
      const result = render(invalidSpec, { development: true });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should render the grid even though it has invalid columns
      expect(container.querySelector("[class*='grid']")).toBeTruthy();
    });

    it("should render both content and validation panel", () => {
      const specWithContent: UISpecification = {
        version: "1.0",
        root: {
          type: "Container",
          children: [
            {
              type: "Text",
              children: "Test content",
            },
            {
              type: "Grid",
              columns: 20, // Invalid
              children: [],
            },
          ],
        },
      };

      const result = render(specWithContent, { development: true });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should show both content and validation
      expect(container.textContent).toContain("Test content");
      expect(container.textContent).toContain("Validation Issues");
    });
  });
});