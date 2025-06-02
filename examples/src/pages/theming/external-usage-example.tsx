import { useEffect } from "react";
import {
  render,
  generateBrandTheme,
  applyCssVariables,
  generateCssVariables,
} from "@alexberriman/react-jedi";

/**
 * Example showing how to use React Jedi theming in an external application
 */
export function ExternalUsageExample() {
  useEffect(() => {
    // Generate a brand theme
    const { theme } = generateBrandTheme({ preset: "tech-startup" });
    
    // Generate CSS variables from the theme
    const { variables } = generateCssVariables(theme);
    
    // Apply CSS variables to the DOM
    const cleanup = applyCssVariables(variables);
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  const spec = {
    type: "Stack",
    spacing: 4,
    children: [
      {
        type: "heading",
        level: "h1",
        children: "Welcome to React Jedi",
        gradient: "rainbow",
      },
      {
        type: "button",
        variant: "primary",
        size: "lg",
        children: "Get started",
      },
      {
        type: "Box",
        className: "border-t border-gray-200 dark:border-gray-800 pt-8",
        children: [
          {
            type: "Grid",
            columns: {
              base: 1,
              md: 4,
            },
            gap: "8",
            className: "mb-8",
            children: [
              {
                type: "Box",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    className: "mb-4",
                    children: "Company",
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "About",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Team",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Careers",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    className: "mb-4",
                    children: "Product",
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Features",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Pricing",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Docs",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    className: "mb-4",
                    children: "Resources",
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Community",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Support",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Blog",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Box",
                children: [
                  {
                    type: "Heading",
                    level: "h5",
                    className: "mb-4",
                    children: "Legal",
                  },
                  {
                    type: "Stack",
                    spacing: "2",
                    children: [
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Privacy",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "Terms",
                      },
                      {
                        type: "Text",
                        className: "text-sm text-gray-600 dark:text-gray-400",
                        children: "License",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "Text",
            className: "text-center text-sm text-gray-600 dark:text-gray-400",
            children: "© 2024 React Jedi. All rights reserved.",
          },
        ],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">External App Usage Example</h2>
      <p className="mb-4">
        This example shows how to use React Jedi in an external application with proper theming.
      </p>
      <div className="border rounded-lg p-4">
        {render(spec)}
      </div>
    </div>
  );
}

/**
 * Alternative approach: Pass theme directly in the render options
 */
export function AlternativeThemeExample() {
  const { theme } = generateBrandTheme({ preset: "minimal" });
  
  const spec = {
    type: "Stack",
    spacing: 4,
    children: [
      {
        type: "Heading",
        level: "h2",
        children: "Alternative Theme Approach",
      },
      {
        type: "Text",
        children: "This uses the theme passed directly to render options.",
      },
      {
        type: "Flex",
        gap: 3,
        children: [
          {
            type: "Button",
            variant: "primary",
            children: "Primary",
          },
          {
            type: "Button",
            variant: "secondary",
            children: "Secondary",
          },
          {
            type: "Button",
            variant: "outline",
            children: "Outline",
          },
          {
            type: "Button",
            variant: "ghost",
            children: "Ghost",
          },
        ],
      },
    ],
  };

  return (
    <div className="mt-8">
      <div className="border rounded-lg p-4">
        {render(spec, { theme })}
      </div>
    </div>
  );
}

/**
 * Example without any theme (will use default CSS vars from styles.css)
 */
export function NoThemeExample() {
  const spec = {
    type: "Stack",
    spacing: 4,
    children: [
      {
        type: "Heading",
        level: "h2",
        children: "No Theme Example",
      },
      {
        type: "Text",
        children: "This uses only the default CSS variables from styles.css. If buttons appear black, it means the CSS file isn't loaded properly or the default variables need adjustment.",
      },
      {
        type: "Button",
        variant: "primary",
        children: "This might appear black",
      },
    ],
  };

  return (
    <div className="mt-8">
      <div className="border rounded-lg p-4">
        {render(spec)}
      </div>
    </div>
  );
}