import type { Meta, StoryObj } from "@storybook/react";
import { render } from "../render";
import { ThemeProvider } from "./theme-provider";
import type { UISpecification, ThemeSpecification } from "../../types/schema/specification";
import type { ButtonSpec } from "../../types/schema/ui";

const meta = {
  title: "Theme/Style Overrides",
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],

  tags: ['autodocs', 'theme-style-overrides'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Demonstrates global style overrides for components
 */
export const GlobalOverrides: Story = {
  render: () => {
    const theme: ThemeSpecification = {
      components: {
        Button: {
          global: {
            className: "rounded-full shadow-lg font-bold tracking-wider uppercase",
            styles: {
              transition: "all 0.3s ease",
            },
          },
        },
        Card: {
          global: {
            className: "rounded-2xl shadow-xl border-2 border-gray-100",
            styles: {
              padding: "2rem",
              background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
            },
          },
        },
      },
    };

    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: "6",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-bold",
            children: "Global Style Overrides",
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "All components of a type receive these styles automatically",
          },
          {
            type: "Flex",
            gap: "4",
            children: [
              {
                type: "Button",
                children: "Default Button",
              },
              {
                type: "Button",
                variant: "default",
                children: "Primary Button",
              } as ButtonSpec,
              {
                type: "Button",
                variant: "secondary",
                children: "Secondary Button",
              } as ButtonSpec,
            ],
          },
          {
            type: "Card",
            children: {
              type: "Text",
              children: "This card has global style overrides applied",
            },
          },
        ],
      },
      theme,
    };

    const ui = render(spec);
    return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
  },
};

/**
 * Demonstrates variant-specific style overrides
 */
export const VariantOverrides: Story = {
  render: () => {
    const theme: ThemeSpecification = {
      colors: {
        primary: { 500: "#3B82F6", 600: "#2563EB" },
        secondary: { 500: "#10B981", 600: "#059669" },
        destructive: { 500: "#EF4444", 600: "#DC2626" },
      },
      components: {
        Button: {
          variants: {
            primary: {
              className:
                "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700",
              styles: {
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              },
            },
            secondary: {
              className:
                "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700",
              styles: {
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
              },
            },
            destructive: {
              className:
                "bg-gradient-to-r from-destructive-500 to-destructive-600 text-white hover:from-destructive-600 hover:to-destructive-700",
              styles: {
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
              },
            },
          },
        },
      },
    };

    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: "6",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-bold",
            children: "Variant-Specific Overrides",
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "Different variants can have unique styling",
          },
          {
            type: "Flex",
            gap: "4",
            children: [
              {
                type: "Button",
                variant: "default",
                children: "Primary Gradient",
              },
              {
                type: "Button",
                variant: "secondary",
                children: "Secondary Gradient",
              },
              {
                type: "Button",
                variant: "destructive",
                children: "Destructive Gradient",
              },
            ],
          },
        ],
      },
      theme,
    };

    const ui = render(spec);
    return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
  },
};

/**
 * Demonstrates size-specific style overrides
 */
export const SizeOverrides: Story = {
  render: () => {
    const theme: ThemeSpecification = {
      components: {
        Button: {
          sizes: {
            sm: {
              className: "text-xs px-2 py-1 rounded",
              styles: {
                letterSpacing: "0.05em",
              },
            },
            md: {
              className: "text-sm px-4 py-2 rounded-lg",
              styles: {
                letterSpacing: "0.075em",
              },
            },
            lg: {
              className: "text-lg px-8 py-4 rounded-xl font-bold",
              styles: {
                letterSpacing: "0.1em",
              },
            },
          },
        },
      },
    };

    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: "6",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-bold",
            children: "Size-Specific Overrides",
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "Different sizes can have unique styling",
          },
          {
            type: "Flex",
            gap: "4",
            alignItems: "center",
            children: [
              {
                type: "Button",
                size: "sm",
                variant: "default",
                children: "Small",
              },
              {
                type: "Button",
                size: "md",
                variant: "default",
                children: "Medium",
              },
              {
                type: "Button",
                size: "lg",
                variant: "default",
                children: "Large",
              },
            ],
          },
        ],
      },
      theme,
    };

    const ui = render(spec);
    return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
  },
};

/**
 * Demonstrates combination overrides for specific variant + size combinations
 */
export const CombinationOverrides: Story = {
  render: () => {
    const theme: ThemeSpecification = {
      colors: {
        primary: { 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8" },
      },
      components: {
        Button: {
          // Base styles for all buttons
          global: {
            className: "font-medium transition-all duration-200",
          },
          // Variant-specific styles
          variants: {
            primary: {
              className: "bg-primary-500 text-white hover:bg-primary-600",
            },
          },
          // Size-specific styles
          sizes: {
            lg: {
              className: "text-lg px-6 py-3",
            },
          },
          // Special combination override
          combinations: [
            {
              variant: "default",
              size: "lg",
              className:
                "bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white px-8 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105",
              styles: {
                borderRadius: "999px",
                letterSpacing: "0.1em",
              },
            },
          ],
        },
      },
    };

    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: "6",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-bold",
            children: "Combination Overrides",
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "The primary + large combination has special styling",
          },
          {
            type: "Grid",
            columns: "3",
            gap: "4",
            children: [
              // Regular variants
              {
                type: "Button",
                variant: "default",
                size: "sm",
                children: "Primary Small",
              },
              {
                type: "Button",
                variant: "default",
                size: "md",
                children: "Primary Medium",
              },
              {
                type: "Button",
                variant: "default",
                size: "lg",
                children: "✨ Special Combo",
              },
              // Other sizes with primary
              {
                type: "Button",
                variant: "secondary",
                size: "lg",
                children: "Secondary Large",
              },
              {
                type: "Button",
                variant: "outline",
                size: "lg",
                children: "Outline Large",
              },
              {
                type: "Button",
                variant: "ghost",
                size: "lg",
                children: "Ghost Large",
              },
            ],
          },
        ],
      },
      theme,
    };

    const ui = render(spec);
    return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
  },
};

/**
 * Demonstrates token-based style overrides
 */
export const TokenBasedOverrides: Story = {
  render: () => {
    const theme: ThemeSpecification = {
      colors: {
        primary: {
          500: "#3B82F6",
          600: "#2563EB",
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
        full: "999px",
      },
      components: {
        Card: {
          global: {
            tokens: {
              backgroundColor: "colors.primary.500",
              color: "white",
              padding: "spacing.lg",
              borderRadius: "borderRadius.xl",
            },
            className: "shadow-xl",
          },
        },
        Button: {
          variants: {
            accent: {
              tokens: {
                backgroundColor: "colors.accent.500",
                borderRadius: "borderRadius.full",
                paddingLeft: "spacing.md",
                paddingRight: "spacing.md",
                paddingTop: "spacing.sm",
                paddingBottom: "spacing.sm",
              },
              className: "text-white hover:opacity-90",
            },
          },
        },
      },
    };

    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: "6",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-bold",
            children: "Token-Based Overrides",
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "Styles can reference theme tokens for consistency",
          },
          {
            type: "Card",
            children: {
              type: "Text",
              children: "This card uses theme tokens for all its styling",
            },
          },
          {
            type: "Button",
            variant: "secondary",
            children: "Accent Button with Tokens",
          },
        ],
      },
      theme,
    };

    const ui = render(spec);
    return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
  },
};

/**
 * Shows how spec-level styles merge with theme overrides
 */
export const SpecLevelStyleMerging: Story = {
  render: () => {
    const theme: ThemeSpecification = {
      components: {
        Button: {
          global: {
            className: "rounded-lg shadow-md font-medium",
            styles: {
              transition: "all 0.2s",
            },
          },
          variants: {
            primary: {
              className: "bg-blue-500 text-white hover:bg-blue-600",
            },
          },
        },
      },
    };

    const spec: UISpecification = {
      version: "1.0.0",
      root: {
        type: "Flex",
        direction: "column",
        gap: "6",
        children: [
          {
            type: "Heading",
            level: "h2",
            className: "text-2xl font-bold",
            children: "Style Merging",
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "Spec-level styles merge with theme overrides",
          },
          {
            type: "Flex",
            gap: "4",
            children: [
              {
                type: "Button",
                variant: "default",
                children: "Theme Styled",
              },
              {
                type: "Button",
                variant: "default",
                // These will merge with theme styles
                className: "animate-pulse",
                style: {
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  transform: "scale(1.1)",
                },
                children: "Theme + Spec Styled",
              },
            ],
          },
        ],
      },
      theme,
    };

    const ui = render(spec);
    return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
  },
};
