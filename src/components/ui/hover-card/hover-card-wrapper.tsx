import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import type { ComponentProps } from "../../../types/schema/components";
import type { ComponentSpec } from "../../../types/schema";
import { defaultComponentResolver } from "../../../lib/component-resolver";

/**
 * Wrapper component for HoverCard that handles SDUI rendering
 * This ensures the proper parent-child relationship is maintained for Radix UI
 */
export function HoverCardWrapper(props: Readonly<ComponentProps>) {
  const { spec, parentContext } = props;
  
  // Handle onOpenChange callback - must be defined before any returns
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (typeof spec?.onOpenChange === 'string' && parentContext?.handlers) {
      const handlers = parentContext.handlers as Record<string, (...args: unknown[]) => unknown>;
      const handler = handlers[spec.onOpenChange];
      if (handler) {
        handler(newOpen);
      }
    }
  }, [spec, parentContext]);
  
  if (!spec) {
    return null;
  }
  
  // Extract HoverCard props from spec
  const { openDelay, closeDelay, defaultOpen, open, onOpenChange, children } = spec as ComponentSpec & {
    openDelay?: number;
    closeDelay?: number;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: string;
  };
  
  // Find trigger and content specs
  let triggerSpec: ComponentSpec | null = null;
  let contentSpec: ComponentSpec | null = null;
  
  if (Array.isArray(children)) {
    for (const child of children as ComponentSpec[]) {
      if (child.type === "HoverCardTrigger") {
        triggerSpec = child;
      } else if (child.type === "HoverCardContent") {
        contentSpec = child;
      }
    }
  }
  
  if (!triggerSpec || !contentSpec) {
    console.warn("HoverCard must have both HoverCardTrigger and HoverCardContent");
    return null;
  }
  
  // Helper function to render child component
  const renderChild = (spec: ComponentSpec | string | undefined): React.ReactNode => {
    if (!spec) return null;
    if (typeof spec === 'string') return spec;
    
    const ChildComponent = defaultComponentResolver(spec.type);
    if (!ChildComponent) return null;
    
    return (
      <ChildComponent spec={spec} parentContext={parentContext}>
        {spec.children as React.ReactNode}
      </ChildComponent>
    );
  };
  
  const triggerContent = renderChild(triggerSpec.children as ComponentSpec);
  const contentContent = renderChild(contentSpec.children as ComponentSpec | string);
  
  // Now render the HoverCard with properly structured children
  return (
    <HoverCard
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange ? handleOpenChange : undefined}
    >
      <HoverCardTrigger asChild={triggerSpec.asChild as boolean | undefined}>
        {triggerContent}
      </HoverCardTrigger>
      <HoverCardContent 
        className={contentSpec.className as string | undefined}
        align={contentSpec.align as "center" | "start" | "end" | undefined}
        sideOffset={contentSpec.sideOffset as number | undefined}
      >
        {contentContent}
      </HoverCardContent>
    </HoverCard>
  );
}