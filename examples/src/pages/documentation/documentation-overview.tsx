import { Link } from "react-router-dom";

export function DocumentationOverview() {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics of React Jedi and how to create your first component",
      link: "/documentation/getting-started",
      icon: "🚀",
    },
    {
      title: "Component System",
      description: "Understand the JSON specification format and component structure",
      link: "/documentation/component-system",
      icon: "🎯",
    },
    {
      title: "Layout Components",
      description: "Master the layout system with Grid, Flex, and other layout primitives",
      link: "/documentation/layout-components",
      icon: "📐",
    },
    {
      title: "Typography",
      description: "Typography components for headings, text, and more",
      link: "/documentation/typography",
      icon: "✍️",
    },
    {
      title: "UI Components",
      description: "Explore the full range of UI components available",
      link: "/documentation/ui-components",
      icon: "🎨",
    },
    {
      title: "Form Components",
      description: "Build interactive forms with inputs, selects, and validation",
      link: "/documentation/form-components",
      icon: "📝",
    },
    {
      title: "Theming",
      description: "Customize the look and feel with the powerful theming system",
      link: "/documentation/theming",
      icon: "🎨",
    },
    {
      title: "State Management",
      description: "Handle component state and user interactions",
      link: "/documentation/state-management",
      icon: "🔄",
    },
    {
      title: "Complex Examples",
      description: "Advanced patterns and real-world examples",
      link: "/documentation/complex-examples",
      icon: "🏗️",
    },
    {
      title: "Performance",
      description: "Optimize your applications for maximum performance",
      link: "/documentation/performance",
      icon: "⚡",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sections.map((section) => (
        <Link
          key={section.title}
          to={section.link}
          className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 hover:border-emerald-500/30 transition-all duration-300 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transition-colors" />
          <div className="relative">
            <div className="text-3xl mb-3 transition-colors">{section.icon}</div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 transition-colors">
              {section.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm transition-colors">
              {section.description}
            </p>
          </div>
          <div className="absolute bottom-2 right-2 text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
