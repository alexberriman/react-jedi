import type { Meta, StoryObj } from "@storybook/react-vite";
import { CarouselBlock } from "./carousel-block";
import type { CarouselDef } from "../../../types/components/carousel";

const meta: Meta<typeof CarouselBlock> = {
  title: "Blocks/Carousel",
  component: CarouselBlock,
  tags: ["autodocs", "test"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Enhanced carousel block with multiple variants including image gallery, content cards, testimonials, product showcase, and fullscreen modes. Features autoplay, touch support, dots/thumbnails navigation, Ken Burns effect, and zoom functionality.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for different variants
const sampleImages = [
  {
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Mountain landscape",
    title: "Mountain Vista",
    description: "A breathtaking view of snow-capped peaks",
  },
  {
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Ocean waves",
    title: "Ocean Waves",
    description: "The endless rhythm of the sea",
  },
  {
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Forest path",
    title: "Forest Trail",
    description: "A peaceful walk through ancient woods",
  },
  {
    src: "https://placehold.co/800x600/EEE/31343C",
    alt: "Desert landscape",
    title: "Desert Sands",
    description: "The beauty of endless dunes",
  },
];

const sampleContentItems = [
  {
    title: "Modern Design System",
    description:
      "Build consistent and beautiful user interfaces with our comprehensive design system.",
    image: "https://placehold.co/400x300/EEE/31343C",
    badge: "New",
    cta: { text: "Learn More", href: "#" },
  },
  {
    title: "Performance Optimization",
    description:
      "Optimize your applications for maximum speed and efficiency with proven techniques.",
    image: "https://placehold.co/400x300/EEE/31343C",
    badge: "Popular",
    cta: { text: "Get Started", href: "#" },
  },
  {
    title: "Developer Experience",
    description: "Enhance productivity with tools and workflows designed for modern development.",
    image: "https://placehold.co/400x300/EEE/31343C",
    cta: { text: "Explore", href: "#" },
  },
];

const sampleTestimonials = [
  {
    content:
      "This carousel component has transformed how we showcase our portfolio. The Ken Burns effect and smooth transitions create an incredibly engaging experience.",
    author: {
      name: "Sarah Chen",
      role: "Creative Director",
      company: "Design Studio Pro",
      image: "https://placehold.co/100x100/EEE/31343C",
    },
    rating: 5,
  },
  {
    content:
      "The variety of carousel variants makes it perfect for any project. We use the product showcase for our e-commerce site and the testimonials for our landing page.",
    author: {
      name: "Michael Rodriguez",
      role: "Frontend Developer",
      company: "TechFlow Inc",
      image: "https://placehold.co/100x100/EEE/31343C",
    },
    rating: 5,
  },
  {
    content:
      "The touch support and mobile optimization are outstanding. Our users love the smooth swiping experience across all devices.",
    author: {
      name: "Emma Thompson",
      role: "UX Designer",
      company: "Mobile First Co",
      image: "https://placehold.co/100x100/EEE/31343C",
    },
    rating: 5,
  },
];

const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    price: "$299",
    originalPrice: "$399",
    image: "https://placehold.co/300x300/EEE/31343C",
    description: "High-quality audio with noise cancellation",
    badge: "Sale",
    inStock: true,
  },
  {
    name: "Smart Fitness Watch",
    price: "$199",
    image: "https://placehold.co/300x300/EEE/31343C",
    description: "Track your health and fitness goals",
    badge: "New",
    inStock: true,
  },
  {
    name: "Minimalist Backpack",
    price: "$89",
    image: "https://placehold.co/300x300/EEE/31343C",
    description: "Perfect for daily commuting",
    inStock: false,
  },
  {
    name: "Eco-Friendly Water Bottle",
    price: "$29",
    image: "https://placehold.co/300x300/EEE/31343C",
    description: "Sustainable and stylish hydration",
    badge: "Eco",
    inStock: true,
  },
];

// Basic carousel with default content
export const Basic: Story = {
  args: {
    spec: {
      type: "Carousel",
      showArrows: true,
      showDots: true,
      items: [
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "flex aspect-square items-center justify-center p-6",
            children: {
              type: "Text",
              children: "Slide 1",
              className: "text-4xl font-semibold",
            },
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "flex aspect-square items-center justify-center p-6",
            children: {
              type: "Text",
              children: "Slide 2",
              className: "text-4xl font-semibold",
            },
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "flex aspect-square items-center justify-center p-6",
            children: {
              type: "Text",
              children: "Slide 3",
              className: "text-4xl font-semibold",
            },
          },
        },
      ],
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story: "A basic carousel with simple content cards and navigation controls.",
      },
    },
  },
};

// Image Gallery Variant with Ken Burns effect
export const ImageGallery: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "gallery",
      showArrows: true,
      autoplay: {
        enabled: true,
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      },
      data: {
        images: sampleImages,
        enableKenBurns: true,
        enableZoom: true,
        showThumbnails: true,
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Image gallery carousel with Ken Burns effect, zoom functionality, thumbnails navigation, and autoplay that pauses on hover.",
      },
    },
  },
};

// Content Cards Variant
export const ContentCards: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "content",
      showArrows: true,
      showDots: true,
      data: {
        items: sampleContentItems,
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Content cards carousel perfect for showcasing features, services, or blog posts with images, badges, and call-to-action buttons.",
      },
    },
  },
};

// Testimonials Variant - Cards Style
export const TestimonialsCards: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "testimonials",
      showArrows: true,
      showDots: true,
      autoplay: {
        enabled: true,
        delay: 6000,
      },
      data: {
        testimonials: sampleTestimonials,
        testimonialsVariant: "cards",
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Testimonials carousel in card format with author photos, ratings, and company information.",
      },
    },
  },
};

// Testimonials Variant - Quote Style
export const TestimonialsQuotes: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "testimonials",
      showArrows: true,
      showDots: true,
      data: {
        testimonials: sampleTestimonials,
        testimonialsVariant: "quotes",
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Testimonials carousel in elegant quote format with minimal styling.",
      },
    },
  },
};

// Product Showcase Variant
export const ProductShowcase: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "showcase",
      showArrows: true,
      showDots: true,
      data: {
        products: sampleProducts,
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Product showcase carousel with pricing, badges, stock status, and hover effects perfect for e-commerce.",
      },
    },
  },
};

// Fullscreen Variant
export const Fullscreen: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "fullscreen",
      showArrows: true,
      showDots: true,
      autoplay: {
        enabled: true,
        delay: 4000,
      },
      data: {
        images: sampleImages.map((img) => ({
          ...img,
          title: img.title + " Hero",
          description: "Experience the beauty of nature in full screen glory",
        })),
        enableKenBurns: true,
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fullscreen hero carousel with overlay text, perfect for landing pages and hero sections.",
      },
    },
  },
};

// Autoplay with Custom Settings
export const AutoplayCustom: Story = {
  args: {
    spec: {
      type: "Carousel",
      variant: "gallery",
      showArrows: true,
      showDots: true,
      autoplay: {
        enabled: true,
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      },
      data: {
        images: sampleImages,
        enableKenBurns: false,
        enableZoom: false,
        showThumbnails: false,
      },
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Autoplay carousel with custom timing and interaction behavior. Continues playing after user interaction but pauses on hover.",
      },
    },
  },
};

// Vertical Orientation
export const Vertical: Story = {
  args: {
    spec: {
      type: "Carousel",
      orientation: "vertical",
      showArrows: true,
      showDots: true,
      className: "max-w-md mx-auto",
      items: [
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "flex h-48 items-center justify-center p-6",
            children: {
              type: "Text",
              children: "Vertical Slide 1",
              className: "text-2xl font-semibold",
            },
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "flex h-48 items-center justify-center p-6",
            children: {
              type: "Text",
              children: "Vertical Slide 2",
              className: "text-2xl font-semibold",
            },
          },
        },
        {
          type: "Card",
          children: {
            type: "CardContent",
            className: "flex h-48 items-center justify-center p-6",
            children: {
              type: "Text",
              children: "Vertical Slide 3",
              className: "text-2xl font-semibold",
            },
          },
        },
      ],
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical carousel orientation with adjusted navigation button positioning.",
      },
    },
  },
};

// Multiple Items Visible
export const MultipleItems: Story = {
  args: {
    spec: {
      type: "Carousel",
      showArrows: true,
      showDots: true,
      options: {
        align: "start",
      },
      className: "max-w-6xl mx-auto",
      items: Array.from({ length: 8 }).map((_, index) => ({
        type: "Card",
        className: "basis-1/2 md:basis-1/3 lg:basis-1/4",
        children: {
          type: "CardContent",
          className: "flex aspect-square items-center justify-center p-6",
          children: {
            type: "Text",
            children: `Item ${index + 1}`,
            className: "text-xl font-semibold",
          },
        },
      })),
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel showing multiple items at once with responsive breakpoints.",
      },
    },
  },
};

// Loop Enabled
export const Loop: Story = {
  args: {
    spec: {
      type: "Carousel",
      showArrows: true,
      showDots: true,
      options: {
        loop: true,
      },
      autoplay: {
        enabled: true,
        delay: 2500,
      },
      items: sampleImages.map((image, index) => ({
        type: "Card",
        children: {
          type: "CardContent",
          className: "flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg",
          children: {
            type: "Image",
            src: image.src,
            alt: image.alt,
            className: "w-full h-full object-cover",
          },
        },
      })),
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with infinite loop enabled and fast autoplay for continuous browsing.",
      },
    },
  },
};

// No Navigation (Swipe Only)
export const SwipeOnly: Story = {
  args: {
    spec: {
      type: "Carousel",
      showArrows: false,
      showDots: true,
      className: "max-w-2xl mx-auto",
      items: sampleImages.map((image) => ({
        type: "Card",
        children: {
          type: "CardContent",
          className: "p-0 overflow-hidden rounded-lg",
          children: [
            {
              type: "Image",
              src: image.src,
              alt: image.alt,
              className: "w-full aspect-video object-cover",
            },
            {
              type: "Box",
              className: "p-4",
              children: [
                {
                  type: "Heading",
                  level: 3,
                  children: image.title,
                  className: "text-lg font-semibold mb-2",
                },
                {
                  type: "Text",
                  children: image.description,
                  className: "text-muted-foreground",
                },
              ],
            },
          ],
        },
      })),
    } as CarouselDef,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Touch/swipe-only carousel without navigation arrows, relying on dots and gesture controls.",
      },
    },
  },
};
