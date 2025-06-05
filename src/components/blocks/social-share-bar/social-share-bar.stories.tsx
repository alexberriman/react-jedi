import type { Meta, StoryObj } from "@storybook/react";
import { SocialShareBar } from "./social-share-bar";
import { expect } from "storybook/test";

const meta = {
  title: "Blocks/SocialShareBar",
  component: SocialShareBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["horizontal", "vertical", "floating", "modal", "minimal"],
      description: "The layout variant of the share bar",
    },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "center-left",
        "center-right",
      ],
      description: "Position when using floating variant",
    },
    platforms: {
      control: "check",
      options: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
      description: "Social platforms to include",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the share buttons",
    },
    colorScheme: {
      control: "select",
      options: ["default", "brand", "monochrome", "gradient"],
      description: "Color scheme for the buttons",
    },
    showLabels: {
      control: "boolean",
      description: "Whether to show labels with icons",
    },
    showCounts: {
      control: "boolean",
      description: "Whether to show share counts",
    },
    animated: {
      control: "boolean",
      description: "Whether to animate the component",
    },
    sticky: {
      control: "boolean",
      description: "Whether the component should be sticky",
    },
  },
} satisfies Meta<typeof SocialShareBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/article",
    title: "Check out this amazing article!",
    description: "An insightful article about modern web development",
  },
};

export const HorizontalBar: Story = {
  args: {
    variant: "horizontal",
    url: "https://example.com/blog-post",
    title: "Amazing Blog Post",
    showLabels: true,
    size: "md",
  },
};

export const VerticalSidebar: Story = {
  args: {
    variant: "vertical",
    url: "https://example.com/article",
    title: "Interesting Article",
    showLabels: false,
    sticky: true,
    className: "ml-auto",
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[600px]">
        <div className="flex-1 max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4">Article Title</h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600 mb-8">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="w-16">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const FloatingButton: Story = {
  args: {
    variant: "floating",
    position: "bottom-right",
    url: "https://example.com/page",
    title: "Share this page",
    animated: true,
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Page Content</h2>
          <p className="text-gray-600">
            This demonstrates the floating share button that expands on click.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const ModalTrigger: Story = {
  args: {
    variant: "modal",
    url: "https://example.com/content",
    title: "Great Content to Share",
    description: "This is an amazing piece of content worth sharing",
    platforms: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
  },
};

export const MinimalIcons: Story = {
  args: {
    variant: "minimal",
    url: "https://example.com/minimal",
    title: "Minimal Share Example",
    size: "sm",
    showLabels: false,
  },
};

export const WithShareCounts: Story = {
  args: {
    variant: "horizontal",
    url: "https://example.com/popular",
    title: "Popular Article",
    showCounts: true,
    counts: {
      twitter: 234,
      facebook: 1523,
      linkedin: 89,
      reddit: 456,
    },
  },
};

export const BrandColors: Story = {
  args: {
    variant: "horizontal",
    colorScheme: "brand",
    url: "https://example.com/brand",
    title: "Brand Colored Share Buttons",
    showLabels: true,
  },
};

export const MonochromeStyle: Story = {
  args: {
    variant: "horizontal",
    colorScheme: "monochrome",
    url: "https://example.com/mono",
    title: "Monochrome Share Buttons",
    showLabels: false,
  },
};

export const GradientStyle: Story = {
  args: {
    variant: "horizontal",
    colorScheme: "gradient",
    url: "https://example.com/gradient",
    title: "Gradient Share Buttons",
    showLabels: true,
    size: "lg",
  },
};

export const LargeButtons: Story = {
  args: {
    variant: "horizontal",
    size: "lg",
    url: "https://example.com/large",
    title: "Large Share Buttons",
    showLabels: true,
  },
};

export const SmallButtons: Story = {
  args: {
    variant: "horizontal",
    size: "sm",
    url: "https://example.com/small",
    title: "Small Share Buttons",
    showLabels: false,
  },
};

export const SelectedPlatforms: Story = {
  args: {
    variant: "horizontal",
    platforms: ["twitter", "facebook", "copy"],
    url: "https://example.com/selected",
    title: "Selected Platforms Only",
    showLabels: true,
  },
};

export const FloatingCenterLeft: Story = {
  args: {
    variant: "floating",
    position: "center-left",
    url: "https://example.com/left",
    title: "Left Side Floating Button",
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Content Area</h2>
          <p className="text-gray-600">
            Floating button positioned on the left side of the content.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const WithCallback: Story = {
  args: {
    variant: "horizontal",
    url: "https://example.com/callback",
    title: "Share with Callback",
    onShare: (platform) => {
      console.log(`Shared on ${platform}`);
    },
  },
  play: async ({ args, canvasElement, step }) => {
    const buttons = canvasElement.querySelectorAll("button");

    await step("Check that share buttons are rendered", async () => {
      await expect(buttons.length).toBeGreaterThan(0);
    });
  },
};

export const IntegratedInContent: Story = {
  decorators: [
    (Story) => (
      <article className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">How to Build Modern Web Applications</h1>
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div className="text-sm text-gray-600">
            <span>By John Doe</span>
            <span className="mx-2">•</span>
            <span>March 15, 2024</span>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>
          <SocialShareBar
            variant="horizontal"
            size="sm"
            showLabels={false}
            url="https://example.com/article"
            title="How to Build Modern Web Applications"
          />
        </div>
        <p className="text-gray-700 mb-6">
          In today&apos;s fast-paced digital world, building modern web applications requires a deep
          understanding of various technologies and best practices. This comprehensive guide will
          walk you through the essential steps and considerations.
        </p>
        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="my-8 p-6 bg-gray-50 rounded-lg">
          <p className="text-lg font-semibold mb-2">Enjoyed this article?</p>
          <p className="text-gray-600 mb-4">Share it with your network!</p>
          <SocialShareBar
            variant="horizontal"
            colorScheme="brand"
            showLabels={true}
            url="https://example.com/article"
            title="How to Build Modern Web Applications"
          />
        </div>
      </article>
    ),
  ],
};
