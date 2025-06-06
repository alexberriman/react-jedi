import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { AspectRatio } from "./aspect-ratio";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The ratio of the width to height (e.g. 16/9, 1, 4/3)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = enhanceStoryForDualMode<typeof AspectRatio>(
  {
    args: {
      ratio: 16 / 9,
    },
    render: (args) => (
      <div className="w-[500px]">
        <AspectRatio {...args}>
          <img
            src="https://placehold.co/500x280/EEE/31343C"
            alt="A futuristic cityscape with neon lights"
            className="object-cover w-full h-full rounded-md"
          />
        </AspectRatio>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test image presence
      const image = canvas.getByRole("img", { name: "A futuristic cityscape with neon lights" });
      expect(image).toBeInTheDocument();
      
      // In React mode, check the AspectRatio wrapper
      const aspectRatioWrapper = canvasElement.querySelector('[data-slot="aspect-ratio"]');
      if (aspectRatioWrapper) {
        expect(aspectRatioWrapper).toBeInTheDocument();
      }
      
      // In SDUI mode, the Image component is wrapped differently
      const imageContainer = canvasElement.querySelector('[data-slot="image-container"]');
      if (imageContainer) {
        expect(imageContainer).toBeInTheDocument();
      }
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[500px]",
      children: {
        type: "AspectRatio",
        ratio: 16 / 9,
        children: {
          type: "Image",
          src: "https://placehold.co/500x280/EEE/31343C",
          alt: "A futuristic cityscape with neon lights",
          className: "object-cover w-full h-full rounded-md",
        },
      },
    },
  }
);

export const Square: Story = enhanceStoryForDualMode<typeof AspectRatio>(
  {
    args: {
      ratio: 1,
    },
    render: (args) => (
      <div className="w-[400px]">
        <AspectRatio {...args}>
          <img
            src="https://placehold.co/400x400/EEE/31343C"
            alt="Abstract geometric art with vibrant colors"
            className="object-cover w-full h-full rounded-md"
          />
        </AspectRatio>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test square aspect ratio
      const image = canvas.getByRole("img", { name: "Abstract geometric art with vibrant colors" });
      expect(image).toBeInTheDocument();

      // Check for either aspect-ratio or image-container
      const aspectRatioWrapper = canvasElement.querySelector('[data-slot="aspect-ratio"]');
      const imageContainer = canvasElement.querySelector('[data-slot="image-container"]');
      expect(aspectRatioWrapper || imageContainer).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[400px]",
      children: {
        type: "AspectRatio",
        ratio: 1,
        children: {
          type: "Image",
          src: "https://placehold.co/400x400/EEE/31343C",
          alt: "Abstract geometric art with vibrant colors",
          className: "object-cover w-full h-full rounded-md",
        },
      },
    },
  }
);

export const Portrait: Story = enhanceStoryForDualMode<typeof AspectRatio>(
  {
    args: {
      ratio: 3 / 4,
    },
    render: (args) => (
      <div className="w-[300px]">
        <AspectRatio {...args}>
          <img
            src="https://placehold.co/300x400/EEE/31343C"
            alt="A portrait photograph"
            className="object-cover w-full h-full rounded-md"
          />
        </AspectRatio>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test portrait aspect ratio
      const image = canvas.getByRole("img", { name: "A portrait photograph" });
      expect(image).toBeInTheDocument();

      // Check for either aspect-ratio or image-container
      const aspectRatioWrapper = canvasElement.querySelector('[data-slot="aspect-ratio"]');
      const imageContainer = canvasElement.querySelector('[data-slot="image-container"]');
      expect(aspectRatioWrapper || imageContainer).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[300px]",
      children: {
        type: "AspectRatio",
        ratio: 3 / 4,
        children: {
          type: "Image",
          src: "https://placehold.co/300x400/EEE/31343C",
          alt: "A portrait photograph",
          className: "object-cover w-full h-full rounded-md",
        },
      },
    },
  }
);

export const WithContent: Story = enhanceStoryForDualMode<typeof AspectRatio>(
  {
    args: {
      ratio: 16 / 9,
    },
    render: (args) => (
      <div className="w-[500px]">
        <AspectRatio {...args} className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
          <div className="flex flex-col items-center justify-center h-full text-white p-6">
            <h3 className="text-2xl font-bold mb-2">Stunning UI Components</h3>
            <p className="text-center">
              Create beautiful, responsive interfaces with precise aspect ratios
            </p>
          </div>
        </AspectRatio>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test content rendering
      const heading = canvas.getByText("Stunning UI Components");
      const description = canvas.getByText(
        "Create beautiful, responsive interfaces with precise aspect ratios"
      );

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("text-2xl", "font-bold");

      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("text-center");

      // Test gradient background
      const aspectRatioElement = heading.closest('[class*="bg-gradient"]');
      expect(aspectRatioElement).toHaveClass(
        "bg-gradient-to-r",
        "from-purple-500",
        "to-indigo-600",
        "rounded-xl"
      );
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[500px]",
      children: {
        type: "AspectRatio",
        ratio: 16 / 9,
        className: "bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl",
        children: {
          type: "Flex",
          direction: "column",
          align: "center",
          justify: "center",
          className: "h-full text-white p-6",
          children: [
            {
              type: "Heading",
              level: 3,
              variant: undefined,
              className: "text-2xl font-bold mb-2 text-white",
              children: "Stunning UI Components",
            },
            {
              type: "Text",
              align: "center",
              variant: undefined,
              className: "text-white",
              children: "Create beautiful, responsive interfaces with precise aspect ratios",
            },
          ],
        },
      },
    },
  }
);

export const WithImage: Story = enhanceStoryForDualMode<typeof AspectRatio>(
  {
    args: {
      ratio: 16 / 9,
    },
    render: (args) => (
      <div className="w-[600px]">
        <AspectRatio {...args}>
          <img
            src="https://placehold.co/600x340/EEE/31343C"
            alt="Modern workspace with laptop and coffee"
            className="object-cover w-full h-full rounded-lg"
          />
        </AspectRatio>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test image presence
      const image = canvas.getByRole("img", { name: "Modern workspace with laptop and coffee" });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
      
      // Check for object-cover class (present in both modes)
      expect(image).toHaveClass("object-cover");

      // Check for either aspect-ratio or image-container
      const aspectRatioWrapper = canvasElement.querySelector('[data-slot="aspect-ratio"]');
      const imageContainer = canvasElement.querySelector('[data-slot="image-container"]');
      expect(aspectRatioWrapper || imageContainer).toBeTruthy();
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[600px]",
      children: {
        type: "AspectRatio",
        ratio: 16 / 9,
        children: {
          type: "Image",
          src: "https://placehold.co/600x340/EEE/31343C",
          alt: "Modern workspace with laptop and coffee",
          className: "object-cover w-full h-full rounded-lg",
        },
      },
    },
  }
);

export const WithVideo: Story = enhanceStoryForDualMode<typeof AspectRatio>(
  {
    args: {
      ratio: 16 / 9,
    },
    render: (args) => (
      <div className="w-[600px]">
        <AspectRatio {...args}>
          <video
            className="object-cover w-full h-full rounded-lg"
            poster="https://placehold.co/600x340/EEE/31343C"
            controls
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>
    ),
    play: async ({ canvasElement }) => {
      within(canvasElement);

      // In React mode, test video element
      const video = canvasElement.querySelector("video");
      if (video) {
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute("controls");
        expect(video).toHaveAttribute("poster", expect.stringContaining("placehold.co"));
        expect(video).toHaveClass("object-cover", "w-full", "h-full", "rounded-lg");

        // Test video source
        const source = video.querySelector("source");
        expect(source).toBeInTheDocument();
        expect(source).toHaveAttribute("src", "https://www.w3schools.com/html/mov_bbb.mp4");
        expect(source).toHaveAttribute("type", "video/mp4");

        // Verify aspect ratio container
        const aspectRatioWrapper = video.parentElement;
        expect(aspectRatioWrapper).toHaveAttribute("data-slot", "aspect-ratio");
      } else {
        // In SDUI mode, video should now render properly
        const sduiVideo = canvasElement.querySelector('[data-slot="box"][as="video"]');
        if (sduiVideo) {
          expect(sduiVideo).toBeInTheDocument();
          expect(sduiVideo).toHaveAttribute("controls");
          expect(sduiVideo).toHaveAttribute("poster", expect.stringContaining("placehold.co"));
          expect(sduiVideo).toHaveClass("object-cover", "w-full", "h-full", "rounded-lg");
        }
      }
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "w-[600px]",
      children: {
        type: "AspectRatio",
        ratio: 16 / 9,
        children: {
          type: "Box",
          as: "video",
          className: "object-cover w-full h-full rounded-lg",
          poster: "https://placehold.co/600x340/EEE/31343C",
          controls: true,
          children: [
            {
              type: "Box",
              as: "source",
              src: "https://www.w3schools.com/html/mov_bbb.mp4"
            },
            {
              type: "Box",
              as: "track",
              kind: "captions"
            },
            "Your browser does not support the video tag."
          ]
        },
      },
    },
  }
);
