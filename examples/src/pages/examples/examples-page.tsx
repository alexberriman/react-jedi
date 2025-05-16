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
    description: "A modern landing page built with JSON specifications showcasing hero sections, feature grids, and testimonials.",
    path: "/examples/landing",
    status: "stable"
  },
  // More examples will be added here
];

export function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Examples
          </h1>
          <p className="text-xl text-zinc-300">
            Explore practical examples of React Jedi's server-driven UI in action.
            Each example demonstrates different features and patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Link
              key={example.id}
              to={example.path}
              className="group relative block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-black border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {example.title}
                  </h3>
                  {example.status && (
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${example.status === 'new' ? 'bg-green-500/20 text-green-400' : ''}
                      ${example.status === 'updated' ? 'bg-blue-500/20 text-blue-400' : ''}
                      ${example.status === 'stable' ? 'bg-zinc-500/20 text-zinc-400' : ''}
                    `}>
                      {example.status}
                    </span>
                  )}
                </div>
                <p className="text-zinc-400 mb-4">
                  {example.description}
                </p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span className="text-sm">View Example</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">More Examples Coming Soon</h2>
          <p className="text-zinc-400">
            We're continuously adding new examples to showcase different features and use cases.
            Check back regularly or contribute your own examples!
          </p>
        </div>
      </div>
    </div>
  );
}