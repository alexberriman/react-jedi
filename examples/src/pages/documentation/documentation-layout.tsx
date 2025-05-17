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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-slate-900 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 mb-16">
            <div className="relative w-fit">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 mb-2 transition-colors">
                Documentation
              </h1>
              <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full blur-sm transition-colors" />
              <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full transition-colors" />
            </div>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl transition-colors">
              Learn how to build beautiful, server-driven interfaces with React Jedi&apos;s
              JSON-based approach.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-12 sticky top-[61px] bg-white dark:bg-black/30 backdrop-blur-md p-2 sm:p-3 -mx-3 rounded-xl border border-zinc-200 dark:border-zinc-800 z-20 overflow-x-auto transition-colors">
            {docSections.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  location.pathname === section.path
                    ? "bg-emerald-600/30 text-emerald-600 dark:text-emerald-400 border border-emerald-600/50"
                    : "bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:text-white"
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
