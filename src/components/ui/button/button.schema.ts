import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const buttonSchema = baseComponentSchema.extend({
  type: z.literal("Button"),
  children: z.string(),
  variant: z.enum([
    "default",
    "primary",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link"
  ]).optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  asChild: z.boolean().optional(),
  disabled: z.boolean().optional(),
  htmlType: z.enum(["button", "submit", "reset"]).optional(),
  pressed: z.boolean().optional(),
  expanded: z.boolean().optional(),
  onClick: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type ButtonProps = z.infer<typeof buttonSchema>;