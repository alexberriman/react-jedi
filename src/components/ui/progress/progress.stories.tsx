import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value from 0 to 100",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[350px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test progress bar is rendered
    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    // Test value is set correctly
    expect(progressBar).toHaveAttribute("aria-valuenow", "60");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");

    // Test visual indicator width
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toBeInTheDocument();
    // Check the style attribute directly instead of computed style
    expect(indicator).toHaveAttribute(
      "style",
      expect.stringContaining("transform: translateX(-40%)")
    );
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    // Test visual indicator at 0%
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    // Check the style attribute directly instead of computed style
    expect(indicator).toHaveAttribute(
      "style",
      expect.stringContaining("transform: translateX(-100%)")
    );
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");

    // Test visual indicator at 100%
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    // Check the style attribute directly instead of computed style
    expect(indicator).toHaveAttribute(
      "style",
      expect.stringContaining("transform: translateX(0%)")
    );
  },
};

export const CustomSized: Story = {
  args: {
    value: 40,
    className: "w-96",
  },
};

export const CustomHeight: Story = {
  args: {
    value: 70,
    className: "h-4",
  },
};

export const CustomColors: Story = {
  args: {
    value: 85,
    className: "bg-blue-100 [&_[data-slot='progress-indicator']]:bg-blue-500",
  },
};

export const Interactive: Story = {
  render: function InteractiveProgress() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = globalThis.setInterval(() => {
        setProgress((prev) => {
          const newValue = prev + 10;
          if (newValue >= 100) {
            globalThis.clearInterval(timer);
            return 100;
          }
          return newValue;
        });
      }, 1000);

      return () => globalThis.clearInterval(timer);
    }, []);

    return (
      <div className="w-96 space-y-4">
        <Progress value={progress} />
        <p className="text-center text-sm text-muted-foreground">{progress}% Complete</p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    expect(canvas.getByText("0% Complete")).toBeInTheDocument();
    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    // Wait for progress to update
    await waitFor(
      () => {
        expect(canvas.getByText("10% Complete")).toBeInTheDocument();
        expect(progressBar).toHaveAttribute("aria-valuenow", "10");
      },
      { timeout: 2000 }
    );

    // Wait for more progress
    await waitFor(
      () => {
        expect(canvas.getByText("20% Complete")).toBeInTheDocument();
        expect(progressBar).toHaveAttribute("aria-valuenow", "20");
      },
      { timeout: 3000 }
    );
  },
};

export const IndeterminateProgress: Story = {
  render: () => {
    // Progress component doesn't support indeterminate state by default
    // This is a demo of how it could be customized
    return (
      <div className="w-96 space-y-4">
        <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full w-1/2 animate-pulse" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const value = 65;
    return (
      <div className="w-96 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
        <Progress value={value} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test label is rendered
    expect(canvas.getByText("Progress")).toBeInTheDocument();
    expect(canvas.getByText("65%")).toBeInTheDocument();

    // Test progress bar value
    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "65");
  },
};

export const MultipleProgress: Story = {
  render: () => {
    return (
      <div className="w-96 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>File 1</span>
            <span>25%</span>
          </div>
          <Progress value={25} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>File 2</span>
            <span>50%</span>
          </div>
          <Progress value={50} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>File 3</span>
            <span>90%</span>
          </div>
          <Progress value={90} />
        </div>
      </div>
    );
  },
};

import React from "react";
