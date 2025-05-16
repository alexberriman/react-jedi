import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-10",
      "3xl": "gap-12",
    },
    align: {
      start: "",
      center: "",
      end: "",
      stretch: "",
      baseline: "",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      align: "start",
      className: "items-start",
    },
    {
      orientation: "horizontal",
      align: "center",
      className: "items-center",
    },
    {
      orientation: "horizontal",
      align: "end",
      className: "items-end",
    },
    {
      orientation: "horizontal",
      align: "stretch",
      className: "items-stretch",
    },
    {
      orientation: "horizontal",
      align: "baseline",
      className: "items-baseline",
    },
    {
      orientation: "vertical",
      align: "start",
      className: "items-start",
    },
    {
      orientation: "vertical",
      align: "center",
      className: "items-center",
    },
    {
      orientation: "vertical",
      align: "end",
      className: "items-end",
    },
    {
      orientation: "vertical",
      align: "stretch",
      className: "items-stretch",
    },
  ],
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
  divider?: React.ReactNode;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      orientation,
      spacing,
      align,
      justify,
      wrap,
      as: Comp = "div",
      divider,
      children,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ orientation, spacing, align, justify, wrap }), className)}
        {...props}
      >
        {divider
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && divider}
              </React.Fragment>
            ))
          : children}
      </Comp>
    );
  }
);
Stack.displayName = "Stack";

export { Stack, stackVariants };
