import type { Meta, StoryObj } from "@storybook/react";
import { CallToAction } from "./call-to-action";
import { Rocket, Star, Zap } from "lucide-react";

const meta: Meta<typeof CallToAction> = {
  title: "Components/Marketing/CallToAction",
  component: CallToAction,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A call-to-action component for marketing sections with multiple style variants and background options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "gradient", "dark", "light"],
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
    overlay: {
      control: "boolean",
      description: "Whether to show overlay on background image",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Dark: Story = {
  args: {
    variant: "dark",
    title: "Join the dark side",
    description: "Embrace the power of modern UI design.",
    primaryAction: {
      label: "Join Now",
      href: "#",
    },
    icon: <Star className="h-10 w-10 text-yellow-400" />,
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    title: "Clean and minimal",
    description: "Sometimes less is more. Experience simplicity at its finest.",
    primaryAction: {
      label: "Get Started",
      href: "#",
    },
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

export const LeftAligned: Story = {
  args: {
    align: "left",
    title: "Build faster, ship sooner",
    description: "Our tools help you create amazing products in record time.",
    primaryAction: {
      label: "View Features",
      href: "#",
    },
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    title: "Quick and simple",
    description: "Get started in minutes.",
    primaryAction: {
      label: "Sign Up",
      href: "#",
    },
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "gradient",
    title: "The future is here",
    description: "Join the revolution and transform your business with cutting-edge technology.",
    primaryAction: {
      label: "Get Early Access",
      href: "#",
    },
    secondaryAction: {
      label: "Schedule Demo",
      href: "#",
    },
  },
};

export const NoActions: Story = {
  args: {
    title: "Coming Soon",
    description: "Something amazing is on the way. Stay tuned!",
    variant: "secondary",
  },
};

export const CustomContent: Story = {
  args: {
    title: "Newsletter Signup",
    description: "Stay updated with our latest news and updates.",
    variant: "primary",
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
