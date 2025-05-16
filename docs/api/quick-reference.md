# Quick Reference

Essential React Jedi syntax and patterns for quick lookup.

## Basic Component

```json
{
  "type": "ComponentName",
  "prop1": "value",
  "prop2": 123,
  "children": "Content"
}
```

## Component with Children

```json
{
  "type": "Box",
  "children": [
    {
      "type": "Heading",
      "children": "Title"
    },
    {
      "type": "Text",
      "children": "Content"
    }
  ]
}
```

## State Management

### Local State
```json
{
  "state": {
    "initial": {
      "count": 0
    }
  }
}
```

### State Update
```json
{
  "actions": {
    "onClick": {
      "type": "setState",
      "state": "local",
      "key": "count",
      "value": 1
    }
  }
}
```

### State Reference
```json
{
  "children": "$state.local.count"
}
```

## Event Handling

### Click Event
```json
{
  "actions": {
    "onClick": {
      "type": "setState",
      "state": "local",
      "key": "clicked",
      "value": true
    }
  }
}
```

### Input Change
```json
{
  "actions": {
    "onChange": {
      "type": "setState",
      "state": "local",
      "key": "value",
      "value": "$event.target.value"
    }
  }
}
```

## Conditional Rendering

```json
{
  "conditions": [
    {
      "when": {
        "state": "local.isVisible",
        "is": true
      },
      "display": "block"
    },
    {
      "when": {
        "state": "local.isVisible",
        "is": false
      },
      "display": "none"
    }
  ]
}
```

## Responsive Design

```json
{
  "padding": {
    "base": 4,
    "md": 6,
    "lg": 8
  }
}
```

## Styling

### Style Extension
```json
{
  "styleExtend": {
    "backgroundColor": "blue-500",
    "borderRadius": "lg"
  }
}
```

### Theme Colors
```json
{
  "color": "primary.500",
  "background": "neutral.100"
}
```

## Common Patterns

### Form with Validation
```json
{
  "type": "Form",
  "children": [
    {
      "type": "Input",
      "name": "email",
      "required": true,
      "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    },
    {
      "type": "Button",
      "type": "submit",
      "children": "Submit"
    }
  ]
}
```

### List Rendering
```json
{
  "type": "Box",
  "children": {
    "type": "map",
    "data": "$state.local.items",
    "template": {
      "type": "Card",
      "key": "$item.id",
      "children": "$item.name"
    }
  }
}
```

### Modal Dialog
```json
{
  "type": "Dialog",
  "trigger": {
    "type": "Button",
    "children": "Open"
  },
  "content": {
    "type": "Box",
    "children": "Modal content"
  }
}
```

## Action Types

- `setState` - Update state value
- `toggleState` - Toggle boolean
- `updateState` - Update nested state
- `batchState` - Multiple updates
- `navigate` - Navigate to URL
- `dispatch` - Custom action
- `fetchData` - API call
- `submitForm` - Form submission

## Condition Operators

- `is` - Exact match
- `isNot` - Not equal
- `greaterThan` - Number comparison
- `lessThan` - Number comparison
- `includes` - Array/string contains
- `matches` - Regex pattern

## Event Modifiers

- `preventDefault: true` - Prevent default
- `stopPropagation: true` - Stop bubbling
- `once: true` - Execute once
- `debounce: 300` - Delay execution
- `throttle: 100` - Limit frequency

## Performance

### Memoization
```json
{
  "optimize": {
    "memoize": true,
    "compareProps": ["id", "data"]
  }
}
```

### Lazy Loading
```json
{
  "type": "LazyComponent",
  "loader": "components/Heavy",
  "fallback": {
    "type": "Spinner"
  }
}
```

## Debug Mode

```json
{
  "type": "UISpecification",
  "debug": {
    "state": true,
    "events": true,
    "renders": true
  }
}
```