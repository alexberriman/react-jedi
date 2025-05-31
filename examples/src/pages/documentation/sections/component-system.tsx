import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";
import { PrevNextNavigation } from "../../../components/documentation";
import { getDocumentationNavigation } from "../../../lib/documentation-navigation";
import { useLocation } from "react-router-dom";

export function ComponentSystemPage() {
  usePageMetadata({
    title: "Component System",
    description:
      "React Jedi component system - Understanding JSON specifications and component mapping.",
  });
  
  const location = useLocation();
  const { prev, next } = getDocumentationNavigation(location.pathname);
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Component System
      </h2>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          React Jedi&apos;s component system is built around a simple, consistent pattern. Each
          component in a JSON specification has a{" "}
          <code className="bg-gray-100 dark:bg-gray-800/70 px-1.5 py-0.5 rounded text-sm">
            type
          </code>{" "}
          property that identifies the component, and additional properties specific to that
          component.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Specification Structure
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Every component specification follows this general structure:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
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

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Component Properties
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          React Jedi components support several common properties in addition to their specific
          properties:
        </p>

        <ul className="space-y-2 mb-6 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              className
            </span>{" "}
            - Additional CSS classes to apply to the component
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              id
            </span>{" "}
            - HTML id attribute for the component
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              data-*
            </span>{" "}
            - Custom data attributes
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              style
            </span>{" "}
            - Inline styles (object format)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Complete Example
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Here&apos;s a more comprehensive example using multiple components together:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
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
          "className": "hover:shadow-lg transition-all",
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
          "className": "hover:shadow-lg transition-all",
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
          "className": "hover:shadow-lg transition-all",
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
      
      <PrevNextNavigation prev={prev} next={next} />
    </div>
  );
}
