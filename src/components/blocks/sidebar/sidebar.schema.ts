import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

// Sub-item schema for nested menu items
const sidebarSubItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  onClick: z.string().optional(),
});

// Action schema for menu items
const sidebarActionSchema = z.object({
  icon: z.string(),
  onClick: z.string(),
  showOnHover: z.boolean().optional(),
});

// Menu item schema
const sidebarMenuItemSchema = z.object({
  label: z.string(),
  icon: z.string().optional(),
  href: z.string().optional(),
  onClick: z.string().optional(),
  badge: z.string().optional(),
  tooltip: z.string().optional(),
  isActive: z.boolean().optional(),
  action: sidebarActionSchema.optional(),
  subItems: z.array(sidebarSubItemSchema).optional(),
});

// Menu schema
const sidebarMenuSchema = z.object({
  items: z.array(sidebarMenuItemSchema),
});

// Group action schema
const sidebarGroupActionSchema = z.object({
  icon: z.string(),
  onClick: z.string(),
});

// Group schema
const sidebarGroupSchema = z.object({
  label: z.string().optional(),
  action: sidebarGroupActionSchema.optional(),
  items: z.array(sidebarMenuItemSchema),
});

// Header content schema
const sidebarHeaderContentSchema = z.union([
  sidebarMenuSchema,
  z.object({
    type: z.literal("search"),
    placeholder: z.string().optional(),
    onChange: z.string().optional(),
  }),
]);

// Header schema
const sidebarHeaderSchema = z.object({
  children: z.array(sidebarHeaderContentSchema),
});

// Content schema
const sidebarContentSchema = z.object({
  groups: z.array(sidebarGroupSchema),
});

// Footer schema
const sidebarFooterSchema = z.object({
  children: z.array(sidebarMenuSchema),
});

// Main sidebar schema
export const sidebarSchema = baseComponentSchema.extend({
  type: z.literal("Sidebar"),
  side: z.enum(["left", "right"]).optional(),
  variant: z.enum(["sidebar", "floating", "inset"]).optional(),
  collapsible: z.enum(["offcanvas", "icon", "none"]).optional(),
  header: sidebarHeaderSchema.optional(),
  content: sidebarContentSchema.optional(),
  footer: sidebarFooterSchema.optional(),
});

// SidebarProvider schema
export const sidebarProviderSchema = baseComponentSchema.extend({
  type: z.literal("SidebarProvider"),
  defaultOpen: z.boolean().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.string().optional(),
  children: z.array(z.any()),
});

// SidebarInset schema
export const sidebarInsetSchema = baseComponentSchema.extend({
  type: z.literal("SidebarInset"),
  children: z.array(z.any()),
});

// SidebarTrigger schema
export const sidebarTriggerSchema = baseComponentSchema.extend({
  type: z.literal("SidebarTrigger"),
  onClick: z.string().optional(),
});

export type SidebarProps = z.infer<typeof sidebarSchema>;
export type SidebarProviderProps = z.infer<typeof sidebarProviderSchema>;
export type SidebarInsetProps = z.infer<typeof sidebarInsetSchema>;
export type SidebarTriggerProps = z.infer<typeof sidebarTriggerSchema>;