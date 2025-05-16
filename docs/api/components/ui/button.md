# Button Component

The Button component is a versatile interactive element used to trigger actions or events in the user interface. It supports multiple variants, sizes, and states to accommodate different use cases.

## Specification

```typescript
interface ButtonSpec extends BaseComponentSpec {
  type: "Button";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  children: string | BaseComponentSpec | BaseComponentSpec[];
  asChild?: boolean;
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `"Button"` | Required | Component type identifier |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `children` | `string \| BaseComponentSpec \| BaseComponentSpec[]` | Required | Button content |
| `asChild` | `boolean` | `false` | Treat as child slot element |

### Variant Details

- **default**: Primary button with solid background
- **destructive**: Red/danger button for destructive actions
- **outline**: Button with border and transparent background
- **secondary**: Secondary emphasis button
- **ghost**: Transparent button with hover effect
- **link**: Button styled as a text link

### Size Details

- **default**: Standard button size (h-9, px-4)
- **sm**: Small button (h-8, px-3)
- **lg**: Large button (h-10, px-6)
- **icon**: Square icon button (size-9)

## Usage Examples

### Basic Button

```json
{
  "type": "Button",
  "children": "Click Me"
}
```

### Button with Variant

```json
{
  "type": "Button",
  "variant": "destructive",
  "children": "Delete"
}
```

### Button with Icon

```json
{
  "type": "Button",
  "variant": "outline",
  "size": "icon",
  "children": {
    "type": "Icon",
    "name": "settings"
  }
}
```

### Disabled Button

```json
{
  "type": "Button",
  "disabled": true,
  "children": "Unavailable"
}
```

### Button with Action

```json
{
  "type": "Button",
  "children": "Save",
  "actions": {
    "onClick": {
      "type": "dispatch",
      "action": "SAVE_FORM"
    }
  }
}
```

### Conditional Button State

```json
{
  "type": "Button",
  "children": "Submit",
  "conditions": [
    {
      "when": {
        "state": "form.isValid",
        "is": false
      },
      "disabled": true
    }
  ]
}
```

### Button Group

```json
{
  "type": "Flex",
  "gap": 2,
  "children": [
    {
      "type": "Button",
      "variant": "secondary",
      "children": "Cancel"
    },
    {
      "type": "Button",
      "children": "Save"
    }
  ]
}
```

## Styling

The Button component uses Tailwind CSS classes and the Class Variance Authority (CVA) for variant management. You can extend or override styles using the `styleExtend` and `styleOverrides` properties.

### Style Extension Example

```json
{
  "type": "Button",
  "children": "Custom Button",
  "styleExtend": {
    "backgroundColor": "purple-600",
    "borderRadius": "full",
    "textTransform": "uppercase"
  }
}
```

## State Management

Buttons can interact with the state system through actions:

```json
{
  "type": "Button",
  "children": "Toggle",
  "actions": {
    "onClick": {
      "type": "toggleState",
      "state": "local",
      "key": "isOpen"
    }
  }
}
```

## Accessibility

- Buttons are keyboard accessible by default
- Supports focus states with visible focus indicators
- Disabled state prevents interaction
- Proper ARIA attributes are applied automatically

## Best Practices

1. Use appropriate variants for different action types
2. Provide clear, action-oriented button text
3. Use the `disabled` state appropriately
4. Group related buttons using Flex or Stack components
5. Consider button size in context of surrounding UI
6. Use icons sparingly and ensure they have text labels

## Performance Considerations

- Button state changes are optimized
- Minimal re-renders on prop changes
- Event handlers are properly memoized

## Related Components

- [LinkButton](./link-button.md) - Navigation-focused button
- [IconButton](./icon-button.md) - Icon-only button variant
- [ToggleButton](./toggle.md) - Stateful toggle button
- [ButtonGroup](./button-group.md) - Button grouping component