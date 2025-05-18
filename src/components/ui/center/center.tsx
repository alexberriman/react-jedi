import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  fullHeight?: boolean;
  fullWidth?: boolean;
  centerDirection?: "horizontal" | "vertical" | "both";
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  (
    {
      className,
      as: Component = "div",
      fullHeight = false,
      fullWidth = false,
      centerDirection = "both",
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
            "items-center": centerDirection === "vertical" || centerDirection === "both",
            "justify-center": centerDirection === "horizontal" || centerDirection === "both",
            "min-h-screen": fullHeight,
            "w-full": fullWidth,
          },
          className
        )}
        {...cleanDOMProps(props)}
      >
        {children}
      </Component>
    );
  }
);

Center.displayName = "Center";

export { Center };
