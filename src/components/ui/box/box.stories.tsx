import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./box";

const meta = {
  title: "UI/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    display: {
      control: "select",
      options: [
        "block",
        "flex",
        "inline",
        "inline-block",
        "grid",
        "inline-flex",
        "inline-grid",
        "none",
      ],
      description: "Controls the display CSS property",
    },
    position: {
      control: "select",
      options: ["static", "relative", "absolute", "fixed", "sticky"],
      description: "Controls the positioning method",
    },
    padding: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Controls the padding on all sides",
    },
    margin: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "auto"],
      description: "Controls the margin on all sides",
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "Controls the border radius (roundness of corners)",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "inner"],
      description: "Controls the box shadow",
    },
    width: {
      control: "select",
      options: [
        "auto",
        "full",
        "screen",
        "fit",
        "min",
        "max",
        "half",
        "third",
        "two-thirds",
        "quarter",
        "three-quarters",
      ],
      description: "Controls the width of the box",
    },
    height: {
      control: "select",
      options: [
        "auto",
        "full",
        "screen",
        "fit",
        "min",
        "max",
        "half",
        "third",
        "two-thirds",
        "quarter",
        "three-quarters",
      ],
      description: "Controls the height of the box",
    },
    borderWidth: {
      control: "select",
      options: ["none", "thin", "thick", "thicker", "thickest"],
      description: "Controls the border width",
    },
    backgroundColor: {
      control: "select",
      options: [
        "transparent",
        "primary",
        "secondary",
        "accent",
        "muted",
        "card",
        "background",
        "foreground",
        "destructive",
        "popover",
      ],
      description: "Controls the background color",
    },
    textColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "muted",
        "card",
        "background",
        "foreground",
        "destructive",
        "popover",
      ],
      description: "Controls the text color",
    },
    borderColor: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "muted",
        "card",
        "background",
        "foreground",
        "destructive",
        "popover",
      ],
      description: "Controls the border color",
    },
    flexDirection: {
      control: "select",
      options: ["row", "row-reverse", "col", "col-reverse"],
      description: "Controls the direction of flex items when display is flex",
    },
    justifyContent: {
      control: "select",
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "Controls the alignment of flex items along the main axis",
    },
    alignItems: {
      control: "select",
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "Controls the alignment of flex items along the cross axis",
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Controls the gap between grid/flex items",
    },
    overflow: {
      control: "select",
      options: [
        "auto",
        "hidden",
        "visible",
        "scroll",
        "x-auto",
        "y-auto",
        "x-hidden",
        "y-hidden",
        "x-scroll",
        "y-scroll",
      ],
      description: "Controls how content overflows the box",
    },
    zIndex: {
      control: "select",
      options: ["auto", "0", "10", "20", "30", "40", "50"],
      description: "Controls the stacking order",
    },
    transition: {
      control: "select",
      options: ["none", "default", "fast", "slow"],
      description: "Controls transition effects",
    },
    scale: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Controls the scale transform",
    },
    blur: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Controls the blur filter effect",
    },
    backdropBlur: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Controls the backdrop blur effect",
    },
    glassmorphism: {
      control: "select",
      options: ["none", "light", "medium", "strong", "dark", "dark-medium", "dark-strong"],
      description: "Applies glass morphism effect variants",
    },
    neumorphism: {
      control: "select",
      options: ["none", "light", "medium", "strong", "dark", "dark-medium", "dark-strong"],
      description: "Applies neumorphism effect variants",
    },
    as: {
      control: "select",
      options: ["div", "section", "article", "main", "aside", "header", "footer", "nav"],
      description: "Renders the box as a different HTML element",
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box {...args} className="min-h-[200px] min-w-[200px] flex items-center justify-center">
      <p className="text-xl font-medium">Default Box</p>
    </Box>
  ),
};

export const StyledBox: Story = {
  args: {
    padding: "lg",
    rounded: "lg",
    shadow: "md",
    backgroundColor: "card",
    borderWidth: "thin",
    borderColor: "default",
  },
  render: (args) => (
    <Box {...args} className="min-h-[200px] min-w-[200px] flex items-center justify-center">
      <p className="text-xl font-medium">Styled Box</p>
    </Box>
  ),
};

export const FlexBox: Story = {
  args: {
    display: "flex",
    flexDirection: "col",
    gap: "md",
    padding: "md",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "muted",
    rounded: "md",
  },
  render: (args) => (
    <Box {...args} className="min-h-[300px] min-w-[300px]">
      <Box
        padding="sm"
        backgroundColor="primary"
        rounded="md"
        textColor="primary"
        className="w-full text-center"
      >
        Item 1
      </Box>
      <Box
        padding="sm"
        backgroundColor="secondary"
        rounded="md"
        textColor="secondary"
        className="w-full text-center"
      >
        Item 2
      </Box>
      <Box
        padding="sm"
        backgroundColor="accent"
        rounded="md"
        textColor="accent"
        className="w-full text-center"
      >
        Item 3
      </Box>
    </Box>
  ),
};

export const GridBox: Story = {
  args: {
    display: "grid",
    gap: "md",
    padding: "md",
    rounded: "md",
    backgroundColor: "muted",
    className: "grid-cols-2",
  },
  render: (args) => (
    <Box {...args} className="min-h-[300px] min-w-[300px]">
      <Box
        padding="sm"
        backgroundColor="primary"
        rounded="md"
        textColor="primary"
        className="text-center"
      >
        Grid Item 1
      </Box>
      <Box
        padding="sm"
        backgroundColor="secondary"
        rounded="md"
        textColor="secondary"
        className="text-center"
      >
        Grid Item 2
      </Box>
      <Box
        padding="sm"
        backgroundColor="accent"
        rounded="md"
        textColor="accent"
        className="text-center"
      >
        Grid Item 3
      </Box>
      <Box
        padding="sm"
        backgroundColor="primary"
        rounded="md"
        textColor="primary"
        className="text-center"
      >
        Grid Item 4
      </Box>
    </Box>
  ),
};

export const GlassmorphismBox: Story = {
  args: {
    glassmorphism: "medium",
    padding: "lg",
    rounded: "xl",
  },
  render: (args) => (
    <Box className="w-[400px] h-[300px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <Box {...args} className="w-[300px] h-[200px] flex items-center justify-center">
        <p className="text-xl font-medium text-white">Glassmorphism Box</p>
      </Box>
    </Box>
  ),
};

export const NeumorphismBox: Story = {
  args: {
    neumorphism: "medium",
    padding: "lg",
    rounded: "xl",
  },
  render: (args) => (
    <Box
      backgroundColor="background"
      className="w-[400px] h-[300px] flex items-center justify-center"
    >
      <Box {...args} className="w-[300px] h-[200px] flex items-center justify-center">
        <p className="text-xl font-medium">Neumorphism Box</p>
      </Box>
    </Box>
  ),
};

export const AbsolutePositionedBox: Story = {
  args: {
    position: "absolute",
    padding: "md",
    backgroundColor: "primary",
    textColor: "primary",
    rounded: "md",
  },
  render: (args) => (
    <Box position="relative" className="w-[300px] h-[300px] border border-border">
      <Box {...args} className="m-4 top-0 left-0">
        Absolute Positioned Box
      </Box>
    </Box>
  ),
};

export const TransitionBox: Story = {
  args: {
    padding: "md",
    rounded: "md",
    backgroundColor: "accent",
    transition: "default",
    shadow: "md",
    className: "hover:shadow-xl hover:scale-105",
  },
  render: (args) => (
    <Box {...args} className="w-[200px] h-[200px] flex items-center justify-center">
      <p className="text-lg font-medium text-accent-foreground">Hover Me</p>
    </Box>
  ),
};

export const ScrollableBox: Story = {
  args: {
    height: "full",
    width: "full",
    overflow: "y-auto",
    padding: "md",
    backgroundColor: "card",
    rounded: "md",
    shadow: "md",
  },
  render: (args) => (
    <Box {...args} className="w-[300px] h-[200px]">
      <p className="mb-4">This box has scrollable content that exceeds its height:</p>
      {Array.from({ length: 10 }).map((_, i) => (
        <p key={i} className="mb-4">
          Scrollable content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </p>
      ))}
    </Box>
  ),
};

export const BoxWithBackdropBlur: Story = {
  args: {
    backdropBlur: "xl",
    padding: "lg",
    rounded: "lg",
    backgroundColor: "background",
    className: "bg-opacity-50",
  },
  render: (args) => (
    <Box className="relative w-[400px] h-[300px]">
      <Box className="w-full h-full flex items-center justify-center">
        <img
          src="https://source.unsplash.com/random/400x300?nature"
          alt="Nature"
          className="w-full h-full object-cover absolute inset-0 rounded-lg"
        />
        <Box {...args} className="absolute inset-0 m-8 flex items-center justify-center">
          <p className="text-xl font-bold">Text with Backdrop Blur</p>
        </Box>
      </Box>
    </Box>
  ),
};
