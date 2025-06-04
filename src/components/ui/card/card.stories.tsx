import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer goes here</p>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test card structure
    const card = canvasElement.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("w-[350px]");
    
    // Test header section
    const header = canvasElement.querySelector('[data-slot="card-header"]');
    expect(header).toBeInTheDocument();
    
    // Test title
    const title = canvas.getByText("Card Title");
    expect(title).toBeInTheDocument();
    const titleElement = canvasElement.querySelector('[data-slot="card-title"]');
    expect(titleElement).toBeInTheDocument();
    
    // Test description
    const description = canvas.getByText("Card description goes here");
    expect(description).toBeInTheDocument();
    const descriptionElement = canvasElement.querySelector('[data-slot="card-description"]');
    expect(descriptionElement).toBeInTheDocument();
    
    // Test content section
    const content = canvasElement.querySelector('[data-slot="card-content"]');
    expect(content).toBeInTheDocument();
    expect(canvas.getByText("Card content goes here.")).toBeInTheDocument();
    
    // Test footer section
    const footer = canvasElement.querySelector('[data-slot="card-footer"]');
    expect(footer).toBeInTheDocument();
    expect(canvas.getByText("Card footer goes here")).toBeInTheDocument();
  },
};

export const NoFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card without footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has no footer section.</p>
      </CardContent>
    </Card>
  ),
};

export const NoHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>This card has no header section.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>This card only has content.</p>
      </CardContent>
    </Card>
  ),
};
