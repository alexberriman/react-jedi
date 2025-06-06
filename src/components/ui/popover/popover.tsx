import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn, cleanDOMProps } from "../../../lib/utils";

function Popover({ ...props }: Readonly<React.ComponentProps<typeof PopoverPrimitive.Root>>) {
  const cleanProps = cleanDOMProps(props);
  return <PopoverPrimitive.Root data-slot="popover" {...cleanProps} />;
}

function PopoverTrigger({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof PopoverPrimitive.Trigger>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <PopoverPrimitive.Trigger 
      data-slot="popover-trigger" 
      className={cn(className)}
      {...cleanProps} 
    />
  );
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: Readonly<React.ComponentProps<typeof PopoverPrimitive.Content>>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-200",
          className
        )}
        {...cleanProps}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: Readonly<React.ComponentProps<typeof PopoverPrimitive.Anchor>>) {
  const cleanProps = cleanDOMProps(props);
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...cleanProps} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
