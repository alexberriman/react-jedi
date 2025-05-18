import * as React from "react";
import { cn, cleanDOMProps } from "../../../lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  width?: string;
  height?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  animation?: "pulse" | "wave" | "none";
}

const SkeletonLoader = React.forwardRef<HTMLDivElement, SkeletonLoaderProps>(
  (
    {
      className,
      count = 1,
      width = "100%",
      height = "20px",
      variant = "text",
      animation = "pulse",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
      "relative overflow-hidden",
      {
        "rounded-full": variant === "circular",
        "rounded-lg": variant === "rounded",
        "rounded-sm": variant === "text",
        "rounded-none": variant === "rectangular",
      },
      className
    );

    const animationClasses = {
      pulse: "animate-pulse",
      wave: "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]",
      none: "",
    };

    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            ref={index === 0 ? ref : undefined}
            className={cn(baseClasses, animationClasses[animation])}
            style={{ width, height }}
            {...cleanDOMProps(props)}
          />
        ))}
      </>
    );
  }
);

SkeletonLoader.displayName = "SkeletonLoader";

export { SkeletonLoader };
