import type { BaseComponentSpec } from "../schema/base";
import type { ComponentChildren } from "../schema/base";

export interface FAQItem {
  id: string;
  question: string;
  answer: string | ComponentChildren;
  category?: string;
  tags?: string[];
  helpfulVotes?: number;
  totalVotes?: number;
  isPopular?: boolean;
  anchorId?: string;
  relatedArticles?: Array<{
    title: string;
    href: string;
  }>;
}

export interface FAQCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  count?: number;
}

export interface FAQSearchOptions {
  enabled: boolean;
  placeholder?: string;
  searchInAnswers?: boolean;
  highlightMatches?: boolean;
}

export interface FAQVotingOptions {
  enabled: boolean;
  showVoteCount?: boolean;
  requireAuth?: boolean;
  onVote?: (itemId: string, helpful: boolean) => void;
}

export interface FAQContactSupport {
  enabled: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
  action?: string;
}

export interface FAQDef extends BaseComponentSpec {
  type: "FAQ";
  variant?: "accordion" | "grid" | "two-column" | "categorized" | "search";
  items?: FAQItem[];
  categories?: FAQCategory[];
  
  // Search configuration
  search?: FAQSearchOptions;
  
  // Voting configuration
  voting?: FAQVotingOptions;
  
  // Contact support CTA
  contactSupport?: FAQContactSupport;
  
  // Display options
  showCategories?: boolean;
  showSearch?: boolean;
  showPopularFirst?: boolean;
  allowCollapse?: boolean;
  openFirst?: boolean;
  maxItems?: number;
  
  // Animation options
  animated?: boolean;
  animationDuration?: number;
  staggerDelay?: number;
  
  // Layout options
  columns?: 1 | 2 | 3;
  spacing?: "compact" | "normal" | "relaxed";
}