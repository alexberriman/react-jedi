import * as React from "react";
import { Accordion } from "./accordion";
import type { AccordionType } from "@/types/components/accordion";
import type { ComponentProps } from "@/types/schema/components";

interface AccordionComponentProps extends ComponentProps {
  readonly spec: AccordionType;
  readonly children?: React.ReactNode;
}

export function AccordionComponent({ spec, children }: AccordionComponentProps) {
  const { accordionType = "single", defaultValue, collapsible, disabled, className } = spec;

  // Create proper typed props based on accordion type
  const accordionProps =
    accordionType === "single"
      ? {
          type: "single" as const,
          defaultValue: defaultValue as string | undefined,
          collapsible: collapsible ?? false,
          disabled,
          className,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultValue as string[] | undefined,
          disabled,
          className,
        };

  return (
    <Accordion {...accordionProps}>
      {children}
    </Accordion>
  );
}
