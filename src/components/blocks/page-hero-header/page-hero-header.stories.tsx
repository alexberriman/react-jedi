import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PageHeroHeader, type PageHeroHeaderProperties } from "./page-hero-header";
import { enhanceStoryForDualMode } from "../../../../.storybook/utils/enhance-story";

const meta = {
  title: "Blocks/PageHeroHeader",
  component: PageHeroHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "centered",
        "split",
        "fullscreen",
        "minimal",
        "left-aligned",
        "right-aligned",
        "multi-column",
      ],
      description: "Layout variant of the hero header",
    },
    title: {
      control: "text",
      description: "Main heading text",
    },
    titleLevel: {
      control: "select",
      options: ["h1", "h2", "h3"],
      description: "HTML heading element to use",
    },
    subtitle: {
      control: "text",
      description: "Secondary heading text",
    },
    description: {
      control: "text",
      description: "Descriptive paragraph text",
    },
    height: {
      control: "select",
      options: ["full", "large", "medium", "auto"],
      description: "Height of the hero section",
    },
    alignment: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    spacing: {
      control: "select",
      options: ["tight", "normal", "loose"],
      description: "Vertical padding",
    },
    animated: {
      control: "boolean",
      description: "Enable entrance animations",
    },
  },
} satisfies Meta<PageHeroHeaderProperties>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered = enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "centered",
    title: "Build Amazing Products Faster",
    subtitle: "The modern way to create exceptional user experiences",
    description:
      "Our platform provides everything you need to design, develop, and deploy beautiful applications at scale. Join thousands of teams already building with us.",
    primaryCTA: {
      label: "Get Started Free",
      variant: "default",
      size: "lg",
      icon: "arrow",
    },
    secondaryCTA: {
      label: "Watch Demo",
      variant: "outline",
      size: "lg",
      icon: "play",
    },
    badges: [
      { text: "New", variant: "default" },
      { text: "v2.0 Released", variant: "secondary" },
    ],
    maxWidth: "full",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Build Amazing Products Faster")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("The modern way to create exceptional user experiences")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Our platform provides everything you need/)).toBeInTheDocument();

    // Test badges render
    expect(canvas.getByText("New")).toBeInTheDocument();
    expect(canvas.getByText("v2.0 Released")).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: /Get Started Free/ })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: /Watch Demo/ })).toBeInTheDocument();
  },
});

export const SplitWithImage = enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "split",
    title: "Welcome to the Future of Development",
    description:
      "Experience a new way of building applications with our cutting-edge tools and intuitive interface. Ship faster, scale better.",
    primaryCTA: {
      label: "Start Building",
      variant: "default",
      size: "lg",
    },
    secondaryCTA: {
      label: "Learn More",
      variant: "ghost",
      size: "lg",
      icon: "chevron",
    },
    image: {
      src: "https://placehold.co/800x450/EEE/31343C",
      alt: "Dashboard preview",
      position: "right",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Welcome to the Future of Development")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Experience a new way of building applications/)).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "Start Building" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Learn More" })).toBeInTheDocument();

    // Test image renders
    expect(canvas.getByAltText("Dashboard preview")).toBeInTheDocument();
  },
});

export const FullscreenWithBackgroundImage= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Unleash Your Creativity",
    subtitle: "Design without limits",
    description:
      "Join a community of creators building the next generation of digital experiences.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
      size: "lg",
    },
    tertiaryLink: {
      label: "Explore our gallery →",
      href: "#gallery",
    },
    backgroundImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      overlay: "gradient",
      overlayOpacity: 0.6,
    },
    height: "large",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Unleash Your Creativity")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Design without limits")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Join a community of creators/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();

    // Test tertiary link renders
    expect(canvas.getByText("Explore our gallery →")).toBeInTheDocument();
  },
});

export const Minimal= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "minimal",
    title: "Simple. Powerful. Yours.",
    description: "Everything you need to succeed, nothing you don't. Start your journey today.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
    },
    alignment: "center",
    spacing: "tight",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Simple. Powerful. Yours.")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Everything you need to succeed/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
  },
});

export const LeftAligned= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "left-aligned",
    title: "Transform Your Business",
    subtitle: "Enterprise-grade solutions for modern teams",
    description:
      "Streamline workflows, enhance collaboration, and drive growth with our comprehensive suite of tools designed for businesses of all sizes.",
    primaryCTA: {
      label: "Request Demo",
      variant: "default",
      size: "lg",
    },
    secondaryCTA: {
      label: "Contact Sales",
      variant: "outline",
      size: "lg",
    },
    badges: [
      { text: "SOC 2 Certified", variant: "outline" },
      { text: "99.9% Uptime", variant: "outline" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Transform Your Business")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Enterprise-grade solutions for modern teams")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Streamline workflows/)).toBeInTheDocument();

    // Test badges render
    expect(canvas.getByText("SOC 2 Certified")).toBeInTheDocument();
    expect(canvas.getByText("99.9% Uptime")).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "Request Demo" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Contact Sales" })).toBeInTheDocument();
  },
});

export const WithStats= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "centered",
    title: "Trusted by Teams Worldwide",
    description: "Join thousands of companies using our platform to build better products faster.",
    primaryCTA: {
      label: "Start Free Trial",
      variant: "default",
      size: "lg",
    },
    stats: [
      { value: "10K+", label: "Active Users" },
      { value: "50M+", label: "API Requests" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Support" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Trusted by Teams Worldwide")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Join thousands of companies/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Start Free Trial" })).toBeInTheDocument();

    // Test stats render
    expect(canvas.getByText("10K+")).toBeInTheDocument();
    expect(canvas.getByText("Active Users")).toBeInTheDocument();
    expect(canvas.getByText("50M+")).toBeInTheDocument();
    expect(canvas.getByText("API Requests")).toBeInTheDocument();
    expect(canvas.getByText("99.9%")).toBeInTheDocument();
    expect(canvas.getByText("Uptime")).toBeInTheDocument();
    expect(canvas.getByText("24/7")).toBeInTheDocument();
    expect(canvas.getByText("Support")).toBeInTheDocument();
  },
});

export const SplitWithLeftImage= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "split",
    title: "Designed for Developers",
    subtitle: "Built by developers, for developers",
    description:
      "Write less code, ship more features. Our intuitive API and comprehensive documentation make integration a breeze.",
    primaryCTA: {
      label: "View Documentation",
      variant: "default",
    },
    secondaryCTA: {
      label: "Try Playground",
      variant: "secondary",
    },
    image: {
      src: "https://placehold.co/800x450/EEE/31343C",
      alt: "Code editor",
      position: "left",
    },
    alignment: "left",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Designed for Developers")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Built by developers, for developers")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Write less code, ship more features/)).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "View Documentation" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Try Playground" })).toBeInTheDocument();

    // Test image renders
    expect(canvas.getByAltText("Code editor")).toBeInTheDocument();
  },
});

export const WithVideo= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Experience the Difference",
    subtitle: "See what's possible",
    primaryCTA: {
      label: "Start Now",
      variant: "default",
      size: "lg",
    },
    video: {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://placehold.co/1600x900/EEE/31343C",
      autoPlay: true,
      loop: true,
      muted: true,
    },
    backgroundImage: {
      src: "", // Empty src since video is primary
      overlay: "dark",
      overlayOpacity: 0.7,
    },
    height: "large",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Experience the Difference")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("See what's possible")).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Start Now" })).toBeInTheDocument();

    // Test video element renders
    const video = canvasElement.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("autoplay", "");
    expect(video).toHaveAttribute("loop", "");
    expect(video).toHaveAttribute("playsinline", "");
  },
});

export const MultiColumn= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "multi-column",
    title: "Everything You Need to Succeed",
    subtitle: "Comprehensive tools for modern teams",
    description:
      "From ideation to deployment, we've got you covered with a complete suite of development tools.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
    },
    badges: [{ text: "All-in-One Platform", variant: "secondary" }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Everything You Need to Succeed")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Comprehensive tools for modern teams")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/From ideation to deployment/)).toBeInTheDocument();

    // Test badge renders
    expect(canvas.getByText("All-in-One Platform")).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
  },
});

export const RightAligned= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "right-aligned",
    title: "Ready to Scale?",
    subtitle: "Growth starts here",
    description:
      "Take your business to the next level with enterprise features and dedicated support.",
    primaryCTA: {
      label: "Talk to Sales",
      variant: "default",
      size: "lg",
    },
    alignment: "right",
    image: {
      src: "https://placehold.co/800x450/EEE/31343C",
      alt: "Analytics dashboard",
      position: "bottom",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Ready to Scale?")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Growth starts here")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Take your business to the next level/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Talk to Sales" })).toBeInTheDocument();

    // Test image renders
    expect(canvas.getByAltText("Analytics dashboard")).toBeInTheDocument();
  },
});

export const ColorfulBackground= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "centered",
    title: "Stand Out from the Crowd",
    subtitle: "Make an impression that lasts",
    description:
      "Create stunning designs with our advanced customization options and pre-built templates.",
    primaryCTA: {
      label: "Browse Templates",
      variant: "secondary",
      size: "lg",
    },
    secondaryCTA: {
      label: "Learn More",
      variant: "outline",
      size: "lg",
    },
    backgroundColor: "bg-gradient-to-br from-purple-600 to-blue-600",
    textColor: "white",
    height: "large",
    backgroundImage: {
      src: "",
      overlay: "dark",
      overlayOpacity: 0.2,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Stand Out from the Crowd")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Make an impression that lasts")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Create stunning designs/)).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "Browse Templates" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  },
});

export const CompactWithAllElements= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "centered",
    title: "Launch Your Next Project",
    subtitle: "From idea to production in days, not months",
    description:
      "Our platform accelerates development with pre-built components, automated workflows, and seamless integrations.",
    primaryCTA: {
      label: "Start Building",
      variant: "default",
    },
    secondaryCTA: {
      label: "View Pricing",
      variant: "outline",
    },
    tertiaryLink: {
      label: "Read customer stories",
      href: "#stories",
    },
    badges: [
      { text: "Free Trial", variant: "default" },
      { text: "No Credit Card Required", variant: "outline" },
    ],
    spacing: "tight",
    height: "auto",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Launch Your Next Project")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("From idea to production in days, not months")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Our platform accelerates development/)).toBeInTheDocument();

    // Test badges render
    expect(canvas.getByText("Free Trial")).toBeInTheDocument();
    expect(canvas.getByText("No Credit Card Required")).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "Start Building" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "View Pricing" })).toBeInTheDocument();

    // Test tertiary link renders
    expect(canvas.getByText("Read customer stories")).toBeInTheDocument();
  },
});

export const WithDarkOverlay= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Create Something Amazing",
    subtitle: "Your vision, our platform",
    description:
      "Build beautiful, responsive applications with our comprehensive development toolkit.",
    primaryCTA: {
      label: "Start Free Trial",
      variant: "default",
      size: "lg",
    },
    secondaryCTA: {
      label: "View Examples",
      variant: "outline",
      size: "lg",
    },
    backgroundImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      overlay: "dark",
      overlayOpacity: 0.6,
    },
    height: "large",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Create Something Amazing")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Your vision, our platform")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Build beautiful, responsive applications/)).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "Start Free Trial" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "View Examples" })).toBeInTheDocument();
  },
});

export const WithLightOverlay= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Welcome to Innovation",
    subtitle: "Where ideas come to life",
    description: "Transform your concepts into reality with our cutting-edge technology stack.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
      size: "lg",
    },
    backgroundImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      overlay: "light",
      overlayOpacity: 0.8,
    },
    height: "large",
    alignment: "center",
    textColor: "#1a1a1a",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Welcome to Innovation")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Where ideas come to life")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Transform your concepts into reality/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
  },
});

export const WithSubtleOverlay= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Elevate Your Business",
    subtitle: "Professional tools for professional teams",
    description:
      "Streamline your workflow with enterprise-grade features and seamless integrations.",
    primaryCTA: {
      label: "Request Demo",
      variant: "default",
      size: "lg",
      icon: "arrow",
    },
    backgroundImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      overlay: "dark",
      overlayOpacity: 0.3,
    },
    height: "large",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Elevate Your Business")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Professional tools for professional teams")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Streamline your workflow/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Request Demo" })).toBeInTheDocument();
  },
});

export const WithNoOverlay= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Pure and Simple",
    subtitle: "No distractions, just results",
    description: "Experience the clarity of our minimalist design approach.",
    primaryCTA: {
      label: "Explore",
      variant: "default",
      size: "lg",
    },
    backgroundImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      overlay: "none",
    },
    height: "large",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Pure and Simple")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("No distractions, just results")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Experience the clarity/)).toBeInTheDocument();

    // Test CTA button renders
    expect(canvas.getByRole("button", { name: "Explore" })).toBeInTheDocument();
  },
});

export const WithHeavyOverlay= enhanceStoryForDualMode<PageHeroHeaderProperties>({
  args: {
    variant: "fullscreen",
    title: "Focus on What Matters",
    subtitle: "Cut through the noise",
    description:
      "Our platform helps you concentrate on building great products without the complexity.",
    primaryCTA: {
      label: "Start Building",
      variant: "default",
      size: "lg",
    },
    secondaryCTA: {
      label: "Learn More",
      variant: "outline",
      size: "lg",
    },
    backgroundImage: {
      src: "https://placehold.co/1600x900/EEE/31343C",
      overlay: "dark",
      overlayOpacity: 0.85,
    },
    height: "large",
    alignment: "center",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hero title renders
    expect(canvas.getByText("Focus on What Matters")).toBeInTheDocument();

    // Test subtitle renders
    expect(canvas.getByText("Cut through the noise")).toBeInTheDocument();

    // Test description renders
    expect(canvas.getByText(/Our platform helps you concentrate/)).toBeInTheDocument();

    // Test CTA buttons render
    expect(canvas.getByRole("button", { name: "Start Building" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Learn More" })).toBeInTheDocument();
  },
});
