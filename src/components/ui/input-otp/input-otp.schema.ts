import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const inputOTPSchema = baseComponentSchema.extend({
  type: z.literal("input-otp"),
  maxLength: z.number().min(1),
  value: z.string().optional(),
  onChange: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
  textAlign: z.enum(["left", "center", "right"]).optional(),
  onComplete: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
  pushPasswordManagerStrategy: z.enum(["increase-width", "none"]).optional(),
  pasteTransformer: z
    .object({
      action: z.string(),
      payload: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
  containerClassName: z.string().optional(),
  noScriptCSSFallback: z.string().nullable().optional(),
  pattern: z.string().optional(),
  disabled: z.boolean().optional(),
  render: z
    .union([
      z.object({
        type: z.literal("grouped"),
      }),
      z.object({
        type: z.literal("segmented"),
      }),
      z.object({
        type: z.literal("custom"),
        pattern: z.string(),
      }),
    ])
    .optional(),
  children: z
    .array(
      z.union([
        z.object({
          type: z.literal("input-otp-group"),
          className: z.string().optional(),
          children: z
            .array(
              z.object({
                type: z.literal("input-otp-slot"),
                index: z.number(),
                className: z.string().optional(),
              })
            )
            .optional(),
        }),
        z.object({
          type: z.literal("input-otp-separator"),
          className: z.string().optional(),
          children: z.any().optional(),
        }),
      ])
    )
    .optional(),
});

export const inputOTPGroupSchema = baseComponentSchema.extend({
  type: z.literal("input-otp-group"),
  children: z
    .array(
      z.object({
        type: z.literal("input-otp-slot"),
        index: z.number(),
        className: z.string().optional(),
      })
    )
    .optional(),
});

export const inputOTPSlotSchema = baseComponentSchema.extend({
  type: z.literal("input-otp-slot"),
  index: z.number(),
});

export const inputOTPSeparatorSchema = baseComponentSchema.extend({
  type: z.literal("input-otp-separator"),
  children: z.any().optional(),
});

export type InputOTPSchema = z.infer<typeof inputOTPSchema>;
export type InputOTPGroupSchema = z.infer<typeof inputOTPGroupSchema>;
export type InputOTPSlotSchema = z.infer<typeof inputOTPSlotSchema>;
export type InputOTPSeparatorSchema = z.infer<typeof inputOTPSeparatorSchema>;