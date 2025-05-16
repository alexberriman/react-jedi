# Schema Reference

Complete reference for React Jedi's JSON schema specification format.

## Root Specification

The root specification defines the entire UI structure:

```typescript
interface UISpecification {
  // Root component to render
  root: ComponentSpec;
  
  // Global theme configuration
  theme?: Theme;
  
  // Initial global state
  initialState?: State;
  
  // Plugin configurations
  plugins?: Plugin[];
  
  // Feature flags
  features?: FeatureFlags;
  
  // Debug options
  debug?: DebugOptions;
}
```

### Example

```json
{
  "root": {
    "type": "Container",
    "children": []
  },
  "theme": {
    "colors": {
      "primary": { "500": "#3b82f6" }
    }
  },
  "initialState": {
    "global": {
      "user": null
    }
  }
}
```

## Component Specification

All components share the base specification:

```typescript
interface BaseComponentSpec {
  // Component type identifier
  type: string;
  
  // Unique identifier
  id?: string;
  
  // Style extensions
  styleExtend?: Record<string, unknown>;
  
  // Style overrides
  styleOverrides?: Record<string, unknown>;
  
  // Conditional rendering
  conditions?: Condition[];
  
  // Event handlers
  actions?: Record<string, Action>;
  
  // Local state
  state?: StateConfig;
  
  // Child components
  children?: ComponentSpec | ComponentSpec[] | string;
}
```

## Common Properties

### Style Properties

```json
{
  "padding": 4,
  "margin": { "top": 2, "bottom": 2 },
  "width": "100%",
  "height": "auto",
  "display": "flex",
  "position": "relative",
  "background": "primary.100",
  "border": "1px solid gray-200",
  "borderRadius": "lg",
  "shadow": "md"
}
```

### Responsive Properties

```json
{
  "padding": {
    "base": 2,
    "md": 4,
    "lg": 6
  },
  "fontSize": {
    "base": "sm",
    "md": "base",
    "lg": "lg"
  }
}
```

### Spacing Values

```json
{
  "margin": 4,              // Theme scale value
  "padding": "1rem",        // CSS value
  "gap": "spacing.lg",      // Theme token
  "space": {                // Directional spacing
    "top": 2,
    "right": 4,
    "bottom": 2,
    "left": 4
  }
}
```

## Conditions

Conditional rendering based on state:

```typescript
interface Condition {
  when: WhenClause;
  // Properties to apply when condition is true
  [key: string]: unknown;
}

interface WhenClause {
  state?: string;
  is?: unknown;
  isNot?: unknown;
  greaterThan?: number;
  lessThan?: number;
  includes?: unknown;
  matches?: string | RegExp;
}
```

### Examples

```json
{
  "conditions": [
    {
      "when": { "state": "local.isOpen", "is": true },
      "display": "block"
    },
    {
      "when": { "state": "local.count", "greaterThan": 5 },
      "color": "red.500"
    },
    {
      "when": { "state": "local.status", "matches": "error.*" },
      "background": "error.100"
    }
  ]
}
```

## Actions

Event handlers and state updates:

```typescript
type Action = 
  | SetStateAction
  | ToggleStateAction
  | UpdateStateAction
  | BatchStateAction
  | NavigateAction
  | FetchDataAction
  | CustomAction;
```

### Action Examples

```json
{
  "actions": {
    "onClick": {
      "type": "setState",
      "state": "local",
      "key": "clicked",
      "value": true
    },
    "onChange": {
      "type": "updateState",
      "state": "form",
      "path": "fields.email",
      "value": "$event.target.value"
    },
    "onSubmit": {
      "type": "fetchData",
      "url": "/api/submit",
      "method": "POST",
      "body": "$state.form"
    }
  }
}
```

## State Configuration

Local state setup:

```typescript
interface StateConfig {
  initial?: Record<string, unknown>;
  computed?: Record<string, ComputedValue>;
  persist?: PersistConfig;
  validation?: ValidationConfig;
}
```

### Example

```json
{
  "state": {
    "initial": {
      "count": 0,
      "items": []
    },
    "computed": {
      "total": {
        "dependencies": ["items"],
        "compute": "return state.items.length"
      }
    },
    "persist": {
      "key": "myComponent",
      "storage": "local"
    }
  }
}
```

## Theme Tokens

Reference theme values:

```json
{
  "color": "primary.500",
  "background": "neutral.100",
  "spacing": 4,
  "fontSize": "lg",
  "fontWeight": "bold",
  "borderRadius": "md",
  "shadow": "lg",
  "zIndex": 10
}
```

## Special Syntax

### State References

```json
{
  "children": "$state.local.userName",
  "value": "$state.global.theme",
  "href": "$state.form.url"
}
```

### Event Properties

```json
{
  "actions": {
    "onChange": {
      "type": "setState",
      "value": "$event.target.value"
    },
    "onKeyDown": {
      "type": "conditional",
      "condition": {
        "value": "$event.key",
        "is": "Enter"
      }
    }
  }
}
```

### Template Literals

```json
{
  "children": "Hello, ${state.local.name}!",
  "title": "Count: ${state.local.count}"
}
```

### Array Operations

```json
{
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

## Validation Schema

JSON Schema validation:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["Button", "Input", "Select"]
    },
    "variant": {
      "type": "string",
      "enum": ["primary", "secondary", "outline"]
    }
  },
  "required": ["type"]
}
```

## Plugin Schema

Plugin configuration:

```typescript
interface Plugin {
  name: string;
  version: string;
  config?: Record<string, unknown>;
  components?: Record<string, ComponentSpec>;
  actions?: Record<string, ActionHandler>;
}
```

## Performance Hints

```json
{
  "optimize": {
    "memoize": true,
    "compareProps": ["id", "data"],
    "debounce": {
      "onChange": 300
    }
  }
}
```

## Debug Options

```json
{
  "debug": {
    "state": true,
    "actions": true,
    "renders": true,
    "performance": true
  }
}
```

## Complete Example

```json
{
  "root": {
    "type": "Container",
    "state": {
      "initial": {
        "user": null,
        "loading": false
      }
    },
    "children": [
      {
        "type": "Heading",
        "level": 1,
        "children": "Welcome"
      },
      {
        "type": "Form",
        "actions": {
          "onSubmit": {
            "type": "fetchData",
            "url": "/api/login",
            "method": "POST"
          }
        },
        "children": [
          {
            "type": "Input",
            "name": "email",
            "placeholder": "Email",
            "required": true
          },
          {
            "type": "Button",
            "type": "submit",
            "children": "Login",
            "conditions": [
              {
                "when": {
                  "state": "local.loading",
                  "is": true
                },
                "disabled": true
              }
            ]
          }
        ]
      }
    ]
  },
  "theme": {
    "colors": {
      "primary": {
        "500": "#3b82f6"
      }
    }
  }
}
```