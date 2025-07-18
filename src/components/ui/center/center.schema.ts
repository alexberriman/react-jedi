import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const centerSchema = baseComponentSchema.extend({
  type: z.literal("Center"),
  
  as: z.string().optional(),
  
  // Children content
  children: z.any(),
  
  // Centering options
  fullHeight: z.boolean().optional(),
  fullWidth: z.boolean().optional(),
  centerDirection: z.enum(["horizontal", "vertical", "both"]).optional(),
});

export type CenterSchema = z.infer<typeof centerSchema>;