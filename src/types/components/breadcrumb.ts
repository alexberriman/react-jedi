import { BaseComponentSpec } from "../schema/base";

export interface BreadcrumbItemSpec {
  label?: string;
  href?: string;
  icon?: string | { type: "Icon"; name: string; size?: number };
  isCurrentPage?: boolean;
  isEllipsis?: boolean;
}

export interface BreadcrumbProps extends BaseComponentSpec {
  type: "breadcrumb";
  items: BreadcrumbItemSpec[];
  separator?: string;
  ariaLabel?: string;
}
