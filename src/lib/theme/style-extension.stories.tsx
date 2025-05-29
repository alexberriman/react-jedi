/**
 * Style Extension System Stories
 *
 * Interactive demonstrations of the style extension system including:
 * - Style inheritance
 * - Component style composition
 * - Cascading style resolution
 */

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { cn } from "../utils";
import {
  extractInheritableStyles,
  shouldInheritStyles,
  composeStyles,
  cascadeStyles,
  type StyleSource,
} from "./style-extension";
import { ThemeProvider } from "./theme-provider";
import { defaultTheme } from "./theme-presets";
import * as UI from "../../components/ui";

/**
 * Demo component for style inheritance
 */
function StyleInheritanceDemo() {
  const parentStyles: React.CSSProperties = {
    color: "#3b82f6", // blue-500
    fontSize: "18px",
    fontFamily: "Georgia, serif",
    margin: "20px",
    padding: "20px",
    border: "2px solid #e5e7eb",
  };

  const inheritableStyles = extractInheritableStyles(parentStyles);
  // Remove nonInheritableStyles since it's not being used

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Style Inheritance Demo</h3>
        <p className="text-gray-600 mb-6">
          Demonstrates which CSS properties are inherited by default
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold mb-2">Parent Styles</h4>
            <div className="bg-gray-50 p-4 rounded" style={parentStyles}>
              Parent container with all styles
              <div className="mt-4 bg-white p-3 rounded" style={inheritableStyles}>
                Child inherits: color, fontSize, fontFamily
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Style Analysis</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded">
                <div className="font-semibold text-green-800">Inheritable</div>
                <pre className="text-sm mt-1 text-green-700">
                  {JSON.stringify(inheritableStyles, null, 2)}
                </pre>
              </div>

              <div className="bg-red-50 p-3 rounded">
                <div className="font-semibold text-red-800">Non-Inheritable</div>
                <pre className="text-sm mt-1 text-red-700">
                  {JSON.stringify(
                    {
                      margin: parentStyles.margin,
                      padding: parentStyles.padding,
                      border: parentStyles.border,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Component Inheritance Behavior</h4>
        <div className="grid gap-4 md:grid-cols-3">
          {["Text", "Card", "Button"].map((component) => (
            <div key={component} className="bg-gray-50 p-4 rounded">
              <div className="font-medium text-lg">{component}</div>
              <div
                className={cn(
                  "text-sm mt-2",
                  shouldInheritStyles(component) ? "text-green-600" : "text-red-600"
                )}
              >
                {shouldInheritStyles(component) ? "✓ Inherits styles" : "✗ Boundary component"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Demo component for style composition
 */
function StyleCompositionDemo() {
  const sources: StyleSource[] = [
    {
      source: "theme.defaults",
      className: "text-gray-700 text-base",
      style: { lineHeight: 1.6, letterSpacing: "0.02em" },
    },
    {
      source: "theme.components",
      className: "font-medium",
      style: { fontSize: "16px" },
    },
    {
      source: "parent.inherited",
      className: "text-blue-600",
      style: { fontFamily: "Arial, sans-serif" },
    },
    {
      source: "spec.style",
      style: { fontWeight: "bold", textDecoration: "underline" },
    },
    {
      source: "spec.className",
      className: "uppercase tracking-wide",
    },
  ];

  const composed = composeStyles(sources);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Style Composition Demo</h3>
        <p className="text-gray-600 mb-6">Shows how multiple style sources are combined in order</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="font-semibold mb-4">Style Sources (in precedence order)</h4>
          <div className="space-y-3">
            {sources.map((source, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <div className="font-medium text-sm text-gray-700 mb-2">{source.source}</div>
                {source.className && (
                  <div className="text-sm">
                    <span className="text-gray-600">className:</span>{" "}
                    <span className="text-blue-600 font-mono">{source.className}</span>
                  </div>
                )}
                {source.style && (
                  <div className="text-sm">
                    <span className="text-gray-600">style:</span>{" "}
                    <span className="text-green-600 font-mono">{JSON.stringify(source.style)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Composed Result</h4>
          <div className="bg-purple-50 p-4 rounded">
            <div className="font-medium text-purple-800 mb-3">Final Styles</div>
            <div className="text-sm space-y-2">
              <div>
                <span className="text-gray-600">className:</span>{" "}
                <span className="text-purple-600 font-mono">{composed.className}</span>
              </div>
              <div>
                <span className="text-gray-600">style:</span>{" "}
                <pre className="text-purple-600 font-mono text-xs mt-1">
                  {JSON.stringify(composed.style, null, 2)}
                </pre>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded shadow-sm">
              <div className={composed.className} style={composed.style}>
                Sample text with composed styles
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Demo component for cascade resolution
 */
function CascadeResolutionDemo() {
  const sources: StyleSource[] = [
    {
      source: "theme.defaults",
      className: "text-gray-800",
      style: { color: "gray" },
      priority: 0,
    },
    {
      source: "theme.components",
      className: "text-blue-600 font-medium",
      style: { color: "blue !important" },
      priority: 1,
    },
    {
      source: "spec.className",
      className: "text-red-600 text-lg",
      style: { color: "red" },
      priority: 2,
    },
  ];

  const cascaded = cascadeStyles(sources);
  const cascadedWithoutImportant = cascadeStyles(sources, {
    useSpecificity: true,
    handleImportant: false,
  });

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Cascade Resolution Demo</h3>
        <p className="text-gray-600 mb-6">
          Demonstrates CSS-like cascade resolution with specificity and !important
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="font-semibold mb-4">Style Sources with Priority</h4>
          <div className="space-y-3">
            {sources.map((source, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-sm text-gray-700">{source.source}</div>
                  <div className="text-xs bg-gray-200 px-2 py-1 rounded">
                    Priority: {source.priority}
                  </div>
                </div>
                {source.className && (
                  <div className="text-sm mb-1">
                    <span className="text-gray-600">className:</span>{" "}
                    <span className="text-blue-600 font-mono">{source.className}</span>
                  </div>
                )}
                {source.style && (
                  <div className="text-sm">
                    <span className="text-gray-600">style:</span>{" "}
                    <span
                      className={cn(
                        "font-mono",
                        source.style.color?.includes("!important")
                          ? "text-red-600 font-bold"
                          : "text-green-600"
                      )}
                    >
                      {JSON.stringify(source.style)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Cascade Results</h4>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="font-medium text-blue-800 mb-3">With !important handling</div>
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-gray-600">Final color:</span>{" "}
                  <span className="text-blue-600 font-mono font-bold">
                    {cascaded.style?.color} (from !important)
                  </span>
                </div>
                <div className="mt-3 p-3 bg-white rounded" style={cascaded.style}>
                  {cascaded.className && (
                    <div className={cascaded.className}>This text is blue due to !important</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <div className="font-medium text-green-800 mb-3">Without !important handling</div>
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-gray-600">Final color:</span>{" "}
                  <span className="text-green-600 font-mono">
                    {cascadedWithoutImportant.style?.color} (highest priority)
                  </span>
                </div>
                <div className="mt-3 p-3 bg-white rounded" style={cascadedWithoutImportant.style}>
                  {cascadedWithoutImportant.className && (
                    <div className={cascadedWithoutImportant.className}>
                      This text is red due to priority
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Complete integration demo
 */
function IntegrationDemo() {
  return (
    <ThemeProvider theme={defaultTheme.theme}>
      <div className="space-y-8 p-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Style Extension Integration</h3>
          <p className="text-gray-600 mb-6">
            Complete example showing inheritance, composition, and cascade working together
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg" style={{ color: "blue", fontSize: "16px" }}>
          <div className="font-medium mb-4">Parent Container (blue text, 16px)</div>

          <UI.Card className="mb-4">
            <div className="p-4">
              <div className="font-medium mb-2">Card (boundary component)</div>
              <div className="text-sm text-gray-600">Does not inherit blue color or font size</div>
            </div>
          </UI.Card>

          <UI.Box className="bg-white p-4 rounded">
            <div className="font-medium mb-2">Box with Text children</div>
            <UI.Text>This text inherits blue color and 16px size</UI.Text>
            <UI.Text className="text-red-600 mt-2">
              This text overrides with red color but keeps 16px size
            </UI.Text>
          </UI.Box>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="font-medium mb-4">Style Extension API</div>
          <pre className="bg-white p-4 rounded text-sm overflow-x-auto">
            {`const extension = createStyleExtension(theme);

// Extract inheritable styles
const inheritable = extension.extractInheritable({ 
  color: "red", 
  margin: "10px" 
});
// Result: { color: "red" }

// Check if component should inherit
extension.shouldInherit("Text"); // true
extension.shouldInherit("Card"); // false

// Compose multiple style sources
const composed = extension.compose([
  { source: "theme", className: "default" },
  { source: "spec", className: "custom" }
]);

// Apply cascade resolution
const cascaded = extension.cascade(sources);

// Complete resolution pipeline
const resolved = extension.resolve(spec, context, overrides);`}
          </pre>
        </div>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta = {
  title: "Theme/Style Extension",
  parameters: {
    docs: {
      description: {
        component: "Style extension system for inheritance, composition, and cascade resolution",
      },
    },
  },

  tags: ['theme-style-extension']};

export default meta;

export const Inheritance: StoryObj = {
  render: () => <StyleInheritanceDemo />,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates style inheritance from parent components",
      },
    },
  },
};

export const Composition: StoryObj = {
  render: () => <StyleCompositionDemo />,
  parameters: {
    docs: {
      description: {
        story: "Shows how multiple style sources are composed together",
      },
    },
  },
};

export const Cascade: StoryObj = {
  render: () => <CascadeResolutionDemo />,
  parameters: {
    docs: {
      description: {
        story: "Illustrates CSS-like cascade resolution with specificity",
      },
    },
  },
};

export const Integration: StoryObj = {
  render: () => <IntegrationDemo />,
  parameters: {
    docs: {
      description: {
        story: "Complete integration example with all features",
      },
    },
  },
};
