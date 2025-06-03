import { useState } from "react";
import { PricingTable } from "@alexberriman/react-jedi";
import type { PricingTier } from "@alexberriman/react-jedi";
import { Sparkles, Zap, Crown, Shield, Rocket, Star } from "lucide-react";
import { usePageMetadata } from "../../../../lib/meta";
import { ShowcaseDemo, ShowcaseSection } from "../../showcase-demo";
import { PageHeader } from "../../../../components/ui";

const starterTier: PricingTier = {
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
  ],
  cta: {
    text: "Get Started",
    variant: "outline",
  },
  savings: "Save $18",
};

const professionalTier: PricingTier = {
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
  ],
  cta: {
    text: "Start Free Trial",
    variant: "default",
  },
  savings: "Save $58",
};

const enterpriseTier: PricingTier = {
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
};

const defaultTiers = [starterTier, professionalTier, enterpriseTier];

export function PricingTableShowcase() {
  usePageMetadata({
    title: "Pricing Table Block",
    description: "Advanced pricing table component with multiple variants and billing cycle toggle",
  });

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div>
      <PageHeader
        title="Pricing Table Block"
        description="A flexible pricing table component with monthly/yearly toggle, feature comparison, multiple variants, and mobile-optimized layouts."
      />

      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Default Cards Variant */}
        <ShowcaseSection
          id="cards-variant"
          title="Cards Variant (Default)"
          description="The default card-based layout with hover effects and highlighted tier"
          code={`<PricingTable
  tiers={tiers}
  columns={3}
  showToggle={true}
  defaultBillingCycle="monthly"
  variant="cards"
  animated={true}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers}
              columns={3}
              showToggle={true}
              defaultBillingCycle="monthly"
              variant="cards"
              animated={true}
              onBillingCycleChange={setBillingCycle}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Comparison Table Variant */}
        <ShowcaseSection
          id="comparison-variant"
          title="Comparison Table Variant"
          description="Feature comparison matrix layout for detailed feature-by-feature comparison"
          code={`<PricingTable
  tiers={tiers}
  variant="comparison"
  showFeatureComparison={true}
  showToggle={true}
  defaultBillingCycle="monthly"
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers}
              variant="comparison"
              showFeatureComparison={true}
              showToggle={true}
              defaultBillingCycle="monthly"
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Minimal Variant */}
        <ShowcaseSection
          id="minimal-variant"
          title="Minimal Variant"
          description="Clean, borderless design for a more subtle appearance"
          code={`<PricingTable
  tiers={tiers}
  columns={3}
  variant="minimal"
  showToggle={false}
  animated={true}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers}
              columns={3}
              variant="minimal"
              showToggle={false}
              animated={true}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Compact Variant */}
        <ShowcaseSection
          id="compact-variant"
          title="Compact Variant"
          description="Space-efficient design with reduced padding"
          code={`<PricingTable
  tiers={tiers}
  columns={3}
  variant="compact"
  showToggle={true}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers.map(tier => ({
                ...tier,
                features: tier.features.slice(0, 5), // Fewer features for compact view
              }))}
              columns={3}
              variant="compact"
              showToggle={true}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* With Testimonials Variant */}
        <ShowcaseSection
          id="testimonials-variant"
          title="With Testimonials Variant"
          description="Include customer testimonials within each pricing tier"
          code={`<PricingTable
  tiers={tiers}
  variant="with-testimonials"
  testimonials={[
    {
      tierName: "Starter",
      quote: "Perfect for getting started...",
      author: "Sarah Johnson",
      role: "Freelance Designer"
    },
    // ...more testimonials
  ]}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers}
              variant="with-testimonials"
              columns={3}
              testimonials={[
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
              ]}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Gradient Variant */}
        <ShowcaseSection
          id="gradient-variant"
          title="Gradient Variant"
          description="Eye-catching gradient backgrounds for highlighted tiers"
          code={`<PricingTable
  tiers={tiers}
  variant="gradient"
  columns={3}
  showToggle={true}
  animated={true}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers}
              variant="gradient"
              columns={3}
              showToggle={true}
              animated={true}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Two Columns Layout */}
        <ShowcaseSection
          id="two-columns"
          title="Two Columns Layout"
          description="Perfect for comparing two main pricing options"
          code={`<PricingTable
  tiers={[basicTier, premiumTier]}
  columns={2}
  showToggle={true}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={[
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
              ]}
              columns={2}
              showToggle={true}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Four Columns Layout */}
        <ShowcaseSection
          id="four-columns"
          title="Four Columns Layout"
          description="Include a free tier alongside paid options"
          code={`<PricingTable
  tiers={[freeTier, ...paidTiers]}
  columns={4}
  showToggle={true}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={[
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
              ]}
              columns={4}
              showToggle={true}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Custom Currency */}
        <ShowcaseSection
          id="custom-currency"
          title="Custom Currency"
          description="Display prices in different currencies"
          code={`<PricingTable
  tiers={tiers}
  currency="€"
  columns={3}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers.map(tier => ({
                ...tier,
                currency: "€",
                price: typeof tier.price === "number" ? Math.round(tier.price * 0.85) : tier.price,
                monthlyPrice: tier.monthlyPrice ? Math.round(Number(tier.monthlyPrice) * 0.85) : undefined,
                yearlyPrice: tier.yearlyPrice ? Math.round(Number(tier.yearlyPrice) * 0.85) : undefined,
              }))}
              currency="€"
              columns={3}
              showToggle={true}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Without Toggle */}
        <ShowcaseSection
          id="no-toggle"
          title="Without Billing Toggle"
          description="Simple pricing display without monthly/yearly toggle"
          code={`<PricingTable
  tiers={tiers}
  columns={3}
  showToggle={false}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers}
              columns={3}
              showToggle={false}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Custom Icons */}
        <ShowcaseSection
          id="custom-icons"
          title="Custom Icons"
          description="Use custom icons or components for each tier"
          code={`<PricingTable
  tiers={tiers.map((tier, index) => ({
    ...tier,
    customIcon: (
      <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ...">
        {index + 1}
      </div>
    ),
  }))}
/>`}
        >
          <ShowcaseDemo>
            <PricingTable
              tiers={defaultTiers.map((tier, index) => ({
                ...tier,
                customIcon: (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                    {index + 1}
                  </div>
                ),
              }))}
              columns={3}
            />
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* Interactive Example */}
        <ShowcaseSection
          id="interactive"
          title="Interactive Example"
          description="Demonstrates event handling and state management"
          code={`<PricingTable
  tiers={tiers}
  onBillingCycleChange={(cycle) => {
    console.log('Billing cycle changed to:', cycle);
  }}
/>`}
        >
          <ShowcaseDemo>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current billing cycle: <strong className="text-gray-900 dark:text-white">{billingCycle}</strong>
                </p>
              </div>
              <PricingTable
                tiers={defaultTiers}
                columns={3}
                showToggle={true}
                defaultBillingCycle={billingCycle}
                animated={true}
                onBillingCycleChange={(cycle) => {
                  setBillingCycle(cycle);
                  console.log(`Billing cycle changed to: ${cycle}`);
                }}
              />
            </div>
          </ShowcaseDemo>
        </ShowcaseSection>

        {/* JSON Schema Example */}
        <ShowcaseSection
          id="json-schema"
          title="JSON Schema Example"
          description="Using the pricing table with React Jedi's render function"
          code={`import { render } from "@alexberriman/react-jedi";

const pricingSpec = {
  type: "PricingTable",
  props: {
    showToggle: true,
    defaultBillingCycle: "monthly",
    variant: "cards",
    columns: 3,
    tiers: [
      {
        name: "Starter",
        description: "Perfect for small projects",
        price: 9,
        monthlyPrice: 9,
        yearlyPrice: 90,
        currency: "$",
        period: "month",
        features: [
          { text: "5 Projects", included: true },
          { text: "Up to 10 users", included: true },
          { text: "2GB Storage", included: true },
          { text: "Community Support", included: true },
          { text: "Advanced Analytics", included: false }
        ],
        cta: {
          text: "Get Started",
          variant: "outline"
        },
        savings: "Save $18"
      },
      // ...more tiers
    ]
  }
};

// Render the pricing table
{render(pricingSpec)}`}
        >
          <ShowcaseDemo>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This pricing table is rendered from a JSON specification
              </p>
              {render({
                type: "PricingTable",
                props: {
                  showToggle: true,
                  defaultBillingCycle: "monthly",
                  variant: "cards",
                  columns: 3,
                  tiers: defaultTiers,
                },
              })}
            </div>
          </ShowcaseDemo>
        </ShowcaseSection>
      </div>
    </div>
  );
}