import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Text } from "./text";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    element: {
      control: "select",
      options: ["p", "span", "div", "blockquote", "code", "strong", "em", "small"],
      description: "HTML element to render as",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "accent", "muted", "destructive"],
      description: "Text color variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      description: "Text size",
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
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    transform: {
      control: "select",
      options: ["uppercase", "lowercase", "capitalize", "normal"],
      description: "Text transformation",
    },
    decoration: {
      control: "select",
      options: ["none", "underline", "line-through"],
      description: "Text decoration",
    },
    italic: {
      control: "boolean",
      description: "Italic text",
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
    truncate: {
      control: "select",
      options: [true, false, "ellipsis", "multiline", "multiline-3", "multiline-4"],
      description: "Truncate text",
    },
    wrap: {
      control: "select",
      options: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"],
      description: "Text wrapping",
    },
    lineHeight: {
      control: "select",
      options: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      description: "Line height",
    },
    tracking: {
      control: "select",
      options: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      description: "Letter spacing",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Text>({
  args: {
    children:
      "This is a paragraph of text that demonstrates the default styling of the Text component. It should have a reasonable width for comfortable reading and proper spacing.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test text content renders
    const textElement = canvas.getByText(/This is a paragraph of text/i);
    expect(textElement).toBeInTheDocument();

    // Test default element is paragraph
    expect(textElement.tagName.toLowerCase()).toBe("p");

    // Test has text slot attribute
    expect(textElement).toHaveAttribute("data-slot", "text");
  },
});

export const ElementTypes: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 max-w-lg">
        <Text element="p">
          Paragraph: Default text element with standard styling for body content.
        </Text>
        <Text element="span">Span: Inline text element.</Text>
        <div className="flex gap-2 items-center">
          <Text element="span">This is regular text</Text>
          <Text element="strong">Strong: Bold emphasis</Text>
          <Text element="em">Em: Italic emphasis</Text>
        </div>
        <Text element="small">Small: Smaller text for less emphasis or secondary information.</Text>
        <Text element="blockquote">
          Blockquote: Used for quotations. &quot;The future belongs to those who believe in the
          beauty of their dreams.&quot; - Eleanor Roosevelt
        </Text>
        <Text element="code">Code: for inline code snippets or technical terms.</Text>
        <Text element="div">Div: Block-level container for text content.</Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test different element types render correctly
      const paragraph = canvas.getByText(/Paragraph: Default text element/);
      expect(paragraph.tagName.toLowerCase()).toBe("p");

      const span = canvas.getByText("Span: Inline text element.");
      expect(span.tagName.toLowerCase()).toBe("span");

      const strong = canvas.getByText("Strong: Bold emphasis");
      expect(strong.tagName.toLowerCase()).toBe("strong");

      const em = canvas.getByText("Em: Italic emphasis");
      expect(em.tagName.toLowerCase()).toBe("em");

      const small = canvas.getByText(/Small: Smaller text/);
      expect(small.tagName.toLowerCase()).toBe("small");

      const blockquote = canvas.getByText(/Blockquote: Used for quotations/);
      expect(blockquote.tagName.toLowerCase()).toBe("blockquote");

      const code = canvas.getByText(/Code: for inline code/);
      expect(code.tagName.toLowerCase()).toBe("code");

      const div = canvas.getByText("Div: Block-level container for text content.");
      expect(div.tagName.toLowerCase()).toBe("div");
    },
  },
  {
    // Since this uses a custom render function, we need to provide the JSON spec manually
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          element: "p",
          children: "Paragraph: Default text element with standard styling for body content.",
        },
        {
          type: "Text",
          element: "span",
          children: "Span: Inline text element.",
        },
        {
          type: "Flex",
          gap: "sm",
          align: "center",
          children: [
            {
              type: "Text",
              element: "span",
              children: "This is regular text",
            },
            {
              type: "Text",
              element: "strong",
              children: "Strong: Bold emphasis",
            },
            {
              type: "Text",
              element: "em",
              children: "Em: Italic emphasis",
            },
          ],
        },
        {
          type: "Text",
          element: "small",
          children: "Small: Smaller text for less emphasis or secondary information.",
        },
        {
          type: "Text",
          element: "blockquote",
          children:
            'Blockquote: Used for quotations. "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
        },
        {
          type: "Text",
          element: "code",
          children: "Code: for inline code snippets or technical terms.",
        },
        {
          type: "Text",
          element: "div",
          children: "Div: Block-level container for text content.",
        },
      ],
    },
  }
);

export const SizeVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 max-w-lg">
        <Text size="xs">Extra Small (xs): Tiny text for legal text or footnotes.</Text>
        <Text size="sm">Small (sm): Slightly smaller text than the base size.</Text>
        <Text size="base">Base: The default text size for body content.</Text>
        <Text size="lg">Large (lg): Slightly larger than the base size, for emphasis.</Text>
        <Text size="xl">Extra Large (xl): For subheadings or important text.</Text>
        <Text size="2xl">2XL: Even larger text, almost heading-like.</Text>
        <Text size="3xl">3XL: The largest text size, for major emphasis.</Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all size variants render
      expect(canvas.getByText(/Extra Small \(xs\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Small \(sm\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Base: The default/)).toBeInTheDocument();
      expect(canvas.getByText(/Large \(lg\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Extra Large \(xl\)/)).toBeInTheDocument();
      expect(canvas.getByText(/2XL: Even larger/)).toBeInTheDocument();
      expect(canvas.getByText(/3XL: The largest/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          size: "xs",
          children: "Extra Small (xs): Tiny text for legal text or footnotes.",
        },
        {
          type: "Text",
          size: "sm",
          children: "Small (sm): Slightly smaller text than the base size.",
        },
        {
          type: "Text",
          size: "base",
          children: "Base: The default text size for body content.",
        },
        {
          type: "Text",
          size: "lg",
          children: "Large (lg): Slightly larger than the base size, for emphasis.",
        },
        {
          type: "Text",
          size: "xl",
          children: "Extra Large (xl): For subheadings or important text.",
        },
        {
          type: "Text",
          size: "2xl",
          children: "2XL: Even larger text, almost heading-like.",
        },
        {
          type: "Text",
          size: "3xl",
          children: "3XL: The largest text size, for major emphasis.",
        },
      ],
    },
  }
);

export const WeightVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-2 max-w-lg">
        <Text weight="thin">Thin (100): The lightest font weight.</Text>
        <Text weight="extralight">Extra Light (200): Very light font weight.</Text>
        <Text weight="light">Light (300): Light but readable weight.</Text>
        <Text weight="normal">Normal (400): The default font weight.</Text>
        <Text weight="medium">Medium (500): Slightly bolder than normal.</Text>
        <Text weight="semibold">Semi Bold (600): Good for mild emphasis.</Text>
        <Text weight="bold">Bold (700): Strong emphasis.</Text>
        <Text weight="extrabold">Extra Bold (800): Very strong emphasis.</Text>
        <Text weight="black">Black (900): The heaviest font weight.</Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all weight variants render
      expect(canvas.getByText(/Thin \(100\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Extra Light \(200\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Light \(300\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Normal \(400\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Medium \(500\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Semi Bold \(600\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Bold \(700\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Extra Bold \(800\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Black \(900\)/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          weight: "thin",
          children: "Thin (100): The lightest font weight.",
        },
        {
          type: "Text",
          weight: "extralight",
          children: "Extra Light (200): Very light font weight.",
        },
        {
          type: "Text",
          weight: "light",
          children: "Light (300): Light but readable weight.",
        },
        {
          type: "Text",
          weight: "normal",
          children: "Normal (400): The default font weight.",
        },
        {
          type: "Text",
          weight: "medium",
          children: "Medium (500): Slightly bolder than normal.",
        },
        {
          type: "Text",
          weight: "semibold",
          children: "Semi Bold (600): Good for mild emphasis.",
        },
        {
          type: "Text",
          weight: "bold",
          children: "Bold (700): Strong emphasis.",
        },
        {
          type: "Text",
          weight: "extrabold",
          children: "Extra Bold (800): Very strong emphasis.",
        },
        {
          type: "Text",
          weight: "black",
          children: "Black (900): The heaviest font weight.",
        },
      ],
    },
  }
);

export const AlignmentVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 w-full max-w-lg border border-muted p-4">
        <Text align="left">
          Left Aligned: This text is aligned to the left, which is the default. It&apos;s the most
          common alignment for body text in left-to-right languages.
        </Text>
        <Text align="center">
          Center Aligned: This text is centered. Center alignment works well for headings or short
          pieces of text that need emphasis.
        </Text>
        <Text align="right">
          Right Aligned: This text is aligned to the right. Right alignment can be useful for
          certain design elements or in right-to-left languages.
        </Text>
        <Text align="justify">
          Justify Aligned: This text is justified, meaning it stretches to fill the full width with
          even spacing between words. This creates clean edges on both sides but can sometimes
          create awkward spacing.
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all alignment variants render
      expect(canvas.getByText(/Left Aligned: This text is aligned/)).toBeInTheDocument();
      expect(canvas.getByText(/Center Aligned: This text is centered/)).toBeInTheDocument();
      expect(
        canvas.getByText(/Right Aligned: This text is aligned to the right/)
      ).toBeInTheDocument();
      expect(canvas.getByText(/Justify Aligned: This text is justified/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "space-y-4 w-full max-w-lg border border-muted p-4",
      children: [
        {
          type: "Text",
          align: "left",
          children:
            "Left Aligned: This text is aligned to the left, which is the default. It's the most common alignment for body text in left-to-right languages.",
        },
        {
          type: "Text",
          align: "center",
          children:
            "Center Aligned: This text is centered. Center alignment works well for headings or short pieces of text that need emphasis.",
        },
        {
          type: "Text",
          align: "right",
          children:
            "Right Aligned: This text is aligned to the right. Right alignment can be useful for certain design elements or in right-to-left languages.",
        },
        {
          type: "Text",
          align: "justify",
          children:
            "Justify Aligned: This text is justified, meaning it stretches to fill the full width with even spacing between words. This creates clean edges on both sides but can sometimes create awkward spacing.",
        },
      ],
    },
  }
);

export const ColorVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-2 max-w-lg">
        <Text variant="default">Default Color: The standard text color.</Text>
        <Text variant="primary">Primary Color: Uses the primary brand color.</Text>
        <Text variant="secondary">Secondary Color: Uses the secondary brand color.</Text>
        <Text variant="accent">Accent Color: Uses the accent color for emphasis.</Text>
        <Text variant="muted">Muted Color: Subdued color for less important text.</Text>
        <Text variant="destructive">Destructive Color: For warnings or errors.</Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test color variants render with correct content
      const defaultText = canvas.getByText("Default Color: The standard text color.");
      expect(defaultText).toBeInTheDocument();

      const primaryText = canvas.getByText("Primary Color: Uses the primary brand color.");
      expect(primaryText).toBeInTheDocument();

      const secondaryText = canvas.getByText("Secondary Color: Uses the secondary brand color.");
      expect(secondaryText).toBeInTheDocument();

      const accentText = canvas.getByText("Accent Color: Uses the accent color for emphasis.");
      expect(accentText).toBeInTheDocument();

      const mutedText = canvas.getByText("Muted Color: Subdued color for less important text.");
      expect(mutedText).toBeInTheDocument();

      const destructiveText = canvas.getByText("Destructive Color: For warnings or errors.");
      expect(destructiveText).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          variant: "default",
          children: "Default Color: The standard text color.",
        },
        {
          type: "Text",
          variant: "primary",
          children: "Primary Color: Uses the primary brand color.",
        },
        {
          type: "Text",
          variant: "secondary",
          children: "Secondary Color: Uses the secondary brand color.",
        },
        {
          type: "Text",
          variant: "accent",
          children: "Accent Color: Uses the accent color for emphasis.",
        },
        {
          type: "Text",
          variant: "muted",
          children: "Muted Color: Subdued color for less important text.",
        },
        {
          type: "Text",
          variant: "destructive",
          children: "Destructive Color: For warnings or errors.",
        },
      ],
    },
  }
);

export const TextTransformVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-2 max-w-lg">
        <Text transform="uppercase">
          UPPERCASE TEXT: TRANSFORMS ALL CHARACTERS TO UPPERCASE. GOOD FOR HEADINGS OR EMPHASIS.
        </Text>
        <Text transform="lowercase">
          lowercase text: transforms all characters to lowercase. can be used for stylistic
          purposes.
        </Text>
        <Text transform="capitalize">
          Capitalize Text: Makes The First Letter Of Each Word Capital. Good For Titles.
        </Text>
        <Text transform="normal">
          Normal Case Text: Leaves the text as-is, without transformation. This is the default.
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test text transform variants render
      expect(canvas.getByText(/UPPERCASE TEXT: TRANSFORMS ALL CHARACTERS/)).toBeInTheDocument();
      expect(canvas.getByText(/lowercase text: transforms all characters/)).toBeInTheDocument();
      expect(canvas.getByText(/Capitalize Text: Makes The First Letter/)).toBeInTheDocument();
      expect(canvas.getByText(/Normal Case Text: Leaves the text as-is/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          transform: "uppercase",
          children:
            "UPPERCASE TEXT: TRANSFORMS ALL CHARACTERS TO UPPERCASE. GOOD FOR HEADINGS OR EMPHASIS.",
        },
        {
          type: "Text",
          transform: "lowercase",
          children:
            "lowercase text: transforms all characters to lowercase. can be used for stylistic purposes.",
        },
        {
          type: "Text",
          transform: "capitalize",
          children:
            "Capitalize Text: Makes The First Letter Of Each Word Capital. Good For Titles.",
        },
        {
          type: "Text",
          transform: "normal",
          children:
            "Normal Case Text: Leaves the text as-is, without transformation. This is the default.",
        },
      ],
    },
  }
);

export const StyleVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 max-w-lg">
        <Text decoration="underline">Underlined text for emphasis or links.</Text>
        <Text decoration="line-through">Strikethrough text to indicate deletion.</Text>
        <Text italic>Italic text for emphasis or stylistic purposes.</Text>
        <Text italic decoration="underline">
          Combined styles: both italic and underlined.
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test style variants render
      expect(canvas.getByText("Underlined text for emphasis or links.")).toBeInTheDocument();
      expect(canvas.getByText("Strikethrough text to indicate deletion.")).toBeInTheDocument();
      expect(
        canvas.getByText("Italic text for emphasis or stylistic purposes.")
      ).toBeInTheDocument();
      expect(canvas.getByText("Combined styles: both italic and underlined.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          decoration: "underline",
          children: "Underlined text for emphasis or links.",
        },
        {
          type: "Text",
          decoration: "line-through",
          children: "Strikethrough text to indicate deletion.",
        },
        {
          type: "Text",
          italic: true,
          children: "Italic text for emphasis or stylistic purposes.",
        },
        {
          type: "Text",
          italic: true,
          decoration: "underline",
          children: "Combined styles: both italic and underlined.",
        },
      ],
    },
  }
);

export const GradientVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-2 max-w-lg">
        <Text gradient="primary" size="xl" weight="bold">
          Primary Gradient: Brand-specific gradient
        </Text>
        <Text gradient="rainbow" size="xl" weight="bold">
          Rainbow Gradient: Vibrant multi-color
        </Text>
        <Text gradient="sunset" size="xl" weight="bold">
          Sunset Gradient: Warm orange to pink
        </Text>
        <Text gradient="ocean" size="xl" weight="bold">
          Ocean Gradient: Cool blue to green
        </Text>
        <Text gradient="neon" size="xl" weight="bold">
          Neon Gradient: Bright purple to blue
        </Text>
        <Text gradient="golden" size="xl" weight="bold">
          Golden Gradient: Luxurious amber to gold
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test gradient variants render
      expect(canvas.getByText("Primary Gradient: Brand-specific gradient")).toBeInTheDocument();
      expect(canvas.getByText("Rainbow Gradient: Vibrant multi-color")).toBeInTheDocument();
      expect(canvas.getByText("Sunset Gradient: Warm orange to pink")).toBeInTheDocument();
      expect(canvas.getByText("Ocean Gradient: Cool blue to green")).toBeInTheDocument();
      expect(canvas.getByText("Neon Gradient: Bright purple to blue")).toBeInTheDocument();
      expect(canvas.getByText("Golden Gradient: Luxurious amber to gold")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "sm",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          gradient: "primary",
          size: "xl",
          weight: "bold",
          children: "Primary Gradient: Brand-specific gradient",
        },
        {
          type: "Text",
          gradient: "rainbow",
          size: "xl",
          weight: "bold",
          children: "Rainbow Gradient: Vibrant multi-color",
        },
        {
          type: "Text",
          gradient: "sunset",
          size: "xl",
          weight: "bold",
          children: "Sunset Gradient: Warm orange to pink",
        },
        {
          type: "Text",
          gradient: "ocean",
          size: "xl",
          weight: "bold",
          children: "Ocean Gradient: Cool blue to green",
        },
        {
          type: "Text",
          gradient: "neon",
          size: "xl",
          weight: "bold",
          children: "Neon Gradient: Bright purple to blue",
        },
        {
          type: "Text",
          gradient: "golden",
          size: "xl",
          weight: "bold",
          children: "Golden Gradient: Luxurious amber to gold",
        },
      ],
    },
  }
);

export const TextWithShadow: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 max-w-lg">
        <Text shadow="sm" size="lg" weight="semibold">
          Small Shadow: Subtle depth effect
        </Text>
        <Text shadow="md" size="lg" weight="semibold">
          Medium Shadow: Balanced shadow effect
        </Text>
        <Text shadow="lg" size="lg" weight="semibold">
          Large Shadow: Pronounced shadow
        </Text>
        <Text shadow="xl" size="lg" weight="semibold">
          Extra Large Shadow: Heavy shadow effect
        </Text>
        <Text shadow="2xl" size="lg" weight="semibold">
          2XL Shadow: Dramatic shadow effect
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test shadow variants render
      expect(canvas.getByText("Small Shadow: Subtle depth effect")).toBeInTheDocument();
      expect(canvas.getByText("Medium Shadow: Balanced shadow effect")).toBeInTheDocument();
      expect(canvas.getByText("Large Shadow: Pronounced shadow")).toBeInTheDocument();
      expect(canvas.getByText("Extra Large Shadow: Heavy shadow effect")).toBeInTheDocument();
      expect(canvas.getByText("2XL Shadow: Dramatic shadow effect")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          shadow: "sm",
          size: "lg",
          weight: "semibold",
          children: "Small Shadow: Subtle depth effect",
        },
        {
          type: "Text",
          shadow: "md",
          size: "lg",
          weight: "semibold",
          children: "Medium Shadow: Balanced shadow effect",
        },
        {
          type: "Text",
          shadow: "lg",
          size: "lg",
          weight: "semibold",
          children: "Large Shadow: Pronounced shadow",
        },
        {
          type: "Text",
          shadow: "xl",
          size: "lg",
          weight: "semibold",
          children: "Extra Large Shadow: Heavy shadow effect",
        },
        {
          type: "Text",
          shadow: "2xl",
          size: "lg",
          weight: "semibold",
          children: "2XL Shadow: Dramatic shadow effect",
        },
      ],
    },
  }
);

export const AnimatedText: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-8 max-w-lg">
        <Text animation="glow" size="xl" weight="bold">
          Glowing Text Effect
        </Text>
        <Text animation="pulse" size="lg">
          Pulsing Text Animation
        </Text>
        <Text animation="bounce" size="lg">
          Bouncing Text Effect
        </Text>
        <Text animation="shimmer" size="xl" weight="semibold">
          Shimmering Text Animation
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test animated text variants render
      expect(canvas.getByText("Glowing Text Effect")).toBeInTheDocument();
      expect(canvas.getByText("Pulsing Text Animation")).toBeInTheDocument();
      expect(canvas.getByText("Bouncing Text Effect")).toBeInTheDocument();
      expect(canvas.getByText("Shimmering Text Animation")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          animation: "glow",
          size: "xl",
          weight: "bold",
          children: "Glowing Text Effect",
        },
        {
          type: "Text",
          animation: "pulse",
          size: "lg",
          children: "Pulsing Text Animation",
        },
        {
          type: "Text",
          animation: "bounce",
          size: "lg",
          children: "Bouncing Text Effect",
        },
        {
          type: "Text",
          animation: "shimmer",
          size: "xl",
          weight: "semibold",
          children: "Shimmering Text Animation",
        },
      ],
    },
  }
);

export const TruncationVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 max-w-xs border border-muted p-4">
        <Text>
          No truncation: This text will wrap naturally to the next line when it reaches the edge of
          its container.
        </Text>
        <Text truncate={true} className="w-full">
          Truncated (boolean): This long text will be cut off with an ellipsis when it reaches the
          edge...
        </Text>
        <Text truncate="ellipsis" className="w-full">
          Truncated (ellipsis): This text is explicitly set to truncate with an ellipsis at the end.
        </Text>
        <Text truncate="multiline" className="w-full">
          Multiline truncation (2 lines): This text will display for two lines before being
          truncated with an ellipsis. This is useful for card descriptions or previews where you
          want to show a bit more content.
        </Text>
        <Text truncate="multiline-3" className="w-full">
          Multiline truncation (3 lines): This text will display for three lines before being
          truncated with an ellipsis. This gives readers more context while still maintaining a
          consistent height. Good for longer descriptions that need more space.
        </Text>
        <Text truncate="multiline-4" className="w-full">
          Multiline truncation (4 lines): This text will display for four lines before being
          truncated with an ellipsis. This is the maximum number of lines available for truncation.
          Use this for important content that requires more comprehensive previews before
          truncation.
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test truncation variants render
      expect(canvas.getByText(/No truncation: This text will wrap/)).toBeInTheDocument();
      expect(canvas.getByText(/Truncated \(boolean\): This long text/)).toBeInTheDocument();
      expect(
        canvas.getByText(/Truncated \(ellipsis\): This text is explicitly/)
      ).toBeInTheDocument();
      expect(canvas.getByText(/Multiline truncation \(2 lines\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Multiline truncation \(3 lines\)/)).toBeInTheDocument();
      expect(canvas.getByText(/Multiline truncation \(4 lines\)/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "space-y-4 max-w-xs border border-muted p-4",
      children: [
        {
          type: "Text",
          children:
            "No truncation: This text will wrap naturally to the next line when it reaches the edge of its container.",
        },
        {
          type: "Text",
          truncate: true,
          className: "w-full",
          children:
            "Truncated (boolean): This long text will be cut off with an ellipsis when it reaches the edge...",
        },
        {
          type: "Text",
          truncate: "ellipsis",
          className: "w-full",
          children:
            "Truncated (ellipsis): This text is explicitly set to truncate with an ellipsis at the end.",
        },
        {
          type: "Text",
          truncate: "multiline",
          className: "w-full",
          children:
            "Multiline truncation (2 lines): This text will display for two lines before being truncated with an ellipsis. This is useful for card descriptions or previews where you want to show a bit more content.",
        },
        {
          type: "Text",
          truncate: "multiline-3",
          className: "w-full",
          children:
            "Multiline truncation (3 lines): This text will display for three lines before being truncated with an ellipsis. This gives readers more context while still maintaining a consistent height. Good for longer descriptions that need more space.",
        },
        {
          type: "Text",
          truncate: "multiline-4",
          className: "w-full",
          children:
            "Multiline truncation (4 lines): This text will display for four lines before being truncated with an ellipsis. This is the maximum number of lines available for truncation. Use this for important content that requires more comprehensive previews before truncation.",
        },
      ],
    },
  }
);

export const LineHeightVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-8 max-w-lg">
        <div className="border border-muted p-2">
          <Text lineHeight="none">
            Line Height: None. This text has no extra space between lines. Words are cramped tightly
            together which can be hard to read but saves vertical space. Only use for special cases.
          </Text>
        </div>
        <div className="border border-muted p-2">
          <Text lineHeight="tight">
            Line Height: Tight. This text has minimal spacing between lines. It&apos;s more compact
            than normal but still maintains some readability. Good for constrained spaces.
          </Text>
        </div>
        <div className="border border-muted p-2">
          <Text lineHeight="snug">
            Line Height: Snug. This text has slightly less spacing than normal. A good compromise
            between space efficiency and readability. Works well for many interfaces.
          </Text>
        </div>
        <div className="border border-muted p-2">
          <Text lineHeight="normal">
            Line Height: Normal. This text has standard spacing between lines. A balanced choice for
            most body content that provides good readability without wasting space.
          </Text>
        </div>
        <div className="border border-muted p-2">
          <Text lineHeight="relaxed">
            Line Height: Relaxed. This text has generous spacing between lines, improving
            readability for longer content. The default choice for most paragraph text in this
            library.
          </Text>
        </div>
        <div className="border border-muted p-2">
          <Text lineHeight="loose">
            Line Height: Loose. This text has maximum spacing between lines. Very easy to read but
            takes up more vertical space. Use for content where readability is the highest priority.
          </Text>
        </div>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test line height variants render
      expect(canvas.getByText(/Line Height: None/)).toBeInTheDocument();
      expect(canvas.getByText(/Line Height: Tight/)).toBeInTheDocument();
      expect(canvas.getByText(/Line Height: Snug/)).toBeInTheDocument();
      expect(canvas.getByText(/Line Height: Normal/)).toBeInTheDocument();
      expect(canvas.getByText(/Line Height: Relaxed/)).toBeInTheDocument();
      expect(canvas.getByText(/Line Height: Loose/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      className: "max-w-lg",
      children: [
        {
          type: "Box",
          className: "border border-muted p-2",
          children: {
            type: "Text",
            lineHeight: "none",
            children:
              "Line Height: None. This text has no extra space between lines. Words are cramped tightly together which can be hard to read but saves vertical space. Only use for special cases.",
          },
        },
        {
          type: "Box",
          className: "border border-muted p-2",
          children: {
            type: "Text",
            lineHeight: "tight",
            children:
              "Line Height: Tight. This text has minimal spacing between lines. It's more compact than normal but still maintains some readability. Good for constrained spaces.",
          },
        },
        {
          type: "Box",
          className: "border border-muted p-2",
          children: {
            type: "Text",
            lineHeight: "snug",
            children:
              "Line Height: Snug. This text has slightly less spacing than normal. A good compromise between space efficiency and readability. Works well for many interfaces.",
          },
        },
        {
          type: "Box",
          className: "border border-muted p-2",
          children: {
            type: "Text",
            lineHeight: "normal",
            children:
              "Line Height: Normal. This text has standard spacing between lines. A balanced choice for most body content that provides good readability without wasting space.",
          },
        },
        {
          type: "Box",
          className: "border border-muted p-2",
          children: {
            type: "Text",
            lineHeight: "relaxed",
            children:
              "Line Height: Relaxed. This text has generous spacing between lines, improving readability for longer content. The default choice for most paragraph text in this library.",
          },
        },
        {
          type: "Box",
          className: "border border-muted p-2",
          children: {
            type: "Text",
            lineHeight: "loose",
            children:
              "Line Height: Loose. This text has maximum spacing between lines. Very easy to read but takes up more vertical space. Use for content where readability is the highest priority.",
          },
        },
      ],
    },
  }
);

export const LetterSpacingVariants: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="space-y-4 max-w-lg">
        <Text tracking="tighter" size="lg">
          Tighter tracking: Reduced letter spacing for a more compact look.
        </Text>
        <Text tracking="tight" size="lg">
          Tight tracking: Slightly reduced spacing between letters.
        </Text>
        <Text tracking="normal" size="lg">
          Normal tracking: Default letter spacing.
        </Text>
        <Text tracking="wide" size="lg">
          Wide tracking: Increased spacing for better legibility.
        </Text>
        <Text tracking="wider" size="lg">
          Wider tracking: More pronounced letter spacing.
        </Text>
        <Text tracking="widest" size="lg">
          Widest tracking: Maximum letter spacing for dramatic effect.
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test letter spacing variants render
      expect(canvas.getByText(/Tighter tracking: Reduced letter spacing/)).toBeInTheDocument();
      expect(canvas.getByText(/Tight tracking: Slightly reduced spacing/)).toBeInTheDocument();
      expect(canvas.getByText(/Normal tracking: Default letter spacing/)).toBeInTheDocument();
      expect(canvas.getByText(/Wide tracking: Increased spacing/)).toBeInTheDocument();
      expect(canvas.getByText(/Wider tracking: More pronounced/)).toBeInTheDocument();
      expect(canvas.getByText(/Widest tracking: Maximum letter spacing/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "md",
      className: "max-w-lg",
      children: [
        {
          type: "Text",
          tracking: "tighter",
          size: "lg",
          children: "Tighter tracking: Reduced letter spacing for a more compact look.",
        },
        {
          type: "Text",
          tracking: "tight",
          size: "lg",
          children: "Tight tracking: Slightly reduced spacing between letters.",
        },
        {
          type: "Text",
          tracking: "normal",
          size: "lg",
          children: "Normal tracking: Default letter spacing.",
        },
        {
          type: "Text",
          tracking: "wide",
          size: "lg",
          children: "Wide tracking: Increased spacing for better legibility.",
        },
        {
          type: "Text",
          tracking: "wider",
          size: "lg",
          children: "Wider tracking: More pronounced letter spacing.",
        },
        {
          type: "Text",
          tracking: "widest",
          size: "lg",
          children: "Widest tracking: Maximum letter spacing for dramatic effect.",
        },
      ],
    },
  }
);

export const LongformText: Story = enhanceStoryForDualMode<typeof Text>(
  {
    render: () => (
      <div className="max-w-prose space-y-4">
        <Text size="lg" weight="semibold">
          The Importance of Typography in Design
        </Text>
        <Text>
          Typography is a fundamental component of design and is crucial in establishing visual
          hierarchy, enhancing readability, and creating an emotional connection with the audience.
          When used effectively, typography can transform a simple design into an immersive
          experience.
        </Text>
        <Text>
          The choice of font, size, weight, spacing, and alignment all contribute to how information
          is perceived and processed. Good typography makes content accessible and engaging, while
          poor typography can make even the most valuable content difficult to consume.
        </Text>
        <Text>
          In web design, typography is especially important as it directly impacts user experience.
          Readable text with appropriate contrast and spacing reduces eye strain and makes
          information easier to digest, particularly on smaller screens or for users with visual
          impairments.
        </Text>
        <Text>
          Beyond functionality, typography also sets the tone and personality of a design. A sleek,
          modern sans-serif font conveys a different feeling than a classic serif or a playful
          display font. These subtle differences can reinforce brand identity and evoke specific
          emotional responses.
        </Text>
        <Text weight="semibold">
          For 2025 and beyond, typography trends are evolving to embrace:
        </Text>
        <Text>• Variable fonts that adapt to different screen sizes and contexts</Text>
        <Text>• Custom typefaces that make brands instantly recognizable</Text>
        <Text>• Experimental typography that pushes creative boundaries</Text>
        <Text>• Accessibility-focused designs that work for all users</Text>
        <Text>• AI-enhanced typography that personalizes the reading experience</Text>
        <Text>
          The Text component in this library is designed to accommodate these trends while
          maintaining flexibility, readability, and visual appeal across all applications.
        </Text>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test main title renders
      expect(canvas.getByText("The Importance of Typography in Design")).toBeInTheDocument();

      // Test various paragraphs render
      expect(canvas.getByText(/Typography is a fundamental component/)).toBeInTheDocument();
      expect(canvas.getByText(/The choice of font, size, weight/)).toBeInTheDocument();
      expect(canvas.getByText(/In web design, typography is especially/)).toBeInTheDocument();
      expect(canvas.getByText(/Beyond functionality, typography also/)).toBeInTheDocument();

      // Test the trends header
      expect(canvas.getByText(/For 2025 and beyond/)).toBeInTheDocument();

      // Test bullet points render
      expect(canvas.getByText(/Variable fonts that adapt/)).toBeInTheDocument();
      expect(canvas.getByText(/Custom typefaces that make/)).toBeInTheDocument();
      expect(canvas.getByText(/Experimental typography that pushes/)).toBeInTheDocument();
      expect(canvas.getByText(/Accessibility-focused designs/)).toBeInTheDocument();
      expect(canvas.getByText(/AI-enhanced typography/)).toBeInTheDocument();

      // Test final paragraph
      expect(canvas.getByText(/The Text component in this library/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "max-w-prose space-y-4",
      children: [
        {
          type: "Text",
          size: "lg",
          weight: "semibold",
          children: "The Importance of Typography in Design",
        },
        {
          type: "Text",
          children:
            "Typography is a fundamental component of design and is crucial in establishing visual hierarchy, enhancing readability, and creating an emotional connection with the audience. When used effectively, typography can transform a simple design into an immersive experience.",
        },
        {
          type: "Text",
          children:
            "The choice of font, size, weight, spacing, and alignment all contribute to how information is perceived and processed. Good typography makes content accessible and engaging, while poor typography can make even the most valuable content difficult to consume.",
        },
        {
          type: "Text",
          children:
            "In web design, typography is especially important as it directly impacts user experience. Readable text with appropriate contrast and spacing reduces eye strain and makes information easier to digest, particularly on smaller screens or for users with visual impairments.",
        },
        {
          type: "Text",
          children:
            "Beyond functionality, typography also sets the tone and personality of a design. A sleek, modern sans-serif font conveys a different feeling than a classic serif or a playful display font. These subtle differences can reinforce brand identity and evoke specific emotional responses.",
        },
        {
          type: "Text",
          weight: "semibold",
          children: "For 2025 and beyond, typography trends are evolving to embrace:",
        },
        {
          type: "Text",
          children: "• Variable fonts that adapt to different screen sizes and contexts",
        },
        {
          type: "Text",
          children: "• Custom typefaces that make brands instantly recognizable",
        },
        {
          type: "Text",
          children: "• Experimental typography that pushes creative boundaries",
        },
        {
          type: "Text",
          children: "• Accessibility-focused designs that work for all users",
        },
        {
          type: "Text",
          children: "• AI-enhanced typography that personalizes the reading experience",
        },
        {
          type: "Text",
          children:
            "The Text component in this library is designed to accommodate these trends while maintaining flexibility, readability, and visual appeal across all applications.",
        },
      ],
    },
  }
);

export const FeatureText: Story = enhanceStoryForDualMode<typeof Text>({
  args: {
    size: "xl",
    weight: "bold",
    gradient: "rainbow",
    shadow: "lg",
    animation: "shimmer",
    align: "center",
    children: "2025 Design Aesthetic",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test feature text renders with correct content
    const featureText = canvas.getByText("2025 Design Aesthetic");
    expect(featureText).toBeInTheDocument();

    // Test it has the text slot attribute
    expect(featureText).toHaveAttribute("data-slot", "text");
  },
});
