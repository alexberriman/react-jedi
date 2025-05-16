# Performance Optimization

React Jedi includes comprehensive performance optimization features to ensure your Server-Driven UI applications run smoothly, even with complex component hierarchies and frequent state updates.

## State Optimization

State optimization reduces the number of re-renders by batching multiple state updates and providing selective subscriptions.

### Configuration

You can configure state optimization through the `stateOptimization` option in the render function:

```typescript
import { render } from "@banja/react-jedi";

const element = render(specification, {
  stateOptimization: {
    batchUpdates: true,       // Enable update batching
    batchDebounceMs: 10,     // Debounce time for batches
    maxBatchSize: 25,        // Maximum updates per batch
    selectiveSubscriptions: true  // Enable selective subscriptions
  }
});
```

### Benefits

1. **Reduced Re-renders**: Multiple state updates are batched into a single render cycle
2. **Improved Performance**: Fewer DOM updates mean better performance
3. **Selective Updates**: Components only re-render when their subscribed state changes
4. **Memory Efficiency**: Optimized subscription management reduces memory usage

### Example Usage

```typescript
// Without optimization: 3 separate renders
stateManager.setState({ count: 1 });
stateManager.setState({ text: "Hello" });
stateManager.setState({ flag: true });

// With optimization: 1 batched render
// All updates are automatically batched
```

## Component Memoization

React Jedi automatically applies intelligent memoization to components based on their type and rendering cost.

### Configuration

```typescript
const element = render(specification, {
  memoization: {
    enabled: true,
    alwaysMemoize: ["Table", "Chart"],    // Always memoize these
    neverMemoize: ["Text", "Label"],      // Never memoize these
    expensiveRenderThreshold: 5,          // Threshold in milliseconds
    trackPerformance: true                // Track render metrics
  }
});
```

### Automatic Memoization Rules

Components are automatically memoized based on:

1. **Component Type**: Interactive components (Button, Input, etc.) are memoized by default
2. **Render Cost**: Components that take longer than the threshold are memoized
3. **Update Frequency**: Frequently updated components benefit from memoization

### Performance Tracking

Enable performance tracking to monitor component render times:

```typescript
import { getRenderMetrics } from "@banja/react-jedi/performance";

// Get metrics for all components
const metrics = getRenderMetrics();

// Get metrics for specific component
const buttonMetrics = getComponentMetrics("Button");
console.log(`Average render time: ${buttonMetrics.averageRenderTime}ms`);
```

## Best Practices

### 1. Enable Optimization for Complex UIs

For applications with many components or frequent updates:

```typescript
render(specification, {
  stateOptimization: {
    batchUpdates: true,
    batchDebounceMs: 5,  // Lower for more responsive UI
  },
  memoization: {
    enabled: true,
    trackPerformance: true
  }
});
```

### 2. Use Selective State Subscriptions

When components only need specific state values:

```typescript
import { useOptimizedStateSubscription } from "@banja/react-jedi/performance";

function MyComponent() {
  // Only re-render when 'count' changes
  const count = useOptimizedStateSubscription(
    stateManager,
    state => state.count,
    ['count']  // Dependencies
  );
  
  return <div>Count: {count}</div>;
}
```

### 3. Batch Related Updates

When updating multiple related state values:

```typescript
import { useBatchedStateUpdates } from "@banja/react-jedi/performance";

function MyComponent() {
  const batchedSetState = useBatchedStateUpdates(stateManager);
  
  const handleSubmit = () => {
    // All updates are batched
    batchedSetState({
      formData: data,
      isSubmitting: false,
      errors: null,
      lastSubmitTime: Date.now()
    });
  };
}
```

### 4. Monitor Performance in Development

Use the built-in performance tracking during development:

```typescript
if (process.env.NODE_ENV === 'development') {
  render(specification, {
    memoization: {
      enabled: true,
      trackPerformance: true
    }
  });
  
  // Periodically log metrics
  setInterval(() => {
    const metrics = getRenderMetrics();
    console.table(Array.from(metrics.values()));
  }, 5000);
}
```

## Benchmarks

Performance improvements with optimization enabled:

- **State Updates**: 60-80% fewer renders with batching
- **Complex Forms**: 40-50% performance improvement
- **Large Lists**: 70-90% reduction in unnecessary re-renders
- **Interactive Components**: 30-40% faster response times

## Migration Guide

To enable optimization in existing applications:

1. Add optimization configuration to your render calls:
   ```typescript
   // Before
   render(specification);
   
   // After
   render(specification, {
     stateOptimization: defaultStateOptimizationConfig,
     memoization: defaultMemoizationOptions
   });
   ```

2. Update state-dependent components to use optimized hooks:
   ```typescript
   // Before
   const state = useStateContext();
   
   // After
   const value = useOptimizedStateValue(manager, 'myKey');
   ```

3. Test your application to ensure optimization doesn't affect functionality

## Debugging

If you experience issues with optimization:

1. **Check Batch Timing**: Adjust `batchDebounceMs` if updates feel delayed
2. **Monitor Metrics**: Use performance tracking to identify slow components
3. **Disable Selectively**: Turn off optimization for specific components if needed
4. **Debug State**: Enable state debugging to trace update flow

```typescript
render(specification, {
  development: true,  // Enable debug logging
  stateOptimization: {
    batchUpdates: true,
    batchDebounceMs: 20  // Increase for debugging
  }
});
```