import { BaseComponentSpec } from "../schema/base";

export interface PaginationLinkItemSpec {
  href?: string;
  onClick?: string; // Action ID for onClick handler
  isActive?: boolean;
  isDisabled?: boolean;
  label?: string;
}

export interface PaginationProps extends BaseComponentSpec {
  type: "pagination";
  totalPages: number;
  currentPage: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  onPageChange?: string; // Action ID for page change handler
  itemsPerPage?: number;
  totalItems?: number;
  showPageInfo?: boolean;
  ariaLabel?: string;
}
