# React Jedi API Documentation

This comprehensive documentation provides detailed information about all components, types, and utilities available in the React Jedi library.

## Overview

React Jedi is a powerful Server-Driven UI (SDUI) library that allows you to build dynamic, beautiful interfaces using JSON specifications. Each component is carefully designed to work seamlessly with the specification system while maintaining optimal performance.

## Documentation Structure

- [Component Reference](./components/README.md) - Detailed documentation for each component
- [Type System](./types.md) - TypeScript type definitions and interfaces
- [Theme System](./theme.md) - Theming and styling system documentation
- [State Management](./state.md) - State management patterns and APIs
- [Events](./events.md) - Event handling and action system
- [Performance](./performance.md) - Performance optimization guidelines
- [Data Fetching](./data-fetching.md) - Data fetching and caching system

## Quick Links

### Core Components

- [Layout Components](./components/layout/README.md) - Box, Container, Grid, Flex, etc.
- [Typography Components](./components/typography/README.md) - Heading, Text, BlockQuote
- [UI Components](./components/ui/README.md) - Button, Card, Badge, etc.
- [Form Components](./components/form/README.md) - Input, Select, Switch, etc.
- [Interactive Components](./components/interactive/README.md) - Dialog, Dropdown, etc.

## Component API Pattern

All components in React Jedi follow a consistent API pattern:

1. **Type-safe Specification** - Each component has a TypeScript interface defining its JSON schema
2. **Default Values** - Sensible defaults for all optional properties
3. **Theme Integration** - Automatic theming support through the ThemeProvider
4. **State Management** - Built-in state handling for interactive components
5. **Event Handlers** - Declarative event binding through the action system

### Example Component Specification

```typescript
interface ButtonSpec extends BaseComponentSpec {
  type: "Button";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  children: string | BaseComponentSpec | BaseComponentSpec[];
}
```

### Example Usage

```json
{
  "type": "Button",
  "variant": "primary",
  "size": "lg",
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

## Common Properties

All components extend from `BaseComponentSpec` which provides:

- `type`: Component type identifier
- `id`: Optional unique identifier
- `styleExtend`: Custom styles to extend defaults
- `styleOverrides`: Complete style replacement
- `conditions`: Conditional rendering rules
- `actions`: Event handler definitions
- `state`: Local state configuration

## Getting Started

1. Import the library:
   ```typescript
   import { render } from '@banja/react-jedi';
   ```

2. Define your UI specification:
   ```typescript
   const spec = {
     type: "Container",
     children: [
       {
         type: "Heading",
         level: 1,
         children: "Welcome to React Jedi"
       }
     ]
   };
   ```

3. Render the UI:
   ```typescript
   render({ specification: spec }, targetElement);
   ```

## Next Steps

- Explore the [Component Reference](./components/README.md) for detailed component documentation
- Learn about the [Theme System](./theme.md) for customizing your application's look
- Understand [State Management](./state.md) patterns for building interactive UIs
- Optimize performance with our [Performance Guide](./performance.md)