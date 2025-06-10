import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent, fn, waitFor } from "storybook/test";
import { PricingTable, type PricingTier } from "./pricing-table";
import { Sparkles, Zap, Crown, Rocket, Star, Shield } from "lucide-react";
import { enhanceStoryForDualMode } from "@sb/utils/enhance-story";

const meta = {
  title: "Blocks/PricingTable",
  component: PricingTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    columns: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
    },
    variant: {
      control: { type: "select" },
      options: ["cards", "comparison", "minimal", "compact", "with-testimonials", "gradient"],
    },
    defaultBillingCycle: {
      control: { type: "radio" },
      options: ["monthly", "yearly"],
    },
  },
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small projects",
    price: 9,
    monthlyPrice: 9,
    yearlyPrice: 90,
    currency: "$",
    period: "month",
    icon: Sparkles,
    features: [
      { text: "5 Projects", included: true },
      { text: "Up to 10 users", included: true },
      { text: "2GB Storage", included: true },
      { text: "Community Support", included: true },
      { text: "Basic Analytics", included: true },
      { text: "API Access", included: false },
      { text: "Advanced Analytics", included: false },
      { text: "Custom Domain", included: false },
      { text: "Priority Support", included: false },
    ],
    cta: {
      text: "Get Started",
      variant: "outline",
    },
    savings: "Save $18",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for growing teams",
    price: 29,
    monthlyPrice: 29,
    yearlyPrice: 290,
    currency: "$",
    period: "month",
    badge: "Most Popular",
    highlighted: true,
    popular: true,
    icon: Zap,
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "Up to 50 users", included: true },
      { text: "50GB Storage", included: true },
      { text: "Priority Support", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "API Access", included: true },
      { text: "Custom Domain", included: true },
      { text: "Team Collaboration", included: true },
      { text: "White-label Options", included: false },
    ],
    cta: {
      text: "Start Free Trial",
      variant: "default",
    },
    savings: "Save $58",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    icon: Crown,
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "Unlimited Users", included: true },
      { text: "Unlimited Storage", included: true },
      { text: "24/7 Dedicated Support", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "API Access", included: true },
      { text: "Custom Domain", included: true },
      { text: "Team Collaboration", included: true },
      { text: "White-label Options", included: true },
    ],
    cta: {
      text: "Contact Sales",
      variant: "outline",
    },
  },
];

export const Default: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    columns: 3,
    showToggle: true,
    defaultBillingCycle: "monthly",
    animated: true,
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify all tiers are rendered", async () => {
      expect(canvas.getByText("Starter")).toBeInTheDocument();
      expect(canvas.getByText("Professional")).toBeInTheDocument();
      expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    });

    await step("Verify pricing display", async () => {
      const currencySymbols = canvas.getAllByText("$");
      expect(currencySymbols.length).toBeGreaterThanOrEqual(2);
      expect(canvas.getByText("9")).toBeInTheDocument();
      expect(canvas.getByText("29")).toBeInTheDocument();
      expect(canvas.getByText("Custom")).toBeInTheDocument();
    });

    await step("Test billing cycle toggle", async () => {
      const yearlyButton = canvas.getByRole("tab", { name: /yearly/i });
      await userEvent.click(yearlyButton);

      // Check yearly prices are displayed
      expect(canvas.getByText("90")).toBeInTheDocument();
      expect(canvas.getByText("290")).toBeInTheDocument();

      // Check savings text
      expect(canvas.getByText("Save $18")).toBeInTheDocument();
      expect(canvas.getByText("Save $58")).toBeInTheDocument();
    });

    await step("Verify CTA buttons", async () => {
      expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Start Free Trial" })).toBeInTheDocument();
      expect(canvas.getByRole("button", { name: "Contact Sales" })).toBeInTheDocument();
    });

    await step("Verify badge on highlighted tier", async () => {
      expect(canvas.getByText("Most Popular")).toBeInTheDocument();
    });
  },
}) as Story;

export const ComparisonTable: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    variant: "comparison",
    showFeatureComparison: true,
    showToggle: true,
    defaultBillingCycle: "monthly",
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify table structure
    const table = canvas.getByRole("table");
    expect(table).toBeInTheDocument();

    // Verify feature rows
    expect(canvas.getByText("5 Projects")).toBeInTheDocument();
    expect(canvas.getByText("Unlimited Projects")).toBeInTheDocument();

    // Test billing toggle in comparison view
    const yearlyButton = canvas.getByRole("button", { name: /yearly/i });
    await userEvent.click(yearlyButton);

    expect(canvas.getByText("90")).toBeInTheDocument();
    expect(canvas.getByText("290")).toBeInTheDocument();
  },
}) as Story;

export const MinimalVariant: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    variant: "minimal",
    columns: 3,
    showToggle: false,
    animated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify tiers are rendered with minimal styling
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("9")).toBeInTheDocument();
    expect(canvas.getByText("29")).toBeInTheDocument();
    expect(canvas.getByText("Custom")).toBeInTheDocument();
  },
}) as Story;

export const CompactVariant: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers.map((tier) => ({
      ...tier,
      features: tier.features.slice(0, 5), // Fewer features for compact view
    })),
    variant: "compact",
    columns: 3,
    showToggle: true,
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify compact layout with reduced features
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify reduced feature set
    expect(canvas.getByText("5 Projects")).toBeInTheDocument();
    expect(canvas.getByText("Community Support")).toBeInTheDocument();
  },
}) as Story;

export const WithTestimonials: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    variant: "with-testimonials",
    columns: 3,
    testimonials: [
      {
        tierName: "Starter",
        quote: "Perfect for getting started. The features are exactly what we needed.",
        author: "Sarah Johnson",
        role: "Freelance Designer",
      },
      {
        tierName: "Professional",
        quote: "The best value for growing teams. Support is fantastic!",
        author: "Mike Chen",
        role: "Startup Founder",
      },
      {
        tierName: "Enterprise",
        quote: "Enterprise-grade features with unmatched reliability.",
        author: "Lisa Thompson",
        role: "CTO, TechCorp",
      },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    await step("Verify tier cards are rendered", async () => {
      expect(canvas.getByText("Starter")).toBeInTheDocument();
      expect(canvas.getByText("Professional")).toBeInTheDocument();
      expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    });
    
    await step("Verify testimonials are rendered", async () => {
      // Use waitFor to ensure testimonials are loaded
      await waitFor(() => {
        // The testimonial text is wrapped in quotes, so we need to look for it more flexibly
        const blockquotes = canvas.getAllByRole('blockquote');
        const testimonialQuote = blockquotes.find(el => 
          el.textContent?.includes("Perfect for getting started. The features are exactly what we needed.")
        );
        expect(testimonialQuote).toBeTruthy();
      });
      
      // The author info is in a paragraph with em dash, so use a flexible matcher
      expect(canvas.getByText(/Sarah Johnson/)).toBeInTheDocument();
      expect(canvas.getByText(/Mike Chen/)).toBeInTheDocument();
      expect(canvas.getByText(/Lisa Thompson/)).toBeInTheDocument();
    });
  },
}) as Story;

export const GradientVariant: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    variant: "gradient",
    columns: 3,
    showToggle: true,
    animated: true,
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify gradient variant styling
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify highlighted tier has special styling
    expect(canvas.getByText("Most Popular")).toBeInTheDocument();
  },
}) as Story;

export const FourColumns: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: [
      {
        name: "Free",
        description: "Try it out",
        price: 0,
        monthlyPrice: 0,
        yearlyPrice: 0,
        currency: "$",
        period: "forever",
        icon: Rocket,
        features: [
          { text: "1 Project", included: true },
          { text: "1 User", included: true },
          { text: "100MB Storage", included: true },
          { text: "Community Support", included: true },
          { text: "Basic Features", included: true },
        ],
        cta: {
          text: "Sign Up Free",
          variant: "outline",
        },
      },
      ...defaultTiers,
    ],
    columns: 4,
    showToggle: true,
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify all four tiers are rendered
    expect(canvas.getByText("Free")).toBeInTheDocument();
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify free tier details
    const zeroPrice = canvas.getAllByText("0");
    expect(zeroPrice.length).toBeGreaterThan(0);
    expect(canvas.getByText("Sign Up Free")).toBeInTheDocument();
  },
}) as Story;

export const TwoColumns: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: [
      {
        name: "Basic",
        description: "For individuals",
        price: 15,
        monthlyPrice: 15,
        yearlyPrice: 150,
        currency: "$",
        period: "month",
        icon: Star,
        features: [
          { text: "10 Projects", included: true },
          { text: "5GB Storage", included: true },
          { text: "Email Support", included: true },
          { text: "Basic Analytics", included: true },
          { text: "API Access", included: false },
        ],
        cta: {
          text: "Choose Basic",
          variant: "outline",
        },
        savings: "Save $30",
      },
      {
        name: "Premium",
        description: "For teams",
        price: 49,
        monthlyPrice: 49,
        yearlyPrice: 490,
        currency: "$",
        period: "month",
        badge: "Best Value",
        highlighted: true,
        icon: Shield,
        features: [
          { text: "Unlimited Projects", included: true },
          { text: "100GB Storage", included: true },
          { text: "Priority Support", included: true },
          { text: "Advanced Analytics", included: true },
          { text: "API Access", included: true },
        ],
        cta: {
          text: "Choose Premium",
          variant: "default",
        },
        savings: "Save $98",
      },
    ],
    columns: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify two columns layout
    expect(canvas.getByText("Basic")).toBeInTheDocument();
    expect(canvas.getByText("Premium")).toBeInTheDocument();
    
    // Verify pricing
    expect(canvas.getByText("15")).toBeInTheDocument();
    expect(canvas.getByText("49")).toBeInTheDocument();
    
    // Verify badge on highlighted tier
    expect(canvas.getByText("Best Value")).toBeInTheDocument();
    
    // Verify CTA buttons
    expect(canvas.getByText("Choose Basic")).toBeInTheDocument();
    expect(canvas.getByText("Choose Premium")).toBeInTheDocument();
  },
}) as Story;

export const CustomCurrency: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers.map((tier) => ({
      ...tier,
      currency: "€",
      price: typeof tier.price === "number" ? tier.price * 0.85 : tier.price,
      monthlyPrice: tier.monthlyPrice ? Number(tier.monthlyPrice) * 0.85 : undefined,
      yearlyPrice: tier.yearlyPrice ? Number(tier.yearlyPrice) * 0.85 : undefined,
    })),
    currency: "€",
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify Euro currency symbols
    const euroSymbols = canvas.getAllByText("€");
    expect(euroSymbols.length).toBeGreaterThanOrEqual(2);
    
    // Verify converted prices (approximately)
    expect(canvas.getByText(Math.floor(9 * 0.85).toString())).toBeInTheDocument();
    expect(canvas.getByText(Math.floor(29 * 0.85).toString())).toBeInTheDocument();
  },
}) as Story;

export const NoToggle: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    columns: 3,
    showToggle: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify tiers are rendered
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify no toggle buttons
    const monthlyTab = canvas.queryByRole("tab", { name: /monthly/i });
    const yearlyTab = canvas.queryByRole("tab", { name: /yearly/i });
    expect(monthlyTab).not.toBeInTheDocument();
    expect(yearlyTab).not.toBeInTheDocument();
  },
}) as Story;

export const SingleColumn: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: [defaultTiers[1]], // Just the Professional tier
    columns: 1,
    showToggle: true,
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify single column layout
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("29")).toBeInTheDocument();
    expect(canvas.getByText("Most Popular")).toBeInTheDocument();
    
    // Test toggle functionality
    const yearlyButton = canvas.getByRole("tab", { name: /yearly/i });
    await userEvent.click(yearlyButton);
    expect(canvas.getByText("290")).toBeInTheDocument();
  },
}) as Story;

export const CustomIcons: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers.map((tier, index) => ({
      ...tier,
      customIcon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          {index + 1}
        </div>
      ),
    })),
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify tiers with custom icons
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();
    
    // Verify custom icon numbers
    expect(canvas.getByText("1")).toBeInTheDocument();
    expect(canvas.getByText("2")).toBeInTheDocument();
    expect(canvas.getByText("3")).toBeInTheDocument();
  },
}) as Story;

export const WithTooltips: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers.map((tier) => ({
      ...tier,
      features: tier.features.map((feature) => ({
        ...feature,
        tooltip: feature.included
          ? `This feature is included in the ${tier.name} plan`
          : `Upgrade to access this feature`,
      })),
    })),
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify features are rendered
    expect(canvas.getByText("5 Projects")).toBeInTheDocument();
    expect(canvas.getByText("Unlimited Projects")).toBeInTheDocument();
    expect(canvas.getByText("API Access")).toBeInTheDocument();
    
    // Features should have title attributes for tooltips
    const featureElements = canvas.getAllByText(/Projects|Storage|Support|Analytics/);
    expect(featureElements.length).toBeGreaterThan(0);
  },
}) as Story;

export const InteractiveExample: Story = enhanceStoryForDualMode({
  args: {
    type: "PricingTable",
    tiers: defaultTiers,
    columns: 3,
    showToggle: true,
    defaultBillingCycle: "monthly",
    animated: true,
    onBillingCycleChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test hover effects on cards
    const cards = canvas.getAllByRole("article");
    for (const card of cards) {
      await userEvent.hover(card);
      await new Promise((resolve) => globalThis.setTimeout(resolve, 100)); // Brief pause for animation
    }

    // Test CTA button interactions
    const ctaButtons = canvas.getAllByRole("button");
    const salesButton = ctaButtons.find((btn) => btn.textContent === "Contact Sales");
    if (salesButton) {
      await userEvent.click(salesButton);
    }
  },
}) as Story;
