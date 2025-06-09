import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Separator } from "./separator";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: { type: "boolean" },
      description: "Whether the separator is decorative or semantic",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = enhanceStoryForDualMode<typeof Separator>(
  {
    args: {
      orientation: "horizontal",
      decorative: true,
    },
    render: (args) => (
      <div className="w-[300px]">
        <div className="text-lg font-medium">Content Above</div>
        <Separator {...args} className="my-4" />
        <div className="text-lg font-medium">Content Below</div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the separator is rendered (decorative separators have role="none")
      const separator = canvas.getByRole("none");
      expect(separator).toBeInTheDocument();

      // Check that it has data-slot attribute
      expect(separator).toHaveAttribute("data-slot", "separator-root");

      // Check that it has horizontal orientation
      expect(separator).toHaveAttribute("data-orientation", "horizontal");

      // Check that surrounding content is rendered
      expect(canvas.getByText("Content Above")).toBeInTheDocument();
      expect(canvas.getByText("Content Below")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[300px]",
      children: [
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Content Above",
        },
        {
          type: "Separator",
          orientation: "horizontal",
          decorative: true,
          className: "my-4",
        },
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Content Below",
        },
      ],
    },
  }
);

export const Vertical: Story = enhanceStoryForDualMode<typeof Separator>(
  {
    args: {
      orientation: "vertical",
      decorative: true,
    },
    render: (args) => (
      <div className="flex h-32 items-center">
        <div className="text-lg font-medium">Left</div>
        <Separator {...args} className="mx-4 h-full" />
        <div className="text-lg font-medium">Right</div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the separator is rendered (decorative separators have role="none")
      const separator = canvas.getByRole("none");
      expect(separator).toBeInTheDocument();

      // Check that it has data-slot attribute
      expect(separator).toHaveAttribute("data-slot", "separator-root");

      // Check that it has vertical orientation
      expect(separator).toHaveAttribute("data-orientation", "vertical");

      // Check that surrounding content is rendered
      expect(canvas.getByText("Left")).toBeInTheDocument();
      expect(canvas.getByText("Right")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      className: "h-32 items-center",
      children: [
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Left",
        },
        {
          type: "Separator",
          orientation: "vertical",
          decorative: true,
          className: "mx-4 h-full",
        },
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Right",
        },
      ],
    },
  }
);

export const CustomStyle: Story = enhanceStoryForDualMode<typeof Separator>(
  {
    args: {
      orientation: "horizontal",
      decorative: true,
    },
    render: (args) => (
      <div className="w-[300px]">
        <div className="text-lg font-medium">Gradient Separator</div>
        <Separator
          {...args}
          className="my-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />
        <div className="text-lg font-medium">Content Below</div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the separator is rendered
      const separator = canvas.getByRole("none");
      expect(separator).toBeInTheDocument();

      // Check that it has the gradient styling classes
      expect(separator).toHaveClass("bg-gradient-to-r", "from-indigo-500", "via-purple-500", "to-pink-500");

      // Check surrounding content
      expect(canvas.getByText("Gradient Separator")).toBeInTheDocument();
      expect(canvas.getByText("Content Below")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[300px]",
      children: [
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Gradient Separator",
        },
        {
          type: "Separator",
          orientation: "horizontal",
          decorative: true,
          className: "my-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        },
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Content Below",
        },
      ],
    },
  }
);

export const Dotted: Story = enhanceStoryForDualMode<typeof Separator>(
  {
    args: {
      orientation: "horizontal",
      decorative: true,
    },
    render: (args) => (
      <div className="w-[300px]">
        <div className="text-lg font-medium">Dotted Separator</div>
        <Separator
          {...args}
          className="my-4 border-t-2 border-dotted border-gray-300 bg-transparent"
        />
        <div className="text-lg font-medium">Content Below</div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the separator is rendered
      const separator = canvas.getByRole("none");
      expect(separator).toBeInTheDocument();

      // Check that it has the dotted border styling
      expect(separator).toHaveClass("border-dotted", "border-gray-300");

      // Check surrounding content
      expect(canvas.getByText("Dotted Separator")).toBeInTheDocument();
      expect(canvas.getByText("Content Below")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[300px]",
      children: [
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Dotted Separator",
        },
        {
          type: "Separator",
          orientation: "horizontal",
          decorative: true,
          className: "my-4 border-t-2 border-dotted border-gray-300 bg-transparent",
        },
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Content Below",
        },
      ],
    },
  }
);

export const WithLabel: Story = enhanceStoryForDualMode<typeof Separator>(
  {
    args: {
      orientation: "horizontal",
      decorative: true,
    },
    render: (args) => (
      <div className="w-[400px]">
        <div className="flex items-center gap-2">
          <Separator {...args} className="flex-1" />
          <span className="text-sm font-medium text-gray-500">OR</span>
          <Separator {...args} className="flex-1" />
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that both separators are rendered
      const separators = canvas.getAllByRole("none");
      expect(separators).toHaveLength(2);

      // Check that the OR label is rendered
      expect(canvas.getByText("OR")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[400px]",
      children: {
        type: "Flex",
        align: "center",
        gap: "sm",
        children: [
          {
            type: "Separator",
            orientation: "horizontal",
            decorative: true,
            className: "flex-1",
          },
          {
            type: "Text",
            element: "span",
            className: "text-sm font-medium text-gray-500",
            children: "OR",
          },
          {
            type: "Separator",
            orientation: "horizontal",
            decorative: true,
            className: "flex-1",
          },
        ],
      },
    },
  }
);

export const NonDecorative: Story = enhanceStoryForDualMode<typeof Separator>(
  {
    args: {
      orientation: "horizontal",
      decorative: false,
    },
    render: (args) => (
      <div className="w-[300px]">
        <div className="text-lg font-medium">Section 1</div>
        <Separator {...args} className="my-4" />
        <div className="text-lg font-medium">Section 2</div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Check that the separator is rendered with role="separator" for non-decorative
      const separator = canvas.getByRole("separator");
      expect(separator).toBeInTheDocument();

      // Check that it has data-slot attribute
      expect(separator).toHaveAttribute("data-slot", "separator-root");

      // Check that it has horizontal orientation via data attribute
      expect(separator).toHaveAttribute("data-orientation", "horizontal");

      // Check that surrounding content is rendered
      expect(canvas.getByText("Section 1")).toBeInTheDocument();
      expect(canvas.getByText("Section 2")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[300px]",
      children: [
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Section 1",
        },
        {
          type: "Separator",
          orientation: "horizontal",
          decorative: false,
          className: "my-4",
        },
        {
          type: "Text",
          className: "text-lg font-medium",
          children: "Section 2",
        },
      ],
    },
  }
);
