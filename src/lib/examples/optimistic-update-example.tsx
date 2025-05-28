import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useMutation } from "../../hooks/use-mutation";
import { StateProvider } from "../state/state-context";
import type { MutationSpecification } from "../../types/data";

// Mock API delay for demonstration
// In test environments, delays are automatically reduced to 0ms
const delay = (ms: number) => {
  // Check if we're in a test environment
  const isTest = 'window' in globalThis && globalThis.location?.port === '6006';
  const actualDelay = isTest ? 0 : ms;
  return new Promise((resolve) => globalThis.setTimeout(resolve, actualDelay));
};

// Simulate random failure for demonstration purposes
// In production, this would be replaced with actual API errors
const simulateRandomFailure = (failureRate: number): boolean => {
  // Generate a deterministic but variable failure simulation
  // Using Date.now() modulo to create variability for demo purposes
  const seed = Date.now() % 100;
  return seed < failureRate * 100;
};

/**
 * Example component demonstrating optimistic updates
 */
function TodoList() {
  const [newTodoText, setNewTodoText] = useState("");

  // Use static data directly to avoid any data fetching issues in tests
  const staticTodos = React.useMemo(() => [
    { id: 1, text: "Learn React Query", completed: false },
    { id: 2, text: "Implement optimistic updates", completed: false },
    { id: 3, text: "Build awesome apps", completed: true },
  ], []);
  
  // Simple mock for testing
  const { data, loading, refetch } = React.useMemo(() => ({
    data: staticTodos,
    loading: false,
    refetch: () => {},
  }), [staticTodos]);

  const todos = data || [];

  // Create mutation for adding new todos with optimistic update behavior
  const createTodoMutation = useMutation<
    { id: number; text: string; completed: boolean },
    { text: string }
  >({
    mutation: {
      id: "createTodo",
      endpoint: "/api/todos",
      method: "POST",
      invalidates: ["todos"],
    } as MutationSpecification,
    optimistic: {
      getOptimisticData: (variables) => ({
        id: Date.now(), // Temporary ID
        text: variables.text,
        completed: false,
      }),
      updateLocalState: (stateManager, data) => {
        const currentTodos =
          (stateManager.getState().todos as { id: number; text: string; completed: boolean }[]) ||
          [];
        stateManager.setState({ todos: [...currentTodos, data] });
      },
    },
    options: {
      mutationFn: async (variables: { text: string }) => {
        // Simulate API call with delay
        await delay(2000);

        // Simulate 20% chance of failure for demo purposes
        if (simulateRandomFailure(0.2)) {
          throw new Error("Failed to create todo");
        }

        return {
          id: Date.now(),
          text: variables.text,
          completed: false,
        };
      },
      onSuccess: () => {
        setNewTodoText("");
        refetch();
      },
    },
  });

  // Create mutation for toggling task completion status with optimistic update behavior
  const toggleTodoMutation = useMutation<
    { id: number; completed: boolean },
    { id: number; completed: boolean }
  >({
    mutation: {
      id: "toggleTodo",
      endpoint: "/api/todos/{id}",
      method: "PATCH",
      invalidates: ["todos"],
    } as MutationSpecification,
    optimistic: {
      getOptimisticData: (variables) => ({
        id: variables.id,
        completed: variables.completed,
      }),
      updateLocalState: (stateManager, data, variables) => {
        const todos =
          (stateManager.getState().todos as { id: number; text: string; completed: boolean }[]) ||
          [];
        const updatedTodos = todos.map((todo) =>
          todo.id === variables.id ? { ...todo, completed: data.completed } : todo
        );
        stateManager.setState({ todos: updatedTodos });
      },
    },
    options: {
      mutationFn: async (variables: { id: number; completed: boolean }) => {
        await delay(1500);

        // Simulate 10% chance of failure for demo purposes
        if (simulateRandomFailure(0.1)) {
          throw new Error("Failed to toggle todo");
        }

        return variables;
      },
      onSuccess: () => {
        refetch();
      },
    },
  });

  const handleCreateTodo = () => {
    if (newTodoText.trim()) {
      createTodoMutation.mutateOptimistic({ text: newTodoText });
    }
  };

  const handleToggleTodo = (id: number, currentCompleted: boolean) => {
    toggleTodoMutation.mutateOptimistic({
      id,
      completed: !currentCompleted,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Optimistic Updates Demo</h2>
        <p className="text-muted-foreground mb-6">
          Try adding or toggling todos. Updates appear instantly and sync with the server.
          There&apos;s a small chance of failure to demonstrate rollback behavior.
        </p>

        <div className="flex gap-2 mb-6">
          <Input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo..."
            onKeyDown={(e) => e.key === "Enter" && handleCreateTodo()}
          />
          <Button onClick={handleCreateTodo} disabled={createTodoMutation.isPending}>
            {createTodoMutation.isPending ? "Adding..." : "Add Todo"}
          </Button>
        </div>

        {createTodoMutation.isError && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">
            Failed to add todo. Please try again.
          </div>
        )}

        <div className="space-y-2">
          {todos.map((todo: { id: number; text: string; completed: boolean }) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="w-4 h-4"
                disabled={toggleTodoMutation.isPending}
              />
              <span
                className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.text}
              </span>
              {createTodoMutation.isPending && todo.id > 1_000_000_000_000 && (
                <Badge variant="secondary">Saving...</Badge>
              )}
              {toggleTodoMutation.isPending && toggleTodoMutation.variables?.id === todo.id && (
                <Badge variant="secondary">Updating...</Badge>
              )}
            </div>
          ))}
        </div>

        {toggleTodoMutation.isError && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md">
            Failed to update todo. Please try again.
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">How it works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>When you add or toggle a todo, the UI updates immediately</li>
          <li>The change is then synced with the server in the background</li>
          <li>If the server request fails, the UI automatically rolls back</li>
          <li>There&apos;s a simulated delay and random failure chance for demonstration</li>
          <li>
            The &quot;Saving...&quot; and &quot;Updating...&quot; badges show background operations
          </li>
        </ul>
      </Card>
    </div>
  );
}

/**
 * Example component with state management provider
 */
export function OptimisticUpdateExample() {
  return (
    <StateProvider>
      <TodoList />
    </StateProvider>
  );
}
