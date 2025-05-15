# Component Style Overrides

The React Jedi theme system provides powerful style override capabilities that allow you to customize component appearance at the theme level. This enables consistent styling across your application while maintaining flexibility for specific use cases.

## Overview

Style overrides allow you to:
- Apply global styles to all instances of a component type
- Customize specific variants or sizes
- Create special styling for variant + size combinations
- Use theme tokens for consistent styling
- Merge theme-level and spec-level styles

## Theme Structure

Style overrides are defined in the `components` section of your theme:

```typescript
const theme: ThemeSpecification = {
  components: {
    Button: {
      global: {
        // Styles for all buttons
      },
      variants: {
        primary: {
          // Styles for primary variant
        },
      },
      sizes: {
        lg: {
          // Styles for large size
        },
      },
      combinations: [
        {
          variant: "primary",
          size: "lg",
          // Special styles for primary + large
        },
      ],
    },
  },
};
```

## Style Override Properties

Each override can include:

### `className`
CSS classes to apply (using Tailwind CSS):

```typescript
{
  className: "rounded-lg shadow-md font-bold"
}
```

### `styles`
React CSS properties object:

```typescript
{
  styles: {
    padding: "1rem",
    letterSpacing: "0.05em",
    transition: "all 0.2s ease"
  }
}
```

### `tokens`
Theme token references that resolve to CSS properties:

```typescript
{
  tokens: {
    backgroundColor: "colors.primary.500",
    padding: "spacing.md",
    borderRadius: "borderRadius.lg"
  }
}
```

## Examples

### Global Overrides

Apply styles to all instances of a component:

```typescript
const theme = {
  components: {
    Button: {
      global: {
        className: "rounded-full font-medium uppercase tracking-wider",
        styles: {
          transition: "all 0.3s ease",
        },
      },
    },
  },
};
```

### Variant-Specific Overrides

Customize specific variants:

```typescript
const theme = {
  components: {
    Button: {
      variants: {
        primary: {
          className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
          styles: {
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
          },
        },
        secondary: {
          className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        },
      },
    },
  },
};
```

### Size-Specific Overrides

Apply styles based on component size:

```typescript
const theme = {
  components: {
    Button: {
      sizes: {
        sm: {
          className: "text-xs px-2 py-1",
          styles: {
            fontSize: "0.75rem",
          },
        },
        lg: {
          className: "text-lg px-6 py-3",
          styles: {
            fontSize: "1.125rem",
          },
        },
      },
    },
  },
};
```

### Combination Overrides

Create special styling for specific variant + size combinations:

```typescript
const theme = {
  components: {
    Button: {
      combinations: [
        {
          variant: "primary",
          size: "lg",
          className: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
          styles: {
            padding: "1rem 2rem",
            fontSize: "1.25rem",
            fontWeight: "bold",
          },
        },
      ],
    },
  },
};
```

### Token-Based Styling

Use theme tokens for consistent styling:

```typescript
const theme = {
  colors: {
    primary: { 500: "#3B82F6" },
  },
  spacing: {
    md: "1rem",
    lg: "1.5rem",
  },
  components: {
    Card: {
      global: {
        tokens: {
          backgroundColor: "colors.primary.500",
          padding: "spacing.lg",
          color: "white",
        },
      },
    },
  },
};
```

## Style Resolution Order

Styles are applied in the following order (later overrides earlier):

1. Component default styles
2. Theme global overrides
3. Theme variant overrides
4. Theme size overrides
5. Theme combination overrides
6. Spec-level className
7. Spec-level style

## Integration with Components

Components automatically receive merged styles through the render system:

```typescript
const spec: ComponentSpec = {
  type: "Button",
  variant: "primary",
  size: "lg",
  // These merge with theme overrides
  className: "custom-class",
  style: { marginTop: "10px" },
  children: "Click me",
};

// When rendered with a theme, all applicable overrides are merged
const element = render(spec, { theme });
```

## Best Practices

1. **Use tokens for consistency**: Reference theme tokens instead of hard-coding values
2. **Layer overrides thoughtfully**: Use global for common styles, variants for specific cases
3. **Avoid conflicts**: Be careful with combination overrides that might conflict
4. **Test thoroughly**: Verify that style cascading works as expected
5. **Document overrides**: Keep track of why specific overrides exist

## TypeScript Support

The style override system is fully typed:

```typescript
import type { 
  ThemeSpecification,
  ComponentStyleOverride,
  StyleOverride 
} from '@banja/react-jedi';

const theme: ThemeSpecification = {
  components: {
    Button: {
      global: {
        className: "...",
        styles: { ... },
        tokens: { ... },
      },
    },
  },
};
```

## Debugging

To debug style overrides:

1. Check the final rendered component's className and style props
2. Use browser DevTools to inspect applied styles
3. Verify token resolution with the token resolver utilities
4. Check the style cascade order if styles aren't applying as expected

## Advanced Usage

### Dynamic Style Functions

For complex styling logic, you can create style functions:

```typescript
import { createStyleFunction } from '@banja/react-jedi';

const dynamicStyles = createStyleFunction([
  {
    variant: "primary",
    size: "lg",
    className: "special-primary-large",
  },
]);

// Use with your theme or components
```

### Style Merging Utilities

Use the provided utilities for custom style merging:

```typescript
import { mergeStyles, cascadeStyles } from '@banja/react-jedi';

const merged = mergeStyles(baseStyles, overrideStyles);
const cascaded = cascadeStyles(style1, style2, style3);
```

## Migration Guide

If you're migrating from direct component styling:

1. Extract common styles to theme global overrides
2. Move variant-specific styles to theme variants
3. Replace inline styles with token references where possible
4. Use combination overrides for special cases
5. Test thoroughly to ensure styling consistency

The style override system provides a powerful way to maintain consistent styling while preserving flexibility. It integrates seamlessly with the Server-Driven UI architecture and theme system.