import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const cookieCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  required: z.boolean().optional(),
});

export const cookieConsentBannerSchema = baseComponentSchema
  .extend({
    type: z.literal("CookieConsentBanner"),
    variant: z
      .enum(["bottom-banner", "top-bar", "modal", "corner-popup", "minimal"])
      .optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(cookieCategorySchema).optional(),
    onAcceptAll: z.function().optional(),
    onRejectAll: z.function().optional(),
    onSavePreferences: z.function().optional(),
    onSettingsOpen: z.function().optional(),
    animated: z.boolean().optional(),
    cookiePolicyUrl: z.string().optional(),
    privacyPolicyUrl: z.string().optional(),
    storageKey: z.string().optional(),
  })
  .describe("Cookie consent banner for GDPR compliance with customizable categories and layouts");

export type CookieConsentBannerSchema = z.infer<typeof cookieConsentBannerSchema>;