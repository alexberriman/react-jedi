import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./image";
import { within, waitFor, expect } from "@storybook/test";

const meta = {
  title: "Components/Media/Image",
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
    src: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Sample image",
    aspectRatio: "16/9",
    width: "400px",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    objectFit: "cover",
    rounded: "md",
    shadow: "none",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("unsplash.com"));
    expect(image).toHaveClass("rounded-md");
  },
};

export const Rounded: Story = {
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
};

export const Circle: Story = {
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
};

export const WithShadow: Story = {
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
};

export const Grayscale: Story = {
  args: {
    filter: "grayscale",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("grayscale");
  },
};

export const Sepia: Story = {
  args: {
    filter: "sepia",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("sepia");
  },
};

export const HoverGrow: Story = {
  args: {
    hover: "grow",
    shadow: "md",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("transition-all");
    expect(image).toHaveClass("hover:scale-105");
  },
};

export const HoverGlow: Story = {
  args: {
    hover: "glow",
    rounded: "xl",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const image = canvas.getByAltText("Sample image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("transition-all");
    expect(image).toHaveClass("hover:glow-md");
  },
};

export const FullWidth: Story = {
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
    expect(container).toHaveStyle({ width: "100%" });
  },
};

export const Landscape: Story = {
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
};

export const Portrait: Story = {
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
};

export const Gallery: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Image
        {...args}
        rounded="lg"
        shadow="md"
        hover="grow"
        aspectRatio="1/1"
        width="100%"
        src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      />
      <Image
        {...args}
        rounded="lg"
        shadow="md"
        hover="grow"
        aspectRatio="1/1"
        width="100%"
        src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      />
      <Image
        {...args}
        rounded="lg"
        shadow="md"
        hover="grow"
        aspectRatio="1/1"
        width="100%"
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
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
};

export const WithFallback: Story = {
  args: {
    src: "https://this-image-does-not-exist.jpg",
    fallback: "https://placehold.co/400x225/EFEFEF/AAAAAA?text=Image+Not+Found",
    rounded: "md",
    shadow: "sm",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      () => {
        const image = canvas.getByAltText("Sample image");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
      },
      { timeout: 10_000 }
    );
  },
};
