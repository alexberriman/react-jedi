import { useState } from "react";
import { render } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../lib/meta";

export function HeroPreview() {
  usePageMetadata({
    title: "Hero Component",
    description:
      "React Jedi Hero component showcase featuring modern hero sections with various layouts.",
  });
  const [selectedExample, setSelectedExample] = useState("centered");

  const examples = {
    centered: {
      name: "Centered Hero",
      spec: {
        type: "hero",
        id: "centered-hero",
        title: "Welcome to the Future",
        subtitle: "Next Generation Platform",
        description:
          "Experience the power of modern web development with our cutting-edge tools and seamless integrations.",
        variant: "centered",
        primaryAction: {
          text: "Get Started",
          href: "#",
        },
        secondaryAction: {
          text: "Learn More",
          href: "#",
          variant: "outline",
        },
      },
    },
    leftAligned: {
      name: "Left-Aligned Hero",
      spec: {
        type: "hero",
        id: "left-hero",
        title: "Build Something Amazing",
        subtitle: "Developer First",
        description:
          "Create beautiful, responsive websites with our intuitive design system. No compromises on performance or accessibility.",
        variant: "left-aligned",
        primaryAction: {
          text: "Start Building",
          onClick: 'alert("Start building clicked!")',
        },
        secondaryAction: {
          text: "View Documentation",
          variant: "ghost",
        },
      },
    },
    split: {
      name: "Split Hero",
      spec: {
        type: "hero",
        id: "split-hero",
        title: "The Modern Way to Build",
        subtitle: "Revolutionary Design",
        description:
          "Transform your development workflow with our powerful component library and design system.",
        variant: "split",
        primaryAction: {
          text: "Try It Now",
        },
        secondaryAction: {
          text: "Watch Demo",
          variant: "secondary",
        },
        children: [
          {
            type: "box",
            className: "relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl",
            children: [
              {
                type: "image",
                src: "https://placehold.co/800x600/EEE/31343C",
                alt: "Team collaboration",
                className: "w-full h-full object-cover",
              },
            ],
          },
        ],
      },
    },
    withBackground: {
      name: "With Background Image",
      spec: {
        type: "hero",
        id: "bg-hero",
        title: "Innovate Without Limits",
        subtitle: "Enterprise Ready",
        description:
          "Scale your business with confidence using our enterprise-grade infrastructure.",
        backgroundImage: "https://placehold.co/1920x1080/EEE/31343C",
        backgroundOverlay: true,
        primaryAction: {
          text: "Request Demo",
        },
      },
    },
    gradient: {
      name: "With Gradient",
      spec: {
        type: "hero",
        id: "gradient-hero",
        title: "Design Beautiful Interfaces",
        subtitle: "UI/UX Excellence",
        description:
          "Create stunning user experiences with our modern design principles and components.",
        backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        primaryAction: {
          text: "Explore Components",
          variant: "secondary",
        },
        secondaryAction: {
          text: "View Examples",
          variant: "outline",
        },
      },
    },
  };

  const currentExample = examples[selectedExample];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Hero Component Preview</h1>
            <a
              href="/showcase"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              ← Back to Showcase
            </a>
          </div>
        </div>
      </div>

      {/* Example Selector */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                selectedExample === key
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                  : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:bg-zinc-700/50"
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>

        {/* Code Preview */}
        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-300 dark:border-zinc-700 mb-8">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              JSON Specification
            </span>
            <button
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:text-emerald-300 transition-colors"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(currentExample.spec, null, 2))
              }
            >
              Copy
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-700 dark:text-zinc-300">
              <code>{JSON.stringify(currentExample.spec, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="preview-container">{render({ specification: currentExample.spec })}</div>
    </div>
  );
}
