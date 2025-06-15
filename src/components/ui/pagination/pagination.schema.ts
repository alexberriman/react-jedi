import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Pagination root component
export const paginationSchema = baseComponentSchema.extend({
  type: z.literal("Pagination"),
  children: z.any(), // Required for pagination content
});

// PaginationContent component
export const paginationContentSchema = baseComponentSchema.extend({
  type: z.literal("PaginationContent"),
  children: z.any(), // Required for pagination items
});

// PaginationItem component
export const paginationItemSchema = baseComponentSchema.extend({
  type: z.literal("PaginationItem"),
  children: z.any(), // Required for item content
});

// PaginationLink component
export const paginationLinkSchema = baseComponentSchema.extend({
  type: z.literal("PaginationLink"),
  href: z.string().optional(),
  isActive: z.boolean().optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  children: z.any(), // Required for link content
});

// PaginationPrevious component
export const paginationPreviousSchema = baseComponentSchema.extend({
  type: z.literal("PaginationPrevious"),
  href: z.string().optional(),
  children: z.any().optional(), // Optional as it has default content
});

// PaginationNext component
export const paginationNextSchema = baseComponentSchema.extend({
  type: z.literal("PaginationNext"),
  href: z.string().optional(),
  children: z.any().optional(), // Optional as it has default content
});

// PaginationEllipsis component
export const paginationEllipsisSchema = baseComponentSchema.extend({
  type: z.literal("PaginationEllipsis"),
  children: z.any().optional(), // Optional as it has default content
});

// Export types
export type PaginationProps = z.infer<typeof paginationSchema>;
export type PaginationContentProps = z.infer<typeof paginationContentSchema>;
export type PaginationItemProps = z.infer<typeof paginationItemSchema>;
export type PaginationLinkProps = z.infer<typeof paginationLinkSchema>;
export type PaginationPreviousProps = z.infer<typeof paginationPreviousSchema>;
export type PaginationNextProps = z.infer<typeof paginationNextSchema>;
export type PaginationEllipsisProps = z.infer<typeof paginationEllipsisSchema>;