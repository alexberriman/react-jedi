import { Link } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";
import { Text, spacing } from "../../components/ui";
import { PageHeader } from "../../components/ui/page-header";
import { useState } from "react";

interface Example {
  id: string;
  title: string;
  description: string;
  path: string;
  status?: "new" | "updated" | "stable";
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const categories: Category[] = [
  {
    id: "all",
    name: "All Examples",
    description: "View all available examples",
    icon: "M4 6h16M4 12h16M4 18h16",
  },
  {
    id: "animations",
    name: "Animations",
    description: "Motion and interaction patterns",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "data",
    name: "Data & State",
    description: "Data fetching, display, and state management",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    id: "seo",
    name: "SEO & Metadata",
    description: "Search optimization and structured data",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    id: "ui-patterns",
    name: "UI Patterns",
    description: "Common UI patterns and components",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    id: "accessibility",
    name: "Accessibility",
    description: "Inclusive design patterns",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
];

const examples: Example[] = [
  {
    id: "conditional-rendering",
    title: "Conditional Rendering",
    description:
      "Interactive demo showing conditional visibility and dynamic properties based on state, user roles, and themes.",
    path: "/examples/conditional",
    status: "stable",
    category: "ui-patterns",
  },
  {
    id: "conditional-advanced",
    title: "Advanced Conditional Rendering",
    description:
      "Comprehensive demo with multiple states, complex conditions, nested logic, and real-world UI patterns.",
    path: "/examples/conditional-advanced",
    status: "new",
    category: "ui-patterns",
  },
  {
    id: "data-display",
    title: "Data Display & Visualization",
    description:
      "Modern data tables and charts with stunning 2025 design. Features sorting, filtering, and beautiful visualizations.",
    path: "/examples/data-display",
    status: "new",
    category: "data",
  },
  {
    id: "transitions",
    title: "Page Transitions & Smooth Scroll",
    description:
      "Smooth page transitions with Framer Motion and animated scrolling. Features section navigation and scroll progress indicators.",
    path: "/examples/transitions",
    status: "new",
    category: "animations",
  },
  {
    id: "click-animations",
    title: "Click Animations",
    description:
      "Interactive click animations with multiple presets and customization options. Features bounce, press, jelly, and more effects.",
    path: "/examples/click-animations",
    status: "new",
    category: "animations",
  },
  {
    id: "drag-animations",
    title: "Drag Animations",
    description:
      "Interactive drag animations with physics-based motion, constraints, and multiple presets. Features draggable cards and list items.",
    path: "/examples/drag-animations",
    status: "new",
    category: "animations",
  },
  {
    id: "scroll-animations",
    title: "Scroll Animations",
    description:
      "Beautiful scroll-triggered animations with parallax effects, staggered reveals, and progress indicators. Perfect for modern websites.",
    path: "/examples/scroll-animations",
    status: "new",
    category: "animations",
  },
  {
    id: "stagger-animations",
    title: "Staggered Animations",
    description:
      "Complex staggered animations for lists and groups with customizable orchestration, timing, and paths. Create eye-catching UI elements.",
    path: "/examples/stagger-animations",
    status: "new",
    category: "animations",
  },
  {
    id: "animation-sequence",
    title: "Animation Sequences",
    description:
      "Chain multiple animations together with precise timing control. Create complex multi-step animations with loops, callbacks, and dynamic sequencing.",
    path: "/examples/animation-sequence",
    status: "new",
    category: "animations",
  },
  {
    id: "data-fetching",
    title: "Data Fetching & Binding",
    description:
      "Fetch data from REST APIs, GraphQL, and other sources with automatic binding to components. Features caching, polling, and loading states.",
    path: "/examples/data-fetching",
    status: "new",
    category: "data",
  },
  {
    id: "optimistic-updates",
    title: "Optimistic Updates",
    description:
      "Experience instant UI feedback with optimistic updates. Updates appear immediately while syncing with the server in the background, with automatic rollback on errors.",
    path: "/examples/optimistic-updates",
    status: "new",
    category: "data",
  },
  {
    id: "seo-metadata",
    title: "SEO & Metadata Management",
    description:
      "Manage page titles, meta descriptions, Open Graph tags, Twitter Cards, and favicons. Complete SEO solution for server-driven UI applications.",
    path: "/examples/seo-metadata",
    status: "new",
    category: "seo",
  },
  {
    id: "structured-data",
    title: "Structured Data (JSON-LD)",
    description:
      "Implement schema.org markup for rich snippets in search results. Support for Organization, Article, Product, FAQ, and other schemas.",
    path: "/examples/structured-data",
    status: "new",
    category: "seo",
  },
  {
    id: "rich-snippets",
    title: "Rich Snippets",
    description:
      "Enhanced search results with structured data for products, articles, FAQs, events, and more using React Jedi's rich snippet utilities.",
    path: "/examples/rich-snippets",
    status: "new",
    category: "seo",
  },
  {
    id: "focus-management",
    title: "Focus Management & Accessibility",
    description:
      "Advanced focus management patterns including focus trap, focus return, keyboard navigation, and skip links for accessible user interfaces.",
    path: "/examples/focus-management",
    status: "new",
    category: "accessibility",
  },
  // More examples will be added here
];

export function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  usePageMetadata({
    title: "Examples",
    description:
      "React Jedi examples - Explore real-world implementations including landing pages, forms, navigation, and interactive components.",
  });

  const filteredExamples = selectedCategory === "all" 
    ? examples 
    : examples.filter(example => example.category === selectedCategory);

  const getExampleCount = (categoryId: string) => {
    if (categoryId === "all") return examples.length;
    return examples.filter(example => example.category === categoryId).length;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Examples"
        description="Explore practical examples of React Jedi's server-driven UI in action. Each example demonstrates different features and patterns."
      />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                Categories
              </h2>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const count = getExampleCount(category.id);
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        w-full group flex items-center justify-between px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${isActive 
                          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-sm" 
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className={`w-5 h-5 transition-colors ${
                            isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={category.icon}
                          />
                        </svg>
                        <div className="text-left">
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {category.description}
                          </div>
                        </div>
                      </div>
                      <span className={`
                        text-xs font-medium px-2 py-1 rounded-full
                        ${isActive 
                          ? "bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-200" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }
                      `}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Examples List */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredExamples.length} example{filteredExamples.length === 1 ? '' : 's'} available
              </p>
            </div>

            <div className="space-y-4">
              {filteredExamples.map((example, index) => (
                <Link 
                  key={example.id} 
                  to={example.path} 
                  className="group block"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.5s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  <div className="
                    bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-lg p-6
                    hover:border-purple-300 dark:hover:border-purple-700 
                    hover:shadow-md dark:hover:shadow-purple-900/20
                    transition-all duration-200
                    relative overflow-hidden
                  ">
                    {/* Hover gradient effect */}
                    <div className="
                      absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    " />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {example.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {example.status && (
                            <span className={`
                              px-2.5 py-1 text-xs font-medium rounded-full
                              ${example.status === "new" 
                                ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-sm" 
                                : example.status === "updated" 
                                ? "bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-sm" 
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                              }
                            `}>
                              {example.status}
                            </span>
                          )}
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all"
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
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {example.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
