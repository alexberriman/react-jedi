import { render } from "@banja/react-jedi";
import { marketingServicesSchema } from "../../../schemas/marketing/services";
import { usePageMetadata } from "../../../lib/meta";

export function MarketingServicesPage() {
  usePageMetadata({
    title: "Services",
    description: "Services page template - Service offerings and features.",
  });
  return <div className="w-full">{render(marketingServicesSchema)}</div>;
}
