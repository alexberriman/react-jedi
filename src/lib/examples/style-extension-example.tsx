/**
 * Style Extension Example
 * 
 * Demonstrates the style extension system with inheritance,
 * composition, and cascade resolution in action.
 */

import * as React from "react";
import { render } from "../render";
import { ThemeProvider } from "../theme/theme-provider";
import type { UISpecification } from "@/types/schema/specification";

// Theme with style extension configuration
const themeWithExtension: UISpecification["theme"] = {
  colors: {
    primary: "#3b82f6",
    secondary: "#10b981",
    text: "#1f2937",
    background: "#ffffff",
  },
  typography: {
    fonts: {
      heading: "Georgia, serif",
      body: "Inter, sans-serif",
    },
    sizes: {
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "24px",
    },
  },
  // Style extension configuration
  styleExtension: {
    inheritance: {
      // Custom inheritable properties (extends defaults)
      inheritableProperties: [
        "color",
        "fontSize",
        "fontFamily",
        "lineHeight",
        "letterSpacing",
        "textTransform",
      ],
      // Components that inherit styles
      inheritingComponents: ["Text", "Heading", "Button", "Badge"],
      // Components that reset inheritance
      boundaryComponents: ["Card", "Modal", "Dialog"],
    },
    composition: {
      // Order of precedence (later overrides earlier)
      precedenceOrder: [
        "theme.defaults",
        "theme.components",
        "parent.inherited",
        "spec.style",
        "spec.className",
        "runtime.overrides",
      ],
    },
    cascade: {
      useSpecificity: true,
      handleImportant: true,
    },
  },
  // Component style overrides
  components: {
    Text: {
      global: {
        className: "transition-colors duration-200",
        styles: {
          lineHeight: 1.6,
        },
      },
      variants: {
        muted: {
          className: "text-gray-600",
        },
        emphasis: {
          className: "font-semibold text-blue-600",
        },
      },
    },
    Card: {
      global: {
        className: "bg-white shadow-md rounded-lg overflow-hidden",
        styles: {
          border: "1px solid #e5e7eb",
        },
      },
    },
  },
  // Default styles that cascade to all components
  defaults: {
    className: "antialiased",
    style: {
      color: "#1f2937",
      fontFamily: "Inter, sans-serif",
    },
  },
};

// Example specification demonstrating style extension
const specification: UISpecification = {
  version: "1.0.0",
  theme: themeWithExtension,
  root: {
    type: "Container",
    className: "py-8",
    style: {
      fontFamily: "Georgia, serif", // This will inherit to child text
      fontSize: "18px",
    },
    children: [
      {
        type: "Heading",
        level: 1,
        children: "Style Extension Demo",
        className: "mb-6",
        // Inherits Georgia font and 18px size from Container
      },
      {
        type: "Box",
        className: "space-y-6",
        children: [
          // Inheritance example
          {
            type: "Box",
            className: "p-4 bg-gray-50 rounded",
            style: {
              color: "#3b82f6", // Blue color that will inherit
            },
            children: [
              {
                type: "Text",
                children: "This text inherits blue color from parent Box",
                className: "mb-2",
              },
              {
                type: "Text",
                variant: "muted",
                children: "This has muted variant but still inherits font family",
              },
            ],
          },
          
          // Boundary component example
          {
            type: "Card",
            className: "p-6",
            style: {
              color: "#dc2626", // Red color - won't inherit past Card
            },
            children: [
              {
                type: "Heading",
                level: 3,
                children: "Card creates style boundary",
              },
              {
                type: "Text",
                children: "Card is a boundary component, so color doesn't inherit from parent",
              },
              {
                type: "Box",
                className: "mt-4 p-3 bg-blue-50 rounded",
                style: {
                  color: "#3b82f6",
                },
                children: [
                  {
                    type: "Text",
                    children: "New inheritance context within Card",
                  },
                ],
              },
            ],
          },
          
          // Cascade and composition example
          {
            type: "Box",
            className: "p-4 border-2 border-dashed border-gray-300",
            children: [
              {
                type: "Text",
                className: "text-green-600", // Higher specificity than theme
                style: {
                  color: "purple", // Even higher specificity
                },
                children: "Purple wins due to cascade specificity",
              },
              {
                type: "Text",
                className: "text-red-600",
                style: {
                  color: "blue !important", // !important wins
                },
                children: "Blue wins due to !important",
              },
            ],
          },
          
          // Style composition example
          {
            type: "Flex",
            direction: "column",
            gap: 3,
            className: "p-4 bg-gradient-to-r from-blue-50 to-green-50",
            children: [
              {
                type: "Heading",
                level: 3,
                children: "Style Composition",
              },
              {
                type: "Text",
                variant: "emphasis",
                className: "uppercase tracking-wide",
                style: {
                  textDecoration: "underline",
                },
                children: "Composed from theme, variant, className, and inline styles",
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Style Extension Example Component
 */
export function StyleExtensionExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      {render(specification)}
    </div>
  );
}

/**
 * Standalone example with ThemeProvider
 */
export function StyleExtensionStandalone() {
  return (
    <ThemeProvider theme={themeWithExtension}>
      <StyleExtensionExample />
    </ThemeProvider>
  );
}