import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Main typewriter text schema
export const typewriterTextSchema = baseComponentSchema.extend({
  type: z.literal("TypewriterText"),
  variant: z.enum(["basic", "delete-retype", "rotation", "infinite", "one-time"]).optional(),
  texts: z.union([z.string(), z.array(z.string())]),
  typeSpeed: z.number().min(1).optional(),
  deleteSpeed: z.number().min(1).optional(),
  pauseDuration: z.number().min(0).optional(),
  deleteDelay: z.number().min(0).optional(),
  loop: z.boolean().optional(),
  startDelay: z.number().min(0).optional(),
  showCursor: z.boolean().optional(),
  cursorStyle: z.enum(["block", "line", "underscore", "custom"]).optional(),
  cursorChar: z.string().optional(),
  cursorBlink: z.boolean().optional(),
  cursorBlinkSpeed: z.number().min(1).optional(),
  textSize: z.enum(["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]).optional(),
  textColor: z.string().optional(),
  cursorColor: z.string().optional(),
  fontWeight: z.enum(["normal", "medium", "semibold", "bold"]).optional(),
  fontFamily: z.enum(["sans", "serif", "mono"]).optional(),
  alignment: z.enum(["left", "center", "right"]).optional(),
  animated: z.boolean().optional(),
  reduceMotion: z.boolean().optional(),
  onComplete: z.function().optional(),
  onTextChange: z.function().optional(),
});

export type TypewriterTextProps = z.infer<typeof typewriterTextSchema>;