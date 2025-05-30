import { usePageMetadata } from "../../../lib/meta";

export function ComplexExamplesPage() {
  usePageMetadata({
    title: "Complex Examples",
    description: "React Jedi complex examples - Advanced patterns and real-world use cases.",
  });
  return (
    <section id="complex-examples" className="mb-20">
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800 inline-block pr-8 transition-colors">
          Complex Examples
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-emerald-500/50 transition-colors" />
        </h2>
      </div>

      <div className="prose prose-invert prose-emerald max-w-none">
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 transition-colors">
          Here are some complex examples that combine multiple components to create real-world UI
          patterns.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Hero Section
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          A complete hero section with gradient heading, description, and call-to-action buttons:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6 transition-colors">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed transition-colors">
              {`{
  "type": "container",
  "maxWidth": "7xl",
  "padding": "lg",
  "className": "min-h-screen flex items-center",
  "children": [
    {
      "type": "flex",
      "direction": "column",
      "align": "center",
      "gap": "xl",
      "children": [
        {
          "type": "heading",
          "level": "h1",
          "content": "Build Beautiful UIs with React Jedi",
          "size": "6xl",
          "weight": "extrabold",
          "gradient": "rainbow",
          "align": "center",
          "animation": "glow"
        },
        {
          "type": "text",
          "text": "Create stunning, server-driven interfaces using JSON specifications. Powered by React, TailwindCSS, and ShadCN components.",
          "size": "xl",
          "align": "center",
          "variant": "muted",
          "className": "max-w-3xl"
        },
        {
          "type": "flex",
          "direction": "row",
          "gap": "md",
          "wrap": "wrap",
          "justify": "center",
          "children": [
            {
              "type": "button",
              "text": "Get Started",
              "variant": "primary",
              "size": "lg"
            },
            {
              "type": "button",
              "text": "View Documentation",
              "variant": "outline",
              "size": "lg"
            }
          ]
        }
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Testimonial Component
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          A testimonial component with multiple variants and rating:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6 transition-colors">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed transition-colors">
              {`{
  "type": "testimonial",
  "author": {
    "name": "Sarah Johnson",
    "role": "CTO",
    "company": "TechCorp Inc.",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  "content": "React Jedi has transformed how we build UIs. The JSON specification approach is intuitive and incredibly powerful. We&apos;ve cut our development time in half!",
  "rating": 5,
  "date": "December 2024",
  "variant": "card",
  "highlight": true
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Multiple Testimonials
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          Create a grid of testimonials with different variants:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6 transition-colors">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed transition-colors">
              {`{
  "type": "grid",
  "columns": { "default": 1, "md": 3 },
  "gap": "lg",
  "children": [
    {
      "type": "testimonial",
      "author": {
        "name": "John Doe",
        "role": "Developer",
        "company": "WebDev Co"
      },
      "content": "The component quality is outstanding!",
      "rating": 5,
      "variant": "card"
    },
    {
      "type": "testimonial",
      "author": {
        "name": "Emma Wilson",
        "role": "Designer",
        "company": "Design Studio"
      },
      "content": "Beautiful, modern components that are easy to style.",
      "rating": 5,
      "variant": "card",
      "highlight": true
    },
    {
      "type": "testimonial",
      "author": {
        "name": "Mike Chen",
        "role": "Product Manager",
        "company": "StartupCo"
      },
      "content": "Accelerated our development timeline significantly.",
      "rating": 5,
      "variant": "card"
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Pricing Table
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          A beautiful pricing table with tier comparison:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6 transition-colors">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed transition-colors">
              {`{
  "type": "pricing-table",
  "columns": 3,
  "tiers": [
    {
      "name": "Starter",
      "description": "Perfect for small projects",
      "price": 9,
      "currency": "$",
      "period": "month",
      "features": [
        { "text": "5 Projects", "included": true },
        { "text": "10 Users", "included": true },
        { "text": "2GB Storage", "included": true },
        { "text": "Basic Support", "included": true },
        { "text": "Analytics", "included": false }
      ],
      "cta": { "text": "Get Started", "variant": "outline" }
    },
    {
      "name": "Professional",
      "description": "Best for growing teams",
      "price": 29,
      "currency": "$",
      "period": "month",
      "badge": "Most Popular",
      "highlighted": true,
      "features": [
        { "text": "Unlimited Projects", "included": true },
        { "text": "50 Users", "included": true },
        { "text": "50GB Storage", "included": true },
        { "text": "Priority Support", "included": true },
        { "text": "Advanced Analytics", "included": true }
      ],
      "cta": { "text": "Start Free Trial" }
    },
    {
      "name": "Enterprise",
      "price": "Custom",
      "features": [
        { "text": "Unlimited Everything", "included": true },
        { "text": "Dedicated Support", "included": true },
        { "text": "Custom Features", "included": true },
        { "text": "SLA", "included": true },
        { "text": "Priority Updates", "included": true }
      ],
      "cta": { "text": "Contact Sales", "variant": "outline" }
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400 transition-colors">
          Dashboard Card
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 transition-colors">
          A dashboard card with metrics and status indicators:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 transition-colors"></div>
          <div className="relative bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6 transition-colors">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed transition-colors">
              {`{
  "type": "card",
  "children": [
    {
      "type": "flex",
      "direction": "row",
      "justify": "between",
      "align": "start",
      "children": [
        {
          "type": "box",
          "children": [
            {
              "type": "text",
              "text": "Total Revenue",
              "size": "sm",
              "variant": "muted"
            },
            {
              "type": "heading",
              "level": "h2",
              "content": "$45,231.89",
              "size": "3xl",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "+20.1% from last month",
              "size": "sm",
              "variant": "success"
            }
          ]
        },
        {
          "type": "badge",
          "text": "Active",
          "variant": "success"
        }
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
