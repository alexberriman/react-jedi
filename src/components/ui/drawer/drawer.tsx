import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

function Drawer({ ...props }: Readonly<React.ComponentProps<typeof DrawerPrimitive.Root>>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Trigger>>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: Readonly<React.ComponentProps<typeof DrawerPrimitive.Portal>>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Close>>) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      className={cn(
        "absolute right-4 top-4 rounded-lg opacity-70 hover:opacity-100",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        "hover:scale-105 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
      {...props}
    />
  );
}

function DrawerOverlay({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Overlay>>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/40 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:duration-300 data-[state=open]:duration-300",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Content>>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background/95 backdrop-blur-xl fixed z-50 flex h-auto flex-col",
          "border shadow-2xl shadow-black/20",
          // Enhanced animations
          "transition-all duration-300 ease-in-out",
          // Glassmorphism effect
          "before:absolute before:inset-0 before:bg-gradient-to-t before:from-background/20 before:to-background/5 before:rounded-lg before:-z-10",
          // Direction styles
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=right]:rounded-l-xl",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:rounded-r-xl",
          // Enhanced animations for each direction
          "data-[vaul-drawer-direction=top]:data-[state=open]:animate-in data-[vaul-drawer-direction=top]:data-[state=closed]:animate-out",
          "data-[vaul-drawer-direction=top]:data-[state=closed]:slide-out-to-top data-[vaul-drawer-direction=top]:data-[state=open]:slide-in-from-top",
          "data-[vaul-drawer-direction=bottom]:data-[state=open]:animate-in data-[vaul-drawer-direction=bottom]:data-[state=closed]:animate-out",
          "data-[vaul-drawer-direction=bottom]:data-[state=closed]:slide-out-to-bottom data-[vaul-drawer-direction=bottom]:data-[state=open]:slide-in-from-bottom",
          "data-[vaul-drawer-direction=right]:data-[state=open]:animate-in data-[vaul-drawer-direction=right]:data-[state=closed]:animate-out",
          "data-[vaul-drawer-direction=right]:data-[state=closed]:slide-out-to-right data-[vaul-drawer-direction=right]:data-[state=open]:slide-in-from-right",
          "data-[vaul-drawer-direction=left]:data-[state=open]:animate-in data-[vaul-drawer-direction=left]:data-[state=closed]:animate-out",
          "data-[vaul-drawer-direction=left]:data-[state=closed]:slide-out-to-left data-[vaul-drawer-direction=left]:data-[state=open]:slide-in-from-left",
          className
        )}
        {...props}
      >
        <div className="bg-muted/50 mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block hover:scale-x-125 transition-transform duration-200" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: Readonly<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-2 p-6 pb-4",
        "border-b border-border/40",
        "bg-gradient-to-b from-background/5 to-transparent",
        className
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: Readonly<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 p-6 pt-4",
        "border-t border-border/40",
        "bg-gradient-to-t from-background/5 to-transparent",
        className
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Title>>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-foreground font-semibold text-lg tracking-tight",
        "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DrawerPrimitive.Description>>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

// Custom components for modern 2025 design

interface DrawerSectionProps extends Readonly<React.ComponentProps<"div">> {
  sticky?: boolean;
}

function DrawerSection({ className, sticky, ...props }: Readonly<DrawerSectionProps>) {
  return (
    <div
      data-slot="drawer-section"
      className={cn(
        "px-6 py-4",
        sticky && "sticky top-0 bg-background/80 backdrop-blur-md z-10",
        className
      )}
      {...props}
    />
  );
}

interface DrawerHandleProps extends Readonly<React.ComponentProps<"div">> {
  orientation?: "horizontal" | "vertical";
}

function DrawerHandle({
  className,
  orientation = "horizontal",
  ...props
}: Readonly<DrawerHandleProps>) {
  return (
    <div
      data-slot="drawer-handle"
      className={cn(
        "bg-muted/50 shrink-0 rounded-full",
        "absolute top-1/2 -translate-y-1/2",
        "hover:bg-muted/70 transition-colors duration-200",
        orientation === "horizontal" ? "h-2 w-[100px] mx-auto my-2" : "w-2 h-[100px] my-auto mx-2",
        className
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerSection,
  DrawerHandle,
};
