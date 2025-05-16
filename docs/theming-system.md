# React Jedi Theming System

React Jedi provides a powerful, flexible theming system that enables you to create beautifully styled applications with consistent design patterns. This document covers the technical details and implementation patterns of our theming system.

## Table of Contents

- [Overview](#overview)
- [Theme Architecture](#theme-architecture)
- [Theme Provider](#theme-provider)
- [Theme Structure](#theme-structure)
- [Color System](#color-system)
- [Typography System](#typography-system)
- [Spacing System](#spacing-system)
- [Layout Tokens](#layout-tokens)
- [Component Styling](#component-styling)
- [Brand Presets](#brand-presets)
- [Advanced Features](#advanced-features)
- [Performance Considerations](#performance-considerations)
- [Migration Guide](#migration-guide)

## Overview

The React Jedi theming system is built on several core principles:

1. **Design Tokens**: All visual properties are defined as tokens
2. **CSS Variables**: Runtime theming through CSS custom properties
3. **Type Safety**: Full TypeScript support for theme objects
4. **Inheritance**: Themes can extend and override parent themes
5. **Responsive**: Built-in support for responsive design
6. **Performance**: Optimized for minimal runtime overhead

## Theme Architecture

### Design Token Hierarchy

```
Theme
├── Colors
│   ├── Primitive Colors (base palettes)
│   ├── Semantic Colors (purpose-based)
│   └── Component Colors (specific to components)
├── Typography
│   ├── Font Families
│   ├── Font Sizes
│   ├── Font Weights
│   └── Line Heights
├── Spacing
│   ├── Base Unit
│   ├── Scale
│   └── Component Spacing
├── Layout
│   ├── Breakpoints
│   ├── Border Radii
│   ├── Shadows
│   └── Z-indices
└── Components
    └── Component-specific overrides
```

### CSS Variable Generation

The theme system automatically generates CSS variables from your theme object:

```typescript
const theme = {
  colors: {
    primary: {
      500: '#3b82f6'
    }
  }
};

// Generates:
// --colors-primary-500: #3b82f6;
```

## Theme Provider

The `ThemeProvider` component wraps your application and provides theme context:

```typescript
import { ThemeProvider } from '@banja/react-jedi';
import { customTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Theme Provider Props

```typescript
interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
  mode?: 'light' | 'dark' | 'system';
  enableColorModeToggle?: boolean;
  disableTransitions?: boolean;
  cssVariablePrefix?: string;
}
```

## Theme Structure

### Complete Theme Object

```typescript
interface Theme {
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  radii: BorderRadiusScale;
  shadows: ShadowScale;
  breakpoints: BreakpointScale;
  zIndices: ZIndexScale;
  transitions: TransitionScale;
  components?: ComponentStyleOverrides;
}
```

### Example Theme

```typescript
const theme: Theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      // ... 200-800
      900: '#1e3a8a',
      DEFAULT: '#3b82f6',
      foreground: '#ffffff'
    },
    secondary: {
      // ... color scale
    },
    // Semantic colors
    success: {
      DEFAULT: '#22c55e',
      foreground: '#ffffff'
    },
    error: {
      DEFAULT: '#ef4444',
      foreground: '#ffffff'
    },
    warning: {
      DEFAULT: '#f59e0b',
      foreground: '#000000'
    },
    info: {
      DEFAULT: '#3b82f6',
      foreground: '#ffffff'
    },
    // UI colors
    background: {
      DEFAULT: '#ffffff',
      secondary: '#f3f4f6',
      tertiary: '#e5e7eb'
    },
    foreground: {
      DEFAULT: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af'
    },
    muted: {
      DEFAULT: '#f3f4f6',
      foreground: '#6b7280'
    },
    border: {
      DEFAULT: '#e5e7eb',
      secondary: '#d1d5db'
    }
  },
  typography: {
    fonts: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      serif: 'Georgia, "Times New Roman", serif',
      mono: 'Menlo, Monaco, Consolas, monospace',
      display: 'Cal Sans, sans-serif'
    },
    sizes: {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      base: { fontSize: '1rem', lineHeight: '1.5rem' },
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
      '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { fontSize: '3rem', lineHeight: '1' },
      '6xl': { fontSize: '3.75rem', lineHeight: '1' },
      '7xl': { fontSize: '4.5rem', lineHeight: '1' },
      '8xl': { fontSize: '6rem', lineHeight: '1' },
      '9xl': { fontSize: '8rem', lineHeight: '1' }
    },
    weights: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    fluid: {
      enabled: true,
      minScale: 1.067,  // Minor third
      maxScale: 1.250,  // Major third
      minViewport: 320,
      maxViewport: 1200
    }
  },
  spacing: {
    base: 8,
    scale: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem'
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem'
      }
    }
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    none: 'none'
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },
  transitions: {
    durations: {
      faster: '75ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms'
    },
    timingFunctions: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};
```

## Color System

### Color Palettes

The color system supports both primitive and semantic colors:

```typescript
interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
  DEFAULT: string;
  foreground: string;
}
```

### Color Modes

React Jedi supports light and dark modes with automatic switching:

```typescript
interface ColorModes {
  light: ColorModeTokens;
  dark: ColorModeTokens;
}

// Usage
const { colorMode, setColorMode } = useTheme();

// Toggle between modes
setColorMode(colorMode === 'light' ? 'dark' : 'light');

// Use system preference
setColorMode('system');
```

### Generating Color Shades

Use the color generator utility to create complete palettes:

```typescript
import { generateColorPalette } from '@banja/react-jedi';

const primaryPalette = generateColorPalette('#3b82f6');
// Generates shades 50-950 from the base color
```

## Typography System

### Font Families

Define font stacks for different text styles:

```typescript
const typography = {
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Georgia, serif',
    mono: 'JetBrains Mono, monospace',
    display: 'Cal Sans, sans-serif'
  }
};
```

### Fluid Typography

Enable responsive typography that scales smoothly:

```typescript
const typography = {
  fluid: {
    enabled: true,
    minScale: 1.067,  // Scale ratio at minimum viewport
    maxScale: 1.250,  // Scale ratio at maximum viewport
    minViewport: 320,
    maxViewport: 1200
  }
};
```

### Type Scale

Define consistent font sizes:

```typescript
const sizes = {
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  base: { fontSize: '1rem', lineHeight: '1.5rem' },
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
  // ... more sizes
};
```

## Spacing System

### Base Unit

Define a base unit for consistent spacing:

```typescript
const spacing = {
  base: 8, // 8px base unit
  scale: {
    1: '0.25rem',  // 4px (base/2)
    2: '0.5rem',   // 8px (base)
    3: '0.75rem',  // 12px (base*1.5)
    4: '1rem',     // 16px (base*2)
    // ... more values
  }
};
```

### Responsive Spacing

Adjust spacing based on viewport size:

```typescript
const responsive = {
  spacing: {
    sm: { scale: 0.875 },  // Smaller spacing on mobile
    md: { scale: 1 },      // Default spacing
    lg: { scale: 1.125 },  // Larger spacing on desktop
    xl: { scale: 1.25 }
  }
};
```

### Container Spacing

Define consistent padding for containers:

```typescript
const container = {
  padding: {
    DEFAULT: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem'
  }
};
```

## Layout Tokens

### Border Radius

```typescript
const radii = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
};
```

### Shadows

```typescript
const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  none: 'none'
};
```

### Z-Index

```typescript
const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
```

## Component Styling

### Style Overrides

Override component styles at the theme level:

```typescript
const theme = {
  components: {
    button: {
      base: {
        borderRadius: 'theme.radii.lg',
        fontWeight: 'theme.typography.weights.medium',
        transition: 'all 0.2s ease'
      },
      variants: {
        primary: {
          background: 'theme.colors.primary.DEFAULT',
          color: 'theme.colors.primary.foreground',
          '&:hover': {
            background: 'theme.colors.primary.600'
          }
        },
        secondary: {
          background: 'theme.colors.secondary.DEFAULT',
          color: 'theme.colors.secondary.foreground'
        }
      },
      sizes: {
        sm: {
          padding: 'theme.spacing.2 theme.spacing.4',
          fontSize: 'theme.typography.sizes.sm'
        },
        md: {
          padding: 'theme.spacing.3 theme.spacing.6',
          fontSize: 'theme.typography.sizes.base'
        }
      }
    },
    card: {
      base: {
        borderRadius: 'theme.radii.lg',
        padding: 'theme.spacing.6',
        boxShadow: 'theme.shadows.md'
      }
    }
  }
};
```

### Style Extension

Extend component styles without full override:

```typescript
import { extendTheme } from '@banja/react-jedi';

const extendedTheme = extendTheme(baseTheme, {
  components: {
    button: {
      variants: {
        ghost: {
          background: 'transparent',
          border: '1px solid theme.colors.border.DEFAULT',
          '&:hover': {
            background: 'theme.colors.background.secondary'
          }
        }
      }
    }
  }
});
```

## Brand Presets

React Jedi includes pre-built brand presets for quick theming:

```typescript
import { brandPresets } from '@banja/react-jedi';

// Available presets
const modernTech = brandPresets.modernTech;
const elegantBusiness = brandPresets.elegantBusiness;
const creativeAgency = brandPresets.creativeAgency;
const minimalClean = brandPresets.minimalClean;
const vibrantEnergy = brandPresets.vibrantEnergy;
const darkProfessional = brandPresets.darkProfessional;

// Use a preset
const theme = brandPresets.modernTech;

// Extend a preset
const customTheme = extendTheme(brandPresets.modernTech, {
  colors: {
    primary: {
      DEFAULT: '#ff6b6b'
    }
  }
});
```

### Creating Custom Presets

```typescript
const myBrandPreset = {
  name: 'My Brand',
  colors: {
    primary: generateColorPalette('#0070f3'),
    secondary: generateColorPalette('#ff0080'),
    // ... other colors
  },
  typography: {
    fonts: {
      sans: 'Helvetica Neue, sans-serif',
      display: 'Bebas Neue, cursive'
    }
  },
  // ... other theme properties
};
```

## Advanced Features

### Theme Hooks

Access theme values in components:

```typescript
import { useTheme, useThemeValue } from '@banja/react-jedi';

// Full theme access
function MyComponent() {
  const { theme, colorMode, setColorMode } = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary.DEFAULT }}>
      Current mode: {colorMode}
    </div>
  );
}

// Single value access
function MyButton() {
  const primaryColor = useThemeValue('colors.primary.DEFAULT');
  const spacing = useThemeValue('spacing.scale.4');
  
  return (
    <button style={{ 
      backgroundColor: primaryColor,
      padding: spacing 
    }}>
      Click me
    </button>
  );
}
```

### Responsive Props

Use responsive values in specifications:

```typescript
const spec = {
  type: 'box',
  padding: {
    default: 'theme.spacing.4',
    sm: 'theme.spacing.6',
    md: 'theme.spacing.8',
    lg: 'theme.spacing.10'
  },
  margin: {
    default: 'theme.spacing.2',
    lg: 'theme.spacing.4'
  }
};
```

### Dynamic Themes

Create themes that respond to user preferences:

```typescript
import { createDynamicTheme } from '@banja/react-jedi';

const dynamicTheme = createDynamicTheme({
  base: baseTheme,
  modes: {
    light: lightOverrides,
    dark: darkOverrides
  },
  features: {
    reduceMotion: reducedMotionOverrides,
    highContrast: highContrastOverrides
  }
});
```

### Theme Composition

Compose themes from multiple sources:

```typescript
import { composeThemes } from '@banja/react-jedi';

const composedTheme = composeThemes(
  baseTheme,
  brandTheme,
  seasonalTheme,
  userPreferences
);
```

## Performance Considerations

### CSS Variable Optimization

The theme system optimizes CSS variable generation:

1. **Lazy Generation**: Variables are only generated when used
2. **Caching**: Theme computations are cached
3. **Minimal DOM Updates**: Only changed variables are updated

### Theme Switching Performance

```typescript
// Disable transitions during theme changes
<ThemeProvider 
  theme={theme} 
  disableTransitions={isThemeSwitching}
>
  {children}
</ThemeProvider>
```

### Bundle Size

Minimize theme bundle size:

```typescript
// Import only needed presets
import { modernTech } from '@banja/react-jedi/presets/modern-tech';

// Tree-shake unused theme properties
const minimalTheme = {
  colors: theme.colors,
  typography: theme.typography,
  spacing: theme.spacing
  // Omit unused properties
};
```

## Migration Guide

### From v1 to v2

The v2 theme system introduces breaking changes:

```typescript
// v1 (old)
const theme = {
  colors: {
    primary: '#3b82f6',
    primaryDark: '#2563eb'
  }
};

// v2 (new)
const theme = {
  colors: {
    primary: {
      DEFAULT: '#3b82f6',
      600: '#2563eb',
      foreground: '#ffffff'
    }
  }
};
```

### Migration Helper

Use the migration helper to convert v1 themes:

```typescript
import { migrateTheme } from '@banja/react-jedi/migrate';

const v2Theme = migrateTheme(v1Theme);
```

## Best Practices

1. **Use semantic tokens**: Name colors by purpose, not appearance
2. **Design for accessibility**: Ensure sufficient color contrast
3. **Test color modes**: Always test both light and dark modes
4. **Use theme references**: Reference theme values instead of hardcoding
5. **Optimize for performance**: Use theme composition wisely
6. **Document custom themes**: Include comments explaining design decisions
7. **Version your themes**: Keep theme versions for backward compatibility

## Troubleshooting

### Common Issues

1. **CSS variables not updating**
   - Ensure ThemeProvider is at the root of your app
   - Check that theme object is properly structured

2. **Type errors with theme values**
   - Update TypeScript types when extending themes
   - Use proper type imports

3. **Performance issues**
   - Avoid recreating theme objects on every render
   - Use theme composition for large themes

4. **Color mode not persisting**
   - Implement persistence with localStorage
   - Handle SSR hydration properly

### Debug Mode

Enable theme debugging:

```typescript
<ThemeProvider 
  theme={theme} 
  debug={process.env.NODE_ENV === 'development'}
>
  {children}
</ThemeProvider>
```

This will log theme changes and CSS variable updates to the console.