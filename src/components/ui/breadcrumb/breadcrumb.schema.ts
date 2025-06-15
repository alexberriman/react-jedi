import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Schema for breadcrumb items
 */
const breadcrumbItemSchema = z.object({
  /**
   * The label text for the breadcrumb item
   */
  label: z.string().optional(),
  
  /**
   * The URL to link to (if not provided, item will be plain text)
   */
  href: z.string().optional(),
  
  /**
   * Icon to display (typically for home icon)
   */
  icon: z.any().optional(),
  
  /**
   * Whether this is the current page
   */
  isCurrentPage: z.boolean().optional(),
  
  /**
   * Whether to show ellipsis (for collapsed items)
   */
  isEllipsis: z.boolean().optional()
});

/**
 * Schema for the Breadcrumb component
 */
export const breadcrumbSchema = baseComponentSchema.extend({
  type: z.literal("Breadcrumb"),
  
  /**
   * Array of breadcrumb items
   */
  items: z.array(breadcrumbItemSchema).optional(),
  
  /**
   * Separator style between items
   */
  separator: z.enum(["chevron", "slash"]).optional().default("chevron"),
  
  /**
   * Child components (BreadcrumbList)
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for BreadcrumbList component
 */
export const breadcrumbListSchema = baseComponentSchema.extend({
  type: z.literal("BreadcrumbList"),
  
  /**
   * Child components (BreadcrumbItem components)
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for BreadcrumbItem component
 */
export const breadcrumbItemComponentSchema = baseComponentSchema.extend({
  type: z.literal("BreadcrumbItem"),
  
  /**
   * Child components (BreadcrumbLink, BreadcrumbPage, etc.)
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for BreadcrumbLink component
 */
export const breadcrumbLinkSchema = baseComponentSchema.extend({
  type: z.literal("BreadcrumbLink"),
  
  /**
   * The URL to link to
   */
  href: z.string().optional(),
  
  /**
   * Whether to render as child (forward props to child component)
   */
  asChild: z.boolean().optional(),
  
  /**
   * Link content
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for BreadcrumbPage component
 */
export const breadcrumbPageSchema = baseComponentSchema.extend({
  type: z.literal("BreadcrumbPage"),
  
  /**
   * Page content
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for BreadcrumbSeparator component
 */
export const breadcrumbSeparatorSchema = baseComponentSchema.extend({
  type: z.literal("BreadcrumbSeparator"),
  
  /**
   * Custom separator content (defaults to ChevronRight icon)
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for BreadcrumbEllipsis component
 */
export const breadcrumbEllipsisSchema = baseComponentSchema.extend({
  type: z.literal("BreadcrumbEllipsis")
});

export type BreadcrumbProps = z.infer<typeof breadcrumbSchema>;
export type BreadcrumbListProps = z.infer<typeof breadcrumbListSchema>;
export type BreadcrumbItemProps = z.infer<typeof breadcrumbItemComponentSchema>;
export type BreadcrumbLinkProps = z.infer<typeof breadcrumbLinkSchema>;
export type BreadcrumbPageProps = z.infer<typeof breadcrumbPageSchema>;
export type BreadcrumbSeparatorProps = z.infer<typeof breadcrumbSeparatorSchema>;
export type BreadcrumbEllipsisProps = z.infer<typeof breadcrumbEllipsisSchema>;