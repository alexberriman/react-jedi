import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const faviconSetSchema = z.object({
  default: z.string().optional(),
  apple: z.string().optional(),
  icon16: z.string().optional(),
  icon32: z.string().optional(),
  manifest: z.string().optional(),
});

const pageMetadataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterCard: z.enum(["summary", "summary_large_image", "app", "player"]).optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  favicon: z.union([z.string(), faviconSetSchema]).optional(),
});

export const headManagerSchema = baseComponentSchema.extend({
  type: z.literal("HeadManager"),
  metadata: pageMetadataSchema,
  titleSuffix: z.string().optional(),
  defaultTitle: z.string().optional(),
  children: z.any().optional(),
});

export type HeadManagerProps = z.infer<typeof headManagerSchema>;
export type PageMetadata = z.infer<typeof pageMetadataSchema>;