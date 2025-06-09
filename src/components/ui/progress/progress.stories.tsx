import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Progress } from "./progress";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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
      <div className="w-[350px] max-w-full py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Progress>({
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
});

export const Empty: Story = enhanceStoryForDualMode<typeof Progress>({
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
});

export const Quarter: Story = enhanceStoryForDualMode<typeof Progress>({
  args: {
    value: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "25");

    // Test visual indicator at 25%
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute(
      "style",
      expect.stringContaining("transform: translateX(-75%)")
    );
  },
});

export const Half: Story = enhanceStoryForDualMode<typeof Progress>({
  args: {
    value: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");

    // Test visual indicator at 50%
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute(
      "style",
      expect.stringContaining("transform: translateX(-50%)")
    );
  },
});

export const ThreeQuarters: Story = enhanceStoryForDualMode<typeof Progress>({
  args: {
    value: 75,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "75");

    // Test visual indicator at 75%
    const indicator = progressBar.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute(
      "style",
      expect.stringContaining("transform: translateX(-25%)")
    );
  },
});

export const Complete: Story = enhanceStoryForDualMode<typeof Progress>({
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
});

export const CustomSized: Story = enhanceStoryForDualMode<typeof Progress>({
  args: {
    value: 40,
    className: "w-96",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "40");
    expect(progressBar).toHaveClass("w-96");
  },
});

export const CustomHeight: Story = enhanceStoryForDualMode<typeof Progress>({
  args: {
    value: 70,
    className: "h-4",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "70");
    expect(progressBar).toHaveClass("h-4");
  },
});

export const CustomColors: Story = enhanceStoryForDualMode<typeof Progress>({
  args: {
    value: 85,
    className: "bg-blue-100 [&_[data-slot='progress-indicator']]:bg-blue-500",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const progressBar = canvas.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "85");
    expect(progressBar).toHaveClass("bg-blue-100");
  },
});

export const Interactive: Story = enhanceStoryForDualMode<typeof Progress>(
  {
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

      // Test that progress bar is rendered
      const progressBar = canvas.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();
      
      // Test that percentage text is rendered (could be 0% or higher depending on timing)
      const percentTexts = canvas.getAllByText((content, element) => {
        return element?.tagName === "P" && element?.textContent?.match(/^\d{1,3}% Complete$/) !== null;
      });
      expect(percentTexts.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "w-96",
      children: [
        {
          type: "Progress",
          value: 0,
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          align: "center",
          children: "0% Complete",
        },
      ],
    },
  }
);

export const IndeterminateProgress: Story = enhanceStoryForDualMode<typeof Progress>(
  {
    render: () => {
      // Progress component doesn't support indeterminate state by default
      // This is a demo of how it could be customized
      return (
        <div className="w-96 space-y-4">
          <div className="bg-primary/20 relative h-3 w-full overflow-hidden rounded-full">
            <div className="bg-primary h-full w-1/2 animate-pulse" />
          </div>
          <p className="text-center text-sm text-muted-foreground">Loading...</p>
        </div>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test loading text is rendered
      expect(canvas.getByText("Loading...")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "w-96",
      children: [
        {
          type: "Box",
          className: "bg-primary/20 relative h-3 w-full overflow-hidden rounded-full",
          children: {
            type: "Box",
            className: "bg-primary h-full w-1/2 animate-pulse",
          },
        },
        {
          type: "Text",
          size: "sm",
          variant: "muted",
          align: "center",
          children: "Loading...",
        },
      ],
    },
  }
);

export const WithLabel: Story = enhanceStoryForDualMode<typeof Progress>(
  {
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
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      className: "w-96",
      children: [
        {
          type: "Flex",
          justify: "between",
          className: "text-sm text-muted-foreground",
          children: [
            {
              type: "Text",
              element: "span",
              children: "Progress",
            },
            {
              type: "Text",
              element: "span",
              children: "65%",
            },
          ],
        },
        {
          type: "Progress",
          value: 65,
        },
      ],
    },
  }
);

export const MultipleProgress: Story = enhanceStoryForDualMode<typeof Progress>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all file labels are rendered
      expect(canvas.getByText("File 1")).toBeInTheDocument();
      expect(canvas.getByText("File 2")).toBeInTheDocument();
      expect(canvas.getByText("File 3")).toBeInTheDocument();

      // Test all percentages are rendered
      expect(canvas.getByText("25%")).toBeInTheDocument();
      expect(canvas.getByText("50%")).toBeInTheDocument();
      expect(canvas.getByText("90%")).toBeInTheDocument();

      // Test all progress bars are rendered
      const progressBars = canvas.getAllByRole("progressbar");
      expect(progressBars).toHaveLength(3);
      expect(progressBars[0]).toHaveAttribute("aria-valuenow", "25");
      expect(progressBars[1]).toHaveAttribute("aria-valuenow", "50");
      expect(progressBars[2]).toHaveAttribute("aria-valuenow", "90");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "lg",
      className: "w-96",
      children: [
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Flex",
              justify: "between",
              className: "text-sm",
              children: [
                {
                  type: "Text",
                  element: "span",
                  children: "File 1",
                },
                {
                  type: "Text",
                  element: "span",
                  children: "25%",
                },
              ],
            },
            {
              type: "Progress",
              value: 25,
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Flex",
              justify: "between",
              className: "text-sm",
              children: [
                {
                  type: "Text",
                  element: "span",
                  children: "File 2",
                },
                {
                  type: "Text",
                  element: "span",
                  children: "50%",
                },
              ],
            },
            {
              type: "Progress",
              value: 50,
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "sm",
          children: [
            {
              type: "Flex",
              justify: "between",
              className: "text-sm",
              children: [
                {
                  type: "Text",
                  element: "span",
                  children: "File 3",
                },
                {
                  type: "Text",
                  element: "span",
                  children: "90%",
                },
              ],
            },
            {
              type: "Progress",
              value: 90,
            },
          ],
        },
      ],
    },
  }
);
