import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Toaster, toast } from "./index";

const meta = {
  title: "Components/UI/Toast",
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Beautiful, modern toast notifications for React. Built with Sonner.",
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button onClick={() => toast("This is a basic toast notification")}>Show Basic Toast</Button>
      <Button onClick={() => toast.success("Success! Operation completed.")}>
        Show Success Toast
      </Button>
      <Button onClick={() => toast.error("Error! Something went wrong.")}>Show Error Toast</Button>
      <Button onClick={() => toast.warning("Warning! Please check your input.")}>
        Show Warning Toast
      </Button>
      <Button onClick={() => toast.info("Info: Here is some information.")}>Show Info Toast</Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() =>
          toast("New message received", {
            description: "Your friend John sent you a message.",
          })
        }
      >
        Toast with Description
      </Button>
      <Button
        onClick={() =>
          toast.success("Payment completed", {
            description: "Your payment has been processed successfully.",
            duration: 5000,
          })
        }
      >
        Success with Details
      </Button>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() =>
          toast("Quick message", {
            duration: 1000,
          })
        }
      >
        Short Duration (1s)
      </Button>
      <Button
        onClick={() =>
          toast("Important message", {
            duration: 10_000,
          })
        }
      >
        Long Duration (10s)
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() =>
          toast("File uploaded", {
            action: {
              label: "Undo",
              onClick: () => toast("Upload cancelled"),
            },
          })
        }
      >
        Toast with Action Button
      </Button>
      <Button
        onClick={() =>
          toast.success("Settings saved", {
            description: "Your preferences have been updated.",
            action: {
              label: "View",
              onClick: () => globalThis.alert("Viewing settings..."),
            },
          })
        }
      >
        Success with Action
      </Button>
    </div>
  ),
};

export const Positioning: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          toast("Top-left position");
        }}
      >
        Default Position (Bottom-right)
      </Button>
      <p className="text-sm text-muted-foreground">
        Position is controlled by the Toaster component style prop
      </p>
    </div>
  ),
};

export const AsyncOperations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          const promiseFunction = new Promise((resolve) => globalThis.setTimeout(resolve, 2000));

          toast.promise(promiseFunction, {
            loading: "Loading...",
            success: "Operation completed!",
            error: "Failed to complete operation",
          });
        }}
      >
        Promise Toast
      </Button>
      <Button
        onClick={() => {
          const promiseFunction = new Promise((_, reject) => globalThis.setTimeout(reject, 2000));

          toast.promise(promiseFunction, {
            loading: "Processing...",
            success: "Should not show",
            error: "Operation failed as expected",
          });
        }}
      >
        Failed Promise
      </Button>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() =>
          toast("Custom styled toast", {
            style: {
              background: "#8B5CF6",
              color: "#FFFFFF",
              border: "none",
            },
          })
        }
      >
        Purple Toast
      </Button>
      <Button
        onClick={() =>
          toast("Gradient background", {
            style: {
              background: "linear-gradient(to right, #EC4899, #8B5CF6)",
              color: "#FFFFFF",
              border: "none",
            },
          })
        }
      >
        Gradient Toast
      </Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          const toastId = toast.loading("Uploading file...");

          globalThis.setTimeout(() => {
            toast.success("File uploaded successfully", {
              id: toastId,
            });
          }, 3000);
        }}
      >
        Loading to Success
      </Button>
      <Button
        onClick={() => {
          const toastId = toast.loading("Processing payment...");

          globalThis.setTimeout(() => {
            toast.error("Payment failed", {
              id: toastId,
              description: "Your card was declined.",
            });
          }, 2000);
        }}
      >
        Loading to Error
      </Button>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() =>
          toast(
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary">🎉</span>
              </div>
              <div>
                <p className="font-semibold">Welcome aboard!</p>
                <p className="text-sm text-muted-foreground">Your account is ready</p>
              </div>
            </div>
          )
        }
      >
        Custom JSX Content
      </Button>
      <Button
        onClick={() =>
          toast.custom((t) => (
            <div className="bg-card border rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2">Custom Toast Component</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This is a completely custom toast design.
              </p>
              <Button size="sm" onClick={() => toast.dismiss(t)}>
                Dismiss
              </Button>
            </div>
          ))
        }
      >
        Fully Custom Toast
      </Button>
    </div>
  ),
};
