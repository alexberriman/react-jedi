import * as React from "react";
import { render } from "@alexberriman/react-jedi";
import type { ComponentSpec } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseLayout } from "../../../../components/layouts/showcase-layout";
import { CodeBlock } from "../../../../components/ui/code-block";
import { Tabs } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

// Example specifications
const horizontalBar: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "horizontal",
    url: "https://example.com/article",
    title: "Check out this amazing article!",
    platforms: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
    showLabels: true,
    size: "md",
    animated: true,
  },
};

const verticalSidebar: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "vertical",
    url: "https://example.com/blog-post",
    title: "Interesting Blog Post",
    platforms: ["twitter", "facebook", "linkedin", "copy"],
    showLabels: false,
    sticky: true,
    size: "md",
    animated: true,
  },
};

const floatingButton: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "floating",
    position: "bottom-right",
    url: "https://example.com/page",
    title: "Share this page",
    platforms: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
    animated: true,
  },
};

const modalShare: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "modal",
    url: "https://example.com/content",
    title: "Great Content to Share",
    description: "This is an amazing piece of content worth sharing",
    platforms: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
    animated: true,
  },
};

const minimalIcons: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "minimal",
    url: "https://example.com/minimal",
    title: "Minimal Share Example",
    size: "sm",
    showLabels: false,
    platforms: ["twitter", "facebook", "copy"],
  },
};

const brandColors: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "horizontal",
    colorScheme: "brand",
    url: "https://example.com/brand",
    title: "Brand Colored Share Buttons",
    showLabels: true,
    platforms: ["twitter", "facebook", "linkedin", "reddit"],
  },
};

const withShareCounts: ComponentSpec = {
  type: "SocialShareBar",
  props: {
    variant: "horizontal",
    url: "https://example.com/popular",
    title: "Popular Article",
    showCounts: true,
    counts: {
      twitter: 234,
      facebook: 1523,
      linkedin: 89,
      reddit: 456,
    },
    platforms: ["twitter", "facebook", "linkedin", "reddit"],
  },
};

const integratedInArticle: ComponentSpec = {
  type: "Container",
  props: {
    className: "max-w-3xl mx-auto p-6",
  },
  children: [
    {
      type: "Heading",
      props: {
        as: "h1",
        size: "display",
        className: "mb-4",
      },
      children: "How to Build Modern Web Applications",
    },
    {
      type: "Flex",
      props: {
        justify: "between",
        align: "center",
        className: "mb-8 pb-4 border-b",
      },
      children: [
        {
          type: "Text",
          props: {
            size: "small",
            variant: "muted",
          },
          children: "By John Doe • March 15, 2024 • 5 min read",
        },
        {
          type: "SocialShareBar",
          props: {
            variant: "horizontal",
            size: "sm",
            showLabels: false,
            url: "https://example.com/article",
            title: "How to Build Modern Web Applications",
            platforms: ["twitter", "facebook", "linkedin", "copy"],
          },
        },
      ],
    },
    {
      type: "Text",
      props: {
        className: "mb-6",
      },
      children:
        "In today's fast-paced digital world, building modern web applications requires a deep understanding of various technologies and best practices. This comprehensive guide will walk you through the essential steps and considerations.",
    },
    {
      type: "Box",
      props: {
        className: "my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg",
      },
      children: [
        {
          type: "Heading",
          props: {
            as: "h3",
            size: "card",
            className: "mb-2",
          },
          children: "Enjoyed this article?",
        },
        {
          type: "Text",
          props: {
            variant: "muted",
            className: "mb-4",
          },
          children: "Share it with your network!",
        },
        {
          type: "SocialShareBar",
          props: {
            variant: "horizontal",
            colorScheme: "brand",
            showLabels: true,
            url: "https://example.com/article",
            title: "How to Build Modern Web Applications",
            platforms: ["twitter", "facebook", "linkedin", "reddit", "email"],
          },
        },
      ],
    },
  ],
};

export function SocialShareBarShowcasePage() {
  usePageMetadata({
    title: "Social Share Bar Block",
    description: "Content sharing component with multiple platforms and layout variants",
  });

  const [selectedDemo, setSelectedDemo] = React.useState<string>("horizontal");
  const [showFloating, setShowFloating] = React.useState(false);

  const demos = {
    horizontal: {
      title: "Horizontal Bar",
      description: "Standard horizontal layout with labels",
      spec: horizontalBar,
    },
    vertical: {
      title: "Vertical Sidebar",
      description: "Sticky vertical layout for blog posts",
      spec: verticalSidebar,
    },
    floating: {
      title: "Floating Button",
      description: "Expandable floating share button",
      spec: floatingButton,
    },
    modal: {
      title: "Modal Trigger",
      description: "Opens share options in a modal",
      spec: modalShare,
    },
    minimal: {
      title: "Minimal Icons",
      description: "Compact icon-only layout",
      spec: minimalIcons,
    },
    brand: {
      title: "Brand Colors",
      description: "Social platform brand colors",
      spec: brandColors,
    },
    counts: {
      title: "With Share Counts",
      description: "Display share counts for each platform",
      spec: withShareCounts,
    },
    integrated: {
      title: "Article Integration",
      description: "Integrated within article content",
      spec: integratedInArticle,
    },
  };

  const currentDemo = demos[selectedDemo as keyof typeof demos];

  return (
    <ShowcaseLayout
      title="Social Share Bar"
      description="Enable content sharing across multiple social platforms with customizable layouts, animations, and styling options."
      features={[
        "Multiple layout variants (horizontal, vertical, floating, modal)",
        "Support for major social platforms",
        "Customizable button sizes and labels",
        "Share count display (with API integration)",
        "Copy link functionality with feedback",
        "Smooth animations and transitions",
        "Mobile-responsive design",
        "Accessibility features included",
      ]}
      api={[
        {
          prop: "variant",
          type: "'horizontal' | 'vertical' | 'floating' | 'modal' | 'minimal'",
          default: "'horizontal'",
          description: "The layout variant of the share bar",
        },
        {
          prop: "url",
          type: "string",
          default: "current page URL",
          description: "The URL to share",
        },
        {
          prop: "title",
          type: "string",
          default: "document.title",
          description: "The title/text to share",
        },
        {
          prop: "description",
          type: "string",
          description: "Additional description for the share",
        },
        {
          prop: "platforms",
          type: "Array<'twitter' | 'facebook' | 'linkedin' | 'reddit' | 'email' | 'copy'>",
          default: "['twitter', 'facebook', 'linkedin', 'reddit', 'email', 'copy']",
          description: "Platforms to include in the share bar",
        },
        {
          prop: "position",
          type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right'",
          default: "'bottom-right'",
          description: "Position when using floating variant",
        },
        {
          prop: "showCounts",
          type: "boolean",
          default: "false",
          description: "Whether to show share counts",
        },
        {
          prop: "counts",
          type: "Record<string, number>",
          description: "Custom share counts object",
        },
        {
          prop: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "Size of the share buttons",
        },
        {
          prop: "showLabels",
          type: "boolean",
          default: "true for horizontal",
          description: "Whether to show labels with icons",
        },
        {
          prop: "colorScheme",
          type: "'default' | 'brand' | 'monochrome' | 'gradient'",
          default: "'default'",
          description: "Color scheme for the buttons",
        },
        {
          prop: "sticky",
          type: "boolean",
          default: "true",
          description: "Whether the floating variant should be sticky",
        },
        {
          prop: "animated",
          type: "boolean",
          default: "true",
          description: "Whether to animate the component",
        },
        {
          prop: "onShare",
          type: "(platform: string) => void",
          description: "Callback when a platform is shared",
        },
      ]}
      examples={[
        {
          title: "Basic Horizontal Bar",
          description: "Simple horizontal share bar with all platforms",
          code: JSON.stringify(horizontalBar, null, 2),
        },
        {
          title: "Vertical Sticky Sidebar",
          description: "Perfect for blog posts and articles",
          code: JSON.stringify(verticalSidebar, null, 2),
        },
        {
          title: "Floating Share Button",
          description: "Expandable floating button that stays visible",
          code: JSON.stringify(floatingButton, null, 2),
        },
        {
          title: "Modal Share Dialog",
          description: "Opens share options in a modal overlay",
          code: JSON.stringify(modalShare, null, 2),
        },
      ]}
    >
      <div className="space-y-8">
        {/* Demo Selector */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Interactive Demo</h3>
            {selectedDemo === "floating" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFloating(!showFloating)}
              >
                {showFloating ? "Hide" : "Show"} Floating Button
              </Button>
            )}
          </div>
          <Tabs
            value={selectedDemo}
            onValueChange={setSelectedDemo}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(demos).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDemo(key)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    selectedDemo === key
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  {demo.title}
                </button>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Demo Display */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="p-6">
            <h4 className="font-medium mb-2">{currentDemo.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {currentDemo.description}
            </p>
            <div
              className={cn(
                "bg-white dark:bg-gray-800 rounded-lg p-8",
                selectedDemo === "floating" && "relative h-64 overflow-hidden",
                selectedDemo === "vertical" && "flex justify-end"
              )}
            >
              {(() => {
                if (selectedDemo === "floating") {
                  if (showFloating) {
                    return render(currentDemo.spec);
                  }
                  return (
                    <div className="text-center text-gray-500">
                      Click &ldquo;Show Floating Button&rdquo; to see the demo
                    </div>
                  );
                }
                return render(currentDemo.spec);
              })()}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Code Example</h3>
          <CodeBlock language="json">
            {JSON.stringify(currentDemo.spec, null, 2)}
          </CodeBlock>
        </div>

        {/* Platform Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Supported Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Twitter/X", icon: "🐦", color: "#1DA1F2" },
              { name: "Facebook", icon: "📘", color: "#1877F2" },
              { name: "LinkedIn", icon: "💼", color: "#0A66C2" },
              { name: "Reddit", icon: "🟠", color: "#FF4500" },
              { name: "Email", icon: "✉️", color: "#6B7280" },
              { name: "Copy Link", icon: "🔗", color: "#6B7280" },
            ].map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p
                    className="text-xs"
                    style={{ color: platform.color }}
                  >
                    {platform.color}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
            Usage Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Use horizontal layout for article headers and footers</li>
            <li>• Vertical sidebar works great for long-form content</li>
            <li>• Floating buttons are ideal for mobile experiences</li>
            <li>• Consider using brand colors for better recognition</li>
            <li>• Enable share counts only if you have reliable data</li>
            <li>• Test the copy link functionality on different devices</li>
          </ul>
        </div>
      </div>
    </ShowcaseLayout>
  );
}