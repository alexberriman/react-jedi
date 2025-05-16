# Theme System

React Jedi features a powerful and flexible theme system that provides consistent styling across your application. The theme system is built on design tokens and supports dark mode, responsive design, and runtime theme switching.

## Overview

The theme system provides:
- **Design tokens** for consistent values
- **Dark mode** support with automatic switching
- **Responsive utilities** for adaptive designs
- **Runtime theme switching** for dynamic UIs
- **CSS variable integration** for performance
- **Type-safe theme access** through TypeScript

## Theme Structure

```typescript
interface Theme {
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  breakpoints: BreakpointTokens;
  radii: RadiusTokens;
  shadows: ShadowTokens;
  transitions: TransitionTokens;
  zIndices: ZIndexTokens;
  container: ContainerTokens;
}
```

## Color System

### Color Tokens

The color system uses semantic naming and provides a full palette:

```typescript
interface ColorTokens {
  // Brand colors
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  
  // Neutral colors
  neutral: ColorScale;
  
  // Semantic colors
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  
  // Surface colors
  background: string;
  foreground: string;
  card: string;
  popover: string;
  
  // Component colors
  border: string;
  input: string;
  ring: string;
  
  // State colors
  hover: string;
  focus: string;
  disabled: string;
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Default
  600: string;
  700: string;
  800: string;
  900: string;
}
```

### Using Colors

```json
{
  "type": "Box",
  "background": "primary.500",
  "color": "primary.foreground",
  "children": "Themed content"
}
```

### Dark Mode

Colors automatically adapt to dark mode:

```typescript
const theme = {
  colors: {
    background: {
      light: "#ffffff",
      dark: "#0a0a0a"
    },
    foreground: {
      light: "#0a0a0a",
      dark: "#ffffff"
    }
  }
};
```

## Spacing System

The spacing system uses a consistent scale:

```typescript
interface SpacingTokens {
  0: "0";
  1: "0.25rem";  // 4px
  2: "0.5rem";   // 8px
  3: "0.75rem";  // 12px
  4: "1rem";     // 16px
  5: "1.25rem";  // 20px
  6: "1.5rem";   // 24px
  8: "2rem";     // 32px
  10: "2.5rem";  // 40px
  12: "3rem";    // 48px
  16: "4rem";    // 64px
  20: "5rem";    // 80px
  24: "6rem";    // 96px
  32: "8rem";    // 128px
  40: "10rem";   // 160px
  48: "12rem";   // 192px
  56: "14rem";   // 224px
  64: "16rem";   // 256px
}
```

### Using Spacing

```json
{
  "type": "Box",
  "padding": 4,
  "margin": { "top": 8, "bottom": 8 },
  "children": "Spaced content"
}
```

## Typography System

### Font Families

```typescript
interface TypographyTokens {
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  fontSizes: FontSizeScale;
  fontWeights: FontWeightScale;
  lineHeights: LineHeightScale;
  letterSpacings: LetterSpacingScale;
}
```

### Type Scale

```typescript
interface FontSizeScale {
  xs: "0.75rem";    // 12px
  sm: "0.875rem";   // 14px
  base: "1rem";     // 16px
  lg: "1.125rem";   // 18px
  xl: "1.25rem";    // 20px
  "2xl": "1.5rem";  // 24px
  "3xl": "1.875rem"; // 30px
  "4xl": "2.25rem"; // 36px
  "5xl": "3rem";    // 48px
  "6xl": "3.75rem"; // 60px
  "7xl": "4.5rem";  // 72px
  "8xl": "6rem";    // 96px
  "9xl": "8rem";    // 128px
}
```

### Using Typography

```json
{
  "type": "Text",
  "fontSize": "lg",
  "fontWeight": "semibold",
  "lineHeight": "relaxed",
  "children": "Styled text"
}
```

## Responsive Design

### Breakpoints

```typescript
interface BreakpointTokens {
  sm: "640px";
  md: "768px";
  lg: "1024px";
  xl: "1280px";
  "2xl": "1536px";
}
```

### Responsive Values

Most style properties support responsive values:

```json
{
  "type": "Box",
  "padding": {
    "base": 4,
    "md": 6,
    "lg": 8
  },
  "fontSize": {
    "base": "base",
    "md": "lg",
    "lg": "xl"
  },
  "children": "Responsive content"
}
```

## Radius System

```typescript
interface RadiusTokens {
  none: "0";
  sm: "0.125rem";
  base: "0.25rem";
  md: "0.375rem";
  lg: "0.5rem";
  xl: "0.75rem";
  "2xl": "1rem";
  "3xl": "1.5rem";
  full: "9999px";
}
```

### Using Border Radius

```json
{
  "type": "Box",
  "borderRadius": "lg",
  "children": "Rounded content"
}
```

## Shadow System

```typescript
interface ShadowTokens {
  none: "none";
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1)";
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1)";
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)";
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)";
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)";
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)";
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.06)";
}
```

### Using Shadows

```json
{
  "type": "Card",
  "shadow": "md",
  "hoverShadow": "lg",
  "children": "Elevated content"
}
```

## Theme Provider

### Setting Up Theme

```typescript
import { ThemeProvider } from '@banja/react-jedi';

const customTheme = {
  colors: {
    primary: {
      500: "#6366f1"
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Using Theme in Specifications

```json
{
  "type": "UISpecification",
  "theme": {
    "colors": {
      "primary": {
        "500": "#6366f1"
      }
    }
  },
  "root": {
    "type": "Container",
    "children": []
  }
}
```

## CSS Variables

Themes are compiled to CSS variables for optimal performance:

```css
:root {
  --colors-primary-500: #6366f1;
  --spacing-4: 1rem;
  --radii-lg: 0.5rem;
  --shadows-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## Dark Mode

### Automatic Dark Mode

```typescript
const theme = {
  colorMode: {
    defaultMode: "system", // "light" | "dark" | "system"
    storageKey: "ui-color-mode",
    disableTransition: false
  }
};
```

### Color Mode Toggle

```json
{
  "type": "ColorModeToggle",
  "variant": "icon"
}
```

## Theme Presets

React Jedi includes pre-built theme presets:

```typescript
import { presets } from '@banja/react-jedi/themes';

const themes = {
  modern: presets.modern,
  classic: presets.classic,
  vibrant: presets.vibrant,
  minimal: presets.minimal,
  dark: presets.dark
};
```

## Custom Themes

### Creating a Custom Theme

```typescript
const customTheme = {
  name: "My Brand",
  colors: {
    primary: generateColorScale("#ff6b6b"),
    secondary: generateColorScale("#4ecdc4")
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif"
  },
  spacing: {
    ...defaultTheme.spacing,
    7: "1.75rem" // Custom spacing
  }
};
```

### Theme Extension

```typescript
const extendedTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    brand: generateColorScale("#8b5cf6")
  }
};
```

## Best Practices

1. Use semantic color names (primary, secondary) not literal colors
2. Leverage the spacing scale for consistent rhythm
3. Use theme tokens instead of arbitrary values
4. Design mobile-first with responsive values
5. Test both light and dark modes
6. Create component-specific theme extensions
7. Document custom theme tokens

## Performance

- CSS variables enable zero-runtime theme switching
- Theme values are memoized for performance
- Responsive values use CSS media queries
- Dark mode uses CSS custom properties

## TypeScript Support

Access theme values with full type safety:

```typescript
interface ComponentProps {
  theme: Theme;
}

function MyComponent({ theme }: ComponentProps) {
  const primaryColor = theme.colors.primary[500];
  const spacing = theme.spacing[4];
}
```