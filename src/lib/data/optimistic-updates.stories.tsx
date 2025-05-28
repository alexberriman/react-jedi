import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OptimisticUpdateExample } from "../examples/optimistic-update-example";

const meta: Meta<typeof OptimisticUpdateExample> = {
  title: "Library/Data/Optimistic Updates",
  component: OptimisticUpdateExample,
  decorators: [
    (Story) => {
      const queryClient = React.useMemo(() => new QueryClient({
        defaultOptions: {
          queries: { 
            retry: false,
            staleTime: 0,
          },
        },
      }), []);
      
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component: `
Optimistic updates provide instant feedback to users by updating the UI immediately 
while the actual request happens in the background. If the request fails, the UI 
automatically rolls back to the previous state.

## Features

- **Instant UI updates**: Changes appear immediately without waiting for server response
- **Automatic rollback**: Failed requests automatically revert the UI to previous state  
- **State snapshots**: Captures state before mutations for reliable rollback
- **Query invalidation**: Automatically refreshes related data after successful mutations
- **Error handling**: Graceful error states with customizable error messages

## Usage

\`\`\`typescript
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
\`\`\`

## JSON Specification

\`\`\`json
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
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Simple test story to verify basic rendering
export const SimpleTest: Story = {
  name: "Simple Test",
  render: () => <div>Simple test content</div>,
};

export const Default: Story = {
  name: "Todo List Example",
  render: () => <OptimisticUpdateExample />,
  tags: ["skip-test"],
  parameters: {
    docs: {
      description: {
        story: `
Interactive todo list demonstrating optimistic updates:

- Add new todos with instant UI feedback
- Toggle todo completion status  
- Simulated API delays (1-2 seconds)
- Random failure chance to demonstrate rollback
- Visual indicators for pending operations

Try adding multiple todos quickly or toggling several items to see 
how optimistic updates handle concurrent operations.
        `,
      },
    },
  },
};

export const BasicUsage: Story = {
  name: "Basic Implementation",
  tags: ["docs-only", "skip-test"],
  render: () => (
    <div className="p-6 space-y-4">
      <div className="prose">
        <h3>Basic Optimistic Update Pattern</h3>
        <pre>{`
// 1. Define mutation with optimistic config
const mutation = useMutation({
  mutation: {
    id: "createItem",
    endpoint: "/api/items",
    method: "POST",
  },
  optimistic: {
    // Generate optimistic data
    getOptimisticData: (variables) => ({
      id: Date.now(),
      ...variables,
      status: "pending",
    }),
    
    // Update local state immediately
    updateLocalState: (stateManager, data) => {
      const items = stateManager.getState().items || [];
      stateManager.setState("items", [...items, data]);
    },
    
    // Optional: Custom rollback logic
    rollback: (stateManager, error, variables) => {
      // Remove the optimistically added item
      const items = stateManager.getState().items || [];
      stateManager.setState("items", 
        items.filter(item => item.id !== variables.id)
      );
    },
  },
});

// 2. Execute mutation with optimistic update
mutation.mutateOptimistic({ name: "New Item" });
        `}</pre>
      </div>
    </div>
  ),
};

export const ErrorHandling: Story = {
  name: "Error Handling & Rollback",
  tags: ["docs-only", "skip-test"],
  render: () => (
    <div className="p-6 space-y-4">
      <div className="prose">
        <h3>Error Handling & Automatic Rollback</h3>
        <p>
          When a mutation fails, the optimistic update is automatically rolled back:
        </p>
        <pre>{`
const mutation = useMutation({
  mutation: {
    id: "updateProfile",
    endpoint: "/api/profile",
    method: "PUT",
  },
  optimistic: {
    getOptimisticData: (variables) => variables,
    updateLocalState: (stateManager, data) => {
      stateManager.setState("profile", data);
    },
  },
  options: {
    onError: (error, variables, context) => {
      // Custom error handling
      console.error("Update failed:", error);
      
      // Show error notification
      showNotification({
        type: "error",
        message: "Failed to update profile",
      });
    },
    onSuccess: (data) => {
      // Success notification
      showNotification({
        type: "success",
        message: "Profile updated successfully",
      });
    },
  },
});
        `}</pre>
      </div>
    </div>
  ),
};

export const MultipleUpdates: Story = {
  name: "Concurrent Updates",
  tags: ["docs-only", "skip-test"],
  render: () => (
    <div className="p-6 space-y-4">
      <div className="prose">
        <h3>Handling Multiple Concurrent Updates</h3>
        <p>
          Optimistic updates handle multiple concurrent operations gracefully:
        </p>
        <pre>{`
// Multiple mutations can be in flight simultaneously
const updateStatusMutation = useMutation({
  mutation: {
    id: "updateItemStatus",
    endpoint: "/api/items/{id}/status",
    method: "PATCH",
  },
  optimistic: {
    getOptimisticData: ({ id, status }) => ({ id, status }),
    updateLocalState: (stateManager, data) => {
      const items = stateManager.getState().items || [];
      stateManager.setState("items",
        items.map(item =>
          item.id === data.id
            ? { ...item, status: data.status }
            : item
        )
      );
    },
  },
});

// Execute multiple updates
items.forEach(item => {
  updateStatusMutation.mutateOptimistic({
    id: item.id,
    status: "completed",
  });
});
        `}</pre>
      </div>
    </div>
  ),
};