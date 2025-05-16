# Performance Optimization with Memoization

React Jedi includes a comprehensive memoization system designed to optimize the rendering performance of server-driven UI components. This document explains how to use and configure memoization in your applications.

## Overview

Memoization prevents unnecessary re-renders of React components by caching the result of expensive operations. React Jedi automatically applies intelligent memoization strategies to optimize your server-driven UI while maintaining reactivity where needed.

## Basic Usage

### Enabling Memoization

Memoization is enabled by default, but you can control it through render options:

```tsx
import { render } from "@banja/react-jedi";

// Render with default memoization enabled
const ui = render(specification);

// Explicitly control memoization
const uiWithOptions = render(specification, {
  memoization: {
    enabled: true,
    trackPerformance: true,
  },
});
```

### Disabling Memoization

In some cases, you might want to disable memoization for debugging or specific use cases:

```tsx
const ui = render(specification, {
  memoization: {
    enabled: false,
  },
});
```

## Configuration Options

The `MemoizationOptions` interface provides fine-grained control over memoization behavior:

```tsx
interface MemoizationOptions {
  // Enable or disable memoization globally
  enabled: boolean;
  
  // Component types that should always be memoized
  alwaysMemoize?: string[];
  
  // Component types that should never be memoized
  neverMemoize?: string[];
  
  // Threshold for considering a component "expensive"
  expensiveRenderThreshold?: number;
  
  // Enable performance tracking
  trackPerformance?: boolean;
}
```

### Example Configuration

```tsx
const advancedOptions = {
  memoization: {
    enabled: true,
    alwaysMemoize: ["Form", "DataTable", "Chart"],
    neverMemoize: ["Text", "Label"],
    expensiveRenderThreshold: 5, // milliseconds
    trackPerformance: true,
  },
};

const ui = render(specification, advancedOptions);
```

## Default Memoization Rules

React Jedi applies intelligent default rules based on component types:

### Always Memoized (by default)
- Interactive components: `Button`, `Input`, `Select`, `Switch`, `Checkbox`, `RadioGroup`, `Slider`, `Toggle`, `ToggleGroup`, `Textarea`, `Form`
- Complex components: `Form`, `Table`, `DataTable`, `Chart`, `Carousel`

### Never Memoized (by default)
- Simple text components: `Text`, `Label`
- Basic layout containers: `Box`, `Container`, `Grid`, `Flex`

## Performance Tracking

When performance tracking is enabled, React Jedi collects metrics about component rendering:

```tsx
import { getRenderMetrics, getComponentMetrics } from "@banja/react-jedi";

// Get metrics for all components
const allMetrics = getRenderMetrics();

// Get metrics for a specific component
const buttonMetrics = getComponentMetrics("Button");

console.log(buttonMetrics);
// {
//   componentType: "Button",
//   renderCount: 42,
//   totalRenderTime: 125.5,
//   averageRenderTime: 2.99,
//   maxRenderTime: 8.2,
//   lastRenderTime: 3.1
// }
```

### Using Performance Metrics

You can use performance metrics to optimize your application:

```tsx
import { useRenderPerformance } from "@banja/react-jedi";

function PerformanceMonitor() {
  const metrics = useRenderPerformance("MyExpensiveComponent");
  
  if (metrics && metrics.averageRenderTime > 10) {
    console.warn(`Component is rendering slowly: ${metrics.averageRenderTime}ms average`);
  }
  
  return null;
}
```

## Custom Memoization Strategies

### Creating Memoized Components

You can create custom memoized components:

```tsx
import { createMemoizedComponent } from "@banja/react-jedi";

const MyComponent = ({ spec }) => {
  // Component implementation
  return <div>{spec.children}</div>;
};

const MemoizedMyComponent = createMemoizedComponent(
  MyComponent,
  "MyComponent",
  {
    enabled: true,
    trackPerformance: true,
  }
);
```

### Custom Props Comparison

React Jedi uses an intelligent props comparison function that handles:
- Component specifications
- Theme changes
- State updates
- Children comparison
- Parent context

The comparison is optimized for server-driven UI patterns.

## Best Practices

### 1. Use Memoization for Complex Components

Enable memoization for components that:
- Render large lists or tables
- Perform complex calculations
- Have deep component trees
- Update frequently with similar props

```tsx
render(specification, {
  memoization: {
    enabled: true,
    alwaysMemoize: ["ProductList", "ShoppingCart", "UserDashboard"],
  },
});
```

### 2. Avoid Over-Memoization

Don't memoize components that:
- Are simple and render quickly
- Always receive different props
- Have few or no children

```tsx
render(specification, {
  memoization: {
    enabled: true,
    neverMemoize: ["Text", "Icon", "Divider"],
  },
});
```

### 3. Monitor Performance

Use performance tracking in development to identify optimization opportunities:

```tsx
if (process.env.NODE_ENV === "development") {
  const metrics = getRenderMetrics();
  
  // Log slow components
  for (const [component, data] of metrics) {
    if (data.averageRenderTime > 5) {
      console.warn(`Slow component: ${component} (${data.averageRenderTime}ms)`);
    }
  }
}
```

### 4. Clear Metrics Periodically

Clear performance metrics to prevent memory buildup:

```tsx
import { clearRenderMetrics } from "@banja/react-jedi";

// Clear metrics after analysis
setInterval(() => {
  const metrics = getRenderMetrics();
  // Analyze metrics...
  clearRenderMetrics();
}, 60000); // Every minute
```

## Integration with State Management

Memoization works seamlessly with React Jedi's state management:

```tsx
const specification = {
  root: {
    type: "Container",
    children: [
      {
        type: "Button",
        id: "counter-button",
        children: "Count: ${count}",
        state: {
          count: 0,
        },
        events: {
          onClick: {
            type: "SET_STATE",
            payload: { count: "${count + 1}" },
          },
        },
      },
    ],
  },
  state: {
    initial: {
      count: 0,
    },
  },
};

// Button will only re-render when count changes
const ui = render(specification, {
  memoization: { enabled: true },
});
```

## Troubleshooting

### Components Re-rendering Unnecessarily

If components are re-rendering when they shouldn't:

1. Check if the component is in the `neverMemoize` list
2. Verify that props are stable (not recreated on each render)
3. Use performance tracking to identify the cause

```tsx
const metrics = getComponentMetrics("ProblematicComponent");
console.log(`Render count: ${metrics.renderCount}`);
```

### Performance Not Improving

If memoization isn't improving performance:

1. Ensure memoization is enabled
2. Check if the component is actually expensive to render
3. Verify that props are changing frequently (memoization won't help)

### Memory Usage Concerns

Memoization trades memory for performance. If memory is a concern:

1. Limit memoization to truly expensive components
2. Clear render metrics regularly
3. Use the `neverMemoize` list for simple components

## Examples

### Example 1: E-commerce Product List

```tsx
const productListSpec = {
  root: {
    type: "Container",
    children: {
      type: "Grid",
      id: "product-grid",
      children: products.map(product => ({
        type: "Card",
        id: `product-${product.id}`,
        children: [
          {
            type: "Image",
            id: `image-${product.id}`,
            props: { src: product.image },
          },
          {
            type: "Heading",
            id: `title-${product.id}`,
            children: product.title,
          },
          {
            type: "Text",
            id: `price-${product.id}`,
            children: `$${product.price}`,
          },
        ],
      })),
    },
  },
};

// Memoize the product cards to prevent unnecessary re-renders
const ui = render(productListSpec, {
  memoization: {
    enabled: true,
    alwaysMemoize: ["Card", "Grid"],
    neverMemoize: ["Text"], // Prices might change frequently
  },
});
```

### Example 2: Dashboard with Real-time Data

```tsx
const dashboardSpec = {
  root: {
    type: "Container",
    children: [
      {
        type: "Chart",
        id: "revenue-chart",
        props: { data: revenueData },
      },
      {
        type: "DataTable",
        id: "orders-table",
        props: { data: ordersData },
      },
      {
        type: "Text",
        id: "last-updated",
        children: `Last updated: ${new Date().toLocaleTimeString()}`,
      },
    ],
  },
};

// Memoize expensive components but not the timestamp
const ui = render(dashboardSpec, {
  memoization: {
    enabled: true,
    alwaysMemoize: ["Chart", "DataTable"],
    neverMemoize: ["Text"], // Timestamp updates frequently
    trackPerformance: true,
  },
});
```

## Conclusion

React Jedi's memoization system provides powerful performance optimization capabilities while maintaining the flexibility and reactivity needed for modern web applications. By understanding and properly configuring memoization, you can build highly performant server-driven UIs that scale to handle complex requirements.