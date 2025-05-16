# State Management

React Jedi provides a powerful state management system that works seamlessly with the JSON specification format. State can be defined at multiple levels and accessed throughout your component tree.

## Overview

The state system supports:
- **Local state** - Component-specific state
- **Global state** - Application-wide state
- **Form state** - Specialized form handling
- **Persistent state** - Local storage integration
- **Computed state** - Derived values
- **State actions** - Declarative state updates

## State Structure

```typescript
interface State {
  local: Record<string, unknown>;
  global: Record<string, unknown>;
  form?: FormState;
  ui?: UIState;
  computed?: ComputedState;
}
```

## Local State

Local state is scoped to a specific component and its children:

```json
{
  "type": "Box",
  "state": {
    "initial": {
      "isOpen": false,
      "count": 0
    }
  },
  "children": [
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
    },
    {
      "type": "Box",
      "conditions": [
        {
          "when": {
            "state": "local.isOpen",
            "is": true
          },
          "display": "block"
        },
        {
          "when": {
            "state": "local.isOpen",
            "is": false
          },
          "display": "none"
        }
      ],
      "children": "Hidden content"
    }
  ]
}
```

## Global State

Global state is accessible throughout the application:

```json
{
  "type": "UISpecification",
  "initialState": {
    "global": {
      "user": null,
      "theme": "light",
      "isAuthenticated": false
    }
  },
  "root": {
    "type": "Container",
    "children": []
  }
}
```

### Accessing Global State

```json
{
  "type": "Text",
  "children": "$state.global.user.name",
  "conditions": [
    {
      "when": {
        "state": "global.isAuthenticated",
        "is": true
      },
      "display": "block"
    }
  ]
}
```

## State Actions

### Set State

Updates a state value:

```json
{
  "type": "Button",
  "children": "Set Name",
  "actions": {
    "onClick": {
      "type": "setState",
      "state": "local",
      "key": "userName",
      "value": "John Doe"
    }
  }
}
```

### Toggle State

Toggles a boolean value:

```json
{
  "type": "Switch",
  "actions": {
    "onChange": {
      "type": "toggleState",
      "state": "local",
      "key": "darkMode"
    }
  }
}
```

### Update State

Updates nested state values:

```json
{
  "type": "Input",
  "actions": {
    "onChange": {
      "type": "updateState",
      "state": "local",
      "path": "form.fields.email",
      "value": "$event.target.value"
    }
  }
}
```

### Batch State

Updates multiple state values:

```json
{
  "type": "Button",
  "children": "Reset",
  "actions": {
    "onClick": {
      "type": "batchState",
      "updates": [
        {
          "state": "local",
          "key": "isOpen",
          "value": false
        },
        {
          "state": "local",
          "key": "selectedItem",
          "value": null
        }
      ]
    }
  }
}
```

## Form State

Special state management for forms:

```json
{
  "type": "Form",
  "state": {
    "initial": {
      "values": {
        "email": "",
        "password": ""
      },
      "errors": {},
      "isValid": false
    }
  },
  "children": [
    {
      "type": "Input",
      "name": "email",
      "value": "$state.form.values.email",
      "error": "$state.form.errors.email",
      "actions": {
        "onChange": {
          "type": "updateFormField",
          "field": "email",
          "value": "$event.target.value"
        },
        "onBlur": {
          "type": "validateField",
          "field": "email",
          "validators": ["required", "email"]
        }
      }
    }
  ]
}
```

## Computed State

Derived values based on other state:

```json
{
  "type": "Box",
  "state": {
    "computed": {
      "fullName": {
        "dependencies": ["local.firstName", "local.lastName"],
        "compute": "return `${state.local.firstName} ${state.local.lastName}`"
      },
      "itemCount": {
        "dependencies": ["local.items"],
        "compute": "return state.local.items.length"
      }
    }
  },
  "children": [
    {
      "type": "Text",
      "children": "$state.computed.fullName"
    }
  ]
}
```

## State Persistence

Save state to local storage:

```json
{
  "type": "Box",
  "state": {
    "initial": {
      "preferences": {
        "theme": "light",
        "language": "en"
      }
    },
    "persist": {
      "key": "user-preferences",
      "storage": "local",
      "include": ["preferences"]
    }
  }
}
```

## State Expressions

Use expressions in state references:

```json
{
  "type": "Text",
  "children": "$state.local.users[$state.local.selectedIndex].name"
}
```

### Expression Syntax

- **Direct access**: `$state.local.value`
- **Nested access**: `$state.local.user.profile.name`
- **Array access**: `$state.local.items[0]`
- **Dynamic access**: `$state.local.data[$state.local.key]`
- **Template literals**: `` `Hello ${state.local.name}` ``

## Conditional State

State-based conditional rendering:

```json
{
  "type": "Box",
  "conditions": [
    {
      "when": {
        "state": "local.status",
        "is": "loading"
      },
      "children": {
        "type": "Spinner"
      }
    },
    {
      "when": {
        "state": "local.status",
        "is": "error"
      },
      "children": {
        "type": "Alert",
        "variant": "error",
        "children": "$state.local.errorMessage"
      }
    },
    {
      "when": {
        "state": "local.status",
        "is": "success"
      },
      "children": "$state.local.data"
    }
  ]
}
```

## State Validation

Validate state values:

```json
{
  "type": "Box",
  "state": {
    "initial": {
      "email": ""
    },
    "validation": {
      "email": {
        "required": true,
        "pattern": "^[^@]+@[^@]+\\.[^@]+$",
        "message": "Please enter a valid email"
      }
    }
  }
}
```

## State Debugging

Enable state debugging:

```json
{
  "type": "UISpecification",
  "debug": {
    "state": true,
    "actions": true,
    "renders": true
  },
  "root": {}
}
```

## Performance Optimization

### State Memoization

```json
{
  "type": "Box",
  "state": {
    "memoize": ["expensiveComputation"],
    "computed": {
      "expensiveComputation": {
        "dependencies": ["local.data"],
        "compute": "return processData(state.local.data)"
      }
    }
  }
}
```

### Selective Updates

```json
{
  "type": "Box",
  "state": {
    "optimize": {
      "batchUpdates": true,
      "debounce": {
        "searchQuery": 300
      }
    }
  }
}
```

## State Patterns

### Loading States

```json
{
  "type": "Box",
  "state": {
    "initial": {
      "loading": true,
      "data": null,
      "error": null
    }
  },
  "children": [
    {
      "type": "Button",
      "children": "Load Data",
      "actions": {
        "onClick": [
          {
            "type": "setState",
            "state": "local",
            "key": "loading",
            "value": true
          },
          {
            "type": "fetchData",
            "url": "/api/data",
            "onSuccess": {
              "type": "batchState",
              "updates": [
                { "key": "data", "value": "$response" },
                { "key": "loading", "value": false }
              ]
            },
            "onError": {
              "type": "batchState",
              "updates": [
                { "key": "error", "value": "$error.message" },
                { "key": "loading", "value": false }
              ]
            }
          }
        ]
      }
    }
  ]
}
```

### Modal State

```json
{
  "type": "Box",
  "state": {
    "initial": {
      "modals": {
        "confirmation": false,
        "settings": false
      }
    }
  },
  "children": [
    {
      "type": "Button",
      "children": "Open Settings",
      "actions": {
        "onClick": {
          "type": "setState",
          "state": "local",
          "key": "modals.settings",
          "value": true
        }
      }
    }
  ]
}
```

## Best Practices

1. Keep state as flat as possible
2. Use computed state for derived values
3. Implement proper validation
4. Handle loading and error states
5. Use state persistence for user preferences
6. Debounce frequent state updates
7. Clean up state when components unmount
8. Document complex state structures

## TypeScript Support

```typescript
interface ComponentState {
  local: {
    isOpen: boolean;
    count: number;
    user: User | null;
  };
  global: {
    theme: "light" | "dark";
    language: string;
  };
}

// Type-safe state access
const isOpen = state.local.isOpen;
const theme = state.global.theme;
```