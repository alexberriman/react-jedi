import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";

function Sheet({ ...props }: Readonly<React.ComponentProps<typeof SheetPrimitive.Root>>) {
  const cleanProps = cleanDOMProps(props);
  return <SheetPrimitive.Root data-slot="sheet" {...cleanProps} />;
}

function SheetTrigger({ 
  ...props 
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <SheetPrimitive.Trigger 
      data-slot="sheet-trigger" 
      {...cleanProps} 
    />
  );
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  const cleanProps = cleanDOMProps(props);
  return <SheetPrimitive.Close data-slot="sheet-close" {...cleanProps} />;
}

function SheetPortal({ ...props }: Readonly<React.ComponentProps<typeof SheetPrimitive.Portal>>) {
  const cleanProps = cleanDOMProps(props);
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...cleanProps} />;
}

interface SheetOverlayProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {
  animated?: boolean;
}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, animated = true, ...props }, ref) => {
  const Overlay = animated ? motion.div : "div";
  const overlayProps = animated ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  } : {};
  
  return (
    <SheetPrimitive.Overlay asChild>
      <Overlay
        ref={ref}
        data-slot="sheet-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-black/50",
          className
        )}
        {...overlayProps}
      />
    </SheetPrimitive.Overlay>
  );
});
SheetOverlay.displayName = "SheetOverlay";

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: "top" | "right" | "bottom" | "left";
  animated?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = "right", animated = true, ...props }, ref) => {
  const slideVariants = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
  };
  
  const Content = animated ? motion.div : "div";
  const contentProps = animated ? {
    initial: slideVariants[side].initial,
    animate: slideVariants[side].animate,
    exit: slideVariants[side].exit,
    transition: { type: "spring", damping: 25, stiffness: 250 },
  } : {};
  
  return (
    <SheetPortal>
      <SheetOverlay animated={animated} />
      <SheetPrimitive.Content asChild>
        <Content
          ref={ref}
          data-slot="sheet-content"
          className={cn(
            "bg-background fixed z-50 flex flex-col gap-4 p-6 shadow-lg",
            side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            side === "top" && "inset-x-0 top-0 h-auto border-b",
            side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
            className
          )}
          {...contentProps}
        >
          {children}
          <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </Content>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = SheetPrimitive.Content.displayName;

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 -m-6 mb-0 p-6 pb-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 -m-6 mt-0 p-6 pt-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...cleanProps}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...cleanProps}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
