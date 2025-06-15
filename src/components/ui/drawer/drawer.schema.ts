import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const drawerSchema = baseComponentSchema.extend({
  type: z.literal("Drawer"),
  open: z.boolean().optional(),
  defaultOpen: z.boolean().optional(),
  onOpenChange: z.object({
    action: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  }).optional(),
  modal: z.boolean().optional(),
  shouldScaleBackground: z.boolean().optional(),
  snapPoints: z.array(z.union([z.string(), z.number()])).optional(),
  fadeFromIndex: z.number().optional(),
  activeSnapPoint: z.union([z.number(), z.string(), z.null()]).optional(),
  closeThreshold: z.number().optional(),
  dismissible: z.boolean().optional(),
  drawerDirection: z.enum(["bottom", "top", "left", "right"]).optional(),
  children: z.array(z.any()).optional(),
});

export const drawerTriggerSchema = baseComponentSchema.extend({
  type: z.literal("DrawerTrigger"),
  asChild: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerPortalSchema = baseComponentSchema.extend({
  type: z.literal("DrawerPortal"),
  children: z.array(z.any()).optional(),
});

export const drawerCloseSchema = baseComponentSchema.extend({
  type: z.literal("DrawerClose"),
  asChild: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerOverlaySchema = baseComponentSchema.extend({
  type: z.literal("DrawerOverlay"),
});

export const drawerContentSchema = baseComponentSchema.extend({
  type: z.literal("DrawerContent"),
  children: z.array(z.any()).optional(),
});

export const drawerHeaderSchema = baseComponentSchema.extend({
  type: z.literal("DrawerHeader"),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerFooterSchema = baseComponentSchema.extend({
  type: z.literal("DrawerFooter"),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerTitleSchema = baseComponentSchema.extend({
  type: z.literal("DrawerTitle"),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("DrawerDescription"),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerSectionSchema = baseComponentSchema.extend({
  type: z.literal("DrawerSection"),
  sticky: z.boolean().optional(),
  children: z.union([
    z.string(),
    z.any(),
    z.array(z.any())
  ]).optional(),
});

export const drawerHandleSchema = baseComponentSchema.extend({
  type: z.literal("DrawerHandle"),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
});

export type DrawerProps = z.infer<typeof drawerSchema>;
export type DrawerTriggerProps = z.infer<typeof drawerTriggerSchema>;
export type DrawerPortalProps = z.infer<typeof drawerPortalSchema>;
export type DrawerCloseProps = z.infer<typeof drawerCloseSchema>;
export type DrawerOverlayProps = z.infer<typeof drawerOverlaySchema>;
export type DrawerContentProps = z.infer<typeof drawerContentSchema>;
export type DrawerHeaderProps = z.infer<typeof drawerHeaderSchema>;
export type DrawerFooterProps = z.infer<typeof drawerFooterSchema>;
export type DrawerTitleProps = z.infer<typeof drawerTitleSchema>;
export type DrawerDescriptionProps = z.infer<typeof drawerDescriptionSchema>;
export type DrawerSectionProps = z.infer<typeof drawerSectionSchema>;
export type DrawerHandleProps = z.infer<typeof drawerHandleSchema>;