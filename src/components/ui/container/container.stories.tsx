import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./container";

const meta = {
  title: "UI/Container",
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
};
