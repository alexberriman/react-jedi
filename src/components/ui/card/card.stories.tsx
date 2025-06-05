import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImage,
} from "./card";

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

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardImage src="https://picsum.photos/350/200" alt="Card image" />
      <CardHeader>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>This card has an image at the top</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Notice there&apos;s no padding at the top of the card when an image is present.</p>
      </CardContent>
    </Card>
  ),
};

export const WithZoomImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardImage src="https://picsum.photos/350/200" alt="Card image" variant="zoom" />
      <CardHeader>
        <CardTitle>Card with Zoom Effect</CardTitle>
        <CardDescription>Hover over the image to see the smooth zoom effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The image zooms smoothly with Framer Motion when you hover over it.</p>
      </CardContent>
    </Card>
  ),
};

export const WithZoomImageNoAnimation: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardImage
        src="https://picsum.photos/350/200"
        alt="Card image"
        variant="zoom"
        animated={false}
      />
      <CardHeader>
        <CardTitle>Card with CSS Zoom</CardTitle>
        <CardDescription>Hover to see CSS-based zoom (animations disabled)</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This uses CSS transitions instead of Framer Motion (animated=false).</p>
      </CardContent>
    </Card>
  ),
};

export const WithImageOverlay: Story = {
  render: () => (
    <Card className="w-[350px]">
      <div className="relative">
        <CardImage src="https://picsum.photos/350/200" alt="Card image" overlay />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">Overlay Text</h3>
          <p className="text-sm">Text over the image</p>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Card with Image Overlay</CardTitle>
        <CardDescription>The image has a gradient overlay for text readability</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You can place text over the image with the overlay enabled.</p>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardImage src="https://picsum.photos/300/200?random=1" alt="Card 1" variant="zoom" />
        <CardHeader>
          <CardTitle>First Card</CardTitle>
          <CardDescription>With zoom effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the first card.</p>
        </CardContent>
      </Card>
      <Card>
        <CardImage src="https://picsum.photos/300/200?random=2" alt="Card 2" />
        <CardHeader>
          <CardTitle>Second Card</CardTitle>
          <CardDescription>Standard image</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the second card.</p>
        </CardContent>
      </Card>
      <Card>
        <CardImage src="https://picsum.photos/300/200?random=3" alt="Card 3" overlay />
        <CardHeader>
          <CardTitle>Third Card</CardTitle>
          <CardDescription>With overlay</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for the third card.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
