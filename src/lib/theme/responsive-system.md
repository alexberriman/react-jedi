# Responsive System Documentation

The React Jedi responsive system provides a comprehensive solution for handling responsive design across all theme tokens. It includes support for media queries, container queries, and responsive variants of design tokens.

## Table of Contents

1. [Overview](#overview)
2. [Breakpoints](#breakpoints)
3. [Responsive Values](#responsive-values)
4. [Media Queries](#media-queries)
5. [Container Queries](#container-queries)
6. [Responsive Tokens](#responsive-tokens)
7. [Usage Examples](#usage-examples)
8. [Advanced Patterns](#advanced-patterns)

## Overview

The responsive system consists of three main modules:

- **`responsive-system.ts`**: Core breakpoint management and responsive utilities
- **`responsive-variants.ts`**: Responsive design tokens and token utilities  
- **`container-queries.ts`**: CSS Container Queries support

## Breakpoints

### Default Breakpoints

```typescript
const DEFAULT_BREAKPOINTS = {
  xs: "480px",
  sm: "640px", 
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
```

### Custom Breakpoints

You can define custom breakpoints in your theme:

```typescript
const theme: ThemeSpecification = {
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    desktop: "1200px",
    wide: "1920px",
  }
};
```

## Responsive Values

Responsive values can be defined in three formats:

### 1. Single Value

```typescript
const value = "1rem"; // Same value for all breakpoints
```

### 2. Object Format

```typescript
const value = {
  base: "1rem",
  md: "1.5rem",
  lg: "2rem",
};
```

### 3. Array Format (Mobile-First)

```typescript
const value = ["1rem", "1.5rem", "2rem"]; // Maps to [base, xs, sm, ...]
```

## Media Queries

### Basic Usage

```typescript
import { generateMediaQuery, createMediaQueries } from "@banja/react-jedi/theme";

// Single media query
const mdQuery = generateMediaQuery("md"); // "@media (min-width: 768px)"

// Create all media queries
const queries = createMediaQueries();
// {
//   xs: "@media (min-width: 480px)",
//   sm: "@media (min-width: 640px)",
//   ...
// }
```

### Advanced Options

```typescript
// Max-width query
const maxMd = generateMediaQuery("md", DEFAULT_BREAKPOINTS, { 
  type: "max-width" 
});

// With orientation
const landscape = generateMediaQuery("md", DEFAULT_BREAKPOINTS, {
  orientation: "landscape"
});

// With preferences
const darkMode = generateMediaQuery("md", DEFAULT_BREAKPOINTS, {
  prefers: "dark"
});
```

### Responsive Utilities

```typescript
import { useResponsive } from "@banja/react-jedi/theme";

const responsive = useResponsive(theme);

// Generate queries
const md = responsive.up("md");     // min-width: 768px
const sm = responsive.down("sm");   // max-width: 640px
const range = responsive.between("sm", "lg"); // between sm and lg

// Get responsive values
const padding = responsive.getValue(
  { base: "1rem", md: "2rem" }, 
  "md"
); // "2rem"

// Map values to CSS
const styles = responsive.mapValues(
  "padding",
  { base: "1rem", md: "2rem" },
  v => v
);
```

## Container Queries

Container queries enable component-level responsive design:

### Container Setup

```typescript
import { createContainerDefinition } from "@banja/react-jedi/theme";

// Define a container
const containerCSS = createContainerDefinition(".card", {
  name: "card",
  type: "inline-size",
});
// ".card { container-name: card; container-type: inline-size; }"
```

### Query Builders

```typescript
import { containerQuery } from "@banja/react-jedi/theme";

// Various query types
const minWidth = containerQuery.minWidth("400px");
const maxWidth = containerQuery.maxWidth("800px");
const between = containerQuery.between("400px", "800px");
const exact = containerQuery.width("600px");
const ratio = containerQuery.aspectRatio("16/9");
const portrait = containerQuery.orientation("portrait");

// With container name
const cardQuery = containerQuery.minWidth("400px", "card");
```

### Container Responsive Values

```typescript
const styles = {
  padding: {
    base: "1rem",
    "@container (min-width: 400px)": "1.5rem",
    "@container card (min-width: 600px)": "2rem",
  }
};
```

## Responsive Tokens

Create responsive design tokens that adapt to different breakpoints:

### Creating Responsive Tokens

```typescript
import { 
  createResponsiveColorToken,
  createResponsiveSpacingToken,
  createResponsiveTypographyToken 
} from "@banja/react-jedi/theme";

// Color token
const primaryColor = createResponsiveColorToken(
  "primary",
  "Primary Color",
  { base: "#3B82F6", md: "#2563EB", lg: "#1D4ED8" },
  theme
);

// Spacing token
const spacing = createResponsiveSpacingToken(
  "gap",
  "Component Gap",
  { base: "1rem", md: "1.5rem", lg: "2rem" },
  theme
);

// Typography token
const fontSize = createResponsiveTypographyToken(
  "body", 
  "Body Text Size",
  { base: "14px", md: "16px", lg: "18px" },
  theme
);
```

### Using Responsive Tokens

```typescript
import { createResponsiveTokenUtils } from "@banja/react-jedi/theme";

const tokenUtils = createResponsiveTokenUtils(theme);

// Get value at breakpoint
const mdValue = tokenUtils.getValue(primaryColor, "md"); // "#2563EB"

// Apply to CSS property
const styles = tokenUtils.apply(
  primaryColor,
  "color",
  v => v
);
// {
//   color: "#3B82F6",
//   "@media (min-width: 768px)": { color: "#2563EB" },
//   "@media (min-width: 1024px)": { color: "#1D4ED8" }
// }

// Generate CSS variables
const cssVars = tokenUtils.toCssVars(primaryColor);
// {
//   "--color-primary": "#3B82F6",
//   "--color-primary-md": "#2563EB",
//   "--color-primary-lg": "#1D4ED8"
// }
```

## Usage Examples

### Responsive Component Styles

```typescript
import { 
  createResponsiveStyles,
  useResponsive 
} from "@banja/react-jedi/theme";

// Using responsive utilities
function ResponsiveCard({ theme }) {
  const responsive = useResponsive(theme);
  
  const padding = responsive.mapValues(
    "padding",
    { base: "1rem", md: "1.5rem", lg: "2rem" },
    v => v
  );
  
  const fontSize = responsive.mapValues(
    "font-size",
    { base: "14px", md: "16px" },
    v => v
  );
  
  return {
    ...padding,
    ...fontSize,
  };
}

// Creating responsive styles
const cardStyles = createResponsiveStyles(
  "padding",
  { base: "1rem", md: "2rem" },
  v => v
);
// "padding: 1rem; @media (min-width: 768px) { padding: 2rem; }"
```

### Container-Aware Components

```typescript
import { 
  createContainerStyles,
  containerQuery 
} from "@banja/react-jedi/theme";

const responsiveCard = createContainerStyles(
  "card",
  {
    name: "card",
    type: "inline-size",
  },
  {
    padding: {
      base: "1rem",
      [containerQuery.minWidth("400px", "card")]: "1.5rem",
      [containerQuery.minWidth("600px", "card")]: "2rem",
    },
    gridColumns: {
      base: "1fr",
      [containerQuery.minWidth("600px", "card")]: "repeat(2, 1fr)",
      [containerQuery.minWidth("900px", "card")]: "repeat(3, 1fr)",
    }
  }
);
```

### Hybrid Responsive Styles

Combine media queries and container queries:

```typescript
import { createHybridResponsiveStyles } from "@banja/react-jedi/theme";

const hybridStyles = createHybridResponsiveStyles(
  "font-size",
  // Media query values
  { base: "14px", md: "16px" },
  // Container query values  
  {
    "@container (min-width: 400px)": "15px",
    "@container (min-width: 800px)": "18px",
  },
  breakpoints
);
```

## Advanced Patterns

### Fluid Typography

```typescript
import { fluidSpacing } from "@banja/react-jedi/theme/spacing";

// Creates fluid spacing that scales with viewport
const fluidPadding = fluidSpacing(
  "1rem",  // min at 375px
  "2rem",  // max at 1920px
  "375px",
  "1920px",
  spacingScale
);
// "clamp(1rem, calc(...), 2rem)"
```

### Custom Breakpoint System

```typescript
// Define custom breakpoint system
const customBreakpoints = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1440px",
  ultrawide: "1920px",
};

// Create utilities with custom breakpoints
const responsive = createResponsiveUtils(customBreakpoints);
```

### Component-Specific Breakpoints

```typescript
// Card component with its own breakpoint system
const cardBreakpoints = {
  compact: "300px",
  normal: "500px",
  wide: "700px",
};

const cardStyles = {
  padding: {
    base: "0.5rem",
    [containerQuery.minWidth(cardBreakpoints.compact, "card")]: "1rem",
    [containerQuery.minWidth(cardBreakpoints.normal, "card")]: "1.5rem",
    [containerQuery.minWidth(cardBreakpoints.wide, "card")]: "2rem",
  }
};
```

### Responsive Token Collections

```typescript
import { createResponsiveTokenCollection } from "@banja/react-jedi/theme";

// Create responsive version of entire token collection
const responsiveTokens = createResponsiveTokenCollection(
  baseTokenCollection,
  {
    colors: {
      primary: { base: "#blue-500", dark: "#blue-700" },
      secondary: { base: "#green-500", dark: "#green-700" },
    },
    spacing: {
      sm: { base: "0.5rem", md: "0.75rem" },
      md: { base: "1rem", md: "1.5rem" },
      lg: { base: "2rem", md: "3rem" },
    },
    typography: {
      body: { base: "14px", md: "16px", lg: "18px" },
      heading: { base: "24px", md: "32px", lg: "40px" },
    }
  }
);
```

## Best Practices

1. **Mobile-First**: Start with the smallest breakpoint and work up
2. **Semantic Breakpoints**: Use meaningful names for custom breakpoints
3. **Container Queries for Components**: Use container queries for component-level responsiveness
4. **Media Queries for Layout**: Use media queries for page-level layout changes
5. **Performance**: Minimize the number of breakpoints to reduce CSS complexity
6. **Accessibility**: Ensure responsive changes don't break accessibility features
7. **Testing**: Test at all breakpoints and in-between values

## TypeScript Support

The responsive system is fully typed with TypeScript:

```typescript
import type {
  ResponsiveValue,
  ResponsiveObject,
  BreakpointKey,
  ContainerQueryCondition,
  ResponsiveDesignToken,
} from "@banja/react-jedi/theme";

// Type-safe responsive value
const padding: ResponsiveValue<string> = {
  base: "1rem",
  md: "2rem",
};

// Type-safe container query
const query: ContainerQueryCondition = {
  minWidth: "400px",
  aspectRatio: "16/9",
};
```

## Migration Guide

If you're migrating from a different responsive system:

1. Convert breakpoint definitions to match our format
2. Update responsive value syntax (array or object format)
3. Replace media query helpers with our utilities
4. Consider using container queries for component-level responsiveness
5. Update any custom responsive utilities to use our APIs

## Performance Considerations

1. **CSS Variables**: Use responsive CSS variables for runtime switching
2. **Code Splitting**: Split responsive styles by breakpoint when needed
3. **Critical CSS**: Include only base styles in critical CSS
4. **Caching**: Cache compiled responsive styles
5. **Tree Shaking**: Import only the utilities you need

## Future Enhancements

- Support for CSS `@layer` with responsive styles
- Integration with CSS-in-JS libraries
- Responsive animation utilities
- Viewport unit helpers
- Responsive grid system utilities