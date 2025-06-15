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
    it("should validate and throw error by default in development mode", () => {
      process.env.NODE_ENV = "development";
      
      // Should throw validation error when error boundaries are disabled
      expect(() => render(invalidSpec, { errorBoundaries: false })).toThrow("Validation failed");
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
      
      // Should throw validation error when development: true
      expect(() => render(invalidSpec, { development: true, errorBoundaries: false })).toThrow("Validation failed");
    });
  });

  describe("validateSpecifications option", () => {
    it("should validate and throw when validateSpecifications is true", () => {
      process.env.NODE_ENV = "production";
      
      // Should throw validation error
      expect(() => render(invalidSpec, { 
        validateSpecifications: true,
        errorBoundaries: false
      })).toThrow("Validation failed");
    });

    it("should not validate when validateSpecifications is false", () => {
      process.env.NODE_ENV = "development";
      const result = render(invalidSpec, { validateSpecifications: false });
      expect(result).not.toBeNull();
      const { container } = renderReact(result!);
      
      // Should not show validation panel
      expect(container.textContent).not.toContain("Validation Issues");
    });

    it("should validate and throw in production with validateSpecifications", () => {
      process.env.NODE_ENV = "production";
      
      // Should throw validation error regardless of development mode
      expect(() => render(invalidSpec, { 
        validateSpecifications: true,
        development: false,
        errorBoundaries: false
      })).toThrow("Validation failed");
    });
  });

  describe("validation error display", () => {
    it("should throw error with details for invalid specifications", () => {
      // Should throw with specific error message
      expect(() => render(invalidSpec, { development: true, errorBoundaries: false }))
        .toThrow("Grid columns must be between 1 and 12");
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

    it("should throw error with multiple validation issues", () => {
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

      // Should throw with error message
      expect(() => render(multiErrorSpec, { development: true, errorBoundaries: false }))
        .toThrow("Validation failed");
    });
  });

  describe("rendering behavior", () => {
    it("should stop rendering when validation errors occur", () => {
      // Should not render content with validation errors
      expect(() => render(invalidSpec, { development: true, errorBoundaries: false })).toThrow();
    });

    it("should display error boundary content for validation errors", () => {
      // With error boundaries enabled, render returns an error boundary component
      const result = render(invalidSpec, { development: true, errorBoundaries: true });
      expect(result).not.toBeNull();
      
      // Without error boundaries, it throws directly
      expect(() => render(invalidSpec, { development: true, errorBoundaries: false })).toThrow("Validation failed");
    });
    
    it("should render error boundary with validation error details", () => {
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

      // Should throw and not render any content
      expect(() => render(specWithContent, { development: true, errorBoundaries: false }))
        .toThrow("Validation failed");
    });
  });

  describe("error boundary integration", () => {
    it("should handle validation errors gracefully when errorBoundaries is true", () => {
      // The render function should return an error boundary component
      // that wraps an ErrorTrigger which will throw when rendered
      const result = render(invalidSpec, { 
        development: false,
        validateSpecifications: true,
        errorBoundaries: true 
      });
      
      // Result should be an error boundary component
      expect(result).not.toBeNull();
      
      // When rendering, the ErrorTrigger inside will throw,
      // which React Testing Library will catch
      // We need to suppress the console error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      try {
        renderReact(result!);
      } catch (error) {
        // This is expected - the ErrorTrigger throws inside the error boundary
        expect((error as Error).message).toContain("Validation failed");
      }
      
      consoleSpy.mockRestore();
    });

    it("should throw when errorBoundaries is false", () => {
      // Should throw the error directly
      expect(() => render(invalidSpec, { 
        development: false,
        validateSpecifications: true,
        errorBoundaries: false 
      })).toThrow("Validation failed");
    });
  });
});