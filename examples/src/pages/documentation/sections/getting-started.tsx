import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "../../../components/ui/code-block";

export function GettingStartedPage() {
  usePageMetadata({
    title: "Getting Started",
    description:
      "Get started with React Jedi - Installation, basic concepts, and your first component.",
  });
  return (
    <section className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          Getting Started
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50 transition-colors" />
        </h2>
      </div>
      <div className="prose prose-invert prose-emerald max-w-none">
        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Installation
        </h3>
        <CodeBlock language="bash">
          {`npm install @banja/react-jedi`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Basic Usage
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          React Jedi uses JSON specifications to define UI components and their properties. The
          library&apos;s core function is{" "}
          <code className="bg-zinc-100 dark:bg-zinc-800/70 px-1.5 py-0.5 rounded text-sm transition-colors">
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

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          TypeScript Support
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
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

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Project Structure
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
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
    </section>
  );
}
