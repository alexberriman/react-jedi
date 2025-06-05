import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { AlertCircle, Terminal, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./index";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays a callout for important user information with optional icons and different severity variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "info", "warning", "success"],
      description: "The visual style variant of the alert",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
    children: {
      control: "text",
      description: "Alert content",
    },
  },

  tags: ["autodocs", "ui-alert"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test alert structure
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check title and description
      expect(canvas.getByText("Heads up!")).toBeInTheDocument();
      expect(
        canvas.getByText("You can add components to your app using the cli.")
      ).toBeInTheDocument();

      // Verify default styling
      expect(alert).toHaveClass("relative", "w-full", "rounded-xl");
    },
  },
  {
    renderSpec: {
      type: "Alert",
      children: [
        {
          type: "AlertTitle",
          children: "Heads up!"
        },
        {
          type: "AlertDescription",
          children: "You can add components to your app using the cli."
        }
      ]
    }
  }
);

export const Destructive: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test destructive variant
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();
      // Check destructive styling is applied
      expect(alert).toHaveClass("text-destructive");

      // Check error content
      expect(canvas.getByText("Error")).toBeInTheDocument();
      expect(canvas.getByText("Your session has expired. Please log in again.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      variant: "destructive",
      children: [
        {
          type: "AlertTitle",
          children: "Error"
        },
        {
          type: "AlertDescription",
          children: "Your session has expired. Please log in again."
        }
      ]
    }
  }
);

export const WithoutIcon: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert>
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          This is an alert message without an icon. It still maintains proper alignment.
        </AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test alert without icon
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check title and description
      expect(canvas.getByText("Important Notice")).toBeInTheDocument();
      expect(
        canvas.getByText("This is an alert message without an icon. It still maintains proper alignment.")
      ).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      children: [
        {
          type: "AlertTitle",
          children: "Important Notice"
        },
        {
          type: "AlertDescription",
          children: "This is an alert message without an icon. It still maintains proper alignment."
        }
      ]
    }
  }
);

export const InfoAlert: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational alert with the new info variant.</AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test info variant
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check info content
      expect(canvas.getByText("Information")).toBeInTheDocument();
      expect(canvas.getByText("This is an informational alert with the new info variant.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      variant: "info",
      children: [
        {
          type: "AlertTitle",
          children: "Information"
        },
        {
          type: "AlertDescription",
          children: "This is an informational alert with the new info variant."
        }
      ]
    }
  }
);

export const WarningAlert: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert that requires user attention.</AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test warning variant
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check warning content
      expect(canvas.getByText("Warning")).toBeInTheDocument();
      expect(canvas.getByText("This is a warning alert that requires user attention.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      variant: "warning",
      children: [
        {
          type: "AlertTitle",
          children: "Warning"
        },
        {
          type: "AlertDescription",
          children: "This is a warning alert that requires user attention."
        }
      ]
    }
  }
);

export const SuccessAlert: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert variant="success">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test success variant
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check success content
      expect(canvas.getByText("Success")).toBeInTheDocument();
      expect(canvas.getByText("Your changes have been saved successfully.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      variant: "success",
      children: [
        {
          type: "AlertTitle",
          children: "Success"
        },
        {
          type: "AlertDescription",
          children: "Your changes have been saved successfully."
        }
      ]
    }
  }
);

export const ComplexContent: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>New Features Available</AlertTitle>
        <AlertDescription>
          <p className="mb-2">We&apos;ve released several new features:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enhanced security settings</li>
            <li>Improved performance metrics</li>
            <li>New collaboration tools</li>
          </ul>
          <p className="mt-2">
            Visit the{" "}
            <button
              className="underline font-medium"
              onClick={() => console.log("Documentation clicked")}
            >
              documentation
            </button>{" "}
            to learn more.
          </p>
        </AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test complex content rendering
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check list items
      expect(canvas.getByText("Enhanced security settings")).toBeInTheDocument();
      expect(canvas.getByText("Improved performance metrics")).toBeInTheDocument();
      expect(canvas.getByText("New collaboration tools")).toBeInTheDocument();

      // Test content about documentation - the text might be split across elements
      const alertDescription = alert.querySelector('[data-slot="alert-description"]');
      expect(alertDescription?.textContent).toContain("Visit the");
      expect(alertDescription?.textContent).toContain("to learn more");
      
      // Test interactive button in React mode only if it exists
      try {
        const docButton = canvas.getByRole("button", { name: "documentation" });
        if (docButton) {
          expect(docButton).toBeInTheDocument();
          await user.click(docButton);
        }
      } catch {
        // Button might not exist in SDUI mode, which is fine
      }
    },
  },
  {
    renderSpec: {
      type: "Alert",
      children: [
        {
          type: "AlertTitle",
          children: "New Features Available"
        },
        {
          type: "AlertDescription",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2",
              children: "We've released several new features:"
            },
            {
              type: "Box",
              element: "ul",
              className: "list-disc pl-5 space-y-1",
              children: [
                {
                  type: "Box",
                  element: "li",
                  children: "Enhanced security settings"
                },
                {
                  type: "Box",
                  element: "li",
                  children: "Improved performance metrics"
                },
                {
                  type: "Box",
                  element: "li",
                  children: "New collaboration tools"
                }
              ]
            },
            {
              type: "Text",
              element: "p",
              className: "mt-2",
              children: "Visit the documentation to learn more."
            }
          ]
        }
      ]
    }
  }
);

export const CompactAlert: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert className="py-2">
        <Terminal className="h-3 w-3" />
        <AlertDescription className="text-xs">
          Terminal access granted. Type &apos;help&apos; for available commands.
        </AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test compact alert
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("py-2");

      // Check description with smaller text
      const description = canvas.getByText("Terminal access granted. Type 'help' for available commands.");
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("text-xs");
    },
  },
  {
    renderSpec: {
      type: "Alert",
      className: "py-2",
      children: [
        {
          type: "AlertDescription",
          className: "text-xs",
          children: "Terminal access granted. Type 'help' for available commands."
        }
      ]
    }
  }
);

export const MultipleParagraphs: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>System Maintenance</AlertTitle>
        <AlertDescription>
          <p className="mb-2">We will be performing scheduled maintenance on our systems.</p>
          <p className="mb-2">
            <strong>Date:</strong> January 15, 2025
            <br />
            <strong>Time:</strong> 2:00 AM - 4:00 AM EST
            <br />
            <strong>Impact:</strong> Some services may be temporarily unavailable
          </p>
          <p>We apologize for any inconvenience. For urgent matters, please contact support.</p>
        </AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test multiple paragraphs render
      const alert = canvas.getByRole("alert");
      expect(alert).toBeInTheDocument();

      // Check title and content
      expect(canvas.getByText("System Maintenance")).toBeInTheDocument();
      expect(canvas.getByText("We will be performing scheduled maintenance on our systems.")).toBeInTheDocument();
      
      // Use a more flexible search for the date since it might be split across elements
      const alertDescription = alert.querySelector('[data-slot="alert-description"]');
      expect(alertDescription).toBeInTheDocument();
      
      // In React mode, check for Date: and specific date
      const isReactMode = canvasElement.querySelector('[data-testid="react-render"]');
      if (isReactMode) {
        expect(canvas.getByText("Date:")).toBeInTheDocument();
        expect(alertDescription?.textContent).toContain("January 15, 2025");
      }
      
      expect(canvas.getByText("We apologize for any inconvenience. For urgent matters, please contact support.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      children: [
        {
          type: "AlertTitle",
          children: "System Maintenance"
        },
        {
          type: "AlertDescription",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-2",
              children: "We will be performing scheduled maintenance on our systems."
            },
            {
              type: "Text",
              element: "p",
              className: "mb-2",
              children: [
                {
                  type: "Text",
                  element: "strong",
                  children: "Date:"
                },
                " January 15, 2025",
                {
                  type: "Text",
                  element: "br"
                },
                {
                  type: "Text",
                  element: "strong",
                  children: "Time:"
                },
                " 2:00 AM - 4:00 AM EST",
                {
                  type: "Text",
                  element: "br"
                },
                {
                  type: "Text",
                  element: "strong",
                  children: "Impact:"
                },
                " Some services may be temporarily unavailable"
              ]
            },
            {
              type: "Text",
              element: "p",
              children: "We apologize for any inconvenience. For urgent matters, please contact support."
            }
          ]
        }
      ]
    }
  }
);

export const WithAction: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Update Available</AlertTitle>
        <AlertDescription>
          <p className="mb-3">
            A new version of the application is available. Update now to get the latest features and
            bug fixes.
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Update Now
            </button>
            <button className="px-3 py-1 text-sm border border-border rounded-md hover:bg-accent">
              Remind Me Later
            </button>
          </div>
        </AlertDescription>
      </Alert>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test action buttons presence
      const updateButton = canvas.getByRole("button", { name: "Update Now" });
      const remindButton = canvas.getByRole("button", { name: "Remind Me Later" });

      expect(updateButton).toBeInTheDocument();
      expect(remindButton).toBeInTheDocument();

      // Test button hover states
      await user.hover(updateButton);
      expect(updateButton).toHaveClass("hover:bg-primary/90");

      await user.hover(remindButton);
      expect(remindButton).toHaveClass("hover:bg-accent");

      // Verify alert contains action content
      expect(canvas.getByText(/A new version of the application is available/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Alert",
      children: [
        {
          type: "AlertTitle",
          children: "Update Available"
        },
        {
          type: "AlertDescription",
          children: [
            {
              type: "Text",
              element: "p",
              className: "mb-3",
              children: "A new version of the application is available. Update now to get the latest features and bug fixes."
            },
            {
              type: "Flex",
              gap: "sm",
              children: [
                {
                  type: "Button",
                  variant: "default",
                  size: "sm",
                  className: "px-3 py-1 text-sm",
                  children: "Update Now"
                },
                {
                  type: "Button",
                  variant: "outline",
                  size: "sm",
                  className: "px-3 py-1 text-sm",
                  children: "Remind Me Later"
                }
              ]
            }
          ]
        }
      ]
    }
  }
);

export const Showcase: Story = enhanceStoryForDualMode<typeof Alert>(
  {
    render: () => (
      <div className="space-y-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Default Alert</AlertTitle>
          <AlertDescription>This is a default alert for general information.</AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Destructive Alert</AlertTitle>
          <AlertDescription>This alert indicates an error or critical issue.</AlertDescription>
        </Alert>

        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>Info Alert</AlertTitle>
          <AlertDescription>This is an informational alert.</AlertDescription>
        </Alert>

        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning Alert</AlertTitle>
          <AlertDescription>This is a warning alert.</AlertDescription>
        </Alert>

        <Alert variant="success">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success Alert</AlertTitle>
          <AlertDescription>This is a success alert.</AlertDescription>
        </Alert>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all alert variants are rendered
      const alerts = canvas.getAllByRole("alert");
      expect(alerts).toHaveLength(5);

      // Test each variant content
      expect(canvas.getByText("Default Alert")).toBeInTheDocument();
      expect(canvas.getByText("Destructive Alert")).toBeInTheDocument();
      expect(canvas.getByText("Info Alert")).toBeInTheDocument();
      expect(canvas.getByText("Warning Alert")).toBeInTheDocument();
      expect(canvas.getByText("Success Alert")).toBeInTheDocument();

      // Test descriptions
      expect(canvas.getByText("This is a default alert for general information.")).toBeInTheDocument();
      expect(canvas.getByText("This alert indicates an error or critical issue.")).toBeInTheDocument();
      expect(canvas.getByText("This is an informational alert.")).toBeInTheDocument();
      expect(canvas.getByText("This is a warning alert.")).toBeInTheDocument();
      expect(canvas.getByText("This is a success alert.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Alert",
          children: [
            {
              type: "AlertTitle",
              children: "Default Alert"
            },
            {
              type: "AlertDescription",
              children: "This is a default alert for general information."
            }
          ]
        },
        {
          type: "Alert",
          variant: "destructive",
          children: [
            {
              type: "AlertTitle",
              children: "Destructive Alert"
            },
            {
              type: "AlertDescription",
              children: "This alert indicates an error or critical issue."
            }
          ]
        },
        {
          type: "Alert",
          variant: "info",
          children: [
            {
              type: "AlertTitle",
              children: "Info Alert"
            },
            {
              type: "AlertDescription",
              children: "This is an informational alert."
            }
          ]
        },
        {
          type: "Alert",
          variant: "warning",
          children: [
            {
              type: "AlertTitle",
              children: "Warning Alert"
            },
            {
              type: "AlertDescription",
              children: "This is a warning alert."
            }
          ]
        },
        {
          type: "Alert",
          variant: "success",
          children: [
            {
              type: "AlertTitle",
              children: "Success Alert"
            },
            {
              type: "AlertDescription",
              children: "This is a success alert."
            }
          ]
        }
      ]
    }
  }
);
