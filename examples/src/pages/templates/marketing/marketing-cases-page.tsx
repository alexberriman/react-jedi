import { render } from "@banja/react-jedi";
import { marketingCasesSchema } from "../../../schemas/marketing/cases";

export function MarketingCasesPage() {
  return <div className="w-full">{render(marketingCasesSchema)}</div>;
}
