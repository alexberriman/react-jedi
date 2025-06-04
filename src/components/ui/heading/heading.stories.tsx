import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Heading } from "./heading";

const meta = {
  title: "Components/Heading",
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
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "section"],
      description: "Bottom spacing/margin (mb-values)",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a heading",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify heading text
    const heading = canvas.getByText('This is a heading');
    expect(heading).toBeInTheDocument();
    
    // Default should render as h2
    expect(heading.tagName).toBe('H2');
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all heading levels render with correct tags
    const h1 = canvas.getByText('Heading 1');
    expect(h1).toBeInTheDocument();
    expect(h1.tagName).toBe('H1');
    
    const h2 = canvas.getByText('Heading 2');
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
    
    const h3 = canvas.getByText('Heading 3');
    expect(h3).toBeInTheDocument();
    expect(h3.tagName).toBe('H3');
    
    const h4 = canvas.getByText('Heading 4');
    expect(h4).toBeInTheDocument();
    expect(h4.tagName).toBe('H4');
    
    const h5 = canvas.getByText('Heading 5');
    expect(h5).toBeInTheDocument();
    expect(h5.tagName).toBe('H5');
    
    const h6 = canvas.getByText('Heading 6');
    expect(h6).toBeInTheDocument();
    expect(h6.tagName).toBe('H6');
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all color variants are rendered
    expect(canvas.getByText('Default Color')).toBeInTheDocument();
    expect(canvas.getByText('Primary Color')).toBeInTheDocument();
    expect(canvas.getByText('Secondary Color')).toBeInTheDocument();
    expect(canvas.getByText('Accent Color')).toBeInTheDocument();
    expect(canvas.getByText('Muted Color')).toBeInTheDocument();
    expect(canvas.getByText('Destructive Color')).toBeInTheDocument();
    
    // Verify primary variant has appropriate classes
    const primaryHeading = canvas.getByText('Primary Color');
    expect(primaryHeading).toHaveClass('text-primary');
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all gradient variants are rendered
    const gradients = ['Primary', 'Rainbow', 'Sunset', 'Ocean', 'Neon', 'Golden'];
    for (const gradient of gradients) {
      const heading = canvas.getByText(`${gradient} Gradient`);
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    }
    
    // Verify gradient styles are applied (they should have gradient classes)
    const rainbowHeading = canvas.getByText('Rainbow Gradient');
    expect(rainbowHeading).toHaveClass('bg-clip-text');
    expect(rainbowHeading).toHaveClass('text-transparent');
    expect(rainbowHeading).toHaveClass('bg-gradient-to-r');
  },
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

export const SpacingVariants: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Heading level="h2" size="3xl" spacing="none">
        No spacing (mb-0)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with no spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="xs">
        Extra small spacing (mb-1)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with extra small spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="sm">
        Small spacing (mb-2)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with small spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="md">
        Medium spacing (mb-3)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with medium spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="lg">
        Large spacing (mb-4) - Default
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with large spacing (the default).
      </p>

      <Heading level="h2" size="3xl" spacing="xl">
        Extra large spacing (mb-6)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with extra large spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="2xl">
        2XL spacing (mb-8)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with 2XL spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="3xl">
        3XL spacing (mb-10)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with 3XL spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="4xl">
        4XL spacing (mb-12)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with 4XL spacing.
      </p>

      <Heading level="h2" size="3xl" spacing="section">
        Section spacing (mb-16)
      </Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This paragraph follows a heading with section spacing - used for major section dividers.
      </p>
    </div>
  ),
};

export const PracticalUsage: Story = {
  render: () => (
    <div className="max-w-4xl">
      {/* Hero section example */}
      <Heading level="h1" size="5xl" gradient="rainbow" spacing="xl" align="center">
        Welcome to Our App
      </Heading>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
        Discover the power of modern UI components with seamless spacing.
      </p>

      {/* Section with proper spacing */}
      <Heading level="h2" size="3xl" spacing="2xl">
        Core Features
      </Heading>

      <div className="grid grid-cols-2 gap-8 mb-16">
        <div>
          <Heading level="h3" size="xl" spacing="lg">
            Fast Performance
          </Heading>
          <p className="text-gray-600 dark:text-gray-400">Optimized for speed and efficiency.</p>
        </div>
        <div>
          <Heading level="h3" size="xl" spacing="lg">
            Beautiful Design
          </Heading>
          <p className="text-gray-600 dark:text-gray-400">Stunning visuals that captivate users.</p>
        </div>
      </div>

      {/* Documentation-style section */}
      <Heading level="h2" size="3xl" spacing="2xl">
        Getting Started
      </Heading>

      <Heading level="h3" size="lg" spacing="md">
        Installation
      </Heading>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Install the package via npm or yarn:</p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded mb-8">
        <code>npm install @your-package/name</code>
      </pre>

      <Heading level="h3" size="lg" spacing="md">
        Basic Usage
      </Heading>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Import and use the Heading component:</p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded">
        <code>{`import { Heading } from '@your-package/name'

<Heading level="h1" spacing="xl">
  Your Title Here
</Heading>`}</code>
      </pre>
    </div>
  ),
};
