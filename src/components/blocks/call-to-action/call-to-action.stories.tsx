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
import { enhanceStoryForDualMode } from "../../../.storybook/utils/enhance-story";

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
export const Centered: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Transform Your Business Today");
    expect(title).toBeInTheDocument();

    // Test subtitle renders
    const subtitle = canvas.getByText("Join 10,000+ companies");
    expect(subtitle).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText(/Start your journey with our cutting-edge platform/);
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Start Free Trial/i });
    expect(primaryButton).toBeInTheDocument();

    // Test secondary action button
    const secondaryButton = canvas.getByRole("link", { name: /Watch Demo/i });
    expect(secondaryButton).toBeInTheDocument();

    // Test trust indicators
    expect(canvas.getByText("50K+")).toBeInTheDocument();
    expect(canvas.getByText("4.9/5")).toBeInTheDocument();
    expect(canvas.getByText("99.9%")).toBeInTheDocument();
  },
});

// Split Screen Variant
export const SplitScreen: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
    splitImage: "https://placehold.co/1200x800/EEE/31343C",
    splitImagePosition: "right",
    trustIndicators: [
      { icon: <Award />, label: "Award Winning" },
      { icon: <Users />, label: "Trusted by 50K+ teams" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Build Better Products Faster");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText(/Our platform helps teams collaborate/);
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Get Started/i });
    expect(primaryButton).toBeInTheDocument();

    // Test secondary action button
    const secondaryButton = canvas.getByRole("link", { name: /Learn More/i });
    expect(secondaryButton).toBeInTheDocument();

    // Test trust indicators
    expect(canvas.getByText("Award Winning")).toBeInTheDocument();
    expect(canvas.getByText("Trusted by 50K+ teams")).toBeInTheDocument();

    // Test split image renders
    const image = canvas.getByRole("img");
    expect(image).toBeInTheDocument();
  },
});

// With Background Image
export const WithBackgroundImage: Story = enhanceStoryForDualMode<typeof CallToAction>({
  args: {
    variant: "withBackgroundImage",
    animated: true,
    floatingShapes: true,
    backgroundImage: "https://placehold.co/1920x1080/EEE/31343C",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Unlock Your Potential");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText(/Join the revolution and build something amazing/);
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Start Building/i });
    expect(primaryButton).toBeInTheDocument();

    // Test secondary action button
    const secondaryButton = canvas.getByRole("link", { name: /View Pricing/i });
    expect(secondaryButton).toBeInTheDocument();
  },
});

// Gradient Animated
export const GradientAnimated: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Experience the Future");
    expect(title).toBeInTheDocument();

    // Test subtitle renders
    const subtitle = canvas.getByText("Next Generation Platform");
    expect(subtitle).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText(/Revolutionary tools that transform/);
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Launch Your Project/i });
    expect(primaryButton).toBeInTheDocument();

    // Test secondary action button
    const secondaryButton = canvas.getByRole("link", { name: /Explore Features/i });
    expect(secondaryButton).toBeInTheDocument();

    // Test trust indicators
    expect(canvas.getByText("300%")).toBeInTheDocument();
    expect(canvas.getByText("25K+")).toBeInTheDocument();
  },
});

// Minimal Variant
export const Minimal: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Simple. Powerful. Yours.");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Everything you need, nothing you don't");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Get Started/i });
    expect(primaryButton).toBeInTheDocument();
  },
});

// Bold Variant
export const Bold: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Make an Impact");
    expect(title).toBeInTheDocument();

    // Test subtitle renders
    const subtitle = canvas.getByText("Limited Time Offer");
    expect(subtitle).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Join now and get 50% off your first year");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Claim Your Discount/i });
    expect(primaryButton).toBeInTheDocument();

    // Test secondary action button
    const secondaryButton = canvas.getByRole("link", { name: /See Terms/i });
    expect(secondaryButton).toBeInTheDocument();
  },
});

// Form Integrated
export const FormIntegrated: Story = enhanceStoryForDualMode<typeof CallToAction>(
  {
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      // Test title renders
      const title = canvas.getByText("Stay in the Loop");
      expect(title).toBeInTheDocument();

      // Test description renders
      const description = canvas.getByText(/Get the latest updates and exclusive content/);
      expect(description).toBeInTheDocument();

      // Test form elements
      const emailInput = canvas.getByPlaceholderText("Enter your email");
      expect(emailInput).toBeInTheDocument();

      const subscribeButton = canvas.getByRole("button", { name: /Subscribe/i });
      expect(subscribeButton).toBeInTheDocument();

      // Test trust indicators
      expect(canvas.getByText("No spam, ever")).toBeInTheDocument();
      expect(canvas.getByText("Unsubscribe anytime")).toBeInTheDocument();
      expect(canvas.getByText("Weekly insights")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "CallToAction",
      variant: "formIntegrated",
      animated: true,
      title: "Stay in the Loop",
      description: "Get the latest updates and exclusive content delivered to your inbox",
      formComponent: {
        type: "Box",
        element: "form",
        className: "mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto",
        children: [
          {
            type: "Input",
            inputType: "email",
            placeholder: "Enter your email",
            className: "flex-1",
          },
          {
            type: "Button",
            buttonType: "submit",
            size: "lg",
            children: "Subscribe",
          },
        ],
      },
      trustIndicators: [
        { label: "No spam, ever" },
        { label: "Unsubscribe anytime" },
        { label: "Weekly insights" },
      ],
    },
  }
);

// With Background Video
export const WithBackgroundVideo: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Create Something Amazing");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Join thousands of creators building the future");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Start Creating/i });
    expect(primaryButton).toBeInTheDocument();
  },
});

// With Background Pattern
export const WithBackgroundPattern: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Developer-First Platform");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText(/Built by developers, for developers/);
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Start Coding/i });
    expect(primaryButton).toBeInTheDocument();

    // Test secondary action button
    const secondaryButton = canvas.getByRole("link", { name: /Documentation/i });
    expect(secondaryButton).toBeInTheDocument();
  },
});

// Custom Gradient
export const CustomGradient: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Unleash Your Creativity");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Design, build, and ship beautiful products");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Start Designing/i });
    expect(primaryButton).toBeInTheDocument();
  },
});

// With Custom Shapes
export const WithCustomShapes: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Shapes and Creativity");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Express yourself with custom visual elements");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Explore/i });
    expect(primaryButton).toBeInTheDocument();
  },
});

// Left Aligned
export const LeftAligned: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Enterprise Solutions");
    expect(title).toBeInTheDocument();

    // Test subtitle renders
    const subtitle = canvas.getByText("For teams that demand more");
    expect(subtitle).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText(/Scale your business with confidence/);
    expect(description).toBeInTheDocument();

    // Test all three action buttons
    const primaryButton = canvas.getByRole("link", { name: /Request Demo/i });
    expect(primaryButton).toBeInTheDocument();

    const secondaryButton = canvas.getByRole("link", { name: /Contact Sales/i });
    expect(secondaryButton).toBeInTheDocument();

    const tertiaryButton = canvas.getByRole("link", { name: /View case studies/i });
    expect(tertiaryButton).toBeInTheDocument();
  },
});

// Glass Morphism
export const GlassMorphism: Story = enhanceStoryForDualMode<typeof CallToAction>({
  args: {
    variant: "glass",
    animated: true,
    floatingShapes: true,
    backgroundImage: "https://placehold.co/1920x1080/EEE/31343C",
    overlay: false,
    title: "Premium Glass Design",
    description: "Beautiful glassmorphism effects for modern interfaces",
    icon: <Sparkles className="h-10 w-10" />,
    primaryAction: {
      label: "Explore Premium",
      href: "#",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Premium Glass Design");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Beautiful glassmorphism effects for modern interfaces");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Explore Premium/i });
    expect(primaryButton).toBeInTheDocument();
  },
});

// Multi-Action
export const MultiAction: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Choose Your Path");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Multiple ways to get started with our platform");
    expect(description).toBeInTheDocument();

    // Test all three action buttons
    const primaryButton = canvas.getByRole("link", { name: /Start Free Trial/i });
    expect(primaryButton).toBeInTheDocument();

    const secondaryButton = canvas.getByRole("link", { name: /Schedule Demo/i });
    expect(secondaryButton).toBeInTheDocument();

    const tertiaryButton = canvas.getByRole("link", { name: /Compare plans/i });
    expect(tertiaryButton).toBeInTheDocument();
  },
});

// Newsletter with Custom Form
export const NewsletterCustomForm: Story = enhanceStoryForDualMode<typeof CallToAction>(
  {
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

      // Test title and description render
      const title = canvas.getByText("Developer Newsletter");
      expect(title).toBeInTheDocument();

      const description = canvas.getByText("Weekly insights on building better software");
      expect(description).toBeInTheDocument();

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
  },
  {
    renderSpec: {
      type: "CallToAction",
      variant: "primary",
      animated: true,
      title: "Developer Newsletter",
      description: "Weekly insights on building better software",
      formComponent: {
        type: "Box",
        className: "mt-8 max-w-lg mx-auto",
        children: {
          type: "Box",
          element: "form",
          className: "space-y-4",
          children: [
            {
              type: "Flex",
              gap: "md",
              children: [
                {
                  type: "Input",
                  inputType: "text",
                  placeholder: "First name",
                  className: "flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60",
                },
                {
                  type: "Input",
                  inputType: "text",
                  placeholder: "Last name",
                  className: "flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60",
                },
              ],
            },
            {
              type: "Input",
              inputType: "email",
              placeholder: "Email address",
              className: "bg-white/10 border-white/20 text-white placeholder:text-white/60",
            },
            {
              type: "Flex",
              align: "start",
              gap: "sm",
              children: [
                {
                  type: "Box",
                  element: "input",
                  inputType: "checkbox",
                  id: "terms",
                  className: "mt-1",
                },
                {
                  type: "Text",
                  element: "label",
                  htmlFor: "terms",
                  className: "text-sm opacity-80",
                  children: "I agree to receive marketing emails and accept the privacy policy",
                },
              ],
            },
            {
              type: "Button",
              buttonType: "submit",
              size: "lg",
              className: "w-full",
              children: "Subscribe Now",
            },
          ],
        },
      },
    },
  }
);

// Split Screen Left Image
export const SplitScreenLeftImage: Story = enhanceStoryForDualMode<typeof CallToAction>({
  args: {
    variant: "splitScreen",
    animated: true,
    title: "Design with Purpose",
    description: "Create meaningful experiences that users love",
    primaryAction: {
      label: "Start Designing",
      href: "#",
    },
    splitImage: "https://placehold.co/1200x800/EEE/31343C",
    splitImagePosition: "left",
    trustIndicators: [
      { icon: <Check />, label: "Easy to use" },
      { icon: <Check />, label: "Powerful features" },
      { icon: <Check />, label: "Great support" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Design with Purpose");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Create meaningful experiences that users love");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Start Designing/i });
    expect(primaryButton).toBeInTheDocument();

    // Test trust indicators
    expect(canvas.getByText("Easy to use")).toBeInTheDocument();
    expect(canvas.getByText("Powerful features")).toBeInTheDocument();
    expect(canvas.getByText("Great support")).toBeInTheDocument();

    // Test split image renders
    const image = canvas.getByRole("img");
    expect(image).toBeInTheDocument();
  },
});

// Compact
export const Compact: Story = enhanceStoryForDualMode<typeof CallToAction>({
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test title renders
    const title = canvas.getByText("Quick Actions");
    expect(title).toBeInTheDocument();

    // Test description renders
    const description = canvas.getByText("Get started in seconds");
    expect(description).toBeInTheDocument();

    // Test primary action button
    const primaryButton = canvas.getByRole("link", { name: /Go/i });
    expect(primaryButton).toBeInTheDocument();
  },
});
