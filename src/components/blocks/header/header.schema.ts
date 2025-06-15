import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Logo schema
const headerLogoSchema = z.object({
  type: z.enum(["image", "text"]).optional().default("text"),
  src: z.string().optional(),
  alt: z.string().optional(),
  text: z.string().optional(),
  href: z.string().optional(),
  height: z.union([z.number(), z.string()]).optional(),
  width: z.union([z.number(), z.string()]).optional(),
}).refine(
  (data) => {
    if (data.type === "image") {
      return !!data.src;
    }
    if (data.type === "text") {
      return !!data.text;
    }
    return true;
  },
  {
    message: "Image logo requires 'src' and text logo requires 'text'",
  }
);

// Navigation item schema
const navigationItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  items: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
    })
  ).optional(),
});

// Action schema
const headerActionSchema = z.object({
  label: z.string().optional(),
  text: z.string().optional(), // Support both label and text
  href: z.string().optional(),
  variant: z.enum(["default", "outline", "ghost", "destructive", "secondary", "link"]).optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  onClick: z.any().optional(), // Functions can't be validated
}).transform(data => ({
  ...data,
  label: data.label || data.text || "", // Use label or text, with fallback
}));

// Main header schema
export const headerSchema = baseComponentSchema.extend({
  type: z.literal("header"),
  logo: headerLogoSchema.optional(),
  navigation: z.array(navigationItemSchema).optional(),
  actions: z.array(headerActionSchema).optional(),
  showDarkModeToggle: z.boolean().optional(),
  sticky: z.boolean().optional(),
  variant: z.enum(["default", "minimal", "centered", "split"]).optional(),
  animated: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  blur: z.boolean().optional(),
  shadow: z.boolean().optional(),
  maxWidth: z.enum(["sm", "md", "lg", "xl", "2xl", "full"]).optional(),
  height: z.enum(["sm", "md", "lg"]).optional(),
  mobileTriggerIcon: z.enum(["menu", "dots"]).optional(),
});

export type HeaderProps = z.infer<typeof headerSchema>;