import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, omit } from "../../../lib/utils";
import { getButtonAriaProps } from "../../../lib/accessibility";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  htmlType?: "button" | "submit" | "reset";
  // Accessibility props
  pressed?: boolean;
  expanded?: boolean;
  // React-specific props that should not be passed to DOM element
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
  // Additional props that could be passed but shouldn't go to DOM
  readonly conditionalProps?: Record<string, unknown>;
  readonly isPrimary?: boolean;
  readonly computedProps?: Record<string, unknown>;
  readonly when?: string | boolean;
  readonly actions?: Record<string, unknown>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    htmlType,
    pressed,
    expanded,
    disabled,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const cleanProps = omit(props as Record<string, unknown>, [
      "parentContext", 
      "spec", 
      "theme", 
      "state", 
      "conditionalProps", 
      "isPrimary", 
      "computedProps", 
      "when", 
      "actions",
      "htmlType",
      "buttonType",
      "onClickAction"
    ] as const) as Omit<typeof props, "parentContext" | "spec" | "theme" | "state" | "conditionalProps" | "isPrimary" | "computedProps" | "when" | "actions" | "htmlType" | "buttonType" | "onClickAction">;

    const ariaProps = getButtonAriaProps({
      ariaPressed: pressed,
      ariaExpanded: expanded,
      ariaLabel,
      ariaDescribedby: ariaDescribedBy,
      ariaDisabled: disabled,
    });

    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={htmlType || "button"}
        disabled={disabled}
        {...ariaProps}
        {...cleanProps}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
