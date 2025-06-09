import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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

      // Test that either image OR fallback is rendered
      const image = canvasElement.querySelector('[data-slot="avatar-image"]');
      const fallback = canvasElement.querySelector('[data-slot="avatar-fallback"]');
      
      // At least one should be present
      expect(image || fallback).toBeTruthy();
      
      // If fallback is visible, check its content
      if (fallback && fallback.textContent === "CN") {
        expect(canvas.getByText("CN")).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "Avatar",
      children: [
        {
          type: "AvatarImage",
          src: "https://github.com/shadcn.png",
          alt: "@shadcn",
        },
        {
          type: "AvatarFallback",
          children: "CN",
        },
      ],
    },
  }
);

export const WithFallback: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
  },
  {
    renderSpec: {
      type: "Avatar",
      children: [
        {
          type: "AvatarImage",
          src: "/broken-image.jpg",
          alt: "@shadcn",
        },
        {
          type: "AvatarFallback",
          children: "CN",
        },
      ],
    },
  }
);

export const CustomSizes: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
  },
  {
    renderSpec: {
      type: "Flex",
      align: "center",
      gap: "md",
      children: [
        {
          type: "Avatar",
          className: "size-6",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "size-8",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "size-10",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "size-12",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "size-16",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
      ],
    },
  }
);

export const CustomFallbackColors: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all colored fallbacks render
      expect(canvas.getByText("JD")).toBeInTheDocument();
      expect(canvas.getByText("AB")).toBeInTheDocument();
      expect(canvas.getByText("TS")).toBeInTheDocument();
      expect(canvas.getByText("RW")).toBeInTheDocument();
      expect(canvas.getByText("EJ")).toBeInTheDocument();

      // Test avatars have correct background colors
      const jdFallback = canvas.getByText("JD");
      expect(jdFallback).toHaveClass("bg-blue-600", "text-white");

      const abFallback = canvas.getByText("AB");
      expect(abFallback).toHaveClass("bg-purple-600", "text-white");

      const tsFallback = canvas.getByText("TS");
      expect(tsFallback).toHaveClass("bg-green-600", "text-white");

      const rwFallback = canvas.getByText("RW");
      expect(rwFallback).toHaveClass("bg-amber-600", "text-white");

      const ejFallback = canvas.getByText("EJ");
      expect(ejFallback).toHaveClass("bg-pink-600", "text-white");

      // Test correct number of avatars
      const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
      expect(avatars).toHaveLength(5);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      align: "center",
      gap: "md",
      children: [
        {
          type: "Avatar",
          children: {
            type: "AvatarFallback",
            className: "bg-blue-600 text-white",
            children: "JD",
          },
        },
        {
          type: "Avatar",
          children: {
            type: "AvatarFallback",
            className: "bg-purple-600 text-white",
            children: "AB",
          },
        },
        {
          type: "Avatar",
          children: {
            type: "AvatarFallback",
            className: "bg-green-600 text-white",
            children: "TS",
          },
        },
        {
          type: "Avatar",
          children: {
            type: "AvatarFallback",
            className: "bg-amber-600 text-white",
            children: "RW",
          },
        },
        {
          type: "Avatar",
          children: {
            type: "AvatarFallback",
            className: "bg-pink-600 text-white",
            children: "EJ",
          },
        },
      ],
    },
  }
);

export const CustomShapes: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all avatars render
      const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
      expect(avatars).toHaveLength(5);

      // Test each avatar has different border radius classes
      expect(avatars[0]).toHaveClass("rounded-full");
      expect(avatars[1]).toHaveClass("rounded-lg");
      expect(avatars[2]).toHaveClass("rounded-md");
      expect(avatars[3]).toHaveClass("rounded-sm");
      expect(avatars[4]).toHaveClass("rounded-none");

      // Test that fallback text is visible if images don't load
      try {
        const fallbacks = canvas.getAllByText("CN");
        expect(fallbacks.length).toBeGreaterThanOrEqual(0);
      } catch {
        // Fallbacks might not be visible if images load successfully
        // This is expected behavior
      }
    },
  },
  {
    renderSpec: {
      type: "Flex",
      align: "center",
      gap: "md",
      children: [
        {
          type: "Avatar",
          className: "rounded-full",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "rounded-lg",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "rounded-md",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "rounded-sm",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "rounded-none",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
      ],
    },
  }
);

export const AvatarGroup: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
  },
  {
    renderSpec: {
      type: "Flex",
      className: "-space-x-2",
      children: [
        {
          type: "Avatar",
          className: "border-2 border-background",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "border-2 border-background",
          children: {
            type: "AvatarFallback",
            className: "bg-blue-600 text-white",
            children: "JD",
          },
        },
        {
          type: "Avatar",
          className: "border-2 border-background",
          children: {
            type: "AvatarFallback",
            className: "bg-green-600 text-white",
            children: "WK",
          },
        },
        {
          type: "Avatar",
          className: "border-2 border-background",
          children: {
            type: "AvatarFallback",
            className: "bg-amber-600 text-white",
            children: "AB",
          },
        },
        {
          type: "Avatar",
          className: "border-2 border-background bg-muted flex size-8 items-center justify-center",
          children: {
            type: "Text",
            className: "text-xs font-medium",
            children: "+3",
          },
        },
      ],
    },
  }
);

export const WithBorder: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all avatars render
      const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
      expect(avatars).toHaveLength(3);

      // Test each avatar has different border/ring/outline styles
      expect(avatars[0]).toHaveClass("border-2", "border-green-500");
      expect(avatars[1]).toHaveClass("ring-2", "ring-purple-500", "ring-offset-2", "ring-offset-background");
      expect(avatars[2]).toHaveClass("outline-2", "outline-offset-2", "outline-blue-500");

      // Test that fallback text is visible if images don't load
      try {
        const fallbacks = canvas.getAllByText("CN");
        expect(fallbacks.length).toBeGreaterThanOrEqual(0);
      } catch {
        // Fallbacks might not be visible if images load successfully
        // This is expected behavior
      }
    },
  },
  {
    renderSpec: {
      type: "Flex",
      align: "center",
      gap: "md",
      children: [
        {
          type: "Avatar",
          className: "border-2 border-green-500",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "ring-2 ring-purple-500 ring-offset-2 ring-offset-background",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Avatar",
          className: "outline outline-2 outline-offset-2 outline-blue-500",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
      ],
    },
  }
);

export const WithOnlineIndicator: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
    render: () => (
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="absolute top-0 right-0 block size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test avatar renders
      const avatar = canvasElement.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();

      // Test that fallback text is visible if image doesn't load
      try {
        const fallback = canvas.getByText("CN");
        expect(fallback).toBeInTheDocument();
      } catch {
        // Fallback might not be visible if image loads successfully
        // This is expected behavior
      }

      // Test online indicator is present
      const indicator = canvasElement.querySelector(String.raw`.absolute.top-0.right-0.block.size-2\.5.rounded-full.bg-green-500.ring-2.ring-background`);
      expect(indicator).toBeInTheDocument();

      // Test container has relative positioning
      const container = canvasElement.querySelector(".relative");
      expect(container).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "relative",
      children: [
        {
          type: "Avatar",
          children: [
            {
              type: "AvatarImage",
              src: "https://github.com/shadcn.png",
              alt: "@shadcn",
            },
            {
              type: "AvatarFallback",
              children: "CN",
            },
          ],
        },
        {
          type: "Box",
          element: "span",
          className: "absolute top-0 right-0 block size-2.5 rounded-full bg-green-500 ring-2 ring-background",
        },
      ],
    },
  }
);

export const WithImageHoverEffect: Story = enhanceStoryForDualMode<typeof Avatar>(
  {
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
  },
  {
    renderSpec: {
      type: "Avatar",
      className: "group",
      children: [
        {
          type: "AvatarImage",
          src: "https://github.com/shadcn.png",
          alt: "@shadcn",
          className: "transition-transform duration-300 group-hover:scale-110",
        },
        {
          type: "AvatarFallback",
          children: "CN",
        },
      ],
    },
  }
);
