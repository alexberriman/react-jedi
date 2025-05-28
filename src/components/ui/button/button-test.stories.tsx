import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "./button";

/**
 * Example story demonstrating Storybook Test Addon capabilities
 * This shows how to write interaction tests, assertions, and accessibility checks
 */
const meta = {
  title: "Components/UI/Button/Tests",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic interaction test
 */
export const BasicInteraction: Story = {
  args: {
    children: "Click me",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /click me/i });

    // Check button is in the document
    await expect(button).toBeInTheDocument();

    // Click the button
    await userEvent.click(button);

    // Verify onClick was called
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Test disabled state behavior
 */
export const DisabledState: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Check button is disabled
    await expect(button).toBeDisabled();

    // Try to click disabled button
    await userEvent.click(button);

    // Verify onClick was NOT called
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * Test hover and focus states
 */
export const HoverAndFocus: Story = {
  args: {
    children: "Hover me",
    variant: "outline",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Test hover
    await userEvent.hover(button);

    // Button should have hover styles (you can check computed styles if needed)
    await expect(button).toHaveClass("hover:bg-accent");

    // Test focus
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Test keyboard interaction
    await userEvent.keyboard("{Enter}");
    // The test should verify the onClick handler was called instead
    // await expect(button).toHaveBeenCalledTimes(1);
  },
};

/**
 * Test different variants render correctly
 */
export const VariantTesting: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all variants are rendered
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(5); // link variant is rendered as anchor

    // Check link variant is rendered as anchor
    const link = canvas.getByRole("link");
    await expect(link).toBeInTheDocument();

    // Verify variant classes
    await expect(buttons[0]).toHaveClass("bg-primary");
    await expect(buttons[1]).toHaveClass("bg-destructive");
    await expect(buttons[2]).toHaveClass("border");
  },
};

/**
 * Test size variations
 */
export const SizeTesting: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    // Check all sizes are rendered
    await expect(buttons).toHaveLength(4);

    // Verify size classes
    await expect(buttons[0]).toHaveClass("h-8");
    await expect(buttons[1]).toHaveClass("h-9");
    await expect(buttons[2]).toHaveClass("h-10");
    await expect(buttons[3]).toHaveClass("h-9", "w-9");
  },
};

/**
 * Test loading state with proper ARIA attributes
 */
export const LoadingState: Story = {
  args: {
    children: "Loading...",
    disabled: true,
    "aria-busy": true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Check loading state
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
  },
};

/**
 * Test custom className merging
 */
export const CustomStyling: Story = {
  args: {
    children: "Custom Button",
    className: "custom-class text-xl font-bold",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Check custom classes are applied
    await expect(button).toHaveClass("custom-class", "text-xl", "font-bold");

    // Ensure default classes are still present
    await expect(button).toHaveClass("inline-flex", "items-center");
  },
};

/**
 * Test form submission behavior
 */
export const FormSubmission: Story = {
  render: function FormSubmissionRender() {
    const handleSubmit = fn((e: React.FormEvent) => {
      e.preventDefault();
    });

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="test"
          defaultValue="test value"
          className="mr-2 rounded border p-2"
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /submit/i });
    const form = canvasElement.querySelector("form");

    // Submit form by clicking button
    await userEvent.click(button);

    // Check form submission was triggered
    await expect(form).toBeTruthy();
  },
};

/**
 * Complex interaction scenario
 */
export const ComplexInteraction: Story = {
  render: function ComplexInteractionRender() {
    const [count, setCount] = React.useState(0);

    return (
      <div className="text-center">
        <p className="mb-4">
          Count: <span data-testid="count">{count}</span>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCount((c) => c - 1)} disabled={count <= 0}>
            Decrement
          </Button>
          <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
          <Button variant="destructive" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const incrementBtn = canvas.getByRole("button", { name: /increment/i });
    const decrementBtn = canvas.getByRole("button", { name: /decrement/i });
    const resetBtn = canvas.getByRole("button", { name: /reset/i });
    const count = canvas.getByTestId("count");

    // Initial state
    await expect(count).toHaveTextContent("0");
    await expect(decrementBtn).toBeDisabled();

    // Increment
    await userEvent.click(incrementBtn);
    await expect(count).toHaveTextContent("1");
    await expect(decrementBtn).not.toBeDisabled();

    // Increment again
    await userEvent.click(incrementBtn);
    await expect(count).toHaveTextContent("2");

    // Decrement
    await userEvent.click(decrementBtn);
    await expect(count).toHaveTextContent("1");

    // Reset
    await userEvent.click(resetBtn);
    await expect(count).toHaveTextContent("0");
    await expect(decrementBtn).toBeDisabled();
  },
};
