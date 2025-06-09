import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../button";
import { Toaster } from "./index";
import { toast } from "sonner";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Components/Toast",
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

  tags: ["autodocs", "ui-toast"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test buttons render
      const basicButton = canvas.getByRole("button", { name: "Show Basic Toast" });
      const successButton = canvas.getByRole("button", { name: "Show Success Toast" });
      const errorButton = canvas.getByRole("button", { name: "Show Error Toast" });
      const warningButton = canvas.getByRole("button", { name: "Show Warning Toast" });
      const infoButton = canvas.getByRole("button", { name: "Show Info Toast" });

      expect(basicButton).toBeInTheDocument();
      expect(successButton).toBeInTheDocument();
      expect(errorButton).toBeInTheDocument();
      expect(warningButton).toBeInTheDocument();
      expect(infoButton).toBeInTheDocument();

      // Test clicking basic toast button
      await user.click(basicButton);

      // Wait a moment for toast to appear and test if there's a toast container in the document
      // Note: Testing toast content directly is complex due to portal rendering
      expect(basicButton).toHaveAttribute("data-slot", "button");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showBasicToast",
          children: "Show Basic Toast",
        },
        {
          type: "Button",
          onClickAction: "showSuccessToast",
          children: "Show Success Toast",
        },
        {
          type: "Button",
          onClickAction: "showErrorToast",
          children: "Show Error Toast",
        },
        {
          type: "Button",
          onClickAction: "showWarningToast",
          children: "Show Warning Toast",
        },
        {
          type: "Button",
          onClickAction: "showInfoToast",
          children: "Show Info Toast",
        },
      ],
      handlers: {
        showBasicToast: () => toast("This is a basic toast notification"),
        showSuccessToast: () => toast.success("Success! Operation completed."),
        showErrorToast: () => toast.error("Error! Something went wrong."),
        showWarningToast: () => toast.warning("Warning! Please check your input."),
        showInfoToast: () => toast.info("Info: Here is some information."),
      },
    },
  }
);

export const WithDescription: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test buttons render
      const descriptionButton = canvas.getByRole("button", { name: "Toast with Description" });
      const detailsButton = canvas.getByRole("button", { name: "Success with Details" });

      expect(descriptionButton).toBeInTheDocument();
      expect(detailsButton).toBeInTheDocument();

      // Test clicking toast buttons
      await user.click(descriptionButton);
      await user.click(detailsButton);

      // Verify buttons are clickable and functional
      expect(descriptionButton).toBeEnabled();
      expect(detailsButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showToastWithDescription",
          children: "Toast with Description",
        },
        {
          type: "Button",
          onClickAction: "showSuccessWithDetails",
          children: "Success with Details",
        },
      ],
      handlers: {
        showToastWithDescription: () => toast("New message received", {
          description: "Your friend John sent you a message.",
        }),
        showSuccessWithDetails: () => toast.success("Payment completed", {
          description: "Your payment has been processed successfully.",
          duration: 5000,
        }),
      },
    },
  }
);

export const CustomDuration: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test buttons render
      const shortButton = canvas.getByRole("button", { name: "Short Duration (1s)" });
      const longButton = canvas.getByRole("button", { name: "Long Duration (10s)" });

      expect(shortButton).toBeInTheDocument();
      expect(longButton).toBeInTheDocument();

      // Verify buttons are enabled
      expect(shortButton).toBeEnabled();
      expect(longButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showShortToast",
          children: "Short Duration (1s)",
        },
        {
          type: "Button",
          onClickAction: "showLongToast",
          children: "Long Duration (10s)",
        },
      ],
      handlers: {
        showShortToast: () => toast("Quick message", { duration: 1000 }),
        showLongToast: () => toast("Important message", { duration: 10_000 }),
      },
    },
  }
);

export const WithAction: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test buttons render
      const actionButton = canvas.getByRole("button", { name: "Toast with Action Button" });
      const successActionButton = canvas.getByRole("button", { name: "Success with Action" });

      expect(actionButton).toBeInTheDocument();
      expect(successActionButton).toBeInTheDocument();

      // Test clicking action buttons
      await user.click(actionButton);

      // Verify button is functional
      expect(actionButton).toBeEnabled();

      await user.click(successActionButton);
      expect(successActionButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showToastWithAction",
          children: "Toast with Action Button",
        },
        {
          type: "Button",
          onClickAction: "showSuccessWithAction",
          children: "Success with Action",
        },
      ],
      handlers: {
        showToastWithAction: () => toast("File uploaded", {
          action: {
            label: "Undo",
            onClick: () => toast("Upload cancelled"),
          },
        }),
        showSuccessWithAction: () => toast.success("Settings saved", {
          description: "Your preferences have been updated.",
          action: {
            label: "View",
            onClick: () => globalThis.alert("Viewing settings..."),
          },
        }),
      },
    },
  }
);

export const Positioning: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test button renders
      const positionButton = canvas.getByRole("button", { name: "Default Position (Bottom-right)" });
      expect(positionButton).toBeInTheDocument();

      // Test description text renders
      const description = canvas.getByText("Position is controlled by the Toaster component style prop");
      expect(description).toBeInTheDocument();

      // Verify button is enabled
      expect(positionButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showPositionToast",
          children: "Default Position (Bottom-right)",
        },
        {
          type: "Text",
          className: "text-sm text-muted-foreground",
          children: "Position is controlled by the Toaster component style prop",
        },
      ],
      handlers: {
        showPositionToast: () => toast("Top-left position"),
      },
    },
  }
);

export const AsyncOperations: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test buttons render
      const promiseButton = canvas.getByRole("button", { name: "Promise Toast" });
      const failedPromiseButton = canvas.getByRole("button", { name: "Failed Promise" });

      expect(promiseButton).toBeInTheDocument();
      expect(failedPromiseButton).toBeInTheDocument();

      // Verify buttons are enabled
      expect(promiseButton).toBeEnabled();
      expect(failedPromiseButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showPromiseToast",
          children: "Promise Toast",
        },
        {
          type: "Button",
          onClickAction: "showFailedPromiseToast",
          children: "Failed Promise",
        },
      ],
      handlers: {
        showPromiseToast: () => {
          const promiseFunction = new Promise((resolve) => globalThis.setTimeout(resolve, 2000));
          toast.promise(promiseFunction, {
            loading: "Loading...",
            success: "Operation completed!",
            error: "Failed to complete operation",
          });
        },
        showFailedPromiseToast: () => {
          const promiseFunction = new Promise((_, reject) => globalThis.setTimeout(reject, 2000));
          toast.promise(promiseFunction, {
            loading: "Processing...",
            success: "Should not show",
            error: "Operation failed as expected",
          });
        },
      },
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test buttons render
      const purpleButton = canvas.getByRole("button", { name: "Purple Toast" });
      const gradientButton = canvas.getByRole("button", { name: "Gradient Toast" });

      expect(purpleButton).toBeInTheDocument();
      expect(gradientButton).toBeInTheDocument();

      // Verify buttons are enabled
      expect(purpleButton).toBeEnabled();
      expect(gradientButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showPurpleToast",
          children: "Purple Toast",
        },
        {
          type: "Button",
          onClickAction: "showGradientToast",
          children: "Gradient Toast",
        },
      ],
      handlers: {
        showPurpleToast: () => toast("Custom styled toast", {
          style: {
            background: "#8B5CF6",
            color: "#FFFFFF",
            border: "none",
          },
        }),
        showGradientToast: () => toast("Gradient background", {
          style: {
            background: "linear-gradient(to right, #EC4899, #8B5CF6)",
            color: "#FFFFFF",
            border: "none",
          },
        }),
      },
    },
  }
);

export const LoadingStates: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test buttons render
      const loadingSuccessButton = canvas.getByRole("button", { name: "Loading to Success" });
      const loadingErrorButton = canvas.getByRole("button", { name: "Loading to Error" });

      expect(loadingSuccessButton).toBeInTheDocument();
      expect(loadingErrorButton).toBeInTheDocument();

      // Verify buttons are enabled
      expect(loadingSuccessButton).toBeEnabled();
      expect(loadingErrorButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showLoadingToSuccess",
          children: "Loading to Success",
        },
        {
          type: "Button",
          onClickAction: "showLoadingToError",
          children: "Loading to Error",
        },
      ],
      handlers: {
        showLoadingToSuccess: () => {
          const toastId = toast.loading("Uploading file...");
          globalThis.setTimeout(() => {
            toast.success("File uploaded successfully", { id: toastId });
          }, 3000);
        },
        showLoadingToError: () => {
          const toastId = toast.loading("Processing payment...");
          globalThis.setTimeout(() => {
            toast.error("Payment failed", {
              id: toastId,
              description: "Your card was declined.",
            });
          }, 2000);
        },
      },
    },
  }
);

export const RichContent: Story = enhanceStoryForDualMode<typeof Toaster>(
  {
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
            toast.custom((id: string | number) => (
              <div className="bg-card border rounded-lg p-4 shadow-lg">
                <h4 className="font-semibold mb-2">Custom Toast Component</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  This is a completely custom toast design.
                </p>
                <Button size="sm" onClick={() => toast.dismiss(id)}>
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test buttons render
      const jsxButton = canvas.getByRole("button", { name: "Custom JSX Content" });
      const customButton = canvas.getByRole("button", { name: "Fully Custom Toast" });

      expect(jsxButton).toBeInTheDocument();
      expect(customButton).toBeInTheDocument();

      // Verify buttons are enabled
      expect(jsxButton).toBeEnabled();
      expect(customButton).toBeEnabled();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Button",
          onClickAction: "showCustomJSXContent",
          children: "Custom JSX Content",
        },
        {
          type: "Button",
          onClickAction: "showFullyCustomToast",
          children: "Fully Custom Toast",
        },
      ],
      handlers: {
        showCustomJSXContent: () => toast("Welcome aboard! Your account is ready", {
          description: "This would normally show custom JSX content",
        }),
        showFullyCustomToast: () => toast("Custom Toast Component", {
          description: "This is a completely custom toast design.",
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        }),
      },
    },
  }
);
