import { Link } from "react-router-dom";

interface Example {
  id: string;
  title: string;
  description: string;
  path: string;
  status?: "new" | "updated" | "stable";
}

const examples: Example[] = [
  {
    id: "landing",
    title: "Landing Page",
    description:
      "A modern landing page built with JSON specifications showcasing hero sections, feature grids, and testimonials.",
    path: "/examples/landing",
    status: "stable",
  },
  {
    id: "conditional-rendering",
    title: "Conditional Rendering",
    description:
      "Interactive demo showing conditional visibility and dynamic properties based on state, user roles, and themes.",
    path: "/examples/conditional",
    status: "stable",
  },
  {
    id: "conditional-advanced",
    title: "Advanced Conditional Rendering",
    description:
      "Comprehensive demo with multiple states, complex conditions, nested logic, and real-world UI patterns.",
    path: "/examples/conditional-advanced",
    status: "new",
  },
  {
    id: "form-validation",
    title: "Form Validation",
    description:
      "Comprehensive form validation examples with error states, different field types, and complex validation rules.",
    path: "/examples/form-validation",
    status: "new",
  },
  {
    id: "navigation",
    title: "Navigation Components",
    description:
      "Navigation components including breadcrumbs with different styles, separators, and configurations.",
    path: "/examples/navigation",
    status: "new",
  },
  {
    id: "data-display",
    title: "Data Display & Visualization",
    description:
      "Modern data tables and charts with stunning 2025 design. Features sorting, filtering, and beautiful visualizations.",
    path: "/examples/data-display",
    status: "new",
  },
  // More examples will be added here
];

export function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Examples
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300">
            Explore practical examples of React Jedi&apos;s server-driven UI in action. Each example
            demonstrates different features and patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {examples.map((example) => (
            <Link key={example.id} to={example.path} className="group relative block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-black border border-zinc-800 rounded-lg p-4 sm:p-6 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {example.title}
                  </h3>
                  {example.status && (
                    <span
                      className={`
                      px-2 py-1 text-xs rounded-full
                      ${example.status === "new" ? "bg-green-500/20 text-green-400" : ""}
                      ${example.status === "updated" ? "bg-blue-500/20 text-blue-400" : ""}
                      ${example.status === "stable" ? "bg-zinc-500/20 text-zinc-400" : ""}
                    `}
                    >
                      {example.status}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-zinc-400 mb-4">{example.description}</p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span className="text-sm">View Example</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">Advanced Example Ideas</h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-4">
            Ready to build more complex applications? Try these advanced patterns:
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base text-zinc-400 space-y-2">
            <li>Real-time dashboards with WebSocket-driven state updates</li>
            <li>E-commerce product catalog with filtering and search</li>
            <li>Content management system with drag-and-drop page builder</li>
            <li>Multi-step wizards with progress tracking and validation</li>
            <li>Dynamic forms with conditional fields and branching logic</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
