import { ServiceList, render } from "@alexberriman/react-jedi";
import type { ServiceItem } from "@alexberriman/react-jedi";
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
  Settings,
  Server,
  GitBranch,
  Package
} from "lucide-react";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseDemo, ShowcaseSection } from "../../showcase-demo";
import { PageHeader } from "../../../../components/ui";

const cloudServices: ServiceItem[] = [
  {
    id: "cloud-storage",
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud Storage",
    description: "Secure and scalable cloud storage solution for all your data needs",
    features: ["Unlimited storage", "99.9% uptime", "Auto-backup", "File versioning", "End-to-end encryption"],
    pricing: { price: "9.99", period: "month" },
    ctaText: "Get Started",
    ctaLink: "#",
  },
  {
    id: "security-suite",
    icon: <Shield className="h-6 w-6" />,
    title: "Security Suite",
    description: "Enterprise-grade security to protect your business from threats",
    features: ["Real-time monitoring", "Threat detection", "Firewall protection", "DDoS mitigation", "SSL certificates", "Vulnerability scanning"],
    pricing: { price: "29.99", period: "month" },
    badge: "popular",
    ctaText: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "performance-boost",
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Boost",
    description: "Optimize your applications for maximum speed and efficiency",
    features: ["CDN integration", "Caching optimization", "Load balancing", "Performance analytics"],
    pricing: { price: "19.99", period: "month" },
    badge: "new",
    ctaText: "Learn More",
    ctaLink: "#",
  },
];

const enterpriseServices: ServiceItem[] = [
  {
    id: "enterprise-database",
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
    badge: "recommended",
    highlighted: true,
    ctaText: "Contact Sales",
    ctaLink: "#",
  },
  {
    id: "advanced-security",
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
    id: "global-cdn",
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
    id: "ai-processing",
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
    badge: "new",
    ctaText: "Get Access",
    ctaLink: "#",
  },
];

const servicesWithImages: ServiceItem[] = [
  {
    id: "business-analytics",
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
    badge: "popular",
    ctaText: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "team-collaboration",
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
    id: "growth-platform",
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
    badge: "recommended",
    ctaText: "Book Demo",
    ctaLink: "#",
  },
];

const developmentServices: ServiceItem[] = [
  {
    id: "web-development",
    icon: <Code className="h-6 w-6" />,
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    features: ["React/Next.js", "TypeScript", "API Integration", "Responsive Design"],
    pricing: { price: "5000", period: "project" },
    ctaText: "Get Quote",
    ctaLink: "#",
  },
  {
    id: "devops-services",
    icon: <Settings className="h-6 w-6" />,
    title: "DevOps Services",
    description: "Streamline your deployment and infrastructure management",
    features: ["CI/CD Pipeline", "Cloud Setup", "Monitoring", "Automation"],
    pricing: { price: "2500", period: "month" },
    badge: "popular",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "backend-development",
    icon: <Server className="h-6 w-6" />,
    title: "Backend Development",
    description: "Scalable server-side solutions for your applications",
    features: ["API Development", "Database Design", "Microservices", "Security"],
    pricing: { price: "7500", period: "project" },
    ctaText: "Contact Us",
    ctaLink: "#",
  },
  {
    id: "version-control",
    icon: <GitBranch className="h-6 w-6" />,
    title: "Version Control Setup",
    description: "Professional Git workflow and repository management",
    features: ["Git Setup", "Branch Strategy", "Code Reviews", "Documentation"],
    pricing: { price: "1500", period: "setup" },
    badge: "new",
    ctaText: "Get Started",
    ctaLink: "#",
  },
];

const comparisonServices: ServiceItem[] = [
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
    id: "professional",
    title: "Professional",
    description: "For growing businesses with advanced needs",
    features: ["25 Users", "100GB Storage", "Priority Support", "Advanced Features", "Analytics", "API Access"],
    pricing: { price: "49", period: "month" },
    badge: "popular",
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
    badge: "recommended",
    ctaText: "Contact Sales",
    ctaLink: "#",
  },
];

const minimalServices: ServiceItem[] = [
  {
    id: "package-basic",
    icon: <Package className="h-5 w-5" />,
    title: "Basic Package",
    description: "Essential features for getting started",
    ctaText: "Choose Basic",
    ctaLink: "#",
  },
  {
    id: "package-standard",
    icon: <Package className="h-5 w-5" />,
    title: "Standard Package",
    description: "Everything you need for daily operations",
    badge: "popular",
    ctaText: "Choose Standard",
    ctaLink: "#",
  },
  {
    id: "package-premium",
    icon: <Package className="h-5 w-5" />,
    title: "Premium Package",
    description: "Advanced features for power users",
    ctaText: "Choose Premium",
    ctaLink: "#",
  },
];

// JSON specification examples
const cardsSpec = {
  component: "ServiceList",
  services: cloudServices,
  variant: "cards",
  columns: 3,
  animated: true,
};

const listSpec = {
  component: "ServiceList",
  services: enterpriseServices,
  variant: "list",
  animated: true,
};

const alternatingSpec = {
  component: "ServiceList",
  services: servicesWithImages,
  variant: "alternating",
  animated: true,
};

const tabsSpec = {
  component: "ServiceList",
  services: developmentServices,
  variant: "tabs",
};

const accordionSpec = {
  component: "ServiceList",
  services: enterpriseServices,
  variant: "accordion",
};

export function ServiceListShowcase() {
  usePageMetadata({
    title: "Service List Block",
    description: "Flexible service listing component with multiple display variants",
  });

  return (
    <div>
      <PageHeader
        title="Service List Block"
        description="A versatile service listing component with multiple variants including cards, list, alternating, tabs, and accordion layouts. Perfect for showcasing products, services, or features."
      />

      <ShowcaseSection title="Cards Variant">
        <ShowcaseDemo
          code={`<ServiceList
  services={services}
  variant="cards"
  columns={3}
  animated={true}
/>`}
          jsonCode={JSON.stringify(cardsSpec, null, 2)}
        >
          <ServiceList
            services={cloudServices}
            variant="cards"
            columns={3}
            animated={true}
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="List Variant" 
        description="Compact list view with expandable features"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={services}
  variant="list"
  animated={true}
/>`}
          jsonCode={JSON.stringify(listSpec, null, 2)}
        >
          <ServiceList
            services={enterpriseServices}
            variant="list"
            animated={true}
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="Alternating Variant" 
        description="Image and text alternating layout for detailed service descriptions"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={servicesWithImages}
  variant="alternating"
  animated={true}
/>`}
          jsonCode={JSON.stringify(alternatingSpec, null, 2)}
        >
          <ServiceList
            services={servicesWithImages}
            variant="alternating"
            animated={true}
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="Tabs Variant" 
        description="Tabbed interface for organizing services"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={services}
  variant="tabs"
/>`}
          jsonCode={JSON.stringify(tabsSpec, null, 2)}
        >
          <ServiceList
            services={developmentServices}
            variant="tabs"
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="Accordion Variant" 
        description="Collapsible accordion layout for space-efficient display"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={services}
  variant="accordion"
/>`}
          jsonCode={JSON.stringify(accordionSpec, null, 2)}
        >
          <ServiceList
            services={enterpriseServices}
            variant="accordion"
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="Comparison Layout" 
        description="Perfect for pricing tiers or feature comparison"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={comparisonServices}
  variant="cards"
  columns={3}
  showComparison={true}
/>`}
        >
          <ServiceList
            services={comparisonServices}
            variant="cards"
            columns={3}
            showComparison={true}
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="Two Column Layout" 
        description="Ideal for smaller service lists"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={services}
  variant="cards"
  columns={2}
/>`}
        >
          <ServiceList
            services={developmentServices.slice(0, 2)}
            variant="cards"
            columns={2}
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="Without Pricing" 
        description="Service list without pricing information"
      >
        <ShowcaseDemo
          code={`<ServiceList
  services={minimalServices}
  variant="cards"
  columns={3}
/>`}
        >
          <ServiceList
            services={minimalServices}
            variant="cards"
            columns={3}
          />
        </ShowcaseDemo>
      </ShowcaseSection>

      <ShowcaseSection 
        title="JSON Specification Example" 
        description="Using React Jedi's render function"
      >
        <ShowcaseDemo
          code={`const spec = {
  component: "ServiceList",
  services: [
    {
      id: "service-1",
      title: "Cloud Storage",
      description: "Secure cloud storage solution",
      features: ["Unlimited storage", "Auto-backup"],
      pricing: { price: "9.99", period: "month" },
      badge: "popular",
      ctaText: "Get Started",
      ctaLink: "#"
    }
  ],
  variant: "cards",
  columns: 3,
  animated: true
};

render(spec);`}
        >
          {render({
            component: "ServiceList",
            services: [
              {
                id: "service-1",
                title: "Cloud Storage",
                description: "Secure cloud storage solution",
                features: ["Unlimited storage", "Auto-backup"],
                pricing: { price: "9.99", period: "month" },
                badge: "popular",
                ctaText: "Get Started",
                ctaLink: "#"
              },
              {
                id: "service-2",
                title: "API Gateway",
                description: "Manage and scale your APIs",
                features: ["Rate limiting", "Authentication"],
                pricing: { price: "19.99", period: "month" },
                ctaText: "Learn More",
                ctaLink: "#"
              }
            ],
            variant: "cards",
            columns: 2,
            animated: true
          })}
        </ShowcaseDemo>
      </ShowcaseSection>
    </div>
  );
}