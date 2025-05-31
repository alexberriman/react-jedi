import { usePageMetadata } from "../../../lib/meta";
import { CodeBlock } from "@/components/ui/code-block";

export function ComplexExamplesPage() {
  usePageMetadata({
    title: "Complex Examples",
    description: "React Jedi complex examples - Advanced patterns and real-world use cases.",
  });
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Complex Examples
      </h2>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          Here are some complex examples that combine multiple components to create real-world UI
          patterns.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Hero Section
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          A complete hero section with gradient heading, description, and call-to-action buttons:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
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
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Testimonial Component
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          A testimonial component with multiple variants and rating:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
{`{
  "type": "testimonial",
  "author": {
    "name": "Sarah Johnson",
    "role": "CTO",
    "company": "TechCorp Inc.",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  "content": "React Jedi has transformed how we build UIs. The JSON specification approach is intuitive and incredibly powerful. We've cut our development time in half!",
  "rating": 5,
  "date": "December 2024",
  "variant": "card",
  "highlight": true
}`}
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Multiple Testimonials
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Create a grid of testimonials with different variants:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
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
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Pricing Table
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          A beautiful pricing table with tier comparison:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
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
          </CodeBlock>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Dashboard Card
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          A dashboard card with metrics and status indicators:
        </p>

        <div className="relative group mb-8">
          <CodeBlock language="json" className="relative mb-6">
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
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
