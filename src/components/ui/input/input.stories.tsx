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

export const WithStartAndEndIcons: Story = enhanceStoryForDualMode<typeof Input>(
  {
    render: () => (
      <div className="relative w-full max-w-sm">
        <Input placeholder="Email address" className="pl-8 pr-8" type="email" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
          </svg>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-muted-foreground"
          >
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByPlaceholderText("Email address");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "email");

      // Check that both icons are present
      const svgIcons = canvasElement.querySelectorAll("svg");
      expect(svgIcons).toHaveLength(2);
      
      // Check for proper padding on both sides
      expect(input).toHaveClass("pl-8");
      expect(input).toHaveClass("pr-8");

      await userEvent.type(input, "test@example.com");
      expect(input).toHaveValue("test@example.com");
    },
  },
  {
    renderSpec: {
      type: "Input",
      placeholder: "Email address",
      inputType: "email",
      startIcon: {
        type: "Icon",
        name: "mail",
        className: "h-4 w-4 text-muted-foreground",
      },
      endIcon: {
        type: "Icon",
        name: "check",
        className: "h-4 w-4 text-muted-foreground",
      },
      className: "w-full max-w-sm",
    },
  }
);

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

      // Check that the search icon is present in both modes
      const svgIcon = canvasElement.querySelector("svg");
      expect(svgIcon).toBeInTheDocument();
      
      // Check for proper padding
      expect(input).toHaveClass("pl-8");

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

export const WithEndIcon: Story = enhanceStoryForDualMode<typeof Input>(
  {
    render: () => (
      <div className="relative w-full max-w-sm">
        <Input placeholder="Password" className="pr-8" type="password" />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);

      const input = canvas.getByPlaceholderText("Password");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "password");

      // Check that the icon is present
      const svgIcon = canvasElement.querySelector("svg");
      expect(svgIcon).toBeInTheDocument();
      
      // Check for proper padding
      expect(input).toHaveClass("pr-8");

      await userEvent.type(input, "secretpassword");
      expect(input).toHaveValue("secretpassword");
    },
  },
  {
    renderSpec: {
      type: "Input",
      placeholder: "Password",
      inputType: "password",
      endIcon: {
        type: "Icon",
        name: "eye",
        className: "h-4 w-4 text-muted-foreground",
      },
      className: "w-full max-w-sm",
    },
  }
);
