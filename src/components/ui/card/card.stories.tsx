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
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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

export const Default: Story = enhanceStoryForDualMode(
  {
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
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "CardHeader",
          children: [
            {
              type: "CardTitle",
              children: "Card Title"
            },
            {
              type: "CardDescription",
              children: "Card description goes here"
            }
          ]
        },
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "Card content goes here."
          }
        },
        {
          type: "CardFooter",
          children: {
            type: "Text",
            children: "Card footer goes here"
          }
        }
      ]
    }
  }
);

export const NoFooter: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test header exists
      const header = canvasElement.querySelector('[data-slot="card-header"]');
      expect(header).toBeInTheDocument();
      
      // Test content exists
      const content = canvasElement.querySelector('[data-slot="card-content"]');
      expect(content).toBeInTheDocument();
      
      // Test footer does not exist
      const footer = canvasElement.querySelector('[data-slot="card-footer"]');
      expect(footer).not.toBeInTheDocument();
      
      // Test text content
      expect(canvas.getByText("Card Title")).toBeInTheDocument();
      expect(canvas.getByText("Card without footer")).toBeInTheDocument();
      expect(canvas.getByText("This card has no footer section.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "CardHeader",
          children: [
            {
              type: "CardTitle",
              children: "Card Title"
            },
            {
              type: "CardDescription",
              children: "Card without footer"
            }
          ]
        },
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "This card has no footer section."
          }
        }
      ]
    }
  }
);

export const NoHeader: Story = enhanceStoryForDualMode(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test header does not exist
      const header = canvasElement.querySelector('[data-slot="card-header"]');
      expect(header).not.toBeInTheDocument();
      
      // Test content exists
      const content = canvasElement.querySelector('[data-slot="card-content"]');
      expect(content).toBeInTheDocument();
      
      // Test footer exists
      const footer = canvasElement.querySelector('[data-slot="card-footer"]');
      expect(footer).toBeInTheDocument();
      
      // Test text content
      expect(canvas.getByText("This card has no header section.")).toBeInTheDocument();
      expect(canvas.getByText("Card footer")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "This card has no header section."
          }
        },
        {
          type: "CardFooter",
          children: {
            type: "Text",
            children: "Card footer"
          }
        }
      ]
    }
  }
);

export const ContentOnly: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Card className="w-[350px]">
        <CardContent>
          <p>This card only has content.</p>
        </CardContent>
      </Card>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test header does not exist
      const header = canvasElement.querySelector('[data-slot="card-header"]');
      expect(header).not.toBeInTheDocument();
      
      // Test content exists
      const content = canvasElement.querySelector('[data-slot="card-content"]');
      expect(content).toBeInTheDocument();
      
      // Test footer does not exist
      const footer = canvasElement.querySelector('[data-slot="card-footer"]');
      expect(footer).not.toBeInTheDocument();
      
      // Test text content
      expect(canvas.getByText("This card only has content.")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: {
        type: "CardContent",
        children: {
          type: "Text",
          children: "This card only has content."
        }
      }
    }
  }
);

export const WithImage: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Card className="w-[350px]">
        <CardImage src="https://placehold.co/350x200/EEE/31343C" alt="Card image" />
        <CardHeader>
          <CardTitle>Card with Image</CardTitle>
          <CardDescription>This card has an image at the top</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Notice there&apos;s no padding at the top of the card when an image is present.</p>
        </CardContent>
      </Card>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test image exists
      const image = canvasElement.querySelector('[data-slot="card-image"]');
      expect(image).toBeInTheDocument();
      
      // Test header exists
      const header = canvasElement.querySelector('[data-slot="card-header"]');
      expect(header).toBeInTheDocument();
      
      // Test content exists
      const content = canvasElement.querySelector('[data-slot="card-content"]');
      expect(content).toBeInTheDocument();
      
      // Test text content
      expect(canvas.getByText("Card with Image")).toBeInTheDocument();
      expect(canvas.getByText("This card has an image at the top")).toBeInTheDocument();
      expect(canvas.getByText(/Notice there's no padding/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "CardImage",
          src: "https://placehold.co/350x200/EEE/31343C",
          alt: "Card image"
        },
        {
          type: "CardHeader",
          children: [
            {
              type: "CardTitle",
              children: "Card with Image"
            },
            {
              type: "CardDescription",
              children: "This card has an image at the top"
            }
          ]
        },
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "Notice there's no padding at the top of the card when an image is present."
          }
        }
      ]
    }
  }
);

export const WithZoomImage: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Card className="w-[350px]">
        <CardImage src="https://placehold.co/350x200/EEE/31343C" alt="Card image" variant="zoom" />
        <CardHeader>
          <CardTitle>Card with Zoom Effect</CardTitle>
          <CardDescription>Hover over the image to see the smooth zoom effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The image zooms smoothly with Framer Motion when you hover over it.</p>
        </CardContent>
      </Card>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test image exists
      const image = canvasElement.querySelector('[data-slot="card-image"]');
      expect(image).toBeInTheDocument();
      
      // Test text content
      expect(canvas.getByText("Card with Zoom Effect")).toBeInTheDocument();
      expect(canvas.getByText(/Hover over the image/)).toBeInTheDocument();
      expect(canvas.getByText(/The image zooms smoothly/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "CardImage",
          src: "https://placehold.co/350x200/EEE/31343C",
          alt: "Card image",
          variant: "zoom"
        },
        {
          type: "CardHeader",
          children: [
            {
              type: "CardTitle",
              children: "Card with Zoom Effect"
            },
            {
              type: "CardDescription",
              children: "Hover over the image to see the smooth zoom effect"
            }
          ]
        },
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "The image zooms smoothly with Framer Motion when you hover over it."
          }
        }
      ]
    }
  }
);

export const WithZoomImageNoAnimation: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Card className="w-[350px]">
        <CardImage
          src="https://placehold.co/350x200/EEE/31343C"
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test image exists
      const image = canvasElement.querySelector('[data-slot="card-image"]');
      expect(image).toBeInTheDocument();
      
      // Test text content
      expect(canvas.getByText("Card with CSS Zoom")).toBeInTheDocument();
      expect(canvas.getByText(/Hover to see CSS-based zoom/)).toBeInTheDocument();
      expect(canvas.getByText(/This uses CSS transitions/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "CardImage",
          src: "https://placehold.co/350x200/EEE/31343C",
          alt: "Card image",
          variant: "zoom",
          animated: false
        },
        {
          type: "CardHeader",
          children: [
            {
              type: "CardTitle",
              children: "Card with CSS Zoom"
            },
            {
              type: "CardDescription",
              children: "Hover to see CSS-based zoom (animations disabled)"
            }
          ]
        },
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "This uses CSS transitions instead of Framer Motion (animated=false)."
          }
        }
      ]
    }
  }
);

export const WithImageOverlay: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <Card className="w-[350px]">
        <div className="relative">
          <CardImage src="https://placehold.co/350x200/EEE/31343C" alt="Card image" overlay />
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test card structure
      const card = canvasElement.querySelector('[data-slot="card"]');
      expect(card).toBeInTheDocument();
      
      // Test image exists
      const image = canvasElement.querySelector('[data-slot="card-image"]');
      expect(image).toBeInTheDocument();
      
      // Test overlay text
      expect(canvas.getByText("Overlay Text")).toBeInTheDocument();
      expect(canvas.getByText("Text over the image")).toBeInTheDocument();
      
      // Test card content
      expect(canvas.getByText("Card with Image Overlay")).toBeInTheDocument();
      expect(canvas.getByText(/The image has a gradient overlay/)).toBeInTheDocument();
      expect(canvas.getByText(/You can place text over the image/)).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Card",
      className: "w-[350px]",
      children: [
        {
          type: "Box",
          className: "relative",
          children: [
            {
              type: "CardImage",
              src: "https://placehold.co/350x200/EEE/31343C",
              alt: "Card image",
              overlay: true
            },
            {
              type: "Box",
              className: "absolute bottom-4 left-4 text-white",
              children: [
                {
                  type: "Heading",
                  level: "h3",
                  className: "text-xl font-bold",
                  children: "Overlay Text"
                },
                {
                  type: "Text",
                  className: "text-sm",
                  children: "Text over the image"
                }
              ]
            }
          ]
        },
        {
          type: "CardHeader",
          children: [
            {
              type: "CardTitle",
              children: "Card with Image Overlay"
            },
            {
              type: "CardDescription",
              children: "The image has a gradient overlay for text readability"
            }
          ]
        },
        {
          type: "CardContent",
          children: {
            type: "Text",
            children: "You can place text over the image with the overlay enabled."
          }
        }
      ]
    }
  }
);

export const MultipleCards: Story = enhanceStoryForDualMode(
  {
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardImage src="https://placehold.co/300x200/EEE/31343C" alt="Card 1" variant="zoom" />
          <CardHeader>
            <CardTitle>First Card</CardTitle>
            <CardDescription>With zoom effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for the first card.</p>
          </CardContent>
        </Card>
        <Card>
          <CardImage src="https://placehold.co/300x200/EEE/31343C" alt="Card 2" />
          <CardHeader>
            <CardTitle>Second Card</CardTitle>
            <CardDescription>Standard image</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for the second card.</p>
          </CardContent>
        </Card>
        <Card>
          <CardImage src="https://placehold.co/300x200/EEE/31343C" alt="Card 3" overlay />
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all three cards exist
      const cards = canvasElement.querySelectorAll('[data-slot="card"]');
      expect(cards).toHaveLength(3);
      
      // Test first card
      expect(canvas.getByText("First Card")).toBeInTheDocument();
      expect(canvas.getByText("With zoom effect")).toBeInTheDocument();
      expect(canvas.getByText("Content for the first card.")).toBeInTheDocument();
      
      // Test second card
      expect(canvas.getByText("Second Card")).toBeInTheDocument();
      expect(canvas.getByText("Standard image")).toBeInTheDocument();
      expect(canvas.getByText("Content for the second card.")).toBeInTheDocument();
      
      // Test third card
      expect(canvas.getByText("Third Card")).toBeInTheDocument();
      expect(canvas.getByText("With overlay")).toBeInTheDocument();
      expect(canvas.getByText("Content for the third card.")).toBeInTheDocument();
      
      // Test all images exist
      const images = canvasElement.querySelectorAll('[data-slot="card-image"]');
      expect(images).toHaveLength(3);
    },
  },
  {
    renderSpec: {
      type: "Grid",
      columns: { default: 1, md: 3 },
      gap: "md",
      children: [
        {
          type: "Card",
          children: [
            {
              type: "CardImage",
              src: "https://placehold.co/300x200/EEE/31343C",
              alt: "Card 1",
              variant: "zoom"
            },
            {
              type: "CardHeader",
              children: [
                {
                  type: "CardTitle",
                  children: "First Card"
                },
                {
                  type: "CardDescription",
                  children: "With zoom effect"
                }
              ]
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Content for the first card."
              }
            }
          ]
        },
        {
          type: "Card",
          children: [
            {
              type: "CardImage",
              src: "https://placehold.co/300x200/EEE/31343C",
              alt: "Card 2"
            },
            {
              type: "CardHeader",
              children: [
                {
                  type: "CardTitle",
                  children: "Second Card"
                },
                {
                  type: "CardDescription",
                  children: "Standard image"
                }
              ]
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Content for the second card."
              }
            }
          ]
        },
        {
          type: "Card",
          children: [
            {
              type: "CardImage",
              src: "https://placehold.co/300x200/EEE/31343C",
              alt: "Card 3",
              overlay: true
            },
            {
              type: "CardHeader",
              children: [
                {
                  type: "CardTitle",
                  children: "Third Card"
                },
                {
                  type: "CardDescription",
                  children: "With overlay"
                }
              ]
            },
            {
              type: "CardContent",
              children: {
                type: "Text",
                children: "Content for the third card."
              }
            }
          ]
        }
      ]
    }
  }
);
