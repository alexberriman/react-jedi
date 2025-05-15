<div align="center">
  
# React Jedi 🪄
  
<p align="center">
  <strong>Rapidly build stunning modern websites using structured JSON configurations.</strong>
</p>

<p align="center">
  <a href="#installation"><strong>Install</strong></a> •
  <a href="#getting-started"><strong>Quick Start</strong></a> •
  <a href="#features"><strong>Features</strong></a> •
  <a href="#documentation"><strong>Docs</strong></a>
</p>

</div>

## 🔥 Server-Driven UI on Steroids

React Jedi is a next-generation **npm library** for building visually stunning interfaces through pure JSON specifications. It combines the power of React, TailwindCSS, and ShadCN components to create a streamlined development experience.

> **Note:** This project is currently under active development.

## ✨ Features

- **Zero Lock-in**: Import what you need, integrate with any React app
- **Dynamic JSON-Driven Rendering**: Define entire UIs with pure JSON
- **Single Function API**: Simple `render()` function for all UI needs
- **Real-Time UI Generation**: Create interfaces on-the-fly
- **Nested Components**: Build complex UIs with JSON composition
- **Reactive State**: Manage component state directly in specifications
- **Conditional Rendering**: Implement logic in your JSON schema
- **Event Handling**: Define handlers within your specifications
- **Animation Framework**: Declarative animations for all interactions
- **Theme Inheritance**: Cascading styles through component hierarchy

## 🚀 Installation

```bash
npm install @banja/react-jedi
```

## 🏄‍♂️ Getting Started

React Jedi makes it incredibly easy to build UI components with JSON. Here's a simple example:

```jsx
import { render } from "@banja/react-jedi";

// JSON specification for a simple UI
const spec = {
  type: "container",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Hello, React Jedi!"
    },
    {
      type: "text",
      text: "Building UIs with JSON specifications."
    }
  ]
};

// Render the UI
function MyComponent() {
  return render({ spec });
}
```

## 🌈 Specification Structure

Every component specification follows this general structure:

```json
{
  "type": "componentType",    // Required: The type of component to render
  
  // Component-specific properties
  "prop1": "value1",          // String properties
  "prop2": 123,               // Number properties
  "prop3": true,              // Boolean properties
  "prop4": {                  // Object properties
    "nestedProp": "value"
  },
  "prop5": ["item1", "item2"], // Array properties
  
  // Children (for container components)
  "children": [               // Array of child component specifications
    {
      "type": "childType",
      // Child component properties...
    }
  ]
}
```

## 📚 Documentation

For comprehensive documentation on components, schemas, and usage examples, visit our [Documentation Page](https://react-jedi.dev/documentation).

The documentation covers:
- Component API reference
- Layout components
- Typography components
- UI components
- Form components
- Code snippets for all components
- Best practices and examples

## 🔧 TypeScript Support

React Jedi is being built with TypeScript to provide full type safety.

## 🧩 Planned Components

React Jedi will include a comprehensive set of beautiful components based on ShadCN and custom implementations.

## ⚡ Performance Benchmarking

React Jedi includes a built-in performance benchmarking system to ensure components meet strict performance standards:

```bash
# Run all component benchmarks
npm run benchmark

# Run benchmarks with UI for interactive analysis
npm run benchmark:ui

# Generate benchmark report
npm run benchmark:report
```

Performance benchmarks help maintain a fast user experience by:

- Measuring render, update, and unmount times for all components
- Analyzing memory usage and operations per second
- Detecting performance regressions
- Enforcing performance budgets for components

See the [benchmark documentation](src/benchmark/README.md) for more details on creating and running benchmarks.

## 🤝 Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

## 📄 License

React Jedi is [ISC licensed](LICENSE).