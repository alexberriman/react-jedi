import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const markdownSchema = baseComponentSchema.extend({
  type: z.literal("markdown"),
  content: z.string(),
  components: z.record(z.string(), z.any()).optional(),
  remarkPlugins: z.array(z.any()).optional(),
  allowedElements: z.array(z.string()).optional(),
  disallowedElements: z.array(z.string()).optional(),
  unwrapDisallowed: z.boolean().optional(),
  skipHtml: z.boolean().optional(),
  urlTransform: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
});

export type MarkdownSchema = z.infer<typeof markdownSchema>;