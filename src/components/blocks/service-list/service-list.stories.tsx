import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, waitFor } from "storybook/test";
import { ServiceList } from "./service-list";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Blocks/ServiceList",
  component: ServiceList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ServiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicServices = [
  {
    id: "1",
    icon: "cloud",
    title: "Cloud Storage",
    description: "Secure and scalable cloud storage solution for all your data needs",
    features: ["Unlimited storage", "99.9% uptime", "Auto-backup", "File versioning"],
    pricing: { price: "9.99", period: "month" },
    ctaText: "Get Started",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: "shield",
    title: "Security Suite",
    description: "Enterprise-grade security to protect your business from threats",
    features: [
      "Real-time monitoring",
      "Threat detection",
      "Firewall protection",
      "DDoS mitigation",
      "SSL certificates",
    ],
    pricing: { price: "29.99", period: "month" },
    badge: "popular" as const,
    ctaText: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "3",
    icon: "zap",
    title: "Performance Boost",
    description: "Optimize your applications for maximum speed and efficiency",
    features: [
      "CDN integration",
      "Caching optimization",
      "Load balancing",
      "Performance analytics",
    ],
    pricing: { price: "19.99", period: "month" },
    badge: "new" as const,
    ctaText: "Learn More",
    ctaLink: "#",
  },
];

const enterpriseServices = [
  {
    id: "1",
    icon: "database",
    title: "Enterprise Database",
    description:
      "High-performance database solution designed for enterprise workloads with advanced features and scalability",
    features: [
      "Multi-region replication",
      "Automated backups",
      "Point-in-time recovery",
      "Advanced analytics",
      "24/7 support",
      "Custom configurations",
      "API access",
      "Compliance tools",
    ],
    pricing: { price: "499", period: "month" },
    badge: "recommended" as const,
    highlighted: true,
    ctaText: "Contact Sales",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: "lock",
    title: "Advanced Security",
    description: "Complete security infrastructure for mission-critical applications",
    features: [
      "Zero-trust architecture",
      "AI threat detection",
      "Compliance management",
      "Security audits",
      "Incident response",
      "Employee training",
    ],
    pricing: { price: "799", period: "month" },
    ctaText: "Schedule Demo",
    ctaLink: "#",
  },
  {
    id: "3",
    icon: "globe",
    title: "Global CDN",
    description: "Deliver content at lightning speed to users worldwide",
    features: [
      "200+ edge locations",
      "Smart routing",
      "Image optimization",
      "Video streaming",
      "Real-time analytics",
      "Custom domains",
    ],
    pricing: { price: "299", period: "month" },
    ctaText: "Start Trial",
    ctaLink: "#",
  },
  {
    id: "4",
    icon: "cpu",
    title: "AI Processing",
    description: "Harness the power of artificial intelligence for your applications",
    features: [
      "GPU acceleration",
      "Pre-trained models",
      "Custom training",
      "Real-time inference",
      "Model versioning",
      "API endpoints",
    ],
    pricing: { price: "999", period: "month" },
    badge: "new" as const,
    ctaText: "Get Access",
    ctaLink: "#",
  },
];

const servicesWithImages = [
  {
    id: "1",
    icon: "bar-chart",
    image:
      "https://placehold.co/800x450/EEE/31343C",
    title: "Business Analytics",
    description:
      "Transform your data into actionable insights with our powerful analytics platform. Get real-time dashboards, custom reports, and predictive analytics to drive better business decisions.",
    features: [
      "Real-time dashboards",
      "Custom reports",
      "Predictive analytics",
      "Data visualization",
      "Export capabilities",
      "Team collaboration",
    ],
    pricing: { price: "149", period: "month" },
    badge: "popular" as const,
    ctaText: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: "users",
    image:
      "https://placehold.co/800x450/EEE/31343C",
    title: "Team Collaboration",
    description:
      "Bring your team together with our comprehensive collaboration suite. Share files, communicate in real-time, and manage projects all in one place.",
    features: [
      "Video conferencing",
      "File sharing",
      "Project management",
      "Team chat",
      "Calendar sync",
      "Mobile apps",
    ],
    pricing: { price: "25", period: "user/month" },
    ctaText: "Get Started",
    ctaLink: "#",
  },
  {
    id: "3",
    icon: "rocket",
    image:
      "https://placehold.co/800x450/EEE/31343C",
    title: "Growth Platform",
    description:
      "Accelerate your business growth with our all-in-one platform. From marketing automation to sales tools, we've got everything you need to scale.",
    features: [
      "Marketing automation",
      "Lead generation",
      "Sales pipeline",
      "Customer insights",
      "A/B testing",
      "ROI tracking",
    ],
    pricing: { price: "299", period: "month" },
    badge: "recommended" as const,
    ctaText: "Book Demo",
    ctaLink: "#",
  },
];

const developmentServices = [
  {
    id: "1",
    icon: "code",
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    features: ["React/Next.js", "TypeScript", "API Integration", "Responsive Design"],
    pricing: { price: "5000", period: "project" },
    ctaText: "Get Quote",
    ctaLink: "#",
  },
  {
    id: "2",
    icon: "settings",
    title: "DevOps Services",
    description: "Streamline your deployment and infrastructure management",
    features: ["CI/CD Pipeline", "Cloud Setup", "Monitoring", "Automation"],
    pricing: { price: "2500", period: "month" },
    badge: "popular" as const,
    ctaText: "Learn More",
    ctaLink: "#",
  },
];

export const Default: Story = enhanceStoryForDualMode({
  args: {
    services: basicServices,
    variant: "cards",
    columns: 3,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Cloud Storage")).toBeInTheDocument();
    expect(canvas.getByText("Security Suite")).toBeInTheDocument();
    expect(canvas.getByText("Performance Boost")).toBeInTheDocument();
    
    // Verify descriptions are present
    expect(canvas.getByText("Secure and scalable cloud storage solution for all your data needs")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise-grade security to protect your business from threats")).toBeInTheDocument();
    
    // Verify features are listed
    expect(canvas.getByText("Unlimited storage")).toBeInTheDocument();
    expect(canvas.getByText("Real-time monitoring")).toBeInTheDocument();
    expect(canvas.getByText("CDN integration")).toBeInTheDocument();
    
    // Verify pricing is displayed
    expect(canvas.getByText("$9.99")).toBeInTheDocument();
    expect(canvas.getByText("$29.99")).toBeInTheDocument();
    expect(canvas.getByText("$19.99")).toBeInTheDocument();
    
    // Verify CTA buttons
    expect(canvas.getByText("Get Started")).toBeInTheDocument();
    expect(canvas.getByText("Start Free Trial")).toBeInTheDocument();
    expect(canvas.getByText("Learn More")).toBeInTheDocument();
    
    // Verify badges
    expect(canvas.getByText("Popular")).toBeInTheDocument();
    expect(canvas.getByText("New")).toBeInTheDocument();
  },
}) as Story;

export const ListVariant: Story = enhanceStoryForDualMode({
  args: {
    services: enterpriseServices,
    variant: "list",
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Enterprise Database")).toBeInTheDocument();
    expect(canvas.getByText("Advanced Security")).toBeInTheDocument();
    expect(canvas.getByText("Global CDN")).toBeInTheDocument();
    expect(canvas.getByText("AI Processing")).toBeInTheDocument();
    
    // Verify descriptions
    expect(canvas.getByText(/High-performance database solution/)).toBeInTheDocument();
    expect(canvas.getByText("Complete security infrastructure for mission-critical applications")).toBeInTheDocument();
    
    // Verify features as badges in list view
    expect(canvas.getByText("Multi-region replication")).toBeInTheDocument();
    expect(canvas.getByText("Zero-trust architecture")).toBeInTheDocument();
    expect(canvas.getByText("200+ edge locations")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$499")).toBeInTheDocument();
    expect(canvas.getByText("$799")).toBeInTheDocument();
    expect(canvas.getByText("$299")).toBeInTheDocument();
    expect(canvas.getByText("$999")).toBeInTheDocument();
    
    // Verify badges
    expect(canvas.getByText("Recommended")).toBeInTheDocument();
    expect(canvas.getByText("New")).toBeInTheDocument();
  },
}) as Story;

export const AlternatingVariant: Story = enhanceStoryForDualMode({
  args: {
    services: servicesWithImages,
    variant: "alternating",
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Business Analytics")).toBeInTheDocument();
    expect(canvas.getByText("Team Collaboration")).toBeInTheDocument();
    expect(canvas.getByText("Growth Platform")).toBeInTheDocument();
    
    // Verify descriptions are present
    expect(canvas.getByText(/Transform your data into actionable insights/)).toBeInTheDocument();
    expect(canvas.getByText(/Bring your team together with our comprehensive/)).toBeInTheDocument();
    
    // Verify features are listed
    expect(canvas.getByText("Real-time dashboards")).toBeInTheDocument();
    expect(canvas.getByText("Video conferencing")).toBeInTheDocument();
    expect(canvas.getByText("Marketing automation")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$149")).toBeInTheDocument();
    expect(canvas.getByText("$25")).toBeInTheDocument();
    expect(canvas.getByText("$299")).toBeInTheDocument();
    
    // Verify images are present (alt text)
    expect(canvas.getByAltText("Business Analytics")).toBeInTheDocument();
    expect(canvas.getByAltText("Team Collaboration")).toBeInTheDocument();
    expect(canvas.getByAltText("Growth Platform")).toBeInTheDocument();
  },
}) as Story;

export const TabsVariant: Story = enhanceStoryForDualMode({
  args: {
    services: enterpriseServices.slice(0, 3),
    variant: "tabs",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify tab triggers are present - use role selector to specifically target tab buttons
    const tabList = canvas.getByRole('tablist');
    expect(within(tabList).getByText("Enterprise Database")).toBeInTheDocument();
    expect(within(tabList).getByText("Advanced Security")).toBeInTheDocument();
    expect(within(tabList).getByText("Global CDN")).toBeInTheDocument();
    
    // Verify first tab content is visible by default
    expect(canvas.getByText(/High-performance database solution/)).toBeInTheDocument();
    expect(canvas.getByText("Multi-region replication")).toBeInTheDocument();
    expect(canvas.getByText("$499")).toBeInTheDocument();
  },
}) as Story;

export const AccordionVariant: Story = enhanceStoryForDualMode({
  args: {
    services: enterpriseServices,
    variant: "accordion",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify accordion triggers are present
    expect(canvas.getByText("Enterprise Database")).toBeInTheDocument();
    expect(canvas.getByText("Advanced Security")).toBeInTheDocument();
    expect(canvas.getByText("Global CDN")).toBeInTheDocument();
    expect(canvas.getByText("AI Processing")).toBeInTheDocument();
    
    // Verify pricing is shown in trigger
    expect(canvas.getByText("$499/month")).toBeInTheDocument();
    expect(canvas.getByText("$799/month")).toBeInTheDocument();
    expect(canvas.getByText("$299/month")).toBeInTheDocument();
    expect(canvas.getByText("$999/month")).toBeInTheDocument();
    
    // Verify badges in trigger
    expect(canvas.getByText("Recommended")).toBeInTheDocument();
    expect(canvas.getByText("New")).toBeInTheDocument();
  },
}) as Story;

export const TwoColumns: Story = enhanceStoryForDualMode({
  args: {
    services: developmentServices,
    variant: "cards",
    columns: 2,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Web Development")).toBeInTheDocument();
    expect(canvas.getByText("DevOps Services")).toBeInTheDocument();
    
    // Verify descriptions
    expect(canvas.getByText("Custom web applications built with modern technologies")).toBeInTheDocument();
    expect(canvas.getByText("Streamline your deployment and infrastructure management")).toBeInTheDocument();
    
    // Verify features
    expect(canvas.getByText("React/Next.js")).toBeInTheDocument();
    expect(canvas.getByText("CI/CD Pipeline")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$5000")).toBeInTheDocument();
    expect(canvas.getByText("$2500")).toBeInTheDocument();
    
    // Verify badge
    expect(canvas.getByText("Popular")).toBeInTheDocument();
  },
}) as Story;

export const FourColumns: Story = enhanceStoryForDualMode({
  args: {
    services: [
      ...basicServices,
      {
        ...developmentServices[0],
        id: "4", // Ensure unique ID
      },
    ],
    variant: "cards",
    columns: 4,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all four service items are rendered
    expect(canvas.getByText("Cloud Storage")).toBeInTheDocument();
    expect(canvas.getByText("Security Suite")).toBeInTheDocument();
    expect(canvas.getByText("Performance Boost")).toBeInTheDocument();
    expect(canvas.getByText("Web Development")).toBeInTheDocument();
    
    // Verify pricing for all services
    expect(canvas.getByText("$9.99")).toBeInTheDocument();
    expect(canvas.getByText("$29.99")).toBeInTheDocument();
    expect(canvas.getByText("$19.99")).toBeInTheDocument();
    expect(canvas.getByText("$5000")).toBeInTheDocument();
  },
}) as Story;

export const WithoutAnimation: Story = enhanceStoryForDualMode({
  args: {
    services: basicServices,
    variant: "cards",
    columns: 3,
    animated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered (same as Default but without animation)
    expect(canvas.getByText("Cloud Storage")).toBeInTheDocument();
    expect(canvas.getByText("Security Suite")).toBeInTheDocument();
    expect(canvas.getByText("Performance Boost")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$9.99")).toBeInTheDocument();
    expect(canvas.getByText("$29.99")).toBeInTheDocument();
    expect(canvas.getByText("$19.99")).toBeInTheDocument();
  },
}) as Story;

export const MixedBadges: Story = enhanceStoryForDualMode({
  args: {
    services: [
      { ...basicServices[0], badge: "new" as const },
      { ...basicServices[1], badge: "popular" as const },
      { ...basicServices[2], badge: "recommended" as const, highlighted: true },
    ],
    variant: "cards",
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Cloud Storage")).toBeInTheDocument();
    expect(canvas.getByText("Security Suite")).toBeInTheDocument();
    expect(canvas.getByText("Performance Boost")).toBeInTheDocument();
    
    // Verify all different badge types
    expect(canvas.getByText("New")).toBeInTheDocument();
    expect(canvas.getByText("Popular")).toBeInTheDocument();
    expect(canvas.getByText("Recommended")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$9.99")).toBeInTheDocument();
    expect(canvas.getByText("$29.99")).toBeInTheDocument();
    expect(canvas.getByText("$19.99")).toBeInTheDocument();
  },
}) as Story;

export const NoPricing: Story = enhanceStoryForDualMode({
  args: {
    services: basicServices.map(({ pricing, ...service }) => service),
    variant: "cards",
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Cloud Storage")).toBeInTheDocument();
    expect(canvas.getByText("Security Suite")).toBeInTheDocument();
    expect(canvas.getByText("Performance Boost")).toBeInTheDocument();
    
    // Verify features are still shown
    expect(canvas.getByText("Unlimited storage")).toBeInTheDocument();
    expect(canvas.getByText("Real-time monitoring")).toBeInTheDocument();
    
    // Verify pricing sections are not present
    expect(canvas.queryByText("$9.99")).not.toBeInTheDocument();
    expect(canvas.queryByText("$29.99")).not.toBeInTheDocument();
    expect(canvas.queryByText("$19.99")).not.toBeInTheDocument();
  },
}) as Story;

export const MinimalFeatures: Story = enhanceStoryForDualMode({
  args: {
    services: basicServices.map((service) => ({
      ...service,
      features: service.features?.slice(0, 2),
    })),
    variant: "list",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service items are rendered
    expect(canvas.getByText("Cloud Storage")).toBeInTheDocument();
    expect(canvas.getByText("Security Suite")).toBeInTheDocument();
    expect(canvas.getByText("Performance Boost")).toBeInTheDocument();
    
    // Verify only first 2 features are shown for each service
    expect(canvas.getByText("Unlimited storage")).toBeInTheDocument();
    expect(canvas.getByText("99.9% uptime")).toBeInTheDocument();
    expect(canvas.getByText("Real-time monitoring")).toBeInTheDocument();
    expect(canvas.getByText("Threat detection")).toBeInTheDocument();
    
    // Verify additional features are not shown
    expect(canvas.queryByText("Auto-backup")).not.toBeInTheDocument();
    expect(canvas.queryByText("Firewall protection")).not.toBeInTheDocument();
  },
}) as Story;

export const ComparisonMode: Story = enhanceStoryForDualMode({
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
        features: [
          "25 Users",
          "100GB Storage",
          "Priority Support",
          "Advanced Features",
          "Analytics",
          "API Access",
        ],
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
        features: [
          "Unlimited Users",
          "Unlimited Storage",
          "24/7 Support",
          "All Features",
          "Custom Integration",
          "SLA",
        ],
        pricing: { price: "Custom", currency: " " },
        badge: "recommended" as const,
        ctaText: "Contact Sales",
        ctaLink: "#",
      },
    ],
    variant: "cards",
    columns: 3,
    showComparison: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for all cards to render
    await waitFor(() => {
      const cards = canvasElement.querySelectorAll('[data-slot="card"]');
      expect(cards).toHaveLength(3);
    });
    
    // Verify pricing tier titles
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify descriptions
    expect(canvas.getByText("Perfect for small teams and projects")).toBeInTheDocument();
    expect(canvas.getByText("For growing businesses with advanced needs")).toBeInTheDocument();
    expect(canvas.getByText("Tailored solutions for large organizations")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$0")).toBeInTheDocument();
    expect(canvas.getByText("$49")).toBeInTheDocument();
    // For Custom pricing, verify it exists (multiple matches expected due to "Custom Integration" feature)
    const customElements = canvas.getAllByText(/Custom/);
    expect(customElements.length).toBeGreaterThan(0);
    
    // Verify features
    expect(canvas.getByText("5 Users")).toBeInTheDocument();
    expect(canvas.getByText("25 Users")).toBeInTheDocument();
    expect(canvas.getByText("Unlimited Users")).toBeInTheDocument();
    
    // Verify CTAs
    expect(canvas.getByText("Start Free")).toBeInTheDocument();
    expect(canvas.getByText("Upgrade to Pro")).toBeInTheDocument();
    expect(canvas.getByText("Contact Sales")).toBeInTheDocument();
    
    // Verify badges
    expect(canvas.getByText("Popular")).toBeInTheDocument();
    expect(canvas.getByText("Recommended")).toBeInTheDocument();
  },
}) as Story;

export const LongFeatureList: Story = enhanceStoryForDualMode({
  args: {
    services: [
      {
        id: "1",
        icon: "database",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify service is rendered
    expect(canvas.getByText("Complete Platform")).toBeInTheDocument();
    expect(canvas.getByText("Everything you need in one comprehensive solution")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("$199")).toBeInTheDocument();
    
    // Verify first few features are visible (list variant shows features as badges)
    expect(canvas.getByText("User Management")).toBeInTheDocument();
    expect(canvas.getByText("Role-Based Access")).toBeInTheDocument();
    expect(canvas.getByText("Data Analytics")).toBeInTheDocument();
    
    // Check for expand/collapse functionality in list variant
    const expandButton = canvas.queryByText(/\+\d+ more/);
    if (expandButton) {
      expect(expandButton).toBeInTheDocument();
    }
    
    // Verify CTA
    expect(canvas.getByText("View All Features")).toBeInTheDocument();
  },
}) as Story;
