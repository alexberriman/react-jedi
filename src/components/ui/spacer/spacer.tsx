import * as React from "react";
import { cn } from "../../../lib/utils";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The amount of space to add
   */
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  /**
   * The direction of the spacer
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Whether to show a guide line in development (for debugging)
   * @default false
   */
  showGuide?: boolean;
}

const sizeMap = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
  "5xl": "8rem", // 128px
  "6xl": "10rem", // 160px
  "7xl": "12rem", // 192px
  "8xl": "14rem", // 224px
  "9xl": "16rem", // 256px
} as const;

const SpacerComponent = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", direction = "vertical", showGuide = false, style, ...props }, ref) => {
    const spacerSize = sizeMap[size];
    const isVertical = direction === "vertical";

    const spacerStyles: React.CSSProperties = {
      [isVertical ? "height" : "width"]: spacerSize,
      [isVertical ? "width" : "height"]: isVertical ? "100%" : spacerSize,
      flexShrink: 0,
      ...style,
    };

    if (showGuide && process.env.NODE_ENV === "development") {
      spacerStyles.backgroundColor = "rgba(251, 113, 133, 0.2)"; // rose-400/20
      spacerStyles.border = "1px dashed rgba(251, 113, 133, 0.5)"; // rose-400/50
    }

    return (
      <div
        ref={ref}
        className={cn(
          "block",
          isVertical && "min-h-0",
          !isVertical && "min-w-0 inline-block",
          className
        )}
        style={spacerStyles}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

SpacerComponent.displayName = "Spacer";

export { SpacerComponent as Spacer };
