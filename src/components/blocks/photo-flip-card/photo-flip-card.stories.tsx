import type { Meta, StoryObj } from "@storybook/react";
import { PhotoFlipCard, PhotoFlipCardGrid } from "./photo-flip-card";

const meta: Meta<typeof PhotoFlipCard> = {
  title: "Blocks/PhotoFlipCard",
  component: PhotoFlipCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Photo Flip Card block with elegant hover animations. Features multiple animation variants, responsive design, and touch support.",
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
  nature: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop",
  portrait: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
  landscape: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  food: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
};

export const Default: Story = {
  args: {
    frontImage: sampleImages.nature,
    frontImageAlt: "Beautiful mountain landscape",
    title: "Mountain Vista",
    description: "A breathtaking view of snow-capped mountains",
    overlay: {
      title: "Explore Nature",
      description: "Discover the beauty of untouched wilderness and find your perfect adventure in the mountains.",
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
      description: "This card responds to click events instead of hover for better mobile experience.",
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