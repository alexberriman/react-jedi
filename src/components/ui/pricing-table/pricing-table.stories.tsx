import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { PricingTable } from "./pricing-table";

const meta = {
  title: "Components/Marketing/PricingTable",
  component: PricingTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "test"],
  argTypes: {
    columns: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
    },
  },
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTiers = [
  {
    name: "Starter",
    description: "Perfect for small projects",
    price: 9,
    currency: "$",
    period: "month",
    features: [
      { text: "5 Projects", included: true },
      { text: "Up to 10 users", included: true },
      { text: "2GB Storage", included: true },
      { text: "Community Support", included: true },
      { text: "Advanced Analytics", included: false },
      { text: "Custom Domain", included: false },
    ],
    cta: {
      text: "Get Started",
      variant: "outline" as const,
    },
  },
  {
    name: "Professional",
    description: "Best for growing teams",
    price: 29,
    currency: "$",
    period: "month",
    badge: "Most Popular",
    highlighted: true,
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "Up to 50 users", included: true },
      { text: "50GB Storage", included: true },
      { text: "Priority Support", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Custom Domain", included: true },
    ],
    cta: {
      text: "Start Free Trial",
      variant: "default" as const,
    },
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "Unlimited Users", included: true },
      { text: "Unlimited Storage", included: true },
      { text: "24/7 Dedicated Support", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Custom Domain", included: true },
    ],
    cta: {
      text: "Contact Sales",
      variant: "outline" as const,
    },
  },
];

export const Default: Story = {
  args: {
    tiers: defaultTiers,
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all tiers are rendered
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.getByText("Enterprise")).toBeInTheDocument();

    // Test pricing display - currency and price are in separate elements
    const currencySymbols = canvas.getAllByText("$");
    expect(currencySymbols.length).toBeGreaterThanOrEqual(2); // At least 2 tiers have $ symbol
    expect(canvas.getByText("9")).toBeInTheDocument();
    expect(canvas.getByText("29")).toBeInTheDocument();
    expect(canvas.getByText("Custom")).toBeInTheDocument();

    // Test CTA buttons
    expect(canvas.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Start Free Trial" })).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Contact Sales" })).toBeInTheDocument();

    // Test badge on highlighted tier
    expect(canvas.getByText("Most Popular")).toBeInTheDocument();

    // Test features are rendered
    expect(canvas.getByText("5 Projects")).toBeInTheDocument();
    expect(canvas.getByText("Unlimited Projects")).toBeInTheDocument();
  },
};

export const TwoColumns: Story = {
  args: {
    tiers: defaultTiers.slice(0, 2),
    columns: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test only two tiers are rendered
    expect(canvas.getByText("Starter")).toBeInTheDocument();
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.queryByText("Enterprise")).not.toBeInTheDocument();

    // Test layout has correct columns
    const container = canvasElement.querySelector(".grid");
    expect(container).toHaveClass("md:grid-cols-2");
  },
};

export const FourColumns: Story = {
  args: {
    tiers: [
      {
        name: "Free",
        price: 0,
        currency: "$",
        period: "forever",
        features: [
          { text: "1 Project", included: true },
          { text: "1 User", included: true },
          { text: "100MB Storage", included: true },
          { text: "Community Support", included: false },
        ],
        cta: {
          text: "Sign Up",
          variant: "outline",
        },
      },
      ...defaultTiers,
    ],
    columns: 4,
  },
};

export const AnnualPricing: Story = {
  args: {
    tiers: defaultTiers.map((tier) => ({
      ...tier,
      price: typeof tier.price === "number" ? tier.price * 10 : tier.price,
      period: tier.period === "month" ? "year" : tier.period,
      badge: tier.name === "Professional" ? "Save 20%" : tier.badge,
    })),
    columns: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test annual pricing - currency and price are in separate elements
    expect(canvas.getByText("90")).toBeInTheDocument();
    expect(canvas.getByText("290")).toBeInTheDocument();

    // Test period is updated to year
    const yearText = canvas.getAllByText(/year/i);
    expect(yearText.length).toBeGreaterThan(0);

    // Test updated badge
    expect(canvas.getByText("Save 20%")).toBeInTheDocument();
  },
};

export const MinimalFeatures: Story = {
  args: {
    tiers: defaultTiers.map((tier) => ({
      ...tier,
      features: tier.features.slice(0, 3),
    })),
    columns: 3,
  },
};

export const NoHighlight: Story = {
  args: {
    tiers: defaultTiers.map((tier) => ({
      ...tier,
      highlighted: false,
      badge: undefined,
    })),
    columns: 3,
  },
};

export const SingleColumn: Story = {
  args: {
    tiers: [defaultTiers[1]],
    columns: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test only one tier is rendered
    expect(canvas.getByText("Professional")).toBeInTheDocument();
    expect(canvas.queryByText("Starter")).not.toBeInTheDocument();
    expect(canvas.queryByText("Enterprise")).not.toBeInTheDocument();

    // Test all features are visible
    expect(canvas.getByText("Unlimited Projects")).toBeInTheDocument();
    expect(canvas.getByText("Up to 50 users")).toBeInTheDocument();
    expect(canvas.getByText("50GB Storage")).toBeInTheDocument();
    expect(canvas.getByText("Priority Support")).toBeInTheDocument();
    expect(canvas.getByText("Advanced Analytics")).toBeInTheDocument();
    expect(canvas.getByText("Custom Domain")).toBeInTheDocument();
  },
};
