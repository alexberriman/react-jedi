import type { Meta, StoryObj } from "@storybook/react-vite";
import { Features, type Feature } from "./features";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";
import { expect, within } from "storybook/test";

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
    icon: "FiZap",
    benefits: ["Sub-second page loads", "Optimized asset delivery", "Global CDN distribution"],
    category: "Performance",
    status: "available",
  },
  {
    id: "2",
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and comprehensive compliance.",
    icon: "FiShield",
    benefits: ["SOC 2 Type II certified", "GDPR compliant", "256-bit encryption"],
    category: "Security",
    status: "available",
  },
  {
    id: "3",
    title: "Advanced Analytics",
    description: "Gain deep insights into your data with our powerful analytics dashboard.",
    icon: "FiTrendingUp",
    benefits: ["Real-time reporting", "Custom dashboards", "Predictive analytics"],
    category: "Analytics",
    status: "available",
    badge: "Popular",
  },
  {
    id: "4",
    title: "Team Collaboration",
    description: "Work seamlessly with your team with built-in collaboration features.",
    icon: "FiUsers",
    benefits: ["Real-time collaboration", "Role-based permissions", "Activity tracking"],
    category: "Collaboration",
    status: "available",
  },
  {
    id: "5",
    title: "Developer API",
    description: "Powerful REST and GraphQL APIs for seamless integration with your tools.",
    icon: "FiCode",
    benefits: ["RESTful endpoints", "GraphQL support", "Webhook automation"],
    category: "Developer",
    status: "available",
  },
  {
    id: "6",
    title: "AI-Powered Insights",
    description: "Leverage machine learning to automate workflows and surface key insights.",
    icon: "FiDatabase",
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
    icon: "FiLayout",
    image: "https://placehold.co/800x450/EEE/31343C",
    benefits: ["Customizable widgets", "Real-time data updates", "Mobile responsive design"],
    category: "Core Features",
  },
  {
    id: "2",
    title: "Advanced Security",
    description:
      "Enterprise-grade security features protect your data with multiple layers of encryption, regular security audits, and compliance certifications.",
    icon: "FiLock",
    image: "https://placehold.co/800x450/EEE/31343C",
    benefits: ["Two-factor authentication", "End-to-end encryption", "Regular security audits"],
    category: "Security",
  },
  {
    id: "3",
    title: "Seamless Integrations",
    description:
      "Connect with your favorite tools and services. Our platform integrates with over 100+ popular business applications.",
    icon: "FiServer",
    image: "https://placehold.co/800x450/EEE/31343C",
    benefits: ["One-click integrations", "Custom API support", "Automated workflows"],
    category: "Integrations",
  },
];

export const Default: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures,
    title: "Powerful Features for Modern Teams",
    subtitle: "Everything you need to build, deploy, and scale your applications",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Powerful Features for Modern Teams")).toBeInTheDocument();
    await expect(canvas.getByText("Everything you need to build, deploy, and scale your applications")).toBeInTheDocument();
    
    // Verify feature titles are present
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
    await expect(canvas.getByText("Advanced Analytics")).toBeInTheDocument();
    
    // Verify feature descriptions
    await expect(canvas.getByText("Built with performance in mind, our platform delivers exceptional speed and responsiveness.")).toBeInTheDocument();
    await expect(canvas.getByText("Bank-level security with end-to-end encryption and comprehensive compliance.")).toBeInTheDocument();
    
    // Verify benefits are shown
    await expect(canvas.getByText("Sub-second page loads")).toBeInTheDocument();
    await expect(canvas.getByText("SOC 2 Type II certified")).toBeInTheDocument();
    
    // Verify status badges
    await expect(canvas.getByText("Popular")).toBeInTheDocument();
    await expect(canvas.getByText("Coming Soon")).toBeInTheDocument();
  },
}) as Story;

export const GridTwoColumns: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures.slice(0, 4),
    variant: "grid",
    gridColumns: 2,
    title: "Core Features",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title
    await expect(canvas.getByText("Core Features")).toBeInTheDocument();
    
    // Verify only 4 features are shown (first 4)
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
    await expect(canvas.getByText("Advanced Analytics")).toBeInTheDocument();
    await expect(canvas.getByText("Team Collaboration")).toBeInTheDocument();
    
    // Verify grid layout - should have 2 columns on desktop
    const featuresContainer = canvas.getByText("Lightning Fast Performance").closest('.grid');
    await expect(featuresContainer).toHaveClass('md:grid-cols-2');
  },
}) as Story;

export const GridFourColumns: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures.slice(0, 8),
    variant: "grid",
    gridColumns: 4,
    showBenefits: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify features are shown
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
    
    // Verify grid layout - should have 4 columns on large screens
    const featuresContainer = canvas.getByText("Lightning Fast Performance").closest('.grid');
    await expect(featuresContainer).toHaveClass('lg:grid-cols-4');
    
    // Verify benefits are not shown when showBenefits is false
    await expect(canvas.queryByText("Sub-second page loads")).not.toBeInTheDocument();
  },
}) as Story;

export const AlternatingWithImages: Story = enhanceStoryForDualMode({
  args: {
    features: featuresWithImages,
    variant: "alternating",
    title: "Why Choose Our Platform",
    subtitle: "Discover the features that set us apart",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Why Choose Our Platform")).toBeInTheDocument();
    await expect(canvas.getByText("Discover the features that set us apart")).toBeInTheDocument();
    
    // Verify alternating features with images
    await expect(canvas.getByText("Intuitive Dashboard")).toBeInTheDocument();
    await expect(canvas.getByText("Advanced Security")).toBeInTheDocument();
    await expect(canvas.getByText("Seamless Integrations")).toBeInTheDocument();
    
    // Verify images are present
    const images = canvas.getAllByRole('img');
    await expect(images).toHaveLength(3);
    
    // Verify benefits are shown
    await expect(canvas.getByText("Customizable widgets")).toBeInTheDocument();
    await expect(canvas.getByText("Two-factor authentication")).toBeInTheDocument();
  },
}) as Story;

export const TabbedCategories: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures,
    variant: "tabbed",
    categories: ["Performance", "Security", "Analytics", "Collaboration", "Developer"],
    title: "Explore Features by Category",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title
    await expect(canvas.getByText("Explore Features by Category")).toBeInTheDocument();
    
    // Verify tabs are present
    await expect(canvas.getByRole('tab', { name: 'All Features' })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: 'Performance' })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: 'Security' })).toBeInTheDocument();
    await expect(canvas.getByRole('tab', { name: 'Analytics' })).toBeInTheDocument();
    
    // Verify all features are shown initially
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
  },
}) as Story;

export const IconFocused: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures.map((f) => ({ ...f, benefits: undefined })),
    variant: "icon-focused",
    gridColumns: 4,
    title: "Simple and Powerful",
    showBenefits: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title
    await expect(canvas.getByText("Simple and Powerful")).toBeInTheDocument();
    
    // Verify icon-focused layout with centered text
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
    
    // Verify grid has 4 columns
    const featuresContainer = canvas.getByText("Lightning Fast Performance").closest('.grid');
    await expect(featuresContainer).toHaveClass('lg:grid-cols-4');
    
    // Verify benefits are not shown
    await expect(canvas.queryByText("Sub-second page loads")).not.toBeInTheDocument();
  },
}) as Story;

export const ComparisonTable: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures.slice(0, 8),
    variant: "comparison",
    comparisonPlans: ["Starter", "Professional", "Enterprise"],
    title: "Compare Plans",
    subtitle: "Choose the perfect plan for your needs",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Compare Plans")).toBeInTheDocument();
    await expect(canvas.getByText("Choose the perfect plan for your needs")).toBeInTheDocument();
    
    // Verify table headers
    await expect(canvas.getByText("Features")).toBeInTheDocument();
    await expect(canvas.getByText("Starter")).toBeInTheDocument();
    await expect(canvas.getByText("Professional")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify feature rows in table
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
  },
}) as Story;

export const WithClickHandler: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures,
    title: "Interactive Features",
    subtitle: "Click any feature to learn more",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Interactive Features")).toBeInTheDocument();
    await expect(canvas.getByText("Click any feature to learn more")).toBeInTheDocument();
    
    // Verify features are clickable
    const featureCard = canvas.getByText("Lightning Fast Performance").closest('.cursor-pointer');
    await expect(featureCard).toBeInTheDocument();
    
    // Verify hover effects are applied
    await expect(featureCard).toHaveClass('hover:shadow-lg');
  },
}) as Story;

export const NoAnimation: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures,
    animated: false,
    title: "Features Without Animation",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title
    await expect(canvas.getByText("Features Without Animation")).toBeInTheDocument();
    
    // Verify features are present
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
    
    // Animation disabled, so elements should not have motion initial styles
    const featureCards = canvas.getAllByText("Lightning Fast Performance");
    await expect(featureCards[0]).toBeInTheDocument();
  },
}) as Story;

export const MixedStatuses: Story = enhanceStoryForDualMode({
  args: {
    features: [
      ...sampleFeatures.slice(0, 3),
      {
        id: "beta-1",
        title: "Beta Feature",
        description: "This feature is currently in beta testing.",
        icon: "FiSettings",
        status: "beta",
        category: "Experimental",
      },
      {
        id: "soon-1",
        title: "Coming Soon Feature",
        description: "This exciting feature will be available soon.",
        icon: "FiZap",
        status: "coming-soon",
        category: "Upcoming",
      },
    ],
    title: "Feature Roadmap",
    subtitle: "Current and upcoming features",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Feature Roadmap")).toBeInTheDocument();
    await expect(canvas.getByText("Current and upcoming features")).toBeInTheDocument();
    
    // Verify different status badges
    await expect(canvas.getByText("Beta")).toBeInTheDocument();
    await expect(canvas.getByText("Coming Soon")).toBeInTheDocument();
    await expect(canvas.getByText("Popular")).toBeInTheDocument();
    
    // Verify feature titles
    await expect(canvas.getByText("Beta Feature")).toBeInTheDocument();
    await expect(canvas.getByText("Coming Soon Feature")).toBeInTheDocument();
  },
}) as Story;

export const MinimalGrid: Story = enhanceStoryForDualMode({
  args: {
    features: sampleFeatures.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description,
    })),
    gridColumns: 3,
    showBenefits: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify minimal features (no icons, benefits, etc.)
    await expect(canvas.getByText("Lightning Fast Performance")).toBeInTheDocument();
    await expect(canvas.getByText("Enterprise Security")).toBeInTheDocument();
    
    // Verify descriptions are present
    await expect(canvas.getByText("Built with performance in mind, our platform delivers exceptional speed and responsiveness.")).toBeInTheDocument();
    
    // Verify no benefits are shown
    await expect(canvas.queryByText("Sub-second page loads")).not.toBeInTheDocument();
    
    // Verify grid has 3 columns
    const featuresContainer = canvas.getByText("Lightning Fast Performance").closest('.grid');
    await expect(featuresContainer).toHaveClass('md:grid-cols-3');
  },
}) as Story;

export const SaaSFeatures: Story = enhanceStoryForDualMode({
  args: {
    features: [
      {
        id: "auth",
        title: "Authentication & SSO",
        description:
          "Secure authentication with support for SAML, OAuth, and custom SSO providers.",
        icon: "FiLock",
        benefits: ["SAML 2.0", "OAuth 2.0", "Multi-factor auth"],
        category: "Security",
      },
      {
        id: "api",
        title: "Developer-First API",
        description: "RESTful API with comprehensive documentation and SDKs for popular languages.",
        icon: "FiCode",
        benefits: ["REST & GraphQL", "Webhook support", "Rate limiting"],
        category: "Developer",
      },
      {
        id: "scale",
        title: "Auto-Scaling Infrastructure",
        description: "Automatically scale resources based on demand with zero downtime.",
        icon: "FiServer",
        benefits: ["Auto-scaling", "99.9% uptime SLA", "Global CDN"],
        category: "Infrastructure",
      },
      {
        id: "analytics",
        title: "Advanced Analytics",
        description: "Real-time analytics and reporting with custom dashboards and alerts.",
        icon: "FiTrendingUp",
        benefits: ["Real-time data", "Custom reports", "Data export"],
        category: "Analytics",
      },
    ],
    variant: "grid",
    gridColumns: 2,
    title: "Enterprise-Ready Platform",
    subtitle: "Built for scale, designed for developers",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Enterprise-Ready Platform")).toBeInTheDocument();
    await expect(canvas.getByText("Built for scale, designed for developers")).toBeInTheDocument();
    
    // Verify SaaS-specific features
    await expect(canvas.getByText("Authentication & SSO")).toBeInTheDocument();
    await expect(canvas.getByText("Developer-First API")).toBeInTheDocument();
    await expect(canvas.getByText("Auto-Scaling Infrastructure")).toBeInTheDocument();
    await expect(canvas.getByText("Advanced Analytics")).toBeInTheDocument();
    
    // Verify benefits are shown
    await expect(canvas.getByText("SAML 2.0")).toBeInTheDocument();
    await expect(canvas.getByText("REST & GraphQL")).toBeInTheDocument();
    await expect(canvas.getByText("99.9% uptime SLA")).toBeInTheDocument();
    
    // Verify grid has 2 columns
    const featuresContainer = canvas.getByText("Authentication & SSO").closest('.grid');
    await expect(featuresContainer).toHaveClass('md:grid-cols-2');
  },
}) as Story;

export const ServiceOfferings: Story = enhanceStoryForDualMode({
  args: {
    features: [
      {
        id: "consulting",
        title: "Strategic Consulting",
        description: "Expert guidance to transform your business with proven methodologies.",
        icon: "FiUsers",
        image: "https://placehold.co/800x450/EEE/31343C",
        benefits: ["Industry expertise", "Tailored solutions", "ROI focused"],
      },
      {
        id: "implementation",
        title: "Implementation Services",
        description: "End-to-end implementation with dedicated project management.",
        icon: "FiSettings",
        image: "https://placehold.co/800x450/EEE/31343C",
        benefits: ["Agile methodology", "Risk mitigation", "On-time delivery"],
      },
      {
        id: "support",
        title: "24/7 Support",
        description: "Round-the-clock support from our team of certified experts.",
        icon: "FiShield",
        image: "https://placehold.co/800x450/EEE/31343C",
        benefits: ["Phone & chat support", "Dedicated account manager", "Priority response"],
      },
    ],
    variant: "alternating",
    title: "Our Services",
    subtitle: "Comprehensive solutions for your business needs",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Verify title and subtitle
    await expect(canvas.getByText("Our Services")).toBeInTheDocument();
    await expect(canvas.getByText("Comprehensive solutions for your business needs")).toBeInTheDocument();
    
    // Verify service offerings in alternating layout
    await expect(canvas.getByText("Strategic Consulting")).toBeInTheDocument();
    await expect(canvas.getByText("Implementation Services")).toBeInTheDocument();
    await expect(canvas.getByText("24/7 Support")).toBeInTheDocument();
    
    // Verify images are present for alternating layout
    const images = canvas.getAllByRole('img');
    await expect(images).toHaveLength(3);
    
    // Verify benefits are shown
    await expect(canvas.getByText("Industry expertise")).toBeInTheDocument();
    await expect(canvas.getByText("Agile methodology")).toBeInTheDocument();
    await expect(canvas.getByText("Phone & chat support")).toBeInTheDocument();
  },
}) as Story;
