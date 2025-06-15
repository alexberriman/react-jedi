import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// NavigationMenu root component
export const navigationMenuSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenu"),
  viewport: z.boolean().optional(),
  children: z.any(), // Required for menu content
});

// NavigationMenuList component
export const navigationMenuListSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuList"),
  children: z.any(), // Required for list items
});

// NavigationMenuItem component
export const navigationMenuItemSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuItem"),
  children: z.any(), // Required for item content
});

// NavigationMenuTrigger component
export const navigationMenuTriggerSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuTrigger"),
  children: z.any(), // Required for trigger content
});

// NavigationMenuContent component
export const navigationMenuContentSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuContent"),
  children: z.any(), // Required for content
});

// NavigationMenuLink component
export const navigationMenuLinkSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuLink"),
  href: z.string().optional(),
  active: z.boolean().optional(),
  children: z.any(), // Required for link content
});

// NavigationMenuIndicator component
export const navigationMenuIndicatorSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuIndicator"),
  children: z.any().optional(),
});

// NavigationMenuViewport component
export const navigationMenuViewportSchema = baseComponentSchema.extend({
  type: z.literal("NavigationMenuViewport"),
  children: z.any().optional(),
});

// Export types
export type NavigationMenuProps = z.infer<typeof navigationMenuSchema>;
export type NavigationMenuListProps = z.infer<typeof navigationMenuListSchema>;
export type NavigationMenuItemProps = z.infer<typeof navigationMenuItemSchema>;
export type NavigationMenuTriggerProps = z.infer<typeof navigationMenuTriggerSchema>;
export type NavigationMenuContentProps = z.infer<typeof navigationMenuContentSchema>;
export type NavigationMenuLinkProps = z.infer<typeof navigationMenuLinkSchema>;
export type NavigationMenuIndicatorProps = z.infer<typeof navigationMenuIndicatorSchema>;
export type NavigationMenuViewportProps = z.infer<typeof navigationMenuViewportSchema>;