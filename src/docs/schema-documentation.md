# React Jedi Schema Documentation

This document provides comprehensive documentation for the schema specifications used in the React Jedi Server-Driven UI architecture. It includes detailed explanations and examples for all component types.

## Table of Contents

1. [Introduction](#introduction)
2. [UI Specification](#ui-specification)
3. [Base Component Schema](#base-component-schema)
4. [Layout Components](#layout-components)
5. [Typography Components](#typography-components)
6. [UI Components](#ui-components)
7. [Complete Examples](#complete-examples)

## Introduction

React Jedi uses a Server-Driven UI (SDUI) approach where UI components and their relationships are defined in JSON. This allows for dynamic interfaces that can be updated without client-side code changes.

The schema system has several key features:

- **Type Safety**: All specifications are strongly typed with TypeScript
- **Validation**: Runtime validation using Zod ensures specifications are correctly formed
- **Component Resolution**: Dynamic mapping from specification types to React components
- **Composition**: Components can be nested to create complex UIs
- **Styling**: Integrated with TailwindCSS for powerful styling capabilities

## UI Specification

The top-level `UISpecification` interface defines the overall structure of a UI definition.

```typescript
interface UISpecification {
  version: string;
  metadata?: SpecificationMetadata;
  root: ComponentSpec;
  theme?: ThemeSpecification;
  state?: StateSpecification;
  dataSources?: DataSourceSpecification[];
}
```

### Metadata

Metadata contains information about the specification itself:

```typescript
interface SpecificationMetadata {
  title?: string;
  description?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  [key: string]: unknown;
}
```

### Example UI Specification

```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "Product Page",
    "description": "A product details page with image gallery and purchase options",
    "author": "React Jedi Team",
    "createdAt": "2025-05-10T14:30:00Z",
    "tags": ["e-commerce", "product", "template"]
  },
  "root": {
    "type": "Container",
    "children": [
      {
        "type": "Heading",
        "level": "h1",
        "children": "Premium Wireless Headphones"
      },
      {
        "type": "Text",
        "children": "Experience immersive sound with our premium wireless headphones."
      }
      // More components...
    ]
  }
}
```

### Theme Specification

Theme configuration allows for consistent styling across components:

```typescript
interface ThemeSpecification {
  base?: string;
  colors?: ThemeColors;
  typography?: ThemeTypography;
  spacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
  shadows?: Record<string, string>;
  breakpoints?: Record<string, string>;
  zIndices?: Record<string, number>;
  animations?: Record<string, AnimationPreset>;
}
```

#### Example Theme Configuration

```json
{
  "base": "light",
  "colors": {
    "primary": {
      "500": "#3B82F6",
      "600": "#2563EB",
      "700": "#1D4ED8"
    },
    "secondary": {
      "500": "#EC4899",
      "600": "#DB2777",
      "700": "#BE185D"
    },
    "text": {
      "primary": "#111827",
      "secondary": "#4B5563"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "sans-serif"],
      "display": ["Montserrat", "sans-serif"]
    },
    "fontSizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    }
  }
}
```

### State Specification

The state configuration defines global state for interactive UIs:

```typescript
interface StateSpecification {
  initial: Record<string, unknown>;
  persistence?: {
    type: "local" | "session" | "memory";
    key: string;
    include?: string[];
    exclude?: string[];
  };
  computed?: Record<string, {
    dependencies: string[];
    expression: string;
  }>;
}
```

#### Example State Configuration

```json
{
  "initial": {
    "cart": {
      "items": [],
      "total": 0
    },
    "darkMode": false,
    "user": null
  },
  "persistence": {
    "type": "local",
    "key": "app-state",
    "exclude": ["temporaryValues"]
  },
  "computed": {
    "cartItemCount": {
      "dependencies": ["cart.items"],
      "expression": "cart.items.length"
    }
  }
}
```

### Data Sources

Data sources define how dynamic data is fetched and integrated into the UI:

```typescript
interface DataSourceSpecification {
  id: string;
  type: "rest" | "graphql" | "static" | "websocket" | "function";
  config: RestDataSourceConfig | GraphQLDataSourceConfig | StaticDataSourceConfig | WebSocketDataSourceConfig | FunctionDataSourceConfig;
  cache?: {
    ttl: number;
    staleWhileRevalidate?: number;
  };
  polling?: {
    interval: number;
    pauseWhenHidden?: boolean;
  };
  transforms?: Array<{
    type: "map" | "filter" | "sort" | "slice" | "custom";
    config: Record<string, unknown>;
  }>;
}
```

#### Example REST Data Source

```json
{
  "id": "products",
  "type": "rest",
  "config": {
    "url": "https://api.example.com/products",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer {{env.API_TOKEN}}"
    },
    "params": {
      "category": "electronics",
      "limit": "10"
    }
  },
  "cache": {
    "ttl": 300,
    "staleWhileRevalidate": 60
  },
  "transforms": [
    {
      "type": "filter",
      "config": {
        "predicate": "item.price <= 100"
      }
    },
    {
      "type": "sort",
      "config": {
        "key": "price",
        "order": "asc"
      }
    }
  ]
}
```

## Base Component Schema

All UI components in React Jedi extend the base component schema, which provides common properties shared across all components.

### BaseComponentSpec Interface

The `BaseComponentSpec` interface defines the fundamental properties that any component can have:

```typescript
interface BaseComponentSpec {
  /**
   * Unique identifier for the component instance.
   */
  id?: string;

  /**
   * The type of the component.
   * Each component implementation must specify its own type.
   */
  type: string;

  /**
   * Optional children components or content.
   */
  children?: ComponentChildren;

  /**
   * Optional event handlers for the component.
   */
  events?: Record<string, EventHandler>;

  /**
   * Optional accessibility properties.
   */
  a11y?: AccessibilityProps;

  /**
   * Optional data attributes to add to the component.
   */
  data?: Record<string, string>;

  /**
   * Optional test identifiers for testing frameworks.
   */
  testId?: string;
}
```

### Runtime Validation Schema

React Jedi uses Zod for runtime validation of component specifications. The base validation schema implements the following structure:

```typescript
const baseComponentSchema = z.object({
  // Component type identifier
  type: z.string(),

  // CSS class names to apply to the component
  className: z.string().optional(),

  // Component ID
  id: z.string().optional(),

  // Data attributes
  dataAttributes: z.record(z.string(), z.string()).optional(),

  // ARIA attributes for accessibility
  ariaAttributes: z.record(z.string(), z.string()).optional(),

  // Event handlers
  events: z.record(z.string(), z.unknown()).optional(),

  // Element style object
  style: z.record(z.string(), z.string()).optional(),

  // Test identifiers for testing
  testId: z.string().optional(),
});
```

### Component Children

The `ComponentChildren` type allows flexibility in what can be provided as children to a component:

```typescript
type ComponentChildren = string | ComponentSpec | ComponentSpec[];
```

This means components can have:
- Simple text content as a string
- A single child component
- An array of child components

### Event Handling

The `EventHandler` interface defines the structure for event handlers:

```typescript
interface EventHandler {
  /**
   * The type of action to perform.
   */
  action: string;

  /**
   * Optional parameters for the action.
   */
  params?: Record<string, unknown>;
}
```

### Accessibility Support

The `AccessibilityProps` interface provides comprehensive support for ARIA attributes:

```typescript
interface AccessibilityProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaHidden?: boolean;
  tabIndex?: number;
  hasPopup?: boolean;
  ariaLive?: "off" | "polite" | "assertive";
  ariaAtomic?: boolean;
  role?: string;
}
```

### Example Base Component

While you won't typically create raw base components (as they don't render anything useful), here's an example of the base properties any component can have:

```json
{
  "type": "Box",
  "id": "main-content",
  "testId": "main-content-box",
  "data": {
    "section": "hero",
    "trackingId": "hero-123"
  },
  "a11y": {
    "ariaLabel": "Main content section",
    "role": "region"
  },
  "events": {
    "onClick": {
      "action": "trackEvent",
      "params": {
        "eventName": "hero_click",
        "eventCategory": "engagement"
      }
    }
  },
  "children": [
    {
      "type": "Text",
      "children": "Welcome to our platform"
    }
  ]
}
```

## Layout Components

Layout components form the foundation of UI structure by providing containers and spacing systems for organizing content. React Jedi includes several powerful layout components that can be composed to create complex interfaces.

### Box Component

The Box component is a versatile, primitive div-like container for general-purpose layouts.

```typescript
interface BoxSpec extends BaseComponentSpec {
  type: "Box";
  padding?: string;
  margin?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  backgroundColor?: string;
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  height?: string;
  width?: string;
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  className?: string;
  children?: ComponentChildren;
}
```

#### Example Box Component

```json
{
  "type": "Box",
  "padding": "6",
  "margin": "4",
  "borderWidth": "1",
  "borderColor": "gray.200",
  "borderRadius": "lg",
  "backgroundColor": "white",
  "shadow": "md",
  "children": [
    {
      "type": "Heading",
      "level": "h2",
      "children": "Welcome to our platform"
    },
    {
      "type": "Text",
      "children": "Get started by exploring our features below."
    }
  ]
}
```

### Container Component

The Container component creates a centered, width-restricted wrapper for page content with standardized padding.

```typescript
interface ContainerSpec extends BaseComponentSpec {
  type: "Container";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "none";
  padding?: string;
  centerContent?: boolean;
  className?: string;
  children?: ComponentChildren;
}
```

#### Example Container Component

```json
{
  "type": "Container",
  "maxWidth": "xl",
  "padding": "4",
  "centerContent": true,
  "children": [
    {
      "type": "Heading",
      "level": "h1",
      "children": "Our Services"
    },
    {
      "type": "Grid",
      "columns": {
        "base": "1",
        "md": "2",
        "lg": "3"
      },
      "gap": "6",
      "children": [
        // Service cards would go here
      ]
    }
  ]
}
```

### Grid Component

The Grid component creates powerful two-dimensional layouts using CSS Grid.

```typescript
interface GridSpec extends BaseComponentSpec {
  type: "Grid";
  columns?: string | number | Record<string, string | number>;
  gap?: string | { column?: string; row?: string };
  responsiveGap?: Record<string, string>;
  areas?: string[];
  rows?: string;
  responsiveRows?: Record<string, string>;
  autoResponsive?: {
    type: "auto-fit" | "auto-fill";
    minSize: string;
    maxSize?: string;
  };
  alignItems?: "start" | "end" | "center" | "stretch";
  justifyItems?: "start" | "end" | "center" | "stretch";
  alignContent?: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
  justifyContent?: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
  className?: string;
  children?: ComponentChildren;
}
```

#### Example Grid Component

```json
{
  "type": "Grid",
  "columns": {
    "base": "1",
    "md": "2",
    "lg": "3"
  },
  "gap": "6",
  "children": [
    {
      "type": "Card",
      "children": "Card 1 Content"
    },
    {
      "type": "Card",
      "children": "Card 2 Content"
    },
    {
      "type": "Card",
      "children": "Card 3 Content"
    }
  ]
}
```

#### Example Grid with Grid Areas

```json
{
  "type": "Grid",
  "areas": [
    "header header header",
    "sidebar content content",
    "footer footer footer"
  ],
  "columns": "1fr 3fr 1fr",
  "rows": "auto 1fr auto",
  "gap": "4",
  "children": [
    {
      "type": "Box",
      "gridArea": "header",
      "backgroundColor": "blue.100",
      "padding": "4",
      "children": "Header"
    },
    {
      "type": "Box",
      "gridArea": "sidebar",
      "backgroundColor": "green.100",
      "padding": "4",
      "children": "Sidebar"
    },
    {
      "type": "Box",
      "gridArea": "content",
      "backgroundColor": "purple.100",
      "padding": "4",
      "children": "Main Content"
    },
    {
      "type": "Box",
      "gridArea": "footer",
      "backgroundColor": "orange.100",
      "padding": "4",
      "children": "Footer"
    }
  ]
}
```

### Flex Component

The Flex component creates one-dimensional layouts using Flexbox.

```typescript
interface FlexSpec extends BaseComponentSpec {
  type: "Flex";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  responsiveDirection?: Record<string, "row" | "row-reverse" | "column" | "column-reverse">;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  responsiveAlign?: Record<string, "start" | "end" | "center" | "baseline" | "stretch">;
  justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
  responsiveJustify?: Record<string, "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">;
  gap?: string;
  responsiveGap?: Record<string, string>;
  className?: string;
  children?: ComponentChildren;
}
```

#### Example Flex Component

```json
{
  "type": "Flex",
  "direction": {
    "base": "column",
    "md": "row"
  },
  "align": "center",
  "justify": "space-between",
  "gap": "4",
  "children": [
    {
      "type": "Box",
      "width": "200px",
      "height": "100px",
      "backgroundColor": "blue.100",
      "children": "Item 1"
    },
    {
      "type": "Box",
      "width": "200px",
      "height": "100px",
      "backgroundColor": "green.100",
      "children": "Item 2"
    },
    {
      "type": "Box",
      "width": "200px",
      "height": "100px",
      "backgroundColor": "red.100",
      "children": "Item 3"
    }
  ]
}
```

### AspectRatio Component

The AspectRatio component maintains a consistent width-to-height ratio for its contents.

```typescript
interface AspectRatioSpec extends BaseComponentSpec {
  type: "AspectRatio";
  ratio?: string;
  className?: string;
  children?: ComponentChildren;
}
```

#### Example AspectRatio Component

```json
{
  "type": "AspectRatio",
  "ratio": "16/9",
  "width": "100%",
  "maxWidth": "800px",
  "children": {
    "type": "Image",
    "src": "https://example.com/image.jpg",
    "alt": "Example image"
  }
}
```

### Separator Component

The Separator component creates horizontal or vertical dividing lines.

```typescript
interface SeparatorSpec extends BaseComponentSpec {
  type: "Separator";
  orientation?: "horizontal" | "vertical";
  thickness?: string;
  color?: string;
  className?: string;
  length?: string;
  margin?: string;
  withLabel?: boolean;
  labelText?: string;
  style?: "solid" | "dashed" | "dotted";
}
```

#### Example Separator Component

```json
{
  "type": "Separator",
  "orientation": "horizontal",
  "thickness": "2px",
  "color": "gray.300",
  "margin": "8 0",
  "style": "solid"
}
```

#### Example Separator with Label

```json
{
  "type": "Separator",
  "orientation": "horizontal",
  "thickness": "1px",
  "color": "gray.300",
  "margin": "8 0",
  "withLabel": true,
  "labelText": "OR"
}
```

## Typography Components

Typography components handle text content with consistent styling and proper semantic HTML elements. React Jedi includes several typography components designed to create hierarchical and visually appealing text layouts.

### Text Component

The Text component renders paragraph and span text elements with customizable styling.

```typescript
interface TextSpec extends BaseComponentSpec {
  type: "Text";
  content?: string;
  as?: "p" | "span" | "div" | "strong" | "em" | "mark" | "ins" | "del" | "sub" | "sup";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "hairline" | "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  align?: "left" | "center" | "right" | "justify";
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";
  decoration?: "underline" | "line-through" | "none";
  fontStyle?: "normal" | "italic" | "oblique";
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  color?: string;
  wrap?: boolean;
  overflow?: "clip" | "ellipsis";
  maxLines?: number;
  className?: string;
  children?: ComponentChildren;
}
```

#### Example Text Component

```json
{
  "type": "Text",
  "size": "lg",
  "weight": "medium",
  "color": "gray.700",
  "lineHeight": "relaxed",
  "children": "Our platform helps businesses of all sizes streamline their operations and increase productivity through intuitive digital tools and automation."
}
```

#### Example Text with Multiple Styles

```json
[
  {
    "type": "Text",
    "size": "sm",
    "color": "gray.500",
    "as": "span",
    "children": "Published on: "
  },
  {
    "type": "Text",
    "size": "sm",
    "weight": "semibold",
    "as": "span",
    "children": "May 16, 2025"
  },
  {
    "type": "Text",
    "size": "sm",
    "as": "span",
    "color": "gray.500",
    "children": " by "
  },
  {
    "type": "Text",
    "size": "sm",
    "weight": "semibold",
    "as": "span",
    "color": "primary.600",
    "children": "React Jedi Team"
  }
]
```

### Heading Component

The Heading component renders h1-h6 elements with appropriate styling for page hierarchy.

```typescript
interface HeadingSpec extends BaseComponentSpec {
  type: "Heading";
  content?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  weight?: "hairline" | "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  align?: "left" | "center" | "right" | "justify";
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";
  decoration?: "underline" | "line-through" | "none";
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  color?: string;
  truncate?: boolean;
  className?: string;
  children?: ComponentChildren;
}
```

#### Example Heading Component

```json
{
  "type": "Heading",
  "level": "h1",
  "size": "4xl",
  "weight": "bold",
  "color": "gray.900",
  "letterSpacing": "tight",
  "children": "Welcome to Our Platform"
}
```

#### Example Heading Hierarchy

```json
[
  {
    "type": "Heading",
    "level": "h1",
    "size": "5xl",
    "weight": "bold",
    "color": "gray.900",
    "children": "Build Beautiful Interfaces"
  },
  {
    "type": "Text",
    "size": "xl",
    "color": "gray.600",
    "margin": "4 0 12 0",
    "children": "Create stunning UIs with our component library."
  },
  {
    "type": "Heading",
    "level": "h2",
    "size": "2xl",
    "weight": "semibold",
    "color": "primary.700",
    "margin": "8 0 4 0",
    "children": "Key Features"
  },
  {
    "type": "Heading",
    "level": "h3",
    "size": "xl",
    "margin": "6 0 2 0",
    "children": "Server-Driven UI"
  },
  {
    "type": "Text",
    "children": "Update your UI without deploying new code."
  }
]
```

### BlockQuote Component

The BlockQuote component renders quoted content with customizable styling.

```typescript
interface BlockQuoteSpec extends BaseComponentSpec {
  type: "BlockQuote";
  content?: string;
  attribution?: string;
  cite?: string;
  borderStyle?: "left" | "right" | "top" | "bottom" | "all" | "none";
  borderColor?: string;
  borderWidth?: string;
  backgroundColor?: string;
  color?: string;
  fontStyle?: "normal" | "italic" | "oblique";
  showQuotationMarks?: boolean;
  quotationMarkStyle?: "modern" | "classic" | "none";
  className?: string;
  children?: ComponentChildren;
}
```

#### Example BlockQuote Component

```json
{
  "type": "BlockQuote",
  "borderStyle": "left",
  "borderColor": "primary.500",
  "borderWidth": "4px",
  "backgroundColor": "gray.50",
  "padding": "6",
  "fontStyle": "italic",
  "children": "The way to get started is to quit talking and begin doing.",
  "attribution": "Walt Disney"
}
```

#### Example BlockQuote with Custom Styling

```json
{
  "type": "BlockQuote",
  "borderStyle": "all",
  "borderColor": "gray.200",
  "borderWidth": "1px",
  "backgroundColor": "blue.50",
  "padding": "8",
  "fontStyle": "normal",
  "showQuotationMarks": true,
  "quotationMarkStyle": "classic",
  "color": "blue.800",
  "children": "Innovation distinguishes between a leader and a follower.",
  "attribution": "Steve Jobs",
  "cite": "https://example.com/quotes"
}
```

## UI Components

UI components provide interactive elements and visual feedback for users. React Jedi includes a collection of essential UI components that serve as building blocks for creating functional interfaces.

### Button Component

The Button component triggers actions or events on click.

```typescript
interface ButtonSpec extends BaseComponentSpec {
  type: "Button";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  children?: ComponentChildren;
  label?: string;
  buttonType?: "button" | "submit" | "reset";
  className?: string;
  ariaLabel?: string;
  loading?: boolean;
  leftIcon?: BaseComponentSpec;
  rightIcon?: BaseComponentSpec;
  fullWidth?: boolean;
}
```

#### Example Button Component

```json
{
  "type": "Button",
  "variant": "default",
  "size": "default",
  "label": "Get Started",
  "className": "mt-6"
}
```

#### Example Button with Icons

```json
{
  "type": "Button",
  "variant": "outline",
  "size": "lg",
  "label": "Download Report",
  "leftIcon": {
    "type": "Icon",
    "name": "download"
  },
  "buttonType": "button",
  "className": "mt-4"
}
```

### Card Component

The Card component creates a visually distinct container for related content.

```typescript
interface CardSpec extends BaseComponentSpec {
  type: "Card";
  children?: ComponentChildren;
  className?: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  bordered?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  hoverable?: boolean;
  hoverEffect?: "shadow" | "border" | "scale" | "lift";
  selectable?: boolean;
  selected?: boolean;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}
```

#### Example Card Component

```json
{
  "type": "Card",
  "radius": "lg",
  "shadow": "md",
  "padding": "lg",
  "hoverable": true,
  "hoverEffect": "lift",
  "children": [
    {
      "type": "Heading",
      "level": "h3",
      "size": "xl",
      "children": "Feature Title"
    },
    {
      "type": "Text",
      "size": "md",
      "margin": "4 0",
      "children": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "type": "Button",
      "variant": "outline",
      "size": "sm",
      "label": "Learn More"
    }
  ]
}
```

### Badge Component

The Badge component displays small status indicators or counts.

```typescript
interface BadgeSpec extends BaseComponentSpec {
  type: "Badge";
  text?: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  visible?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
  icon?: BaseComponentSpec;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}
```

#### Example Badge Component

```json
{
  "type": "Badge",
  "text": "New",
  "variant": "default",
  "size": "sm",
  "radius": "full"
}
```

#### Example Badge with Icon

```json
{
  "type": "Badge",
  "text": "Warning",
  "variant": "destructive",
  "size": "md",
  "icon": {
    "type": "Icon",
    "name": "alertTriangle"
  }
}
```

### Avatar Component

The Avatar component displays a user's profile picture or initials.

```typescript
interface AvatarSpec extends BaseComponentSpec {
  type: "Avatar";
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  customSize?: string;
  shape?: "circle" | "square" | "rounded";
  borderColor?: string;
  borderWidth?: string;
  status?: "online" | "offline" | "away" | "busy" | "none";
  statusPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  statusColor?: string;
  fallbackBgColor?: string;
  fallbackTextColor?: string;
  className?: string;
}
```

#### Example Avatar Component

```json
{
  "type": "Avatar",
  "src": "https://example.com/profile.jpg",
  "alt": "User Profile",
  "fallback": "JD",
  "size": "lg",
  "status": "online",
  "statusPosition": "bottom-right"
}
```

#### Example Avatar with Custom Styling

```json
{
  "type": "Avatar",
  "fallback": "AB",
  "size": "xl",
  "shape": "rounded",
  "borderColor": "primary.500",
  "borderWidth": "2px",
  "fallbackBgColor": "indigo.100",
  "fallbackTextColor": "indigo.800"
}
```

### Image Component

The Image component displays images with various styling options.

```typescript
interface ImageSpec extends BaseComponentSpec {
  type: "Image";
  src: string;
  alt?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  filter?: "none" | "grayscale" | "sepia" | "blur" | "invert";
  hover?: "none" | "grow" | "shrink" | "rotate" | "shine" | "glow" | "pulse";
  loading?: "eager" | "lazy";
  fallback?: string;
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  withBlurredPlaceholder?: boolean;
  optimize?: boolean;
  className?: string;
}
```

#### Example Image Component

```json
{
  "type": "Image",
  "src": "https://example.com/image.jpg",
  "alt": "Example image",
  "objectFit": "cover",
  "rounded": "lg",
  "shadow": "md",
  "hover": "grow",
  "aspectRatio": "16/9",
  "width": "100%",
  "maxWidth": "800px"
}
```

#### Example Image with Filters

```json
{
  "type": "Image",
  "src": "https://example.com/product.jpg",
  "alt": "Product image",
  "objectFit": "contain",
  "filter": "grayscale",
  "hover": "shine",
  "loading": "lazy",
  "withBlurredPlaceholder": true
}
```

### Skeleton Component

The Skeleton component provides placeholders during content loading.

```typescript
interface SkeletonSpec extends BaseComponentSpec {
  type: "Skeleton";
  width?: string;
  height?: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  animate?: boolean;
  animationDuration?: number;
  className?: string;
}
```

#### Example Skeleton Components

```json
[
  {
    "type": "Skeleton",
    "width": "100%",
    "height": "32px",
    "radius": "md",
    "margin": "0 0 16px 0"
  },
  {
    "type": "Skeleton",
    "width": "100%",
    "height": "16px",
    "radius": "sm",
    "margin": "0 0 8px 0"
  },
  {
    "type": "Skeleton",
    "width": "80%",
    "height": "16px",
    "radius": "sm",
    "margin": "0 0 8px 0"
  },
  {
    "type": "Skeleton",
    "width": "90%",
    "height": "16px",
    "radius": "sm",
    "margin": "0 0 8px 0"
  }
]
```

### Label Component

The Label component provides accessible labels for form elements.

```typescript
interface LabelSpec extends BaseComponentSpec {
  type: "Label";
  text: string;
  htmlFor?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
  helperText?: string;
  visuallyHidden?: boolean;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}
```

#### Example Label Component

```json
{
  "type": "Label",
  "text": "Email Address",
  "htmlFor": "email",
  "required": true,
  "size": "sm",
  "weight": "medium"
}
```

#### Example Label with Helper Text

```json
{
  "type": "Label",
  "text": "Password",
  "htmlFor": "password",
  "required": true,
  "helperText": "Must be at least 8 characters",
  "color": "gray.700",
  "size": "sm",
  "weight": "medium"
}
```

### Input Component

The Input component collects user input in forms.

```typescript
interface InputSpec extends BaseComponentSpec {
  type: "Input";
  inputType?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
  size?: "sm" | "default" | "lg";
  width?: string;
  variant?: "default" | "ghost" | "outlined" | "filled";
  error?: string;
  helperText?: string;
  startIcon?: BaseComponentSpec;
  endIcon?: BaseComponentSpec;
  className?: string;
}
```

#### Example Input Component

```json
{
  "type": "Input",
  "inputType": "email",
  "id": "email",
  "name": "email",
  "placeholder": "Enter your email address",
  "required": true,
  "size": "default",
  "width": "full",
  "variant": "outlined",
  "autoComplete": "email"
}
```

#### Example Input with Icons and Error

```json
{
  "type": "Input",
  "inputType": "password",
  "id": "password",
  "name": "password",
  "placeholder": "Enter your password",
  "required": true,
  "minLength": 8,
  "size": "default",
  "variant": "default",
  "error": "Password must be at least 8 characters",
  "startIcon": {
    "type": "Icon",
    "name": "lock"
  },
  "endIcon": {
    "type": "Icon",
    "name": "eye"
  }
}
```

## Complete Examples

This section provides complete examples of UI specifications that demonstrate how components can be composed to create full interfaces. These examples showcase the power and flexibility of the React Jedi Server-Driven UI system.

### Product Card Example

A product card with image, heading, description, price, and action buttons.

```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "Product Card",
    "description": "A product card for e-commerce applications",
    "author": "React Jedi Team",
    "createdAt": "2025-05-16T10:30:00Z"
  },
  "root": {
    "type": "Card",
    "radius": "xl",
    "shadow": "lg",
    "padding": "none",
    "hoverable": true,
    "hoverEffect": "lift",
    "className": "overflow-hidden",
    "children": [
      {
        "type": "AspectRatio",
        "ratio": "4/3",
        "children": {
          "type": "Image",
          "src": "https://example.com/product-image.jpg",
          "alt": "Product Image",
          "objectFit": "cover"
        }
      },
      {
        "type": "Box",
        "padding": "5",
        "children": [
          {
            "type": "Flex",
            "justify": "space-between",
            "align": "center",
            "children": [
              {
                "type": "Heading",
                "level": "h3",
                "size": "xl",
                "children": "Wireless Headphones"
              },
              {
                "type": "Badge",
                "text": "New",
                "variant": "default",
                "color": "primary.500"
              }
            ]
          },
          {
            "type": "Text",
            "size": "md",
            "color": "gray.600",
            "margin": "3 0",
            "children": "Premium wireless headphones with noise cancellation and immersive sound experience."
          },
          {
            "type": "Separator",
            "margin": "4 0",
            "color": "gray.200"
          },
          {
            "type": "Flex",
            "justify": "space-between",
            "align": "center",
            "margin": "4 0",
            "children": [
              {
                "type": "Text",
                "size": "2xl",
                "weight": "bold",
                "color": "gray.900",
                "children": "$249.99"
              },
              {
                "type": "Flex",
                "gap": "2",
                "children": [
                  {
                    "type": "Button",
                    "variant": "outline",
                    "size": "sm",
                    "label": "Add to Wishlist"
                  },
                  {
                    "type": "Button",
                    "variant": "default",
                    "size": "sm",
                    "label": "Add to Cart"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Sign Up Form Example

A complete sign-up form with various form elements, validation, and feedback.

```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "Sign Up Form",
    "description": "User registration form with validation",
    "author": "React Jedi Team",
    "createdAt": "2025-05-16T12:45:00Z"
  },
  "root": {
    "type": "Box",
    "padding": "6",
    "backgroundColor": "white",
    "borderRadius": "xl",
    "shadow": "lg",
    "maxWidth": "500px",
    "margin": "auto",
    "children": [
      {
        "type": "Heading",
        "level": "h1",
        "size": "2xl",
        "align": "center",
        "margin": "0 0 6 0",
        "children": "Create Your Account"
      },
      {
        "type": "Text",
        "size": "md",
        "align": "center",
        "color": "gray.600",
        "margin": "0 0 8 0",
        "children": "Join thousands of users and start your journey with us."
      },
      {
        "type": "Box",
        "margin": "6 0",
        "children": [
          {
            "type": "Label",
            "text": "Full Name",
            "htmlFor": "fullName",
            "required": true,
            "margin": "0 0 2 0"
          },
          {
            "type": "Input",
            "id": "fullName",
            "name": "fullName",
            "inputType": "text",
            "placeholder": "John Doe",
            "required": true,
            "size": "default",
            "width": "full",
            "variant": "default",
            "startIcon": {
              "type": "Icon",
              "name": "user"
            }
          }
        ]
      },
      {
        "type": "Box",
        "margin": "6 0",
        "children": [
          {
            "type": "Label",
            "text": "Email Address",
            "htmlFor": "email",
            "required": true,
            "margin": "0 0 2 0"
          },
          {
            "type": "Input",
            "id": "email",
            "name": "email",
            "inputType": "email",
            "placeholder": "johndoe@example.com",
            "required": true,
            "size": "default",
            "width": "full",
            "variant": "default",
            "startIcon": {
              "type": "Icon",
              "name": "mail"
            }
          }
        ]
      },
      {
        "type": "Box",
        "margin": "6 0",
        "children": [
          {
            "type": "Label",
            "text": "Password",
            "htmlFor": "password",
            "required": true,
            "margin": "0 0 2 0",
            "helperText": "Must be at least 8 characters with at least one uppercase, one lowercase, and one number"
          },
          {
            "type": "Input",
            "id": "password",
            "name": "password",
            "inputType": "password",
            "placeholder": "••••••••",
            "required": true,
            "minLength": 8,
            "size": "default",
            "width": "full",
            "variant": "default",
            "startIcon": {
              "type": "Icon",
              "name": "lock"
            },
            "endIcon": {
              "type": "Icon",
              "name": "eye"
            }
          }
        ]
      },
      {
        "type": "Box",
        "margin": "8 0",
        "children": [
          {
            "type": "Button",
            "variant": "default",
            "size": "lg",
            "label": "Create Account",
            "buttonType": "submit",
            "fullWidth": true
          }
        ]
      },
      {
        "type": "Flex",
        "justify": "center",
        "align": "center",
        "gap": "2",
        "margin": "4 0 0 0",
        "children": [
          {
            "type": "Text",
            "size": "sm",
            "color": "gray.600",
            "children": "Already have an account?"
          },
          {
            "type": "Button",
            "variant": "link",
            "size": "sm",
            "label": "Sign In",
            "id": "signin-link"
          }
        ]
      }
    ]
  }
}
```

### Feature Showcase Example

A responsive feature showcase section with grid layout and cards.

```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "Feature Showcase",
    "description": "A responsive feature showcase section with multiple cards",
    "author": "React Jedi Team",
    "createdAt": "2025-05-16T15:20:00Z"
  },
  "root": {
    "type": "Container",
    "maxWidth": "5xl",
    "padding": "16",
    "centerContent": true,
    "children": [
      {
        "type": "Box",
        "margin": "0 0 16 0",
        "children": [
          {
            "type": "Heading",
            "level": "h2",
            "size": "4xl",
            "weight": "bold",
            "align": "center",
            "color": "gray.900",
            "letterSpacing": "tight",
            "children": "Powerful Features"
          },
          {
            "type": "Text",
            "size": "xl",
            "align": "center",
            "color": "gray.600",
            "margin": "6 0 0 0",
            "maxWidth": "3xl",
            "className": "mx-auto",
            "children": "Discover the tools and capabilities that make our platform stand out from the competition."
          }
        ]
      },
      {
        "type": "Grid",
        "columns": {
          "base": "1",
          "md": "2",
          "lg": "3"
        },
        "gap": "8",
        "children": [
          {
            "type": "Card",
            "radius": "xl",
            "shadow": "md",
            "padding": "6",
            "hoverable": true,
            "children": [
              {
                "type": "Flex",
                "direction": "column",
                "align": "center",
                "text-align": "center",
                "children": [
                  {
                    "type": "Box",
                    "backgroundColor": "blue.100",
                    "padding": "4",
                    "borderRadius": "full",
                    "margin": "0 0 5 0",
                    "children": {
                      "type": "Icon",
                      "name": "lightning",
                      "size": "xl",
                      "color": "blue.600"
                    }
                  },
                  {
                    "type": "Heading",
                    "level": "h3",
                    "size": "xl",
                    "margin": "0 0 3 0",
                    "children": "Lightning Fast"
                  },
                  {
                    "type": "Text",
                    "color": "gray.600",
                    "children": "Optimized performance ensures your experience is smooth and responsive, even with complex operations."
                  }
                ]
              }
            ]
          },
          {
            "type": "Card",
            "radius": "xl",
            "shadow": "md",
            "padding": "6",
            "hoverable": true,
            "children": [
              {
                "type": "Flex",
                "direction": "column",
                "align": "center",
                "text-align": "center",
                "children": [
                  {
                    "type": "Box",
                    "backgroundColor": "green.100",
                    "padding": "4",
                    "borderRadius": "full",
                    "margin": "0 0 5 0",
                    "children": {
                      "type": "Icon",
                      "name": "shield",
                      "size": "xl",
                      "color": "green.600"
                    }
                  },
                  {
                    "type": "Heading",
                    "level": "h3",
                    "size": "xl",
                    "margin": "0 0 3 0",
                    "children": "Secure by Design"
                  },
                  {
                    "type": "Text",
                    "color": "gray.600",
                    "children": "Enterprise-grade security ensures your data remains protected with end-to-end encryption and advanced protocols."
                  }
                ]
              }
            ]
          },
          {
            "type": "Card",
            "radius": "xl",
            "shadow": "md",
            "padding": "6",
            "hoverable": true,
            "children": [
              {
                "type": "Flex",
                "direction": "column",
                "align": "center",
                "text-align": "center",
                "children": [
                  {
                    "type": "Box",
                    "backgroundColor": "purple.100",
                    "padding": "4",
                    "borderRadius": "full",
                    "margin": "0 0 5 0",
                    "children": {
                      "type": "Icon",
                      "name": "layout",
                      "size": "xl",
                      "color": "purple.600"
                    }
                  },
                  {
                    "type": "Heading",
                    "level": "h3",
                    "size": "xl",
                    "margin": "0 0 3 0",
                    "children": "Responsive Design"
                  },
                  {
                    "type": "Text",
                    "color": "gray.600",
                    "children": "Adaptable interfaces that work seamlessly across devices, from desktop workstations to mobile phones."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Box",
        "margin": "16 0 0 0",
        "align": "center",
        "children": [
          {
            "type": "Button",
            "variant": "default",
            "size": "lg",
            "label": "Explore All Features",
            "rightIcon": {
              "type": "Icon",
              "name": "arrowRight"
            }
          }
        ]
      }
    ]
  }
}
```
```