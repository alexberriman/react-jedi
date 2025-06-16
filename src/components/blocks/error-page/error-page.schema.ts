import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const errorPageLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  description: z.string().optional(),
  icon: z.any().optional(), // React.ReactNode
});

const errorPageSearchConfigSchema = z.object({
  enabled: z.boolean().optional(),
  placeholder: z.string().optional(),
  onSearch: z.function().optional(),
  searchAction: z.string().optional(),
});

const breadcrumbItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
});

const customActionSchema = z.object({
  label: z.string(),
  onClick: z.function().optional(),
  href: z.string().optional(),
  variant: z.enum(["default", "outline", "ghost"]).optional(),
});

export const errorPageSchema = baseComponentSchema
  .extend({
    type: z.literal("ErrorPage"),
    variant: z
      .enum([
        "friendly-404",
        "technical-error",
        "maintenance",
        "coming-soon",
        "search-suggestions",
        "blog",
        "ecommerce",
        "magazine",
        "restaurant",
        "saas",
        "portfolio",
        "corporate",
      ])
      .optional(),
    siteType: z
      .enum([
        "blog",
        "ecommerce",
        "magazine",
        "restaurant",
        "saas",
        "portfolio",
        "corporate",
      ])
      .optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    showIcon: z.boolean().optional(),
    customIcon: z.any().optional(), // React.ReactNode
    homeLink: z.string().optional(),
    homeLinkText: z.string().optional(),
    showBreadcrumb: z.boolean().optional(),
    breadcrumbItems: z.array(breadcrumbItemSchema).optional(),
    popularLinks: z.array(errorPageLinkSchema).optional(),
    contactEmail: z.string().optional(),
    contactText: z.string().optional(),
    searchConfig: errorPageSearchConfigSchema.optional(),
    countdownDate: z.date().optional(),
    countdownMessage: z.string().optional(),
    animated: z.boolean().optional(),
    animationDelay: z.number().optional(),
    customActions: z.array(customActionSchema).optional(),
  })
  .describe("Error page component with multiple variants for different error types and site types");

export type ErrorPageSchema = z.infer<typeof errorPageSchema>;