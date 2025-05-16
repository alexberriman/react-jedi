/**
 * Style Overrides Example
 * 
 * This example demonstrates how to use the component style override system
 * to customize the appearance of components through the theme.
 */

import * as React from "react";
import { render } from "../render";
import { ThemeProvider } from "../theme/theme-provider";
import type { UISpecification, ThemeSpecification } from "@/types/schema/specification";
import type { ButtonSpec } from "@/types/schema/ui";
import type { FlexSpec } from "@/types/schema/layout";
import type { TextSpec } from "@/types/schema/typography";

/**
 * Example theme with style overrides
 */
const themeWithOverrides: ThemeSpecification = {
  colors: {
    primary: {
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
    },
    secondary: {
      500: "#8B5CF6",
      600: "#7C3AED",
    },
    accent: {
      500: "#F97316",
      600: "#EA580C",
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
  },
  components: {
    Button: {
      global: {
        className: "transition-all duration-200 font-medium",
        styles: {
          letterSpacing: "0.025em",
        },
      },
      variants: {
        primary: {
          className: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl",
          tokens: {
            borderRadius: "borderRadius.md",
          },
        },
        secondary: {
          className: "bg-secondary-500 hover:bg-secondary-600 text-white",
          tokens: {
            borderRadius: "borderRadius.lg",
          },
        },
        outline: {
          className: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
        },
      },
      sizes: {
        sm: {
          className: "text-sm px-3 py-1.5",
          tokens: {
            fontSize: "0.875rem",
          },
        },
        md: {
          className: "text-base px-4 py-2",
          tokens: {
            fontSize: "1rem",
          },
        },
        lg: {
          className: "text-lg px-6 py-3",
          tokens: {
            fontSize: "1.125rem",
          },
        },
      },
      combinations: [
        {
          variant: "default",
          size: "lg",
          className: "bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800",
          styles: {
            padding: "1rem 2rem",
            fontSize: "1.25rem",
          },
        },
      ],
    },
    Card: {
      global: {
        className: "rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow",
        tokens: {
          backgroundColor: "colors.background",
          padding: "spacing.md",
        },
      },
    },
    Text: {
      global: {
        className: "text-gray-800 leading-relaxed",
      },
      variants: {
        primary: {
          className: "text-primary-500 font-semibold",
        },
        secondary: {
          className: "text-secondary-500",
        },
        muted: {
          className: "text-gray-500 text-sm",
        },
      },
    },
  },
};

/**
 * Example UI specification showcasing style overrides
 */
const uiSpec: UISpecification = {
  version: "1.0.0",
  root: {
    type: "Container",
    className: "py-8",
    children: [
      {
        type: "Heading",
        level: "h1",
        className: "text-3xl font-bold mb-6",
        children: "Style Overrides Example",
      },
      
      // Button Examples
      {
        type: "Box",
        className: "mb-8",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-semibold mb-4",
            children: "Button Variants",
          },
          {
            type: "Flex",
            gap: "4",
            children: [
              {
                type: "Button",
                variant: "default",
                size: "default",
                children: "Primary Button",
              } as ButtonSpec,
              {
                type: "Button",
                variant: "secondary",
                size: "default",
                children: "Secondary Button",
              } as ButtonSpec,
              {
                type: "Button",
                variant: "outline",
                size: "default",
                children: "Outline Button",
              } as ButtonSpec,
            ],
          } as FlexSpec,
        ],
      },
      
      // Button Sizes
      {
        type: "Box",
        className: "mb-8",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-semibold mb-4",
            children: "Button Sizes",
          },
          {
            type: "Flex",
            gap: "4",
            alignItems: "center",
            children: [
              {
                type: "Button",
                variant: "default",
                size: "sm",
                children: "Small",
              } as ButtonSpec,
              {
                type: "Button",
                variant: "default",
                size: "default",
                children: "Medium",
              } as ButtonSpec,
              {
                type: "Button",
                variant: "default",
                size: "lg",
                children: "Large",
              } as ButtonSpec,
            ],
          } as FlexSpec,
        ],
      },
      
      // Combination Override
      {
        type: "Box",
        className: "mb-8",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-semibold mb-4",
            children: "Combination Override",
          },
          {
            type: "Text",
            className: "mb-4",
            children: "This button has special styling when it's both primary variant and large size:",
          },
          {
            type: "Button",
            variant: "default",
            size: "lg",
            children: "Gradient Primary Large",
          } as ButtonSpec,
        ],
      },
      
      // Card with Overrides
      {
        type: "Box",
        className: "mb-8",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-semibold mb-4",
            children: "Card Component",
          },
          {
            type: "Card",
            children: [
              {
                type: "Heading",
                level: "h3",
                className: "text-xl font-semibold mb-2",
                children: "Card Title",
              },
              {
                type: "Text",
                children: "This card has global style overrides applied through the theme.",
              },
            ],
          },
        ],
      },
      
      // Text Variants
      {
        type: "Box",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-semibold mb-4",
            children: "Text Components",
          },
          {
            type: "Flex",
            direction: "column",
            gap: "2",
            children: [
              {
                type: "Text",
                variant: "default",
                children: "Primary text with custom styling",
              } as TextSpec,
              {
                type: "Text",
                variant: "secondary",
                children: "Secondary text with custom styling",
              } as TextSpec,
              {
                type: "Text",
                variant: "muted",
                children: "Muted text with custom styling",
              } as TextSpec,
              {
                type: "Text",
                children: "Default text with global overrides",
              },
            ],
          },
        ],
      },
    ],
  },
  theme: themeWithOverrides,
};

/**
 * Style Overrides Example Component
 */
export function StyleOverridesExample(): React.ReactElement {
  const ui = render(uiSpec);
  
  return (
    <ThemeProvider theme={themeWithOverrides}>
      <div className="min-h-screen bg-gray-50">
        {ui}
      </div>
    </ThemeProvider>
  );
}

/**
 * Example of programmatic style override usage
 */
export function ProgrammaticExample(): React.ReactElement {
  const spec: UISpecification = {
    version: "1.0.0",
    root: {
      type: "Button",
      variant: "default",
      size: "lg",
      // These spec-level overrides will merge with theme overrides
      className: "animate-pulse",
      style: {
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
      },
      children: "Animated Button",
    } as ButtonSpec,
    theme: themeWithOverrides,
  };
  
  const ui = render(spec);
  
  return (
    <ThemeProvider theme={themeWithOverrides}>
      {ui}
    </ThemeProvider>
  );
}