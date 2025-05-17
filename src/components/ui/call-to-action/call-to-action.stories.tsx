import type { Meta, StoryObj } from "@storybook/react";
import { CallToAction } from "./call-to-action";
import { Rocket, Star, Zap, Code2, Sparkles, ChevronRight } from "lucide-react";

const meta: Meta<typeof CallToAction> = {
  title: "Components/Marketing/CallToAction",
  component: CallToAction,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A call-to-action component for marketing sections with multiple style variants, animations, and background options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "gradient", "dark", "light", "glass"],
      description: "The visual style variant of the CTA",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "The size of the CTA",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment within the CTA",
    },
    title: {
      control: "text",
      description: "The main heading of the CTA",
    },
    description: {
      control: "text",
      description: "Supporting text for the CTA",
    },
    showArrow: {
      control: "boolean",
      description: "Whether to show arrow in primary action button",
    },
    decorative: {
      control: "boolean",
      description: "Whether to show decorative elements",
    },
    animated: {
      control: "boolean",
      description: "Whether to enable animations",
    },
    floatingShapes: {
      control: "boolean",
      description: "Whether to show floating background shapes",
    },
    overlay: {
      control: "boolean",
      description: "Whether to show overlay on background image",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AnimatedDefault: Story = {
  args: {
    variant: "default",
    animated: true,
    decorative: true,
    title: "Ready to Transform Your Business?",
    description: "Start your journey today with our cutting-edge platform",
    primaryAction: {
      label: "Start Free Trial",
      href: "#",
    },
    secondaryAction: {
      label: "Learn More",
      href: "#",
    },
  },
};

export const AnimatedGradient: Story = {
  args: {
    variant: "gradient",
    animated: true,
    floatingShapes: true,
    title: "The Future is Now",
    description: "Experience next-generation technology today",
    icon: <Rocket className="h-10 w-10" />,
    primaryAction: {
      label: "Launch Your Project",
      href: "#",
    },
    secondaryAction: {
      label: "Watch Demo",
      href: "#",
    },
  },
};

export const GlassMorphism: Story = {
  args: {
    variant: "glass",
    animated: true,
    floatingShapes: true,
    title: "Modern Glass Design",
    description: "Beautiful glassmorphism effects for premium experiences",
    icon: <Sparkles className="h-10 w-10" />,
    primaryAction: {
      label: "Explore Features",
      href: "#",
    },
  },
};

export const AnimatedWithBackground: Story = {
  args: {
    animated: true,
    floatingShapes: true,
    backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80",
    overlay: true,
    title: "Unlock Your Potential",
    description: "Join the revolution and build something amazing",
    primaryAction: {
      label: "Get Started Now",
      href: "#",
    },
    secondaryAction: {
      label: "View Pricing",
      href: "#",
    },
  },
};

export const DarkAnimated: Story = {
  args: {
    variant: "dark",
    animated: true,
    floatingShapes: true,
    title: "Premium Dark Experience",
    description: "Elegant dark mode with stunning animations",
    icon: <Code2 className="h-10 w-10" />,
    primaryAction: {
      label: "Start Building",
      href: "#",
    },
  },
};

export const LightAnimated: Story = {
  args: {
    variant: "light",
    animated: true,
    title: "Clean and Minimal",
    description: "Sometimes less is more - beautiful simplicity",
    icon: <Star className="h-10 w-10 text-gray-800" />,
    primaryAction: {
      label: "Get Started",
      href: "#",
    },
    secondaryAction: {
      label: "Learn More",
      href: "#",
    },
  },
};

export const LeftAlignedAnimated: Story = {
  args: {
    align: "left",
    animated: true,
    floatingShapes: true,
    title: "Developer-First Platform",
    description: "Built by developers, for developers. Experience the difference.",
    icon: <Zap className="h-10 w-10 text-primary" />,
    primaryAction: {
      label: "Start Coding",
      href: "#",
    },
    secondaryAction: {
      label: "Documentation",
      href: "#",
    },
  },
};

export const LargeAnimated: Story = {
  args: {
    size: "lg",
    variant: "primary",
    animated: true,
    floatingShapes: true,
    title: "Enterprise Solutions",
    description: "Scale your business with confidence using our enterprise-grade platform",
    primaryAction: {
      label: "Request Demo",
      href: "#",
    },
    secondaryAction: {
      label: "Contact Sales",
      href: "#",
    },
  },
};

export const SmallAnimated: Story = {
  args: {
    size: "sm",
    animated: true,
    title: "Quick Start Guide",
    description: "Get up and running in minutes",
    primaryAction: {
      label: "View Guide",
      href: "#",
    },
  },
};

export const Default: Story = {
  args: {
    title: "Ready to get started?",
    description: "Join thousands of satisfied customers using our platform.",
    primaryAction: {
      label: "Get Started",
      href: "#",
    },
    secondaryAction: {
      label: "Learn More",
      href: "#",
    },
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    title: "Boost your productivity",
    description: "Start building amazing products with our powerful tools.",
    primaryAction: {
      label: "Start Free Trial",
      href: "#",
    },
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    title: "Experience the future of design",
    description: "Create stunning interfaces with our next-generation component library.",
    primaryAction: {
      label: "Explore Now",
      href: "#",
    },
    secondaryAction: {
      label: "Watch Demo",
      href: "#",
    },
    icon: <Rocket className="h-12 w-12" />,
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: "Transform your workflow",
    description: "Discover a new way of working with our innovative platform.",
    backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000",
    primaryAction: {
      label: "Start Today",
      href: "#",
    },
    overlay: true,
  },
};

export const MaximalistAnimated: Story = {
  args: {
    variant: "gradient",
    size: "lg",
    animated: true,
    floatingShapes: true,
    decorative: true,
    title: "Experience the Future of Web Development",
    description: "Revolutionary tools that transform how you build modern applications",
    icon: <ChevronRight className="h-12 w-12" />,
    primaryAction: {
      label: "Start Your Journey",
      href: "#",
    },
    secondaryAction: {
      label: "Explore Features",
      href: "#",
    },
  },
};

export const CustomContent: Story = {
  args: {
    title: "Newsletter Signup",
    description: "Stay updated with our latest news and updates.",
    variant: "primary",
    animated: true,
    children: (
      <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
        >
          Subscribe
        </button>
      </form>
    ),
  },
};
