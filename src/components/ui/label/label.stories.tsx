import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Input } from "../input/input";
import { within, userEvent, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Form Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Label>({
  args: {
    children: "Label",
    htmlFor: "input",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify label is rendered
    const label = await canvas.findByText("Label");
    expect(label).toBeInTheDocument();

    // Verify label has correct htmlFor attribute
    expect(label).toHaveAttribute("for", "input");

    // Verify label has data-slot attribute
    expect(label).toHaveAttribute("data-slot", "label");
  },
});

export const WithInput: Story = enhanceStoryForDualMode<typeof Label>(
  {
    render: () => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Find label and input
      const label = await canvas.findByText("Email");
      const input = await canvas.findByPlaceholderText("Enter your email");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();

      // Verify label has data-slot attribute
      expect(label).toHaveAttribute("data-slot", "label");

      // Clicking the label should focus the input
      await userEvent.click(label);
      expect(input).toHaveFocus();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xs",
      className: "w-full max-w-sm",
      children: [
        {
          type: "Label",
          htmlFor: "email",
          children: "Email",
        },
        {
          type: "Input",
          inputType: "email",
          id: "email",
          placeholder: "Enter your email",
        },
      ],
    },
  }
);

export const Required: Story = enhanceStoryForDualMode<typeof Label>(
  {
    render: () => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username" className="after:content-['*'] after:ml-0.5 after:text-red-500">
          Username
        </Label>
        <Input id="username" placeholder="Enter username" />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Find label and input
      const label = await canvas.findByText("Username");
      const input = await canvas.findByPlaceholderText("Enter username");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();

      // Verify label has data-slot attribute
      expect(label).toHaveAttribute("data-slot", "label");

      // Verify the required indicator (asterisk) styling is applied
      expect(label).toHaveClass("after:content-['*']");

      // Clicking the label should focus the input
      await userEvent.click(label);
      expect(input).toHaveFocus();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xs",
      className: "w-full max-w-sm",
      children: [
        {
          type: "Label",
          htmlFor: "username",
          className: "after:content-['*'] after:ml-0.5 after:text-red-500",
          children: "Username",
        },
        {
          type: "Input",
          id: "username",
          placeholder: "Enter username",
        },
      ],
    },
  }
);
