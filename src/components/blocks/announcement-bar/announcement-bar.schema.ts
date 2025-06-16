import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const announcementBarActionSchema = z.object({
  label: z.string(),
  onClick: z.function().optional(),
  href: z.string().optional(),
  variant: z.enum(["primary", "secondary", "link"]).optional(),
});

export const announcementBarSchema = baseComponentSchema
  .extend({
    type: z.literal("AnnouncementBar"),
    variant: z
      .enum(["top-banner", "floating", "slide-in", "countdown", "dismissible"])
      .optional(),
    message: z.union([z.string(), z.any()]), // string or React.ReactNode
    actions: z.array(announcementBarActionSchema).optional(),
    autoHide: z.number().optional(),
    dismissible: z.boolean().optional(),
    sticky: z.boolean().optional(),
    position: z.enum(["top", "bottom"]).optional(),
    colorScheme: z
      .enum(["default", "info", "success", "warning", "error", "custom"])
      .optional(),
    customColors: z
      .object({
        background: z.string().optional(),
        text: z.string().optional(),
        button: z.string().optional(),
      })
      .optional(),
    icon: z.any().optional(), // React.ReactNode
    countdownTo: z.date().optional(),
    countdownMessage: z.string().optional(),
    onDismiss: z.function().optional(),
    onCountdownEnd: z.function().optional(),
    animated: z.boolean().optional(),
  })
  .describe("Announcement bar for displaying important notices and alerts");

export type AnnouncementBarSchema = z.infer<typeof announcementBarSchema>;