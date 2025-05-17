# Optimistic Updates

Optimistic updates provide instant feedback to users by updating the UI immediately while the actual request happens in the background. If the request fails, the UI automatically rolls back to the previous state.

## Overview

The optimistic updates system in React Jedi integrates with React Query to provide:

- **Instant UI updates**: Changes appear immediately without waiting for server response
- **Automatic rollback**: Failed requests automatically revert the UI to previous state
- **State snapshots**: Captures state before mutations for reliable rollback
- **Query invalidation**: Automatically refreshes related data after successful mutations
- **Error handling**: Graceful error states with customizable error messages

## Basic Usage

### Using the `useMutation` Hook

```typescript
import { useMutation } from "@banja/react-jedi";

const mutation = useMutation({
  mutation: {
    id: "updateUser",
    endpoint: "/api/users/{id}",
    method: "PUT",
    invalidates: ["users", "user:detail"],
  },
  optimistic: {
    getOptimisticData: (variables) => ({
      ...variables,
      updatedAt: new Date().toISOString(),
    }),
    updateLocalState: (stateManager, data) => {
      stateManager.setState("currentUser", data);
    },
  },
});

// Execute mutation with optimistic update
mutation.mutateOptimistic({ id: 1, name: "John Doe" });
```

### JSON Specification

```json
{
  "mutations": {
    "updateUser": {
      "endpoint": "/api/users/{id}",
      "method": "PUT",
      "invalidates": ["users", "user:detail"],
      "optimistic": {
        "getOptimisticData": "return { ...variables, updatedAt: new Date() }",
        "stateUpdates": {
          "currentUser": "data"
        }
      }
    }
  }
}
```

## API Reference

### `useMutation`

Hook for mutations with optimistic update support.

```typescript
interface UseMutationConfig<TData, TVariables> {
  // Mutation specification from JSON
  mutation: MutationSpecification;
  
  // Optimistic update configuration
  optimistic?: OptimisticUpdateConfig<TVariables, TData>;
  
  // Additional React Query options
  options?: UseMutationOptions<TData, DataFetchError, TVariables>;
  
  // Data fetcher instance (optional)
  fetcher?: DataFetcher;
}
```

### `OptimisticUpdateConfig`

Configuration for optimistic updates.

```typescript
interface OptimisticUpdateConfig<TVariables, TData> {
  // Function to get the optimistic data
  getOptimisticData: (variables: TVariables) => TData;
  
  // Function to update local state optimistically
  updateLocalState?: (stateManager: StateManager, data: TData, variables: TVariables) => void;
  
  // Function to rollback on error
  rollback?: (stateManager: StateManager, error: DataFetchError, variables: TVariables) => void;
  
  // Cache keys to invalidate on success
  invalidateKeys?: string[];
  
  // Whether to retry on failure
  retry?: boolean | number;
}
```

## Examples

### Creating a Todo Item

```typescript
const createTodoMutation = useMutation({
  mutation: {
    id: "createTodo",
    endpoint: "/api/todos",
    method: "POST",
    invalidates: ["todos"],
  },
  optimistic: {
    getOptimisticData: (variables) => ({
      id: Date.now(), // Temporary ID
      text: variables.text,
      completed: false,
      createdAt: new Date().toISOString(),
    }),
    updateLocalState: (stateManager, data) => {
      const currentTodos = stateManager.getState().todos || [];
      stateManager.setState("todos", [...currentTodos, data]);
    },
  },
});

// Usage
createTodoMutation.mutateOptimistic({ text: "Learn optimistic updates" });
```

### Updating Item Status

```typescript
const updateStatusMutation = useMutation({
  mutation: {
    id: "updateStatus",
    endpoint: "/api/items/{id}/status",
    method: "PATCH",
  },
  optimistic: {
    getOptimisticData: ({ id, status }) => ({ id, status }),
    updateLocalState: (stateManager, data, variables) => {
      const items = stateManager.getState().items || [];
      stateManager.setState("items",
        items.map(item =>
          item.id === variables.id
            ? { ...item, status: data.status }
            : item
        )
      );
    },
  },
});
```

### Custom Rollback Logic

```typescript
const deleteMutation = useMutation({
  mutation: {
    id: "deleteItem",
    endpoint: "/api/items/{id}",
    method: "DELETE",
  },
  optimistic: {
    getOptimisticData: (variables) => variables.id,
    updateLocalState: (stateManager, deletedId) => {
      const items = stateManager.getState().items || [];
      const deletedItem = items.find(item => item.id === deletedId);
      
      // Store deleted item for rollback
      stateManager.setState("_lastDeleted", deletedItem);
      
      // Remove from list
      stateManager.setState("items",
        items.filter(item => item.id !== deletedId)
      );
    },
    rollback: (stateManager, error, variables) => {
      // Restore deleted item
      const lastDeleted = stateManager.getState()._lastDeleted;
      if (lastDeleted) {
        const items = stateManager.getState().items || [];
        stateManager.setState("items", [...items, lastDeleted]);
        stateManager.setState("_lastDeleted", null);
      }
    },
  },
});
```

## Best Practices

### 1. Generate Realistic Optimistic Data

Ensure your optimistic data closely matches what the server will return:

```typescript
optimistic: {
  getOptimisticData: (variables) => ({
    ...variables,
    id: generateTempId(), // Use predictable temp IDs
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "pending", // Indicate optimistic state
  }),
}
```

### 2. Handle Concurrent Updates

When multiple updates might happen simultaneously:

```typescript
const batchUpdateMutation = useMutation({
  mutation: {
    id: "batchUpdate",
    endpoint: "/api/items/batch",
    method: "PATCH",
  },
  optimistic: {
    getOptimisticData: (variables) => variables.items,
    updateLocalState: (stateManager, updatedItems) => {
      const items = stateManager.getState().items || [];
      const updateMap = new Map(updatedItems.map(item => [item.id, item]));
      
      stateManager.setState("items",
        items.map(item =>
          updateMap.has(item.id) ? updateMap.get(item.id) : item
        )
      );
    },
  },
});
```

### 3. Provide User Feedback

Show visual indicators for optimistic updates:

```typescript
const Item = ({ item }) => {
  const isOptimistic = item.id > 1000000000000; // Temp IDs are large timestamps
  
  return (
    <div className={isOptimistic ? "opacity-70" : ""}>
      <span>{item.name}</span>
      {isOptimistic && <Badge>Saving...</Badge>}
    </div>
  );
};
```

### 4. Handle Partial Failures

For bulk operations, handle partial failures gracefully:

```typescript
optimistic: {
  rollback: (stateManager, error, variables) => {
    if (error.failedIds) {
      // Only rollback failed items
      const items = stateManager.getState().items || [];
      stateManager.setState("items",
        items.filter(item => !error.failedIds.includes(item.id))
      );
    }
  },
}
```

## Performance Considerations

1. **Minimize State Updates**: Only update the necessary parts of state
2. **Use Memoization**: Memoize expensive computations in `getOptimisticData`
3. **Batch Updates**: Group related mutations to reduce renders
4. **Debounce Rapid Updates**: Prevent overwhelming the server with requests

## Error Handling

### Network Errors

```typescript
options: {
  onError: (error) => {
    if (error.code === "NETWORK_ERROR") {
      showToast("No internet connection. Changes will sync when online.");
    }
  },
}
```

### Validation Errors

```typescript
optimistic: {
  rollback: (stateManager, error) => {
    if (error.validationErrors) {
      // Show validation messages
      stateManager.setState("formErrors", error.validationErrors);
    }
  },
}
```

## Testing

Example test for optimistic updates:

```typescript
it("should apply optimistic update and rollback on error", async () => {
  const { result } = renderHook(() => 
    useMutation({
      mutation: { id: "test", endpoint: "/api/test" },
      optimistic: {
        getOptimisticData: () => ({ status: "optimistic" }),
        updateLocalState: (sm, data) => sm.setState("test", data),
      },
    })
  );
  
  // Execute mutation
  act(() => {
    result.current.mutateOptimistic({ id: 1 });
  });
  
  // Check optimistic state
  expect(stateManager.getState().test).toEqual({ status: "optimistic" });
  
  // Wait for error
  await waitFor(() => {
    expect(result.current.isError).toBe(true);
  });
  
  // Check rollback
  expect(stateManager.getState().test).toBeUndefined();
});
```