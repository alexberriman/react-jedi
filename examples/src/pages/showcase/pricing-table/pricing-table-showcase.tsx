import type { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";
import { usePageMetadata } from "../../../lib/meta";
import { Link } from "react-router-dom";
import { useState } from "react";

export function PricingTableShowcase() {
  usePageMetadata({
    title: "PricingTable Component",
    description:
      "A comprehensive showcase of the React Jedi PricingTable component with different tiers, layouts, and customization options.",
  });

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Table of contents items
  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Pricing Table" },
    { id: "highlighted", label: "Highlighted Tiers" },
    { id: "with-badges", label: "With Badges" },
    { id: "columns", label: "Column Layouts" },
    { id: "custom-features", label: "Feature Variations" },
    { id: "enterprise", label: "Enterprise Example" },
    { id: "props", label: "Props & Options" },
    { id: "examples", label: "Complete Examples" },
  ];

  // Basic pricing table specification
  const basicSpec: UISpecification = {
    type: "PricingTable",
    tiers: [
      {
        name: "Starter",
        description: "Perfect for individuals getting started",
        price: 9,
        currency: "$",
        period: "month",
        features: [
          { text: "Up to 10 projects", included: true },
          { text: "2GB storage", included: true },
          { text: "Basic support", included: true },
          { text: "Advanced analytics", included: false },
          { text: "Priority support", included: false },
        ],
        cta: {
          text: "Get Started",
          variant: "outline",
        },
      },
      {
        name: "Professional",
        description: "For growing teams and businesses",
        price: 29,
        currency: "$",
        period: "month",
        features: [
          { text: "Unlimited projects", included: true },
          { text: "10GB storage", included: true },
          { text: "Priority support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Custom integrations", included: false },
        ],
        cta: {
          text: "Start Free Trial",
          variant: "default",
        },
      },
      {
        name: "Enterprise",
        description: "For large organizations",
        price: "Custom",
        features: [
          { text: "Everything in Professional", included: true },
          { text: "Unlimited storage", included: true },
          { text: "24/7 phone support", included: true },
          { text: "Custom integrations", included: true },
          { text: "SLA guarantee", included: true },
        ],
        cta: {
          text: "Contact Sales",
          variant: "secondary",
        },
      },
    ],
  };

  // Highlighted tier specification
  const highlightedSpec: UISpecification = {
    type: "PricingTable",
    tiers: [
      {
        name: "Basic",
        description: "For personal use",
        price: 0,
        currency: "$",
        period: "month",
        features: [
          { text: "5 projects", included: true },
          { text: "1GB storage", included: true },
          { text: "Community support", included: true },
          { text: "Analytics", included: false },
          { text: "API access", included: false },
        ],
        cta: {
          text: "Start Free",
          variant: "outline",
        },
      },
      {
        name: "Pro",
        description: "Most popular choice",
        price: 19,
        currency: "$",
        period: "month",
        badge: "Most Popular",
        highlighted: true,
        features: [
          { text: "Unlimited projects", included: true },
          { text: "50GB storage", included: true },
          { text: "Priority support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "API access", included: true },
        ],
        cta: {
          text: "Start Pro Trial",
          variant: "default",
        },
      },
      {
        name: "Team",
        description: "For collaborative teams",
        price: 49,
        currency: "$",
        period: "month",
        features: [
          { text: "Everything in Pro", included: true },
          { text: "200GB storage", included: true },
          { text: "Team management", included: true },
          { text: "Advanced permissions", included: true },
          { text: "Custom branding", included: true },
        ],
        cta: {
          text: "Start Team Trial",
          variant: "secondary",
        },
      },
    ],
  };

  // With badges specification
  const badgesSpec: UISpecification = {
    type: "PricingTable",
    columns: 2,
    tiers: [
      {
        name: "Standard",
        description: "Great for small businesses",
        price: 15,
        currency: "$",
        period: "month",
        badge: "Popular",
        features: [
          { text: "Up to 25 users", included: true },
          { text: "5GB storage per user", included: true },
          { text: "Email support", included: true },
          { text: "Basic integrations", included: true },
          { text: "Advanced features", included: false },
        ],
        cta: {
          text: "Choose Standard",
          variant: "outline",
        },
      },
      {
        name: "Premium",
        description: "Everything you need to scale",
        price: 39,
        currency: "$",
        period: "month",
        badge: "Best Value",
        highlighted: true,
        features: [
          { text: "Up to 100 users", included: true },
          { text: "25GB storage per user", included: true },
          { text: "Priority support", included: true },
          { text: "All integrations", included: true },
          { text: "Advanced features", included: true },
        ],
        cta: {
          text: "Choose Premium",
          variant: "default",
        },
      },
    ],
  };

  // Column layouts specification
  const columnsSpec: UISpecification = {
    type: "Stack",
    spacing: "8",
    children: [
      {
        type: "Box",
        children: [
          { type: "Text", size: "large", className: "font-semibold mb-4", children: "Single Column" },
          {
            type: "PricingTable",
            columns: 1,
            tiers: [
              {
                name: "Solo",
                price: 12,
                currency: "$",
                period: "month",
                features: [
                  { text: "Personal workspace", included: true },
                  { text: "10GB storage", included: true },
                  { text: "Basic support", included: true },
                ],
                cta: { text: "Get Solo", variant: "outline" },
              },
            ],
          },
        ],
      },
      {
        type: "Box",
        children: [
          { type: "Text", size: "large", className: "font-semibold mb-4", children: "Four Columns" },
          {
            type: "PricingTable",
            columns: 4,
            tiers: [
              {
                name: "Free",
                price: 0,
                currency: "$",
                features: [
                  { text: "Basic features", included: true },
                  { text: "Limited storage", included: true },
                ],
                cta: { text: "Start Free", variant: "ghost" },
              },
              {
                name: "Starter",
                price: 9,
                currency: "$",
                period: "month",
                features: [
                  { text: "All basic features", included: true },
                  { text: "5GB storage", included: true },
                ],
                cta: { text: "Get Starter", variant: "outline" },
              },
              {
                name: "Pro",
                price: 29,
                currency: "$",
                period: "month",
                highlighted: true,
                features: [
                  { text: "All starter features", included: true },
                  { text: "50GB storage", included: true },
                ],
                cta: { text: "Get Pro", variant: "default" },
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  { text: "All pro features", included: true },
                  { text: "Unlimited storage", included: true },
                ],
                cta: { text: "Contact Us", variant: "secondary" },
              },
            ],
          },
        ],
      },
    ],
  };

  // Feature variations specification
  const featuresSpec: UISpecification = {
    type: "PricingTable",
    tiers: [
      {
        name: "Basic",
        price: 10,
        currency: "$",
        period: "month",
        features: [
          { text: "Core functionality", included: true },
          { text: "Standard support", included: true },
          { text: "Basic analytics", included: true },
          { text: "Advanced features", included: false },
          { text: "Premium integrations", included: false },
          { text: "Custom branding", included: false },
        ],
        cta: { text: "Choose Basic", variant: "outline" },
      },
      {
        name: "Advanced",
        price: 25,
        currency: "$",
        period: "month",
        features: [
          { text: "Core functionality", included: true },
          { text: "Priority support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Advanced features", included: true },
          { text: "Premium integrations", included: false },
          { text: "Custom branding", included: false },
        ],
        cta: { text: "Choose Advanced", variant: "default" },
      },
      {
        name: "Premium",
        price: 50,
        currency: "$",
        period: "month",
        highlighted: true,
        features: [
          { text: "Core functionality", included: true },
          { text: "24/7 support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Advanced features", included: true },
          { text: "Premium integrations", included: true },
          { text: "Custom branding", included: true },
        ],
        cta: { text: "Choose Premium", variant: "default" },
      },
    ],
  };

  // Enterprise example specification
  const enterpriseSpec: UISpecification = {
    type: "Card",
    className: "max-w-4xl mx-auto",
    children: [
      {
        type: "CardHeader",
        className: "text-center",
        children: [
          { type: "CardTitle", className: "text-3xl", children: "Enterprise Solutions" },
          { type: "CardDescription", className: "text-lg", children: "Tailored pricing for large organizations" },
        ],
      },
      {
        type: "CardContent",
        children: {
          type: "PricingTable",
          columns: 2,
          tiers: [
            {
              name: "Enterprise Starter",
              description: "For growing enterprises",
              price: 99,
              currency: "$",
              period: "month",
              badge: "Volume Pricing",
              features: [
                { text: "Up to 500 users", included: true },
                { text: "100GB storage per user", included: true },
                { text: "Dedicated account manager", included: true },
                { text: "SLA guarantees", included: true },
                { text: "Custom integrations", included: true },
                { text: "Advanced security", included: true },
                { text: "On-premise deployment", included: false },
              ],
              cta: {
                text: "Start Enterprise Trial",
                variant: "outline",
              },
            },
            {
              name: "Enterprise Premium",
              description: "For large-scale deployments",
              price: "Custom",
              badge: "White Glove",
              highlighted: true,
              features: [
                { text: "Unlimited users", included: true },
                { text: "Unlimited storage", included: true },
                { text: "Dedicated success team", included: true },
                { text: "99.9% uptime SLA", included: true },
                { text: "Custom integrations", included: true },
                { text: "Enterprise security", included: true },
                { text: "On-premise deployment", included: true },
              ],
              cta: {
                text: "Contact Enterprise Sales",
                variant: "default",
              },
            },
          ],
        },
      },
    ],
  };

  // SaaS pricing example
  const saasExampleSpec: UISpecification = {
    type: "Stack",
    spacing: "6",
    children: [
      {
        type: "Box",
        className: "text-center",
        children: [
          { type: "Text", className: "text-3xl font-bold mb-2", children: "Choose Your Plan" },
          { type: "Text", className: "text-lg text-gray-600 dark:text-gray-400", children: "Start with a 14-day free trial. No credit card required." },
        ],
      },
      {
        type: "PricingTable",
        tiers: [
          {
            name: "Individual",
            description: "Perfect for solo creators",
            price: 12,
            currency: "$",
            period: "month",
            features: [
              { text: "1 workspace", included: true },
              { text: "10 projects", included: true },
              { text: "5GB storage", included: true },
              { text: "Basic templates", included: true },
              { text: "Email support", included: true },
              { text: "Advanced features", included: false },
              { text: "Team collaboration", included: false },
            ],
            cta: {
              text: "Start Individual Plan",
              variant: "outline",
            },
          },
          {
            name: "Team",
            description: "Best for small teams",
            price: 39,
            currency: "$",
            period: "month",
            badge: "Popular",
            highlighted: true,
            features: [
              { text: "5 workspaces", included: true },
              { text: "Unlimited projects", included: true },
              { text: "100GB storage", included: true },
              { text: "Premium templates", included: true },
              { text: "Priority support", included: true },
              { text: "Advanced features", included: true },
              { text: "Team collaboration", included: true },
            ],
            cta: {
              text: "Start Team Plan",
              variant: "default",
            },
          },
          {
            name: "Business",
            description: "For larger organizations",
            price: 99,
            currency: "$",
            period: "month",
            features: [
              { text: "Unlimited workspaces", included: true },
              { text: "Unlimited projects", included: true },
              { text: "1TB storage", included: true },
              { text: "Custom templates", included: true },
              { text: "24/7 phone support", included: true },
              { text: "All advanced features", included: true },
              { text: "Advanced team tools", included: true },
            ],
            cta: {
              text: "Start Business Plan",
              variant: "secondary",
            },
          },
        ],
      },
    ],
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex">
      {/* Table of Contents - Fixed Sidebar */}
      <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">On this page</h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/showcase"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            ← Back to Showcase
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">PricingTable Component</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A flexible pricing table component that displays multiple pricing tiers with features, highlights, and call-to-action buttons. Perfect for subscription services, SaaS products, and service offerings.
            </p>
          </div>

          {/* Overview Section */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The PricingTable component provides a clean, professional way to display pricing options for your products or services. It supports multiple tiers, feature comparisons, highlighted plans, badges, and responsive layouts.
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">Key Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Flexible column layouts (1-4 columns)</li>
                <li>Feature comparison with included/excluded indicators</li>
                <li>Highlighted tiers for popular plans</li>
                <li>Custom badges and labels</li>
                <li>Responsive design with mobile-first approach</li>
                <li>Support for different pricing models (fixed, custom, free)</li>
                <li>Customizable call-to-action buttons</li>
              </ul>
            </div>
          </section>

          {/* Basic Section */}
          <section id="basic" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Basic Pricing Table</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A simple three-tier pricing table with essential features and clear pricing structure.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(basicSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(basicSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Highlighted Section */}
          <section id="highlighted" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Highlighted Tiers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Emphasize popular or recommended plans with highlighting and badges.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(highlightedSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(highlightedSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* With Badges Section */}
          <section id="with-badges" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">With Badges</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add custom badges to highlight special offers, popular plans, or best value options.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(badgesSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(badgesSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Column Layouts Section */}
          <section id="columns" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Column Layouts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from 1 to 4 columns to best fit your pricing structure and available space.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(columnsSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(columnsSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Feature Variations Section */}
          <section id="custom-features" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Feature Variations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Show clear feature comparisons with included and excluded items across different tiers.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(featuresSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(featuresSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Enterprise Section */}
          <section id="enterprise" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Enterprise Example</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enterprise-focused pricing with custom pricing, volume discounts, and premium features.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              {render(enterpriseSpec)}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                View JSON Specification
              </summary>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(enterpriseSpec, null, 2)}
              </pre>
            </details>
          </section>

          {/* Props Section */}
          <section id="props" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Props & Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium">Prop</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Default</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">type</td>
                    <td className="py-3 px-4 font-mono">&quot;PricingTable&quot;</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Component type identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">tiers</td>
                    <td className="py-3 px-4 font-mono">PricingTier[]</td>
                    <td className="py-3 px-4">required</td>
                    <td className="py-3 px-4">Array of pricing tier objects</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">columns</td>
                    <td className="py-3 px-4 font-mono">1 | 2 | 3 | 4</td>
                    <td className="py-3 px-4">3</td>
                    <td className="py-3 px-4">Number of columns in the layout</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 font-mono">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">PricingTier Object</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 px-4 font-medium">Property</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Required</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">name</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">✓</td>
                      <td className="py-3 px-4">Name of the pricing tier</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">price</td>
                      <td className="py-3 px-4 font-mono">number | string</td>
                      <td className="py-3 px-4">✓</td>
                      <td className="py-3 px-4">Price amount or custom text (e.g., &quot;Custom&quot;)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">features</td>
                      <td className="py-3 px-4 font-mono">Feature[]</td>
                      <td className="py-3 px-4">✓</td>
                      <td className="py-3 px-4">Array of feature objects with text and included status</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">cta</td>
                      <td className="py-3 px-4 font-mono">CTA</td>
                      <td className="py-3 px-4">✓</td>
                      <td className="py-3 px-4">Call-to-action button configuration</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Short description of the tier</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">currency</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Currency symbol (e.g., "$", &quot;€&quot;)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">period</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Billing period (e.g., "month", &quot;year&quot;)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">badge</td>
                      <td className="py-3 px-4 font-mono">string</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Badge text to display on the tier card</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">highlighted</td>
                      <td className="py-3 px-4 font-mono">boolean</td>
                      <td className="py-3 px-4">-</td>
                      <td className="py-3 px-4">Whether to highlight this tier visually</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Complete Examples Section */}
          <section id="examples" className="scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">Complete Examples</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Real-world pricing table examples for SaaS and service businesses.
            </p>
            
            <div className="space-y-8">
              {/* SaaS Example */}
              <div>
                <h3 className="text-lg font-medium mb-3">SaaS Product Pricing</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  {render(saasExampleSpec)}
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                    View JSON Specification
                  </summary>
                  <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(saasExampleSpec, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <Link
                to="/showcase"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                ← Back to Component Showcase
              </Link>
              <Link
                to="/documentation/ui-components"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                View Documentation →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}