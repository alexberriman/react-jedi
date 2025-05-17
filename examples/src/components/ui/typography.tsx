import { cn } from "../../lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  readonly as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  readonly size?: "page" | "section" | "subsection" | "card" | "small";
  readonly weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  readonly children: ReactNode;
}

export function Heading({
  as: Component = "h2",
  size = "section",
  weight = "bold",
  className,
  children,
  ...props
}: HeadingProps) {
  const sizes = {
    page: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
    section: "text-2xl sm:text-3xl md:text-4xl",
    subsection: "text-xl sm:text-2xl md:text-3xl",
    card: "text-lg sm:text-xl",
    small: "text-base sm:text-lg",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  return (
    <Component className={cn(sizes[size], weights[weight], className)} {...props}>
      {children}
    </Component>
  );
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly size?: "base" | "sm" | "lg" | "xl";
  readonly variant?: "default" | "muted" | "description";
  readonly children: ReactNode;
}

export function Text({
  size = "base",
  variant = "default",
  className,
  children,
  ...props
}: TextProps) {
  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const variants = {
    default: "text-zinc-900 dark:text-white",
    muted: "text-zinc-600 dark:text-zinc-400",
    description: "text-zinc-700 dark:text-zinc-300",
  };

  return (
    <p className={cn(sizes[size], variants[variant], className)} {...props}>
      {children}
    </p>
  );
}

// Standard spacing constants
export const spacing = {
  section: "mb-20",
  subsection: "mb-12",
  heading: "mb-8",
  paragraph: "mb-6",
  small: "mb-4",
  xs: "mb-2",
  none: "mb-0",
};

// Standard padding constants
export const padding = {
  page: "py-12",
  section: "py-8",
  container: "px-4",
  card: "p-6",
  button: "px-6 py-3",
};
