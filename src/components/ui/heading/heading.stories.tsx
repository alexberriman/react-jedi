import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./heading";

const meta = {
  title: "Components/Typography/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "HTML heading level (h1-h6)",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      description: "Text size override (independent of heading level)",
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
      description: "Font weight",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    transform: {
      control: "select",
      options: ["uppercase", "lowercase", "capitalize", "normal"],
      description: "Text transformation",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "accent", "muted", "destructive"],
      description: "Text color variant",
    },
    decoration: {
      control: "select",
      options: ["none", "underline", "line-through"],
      description: "Text decoration",
    },
    gradient: {
      control: "select",
      options: ["none", "primary", "rainbow", "sunset", "ocean", "neon", "golden"],
      description: "Text gradient effect",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
      description: "Text shadow effect",
    },
    animation: {
      control: "select",
      options: ["none", "glow", "pulse", "bounce", "shimmer"],
      description: "Text animation",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a heading",
  },
};

export const HeadingLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h1">Heading 1</Heading>
      <Heading level="h2">Heading 2</Heading>
      <Heading level="h3">Heading 3</Heading>
      <Heading level="h4">Heading 4</Heading>
      <Heading level="h5">Heading 5</Heading>
      <Heading level="h6">Heading 6</Heading>
    </div>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading size="xs">Size Extra Small</Heading>
      <Heading size="sm">Size Small</Heading>
      <Heading size="md">Size Medium</Heading>
      <Heading size="lg">Size Large</Heading>
      <Heading size="xl">Size Extra Large</Heading>
      <Heading size="2xl">Size 2XL</Heading>
      <Heading size="3xl">Size 3XL</Heading>
      <Heading size="4xl">Size 4XL</Heading>
      <Heading size="5xl">Size 5XL</Heading>
      <Heading size="6xl">Size 6XL</Heading>
    </div>
  ),
};

export const WeightVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading weight="thin">Thin (100)</Heading>
      <Heading weight="extralight">Extra Light (200)</Heading>
      <Heading weight="light">Light (300)</Heading>
      <Heading weight="normal">Normal (400)</Heading>
      <Heading weight="medium">Medium (500)</Heading>
      <Heading weight="semibold">Semi Bold (600)</Heading>
      <Heading weight="bold">Bold (700)</Heading>
      <Heading weight="extrabold">Extra Bold (800)</Heading>
      <Heading weight="black">Black (900)</Heading>
    </div>
  ),
};

export const AlignmentVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-xl">
      <Heading align="left">Left Aligned Heading</Heading>
      <Heading align="center">Center Aligned Heading</Heading>
      <Heading align="right">Right Aligned Heading</Heading>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading variant="default">Default Color</Heading>
      <Heading variant="primary">Primary Color</Heading>
      <Heading variant="secondary">Secondary Color</Heading>
      <Heading variant="accent">Accent Color</Heading>
      <Heading variant="muted">Muted Color</Heading>
      <Heading variant="destructive">Destructive Color</Heading>
    </div>
  ),
};

export const TextTransformVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading transform="uppercase">Uppercase Text</Heading>
      <Heading transform="lowercase">Lowercase Text</Heading>
      <Heading transform="capitalize">capitalize text</Heading>
      <Heading transform="normal">Normal Case Text</Heading>
    </div>
  ),
};

export const GradientVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading level="h2" gradient="primary">
        Primary Gradient
      </Heading>
      <Heading level="h2" gradient="rainbow">
        Rainbow Gradient
      </Heading>
      <Heading level="h2" gradient="sunset">
        Sunset Gradient
      </Heading>
      <Heading level="h2" gradient="ocean">
        Ocean Gradient
      </Heading>
      <Heading level="h2" gradient="neon">
        Neon Gradient
      </Heading>
      <Heading level="h2" gradient="golden">
        Golden Gradient
      </Heading>
    </div>
  ),
};

export const TextWithShadow: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading shadow="sm">Small Shadow</Heading>
      <Heading shadow="md">Medium Shadow</Heading>
      <Heading shadow="lg">Large Shadow</Heading>
      <Heading shadow="xl">Extra Large Shadow</Heading>
      <Heading shadow="2xl">2XL Shadow</Heading>
    </div>
  ),
};

export const AnimatedText: Story = {
  render: () => (
    <div className="space-y-8">
      <Heading animation="glow" size="2xl">
        Glowing Text
      </Heading>
      <Heading animation="pulse">Pulsing Text</Heading>
      <Heading animation="bounce">Bouncing Text</Heading>
      <Heading animation="shimmer" size="xl">
        Shimmering Text
      </Heading>
    </div>
  ),
};

export const FeaturedHeading: Story = {
  args: {
    level: "h1",
    gradient: "rainbow",
    shadow: "lg",
    weight: "extrabold",
    align: "center",
    children: "2025 Design Aesthetic",
  },
};

export const MarketingHeadline: Story = {
  args: {
    level: "h2",
    size: "4xl",
    weight: "black",
    gradient: "sunset",
    align: "center",
    children: "Elevate Your Experience",
  },
};
