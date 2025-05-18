import * as React from "react";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    min?: number;
    max?: number;
    step?: number;
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
  }
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    />
  );
});
Slider.displayName = "Slider";
