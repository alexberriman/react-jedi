import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, cleanDOMProps } from "../../../lib/utils";

const groupVariants = cva("inline-flex flex-wrap", {
  variants: {
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-6",
      "2xl": "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
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
    grow: {
      true: "[&>*]:flex-grow",
      false: "",
    },
    preventGrow: {
      true: "[&>*]:flex-grow-0",
      false: "",
    },
  },
  defaultVariants: {
    spacing: "md",
    align: "center",
    justify: "start",
    wrap: "wrap",
    grow: false,
    preventGrow: false,
  },
});

export interface GroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupVariants> {
  /**
   * The element type to render
   */
  as?: React.ElementType;
  /**
   * Whether to display as a full-width block element
   */
  fullWidth?: boolean;
}

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      spacing,
      align,
      justify,
      wrap,
      grow,
      preventGrow,
      as: Comp = "div",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          groupVariants({ spacing, align, justify, wrap, grow, preventGrow }),
          fullWidth && "w-full",
          className
        )}
        {...cleanDOMProps(props)}
      >
        {children}
      </Comp>
    );
  }
);
Group.displayName = "Group";

export { Group, groupVariants };
