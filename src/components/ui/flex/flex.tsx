import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, cleanDOMProps } from "../../../lib/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      rowReverse: "flex-row-reverse",
      columnReverse: "flex-col-reverse",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      wrapReverse: "flex-wrap-reverse",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    direction: "row",
    wrap: "nowrap",
    justify: "start",
    align: "start",
    gap: "none",
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, wrap, justify, align, gap, ...props }, ref) => {
    const cleanProps = cleanDOMProps(props);

    return (
      <div
        ref={ref}
        data-testid="flex-container"
        className={cn(
          flexVariants({
            direction,
            wrap,
            justify,
            align,
            gap,
            className,
          })
        )}
        {...cleanProps}
      />
    );
  }
);

Flex.displayName = "Flex";

export { Flex, flexVariants };
