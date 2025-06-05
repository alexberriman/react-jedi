import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./container";
import { within, expect } from "storybook/test";

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

export const Default: Story = {
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
};

export const Small: Story = {
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
};

export const Large: Story = {
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
};

export const NoPadding: Story = {
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
};

export const CenterAligned: Story = {
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
};

export const AsSection: Story = {
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
};
