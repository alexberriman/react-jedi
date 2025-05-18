import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, omit } from "../../../lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col", {
  variants: {
    size: {
      default: "max-w-7xl",
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[90rem]",
      full: "max-w-full",
    },
    padding: {
      default: "py-8 md:py-12",
      none: "py-0",
      sm: "py-4 md:py-6",
      lg: "py-12 md:py-16",
      xl: "py-16 md:py-24",
    },
    align: {
      default: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "default",
    align: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  readonly as?: React.ElementType;

  // React-specific props that should not be passed to DOM element
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
}

function Container({
  className,
  size,
  padding,
  align,
  as: Component = "div",
  ...props
}: ContainerProps) {
  const cleanProps = omit(props, ["parentContext", "spec", "theme", "state", "maxWidth"]);
  
  return (
    <Component
      data-slot="container"
      className={cn(containerVariants({ size, padding, align, className }))}
      {...cleanProps}
    />
  );
}

export { Container, containerVariants };
