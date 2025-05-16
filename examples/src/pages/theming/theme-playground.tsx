import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "@banja/react-jedi";
import type { Theme } from "@banja/react-jedi";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
  Badge,
  Avatar,
  Separator,
  Flex,
  Box,
  Grid,
  Container,
  Input,
  Label,
  Skeleton,
} from "@banja/react-jedi";

interface ThemePlaygroundProps {
  initialTheme?: Theme;
}

function ComponentShowcase(): React.ReactElement {
  const { theme } = useTheme();
  // Accessing theme for demo purposes
  console.log("Current theme:", theme);

  return (
    <div className="space-y-8">
      {/* Typography Showcase */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Typography</h3>
        <div className="space-y-4">
          <Heading level={1}>Heading Level 1</Heading>
          <Heading level={2}>Heading Level 2</Heading>
          <Heading level={3}>Heading Level 3</Heading>
          <Text size="lg">Large text example with the current font family</Text>
          <Text>Regular text showing the base font size and line height</Text>
          <Text size="sm" className="text-muted-foreground">
            Small muted text for secondary content
          </Text>
        </div>
      </section>

      <Separator />

      {/* Colors Showcase */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Color System</h3>
        <Grid columns={3} gap={4}>
          <Card>
            <CardHeader>
              <CardTitle>Primary</CardTitle>
              <CardDescription>Main brand color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-primary rounded-md mb-2" />
              <Button>Primary Button</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secondary</CardTitle>
              <CardDescription>Supporting color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-secondary rounded-md mb-2" />
              <Button variant="secondary">Secondary Button</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accent</CardTitle>
              <CardDescription>Highlight color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-accent rounded-md mb-2" />
              <Button variant="ghost">Accent Button</Button>
            </CardContent>
          </Card>
        </Grid>
      </section>

      <Separator />

      {/* Components Showcase */}
      <section>
        <h3 className="text-lg font-semibold mb-4">UI Components</h3>
        <Grid columns={2} gap={6}>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>Shows border radius and shadow system</CardDescription>
              </CardHeader>
              <CardContent>
                <Flex gap={2}>
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </Flex>
              </CardContent>
            </Card>

            <Box className="space-y-2">
              <Label htmlFor="example">Input Example</Label>
              <Input id="example" placeholder="Type something..." className="w-full" />
            </Box>
          </div>

          <div className="space-y-4">
            <Flex gap={4} align="center">
              <Avatar src="https://github.com/shadcn.png" alt="Avatar" fallback="CN" />
              <div>
                <Text className="font-semibold">User Name</Text>
                <Text size="sm" className="text-muted-foreground">
                  user@example.com
                </Text>
              </div>
            </Flex>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <Flex gap={2}>
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </Flex>
          </div>
        </Grid>
      </section>
    </div>
  );
}

function ThemeControls({
  theme,
  onThemeChange,
}: Readonly<{
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}>): React.ReactElement {
  const updateTheme = (updates: Partial<Theme>) => {
    onThemeChange({ ...theme, ...updates });
  };

  const updateColors = (colorUpdates: Partial<Theme["colors"]>) => {
    updateTheme({
      colors: { ...theme.colors, ...colorUpdates },
    });
  };

  const updateTypography = (typographyUpdates: Partial<Theme["typography"]>) => {
    updateTheme({
      typography: { ...theme.typography, ...typographyUpdates },
    });
  };

  const updateBorderRadius = (radiusUpdates: Partial<Theme["borderRadius"]>) => {
    updateTheme({
      borderRadius: { ...theme.borderRadius, ...radiusUpdates },
    });
  };

  // Theme presets
  const presets = {
    modern: {
      colors: {
        primary: "#0ea5e9",
        secondary: "#8b5cf6",
        accent: "#f59e0b",
        background: "#ffffff",
        foreground: "#0f172a",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        full: "9999px",
      },
      shadows: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      },
    },
    glassmorphic: {
      colors: {
        primary: "#3b82f6",
        secondary: "#a855f7",
        accent: "#14b8a6",
        background: "#f8fafc",
        foreground: "#0f172a",
        muted: "#e2e8f0",
        mutedForeground: "#475569",
      },
      borderRadius: {
        none: "0",
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        full: "9999px",
      },
      shadows: {
        sm: "0 2px 4px 0 rgb(0 0 0 / 0.05)",
        md: "0 6px 12px -2px rgb(0 0 0 / 0.1)",
        lg: "0 15px 30px -3px rgb(0 0 0 / 0.1)",
        xl: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      },
    },
    minimal: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#666666",
        background: "#ffffff",
        foreground: "#000000",
        muted: "#f5f5f5",
        mutedForeground: "#666666",
      },
      borderRadius: {
        none: "0",
        sm: "0",
        md: "0",
        lg: "0",
        full: "0",
      },
      shadows: {
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Preset Themes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Theme Presets</h3>
        <Grid columns={3} gap={4}>
          {Object.entries(presets).map(([name, preset]) => (
            <Button
              key={name}
              variant="outline"
              className="h-auto flex-col items-start p-4"
              onClick={() => updateTheme(preset)}
            >
              <span className="font-semibold capitalize">{name}</span>
              <span className="text-xs text-muted-foreground mt-1">Apply {name} theme preset</span>
            </Button>
          ))}
        </Grid>
      </section>

      <Separator />

      {/* Color Controls */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Colors</h3>
        <Grid columns={2} gap={4}>
          <div className="space-y-2">
            <Label htmlFor="primary">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary"
                type="color"
                value={theme.colors?.primary || "#000000"}
                onChange={(e) => updateColors({ primary: e.target.value })}
                className="h-10 w-20"
              />
              <Input
                value={theme.colors?.primary || "#000000"}
                onChange={(e) => updateColors({ primary: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary"
                type="color"
                value={theme.colors?.secondary || "#666666"}
                onChange={(e) => updateColors({ secondary: e.target.value })}
                className="h-10 w-20"
              />
              <Input
                value={theme.colors?.secondary || "#666666"}
                onChange={(e) => updateColors({ secondary: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accent"
                type="color"
                value={theme.colors?.accent || "#0ea5e9"}
                onChange={(e) => updateColors({ accent: e.target.value })}
                className="h-10 w-20"
              />
              <Input
                value={theme.colors?.accent || "#0ea5e9"}
                onChange={(e) => updateColors({ accent: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="background"
                type="color"
                value={theme.colors?.background || "#ffffff"}
                onChange={(e) => updateColors({ background: e.target.value })}
                className="h-10 w-20"
              />
              <Input
                value={theme.colors?.background || "#ffffff"}
                onChange={(e) => updateColors({ background: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </Grid>
      </section>

      <Separator />

      {/* Typography Controls */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Typography</h3>
        <Grid columns={2} gap={4}>
          <div className="space-y-2">
            <Label htmlFor="font-sans">Sans Serif Font</Label>
            <Input
              id="font-sans"
              value={theme.typography?.fontFamily?.sans || "system-ui"}
              onChange={(e) =>
                updateTypography({
                  fontFamily: {
                    ...theme.typography?.fontFamily,
                    sans: e.target.value,
                  },
                })
              }
              placeholder="system-ui, -apple-system, sans-serif"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-mono">Monospace Font</Label>
            <Input
              id="font-mono"
              value={theme.typography?.fontFamily?.mono || "monospace"}
              onChange={(e) =>
                updateTypography({
                  fontFamily: {
                    ...theme.typography?.fontFamily,
                    mono: e.target.value,
                  },
                })
              }
              placeholder="Menlo, Monaco, monospace"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="base-size">Base Font Size</Label>
            <div className="flex gap-2">
              <Input
                id="base-size"
                type="range"
                min="14"
                max="20"
                value={Number.parseInt(theme.typography?.fontSize?.base || "16")}
                onChange={(e) =>
                  updateTypography({
                    fontSize: {
                      ...theme.typography?.fontSize,
                      base: `${e.target.value}px`,
                    },
                  })
                }
                className="flex-1"
              />
              <span className="w-16 text-sm text-muted-foreground">
                {theme.typography?.fontSize?.base || "16px"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="line-height">Line Height</Label>
            <div className="flex gap-2">
              <Input
                id="line-height"
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={Number.parseFloat(theme.typography?.lineHeight?.normal || "1.5")}
                onChange={(e) =>
                  updateTypography({
                    lineHeight: {
                      ...theme.typography?.lineHeight,
                      normal: e.target.value,
                    },
                  })
                }
                className="flex-1"
              />
              <span className="w-16 text-sm text-muted-foreground">
                {theme.typography?.lineHeight?.normal || "1.5"}
              </span>
            </div>
          </div>
        </Grid>
      </section>

      <Separator />

      {/* Border Radius Controls */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
        <Grid columns={2} gap={4}>
          <div className="space-y-2">
            <Label htmlFor="radius-sm">Small</Label>
            <Input
              id="radius-sm"
              value={theme.borderRadius?.sm || "0.25rem"}
              onChange={(e) => updateBorderRadius({ sm: e.target.value })}
              placeholder="0.25rem"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius-md">Medium</Label>
            <Input
              id="radius-md"
              value={theme.borderRadius?.md || "0.5rem"}
              onChange={(e) => updateBorderRadius({ md: e.target.value })}
              placeholder="0.5rem"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius-lg">Large</Label>
            <Input
              id="radius-lg"
              value={theme.borderRadius?.lg || "0.75rem"}
              onChange={(e) => updateBorderRadius({ lg: e.target.value })}
              placeholder="0.75rem"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius-full">Full</Label>
            <Input
              id="radius-full"
              value={theme.borderRadius?.full || "9999px"}
              onChange={(e) => updateBorderRadius({ full: e.target.value })}
              placeholder="9999px"
            />
          </div>
        </Grid>
      </section>

      {/* Export Theme */}
      <section>
        <Button
          onClick={() => {
            const themeJson = JSON.stringify(theme, null, 2);
            const blob = new Blob([themeJson], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "custom-theme.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full"
        >
          Export Theme Configuration
        </Button>
      </section>
    </div>
  );
}

function ThemePlayground({ initialTheme }: Readonly<ThemePlaygroundProps>): React.ReactElement {
  const defaultTheme: Theme = {
    colors: {
      primary: "#0ea5e9",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      background: "#ffffff",
      foreground: "#0f172a",
      muted: "#f1f5f9",
      mutedForeground: "#64748b",
      card: "#ffffff",
      cardForeground: "#0f172a",
      popover: "#ffffff",
      popoverForeground: "#0f172a",
      border: "#e2e8f0",
      input: "#e2e8f0",
      ring: "#0ea5e9",
      destructive: "#ef4444",
      destructiveForeground: "#ffffff",
    },
    typography: {
      fontFamily: {
        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
    },
    spacing: {
      scale: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        24: "6rem",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    },
  };

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-background text-foreground min-h-screen">
        <Container>
          <div className="py-8">
            <Grid columns={1} xl={2} gap={8}>
              {/* Controls Panel */}
              <div className="order-2 xl:order-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Controls</CardTitle>
                    <CardDescription>Customize your theme in real-time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ThemeControls theme={theme} onThemeChange={setTheme} />
                  </CardContent>
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="order-1 xl:order-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>See your theme changes applied instantly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ComponentShowcase />
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export function ThemePlaygroundPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Container>
        <div className="py-8">
          <nav className="mb-8">
            <Link to="/theming" className="text-cyan-600 hover:text-cyan-700 transition-colors">
              ← Back to Theming
            </Link>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Theme Playground
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Create stunning custom themes with our interactive playground. Adjust colors,
              typography, spacing, and more to match your brand perfectly.
            </p>
          </div>
        </div>
      </Container>

      <ThemePlayground />
    </div>
  );
}
