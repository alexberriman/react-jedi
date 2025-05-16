import * as React from "react";
import { cn } from "../../../lib/utils";

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  fullHeight?: boolean;
  fullWidth?: boolean;
  direction?: "horizontal" | "vertical" | "both";
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  (
    {
      className,
      as: Component = "div",
      fullHeight = false,
      fullWidth = false,
      direction = "both",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "flex",
          {
            "items-center": direction === "vertical" || direction === "both",
            "justify-center": direction === "horizontal" || direction === "both",
            "min-h-screen": fullHeight,
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Center.displayName = "Center";

export { Center };
