# Shadow System

The shadow system provides a comprehensive set of utilities for managing shadows throughout your UI. It includes default scales, semantic presets, dark mode adjustments, and utilities for creating responsive shadows.

## Usage

### Basic Shadow Usage

```typescript
import { getShadow } from '@alexberriman/react-jedi';

// Get a shadow from the default scale
const smallShadow = getShadow('sm');
const largeShadow = getShadow('lg');

// Use semantic shadow presets
const cardShadow = getShadow('card');
const modalShadow = getShadow('modal');
```

### Dark Mode Shadows

```typescript
import { getDarkModeShadow } from '@alexberriman/react-jedi';

// Get shadows optimized for dark mode
const darkShadow = getDarkModeShadow('sm');
const darkModalShadow = getDarkModeShadow('modal');
```

### Responsive Shadows

```typescript
import { createResponsiveShadow } from '@alexberriman/react-jedi';

// Create shadows that change at different breakpoints
const responsiveShadow = createResponsiveShadow({
  base: 'sm',
  md: 'md',
  lg: 'lg',
  xl: '2xl'
});
```

### Combining Shadows

```typescript
import { combineShadows, getShadow } from '@alexberriman/react-jedi';

// Combine multiple shadows for layered effects
const layeredShadow = combineShadows(
  getShadow('sm'),
  getShadow('inner')
);
```

## Default Shadow Scale

The default shadow scale includes these values:

- `none`: No shadow
- `sm`: Small shadow (subtle elevation)
- `default`: Default shadow (card-like appearance)
- `md`: Medium shadow
- `lg`: Large shadow (popovers, dropdowns)
- `xl`: Extra large shadow
- `2xl`: 2X large shadow (modals)
- `inner`: Inset shadow
- `outline`: Focus outline shadow
- `focus`: Focus shadow for form elements
- `ring`: Ring shadow
- `ring-offset`: Ring with offset shadow
- `drop`: Drop shadow filter

## Semantic Shadow Presets

Semantic presets provide meaningful names for common use cases:

### Cards and Surfaces
- `card`: Default card shadow
- `card-hover`: Elevated shadow on hover
- `card-elevated`: Elevated card shadow

### Modals and Dialogs
- `modal`: Modal overlay shadow
- `dialog`: Dialog box shadow

### Interactive Elements
- `button`: Default button shadow
- `button-hover`: Button hover state
- `button-active`: Button active state
- `button-focus`: Button focus ring

### Dropdowns and Popovers
- `dropdown`: Dropdown menu shadow
- `popover`: Popover shadow
- `tooltip`: Tooltip shadow

### Navigation
- `navbar`: Navigation bar shadow
- `sidebar`: Sidebar shadow
- `tab`: Tab shadow

### Form Elements
- `input`: Input field shadow
- `input-focus`: Input focus shadow
- `input-error`: Input error state

### Special Effects
- `glow`: Glow effect
- `neon`: Neon light effect
- `subtle`: Very subtle shadow

## CSS Variables

The shadow system generates CSS variables for all shadows:

```css
:root {
  --shadow-none: none;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  /* ... and so on */
}
```

## Shadow Animations

The system includes predefined shadow animations:

```typescript
import { SHADOW_ANIMATIONS } from '@alexberriman/react-jedi';

// Pulse animation
const pulseAnimation = SHADOW_ANIMATIONS.pulse;

// Grow animation
const growAnimation = SHADOW_ANIMATIONS.grow;

// Float animation
const floatAnimation = SHADOW_ANIMATIONS.float;
```

## Theme Integration

Shadows are automatically integrated with the theme system:

```typescript
import { ThemeSpecification } from '@alexberriman/react-jedi';

const theme: ThemeSpecification = {
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    // Custom shadow values
    brand: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
  }
};
```

## Type Safety

The shadow system is fully typed:

```typescript
import type { ShadowKey, SemanticShadowKey } from '@alexberriman/react-jedi';

// Type-safe shadow keys
const shadow: ShadowKey = 'lg';
const semantic: SemanticShadowKey = 'card-hover';
```

## Advanced Usage

### Generate Custom Shadow Scale

```typescript
import { generateShadowScale } from '@alexberriman/react-jedi';

const customScale = generateShadowScale({
  customValues: {
    subtle: '0 1px 1px rgba(0, 0, 0, 0.04)',
    strong: '0 10px 40px rgba(0, 0, 0, 0.15)',
  },
  darkMode: true, // Use dark mode optimized shadows
});
```

### Extract Shadows from Theme

```typescript
import { extractShadowScale } from '@alexberriman/react-jedi';

const themeShadows = extractShadowScale(theme);
```

## Best Practices

1. **Use semantic presets** when possible for consistency across the UI
2. **Consider dark mode** by using appropriate shadow adjustments
3. **Combine shadows** sparingly - too many layered shadows can affect performance
4. **Use responsive shadows** to enhance visual hierarchy on different screen sizes
5. **Leverage CSS variables** for runtime theme switching
6. **Test shadow animations** on lower-end devices for performance

## Components Using Shadows

Many UI components in the library support shadow properties:

- `Box` - General-purpose container with shadow prop
- `Card` - Card component with semantic shadow presets
- `Button` - Interactive buttons with hover/active shadows
- `Modal` - Modal overlays with appropriate depth
- `Dropdown` - Dropdown menus with elevation shadows

Example with a Box component:

```typescript
import { Box } from '@alexberriman/react-jedi';

function Example() {
  return (
    <Box
      shadow="card"
      hoverShadow="card-hover"
      darkShadow="lg"
    >
      Content with shadows
    </Box>
  );
}
```