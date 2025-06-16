import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

const trustIndicatorSchema = z.object({
  icon: z.any().optional(),
  label: z.string(),
  value: z.string().optional(),
});

const actionSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  onClick: z.function().optional(),
  icon: z.any().optional(),
  variant: z.enum(["default", "outline", "ghost"]).optional(),
});

const gradientColorsSchema = z.object({
  from: z.string(),
  via: z.string().optional(),
  to: z.string(),
});

const shapeSchema = z.object({
  type: z.enum(["circle", "square", "triangle"]),
  color: z.string(),
  size: z.string(),
  position: z.object({
    top: z.string().optional(),
    right: z.string().optional(),
    bottom: z.string().optional(),
    left: z.string().optional(),
  }),
});

export const callToActionSchema = baseComponentSchema.extend({
  type: z.literal("CallToAction"),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  primaryAction: actionSchema.optional(),
  secondaryAction: actionSchema.optional(),
  tertiaryAction: z.object({
    label: z.string(),
    href: z.string().optional(),
    onClick: z.function().optional(),
  }).optional(),
  backgroundImage: z.string().optional(),
  backgroundVideo: z.string().optional(),
  backgroundPattern: z.enum(["dots", "grid", "lines", "circles"]).optional(),
  overlay: z.boolean().optional(),
  overlayOpacity: z.number().optional(),
  icon: z.any().optional(),
  showArrow: z.boolean().optional(),
  decorative: z.boolean().optional(),
  animated: z.boolean().optional(),
  floatingShapes: z.boolean().optional(),
  trustIndicators: z.array(trustIndicatorSchema).optional(),
  formComponent: z.any().optional(),
  buttonVariant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional(),
  buttonSize: z.enum(["default", "sm", "lg", "icon"]).optional(),
  splitImage: z.string().optional(),
  splitImagePosition: z.enum(["left", "right"]).optional(),
  gradientColors: gradientColorsSchema.optional(),
  shapes: z.array(shapeSchema).optional(),
  variant: z.enum([
    "centered",
    "splitScreen",
    "withBackgroundImage",
    "gradient",
    "minimal",
    "bold",
    "formIntegrated",
    "default",
    "primary",
    "secondary",
    "dark",
    "light",
    "glass",
  ]).optional(),
  size: z.enum(["sm", "default", "lg", "xl"]).optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  children: z.union([z.string(), z.array(z.any()), z.any()]).optional(),
});

export type CallToActionProps = z.infer<typeof callToActionSchema>;