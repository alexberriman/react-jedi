import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn, cleanDOMProps } from "../../../lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Provider>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...cleanProps}
    />
  );
}

function Tooltip({ ...props }: Readonly<React.ComponentProps<typeof TooltipPrimitive.Root>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...cleanProps} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Trigger>>) {
  const cleanProps = cleanDOMProps(props);
  return <TooltipPrimitive.Trigger asChild data-slot="tooltip-trigger" {...cleanProps} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Content>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...cleanProps}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
