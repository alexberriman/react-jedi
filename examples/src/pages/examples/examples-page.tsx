import { Link } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";
import { Text, spacing } from "../../components/ui";
import { PageHeader } from "../../components/ui/page-header";

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
    description:
      "A modern landing page built with JSON specifications showcasing hero sections, feature grids, and testimonials.",
    path: "/examples/landing",
    status: "stable",
  },
  {
    id: "conditional-rendering",
    title: "Conditional Rendering",
    description:
      "Interactive demo showing conditional visibility and dynamic properties based on state, user roles, and themes.",
    path: "/examples/conditional",
    status: "stable",
  },
  {
    id: "conditional-advanced",
    title: "Advanced Conditional Rendering",
    description:
      "Comprehensive demo with multiple states, complex conditions, nested logic, and real-world UI patterns.",
    path: "/examples/conditional-advanced",
    status: "new",
  },
  {
    id: "form-validation",
    title: "Form Validation",
    description:
      "Comprehensive form validation examples with error states, different field types, and complex validation rules.",
    path: "/examples/form-validation",
    status: "new",
  },
  {
    id: "navigation",
    title: "Navigation Components",
    description:
      "Navigation components including breadcrumbs with different styles, separators, and configurations.",
    path: "/examples/navigation",
    status: "new",
  },
  {
    id: "data-display",
    title: "Data Display & Visualization",
    description:
      "Modern data tables and charts with stunning 2025 design. Features sorting, filtering, and beautiful visualizations.",
    path: "/examples/data-display",
    status: "new",
  },
  {
    id: "transitions",
    title: "Page Transitions & Smooth Scroll",
    description:
      "Smooth page transitions with Framer Motion and animated scrolling. Features section navigation and scroll progress indicators.",
    path: "/examples/transitions",
    status: "new",
  },
  {
    id: "click-animations",
    title: "Click Animations",
    description:
      "Interactive click animations with multiple presets and customization options. Features bounce, press, jelly, and more effects.",
    path: "/examples/click-animations",
    status: "new",
  },
  {
    id: "drag-animations",
    title: "Drag Animations",
    description:
      "Interactive drag animations with physics-based motion, constraints, and multiple presets. Features draggable cards and list items.",
    path: "/examples/drag-animations",
    status: "new",
  },
  {
    id: "scroll-animations",
    title: "Scroll Animations",
    description:
      "Beautiful scroll-triggered animations with parallax effects, staggered reveals, and progress indicators. Perfect for modern websites.",
    path: "/examples/scroll-animations",
    status: "new",
  },
  {
    id: "stagger-animations",
    title: "Staggered Animations",
    description:
      "Complex staggered animations for lists and groups with customizable orchestration, timing, and paths. Create eye-catching UI elements.",
    path: "/examples/stagger-animations",
    status: "new",
  },
  {
    id: "animation-sequence",
    title: "Animation Sequences",
    description:
      "Chain multiple animations together with precise timing control. Create complex multi-step animations with loops, callbacks, and dynamic sequencing.",
    path: "/examples/animation-sequence",
    status: "new",
  },
  {
    id: "data-fetching",
    title: "Data Fetching & Binding",
    description:
      "Fetch data from REST APIs, GraphQL, and other sources with automatic binding to components. Features caching, polling, and loading states.",
    path: "/examples/data-fetching",
    status: "new",
  },
  {
    id: "optimistic-updates",
    title: "Optimistic Updates",
    description:
      "Experience instant UI feedback with optimistic updates. Updates appear immediately while syncing with the server in the background, with automatic rollback on errors.",
    path: "/examples/optimistic-updates",
    status: "new",
  },
  {
    id: "seo-metadata",
    title: "SEO & Metadata Management",
    description:
      "Manage page titles, meta descriptions, Open Graph tags, Twitter Cards, and favicons. Complete SEO solution for server-driven UI applications.",
    path: "/examples/seo-metadata",
    status: "new",
  },
  {
    id: "structured-data",
    title: "Structured Data (JSON-LD)",
    description:
      "Implement schema.org markup for rich snippets in search results. Support for Organization, Article, Product, FAQ, and other schemas.",
    path: "/examples/structured-data",
    status: "new",
  },
  {
    id: "rich-snippets",
    title: "Rich Snippets",
    description:
      "Enhanced search results with structured data for products, articles, FAQs, events, and more using React Jedi's rich snippet utilities.",
    path: "/examples/rich-snippets",
    status: "new",
  },
  {
    id: "focus-management",
    title: "Focus Management & Accessibility",
    description:
      "Advanced focus management patterns including focus trap, focus return, keyboard navigation, and skip links for accessible user interfaces.",
    path: "/examples/focus-management",
    status: "new",
  },
  // More examples will be added here
];

export function ExamplesPage() {
  usePageMetadata({
    title: "Examples",
    description:
      "React Jedi examples - Explore real-world implementations including landing pages, forms, navigation, and interactive components.",
  });

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Examples"
        description="Explore practical examples of React Jedi's server-driven UI in action. Each example demonstrates different features and patterns."
      />
      
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {examples.map((example) => (
            <Link key={example.id} to={example.path} className="group relative block">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-lg/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {example.title}
                  </h3>
                  {example.status && (
                    <span
                      className={`
                      px-2 py-1 text-xs rounded-full
                      ${example.status === "new" ? "bg-green-500/20 text-green-400" : ""}
                      ${example.status === "updated" ? "bg-blue-500/20 text-blue-400" : ""}
                      ${example.status === "stable" ? "bg-gray-500/20 text-gray-600 dark:text-gray-400" : ""}
                    `}
                    >
                      {example.status}
                    </span>
                  )}
                </div>
                <Text size="base" variant="muted" className={spacing.small}>
                  {example.description}
                </Text>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span className="text-sm">View Example</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
