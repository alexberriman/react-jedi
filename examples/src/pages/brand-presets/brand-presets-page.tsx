/**
 * Brand Presets Page
 *
 * Showcase all available brand presets and demonstrate theme generation
 */

import React, { useState } from "react";
import {
  brandPresets,
  generateBrandTheme,
  type BrandPreset,
  type BrandCategory,
  ThemeProvider,
  generateCssVariables,
} from "@banja/react-jedi";

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
        ${isSelected ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"}
      `}
      onClick={() => onSelect(preset)}
      style={cssVars.style}
    >
      <div className="p-6 bg-white dark:bg-gray-900">
        <h3 className="text-xl font-bold mb-2" style={{ color: preset.colors.primary }}>
          {preset.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {preset.description}
        </p>
        
        {/* Color swatches */}
        <div className="flex gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg shadow-sm"
            style={{ backgroundColor: preset.colors.primary }}
            title="Primary"
          />
          {preset.colors.secondary && (
            <div
              className="w-8 h-8 rounded-lg shadow-sm"
              style={{ backgroundColor: preset.colors.secondary }}
              title="Secondary"
            />
          )}
          {preset.colors.accent && (
            <div
              className="w-8 h-8 rounded-lg shadow-sm"
              style={{ backgroundColor: preset.colors.accent }}
              title="Accent"
            />
          )}
        </div>
        
        {/* Personality traits */}
        <div className="space-y-2">
          {Object.entries(preset.personality).map(([trait, value]) => (
            <div key={trait} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-20 capitalize">{trait}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface LivePreviewProps {
  preset: BrandPreset;
}

const LivePreview: React.FC<LivePreviewProps> = ({ preset }) => {
  const theme = generateBrandTheme({ preset: preset.id }).theme;

  return (
    <ThemeProvider theme={theme}>
      <div className="p-8 rounded-2xl border-2 border-gray-200 bg-[var(--color-background)]">
        <style>
          {`
            :root {
              --color-background: ${preset.colors.background || "#FFFFFF"};
              --color-foreground: ${preset.colors.foreground || "#000000"};
            }
          `}
        </style>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero section */}
          <section className="text-center py-12">
            <h1
              className="text-5xl font-bold mb-4"
              style={{
                fontFamily: preset.typography.fontFamily?.heading,
                color: preset.colors.primary,
              }}
            >
              Welcome to {preset.name}
            </h1>
            <p
              className="text-xl text-gray-600 mb-8"
              style={{
                fontFamily: preset.typography.fontFamily?.body,
                color: preset.colors.neutral,
              }}
            >
              Experience our {preset.description.toLowerCase()}
            </p>
            <button
              className="px-8 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
              style={{
                backgroundColor: preset.colors.primary,
                borderRadius: preset.personality.playful > 70 ? "24px" : "8px",
              }}
            >
              Get Started
            </button>
          </section>
          
          {/* Features section */}
          <section className="grid md:grid-cols-3 gap-6">
            {["Innovation", "Quality", "Excellence"].map((feature, i) => (
              <div
                key={feature}
                className="p-6 rounded-xl shadow-sm"
                style={{
                  backgroundColor: i === 0 ? preset.colors.primary + "10" :
                                 i === 1 ? preset.colors.secondary + "10" :
                                          preset.colors.accent + "10",
                  borderRadius: preset.personality.minimal > 70 ? "8px" : "16px",
                }}
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: preset.typography.fontFamily?.heading,
                    color: i === 0 ? preset.colors.primary :
                           i === 1 ? preset.colors.secondary :
                                    preset.colors.accent,
                  }}
                >
                  {feature}
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: preset.typography.fontFamily?.body,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </section>
          
          {/* Typography showcase */}
          <section className="space-y-4">
            <h2
              className="text-3xl font-bold"
              style={{
                fontFamily: preset.typography.fontFamily?.heading,
                color: preset.colors.primary,
              }}
            >
              Typography Showcase
            </h2>
            <p
              className="text-lg"
              style={{
                fontFamily: preset.typography.fontFamily?.body,
                color: preset.colors.foreground,
              }}
            >
              This is body text using {preset.typography.fontFamily?.body}
            </p>
            <pre
              className="p-4 rounded-lg bg-gray-100"
              style={{
                fontFamily: preset.typography.fontFamily?.mono,
              }}
            >
              {`const theme = "${preset.id}";`}
            </pre>
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const BrandPresetsPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<BrandPreset>(
    brandPresets["tech-startup"]
  );
  const [selectedCategory, setSelectedCategory] = useState<BrandCategory | "all">("all");

  const categories: (BrandCategory | "all")[] = [
    "all",
    "technology",
    "finance",
    "healthcare",
    "education",
    "retail",
    "creative",
    "professional",
    "minimal",
    "luxury",
    "startup",
  ];

  const filteredPresets = Object.values(brandPresets).filter(
    (preset) => selectedCategory === "all" || preset.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🎨 Brand Preset Themes</h1>
          <p className="text-xl text-gray-600">
            Professionally designed themes for every industry and style
          </p>
        </header>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preset list */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Available Presets</h2>
            <div className="space-y-4">
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
          
          {/* Live preview */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
            <LivePreview preset={selectedPreset} />
            
            {/* Code snippet */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <pre className="p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                <code>{`import { generateBrandTheme, ThemeProvider } from "@banja/react-jedi";

const { theme } = generateBrandTheme({ preset: "${selectedPreset.id}" });

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
      </div>
    </div>
  );
};