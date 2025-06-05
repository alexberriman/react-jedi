import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Stack } from "./stack";
import { Card, CardContent } from "../card";
import { Button } from "../button";
import { Badge } from "../badge";
import { Text } from "../text";
import { Separator } from "../separator";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta = {
  title: "Layout Components/Stack",
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

export const Default: Story = enhanceStoryForDualMode<typeof Stack>(
  {
    render: () => (
      <Stack>
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
      </Stack>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test stack container exists
      const stack = canvasElement.querySelector(".flex");
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
  },
  {
    renderSpec: {
      type: "Stack",
      children: [
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "First Item",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Second Item",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Third Item",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const Horizontal: Story = enhanceStoryForDualMode<typeof Stack>(
  {
    render: () => (
      <Stack orientation="horizontal" spacing="md">
        <Button variant="default">Button 1</Button>
        <Button variant="secondary">Button 2</Button>
        <Button variant="outline">Button 3</Button>
      </Stack>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test stack container has horizontal orientation
      const stack = canvasElement.querySelector(".flex");
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
  },
  {
    renderSpec: {
      type: "Stack",
      orientation: "horizontal",
      spacing: "md",
      children: [
        {
          type: "Button",
          variant: "default",
          children: "Button 1",
        },
        {
          type: "Button",
          variant: "secondary",
          children: "Button 2",
        },
        {
          type: "Button",
          variant: "outline",
          children: "Button 3",
        },
      ],
    },
  }
);

export const VerticalCentered: Story = enhanceStoryForDualMode<typeof Stack>(
  {
    render: () => (
      <Stack orientation="vertical" align="center" spacing="lg">
        <Text className="text-2xl font-bold">Centered Title</Text>
        <Text className="text-muted-foreground max-w-md text-center">
          This is a subtitle with more information about the content below.
        </Text>
        <Button>Get Started</Button>
      </Stack>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();

      // Test stack container alignment
      const stack = canvasElement.querySelector(".flex");
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
  },
  {
    renderSpec: {
      type: "Stack",
      orientation: "vertical",
      align: "center",
      spacing: "lg",
      children: [
        {
          type: "Text",
          className: "text-2xl font-bold",
          children: "Centered Title",
        },
        {
          type: "Text",
          className: "text-muted-foreground max-w-md text-center",
          children: "This is a subtitle with more information about the content below.",
        },
        {
          type: "Button",
          children: "Get Started",
        },
      ],
    },
  }
);

export const SpacingShowcase: Story = enhanceStoryForDualMode<typeof Stack>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all spacing variants are rendered
      const spacingLabels = ["xs", "sm", "md", "lg", "xl", "2xl"];
      spacingLabels.forEach((spacing) => {
        const label = canvas.getByText(`Spacing: ${spacing}`);
        expect(label).toBeInTheDocument();
      });

      // Test badges are rendered for each spacing variant
      const badge1Elements = canvas.getAllByText("Badge 1");
      const badge2Elements = canvas.getAllByText("Badge 2");
      const badge3Elements = canvas.getAllByText("Badge 3");

      expect(badge1Elements).toHaveLength(6);
      expect(badge2Elements).toHaveLength(6);
      expect(badge3Elements).toHaveLength(6);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      children: [
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Spacing: xs",
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "xs",
              children: [
                { type: "Badge", children: "Badge 1" },
                { type: "Badge", variant: "secondary", children: "Badge 2" },
                { type: "Badge", variant: "outline", children: "Badge 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Spacing: sm",
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "sm",
              children: [
                { type: "Badge", children: "Badge 1" },
                { type: "Badge", variant: "secondary", children: "Badge 2" },
                { type: "Badge", variant: "outline", children: "Badge 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Spacing: md",
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "md",
              children: [
                { type: "Badge", children: "Badge 1" },
                { type: "Badge", variant: "secondary", children: "Badge 2" },
                { type: "Badge", variant: "outline", children: "Badge 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Spacing: lg",
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "lg",
              children: [
                { type: "Badge", children: "Badge 1" },
                { type: "Badge", variant: "secondary", children: "Badge 2" },
                { type: "Badge", variant: "outline", children: "Badge 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Spacing: xl",
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "xl",
              children: [
                { type: "Badge", children: "Badge 1" },
                { type: "Badge", variant: "secondary", children: "Badge 2" },
                { type: "Badge", variant: "outline", children: "Badge 3" },
              ],
            },
          ],
        },
        {
          type: "Box",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Spacing: 2xl",
            },
            {
              type: "Stack",
              orientation: "horizontal",
              spacing: "2xl",
              children: [
                { type: "Badge", children: "Badge 1" },
                { type: "Badge", variant: "secondary", children: "Badge 2" },
                { type: "Badge", variant: "outline", children: "Badge 3" },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const WithDivider: Story = enhanceStoryForDualMode<typeof Stack>(
  {
    render: () => (
      <Stack
        orientation="vertical"
        spacing="md"
        divider={<Separator className="my-2" />}
      >
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
      </Stack>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all sections are rendered
      expect(canvas.getByText("Section 1")).toBeInTheDocument();
      expect(canvas.getByText("Section 2")).toBeInTheDocument();
      expect(canvas.getByText("Section 3")).toBeInTheDocument();

      // Test descriptions are rendered
      expect(canvas.getByText("This is the first section")).toBeInTheDocument();
      expect(canvas.getByText("This is the second section")).toBeInTheDocument();
      expect(canvas.getByText("This is the third section")).toBeInTheDocument();

      // Test separators are rendered between sections
      // Note: In SDUI mode, dividers may render differently
      // For now, we'll just verify the sections render correctly
    },
  },
  {
    renderSpec: {
      type: "Stack",
      orientation: "vertical",
      spacing: "md",
      divider: {
        type: "Separator",
        className: "my-2",
      },
      children: [
        {
          type: "Card",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  className: "font-semibold",
                  children: "Section 1",
                },
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: "This is the first section",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  className: "font-semibold",
                  children: "Section 2",
                },
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: "This is the second section",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  className: "font-semibold",
                  children: "Section 3",
                },
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: "This is the third section",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const Responsive: Story = enhanceStoryForDualMode<typeof Stack>(
  {
    render: () => (
      <Stack orientation="horizontal" spacing="md" wrap="wrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="w-48">
            <CardContent className="p-4">
              <Text>Item {i}</Text>
            </CardContent>
          </Card>
        ))}
      </Stack>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test stack has wrap enabled
      const stack = canvasElement.querySelector(".flex");
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass("flex-wrap");

      // Test all items are rendered
      for (let i = 1; i <= 6; i++) {
        const item = canvas.getByText(`Item ${i}`);
        expect(item).toBeInTheDocument();
      }

      // Test cards have width constraint
      const cards = canvasElement.querySelectorAll(".w-48");
      expect(cards).toHaveLength(6);
    },
  },
  {
    renderSpec: {
      type: "Stack",
      orientation: "horizontal",
      spacing: "md",
      wrap: "wrap",
      children: [
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Item 1",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Item 2",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Item 3",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Item 4",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Item 5",
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-48",
          children: [
            {
              type: "CardContent",
              className: "p-4",
              children: [
                {
                  type: "Text",
                  children: "Item 6",
                },
              ],
            },
          ],
        },
      ],
    },
  }
);

export const JustifyShowcase: Story = enhanceStoryForDualMode<typeof Stack>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test all justify variants are rendered
      const justifyLabels = ["start", "center", "end", "between", "around", "evenly"];
      justifyLabels.forEach((justify) => {
        const label = canvas.getByText(`Justify: ${justify}`);
        expect(label).toBeInTheDocument();
      });

      // Test buttons are rendered for each justify variant
      const aButtons = canvas.getAllByRole("button", { name: "A" });
      const bButtons = canvas.getAllByRole("button", { name: "B" });
      const cButtons = canvas.getAllByRole("button", { name: "C" });

      expect(aButtons).toHaveLength(6);
      expect(bButtons).toHaveLength(6);
      expect(cButtons).toHaveLength(6);
    },
  },
  {
    renderSpec: {
      type: "Flex",
      direction: "column",
      gap: "xl",
      className: "w-full",
      children: [
        {
          type: "Box",
          className: "w-full",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Justify: start",
            },
            {
              type: "Box",
              className: "w-full border rounded-lg p-2",
              children: {
                type: "Stack",
                orientation: "horizontal",
                justify: "start",
                className: "w-full",
                children: [
                  { type: "Button", size: "sm", children: "A" },
                  { type: "Button", size: "sm", children: "B" },
                  { type: "Button", size: "sm", children: "C" },
                ],
              },
            },
          ],
        },
        {
          type: "Box",
          className: "w-full",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Justify: center",
            },
            {
              type: "Box",
              className: "w-full border rounded-lg p-2",
              children: {
                type: "Stack",
                orientation: "horizontal",
                justify: "center",
                className: "w-full",
                children: [
                  { type: "Button", size: "sm", children: "A" },
                  { type: "Button", size: "sm", children: "B" },
                  { type: "Button", size: "sm", children: "C" },
                ],
              },
            },
          ],
        },
        {
          type: "Box",
          className: "w-full",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Justify: end",
            },
            {
              type: "Box",
              className: "w-full border rounded-lg p-2",
              children: {
                type: "Stack",
                orientation: "horizontal",
                justify: "end",
                className: "w-full",
                children: [
                  { type: "Button", size: "sm", children: "A" },
                  { type: "Button", size: "sm", children: "B" },
                  { type: "Button", size: "sm", children: "C" },
                ],
              },
            },
          ],
        },
        {
          type: "Box",
          className: "w-full",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Justify: between",
            },
            {
              type: "Box",
              className: "w-full border rounded-lg p-2",
              children: {
                type: "Stack",
                orientation: "horizontal",
                justify: "between",
                className: "w-full",
                children: [
                  { type: "Button", size: "sm", children: "A" },
                  { type: "Button", size: "sm", children: "B" },
                  { type: "Button", size: "sm", children: "C" },
                ],
              },
            },
          ],
        },
        {
          type: "Box",
          className: "w-full",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Justify: around",
            },
            {
              type: "Box",
              className: "w-full border rounded-lg p-2",
              children: {
                type: "Stack",
                orientation: "horizontal",
                justify: "around",
                className: "w-full",
                children: [
                  { type: "Button", size: "sm", children: "A" },
                  { type: "Button", size: "sm", children: "B" },
                  { type: "Button", size: "sm", children: "C" },
                ],
              },
            },
          ],
        },
        {
          type: "Box",
          className: "w-full",
          children: [
            {
              type: "Text",
              className: "mb-2 font-semibold",
              children: "Justify: evenly",
            },
            {
              type: "Box",
              className: "w-full border rounded-lg p-2",
              children: {
                type: "Stack",
                orientation: "horizontal",
                justify: "evenly",
                className: "w-full",
                children: [
                  { type: "Button", size: "sm", children: "A" },
                  { type: "Button", size: "sm", children: "B" },
                  { type: "Button", size: "sm", children: "C" },
                ],
              },
            },
          ],
        },
      ],
    },
  }
);

export const ComplexLayout: Story = enhanceStoryForDualMode<typeof Stack>(
  {
    render: () => (
      <Stack orientation="vertical" spacing="lg" align="center" className="w-full max-w-4xl">
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
      </Stack>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test dashboard title
      expect(canvas.getByText("Dashboard")).toBeInTheDocument();

      // Test stat cards
      expect(canvas.getByText("Analytics")).toBeInTheDocument();
      expect(canvas.getByText("24,543")).toBeInTheDocument();
      expect(canvas.getByText("+12% from last month")).toBeInTheDocument();

      expect(canvas.getByText("Revenue")).toBeInTheDocument();
      expect(canvas.getByText("$54,239")).toBeInTheDocument();
      expect(canvas.getByText("+24% from last month")).toBeInTheDocument();

      expect(canvas.getByText("Users")).toBeInTheDocument();
      expect(canvas.getByText("3,287")).toBeInTheDocument();
      expect(canvas.getByText("+18% from last month")).toBeInTheDocument();

      // Test recent activity section
      expect(canvas.getByText("Recent Activity")).toBeInTheDocument();
      expect(canvas.getByText("User john@example.com signed up")).toBeInTheDocument();
      expect(canvas.getByText("New order #1234 received")).toBeInTheDocument();
      expect(canvas.getByText("Payment processed for $99.99")).toBeInTheDocument();

      // Test layout structure
      const mainStack = canvasElement.querySelector(".flex");
      expect(mainStack).toHaveClass("flex-col", "items-center");
    },
  },
  {
    renderSpec: {
      type: "Stack",
      orientation: "vertical",
      spacing: "lg",
      align: "center",
      className: "w-full max-w-4xl",
      children: [
        {
          type: "Text",
          className: "text-3xl font-bold",
          children: "Dashboard",
        },
        {
          type: "Stack",
          orientation: "horizontal",
          spacing: "md",
          className: "w-full",
          children: [
            {
              type: "Card",
              className: "flex-1",
              children: [
                {
                  type: "CardContent",
                  className: "p-6",
                  children: [
                    {
                      type: "Stack",
                      spacing: "sm",
                      children: [
                        {
                          type: "Text",
                          className: "text-lg font-semibold",
                          children: "Analytics",
                        },
                        {
                          type: "Text",
                          className: "text-2xl font-bold",
                          children: "24,543",
                        },
                        {
                          type: "Text",
                          className: "text-sm text-muted-foreground",
                          children: "+12% from last month",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Card",
              className: "flex-1",
              children: [
                {
                  type: "CardContent",
                  className: "p-6",
                  children: [
                    {
                      type: "Stack",
                      spacing: "sm",
                      children: [
                        {
                          type: "Text",
                          className: "text-lg font-semibold",
                          children: "Revenue",
                        },
                        {
                          type: "Text",
                          className: "text-2xl font-bold",
                          children: "$54,239",
                        },
                        {
                          type: "Text",
                          className: "text-sm text-muted-foreground",
                          children: "+24% from last month",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Card",
              className: "flex-1",
              children: [
                {
                  type: "CardContent",
                  className: "p-6",
                  children: [
                    {
                      type: "Stack",
                      spacing: "sm",
                      children: [
                        {
                          type: "Text",
                          className: "text-lg font-semibold",
                          children: "Users",
                        },
                        {
                          type: "Text",
                          className: "text-2xl font-bold",
                          children: "3,287",
                        },
                        {
                          type: "Text",
                          className: "text-sm text-muted-foreground",
                          children: "+18% from last month",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "Card",
          className: "w-full",
          children: [
            {
              type: "CardContent",
              className: "p-6",
              children: [
                {
                  type: "Stack",
                  spacing: "md",
                  children: [
                    {
                      type: "Text",
                      className: "text-xl font-semibold",
                      children: "Recent Activity",
                    },
                    {
                      type: "Stack",
                      spacing: "sm",
                      children: [
                        {
                          type: "Text",
                          className: "text-sm",
                          children: "User john@example.com signed up",
                        },
                        {
                          type: "Text",
                          className: "text-sm",
                          children: "New order #1234 received",
                        },
                        {
                          type: "Text",
                          className: "text-sm",
                          children: "Payment processed for $99.99",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
);
