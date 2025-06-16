import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const iconSchema = baseComponentSchema.extend({
  type: z.literal("Icon"),
  icon: z.string(), // Icon name as string
  size: z.union([
    z.enum(['xs', 'sm', 'md', 'lg', 'xl']),
    z.number()
  ]).optional(),
  color: z.string().optional(),
  variant: z.enum(['default', 'filled', 'outlined', 'background']).optional(),
  background: z.string().optional(),
  animated: z.boolean().optional(),
  animationType: z.enum(['spin', 'pulse', 'bounce']).optional(),
  onClick: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  ariaLabel: z.string().optional(),
});

export type IconProps = z.infer<typeof iconSchema>;