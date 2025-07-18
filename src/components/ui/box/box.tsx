import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, omit } from "../../../lib/utils";

const boxVariants = cva("", {
  variants: {
    display: {
      flex: "flex",
      block: "block",
      inline: "inline",
      "inline-block": "inline-block",
      grid: "grid",
      "inline-flex": "inline-flex",
      "inline-grid": "inline-grid",
      none: "hidden",
    },
    position: {
      static: "static",
      relative: "relative",
      absolute: "absolute",
      fixed: "fixed",
      sticky: "sticky",
    },
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
      "2xl": "p-10",
    },
    margin: {
      none: "m-0",
      xs: "m-1",
      sm: "m-2",
      md: "m-4",
      lg: "m-6",
      xl: "m-8",
      "2xl": "m-10",
      auto: "m-auto",
    },
    rounded: {
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
      inner: "shadow-inner",
    },
    width: {
      auto: "w-auto",
      full: "w-full",
      screen: "w-screen",
      fit: "w-fit",
      min: "w-min",
      max: "w-max",
      half: "w-1/2",
      third: "w-1/3",
      "two-thirds": "w-2/3",
      quarter: "w-1/4",
      "three-quarters": "w-3/4",
    },
    height: {
      auto: "h-auto",
      full: "h-full",
      screen: "h-screen",
      fit: "h-fit",
      min: "h-min",
      max: "h-max",
      half: "h-1/2",
      third: "h-1/3",
      "two-thirds": "h-2/3",
      quarter: "h-1/4",
      "three-quarters": "h-3/4",
    },
    borderWidth: {
      none: "border-0",
      thin: "border",
      thick: "border-2",
      thicker: "border-4",
      thickest: "border-8",
    },
    backgroundColor: {
      transparent: "bg-transparent",
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      muted: "bg-muted",
      card: "bg-card",
      background: "bg-background",
      foreground: "bg-foreground",
      destructive: "bg-destructive",
      popover: "bg-popover",
    },
    textColor: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      muted: "text-muted-foreground",
      card: "text-card-foreground",
      background: "text-background",
      foreground: "text-foreground",
      destructive: "text-destructive-foreground",
      popover: "text-popover-foreground",
    },
    borderColor: {
      default: "border-border",
      primary: "border-primary",
      secondary: "border-secondary",
      accent: "border-accent",
      muted: "border-muted",
      card: "border-card",
      background: "border-background",
      foreground: "border-foreground",
      destructive: "border-destructive",
      popover: "border-popover",
    },
    flexDirection: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    },
    justifyContent: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    alignItems: {
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
      "2xl": "gap-10",
    },
    overflow: {
      auto: "overflow-auto",
      hidden: "overflow-hidden",
      visible: "overflow-visible",
      scroll: "overflow-scroll",
      "x-auto": "overflow-x-auto",
      "y-auto": "overflow-y-auto",
      "x-hidden": "overflow-x-hidden",
      "y-hidden": "overflow-y-hidden",
      "x-scroll": "overflow-x-scroll",
      "y-scroll": "overflow-y-scroll",
    },
    zIndex: {
      auto: "z-auto",
      0: "z-0",
      10: "z-10",
      20: "z-20",
      30: "z-30",
      40: "z-40",
      50: "z-50",
    },
    transition: {
      none: "transition-none",
      default: "transition-all duration-300 ease-in-out",
      fast: "transition-all duration-150 ease-in-out",
      slow: "transition-all duration-500 ease-in-out",
    },
    scale: {
      none: "scale-100",
      sm: "scale-95",
      md: "scale-90",
      lg: "scale-75",
      xl: "scale-50",
    },
    blur: {
      none: "blur-none",
      sm: "blur-sm",
      md: "blur",
      lg: "blur-lg",
      xl: "blur-xl",
      "2xl": "blur-2xl",
      "3xl": "blur-3xl",
    },
    backdropBlur: {
      none: "backdrop-blur-none",
      sm: "backdrop-blur-sm",
      md: "backdrop-blur",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
      "2xl": "backdrop-blur-2xl",
      "3xl": "backdrop-blur-3xl",
    },
    glassmorphism: {
      none: "",
      light: "bg-white/10 backdrop-blur-md border border-white/20",
      medium: "bg-white/20 backdrop-blur-lg border border-white/30",
      strong: "bg-white/30 backdrop-blur-xl border border-white/40",
      dark: "bg-black/10 backdrop-blur-md border border-black/20",
      "dark-medium": "bg-black/20 backdrop-blur-lg border border-black/30",
      "dark-strong": "bg-black/30 backdrop-blur-xl border border-black/40",
    },
    neumorphism: {
      none: "",
      light: "bg-gray-100 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]",
      medium: "bg-gray-100 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]",
      strong: "bg-gray-100 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff]",
      dark: "bg-gray-800 shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#424242]",
      "dark-medium": "bg-gray-800 shadow-[10px_10px_20px_#1e1e1e,-10px_-10px_20px_#424242]",
      "dark-strong": "bg-gray-800 shadow-[15px_15px_30px_#1e1e1e,-15px_-15px_30px_#424242]",
    },
  },
  defaultVariants: {
    display: "block",
    position: "static",
    padding: "none",
    margin: "none",
    rounded: "none",
    shadow: "none",
    width: "auto",
    height: "auto",
    borderWidth: "none",
    backgroundColor: "transparent",
    transition: "none",
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  readonly as?: React.ElementType;

  // React-specific props that should not be passed to DOM element
  readonly parentContext?: Record<string, unknown>;
  readonly spec?: import("@/types/schema/components").ComponentSpec;
  readonly theme?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
}

function Box({
  className,
  as: Component = "div",
  display,
  position,
  padding,
  margin,
  rounded,
  shadow,
  width,
  height,
  borderWidth,
  backgroundColor,
  textColor,
  borderColor,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  overflow,
  zIndex,
  transition,
  scale,
  blur,
  backdropBlur,
  glassmorphism,
  neumorphism,
  ...props
}: BoxProps) {
  const cleanProps = omit(props as Record<string, unknown>, ["parentContext", "spec", "theme", "state", "inputType", "element"]);
  
  return (
    <Component
      data-slot="box"
      className={cn(
        boxVariants({
          display,
          position,
          padding,
          margin,
          rounded,
          shadow,
          width,
          height,
          borderWidth,
          backgroundColor,
          textColor,
          borderColor,
          flexDirection,
          justifyContent,
          alignItems,
          gap,
          overflow,
          zIndex,
          transition,
          scale,
          blur,
          backdropBlur,
          glassmorphism,
          neumorphism,
          className,
        })
      )}
      {...cleanProps}
    />
  );
}

export { Box, boxVariants };
