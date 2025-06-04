import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";

type AccordionSingleProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  type: "single";
  animated?: boolean;
};

type AccordionMultipleProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  type: "multiple";
  animated?: boolean;
};

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const AccordionContext = React.createContext<{ animated: boolean }>({ animated: true });

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>((props, ref) => {
  const { animated = true, ...restProps } = props;
  
  return (
    <AccordionContext.Provider value={{ animated }}>
      <AccordionPrimitive.Root ref={ref} data-slot="accordion" {...restProps} />
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-b border-border/50 last:border-b-0 transition-colors duration-200",
        className
      )}
      {...cleanProps}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const { animated } = React.useContext(AccordionContext);
  const cleanProps = cleanDOMProps(props);
  
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-md px-1 py-4 text-left text-sm font-medium outline-none",
          "transition-all duration-200 ease-out",
          "hover:bg-muted/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer select-none",
          className
        )}
        {...cleanProps}
      >
        <span className="flex-1 font-medium">{children}</span>
        <motion.div
          animate={animated ? { rotate: 0 } : undefined}
          initial={false}
          className="shrink-0"
          transition={animated ? { duration: 0.3, ease: "easeOut" } : undefined}
        >
          <ChevronDownIcon 
            className={cn(
              "size-4 text-muted-foreground/70",
              "transition-transform duration-300 ease-out",
              "group-data-[state=open]:rotate-180",
              !animated && "group-data-[state=open]:rotate-180"
            )}
          />
        </motion.div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { animated } = React.useContext(AccordionContext);
  const cleanProps = cleanDOMProps(props);
  
  if (!animated) {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        data-slot="accordion-content"
        className={cn(
          "overflow-hidden text-sm",
          "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
          className
        )}
        {...cleanProps}
      >
        <div className={cn("px-1 pt-0 pb-4", className)}>
          {children}
        </div>
      </AccordionPrimitive.Content>
    );
  }
  
  return (
    <AnimatePresence initial={false}>
      <AccordionPrimitive.Content
        ref={ref}
        data-slot="accordion-content"
        className={cn(
          "overflow-hidden text-sm",
          "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
          className
        )}
        {...cleanProps}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn("px-1 pt-0 pb-4 text-muted-foreground", className)}
        >
          {children}
        </motion.div>
      </AccordionPrimitive.Content>
    </AnimatePresence>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
