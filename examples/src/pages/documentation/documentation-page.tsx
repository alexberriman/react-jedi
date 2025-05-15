export function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        <p className="text-xl text-zinc-300 mb-12">
          Learn how to use React Jedi to build beautiful, server-driven interfaces with JSON specifications.
        </p>

        {/* Getting Started Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-700">Getting Started</h2>
          <div className="prose prose-invert prose-emerald max-w-none">
            <h3>Installation</h3>
            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono mb-6">
              <code>npm install @banja/react-jedi</code>
            </div>

            <h3>Basic Usage</h3>
            <p>
              React Jedi uses JSON specifications to define UI components and their properties.
              Here's a simple example of rendering a component:
            </p>

            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono mb-6 text-sm">
              <pre className="whitespace-pre-wrap">
{`import { render } from "@banja/react-jedi";

// JSON specification for a simple UI
const spec = {
  type: "container",
  children: [
    {
      type: "heading",
      props: {
        level: 1,
        children: "Hello, React Jedi!"
      }
    },
    {
      type: "text",
      props: {
        children: "Building UIs with JSON specifications."
      }
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
        </div>

        {/* Component Schema Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-700">Component Schema Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Button Component",
                schema: `{
  "type": "button",
  "props": {
    "variant": "default",
    "size": "default",
    "children": "Click Me"
  }
}`
              },
              {
                title: "Card Component",
                schema: `{
  "type": "card",
  "children": [
    {
      "type": "heading",
      "props": {
        "level": 3,
        "children": "Card Title"
      }
    },
    {
      "type": "text",
      "props": {
        "children": "Card content goes here."
      }
    }
  ]
}`
              },
              {
                title: "Grid Layout",
                schema: `{
  "type": "grid",
  "props": {
    "columns": { "sm": 1, "md": 2, "lg": 3 },
    "gap": 4
  },
  "children": [
    { "type": "box", "props": { "children": "Item 1" } },
    { "type": "box", "props": { "children": "Item 2" } },
    { "type": "box", "props": { "children": "Item 3" } }
  ]
}`
              },
              {
                title: "Image Component",
                schema: `{
  "type": "image",
  "props": {
    "src": "https://example.com/image.jpg",
    "alt": "Example image",
    "width": 800,
    "height": 600,
    "objectFit": "cover"
  }
}`
              }
            ].map((example, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-3">{example.title}</h3>
                <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{example.schema}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More Documentation Coming Soon */}
        <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-700/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Full Documentation Coming Soon</h2>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            We're working on comprehensive documentation that will cover all components, 
            schema specifications, theming, and advanced features. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}