import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "./image";
import { within, waitFor, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

// NOTE: Some of these tests may produce act() warnings when run via Vitest.
// These warnings are false positives caused by the Image component's internal state updates
// when handling image loading and fallback behavior. The component works correctly in production
// and all tests pass. These warnings can be safely ignored.

const meta = {
  title: "Components/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Source URL of the image",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
    objectFit: {
      control: "select",
      options: ["contain", "cover", "fill", "none", "scaleDown"],
      description: "How the image should be fitted inside its container",
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "Border radius of the image",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Shadow size around the image",
    },
    filter: {
      control: "select",
      options: ["none", "grayscale", "sepia", "blur", "invert"],
      description: "Visual filter to apply to the image",
    },
    hover: {
      control: "select",
      options: ["none", "grow", "shrink", "rotate", "shine", "glow", "pulse"],
      description: "Effect to apply on hover",
    },
    loading: {
      control: "select",
      options: ["eager", "lazy"],
      description: "Loading behavior of the image",
    },
    fallback: {
      control: "text",
      description: "Fallback image URL if the main image fails to load",
    },
    aspectRatio: {
      control: "text",
      description: "Aspect ratio of the image container (e.g., '16/9', '1/1')",
    },
    width: {
      control: "text",
      description: "Width of the image container (e.g., '300px', '100%')",
    },
    height: {
      control: "text",
      description: "Height of the image container (e.g., '200px', 'auto')",
    },
  },
  args: {
    src: "https://placehold.co/800x450/EEE/31343C",
    alt: "Sample image",
    aspectRatio: "16/9",
    width: "400px",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    objectFit: "cover",
    rounded: "md",
    shadow: "none",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    expect(image).toHaveClass("rounded-md");
  },
});

export const Rounded: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    rounded: "xl",
    shadow: "md",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("rounded-xl");
    expect(image).toHaveClass("shadow-md");
  },
});

export const Circle: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    rounded: "full",
    aspectRatio: "1/1",
    width: "200px",
    objectFit: "cover",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("rounded-full");
    expect(image).toHaveClass("object-cover");
  },
});

export const WithShadow: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    shadow: "xl",
    rounded: "lg",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("shadow-xl");
    expect(image).toHaveClass("rounded-lg");
  },
});

export const Grayscale: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    filter: "grayscale",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("grayscale");
  },
});

export const Sepia: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    filter: "sepia",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("sepia");
  },
});

export const HoverGrow: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    hover: "grow",
    shadow: "md",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    // The grow effect is handled by Framer Motion's whileHover prop
    // so we don't expect CSS transition classes
    expect(image).toHaveClass("object-cover");
    expect(image).toHaveClass("shadow-md");
  },
});

export const HoverGlow: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    hover: "glow",
    rounded: "xl",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    // The glow effect is applied via hover:glow-md class
    expect(image).toHaveClass("hover:glow-md");
    expect(image).toHaveClass("rounded-xl");
  },
});

export const FullWidth: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("object-cover");

    const container = image.parentElement;
    expect(container).toBeInTheDocument();
    // Check that the container has the width style applied
    expect(container?.style.width).toBe("100%");
  },
});

export const Landscape: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    aspectRatio: "21/9",
    width: "600px",
    objectFit: "cover",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();

    const container = image.parentElement;
    expect(container).toHaveStyle({ width: "600px" });
  },
});

export const Portrait: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    aspectRatio: "3/4",
    width: "300px",
    height: "400px",
    objectFit: "cover",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();

    const container = image.parentElement;
    expect(container).toHaveStyle({ width: "300px", height: "400px" });
  },
});

export const Gallery: Story = enhanceStoryForDualMode<typeof Image>(
  {
    render: (args) => (
      <div className="grid grid-cols-3 gap-4 p-4">
        <Image
          {...args}
          rounded="lg"
          shadow="md"
          hover="grow"
          aspectRatio="1/1"
          width="100%"
          src="https://placehold.co/800x450/EEE/31343C"
        />
        <Image
          {...args}
          rounded="lg"
          shadow="md"
          hover="grow"
          aspectRatio="1/1"
          width="100%"
          src="https://placehold.co/800x450/EEE/31343C"
        />
        <Image
          {...args}
          rounded="lg"
          shadow="md"
          hover="grow"
          aspectRatio="1/1"
          width="100%"
          src="https://placehold.co/800x450/EEE/31343C"
        />
      </div>
    ),
    play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
      const canvas = within(canvasElement);
      const images = canvas.getAllByAltText("Sample image");
      expect(images).toHaveLength(3);

      for (const image of images) {
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass("rounded-lg", "shadow-md");
      }
    },
  },
  {
    renderSpec: {
      type: "Grid",
      cols: 3,
      gap: "md",
      className: "p-4",
      children: [
        {
          type: "Image",
          rounded: "lg",
          shadow: "md",
          hover: "grow",
          aspectRatio: "1/1",
          width: "100%",
          src: "https://placehold.co/800x450/EEE/31343C",
          alt: "Sample image",
        },
        {
          type: "Image",
          rounded: "lg",
          shadow: "md",
          hover: "grow",
          aspectRatio: "1/1",
          width: "100%",
          src: "https://placehold.co/800x450/EEE/31343C",
          alt: "Sample image",
        },
        {
          type: "Image",
          rounded: "lg",
          shadow: "md",
          hover: "grow",
          aspectRatio: "1/1",
          width: "100%",
          src: "https://placehold.co/800x450/EEE/31343C",
          alt: "Sample image",
        },
      ],
    },
  }
);

export const WithFallback: Story = enhanceStoryForDualMode<typeof Image>({
  args: {
    src: "https://this-image-does-not-exist.jpg",
    fallback: "https://placehold.co/400x225/EFEFEF/AAAAAA?text=Image+Not+Found",
    rounded: "md",
    shadow: "sm",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial render
    const image = await canvas.findByAltText("Sample image");
    expect(image).toBeInTheDocument();

    // Since fallback will be used, we need to wait for it to load
    await waitFor(
      () => {
        expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
      },
      { timeout: 1000 }
    );
  },
});
