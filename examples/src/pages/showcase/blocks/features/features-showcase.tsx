import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { Heading, Text, spacing } from "../../../../components/ui";
import { PageHeader } from "../../../../components/ui/page-header";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

const gridSpec: ComponentSpec = {
  type: "Features",
  props: {
    variant: "grid",
    gridColumns: 3,
    title: "Powerful Features for Modern Teams",
    subtitle: "Everything you need to build, deploy, and scale your applications",
    features: [
      {
        id: "1",
        title: "Lightning Fast Performance",
        description: "Built with performance in mind, delivering exceptional speed and responsiveness.",
        icon: "FiZap",
        benefits: [
          "Sub-second page loads",
          "Optimized asset delivery",
          "Global CDN distribution"
        ],
        category: "Performance",
        status: "available",
      },
      {
        id: "2",
        title: "Enterprise Security",
        description: "Bank-level security with end-to-end encryption and comprehensive compliance.",
        icon: "FiShield",
        benefits: [
          "SOC 2 Type II certified",
          "GDPR compliant",
          "256-bit encryption"
        ],
        category: "Security",
        status: "available",
      },
      {
        id: "3",
        title: "Advanced Analytics",
        description: "Gain deep insights into your data with our powerful analytics dashboard.",
        icon: "FiTrendingUp",
        benefits: [
          "Real-time reporting",
          "Custom dashboards",
          "Predictive analytics"
        ],
        category: "Analytics",
        status: "available",
        badge: "Popular",
      },
      {
        id: "4",
        title: "Team Collaboration",
        description: "Work seamlessly with your team with built-in collaboration features.",
        icon: "FiUsers",
        benefits: [
          "Real-time collaboration",
          "Role-based permissions",
          "Activity tracking"
        ],
        category: "Collaboration",
        status: "available",
      },
      {
        id: "5",
        title: "Developer API",
        description: "Powerful REST and GraphQL APIs for seamless integration with your tools.",
        icon: "FiCode",
        benefits: [
          "RESTful endpoints",
          "GraphQL support",
          "Webhook automation"
        ],
        category: "Developer",
        status: "available",
      },
      {
        id: "6",
        title: "AI-Powered Insights",
        description: "Leverage machine learning to automate workflows and surface key insights.",
        icon: "FiDatabase",
        benefits: [
          "Automated categorization",
          "Smart recommendations",
          "Anomaly detection"
        ],
        category: "Analytics",
        status: "coming-soon",
      },
    ]
  }
};

const alternatingSpec: ComponentSpec = {
  type: "Features",
  props: {
    variant: "alternating",
    title: "Why Choose Our Platform",
    subtitle: "Discover the features that set us apart",
    features: [
      {
        id: "1",
        title: "Intuitive Dashboard",
        description: "A beautifully designed dashboard that puts all your important metrics at your fingertips. Monitor performance, track goals, and make data-driven decisions.",
        icon: "FiLayout",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        benefits: [
          "Customizable widgets",
          "Real-time data updates",
          "Mobile responsive design"
        ],
        category: "Core Features",
      },
      {
        id: "2",
        title: "Advanced Security",
        description: "Enterprise-grade security features protect your data with multiple layers of encryption, regular security audits, and compliance certifications.",
        icon: "FiLock",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        benefits: [
          "Two-factor authentication",
          "End-to-end encryption",
          "Regular security audits"
        ],
        category: "Security",
      },
      {
        id: "3",
        title: "Seamless Integrations",
        description: "Connect with your favorite tools and services. Our platform integrates with over 100+ popular business applications.",
        icon: "FiServer",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        benefits: [
          "One-click integrations",
          "Custom API support",
          "Automated workflows"
        ],
        category: "Integrations",
      },
    ]
  }
};

const tabbedSpec: ComponentSpec = {
  type: "Features",
  props: {
    variant: "tabbed",
    title: "Explore Features by Category",
    categories: ["Performance", "Security", "Analytics", "Collaboration", "Developer"],
    features: [
      {
        id: "1",
        title: "Lightning Fast Performance",
        description: "Built with performance in mind, delivering exceptional speed.",
        icon: "FiZap",
        category: "Performance",
      },
      {
        id: "2",
        title: "Global CDN",
        description: "Content delivered from edge locations worldwide.",
        icon: "FiServer",
        category: "Performance",
      },
      {
        id: "3",
        title: "Enterprise Security",
        description: "Bank-level security with end-to-end encryption.",
        icon: "FiShield",
        category: "Security",
      },
      {
        id: "4",
        title: "Access Controls",
        description: "Fine-grained permissions and role-based access.",
        icon: "FiLock",
        category: "Security",
      },
      {
        id: "5",
        title: "Real-time Analytics",
        description: "Monitor your metrics as they happen.",
        icon: "FiTrendingUp",
        category: "Analytics",
      },
      {
        id: "6",
        title: "Custom Reports",
        description: "Build reports tailored to your needs.",
        icon: "FiDatabase",
        category: "Analytics",
      },
      {
        id: "7",
        title: "Team Workspaces",
        description: "Dedicated spaces for team collaboration.",
        icon: "FiUsers",
        category: "Collaboration",
      },
      {
        id: "8",
        title: "REST API",
        description: "Comprehensive REST API for all operations.",
        icon: "FiCode",
        category: "Developer",
      },
    ]
  }
};

const iconFocusedSpec: ComponentSpec = {
  type: "Features",
  props: {
    variant: "icon-focused",
    gridColumns: 4,
    title: "Simple and Powerful",
    showBenefits: false,
    features: [
      {
        id: "1",
        title: "Fast Performance",
        description: "Lightning-fast load times.",
        icon: "FiZap",
      },
      {
        id: "2",
        title: "Secure Platform",
        description: "Enterprise-grade security.",
        icon: "FiShield",
      },
      {
        id: "3",
        title: "Analytics",
        description: "Powerful insights.",
        icon: "FiTrendingUp",
      },
      {
        id: "4",
        title: "Collaboration",
        description: "Work together seamlessly.",
        icon: "FiUsers",
      },
      {
        id: "5",
        title: "API Access",
        description: "Developer-friendly APIs.",
        icon: "FiCode",
      },
      {
        id: "6",
        title: "Data Storage",
        description: "Reliable data management.",
        icon: "FiDatabase",
      },
      {
        id: "7",
        title: "Custom Layouts",
        description: "Flexible design options.",
        icon: "FiLayout",
      },
      {
        id: "8",
        title: "Privacy First",
        description: "Your data stays secure.",
        icon: "FiLock",
      },
    ]
  }
};

const comparisonSpec: ComponentSpec = {
  type: "Features",
  props: {
    variant: "comparison",
    title: "Compare Plans",
    subtitle: "Choose the perfect plan for your needs",
    comparisonPlans: ["Starter", "Professional", "Enterprise"],
    features: [
      {
        id: "1",
        title: "Projects",
        description: "Number of active projects",
        icon: "FiLayout",
      },
      {
        id: "2",
        title: "Team Members",
        description: "Collaborate with your team",
        icon: "FiUsers",
      },
      {
        id: "3",
        title: "Storage",
        description: "File and data storage",
        icon: "FiDatabase",
      },
      {
        id: "4",
        title: "API Access",
        description: "REST and GraphQL APIs",
        icon: "FiCode",
      },
      {
        id: "5",
        title: "Analytics",
        description: "Advanced reporting tools",
        icon: "FiTrendingUp",
      },
      {
        id: "6",
        title: "Security",
        description: "Enterprise security features",
        icon: "FiShield",
      },
      {
        id: "7",
        title: "Support",
        description: "Customer support level",
        icon: "FiUsers",
      },
      {
        id: "8",
        title: "Custom Domain",
        description: "Use your own domain",
        icon: "FiServer",
      },
    ]
  }
};

export function FeaturesShowcasePage() {
  usePageMetadata({
    title: "Features Block",
    description: "Comprehensive features block for showcasing product/service capabilities",
  });

  const [activeTab, setActiveTab] = useState("preview");

  const showcases = [
    {
      title: "Grid Layout",
      description: "Display features in a clean grid layout with configurable columns",
      spec: gridSpec,
    },
    {
      title: "Alternating Layout",
      description: "Features with alternating image and text placement",
      spec: alternatingSpec,
    },
    {
      title: "Tabbed Categories",
      description: "Organize features by category with interactive tabs",
      spec: tabbedSpec,
    },
    {
      title: "Icon Focused",
      description: "Minimal design with prominent icons",
      spec: iconFocusedSpec,
    },
    {
      title: "Comparison Table",
      description: "Feature comparison matrix for different plans",
      spec: comparisonSpec,
    },
  ];

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Features Block"
        description="A comprehensive features block for showcasing product or service capabilities with multiple variants including grid, alternating, tabbed, icon-focused, and comparison layouts."
        backLink="/showcase/blocks"
        backLinkText="Back to Blocks"
      />

      <div className="container mx-auto px-4 py-8">
        <div className={spacing.default}>
          {/* Component Overview */}
          <section className="mb-12">
            <Heading as="h2" size="section" className="mb-4">
              Overview
            </Heading>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                The Features block is a versatile component for showcasing your product or service features.
                It supports multiple display variants to suit different use cases and design preferences.
              </p>
              <ul>
                <li><strong>Grid Layout:</strong> Clean card-based grid with configurable columns</li>
                <li><strong>Alternating Layout:</strong> Features with images in alternating positions</li>
                <li><strong>Tabbed Categories:</strong> Organize features by category with tabs</li>
                <li><strong>Icon Focused:</strong> Minimal design emphasizing icons</li>
                <li><strong>Comparison Table:</strong> Feature matrix for comparing plans</li>
              </ul>
            </div>
          </section>

          {/* Showcases */}
          {showcases.map((showcase, index) => (
            <section key={index} className="mb-16">
              <div className="mb-6">
                <Heading as="h3" size="subsection">
                  {showcase.title}
                </Heading>
                <Text variant="muted" className="mt-2">
                  {showcase.description}
                </Text>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="json">JSON Spec</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-0">
                  <ShowcaseWrapper>
                    {render(showcase.spec)}
                  </ShowcaseWrapper>
                </TabsContent>

                <TabsContent value="json" className="mt-0">
                  <CodeBlock language="json" className="max-h-[600px] overflow-auto">
                    {JSON.stringify(showcase.spec, null, 2)}
                  </CodeBlock>
                </TabsContent>
              </Tabs>
            </section>
          ))}

          {/* Configuration Options */}
          <section className="mb-12">
            <Heading as="h2" size="section" className="mb-4">
              Configuration Options
            </Heading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Property</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Default</th>
                    <th className="text-left py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">variant</td>
                    <td className="py-3 px-4 text-sm">string</td>
                    <td className="py-3 px-4 text-sm">&ldquo;grid&rdquo;</td>
                    <td className="py-3 px-4 text-sm">Display variant: grid, alternating, tabbed, icon-focused, comparison</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">features</td>
                    <td className="py-3 px-4 text-sm">Feature[]</td>
                    <td className="py-3 px-4 text-sm">required</td>
                    <td className="py-3 px-4 text-sm">Array of feature objects</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">title</td>
                    <td className="py-3 px-4 text-sm">string</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">Optional section title</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">subtitle</td>
                    <td className="py-3 px-4 text-sm">string</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">Optional section subtitle</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">gridColumns</td>
                    <td className="py-3 px-4 text-sm">2 | 3 | 4</td>
                    <td className="py-3 px-4 text-sm">3</td>
                    <td className="py-3 px-4 text-sm">Number of columns in grid layout</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">categories</td>
                    <td className="py-3 px-4 text-sm">string[]</td>
                    <td className="py-3 px-4 text-sm">[]</td>
                    <td className="py-3 px-4 text-sm">Categories for tabbed variant</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">comparisonPlans</td>
                    <td className="py-3 px-4 text-sm">string[]</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">Plan names for comparison variant</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">showBenefits</td>
                    <td className="py-3 px-4 text-sm">boolean</td>
                    <td className="py-3 px-4 text-sm">true</td>
                    <td className="py-3 px-4 text-sm">Whether to show feature benefits</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">animated</td>
                    <td className="py-3 px-4 text-sm">boolean</td>
                    <td className="py-3 px-4 text-sm">true</td>
                    <td className="py-3 px-4 text-sm">Enable animations</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-mono text-sm">onFeatureClick</td>
                    <td className="py-3 px-4 text-sm">function</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">Callback when a feature is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Feature Object Structure */}
          <section>
            <Heading as="h2" size="section" className="mb-4">
              Feature Object Structure
            </Heading>
            <CodeBlock language="typescript">
              {`interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string | IconType;  // react-icons icon name or component
  image?: string;            // URL for alternating layout
  benefits?: string[];       // List of benefits
  category?: string;         // For tabbed variant
  status?: 'available' | 'coming-soon' | 'beta';
  badge?: string;           // Custom badge text
}`}
            </CodeBlock>
          </section>
        </div>
      </div>
    </div>
  );
}