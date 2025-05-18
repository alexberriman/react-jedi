import { Link } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";
import { Heading, Text, spacing } from "../../components/ui";

export function HomePage() {
  usePageMetadata({
    title: "Home",
    description:
      "React Jedi - Build beautiful, dynamic interfaces with JSON specifications. Server-driven UI library with modern components, TypeScript support, and comprehensive theming.",
  });
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute -top-96 -left-96 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-96 -right-96 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 opacity-40 blur-3xl"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Server-Driven UI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                for React
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Build beautiful, dynamic interfaces with JSON specifications. Leverage the power of
              React, TailwindCSS, and modern component architecture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/showcase"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <span className="relative z-10">View Components</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
              </Link>
              <Link
                to="/examples"
                className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Browse Examples
              </Link>
              <Link
                to="/documentation"
                className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Read Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Core Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to build modern, responsive applications with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
                  <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
                </svg>
              ),
              gradient: "from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
              iconBg: "bg-blue-100 dark:bg-blue-900",
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
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              ),
              gradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
              iconBg: "bg-purple-100 dark:bg-purple-900",
            },
            {
              title: "Modern Components",
              description:
                "Beautiful UI components with 2025 design aesthetic that's clean, modern, and sophisticated.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              ),
              gradient: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
              iconBg: "bg-green-100 dark:bg-green-900",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className={`${feature.iconBg} rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What's New
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay up to date with the latest features and improvements.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
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
                  className="text-purple-600 dark:text-purple-400"
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Interactive Components
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Milestone 3 is complete! Explore our new showcase featuring form components, toggles,
              sliders, and collapsible sections with full state management.
            </p>
            <Link
              to="/showcase/interactive"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors flex items-center gap-2"
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

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
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
                  className="text-green-600 dark:text-green-400"
                >
                  <path d="M12 12h8"></path>
                  <path d="M12 6h8"></path>
                  <path d="M12 18h8"></path>
                  <path d="m8 8-4 4 4 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Performance Benchmarks
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Comprehensive performance benchmarks added for all components. Run benchmarks to
              measure rendering speed and optimize your applications.
            </p>
            <Link
              to="/performance"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors flex items-center gap-2"
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

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
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
                  className="text-blue-600 dark:text-blue-400"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Marketing Template
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              New full marketing website template! A complete multi-page site showcasing modern
              design and complex layouts, all driven by JSON.
            </p>
            <Link
              to="/templates/marketing"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors flex items-center gap-2"
            >
              View Marketing Template
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
      <section className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-48 -left-48 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Ready to Build with React Jedi?
            </h2>
            <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Start creating stunning interfaces with minimal code and maximum flexibility.
            </p>
            <Link
              to="/documentation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
    </div>
  );
}