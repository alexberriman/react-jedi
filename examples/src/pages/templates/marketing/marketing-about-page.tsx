import { render } from "@banja/react-jedi";
import { marketingAboutSchema } from "../../../schemas/marketing/about";

export function MarketingAboutPage() {
  return <div className="w-full">{render(marketingAboutSchema)}</div>;
}
