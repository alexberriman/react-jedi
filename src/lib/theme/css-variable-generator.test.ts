/**
 * CSS Variable Generator Tests
 *
 * This file contains tests for the CSS variable generation system.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { vi } from "vitest";
import { generateCssVariables, generateCssRules, applyCssVariables } from "./css-variable-generator";
import type { ThemeSpecification } from "../../types/schema/specification";

// Mock DOM environment
class MockStyleElement {
  id: string;
  textContent: string = "";
  parentNode: { removeChild: (el: MockStyleElement) => void } | null = null;
  
  constructor(id: string) {
    this.id = id;
  }
}

describe("CSS Variable Generator", () => {
  // Sample theme for testing
  const sampleTheme: ThemeSpecification = {
    colors: {
      primary: {
        "500": "#3b82f6",
      },
      text: {
        primary: "#111827",
      }
    },
    spacing: {
      "4": "1rem",
    },
    borderRadius: {
      default: "0.25rem",
    }
  };
  
  describe("generateCssVariables", () => {
    it("should generate CSS variables from a theme", () => {
      const { variables, tokens } = generateCssVariables(sampleTheme);
      
      // Check variables
      expect(variables["--theme-colors-primary-500"]).toBe("#3b82f6");
      expect(variables["--theme-colors-text-primary"]).toBe("#111827");
      expect(variables["--theme-spacing-4"]).toBe("1rem");
      
      // Check tokens
      expect(tokens.all.length).toBeGreaterThan(0);
      expect(tokens.getByPath("colors.primary.500")?.value).toBe("#3b82f6");
    });
    
    it("should use custom prefix for variables", () => {
      const { variables } = generateCssVariables(sampleTheme, { prefix: "--custom" });
      
      expect(variables["--custom-colors-primary-500"]).toBe("#3b82f6");
      expect(variables["--theme-colors-primary-500"]).toBeUndefined();
    });
    
    it("should flatten variable names when specified", () => {
      const { variables } = generateCssVariables(sampleTheme, { flatten: true });
      
      // Should have both full and flattened names
      expect(variables["--theme-colors-primary-500"]).toBe("#3b82f6");
      expect(variables["--theme-primary-500"]).toBe("#3b82f6");
      
      expect(variables["--theme-colors-text-primary"]).toBe("#111827");
      expect(variables["--theme-text-primary"]).toBe("#111827");
    });
  });
  
  describe("generateCssRules", () => {
    it("should generate CSS rules from variables", () => {
      const variables = {
        "--theme-colors-primary-500": "#3b82f6",
        "--theme-spacing-4": "1rem"
      };
      
      const rules = generateCssRules(variables);
      
      expect(rules).toContain(":root {");
      expect(rules).toContain("  --theme-colors-primary-500: #3b82f6;");
      expect(rules).toContain("  --theme-spacing-4: 1rem;");
      expect(rules).toContain("}");
    });
    
    it("should use custom selector", () => {
      const variables = { "--theme-colors-primary-500": "#3b82f6" };
      const rules = generateCssRules(variables, ".theme-class");
      
      expect(rules).toContain(".theme-class {");
      expect(rules).not.toContain(":root {");
    });
    
    it("should return empty string for empty variables", () => {
      const rules = generateCssRules({});
      expect(rules).toBe("");
    });
  });
  
  describe("applyCssVariables", () => {
    let mockStyleElement: MockStyleElement;
    let mockHead: { appendChild: ReturnType<typeof vi.fn> };
    let mockGetElementById: ReturnType<typeof vi.fn>;
    let mockCreateElement: ReturnType<typeof vi.fn>;
    
    // Store the original document
    const originalDocument = globalThis.document;
    
    beforeEach(() => {
      mockStyleElement = new MockStyleElement("theme-variables");
      mockStyleElement.parentNode = { removeChild: vi.fn() };
      
      mockHead = { appendChild: vi.fn() };
      mockGetElementById = vi.fn().mockReturnValue(mockStyleElement);
      mockCreateElement = vi.fn().mockReturnValue(mockStyleElement);
      
      // Create a partial mock of document
      Object.defineProperty(globalThis, "document", {
        writable: true,
        value: {
          head: mockHead,
          getElementById: mockGetElementById,
          createElement: mockCreateElement,
          querySelector: vi.fn().mockImplementation((selector: string) => {
            if (selector === `#theme-variables`) {
              return mockStyleElement;
            }
            return null;
          })
        }
      });
    });
    
    afterEach(() => {
      vi.restoreAllMocks();
      
      // Restore the original document
      Object.defineProperty(globalThis, "document", {
        writable: true,
        value: originalDocument
      });
    });
    
    it("should apply CSS variables to a style element", () => {
      const variables = {
        "--theme-colors-primary-500": "#3b82f6",
        "--theme-spacing-4": "1rem"
      };
      
      // First call returns null to trigger creation of new element
      (globalThis.document.querySelector as ReturnType<typeof vi.fn>).mockReturnValueOnce(null);
      
      const cleanup = applyCssVariables(variables);
      
      expect(mockCreateElement).toHaveBeenCalledWith("style");
      expect(mockHead.appendChild).toHaveBeenCalled();
      expect(mockStyleElement.id).toBe("theme-variables");
      expect(mockStyleElement.textContent).toContain("--theme-colors-primary-500: #3b82f6;");
      
      // Test cleanup function
      cleanup();
      expect(mockStyleElement.parentNode?.removeChild).toHaveBeenCalledWith(mockStyleElement);
    });
    
    it("should update existing style element", () => {
      const variables = { "--theme-colors-primary-500": "#3b82f6" };
      
      applyCssVariables(variables);
      
      // Should use existing element
      expect(mockCreateElement).not.toHaveBeenCalled();
      expect(mockStyleElement.textContent).toContain("--theme-colors-primary-500: #3b82f6;");
    });
    
    it("should apply variables to a specific element", () => {
      const variables = { "--theme-colors-primary-500": "#3b82f6" };
      const mockElement = {
        style: {
          getPropertyValue: vi.fn(),
          setProperty: vi.fn(),
          removeProperty: vi.fn()
        }
      };
      
      const cleanup = applyCssVariables(variables, { target: mockElement as unknown as HTMLElement });
      
      expect(mockElement.style.setProperty).toHaveBeenCalledWith("--theme-colors-primary-500", "#3b82f6");
      
      // Test cleanup
      cleanup();
      expect(mockElement.style.removeProperty).toHaveBeenCalledWith("--theme-colors-primary-500");
    });
  });
});