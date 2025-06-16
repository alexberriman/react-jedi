import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const faqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.union([z.string(), z.any()]),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  helpfulVotes: z.number().optional(),
  totalVotes: z.number().optional(),
  isPopular: z.boolean().optional(),
  anchorId: z.string().optional(),
  relatedArticles: z.array(z.object({
    title: z.string(),
    href: z.string(),
  })).optional(),
});

const faqCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  count: z.number().optional(),
});

const faqSearchOptionsSchema = z.object({
  enabled: z.boolean(),
  placeholder: z.string().optional(),
  searchInAnswers: z.boolean().optional(),
  highlightMatches: z.boolean().optional(),
});

const faqVotingOptionsSchema = z.object({
  enabled: z.boolean(),
  showVoteCount: z.boolean().optional(),
  requireAuth: z.boolean().optional(),
  onVote: z.function().args(z.string(), z.boolean()).returns(z.void()).optional(),
});

const faqContactSupportSchema = z.object({
  enabled: z.boolean(),
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  href: z.string().optional(),
  action: z.string().optional(),
});

export const faqSchema = baseComponentSchema.extend({
  type: z.literal("FAQ"),
  variant: z.enum([
    "accordion",
    "carousel",
    "grid",
    "cards",
    "two-column",
    "categorized",
    "search",
  ]).optional(),
  items: z.array(faqItemSchema).optional(),
  categories: z.array(faqCategorySchema).optional(),
  search: faqSearchOptionsSchema.optional(),
  voting: faqVotingOptionsSchema.optional(),
  contactSupport: faqContactSupportSchema.optional(),
  showCategories: z.boolean().optional(),
  showSearch: z.boolean().optional(),
  showPopularFirst: z.boolean().optional(),
  allowCollapse: z.boolean().optional(),
  openFirst: z.boolean().optional(),
  maxItems: z.number().optional(),
  animated: z.boolean().optional(),
  animationDuration: z.number().optional(),
  staggerDelay: z.number().optional(),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  spacing: z.enum(["compact", "normal", "relaxed"]).optional(),
});

export type FAQProps = z.infer<typeof faqSchema>;