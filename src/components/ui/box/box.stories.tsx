import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Box } from "./box";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Layout Components/Box",
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

export const Default: Story = enhanceStoryForDualMode<typeof Box>(
  {
    render: (args) => (
      <Box {...args} className="min-h-[200px] min-w-[200px] flex items-center justify-center">
        <p className="text-xl font-medium">Default Box</p>
      </Box>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test box renders
      const boxElement = canvas.getByText("Default Box");
      expect(boxElement).toBeInTheDocument();
      
      // Test box has correct data attribute
      const box = boxElement.closest('[data-slot="box"]');
      expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "min-h-[200px] min-w-[200px] flex items-center justify-center",
      children: {
        type: "Text",
        element: "p",
        className: "text-xl font-medium",
        children: "Default Box",
      },
    },
  }
);

export const StyledBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test styled box renders
      const boxElement = canvas.getByText("Styled Box");
      expect(boxElement).toBeInTheDocument();
      
      // Test box has correct data attribute
      const box = boxElement.closest('[data-slot="box"]');
      expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      padding: "lg",
      rounded: "lg",
      shadow: "md",
      backgroundColor: "card",
      borderWidth: "thin",
      borderColor: "default",
      className: "min-h-[200px] min-w-[200px] flex items-center justify-center",
      children: {
        type: "Text",
        element: "p",
        className: "text-xl font-medium",
        children: "Styled Box",
      },
    },
  }
);

export const FlexBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all flex items render
      expect(canvas.getByText("Item 1")).toBeInTheDocument();
      expect(canvas.getByText("Item 2")).toBeInTheDocument();
      expect(canvas.getByText("Item 3")).toBeInTheDocument();
      
      // Test all items have box data attribute
      const boxes = canvas.getAllByText(/Item \d/).map(el => el.closest('[data-slot="box"]'));
      expect(boxes).toHaveLength(3);
      for (const box of boxes) expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      display: "flex",
      flexDirection: "col",
      gap: "md",
      padding: "md",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "muted",
      rounded: "md",
      className: "min-h-[300px] min-w-[300px]",
      children: [
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "primary",
          rounded: "md",
          textColor: "primary",
          className: "w-full text-center",
          children: "Item 1",
        },
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "secondary",
          rounded: "md",
          textColor: "secondary",
          className: "w-full text-center",
          children: "Item 2",
        },
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "accent",
          rounded: "md",
          textColor: "accent",
          className: "w-full text-center",
          children: "Item 3",
        },
      ],
    },
  }
);

export const GridBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all grid items render
      expect(canvas.getByText("Grid Item 1")).toBeInTheDocument();
      expect(canvas.getByText("Grid Item 2")).toBeInTheDocument();
      expect(canvas.getByText("Grid Item 3")).toBeInTheDocument();
      expect(canvas.getByText("Grid Item 4")).toBeInTheDocument();
      
      // Test all items have box data attribute
      const boxes = canvas.getAllByText(/Grid Item \d/).map(el => el.closest('[data-slot="box"]'));
      expect(boxes).toHaveLength(4);
      for (const box of boxes) expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      display: "grid",
      gap: "md",
      padding: "md",
      rounded: "md",
      backgroundColor: "muted",
      className: "min-h-[300px] min-w-[300px] grid-cols-2",
      children: [
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "primary",
          rounded: "md",
          textColor: "primary",
          className: "text-center",
          children: "Grid Item 1",
        },
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "secondary",
          rounded: "md",
          textColor: "secondary",
          className: "text-center",
          children: "Grid Item 2",
        },
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "accent",
          rounded: "md",
          textColor: "accent",
          className: "text-center",
          children: "Grid Item 3",
        },
        {
          type: "Box",
          padding: "sm",
          backgroundColor: "primary",
          rounded: "md",
          textColor: "primary",
          className: "text-center",
          children: "Grid Item 4",
        },
      ],
    },
  }
);

export const GlassmorphismBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test glassmorphism box renders
      const textElement = canvas.getByText("Glassmorphism Box");
      expect(textElement).toBeInTheDocument();
      
      // Test nested boxes exist
      const boxes = canvasElement.querySelectorAll('[data-slot="box"]');
      expect(boxes.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[400px] h-[300px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center",
      children: {
        type: "Box",
        glassmorphism: "medium",
        padding: "lg",
        rounded: "xl",
        className: "w-[300px] h-[200px] flex items-center justify-center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-white",
          children: "Glassmorphism Box",
        },
      },
    },
  }
);

export const NeumorphismBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test neumorphism box renders
      const textElement = canvas.getByText("Neumorphism Box");
      expect(textElement).toBeInTheDocument();
      
      // Test nested boxes exist
      const boxes = canvasElement.querySelectorAll('[data-slot="box"]');
      expect(boxes.length).toBeGreaterThan(0);
    },
  },
  {
    renderSpec: {
      type: "Box",
      backgroundColor: "background",
      className: "w-[400px] h-[300px] flex items-center justify-center",
      children: {
        type: "Box",
        neumorphism: "medium",
        padding: "lg",
        rounded: "xl",
        className: "w-[300px] h-[200px] flex items-center justify-center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium",
          children: "Neumorphism Box",
        },
      },
    },
  }
);

export const AbsolutePositionedBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test absolute positioned box renders
      const textElement = canvas.getByText("Absolute Positioned Box");
      expect(textElement).toBeInTheDocument();
      
      // Test box has correct data attribute
      const box = textElement.closest('[data-slot="box"]');
      expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      position: "relative",
      className: "w-[300px] h-[300px] border border-border",
      children: {
        type: "Box",
        position: "absolute",
        padding: "md",
        backgroundColor: "primary",
        textColor: "primary",
        rounded: "md",
        className: "m-4 top-0 left-0",
        children: "Absolute Positioned Box",
      },
    },
  }
);

export const TransitionBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test transition box renders
      const textElement = canvas.getByText("Hover Me");
      expect(textElement).toBeInTheDocument();
      
      // Test box has correct data attribute
      const box = textElement.closest('[data-slot="box"]');
      expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      padding: "md",
      rounded: "md",
      backgroundColor: "accent",
      transition: "default",
      shadow: "md",
      className: "w-[200px] h-[200px] flex items-center justify-center hover:shadow-xl hover:scale-105",
      children: {
        type: "Text",
        element: "p",
        className: "text-lg font-medium text-accent-foreground",
        children: "Hover Me",
      },
    },
  }
);

export const ScrollableBox: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test scrollable box renders
      const introText = canvas.getByText("This box has scrollable content that exceeds its height:");
      expect(introText).toBeInTheDocument();
      
      // Test first and last paragraphs exist
      expect(canvas.getByText(/Scrollable content paragraph 1\./)).toBeInTheDocument();
      expect(canvas.getByText(/Scrollable content paragraph 10\./)).toBeInTheDocument();
      
      // Test box has correct data attribute
      const box = introText.closest('[data-slot="box"]');
      expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      height: "full",
      width: "full",
      overflow: "y-auto",
      padding: "md",
      backgroundColor: "card",
      rounded: "md",
      shadow: "md",
      className: "w-[300px] h-[200px]",
      children: [
        {
          type: "Text",
          element: "p",
          className: "mb-4",
          children: "This box has scrollable content that exceeds its height:",
        },
        ...Array.from({ length: 10 }).map((_, i) => ({
          type: "Text",
          element: "p",
          className: "mb-4",
          children: `Scrollable content paragraph ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        })),
      ],
    },
  }
);

export const BoxWithBackdropBlur: Story = enhanceStoryForDualMode<typeof Box>(
  {
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
            src="https://picsum.photos/400/300"
            alt="Nature"
            className="w-full h-full object-cover absolute inset-0 rounded-lg"
          />
          <Box {...args} className="absolute inset-0 m-8 flex items-center justify-center">
            <p className="text-xl font-bold">Text with Backdrop Blur</p>
          </Box>
        </Box>
      </Box>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test backdrop blur box renders
      const textElement = canvas.getByText("Text with Backdrop Blur");
      expect(textElement).toBeInTheDocument();
      
      // Test image renders
      const image = canvas.getByAltText("Nature");
      expect(image).toBeInTheDocument();
      
      // Test box has correct data attribute
      const box = textElement.closest('[data-slot="box"]');
      expect(box).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "relative w-[400px] h-[300px]",
      children: {
        type: "Box",
        className: "w-full h-full flex items-center justify-center",
        children: [
          {
            type: "Image",
            src: "https://picsum.photos/400/300",
            alt: "Nature",
            className: "w-full h-full object-cover absolute inset-0 rounded-lg",
          },
          {
            type: "Box",
            backdropBlur: "xl",
            padding: "lg",
            rounded: "lg",
            backgroundColor: "background",
            className: "absolute inset-0 m-8 flex items-center justify-center bg-opacity-50",
            children: {
              type: "Text",
              element: "p",
              className: "text-xl font-bold",
              children: "Text with Backdrop Blur",
            },
          },
        ],
      },
    },
  }
);
