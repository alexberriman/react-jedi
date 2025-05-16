/**
 * Typography Hooks Tests
 */

import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {
  useTypography,
  useFontSize,
  useFontFamily,
  useLineHeight,
  useLetterSpacing,
  useFontWeight,
  useFluidTypography,
} from "./hooks";
import { ThemeProvider } from "../theme-provider";
import type { ThemeSpecification } from "../types/schema/specification";

// Define a type for window.matchMedia
type MediaQueryListMock = {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: ReturnType<typeof vi.fn>;
  removeListener: ReturnType<typeof vi.fn>;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  dispatchEvent: ReturnType<typeof vi.fn>;
};

// Mock matchMedia for tests
beforeAll(() => {
  // Create a matchMedia mock function
  const mockMatchMedia = vi.fn().mockImplementation(
    (query: string): MediaQueryListMock => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
  );

  // Add the matchMedia property to globalThis
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: mockMatchMedia,
  });
});

afterAll(() => {
  // Cleanup
  vi.restoreAllMocks();
});

// Base theme for testing
const baseTheme: ThemeSpecification = {
  typography: {
    fontFamilies: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["Fira Code", "monospace"],
      display: ["Montserrat", "sans-serif"],
    },
    fontSizes: {
      xs1: "0.75rem",
      xs2: "0.625rem",
      base: "1rem",
      lg1: "1.125rem",
      lg2: "1.25rem",
      "1xl": "1.5rem",
      "2xl": "1.875rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "3.75rem",
    },
    fontWeights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },
};

// Helper function to create a themed test component
function createThemedTestComponent<T, Args extends unknown[] = []>(
  useHook: (...args: Args) => T,
  args?: Args
): React.FC {
  return function TestComponent() {
    // Always call the hook with the same pattern to follow React's rules of hooks
    // Use empty array for empty args to maintain consistent hook calls
    const emptyArgs = [] as unknown as Args;
    const hookArgs = args || emptyArgs;
    const value = useHook(...hookArgs);
    return <div>{String(value)}</div>;
  };
}

describe("Typography Hooks", () => {
  // For useTypography hook
  it("should return typography from theme", () => {
    const TestComponent = () => {
      const typography = useTypography();
      return <div>{JSON.stringify(typography)}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    const result = JSON.parse(container.textContent || "{}");
    expect(result).toEqual(baseTheme.typography);
  });

  // For useFontSize hook
  it("should return font size", () => {
    const TestComponent = () => {
      const fontSize = useFontSize("lg1");
      return <div>{fontSize}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("1.125rem");
  });

  it("should return default font size when size is not specified", () => {
    const TestComponent = () => {
      const fontSize = useFontSize();
      return <div>{fontSize}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("1rem");
  });

  // For useFontFamily hook
  it("should return font family", () => {
    const TestComponent = () => {
      const fontFamily = useFontFamily("serif");
      return <div>{fontFamily}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("Georgia, serif");
  });

  it("should return default font family when category is not specified", () => {
    const TestComponent = () => {
      const fontFamily = useFontFamily();
      return <div>{fontFamily}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("Roboto, sans-serif");
  });

  // For useLineHeight hook
  it("should return line height", () => {
    const TestComponent = () => {
      const lineHeight = useLineHeight("tight");
      return <div>{lineHeight}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("1.25");
  });

  it("should return default line height when size is not specified", () => {
    const TestComponent = () => {
      const lineHeight = useLineHeight();
      return <div>{lineHeight}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("1.5");
  });

  // For useLetterSpacing hook
  it("should return letter spacing", () => {
    const TestComponent = () => {
      const letterSpacing = useLetterSpacing("wide");
      return <div>{letterSpacing}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("0.025em");
  });

  it("should return default letter spacing when size is not specified", () => {
    const TestComponent = () => {
      const letterSpacing = useLetterSpacing();
      return <div>{letterSpacing}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("0");
  });

  // For useFontWeight hook
  it("should return font weight", () => {
    const TestComponent = () => {
      const fontWeight = useFontWeight("bold");
      return <div>{fontWeight}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("700");
  });

  it("should return default font weight when weight is not specified", () => {
    const TestComponent = () => {
      const fontWeight = useFontWeight();
      return <div>{fontWeight}</div>;
    };

    const { container } = render(
      <ThemeProvider theme={baseTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("400");
  });
});

// IMPORTANT: Define mockUpdateTheme at the top level before mocking useTheme
// This fixes the ReferenceError: mockUpdateTheme is not defined
const mockUpdateTheme = vi.fn();

// Provide a customizable theme for testing
let currentTheme = { typography: baseTheme.typography };

// These are needed to type-check, but not actually used in tests
function getValueMock<T>(path: string, defaultValue?: T): T | undefined {
  return defaultValue;
}

function resolveReferenceMock<T>(value: unknown): T {
  return value as T;
}

// Mock the useTheme hook
vi.mock("../use-theme", () => ({
  useTheme: () => ({
    theme: currentTheme,
    updateTheme: mockUpdateTheme,
    getValue: getValueMock,
    getCssVar: (path: string): string => `--theme-${path.replaceAll(".", "-")}`,
    cssVar: (path: string, defaultValue?: string): string =>
      defaultValue
        ? `var(--theme-${path.replaceAll(".", "-")}, ${defaultValue})`
        : `var(--theme-${path.replaceAll(".", "-")})`,
    cssVariables: {},
    resolveReference: resolveReferenceMock,
  }),
}));

// Tests for useFluidTypography hook
describe("useFluidTypography Hook", () => {
  beforeEach(() => {
    // Reset mock counters before each test
    mockUpdateTheme.mockClear();
  });

  it("should detect when fluid typography is enabled", () => {
    // Create a component that uses the hook
    const TestComponent = () => {
      const { isFluid } = useFluidTypography();
      return <div>{String(isFluid)}</div>;
    };

    // Provide a theme with fluid typography
    const fluidTheme = {
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSizes: {
          base: "clamp(1rem, 0.5rem + 2vw, 1.5rem)",
          lg1: "clamp(1.25rem, 0.75rem + 2.5vw, 2rem)",
        },
      },
    };

    // Set the current theme to include fluid font sizes
    currentTheme = fluidTheme;

    const { container } = render(
      <ThemeProvider theme={fluidTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("true");
  });

  it("should call updateTheme when enabling fluid typography", () => {
    // Create a component that enables fluid typography
    const EnableFluidComponent = () => {
      const { enableFluidTypography } = useFluidTypography();
      // Call the function to enable fluid typography with custom config
      React.useEffect(() => {
        const config = { stepsUp: 5, stepsDown: 1 };
        enableFluidTypography(config);
      }, [enableFluidTypography]);
      return <div>Enable Fluid Typography</div>;
    };

    // Restore original theme
    currentTheme = { typography: baseTheme.typography };

    render(
      <ThemeProvider theme={baseTheme}>
        <EnableFluidComponent />
      </ThemeProvider>
    );

    // Verify updateTheme was called with the correct parameters
    expect(mockUpdateTheme).toHaveBeenCalledTimes(1);
    expect(mockUpdateTheme).toHaveBeenCalledWith({
      typography: expect.any(Object),
    });
  });

  it("should not call updateTheme when fluid typography is already enabled", () => {
    // Create a component that tries to enable fluid typography when already enabled
    const TestComponentWithFluidEnabled = () => {
      const { enableFluidTypography } = useFluidTypography();
      // Call the function to enable fluid typography
      React.useEffect(() => {
        enableFluidTypography();
      }, [enableFluidTypography]);
      return <div>Test</div>;
    };

    // Mock that fluid typography is already enabled
    const fluidTheme = {
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSizes: {
          base: "clamp(1rem, 0.5rem + 2vw, 1.5rem)",
          lg1: "clamp(1.25rem, 0.75rem + 2.5vw, 2rem)",
        },
      },
    };

    // Set fluid theme for the test
    currentTheme = fluidTheme;

    render(
      <ThemeProvider theme={fluidTheme}>
        <TestComponentWithFluidEnabled />
      </ThemeProvider>
    );

    // Verify updateTheme was not called since fluid typography is already enabled
    expect(mockUpdateTheme).not.toHaveBeenCalled();
  });

  it("should call updateTheme when disabling fluid typography", () => {
    // Create a component that disables fluid typography
    const DisablingComponent = () => {
      const { disableFluidTypography } = useFluidTypography();
      // Call the function to disable fluid typography
      React.useEffect(() => {
        disableFluidTypography();
      }, [disableFluidTypography]);
      return <div>Disable Fluid Typography</div>;
    };

    // Mock that fluid typography is enabled
    const fluidTheme = {
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSizes: {
          base: "clamp(1rem, 0.5rem + 2vw, 1.5rem)",
          lg1: "clamp(1.25rem, 0.75rem + 2.5vw, 2rem)",
        },
      },
    };

    // Set fluid theme for the test
    currentTheme = fluidTheme;

    render(
      <ThemeProvider theme={fluidTheme}>
        <DisablingComponent />
      </ThemeProvider>
    );

    // Verify updateTheme was called with the correct parameters
    expect(mockUpdateTheme).toHaveBeenCalledTimes(1);
    expect(mockUpdateTheme).toHaveBeenCalledWith({
      typography: expect.any(Object),
    });
  });
});
