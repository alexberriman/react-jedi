import React from "react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";
import { Heading, Text, spacing, padding } from "../../components/ui";
import { PageHeader } from "../../components/ui/page-header";

export const ThemingPage: React.FC = () => {
  usePageMetadata({
    title: "Theming",
    description:
      "React Jedi theming system - Customize colors, typography, spacing, and more with a comprehensive theme engine.",
  });
  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Theme System"
        description="Explore React Jedi's powerful theming capabilities with dynamic theme switching, custom color palettes, and real-time preview."
      />
      
      <div className={`container mx-auto ${padding.container} py-8`}>
        <div className="max-w-6xl mx-auto">

          <div
            className={`bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl ${padding.card} ${spacing.subsection}`}
          >
            <Heading
              as="h2"
              size="subsection"
              className={`text-gray-900 dark:text-white ${spacing.heading}`}
            >
              Theming Capabilities
            </Heading>
            <Text variant="muted" className={spacing.small}>
              Explore React Jedi&apos;s powerful theming system with dynamic customization, color
              palettes, and real-time preview.
            </Text>
            <div className="space-y-6">
              <Link to="/theming/playground" className="block group">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                        Interactive Theme Playground
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Customize colors, typography, spacing, and more with our live theme editor
                      </p>
                    </div>
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      <svg
                        className="w-6 h-6"
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
                </div>
              </Link>

              <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Multiple theme presets (Modern, Glassmorphic, Minimal)</li>
                <li>Real-time theme switching with live preview</li>
                <li>Custom color picker for all theme colors</li>
                <li>Typography scale and font adjustments</li>
                <li>Border radius and shadow system controls</li>
                <li>Export custom theme configurations</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-3 text-zinc-900 dark:text-white">
                Default Theme
              </h3>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-blue-500" title="Primary" />
                <div className="w-8 h-8 rounded bg-green-500" title="Secondary" />
                <div className="w-8 h-8 rounded bg-amber-500" title="Accent" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Clean and professional look with balanced colors.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-3 text-zinc-900 dark:text-white">Dark Theme</h3>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-blue-400" title="Primary" />
                <div className="w-8 h-8 rounded bg-green-400" title="Secondary" />
                <div className="w-8 h-8 rounded bg-yellow-400" title="Accent" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Modern dark mode with adjusted color brightness.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-3 text-zinc-900 dark:text-white">
                Vibrant Theme
              </h3>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-pink-500" title="Primary" />
                <div className="w-8 h-8 rounded bg-purple-500" title="Secondary" />
                <div className="w-8 h-8 rounded bg-cyan-500" title="Accent" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Bold and energetic with vivid color choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
