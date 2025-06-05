import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test avatar renders
    const avatarContainer = canvasElement.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toBeInTheDocument();

    // Check fallback text exists
    const fallback = canvas.getByText("CN");
    expect(fallback).toBeInTheDocument();
  },
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for fallback to appear (image should fail to load)
    await waitFor(() => {
      const fallback = canvas.getByText("CN");
      expect(fallback).toBeVisible();
    });

    // Verify image element exists (may be hidden if failed to load)
    const img = canvasElement.querySelector("img");
    if (img) {
      expect(img).toBeInTheDocument();
      expect(img.getAttribute("src")).toBe("/broken-image.jpg");
    }
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    within(canvasElement);

    // Test multiple avatar sizes are rendered
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    expect(avatars).toHaveLength(5);

    // Check each avatar has the correct size class
    const container = canvasElement.querySelector(".flex");
    const avatarElements = container?.querySelectorAll('[data-slot="avatar"]');

    // Verify avatars exist and have proper parent wrappers with size classes
    expect(avatarElements).toHaveLength(5);

    // Check the wrapper divs that have the size classes
    const sizeWrappers = container?.children;
    expect(sizeWrappers?.[0]).toHaveClass("size-6");
    expect(sizeWrappers?.[1]).toHaveClass("size-8");
    expect(sizeWrappers?.[2]).toHaveClass("size-10");
    expect(sizeWrappers?.[3]).toHaveClass("size-12");
    expect(sizeWrappers?.[4]).toHaveClass("size-16");
  },
};

export const CustomFallbackColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-purple-600 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-600 text-white">TS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-amber-600 text-white">RW</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-pink-600 text-white">EJ</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const CustomShapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="rounded-full">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-none">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-green-600 text-white">WK</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-amber-600 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background bg-muted flex size-8 items-center justify-center">
        <span className="text-xs font-medium">+3</span>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test avatar group layout
    const container = canvasElement.querySelector(".flex.-space-x-2");
    expect(container).toBeInTheDocument();

    // Check overlapping avatars
    expect(canvas.getByText("JD")).toBeInTheDocument();
    expect(canvas.getByText("WK")).toBeInTheDocument();
    expect(canvas.getByText("AB")).toBeInTheDocument();

    // Check count indicator
    const countIndicator = canvas.getByText("+3");
    expect(countIndicator).toBeInTheDocument();
    expect(countIndicator).toHaveClass("text-xs", "font-medium");

    // Verify borders
    const avatarsWithBorders = canvasElement.querySelectorAll(".border-2.border-background");
    expect(avatarsWithBorders.length).toBeGreaterThanOrEqual(4);
  },
};

export const WithBorder: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="border-2 border-green-500">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-purple-500 ring-offset-2 ring-offset-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="outline outline-2 outline-offset-2 outline-blue-500">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithOnlineIndicator: Story = {
  render: () => (
    <div className="relative">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="absolute top-0 right-0 block size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
    </div>
  ),
};

export const WithImageHoverEffect: Story = {
  render: () => (
    <Avatar className="group">
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    within(canvasElement);
    const user = userEvent.setup();

    // Test hover effect
    const avatar = canvasElement.querySelector(".group");
    expect(avatar).toBeInTheDocument();

    // Verify the avatar has group class for hover effects
    expect(avatar).toHaveClass("group");

    // Simulate hover
    await user.hover(avatar!);
    // Note: CSS hover effects can't be fully tested in jsdom
  },
};
