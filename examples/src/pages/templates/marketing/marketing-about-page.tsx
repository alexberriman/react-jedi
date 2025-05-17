import { render } from "@banja/react-jedi";
import { marketingAboutSchema } from "../../../schemas/marketing/about";
import { usePageMetadata } from "../../../lib/meta";

export function MarketingAboutPage() {
  usePageMetadata({
    title: "About Us",
    description: "About us page template - Company story, team, and values.",
  });
  return <div className="w-full">{render(marketingAboutSchema)}</div>;
}
