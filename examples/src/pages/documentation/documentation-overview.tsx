import { Link } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";
import { cn } from "@/lib/utils";
import { CodeBlock } from "../../components/ui/code-block";

type DocSection = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
};

const sections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Installation, setup, and your first React Jedi component",
    href: "/documentation/getting-started",
    icon: (
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
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    color: "from-emerald-400 to-teal-400",
  },
  {
    id: "component-system",
    title: "Component System",
    description: "Understanding the JSON specification and component mapping",
    href: "/documentation/component-system",
    icon: (
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
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    color: "from-blue-400 to-indigo-400",
  },
  {
    id: "layout-components",
    title: "Layout Components",
    description: "Flex, Grid, Stack, and other layout primitives",
    href: "/documentation/layout-components",
    icon: (
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
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
    color: "from-purple-400 to-pink-400",
  },
  {
    id: "typography",
    title: "Typography",
    description: "Text, headings, and typography system",
    href: "/documentation/typography",
    icon: (
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
      >
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
    color: "from-orange-400 to-red-400",
  },
  {
    id: "ui-components",
    title: "UI Components",
    description: "Buttons, cards, modals, and interactive elements",
    href: "/documentation/ui-components",
    icon: (
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
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 12h18" />
        <path d="M12 3v18" />
      </svg>
    ),
    color: "from-cyan-400 to-blue-400",
  },
  {
    id: "form-components",
    title: "Form Components",
    description: "Inputs, selects, checkboxes, and form handling",
    href: "/documentation/form-components",
    icon: (
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
      >
        <rect width="18" height="4" x="3" y="14" rx="2" />
        <path d="M12 6h.01" />
        <path d="M17 6h.01" />
        <path d="M7 6h.01" />
      </svg>
    ),
    color: "from-green-400 to-emerald-400",
  },
  {
    id: "theming",
    title: "Theming",
    description: "Colors, spacing, dark mode, and custom themes",
    href: "/documentation/theming",
    icon: (
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
      >
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
        <path d="M19 11h2m-1 -1v2" />
      </svg>
    ),
    color: "from-violet-400 to-purple-400",
  },
  {
    id: "state-management",
    title: "State Management",
    description: "Server-driven state patterns and reactive updates",
    href: "/documentation/state-management",
    icon: (
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
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    ),
    color: "from-pink-400 to-rose-400",
  },
  {
    id: "complex-examples",
    title: "Complex Examples",
    description: "Advanced patterns and real-world examples",
    href: "/documentation/complex-examples",
    icon: (
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
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    color: "from-amber-400 to-orange-400",
  },
  {
    id: "performance",
    title: "Performance",
    description: "Optimization techniques and best practices",
    href: "/documentation/performance",
    icon: (
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
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "from-yellow-400 to-amber-400",
  },
];

const quickLinks = [
  {
    title: "Component Gallery",
    description: "Browse all available components",
    href: "/showcase",
  },
  {
    title: "Live Examples",
    description: "See React Jedi in action",
    href: "/examples",
  },
  {
    title: "Theme Playground",
    description: "Customize your theme",
    href: "/theming",
  },
  {
    title: "Performance Metrics",
    description: "View benchmarks and stats",
    href: "/performance",
  },
];

export function DocumentationOverview() {
  usePageMetadata({
    title: "Documentation",
    description:
      "React Jedi documentation - Learn how to build server-driven UIs with JSON specifications, TypeScript, and modern React components.",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              React Jedi Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Everything you need to build beautiful, server-driven interfaces with React Jedi's
              JSON-based approach. From getting started to advanced patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/documentation/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/showcase"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-all"
              >
                View Components
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Quick Start Example */}
          <div className="mb-20 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Quick Start
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get up and running with React Jedi in minutes. Install the package and render your first component:
            </p>
            
            <div className="space-y-4">
              <CodeBlock language="bash" title="Installation">
                {`npm install @banja/react-jedi`}
              </CodeBlock>
              
              <CodeBlock language="typescript" title="Basic Usage">
                {`import { render } from "@banja/react-jedi";

// JSON specification for your UI
const spec = {
  type: "container",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Welcome to React Jedi"
    },
    {
      type: "button",
      variant: "primary",
      content: "Get Started"
    }
  ]
};

// Render the UI
function App() {
  return render(spec);
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Documentation Sections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={section.href}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-2xl transition-opacity group-hover:opacity-20",
                      section.color
                    )}
                  />
                  <div className="relative">
                    <div
                      className={cn(
                        "inline-flex p-3 rounded-lg bg-gradient-to-br text-white mb-4",
                        section.color
                      )}
                    >
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {link.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Getting Help */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border border-blue-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Can't find what you're looking for? Here are some ways to get help:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/banja-au/react-jedi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
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
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                </svg>
                Report an Issue
              </a>
              <a
                href="https://github.com/banja-au/react-jedi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium"
              >
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
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}