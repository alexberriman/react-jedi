import { z } from "zod";
import { baseComponentSchema } from "../../../lib/schemas/base-schema";

export const boxSchema = baseComponentSchema.extend({
  type: z.literal("Box"),
  as: z.enum(["div", "section", "article", "header", "footer", "main", "aside", "nav"]).optional(),
  display: z.enum([
    "flex",
    "block",
    "inline",
    "inline-block",
    "grid",
    "inline-flex",
    "inline-grid",
    "none"
  ]).optional(),
  position: z.enum(["static", "relative", "absolute", "fixed", "sticky"]).optional(),
  padding: z.enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"]).optional(),
  margin: z.enum(["none", "xs", "sm", "md", "lg", "xl", "2xl", "auto"]).optional(),
  rounded: z.enum(["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]).optional(),
  shadow: z.enum(["none", "sm", "md", "lg", "xl", "2xl", "inner"]).optional(),
  width: z.enum([
    "auto",
    "full",
    "screen",
    "fit",
    "min",
    "max",
    "half",
    "third",
    "two-thirds",
    "quarter",
    "three-quarters"
  ]).optional(),
  height: z.enum([
    "auto",
    "full",
    "screen",
    "fit",
    "min",
    "max",
    "half",
    "third",
    "two-thirds",
    "quarter",
    "three-quarters"
  ]).optional(),
  borderWidth: z.enum(["none", "thin", "thick", "thicker", "thickest"]).optional(),
  backgroundColor: z.enum([
    "transparent",
    "primary",
    "secondary",
    "accent",
    "muted",
    "card",
    "background",
    "foreground",
    "destructive",
    "popover"
  ]).optional(),
  textColor: z.enum([
    "primary",
    "secondary",
    "accent",
    "muted",
    "card",
    "background",
    "foreground",
    "destructive",
    "popover"
  ]).optional(),
  borderColor: z.enum([
    "default",
    "primary",
    "secondary",
    "accent",
    "muted",
    "card",
    "background",
    "foreground",
    "destructive",
    "popover"
  ]).optional(),
  flexDirection: z.enum(["row", "row-reverse", "col", "col-reverse"]).optional(),
  justifyContent: z.enum(["start", "end", "center", "between", "around", "evenly"]).optional(),
  alignItems: z.enum(["start", "end", "center", "baseline", "stretch"]).optional(),
  gap: z.enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"]).optional(),
  overflow: z.enum([
    "auto",
    "hidden",
    "visible",
    "scroll",
    "x-auto",
    "y-auto",
    "x-hidden",
    "y-hidden",
    "x-scroll",
    "y-scroll"
  ]).optional(),
  zIndex: z.enum(["auto", "0", "10", "20", "30", "40", "50"]).optional(),
  transition: z.enum(["none", "default", "fast", "slow"]).optional(),
  scale: z.enum(["none", "sm", "md", "lg", "xl"]).optional(),
  blur: z.enum(["none", "sm", "md", "lg", "xl", "2xl", "3xl"]).optional(),
  backdropBlur: z.enum(["none", "sm", "md", "lg", "xl", "2xl", "3xl"]).optional(),
  glassmorphism: z.enum([
    "none",
    "light",
    "medium",
    "strong",
    "dark",
    "dark-medium",
    "dark-strong"
  ]).optional(),
  neumorphism: z.enum([
    "none",
    "light",
    "medium",
    "strong",
    "dark",
    "dark-medium",
    "dark-strong"
  ]).optional(),
});

export type BoxProps = z.infer<typeof boxSchema>;