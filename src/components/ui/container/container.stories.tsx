import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./container";
import { within, expect } from "storybook/test";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Layout Components/Container",
  component: Container,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg", "xl", "full"],
      description: "Controls the max-width of the container",
    },
    padding: {
      control: "select",
      options: ["default", "none", "sm", "lg", "xl"],
      description: "Controls the vertical padding of the container",
    },
    align: {
      control: "select",
      options: ["default", "center", "end", "stretch"],
      description: "Controls the alignment of container contents",
    },
    as: {
      control: "select",
      options: ["div", "section", "article", "main", "aside"],
      description: "Renders the container as a different HTML element",
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = enhanceStoryForDualMode<typeof Container>(
  {
    render: (args) => (
      <Container {...args} className="bg-card border shadow-sm">
        <div className="h-40 w-full flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">Default Container</p>
        </div>
      </Container>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify container is rendered
      const container = canvas.getByText("Default Container").parentElement?.parentElement;
      expect(container).toBeInTheDocument();

      // Check default properties - container uses containerVariants classes
      expect(container).toHaveClass("mx-auto");
      expect(container).toHaveClass("w-full");
      expect(container).toHaveClass("px-4"); // base padding
      expect(container).toHaveClass("sm:px-6"); // responsive padding
      expect(container).toHaveClass("lg:px-8"); // responsive padding
      expect(container).toHaveClass("max-w-7xl"); // default size
      expect(container).toHaveClass("flex");
      expect(container).toHaveClass("flex-col");

      // Verify it's rendered as a div by default
      expect(container?.tagName).toBe("DIV");
    },
  },
  {
    renderSpec: {
      type: "Container",
      className: "bg-card border shadow-sm",
      children: {
        type: "Flex",
        className: "h-40 w-full",
        align: "center",
        justify: "center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-muted-foreground",
          children: "Default Container",
        },
      },
    },
  }
);

export const Small: Story = enhanceStoryForDualMode<typeof Container>(
  {
    args: {
      size: "sm",
    },
    render: (args) => (
      <Container {...args} className="bg-card border shadow-sm">
        <div className="h-40 w-full flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">Small Container (max-w-3xl)</p>
        </div>
      </Container>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify container is rendered
      const container = canvas.getByText("Small Container (max-w-3xl)").parentElement?.parentElement;
      expect(container).toBeInTheDocument();

      // Check it has the small size class
      expect(container).toHaveClass("max-w-3xl");

      // Verify container slot attribute
      expect(container).toHaveAttribute("data-slot", "container");
    },
  },
  {
    renderSpec: {
      type: "Container",
      size: "sm",
      className: "bg-card border shadow-sm",
      children: {
        type: "Flex",
        className: "h-40 w-full",
        align: "center",
        justify: "center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-muted-foreground",
          children: "Small Container (max-w-3xl)",
        },
      },
    },
  }
);

export const Large: Story = enhanceStoryForDualMode<typeof Container>(
  {
    args: {
      size: "lg",
    },
    render: (args) => (
      <Container {...args} className="bg-card border shadow-sm">
        <div className="h-40 w-full flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">Large Container (max-w-7xl)</p>
        </div>
      </Container>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify container is rendered
      const container = canvas.getByText("Large Container (max-w-7xl)").parentElement?.parentElement;
      expect(container).toBeInTheDocument();

      // Check it has the large size class
      expect(container).toHaveClass("max-w-7xl");

      // Verify container slot attribute
      expect(container).toHaveAttribute("data-slot", "container");
    },
  },
  {
    renderSpec: {
      type: "Container",
      size: "lg",
      className: "bg-card border shadow-sm",
      children: {
        type: "Flex",
        className: "h-40 w-full",
        align: "center",
        justify: "center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-muted-foreground",
          children: "Large Container (max-w-7xl)",
        },
      },
    },
  }
);

export const NoPadding: Story = enhanceStoryForDualMode<typeof Container>(
  {
    args: {
      padding: "none",
    },
    render: (args) => (
      <Container {...args} className="bg-card border shadow-sm">
        <div className="h-40 w-full flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">Container without padding</p>
        </div>
      </Container>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify container is rendered
      const container = canvas.getByText("Container without padding").parentElement?.parentElement;
      expect(container).toBeInTheDocument();

      // Check it has the no padding class
      expect(container).toHaveClass("py-0");

      // Verify container slot attribute
      expect(container).toHaveAttribute("data-slot", "container");
    },
  },
  {
    renderSpec: {
      type: "Container",
      padding: "none",
      className: "bg-card border shadow-sm",
      children: {
        type: "Flex",
        className: "h-40 w-full",
        align: "center",
        justify: "center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-muted-foreground",
          children: "Container without padding",
        },
      },
    },
  }
);

export const CenterAligned: Story = enhanceStoryForDualMode<typeof Container>(
  {
    args: {
      align: "center",
    },
    render: (args) => (
      <Container {...args} className="bg-card border shadow-sm">
        <div className="h-40 w-80 bg-primary-foreground border flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">Center aligned content</p>
        </div>
      </Container>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Verify container is rendered
      const container = canvas.getByText("Center aligned content").parentElement?.parentElement;
      expect(container).toBeInTheDocument();

      // Check it has the center align class
      expect(container).toHaveClass("items-center");

      // Verify container slot attribute
      expect(container).toHaveAttribute("data-slot", "container");
    },
  },
  {
    renderSpec: {
      type: "Container",
      align: "center",
      className: "bg-card border shadow-sm",
      children: {
        type: "Flex",
        className: "h-40 w-80 bg-primary-foreground border",
        align: "center",
        justify: "center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-muted-foreground",
          children: "Center aligned content",
        },
      },
    },
  }
);

export const AsSection: Story = enhanceStoryForDualMode<typeof Container>(
  {
    args: {
      as: "section",
    },
    render: (args) => (
      <Container {...args} className="bg-card border shadow-sm">
        <div className="h-40 w-full flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">
            Rendered as &lt;section&gt; element
          </p>
        </div>
      </Container>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Find the container element
      const container = canvas.getByText(/Rendered as/).parentElement?.parentElement;
      expect(container).toBeInTheDocument();

      // Verify it's rendered as a section element
      expect(container?.tagName).toBe("SECTION");

      // Should still have container variant classes
      expect(container).toHaveClass("mx-auto");
      expect(container).toHaveClass("w-full");
      expect(container).toHaveClass("flex");
      expect(container).toHaveClass("flex-col");
    },
  },
  {
    renderSpec: {
      type: "Container",
      as: "section",
      className: "bg-card border shadow-sm",
      children: {
        type: "Flex",
        className: "h-40 w-full",
        align: "center",
        justify: "center",
        children: {
          type: "Text",
          element: "p",
          className: "text-xl font-medium text-muted-foreground",
          children: "Rendered as <section> element",
        },
      },
    },
  }
);
