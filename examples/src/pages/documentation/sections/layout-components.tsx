import { Link } from "react-router-dom";
import { usePageMetadata } from "../../../lib/meta";

export function LayoutComponentsPage() {
  usePageMetadata({
    title: "Layout Components",
    description: "React Jedi layout components documentation - Grid, Flex, Container, and more.",
  });
  return (
    <section id="layout-components" className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          Layout Components
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50 transition-colors" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Container</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              A centered, responsive container with configurable max-width and padding.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
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

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Box</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              A flexible, all-purpose container for building layouts.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
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

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Grid</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              A powerful grid layout system with responsive columns and gaps.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
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

        <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-900/50 transition duration-300 group transition-colors">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 transition-colors">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors"
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
              <h3 className="text-xl font-semibold transition-colors">Flex</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">
              A flexbox layout component for arranging items in a row or column.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
              <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm transition-colors">
                <pre className="whitespace-pre-wrap text-sm transition-colors">
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

      <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-800/30 rounded-xl p-6 mb-8 transition-colors">
        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Layout Tips
        </h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            Use{" "}
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              Container
            </span>{" "}
            for page-level content organization
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              Grid
            </span>{" "}
            works best for structured, multi-column layouts
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            Use{" "}
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              Flex
            </span>{" "}
            for aligning items along a single axis
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 transition-colors"></span>
            <span className="font-semibold text-zinc-900 dark:text-white transition-colors">
              Box
            </span>{" "}
            is perfect for creating card-like UI elements
          </li>
        </ul>
      </div>

      <div className="text-center transition-colors">
        <Link
          to="/showcase"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-zinc-900 dark:text-white font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-emerald-500/20 group transition-colors"
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
  );
}
