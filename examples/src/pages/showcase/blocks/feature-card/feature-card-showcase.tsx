import { Link } from "react-router-dom";
import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "@/lib/meta";
import { ShowcaseWrapper } from "@/components/ui/showcase-wrapper";
import { PageHeader } from "@/components/ui/page-header";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FeatureCardShowcasePage() {
  usePageMetadata({
    title: "Feature Card Block",
    description: "Advanced feature card component with multiple variants, icons, and layouts",
  });

  const [activeExample, setActiveExample] = useState("default");

  const examples: Record<string, { spec: ComponentSpec; title: string; description: string }> = {
    default: {
      title: "Default Grid",
      description: "Standard 3-column feature card grid with various icon styles",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "3",
          gap: "md",
          cards: [
            {
              title: "Lightning Fast",
              description: "Experience blazing fast performance with our optimized infrastructure and cutting-edge technology.",
              icon: "Zap",
              iconColor: "#FFB800",
              badge: "New",
            },
            {
              title: "Secure by Design",
              description: "Enterprise-grade security built into every layer of our platform with end-to-end encryption.",
              icon: "Shield",
              iconColor: "#4ECDC4",
            },
            {
              title: "Scale Infinitely",
              description: "Handle millions of users without breaking a sweat using our auto-scaling infrastructure.",
              icon: "Rocket",
              iconColor: "#FF6B6B",
              badge: "Popular",
              badgeVariant: "secondary",
            },
          ],
        },
      },
    },
    iconPositions: {
      title: "Icon Positions",
      description: "Different icon positioning options for varied layouts",
      spec: {
        type: "Stack",
        props: {
          gap: "lg",
          children: [
            {
              type: "FeatureCard",
              props: {
                title: "Icon on Top",
                description: "Default positioning with icon prominently displayed above the content.",
                icon: "Layers",
                iconPosition: "top",
                iconColor: "#8B5CF6",
              },
            },
            {
              type: "FeatureCard",
              props: {
                title: "Icon on Left",
                description: "Horizontal layout with icon positioned to the left of the content. Perfect for lists.",
                icon: "Package",
                iconPosition: "left",
                iconColor: "#059669",
                iconSize: "lg",
              },
            },
            {
              type: "FeatureCard",
              props: {
                title: "Icon as Background",
                description: "Subtle background icon effect for a more decorative appearance.",
                icon: "Globe",
                iconPosition: "background",
                iconColor: "#0891B2",
              },
            },
          ],
        },
      },
    },
    variants: {
      title: "Card Variants",
      description: "Various visual styles to match your design system",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "2",
          gap: "lg",
          cards: [
            {
              title: "Gradient Background",
              description: "Beautiful gradient effects for eye-catching cards.",
              icon: "Palette",
              variant: "gradient",
              gradientFrom: "#667eea",
              gradientTo: "#764ba2",
              iconColor: "#FFFFFF",
            },
            {
              title: "Glass Effect",
              description: "Modern glassmorphism style with backdrop blur.",
              icon: "Sparkles",
              variant: "glass",
              iconColor: "#00D9FF",
            },
            {
              title: "Bordered Style",
              description: "Prominent border for clear visual separation.",
              icon: "Terminal",
              variant: "bordered",
              iconColor: "#F59E0B",
              borderStyle: "solid",
            },
            {
              title: "Enhanced Shadow",
              description: "Deep shadows for elevated appearance.",
              icon: "FileCode",
              variant: "shadow",
              shadowSize: "xl",
              iconColor: "#EC4899",
            },
          ],
        },
      },
    },
    withCTA: {
      title: "With Call-to-Action",
      description: "Feature cards with integrated CTA buttons",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "3",
          gap: "md",
          cards: [
            {
              title: "Free Plan",
              description: "Perfect for individuals and small projects.",
              icon: "Package",
              iconColor: "#10B981",
              cta: {
                text: "Get Started",
                variant: "outline",
              },
            },
            {
              title: "Pro Plan",
              description: "Advanced features for growing teams.",
              icon: "Rocket",
              iconColor: "#8B5CF6",
              badge: "Popular",
              highlight: true,
              highlightColor: "#8B5CF6",
              cta: {
                text: "Upgrade Now",
                variant: "default",
              },
            },
            {
              title: "Enterprise",
              description: "Custom solutions for large organizations.",
              icon: "Shield",
              iconColor: "#0891B2",
              cta: {
                text: "Contact Sales",
                variant: "secondary",
              },
            },
          ],
        },
      },
    },
    hoverEffects: {
      title: "Hover Effects",
      description: "Interactive hover animations for better user engagement",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "2",
          gap: "md",
          cards: [
            {
              title: "Lift Effect",
              description: "Card lifts up on hover for depth perception.",
              icon: "Zap",
              hoverEffect: "lift",
              iconColor: "#F59E0B",
            },
            {
              title: "Glow Effect",
              description: "Subtle glow animation on hover.",
              icon: "Star",
              hoverEffect: "glow",
              variant: "gradient",
              gradientFrom: "#EC4899",
              gradientTo: "#8B5CF6",
            },
            {
              title: "Pulse Effect",
              description: "Gentle pulsing animation for attention.",
              icon: "Heart",
              hoverEffect: "pulse",
              iconColor: "#EF4444",
            },
            {
              title: "Rotate Effect",
              description: "Slight rotation adds playful interaction.",
              icon: "Settings",
              hoverEffect: "rotate",
              iconColor: "#6366F1",
            },
          ],
        },
      },
    },
    customContent: {
      title: "Custom Content",
      description: "Feature cards with additional custom content",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "2",
          gap: "lg",
          cards: [
            {
              title: "Performance Metrics",
              description: "Real-time analytics and insights",
              icon: "BarChart",
              iconColor: "#8B5CF6",
              variant: "gradient",
              gradientFrom: "#8B5CF6",
              gradientTo: "#EC4899",
              children: {
                type: "Stack",
                props: {
                  gap: "sm",
                  children: [
                    {
                      type: "Flex",
                      props: {
                        justify: "between",
                        className: "text-sm",
                        children: [
                          {
                            type: "Text",
                            props: { 
                              variant: "muted",
                              children: "Response Time" 
                            },
                          },
                          {
                            type: "Text",
                            props: { 
                              className: "font-semibold",
                              children: "45ms" 
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "Flex",
                      props: {
                        justify: "between",
                        className: "text-sm",
                        children: [
                          {
                            type: "Text",
                            props: { 
                              variant: "muted",
                              children: "Uptime" 
                            },
                          },
                          {
                            type: "Text",
                            props: { 
                              className: "font-semibold text-green-600",
                              children: "99.99%" 
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              cta: {
                text: "View Details",
                variant: "secondary",
              },
            },
            {
              title: "Development Tools",
              description: "Everything you need to build amazing apps",
              icon: "Code",
              iconColor: "#059669",
              children: {
                type: "Stack",
                props: {
                  gap: "xs",
                  children: [
                    {
                      type: "Text",
                      props: {
                        size: "small",
                        className: "flex items-center gap-2",
                        children: ["✓ Git Integration"],
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        size: "small",
                        className: "flex items-center gap-2",
                        children: ["✓ CI/CD Pipeline"],
                      },
                    },
                    {
                      type: "Text",
                      props: {
                        size: "small",
                        className: "flex items-center gap-2",
                        children: ["✓ Code Review"],
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
    iconSizes: {
      title: "Icon Sizes",
      description: "Different icon sizes for visual hierarchy",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "4",
          gap: "sm",
          cards: [
            {
              title: "Small",
              description: "Compact size",
              icon: "Settings",
              iconSize: "sm",
              iconColor: "#6366F1",
              align: "center",
            },
            {
              title: "Medium",
              description: "Default size",
              icon: "Settings",
              iconSize: "md",
              iconColor: "#8B5CF6",
              align: "center",
            },
            {
              title: "Large",
              description: "Prominent size",
              icon: "Settings",
              iconSize: "lg",
              iconColor: "#A855F7",
              align: "center",
            },
            {
              title: "Extra Large",
              description: "Maximum impact",
              icon: "Settings",
              iconSize: "xl",
              iconColor: "#C026D3",
              align: "center",
            },
          ],
        },
      },
    },
    techStack: {
      title: "Technology Stack",
      description: "Showcase your tech stack with branded colors",
      spec: {
        type: "FeatureCardGrid",
        props: {
          columns: "3",
          gap: "md",
          animated: true,
          staggerDelay: 0.1,
          cards: [
            {
              title: "React 18",
              description: "Build interactive UIs with the latest React features.",
              icon: "Code",
              iconColor: "#61DAFB",
              iconPosition: "left",
            },
            {
              title: "TypeScript",
              description: "Type-safe development with enhanced IDE support.",
              icon: "FileCode",
              iconColor: "#3178C6",
              iconPosition: "left",
            },
            {
              title: "Tailwind CSS",
              description: "Utility-first CSS for rapid UI development.",
              icon: "Palette",
              iconColor: "#06B6D4",
              iconPosition: "left",
            },
            {
              title: "Node.js",
              description: "Fast, scalable server-side JavaScript runtime.",
              icon: "Terminal",
              iconColor: "#339933",
              iconPosition: "left",
            },
            {
              title: "PostgreSQL",
              description: "Powerful, open-source relational database.",
              icon: "Database",
              iconColor: "#4169E1",
              iconPosition: "left",
            },
            {
              title: "Docker",
              description: "Container platform for consistent deployments.",
              icon: "Package",
              iconColor: "#2496ED",
              iconPosition: "left",
            },
          ],
        },
      },
    },
  };

  const jsonExample = `{
  "type": "FeatureCardGrid",
  "props": {
    "columns": "3",
    "gap": "md",
    "animated": true,
    "cards": [
      {
        "title": "Lightning Fast",
        "description": "Blazing fast performance",
        "icon": "Zap",
        "iconColor": "#FFB800",
        "variant": "default",
        "hoverEffect": "lift"
      },
      {
        "title": "Secure by Design",
        "description": "Enterprise-grade security",
        "icon": "Shield",
        "iconColor": "#4ECDC4",
        "variant": "gradient",
        "gradientFrom": "#667eea",
        "gradientTo": "#764ba2"
      },
      {
        "title": "Scale Infinitely",
        "description": "Auto-scaling infrastructure",
        "icon": "Rocket",
        "iconColor": "#FF6B6B",
        "badge": "Popular",
        "highlight": true,
        "cta": {
          "text": "Learn More",
          "variant": "default"
        }
      }
    ]
  }
}`;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Feature Card Block"
        description="Advanced feature card component with multiple variants, positioning options, and rich customization. Perfect for showcasing product features, services, or any highlighted content."
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/showcase/blocks"
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            ← Back to Blocks
          </Link>
          <Link
            to="/documentation"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            View Documentation
          </Link>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Examples Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(examples).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setActiveExample(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeExample === key
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Active Example */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{examples[activeExample].title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {examples[activeExample].description}
              </p>
            </div>

            <ShowcaseWrapper>
              {render(examples[activeExample].spec)}
            </ShowcaseWrapper>
          </div>

          {/* Code Examples */}
          <Tabs defaultValue="json" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="json">JSON Specification</TabsTrigger>
              <TabsTrigger value="props">Component Props</TabsTrigger>
            </TabsList>
            
            <TabsContent value="json" className="mt-6">
              <CodeBlock language="json">{jsonExample}</CodeBlock>
            </TabsContent>
            
            <TabsContent value="props" className="mt-6">
              <CodeBlock language="typescript">
{`interface FeatureCardProps {
  // Content
  title: string;
  description?: string;
  children?: React.ReactNode;
  
  // Icon
  icon?: LucideIcon | IconType | React.ReactNode;
  iconColor?: string;
  iconSize?: "sm" | "md" | "lg" | "xl";
  iconPosition?: "top" | "left" | "right" | "background";
  
  // Styling
  variant?: "default" | "highlighted" | "minimal" | "bordered" | "gradient" | "shadow" | "glass";
  align?: "left" | "center" | "right";
  borderStyle?: "none" | "solid" | "dashed" | "dotted" | "double";
  shadowSize?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  
  // Gradient options
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl" | "to-t" | "to-tr";
  
  // Badge
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  
  // Highlight
  highlight?: boolean;
  highlightColor?: string;
  
  // Call to Action
  cta?: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    onClick?: () => void;
    href?: string;
  };
  
  // Interaction
  link?: string;
  onClick?: () => void;
  hoverEffect?: "none" | "lift" | "glow" | "pulse" | "rotate";
  
  // Animation
  animated?: boolean;
  animationDelay?: number;
}

interface FeatureCardGridProps {
  cards: FeatureCardProps[];
  columns?: "1" | "2" | "3" | "4" | "auto";
  gap?: "sm" | "md" | "lg";
  animated?: boolean;
  staggerDelay?: number;
}`}
              </CodeBlock>
            </TabsContent>
          </Tabs>

          {/* Features */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🎨 Multiple Variants</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from default, gradient, glass, bordered, and shadow variants to match your design.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 Flexible Icon Positioning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Position icons on top, left, right, or as a subtle background element.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🚀 Built-in Animations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Smooth scroll animations and hover effects with customizable delays.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎪 Grid Layouts</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Automatic responsive grid layouts with 1-4 columns or auto-fit.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💎 Rich Customization</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Gradients, shadows, borders, badges, highlights, and CTAs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔗 React Icons Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Compatible with Lucide icons, React Icons, or custom icon components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}