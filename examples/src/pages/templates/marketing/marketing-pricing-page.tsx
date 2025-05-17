import { render } from "@banja/react-jedi";
import { marketingPricingSchema } from "../../../schemas/marketing/pricing";

export function MarketingPricingPage() {
  return <div className="w-full">{render(marketingPricingSchema)}</div>;
}
