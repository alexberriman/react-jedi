import { render } from "@alexberriman/react-jedi";
import { marketingHomeSchema } from "../../../schemas/marketing/home";

export function MarketingHomePage() {
  return render(marketingHomeSchema);
}
