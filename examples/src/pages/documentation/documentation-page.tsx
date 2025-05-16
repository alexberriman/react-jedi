import { Link } from "react-router-dom";

export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 mb-16">
            <div className="relative w-fit">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 mb-2">
                Documentation
              </h1>
              <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full blur-sm" />
              <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
            </div>
            <p className="text-xl text-zinc-300 max-w-3xl">
              Learn how to build beautiful, server-driven interfaces with React Jedi&apos;s
              JSON-based approach.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 sticky top-[61px] bg-black/30 backdrop-blur-md p-3 -mx-3 rounded-xl border border-zinc-800 z-20">
            <a
              href="#getting-started"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Getting Started
            </a>
            <a
              href="#component-system"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Component System
            </a>
            <a
              href="#layout-components"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Layout Components
            </a>
            <a
              href="#typography"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Typography
            </a>
            <a
              href="#ui-components"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              UI Components
            </a>
            <a
              href="#form-components"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Form Components
            </a>
            <a
              href="#theming"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Theming
            </a>
            <a
              href="#complex-examples"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Complex Examples
            </a>
            <a
              href="#performance"
              className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm"
            >
              Performance
            </a>
          </div>

          {/* Getting Started Section */}
          <section id="getting-started" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Getting Started
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>
            <div className="prose prose-invert prose-emerald max-w-none">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Installation</h3>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono mb-6 overflow-x-auto">
                  <code className="text-sm">npm install @banja/react-jedi</code>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Basic Usage</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                React Jedi uses JSON specifications to define UI components and their properties.
                The library&apos;s core function is{" "}
                <code className="bg-zinc-800/70 px-1.5 py-0.5 rounded text-sm">render()</code>,
                which takes a specification object and renders it to React components.
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
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
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">TypeScript Support</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                React Jedi includes comprehensive TypeScript definitions for all component
                specifications, ensuring type safety when building your UIs.
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
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
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Project Structure</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                React Jedi is designed to be integrated with any React project. Here&apos;s a
                recommended project structure for using React Jedi:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
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
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Component System Section */}
          <section id="component-system" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Component System
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>
            <div className="prose prose-invert prose-emerald max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-6">
                React Jedi&apos;s component system is built around a simple, consistent pattern.
                Each component in a JSON specification has a{" "}
                <code className="bg-zinc-800/70 px-1.5 py-0.5 rounded text-sm">type</code> property
                that identifies the component, and additional properties specific to that component.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                Specification Structure
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Every component specification follows this general structure:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "componentType",    // Required: The type of component to render
  
  // Component-specific properties
  "prop1": "value1",          // String properties
  "prop2": 123,               // Number properties
  "prop3": true,              // Boolean properties
  "prop4": {                  // Object properties
    "nestedProp": "value"
  },
  "prop5": ["item1", "item2"], // Array properties
  
  // Children (for container components)
  "children": [               // Array of child component specifications
    {
      "type": "childType",
      // Child component properties...
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Component Properties</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                React Jedi components support several common properties in addition to their
                specific properties:
              </p>

              <ul className="space-y-2 mb-6 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">className</span> - Additional CSS
                  classes to apply to the component
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">id</span> - HTML id attribute for the
                  component
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">data-*</span> - Custom data attributes
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">style</span> - Inline styles (object
                  format)
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Complete Example</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Here&apos;s a more comprehensive example using multiple components together:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "container",
  "maxWidth": "lg",
  "padding": "lg",
  "children": [
    {
      "type": "heading",
      "level": "h1",
      "content": "Welcome to React Jedi",
      "gradient": "rainbow",
      "size": "5xl",
      "align": "center"
    },
    {
      "type": "separator",
      "orientation": "horizontal",
      "className": "my-8"
    },
    {
      "type": "grid",
      "columns": { "default": 1, "md": 2, "lg": 3 },
      "gap": "lg",
      "children": [
        {
          "type": "card",
          "className": "hover:border-emerald-500/50 transition-all",
          "children": [
            {
              "type": "heading",
              "level": "h3",
              "content": "Feature One"
            },
            {
              "type": "text",
              "text": "Build beautiful UIs with JSON specifications"
            }
          ]
        },
        {
          "type": "card",
          "className": "hover:border-emerald-500/50 transition-all",
          "children": [
            {
              "type": "heading",
              "level": "h3",
              "content": "Feature Two"
            },
            {
              "type": "text",
              "text": "Type-safe component system with full TypeScript support"
            }
          ]
        },
        {
          "type": "card",
          "className": "hover:border-emerald-500/50 transition-all",
          "children": [
            {
              "type": "heading",
              "level": "h3",
              "content": "Feature Three"
            },
            {
              "type": "text",
              "text": "Powered by TailwindCSS and ShadCN components"
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Layout Components Section */}
          <section id="layout-components" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Layout Components
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Container</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    A centered, responsive container with configurable max-width and padding.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "container",
  "maxWidth": "xl",
  "padding": "md",
  "align": "center",
  "children": [
    // Container content
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4h16v16H4z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Box</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    A flexible, all-purpose container for building layouts.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "box",
  "padding": "md",
  "background": "card",
  "rounded": "md",
  "shadow": "sm",
  "border": true,
  "className": "hover:shadow-lg transition-shadow",
  "children": [
    {
      "type": "heading",
      "level": "h3",
      "content": "Card Title",
      "size": "xl"
    },
    {
      "type": "text",
      "text": "This is box component content.",
      "variant": "muted"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Grid</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    A powerful grid layout system with responsive columns and gaps.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "grid",
  "columns": {
    "default": 1,
    "sm": 2,
    "md": 3,
    "lg": 4
  },
  "gap": "lg",
  "children": [
    // Grid items
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Flex</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    A flexbox layout component for arranging items in a row or column.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "flex",
  "direction": "row",
  "wrap": "wrap",
  "justify": "between",
  "align": "center",
  "gap": "md",
  "children": [
    // Flex items
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Layout Tips</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  Use <span className="font-semibold text-white">Container</span> for page-level
                  content organization
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Grid</span> works best for structured,
                  multi-column layouts
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  Use <span className="font-semibold text-white">Flex</span> for aligning items
                  along a single axis
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Box</span> is perfect for creating
                  card-like UI elements
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                to="/showcase"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
              >
                <span>View Layout Components Showcase</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* Typography Section */}
          <section id="typography" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Typography
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Heading</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Headings from h1 to h6 with customizable styling options.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "heading",
  "level": "h1",
  "content": "Page Title",
  "size": "5xl",
  "weight": "extrabold",
  "gradient": "rainbow",
  "animation": "glow"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Text</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Paragraphs and text spans with rich styling options.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "text",
  "text": "This is styled paragraph text with advanced features.",
  "element": "p",
  "size": "lg",
  "weight": "medium",
  "variant": "primary",
  "gradient": "ocean",
  "align": "justify",
  "lineClamp": 3,
  "shadow": true,
  "transform": "capitalize"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">BlockQuote</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Stylized blockquotes for testimonials and citations.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "blockquote",
  "content": "This is a beautiful quote.",
  "author": "John Doe",
  "cite": "Book Title",
  "variant": "primary"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Typography Features</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Gradients</span> - Apply beautiful text
                  gradients
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Transformations</span> - Uppercase,
                  lowercase, capitalize
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Animations</span> - Glow, pulse,
                  shimmer effects
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Truncation</span> - Single and
                  multi-line text truncation
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                to="/showcase"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
              >
                <span>View Typography Showcase</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* UI Components Section */}
          <section id="ui-components" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                UI Components
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Button</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Versatile button component with multiple variants and sizes.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "button",
  "text": "Click Me",
  "variant": "primary",
  "size": "lg",
  "icon": "arrow-right",
  "loading": false,
  "disabled": false
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Card</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Container for grouping related content with optional header and footer.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "card",
  "children": [
    {
      "type": "heading",
      "level": "h3",
      "content": "Card Title"
    },
    {
      "type": "text",
      "text": "Card content goes here."
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Badge</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Small status indicators with various styling options.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "badge",
  "text": "New",
  "variant": "default",
  "size": "default"
}

// Or with different variants
{
  "type": "badge",
  "text": "Beta",
  "variant": "secondary"
}

{
  "type": "badge",
  "text": "2 items",
  "variant": "outline"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Avatar</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Display user profile images with fallback initials.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "avatar",
  "src": "https://example.com/avatar.jpg",
  "alt": "User Name",
  "fallback": "JD",
  "size": "md"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/showcase"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
              >
                <span>View UI Components Showcase</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* Form Components Section */}
          <section id="form-components" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Form Components
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Input</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Text input field with support for various input types.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "input",
  "id": "username",
  "placeholder": "Enter your username",
  "type": "text",
  "disabled": false,
  "readOnly": false
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Label</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Form label component with accessibility features.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "label",
  "text": "Username",
  "htmlFor": "username",
  "required": true
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                Form Component Features
              </h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Input Groups</span> - Group inputs with
                  prefixes and suffixes
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Validation States</span> - Built-in
                  support for form validation
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Accessibility</span> - ARIA attributes
                  and keyboard navigation
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Responsive Design</span> -
                  Mobile-friendly form components
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                to="/showcase"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
              >
                <span>View Form Components Showcase</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* Complex Examples Section */}
          <section id="complex-examples" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Complex Examples
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="prose prose-invert prose-emerald max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-6">
                Here are some complex examples that combine multiple components to create real-world
                UI patterns.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Hero Section</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A complete hero section with gradient heading, description, and call-to-action
                buttons:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "container",
  "maxWidth": "7xl",
  "padding": "lg",
  "className": "min-h-screen flex items-center",
  "children": [
    {
      "type": "flex",
      "direction": "column",
      "align": "center",
      "gap": "xl",
      "children": [
        {
          "type": "heading",
          "level": "h1",
          "content": "Build Beautiful UIs with React Jedi",
          "size": "6xl",
          "weight": "extrabold",
          "gradient": "rainbow",
          "align": "center",
          "animation": "glow"
        },
        {
          "type": "text",
          "text": "Create stunning, server-driven interfaces using JSON specifications. Powered by React, TailwindCSS, and ShadCN components.",
          "size": "xl",
          "align": "center",
          "variant": "muted",
          "className": "max-w-3xl"
        },
        {
          "type": "flex",
          "direction": "row",
          "gap": "md",
          "wrap": "wrap",
          "justify": "center",
          "children": [
            {
              "type": "button",
              "text": "Get Started",
              "variant": "primary",
              "size": "lg"
            },
            {
              "type": "button",
              "text": "View Documentation",
              "variant": "outline",
              "size": "lg"
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Testimonial Card</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A testimonial card with avatar, quote, and author information:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "card",
  "className": "hover:shadow-2xl transition-all",
  "children": [
    {
      "type": "blockquote",
      "content": "React Jedi has transformed how we build UIs. The JSON specification approach is intuitive and incredibly powerful.",
      "cite": "TechCorp Inc.",
      "variant": "primary"
    },
    {
      "type": "separator",
      "orientation": "horizontal",
      "className": "my-4"
    },
    {
      "type": "flex",
      "direction": "row",
      "align": "center",
      "gap": "md",
      "children": [
        {
          "type": "avatar",
          "src": "https://example.com/avatar.jpg",
          "alt": "John Doe",
          "fallback": "JD",
          "size": "md"
        },
        {
          "type": "box",
          "className": "flex-1",
          "children": [
            {
              "type": "text",
              "text": "John Doe",
              "weight": "semibold"
            },
            {
              "type": "text",
              "text": "Senior Developer",
              "size": "sm",
              "variant": "muted"
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Dashboard Card</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A dashboard card with metrics and status indicators:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "card",
  "children": [
    {
      "type": "flex",
      "direction": "row",
      "justify": "between",
      "align": "start",
      "children": [
        {
          "type": "box",
          "children": [
            {
              "type": "text",
              "text": "Total Revenue",
              "size": "sm",
              "variant": "muted"
            },
            {
              "type": "heading",
              "level": "h2",
              "content": "$45,231.89",
              "size": "3xl",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "+20.1% from last month",
              "size": "sm",
              "variant": "success"
            }
          ]
        },
        {
          "type": "badge",
          "text": "Active",
          "variant": "success"
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Media Components Section */}
          <section id="media-components" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Media Components
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Image</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Responsive image component with advanced styling, lazy loading, and fallback
                    support.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "image",
  "src": "https://example.com/hero.jpg",
  "alt": "Hero Image",
  "width": "100%",
  "height": 400,
  "aspectRatio": "16/9",
  "objectFit": "cover",
  "rounded": "xl",
  "shadow": "lg",
  "hover": "grow",
  "loading": "lazy",
  "fallback": "/default-image.jpg"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6l4 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">AspectRatio</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Maintain consistent aspect ratios for images and media content.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`{
  "type": "aspectRatio",
  "ratio": "16/9",
  "className": "rounded-lg overflow-hidden",
  "children": [
    {
      "type": "image",
      "src": "https://example.com/video-thumbnail.jpg",
      "alt": "Video Thumbnail",
      "objectFit": "cover"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Image Features</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Lazy Loading</span> - Performance
                  optimization with lazy loading
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Fallback Images</span> - Graceful error
                  handling with fallbacks
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Hover Effects</span> - Interactive
                  hover animations
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Filters</span> - Image filters like
                  grayscale, sepia, blur
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                to="/showcase"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group"
              >
                <span>View Media Components Showcase</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* Practical Examples Section */}
          <section id="practical-examples" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Practical Examples
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="prose prose-invert prose-emerald max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-6">
                Here are some practical examples showing how to build common UI patterns with React
                Jedi.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Simple Form Layout</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A form layout with labels and input fields:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "box",
  "padding": "lg",
  "background": "card",
  "rounded": "lg",
  "border": true,
  "children": [
    {
      "type": "heading",
      "level": "h3",
      "content": "Contact Form",
      "size": "xl",
      "weight": "semibold",
      "className": "mb-6"
    },
    {
      "type": "flex",
      "direction": "column",
      "gap": "md",
      "children": [
        {
          "type": "flex",
          "direction": "column",
          "gap": "sm",
          "children": [
            {
              "type": "label",
              "text": "Your Name",
              "htmlFor": "name",
              "required": true
            },
            {
              "type": "input",
              "id": "name",
              "placeholder": "Enter your name",
              "type": "text"
            }
          ]
        },
        {
          "type": "flex",
          "direction": "column",
          "gap": "sm",
          "children": [
            {
              "type": "label",
              "text": "Email Address",
              "htmlFor": "email",
              "required": true
            },
            {
              "type": "input",
              "id": "email",
              "placeholder": "email@example.com",
              "type": "email"
            }
          ]
        },
        {
          "type": "separator",
          "orientation": "horizontal",
          "className": "my-4"
        },
        {
          "type": "button",
          "text": "Submit",
          "variant": "primary",
          "size": "lg",
          "className": "w-full"
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Product Card Grid</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A responsive grid of product cards with images and details:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "grid",
  "columns": {
    "default": 1,
    "sm": 2,
    "md": 3,
    "lg": 4
  },
  "gap": "lg",
  "children": [
    {
      "type": "card",
      "className": "hover:shadow-xl transition-all duration-300",
      "children": [
        {
          "type": "aspectRatio",
          "ratio": "1/1",
          "className": "rounded-lg overflow-hidden mb-4",
          "children": [
            {
              "type": "image",
              "src": "/product-1.jpg",
              "alt": "Product 1",
              "objectFit": "cover",
              "hover": "grow"
            }
          ]
        },
        {
          "type": "heading",
          "level": "h4",
          "content": "Premium Headphones",
          "size": "lg",
          "weight": "semibold"
        },
        {
          "type": "text",
          "text": "Experience crystal-clear audio quality",
          "variant": "muted",
          "size": "sm",
          "className": "mt-2 mb-4"
        },
        {
          "type": "flex",
          "direction": "row",
          "justify": "between",
          "align": "center",
          "children": [
            {
              "type": "text",
              "text": "$299.99",
              "size": "xl",
              "weight": "bold",
              "gradient": "emerald"
            },
            {
              "type": "badge",
              "text": "In Stock",
              "variant": "success"
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                Profile Card with Avatar
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A user profile card with avatar, info, and action buttons:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "card",
  "className": "max-w-sm mx-auto",
  "children": [
    {
      "type": "flex",
      "direction": "column",
      "align": "center",
      "gap": "lg",
      "className": "text-center",
      "children": [
        {
          "type": "avatar",
          "src": "https://example.com/user-avatar.jpg",
          "alt": "Jane Doe",
          "fallback": "JD",
          "size": "xl",
          "className": "ring-4 ring-emerald-500/20"
        },
        {
          "type": "box",
          "children": [
            {
              "type": "heading",
              "level": "h3",
              "content": "Jane Doe",
              "size": "2xl",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "Senior Developer",
              "variant": "muted",
              "className": "mt-1"
            }
          ]
        },
        {
          "type": "text",
          "text": "Building amazing things with React and TypeScript. Coffee enthusiast and open source contributor.",
          "align": "center",
          "className": "max-w-xs"
        },
        {
          "type": "flex",
          "direction": "row",
          "gap": "sm",
          "wrap": "wrap",
          "justify": "center",
          "children": [
            {
              "type": "badge",
              "text": "React",
              "variant": "outline"
            },
            {
              "type": "badge",
              "text": "TypeScript",
              "variant": "outline"
            },
            {
              "type": "badge",
              "text": "Node.js",
              "variant": "outline"
            }
          ]
        },
        {
          "type": "separator",
          "orientation": "horizontal",
          "className": "w-full"
        },
        {
          "type": "flex",
          "direction": "row",
          "gap": "md",
          "justify": "center",
          "className": "w-full",
          "children": [
            {
              "type": "button",
              "text": "Follow",
              "variant": "primary",
              "size": "sm"
            },
            {
              "type": "button",
              "text": "Message",
              "variant": "outline",
              "size": "sm"
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Stats Dashboard</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A dashboard layout with stats cards:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "container",
  "maxWidth": "7xl",
  "padding": "lg",
  "children": [
    {
      "type": "heading",
      "level": "h2",
      "content": "Dashboard Overview",
      "size": "3xl",
      "weight": "bold",
      "className": "mb-8"
    },
    {
      "type": "grid",
      "columns": {
        "default": 1,
        "sm": 2,
        "lg": 4
      },
      "gap": "md",
      "children": [
        {
          "type": "card",
          "className": "hover:shadow-lg transition-shadow",
          "children": [
            {
              "type": "flex",
              "direction": "row",
              "justify": "between",
              "align": "start",
              "children": [
                {
                  "type": "box",
                  "children": [
                    {
                      "type": "text",
                      "text": "Total Users",
                      "size": "sm",
                      "variant": "muted"
                    },
                    {
                      "type": "heading",
                      "level": "h3",
                      "content": "12,345",
                      "size": "3xl",
                      "weight": "bold",
                      "gradient": "blue"
                    }
                  ]
                },
                {
                  "type": "badge",
                  "text": "+12%",
                  "variant": "success"
                }
              ]
            }
          ]
        },
        {
          "type": "card",
          "className": "hover:shadow-lg transition-shadow",
          "children": [
            {
              "type": "flex",
              "direction": "row",
              "justify": "between",
              "align": "start",
              "children": [
                {
                  "type": "box",
                  "children": [
                    {
                      "type": "text",
                      "text": "Revenue",
                      "size": "sm",
                      "variant": "muted"
                    },
                    {
                      "type": "heading",
                      "level": "h3",
                      "content": "$98,765",
                      "size": "3xl",
                      "weight": "bold",
                      "gradient": "emerald"
                    }
                  ]
                },
                {
                  "type": "badge",
                  "text": "+23%",
                  "variant": "success"
                }
              ]
            }
          ]
        },
        {
          "type": "card",
          "className": "hover:shadow-lg transition-shadow",
          "children": [
            {
              "type": "flex",
              "direction": "row",
              "justify": "between",
              "align": "start",
              "children": [
                {
                  "type": "box",
                  "children": [
                    {
                      "type": "text",
                      "text": "Orders",
                      "size": "sm",
                      "variant": "muted"
                    },
                    {
                      "type": "heading",
                      "level": "h3",
                      "content": "3,456",
                      "size": "3xl",
                      "weight": "bold",
                      "gradient": "purple"
                    }
                  ]
                },
                {
                  "type": "badge",
                  "text": "-5%",
                  "variant": "destructive"
                }
              ]
            }
          ]
        },
        {
          "type": "card",
          "className": "hover:shadow-lg transition-shadow",
          "children": [
            {
              "type": "flex",
              "direction": "row",
              "justify": "between",
              "align": "start",
              "children": [
                {
                  "type": "box",
                  "children": [
                    {
                      "type": "text",
                      "text": "Active Now",
                      "size": "sm",
                      "variant": "muted"
                    },
                    {
                      "type": "heading",
                      "level": "h3",
                      "content": "189",
                      "size": "3xl",
                      "weight": "bold",
                      "gradient": "orange"
                    }
                  ]
                },
                {
                  "type": "badge",
                  "text": "Live",
                  "variant": "default"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Feature Section</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A features section with icons and descriptions:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`{
  "type": "container",
  "maxWidth": "6xl",
  "padding": "xl",
  "children": [
    {
      "type": "box",
      "className": "text-center mb-12",
      "children": [
        {
          "type": "heading",
          "level": "h2",
          "content": "Why Choose React Jedi",
          "size": "4xl",
          "weight": "bold",
          "gradient": "rainbow",
          "align": "center"
        },
        {
          "type": "text",
          "text": "Build beautiful interfaces faster with our JSON-based approach",
          "size": "xl",
          "variant": "muted",
          "align": "center",
          "className": "mt-4 max-w-2xl mx-auto"
        }
      ]
    },
    {
      "type": "grid",
      "columns": {
        "default": 1,
        "md": 2,
        "lg": 3
      },
      "gap": "xl",
      "children": [
        {
          "type": "flex",
          "direction": "column",
          "align": "center",
          "gap": "md",
          "className": "text-center p-6",
          "children": [
            {
              "type": "box",
              "className": "w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center",
              "children": [
                {
                  "type": "text",
                  "text": "⚡",
                  "size": "2xl"
                }
              ]
            },
            {
              "type": "heading",
              "level": "h3",
              "content": "Lightning Fast",
              "size": "xl",
              "weight": "semibold"
            },
            {
              "type": "text",
              "text": "Build and modify UIs at incredible speed with our JSON specification system",
              "align": "center",
              "variant": "muted"
            }
          ]
        },
        {
          "type": "flex",
          "direction": "column",
          "align": "center",
          "gap": "md",
          "className": "text-center p-6",
          "children": [
            {
              "type": "box",
              "className": "w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center",
              "children": [
                {
                  "type": "text",
                  "text": "🎨",
                  "size": "2xl"
                }
              ]
            },
            {
              "type": "heading",
              "level": "h3",
              "content": "Beautiful Design",
              "size": "xl",
              "weight": "semibold"
            },
            {
              "type": "text",
              "text": "Create stunning interfaces with our pre-built components and theming system",
              "align": "center",
              "variant": "muted"
            }
          ]
        },
        {
          "type": "flex",
          "direction": "column",
          "align": "center",
          "gap": "md",
          "className": "text-center p-6",
          "children": [
            {
              "type": "box",
              "className": "w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center",
              "children": [
                {
                  "type": "text",
                  "text": "🔧",
                  "size": "2xl"
                }
              ]
            },
            {
              "type": "heading",
              "level": "h3",
              "content": "Type Safe",
              "size": "xl",
              "weight": "semibold"
            },
            {
              "type": "text",
              "text": "Full TypeScript support ensures your specifications are always valid",
              "align": "center",
              "variant": "muted"
            }
          ]
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference Section */}
          <section id="api-reference" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                API Reference
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50" />
              </h2>
            </div>

            <div className="prose prose-invert prose-emerald max-w-none">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">render() Function</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                The main function for rendering JSON specifications into React components:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`import { render } from "@banja/react-jedi";

// Basic usage
const component = render(spec);

// With options
const component = render(spec, {
  theme: customTheme,
  handlers: eventHandlers,
  development: true
});`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                Component Specification Options
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                All components support these common properties:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`interface CommonProps {
  type: string;        // Component type (required)
  className?: string;  // Additional CSS classes
  id?: string;         // HTML id attribute
  style?: object;      // Inline styles
  data-*?: string;     // Data attributes
  children?: Array;    // Child components
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Theming Section */}
          <section id="theming" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Theming System
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-purple-500/50" />
              </h2>
            </div>

            <div className="prose prose-invert prose-purple max-w-none">
              <p className="text-xl text-zinc-300 mb-6">
                React Jedi&apos;s theming system provides a powerful, flexible way to customize the
                appearance of your applications. Build beautifully themed interfaces that match any
                brand identity with our comprehensive design token system.
              </p>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">
                      Theme Architecture
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      Our theming system is built on design tokens, CSS variables, and a cascading
                      hierarchy that ensures consistency across your application.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Design tokens for colors, typography, spacing, and more</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>CSS variable generation for runtime theming</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Theme inheritance and composition</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Responsive design systems</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Key Features</h3>
                    <p className="text-zinc-400 mb-4">
                      The theming system provides powerful features for creating consistent,
                      beautiful interfaces.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Light/dark mode with automatic detection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Brand preset system for quick styling</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Component-level style overrides</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>Fluid typography and responsive spacing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Theme Provider</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Wrap your application with the ThemeProvider to enable theming:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`import { ThemeProvider } from "@banja/react-jedi";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Theme Structure</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Themes are structured JSON objects with comprehensive design tokens:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`const customTheme = {
  colors: {
    primary: {
      50: "#f0f9ff",
      // ... 100-900 shades
      DEFAULT: "#3b82f6",
      foreground: "#ffffff"
    },
    secondary: { /* ... */ },
    accent: { /* ... */ },
    // Semantic colors
    success: { /* ... */ },
    warning: { /* ... */ },
    error: { /* ... */ },
    info: { /* ... */ }
  },
  typography: {
    fonts: {
      sans: "Inter, system-ui, sans-serif",
      serif: "Georgia, serif",
      mono: "JetBrains Mono, monospace"
    },
    sizes: {
      xs: { fontSize: "0.75rem", lineHeight: "1rem" },
      sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
      base: { fontSize: "1rem", lineHeight: "1.5rem" },
      lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
      // ... xl, 2xl, 3xl, etc.
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    scale: {
      xs: "0.5rem",
      sm: "0.75rem",
      base: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      // ... 2xl, 3xl, etc.
    },
    container: {
      padding: {
        default: "1rem",
        sm: "1.5rem",
        lg: "2rem"
      }
    }
  },
  radii: {
    none: "0",
    sm: "0.25rem",
    base: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
};`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Color System</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                The color system supports comprehensive palettes with automatic shade generation:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Primary Colors</h4>
                    <p className="text-zinc-400 mb-4">
                      Define your brand&apos;s primary color palette with automatic shade
                      generation.
                    </p>
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap text-sm">
                          {`primary: {
  50: "#f0f9ff",
  100: "#e0f2fe",
  // ... 200-800
  900: "#1e3a8a",
  DEFAULT: "#3b82f6",
  foreground: "#ffffff"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Semantic Colors</h4>
                    <p className="text-zinc-400 mb-4">
                      Use semantic colors for consistent messaging across your app.
                    </p>
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap text-sm">
                          {`success: {
  DEFAULT: "#22c55e",
  foreground: "#ffffff"
},
error: {
  DEFAULT: "#ef4444",
  foreground: "#ffffff"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Color Modes</h4>
                    <p className="text-zinc-400 mb-4">
                      Support for light and dark modes with automatic system detection.
                    </p>
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap text-sm">
                          {`modes: {
  light: {
    background: "#ffffff",
    foreground: "#000000"
  },
  dark: {
    background: "#000000",
    foreground: "#ffffff"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Typography System</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Create beautiful, readable text with our comprehensive typography system:
              </p>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group mb-8">
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-3 text-purple-400">Fluid Typography</h4>
                  <p className="text-zinc-400 mb-4">
                    Typography scales smoothly between breakpoints for optimal readability.
                  </p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-sm">
                        {`typography: {
  fluid: {
    enabled: true,
    minScale: 1.067,  // Minor third
    maxScale: 1.250,  // Major third
    minViewport: 320,
    maxViewport: 1200
  },
  sizes: {
    base: {
      min: "16px",
      preferred: "clamp(16px, calc(1rem + 0.5vw), 18px)",
      max: "18px"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Spacing System</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                A harmonious spacing system ensures consistent layouts:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Spacing Scale</h4>
                    <p className="text-zinc-400 mb-4">
                      Use consistent spacing values throughout your application.
                    </p>
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap text-sm">
                          {`spacing: {
  base: 8, // Base unit in pixels
  scale: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem",  // 8px
    3: "0.75rem", // 12px
    4: "1rem",    // 16px
    // ... continue scale
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">
                      Responsive Spacing
                    </h4>
                    <p className="text-zinc-400 mb-4">
                      Spacing adapts to different screen sizes automatically.
                    </p>
                    <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap text-sm">
                          {`responsive: {
  spacing: {
    sm: { scale: 0.875 },
    md: { scale: 1 },
    lg: { scale: 1.125 },
    xl: { scale: 1.25 }
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Component Style Overrides
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Override component styles at the theme level for global consistency:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`const theme = {
  components: {
    button: {
      base: {
        borderRadius: "theme.radii.lg",
        fontWeight: "theme.typography.weights.medium",
        transition: "all 0.2s ease"
      },
      variants: {
        primary: {
          background: "theme.colors.primary.DEFAULT",
          color: "theme.colors.primary.foreground",
          "&:hover": {
            background: "theme.colors.primary.600"
          }
        },
        secondary: {
          background: "theme.colors.secondary.DEFAULT",
          color: "theme.colors.secondary.foreground"
        }
      },
      sizes: {
        sm: {
          padding: "theme.spacing.2 theme.spacing.4",
          fontSize: "theme.typography.sizes.sm"
        },
        md: {
          padding: "theme.spacing.3 theme.spacing.6",
          fontSize: "theme.typography.sizes.base"
        }
      }
    }
  }
};`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Using the Theme Hook</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Access theme values in your components with the useTheme hook:
              </p>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`import { useTheme } from "@banja/react-jedi";

function MyComponent() {
  const { theme, setTheme, colorMode, setColorMode } = useTheme();
  
  // Access theme values
  const primaryColor = theme.colors.primary.DEFAULT;
  const spacing = theme.spacing.scale.lg;
  
  // Toggle color mode
  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };
  
  return (
    <div style={{ 
      backgroundColor: primaryColor,
      padding: spacing 
    }}>
      <button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Brand Presets</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Quickly apply beautiful themes with our pre-built brand presets:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Modern Tech</h4>
                    <div className="h-32 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mb-4"></div>
                    <p className="text-zinc-400">
                      A sleek, modern theme perfect for tech startups and SaaS products.
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Elegant Business</h4>
                    <div className="h-32 rounded-lg bg-gradient-to-br from-slate-600 to-zinc-600 mb-4"></div>
                    <p className="text-zinc-400">
                      Professional and sophisticated for corporate websites.
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Creative Agency</h4>
                    <div className="h-32 rounded-lg bg-gradient-to-br from-pink-600 to-orange-600 mb-4"></div>
                    <p className="text-zinc-400">
                      Bold and vibrant for creative agencies and portfolios.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {`import { brandPresets } from "@banja/react-jedi";

// Use a pre-built brand preset
const modernTechTheme = brandPresets.modernTech;
const businessTheme = brandPresets.elegantBusiness;
const creativeTheme = brandPresets.creativeAgency;

// Or create your own based on a preset
const customTheme = {
  ...brandPresets.modernTech,
  colors: {
    ...brandPresets.modernTech.colors,
    primary: {
      ...brandPresets.modernTech.colors.primary,
      DEFAULT: "#ff6b6b"
    }
  }
};`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-400">Best Practices</h3>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">1.</span>
                    <span>
                      <strong>Use semantic color names</strong> - Name colors by their purpose
                      (primary, secondary, success) rather than their appearance (blue, green).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">2.</span>
                    <span>
                      <strong>Maintain consistency</strong> - Use your spacing scale and typography
                      system consistently throughout your application.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">3.</span>
                    <span>
                      <strong>Design for accessibility</strong> - Ensure color contrast ratios meet
                      WCAG guidelines, especially in dark mode.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">4.</span>
                    <span>
                      <strong>Test across modes</strong> - Always test your themes in both light and
                      dark modes.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">5.</span>
                    <span>
                      <strong>Use theme tokens</strong> - Reference theme values instead of
                      hard-coding colors and spacing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Performance Section */}
          <section id="performance" className="mb-20 scroll-mt-32">
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
                Performance Analysis
                <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-blue-500/50" />
              </h2>
            </div>

            <div className="prose prose-invert prose-blue max-w-none">
              <p className="text-xl text-zinc-300 mb-6">
                Understanding the performance characteristics of React Jedi&apos;s server-driven
                approach compared to traditional React development.
              </p>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  JSON vs Code Performance Comparison
                </h3>
                <p className="text-zinc-300 mb-4">
                  Our benchmarks show that React Jedi&apos;s JSON-based approach adds minimal
                  overhead while providing significant benefits:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2 text-green-400">Traditional React</h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>Direct component rendering</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>No parsing overhead</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">✗</span>
                        <span>Larger bundle sizes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">✗</span>
                        <span>Fixed at build time</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2 text-purple-400">
                      React Jedi (JSON)
                    </h4>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">✓</span>
                        <span>Smaller bundle sizes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">✓</span>
                        <span>Server-driven updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">✓</span>
                        <span>Dynamic theming</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 mr-2">±</span>
                        <span>Small parsing overhead</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-lg p-4">
                  <h5 className="font-semibold mb-2 text-blue-300">Benchmark Results</h5>
                  <p className="text-zinc-300">
                    In typical use cases, React Jedi adds{" "}
                    <strong>15-30% render time overhead</strong> compared to traditional React
                    components, which is negligible for most applications and outweighed by the
                    benefits of:
                  </p>
                  <ul className="mt-2 space-y-1 text-zinc-300">
                    <li>• Reduced bundle sizes (30-50% smaller)</li>
                    <li>• Dynamic content updates without deployment</li>
                    <li>• Consistent theming across all components</li>
                    <li>• Rapid prototyping and iteration</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Performance Best Practices
              </h3>

              <div className="space-y-4">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">
                    1. Optimize JSON Specifications
                  </h4>
                  <p className="text-zinc-300 mb-3">
                    Keep your JSON specifications lean and focused:
                  </p>
                  <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {`// ❌ Avoid deeply nested structures
{
  "type": "Container",
  "children": [{
    "type": "Box",
    "children": [{
      "type": "Flex",
      "children": [/* ... 10 levels deep */]
    }]
  }]
}

// ✅ Prefer flatter structures
{
  "type": "Container",
  "children": [
    { "type": "Heading", "content": "Title" },
    { "type": "Grid", "children": [/* items */] }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">
                    2. Component Memoization
                  </h4>
                  <p className="text-zinc-300 mb-3">
                    React Jedi automatically memoizes component rendering for optimal performance:
                  </p>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Components are only re-rendered when their JSON spec changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Theme changes trigger minimal re-renders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>State updates are localized to affected components</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">3. Lazy Loading</h4>
                  <p className="text-zinc-300 mb-3">Load complex components only when needed:</p>
                  <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {`{
  "type": "Conditional",
  "if": "state.showDetails",
  "then": {
    "type": "LazyComponent",
    "loader": "DetailedView",
    "fallback": {
      "type": "Skeleton",
      "className": "h-64"
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">
                    4. Bundle Size Optimization
                  </h4>
                  <p className="text-zinc-300 mb-3">
                    React Jedi significantly reduces bundle sizes:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
                      <h5 className="font-semibold mb-2 text-green-400">Traditional React App</h5>
                      <p className="text-zinc-400 text-sm">Bundle includes all component code</p>
                      <p className="text-xl font-bold text-green-400 mt-2">~250KB</p>
                    </div>
                    <div className="bg-black/50 border border-zinc-800 rounded-lg p-4">
                      <h5 className="font-semibold mb-2 text-purple-400">React Jedi App</h5>
                      <p className="text-zinc-400 text-sm">Bundle includes only core renderer</p>
                      <p className="text-xl font-bold text-purple-400 mt-2">~80KB</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-8 text-blue-400">
                When to Use React Jedi
              </h3>

              <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-800/30 rounded-lg p-6">
                <p className="text-zinc-300 mb-4">
                  React Jedi is ideal for applications that prioritize:
                </p>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span>
                      <strong>Dynamic content</strong> - Marketing sites, landing pages, and
                      content-driven apps
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span>
                      <strong>Rapid iteration</strong> - Prototypes and MVPs that need quick updates
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span>
                      <strong>Multi-tenant apps</strong> - SaaS platforms with customizable
                      interfaces
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span>
                      <strong>A/B testing</strong> - Easy experimentation with different layouts
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6 mt-6">
                <p className="text-zinc-300">
                  <strong className="text-blue-400">Bottom Line:</strong> The small performance
                  trade-off of React Jedi is more than compensated by its flexibility, smaller
                  bundle sizes, and development speed benefits. For most web applications, the ~20ms
                  difference in render time is imperceptible to users.
                </p>
              </div>
            </div>
          </section>

          {/* Coming Soon Section */}
          <section className="mb-20">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-blue-900/40" />
                <div className="absolute top-0 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
              </div>

              <div className="relative z-10 py-16 px-8 text-center">
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                  More Documentation Coming Soon
                </h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
                  We&apos;re working on comprehensive documentation that covers all components,
                  schema specifications, theming, animations, and advanced features. Stay tuned!
                </p>
                <a
                  href="https://github.com/banja-au/react-jedi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full text-white font-medium hover:from-zinc-700 hover:to-zinc-600 transition-all shadow-lg hover:shadow-zinc-900/20 group"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>Follow on GitHub</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
