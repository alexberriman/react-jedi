import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test aspect ratio container
    const container = canvas.getByRole("img").parentElement;
    expect(container).toBeInTheDocument();

    // Test image presence and attributes
    const image = canvas.getByRole("img", { name: "A futuristic cityscape with neon lights" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("object-cover", "w-full", "h-full", "rounded-md");

    // Verify aspect ratio is applied
    const aspectRatioWrapper = container;
    expect(aspectRatioWrapper).toHaveAttribute("data-slot", "aspect-ratio");
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test square aspect ratio
    const image = canvas.getByRole("img", { name: "Abstract geometric art with vibrant colors" });
    expect(image).toBeInTheDocument();

    // Verify aspect ratio container exists
    const aspectRatioWrapper = image.parentElement;
    expect(aspectRatioWrapper).toHaveAttribute("data-slot", "aspect-ratio");
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test portrait aspect ratio
    const image = canvas.getByRole("img", { name: "A portrait photograph" });
    expect(image).toBeInTheDocument();

    // Verify aspect ratio container exists
    const aspectRatioWrapper = image.parentElement;
    expect(aspectRatioWrapper).toHaveAttribute("data-slot", "aspect-ratio");
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test content rendering
    const heading = canvas.getByText("Stunning UI Components");
    const description = canvas.getByText(
      "Create beautiful, responsive interfaces with precise aspect ratios"
    );

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-2xl", "font-bold");

    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-center");

    // Test gradient background
    const aspectRatioElement = heading.closest('[class*="bg-gradient"]');
    expect(aspectRatioElement).toHaveClass(
      "bg-gradient-to-r",
      "from-purple-500",
      "to-indigo-600",
      "rounded-xl"
    );
  },
};

export const WithImage: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[600px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
          alt="Modern workspace with laptop and coffee"
          className="object-cover w-full h-full rounded-lg"
        />
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test image presence
    const image = canvas.getByRole("img", { name: "Modern workspace with laptop and coffee" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("images.unsplash.com"));
    expect(image).toHaveClass("object-cover", "w-full", "h-full", "rounded-lg");

    // Verify aspect ratio container
    const aspectRatioWrapper = image.parentElement;
    expect(aspectRatioWrapper).toHaveAttribute("data-slot", "aspect-ratio");
  },
};

export const WithVideo: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[600px]">
      <AspectRatio {...args}>
        <video
          className="object-cover w-full h-full rounded-lg"
          poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80"
          controls
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    within(canvasElement);

    // Test video element presence
    const video = canvasElement.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("poster", expect.stringContaining("images.unsplash.com"));
    expect(video).toHaveClass("object-cover", "w-full", "h-full", "rounded-lg");

    // Test video source
    const source = video?.querySelector("source");
    expect(source).toBeInTheDocument();
    expect(source).toHaveAttribute("src", "https://www.w3schools.com/html/mov_bbb.mp4");
    expect(source).toHaveAttribute("type", "video/mp4");

    // Verify aspect ratio container
    const aspectRatioWrapper = video?.parentElement;
    expect(aspectRatioWrapper).toHaveAttribute("data-slot", "aspect-ratio");
  },
};
