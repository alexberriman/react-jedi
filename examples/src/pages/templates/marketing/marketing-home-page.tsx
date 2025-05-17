import { render } from "@banja/react-jedi";
import { marketingHomeSchema } from "../../../schemas/marketing/home";
import { usePageMetadata } from "../../../lib/meta";

export function MarketingHomePage() {
  usePageMetadata({
    title: "Marketing Home",
    description: "Marketing website homepage template - Hero, features, and modern design.",
  });
  return <div className="w-full">{render(marketingHomeSchema)}</div>;
}
