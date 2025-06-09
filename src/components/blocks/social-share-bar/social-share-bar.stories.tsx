import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "storybook/test";
import { SocialShareBar } from "./social-share-bar";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    url: "https://example.com/article",
    title: "Check out this amazing article!",
    description: "An insightful article about modern web development",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that share buttons are rendered
    const shareButtons = canvas.getAllByRole("button");
    expect(shareButtons.length).toBeGreaterThan(0);
    
    // Test that social platform buttons are present by checking for common share platforms
    const buttonTexts = shareButtons.map(button => button.textContent || button.getAttribute('aria-label'));
    const expectedPlatforms = ['Twitter', 'Facebook', 'LinkedIn', 'Reddit', 'Email', 'Copy Link'];
    
    for (const platform of expectedPlatforms) {
      const hasButton = buttonTexts.some(text => text?.includes(platform));
      expect(hasButton).toBe(true);
    }
  },
});

export const HorizontalBar: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    url: "https://example.com/blog-post",
    title: "Amazing Blog Post",
    showLabels: true,
    size: "md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test horizontal layout
    const container = canvas.getByRole("button").closest('div');
    expect(container).toBeInTheDocument();
    
    // Test that labels are shown
    const buttons = canvas.getAllByRole("button");
    for (const button of buttons) {
      const hasLabel = button.textContent && button.textContent.trim().length > 0;
      expect(hasLabel).toBe(true);
    }
  },
});

export const VerticalSidebar: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test vertical layout
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test that labels are hidden (showLabels: false)
    for (const button of buttons) {
      // Check that button only contains icon (no text content or very minimal text)
      const hasMinimalText = !button.textContent || button.textContent.trim().length === 0;
      expect(hasMinimalText).toBe(true);
    }
  },
}, {
  renderSpec: {
    type: "Flex",
    direction: "row",
    className: "min-h-[600px]",
    children: [
      {
        type: "Flex",
        direction: "column",
        className: "flex-1 max-w-2xl mx-auto p-8",
        gap: "md",
        children: [
          {
            type: "Heading",
            level: 1,
            className: "text-3xl font-bold mb-4",
            children: "Article Title"
          },
          {
            type: "Text",
            className: "text-gray-600 mb-8",
            children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            type: "Text",
            className: "text-gray-600 mb-8",
            children: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        ]
      },
      {
        type: "Container",
        className: "w-16",
        children: [{
          type: "SocialShareBar",
          variant: "vertical",
          url: "https://example.com/article",
          title: "Interesting Article",
          showLabels: false,
          sticky: true,
          className: "ml-auto"
        }]
      }
    ]
  }
});

export const FloatingButton: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    
    // Test that floating button is rendered
    const floatingButton = canvas.getByRole("button", { name: /open share menu/i });
    expect(floatingButton).toBeInTheDocument();
    
    // Test floating button interaction
    await user.click(floatingButton);
    
    // After clicking, should show share options
    const shareButtons = canvas.getAllByRole("button");
    expect(shareButtons.length).toBeGreaterThan(1); // More than just the trigger button
  },
}, {
  renderSpec: {
    type: "Container",
    className: "relative h-[400px] bg-gray-50 rounded-lg overflow-hidden",
    children: [
      {
        type: "Container",
        className: "p-8",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-bold mb-4",
            children: "Page Content"
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "This demonstrates the floating share button that expands on click."
          }
        ]
      },
      {
        type: "SocialShareBar",
        variant: "floating",
        position: "bottom-right",
        url: "https://example.com/page",
        title: "Share this page",
        animated: true
      }
    ]
  }
});

export const ModalTrigger: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "modal",
    url: "https://example.com/content",
    title: "Great Content to Share",
    description: "This is an amazing piece of content worth sharing",
    platforms: ["twitter", "facebook", "linkedin", "reddit", "email", "copy"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    
    // Test that modal trigger button is rendered
    const modalTrigger = canvas.getByRole("button", { name: /share/i });
    expect(modalTrigger).toBeInTheDocument();
    
    // Test modal trigger interaction
    await user.click(modalTrigger);
    
    // After clicking, should show modal with share options
    const modalTitle = canvas.getByText(/share this content/i);
    expect(modalTitle).toBeInTheDocument();
    
    // Check that share buttons are present in modal
    const shareButtons = canvas.getAllByRole("button");
    expect(shareButtons.length).toBeGreaterThan(2); // Trigger + close + share buttons
  },
});

export const MinimalIcons: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "minimal",
    url: "https://example.com/minimal",
    title: "Minimal Share Example",
    size: "sm",
    showLabels: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test minimal variant
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test small size and no labels
    for (const button of buttons) {
      // Check that button is small and has minimal text
      const hasMinimalText = !button.textContent || button.textContent.trim().length === 0;
      expect(hasMinimalText).toBe(true);
    }
  },
});

export const WithShareCounts: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that share counts are displayed
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Check for share count badges (they appear as spans with count numbers)
    const countElements = canvasElement.querySelectorAll('span');
    const hasCountNumbers = [...countElements].some(span => {
      const text = span.textContent;
      return text && /\d+/.test(text); // Contains numbers
    });
    expect(hasCountNumbers).toBe(true);
  },
});

export const BrandColors: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    colorScheme: "brand",
    url: "https://example.com/brand",
    title: "Brand Colored Share Buttons",
    showLabels: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test brand color scheme
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test that labels are shown
    for (const button of buttons) {
      const hasLabel = button.textContent && button.textContent.trim().length > 0;
      expect(hasLabel).toBe(true);
    }
  },
});

export const MonochromeStyle: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    colorScheme: "monochrome",
    url: "https://example.com/mono",
    title: "Monochrome Share Buttons",
    showLabels: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test monochrome color scheme
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test that labels are hidden
    for (const button of buttons) {
      const hasMinimalText = !button.textContent || button.textContent.trim().length === 0;
      expect(hasMinimalText).toBe(true);
    }
  },
});

export const GradientStyle: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    colorScheme: "gradient",
    url: "https://example.com/gradient",
    title: "Gradient Share Buttons",
    showLabels: true,
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test gradient color scheme and large size
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test that labels are shown
    for (const button of buttons) {
      const hasLabel = button.textContent && button.textContent.trim().length > 0;
      expect(hasLabel).toBe(true);
    }
  },
});

export const LargeButtons: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    size: "lg",
    url: "https://example.com/large",
    title: "Large Share Buttons",
    showLabels: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test large size
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test that labels are shown
    for (const button of buttons) {
      const hasLabel = button.textContent && button.textContent.trim().length > 0;
      expect(hasLabel).toBe(true);
    }
  },
});

export const SmallButtons: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    size: "sm",
    url: "https://example.com/small",
    title: "Small Share Buttons",
    showLabels: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test small size
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test that labels are hidden
    for (const button of buttons) {
      const hasMinimalText = !button.textContent || button.textContent.trim().length === 0;
      expect(hasMinimalText).toBe(true);
    }
  },
});

export const SelectedPlatforms: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    platforms: ["twitter", "facebook", "copy"],
    url: "https://example.com/selected",
    title: "Selected Platforms Only",
    showLabels: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test selected platforms only
    const buttons = canvas.getAllByRole("button");
    expect(buttons).toHaveLength(3); // Only 3 platforms selected
    
    // Test specific platforms are present
    const buttonTexts = buttons.map(button => button.textContent || button.getAttribute('aria-label'));
    const expectedPlatforms = ['Twitter', 'Facebook', 'Copy Link'];
    
    for (const platform of expectedPlatforms) {
      const hasButton = buttonTexts.some(text => text?.includes(platform));
      expect(hasButton).toBe(true);
    }
  },
});

export const FloatingCenterLeft: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test center-left position
    const floatingButton = canvas.getByRole("button", { name: /open share menu/i });
    expect(floatingButton).toBeInTheDocument();
  },
}, {
  renderSpec: {
    type: "Container",
    className: "relative h-[400px] bg-gray-50 rounded-lg overflow-hidden",
    children: [
      {
        type: "Container",
        className: "p-8",
        children: [
          {
            type: "Heading",
            level: 2,
            className: "text-2xl font-bold mb-4",
            children: "Content Area"
          },
          {
            type: "Text",
            className: "text-gray-600",
            children: "Floating button positioned on the left side of the content."
          }
        ]
      },
      {
        type: "SocialShareBar",
        variant: "floating",
        position: "center-left",
        url: "https://example.com/left",
        title: "Left Side Floating Button"
      }
    ]
  }
});

export const WithCallback: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
  args: {
    variant: "horizontal",
    url: "https://example.com/callback",
    title: "Share with Callback",
    onShare: (platform) => {
      console.log(`Shared on ${platform}`);
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Check that share buttons are rendered", async () => {
      const buttons = canvas.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
    
    await step("Test callback functionality", async () => {
      const buttons = canvas.getAllByRole("button");
      expect(buttons[0]).toBeInTheDocument();
      // Note: Actual callback testing would require more sophisticated mocking
    });
  },
});

export const IntegratedInContent: Story = enhanceStoryForDualMode<typeof SocialShareBar>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test integrated content layout
    const heading = canvas.getByRole("heading", { name: /how to build modern web applications/i });
    expect(heading).toBeInTheDocument();
    
    // Test that both share bars are rendered
    const shareButtons = canvas.getAllByRole("button");
    expect(shareButtons.length).toBeGreaterThan(0);
    
    // Test the first (small) share bar in header
    const headerButtons = shareButtons.slice(0, 6); // First 6 buttons are typically the header ones
    for (const button of headerButtons) {
      expect(button).toBeInTheDocument();
    }
  },
}, {
  renderSpec: {
    type: "Container",
    className: "max-w-3xl mx-auto p-8",
    children: [
      {
        type: "Heading",
        level: 1,
        className: "text-4xl font-bold mb-4",
        children: "How to Build Modern Web Applications"
      },
      {
        type: "Flex",
        direction: "row",
        align: "center",
        justify: "between",
        className: "mb-8 pb-4 border-b",
        children: [
          {
            type: "Flex",
            direction: "row",
            align: "center",
            gap: "sm",
            className: "text-sm text-gray-600",
            children: [
              {
                type: "Text",
                children: "By John Doe"
              },
              {
                type: "Text",
                children: "•"
              },
              {
                type: "Text",
                children: "March 15, 2024"
              },
              {
                type: "Text",
                children: "•"
              },
              {
                type: "Text",
                children: "5 min read"
              }
            ]
          },
          {
            type: "SocialShareBar",
            variant: "horizontal",
            size: "sm",
            showLabels: false,
            url: "https://example.com/article",
            title: "How to Build Modern Web Applications"
          }
        ]
      },
      {
        type: "Text",
        className: "text-gray-700 mb-6",
        children: "In today's fast-paced digital world, building modern web applications requires a deep understanding of various technologies and best practices. This comprehensive guide will walk you through the essential steps and considerations."
      },
      {
        type: "Text",
        className: "text-gray-700 mb-6",
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        type: "Container",
        className: "my-8 p-6 bg-gray-50 rounded-lg",
        children: [
          {
            type: "Text",
            className: "text-lg font-semibold mb-2",
            children: "Enjoyed this article?"
          },
          {
            type: "Text",
            className: "text-gray-600 mb-4",
            children: "Share it with your network!"
          },
          {
            type: "SocialShareBar",
            variant: "horizontal",
            colorScheme: "brand",
            showLabels: true,
            url: "https://example.com/article",
            title: "How to Build Modern Web Applications"
          }
        ]
      }
    ]
  }
});
