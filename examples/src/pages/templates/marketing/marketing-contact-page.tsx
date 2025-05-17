import { render } from "@banja/react-jedi";
import { marketingContactSchema } from "../../../schemas/marketing/contact";
import { usePageMetadata } from "../../../lib/meta";

export function MarketingContactPage() {
  usePageMetadata({
    title: "Contact Us",
    description: "Contact page template - Contact form and company information.",
  });
  return <div className="w-full">{render(marketingContactSchema)}</div>;
}
