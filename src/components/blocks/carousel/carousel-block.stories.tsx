import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { CarouselBlock } from "./carousel-block";
import type { CarouselDef } from "../../../types/components/carousel";
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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
const basicSpec: CarouselDef = {
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
};

export const Basic: Story = enhanceStoryForDualMode<typeof CarouselBlock>(
  {
    args: {
      spec: basicSpec,
    },
  parameters: {
    docs: {
      description: {
        story: "A basic carousel with simple content cards and navigation controls.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test slides render
    expect(canvas.getByText("Slide 1")).toBeInTheDocument();
    
    // Test navigation arrows exist
    const prevButton = canvas.getByRole("button", { name: /previous slide/i });
    const nextButton = canvas.getByRole("button", { name: /next slide/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    
    // Test dots navigation exists
    const dotsContainer = canvas.getByRole("group", { name: /carousel pagination/i });
    expect(dotsContainer).toBeInTheDocument();
  },
},
{
  jsonSpec: basicSpec,
}
);

// Image Gallery Variant with Ken Burns effect
const imageGallerySpec: CarouselDef = {
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
};

export const ImageGallery: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: imageGallerySpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Image gallery carousel with Ken Burns effect, zoom functionality, thumbnails navigation, and autoplay that pauses on hover.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test gallery variant renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test images are rendered
    const images = canvas.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    
    // Test navigation exists
    expect(canvas.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
  },
},
{
  jsonSpec: imageGallerySpec,
}
);

// Content Cards Variant
const contentCardsSpec: CarouselDef = {
  type: "Carousel",
  variant: "content",
  showArrows: true,
  showDots: true,
  data: {
    items: sampleContentItems,
  },
};

export const ContentCards: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: contentCardsSpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Content cards carousel perfect for showcasing features, services, or blog posts with images, badges, and call-to-action buttons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test content cards render
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test content items
    expect(canvas.getByText("Modern Design System")).toBeInTheDocument();
    
    // Test badges render
    expect(canvas.getByText("New")).toBeInTheDocument();
    
    // Test CTA buttons
    expect(canvas.getByRole("link", { name: "Learn More" })).toBeInTheDocument();
  },
},
{
  jsonSpec: contentCardsSpec,
}
);

// Testimonials Variant - Cards Style
const testimonialsCardsSpec: CarouselDef = {
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
};

export const TestimonialsCards: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: testimonialsCardsSpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Testimonials carousel in card format with author photos, ratings, and company information.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test testimonials render
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test testimonial content
    expect(canvas.getByText(/This carousel component has transformed/)).toBeInTheDocument();
    
    // Test author info
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();
    expect(canvas.getByText("Creative Director")).toBeInTheDocument();
  },
},
{
  jsonSpec: testimonialsCardsSpec,
}
);

// Testimonials Variant - Quote Style
const testimonialsQuotesSpec: CarouselDef = {
  type: "Carousel",
  variant: "testimonials",
  showArrows: true,
  showDots: true,
  data: {
    testimonials: sampleTestimonials,
    testimonialsVariant: "quotes",
  },
};

export const TestimonialsQuotes: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: testimonialsQuotesSpec,
  },
  parameters: {
    docs: {
      description: {
        story: "Testimonials carousel in elegant quote format with minimal styling.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test quote variant renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test testimonial content in quote format
    expect(canvas.getByText(/This carousel component has transformed/)).toBeInTheDocument();
    
    // Test author attribution
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();
  },
},
{
  jsonSpec: testimonialsQuotesSpec,
}
);

// Product Showcase Variant
const productShowcaseSpec: CarouselDef = {
  type: "Carousel",
  variant: "showcase",
  showArrows: true,
  showDots: true,
  data: {
    products: sampleProducts,
  },
};

export const ProductShowcase: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: productShowcaseSpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Product showcase carousel with pricing, badges, stock status, and hover effects perfect for e-commerce.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test product showcase renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test product info
    expect(canvas.getByText("Premium Wireless Headphones")).toBeInTheDocument();
    expect(canvas.getByText("$299")).toBeInTheDocument();
    
    // Test badges
    expect(canvas.getByText("Sale")).toBeInTheDocument();
  },
},
{
  jsonSpec: productShowcaseSpec,
}
);

// Fullscreen Variant
const fullscreenSpec: CarouselDef = {
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
};

export const Fullscreen: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: fullscreenSpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fullscreen hero carousel with overlay text, perfect for landing pages and hero sections.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test fullscreen carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test hero titles
    expect(canvas.getByText("Mountain Vista Hero")).toBeInTheDocument();
    
    // Test overlay text
    expect(canvas.getByText("Experience the beauty of nature in full screen glory")).toBeInTheDocument();
  },
},
{
  jsonSpec: fullscreenSpec,
}
);

// Autoplay with Custom Settings
const autoplayCustomSpec: CarouselDef = {
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
};

export const AutoplayCustom: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: autoplayCustomSpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Autoplay carousel with custom timing and interaction behavior. Continues playing after user interaction but pauses on hover.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test autoplay carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test images render
    const images = canvas.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    
    // Test navigation controls
    expect(canvas.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
  },
},
{
  jsonSpec: autoplayCustomSpec,
}
);

// Vertical Orientation
const verticalSpec: CarouselDef = {
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
};

export const Vertical: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: verticalSpec,
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical carousel orientation with adjusted navigation button positioning.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test vertical carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test vertical slides
    expect(canvas.getByText("Vertical Slide 1")).toBeInTheDocument();
    
    // Test navigation exists
    expect(canvas.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
  },
},
{
  jsonSpec: verticalSpec,
}
);

// Multiple Items Visible
const multipleItemsSpec: CarouselDef = {
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
};

export const MultipleItems: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: multipleItemsSpec,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel showing multiple items at once with responsive breakpoints.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test multiple items carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test first items are visible
    expect(canvas.getByText("Item 1")).toBeInTheDocument();
    expect(canvas.getByText("Item 2")).toBeInTheDocument();
    
    // Test navigation
    expect(canvas.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
  },
},
{
  jsonSpec: multipleItemsSpec,
}
);

// Loop Enabled
const loopSpec: CarouselDef = {
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
};

export const Loop: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: loopSpec,
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with infinite loop enabled and fast autoplay for continuous browsing.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test loop carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test images render
    const images = canvas.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    
    // Test navigation
    expect(canvas.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
  },
},
{
  jsonSpec: loopSpec,
}
);

// No Navigation (Swipe Only)
const swipeOnlySpec: CarouselDef = {
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
          alt: image.alt || "",
          className: "w-full aspect-video object-cover",
        },
        {
          type: "Box",
          className: "p-4",
          children: [
            {
              type: "Heading",
              level: "h3" as const,
              children: image.title || "",
              className: "text-lg font-semibold mb-2",
            },
            {
              type: "Text",
              children: image.description || "",
              className: "text-muted-foreground",
            },
          ],
        },
      ],
    },
  })),
};

export const SwipeOnly: Story = enhanceStoryForDualMode<typeof CarouselBlock>({
  args: {
    spec: swipeOnlySpec,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Touch/swipe-only carousel without navigation arrows, relying on dots and gesture controls.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test swipe-only carousel renders
    const carousel = canvas.getByRole("region", { name: /carousel/i });
    expect(carousel).toBeInTheDocument();
    
    // Test content renders
    expect(canvas.getByText("Mountain Vista")).toBeInTheDocument();
    expect(canvas.getByText("A breathtaking view of snow-capped peaks")).toBeInTheDocument();
    
    // Test dots exist (no arrows)
    const dotsContainer = canvas.getByRole("group", { name: /carousel pagination/i });
    expect(dotsContainer).toBeInTheDocument();
    
    // Test no arrow buttons
    expect(canvas.queryByRole("button", { name: /previous slide/i })).not.toBeInTheDocument();
    expect(canvas.queryByRole("button", { name: /next slide/i })).not.toBeInTheDocument();
  },
},
{
  jsonSpec: swipeOnlySpec,
}
);
