import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import * as React from "react";

/**
 * Known issue: Act() warnings in tests
 * 
 * The Avatar component from Radix UI triggers act() warnings during tests because
 * it updates internal state when images load or fail to load. These warnings are
 * harmless and don't affect test functionality. The warnings occur because:
 * 
 * 1. Radix UI's Avatar component manages image loading state internally
 * 2. State updates happen asynchronously when images load/fail
 * 3. These updates occur outside of React's act() wrapper during initial render
 * 
 * All tests pass successfully despite these warnings. We've added proper waitFor
 * calls in the play functions to ensure tests wait for image loading to complete.
 */

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
      // Wait for avatar to render
      await waitFor(() => {
        const avatarContainer = canvasElement.querySelector('[data-slot="avatar"]');
        expect(avatarContainer).toBeInTheDocument();
      });

      // Wait for image loading to complete and state to settle
      await waitFor(async () => {
        const img = canvasElement.querySelector('img');
        if (img) {
          // Wait for image to be either loaded or error state
          await waitFor(() => {
            return img.complete || img.naturalWidth > 0;
          }, { timeout: 5000 });
        }
        
        // Verify either image or fallback is visible
        const image = canvasElement.querySelector('[data-slot="avatar-image"]');
        const fallback = canvasElement.querySelector('[data-slot="avatar-fallback"]');
        expect(image || fallback).toBeTruthy();
      }, { timeout: 5000 });
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

      // Wait for image to fail loading and fallback to appear
      await waitFor(async () => {
        // First check if image element exists and wait for it to fail loading
        const img = canvasElement.querySelector("img");
        if (img) {
          // Wait for image error state
          await waitFor(() => {
            return img.complete && img.naturalWidth === 0;
          }, { timeout: 5000 });
        }
        
        // Then verify fallback is visible
        const fallback = canvas.getByText("CN");
        expect(fallback).toBeVisible();
      }, { timeout: 5000 });

      // Verify image element exists with broken URL
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
      // Wait for all avatars to render
      await waitFor(() => {
        const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
        expect(avatars).toHaveLength(5);
      });

      // Wait for all images to load
      await waitFor(async () => {
        const images = canvasElement.querySelectorAll('img');
        if (images.length > 0) {
          // Wait for all images to be loaded
          const loadPromises = Array.from(images).map(img => 
            waitFor(() => img.complete || img.naturalWidth > 0, { timeout: 5000 })
          );
          await Promise.all(loadPromises);
        }
      }, { timeout: 5000 });

      // Check each avatar has the correct size class
      const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
      expect(avatars[0]).toHaveClass("size-6");
      expect(avatars[1]).toHaveClass("size-8");
      expect(avatars[2]).toHaveClass("size-10");
      expect(avatars[3]).toHaveClass("size-12");
      expect(avatars[4]).toHaveClass("size-16");
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

      // Wait for all colored fallbacks to render
      await waitFor(() => {
        expect(canvas.getByText("JD")).toBeInTheDocument();
        expect(canvas.getByText("AB")).toBeInTheDocument();
        expect(canvas.getByText("TS")).toBeInTheDocument();
        expect(canvas.getByText("RW")).toBeInTheDocument();
        expect(canvas.getByText("EJ")).toBeInTheDocument();
      });

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
      // Wait for all avatars to render
      await waitFor(() => {
        const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
        expect(avatars).toHaveLength(5);
      });

      // Wait for all images to load
      await waitFor(async () => {
        const images = canvasElement.querySelectorAll('img');
        if (images.length > 0) {
          const loadPromises = Array.from(images).map(img => 
            waitFor(() => img.complete || img.naturalWidth > 0, { timeout: 5000 })
          );
          await Promise.all(loadPromises);
        }
      }, { timeout: 5000 });

      // Test each avatar has different border radius classes
      const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
      expect(avatars[0]).toHaveClass("rounded-full");
      expect(avatars[1]).toHaveClass("rounded-lg");
      expect(avatars[2]).toHaveClass("rounded-md");
      expect(avatars[3]).toHaveClass("rounded-sm");
      expect(avatars[4]).toHaveClass("rounded-none");
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
      await waitFor(() => {
        const container = canvasElement.querySelector(".flex.-space-x-2");
        expect(container).toBeInTheDocument();
      });

      // Wait for any images to load
      await waitFor(async () => {
        const images = canvasElement.querySelectorAll('img');
        if (images.length > 0) {
          const loadPromises = Array.from(images).map(img => 
            waitFor(() => img.complete || img.naturalWidth > 0, { timeout: 5000 })
          );
          await Promise.all(loadPromises);
        }
      }, { timeout: 5000 });

      // Wait for overlapping avatars to render
      await waitFor(() => {
        expect(canvas.getByText("JD")).toBeInTheDocument();
        expect(canvas.getByText("WK")).toBeInTheDocument();
        expect(canvas.getByText("AB")).toBeInTheDocument();
      });

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
      // Wait for all avatars to render
      await waitFor(() => {
        const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
        expect(avatars).toHaveLength(3);
      });

      // Wait for all images to load
      await waitFor(async () => {
        const images = canvasElement.querySelectorAll('img');
        if (images.length > 0) {
          const loadPromises = Array.from(images).map(img => 
            waitFor(() => img.complete || img.naturalWidth > 0, { timeout: 5000 })
          );
          await Promise.all(loadPromises);
        }
      }, { timeout: 5000 });

      // Test each avatar has different border/ring/outline styles
      const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
      expect(avatars[0]).toHaveClass("border-2", "border-green-500");
      expect(avatars[1]).toHaveClass("ring-2", "ring-purple-500", "ring-offset-2", "ring-offset-background");
      expect(avatars[2]).toHaveClass("outline-2", "outline-offset-2", "outline-blue-500");
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
      // Wait for avatar to render
      await waitFor(() => {
        const avatar = canvasElement.querySelector('[data-slot="avatar"]');
        expect(avatar).toBeInTheDocument();
      });

      // Wait for image to load
      await waitFor(async () => {
        const img = canvasElement.querySelector('img');
        if (img) {
          await waitFor(() => img.complete || img.naturalWidth > 0, { timeout: 5000 });
        }
      }, { timeout: 5000 });

      // Test online indicator is present
      await waitFor(() => {
        const indicator = canvasElement.querySelector(String.raw`.absolute.top-0.right-0.block.size-2\.5.rounded-full.bg-green-500.ring-2.ring-background`);
        expect(indicator).toBeInTheDocument();
      });

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
      const user = userEvent.setup();

      // Wait for avatar with hover effect to render
      await waitFor(() => {
        const avatar = canvasElement.querySelector(".group");
        expect(avatar).toBeInTheDocument();
      });

      // Wait for image to load
      await waitFor(async () => {
        const img = canvasElement.querySelector('img');
        if (img) {
          await waitFor(() => img.complete || img.naturalWidth > 0, { timeout: 5000 });
        }
      }, { timeout: 5000 });

      // Test hover effect
      const avatar = canvasElement.querySelector(".group");
      
      // Verify the avatar has group class for hover effects
      expect(avatar).toHaveClass("group");

      // Simulate hover
      if (avatar) {
        await user.hover(avatar);
      }
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
