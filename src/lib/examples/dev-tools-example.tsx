import React from "react";
import { render } from "../render";
import type { SpecificationSchema } from "../../types/schema/specification";
import {
  Debug,
  DebugLevel,
  createLinter,
  createFormatter,
  formatErrorWithContext,
  createDeveloperError,
  ErrorCodes,
} from "../dev-tools";

/**
 * Developer Tools Example
 *
 * This example demonstrates the usage of React Jedi's developer tools
 * including enhanced error messages, specification linting, formatting,
 * and debugging utilities.
 */

// Example specification with intentional issues
const exampleSpec: SpecificationSchema = {
  version: "1.0",
  state: {
    count: 0,
    unusedVariable: "This will trigger a warning",
  },
  root: {
    type: "Box",
    props: {
      className: "container",
      style: { padding: "20px" }, // This will trigger inline style warning
    },
    children: [
      {
        type: "Heading",
        ID: "main-title", // Wrong case - should be 'id'
        props: {
          level: 1,
          children: "Developer Tools Demo",
        },
      },
      {
        type: "Image",
        props: {
          src: "demo.jpg",
          // Missing alt text - will trigger accessibility error
        },
      },
      {
        type: "Input",
        props: {
          placeholder: "Enter text",
          // Missing label - will trigger warning
        },
      },
      {
        type: "Box",
        children: [], // Empty children array - will trigger warning
      },
      {
        type: "Buttn", // Typo - will trigger component not found error
        props: {
          children: "Click me",
        },
      },
    ],
  },
};

// Move these functions outside component to satisfy ESLint scope rules
function showErrorExamples() {
  console.group("🚨 Error Examples");

  // Component not found error
  const notFoundError = createDeveloperError(
    ErrorCodes.COMPONENT_NOT_FOUND,
    "Component 'Buttn' not found",
    {
      component: "Buttn",
      suggestion: "Did you mean 'Button'?",
      documentation: "https://docs.react-jedi.com/components/button",
    }
  );
  console.error(formatErrorWithContext(notFoundError, true));

  // Invalid props error
  const propsError = createDeveloperError(
    ErrorCodes.INVALID_COMPONENT_PROPS,
    "Invalid props for Button component",
    {
      component: "Button",
      path: ["root", "children", "4", "props", "variant"],
      suggestion: "Valid variants are: default, destructive, outline, secondary, ghost, link",
      severity: "error",
    }
  );
  console.error(formatErrorWithContext(propsError, false));

  console.groupEnd();
}

function runDebugDemo() {
  console.group("🔧 Debug Demo");

  // Log component render
  Debug.logRender(
    { type: "Button" },
    {
      componentPath: ["App", "Container", "Button"],
      renderCount: 5,
      renderTime: 12.5,
      props: { variant: "primary", onClick: "handleClick" },
      errors: [],
    }
  );

  // Log state change
  Debug.logStateChange({ count: 0, message: "Hello" }, { count: 1, message: "Hello World" }, [
    "count",
    "message",
  ]);

  // Log event
  Debug.logEvent("click", "handleButtonClick", { target: "submit-button" });

  // Performance profiling
  Debug.profile("Heavy Computation", () => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  });

  // Create debug report
  console.log(Debug.createDebugReport());

  console.groupEnd();
}

export function DevToolsExample() {
  const [debugEnabled, setDebugEnabled] = React.useState(false);
  const [lintResults, setLintResults] = React.useState<string>("");
  const [formattedSpec, setFormattedSpec] = React.useState<string>("");

  // Configure debug settings
  React.useEffect(() => {
    Debug.configure({
      enabled: debugEnabled,
      level: DebugLevel.DEBUG,
      logComponentRenders: true,
      logStateChanges: true,
      logEventHandlers: true,
      performanceThreshold: 10,
      consoleGroups: true,
    });
  }, [debugEnabled]);

  // Lint the specification
  const runLinter = () => {
    const linter = createLinter();
    const results = linter.lint(exampleSpec);
    setLintResults(linter.formatResults(results, true));
  };

  // Format the specification
  const formatSpec = () => {
    const formatter = createFormatter();
    setFormattedSpec(formatter.prettyPrint(exampleSpec, true));
  };

  // Render with error boundary
  const renderWithErrors = () => {
    try {
      return render(exampleSpec, {
        debug: debugEnabled,
        theme: {
          colors: {
            primary: "#3B82F6",
            secondary: "#8B5CF6",
          },
        },
      });
    } catch (error) {
      console.error("Render error:", error);
      return <div>Error rendering specification</div>;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">React Jedi Developer Tools Demo</h1>

      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Debug Controls</h2>

        <div className="flex gap-4">
          <button
            onClick={() => setDebugEnabled(!debugEnabled)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {debugEnabled ? "Disable" : "Enable"} Debug Mode
          </button>

          <button
            onClick={runLinter}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Run Linter
          </button>

          <button
            onClick={formatSpec}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Format Spec
          </button>

          <button
            onClick={showErrorExamples}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Show Error Examples
          </button>

          <button
            onClick={runDebugDemo}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Run Debug Demo
          </button>
        </div>
      </div>

      {lintResults && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Lint Results</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <div dangerouslySetInnerHTML={{ __html: lintResults }} />
          </pre>
        </div>
      )}

      {formattedSpec && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Formatted Specification</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <div dangerouslySetInnerHTML={{ __html: formattedSpec }} />
          </pre>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Rendered Output</h2>
        <div className="border-2 border-gray-300 rounded p-4">{renderWithErrors()}</div>
      </div>
    </div>
  );
}
