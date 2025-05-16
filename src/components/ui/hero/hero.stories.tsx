import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./hero";

const meta: Meta<typeof Hero> = {
  title: "Components/Marketing/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: { type: "select", options: ["centered", "left-aligned", "split"] },
    },
    backgroundOverlay: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    title: "Welcome to the Future",
    subtitle: "Next Generation Platform",
    description:
      "Experience the power of modern web development with our cutting-edge tools and seamless integrations.",
    variant: "centered",
    primaryAction: {
      text: "Get Started",
      href: "#",
    },
    secondaryAction: {
      text: "Learn More",
      href: "#",
      variant: "outline",
    },
  },
};

export const LeftAligned: Story = {
  args: {
    title: "Build Something Amazing",
    subtitle: "Developer First",
    description:
      "Create beautiful, responsive websites with our intuitive design system. No compromises on performance or accessibility.",
    variant: "left-aligned",
    primaryAction: {
      text: "Start Building",
      onClick: () => alert("Start building clicked!"),
    },
    secondaryAction: {
      text: "View Documentation",
      variant: "ghost",
    },
  },
};

export const Split: Story = {
  args: {
    title: "The Modern Way to Build",
    subtitle: "Revolutionary Design",
    description:
      "Transform your development workflow with our powerful component library and design system.",
    variant: "split",
    primaryAction: {
      text: "Try It Now",
    },
    secondaryAction: {
      text: "Watch Demo",
      variant: "secondary",
    },
    children: (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: "Innovate Without Limits",
    subtitle: "Enterprise Ready",
    description: "Scale your business with confidence using our enterprise-grade infrastructure.",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    backgroundOverlay: true,
    primaryAction: {
      text: "Request Demo",
    },
  },
};

export const WithGradient: Story = {
  args: {
    title: "Design Beautiful Interfaces",
    subtitle: "UI/UX Excellence",
    description:
      "Create stunning user experiences with our modern design principles and components.",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    primaryAction: {
      text: "Explore Components",
      variant: "secondary",
    },
    secondaryAction: {
      text: "View Examples",
      variant: "outline",
    },
  },
};

export const Minimal: Story = {
  args: {
    title: "Simple. Powerful. Beautiful.",
    description: "Everything you need to build modern web applications.",
    variant: "centered",
    primaryAction: {
      text: "Get Started",
    },
  },
};

export const WithCustomContent: Story = {
  args: {
    title: "Trusted by Industry Leaders",
    description: "Join thousands of companies building their future with our platform.",
    variant: "centered",
    primaryAction: {
      text: "Start Free Trial",
      variant: "default",
    },
    children: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {["Google", "Microsoft", "Amazon", "Apple"].map((company) => (
          <div key={company} className="flex items-center justify-center">
            <div className="text-2xl font-bold text-muted-foreground/50">{company}</div>
          </div>
        ))}
      </div>
    ),
  },
};

export const VideoBackground: Story = {
  args: {
    title: "Experience the Future",
    subtitle: "Immersive Technology",
    description: "Step into a world of endless possibilities with our cutting-edge solutions.",
    backgroundVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
    backgroundOverlay: true,
    primaryAction: {
      text: "Discover More",
    },
  },
};
