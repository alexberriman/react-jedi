import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  date: z.string(),
  author: z.object({
    name: z.string(),
    avatar: z.string().optional(),
  }).optional(),
  thumbnail: z.string().optional(),
  url: z.string(),
  readTime: z.string().optional(),
  featured: z.boolean().optional(),
});

export const latestNewsSchema = baseComponentSchema.extend({
  type: z.literal("LatestNews"),
  articles: z.array(articleSchema),
  variant: z.enum(['featured-list', 'cards-row', 'minimal-links', 'with-images', 'magazine']).optional(),
  count: z.number().min(3).max(6).optional(),
  showCategoryTabs: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  showNewsletter: z.boolean().optional(),
  newsletterHeading: z.string().optional(),
  newsletterDescription: z.string().optional(),
  viewAllUrl: z.string().optional(),
  viewAllText: z.string().optional(),
  loading: z.boolean().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  animated: z.boolean().optional(),
  onNewsletterSubmit: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  selectedCategory: z.string().optional(),
  onCategoryChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  onCategoryChangeAction: z.string().optional(),
});

export type LatestNewsProps = z.infer<typeof latestNewsSchema>;