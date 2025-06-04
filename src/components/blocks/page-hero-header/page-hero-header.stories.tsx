import type { Meta, StoryObj } from "@storybook/react";
import { PageHeroHeader } from "./page-hero-header";

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
      options: ["centered", "split", "fullscreen", "minimal", "left-aligned", "right-aligned", "multi-column"],
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
} satisfies Meta<typeof PageHeroHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    variant: "centered",
    title: "Build Amazing Products Faster",
    subtitle: "The modern way to create exceptional user experiences",
    description: "Our platform provides everything you need to design, develop, and deploy beautiful applications at scale. Join thousands of teams already building with us.",
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
};

export const SplitWithImage: Story = {
  args: {
    variant: "split",
    title: "Welcome to the Future of Development",
    description: "Experience a new way of building applications with our cutting-edge tools and intuitive interface. Ship faster, scale better.",
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
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      alt: "Dashboard preview",
      position: "right",
    },
  },
};

export const FullscreenWithBackgroundImage: Story = {
  args: {
    variant: "fullscreen",
    title: "Unleash Your Creativity",
    subtitle: "Design without limits",
    description: "Join a community of creators building the next generation of digital experiences.",
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
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80",
      overlay: "gradient",
      overlayOpacity: 0.6,
    },
    height: "large",
    alignment: "center",
  },
};

export const Minimal: Story = {
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
};

export const LeftAligned: Story = {
  args: {
    variant: "left-aligned",
    title: "Transform Your Business",
    subtitle: "Enterprise-grade solutions for modern teams",
    description: "Streamline workflows, enhance collaboration, and drive growth with our comprehensive suite of tools designed for businesses of all sizes.",
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
};

export const WithStats: Story = {
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
};

export const SplitWithLeftImage: Story = {
  args: {
    variant: "split",
    title: "Designed for Developers",
    subtitle: "Built by developers, for developers",
    description: "Write less code, ship more features. Our intuitive API and comprehensive documentation make integration a breeze.",
    primaryCTA: {
      label: "View Documentation",
      variant: "default",
    },
    secondaryCTA: {
      label: "Try Playground",
      variant: "secondary",
    },
    image: {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      alt: "Code editor",
      position: "left",
    },
    alignment: "left",
  },
};

export const WithVideo: Story = {
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
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
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
};

export const MultiColumn: Story = {
  args: {
    variant: "multi-column",
    title: "Everything You Need to Succeed",
    subtitle: "Comprehensive tools for modern teams",
    description: "From ideation to deployment, we've got you covered with a complete suite of development tools.",
    primaryCTA: {
      label: "Get Started",
      variant: "default",
    },
    badges: [
      { text: "All-in-One Platform", variant: "secondary" },
    ],
  },
};

export const RightAligned: Story = {
  args: {
    variant: "right-aligned",
    title: "Ready to Scale?",
    subtitle: "Growth starts here",
    description: "Take your business to the next level with enterprise features and dedicated support.",
    primaryCTA: {
      label: "Talk to Sales",
      variant: "default",
      size: "lg",
    },
    alignment: "right",
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      alt: "Analytics dashboard",
      position: "bottom",
    },
  },
};

export const ColorfulBackground: Story = {
  args: {
    variant: "centered",
    title: "Stand Out from the Crowd",
    subtitle: "Make an impression that lasts",
    description: "Create stunning designs with our advanced customization options and pre-built templates.",
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
};

export const CompactWithAllElements: Story = {
  args: {
    variant: "centered",
    title: "Launch Your Next Project",
    subtitle: "From idea to production in days, not months",
    description: "Our platform accelerates development with pre-built components, automated workflows, and seamless integrations.",
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
};