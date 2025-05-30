import { usePageMetadata } from "../../../lib/meta";

export function ThemingPage() {
  usePageMetadata({
    title: "Theming System",
    description:
      "React Jedi theming documentation - Comprehensive theme system with colors, typography, and customization.",
  });
  return (
    <div>
      <div className="relative">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-zinc-800 inline-block pr-8">
          Theming System
          <div className="absolute -bottom-1 left-0 w-24 h-[2px] bg-purple-500/50" />
        </h2>
      </div>

      <div className="prose prose-purple dark:prose-invert max-w-none">
        <p className="text-xl text-zinc-300 mb-6">
          React Jedi&apos;s theming system provides a powerful, flexible way to customize the
          appearance of your applications. Build beautifully themed interfaces that match any brand
          identity with our comprehensive design token system.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Theme Architecture</h3>
              <p className="text-zinc-400 mb-4">
                Our theming system is built on design tokens, CSS variables, and a cascading
                hierarchy that ensures consistency across your application.
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Design tokens for colors, typography, spacing, and more</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>CSS variable generation for runtime theming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Theme inheritance and composition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Responsive design systems</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Key Features</h3>
              <p className="text-zinc-400 mb-4">
                The theming system provides powerful features for creating consistent, beautiful
                interfaces.
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Light/dark mode with automatic detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Brand preset system for quick styling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Component-level style overrides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Fluid typography and responsive spacing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Theme Provider</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Wrap your application with the ThemeProvider to enable theming:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {`import { ThemeProvider } from "@banja/react-jedi";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Theme Structure</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Themes are structured JSON objects with comprehensive design tokens:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {`const customTheme = {
  colors: {
    primary: {
      50: "#f0f9ff",
      // ... 100-900 shades
      DEFAULT: "#3b82f6",
      foreground: "#ffffff"
    },
    secondary: { /* ... */ },
    accent: { /* ... */ },
    // Semantic colors
    success: { /* ... */ },
    warning: { /* ... */ },
    error: { /* ... */ },
    info: { /* ... */ }
  },
  typography: {
    fonts: {
      sans: "Inter, system-ui, sans-serif",
      serif: "Georgia, serif",
      mono: "JetBrains Mono, monospace"
    },
    sizes: {
      xs: { fontSize: "0.75rem", lineHeight: "1rem" },
      sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
      base: { fontSize: "1rem", lineHeight: "1.5rem" },
      lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
      // ... xl, 2xl, 3xl, etc.
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    scale: {
      xs: "0.5rem",
      sm: "0.75rem",
      base: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      // ... 2xl, 3xl, etc.
    },
    container: {
      padding: {
        default: "1rem",
        sm: "1.5rem",
        lg: "2rem"
      }
    }
  },
  radii: {
    none: "0",
    sm: "0.25rem",
    base: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
};`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Color System</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          The color system supports comprehensive palettes with automatic shade generation:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Primary Colors</h4>
              <p className="text-zinc-400 mb-4">
                Define your brand&apos;s primary color palette with automatic shade generation.
              </p>
              <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-sm">
                    {`primary: {
  50: "#f0f9ff",
  100: "#e0f2fe",
  // ... 200-800
  900: "#1e3a8a",
  DEFAULT: "#3b82f6",
  foreground: "#ffffff"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Semantic Colors</h4>
              <p className="text-zinc-400 mb-4">
                Use semantic colors for consistent messaging across your app.
              </p>
              <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-sm">
                    {`success: {
  DEFAULT: "#22c55e",
  foreground: "#ffffff"
},
error: {
  DEFAULT: "#ef4444",
  foreground: "#ffffff"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Color Modes</h4>
              <p className="text-zinc-400 mb-4">
                Support for light and dark modes with automatic system detection.
              </p>
              <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-sm">
                    {`modes: {
  light: {
    background: "#ffffff",
    foreground: "#000000"
  },
  dark: {
    background: "#000000",
    foreground: "#ffffff"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Typography System</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Create beautiful, readable text with our comprehensive typography system:
        </p>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group mb-8">
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-3 text-purple-400">Fluid Typography</h4>
            <p className="text-zinc-400 mb-4">
              Typography scales smoothly between breakpoints for optimal readability.
            </p>
            <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-sm">
                  {`typography: {
  fluid: {
    enabled: true,
    minScale: 1.067,  // Minor third
    maxScale: 1.250,  // Major third
    minViewport: 320,
    maxViewport: 1200
  },
  sizes: {
    base: {
      min: "16px",
      preferred: "clamp(16px, calc(1rem + 0.5vw), 18px)",
      max: "18px"
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Spacing System</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          A harmonious spacing system ensures consistent layouts:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Spacing Scale</h4>
              <p className="text-zinc-400 mb-4">
                Use consistent spacing values throughout your application.
              </p>
              <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-sm">
                    {`spacing: {
  base: 8, // Base unit in pixels
  scale: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem",  // 8px
    3: "0.75rem", // 12px
    4: "1rem",    // 16px
    // ... continue scale
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Responsive Spacing</h4>
              <p className="text-zinc-400 mb-4">
                Spacing adapts to different screen sizes automatically.
              </p>
              <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-sm">
                    {`responsive: {
  spacing: {
    sm: { scale: 0.875 },
    md: { scale: 1 },
    lg: { scale: 1.125 },
    xl: { scale: 1.25 }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Component Style Overrides</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Override component styles at the theme level for global consistency:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {`const theme = {
  components: {
    button: {
      base: {
        borderRadius: "theme.radii.lg",
        fontWeight: "theme.typography.weights.medium",
        transition: "all 0.2s ease"
      },
      variants: {
        primary: {
          background: "theme.colors.primary.DEFAULT",
          color: "theme.colors.primary.foreground",
          "&:hover": {
            background: "theme.colors.primary.600"
          }
        },
        secondary: {
          background: "theme.colors.secondary.DEFAULT",
          color: "theme.colors.secondary.foreground"
        }
      },
      sizes: {
        sm: {
          padding: "theme.spacing.2 theme.spacing.4",
          fontSize: "theme.typography.sizes.sm"
        },
        md: {
          padding: "theme.spacing.3 theme.spacing.6",
          fontSize: "theme.typography.sizes.base"
        }
      }
    }
  }
};`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Using the Theme Hook</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Access theme values in your components with the useTheme hook:
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {`import { useTheme } from "@banja/react-jedi";

function MyComponent() {
  const { theme, setTheme, colorMode, setColorMode } = useTheme();
  
  // Access theme values
  const primaryColor = theme.colors.primary.DEFAULT;
  const spacing = theme.spacing.scale.lg;
  
  // Toggle color mode
  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };
  
  return (
    <div style={{ 
      backgroundColor: primaryColor,
      padding: spacing 
    }}>
      <button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Brand Presets</h3>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Quickly apply beautiful themes with our pre-built brand presets:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Modern Tech</h4>
              <div className="h-32 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mb-4"></div>
              <p className="text-zinc-400">
                A sleek, modern theme perfect for tech startups and SaaS products.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Elegant Business</h4>
              <div className="h-32 rounded-lg bg-gradient-to-br from-slate-600 to-zinc-600 mb-4"></div>
              <p className="text-zinc-400">
                Professional and sophisticated for corporate websites.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-900/50 transition duration-300 group">
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Creative Agency</h4>
              <div className="h-32 rounded-lg bg-gradient-to-br from-pink-600 to-orange-600 mb-4"></div>
              <p className="text-zinc-400">
                Bold and vibrant for creative agencies and portfolios.
              </p>
            </div>
          </div>
        </div>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
              {`import { brandPresets } from "@banja/react-jedi";

// Use a pre-built brand preset
const modernTechTheme = brandPresets.modernTech;
const businessTheme = brandPresets.elegantBusiness;
const creativeTheme = brandPresets.creativeAgency;

// Or create your own based on a preset
const customTheme = {
  ...brandPresets.modernTech,
  colors: {
    ...brandPresets.modernTech.colors,
    primary: {
      ...brandPresets.modernTech.colors.primary,
      DEFAULT: "#ff6b6b"
    }
  }
};`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-purple-400">Best Practices</h3>
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden p-6">
          <ul className="space-y-3 text-zinc-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">1.</span>
              <span>
                <strong>Use semantic color names</strong> - Name colors by their purpose (primary,
                secondary, success) rather than their appearance (blue, green).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">2.</span>
              <span>
                <strong>Maintain consistency</strong> - Use your spacing scale and typography system
                consistently throughout your application.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">3.</span>
              <span>
                <strong>Design for accessibility</strong> - Ensure color contrast ratios meet WCAG
                guidelines, especially in dark mode.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">4.</span>
              <span>
                <strong>Test across modes</strong> - Always test your themes in both light and dark
                modes.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">5.</span>
              <span>
                <strong>Use theme tokens</strong> - Reference theme values instead of hard-coding
                colors and spacing.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
