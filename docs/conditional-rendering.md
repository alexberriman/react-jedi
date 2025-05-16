# Conditional Rendering

This document describes the conditional rendering capabilities in React Jedi, which allow components to be shown/hidden and have their properties dynamically modified based on application state and context.

## Overview

Conditional rendering in React Jedi provides two main features:

1. **Conditional Visibility**: Components can be shown or hidden based on conditions
2. **Conditional Properties**: Component properties can be dynamically set based on conditions

## Conditional Visibility

Use the `when` property to control whether a component renders:

```json
{
  "type": "Text",
  "when": "state.isVisible",
  "children": "This text appears conditionally"
}
```

### Boolean Conditions

The simplest form uses a boolean value:

```json
{
  "type": "Box",
  "when": true,
  "children": "Always visible"
}
```

### Expression Conditions

More complex conditions use expression strings:

```json
{
  "type": "Alert",
  "when": "state.user && state.user.authenticated",
  "children": "Welcome back!"
}
```

### Supported Operators

- Comparison: `===`, `!==`, `>`, `<`, `>=`, `<=`
- Logical: `&&`, `||`, `!`
- Property access: `state.value`, `props.type`, `env.MODE`

## Conditional Properties

Use `conditionalProps` to dynamically set properties based on conditions:

```json
{
  "type": "Button",
  "children": "Submit",
  "conditionalProps": {
    "variant": {
      "props.isPrimary === true": "default",
      "props.isPrimary === false": "outline"
    },
    "disabled": {
      "state.isLoading": true,
      "state.formInvalid": true
    }
  }
}
```

### Property Resolution

- Conditions are evaluated in order
- First matching condition wins
- If no conditions match, the property is not set

## Context Variables

Three context sources are available in conditions:

### 1. State

Access global state values:

```json
{
  "when": "state.count > 5",
  "when": "state.user.role === 'admin'",
  "when": "state.features.darkMode"
}
```

### 2. Props

Access component properties:

```json
{
  "when": "props.type === 'primary'",
  "when": "props.size !== 'small'",
  "when": "props.disabled === false"
}
```

### 3. Environment

Access environment variables:

```json
{
  "when": "env.MODE === 'production'",
  "when": "env.DEBUG !== 'true'"
}
```

## Complex Examples

### Nested Conditions

```json
{
  "type": "Container",
  "children": [
    {
      "type": "Box",
      "when": "state.user.authenticated",
      "children": [
        {
          "type": "Heading",
          "conditionalProps": {
            "children": {
              "state.user.role === 'admin'": "Admin Dashboard",
              "state.user.role === 'user'": "User Dashboard"
            }
          }
        },
        {
          "type": "Box",
          "when": "state.user.role === 'admin'",
          "children": "Admin-only content"
        }
      ]
    },
    {
      "type": "Box",
      "when": "!state.user.authenticated",
      "children": "Please log in"
    }
  ]
}
```

### Theme-aware Components

```json
{
  "type": "Card",
  "conditionalProps": {
    "className": {
      "state.theme === 'dark'": "bg-gray-800 text-white",
      "state.theme === 'light'": "bg-white text-gray-900"
    },
    "style": {
      "state.theme === 'dark'": {
        "borderColor": "#4a5568"
      },
      "state.theme === 'light'": {
        "borderColor": "#e2e8f0"
      }
    }
  }
}
```

### Responsive Behavior

```json
{
  "type": "Grid",
  "conditionalProps": {
    "columns": {
      "state.viewport === 'mobile'": 1,
      "state.viewport === 'tablet'": 2,
      "state.viewport === 'desktop'": 4
    }
  }
}
```

## Best Practices

1. **Keep Conditions Simple**: Complex conditions are harder to debug
2. **Use Meaningful State Keys**: Make state structure clear and predictable
3. **Provide Fallbacks**: Consider what happens when no conditions match
4. **Test Edge Cases**: Verify behavior with missing or undefined values

## Performance Considerations

- Conditions are evaluated during render
- Use memoization for expensive state computations
- Consider extracting complex logic to computed state

## Debugging

Enable development mode to see condition evaluation details:

```typescript
const element = render(specification, {
  development: true
});
```

## Common Patterns

### Toggle Visibility

```json
{
  "type": "Box",
  "when": "state.showDetails",
  "children": "Additional information..."
}
```

### Loading States

```json
{
  "type": "Box",
  "children": [
    {
      "type": "Skeleton",
      "when": "state.isLoading"
    },
    {
      "type": "Text",
      "when": "!state.isLoading",
      "children": "{{state.data}}"
    }
  ]
}
```

### Error Handling

```json
{
  "type": "Alert",
  "when": "state.error !== null",
  "conditionalProps": {
    "children": {
      "state.error.type === 'warning'": "Warning: {{state.error.message}}",
      "state.error.type === 'error'": "Error: {{state.error.message}}"
    },
    "variant": {
      "state.error.type === 'warning'": "warning",
      "state.error.type === 'error'": "destructive"
    }
  }
}
```