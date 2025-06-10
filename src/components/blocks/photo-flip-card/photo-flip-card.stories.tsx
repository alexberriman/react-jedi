import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { PhotoFlipCard, PhotoFlipCardGrid } from "./photo-flip-card";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta: Meta<typeof PhotoFlipCard> = {
  title: "Blocks/PhotoFlipCard",
  component: PhotoFlipCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Photo Flip Card block with elegant hover animations. Features multiple animation variants, responsive design, and touch support.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["vertical-flip", "horizontal-flip", "fade", "slide-reveal", "rotation-3d"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "auto"],
    },
    aspectRatio: {
      control: "select",
      options: ["square", "video", "portrait", "wide", "auto"],
    },
    borderRadius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "touch"],
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
    },
    animated: {
      control: "boolean",
    },
    animationDuration: {
      control: { type: "range", min: 0.2, max: 2, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhotoFlipCard>;

// Sample image URLs for demonstrations
const sampleImages = {
  nature: "https://placehold.co/400x400/EEE/31343C",
  city: "https://placehold.co/400x400/EEE/31343C",
  portrait: "https://placehold.co/400x400/EEE/31343C",
  landscape: "https://placehold.co/600x400/EEE/31343C",
  tech: "https://placehold.co/400x400/EEE/31343C",
  food: "https://placehold.co/400x400/EEE/31343C",
};

export const Default: Story = {
  args: {
    frontImage: sampleImages.nature,
    frontImageAlt: "Beautiful mountain landscape",
    title: "Mountain Vista",
    description: "A breathtaking view of snow-capped mountains",
    overlay: {
      title: "Explore Nature",
      description:
        "Discover the beauty of untouched wilderness and find your perfect adventure in the mountains.",
      badge: "Featured",
    },
    cta: {
      text: "Learn More",
      variant: "secondary",
    },
    variant: "vertical-flip",
    size: "md",
    trigger: "hover",
  },
};

export const VerticalFlip: Story = {
  args: {
    ...Default.args,
    variant: "vertical-flip",
    overlay: {
      title: "Vertical Animation",
      description: "Card flips along the horizontal axis with smooth vertical rotation.",
    },
  },
};

export const HorizontalFlip: Story = {
  args: {
    ...Default.args,
    variant: "horizontal-flip",
    frontImage: sampleImages.city,
    overlay: {
      title: "Horizontal Animation",
      description: "Card flips along the vertical axis with smooth horizontal rotation.",
    },
  },
};

export const FadeTransition: Story = {
  args: {
    ...Default.args,
    variant: "fade",
    frontImage: sampleImages.portrait,
    overlay: {
      title: "Fade Effect",
      description: "Smooth fade transition between front and back with scaling effect.",
    },
  },
};

export const SlideReveal: Story = {
  args: {
    ...Default.args,
    variant: "slide-reveal",
    frontImage: sampleImages.tech,
    overlay: {
      title: "Slide Animation",
      description: "Content slides in from the side revealing the back content.",
    },
  },
};

export const Rotation3D: Story = {
  args: {
    ...Default.args,
    variant: "rotation-3d",
    frontImage: sampleImages.food,
    overlay: {
      title: "3D Rotation",
      description: "Advanced 3D rotation with perspective transformation for a modern look.",
    },
  },
};

export const ClickTrigger: Story = {
  args: {
    ...Default.args,
    trigger: "click",
    frontImage: sampleImages.landscape,
    title: "Click to Flip",
    description: "Click the card to see the animation",
    overlay: {
      title: "Click Interaction",
      description:
        "This card responds to click events instead of hover for better mobile experience.",
    },
  },
};

export const CustomGradient: Story = {
  args: {
    ...Default.args,
    frontImage: sampleImages.city,
    gradientOverlay: {
      from: "rgba(124, 58, 237, 0.1)",
      to: "rgba(124, 58, 237, 0.8)",
      direction: "to-br",
      opacity: 0.9,
    },
    overlay: {
      title: "Custom Gradient",
      description: "Beautiful custom gradient overlay with purple theme.",
    },
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: "xl",
    frontImage: sampleImages.landscape,
    aspectRatio: "video",
    overlay: {
      title: "Large Format",
      description: "Extra large card with video aspect ratio for prominent display.",
    },
  },
};

export const MinimalStyle: Story = {
  args: {
    frontImage: sampleImages.portrait,
    overlay: {
      content: (
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Sarah Johnson</h3>
          <p className="text-white/90">Senior Designer</p>
          <div className="flex gap-2 mt-4">
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">Li</span>
            </span>
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">Tw</span>
            </span>
          </div>
        </div>
      ),
    },
    variant: "fade",
    borderRadius: "xl",
    shadow: "lg",
  },
};

export const WithCustomContent: Story = {
  args: {
    frontImage: sampleImages.tech,
    title: "Technology",
    overlay: {
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-xl font-bold">Fast Performance</h3>
          <ul className="text-sm space-y-1 text-white/90">
            <li>• Lightning fast loading</li>
            <li>• Optimized for mobile</li>
            <li>• Advanced caching</li>
          </ul>
        </div>
      ),
    },
    variant: "rotation-3d",
    cta: {
      text: "Get Started",
      variant: "outline",
    },
  },
};

// Grid Stories
export const CardGrid: StoryObj<typeof PhotoFlipCardGrid> = {
  render: (args) => <PhotoFlipCardGrid {...args} />,
  args: {
    columns: "3",
    gap: "md",
    animated: true,
    staggerDelay: 0.1,
    cards: [
      {
        frontImage: sampleImages.nature,
        title: "Mountains",
        overlay: {
          title: "Mountain Adventures",
          description: "Explore breathtaking mountain landscapes and hiking trails.",
        },
        cta: { text: "Explore" },
        variant: "vertical-flip",
      },
      {
        frontImage: sampleImages.city,
        title: "City Life",
        overlay: {
          title: "Urban Experience",
          description: "Discover the energy and culture of modern city living.",
        },
        cta: { text: "Discover" },
        variant: "horizontal-flip",
      },
      {
        frontImage: sampleImages.tech,
        title: "Technology",
        overlay: {
          title: "Innovation Hub",
          description: "Cutting-edge technology solutions for the future.",
        },
        cta: { text: "Learn More" },
        variant: "fade",
      },
      {
        frontImage: sampleImages.food,
        title: "Cuisine",
        overlay: {
          title: "Culinary Delights",
          description: "Savor exceptional flavors from around the world.",
        },
        cta: { text: "Taste" },
        variant: "slide-reveal",
      },
      {
        frontImage: sampleImages.portrait,
        title: "People",
        overlay: {
          title: "Human Stories",
          description: "Connect with inspiring stories of real people.",
        },
        cta: { text: "Connect" },
        variant: "rotation-3d",
      },
      {
        frontImage: sampleImages.landscape,
        title: "Nature",
        overlay: {
          title: "Natural Beauty",
          description: "Immerse yourself in pristine natural environments.",
        },
        cta: { text: "Explore" },
        variant: "vertical-flip",
      },
    ],
  },
  parameters: {
    layout: "padded",
  },
};

export const ResponsiveGrid: StoryObj<typeof PhotoFlipCardGrid> = {
  render: (args) => <PhotoFlipCardGrid {...args} />,
  args: {
    ...CardGrid.args,
    columns: "auto",
    gap: "lg",
    cards: CardGrid.args!.cards!.slice(0, 4),
  },
  parameters: {
    layout: "padded",
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1200px", height: "800px" } },
      },
    },
  },
};

// Dual Mode Stories
export const DualModeVerticalFlip = enhanceStoryForDualMode(
  {
    render: () => (
      <PhotoFlipCard
        frontImage={sampleImages.nature}
        frontImageAlt="Beautiful mountain landscape"
        title="Mountain Vista (Dual Mode)"
        description="Testing dual-mode rendering - React vs SDUI"
        overlay={{
          title: "Explore Nature",
          description:
            "Discover the beauty of untouched wilderness and find your perfect adventure in the mountains.",
          badge: "Featured",
        }}
        cta={{
          text: "Learn More",
          variant: "secondary",
        }}
        variant="vertical-flip"
        size="md"
        trigger="hover"
        animated={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for card to render
      await waitFor(() => {
        expect(canvas.getAllByAltText("Beautiful mountain landscape")[0]).toBeInTheDocument();
      });

      // Verify title and description
      expect(canvas.getByText("Mountain Vista (Dual Mode)")).toBeInTheDocument();
      expect(canvas.getByText("Testing dual-mode rendering - React vs SDUI")).toBeInTheDocument();

      // Test hover interaction
      const card = canvas.getByTestId("photo-flip-card");
      
      // Hover over the card
      await userEvent.hover(card);
      
      // Wait for flip animation to start
      await waitFor(() => {
        // Check if overlay content is visible
        expect(canvas.getByText("Explore Nature")).toBeInTheDocument();
      });

      // Verify badge
      expect(canvas.getByText("Featured")).toBeInTheDocument();

      // Verify CTA button
      const ctaButton = canvas.getByRole("button", { name: "Learn More" });
      expect(ctaButton).toBeInTheDocument();

      // Unhover to test flip back
      await userEvent.unhover(card);
    },
  },
  {
    renderSpec: {
      type: "PhotoFlipCard",
      frontImage: sampleImages.nature,
      frontImageAlt: "Beautiful mountain landscape",
      title: "Mountain Vista (Dual Mode)",
      description: "Testing dual-mode rendering - React vs SDUI",
      overlay: {
        title: "Explore Nature",
        description:
          "Discover the beauty of untouched wilderness and find your perfect adventure in the mountains.",
        badge: "Featured",
      },
      cta: {
        text: "Learn More",
        variant: "secondary",
      },
      variant: "vertical-flip",
      size: "md",
      trigger: "hover",
      animated: true,
    },
  }
);

export const DualModeClickTrigger = enhanceStoryForDualMode(
  {
    render: () => (
      <PhotoFlipCard
        frontImage={sampleImages.tech}
        frontImageAlt="Technology concept"
        title="Click to Flip (Dual Mode)"
        description="Click the card to see the animation"
        overlay={{
          title: "Innovation Hub",
          description: "Advanced technology solutions for the modern world.",
        }}
        cta={{
          text: "Get Started",
          variant: "default",
        }}
        variant="rotation-3d"
        size="md"
        trigger="click"
        animated={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const user = userEvent.setup();
      
      // Wait for card to render
      await waitFor(() => {
        expect(canvas.getAllByAltText("Technology concept")[0]).toBeInTheDocument();
      });

      // Verify initial state
      expect(canvas.getByText("Click to Flip (Dual Mode)")).toBeInTheDocument();
      expect(canvas.getByText("Click the card to see the animation")).toBeInTheDocument();

      // Click to flip the card
      const card = canvas.getByTestId("photo-flip-card");
      await user.click(card);
      
      // Wait for flip animation
      await waitFor(() => {
        expect(canvas.getByText("Innovation Hub")).toBeInTheDocument();
      });

      // Verify overlay content
      expect(canvas.getByText("Advanced technology solutions for the modern world.")).toBeInTheDocument();

      // Verify CTA button
      const ctaButton = canvas.getByRole("button", { name: "Get Started" });
      expect(ctaButton).toBeInTheDocument();

      // Click again to flip back
      await user.click(card);
    },
  },
  {
    renderSpec: {
      type: "PhotoFlipCard",
      frontImage: sampleImages.tech,
      frontImageAlt: "Technology concept",
      title: "Click to Flip (Dual Mode)",
      description: "Click the card to see the animation",
      overlay: {
        title: "Innovation Hub",
        description: "Advanced technology solutions for the modern world.",
      },
      cta: {
        text: "Get Started",
        variant: "default",
      },
      variant: "rotation-3d",
      size: "md",
      trigger: "click",
      animated: true,
    },
  }
);

export const DualModeFadeVariant = enhanceStoryForDualMode(
  {
    render: () => (
      <PhotoFlipCard
        frontImage={sampleImages.portrait}
        frontImageAlt="Team member portrait"
        title="Sarah Johnson"
        description="Senior Designer"
        overlay={{
          title: "Connect with Sarah",
          description: "Expert in user experience design with 10+ years of experience.",
          badge: "Available",
        }}
        variant="fade"
        size="lg"
        borderRadius="xl"
        shadow="lg"
        animated={true}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for card to render
      await waitFor(() => {
        expect(canvas.getAllByAltText("Team member portrait")[0]).toBeInTheDocument();
      });

      // Verify front content
      expect(canvas.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(canvas.getByText("Senior Designer")).toBeInTheDocument();

      // Test hover for fade variant
      const card = canvas.getByTestId("photo-flip-card");
      await userEvent.hover(card);
      
      // Wait for fade animation
      await waitFor(() => {
        expect(canvas.getByText("Connect with Sarah")).toBeInTheDocument();
      });

      // Verify overlay content
      expect(canvas.getByText("Expert in user experience design with 10+ years of experience.")).toBeInTheDocument();
      expect(canvas.getByText("Available")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "PhotoFlipCard",
      frontImage: sampleImages.portrait,
      frontImageAlt: "Team member portrait",
      title: "Sarah Johnson",
      description: "Senior Designer",
      overlay: {
        title: "Connect with Sarah",
        description: "Expert in user experience design with 10+ years of experience.",
        badge: "Available",
      },
      variant: "fade",
      size: "lg",
      borderRadius: "xl",
      shadow: "lg",
      animated: true,
    },
  }
);

export const DualModeGrid = enhanceStoryForDualMode(
  {
    render: () => (
      <PhotoFlipCardGrid
        columns="3"
        gap="md"
        animated={true}
        staggerDelay={0.1}
        cards={[
          {
            frontImage: sampleImages.nature,
            frontImageAlt: "Mountain landscape",
            title: "Mountains",
            overlay: {
              title: "Mountain Adventures",
              description: "Explore breathtaking mountain landscapes.",
            },
            cta: { text: "Explore" },
            variant: "vertical-flip",
          },
          {
            frontImage: sampleImages.city,
            frontImageAlt: "City skyline",
            title: "City Life",
            overlay: {
              title: "Urban Experience",
              description: "Discover modern city living.",
            },
            cta: { text: "Discover" },
            variant: "horizontal-flip",
          },
          {
            frontImage: sampleImages.tech,
            frontImageAlt: "Technology",
            title: "Technology",
            overlay: {
              title: "Innovation Hub",
              description: "Cutting-edge technology solutions.",
            },
            cta: { text: "Learn More" },
            variant: "fade",
          },
        ]}
      />
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Wait for grid to render
      await waitFor(() => {
        expect(canvas.getByText("Mountains")).toBeInTheDocument();
      });

      // Verify all cards are rendered
      expect(canvas.getByText("City Life")).toBeInTheDocument();
      expect(canvas.getByText("Technology")).toBeInTheDocument();

      // Test hover on first card
      const firstCard = canvas.getAllByTestId("photo-flip-card")[0];
      await userEvent.hover(firstCard);
      
      // Wait for animation
      await waitFor(() => {
        expect(canvas.getByText("Mountain Adventures")).toBeInTheDocument();
      });

      // Verify grid layout
      const grid = canvas.getByTestId("photo-flip-card-grid");
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("lg:grid-cols-3");
      expect(grid).toHaveClass("gap-6"); // md gap
    },
  },
  {
    renderSpec: {
      type: "PhotoFlipCardGrid",
      columns: "3",
      gap: "md",
      animated: true,
      staggerDelay: 0.1,
      cards: [
        {
          frontImage: sampleImages.nature,
          frontImageAlt: "Mountain landscape",
          title: "Mountains",
          overlay: {
            title: "Mountain Adventures",
            description: "Explore breathtaking mountain landscapes.",
          },
          cta: { text: "Explore" },
          variant: "vertical-flip",
        },
        {
          frontImage: sampleImages.city,
          frontImageAlt: "City skyline",
          title: "City Life",
          overlay: {
            title: "Urban Experience",
            description: "Discover modern city living.",
          },
          cta: { text: "Discover" },
          variant: "horizontal-flip",
        },
        {
          frontImage: sampleImages.tech,
          frontImageAlt: "Technology",
          title: "Technology",
          overlay: {
            title: "Innovation Hub",
            description: "Cutting-edge technology solutions.",
          },
          cta: { text: "Learn More" },
          variant: "fade",
        },
      ],
    },
  }
);
