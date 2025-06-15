import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Helper schema for responsive values
const responsiveNumberSchema = z.union([
  z.number(),
  z.object({
    base: z.number().optional(),
    sm: z.number().optional(),
    md: z.number().optional(),
    lg: z.number().optional(),
    xl: z.number().optional(),
  })
]);

const responsiveStringSchema = z.union([
  z.string(),
  z.object({
    base: z.string().optional(),
    sm: z.string().optional(),
    md: z.string().optional(),
    lg: z.string().optional(),
    xl: z.string().optional(),
  })
]);

export const simpleGridSchema = baseComponentSchema.extend({
  type: z.literal("SimpleGrid"),
  columns: responsiveNumberSchema.optional(),
  spacing: responsiveStringSchema.optional(),
  minChildWidth: z.string().optional(),
  children: z.any().optional(),
});

export type SimpleGridProps = z.infer<typeof simpleGridSchema>;