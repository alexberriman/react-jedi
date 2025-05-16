import type { BaseComponentSpec } from "../schema/base";

export interface NavigationTriggerSpec {
  label: string;
  icon?: string;
}

export interface NavigationLinkSpec {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  external?: boolean;
  active?: boolean;
}

export interface NavigationSectionSpec {
  title: string;
  links: NavigationLinkSpec[];
}

export interface NavigationFeatureSpec {
  title: string;
  description: string;
  image?: string;
  href?: string;
  cta?: string;
}

export interface NavigationContentSpec {
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  items: (NavigationLinkSpec | NavigationSectionSpec | NavigationFeatureSpec)[];
}

export interface NavigationItemSpec {
  trigger: NavigationTriggerSpec;
  content?: NavigationContentSpec | NavigationLinkSpec;
  href?: string;
}

export interface NavigationMenuComponent extends BaseComponentSpec {
  type: "navigationMenu";
  orientation?: "horizontal" | "vertical";
  delayDuration?: number;
  skipDelayDuration?: number;
  viewport?: boolean;
  items: NavigationItemSpec[];
}
