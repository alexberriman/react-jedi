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
              Learn how to build beautiful, server-driven interfaces with React Jedi's JSON-based approach.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 sticky top-[61px] bg-black/30 backdrop-blur-md p-3 -mx-3 rounded-xl border border-zinc-800 z-20">
            <a href="#getting-started" className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm">
              Getting Started
            </a>
            <a href="#component-system" className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm">
              Component System
            </a>
            <a href="#layout-components" className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm">
              Layout Components
            </a>
            <a href="#typography" className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm">
              Typography
            </a>
            <a href="#ui-components" className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm">
              UI Components
            </a>
            <a href="#form-components" className="px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all text-sm">
              Form Components
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
                The library's core function is <code className="bg-zinc-800/70 px-1.5 py-0.5 rounded text-sm">render()</code>, which takes a specification object and renders it to React components.
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
  return render({ spec });
}`}
                  </pre>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Project Structure</h3>
              <p className="text-zinc-300 leading-relaxed mb-4">
                React Jedi is designed to be integrated with any React project. 
                Here's a recommended project structure for using React Jedi:
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
                React Jedi's component system is built around a simple, consistent pattern. 
                Each component in a JSON specification has a <code className="bg-zinc-800/70 px-1.5 py-0.5 rounded text-sm">type</code> property that identifies 
                the component, and additional properties specific to that component.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Specification Structure</h3>
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
                React Jedi components support several common properties in addition to their specific properties:
              </p>

              <ul className="space-y-2 mb-6 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">className</span> - Additional CSS classes to apply to the component
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">id</span> - HTML id attribute for the component
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">data-*</span> - Custom data attributes
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">style</span> - Inline styles (object format)
                </li>
              </ul>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Container</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">A centered, responsive container with configurable max-width and padding.</p>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Box</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">A flexible, all-purpose container for building layouts.</p>
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
  "children": [
    // Box content
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Grid</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">A powerful grid layout system with responsive columns and gaps.</p>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Flex</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">A flexbox layout component for arranging items in a row or column.</p>
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
                  Use <span className="font-semibold text-white">Container</span> for page-level content organization
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Grid</span> works best for structured, multi-column layouts
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  Use <span className="font-semibold text-white">Flex</span> for aligning items along a single axis
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Box</span> is perfect for creating card-like UI elements
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link to="/showcase" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group">
                <span>View Layout Components Showcase</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Heading</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Headings from h1 to h6 with customizable styling options.</p>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Text</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Paragraphs and text spans with rich styling options.</p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-sm">
{`{
  "type": "text",
  "text": "This is styled paragraph text.",
  "element": "p",
  "size": "lg",
  "weight": "medium",
  "variant": "primary",
  "gradient": "ocean"
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">BlockQuote</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Stylized blockquotes for testimonials and citations.</p>
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
                  <span className="font-semibold text-white">Gradients</span> - Apply beautiful text gradients
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Transformations</span> - Uppercase, lowercase, capitalize
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Animations</span> - Glow, pulse, shimmer effects
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Truncation</span> - Single and multi-line text truncation
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link to="/showcase" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group">
                <span>View Typography Showcase</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Button</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Versatile button component with multiple variants and sizes.</p>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Card</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Container for grouping related content with optional header and footer.</p>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Badge</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Small status indicators with various styling options.</p>
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-sm">
{`{
  "type": "badge",
  "text": "New",
  "variant": "default",
  "size": "default"
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Avatar</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Display user profile images with fallback initials.</p>
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
              <Link to="/showcase" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group">
                <span>View UI Components Showcase</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Input</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Text input field with support for various input types.</p>
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
                      <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Label</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">Form label component with accessibility features.</p>
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
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Form Component Features</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Input Groups</span> - Group inputs with prefixes and suffixes
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Validation States</span> - Built-in support for form validation
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Accessibility</span> - ARIA attributes and keyboard navigation
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-white">Responsive Design</span> - Mobile-friendly form components
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link to="/showcase" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group">
                <span>View Form Components Showcase</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
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
                  Full Documentation Coming Soon
                </h2>
                <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
                  We're working on comprehensive documentation that covers all components, 
                  schema specifications, theming, and advanced features. Stay tuned for more!
                </p>
                <a 
                  href="https://github.com/banja-au/react-jedi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full text-white font-medium hover:from-zinc-700 hover:to-zinc-600 transition-all shadow-lg hover:shadow-zinc-900/20 group"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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