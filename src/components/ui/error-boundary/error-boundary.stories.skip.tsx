import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ErrorBoundary } from "./error-boundary";
import { Button } from "../button";
import * as React from "react";

const meta: Meta<typeof ErrorBoundary> = {
  title: "UI/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    layout: "fullscreen",
    // Remove test tag to exclude from automated test runs
    // These stories intentionally throw errors for testing error boundaries
    tags: ["skip-test"],
  },
  argTypes: {
    children: {
      control: false,
      description: "The child components to render",
    },
    fallback: {
      control: false,
      description: "Custom error fallback component",
    },
    onError: {
      action: "error",
      description: "Callback when an error is caught",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

// Component that throws an error on demand
const ThrowError: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("Test error: Something went wrong!");
  }
  return <div>No error occurred</div>;
};

// Component with a button that triggers an error
const ErrorTrigger: React.FC = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error("User triggered error!");
  }

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Error Boundary Test</h2>
      <p className="mb-4">Click the button below to trigger an error</p>
      <Button
        onClick={() => setShouldThrow(true)}
        variant="destructive"
        data-testid="trigger-error"
      >
        Trigger Error
      </Button>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <ThrowError shouldThrow={false} />,
  },
  parameters: {
    tags: ["skip-test"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("No error occurred")).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
  },
  parameters: {
    // Suppress expected console errors for this story
    chromatic: { disableSnapshot: true },
    tags: ["skip-test"],
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Oops! Something went wrong")).toBeInTheDocument();
    await expect(canvas.getByText("Test error: Something went wrong!")).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /go home/i })).toBeInTheDocument();
  },
};

export const InteractiveError: Story = {
  args: {
    children: <ErrorTrigger />,
  },
  parameters: {
    // Suppress expected console errors for this story
    chromatic: { disableSnapshot: true },
    tags: ["skip-test"],
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially, no error
    await expect(canvas.getByText("Error Boundary Test")).toBeInTheDocument();

    // Click the button to trigger an error
    const triggerButton = canvas.getByTestId("trigger-error");
    await userEvent.click(triggerButton);

    // Error UI should appear
    await expect(canvas.getByText("Oops! Something went wrong")).toBeInTheDocument();
    await expect(canvas.getByText("User triggered error!")).toBeInTheDocument();
  },
};

export const WithReset: Story = {
  render: function Render() {
    const [key] = React.useState(0);

    return (
      <ErrorBoundary key={key}>
        <ErrorTrigger />
      </ErrorBoundary>
    );
  },
  parameters: {
    // Suppress expected console errors for this story
    chromatic: { disableSnapshot: true },
    tags: ["skip-test"],
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Trigger error
    const triggerButton = canvas.getByTestId("trigger-error");
    await userEvent.click(triggerButton);

    // Error UI appears
    await expect(canvas.getByText("Oops! Something went wrong")).toBeInTheDocument();

    // Click try again
    const tryAgainButton = canvas.getByRole("button", { name: /try again/i });
    await userEvent.click(tryAgainButton);

    // Component should reset - the error UI persists because the state hasn't been reset
    // In a real app, the parent would handle the reset
  },
};

// Custom fallback component
const CustomFallback: React.FC<{
  error: Error;
  errorInfo: React.ErrorInfo;
  resetError: () => void;
}> = ({ error, resetError }) => (
  <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
    <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Custom Error Handler</h1>
    <p className="text-red-500 mb-4">{error.message}</p>
    <Button onClick={resetError} variant="outline" size="sm">
      Reset Application
    </Button>
  </div>
);

export const WithCustomFallback: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    fallback: CustomFallback,
  },
  parameters: {
    // Suppress expected console errors for this story
    chromatic: { disableSnapshot: true },
    tags: ["skip-test"],
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Custom Error Handler")).toBeInTheDocument();
    await expect(canvas.getByText("Test error: Something went wrong!")).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /reset application/i })).toBeInTheDocument();
  },
};

export const WithErrorCallback: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    onError: (error, errorInfo) => {
      // Using console.info instead of console.log to avoid test issues
      console.info("Error captured:", error.message);
      console.info("Component stack:", errorInfo.componentStack);
    },
  },
  parameters: {
    // Suppress expected console errors for this story
    chromatic: { disableSnapshot: true },
    tags: ["skip-test"],
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Oops! Something went wrong")).toBeInTheDocument();
  },
};

// Async error simulation
const AsyncErrorComponent: React.FC = () => {
  React.useEffect(() => {
    globalThis.setTimeout(() => {
      throw new Error("Async error after mount!");
    }, 100);
  }, []);

  return <div>Loading...</div>;
};

export const AsyncError: Story = {
  args: {
    children: <AsyncErrorComponent />,
  },
  parameters: {
    tags: ["skip-test"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows loading
    await expect(canvas.getByText("Loading...")).toBeInTheDocument();

    // After timeout, error boundary catches the error
    // Note: Async errors in useEffect aren't caught by error boundaries
    // This is a React limitation
  },
};

// Nested error boundaries
export const NestedBoundaries: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="p-8">
        <h1 className="text-2xl mb-4">Parent Component</h1>
        <div className="border p-4">
          <ErrorBoundary>
            <h2 className="text-xl mb-2">Child Component</h2>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  ),
  parameters: {
    // Suppress expected console errors for this story
    chromatic: { disableSnapshot: true },
    tags: ["skip-test"],
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Only the inner error boundary catches the error
    await expect(canvas.getByText("Parent Component")).toBeInTheDocument();
    await expect(canvas.getByText("Oops! Something went wrong")).toBeInTheDocument();
  },
};
