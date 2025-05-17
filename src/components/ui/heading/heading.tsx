import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { getHeadingAriaProps } from "../../../lib/accessibility";

const headingVariants = cva("font-heading tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl font-bold lg:text-4xl",
      h3: "text-2xl font-bold lg:text-3xl",
      h4: "text-xl font-semibold lg:text-2xl",
      h5: "text-lg font-semibold lg:text-xl",
      h6: "text-base font-semibold lg:text-lg",
    },
    size: {
      xs: "text-sm lg:text-base",
      sm: "text-base lg:text-lg",
      md: "text-lg lg:text-xl",
      lg: "text-xl lg:text-2xl",
      xl: "text-2xl lg:text-3xl",
      "2xl": "text-3xl lg:text-4xl",
      "3xl": "text-4xl lg:text-5xl",
      "4xl": "text-5xl lg:text-6xl",
      "5xl": "text-6xl lg:text-7xl",
      "6xl": "text-7xl lg:text-8xl",
    },
    spacing: {
      none: "",
      xs: "mb-1",
      sm: "mb-2",
      md: "mb-3",
      lg: "mb-4",
      xl: "mb-6",
      "2xl": "mb-8",
      "3xl": "mb-10",
      "4xl": "mb-12",
      section: "mb-16",
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
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normal: "normal-case",
    },
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    decoration: {
      none: "no-underline",
      underline: "underline",
      "line-through": "line-through",
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
  },
  defaultVariants: {
    level: "h2",
    variant: "default",
    align: "left",
    transform: "normal",
    decoration: "none",
    gradient: "none",
    shadow: "none",
    animation: "none",
    spacing: "lg",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * Heading level (h1-h6)
   */
  readonly level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * Apply responsive size instead of level-based sizing
   */
  readonly size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
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
  readonly align?: "left" | "center" | "right";
  /**
   * Text transformation
   */
  readonly transform?: "uppercase" | "lowercase" | "capitalize" | "normal";
  /**
   * Text color variant
   */
  readonly variant?: "default" | "primary" | "secondary" | "accent" | "muted" | "destructive";
  /**
   * Text decoration
   */
  readonly decoration?: "none" | "underline" | "line-through";
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
   * Bottom spacing/margin - matches common patterns from examples (e.g., mb-4, mb-6, mb-8)
   */
  readonly spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "section";

  // React-specific props that should not be passed to DOM element
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
}

/**
 * Heading component for displaying h1-h6 elements with various styling options
 */
function Heading({
  className,
  children,
  level = "h2",
  size,
  weight,
  align,
  transform,
  variant,
  decoration,
  gradient,
  shadow,
  animation,
  spacing,
  "aria-label": ariaLabel,
  // Extract React-specific props that shouldn't be passed to DOM
  parentContext,
  spec,
  theme,
  state,
  ...props
}: HeadingProps) {
  const Component = level;
  const headingLevel = Number.parseInt(level[1]);

  const ariaProps = getHeadingAriaProps({
    level: headingLevel as 1 | 2 | 3 | 4 | 5 | 6,
    ariaLabel,
  });

  return (
    <Component
      data-slot="heading"
      className={cn(
        headingVariants({
          level: size ? undefined : level,
          size,
          weight,
          align,
          transform,
          variant,
          decoration,
          gradient,
          shadow,
          animation,
          spacing,
          className,
        })
      )}
      {...ariaProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Heading, headingVariants };
