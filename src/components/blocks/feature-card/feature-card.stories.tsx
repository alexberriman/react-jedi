import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCard, FeatureCardGrid } from "./feature-card";
import { 
  Zap, 
  Shield, 
  Rocket, 
  Users, 
  BarChart, 
  Code, 
  Cloud,
  Sparkles,
  Heart,
  Star,
  Globe,
  Cpu,
  Database,
  Settings,
  Package
} from "lucide-react";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDocker,
  FaAws,
  FaGithub,
  FaFigma,
  FaSlack
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiTerraform,
  SiJenkins
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

export const Default: Story = {
  args: {
    title: "Lightning Fast",
    description: "Experience blazing fast performance with our optimized infrastructure.",
    icon: Zap,
    iconColor: "#FFB800",
  },
};

export const IconPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <FeatureCard
        title="Icon Top (Default)"
        description="The icon is positioned at the top of the card."
        icon={Rocket}
        iconPosition="top"
        iconColor="#FF6B6B"
      />
      
      <FeatureCard
        title="Icon Left"
        description="The icon is positioned to the left of the content."
        icon={Shield}
        iconPosition="left"
        iconColor="#4ECDC4"
      />
      
      <FeatureCard
        title="Icon Right"
        description="The icon is positioned to the right of the content."
        icon={Users}
        iconPosition="right"
        iconColor="#45B7D1"
      />
      
      <FeatureCard
        title="Icon Background"
        description="The icon appears as a subtle background element."
        icon={Cloud}
        iconPosition="background"
        iconColor="#6C5CE7"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="Default Variant"
        description="Standard card with subtle shadow and border."
        icon={Code}
        variant="default"
      />
      
      <FeatureCard
        title="Highlighted Variant"
        description="Emphasized card with gradient background."
        icon={Sparkles}
        variant="highlighted"
        iconColor="#FFD93D"
      />
      
      <FeatureCard
        title="Minimal Variant"
        description="Clean card without borders or shadows."
        icon={Heart}
        variant="minimal"
        iconColor="#FF6B6B"
      />
      
      <FeatureCard
        title="Bordered Variant"
        description="Card with prominent border styling."
        icon={Star}
        variant="bordered"
        iconColor="#FFB800"
      />
      
      <FeatureCard
        title="Gradient Variant"
        description="Beautiful gradient background effect."
        icon={Globe}
        variant="gradient"
        gradientFrom="#667eea"
        gradientTo="#764ba2"
        iconColor="#FFFFFF"
      />
      
      <FeatureCard
        title="Shadow Variant"
        description="Card with enhanced shadow depth."
        icon={Database}
        variant="shadow"
        shadowSize="xl"
      />
      
      <FeatureCard
        title="Glass Variant"
        description="Modern glassmorphism effect."
        icon={Cpu}
        variant="glass"
        iconColor="#00D9FF"
      />
    </div>
  ),
};

export const WithCTA: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="Get Started Today"
        description="Join thousands of satisfied customers using our platform."
        icon={Rocket}
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
        icon={Shield}
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
};

export const HoverEffects: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="Lift Effect"
        description="Card lifts up on hover."
        icon={Zap}
        hoverEffect="lift"
      />
      
      <FeatureCard
        title="Glow Effect"
        description="Card glows on hover."
        icon={Sparkles}
        hoverEffect="glow"
        variant="gradient"
      />
      
      <FeatureCard
        title="Pulse Effect"
        description="Card pulses on hover."
        icon={Heart}
        hoverEffect="pulse"
        iconColor="#FF6B6B"
      />
      
      <FeatureCard
        title="Rotate Effect"
        description="Card slightly rotates on hover."
        icon={Star}
        hoverEffect="rotate"
        iconColor="#FFB800"
      />
    </div>
  ),
};

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

    return (
      <FeatureCardGrid 
        cards={cards} 
        columns="2" 
        animated={true} 
        staggerDelay={0.15}
      />
    );
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