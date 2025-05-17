import { render } from "@banja/react-jedi";
import { marketingServicesSchema } from "../../../schemas/marketing/services";

export function MarketingServicesPage() {
  return <div className="w-full">{render(marketingServicesSchema)}</div>;
}
