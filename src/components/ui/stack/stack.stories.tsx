import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Stack } from "./stack";
import { Card, CardContent } from "../card";
import { Button } from "../button";
import { Badge } from "../badge";
import { Text } from "../text";
import { Separator } from "../separator";

const meta = {
  title: "Components/Layout/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    spacing: {
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      control: { type: "select" },
    },
    align: {
      options: ["start", "center", "end", "stretch", "baseline"],
      control: { type: "select" },
    },
    justify: {
      options: ["start", "center", "end", "between", "around", "evenly"],
      control: { type: "select" },
    },
    wrap: {
      options: ["wrap", "nowrap", "wrap-reverse"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Card className="w-48">
          <CardContent className="p-4">
            <Text>First Item</Text>
          </CardContent>
        </Card>
        <Card className="w-48">
          <CardContent className="p-4">
            <Text>Second Item</Text>
          </CardContent>
        </Card>
        <Card className="w-48">
          <CardContent className="p-4">
            <Text>Third Item</Text>
          </CardContent>
        </Card>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test stack container exists
    const stack = canvasElement.querySelector('.flex');
    expect(stack).toBeInTheDocument();

    // Test all three cards are rendered
    const cards = canvas.getAllByText(/Item/);
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveTextContent("First Item");
    expect(cards[1]).toHaveTextContent("Second Item");
    expect(cards[2]).toHaveTextContent("Third Item");

    // Test default vertical orientation (flex-col class)
    expect(stack).toHaveClass("flex-col");
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    spacing: "md",
    children: (
      <>
        <Button variant="default">Button 1</Button>
        <Button variant="secondary">Button 2</Button>
        <Button variant="outline">Button 3</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test stack container has horizontal orientation
    const stack = canvasElement.querySelector('.flex');
    expect(stack).toBeInTheDocument();
    expect(stack).toHaveClass("flex-row");

    // Test all buttons are rendered and clickable
    const button1 = canvas.getByRole("button", { name: "Button 1" });
    const button2 = canvas.getByRole("button", { name: "Button 2" });
    const button3 = canvas.getByRole("button", { name: "Button 3" });

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();

    // Test button variants
    expect(button1).toHaveClass("bg-primary");
    expect(button2).toHaveClass("bg-secondary");
    expect(button3).toHaveClass("border", "border-input");

    // Test button interactions
    await user.click(button1);
    await user.click(button2);
    await user.click(button3);

    // Test spacing is applied
    expect(stack).toHaveClass("gap-4"); // md spacing
  },
};

export const VerticalCentered: Story = {
  args: {
    orientation: "vertical",
    align: "center",
    spacing: "lg",
    children: (
      <>
        <Text className="text-2xl font-bold">Centered Title</Text>
        <Text className="text-muted-foreground max-w-md text-center">
          This is a subtitle with more information about the content below.
        </Text>
        <Button>Get Started</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test stack container alignment
    const stack = canvasElement.querySelector('.flex');
    expect(stack).toBeInTheDocument();
    expect(stack).toHaveClass("flex-col", "items-center");

    // Test content is rendered
    const title = canvas.getByText("Centered Title");
    const subtitle = canvas.getByText(/This is a subtitle/);
    const button = canvas.getByRole("button", { name: "Get Started" });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // Test large spacing
    expect(stack).toHaveClass("gap-6"); // lg spacing

    // Test button interaction
    await user.click(button);

    // Test title styling
    expect(title).toHaveClass("text-2xl", "font-bold");
  },
};

export const SpacingShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((spacing) => (
        <div key={spacing}>
          <Text className="mb-2 font-semibold">Spacing: {spacing}</Text>
          <Stack orientation="horizontal" spacing={spacing}>
            <Badge>Badge 1</Badge>
            <Badge variant="secondary">Badge 2</Badge>
            <Badge variant="outline">Badge 3</Badge>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const WithDivider: Story = {
  args: {
    orientation: "vertical",
    spacing: "md",
    divider: <Separator className="my-2" />,
    children: (
      <>
        <Card>
          <CardContent className="p-4">
            <Text className="font-semibold">Section 1</Text>
            <Text className="text-sm text-muted-foreground">This is the first section</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text className="font-semibold">Section 2</Text>
            <Text className="text-sm text-muted-foreground">This is the second section</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text className="font-semibold">Section 3</Text>
            <Text className="text-sm text-muted-foreground">This is the third section</Text>
          </CardContent>
        </Card>
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    orientation: "horizontal",
    spacing: "md",
    wrap: "wrap",
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="w-48">
            <CardContent className="p-4">
              <Text>Item {i}</Text>
            </CardContent>
          </Card>
        ))}
      </>
    ),
  },
};

export const JustifyShowcase: Story = {
  render: () => (
    <div className="space-y-8 w-full">
      {(["start", "center", "end", "between", "around", "evenly"] as const).map((justify) => (
        <div key={justify} className="w-full">
          <Text className="mb-2 font-semibold">Justify: {justify}</Text>
          <div className="w-full border rounded-lg p-2">
            <Stack orientation="horizontal" justify={justify} className="w-full">
              <Button size="sm">A</Button>
              <Button size="sm">B</Button>
              <Button size="sm">C</Button>
            </Stack>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ComplexLayout: Story = {
  args: {
    orientation: "vertical",
    spacing: "lg",
    align: "center",
    className: "w-full max-w-4xl",
    children: (
      <>
        <Text className="text-3xl font-bold">Dashboard</Text>
        <Stack orientation="horizontal" spacing="md" className="w-full">
          <Card className="flex-1">
            <CardContent className="p-6">
              <Stack spacing="sm">
                <Text className="text-lg font-semibold">Analytics</Text>
                <Text className="text-2xl font-bold">24,543</Text>
                <Text className="text-sm text-muted-foreground">+12% from last month</Text>
              </Stack>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-6">
              <Stack spacing="sm">
                <Text className="text-lg font-semibold">Revenue</Text>
                <Text className="text-2xl font-bold">$54,239</Text>
                <Text className="text-sm text-muted-foreground">+24% from last month</Text>
              </Stack>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-6">
              <Stack spacing="sm">
                <Text className="text-lg font-semibold">Users</Text>
                <Text className="text-2xl font-bold">3,287</Text>
                <Text className="text-sm text-muted-foreground">+18% from last month</Text>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <Card className="w-full">
          <CardContent className="p-6">
            <Stack spacing="md">
              <Text className="text-xl font-semibold">Recent Activity</Text>
              <Stack spacing="sm">
                <Text className="text-sm">User john@example.com signed up</Text>
                <Text className="text-sm">New order #1234 received</Text>
                <Text className="text-sm">Payment processed for $99.99</Text>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </>
    ),
  },
};
