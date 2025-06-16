import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const footerLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
  icon: z.any().optional(),
});

const footerSectionSchema = z.object({
  title: z.string(),
  links: z.array(footerLinkSchema),
});

const socialLinkSchema = z.object({
  platform: z.enum([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "youtube",
    "github",
    "tiktok",
    "pinterest",
    "discord",
    "whatsapp",
    "telegram",
    "reddit",
  ]),
  href: z.string(),
  label: z.string().optional(),
});

const contactInfoSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  hours: z.string().optional(),
  mapUrl: z.string().optional(),
});

const companyInfoSchema = z.object({
  name: z.string().optional(),
  logo: z.any().optional(),
  description: z.string().optional(),
  tagline: z.string().optional(),
  established: z.string().optional(),
  registration: z.string().optional(),
});

const newsletterConfigSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  buttonText: z.string().optional(),
  successMessage: z.string().optional(),
  termsText: z.string().optional(),
  termsLink: z.string().optional(),
  onSubmit: z.function().args(z.string()).returns(z.union([z.void(), z.promise(z.void())])).optional(),
});

export const footerSchema = baseComponentSchema.extend({
  type: z.literal("Footer"),
  companyInfo: companyInfoSchema.optional(),
  sections: z.array(footerSectionSchema).optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
  contactInfo: contactInfoSchema.optional(),
  newsletter: newsletterConfigSchema.optional(),
  copyright: z.string().optional(),
  legalLinks: z.array(footerLinkSchema).optional(),
  showDivider: z.boolean().optional(),
  layout: z.enum([
    "minimal",
    "standard",
    "expanded",
    "centered",
    "columns-2",
    "columns-3",
    "columns-4",
    "columns-5",
    "columns-6",
  ]).optional(),
  columnGap: z.enum(["tight", "normal", "wide"]).optional(),
  backgroundColor: z.string().optional(),
  backgroundImage: z.string().optional(),
  containerWidth: z.enum(["default", "wide", "full"]).optional(),
  variant: z.enum(["default", "light", "dark", "gradient", "minimal", "brand"]).optional(),
  size: z.enum(["minimal", "sm", "default", "lg", "expanded"]).optional(),
  children: z.union([z.string(), z.array(z.any()), z.any()]).optional(),
});

export type FooterProps = z.infer<typeof footerSchema>;