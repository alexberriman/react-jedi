import { Link, Outlet, useLocation } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              Learn how to build beautiful, server-driven interfaces with React Jedi&apos;s
              JSON-based approach.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-12 sticky top-16 bg-white dark:bg-gray-900 backdrop-blur-md p-2 sm:p-3 -mx-3 rounded-xl border border-zinc-200 dark:border-zinc-800 z-20 overflow-x-auto transition-colors shadow-sm">
            {docSections.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  location.pathname === section.path
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {section.label}
              </Link>
            ))}
          </div>

          {/* Page content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
