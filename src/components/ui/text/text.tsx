import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-base max-w-prose", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    size: {
      xs: "text-xs leading-relaxed",
      sm: "text-sm leading-relaxed",
      base: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
      xl: "text-xl leading-relaxed",
      "2xl": "text-2xl leading-relaxed",
      "3xl": "text-3xl leading-relaxed",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normal: "normal-case",
    },
    decoration: {
      none: "no-underline",
      underline: "underline",
      "line-through": "line-through",
    },
    italic: {
      true: "italic",
    },
    gradient: {
      none: "",
      primary: "bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text",
      rainbow:
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text",
      sunset:
        "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text",
      ocean:
        "bg-gradient-to-r from-blue-400 via-teal-500 to-emerald-500 text-transparent bg-clip-text",
      neon: "bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-transparent bg-clip-text",
      golden:
        "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-transparent bg-clip-text",
    },
    shadow: {
      none: "",
      sm: "drop-shadow-sm",
      md: "drop-shadow",
      lg: "drop-shadow-lg",
      xl: "drop-shadow-xl",
      "2xl": "drop-shadow-2xl",
    },
    animation: {
      none: "",
      glow: "animate-glow",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      shimmer: "animate-shimmer",
    },
    truncate: {
      true: "truncate",
      ellipsis: "overflow-hidden text-ellipsis whitespace-nowrap",
      multiline: "line-clamp-2",
      "multiline-3": "line-clamp-3",
      "multiline-4": "line-clamp-4",
    },
    wrap: {
      normal: "whitespace-normal",
      nowrap: "whitespace-nowrap",
      pre: "whitespace-pre",
      "pre-line": "whitespace-pre-line",
      "pre-wrap": "whitespace-pre-wrap",
    },
    lineHeight: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    },
    element: {
      p: "",
      span: "",
      div: "",
      blockquote: "border-l-4 border-muted pl-4 italic",
      code: "font-mono bg-muted p-1 rounded text-sm",
      strong: "font-bold",
      em: "italic",
      small: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
    align: "left",
    decoration: "none",
    transform: "normal",
    gradient: "none",
    shadow: "none",
    animation: "none",
    wrap: "normal",
    lineHeight: "relaxed",
    tracking: "normal",
    element: "p",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement>,
    VariantProps<typeof textVariants> {
  /**
   * HTML element to render as
   */
  readonly element?: "p" | "span" | "div" | "blockquote" | "code" | "strong" | "em" | "small";
  /**
   * Text color variant
   */
  readonly variant?: "default" | "primary" | "secondary" | "accent" | "muted" | "destructive";
  /**
   * Text size
   */
  readonly size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * Font weight
   */
  readonly weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  /**
   * Text alignment
   */
  readonly align?: "left" | "center" | "right" | "justify";
  /**
   * Text transformation
   */
  readonly transform?: "uppercase" | "lowercase" | "capitalize" | "normal";
  /**
   * Text decoration
   */
  readonly decoration?: "none" | "underline" | "line-through";
  /**
   * Italic text
   */
  readonly italic?: boolean;
  /**
   * Apply text gradient
   */
  readonly gradient?: "none" | "primary" | "rainbow" | "sunset" | "ocean" | "neon" | "golden";
  /**
   * Apply drop shadow
   */
  readonly shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Apply animation
   */
  readonly animation?: "none" | "glow" | "pulse" | "bounce" | "shimmer";
  /**
   * Truncate text
   */
  readonly truncate?: boolean | "ellipsis" | "multiline" | "multiline-3" | "multiline-4";
  /**
   * Text wrapping
   */
  readonly wrap?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
  /**
   * Line height
   */
  readonly lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
  /**
   * Letter spacing
   */
  readonly tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";

  // React-specific props that should not be passed to DOM element
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
}

/**
 * Text component for displaying paragraphs, spans, and other text elements with various styling options
 */
function Text({
  className,
  children,
  element = "p",
  variant,
  size,
  weight,
  align,
  transform,
  decoration,
  italic,
  gradient,
  shadow,
  animation,
  truncate,
  wrap,
  lineHeight,
  tracking,
  // Extract React-specific props that shouldn't be passed to DOM
  parentContext,
  spec,
  theme,
  state,
  ...props
}: TextProps) {
  const Component = element;

  return (
    <Component
      data-slot="text"
      className={cn(
        textVariants({
          element,
          variant,
          size,
          weight,
          align,
          transform,
          decoration,
          italic,
          gradient,
          shadow,
          animation,
          truncate,
          wrap,
          lineHeight,
          tracking,
          className,
        })
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Text, textVariants };
