import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-transparent pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Server-Driven UI for React
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-10">
              Build beautiful, dynamic interfaces with JSON specifications. Leverage the power of
              React, TailwindCSS, and ShadCN components.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/showcase"
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-md font-medium text-white transition-colors"
              >
                View Components
              </Link>
              <Link
                to="/examples"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-white transition-colors"
              >
                Browse Examples
              </Link>
              <Link
                to="/documentation"
                className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-md font-medium text-white transition-colors"
              >
                Read Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "JSON-Driven UI",
              description:
                "Define your entire UI with clean, typed JSON specifications that are easy to validate and store.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-emerald-400"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
                  <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
                </svg>
              ),
            },
            {
              title: "Type Safety",
              description:
                "Built from the ground up with TypeScript for complete type safety and developer confidence.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-emerald-400"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              ),
            },
            {
              title: "Modern Components",
              description:
                "Leverages ShadCN UI and custom components with a 2025 design aesthetic that's sexy as fuck.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-emerald-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
            >
              <div className="bg-zinc-900 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What&apos;s New</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                >
                  <path d="M12 2v4"></path>
                  <path d="m16.2 7.8 2.9-2.9"></path>
                  <path d="M18 12h4"></path>
                  <path d="m16.2 16.2 2.9 2.9"></path>
                  <path d="M12 18v4"></path>
                  <path d="m4.9 19.1 2.9-2.9"></path>
                  <path d="M2 12h4"></path>
                  <path d="m4.9 4.9 2.9 2.9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Interactive Components</h3>
            </div>
            <p className="text-zinc-300 mb-4">
              Milestone 3 is complete! Explore our new showcase featuring form components, toggles,
              sliders, and collapsible sections with full state management.
            </p>
            <Link
              to="/showcase/interactive"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
            >
              View Interactive Showcase
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <path d="M12 12h8"></path>
                  <path d="M12 6h8"></path>
                  <path d="M12 18h8"></path>
                  <path d="m8 8-4 4 4 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Performance Benchmarks</h3>
            </div>
            <p className="text-zinc-300 mb-4">
              Comprehensive performance benchmarks added for all components. Run benchmarks to
              measure rendering speed and optimize your applications.
            </p>
            <Link
              to="/performance"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
            >
              View Performance Metrics
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 border border-emerald-700/30 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build with React Jedi?</h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Start creating stunning interfaces with minimal code and maximum flexibility.
          </p>
          <Link
            to="/documentation"
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-md font-medium text-white transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
