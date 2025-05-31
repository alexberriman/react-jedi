import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { usePageMetadata } from "../../lib/meta";
import { Menu, X } from "lucide-react";

const docSections = [
  { id: "getting-started", label: "Getting Started", path: "/documentation/getting-started" },
  { id: "component-system", label: "Component System", path: "/documentation/component-system" },
  { id: "layout-components", label: "Layout Components", path: "/documentation/layout-components" },
  { id: "typography", label: "Typography", path: "/documentation/typography" },
  { id: "ui-components", label: "UI Components", path: "/documentation/ui-components" },
  { id: "form-components", label: "Form Components", path: "/documentation/form-components" },
  { id: "theming", label: "Theming", path: "/documentation/theming" },
  { id: "state-management", label: "State Management", path: "/documentation/state-management" },
  { id: "complex-examples", label: "Complex Examples", path: "/documentation/complex-examples" },
  { id: "performance", label: "Performance", path: "/documentation/performance" },
];

export function DocumentationLayout() {
  usePageMetadata({
    title: "Documentation",
    description:
      "React Jedi documentation - Learn how to build server-driven UIs with JSON specifications.",
  });

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="space-y-2 mb-8 lg:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              Learn how to build beautiful, server-driven interfaces with React Jedi&apos;s
              JSON-based approach.
            </p>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mb-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <aside className={`
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0
              fixed lg:sticky top-24 left-0 z-40
              w-64 h-[calc(100vh-8rem)]
              bg-white dark:bg-gray-900 lg:bg-transparent
              border-r border-gray-200 dark:border-gray-800 lg:border-0
              transition-transform duration-200 ease-in-out
              lg:block
              overflow-y-auto
            `}>
              {/* Mobile overlay */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden z-30"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              
              <nav className="relative z-40 bg-white dark:bg-gray-900 lg:bg-transparent p-4 lg:p-0">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
                  Contents
                </h2>
                <ul className="space-y-1">
                  {docSections.map((section) => {
                    const isActive = location.pathname === section.path;
                    return (
                      <li key={section.id}>
                        <Link
                          to={section.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            block px-3 py-2 rounded-md text-sm transition-all
                            ${isActive
                              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }
                          `}
                        >
                          {section.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 max-w-4xl">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
