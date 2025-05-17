import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./hero";
import { Rocket, Star, Code2, Zap } from "lucide-react";

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
    animated: {
      control: { type: "boolean" },
    },
    floatingShapes: {
      control: { type: "boolean" },
    },
    parallax: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AnimatedCentered: Story = {
  args: {
    title: "Welcome to the Future 2025",
    subtitle: "Next Generation Platform",
    description:
      "Experience the power of modern web development with our cutting-edge tools and seamless integrations.",
    variant: "centered",
    animated: true,
    floatingShapes: true,
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

export const LeftAlignedAnimated: Story = {
  args: {
    title: "Build Something Amazing",
    subtitle: "Developer First",
    description:
      "Create beautiful, responsive websites with our intuitive design system. No compromises on performance or accessibility.",
    variant: "left-aligned",
    animated: true,
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

export const SplitWithParallax: Story = {
  args: {
    title: "The Modern Way to Build",
    subtitle: "Revolutionary Design",
    description:
      "Transform your development workflow with our powerful component library and design system.",
    variant: "split",
    animated: true,
    parallax: true,
    primaryAction: {
      text: "Try It Now",
    },
    secondaryAction: {
      text: "Watch Demo",
      variant: "secondary",
    },
    children: (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl animate-scale-in animation-delay-800">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
};

export const WithAnimatedBackground: Story = {
  args: {
    title: "Innovate Without Limits",
    subtitle: "Enterprise Ready",
    description: "Scale your business with confidence using our enterprise-grade infrastructure.",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    backgroundOverlay: true,
    animated: true,
    parallax: true,
    primaryAction: {
      text: "Request Demo",
    },
  },
};

export const AnimatedGradient: Story = {
  args: {
    title: "Design Beautiful Interfaces",
    subtitle: "UI/UX Excellence",
    description:
      "Create stunning user experiences with our modern design principles and components.",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%, #667eea 0%)",
    animated: true,
    floatingShapes: true,
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

export const MinimalAnimated: Story = {
  args: {
    title: "Simple. Powerful. Beautiful.",
    description: "Everything you need to build modern web applications.",
    variant: "centered",
    animated: true,
    primaryAction: {
      text: "Get Started",
    },
  },
};

export const FloatingElements: Story = {
  args: {
    title: "Trusted by Industry Leaders",
    description: "Join thousands of companies building their future with our platform.",
    variant: "centered",
    animated: true,
    floatingShapes: true,
    primaryAction: {
      text: "Start Free Trial",
      variant: "default",
    },
    children: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 stagger-animation">
        {[
          { name: "Google", icon: <Star className="h-6 w-6" /> },
          { name: "Microsoft", icon: <Code2 className="h-6 w-6" /> },
          { name: "Amazon", icon: <Rocket className="h-6 w-6" /> },
          { name: "Apple", icon: <Zap className="h-6 w-6" /> },
        ].map((company) => (
          <div
            key={company.name}
            className="flex flex-col items-center justify-center gap-2 text-muted-foreground/50 hover-scale"
          >
            {company.icon}
            <div className="text-xl font-bold">{company.name}</div>
          </div>
        ))}
      </div>
    ),
  },
};

export const VideoBackgroundAnimated: Story = {
  args: {
    title: "Experience the Future",
    subtitle: "Immersive Technology",
    description: "Step into a world of endless possibilities with our cutting-edge solutions.",
    backgroundVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
    backgroundOverlay: true,
    animated: true,
    parallax: true,
    primaryAction: {
      text: "Discover More",
    },
  },
};

export const GlassMorphism: Story = {
  args: {
    title: "Next-Gen Interface Design",
    subtitle: "Glassmorphism Example",
    description:
      "Beautiful glass effects that adapt to any background with modern blur and transparency.",
    backgroundImage: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1920&q=80",
    backgroundOverlay: false,
    animated: true,
    floatingShapes: true,
    primaryAction: {
      text: "Explore Design",
      variant: "secondary",
    },
    secondaryAction: {
      text: "Learn More",
      variant: "outline",
    },
  },
};
