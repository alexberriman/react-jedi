import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";

interface SwitchProperties extends Readonly<React.ComponentProps<typeof SwitchPrimitive.Root>> {
  readonly animated?: boolean;
}

function Switch({ className, animated = true, ...props }: SwitchProperties) {
  const cleanProps = cleanDOMProps(props);
  const ref = React.useRef<HTMLButtonElement>(null);
  const [internalChecked, setInternalChecked] = React.useState(props.defaultChecked ?? false);
  
  // Use controlled value if provided, otherwise use internal state
  const isChecked = props.checked === undefined ? internalChecked : props.checked;
  
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        animated && "transition-colors duration-200",
        className
      )}
      onCheckedChange={(checked) => {
        setInternalChecked(checked);
        props.onCheckedChange?.(checked);
      }}
      {...cleanProps}
    >
      {animated ? (
        <motion.span
          data-slot="switch-thumb"
          className={cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0"
          )}
          initial={false}
          animate={{
            x: isChecked ? "calc(100% - 2px)" : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        />
      ) : (
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )}
        />
      )}
    </SwitchPrimitive.Root>
  );
}

export { Switch };
