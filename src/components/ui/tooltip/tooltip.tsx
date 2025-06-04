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
  return <TooltipPrimitive.Root data-slot="tooltip" {...cleanProps} />;
}

function TooltipTrigger({
  asChild = true,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Trigger>>) {
  const cleanProps = cleanDOMProps(props);
  return <TooltipPrimitive.Trigger asChild={asChild} data-slot="tooltip-trigger" {...cleanProps} />;
}

function TooltipContent({
  className,
  sideOffset = 4,
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
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...cleanProps}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-primary" width={8} height={4} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
