import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function ComponentSystemPage() {
  usePageMetadata({
    title: "Component System",
    description:
      "React Jedi component system - Understanding JSON specifications and component mapping.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          Component System
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50 transition-colors" />
        </h2>
      </div>
      <div className="prose prose-emerald dark:prose-invert max-w-none">
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 transition-colors">
          React Jedi&apos;s component system is built around a simple, consistent pattern. Each
          component in a JSON specification has a{" "}
          <code className="bg-zinc-100 dark:bg-zinc-800/70 px-1.5 py-0.5 rounded text-sm transition-colors">
            type
          </code>{" "}
          property that identifies the component, and additional properties specific to that
          component.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Specification Structure
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Every component specification follows this general structure:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <CodeBlock language="json" className="relative mb-6 transition-colors">
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
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Component Properties
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          React Jedi components support several common properties in addition to their specific
          properties:
        </p>

        <ul className="space-y-2 mb-6 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              className
            </span>{" "}
            - Additional CSS classes to apply to the component
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              id
            </span>{" "}
            - HTML id attribute for the component
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              data-*
            </span>{" "}
            - Custom data attributes
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              style
            </span>{" "}
            - Inline styles (object format)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Complete Example
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Here&apos;s a more comprehensive example using multiple components together:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <CodeBlock language="json" className="relative mb-6 transition-colors">
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
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
