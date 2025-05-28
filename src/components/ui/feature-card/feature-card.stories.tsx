import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the title is rendered
    expect(canvas.getByText('Lightning Fast')).toBeInTheDocument();
    
    // Verify the description is rendered
    expect(canvas.getByText('Experience blazing fast performance with our optimized architecture.')).toBeInTheDocument();
    
    // Verify the icon is rendered (by checking for svg element)
    const svgIcon = canvas.getByRole('img', { hidden: true });
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveClass('lucide');
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the badge is rendered
    const badge = canvas.getByText('Popular');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-slot', 'badge');
    
    // Verify title and description
    expect(canvas.getByText('Enterprise Security')).toBeInTheDocument();
    expect(canvas.getByText('Bank-level encryption and security measures to protect your data.')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify highlighted variant styling
    const card = canvas.getByRole('article');
    expect(card).toHaveClass('border-2', 'bg-gradient-to-br', 'shadow-lg');
    
    // Verify badge
    expect(canvas.getByText('Beta')).toBeInTheDocument();
    
    // Verify content
    expect(canvas.getByText('AI-Powered Features')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify minimal variant styling
    const card = canvas.getByRole('article');
    expect(card).toHaveClass('border-0', 'bg-transparent', 'shadow-none');
    
    // Verify content
    expect(canvas.getByText('Clean Design')).toBeInTheDocument();
    expect(canvas.getByText('Beautiful, minimalist interface that puts content first.')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify bordered variant styling
    const card = canvas.getByRole('article');
    expect(card).toHaveClass('border-2');
    
    // Verify content
    expect(canvas.getByText('Global Scale')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify horizontal orientation - check the header has horizontal layout
    const cardHeader = canvas.getByRole('article').querySelector('[class*="flex-row"]');
    expect(cardHeader).toBeInTheDocument();
    
    // Verify content layout
    expect(canvas.getByText('Real-time Collaboration')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify centered alignment - check the alignment wrapper (grandparent of title)
    const titleElement = canvas.getByText('Developer Friendly');
    const contentWrapper = titleElement.parentElement?.parentElement;
    expect(contentWrapper).toHaveClass('text-center', 'items-center');
    
    // Verify content
    expect(canvas.getByText('Built by developers, for developers. Clean APIs and comprehensive documentation.')).toBeInTheDocument();
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Mock window.alert
    const originalAlert = globalThis.alert;
    let alertMessage = '';
    globalThis.alert = (message: string) => {
      alertMessage = message;
    };
    
    // Find and click the card
    const card = canvas.getByRole('article');
    expect(card).toHaveStyle({ cursor: 'pointer' });
    
    await userEvent.click(card);
    
    // Verify alert was called
    expect(alertMessage).toBe('Feature card clicked!');
    
    // Clean up
    globalThis.alert = originalAlert;
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify custom content is rendered
    expect(canvas.getByText('• Unlimited projects')).toBeInTheDocument();
    expect(canvas.getByText('• Advanced analytics')).toBeInTheDocument();
    expect(canvas.getByText('• Priority support')).toBeInTheDocument();
    
    // Verify custom button
    const upgradeButton = canvas.getByRole('button', { name: /upgrade now/i });
    expect(upgradeButton).toBeInTheDocument();
    
    // Test button hover state
    await userEvent.hover(upgradeButton);
    expect(upgradeButton).toHaveClass('hover:bg-primary/90');
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all 6 cards are rendered
    const cards = canvas.getAllByRole('article');
    expect(cards).toHaveLength(6);
    
    // Verify specific cards
    expect(canvas.getByText('Lightning Fast')).toBeInTheDocument();
    expect(canvas.getByText('Secure by Default')).toBeInTheDocument();
    expect(canvas.getByText('Scale Infinitely')).toBeInTheDocument();
    expect(canvas.getByText('24/7 Support')).toBeInTheDocument();
    expect(canvas.getByText('Developer First')).toBeInTheDocument();
    expect(canvas.getByText('Global Reach')).toBeInTheDocument();
    
    // Verify badges
    expect(canvas.getByText('Popular')).toBeInTheDocument();
    expect(canvas.getByText('New')).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify 3 cards are rendered
    const cards = canvas.getAllByRole('article');
    expect(cards).toHaveLength(3);
    
    // Verify the middle card is highlighted
    const betterCard = cards[1];
    expect(betterCard).toHaveClass('border-2', 'bg-gradient-to-br', 'shadow-lg');
    
    // Verify the "Recommended" badge on highlighted card
    expect(within(betterCard).getByText('Recommended')).toBeInTheDocument();
    
    // Verify other cards are not highlighted
    expect(cards[0]).not.toHaveClass('bg-gradient-to-br');
    expect(cards[2]).not.toHaveClass('bg-gradient-to-br');
  },
};
