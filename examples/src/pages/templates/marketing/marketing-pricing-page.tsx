import { render } from "@banja/react-jedi";
import { marketingPricingSchema } from "../../../schemas/marketing/pricing";
import { usePageMetadata } from "../../../lib/meta";

export function MarketingPricingPage() {
  usePageMetadata({
    title: "Pricing",
    description: "Pricing page template - Tiered pricing plans and features.",
  });
  return <div className="w-full">{render(marketingPricingSchema)}</div>;
}
