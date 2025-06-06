import React from "react";
import { HoverCard } from "./hover-card";
import type { ComponentProps } from "../../../types/schema/components";
import type { ComponentSpec } from "../../../types/schema";

/**
 * Wrapper component for HoverCard that handles SDUI rendering
 * This component expects its children to be already rendered by the main render function
 */
export function HoverCardWrapper(props: Readonly<ComponentProps>) {
  const { spec, parentContext, children } = props;
  
  // Extract HoverCard props from spec
  const { openDelay, closeDelay, defaultOpen, open, onOpenChange } = (spec || {}) as ComponentSpec & {
    openDelay?: number;
    closeDelay?: number;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: string;
  };
  
  // Handle onOpenChange callback
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (typeof onOpenChange === 'string' && parentContext?.handlers) {
      const handlers = parentContext.handlers as Record<string, (...args: unknown[]) => unknown>;
      const handler = handlers[onOpenChange];
      if (handler) {
        handler(newOpen);
      }
    }
  }, [onOpenChange, parentContext]);
  
  if (!spec) {
    return null;
  }
  
  // The children are already rendered by the main render function
  // We just need to pass them through to the HoverCard component
  return (
    <HoverCard
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange ? handleOpenChange : undefined}
    >
      {children}
    </HoverCard>
  );
}