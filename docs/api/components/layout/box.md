# Box Component

The Box component is the most fundamental building block in React Jedi. It's a polymorphic container that renders as a `div` by default but can be customized to render as any HTML element.

## Specification

```typescript
interface BoxSpec extends BaseComponentSpec {
  type: "Box";
  as?: keyof JSX.IntrinsicElements;
  children?: UISpec | UISpec[];
  padding?: SpacingValue;
  margin?: SpacingValue;
  width?: SizeValue;
  height?: SizeValue;
  display?: DisplayValue;
  position?: PositionValue;
  overflow?: OverflowValue;
  background?: ColorValue;
  border?: BorderValue;
  borderRadius?: RadiusValue;
  shadow?: ShadowValue;
  opacity?: number;
  cursor?: CursorValue;
  zIndex?: number;
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `"Box"` | Required | Component type identifier |
| `as` | HTML element name | `"div"` | HTML element to render |
| `children` | `UISpec \| UISpec[]` | - | Child components or content |
| `padding` | `SpacingValue` | - | Internal spacing |
| `margin` | `SpacingValue` | - | External spacing |
| `width` | `SizeValue` | - | Element width |
| `height` | `SizeValue` | - | Element height |
| `display` | `DisplayValue` | - | CSS display property |
| `position` | `PositionValue` | - | CSS position property |
| `overflow` | `OverflowValue` | - | Overflow behavior |
| `background` | `ColorValue` | - | Background color |
| `border` | `BorderValue` | - | Border styling |
| `borderRadius` | `RadiusValue` | - | Corner radius |
| `shadow` | `ShadowValue` | - | Box shadow |
| `opacity` | `number` | - | Opacity (0-1) |
| `cursor` | `CursorValue` | - | Cursor style |
| `zIndex` | `number` | - | Stack order |

### Type Details

#### SpacingValue
- Number: Maps to theme spacing scale (0-20)
- String: Tailwind spacing class or CSS value
- Object: `{ top?, right?, bottom?, left?, x?, y? }`

#### SizeValue
- Number: Pixel value
- String: CSS value ("100%", "auto", "50vw", etc.)
- Responsive object: `{ base?, sm?, md?, lg?, xl? }`

#### ColorValue
- Theme token: "primary", "secondary", etc.
- Tailwind color: "blue-500", "gray-100"
- CSS color: "rgb(255, 0, 0)", "#ff0000"

## Usage Examples

### Basic Box

```json
{
  "type": "Box",
  "children": "Content goes here"
}
```

### Box with Padding

```json
{
  "type": "Box",
  "padding": 4,
  "background": "gray-100",
  "children": "Padded content"
}
```

### Responsive Box

```json
{
  "type": "Box",
  "padding": {
    "base": 2,
    "md": 4,
    "lg": 6
  },
  "width": {
    "base": "100%",
    "md": "50%",
    "lg": "33.333%"
  },
  "children": "Responsive content"
}
```

### Styled Card Box

```json
{
  "type": "Box",
  "padding": 6,
  "background": "white",
  "borderRadius": "lg",
  "shadow": "md",
  "border": "1px solid gray-200",
  "children": [
    {
      "type": "Heading",
      "level": 3,
      "children": "Card Title"
    },
    {
      "type": "Text",
      "children": "Card content goes here."
    }
  ]
}
```

### Positioned Box

```json
{
  "type": "Box",
  "position": "absolute",
  "top": 0,
  "right": 0,
  "padding": 2,
  "background": "red-500",
  "borderRadius": "full",
  "children": "New"
}
```

### Semantic HTML Box

```json
{
  "type": "Box",
  "as": "section",
  "padding": 8,
  "children": [
    {
      "type": "Box",
      "as": "article",
      "children": "Article content"
    }
  ]
}
```

## Advanced Usage

### Nested Layout

```json
{
  "type": "Box",
  "display": "grid",
  "gridTemplateColumns": "1fr 1fr",
  "gap": 4,
  "children": [
    {
      "type": "Box",
      "padding": 4,
      "background": "blue-100",
      "children": "Left column"
    },
    {
      "type": "Box",
      "padding": 4,
      "background": "green-100",
      "children": "Right column"
    }
  ]
}
```

### Interactive Box

```json
{
  "type": "Box",
  "padding": 4,
  "background": "gray-100",
  "cursor": "pointer",
  "transition": "all 0.2s",
  "actions": {
    "onClick": {
      "type": "setState",
      "state": "local",
      "key": "selected",
      "value": true
    }
  },
  "conditions": [
    {
      "when": {
        "state": "local.selected",
        "is": true
      },
      "background": "blue-500",
      "color": "white"
    }
  ],
  "children": "Click me"
}
```

## Theme Integration

Box components automatically integrate with the theme system:

```json
{
  "type": "Box",
  "padding": "spacing.md",
  "background": "colors.primary",
  "borderRadius": "radii.default",
  "shadow": "shadows.sm",
  "children": "Themed box"
}
```

## Performance Considerations

- Box is highly optimized for minimal re-renders
- Style props are memoized
- Use semantic HTML elements via `as` prop for better performance
- Avoid deeply nested Box components when possible

## Best Practices

1. Use semantic HTML elements via the `as` prop
2. Leverage the theme system for consistent spacing and colors
3. Use responsive values for mobile-first design
4. Keep Box components focused on layout, not complex logic
5. Combine with other layout components (Flex, Grid) for complex layouts

## Related Components

- [Container](./container.md) - Responsive container with max-width
- [Flex](./flex.md) - Flexbox layout component
- [Grid](./grid.md) - CSS Grid layout component
- [Stack](./stack.md) - Vertical or horizontal stacking