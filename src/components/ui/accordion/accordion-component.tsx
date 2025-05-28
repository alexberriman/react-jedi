import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import type { AccordionType } from "@/types/components/accordion";
import type { ComponentProps } from "@/types/schema/components";

interface AccordionComponentProps extends ComponentProps {
  readonly spec: AccordionType;
}

export function AccordionComponent({ spec }: AccordionComponentProps) {
  const { accordionType = "single", defaultValue, collapsible, disabled, items } = spec;

  // Create proper typed props based on accordion type
  const accordionProps =
    accordionType === "single"
      ? {
          type: "single" as const,
          defaultValue: defaultValue as string | undefined,
          collapsible: collapsible ?? false,
          disabled,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultValue as string[] | undefined,
          disabled,
        };

  return (
    <Accordion {...accordionProps}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
