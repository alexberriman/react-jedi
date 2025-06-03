import type { BaseComponentSpec } from "../schema/base";
import type { StructuredDataSchema } from "../../lib/seo/structured-data";

export interface HeadManagerSpec extends BaseComponentSpec {
  type: "head-manager" | "headManager";
  metadata: {
    title: string;
    description?: string;
    keywords?: string[];
    author?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: "summary" | "summary_large_image" | "app" | "player";
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    canonicalUrl?: string;
    favicon?:
      | string
      | {
          default?: string;
          apple?: string;
          icon16?: string;
          icon32?: string;
          manifest?: string;
        };
  };
  titleSuffix?: string;
  defaultTitle?: string;
}

export interface ExtendedHeadManagerSpec extends Omit<HeadManagerSpec, "type"> {
  type: "extended-head-manager" | "extendedHeadManager" | "ExtendedHeadManager";
  structuredData?: StructuredDataSchema | StructuredDataSchema[];
}
