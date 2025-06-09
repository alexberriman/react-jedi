import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Loading } from "./loading";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    tags: ["autodocs", "test"],
    docs: {
      description: {
        component:
          "A versatile loading indicator component with multiple variants (spinner, dots, pulse, bars) and sizes. Can be used inline, as an overlay, or full-screen to indicate loading states throughout your application. Supports optional loading text and custom styling to match your design system.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the loading indicator",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse", "bars"],
      description: "Style variant of the loading indicator",
    },
    text: {
      control: "text",
      description: "Optional loading text to display",
    },
    fullScreen: {
      control: "boolean",
      description: "Whether to display as full screen",
    },
    overlay: {
      control: "boolean",
      description: "Whether to display as an overlay",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {},
  play: async ({ canvasElement }) => {
    // Default uses spinner variant
    const spinner = canvasElement.querySelector("svg");
    await expect(spinner).toHaveClass("animate-spin");
  },
});

export const Spinner: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    variant: "spinner",
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector("svg");
    await expect(spinner).toHaveClass("animate-spin");
  },
});

export const SpinnerWithText: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    variant: "spinner",
    text: "Loading content...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading content...")).toBeInTheDocument();
    const spinner = canvasElement.querySelector("svg");
    await expect(spinner).toHaveClass("animate-spin");
  },
});

export const Dots: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    variant: "dots",
  },
  play: async ({ canvasElement }) => {
    const dots = canvasElement.querySelectorAll(".animate-bounce");
    await expect(dots).toHaveLength(3);
  },
});

export const DotsWithText: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    variant: "dots",
    text: "Please wait...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Please wait...")).toBeInTheDocument();
    const dots = canvasElement.querySelectorAll(".animate-bounce");
    await expect(dots).toHaveLength(3);
  },
});

export const Pulse: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    variant: "pulse",
  },
  play: async ({ canvasElement }) => {
    const pulse = canvasElement.querySelector(".animate-pulse");
    await expect(pulse).toBeInTheDocument();
    await expect(pulse).toHaveClass("rounded-full");
  },
});

export const Bars: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    variant: "bars",
  },
  play: async ({ canvasElement }) => {
    const bars = canvasElement.querySelectorAll(".animate-pulse");
    await expect(bars).toHaveLength(4);
  },
});

export const SmallSize: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    size: "sm",
    variant: "spinner",
    text: "Small loader",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinner = canvasElement.querySelector("svg");
    await expect(spinner).toHaveClass("w-4", "h-4");
    await expect(canvas.getByText("Small loader")).toBeInTheDocument();
  },
});

export const LargeSize: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    size: "lg",
    variant: "spinner",
    text: "Large loader",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinner = canvasElement.querySelector("svg");
    await expect(spinner).toHaveClass("w-12", "h-12");
    await expect(canvas.getByText("Large loader")).toBeInTheDocument();
  },
});

export const ExtraLargeSize: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    size: "xl",
    variant: "spinner",
    text: "Extra large loader",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinner = canvasElement.querySelector("svg");
    await expect(spinner).toHaveClass("w-16", "h-16");
    await expect(canvas.getByText("Extra large loader")).toBeInTheDocument();
  },
});

export const FullScreen: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    fullScreen: true,
    text: "Loading application...",
  },
  parameters: {
    layout: "fullscreen",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByText("Loading application...").parentElement?.parentElement;
    await expect(container).toHaveClass("min-h-screen");
  },
});

export const Overlay: Story = enhanceStoryForDualMode<typeof Loading>(
  {
    render: () => (
      <div className="relative w-96 h-64 bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Background Content</h2>
        <p className="text-gray-600">This content is behind the loading overlay.</p>
        <Loading overlay text="Processing..." />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await expect(canvas.getByText("Processing...")).toBeInTheDocument();
      const overlay = canvas.getByText("Processing...").parentElement?.parentElement;
      await expect(overlay).toHaveClass("absolute", "inset-0", "backdrop-blur-sm");
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "relative w-96 h-64 bg-gray-100 rounded-lg p-4",
      children: [
        {
          type: "Heading",
          level: 2,
          className: "text-xl font-bold mb-2",
          children: "Background Content",
        },
        {
          type: "Text",
          className: "text-gray-600",
          children: "This content is behind the loading overlay.",
        },
        {
          type: "Loading",
          overlay: true,
          text: "Processing...",
        },
      ],
    },
  }
);

export const AllVariantsSizes: Story = enhanceStoryForDualMode<typeof Loading>(
  {
    render: () => (
      <div className="space-y-8">
        {["spinner", "dots", "pulse", "bars"].map((variant) => (
          <div key={variant} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{variant}</h3>
            <div className="flex items-center justify-around space-x-4 p-4 bg-gray-50 rounded">
              {["sm", "md", "lg", "xl"].map((size) => (
                <div key={size} className="flex flex-col items-center space-y-2">
                  <Loading
                    variant={variant as "spinner" | "dots" | "pulse" | "bars"}
                    size={size as "sm" | "md" | "lg" | "xl"}
                  />
                  <span className="text-xs text-gray-500">{size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      // Check that all variants are rendered
      await expect(canvas.getByText("spinner")).toBeInTheDocument();
      await expect(canvas.getByText("dots")).toBeInTheDocument();
      await expect(canvas.getByText("pulse")).toBeInTheDocument();
      await expect(canvas.getByText("bars")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-lg font-semibold capitalize",
              children: "spinner",
            },
            {
              type: "Flex",
              align: "center",
              justify: "around",
              gap: "md",
              className: "p-4 bg-gray-50 rounded",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "spinner", size: "sm" },
                    { type: "Text", className: "text-xs text-gray-500", children: "sm" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "spinner", size: "md" },
                    { type: "Text", className: "text-xs text-gray-500", children: "md" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "spinner", size: "lg" },
                    { type: "Text", className: "text-xs text-gray-500", children: "lg" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "spinner", size: "xl" },
                    { type: "Text", className: "text-xs text-gray-500", children: "xl" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-lg font-semibold capitalize",
              children: "dots",
            },
            {
              type: "Flex",
              align: "center",
              justify: "around",
              gap: "md",
              className: "p-4 bg-gray-50 rounded",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "dots", size: "sm" },
                    { type: "Text", className: "text-xs text-gray-500", children: "sm" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "dots", size: "md" },
                    { type: "Text", className: "text-xs text-gray-500", children: "md" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "dots", size: "lg" },
                    { type: "Text", className: "text-xs text-gray-500", children: "lg" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "dots", size: "xl" },
                    { type: "Text", className: "text-xs text-gray-500", children: "xl" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-lg font-semibold capitalize",
              children: "pulse",
            },
            {
              type: "Flex",
              align: "center",
              justify: "around",
              gap: "md",
              className: "p-4 bg-gray-50 rounded",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "pulse", size: "sm" },
                    { type: "Text", className: "text-xs text-gray-500", children: "sm" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "pulse", size: "md" },
                    { type: "Text", className: "text-xs text-gray-500", children: "md" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "pulse", size: "lg" },
                    { type: "Text", className: "text-xs text-gray-500", children: "lg" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "pulse", size: "xl" },
                    { type: "Text", className: "text-xs text-gray-500", children: "xl" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Flex",
          direction: "column",
          gap: "md",
          children: [
            {
              type: "Heading",
              level: 3,
              className: "text-lg font-semibold capitalize",
              children: "bars",
            },
            {
              type: "Flex",
              align: "center",
              justify: "around",
              gap: "md",
              className: "p-4 bg-gray-50 rounded",
              children: [
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "bars", size: "sm" },
                    { type: "Text", className: "text-xs text-gray-500", children: "sm" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "bars", size: "md" },
                    { type: "Text", className: "text-xs text-gray-500", children: "md" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "bars", size: "lg" },
                    { type: "Text", className: "text-xs text-gray-500", children: "lg" },
                  ],
                },
                {
                  type: "Flex",
                  direction: "column",
                  align: "center",
                  gap: "sm",
                  children: [
                    { type: "Loading", variant: "bars", size: "xl" },
                    { type: "Text", className: "text-xs text-gray-500", children: "xl" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const CustomStyling: Story = enhanceStoryForDualMode<typeof Loading>({
  args: {
    className: "bg-gray-100 p-8 rounded-lg shadow-lg",
    text: "Custom styled loader",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByText("Custom styled loader").parentElement?.parentElement;
    await expect(container).toHaveClass("bg-gray-100", "rounded-lg", "shadow-lg");
  },
});

export const MultipleLoaders: Story = enhanceStoryForDualMode<typeof Loading>(
  {
    render: () => (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <Loading variant="spinner" text="Loading users..." />
        </div>
        <div className="p-4 border rounded">
          <Loading variant="dots" text="Loading posts..." />
        </div>
        <div className="p-4 border rounded">
          <Loading variant="pulse" text="Loading comments..." />
        </div>
        <div className="p-4 border rounded">
          <Loading variant="bars" text="Loading analytics..." />
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await expect(canvas.getByText("Loading users...")).toBeInTheDocument();
      await expect(canvas.getByText("Loading posts...")).toBeInTheDocument();
      await expect(canvas.getByText("Loading comments...")).toBeInTheDocument();
      await expect(canvas.getByText("Loading analytics...")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Grid",
      columns: 2,
      gap: "md",
      children: [
        {
          type: "Box",
          className: "p-4 border rounded",
          children: {
            type: "Loading",
            variant: "spinner",
            text: "Loading users...",
          },
        },
        {
          type: "Box",
          className: "p-4 border rounded",
          children: {
            type: "Loading",
            variant: "dots",
            text: "Loading posts...",
          },
        },
        {
          type: "Box",
          className: "p-4 border rounded",
          children: {
            type: "Loading",
            variant: "pulse",
            text: "Loading comments...",
          },
        },
        {
          type: "Box",
          className: "p-4 border rounded",
          children: {
            type: "Loading",
            variant: "bars",
            text: "Loading analytics...",
          },
        },
      ],
    },
  }
);
