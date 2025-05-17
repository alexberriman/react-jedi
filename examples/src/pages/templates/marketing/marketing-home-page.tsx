import { render } from "@banja/react-jedi";
import { marketingHomeSchema } from "../../../schemas/marketing/home";

export function MarketingHomePage() {
  return <div className="w-full">{render(marketingHomeSchema)}</div>;
}
