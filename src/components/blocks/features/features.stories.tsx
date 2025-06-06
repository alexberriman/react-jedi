import type { Meta, StoryObj } from "@storybook/react-vite";
import { Features, type Feature } from "./features";
import {
  FiCode,
  FiDatabase,
  FiLayout,
  FiLock,
  FiServer,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const meta = {
  title: "Blocks/Features",
  component: Features,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Features>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFeatures: Feature[] = [
  {
    id: "1",
    title: "Lightning Fast Performance",
    description:
      "Built with performance in mind, our platform delivers exceptional speed and responsiveness.",
    icon: FiZap,
    benefits: ["Sub-second page loads", "Optimized asset delivery", "Global CDN distribution"],
    category: "Performance",
    status: "available",
  },
  {
    id: "2",
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and comprehensive compliance.",
    icon: FiShield,
    benefits: ["SOC 2 Type II certified", "GDPR compliant", "256-bit encryption"],
    category: "Security",
    status: "available",
  },
  {
    id: "3",
    title: "Advanced Analytics",
    description: "Gain deep insights into your data with our powerful analytics dashboard.",
    icon: FiTrendingUp,
    benefits: ["Real-time reporting", "Custom dashboards", "Predictive analytics"],
    category: "Analytics",
    status: "available",
    badge: "Popular",
  },
  {
    id: "4",
    title: "Team Collaboration",
    description: "Work seamlessly with your team with built-in collaboration features.",
    icon: FiUsers,
    benefits: ["Real-time collaboration", "Role-based permissions", "Activity tracking"],
    category: "Collaboration",
    status: "available",
  },
  {
    id: "5",
    title: "Developer API",
    description: "Powerful REST and GraphQL APIs for seamless integration with your tools.",
    icon: FiCode,
    benefits: ["RESTful endpoints", "GraphQL support", "Webhook automation"],
    category: "Developer",
    status: "available",
  },
  {
    id: "6",
    title: "AI-Powered Insights",
    description: "Leverage machine learning to automate workflows and surface key insights.",
    icon: FiDatabase,
    benefits: ["Automated categorization", "Smart recommendations", "Anomaly detection"],
    category: "Analytics",
    status: "coming-soon",
  },
];

const featuresWithImages: Feature[] = [
  {
    id: "1",
    title: "Intuitive Dashboard",
    description:
      "A beautifully designed dashboard that puts all your important metrics at your fingertips. Monitor performance, track goals, and make data-driven decisions.",
    icon: FiLayout,
    image: "https://placehold.co/800x450/EEE/31343C",
    benefits: ["Customizable widgets", "Real-time data updates", "Mobile responsive design"],
    category: "Core Features",
  },
  {
    id: "2",
    title: "Advanced Security",
    description:
      "Enterprise-grade security features protect your data with multiple layers of encryption, regular security audits, and compliance certifications.",
    icon: FiLock,
    image: "https://placehold.co/800x450/EEE/31343C",
    benefits: ["Two-factor authentication", "End-to-end encryption", "Regular security audits"],
    category: "Security",
  },
  {
    id: "3",
    title: "Seamless Integrations",
    description:
      "Connect with your favorite tools and services. Our platform integrates with over 100+ popular business applications.",
    icon: FiServer,
    image: "https://placehold.co/800x450/EEE/31343C",
    benefits: ["One-click integrations", "Custom API support", "Automated workflows"],
    category: "Integrations",
  },
];

export const Default: Story = {
  args: {
    features: sampleFeatures,
    title: "Powerful Features for Modern Teams",
    subtitle: "Everything you need to build, deploy, and scale your applications",
  },
};

export const GridTwoColumns: Story = {
  args: {
    features: sampleFeatures.slice(0, 4),
    variant: "grid",
    gridColumns: 2,
    title: "Core Features",
  },
};

export const GridFourColumns: Story = {
  args: {
    features: sampleFeatures.slice(0, 8),
    variant: "grid",
    gridColumns: 4,
    showBenefits: false,
  },
};

export const AlternatingWithImages: Story = {
  args: {
    features: featuresWithImages,
    variant: "alternating",
    title: "Why Choose Our Platform",
    subtitle: "Discover the features that set us apart",
  },
};

export const TabbedCategories: Story = {
  args: {
    features: sampleFeatures,
    variant: "tabbed",
    categories: ["Performance", "Security", "Analytics", "Collaboration", "Developer"],
    title: "Explore Features by Category",
  },
};

export const IconFocused: Story = {
  args: {
    features: sampleFeatures.map((f) => ({ ...f, benefits: undefined })),
    variant: "icon-focused",
    gridColumns: 4,
    title: "Simple and Powerful",
    showBenefits: false,
  },
};

export const ComparisonTable: Story = {
  args: {
    features: sampleFeatures.slice(0, 8),
    variant: "comparison",
    comparisonPlans: ["Starter", "Professional", "Enterprise"],
    title: "Compare Plans",
    subtitle: "Choose the perfect plan for your needs",
  },
};

export const WithClickHandler: Story = {
  args: {
    features: sampleFeatures,
    onFeatureClick: (feature) => alert(`Clicked: ${feature.title}`),
    title: "Interactive Features",
    subtitle: "Click any feature to learn more",
  },
};

export const NoAnimation: Story = {
  args: {
    features: sampleFeatures,
    animated: false,
    title: "Features Without Animation",
  },
};

export const MixedStatuses: Story = {
  args: {
    features: [
      ...sampleFeatures.slice(0, 3),
      {
        id: "beta-1",
        title: "Beta Feature",
        description: "This feature is currently in beta testing.",
        icon: FiSettings,
        status: "beta",
        category: "Experimental",
      },
      {
        id: "soon-1",
        title: "Coming Soon Feature",
        description: "This exciting feature will be available soon.",
        icon: FiZap,
        status: "coming-soon",
        category: "Upcoming",
      },
    ],
    title: "Feature Roadmap",
    subtitle: "Current and upcoming features",
  },
};

export const MinimalGrid: Story = {
  args: {
    features: sampleFeatures.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description,
    })),
    gridColumns: 3,
    showBenefits: false,
  },
};

export const SaaSFeatures: Story = {
  args: {
    features: [
      {
        id: "auth",
        title: "Authentication & SSO",
        description:
          "Secure authentication with support for SAML, OAuth, and custom SSO providers.",
        icon: FiLock,
        benefits: ["SAML 2.0", "OAuth 2.0", "Multi-factor auth"],
        category: "Security",
      },
      {
        id: "api",
        title: "Developer-First API",
        description: "RESTful API with comprehensive documentation and SDKs for popular languages.",
        icon: FiCode,
        benefits: ["REST & GraphQL", "Webhook support", "Rate limiting"],
        category: "Developer",
      },
      {
        id: "scale",
        title: "Auto-Scaling Infrastructure",
        description: "Automatically scale resources based on demand with zero downtime.",
        icon: FiServer,
        benefits: ["Auto-scaling", "99.9% uptime SLA", "Global CDN"],
        category: "Infrastructure",
      },
      {
        id: "analytics",
        title: "Advanced Analytics",
        description: "Real-time analytics and reporting with custom dashboards and alerts.",
        icon: FiTrendingUp,
        benefits: ["Real-time data", "Custom reports", "Data export"],
        category: "Analytics",
      },
    ],
    variant: "grid",
    gridColumns: 2,
    title: "Enterprise-Ready Platform",
    subtitle: "Built for scale, designed for developers",
  },
};

export const ServiceOfferings: Story = {
  args: {
    features: [
      {
        id: "consulting",
        title: "Strategic Consulting",
        description: "Expert guidance to transform your business with proven methodologies.",
        icon: FiUsers,
        image: "https://placehold.co/800x450/EEE/31343C",
        benefits: ["Industry expertise", "Tailored solutions", "ROI focused"],
      },
      {
        id: "implementation",
        title: "Implementation Services",
        description: "End-to-end implementation with dedicated project management.",
        icon: FiSettings,
        image: "https://placehold.co/800x450/EEE/31343C",
        benefits: ["Agile methodology", "Risk mitigation", "On-time delivery"],
      },
      {
        id: "support",
        title: "24/7 Support",
        description: "Round-the-clock support from our team of certified experts.",
        icon: FiShield,
        image: "https://placehold.co/800x450/EEE/31343C",
        benefits: ["Phone & chat support", "Dedicated account manager", "Priority response"],
      },
    ],
    variant: "alternating",
    title: "Our Services",
    subtitle: "Comprehensive solutions for your business needs",
  },
};
