import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The ratio of the width to height (e.g. 16/9, 1, 4/3)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[500px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&auto=format&fit=crop&q=80"
          alt="A futuristic cityscape with neon lights"
          className="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="w-[400px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
          alt="Abstract geometric art with vibrant colors"
          className="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&auto=format&fit=crop&q=80"
          alt="A portrait photograph"
          className="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const WithContent: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[500px]">
      <AspectRatio {...args} className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
        <div className="flex flex-col items-center justify-center h-full text-white p-6">
          <h3 className="text-2xl font-bold mb-2">Stunning UI Components</h3>
          <p className="text-center">
            Create beautiful, responsive interfaces with precise aspect ratios
          </p>
        </div>
      </AspectRatio>
    </div>
  ),
};
