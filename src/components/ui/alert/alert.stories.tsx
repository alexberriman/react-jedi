import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { AlertCircle, Terminal, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./index";

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
      options: ["default", "destructive"],
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

  tags: ['ui-alert'],} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

    // Icon is present in the alert

    // Check title and description
    expect(canvas.getByText("Heads up!")).toBeInTheDocument();
    expect(canvas.getByText("You can add components to your app using the cli.")).toBeInTheDocument();

    // Verify default styling
    expect(alert).toHaveClass("relative", "w-full", "rounded-lg", "border");
  },
};

export const Destructive: Story = {
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

    // Icon is rendered with the alert
  },
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Important Notice</AlertTitle>
      <AlertDescription>
        This is an alert message without an icon. It still maintains proper alignment.
      </AlertDescription>
    </Alert>
  ),
};

export const InfoAlert: Story = {
  render: () => (
    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-900 dark:text-blue-100">Information</AlertTitle>
      <AlertDescription className="text-blue-700 dark:text-blue-300">
        This is an informational alert using custom colors.
      </AlertDescription>
    </Alert>
  ),
};

export const WarningAlert: Story = {
  render: () => (
    <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <AlertTitle className="text-yellow-900 dark:text-yellow-100">Warning</AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-300">
        This is a warning alert that requires user attention.
      </AlertDescription>
    </Alert>
  ),
};

export const SuccessAlert: Story = {
  render: () => (
    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
      <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-900 dark:text-green-100">Success</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-300">
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const ComplexContent: Story = {
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

    // Test interactive button
    const docButton = canvas.getByRole("button", { name: "documentation" });
    expect(docButton).toBeInTheDocument();
    
    // Test button is clickable
    await user.click(docButton);
    // Note: We can't easily test console.log in Storybook test runner
  },
};

export const CompactAlert: Story = {
  render: () => (
    <Alert className="py-2">
      <Terminal className="h-3 w-3" />
      <AlertDescription className="text-xs">
        Terminal access granted. Type &apos;help&apos; for available commands.
      </AlertDescription>
    </Alert>
  ),
};

export const MultipleParagraphs: Story = {
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
};

export const WithAction: Story = {
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
};

export const Showcase: Story = {
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

      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Info Alert</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          This is an informational alert.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <AlertTitle className="text-yellow-900 dark:text-yellow-100">Warning Alert</AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
          This is a warning alert.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">Success Alert</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          This is a success alert.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
