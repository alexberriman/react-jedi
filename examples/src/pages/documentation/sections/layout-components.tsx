import { Link } from "react-router-dom";
import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function LayoutComponentsPage() {
  usePageMetadata({
    title: "Layout Components",
    description: "React Jedi layout components documentation - Grid, Flex, Container, and more.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-700 inline-block pr-8">
          Layout Components
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 transition duration-300 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A centered, responsive container with configurable max-width and padding.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <CodeBlock language="json" className="relative">
{`{
  "type": "container",
  "maxWidth": "xl",
  "padding": "md",
  "align": "center",
  "children": [
    // Container content
  ]
}`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 transition duration-300 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A flexible, all-purpose container for building layouts.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <CodeBlock language="json" className="relative">
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
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 transition duration-300 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A powerful grid layout system with responsive columns and gaps.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <CodeBlock language="json" className="relative">
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
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-900/50 transition duration-300 group">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-gray-100"
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A flexbox layout component for arranging items in a row or column.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <CodeBlock language="json" className="relative">
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
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900/30 to-gray-900/30 border border-gray-800/30 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Layout Tips
        </h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            Use{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              Container
            </span>{" "}
            for page-level content organization
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Grid
            </span>{" "}
            works best for structured, multi-column layouts
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            Use{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              Flex
            </span>{" "}
            for aligning items along a single axis
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Box
            </span>{" "}
            is perfect for creating card-like UI elements
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full text-zinc-900 dark:text-white font-medium hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-gray-500/20 group"
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
    </div>
  );
}
