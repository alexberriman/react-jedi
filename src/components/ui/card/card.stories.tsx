import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Components/UI/Card",
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
