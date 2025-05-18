import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cleanDOMProps } from "../../../lib/utils";

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  const cleanProps = cleanDOMProps(props);
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...cleanProps} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  const cleanProps = cleanDOMProps(props);
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...cleanProps} />;
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const cleanProps = cleanDOMProps(props);
  return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...cleanProps} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
