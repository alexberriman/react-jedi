import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "../../../components/ui/code-block";

export function GettingStartedPage() {
  usePageMetadata({
    title: "Getting Started",
    description:
      "Get started with React Jedi - Installation, basic concepts, and your first component.",
  });
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Getting Started
      </h2>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Installation
        </h3>
        <CodeBlock language="bash">
          {`npm install @banja/react-jedi`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Basic Usage
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          React Jedi uses JSON specifications to define UI components and their properties. The
          library&apos;s core function is{" "}
          <code className="bg-gray-100 dark:bg-gray-800/70 px-1.5 py-0.5 rounded text-sm">
            render()
          </code>
          , which takes a specification object and renders it to React components.
        </p>

        <div className="mb-8">
          <CodeBlock language="typescript">
            {`import { render } from "@banja/react-jedi";

// JSON specification for a simple UI
const spec = {
  type: "container",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Hello, React Jedi!"
    },
    {
      type: "text",
      text: "Building UIs with JSON specifications."
    }
  ]
};

// Render the UI
function MyComponent() {
  return render(spec);
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          TypeScript Support
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          React Jedi includes comprehensive TypeScript definitions for all component specifications,
          ensuring type safety when building your UIs.
        </p>

        <div className="mb-8">
          <CodeBlock language="typescript">
            {`import { render, ComponentSpec } from "@banja/react-jedi";

// Type-safe component specification
const spec: ComponentSpec = {
  type: "container",
  maxWidth: "xl",
  padding: "md",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Type-Safe UI",
      gradient: "rainbow"
    }
  ]
};

function MyApp() {
  return (
    <div className="app">
      {render(spec)}
    </div>
  );
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Project Structure
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          React Jedi is designed to be integrated with any React project. Here&apos;s a recommended
          project structure for using React Jedi:
        </p>

        <div className="mb-8">
          <CodeBlock language="bash">
            {`src/
  components/         # Your custom React components
  schemas/            # JSON UI specifications
    pages/            # Page-level schemas
    sections/         # Reusable section schemas
    elements/         # Small element schemas
  theme/              # Theme configuration files
  utils/              # Utility functions
  App.tsx             # Main application file
  main.tsx            # Entry point`}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
