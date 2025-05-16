# Performance Guide

React Jedi is designed with performance in mind. This guide covers best practices and optimization techniques to ensure your applications run smoothly.

## Overview

Performance optimizations in React Jedi include:
- **Component memoization** - Prevent unnecessary re-renders
- **State optimization** - Efficient state updates
- **Event delegation** - Reduced event listeners
- **Lazy loading** - Code splitting and dynamic imports
- **Virtual scrolling** - Large list optimization
- **Bundle optimization** - Minimal bundle size

## Component Optimization

### Memoization

React Jedi automatically memoizes components when possible:

```json
{
  "type": "Box",
  "optimize": {
    "memoize": true,
    "compareProps": ["id", "data"]
  },
  "children": []
}
```

### Pure Components

Mark components as pure for optimization:

```json
{
  "type": "Card",
  "pure": true,
  "props": {
    "title": "Static Content"
  }
}
```

### Component Keys

Use keys for list optimization:

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

## State Optimization

### Batch Updates

Group related state updates:

```json
{
  "actions": {
    "onClick": {
      "type": "batchState",
      "updates": [
        { "key": "loading", "value": false },
        { "key": "data", "value": "$response" },
        { "key": "error", "value": null }
      ]
    }
  }
}
```

### Selective Updates

Update only what's needed:

```json
{
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

### Computed State

Cache expensive computations:

```json
{
  "state": {
    "computed": {
      "filteredItems": {
        "dependencies": ["local.items", "local.filter"],
        "compute": "return filterItems(state.local.items, state.local.filter)",
        "memoize": true
      }
    }
  }
}
```

## Event Optimization

### Debouncing

Reduce frequent updates:

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

### Throttling

Limit execution frequency:

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

### Event Delegation

Events are automatically delegated:

```json
{
  "type": "Box",
  "delegate": true,
  "children": [
    {
      "type": "Button",
      "data-id": "1",
      "children": "Click"
    },
    {
      "type": "Button",
      "data-id": "2",
      "children": "Click"
    }
  ],
  "actions": {
    "onClick": {
      "type": "handleButtonClick",
      "id": "$event.target.dataset.id"
    }
  }
}
```

## Rendering Optimization

### Conditional Rendering

Render only what's visible:

```json
{
  "type": "Box",
  "conditions": [
    {
      "when": {
        "state": "local.showDetails",
        "is": true
      },
      "children": {
        "type": "ExpensiveComponent",
        "data": "$state.local.details"
      }
    }
  ]
}
```

### Lazy Loading

Load components on demand:

```json
{
  "type": "LazyComponent",
  "loader": "components/HeavyComponent",
  "fallback": {
    "type": "Spinner"
  }
}
```

### Virtual Scrolling

Handle large lists efficiently:

```json
{
  "type": "VirtualList",
  "items": "$state.local.largeDataset",
  "itemHeight": 50,
  "visibleItems": 20,
  "template": {
    "type": "ListItem",
    "data": "$item"
  }
}
```

## Bundle Optimization

### Code Splitting

Split code by route:

```json
{
  "type": "Router",
  "routes": [
    {
      "path": "/",
      "component": {
        "type": "Home"
      }
    },
    {
      "path": "/dashboard",
      "component": {
        "type": "LazyComponent",
        "loader": "pages/Dashboard"
      }
    }
  ]
}
```

### Tree Shaking

Unused components are automatically removed:

```typescript
// Only imported components are included
import { render } from '@banja/react-jedi';
import { Button, Card } from '@banja/react-jedi/components';
```

### Dynamic Imports

Load features on demand:

```json
{
  "type": "Box",
  "children": [
    {
      "type": "Button",
      "children": "Load Chart",
      "actions": {
        "onClick": {
          "type": "loadComponent",
          "component": "Chart",
          "loader": "components/Chart"
        }
      }
    }
  ]
}
```

## Image Optimization

### Lazy Loading Images

```json
{
  "type": "Image",
  "src": "large-image.jpg",
  "loading": "lazy",
  "placeholder": "blur",
  "aspectRatio": "16/9"
}
```

### Responsive Images

```json
{
  "type": "Image",
  "src": {
    "base": "image-mobile.jpg",
    "md": "image-tablet.jpg",
    "lg": "image-desktop.jpg"
  },
  "sizes": "(max-width: 768px) 100vw, 50vw"
}
```

### Image Formats

```json
{
  "type": "Picture",
  "sources": [
    {
      "srcset": "image.webp",
      "type": "image/webp"
    },
    {
      "srcset": "image.jpg",
      "type": "image/jpeg"
    }
  ],
  "fallback": "image.jpg"
}
```

## Performance Monitoring

### Enable Performance Tracking

```json
{
  "type": "UISpecification",
  "performance": {
    "track": true,
    "reportThreshold": 100,
    "metrics": ["render", "update", "mount"]
  },
  "root": {}
}
```

### Custom Performance Marks

```json
{
  "type": "Box",
  "performance": {
    "mark": "expensive-operation-start"
  },
  "onMount": {
    "type": "performanceEnd",
    "mark": "expensive-operation-start",
    "measure": "expensive-operation"
  }
}
```

## Best Practices

### 1. Optimize State Structure

Keep state flat:

```json
{
  "state": {
    "initial": {
      "users": {},
      "userIds": [],
      "selectedUserId": null
    }
  }
}
```

### 2. Use Pagination

Load data in chunks:

```json
{
  "type": "DataTable",
  "data": "$state.local.paginatedData",
  "pageSize": 50,
  "currentPage": "$state.local.currentPage"
}
```

### 3. Implement Caching

Cache expensive operations:

```json
{
  "type": "Box",
  "cache": {
    "key": "user-data-$state.global.userId",
    "ttl": 300000
  }
}
```

### 4. Minimize Re-renders

Use specific prop comparisons:

```json
{
  "type": "UserProfile",
  "optimize": {
    "compareProps": ["userId", "isEditing"],
    "ignoreProps": ["timestamp", "debug"]
  }
}
```

### 5. Defer Non-Critical Updates

```json
{
  "actions": {
    "onMount": {
      "type": "defer",
      "priority": "low",
      "action": {
        "type": "loadAnalytics"
      }
    }
  }
}
```

## Performance Checklist

- [ ] Use production builds
- [ ] Enable component memoization
- [ ] Implement virtual scrolling for large lists
- [ ] Lazy load routes and heavy components
- [ ] Optimize images with lazy loading
- [ ] Debounce search and filter inputs
- [ ] Batch state updates
- [ ] Use computed state for derived values
- [ ] Implement proper caching strategies
- [ ] Monitor performance metrics

## Debugging Performance

### React DevTools Profiler

1. Install React DevTools extension
2. Open Profiler tab
3. Record interactions
4. Analyze component render times

### Performance API

```typescript
// Measure render performance
performance.mark('render-start');
render(specification, container);
performance.mark('render-end');
performance.measure('render', 'render-start', 'render-end');

const renderTime = performance.getEntriesByName('render')[0].duration;
console.log(`Render time: ${renderTime}ms`);
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Generate bundle report
npm run bundle-report
```

## Common Performance Issues

### 1. Unnecessary Re-renders

**Problem**: Components re-render on every parent update
**Solution**: Use memoization and specific prop comparisons

### 2. Large Bundle Size

**Problem**: Initial load is slow
**Solution**: Implement code splitting and lazy loading

### 3. Expensive Computations

**Problem**: UI freezes during calculations
**Solution**: Use computed state and web workers

### 4. Memory Leaks

**Problem**: Memory usage increases over time
**Solution**: Clean up event listeners and subscriptions

### 5. Slow List Rendering

**Problem**: Long lists cause lag
**Solution**: Implement virtual scrolling