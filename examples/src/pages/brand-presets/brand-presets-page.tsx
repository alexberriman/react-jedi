/**
 * Brand Presets Page
 *
 * Showcase all available brand presets and demonstrate theme generation
 */

import React, { useState } from "react";
import { usePageMetadata } from "../../lib/meta";
import { PageHeader } from "../../components/ui/page-header";
import {
  brandPresets,
  generateBrandTheme,
  type BrandPreset,
  type BrandCategory,
  ThemeProvider,
  generateCssVariables,
} from "@alexberriman/react-jedi";

// Helper functions for nested ternaries
function getBorderRadius(playfulness: number, minimalism: number): string {
  if (playfulness > 70) return "24px";
  if (minimalism > 70) return "8px";
  return "16px";
}

function getDivBorderRadius(playfulness: number): string {
  return playfulness > 70 ? "12px" : "4px";
}

function getButtonBorderRadius(playfulness: number, minimalism: number): string {
  if (playfulness > 70) return "24px";
  if (minimalism > 70) return "4px";
  return "8px";
}

function getCardBorderRadius(playfulness: number): string {
  return playfulness > 70 ? "16px" : "8px";
}

function getCardTextSize(body: number): string {
  return body < 0.9 ? "14px" : "16px";
}

function getCodeBlockRadius(playfulness: number): string {
  return playfulness > 70 ? "16px" : "8px";
}

interface PresetCardProps {
  preset: BrandPreset;
  onSelect: (preset: BrandPreset) => void;
  isSelected: boolean;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, onSelect, isSelected }) => {
  const theme = generateBrandTheme({ preset: preset.id }).theme;
  const cssVars = generateCssVariables(theme);

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer
        ${isSelected ? "border-purple-500 shadow-lg scale-105" : "border-gray-700 hover:border-gray-600"}
      `}
      onClick={() => onSelect(preset)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(preset)}
      role="button"
      tabIndex={0}
      style={{
        ...cssVars.style,
        borderRadius: getBorderRadius(preset.personality.playful, preset.personality.minimal),
      }}
    >
      <div className="p-6 bg-gray-900/50 backdrop-blur-sm">
        <h3
          className="text-xl font-bold mb-2"
          style={{
            color: preset.colors.primary,
            fontFamily: preset.typography.fontFamily?.heading,
          }}
        >
          {preset.name}
        </h3>
        <p
          className="text-sm mb-4"
          style={{
            color: preset.colors.neutral || "#718096",
          }}
        >
          {preset.description}
        </p>

        {/* Color palette */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div
                className="w-6 h-6 rounded transition-transform hover:scale-110"
                style={{
                  backgroundColor: preset.colors.primary,
                  borderRadius: getDivBorderRadius(preset.personality.playful),
                }}
                title="Primary"
              />
              {preset.colors.secondary && (
                <div
                  className="w-6 h-6 rounded transition-transform hover:scale-110"
                  style={{
                    backgroundColor: preset.colors.secondary,
                    borderRadius: getDivBorderRadius(preset.personality.playful),
                  }}
                  title="Secondary"
                />
              )}
              {preset.colors.accent && (
                <div
                  className="w-6 h-6 rounded transition-transform hover:scale-110"
                  style={{
                    backgroundColor: preset.colors.accent,
                    borderRadius: getDivBorderRadius(preset.personality.playful),
                  }}
                  title="Accent"
                />
              )}
            </div>
            <span className="text-xs text-gray-500 ml-auto">Colors</span>
          </div>

          {/* Typography preview */}
          <div className="text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: preset.typography.fontFamily?.heading,
                  color: preset.colors.primary,
                }}
              >
                Aa
              </span>
              <span className="text-gray-500 truncate flex-1">
                {preset.typography.fontFamily?.heading?.split(",")[0]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: preset.typography.fontFamily?.body,
                  color: preset.colors.neutral,
                }}
              >
                Aa
              </span>
              <span className="text-gray-500 truncate flex-1">
                {preset.typography.fontFamily?.body?.split(",")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Personality traits */}
        <div className="space-y-1.5">
          {Object.entries(preset.personality)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([trait, value]) => (
              <div key={trait} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16 capitalize">{trait}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${value}%`,
                      backgroundColor: preset.colors.primary,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6">{value}</span>
              </div>
            ))}
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-zinc-900 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface LivePreviewProps {
  preset: BrandPreset;
}

const NavigationBar: React.FC<{ preset: BrandPreset }> = ({ preset }) => (
  <nav className="px-8 py-6 border-b" style={{ borderColor: preset.colors.neutral + "20" }}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div
          className="text-2xl font-bold"
          style={{
            fontFamily: preset.typography.fontFamily?.heading,
            color: preset.colors.primary,
          }}
        >
          {preset.name}
        </div>
        <div className="flex gap-6">
          {["Products", "Features", "Pricing", "About"].map((item) => (
            <button
              key={item}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{
                fontFamily: preset.typography.fontFamily?.body,
                color: preset.colors.neutral,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <button
        className="px-5 py-2 rounded-lg font-medium transition-transform hover:scale-105"
        style={{
          backgroundColor: preset.colors.primary,
          color: preset.colors.background || "#FFFFFF",
          borderRadius: getButtonBorderRadius(
            preset.personality.playful,
            preset.personality.minimal
          ),
        }}
      >
        Get Started
      </button>
    </div>
  </nav>
);

const HeroSection: React.FC<{ preset: BrandPreset }> = ({ preset }) => (
  <section className="px-8 py-16 text-center">
    <h1
      className="text-5xl font-bold mb-4"
      style={{
        fontFamily: preset.typography.fontFamily?.heading,
        color: preset.colors.primary,
        letterSpacing: preset.typography.letterSpacing,
      }}
    >
      Welcome to {preset.name}
    </h1>
    <p
      className="text-xl mb-8 max-w-2xl mx-auto"
      style={{
        fontFamily: preset.typography.fontFamily?.body,
        color: preset.colors.neutral,
        lineHeight: preset.typography.lineHeight,
      }}
    >
      Experience our {preset.description.toLowerCase()}. Built for modern businesses who value
      innovation and quality.
    </p>
    <div className="flex gap-4 justify-center">
      <button
        className="px-8 py-3 font-semibold transition-all hover:shadow-lg"
        style={{
          backgroundColor: preset.colors.primary,
          color: preset.colors.background || "#FFFFFF",
          borderRadius: getButtonBorderRadius(
            preset.personality.playful,
            preset.personality.minimal
          ),
        }}
      >
        Start Free Trial
      </button>
      <button
        className="px-8 py-3 font-semibold transition-all hover:shadow-lg"
        style={{
          backgroundColor: "transparent",
          color: preset.colors.primary,
          border: `2px solid ${preset.colors.primary}`,
          borderRadius: getButtonBorderRadius(
            preset.personality.playful,
            preset.personality.minimal
          ),
        }}
      >
        View Demo
      </button>
    </div>
  </section>
);

const ComponentsShowcase: React.FC<{ preset: BrandPreset }> = ({ preset }) => (
  <section
    className="px-8 py-16"
    style={{
      backgroundColor: preset.colors.neutral + "08",
    }}
  >
    <h2
      className="text-3xl font-bold text-center mb-12"
      style={{
        fontFamily: preset.typography.fontFamily?.heading,
        color: preset.colors.primary,
      }}
    >
      Component Styles
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Buttons */}
      <div className="space-y-4">
        <h3
          className="text-lg font-semibold"
          style={{
            fontFamily: preset.typography.fontFamily?.heading,
            color: preset.colors.primary,
          }}
        >
          Buttons
        </h3>
        <div className="flex gap-4 flex-wrap">
          <button
            className="px-6 py-2 font-medium transition-all hover:shadow-lg"
            style={{
              backgroundColor: preset.colors.primary,
              color: preset.colors.background || "#FFFFFF",
              borderRadius: getButtonBorderRadius(
                preset.personality.playful,
                preset.personality.minimal
              ),
            }}
          >
            Primary
          </button>
          <button
            className="px-6 py-2 font-medium border-2 transition-all hover:shadow-lg"
            style={{
              borderColor: preset.colors.primary,
              color: preset.colors.primary,
              backgroundColor: "transparent",
              borderRadius: getButtonBorderRadius(
                preset.personality.playful,
                preset.personality.minimal
              ),
            }}
          >
            Secondary
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="space-y-4">
        <h3
          className="text-lg font-semibold"
          style={{
            fontFamily: preset.typography.fontFamily?.heading,
            color: preset.colors.primary,
          }}
        >
          Forms
        </h3>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full px-4 py-2 transition-all focus:shadow-lg"
          style={{
            borderRadius: getDivBorderRadius(preset.personality.playful),
            border: `2px solid ${preset.colors.neutral}30`,
            fontFamily: preset.typography.fontFamily?.body,
            color: preset.colors.foreground,
            backgroundColor: preset.colors.background,
          }}
        />
      </div>
    </div>
  </section>
);

const FeaturesSection: React.FC<{ preset: BrandPreset }> = ({ preset }) => (
  <section className="px-8 py-16">
    <h2
      className="text-3xl font-bold text-center mb-12"
      style={{
        fontFamily: preset.typography.fontFamily?.heading,
        color: preset.colors.primary,
      }}
    >
      Core Features
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Innovation", icon: "💡", description: "Cutting-edge technology solutions" },
        { title: "Quality", icon: "⭐", description: "Premium service and support" },
        { title: "Excellence", icon: "🏆", description: "Industry-leading performance" },
      ].map((feature) => (
        <div
          key={feature.title}
          className="p-8 rounded-xl transition-transform hover:scale-105 hover:shadow-xl"
          style={{
            backgroundColor: preset.colors.primary + "08",
            borderRadius: getCardBorderRadius(preset.personality.playful),
            boxShadow: `0 4px 12px ${preset.colors.primary}10`,
          }}
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3
            className="text-xl font-bold mb-3"
            style={{
              fontFamily: preset.typography.fontFamily?.heading,
              color: preset.colors.primary,
            }}
          >
            {feature.title}
          </h3>
          <p
            style={{
              fontFamily: preset.typography.fontFamily?.body,
              color: preset.colors.neutral,
            }}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const LivePreview: React.FC<LivePreviewProps> = ({ preset }) => {
  const theme = generateBrandTheme({ preset: preset.id }).theme;

  return (
    <ThemeProvider theme={theme}>
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: preset.colors.background || "#FFFFFF",
          color: preset.colors.foreground || "#000000",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-0">
          <NavigationBar preset={preset} />
          <HeroSection preset={preset} />
          <FeaturesSection preset={preset} />
          <ComponentsShowcase preset={preset} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export const BrandPresetsPage: React.FC = () => {
  usePageMetadata({
    title: "Brand Presets",
    description:
      "React Jedi brand presets - Pre-built themes for various industries and styles with one-click customization.",
  });

  const [selectedPreset, setSelectedPreset] = useState<BrandPreset>(brandPresets["tech-startup"]);
  const [selectedCategory, setSelectedCategory] = useState<BrandCategory | "all">("all");
  const [viewMode, setViewMode] = useState<"preview" | "comparison">("preview");
  const [comparePreset, setComparePreset] = useState<BrandPreset>(brandPresets["finance"]);

  const categories: (BrandCategory | "all")[] = [
    "all",
    "technology",
    "finance",
    "healthcare",
    "education",
    "creative",
    "minimal",
    "luxury",
    "startup",
  ];

  const filteredPresets = Object.values(brandPresets).filter(
    (preset) => selectedCategory === "all" || preset.category === selectedCategory
  );

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Brand Preset Themes"
        description="Professionally designed themes for every industry and style. Choose from our curated collection of brand presets or customize them to match your unique vision."
      />
      
      <div className="container mx-auto px-4 py-8">

        {/* View mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-1 inline-flex">
            <button
              onClick={() => setViewMode("preview")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "preview"
                  ? "bg-purple-600 text-zinc-900 dark:text-white"
                  : "text-gray-300 hover:text-zinc-900 dark:text-white"
              }`}
            >
              Preview Mode
            </button>
            <button
              onClick={() => setViewMode("comparison")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "comparison"
                  ? "bg-purple-600 text-zinc-900 dark:text-white"
                  : "text-gray-300 hover:text-zinc-900 dark:text-white"
              }`}
            >
              Compare Themes
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-zinc-900 dark:text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
                }
              `}
            >
              {category === "all"
                ? "All Themes"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {viewMode === "preview" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Preset list */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-3">
                  <span className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    🎨
                  </span>
                  Theme Library
                </h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredPresets.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      preset={preset}
                      onSelect={setSelectedPreset}
                      isSelected={selectedPreset.id === preset.id}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Live preview */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    👁️
                  </span>
                  Live Preview
                </h2>
                <LivePreview preset={selectedPreset} />
              </div>

              {/* Code snippet */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    💻
                  </span>
                  Implementation Code
                </h3>
                <pre className="p-6 bg-white dark:bg-black/50 border border-gray-700 text-gray-300 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
                  <code>{`import { generateBrandTheme, ThemeProvider } from "@alexberriman/react-jedi";

// Generate theme from preset
const { theme } = generateBrandTheme({ 
  preset: "${selectedPreset.id}",
  // Optional: customize specific values
  overrides: {
    colors: {
      primary: "#custom-color"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left preset */}
            <div className="space-y-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Theme A</h3>
                <select
                  value={selectedPreset.id}
                  onChange={(e) => setSelectedPreset(brandPresets[e.target.value])}
                  className="w-full p-3 bg-gray-700 text-zinc-900 dark:text-white rounded-lg mb-6"
                >
                  {Object.values(brandPresets).map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name}
                    </option>
                  ))}
                </select>
                <LivePreview preset={selectedPreset} />
              </div>
            </div>

            {/* Right preset */}
            <div className="space-y-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Theme B</h3>
                <select
                  value={comparePreset.id}
                  onChange={(e) => setComparePreset(brandPresets[e.target.value])}
                  className="w-full p-3 bg-gray-700 text-zinc-900 dark:text-white rounded-lg mb-6"
                >
                  {Object.values(brandPresets).map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name}
                    </option>
                  ))}
                </select>
                <LivePreview preset={comparePreset} />
              </div>
            </div>
          </div>
        )}

        {/* Theme statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { label: "Total Themes", value: Object.keys(brandPresets).length, icon: "🎨" },
            { label: "Categories", value: categories.length - 1, icon: "📁" },
            { label: "Color Variants", value: "Unlimited", icon: "🌈" },
            { label: "Typography Options", value: "Custom", icon: "✏️" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
