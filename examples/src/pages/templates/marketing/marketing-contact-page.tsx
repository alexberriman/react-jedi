import { render } from "@banja/react-jedi";
import { marketingContactSchema } from "../../../schemas/marketing/contact";

export function MarketingContactPage() {
  return <div className="w-full">{render(marketingContactSchema)}</div>;
}
