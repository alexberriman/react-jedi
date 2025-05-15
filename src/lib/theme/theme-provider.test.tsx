/**
 * ThemeProvider Tests
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "./theme-provider";
import { useTheme } from "./use-theme";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { type ThemeSpecification } from "../../types/schema/specification";

// Sample theme for testing
const testTheme: ThemeSpecification = {
  colors: {
    primary: {
      "500": "#0ea5e9",
    },
    text: {
      default: "#000000",
      light: "#FFFFFF",
    },
  },
  typography: {
    fontFamilies: {
      sans: ["Inter", "sans-serif"],
    },
  },
};

// Mock component to test theme context
const TestComponent = () => {
  const { theme, colorMode, toggleColorMode, getValue } = useTheme();
  
  return (
    <div>
      <h1 data-testid="primary-color">{getValue("colors.primary.500")}</h1>
      <p data-testid="color-mode">{colorMode}</p>
      <button data-testid="toggle-button" onClick={toggleColorMode}>
        Toggle Theme
      </button>
    </div>
  );
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
      },
      writable: true,
    });
    
    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
      writable: true,
    });
  });
  
  it("provides theme values to children", () => {
    render(
      <ThemeProvider theme={testTheme}>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId("primary-color").textContent).toBe("#0ea5e9");
  });
  
  it("provides color mode to children", () => {
    render(
      <ThemeProvider theme={testTheme} defaultColorMode="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId("color-mode").textContent).toBe("light");
  });
  
  it("allows toggling color mode", () => {
    render(
      <ThemeProvider theme={testTheme} defaultColorMode="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId("color-mode").textContent).toBe("light");
    
    // Click the toggle button
    fireEvent.click(screen.getByTestId("toggle-button"));
    
    expect(screen.getByTestId("color-mode").textContent).toBe("dark");
  });
  
  it("applies CSS variables to :root", () => {
    render(
      <ThemeProvider theme={testTheme}>
        <TestComponent />
      </ThemeProvider>
    );
    
    const rootElement = document.documentElement;
    expect(rootElement.style.getPropertyValue("--theme-colors-primary-500")).toBe("#0ea5e9");
  });
});

describe("useTheme hook", () => {
  it("provides theme values", () => {
    const TestValueComponent = () => {
      const { getValue, getCssVar } = useTheme();
      
      return (
        <div>
          <p data-testid="theme-value">{getValue("colors.primary.500")}</p>
          <p data-testid="css-var">{getCssVar("colors.primary.500")}</p>
          <p data-testid="default-value">{getValue("nonexistent.path", "default")}</p>
        </div>
      );
    };
    
    render(
      <ThemeProvider theme={testTheme}>
        <TestValueComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId("theme-value").textContent).toBe("#0ea5e9");
    expect(screen.getByTestId("css-var").textContent).toBe("--theme-colors-primary-500");
    expect(screen.getByTestId("default-value").textContent).toBe("default");
  });
});