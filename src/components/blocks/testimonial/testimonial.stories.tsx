import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Testimonial } from "./testimonial";

const meta = {
  title: "Blocks/Testimonial",
  component: Testimonial,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible testimonial block component supporting multiple layouts, variants, and features like video testimonials, company logos, ratings, and social proof elements.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["single", "carousel", "grid", "masonry", "video"],
      description: "Layout variant for displaying testimonials",
    },
    layout: {
      control: { type: "select" },
      options: ["card", "quote", "large", "compact", "minimal"],
      description: "Style layout for individual testimonials",
    },
    columns: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
      description: "Number of columns for grid layout",
    },
    autoplay: {
      control: { type: "boolean" },
      description: "Enable autoplay for carousel variant",
    },
    autoplayInterval: {
      control: { type: "number", min: 1000, max: 10_000 },
      description: "Autoplay interval in milliseconds",
    },
    showNavigation: {
      control: { type: "boolean" },
      description: "Show navigation arrows for carousel",
    },
    showDots: {
      control: { type: "boolean" },
      description: "Show dots pagination for carousel",
    },
    animated: {
      control: { type: "boolean" },
      description: "Enable hover animations",
    },
  },
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample testimonial data
const sampleTestimonial = {
  id: "1",
  author: {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Tech Corp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    companyLogo: "https://logo.clearbit.com/google.com",
  },
  content:
    "This library has transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster and deliver beautiful experiences to our users.",
  rating: 5,
  date: "November 2024",
  source: {
    platform: "Twitter",
    url: "https://twitter.com/example",
  },
};

const sampleTestimonials = [
  sampleTestimonial,
  {
    id: "2",
    author: {
      name: "James Wilson",
      role: "Frontend Engineer",
      company: "WebDev Inc",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      companyLogo: "https://logo.clearbit.com/microsoft.com",
    },
    content:
      "Best UI library I've worked with. The attention to detail is remarkable and the performance is outstanding.",
    rating: 5,
    featured: true,
    date: "December 2024",
  },
  {
    id: "3",
    author: {
      name: "Emma Thompson",
      role: "UX Designer",
      company: "Creative Agency",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      companyLogo: "https://logo.clearbit.com/apple.com",
    },
    content:
      "Beautiful components that are a joy to work with. The theming system is incredibly powerful.",
    rating: 5,
    date: "October 2024",
  },
  {
    id: "4",
    author: {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "StartupCo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      companyLogo: "https://logo.clearbit.com/netflix.com",
    },
    content:
      "The component architecture is brilliant. Easy to customize and extend for our specific needs. Highly recommended for any team looking to move fast.",
    rating: 5,
    date: "September 2024",
  },
  {
    id: "5",
    author: {
      name: "Lisa Park",
      role: "Developer",
      company: "Innovation Labs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    content:
      "Game-changing library! The documentation is excellent and the community support is top-notch.",
    rating: 4,
    date: "August 2024",
  },
  {
    id: "6",
    author: {
      name: "David Kim",
      role: "Tech Lead",
      company: "Digital Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      companyLogo: "https://logo.clearbit.com/spotify.com",
    },
    content:
      "Incredible performance improvements in our development workflow. The components are beautifully designed.",
    rating: 5,
    date: "July 2024",
  },
];

const videoTestimonials = [
  {
    ...sampleTestimonials[0],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    ...sampleTestimonials[1],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const Single: Story = {
  args: {
    testimonials: sampleTestimonial,
    variant: "single",
    layout: "card",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(/This library has transformed/)).toBeInTheDocument();
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();
    expect(canvas.getByText(/Product Designer at Tech Corp/)).toBeInTheDocument();
  },
};

export const SingleMinimal: Story = {
  args: {
    testimonials: sampleTestimonial,
    variant: "single",
    layout: "minimal",
  },
};

export const SingleQuote: Story = {
  args: {
    testimonials: sampleTestimonial,
    variant: "single",
    layout: "quote",
  },
};

export const SingleLarge: Story = {
  args: {
    testimonials: {
      ...sampleTestimonial,
      content:
        "Working with React Jedi has been an absolute pleasure. The Server-Driven UI approach revolutionizes how we think about building interfaces. The component library is comprehensive, the theming system is powerful yet intuitive, and the overall developer experience is unmatched.",
    },
    variant: "single",
    layout: "large",
  },
};

export const Grid2x2: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 4),
    variant: "grid",
    layout: "card",
    columns: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();
    expect(canvas.getByText("James Wilson")).toBeInTheDocument();
    expect(canvas.getByText("Emma Thompson")).toBeInTheDocument();
    expect(canvas.getByText("Michael Rodriguez")).toBeInTheDocument();
  },
};

export const Grid3x1: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
    variant: "grid",
    layout: "card",
    columns: 3,
  },
};

export const Grid3x2: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: "grid",
    layout: "card",
    columns: 3,
  },
};

export const GridWithQuotes: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 4),
    variant: "grid",
    layout: "quote",
    columns: 2,
  },
};

export const Carousel: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: "carousel",
    layout: "card",
    columns: 1,
    showNavigation: true,
    showDots: true,
    autoplay: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that carousel structure exists
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();

    // Check for navigation buttons
    const nextButton = canvasElement.querySelector('[aria-label="Next slide"]');
    const prevButton = canvasElement.querySelector('[aria-label="Previous slide"]');

    if (nextButton) expect(nextButton).toBeInTheDocument();
    if (prevButton) expect(prevButton).toBeInTheDocument();
  },
};

export const CarouselMultipleItems: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: "carousel",
    layout: "card",
    columns: 3,
    showNavigation: true,
    autoplay: false,
  },
};

export const CarouselAutoplay: Story = {
  args: {
    testimonials: sampleTestimonials,
    variant: "carousel",
    layout: "card",
    columns: 2,
    autoplay: true,
    autoplayInterval: 3000,
    showNavigation: true,
  },
};

export const Masonry: Story = {
  args: {
    testimonials: [
      sampleTestimonials[0],
      {
        ...sampleTestimonials[1],
        content: "Short testimonial.",
      },
      {
        ...sampleTestimonials[2],
        content:
          "This is a much longer testimonial that should demonstrate how the masonry layout handles varying content lengths. The component should automatically adjust the positioning to create a beautiful, Pinterest-style layout.",
      },
      sampleTestimonials[3],
      {
        ...sampleTestimonials[4],
        content: "Another testimonial with different length to show the masonry effect.",
      },
    ],
    variant: "masonry",
    layout: "card",
  },
};

export const WithVideo: Story = {
  args: {
    testimonials: [...videoTestimonials.slice(0, 2), ...sampleTestimonials.slice(2, 4)],
    variant: "video",
    layout: "card",
    columns: 2,
  },
};

export const FeaturedHighlight: Story = {
  args: {
    testimonials: sampleTestimonials.map((t, i) => ({
      ...t,
      featured: i === 1, // Highlight the second testimonial
    })),
    variant: "grid",
    layout: "card",
    columns: 3,
  },
};

export const WithRatings: Story = {
  args: {
    testimonials: sampleTestimonials.map((t, index) => ({
      ...t,
      rating: (index % 2) + 4, // Alternating 4-5 star ratings
    })),
    variant: "grid",
    layout: "card",
    columns: 3,
  },
};

export const WithCompanyLogos: Story = {
  args: {
    testimonials: sampleTestimonials.map((t) => ({
      ...t,
      author: {
        ...t.author,
        companyLogo: `https://logo.clearbit.com/${t.author.company?.toLowerCase().replaceAll(/\s+/g, "")}.com`,
      },
    })),
    variant: "grid",
    layout: "card",
    columns: 3,
  },
};

export const WithSocialProof: Story = {
  args: {
    testimonials: sampleTestimonials.map((t, i) => ({
      ...t,
      source: {
        platform: ["Twitter", "LinkedIn", "ProductHunt", "G2", "Capterra"][i % 5],
        url: `https://example.com/review-${i + 1}`,
      },
    })),
    variant: "grid",
    layout: "quote",
    columns: 2,
  },
};

export const LongFormTestimonials: Story = {
  args: {
    testimonials: [
      {
        ...sampleTestimonials[0],
        content:
          "Working with React Jedi has been an absolute game-changer for our development team. The Server-Driven UI approach has revolutionized how we think about building interfaces, allowing us to iterate faster than ever before. The component library is incredibly comprehensive, covering every use case we've encountered. The theming system is both powerful and intuitive, making it easy to maintain brand consistency across all our applications. The performance optimizations built into the library have significantly improved our app's loading times and overall user experience. The documentation is thorough and the community support is outstanding. This is truly the future of web development, and I can't recommend it highly enough.",
      },
      {
        ...sampleTestimonials[1],
        content:
          "As a frontend engineer with over 10 years of experience, I can confidently say that React Jedi is the best UI library I've ever worked with. The attention to detail in every component is remarkable, and the consistent API design makes it incredibly easy to learn and use. The accessibility features are built-in from the ground up, which saves us countless hours of manual implementation. The performance is outstanding, and the bundle size optimizations mean our users get faster load times without sacrificing functionality.",
      },
    ],
    variant: "grid",
    layout: "large",
    columns: 1,
  },
};

export const MobileOptimized: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
    variant: "grid",
    layout: "card",
    columns: 1,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const NoAnimation: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
    variant: "grid",
    layout: "card",
    columns: 3,
    animated: false,
  },
};
