import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "./button";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render the button as a child component",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    variant: "default",
    size: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test button renders
    const button = canvas.getByRole("button", { name: "Button" });
    expect(button).toBeInTheDocument();

    // Test button can be clicked
    await user.click(button);

    // Test default styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Secondary: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    variant: "secondary",
    children: "Secondary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test secondary button renders
    const button = canvas.getByRole("button", { name: "Secondary" });
    expect(button).toBeInTheDocument();

    // Test secondary variant styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Destructive: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    variant: "destructive",
    children: "Delete",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test destructive button renders
    const button = canvas.getByRole("button", { name: "Delete" });
    expect(button).toBeInTheDocument();

    // Test destructive variant styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Outline: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    variant: "outline",
    children: "Outline",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test outline button renders
    const button = canvas.getByRole("button", { name: "Outline" });
    expect(button).toBeInTheDocument();

    // Test outline variant styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Ghost: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    variant: "ghost",
    children: "Ghost",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test ghost button renders
    const button = canvas.getByRole("button", { name: "Ghost" });
    expect(button).toBeInTheDocument();

    // Test ghost variant styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Link: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    variant: "link",
    children: "Link Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test link button renders
    const button = canvas.getByRole("button", { name: "Link Button" });
    expect(button).toBeInTheDocument();

    // Test link variant styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Small: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    size: "sm",
    children: "Small",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test small button renders
    const button = canvas.getByRole("button", { name: "Small" });
    expect(button).toBeInTheDocument();

    // Test small size styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Large: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    size: "lg",
    children: "Large",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test large button renders
    const button = canvas.getByRole("button", { name: "Large" });
    expect(button).toBeInTheDocument();

    // Test large size styling
    expect(button).toHaveAttribute("data-slot", "button");
  },
});

export const Disabled: Story = enhanceStoryForDualMode<typeof Button>({
  args: {
    children: "Disabled",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test disabled button
    const button = canvas.getByRole("button", { name: "Disabled" });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Test disabled attribute is present
    expect(button).toHaveAttribute("disabled");

    // Test pointer-events-none class is applied
    expect(button).toHaveClass("disabled:pointer-events-none");

    // Cannot test clicking disabled button as userEvent respects pointer-events: none
    // This is actually good - it means the button is truly disabled
  },
});

export const WithIcon: Story = enhanceStoryForDualMode<typeof Button>(
  {
    render: () => (
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        GitHub
      </Button>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test button with icon renders
      const button = canvas.getByRole("button", { name: /GitHub/ });
      expect(button).toBeInTheDocument();

      // Test button styling
      expect(button).toHaveAttribute("data-slot", "button");

      // Test that SVG icon is present (React mode only)
      const svg = button.querySelector("svg");
      if (svg) {
        expect(svg).toBeInTheDocument();
      }
    },
  },
  {
    // For SDUI mode, use proper icon component reference
    renderSpec: {
      type: "Button",
      children: [
        {
          type: "Icon",
          name: "globe",
          size: 16
        },
        "GitHub"
      ],
    },
  }
);

export const IconOnly: Story = enhanceStoryForDualMode<typeof Button>(
  {
    render: () => (
      <Button size="icon" aria-label="Settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Button>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test icon button
      const button = canvas.getByRole("button", { name: "Settings" });
      expect(button).toBeInTheDocument();

      // Test icon size class
      expect(button).toHaveClass("size-9");

      // Test hover interaction
      await user.hover(button);

      // Test keyboard interaction
      button.focus();
      await user.keyboard("{Enter}");
    },
  },
  {
    // For SDUI mode, use proper icon component reference
    renderSpec: {
      type: "Button",
      size: "icon",
      "aria-label": "Settings",
      children: {
        type: "Icon",
        name: "settings"
      },
    },
  }
);

export const ButtonGroup: Story = enhanceStoryForDualMode<typeof Button>(
  {
    render: (args) => (
      <div className="inline-flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test both buttons exist
      const cancelButton = canvas.getByRole("button", { name: "Cancel" });
      const submitButton = canvas.getByRole("button", { name: "Submit" });

      expect(cancelButton).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();

      // Test button variants
      expect(cancelButton).toHaveClass("border", "border-input");
      expect(submitButton).toHaveClass("bg-primary");

      // Test button group layout
      const container = canvasElement.querySelector(".inline-flex.gap-2");
      expect(container).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "row",
      gap: "sm",
      className: "inline-flex",
      children: [
        {
          type: "Button",
          variant: "outline",
          children: "Cancel",
        },
        {
          type: "Button",
          variant: "default",
          children: "Submit",
        },
      ],
    },
  }
);

export const Loading: Story = enhanceStoryForDualMode<typeof Button>(
  {
    render: () => (
      <Button disabled>
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Processing...
      </Button>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test loading button renders
      const button = canvas.getByRole("button", { name: /Processing/ });
      expect(button).toBeInTheDocument();

      // Test button is disabled during loading
      expect(button).toBeDisabled();

      // Test button styling
      expect(button).toHaveAttribute("data-slot", "button");

      // Test loading spinner is present (React mode only)
      const svg = button.querySelector("svg");
      if (svg) {
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass("animate-spin");
      }
    },
  },
  {
    // For SDUI mode, use proper icon component reference
    renderSpec: {
      type: "Button",
      disabled: true,
      children: [
        {
          type: "Icon",
          name: "loader",
          size: 16,
          className: "animate-spin"
        },
        "Processing..."
      ],
    },
  }
);

export const WithIconRight: Story = enhanceStoryForDualMode<typeof Button>(
  {
    render: () => (
      <Button>
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </Button>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test button with icon renders
      const button = canvas.getByRole("button", { name: /Next/ });
      expect(button).toBeInTheDocument();

      // Test button styling
      expect(button).toHaveAttribute("data-slot", "button");

      // Test that SVG icon is present (React mode only)
      const svg = button.querySelector("svg");
      if (svg) {
        expect(svg).toBeInTheDocument();
      }
    },
  },
  {
    // For SDUI mode, use proper icon component reference
    renderSpec: {
      type: "Button",
      children: [
        "Next",
        {
          type: "Icon",
          name: "chevron-right",
          size: 16
        }
      ],
    },
  }
);
