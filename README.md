<div align="center">
  
# React Jedi 🪄
  
<p align="center">
  <strong>Build stunning modern UIs with JSON specifications</strong>
</p>

<p align="center">
  <a href="#installation"><strong>Install</strong></a> •
  <a href="#getting-started"><strong>Quick Start</strong></a> •
  <a href="#features"><strong>Features</strong></a> •
  <a href="#documentation"><strong>Docs</strong></a> •
  <a href="./examples"><strong>Examples</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License" />
</p>

</div>

## 🔥 Server-Driven UI on Steroids

React Jedi is a next-generation **npm library** for building visually stunning interfaces through pure JSON specifications. It combines the power of React, TailwindCSS, and ShadCN components to create a streamlined development experience.

> **Note:** This project is in active development. Milestone 1 (Static Components) is complete with all basic UI components ready for use.

## 📸 Screenshots

<div align="center">
  <p><em>Screenshots coming soon! Visit our <a href="./examples">Examples App</a> to see the components in action.</em></p>
</div>

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

React Jedi makes it incredibly easy to build UI components with JSON. Here's how to get started:

### Basic Example

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

### TypeScript Support

```typescript
import { render, ComponentSpec } from "@banja/react-jedi";

// Type-safe component specification
const spec: ComponentSpec = {
  type: "container",
  maxWidth: "xl",
  padding: "md",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Type-Safe UI",
      gradient: "rainbow"
    }
  ]
};

function MyApp() {
  return (
    <div className="app">
      {render({ spec })}
    </div>
  );
}
```

### Complex Example

Create stunning layouts by combining multiple components:

```json
{
  "type": "container",
  "maxWidth": "lg",
  "padding": "lg",
  "children": [
    {
      "type": "heading",
      "level": "h1",
      "content": "Welcome to React Jedi",
      "gradient": "rainbow",
      "size": "5xl",
      "align": "center"
    },
    {
      "type": "separator",
      "orientation": "horizontal",
      "className": "my-8"
    },
    {
      "type": "grid",
      "columns": { "default": 1, "md": 2, "lg": 3 },
      "gap": "lg",
      "children": [
        {
          "type": "card",
          "className": "hover:border-emerald-500/50 transition-all",
          "children": [
            {
              "type": "heading",
              "level": "h3",
              "content": "Feature One"
            },
            {
              "type": "text",
              "text": "Build beautiful UIs with JSON specifications"
            }
          ]
        }
      ]
    }
  ]
}
```

## 🌈 Component Examples

### Layout Components

**Container** - A centered wrapper with max-width and padding:
```json
{
  "type": "container",
  "maxWidth": "xl",
  "padding": "md",
  "align": "center",
  "children": []
}
```

**Grid** - Responsive grid layout:
```json
{
  "type": "grid",
  "columns": {
    "default": 1,
    "sm": 2,
    "md": 3,
    "lg": 4
  },
  "gap": "lg",
  "children": []
}
```

**Flex** - Flexible box layout:
```json
{
  "type": "flex",
  "direction": "row",
  "wrap": "wrap",
  "justify": "between",
  "align": "center",
  "gap": "md",
  "children": []
}
```

### Typography Components

**Heading** - Semantic headings with styling:
```json
{
  "type": "heading",
  "level": "h1",
  "content": "Page Title",
  "size": "5xl",
  "weight": "extrabold",
  "gradient": "rainbow",
  "align": "center"
}
```

**Text** - Rich text with multiple styles:
```json
{
  "type": "text",
  "text": "This is styled paragraph text with advanced features.",
  "size": "lg",
  "weight": "medium",
  "variant": "primary",
  "gradient": "ocean"
}
```

### UI Components

**Button** - Interactive buttons:
```json
{
  "type": "button",
  "text": "Click Me",
  "variant": "primary",
  "size": "lg",
  "loading": false,
  "disabled": false
}
```

**Card** - Content containers:
```json
{
  "type": "card",
  "children": [
    {
      "type": "heading",
      "level": "h3",
      "content": "Card Title"
    },
    {
      "type": "text",
      "text": "Card content goes here."
    }
  ]
}
```

**Badge** - Status indicators:
```json
{
  "type": "badge",
  "text": "New",
  "variant": "default",
  "size": "default"
}
```

## 📚 Documentation

For comprehensive documentation with live examples and interactive code snippets, check out our [Examples App](./examples).

### Run the Examples Locally

```bash
# Clone the repository
git clone https://github.com/banja-au/react-jedi.git
cd react-jedi

# Install dependencies
npm install

# Run the examples app
cd examples
npm install
npm run dev
```

The documentation covers:
- ✅ Component API reference
- ✅ Smooth page transitions and scroll behavior
- ✅ Layout components (Container, Box, Grid, Flex)
- ✅ Typography components (Heading, Text, BlockQuote)
- ✅ UI components (Button, Card, Badge, Avatar)
- ✅ Form components (Input, Label)
- ✅ Complete code examples for all components
- ✅ Complex real-world examples
- ✅ TypeScript support documentation
- ✅ Best practices and patterns

## 🔧 TypeScript Support

React Jedi is built with TypeScript and provides comprehensive type definitions for all components:

```typescript
import { ComponentSpec, ContainerSpec, HeadingSpec } from "@banja/react-jedi";

// Type-safe component specifications
const container: ContainerSpec = {
  type: "container",
  maxWidth: "xl",
  padding: "md"
};

const heading: HeadingSpec = {
  type: "heading",
  level: "h1",
  content: "Welcome",
  gradient: "rainbow"
};
```

## 🧩 Component Library

React Jedi includes a comprehensive set of beautiful components based on ShadCN and custom implementations.

### ✅ Milestone 1: Static Components (Complete)
- **Layout**: Container, Box, Grid, Flex, AspectRatio, Separator
- **Typography**: Heading, Text, BlockQuote
- **UI**: Button, Card, Badge, Avatar, Skeleton, Image
- **Form**: Input, Label

### 🚧 Upcoming Milestones
- **Milestone 2**: Theming System & Advanced Styling
- **Milestone 3**: Interactive Components (Forms, Modals, Dropdowns)
- **Milestone 4**: Advanced Layouts & Navigation
- **Milestone 5**: Animations & Transitions
- **Milestone 6**: Data Integration & State Management

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
