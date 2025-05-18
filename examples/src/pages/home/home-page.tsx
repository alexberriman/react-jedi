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
    <div className="flex flex-col">
      {/* Hero Section - Full Width */}
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

      {/* Content Container */}
      <div className="container mx-auto px-4 flex flex-col gap-20 pb-20">
        
        {/* Features Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Core Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to build modern, scalable React applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Server-Driven UI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Define your UI with JSON specifications. Create dynamic layouts that can be updated
                without code changes.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600 dark:text-purple-400"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Component System
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pre-built, customizable components that follow best practices and accessibility
                standards.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600 dark:text-green-400"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Modern Architecture
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with TypeScript, React 19, and TailwindCSS. Fully typed and tree-shakeable.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <section>
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
                    <path d="m7.8 16.2-2.9 2.9"></path>
                    <path d="M6 12H2"></path>
                    <path d="m7.8 7.8-2.9-2.9"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Animations</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                New animation system with scroll-triggered effects, staggered animations, and smooth
                transitions.
              </p>
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
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Brand Presets
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Pre-configured theme presets for popular brands. Get started quickly with familiar
                design systems.
              </p>
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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Optimistic UI
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Built-in support for optimistic updates with automatic rollback on errors for better
                UX.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Getting Started
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start building in minutes with our comprehensive documentation and examples.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 border border-gray-200 dark:border-gray-800">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Install the Package
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Get started by installing React Jedi in your project.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-sm">
                      npm install @react-jedi/core
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Create Your Schema
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Define your UI structure using JSON specifications.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                      {`{
  "type": "Box",
  "props": { 
    "padding": 4,
    "className": "bg-white dark:bg-gray-900"
  },
  "children": [...]
}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Render Your UI
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Use the render function to create your interface.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                      {`import { render } from '@react-jedi/core';

const MyComponent = render(specification);`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/documentation/getting-started"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl text-center"
                >
                  View Documentation
                </Link>
                <Link
                  to="/examples"
                  className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg text-center"
                >
                  Explore Examples
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}