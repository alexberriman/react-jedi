import type { Meta, StoryObj } from "@storybook/react"
import { ServiceList } from "./service-list"
import { 
  Cloud, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Lock,
  Cpu,
  BarChart,
  Users,
  Rocket,
  Code,
  Settings
} from "lucide-react"

const meta = {
  title: "Blocks/ServiceList",
  component: ServiceList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ServiceList>

export default meta
type Story = StoryObj<typeof meta>

const basicServices = [
  {
    id: "1",
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud Storage",
    description: "Secure and scalable cloud storage solution for all your data needs",
    features: ["Unlimited storage", "99.9% uptime", "Auto-backup", "File versioning"],
    pricing: { price: "9.99", period: "month" },
    ctaText: "Get Started",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: <Shield className="h-6 w-6" />,
    title: "Security Suite",
    description: "Enterprise-grade security to protect your business from threats",
    features: ["Real-time monitoring", "Threat detection", "Firewall protection", "DDoS mitigation", "SSL certificates"],
    pricing: { price: "29.99", period: "month" },
    badge: "popular" as const,
    ctaText: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "3",
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Boost",
    description: "Optimize your applications for maximum speed and efficiency",
    features: ["CDN integration", "Caching optimization", "Load balancing", "Performance analytics"],
    pricing: { price: "19.99", period: "month" },
    badge: "new" as const,
    ctaText: "Learn More",
    ctaLink: "#",
  },
]

const enterpriseServices = [
  {
    id: "1",
    icon: <Database className="h-8 w-8" />,
    title: "Enterprise Database",
    description: "High-performance database solution designed for enterprise workloads with advanced features and scalability",
    features: [
      "Multi-region replication",
      "Automated backups",
      "Point-in-time recovery",
      "Advanced analytics",
      "24/7 support",
      "Custom configurations",
      "API access",
      "Compliance tools"
    ],
    pricing: { price: "499", period: "month" },
    badge: "recommended" as const,
    highlighted: true,
    ctaText: "Contact Sales",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: <Lock className="h-8 w-8" />,
    title: "Advanced Security",
    description: "Complete security infrastructure for mission-critical applications",
    features: [
      "Zero-trust architecture",
      "AI threat detection",
      "Compliance management",
      "Security audits",
      "Incident response",
      "Employee training"
    ],
    pricing: { price: "799", period: "month" },
    ctaText: "Schedule Demo",
    ctaLink: "#",
  },
  {
    id: "3",
    icon: <Globe className="h-8 w-8" />,
    title: "Global CDN",
    description: "Deliver content at lightning speed to users worldwide",
    features: [
      "200+ edge locations",
      "Smart routing",
      "Image optimization",
      "Video streaming",
      "Real-time analytics",
      "Custom domains"
    ],
    pricing: { price: "299", period: "month" },
    ctaText: "Start Trial",
    ctaLink: "#",
  },
  {
    id: "4",
    icon: <Cpu className="h-8 w-8" />,
    title: "AI Processing",
    description: "Harness the power of artificial intelligence for your applications",
    features: [
      "GPU acceleration",
      "Pre-trained models",
      "Custom training",
      "Real-time inference",
      "Model versioning",
      "API endpoints"
    ],
    pricing: { price: "999", period: "month" },
    badge: "new" as const,
    ctaText: "Get Access",
    ctaLink: "#",
  },
]

const servicesWithImages = [
  {
    id: "1",
    icon: <BarChart className="h-8 w-8" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    title: "Business Analytics",
    description: "Transform your data into actionable insights with our powerful analytics platform. Get real-time dashboards, custom reports, and predictive analytics to drive better business decisions.",
    features: [
      "Real-time dashboards",
      "Custom reports",
      "Predictive analytics",
      "Data visualization",
      "Export capabilities",
      "Team collaboration"
    ],
    pricing: { price: "149", period: "month" },
    badge: "popular" as const,
    ctaText: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: <Users className="h-8 w-8" />,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=60",
    title: "Team Collaboration",
    description: "Bring your team together with our comprehensive collaboration suite. Share files, communicate in real-time, and manage projects all in one place.",
    features: [
      "Video conferencing",
      "File sharing",
      "Project management",
      "Team chat",
      "Calendar sync",
      "Mobile apps"
    ],
    pricing: { price: "25", period: "user/month" },
    ctaText: "Get Started",
    ctaLink: "#",
  },
  {
    id: "3",
    icon: <Rocket className="h-8 w-8" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    title: "Growth Platform",
    description: "Accelerate your business growth with our all-in-one platform. From marketing automation to sales tools, we've got everything you need to scale.",
    features: [
      "Marketing automation",
      "Lead generation",
      "Sales pipeline",
      "Customer insights",
      "A/B testing",
      "ROI tracking"
    ],
    pricing: { price: "299", period: "month" },
    badge: "recommended" as const,
    ctaText: "Book Demo",
    ctaLink: "#",
  },
]

const developmentServices = [
  {
    id: "1",
    icon: <Code className="h-6 w-6" />,
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    features: ["React/Next.js", "TypeScript", "API Integration", "Responsive Design"],
    pricing: { price: "5000", period: "project" },
    ctaText: "Get Quote",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: <Settings className="h-6 w-6" />,
    title: "DevOps Services",
    description: "Streamline your deployment and infrastructure management",
    features: ["CI/CD Pipeline", "Cloud Setup", "Monitoring", "Automation"],
    pricing: { price: "2500", period: "month" },
    badge: "popular" as const,
    ctaText: "Learn More",
    ctaLink: "#",
  },
]

export const Default: Story = {
  args: {
    services: basicServices,
    variant: "cards",
    columns: 3,
    animated: true,
  },
}

export const ListVariant: Story = {
  args: {
    services: enterpriseServices,
    variant: "list",
    animated: true,
  },
}

export const AlternatingVariant: Story = {
  args: {
    services: servicesWithImages,
    variant: "alternating",
    animated: true,
  },
}

export const TabsVariant: Story = {
  args: {
    services: enterpriseServices.slice(0, 3),
    variant: "tabs",
  },
}

export const AccordionVariant: Story = {
  args: {
    services: enterpriseServices,
    variant: "accordion",
  },
}

export const TwoColumns: Story = {
  args: {
    services: developmentServices,
    variant: "cards",
    columns: 2,
    animated: true,
  },
}

export const FourColumns: Story = {
  args: {
    services: [...basicServices, ...developmentServices.slice(0, 1)],
    variant: "cards",
    columns: 4,
    animated: true,
  },
}

export const WithoutAnimation: Story = {
  args: {
    services: basicServices,
    variant: "cards",
    columns: 3,
    animated: false,
  },
}

export const MixedBadges: Story = {
  args: {
    services: [
      { ...basicServices[0], badge: "new" as const },
      { ...basicServices[1], badge: "popular" as const },
      { ...basicServices[2], badge: "recommended" as const, highlighted: true },
    ],
    variant: "cards",
    columns: 3,
  },
}

export const NoPricing: Story = {
  args: {
    services: basicServices.map(({ pricing, ...service }) => service),
    variant: "cards",
    columns: 3,
  },
}

export const MinimalFeatures: Story = {
  args: {
    services: basicServices.map(service => ({
      ...service,
      features: service.features?.slice(0, 2),
    })),
    variant: "list",
  },
}

export const ComparisonMode: Story = {
  args: {
    services: [
      {
        id: "starter",
        title: "Starter",
        description: "Perfect for small teams and projects",
        features: ["5 Users", "10GB Storage", "Basic Support", "Core Features"],
        pricing: { price: "0", period: "month" },
        ctaText: "Start Free",
        ctaLink: "#",
      },
      {
        id: "pro",
        title: "Professional",
        description: "For growing businesses with advanced needs",
        features: ["25 Users", "100GB Storage", "Priority Support", "Advanced Features", "Analytics", "API Access"],
        pricing: { price: "49", period: "month" },
        badge: "popular" as const,
        highlighted: true,
        ctaText: "Upgrade to Pro",
        ctaLink: "#",
      },
      {
        id: "enterprise",
        title: "Enterprise",
        description: "Tailored solutions for large organizations",
        features: ["Unlimited Users", "Unlimited Storage", "24/7 Support", "All Features", "Custom Integration", "SLA"],
        pricing: { price: "Custom", currency: "" },
        badge: "recommended" as const,
        ctaText: "Contact Sales",
        ctaLink: "#",
      },
    ],
    variant: "cards",
    columns: 3,
    showComparison: true,
  },
}

export const LongFeatureList: Story = {
  args: {
    services: [
      {
        id: "1",
        icon: <Database className="h-6 w-6" />,
        title: "Complete Platform",
        description: "Everything you need in one comprehensive solution",
        features: [
          "User Management",
          "Role-Based Access",
          "Data Analytics",
          "Custom Reports",
          "API Integration",
          "Webhook Support",
          "Mobile Apps",
          "Desktop Apps",
          "Browser Extension",
          "Email Notifications",
          "SMS Alerts",
          "Two-Factor Auth",
        ],
        pricing: { price: "199", period: "month" },
        ctaText: "View All Features",
        ctaLink: "#",
      },
    ],
    variant: "list",
  },
}