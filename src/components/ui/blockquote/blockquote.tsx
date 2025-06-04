import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, cleanDOMProps } from "../../../lib/utils";

const blockquoteVariants = cva(
  "relative my-6 max-w-prose border-l-4 pl-4 py-2 text-lg italic font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        primary: "border-primary/80 bg-primary/5 text-primary-foreground",
        secondary: "border-secondary/80 bg-secondary/10 text-secondary-foreground",
        accent: "border-accent/80 bg-accent/10 text-accent-foreground",
        muted: "border-muted bg-muted/20 text-muted-foreground",
        destructive: "border-destructive/80 bg-destructive/5 text-destructive",
      },
      size: {
        sm: "text-sm pl-3 py-1.5",
        base: "text-base pl-4 py-2",
        lg: "text-lg pl-5 py-3",
        xl: "text-xl pl-6 py-4",
      },
      styleVariant: {
        classic: "border-l-4 pl-4 italic",
        modern: "border-l-0 border-t-0 border-r-0 border-b-2 pl-0 pb-2 italic",
        elegant:
          "border-l-0 border-0 pl-8 pr-8 relative italic after:absolute after:content-['\"'] after:left-0 after:top-0 after:text-4xl after:opacity-20 before:absolute before:content-['\"'] before:right-0 before:bottom-0 before:text-4xl before:opacity-20",
        minimal: "border-l-2 pl-4",
        decorative: "border-l-2 border-dashed pl-6 py-3",
        glossy: "border-l-4 pl-4 backdrop-blur-sm bg-white/5 shadow-sm",
      },
      hasCite: {
        true: "",
      },
      animation: {
        none: "",
        fadeIn: "animate-fade-in",
        slideIn: "animate-slide-in-left",
        pulse: "animate-pulse",
        shimmer: "animate-shimmer",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-lg",
      },
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded",
        lg: "rounded-lg",
        full: "rounded-xl",
      },
    },
    compoundVariants: [
      {
        hasCite: true,
        class: "pb-8", // Add padding at bottom for citation
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "base",
      styleVariant: "classic",
      animation: "none",
      shadow: "none",
      rounded: "none",
    },
  }
);

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {
  /**
   * Citation source for the quote
   */
  readonly cite?: string;
  /**
   * Author of the quote
   */
  readonly author?: string;
  /**
   * Color variant
   */
  readonly variant?: "default" | "primary" | "secondary" | "accent" | "muted" | "destructive";
  /**
   * Size variant
   */
  readonly size?: "sm" | "base" | "lg" | "xl";
  /**
   * Visual style variant
   */
  readonly styleVariant?: "classic" | "modern" | "elegant" | "minimal" | "decorative" | "glossy";
  /**
   * Animation effect
   */
  readonly animation?: "none" | "fadeIn" | "slideIn" | "pulse" | "shimmer";
  /**
   * Shadow effect
   */
  readonly shadow?: "none" | "sm" | "md" | "lg";
  /**
   * Border radius
   */
  readonly rounded?: "none" | "sm" | "md" | "lg" | "full";
}

/**
 * BlockQuote component for displaying quotations with various styling options
 */
function BlockQuote({
  className,
  children,
  cite,
  author,
  variant,
  size,
  styleVariant,
  animation,
  shadow,
  rounded,
  ...props
}: BlockquoteProps) {
  const hasCite = Boolean(cite || author);

  const cleanProps = cleanDOMProps(props);
  
  return (
    <blockquote
      data-slot="blockquote"
      className={cn(
        blockquoteVariants({
          variant,
          size,
          styleVariant,
          hasCite,
          animation,
          shadow,
          rounded,
          className,
        })
      )}
      {...cleanProps}
    >
      <div className="relative z-10">{children}</div>

      {hasCite && (
        <footer className="mt-2 text-sm opacity-75">
          {author && <span className="font-semibold">{author}</span>}
          {author && cite && <span>, </span>}
          {cite && <cite>{cite}</cite>}
        </footer>
      )}
    </blockquote>
  );
}

export { BlockQuote, blockquoteVariants };
