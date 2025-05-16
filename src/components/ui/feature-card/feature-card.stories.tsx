import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCard } from "./feature-card";
import {
  Zap,
  Shield,
  Rocket,
  Users,
  Clock,
  Code,
  BrainCog,
  Sparkles,
  Palette,
  Lock,
  Globe,
  Database,
} from "lucide-react";

const meta: Meta<typeof FeatureCard> = {
  title: "Components/Marketing/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: { type: "select", options: ["default", "highlighted", "minimal", "bordered"] },
    },
    orientation: {
      control: { type: "select", options: ["vertical", "horizontal"] },
    },
    align: {
      control: { type: "select", options: ["left", "center", "right"] },
    },
    badgeVariant: {
      control: {
        type: "select",
        options: ["default", "secondary", "destructive", "outline"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Lightning Fast",
    description: "Experience blazing fast performance with our optimized architecture.",
    icon: Zap,
    iconColor: "#facc15",
  },
};

export const WithBadge: Story = {
  args: {
    title: "Enterprise Security",
    description: "Bank-level encryption and security measures to protect your data.",
    icon: Shield,
    iconColor: "#10b981",
    badge: "Popular",
    badgeVariant: "secondary",
  },
};

export const Highlighted: Story = {
  args: {
    title: "AI-Powered Features",
    description: "Leverage cutting-edge artificial intelligence to enhance your workflow.",
    icon: BrainCog,
    iconColor: "#8b5cf6",
    variant: "highlighted",
    highlight: true,
    highlightColor: "#8b5cf6",
    badge: "Beta",
  },
};

export const Minimal: Story = {
  args: {
    title: "Clean Design",
    description: "Beautiful, minimalist interface that puts content first.",
    icon: Palette,
    iconColor: "#3b82f6",
    variant: "minimal",
  },
};

export const Bordered: Story = {
  args: {
    title: "Global Scale",
    description: "Deploy worldwide with our distributed infrastructure.",
    icon: Globe,
    iconColor: "#06b6d4",
    variant: "bordered",
  },
};

export const HorizontalLayout: Story = {
  args: {
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team in real-time.",
    icon: Users,
    iconColor: "#f59e0b",
    orientation: "horizontal",
  },
};

export const CenteredAlignment: Story = {
  args: {
    title: "Developer Friendly",
    description: "Built by developers, for developers. Clean APIs and comprehensive documentation.",
    icon: Code,
    iconColor: "#22c55e",
    align: "center",
  },
};

export const Clickable: Story = {
  args: {
    title: "Get Started",
    description: "Click to explore our powerful features and capabilities.",
    icon: Rocket,
    iconColor: "#dc2626",
    onClick: () => alert("Feature card clicked!"),
  },
};

export const WithCustomContent: Story = {
  args: {
    title: "Premium Features",
    description: "Unlock advanced capabilities with our premium plan.",
    icon: Sparkles,
    iconColor: "#a855f7",
    children: (
      <div className="space-y-2">
        <ul className="text-sm space-y-1">
          <li>• Unlimited projects</li>
          <li>• Advanced analytics</li>
          <li>• Priority support</li>
        </ul>
        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          Upgrade Now
        </button>
      </div>
    ),
  },
};

export const GridExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard
        title="Lightning Fast"
        description="Optimized for speed and performance."
        icon={Zap}
        iconColor="#facc15"
      />
      <FeatureCard
        title="Secure by Default"
        description="Enterprise-grade security built in."
        icon={Lock}
        iconColor="#10b981"
        badge="Popular"
      />
      <FeatureCard
        title="Scale Infinitely"
        description="Grow without limits using our infrastructure."
        icon={Database}
        iconColor="#3b82f6"
      />
      <FeatureCard
        title="24/7 Support"
        description="Round-the-clock assistance when you need it."
        icon={Clock}
        iconColor="#ef4444"
      />
      <FeatureCard
        title="Developer First"
        description="Built with developers in mind."
        icon={Code}
        iconColor="#8b5cf6"
        badge="New"
      />
      <FeatureCard
        title="Global Reach"
        description="Deploy anywhere in the world."
        icon={Globe}
        iconColor="#06b6d4"
      />
    </div>
  ),
};

export const HighlightedSet: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard
        title="Good"
        description="Essential features for getting started."
        icon={Rocket}
        iconColor="#6b7280"
        variant="default"
      />
      <FeatureCard
        title="Better"
        description="Enhanced capabilities for growing teams."
        icon={Zap}
        iconColor="#f59e0b"
        variant="highlighted"
        highlight={true}
        highlightColor="#f59e0b"
        badge="Recommended"
      />
      <FeatureCard
        title="Best"
        description="Everything you need for enterprise scale."
        icon={Shield}
        iconColor="#10b981"
        variant="default"
      />
    </div>
  ),
};
