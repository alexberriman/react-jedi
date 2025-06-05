import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Testimonial } from "./testimonial";

const meta = {
  title: "Blocks/Testimonial",
  component: Testimonial,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["card", "minimal", "large", "quote"],
    },
    rating: {
      control: { type: "number", min: 0, max: 5 },
    },
    highlight: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  author: {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Tech Corp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  content:
    "This library has transformed how we build UI components. The Server-Driven UI approach allows us to iterate faster and deliver beautiful experiences to our users.",
  rating: 5,
  date: "November 2024",
};

export const Default: Story = {
  args: defaultProps,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test testimonial content
    expect(canvas.getByText(/This library has transformed/)).toBeInTheDocument();

    // Test author information
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();
    expect(canvas.getByText(/Product Designer at Tech Corp/)).toBeInTheDocument();

    // Test date
    expect(canvas.getByText("November 2024")).toBeInTheDocument();

    // Test rating stars (should be 5 stars)
    // If stars are implemented, they should be visible

    // Test avatar image
    const avatar = canvasElement.querySelector("img");
    if (avatar) {
      expect(avatar).toHaveAttribute("src", expect.stringContaining("unsplash.com"));
      expect(avatar).toHaveAttribute("alt", expect.stringContaining("Sarah Chen"));
    }

    // Test testimonial structure is present
    const testimonial = canvasElement.querySelector("div");
    expect(testimonial).toBeInTheDocument();
  },
};

export const Minimal: Story = {
  args: {
    ...defaultProps,
    variant: "minimal",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test testimonial content is present
    expect(canvas.getByText(/This library has transformed/)).toBeInTheDocument();

    // Test author information
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();

    // Test testimonial structure is present
    const testimonial = canvasElement.querySelector("div");
    expect(testimonial).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    ...defaultProps,
    variant: "large",
    content:
      "The React Jedi library is absolutely game-changing. We've cut our development time in half while delivering interfaces that look like they're from the future. The theming system is incredibly powerful and the component quality is outstanding.",
  },
};

export const Quote: Story = {
  args: {
    ...defaultProps,
    variant: "quote",
  },
};

export const Highlighted: Story = {
  args: {
    ...defaultProps,
    highlight: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test testimonial content
    expect(canvas.getByText(/This library has transformed/)).toBeInTheDocument();
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();

    // Test testimonial structure is present
    const testimonial = canvasElement.querySelector("div");
    expect(testimonial).toBeInTheDocument();
  },
};

export const WithoutRating: Story = {
  args: {
    ...defaultProps,
    rating: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test content is still present
    expect(canvas.getByText(/This library has transformed/)).toBeInTheDocument();
    expect(canvas.getByText("Sarah Chen")).toBeInTheDocument();

    // Test that rating section is not present
    const ratingContainer = canvasElement.querySelector('[data-testid="rating"], .rating');
    if (ratingContainer) {
      expect(ratingContainer).not.toBeInTheDocument();
    }
  },
};

export const WithoutAvatar: Story = {
  args: {
    author: {
      name: "Alex Johnson",
      role: "CTO",
      company: "StartupCo",
    },
    content: "Incredible library that makes building beautiful interfaces a breeze.",
    rating: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test content and author info
    expect(canvas.getByText(/Incredible library.*beautiful interfaces/)).toBeInTheDocument();
    expect(canvas.getByText("Alex Johnson")).toBeInTheDocument();
    expect(canvas.getByText(/CTO at StartupCo/)).toBeInTheDocument();

    // Test that no avatar image is present
    const avatar = canvasElement.querySelector("img");
    expect(avatar).not.toBeInTheDocument();

    // Test testimonial structure is present
    const testimonial = canvasElement.querySelector("div");
    expect(testimonial).toBeInTheDocument();
  },
};

export const MultipleTestimonials: Story = {
  args: {
    author: { name: "", role: "", company: "" },
    content: "",
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <Testimonial
        author={{
          name: "Maria Rodriguez",
          role: "Lead Developer",
          company: "Design Studio",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        }}
        content="The component architecture is brilliant. Easy to customize and extend."
        rating={5}
        variant="card"
      />
      <Testimonial
        author={{
          name: "James Wilson",
          role: "Frontend Engineer",
          company: "WebDev Inc",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        }}
        content="Best UI library I've worked with. The attention to detail is remarkable."
        rating={5}
        variant="card"
        highlight
      />
      <Testimonial
        author={{
          name: "Emma Thompson",
          role: "UX Designer",
          company: "Creative Agency",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        }}
        content="Beautiful components that are a joy to work with. Highly recommended!"
        rating={5}
        variant="card"
      />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    ...defaultProps,
    content:
      "Working with React Jedi has been an absolute pleasure. The Server-Driven UI approach revolutionizes how we think about building interfaces. The component library is comprehensive, the theming system is powerful yet intuitive, and the overall developer experience is unmatched. We've been able to deliver stunning, performant applications in record time. This is truly the future of web development.",
    variant: "large",
  },
};
