<div align="center">
  
# React Jedi 🚀
  
<p align="center">
  <strong>Build React UIs with JSON • Server-Driven UI Made Simple</strong>
</p>

<p align="center">
  <a href="#installation"><strong>Install</strong></a> •
  <a href="#quick-start"><strong>Quick Start</strong></a> •
  <a href="#features"><strong>Features</strong></a> •
  <a href="#documentation"><strong>Docs</strong></a> •
  <a href="./examples"><strong>Demo</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@banja/react-jedi?style=flat&colorA=000000&colorB=000000" alt="NPM Version" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License" />
</p>

</div>

## What is React Jedi?

React Jedi is a **Server-Driven UI (SDUI) library** that transforms JSON specifications into fully functional React components. With just a single `render()` function, you can build complete user interfaces without writing traditional React code.

**Why React Jedi?**
- 🎯 **One Function, Infinite Possibilities** - Just `render({ spec })` 
- 🔥 **Beautiful by Default** - Powered by TailwindCSS and ShadCN components
- 🚀 **Zero Lock-in** - Import only what you need, works with any React app
- 📱 **Server-Driven** - Update UIs without app deployments
- 🎨 **Theme Inheritance** - Cascading styles through component hierarchy
- ⚡ **Production Ready** - TypeScript, comprehensive testing, performance optimized

## 🚀 Installation

```bash
npm install @banja/react-jedi
```

## Quick Start

Transform JSON into beautiful React components with a single function:

```jsx
import { render } from "@banja/react-jedi";

const spec = {
  type: "flex",
  direction: "column",
  gap: "lg",
  children: [
    {
      type: "heading",
      level: "h1",
      content: "Welcome to React Jedi",
      gradient: "rainbow"
    },
    {
      type: "button",
      text: "Get Started",
      variant: "primary",
      size: "lg"
    }
  ]
};

function App() {
  return <>{render({ spec })}</>;
}
```

That's it! No component imports, no styling setup - just JSON and `render()`.

## How It Works

React Jedi uses a powerful schema-based approach:

```javascript
// 1. Define your UI as JSON
const loginForm = {
  type: "card",
  className: "max-w-md mx-auto",
  children: [
    {
      type: "heading",
      level: "h2",
      content: "Sign In"
    },
    {
      type: "form",
      children: [
        {
          type: "input",
          placeholder: "Email",
          type: "email"
        },
        {
          type: "input",
          placeholder: "Password",
          type: "password"
        },
        {
          type: "button",
          text: "Login",
          variant: "primary",
          className: "w-full"
        }
      ]
    }
  ]
};

// 2. Render it
function LoginPage() {
  return render({ spec: loginForm });
}
```

## Features

### 🎯 Core Features

- **Single Function API** - Just `render({ spec })` to create any UI
- **50+ Beautiful Components** - Buttons, cards, forms, layouts, and more
- **TypeScript First** - Full type safety and intellisense
- **Zero Configuration** - Works out of the box with any React app
- **Performance Optimized** - Automatic memoization and lazy loading
- **Accessibility Built-in** - ARIA attributes and keyboard navigation

### 🎨 Advanced Features

- **Conditional Rendering** - Show/hide components based on state
- **Event Handling** - Click, hover, and form events in JSON
- **Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first with breakpoint support
- **Theme System** - Dark mode and custom themes
- **State Management** - Reactive state directly in JSON

## Component Library

React Jedi includes 50+ production-ready components:

### Layout Components
`Container` `Box` `Flex` `Grid` `Stack` `Group` `Center` `SimpleGrid` `Spacer`

### Typography
`Heading` `Text` `BlockQuote` 

### Form Components
`Form` `Input` `Textarea` `Select` `Checkbox` `RadioGroup` `Switch` `Toggle` `Slider` `DatePicker`

### UI Components  
`Button` `Card` `Badge` `Alert` `Avatar` `Image` `Separator` `Skeleton` `Progress` `Tooltip`

### Interactive Components
`AlertDialog` `Collapsible` `Popover` `HoverCard` `Drawer` `DropdownMenu` `ContextMenu` `Command`

### Data Display
`Table` `DataTable` `Chart` `Tabs` `Carousel` `PricingTable` `Testimonial`

### Navigation
`NavigationMenu` `Breadcrumb` `Pagination` `Menubar`

View all components with live examples in our [interactive showcase](./examples).

## Real-World Examples

### Hero Section
```javascript
const heroSection = {
  type: "container",
  className: "py-24",
  children: [
    {
      type: "flex",
      direction: "column",
      align: "center",
      gap: "lg",
      children: [
        {
          type: "badge",
          text: "New Release",
          variant: "outline"
        },
        {
          type: "heading",
          level: "h1",
          content: "Build Faster with React Jedi",
          size: "6xl",
          gradient: "rainbow"
        },
        {
          type: "text",
          text: "Create beautiful, responsive UIs with just JSON",
          size: "xl",
          className: "text-muted-foreground max-w-2xl text-center"
        },
        {
          type: "group",
          children: [
            {
              type: "button",
              text: "Get Started",
              variant: "primary",
              size: "lg"
            },
            {
              type: "button",
              text: "View Demo",
              variant: "outline",
              size: "lg"
            }
          ]
        }
      ]
    }
  ]
};
```

### Feature Grid
```javascript
const featureGrid = {
  type: "grid",
  columns: { default: 1, md: 3 },
  gap: "lg",
  children: [
    {
      type: "card",
      children: [
        {
          type: "heading",
          level: "h3",
          content: "Lightning Fast"
        },
        {
          type: "text",
          text: "Optimized performance with automatic memoization"
        }
      ]
    },
    // ... more feature cards
  ]
};
```

## TypeScript Support

Full TypeScript support with type inference and IntelliSense:

```typescript
import { render, ComponentSpec } from "@banja/react-jedi";

// Type-safe specifications
const spec: ComponentSpec = {
  type: "container",
  children: [
    {
      type: "heading",
      level: "h1", // TypeScript knows valid levels
      content: "Type-Safe UI"
    }
  ]
};

// Auto-completion for all component properties
const button: ButtonSpec = {
  type: "button",
  variant: "primary", // IntelliSense shows all variants
  size: "lg"
};
```

## Documentation

### 📚 [Live Documentation](./examples)

Interactive documentation with:
- Component playground
- Live code examples  
- API reference
- Best practices
- TypeScript guides

### 🚀 Run Examples Locally

```bash
# Clone and install
git clone https://github.com/banja-au/react-jedi.git
cd react-jedi && npm install

# Run example app
npm run example-app
```

Visit [http://localhost:5173](http://localhost:5173) to explore all components.

## Server-Driven UI

React Jedi excels at server-driven UI scenarios:

```javascript
// Fetch UI specification from server
const response = await fetch('/api/ui/dashboard');
const spec = await response.json();

// Render the UI
function Dashboard() {
  return render({ spec });
}
```

Update your UI without app deployments - just change the JSON on your server!

## Contributing

We love contributions! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

### Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build library
npm run build
```

### Key Commands

- `npm run dev` - Start development server
- `npm run storybook` - Launch Storybook for component development
- `npm run benchmark` - Run performance benchmarks
- `npm run check` - Run all checks (lint, types, tests)

## Community

- 🐛 [Report Issues](https://github.com/banja-au/react-jedi/issues)
- 💬 [Discussions](https://github.com/banja-au/react-jedi/discussions)
- 📧 [Contact](mailto:support@banja.au)

## License

ISC © [Banja](https://github.com/banja-au)

---

<div align="center">
  <p>Built with ❤️ by the Banja team</p>
  <p>
    <a href="https://github.com/banja-au/react-jedi">Star us on GitHub</a> •
    <a href="https://twitter.com/banja_au">Follow on Twitter</a>
  </p>
</div>
