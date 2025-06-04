import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn, cleanDOMProps } from "../../../lib/utils";

type AccordionSingleProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  type: "single";
};

type AccordionMultipleProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  type: "multiple";
};

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>((props, ref) => {
  const cleanProps = cleanDOMProps(props) as AccordionProps;
  return <AccordionPrimitive.Root ref={ref} data-slot="accordion" {...cleanProps} />;
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
      className={cn("border-b last:border-b-0", className)}
      {...cleanProps}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const cleanProps = cleanDOMProps(props);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground/80",
          className
        )}
        {...cleanProps}
      >
        <span className="flex-1">{children}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const cleanProps = cleanDOMProps(props);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...cleanProps}
    >
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn("pt-0 pb-4", className)}
      >
        {children}
      </motion.div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
