# Event System

React Jedi provides a comprehensive event system that allows components to handle user interactions and trigger actions through JSON specifications.

## Overview

The event system features:
- **Declarative event binding** - Define handlers in JSON
- **Action dispatching** - Trigger state updates and effects
- **Event delegation** - Efficient event handling
- **Custom events** - Application-specific events
- **Event modifiers** - Control event behavior
- **Async actions** - Handle asynchronous operations

## Event Handler Syntax

```json
{
  "type": "Button",
  "children": "Click Me",
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

## Supported Events

### Mouse Events
- `onClick`
- `onDoubleClick`
- `onMouseDown`
- `onMouseUp`
- `onMouseEnter`
- `onMouseLeave`
- `onMouseOver`
- `onMouseOut`
- `onMouseMove`

### Keyboard Events
- `onKeyDown`
- `onKeyUp`
- `onKeyPress`

### Form Events
- `onChange`
- `onInput`
- `onSubmit`
- `onFocus`
- `onBlur`

### Touch Events
- `onTouchStart`
- `onTouchEnd`
- `onTouchMove`
- `onTouchCancel`

### Other Events
- `onScroll`
- `onWheel`
- `onCopy`
- `onCut`
- `onPaste`
- `onDrag`
- `onDragEnd`
- `onDragEnter`
- `onDragLeave`
- `onDragOver`
- `onDragStart`
- `onDrop`

## Action Types

### State Actions

#### setState
Updates a state value:

```json
{
  "actions": {
    "onClick": {
      "type": "setState",
      "state": "local",
      "key": "count",
      "value": 10
    }
  }
}
```

#### toggleState
Toggles a boolean value:

```json
{
  "actions": {
    "onClick": {
      "type": "toggleState",
      "state": "local",
      "key": "isOpen"
    }
  }
}
```

#### updateState
Updates nested state:

```json
{
  "actions": {
    "onChange": {
      "type": "updateState",
      "state": "local",
      "path": "user.profile.name",
      "value": "$event.target.value"
    }
  }
}
```

#### batchState
Multiple state updates:

```json
{
  "actions": {
    "onClick": {
      "type": "batchState",
      "updates": [
        {
          "state": "local",
          "key": "loading",
          "value": false
        },
        {
          "state": "local",
          "key": "data",
          "value": "$response"
        }
      ]
    }
  }
}
```

### Navigation Actions

#### navigate
Navigate to a URL:

```json
{
  "actions": {
    "onClick": {
      "type": "navigate",
      "url": "/dashboard",
      "target": "_self"
    }
  }
}
```

#### redirect
Redirect to external URL:

```json
{
  "actions": {
    "onClick": {
      "type": "redirect",
      "url": "https://example.com",
      "target": "_blank"
    }
  }
}
```

### Form Actions

#### submitForm
Submit form data:

```json
{
  "type": "Form",
  "actions": {
    "onSubmit": {
      "type": "submitForm",
      "url": "/api/submit",
      "method": "POST",
      "onSuccess": {
        "type": "setState",
        "state": "local",
        "key": "submitted",
        "value": true
      },
      "onError": {
        "type": "setState",
        "state": "local",
        "key": "error",
        "value": "$error.message"
      }
    }
  }
}
```

#### validateField
Validate form field:

```json
{
  "actions": {
    "onBlur": {
      "type": "validateField",
      "field": "email",
      "validators": ["required", "email"],
      "onInvalid": {
        "type": "setState",
        "state": "form",
        "key": "errors.email",
        "value": "$validation.message"
      }
    }
  }
}
```

### Custom Actions

#### dispatch
Dispatch custom action:

```json
{
  "actions": {
    "onClick": {
      "type": "dispatch",
      "action": "USER_LOGIN",
      "payload": {
        "username": "$state.form.username",
        "password": "$state.form.password"
      }
    }
  }
}
```

#### custom
Execute custom function:

```json
{
  "actions": {
    "onClick": {
      "type": "custom",
      "handler": "handleCustomClick",
      "args": ["$event", "$state.local.data"]
    }
  }
}
```

## Event Modifiers

### preventDefault
Prevent default behavior:

```json
{
  "type": "Form",
  "actions": {
    "onSubmit": {
      "type": "submitForm",
      "preventDefault": true,
      "url": "/api/submit"
    }
  }
}
```

### stopPropagation
Stop event bubbling:

```json
{
  "actions": {
    "onClick": {
      "type": "setState",
      "stopPropagation": true,
      "state": "local",
      "key": "clicked",
      "value": true
    }
  }
}
```

### once
Execute only once:

```json
{
  "actions": {
    "onClick": {
      "type": "setState",
      "once": true,
      "state": "local",
      "key": "initialized",
      "value": true
    }
  }
}
```

### debounce
Debounce execution:

```json
{
  "type": "Input",
  "actions": {
    "onChange": {
      "type": "setState",
      "debounce": 300,
      "state": "local",
      "key": "searchQuery",
      "value": "$event.target.value"
    }
  }
}
```

### throttle
Throttle execution:

```json
{
  "actions": {
    "onScroll": {
      "type": "setState",
      "throttle": 100,
      "state": "local",
      "key": "scrollPosition",
      "value": "$event.target.scrollTop"
    }
  }
}
```

## Event Chaining

Execute multiple actions:

```json
{
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
        "url": "/api/data"
      },
      {
        "type": "setState",
        "state": "local",
        "key": "loading",
        "value": false
      }
    ]
  }
}
```

## Conditional Actions

Execute actions conditionally:

```json
{
  "actions": {
    "onClick": {
      "type": "conditional",
      "condition": {
        "state": "local.isValid",
        "is": true
      },
      "then": {
        "type": "submitForm",
        "url": "/api/submit"
      },
      "else": {
        "type": "setState",
        "state": "local",
        "key": "showError",
        "value": true
      }
    }
  }
}
```

## Async Actions

### fetchData
Fetch data from API:

```json
{
  "actions": {
    "onClick": {
      "type": "fetchData",
      "url": "/api/users",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer $state.global.token"
      },
      "onSuccess": {
        "type": "setState",
        "state": "local",
        "key": "users",
        "value": "$response.data"
      },
      "onError": {
        "type": "setState",
        "state": "local",
        "key": "error",
        "value": "$error.message"
      }
    }
  }
}
```

### delay
Delay action execution:

```json
{
  "actions": {
    "onClick": {
      "type": "delay",
      "duration": 1000,
      "then": {
        "type": "setState",
        "state": "local",
        "key": "delayed",
        "value": true
      }
    }
  }
}
```

## Event Context

Access event properties:

```json
{
  "type": "Input",
  "actions": {
    "onChange": {
      "type": "setState",
      "state": "local",
      "key": "inputValue",
      "value": "$event.target.value"
    },
    "onKeyDown": {
      "type": "conditional",
      "condition": {
        "value": "$event.key",
        "is": "Enter"
      },
      "then": {
        "type": "submitForm"
      }
    }
  }
}
```

### Available Event Properties

- `$event` - The native event object
- `$event.target` - The event target element
- `$event.target.value` - Input value
- `$event.key` - Keyboard key
- `$event.keyCode` - Key code
- `$event.clientX/Y` - Mouse coordinates
- `$event.ctrlKey` - Control key pressed
- `$event.shiftKey` - Shift key pressed
- `$event.altKey` - Alt key pressed
- `$event.metaKey` - Meta key pressed

## Custom Event Handlers

Register custom handlers:

```typescript
import { registerHandler } from '@banja/react-jedi';

registerHandler('customAction', (context, params) => {
  const { state, setState, event } = context;
  
  // Custom logic here
  setState('local', 'customValue', params.value);
});
```

Use in specification:

```json
{
  "actions": {
    "onClick": {
      "type": "customAction",
      "value": "Hello"
    }
  }
}
```

## Event Debugging

Enable event debugging:

```json
{
  "type": "UISpecification",
  "debug": {
    "events": true,
    "actions": true
  },
  "root": {}
}
```

## Best Practices

1. Use semantic event names
2. Keep actions focused and simple
3. Handle errors appropriately
4. Use debounce for frequent events
5. Validate input before actions
6. Document custom event handlers
7. Test event chains thoroughly
8. Consider accessibility for events

## Performance

- Events are delegated for efficiency
- Actions are memoized when possible
- Debounce/throttle expensive operations
- Use conditional actions to skip unnecessary work
- Batch state updates when possible