import { render } from "@banja/react-jedi";
import { marketingCasesSchema } from "../../../schemas/marketing/cases";
import { usePageMetadata } from "../../../lib/meta";

export function MarketingCasesPage() {
  usePageMetadata({
    title: "Case Studies",
    description: "Case studies page template - Client success stories and project showcases.",
  });
  return <div className="w-full">{render(marketingCasesSchema)}</div>;
}
