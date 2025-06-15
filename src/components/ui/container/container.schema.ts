import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const containerSchema = baseComponentSchema.extend({
  type: z.literal("Container"),
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional(),
  size: z.enum([
    "default",
    "sm",
    "md",
    "lg",
    "xl",
    "full"
  ]).optional(),
  padding: z.enum([
    "default",
    "none",
    "sm",
    "lg",
    "xl"
  ]).optional(),
  align: z.enum([
    "default",
    "center",
    "end",
    "stretch"
  ]).optional(),
  as: z.enum([
    "div",
    "section",
    "article",
    "main",
    "aside",
    "header",
    "footer",
    "nav"
  ]).optional(),
});

export type ContainerProps = z.infer<typeof containerSchema>;