import { z } from "zod";
import { baseComponentSchema } from "@/lib/schemas/base-schema";

/**
 * Schema for the AlertDialog component
 */
export const alertDialogSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialog"),
  
  /**
   * Controlled open state of the dialog
   */
  open: z.boolean().optional(),
  
  /**
   * Default open state when uncontrolled
   */
  defaultOpen: z.boolean().optional(),
  
  /**
   * Callback when open state changes
   */
  onOpenChange: z.function().optional(),
  
  /**
   * Child components (AlertDialogTrigger and AlertDialogContent)
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogTrigger component
 */
export const alertDialogTriggerSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogTrigger"),
  
  /**
   * Whether to render as child (forward props to child component)
   */
  asChild: z.boolean().optional(),
  
  /**
   * Child element or component
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogPortal component
 */
export const alertDialogPortalSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogPortal"),
  
  /**
   * Child components
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogOverlay component
 */
export const alertDialogOverlaySchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogOverlay")
});

/**
 * Schema for AlertDialogContent component
 */
export const alertDialogContentSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogContent"),
  
  /**
   * Child components (AlertDialogHeader, AlertDialogFooter, etc.)
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogHeader component
 */
export const alertDialogHeaderSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogHeader"),
  
  /**
   * Child components (AlertDialogTitle, AlertDialogDescription)
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogFooter component
 */
export const alertDialogFooterSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogFooter"),
  
  /**
   * Child components (AlertDialogAction, AlertDialogCancel)
   */
  children: z.union([
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogTitle component
 */
export const alertDialogTitleSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogTitle"),
  
  /**
   * Title content
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogDescription component
 */
export const alertDialogDescriptionSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogDescription"),
  
  /**
   * Description content
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogAction component
 */
export const alertDialogActionSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogAction"),
  
  /**
   * Button variant
   */
  variant: z.enum([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link"
  ]).optional(),
  
  /**
   * Button size
   */
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  
  /**
   * Button content
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

/**
 * Schema for AlertDialogCancel component
 */
export const alertDialogCancelSchema = baseComponentSchema.extend({
  type: z.literal("AlertDialogCancel"),
  
  /**
   * Button content
   */
  children: z.union([
    z.string(),
    z.array(z.any()),
    z.any()
  ]).optional()
});

export type AlertDialogProps = z.infer<typeof alertDialogSchema>;
export type AlertDialogTriggerProps = z.infer<typeof alertDialogTriggerSchema>;
export type AlertDialogPortalProps = z.infer<typeof alertDialogPortalSchema>;
export type AlertDialogOverlayProps = z.infer<typeof alertDialogOverlaySchema>;
export type AlertDialogContentProps = z.infer<typeof alertDialogContentSchema>;
export type AlertDialogHeaderProps = z.infer<typeof alertDialogHeaderSchema>;
export type AlertDialogFooterProps = z.infer<typeof alertDialogFooterSchema>;
export type AlertDialogTitleProps = z.infer<typeof alertDialogTitleSchema>;
export type AlertDialogDescriptionProps = z.infer<typeof alertDialogDescriptionSchema>;
export type AlertDialogActionProps = z.infer<typeof alertDialogActionSchema>;
export type AlertDialogCancelProps = z.infer<typeof alertDialogCancelSchema>;