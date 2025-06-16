import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const authorSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  author: authorSchema,
  publishDate: z.string(),
  readTime: z.number(),
  isFeatured: z.boolean().optional(),
  slug: z.string(),
});

const sortOptionSchema = z.object({
  label: z.string(),
  value: z.enum(["date-desc", "date-asc", "popularity"]),
});

export const blogPostGridSchema = baseComponentSchema
  .extend({
    type: z.literal("BlogPostGrid"),
    posts: z.array(blogPostSchema),
    variant: z.enum(["cards", "minimal", "magazine", "with-sidebar", "masonry"]).optional(),
    showFilters: z.boolean().optional(),
    showSearch: z.boolean().optional(),
    showPagination: z.boolean().optional(),
    showLoadMore: z.boolean().optional(),
    postsPerPage: z.number().optional(),
    sortOptions: z.array(sortOptionSchema).optional(),
    categories: z.array(z.string()).optional(),
    onLoadMore: z.function().optional(),
    loading: z.boolean().optional(),
    featuredPostIds: z.array(z.string()).optional(),
    sidebarContent: z.any().optional(), // React.ReactNode
  })
  .describe("Blog post grid component for displaying multiple blog posts");

export type BlogPostGridSchema = z.infer<typeof blogPostGridSchema>;