import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "../label/label";
import { within, userEvent, expect } from "@storybook/test";

const meta = {
  title: "Components/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
};

export const WithLabel: Story = {
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
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText("Disabled input");
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();

    await userEvent.click(input);
    expect(input).not.toHaveFocus();
  },
};

export const WithIcon: Story = {
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
    expect(input).toHaveClass("pl-8");

    const svg = canvas.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();

    await userEvent.type(input, "search query");
    expect(input).toHaveValue("search query");
  },
};
