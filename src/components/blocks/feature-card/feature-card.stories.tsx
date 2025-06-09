import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureCard, FeatureCardGrid, TabbedFeatureCards } from "./feature-card";
import { expect, within } from "storybook/test";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import {
  Zap,
  Shield,
  Rocket,
  BarChart,
  Settings,
  Package,
} from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaGithub,
  FaFigma,
  FaSlack,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
} from "react-icons/si";

const meta: Meta<typeof FeatureCard> = {
  title: "Blocks/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "highlighted", "minimal", "bordered", "gradient", "shadow", "glass"],
    },
    iconPosition: {
      control: "select",
      options: ["top", "left", "right", "background"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
    shadowSize: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
    },
    hoverEffect: {
      control: "select",
      options: ["none", "lift", "glow", "pulse", "rotate"],
    },
    iconSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = enhanceStoryForDualMode<typeof FeatureCard>(
  {
    args: {
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized infrastructure.",
      icon: "Zap",
      iconColor: "#FFB800",
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test that the title renders
      expect(canvas.getByText("Lightning Fast")).toBeInTheDocument();
      
      // Test that the description renders
      expect(canvas.getByText("Experience blazing fast performance with our optimized infrastructure.")).toBeInTheDocument();
      
      // Test that the icon container renders
      const iconContainer = canvasElement.querySelector('[data-slot="icon"]');
      expect(iconContainer).toBeInTheDocument();
      
      // Test that the card has the correct role
      expect(canvas.getByRole("article")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "FeatureCard",
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized infrastructure.",
      icon: "Zap",
      iconColor: "#FFB800",
    },
  }
) as Story;

export const IconPositions: Story = enhanceStoryForDualMode<typeof FeatureCard>(
  {
    render: () => (
      <div className="space-y-6">
        <FeatureCard
          title="Icon Top (Default)"
          description="The icon is positioned at the top of the card."
          icon="Rocket"
          iconPosition="top"
          iconColor="#FF6B6B"
        />

        <FeatureCard
          title="Icon Left"
          description="The icon is positioned to the left of the content."
          icon="Shield"
          iconPosition="left"
          iconColor="#4ECDC4"
        />

        <FeatureCard
          title="Icon Right"
          description="The icon is positioned to the right of the content."
          icon="Users"
          iconPosition="right"
          iconColor="#45B7D1"
        />

        <FeatureCard
          title="Icon Background"
          description="The icon appears as a subtle background element."
          icon="Cloud"
          iconPosition="background"
          iconColor="#6C5CE7"
        />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all four cards render
      expect(canvas.getByText("Icon Top (Default)")).toBeInTheDocument();
      expect(canvas.getByText("Icon Left")).toBeInTheDocument();
      expect(canvas.getByText("Icon Right")).toBeInTheDocument();
      expect(canvas.getByText("Icon Background")).toBeInTheDocument();
      
      // Test descriptions
      expect(canvas.getByText("The icon is positioned at the top of the card.")).toBeInTheDocument();
      expect(canvas.getByText("The icon is positioned to the left of the content.")).toBeInTheDocument();
      expect(canvas.getByText("The icon is positioned to the right of the content.")).toBeInTheDocument();
      expect(canvas.getByText("The icon appears as a subtle background element.")).toBeInTheDocument();
      
      // Test that we have 4 cards
      const cards = canvas.getAllByRole("article");
      expect(cards).toHaveLength(4);
    },
  },
  {
    renderSpec: {
      type: "Box",
      className: "space-y-6",
      children: [
        {
          type: "FeatureCard",
          title: "Icon Top (Default)",
          description: "The icon is positioned at the top of the card.",
          icon: "Rocket",
          iconPosition: "top",
          iconColor: "#FF6B6B",
        },
        {
          type: "FeatureCard",
          title: "Icon Left",
          description: "The icon is positioned to the left of the content.",
          icon: "Shield",
          iconPosition: "left",
          iconColor: "#4ECDC4",
        },
        {
          type: "FeatureCard",
          title: "Icon Right",
          description: "The icon is positioned to the right of the content.",
          icon: "Users",
          iconPosition: "right",
          iconColor: "#45B7D1",
        },
        {
          type: "FeatureCard",
          title: "Icon Background",
          description: "The icon appears as a subtle background element.",
          icon: "Cloud",
          iconPosition: "background",
          iconColor: "#6C5CE7",
        },
      ],
    },
  }
) as Story;

export const Variants: Story = enhanceStoryForDualMode<typeof FeatureCard>(
  {
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Default Variant"
          description="Standard card with subtle shadow and border."
          icon="Code"
          variant="default"
        />

        <FeatureCard
          title="Highlighted Variant"
          description="Emphasized card with gradient background."
          icon="Sparkles"
          variant="highlighted"
          iconColor="#FFD93D"
        />

        <FeatureCard
          title="Minimal Variant"
          description="Clean card without borders or shadows."
          icon="Heart"
          variant="minimal"
          iconColor="#FF6B6B"
        />

        <FeatureCard
          title="Bordered Variant"
          description="Card with prominent border styling."
          icon="Star"
          variant="bordered"
          iconColor="#FFB800"
        />

        <FeatureCard
          title="Gradient Variant"
          description="Beautiful gradient background effect."
          icon="Globe"
          variant="gradient"
          gradientFrom="#667eea"
          gradientTo="#764ba2"
          iconColor="#FFFFFF"
        />

        <FeatureCard
          title="Shadow Variant"
          description="Card with enhanced shadow depth."
          icon="Database"
          variant="shadow"
          shadowSize="xl"
        />

        <FeatureCard
          title="Glass Variant"
          description="Modern glassmorphism effect."
          icon="Cpu"
          variant="glass"
          iconColor="#00D9FF"
        />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all variant titles render
      expect(canvas.getByText("Default Variant")).toBeInTheDocument();
      expect(canvas.getByText("Highlighted Variant")).toBeInTheDocument();
      expect(canvas.getByText("Minimal Variant")).toBeInTheDocument();
      expect(canvas.getByText("Bordered Variant")).toBeInTheDocument();
      expect(canvas.getByText("Gradient Variant")).toBeInTheDocument();
      expect(canvas.getByText("Shadow Variant")).toBeInTheDocument();
      expect(canvas.getByText("Glass Variant")).toBeInTheDocument();
      
      // Test that we have 7 cards
      const cards = canvas.getAllByRole("article");
      expect(cards).toHaveLength(7);
    },
  },
  {
    renderSpec: {
      type: "Grid",
      className: "grid-cols-1 md:grid-cols-2 gap-6",
      children: [
        {
          type: "FeatureCard",
          title: "Default Variant",
          description: "Standard card with subtle shadow and border.",
          icon: "Code",
          variant: "default",
        },
        {
          type: "FeatureCard",
          title: "Highlighted Variant",
          description: "Emphasized card with gradient background.",
          icon: "Sparkles",
          variant: "highlighted",
          iconColor: "#FFD93D",
        },
        {
          type: "FeatureCard",
          title: "Minimal Variant",
          description: "Clean card without borders or shadows.",
          icon: "Heart",
          variant: "minimal",
          iconColor: "#FF6B6B",
        },
        {
          type: "FeatureCard",
          title: "Bordered Variant",
          description: "Card with prominent border styling.",
          icon: "Star",
          variant: "bordered",
          iconColor: "#FFB800",
        },
        {
          type: "FeatureCard",
          title: "Gradient Variant",
          description: "Beautiful gradient background effect.",
          icon: "Globe",
          variant: "gradient",
          gradientFrom: "#667eea",
          gradientTo: "#764ba2",
          iconColor: "#FFFFFF",
        },
        {
          type: "FeatureCard",
          title: "Shadow Variant",
          description: "Card with enhanced shadow depth.",
          icon: "Database",
          variant: "shadow",
          shadowSize: "xl",
        },
        {
          type: "FeatureCard",
          title: "Glass Variant",
          description: "Modern glassmorphism effect.",
          icon: "Cpu",
          variant: "glass",
          iconColor: "#00D9FF",
        },
      ],
    },
  }
) as Story;

export const WithCTA: Story = enhanceStoryForDualMode<typeof FeatureCard>(
  {
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Get Started Today"
          description="Join thousands of satisfied customers using our platform."
          icon="Rocket"
          iconColor="#FF6B6B"
          cta={{
            text: "Start Free Trial",
            variant: "default",
            onClick: () => alert("Starting free trial!"),
          }}
        />

        <FeatureCard
          title="Enterprise Solution"
          description="Powerful features designed for large organizations."
          icon="Shield"
          iconColor="#4ECDC4"
          badge="Popular"
          cta={{
            text: "Contact Sales",
            variant: "outline",
            href: "#contact",
          }}
        />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test both cards render
      expect(canvas.getByText("Get Started Today")).toBeInTheDocument();
      expect(canvas.getByText("Enterprise Solution")).toBeInTheDocument();
      
      // Test CTAs render
      expect(canvas.getByRole("button", { name: "Start Free Trial" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Contact Sales" })).toBeInTheDocument();
      
      // Test badge renders
      expect(canvas.getByText("Popular")).toBeInTheDocument();
    },
  },
  {
    renderSpec: {
      type: "Grid",
      className: "grid-cols-1 md:grid-cols-2 gap-6",
      children: [
        {
          type: "FeatureCard",
          title: "Get Started Today",
          description: "Join thousands of satisfied customers using our platform.",
          icon: "Rocket",
          iconColor: "#FF6B6B",
          cta: {
            text: "Start Free Trial",
            variant: "default",
          },
        },
        {
          type: "FeatureCard",
          title: "Enterprise Solution",
          description: "Powerful features designed for large organizations.",
          icon: "Shield",
          iconColor: "#4ECDC4",
          badge: "Popular",
          cta: {
            text: "Contact Sales",
            variant: "outline",
          },
        },
      ],
    },
  }
) as Story;

export const HoverEffects: Story = enhanceStoryForDualMode<typeof FeatureCard>(
  {
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Lift Effect"
          description="Card lifts up on hover."
          icon="Zap"
          hoverEffect="lift"
        />

        <FeatureCard
          title="Glow Effect"
          description="Card glows on hover."
          icon="Sparkles"
          hoverEffect="glow"
          variant="gradient"
        />

        <FeatureCard
          title="Pulse Effect"
          description="Card pulses on hover."
          icon="Heart"
          hoverEffect="pulse"
          iconColor="#FF6B6B"
        />

        <FeatureCard
          title="Rotate Effect"
          description="Card slightly rotates on hover."
          icon="Star"
          hoverEffect="rotate"
          iconColor="#FFB800"
        />
      </div>
    ),
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      
      // Test all hover effect cards render
      expect(canvas.getByText("Lift Effect")).toBeInTheDocument();
      expect(canvas.getByText("Glow Effect")).toBeInTheDocument();
      expect(canvas.getByText("Pulse Effect")).toBeInTheDocument();
      expect(canvas.getByText("Rotate Effect")).toBeInTheDocument();
      
      // Test that we have 4 cards
      const cards = canvas.getAllByRole("article");
      expect(cards).toHaveLength(4);
    },
  },
  {
    renderSpec: {
      type: "Grid",
      className: "grid-cols-1 md:grid-cols-2 gap-6",
      children: [
        {
          type: "FeatureCard",
          title: "Lift Effect",
          description: "Card lifts up on hover.",
          icon: "Zap",
          hoverEffect: "lift",
        },
        {
          type: "FeatureCard",
          title: "Glow Effect",
          description: "Card glows on hover.",
          icon: "Sparkles",
          hoverEffect: "glow",
          variant: "gradient",
        },
        {
          type: "FeatureCard",
          title: "Pulse Effect",
          description: "Card pulses on hover.",
          icon: "Heart",
          hoverEffect: "pulse",
          iconColor: "#FF6B6B",
        },
        {
          type: "FeatureCard",
          title: "Rotate Effect",
          description: "Card slightly rotates on hover.",
          icon: "Star",
          hoverEffect: "rotate",
          iconColor: "#FFB800",
        },
      ],
    },
  }
) as Story;

export const WithReactIcons: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard
        title="React Development"
        description="Build modern web applications with React."
        icon={FaReact}
        iconColor="#61DAFB"
      />

      <FeatureCard
        title="Node.js Backend"
        description="Scalable server-side applications."
        icon={FaNodeJs}
        iconColor="#339933"
      />

      <FeatureCard
        title="Python Integration"
        description="Machine learning and data analysis."
        icon={FaPython}
        iconColor="#3776AB"
      />

      <FeatureCard
        title="TypeScript"
        description="Type-safe development experience."
        icon={SiTypescript}
        iconColor="#3178C6"
      />

      <FeatureCard
        title="Tailwind CSS"
        description="Utility-first CSS framework."
        icon={SiTailwindcss}
        iconColor="#06B6D4"
      />

      <FeatureCard
        title="Next.js"
        description="Full-stack React framework."
        icon={SiNextdotjs}
        iconColor="#000000"
      />
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <FeatureCard
        title="Small Icon"
        description="Compact icon size"
        icon={Settings}
        iconSize="sm"
      />

      <FeatureCard
        title="Medium Icon"
        description="Default icon size"
        icon={Settings}
        iconSize="md"
      />

      <FeatureCard
        title="Large Icon"
        description="Prominent icon size"
        icon={Settings}
        iconSize="lg"
      />

      <FeatureCard
        title="Extra Large"
        description="Maximum icon size"
        icon={Settings}
        iconSize="xl"
      />
    </div>
  ),
};

export const GridLayouts: Story = {
  render: () => {
    const cards = [
      {
        title: "AWS Cloud",
        description: "Deploy to the cloud with confidence.",
        icon: FaAws,
        iconColor: "#FF9900",
        badge: "New",
      },
      {
        title: "Docker Containers",
        description: "Containerize your applications.",
        icon: FaDocker,
        iconColor: "#2496ED",
      },
      {
        title: "PostgreSQL",
        description: "Reliable relational database.",
        icon: SiPostgresql,
        iconColor: "#4169E1",
      },
      {
        title: "Redis Cache",
        description: "High-performance caching layer.",
        icon: SiRedis,
        iconColor: "#DC382D",
      },
      {
        title: "Kubernetes",
        description: "Container orchestration platform.",
        icon: SiKubernetes,
        iconColor: "#326CE5",
      },
      {
        title: "Terraform IaC",
        description: "Infrastructure as code.",
        icon: SiTerraform,
        iconColor: "#7B42BC",
      },
    ];

    return (
      <div className="space-y-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">2 Column Grid</h3>
          <FeatureCardGrid cards={cards.slice(0, 4)} columns="2" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">3 Column Grid</h3>
          <FeatureCardGrid cards={cards} columns="3" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">4 Column Grid</h3>
          <FeatureCardGrid cards={cards} columns="4" gap="sm" />
        </div>
      </div>
    );
  },
};

export const AnimatedGrid: Story = {
  render: () => {
    const cards = [
      {
        title: "GitHub Integration",
        description: "Version control and collaboration.",
        icon: FaGithub,
        iconColor: "#181717",
        variant: "bordered" as const,
      },
      {
        title: "Figma Design",
        description: "Collaborative design platform.",
        icon: FaFigma,
        iconColor: "#F24E1E",
        variant: "gradient" as const,
        gradientFrom: "#F24E1E",
        gradientTo: "#FF7262",
      },
      {
        title: "Slack Connect",
        description: "Team communication hub.",
        icon: FaSlack,
        iconColor: "#4A154B",
        variant: "shadow" as const,
        shadowSize: "lg" as const,
      },
      {
        title: "Jenkins CI/CD",
        description: "Automated build pipeline.",
        icon: SiJenkins,
        iconColor: "#D24939",
        variant: "highlighted" as const,
      },
    ];

    return <FeatureCardGrid cards={cards} columns="2" animated={true} staggerDelay={0.15} />;
  },
};

export const CustomContent: Story = {
  args: {
    title: "Analytics Dashboard",
    description: "Track your performance metrics in real-time.",
    icon: BarChart,
    iconColor: "#8B5CF6",
    variant: "gradient",
    gradientFrom: "#8B5CF6",
    gradientTo: "#EC4899",
    children: (
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Views</span>
          <span className="font-semibold">2.4M</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Conversion Rate</span>
          <span className="font-semibold text-green-600">+12.5%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Active Users</span>
          <span className="font-semibold">48.2K</span>
        </div>
      </div>
    ),
    cta: {
      text: "View Full Report",
      variant: "secondary",
    },
  },
};

export const HighlightedCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard
        title="Basic Plan"
        description="Perfect for individuals and small teams."
        icon={Package}
        iconPosition="left"
      />

      <FeatureCard
        title="Pro Plan"
        description="Advanced features for growing businesses."
        icon={Rocket}
        iconPosition="left"
        highlight={true}
        highlightColor="#8B5CF6"
        badge="Recommended"
        badgeVariant="default"
        variant="gradient"
        gradientFrom="#8B5CF6"
        gradientTo="#EC4899"
      />

      <FeatureCard
        title="Enterprise"
        description="Custom solutions for large organizations."
        icon={Shield}
        iconPosition="left"
      />
    </div>
  ),
};

export const IconFocused: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard
        title="Performance"
        description="Lightning fast execution"
        icon={Zap}
        iconColor="#FFB800"
        iconSize="xl"
        align="center"
        variant="bordered"
      />

      <FeatureCard
        title="Security"
        description="Enterprise-grade protection"
        icon={Shield}
        iconColor="#4ECDC4"
        iconSize="xl"
        align="center"
        variant="gradient"
        gradientFrom="#4ECDC4"
        gradientTo="#44A08D"
      />

      <FeatureCard
        title="Analytics"
        description="Real-time insights"
        icon={BarChart}
        iconColor="#8B5CF6"
        iconSize="xl"
        align="center"
        variant="shadow"
        shadowSize="xl"
      />
    </div>
  ),
};

export const TabbedCategories: Story = {
  render: () => {
    const cards = [
      // Frontend
      {
        title: "React Development",
        description: "Build modern web applications with React 18.",
        icon: FaReact,
        iconColor: "#61DAFB",
        category: "Frontend",
        badge: "Popular",
      },
      {
        title: "TypeScript",
        description: "Type-safe development with enhanced IDE support.",
        icon: SiTypescript,
        iconColor: "#3178C6",
        category: "Frontend",
      },
      {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI development.",
        icon: SiTailwindcss,
        iconColor: "#06B6D4",
        category: "Frontend",
      },
      {
        title: "Next.js",
        description: "Full-stack React framework with SSR/SSG support.",
        icon: SiNextdotjs,
        iconColor: "#000000",
        category: "Frontend",
        badge: "New",
      },
      // Backend
      {
        title: "Node.js",
        description: "JavaScript runtime for server-side development.",
        icon: FaNodeJs,
        iconColor: "#339933",
        category: "Backend",
      },
      {
        title: "Python",
        description: "Versatile language for APIs and data science.",
        icon: FaPython,
        iconColor: "#3776AB",
        category: "Backend",
      },
      {
        title: "PostgreSQL",
        description: "Powerful open-source relational database.",
        icon: SiPostgresql,
        iconColor: "#4169E1",
        category: "Backend",
      },
      {
        title: "Redis",
        description: "In-memory data store for caching and queues.",
        icon: SiRedis,
        iconColor: "#DC382D",
        category: "Backend",
      },
      // DevOps
      {
        title: "Docker",
        description: "Container platform for consistent deployments.",
        icon: FaDocker,
        iconColor: "#2496ED",
        category: "DevOps",
      },
      {
        title: "Kubernetes",
        description: "Container orchestration at scale.",
        icon: SiKubernetes,
        iconColor: "#326CE5",
        category: "DevOps",
        badge: "Enterprise",
      },
      {
        title: "AWS",
        description: "Cloud infrastructure and services.",
        icon: FaAws,
        iconColor: "#FF9900",
        category: "DevOps",
      },
      {
        title: "Terraform",
        description: "Infrastructure as code for cloud resources.",
        icon: SiTerraform,
        iconColor: "#7B42BC",
        category: "DevOps",
      },
    ];

    return (
      <TabbedFeatureCards
        cards={cards}
        categories={["Frontend", "Backend", "DevOps"]}
        columns="3"
        gap="md"
        animated={true}
      />
    );
  },
};
