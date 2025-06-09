import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { Heading } from "./heading";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode<typeof Heading>({
  args: {
    children: "This is a heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify heading text
    const heading = canvas.getByText("This is a heading");
    expect(heading).toBeInTheDocument();

    // Default should render as h2
    expect(heading.tagName).toBe("H2");
  },
});

export const HeadingLevels: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all heading levels render with correct tags
      const h1 = canvas.getByText("Heading 1");
      expect(h1).toBeInTheDocument();
      expect(h1.tagName).toBe("H1");

      const h2 = canvas.getByText("Heading 2");
      expect(h2).toBeInTheDocument();
      expect(h2.tagName).toBe("H2");

      const h3 = canvas.getByText("Heading 3");
      expect(h3).toBeInTheDocument();
      expect(h3.tagName).toBe("H3");

      const h4 = canvas.getByText("Heading 4");
      expect(h4).toBeInTheDocument();
      expect(h4.tagName).toBe("H4");

      const h5 = canvas.getByText("Heading 5");
      expect(h5).toBeInTheDocument();
      expect(h5.tagName).toBe("H5");

      const h6 = canvas.getByText("Heading 6");
      expect(h6).toBeInTheDocument();
      expect(h6.tagName).toBe("H6");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Heading",
          level: "h1",
          children: "Heading 1",
        },
        {
          type: "Heading",
          level: "h2",
          children: "Heading 2",
        },
        {
          type: "Heading",
          level: "h3",
          children: "Heading 3",
        },
        {
          type: "Heading",
          level: "h4",
          children: "Heading 4",
        },
        {
          type: "Heading",
          level: "h5",
          children: "Heading 5",
        },
        {
          type: "Heading",
          level: "h6",
          children: "Heading 6",
        },
      ],
    },
  }
);

export const SizeVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all size variants render
      expect(canvas.getByText("Size Extra Small")).toBeInTheDocument();
      expect(canvas.getByText("Size Small")).toBeInTheDocument();
      expect(canvas.getByText("Size Medium")).toBeInTheDocument();
      expect(canvas.getByText("Size Large")).toBeInTheDocument();
      expect(canvas.getByText("Size Extra Large")).toBeInTheDocument();
      expect(canvas.getByText("Size 2XL")).toBeInTheDocument();
      expect(canvas.getByText("Size 3XL")).toBeInTheDocument();
      expect(canvas.getByText("Size 4XL")).toBeInTheDocument();
      expect(canvas.getByText("Size 5XL")).toBeInTheDocument();
      expect(canvas.getByText("Size 6XL")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Heading",
          size: "xs",
          children: "Size Extra Small",
        },
        {
          type: "Heading",
          size: "sm",
          children: "Size Small",
        },
        {
          type: "Heading",
          size: "md",
          children: "Size Medium",
        },
        {
          type: "Heading",
          size: "lg",
          children: "Size Large",
        },
        {
          type: "Heading",
          size: "xl",
          children: "Size Extra Large",
        },
        {
          type: "Heading",
          size: "2xl",
          children: "Size 2XL",
        },
        {
          type: "Heading",
          size: "3xl",
          children: "Size 3XL",
        },
        {
          type: "Heading",
          size: "4xl",
          children: "Size 4XL",
        },
        {
          type: "Heading",
          size: "5xl",
          children: "Size 5XL",
        },
        {
          type: "Heading",
          size: "6xl",
          children: "Size 6XL",
        },
      ],
    },
  }
);

export const WeightVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all weight variants render
      expect(canvas.getByText("Thin (100)")).toBeInTheDocument();
      expect(canvas.getByText("Extra Light (200)")).toBeInTheDocument();
      expect(canvas.getByText("Light (300)")).toBeInTheDocument();
      expect(canvas.getByText("Normal (400)")).toBeInTheDocument();
      expect(canvas.getByText("Medium (500)")).toBeInTheDocument();
      expect(canvas.getByText("Semi Bold (600)")).toBeInTheDocument();
      expect(canvas.getByText("Bold (700)")).toBeInTheDocument();
      expect(canvas.getByText("Extra Bold (800)")).toBeInTheDocument();
      expect(canvas.getByText("Black (900)")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Heading",
          weight: "thin",
          children: "Thin (100)",
        },
        {
          type: "Heading",
          weight: "extralight",
          children: "Extra Light (200)",
        },
        {
          type: "Heading",
          weight: "light",
          children: "Light (300)",
        },
        {
          type: "Heading",
          weight: "normal",
          children: "Normal (400)",
        },
        {
          type: "Heading",
          weight: "medium",
          children: "Medium (500)",
        },
        {
          type: "Heading",
          weight: "semibold",
          children: "Semi Bold (600)",
        },
        {
          type: "Heading",
          weight: "bold",
          children: "Bold (700)",
        },
        {
          type: "Heading",
          weight: "extrabold",
          children: "Extra Bold (800)",
        },
        {
          type: "Heading",
          weight: "black",
          children: "Black (900)",
        },
      ],
    },
  }
);

export const AlignmentVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
    render: () => (
      <div className="space-y-4 w-full max-w-xl">
        <Heading align="left">Left Aligned Heading</Heading>
        <Heading align="center">Center Aligned Heading</Heading>
        <Heading align="right">Right Aligned Heading</Heading>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all alignment variants render
      expect(canvas.getByText("Left Aligned Heading")).toBeInTheDocument();
      expect(canvas.getByText("Center Aligned Heading")).toBeInTheDocument();
      expect(canvas.getByText("Right Aligned Heading")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "space-y-4 w-full max-w-xl",
      children: [
        {
          type: "Heading",
          align: "left",
          children: "Left Aligned Heading",
        },
        {
          type: "Heading",
          align: "center",
          children: "Center Aligned Heading",
        },
        {
          type: "Heading",
          align: "right",
          children: "Right Aligned Heading",
        },
      ],
    },
  }
);

export const ColorVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all color variants are rendered
      expect(canvas.getByText("Default Color")).toBeInTheDocument();
      expect(canvas.getByText("Primary Color")).toBeInTheDocument();
      expect(canvas.getByText("Secondary Color")).toBeInTheDocument();
      expect(canvas.getByText("Accent Color")).toBeInTheDocument();
      expect(canvas.getByText("Muted Color")).toBeInTheDocument();
      expect(canvas.getByText("Destructive Color")).toBeInTheDocument();

      // Verify primary variant has appropriate classes
      const primaryHeading = canvas.getByText("Primary Color");
      expect(primaryHeading).toHaveClass("text-primary");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Heading",
          variant: "default",
          children: "Default Color",
        },
        {
          type: "Heading",
          variant: "primary",
          children: "Primary Color",
        },
        {
          type: "Heading",
          variant: "secondary",
          children: "Secondary Color",
        },
        {
          type: "Heading",
          variant: "accent",
          children: "Accent Color",
        },
        {
          type: "Heading",
          variant: "muted",
          children: "Muted Color",
        },
        {
          type: "Heading",
          variant: "destructive",
          children: "Destructive Color",
        },
      ],
    },
  }
);

export const TextTransformVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
    render: () => (
      <div className="space-y-2">
        <Heading transform="uppercase">Uppercase Text</Heading>
        <Heading transform="lowercase">Lowercase Text</Heading>
        <Heading transform="capitalize">capitalize text</Heading>
        <Heading transform="normal">Normal Case Text</Heading>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test text transform variants render
      expect(canvas.getByText("Uppercase Text")).toBeInTheDocument();
      expect(canvas.getByText("Lowercase Text")).toBeInTheDocument();
      expect(canvas.getByText("capitalize text")).toBeInTheDocument();
      expect(canvas.getByText("Normal Case Text")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Heading",
          transform: "uppercase",
          children: "Uppercase Text",
        },
        {
          type: "Heading",
          transform: "lowercase",
          children: "Lowercase Text",
        },
        {
          type: "Heading",
          transform: "capitalize",
          children: "capitalize text",
        },
        {
          type: "Heading",
          transform: "normal",
          children: "Normal Case Text",
        },
      ],
    },
  }
);

export const GradientVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify all gradient variants are rendered
      const gradients = ["Primary", "Rainbow", "Sunset", "Ocean", "Neon", "Golden"];
      for (const gradient of gradients) {
        const heading = canvas.getByText(`${gradient} Gradient`);
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe("H2");
      }

      // Verify gradient styles are applied (they should have gradient classes)
      const rainbowHeading = canvas.getByText("Rainbow Gradient");
      expect(rainbowHeading).toHaveClass("bg-clip-text");
      expect(rainbowHeading).toHaveClass("text-transparent");
      expect(rainbowHeading).toHaveClass("bg-gradient-to-r");
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      children: [
        {
          type: "Heading",
          level: "h2",
          gradient: "primary",
          children: "Primary Gradient",
        },
        {
          type: "Heading",
          level: "h2",
          gradient: "rainbow",
          children: "Rainbow Gradient",
        },
        {
          type: "Heading",
          level: "h2",
          gradient: "sunset",
          children: "Sunset Gradient",
        },
        {
          type: "Heading",
          level: "h2",
          gradient: "ocean",
          children: "Ocean Gradient",
        },
        {
          type: "Heading",
          level: "h2",
          gradient: "neon",
          children: "Neon Gradient",
        },
        {
          type: "Heading",
          level: "h2",
          gradient: "golden",
          children: "Golden Gradient",
        },
      ],
    },
  }
);

export const TextWithShadow: Story = enhanceStoryForDualMode<typeof Heading>(
  {
    render: () => (
      <div className="space-y-4">
        <Heading shadow="sm">Small Shadow</Heading>
        <Heading shadow="md">Medium Shadow</Heading>
        <Heading shadow="lg">Large Shadow</Heading>
        <Heading shadow="xl">Extra Large Shadow</Heading>
        <Heading shadow="2xl">2XL Shadow</Heading>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test shadow variants render
      expect(canvas.getByText("Small Shadow")).toBeInTheDocument();
      expect(canvas.getByText("Medium Shadow")).toBeInTheDocument();
      expect(canvas.getByText("Large Shadow")).toBeInTheDocument();
      expect(canvas.getByText("Extra Large Shadow")).toBeInTheDocument();
      expect(canvas.getByText("2XL Shadow")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      children: [
        {
          type: "Heading",
          shadow: "sm",
          children: "Small Shadow",
        },
        {
          type: "Heading",
          shadow: "md",
          children: "Medium Shadow",
        },
        {
          type: "Heading",
          shadow: "lg",
          children: "Large Shadow",
        },
        {
          type: "Heading",
          shadow: "xl",
          children: "Extra Large Shadow",
        },
        {
          type: "Heading",
          shadow: "2xl",
          children: "2XL Shadow",
        },
      ],
    },
  }
);

export const AnimatedText: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test animated text variants render
      expect(canvas.getByText("Glowing Text")).toBeInTheDocument();
      expect(canvas.getByText("Pulsing Text")).toBeInTheDocument();
      expect(canvas.getByText("Bouncing Text")).toBeInTheDocument();
      expect(canvas.getByText("Shimmering Text")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Heading",
          animation: "glow",
          size: "2xl",
          children: "Glowing Text",
        },
        {
          type: "Heading",
          animation: "pulse",
          children: "Pulsing Text",
        },
        {
          type: "Heading",
          animation: "bounce",
          children: "Bouncing Text",
        },
        {
          type: "Heading",
          animation: "shimmer",
          size: "xl",
          children: "Shimmering Text",
        },
      ],
    },
  }
);

export const FeaturedHeading: Story = enhanceStoryForDualMode<typeof Heading>({
  args: {
    level: "h1",
    gradient: "rainbow",
    shadow: "lg",
    weight: "extrabold",
    align: "center",
    children: "2025 Design Aesthetic",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test featured heading renders with correct content
    const heading = canvas.getByText("2025 Design Aesthetic");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  },
});

export const MarketingHeadline: Story = enhanceStoryForDualMode<typeof Heading>({
  args: {
    level: "h2",
    size: "4xl",
    weight: "black",
    gradient: "sunset",
    align: "center",
    children: "Elevate Your Experience",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test marketing headline renders with correct content
    const heading = canvas.getByText("Elevate Your Experience");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  },
});

export const SpacingVariants: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all spacing variants render
      expect(canvas.getByText("No spacing (mb-0)")).toBeInTheDocument();
      expect(canvas.getByText("Extra small spacing (mb-1)")).toBeInTheDocument();
      expect(canvas.getByText("Small spacing (mb-2)")).toBeInTheDocument();
      expect(canvas.getByText("Medium spacing (mb-3)")).toBeInTheDocument();
      expect(canvas.getByText("Large spacing (mb-4) - Default")).toBeInTheDocument();
      expect(canvas.getByText("Extra large spacing (mb-6)")).toBeInTheDocument();
      expect(canvas.getByText("2XL spacing (mb-8)")).toBeInTheDocument();
      expect(canvas.getByText("3XL spacing (mb-10)")).toBeInTheDocument();
      expect(canvas.getByText("4XL spacing (mb-12)")).toBeInTheDocument();
      expect(canvas.getByText("Section spacing (mb-16)")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "max-w-2xl",
      children: [
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "none",
          children: "No spacing (mb-0)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with no spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "xs",
          children: "Extra small spacing (mb-1)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with extra small spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "sm",
          children: "Small spacing (mb-2)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with small spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "md",
          children: "Medium spacing (mb-3)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with medium spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "lg",
          children: "Large spacing (mb-4) - Default",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with large spacing (the default).",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "xl",
          children: "Extra large spacing (mb-6)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with extra large spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "2xl",
          children: "2XL spacing (mb-8)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with 2XL spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "3xl",
          children: "3XL spacing (mb-10)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with 3XL spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "4xl",
          children: "4XL spacing (mb-12)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with 4XL spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "section",
          children: "Section spacing (mb-16)",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400",
          children: "This paragraph follows a heading with section spacing - used for major section dividers.",
        },
      ],
    },
  }
);

export const PracticalUsage: Story = enhanceStoryForDualMode<typeof Heading>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test main headings render
      expect(canvas.getByText("Welcome to Our App")).toBeInTheDocument();
      expect(canvas.getByText("Core Features")).toBeInTheDocument();
      expect(canvas.getByText("Getting Started")).toBeInTheDocument();
      expect(canvas.getByText("Installation")).toBeInTheDocument();
      expect(canvas.getByText("Basic Usage")).toBeInTheDocument();
      expect(canvas.getByText("Fast Performance")).toBeInTheDocument();
      expect(canvas.getByText("Beautiful Design")).toBeInTheDocument();
      
      // Test supporting text renders
      expect(canvas.getByText(/Discover the power of modern UI/)).toBeInTheDocument();
      expect(canvas.getByText(/Install the package via npm/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "max-w-4xl",
      children: [
        {
          type: "Heading",
          level: "h1",
          size: "5xl",
          gradient: "rainbow",
          spacing: "xl",
          align: "center",
          children: "Welcome to Our App",
        },
        {
          type: "Text",
          element: "p",
          className: "text-xl text-center text-gray-600 dark:text-gray-400 mb-12",
          children: "Discover the power of modern UI components with seamless spacing.",
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "2xl",
          children: "Core Features",
        },
        {
          type: "Grid",
          columns: 2,
          gap: "xl",
          className: "mb-16",
          children: [
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  size: "xl",
                  spacing: "lg",
                  children: "Fast Performance",
                },
                {
                  type: "Text",
                  element: "p",
                  className: "text-gray-600 dark:text-gray-400",
                  children: "Optimized for speed and efficiency.",
                },
              ],
            },
            {
              type: "Box",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  size: "xl",
                  spacing: "lg",
                  children: "Beautiful Design",
                },
                {
                  type: "Text",
                  element: "p",
                  className: "text-gray-600 dark:text-gray-400",
                  children: "Stunning visuals that captivate users.",
                },
              ],
            },
          ],
        },
        {
          type: "Heading",
          level: "h2",
          size: "3xl",
          spacing: "2xl",
          children: "Getting Started",
        },
        {
          type: "Heading",
          level: "h3",
          size: "lg",
          spacing: "md",
          children: "Installation",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400 mb-4",
          children: "Install the package via npm or yarn:",
        },
        {
          type: "Box",
          element: "pre",
          className: "bg-gray-900 text-gray-100 p-4 rounded mb-8",
          children: {
            type: "Text",
            element: "code",
            children: "npm install @your-package/name",
          },
        },
        {
          type: "Heading",
          level: "h3",
          size: "lg",
          spacing: "md",
          children: "Basic Usage",
        },
        {
          type: "Text",
          element: "p",
          className: "text-gray-600 dark:text-gray-400 mb-4",
          children: "Import and use the Heading component:",
        },
        {
          type: "Box",
          element: "pre",
          className: "bg-gray-900 text-gray-100 p-4 rounded",
          children: {
            type: "Text",
            element: "code",
            children: `import { Heading } from '@your-package/name'

<Heading level="h1" spacing="xl">
  Your Title Here
</Heading>`,
          },
        },
      ],
    },
  }
);
