# State Management Patterns in React Jedi

This guide covers state management patterns and best practices for building dynamic applications with React Jedi's JSON-driven approach.

## Table of Contents

1. [Overview](#overview)
2. [Basic State Management](#basic-state-management)
3. [Advanced Patterns](#advanced-patterns)
4. [Performance Considerations](#performance-considerations)
5. [Best Practices](#best-practices)
6. [Debugging State](#debugging-state)

## Overview

React Jedi provides a declarative state management system that works seamlessly with JSON specifications. State can be defined at any component level and flows through the component tree following React's standard patterns.

### Key Features

- **Local Component State**: Isolated state per component instance
- **Global Application State**: Shared state across components
- **Computed Values**: Derived state based on other state values
- **Event-Driven Updates**: State changes triggered by user interactions
- **Persistence Options**: Local storage and session storage support

## Basic State Management

### Defining Initial State

State is defined in your JSON specification using the `state` property:

```json
{
  "type": "Container",
  "state": {
    "count": 0,
    "user": {
      "name": "Guest",
      "isLoggedIn": false
    },
    "items": []
  },
  "children": [
    {
      "type": "Text",
      "children": "Count: {{ state.count }}"
    }
  ]
}
```

### State Updates via Actions

State is updated through actions triggered by events:

```json
{
  "type": "Button",
  "children": "Increment",
  "onClick": {
    "type": "setState",
    "updates": {
      "count": "{{ state.count + 1 }}"
    }
  }
}
```

### Multiple State Updates

Update multiple state values in a single action:

```json
{
  "type": "Button",
  "children": "Login",
  "onClick": {
    "type": "setState",
    "updates": {
      "user.name": "John Doe",
      "user.isLoggedIn": true,
      "lastLogin": "{{ Date.now() }}"
    }
  }
}
```

## Advanced Patterns

### Computed Values

Define derived state that automatically updates when dependencies change:

```json
{
  "type": "Container",
  "state": {
    "items": [
      { "name": "Apple", "price": 1.50, "quantity": 2 },
      { "name": "Banana", "price": 0.75, "quantity": 3 }
    ]
  },
  "computed": {
    "total": "{{ state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) }}",
    "itemCount": "{{ state.items.reduce((sum, item) => sum + item.quantity, 0) }}"
  },
  "children": [
    {
      "type": "Text",
      "children": "Total: ${{ computed.total.toFixed(2) }}"
    }
  ]
}
```

### Conditional State Updates

Update state conditionally based on current values:

```json
{
  "type": "Button",
  "children": "Toggle",
  "onClick": {
    "type": "setState",
    "updates": {
      "isOpen": "{{ !state.isOpen }}",
      "toggleCount": "{{ state.toggleCount + 1 }}"
    },
    "condition": "{{ state.canToggle }}"
  }
}
```

### Array Operations

Working with arrays in state:

```json
{
  "type": "Container",
  "state": {
    "todos": []
  },
  "children": [
    {
      "type": "Button",
      "children": "Add Todo",
      "onClick": {
        "type": "setState",
        "updates": {
          "todos": "{{ [...state.todos, { id: Date.now(), text: 'New Todo', done: false }] }}"
        }
      }
    },
    {
      "type": "Flex",
      "direction": "column",
      "children": "{{ state.todos.map(todo => ({ type: 'TodoItem', key: todo.id, todo: todo })) }}"
    }
  ]
}
```

### State Composition

Compose state from multiple sources:

```json
{
  "type": "Container",
  "state": {
    "form": {
      "name": "",
      "email": ""
    },
    "validation": {
      "nameError": null,
      "emailError": null
    },
    "ui": {
      "isSubmitting": false,
      "showSuccess": false
    }
  },
  "computed": {
    "isValid": "{{ state.form.name && state.form.email && !state.validation.nameError && !state.validation.emailError }}",
    "canSubmit": "{{ computed.isValid && !state.ui.isSubmitting }}"
  }
}
```

## Performance Considerations

### State Update Optimization

1. **Batch Updates**: Multiple state updates in the same action are batched automatically
2. **Shallow Comparison**: State updates only trigger re-renders when values actually change
3. **Selective Updates**: Update only the necessary parts of nested state

```json
{
  "type": "Button",
  "onClick": {
    "type": "setState",
    "updates": {
      "user.profile.name": "{{ newName }}",
      "user.profile.updatedAt": "{{ Date.now() }}"
    }
  }
}
```

### Memoization with State

Components automatically memoize based on their props and relevant state:

```json
{
  "type": "ExpensiveComponent",
  "data": "{{ state.filteredData }}",
  "memoize": {
    "keys": ["data", "state.sortOrder"],
    "maxAge": 5000
  }
}
```

### State Persistence

Enable automatic state persistence:

```json
{
  "type": "Container",
  "state": {
    "preferences": {
      "theme": "light",
      "language": "en"
    }
  },
  "statePersistence": {
    "enabled": true,
    "storage": "localStorage",
    "key": "app-preferences",
    "include": ["preferences"]
  }
}
```

## Best Practices

### 1. State Structure

Keep state flat where possible:

```json
// Good
{
  "state": {
    "userId": 123,
    "userName": "John",
    "userEmail": "john@example.com"
  }
}

// Avoid deep nesting
{
  "state": {
    "user": {
      "profile": {
        "personal": {
          "name": "John"
        }
      }
    }
  }
}
```

### 2. State Initialization

Use factories for complex initial state:

```json
{
  "type": "Container",
  "state": "{{ createInitialState() }}",
  "stateFactories": {
    "createInitialState": "() => ({ items: [], filters: { category: 'all' }, sort: 'date' })"
  }
}
```

### 3. State Updates

Keep update logic simple and readable:

```json
{
  "type": "Button",
  "onClick": {
    "type": "dispatch",
    "action": "addToCart",
    "payload": "{{ { itemId: props.id, quantity: 1 } }}"
  }
}
```

### 4. Computed Values

Use computed values for derived state instead of storing redundant data:

```json
{
  "computed": {
    "fullName": "{{ state.firstName + ' ' + state.lastName }}",
    "isAdult": "{{ state.age >= 18 }}",
    "hasItems": "{{ state.items.length > 0 }}"
  }
}
```

## Debugging State

### State Inspector

Enable the state debugger in development:

```tsx
import { render } from "@banja/react-jedi";

const ui = render(specification, {
  debug: {
    state: true,
    showInspector: true
  }
});
```

### State Change Logging

Track state changes:

```json
{
  "type": "Container",
  "state": {
    "count": 0
  },
  "stateChangeHandlers": {
    "onStateChange": "{{ (changes) => console.log('State changed:', changes) }}"
  }
}
```

### State Validation

Add runtime validation for state updates:

```json
{
  "type": "Container",
  "state": {
    "age": 0
  },
  "stateValidation": {
    "age": {
      "type": "number",
      "min": 0,
      "max": 150,
      "required": true
    }
  }
}
```

## Complex Example: Todo App with State Management

Here's a complete example demonstrating various state management patterns:

```json
{
  "type": "Container",
  "state": {
    "todos": [],
    "filter": "all",
    "newTodoText": "",
    "editingId": null
  },
  "computed": {
    "filteredTodos": "{{ state.filter === 'all' ? state.todos : state.filter === 'active' ? state.todos.filter(t => !t.done) : state.todos.filter(t => t.done) }}",
    "activeTodoCount": "{{ state.todos.filter(t => !t.done).length }}",
    "completedTodoCount": "{{ state.todos.filter(t => t.done).length }}"
  },
  "children": [
    {
      "type": "Heading",
      "level": 1,
      "children": "Todo List"
    },
    {
      "type": "Flex",
      "gap": 2,
      "children": [
        {
          "type": "Input",
          "value": "{{ state.newTodoText }}",
          "placeholder": "What needs to be done?",
          "onChange": {
            "type": "setState",
            "updates": {
              "newTodoText": "{{ event.target.value }}"
            }
          },
          "onKeyPress": {
            "type": "setState",
            "condition": "{{ event.key === 'Enter' && state.newTodoText.trim() }}",
            "updates": {
              "todos": "{{ [...state.todos, { id: Date.now(), text: state.newTodoText.trim(), done: false }] }}",
              "newTodoText": ""
            }
          }
        },
        {
          "type": "Button",
          "children": "Add",
          "onClick": {
            "type": "setState",
            "condition": "{{ state.newTodoText.trim() }}",
            "updates": {
              "todos": "{{ [...state.todos, { id: Date.now(), text: state.newTodoText.trim(), done: false }] }}",
              "newTodoText": ""
            }
          }
        }
      ]
    },
    {
      "type": "Flex",
      "gap": 2,
      "className": "mt-4",
      "children": [
        {
          "type": "Button",
          "variant": "{{ state.filter === 'all' ? 'primary' : 'outline' }}",
          "children": "All ({{ state.todos.length }})",
          "onClick": {
            "type": "setState",
            "updates": { "filter": "all" }
          }
        },
        {
          "type": "Button",
          "variant": "{{ state.filter === 'active' ? 'primary' : 'outline' }}",
          "children": "Active ({{ computed.activeTodoCount }})",
          "onClick": {
            "type": "setState",
            "updates": { "filter": "active" }
          }
        },
        {
          "type": "Button",
          "variant": "{{ state.filter === 'completed' ? 'primary' : 'outline' }}",
          "children": "Completed ({{ computed.completedTodoCount }})",
          "onClick": {
            "type": "setState",
            "updates": { "filter": "completed" }
          }
        }
      ]
    },
    {
      "type": "Flex",
      "direction": "column",
      "gap": 2,
      "className": "mt-4",
      "children": "{{ computed.filteredTodos.map(todo => ({ type: 'TodoItem', key: todo.id, ...todo })) }}"
    }
  ]
}
```

## Summary

React Jedi's state management system provides:

- **Declarative state definition** in JSON specifications
- **Flexible update patterns** via actions and events
- **Computed values** for derived state
- **Performance optimizations** built-in
- **Debugging tools** for development
- **Persistence options** for user preferences

By following these patterns and best practices, you can build complex, performant applications with React Jedi's server-driven UI approach.