import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const relatedPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  image: z.string().optional(),
  url: z.string(),
  readTime: z.number().optional(),
  category: z.string().optional(),
});

const postNavigationLinkSchema = z.object({
  title: z.string(),
  url: z.string(),
});

const blogPostAuthorSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  social: z
    .object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
});

export const blogPostDetailSchema = baseComponentSchema
  .extend({
    type: z.literal("BlogPostDetail"),
    variant: z.enum(["centered", "with-sidebar", "magazine", "minimal"]).optional(),
    title: z.string(),
    content: z.string(),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
    author: blogPostAuthorSchema,
    publishDate: z.string(),
    readTime: z.number().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    relatedPosts: z.array(relatedPostSchema).optional(),
    prevPost: postNavigationLinkSchema.optional(),
    nextPost: postNavigationLinkSchema.optional(),
    showComments: z.boolean().optional(),
    showShareButtons: z.boolean().optional(),
    showToc: z.boolean().optional(),
    showProgressBar: z.boolean().optional(),
    animated: z.boolean().optional(),
  })
  .describe("Blog post detail component for displaying full article content");

export type BlogPostDetailSchema = z.infer<typeof blogPostDetailSchema>;