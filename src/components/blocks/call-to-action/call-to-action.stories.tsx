import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { CallToAction } from "./call-to-action";
import {
  Rocket,
  Star,
  Code2,
  Sparkles,
  ChevronRight,
  Shield,
  Check,
  Users,
  TrendingUp,
  Award,
  Heart,
} from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const meta: Meta<typeof CallToAction> = {
  title: "Blocks/CallToAction",
  component: CallToAction,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An advanced call-to-action block component with multiple variants, background options, form integration, and rich visual features for creating compelling conversion sections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "centered",
        "splitScreen",
        "withBackgroundImage",
        "gradient",
        "minimal",
        "bold",
        "formIntegrated",
        "default",
        "primary",
        "secondary",
        "dark",
        "light",
        "glass",
      ],
      description: "The visual style variant of the CTA",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
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
    subtitle: {
      control: "text",
      description: "Optional subtitle above the title",
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
    overlayOpacity: {
      control: "number",
      min: 0,
      max: 100,
      description: "Opacity of the background overlay",
    },
    backgroundPattern: {
      control: "select",
      options: ["dots", "grid", "lines", "circles"],
      description: "Background pattern style",
    },
    splitImagePosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of split screen image",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Centered Variant
export const Centered: Story = {
  args: {
    variant: "centered",
    animated: true,
    decorative: true,
    title: "Transform Your Business Today",
    subtitle: "Join 10,000+ companies",
    description: "Start your journey with our cutting-edge platform and see results within days",
    primaryAction: {
      label: "Start Free Trial",
      href: "#",
    },
    secondaryAction: {
      label: "Watch Demo",
      href: "#",
    },
    trustIndicators: [
      { icon: <Users />, label: "Active Users", value: "50K+" },
      { icon: <Star />, label: "Rating", value: "4.9/5" },
      { icon: <Shield />, label: "Uptime", value: "99.9%" },
    ],
  },
};

// Split Screen Variant
export const SplitScreen: Story = {
  args: {
    variant: "splitScreen",
    animated: true,
    title: "Build Better Products Faster",
    description: "Our platform helps teams collaborate, iterate, and ship amazing products",
    primaryAction: {
      label: "Get Started",
      href: "#",
      variant: "default",
    },
    secondaryAction: {
      label: "Learn More",
      href: "#",
    },
    splitImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    splitImagePosition: "right",
    trustIndicators: [
      { icon: <Award />, label: "Award Winning" },
      { icon: <Users />, label: "Trusted by 50K+ teams" },
    ],
  },
};

// With Background Image
export const WithBackgroundImage: Story = {
  args: {
    variant: "withBackgroundImage",
    animated: true,
    floatingShapes: true,
    backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80",
    overlay: true,
    overlayOpacity: 60,
    title: "Unlock Your Potential",
    description: "Join the revolution and build something amazing with our powerful tools",
    primaryAction: {
      label: "Start Building",
      href: "#",
    },
    secondaryAction: {
      label: "View Pricing",
      href: "#",
    },
    align: "center",
    size: "lg",
  },
};

// Gradient Animated
export const GradientAnimated: Story = {
  args: {
    variant: "gradient",
    animated: true,
    floatingShapes: true,
    decorative: true,
    title: "Experience the Future",
    subtitle: "Next Generation Platform",
    description: "Revolutionary tools that transform how you build modern applications",
    icon: <Rocket className="h-12 w-12" />,
    primaryAction: {
      label: "Launch Your Project",
      href: "#",
    },
    secondaryAction: {
      label: "Explore Features",
      href: "#",
    },
    trustIndicators: [
      { icon: <TrendingUp />, label: "Growth", value: "300%" },
      { icon: <Heart />, label: "Loved by", value: "25K+" },
    ],
  },
};

// Minimal Variant
export const Minimal: Story = {
  args: {
    variant: "minimal",
    animated: true,
    title: "Simple. Powerful. Yours.",
    description: "Everything you need, nothing you don't",
    primaryAction: {
      label: "Get Started",
      href: "#",
      variant: "outline",
    },
    align: "left",
  },
};

// Bold Variant
export const Bold: Story = {
  args: {
    variant: "bold",
    animated: true,
    floatingShapes: true,
    size: "xl",
    title: "Make an Impact",
    subtitle: "Limited Time Offer",
    description: "Join now and get 50% off your first year",
    primaryAction: {
      label: "Claim Your Discount",
      href: "#",
    },
    secondaryAction: {
      label: "See Terms",
      href: "#",
    },
    icon: <Sparkles className="h-16 w-16" />,
  },
};

// Form Integrated
export const FormIntegrated: Story = {
  args: {
    variant: "formIntegrated",
    animated: true,
    title: "Stay in the Loop",
    description: "Get the latest updates and exclusive content delivered to your inbox",
    formComponent: (
      <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input type="email" placeholder="Enter your email" className="flex-1" />
        <Button type="submit" size="lg">
          Subscribe
        </Button>
      </form>
    ),
    trustIndicators: [
      { label: "No spam, ever" },
      { label: "Unsubscribe anytime" },
      { label: "Weekly insights" },
    ],
  },
};

// With Background Video
export const WithBackgroundVideo: Story = {
  args: {
    variant: "withBackgroundImage",
    animated: true,
    backgroundVideo: "https://example.com/video.mp4", // Replace with actual video
    overlay: true,
    overlayOpacity: 70,
    title: "Create Something Amazing",
    description: "Join thousands of creators building the future",
    primaryAction: {
      label: "Start Creating",
      href: "#",
    },
    size: "lg",
  },
};

// With Background Pattern
export const WithBackgroundPattern: Story = {
  args: {
    variant: "primary",
    animated: true,
    backgroundPattern: "dots",
    title: "Developer-First Platform",
    description: "Built by developers, for developers. Experience the difference.",
    icon: <Code2 className="h-10 w-10" />,
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

// Custom Gradient
export const CustomGradient: Story = {
  args: {
    variant: "gradient",
    animated: true,
    gradientColors: {
      from: "#FF6B6B",
      via: "#4ECDC4",
      to: "#45B7D1",
    },
    title: "Unleash Your Creativity",
    description: "Design, build, and ship beautiful products",
    primaryAction: {
      label: "Start Designing",
      href: "#",
    },
  },
};

// With Custom Shapes
export const WithCustomShapes: Story = {
  args: {
    variant: "light",
    animated: true,
    title: "Shapes and Creativity",
    description: "Express yourself with custom visual elements",
    primaryAction: {
      label: "Explore",
      href: "#",
    },
    shapes: [
      {
        type: "circle",
        color: "blue-400/20",
        size: "100px",
        position: { top: "10%", right: "5%" },
      },
      {
        type: "square",
        color: "purple-400/20",
        size: "80px",
        position: { bottom: "15%", left: "10%" },
      },
      {
        type: "circle",
        color: "pink-400/20",
        size: "60px",
        position: { top: "50%", right: "20%" },
      },
    ],
  },
};

// Left Aligned
export const LeftAligned: Story = {
  args: {
    variant: "dark",
    align: "left",
    animated: true,
    floatingShapes: true,
    title: "Enterprise Solutions",
    subtitle: "For teams that demand more",
    description: "Scale your business with confidence using our enterprise-grade platform",
    primaryAction: {
      label: "Request Demo",
      href: "#",
    },
    secondaryAction: {
      label: "Contact Sales",
      href: "#",
    },
    tertiaryAction: {
      label: "View case studies",
      href: "#",
    },
  },
};

// Glass Morphism
export const GlassMorphism: Story = {
  args: {
    variant: "glass",
    animated: true,
    floatingShapes: true,
    backgroundImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
    overlay: false,
    title: "Premium Glass Design",
    description: "Beautiful glassmorphism effects for modern interfaces",
    icon: <Sparkles className="h-10 w-10" />,
    primaryAction: {
      label: "Explore Premium",
      href: "#",
    },
  },
};

// Multi-Action
export const MultiAction: Story = {
  args: {
    variant: "secondary",
    animated: true,
    size: "lg",
    title: "Choose Your Path",
    description: "Multiple ways to get started with our platform",
    primaryAction: {
      label: "Start Free Trial",
      href: "#",
      icon: <ChevronRight className="ml-2 h-4 w-4" />,
    },
    secondaryAction: {
      label: "Schedule Demo",
      href: "#",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    tertiaryAction: {
      label: "Compare plans",
      href: "#",
    },
  },
};

// Newsletter with Custom Form
export const NewsletterCustomForm: Story = {
  args: {
    variant: "primary",
    animated: true,
    title: "Developer Newsletter",
    description: "Weekly insights on building better software",
    formComponent: (
      <div className="mt-8 max-w-lg mx-auto">
        <form className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="First name"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Input
              type="text"
              placeholder="Last name"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <Input
            type="email"
            placeholder="Email address"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" className="mt-1" />
            <label htmlFor="terms" className="text-sm opacity-80">
              I agree to receive marketing emails and accept the privacy policy
            </label>
          </div>
          <Button type="submit" size="lg" className="w-full">
            Subscribe Now
          </Button>
        </form>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test form interactions
    const firstNameInput = canvas.getByPlaceholderText("First name");
    const lastNameInput = canvas.getByPlaceholderText("Last name");
    const emailInput = canvas.getByPlaceholderText("Email address");

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "john@example.com");

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(emailInput).toHaveValue("john@example.com");
  },
};

// Split Screen Left Image
export const SplitScreenLeftImage: Story = {
  args: {
    variant: "splitScreen",
    animated: true,
    title: "Design with Purpose",
    description: "Create meaningful experiences that users love",
    primaryAction: {
      label: "Start Designing",
      href: "#",
    },
    splitImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    splitImagePosition: "left",
    trustIndicators: [
      { icon: <Check />, label: "Easy to use" },
      { icon: <Check />, label: "Powerful features" },
      { icon: <Check />, label: "Great support" },
    ],
  },
};

// Compact
export const Compact: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    animated: true,
    title: "Quick Actions",
    description: "Get started in seconds",
    primaryAction: {
      label: "Go",
      href: "#",
    },
  },
};
