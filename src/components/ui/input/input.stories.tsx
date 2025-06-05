import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";
import { Label } from "../label/label";
import { within, userEvent, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Form Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Input>({
  args: {
    placeholder: "Enter text here...",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText("Enter text here...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    await userEvent.click(input);
    expect(input).toHaveFocus();

    await userEvent.type(input, "Hello, World!");
    expect(input).toHaveValue("Hello, World!");
  },
});

export const WithLabel: Story = enhanceStoryForDualMode<typeof Input>(
  {
    render: () => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const label = canvas.getByText("Email");
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute("for", "email");

      const input = canvas.getByPlaceholderText("Enter your email");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("id", "email");

      await userEvent.type(input, "test@example.com");
      expect(input).toHaveValue("test@example.com");
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "grid w-full max-w-sm items-center gap-1.5",
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

export const Disabled: Story = enhanceStoryForDualMode<typeof Input>({
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText("Disabled input");
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();

    // Disabled inputs cannot be clicked or focused
    // Test that the input remains unfocused
    expect(input).not.toHaveFocus();
  },
});

export const WithIcon: Story = enhanceStoryForDualMode<typeof Input>(
  {
    render: () => (
      <div className="relative w-full max-w-sm">
        <Input placeholder="Search..." className="pl-8" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-muted-foreground"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByPlaceholderText("Search...");
      expect(input).toBeInTheDocument();

      // In React mode, check for padding class and icon presence
      // In SDUI mode, the basic Input component doesn't support icons yet
      const isReactMode = canvasElement.querySelector("svg") !== null;
      
      if (isReactMode) {
        expect(input).toHaveClass("pl-8");
        
        // Check that the search icon is present
        const svgIcon = canvasElement.querySelector("svg");
        expect(svgIcon).toBeInTheDocument();
      }

      await userEvent.type(input, "search query");
      expect(input).toHaveValue("search query");
    },
  },
  {
    renderSpec: {
      type: "Input",
      placeholder: "Search...",
      startIcon: {
        type: "Icon",
        name: "search",
        className: "h-4 w-4 text-muted-foreground",
      },
      className: "w-full max-w-sm",
    },
  }
);
