import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { cn, cleanDOMProps } from "../../../lib/utils";
import { useEventHandlers } from "../../../lib/events/use-event-handlers";
import type { ComponentProps } from "../../../types/schema/components";
import type { EventHandlerSpec } from "../../../types/events";
import "./collapsible.css";

interface CollapsibleProps extends React.ComponentProps<typeof CollapsiblePrimitive.Root> {
  readonly spec?: ComponentProps["spec"];
  readonly state?: ComponentProps["state"]; 
  readonly parentContext?: ComponentProps["parentContext"];
}

function Collapsible({ spec, state, parentContext, ...props }: CollapsibleProps) {
  const cleanProps = cleanDOMProps(props);
  
  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = React.useState(props.defaultOpen ?? false);
  
  // Use controlled value if provided, otherwise use internal state
  const isControlled = props.open !== undefined;
  const isOpen = isControlled ? props.open : internalOpen;
  
  // Set up SDUI event handlers if in SDUI mode
  const eventHandlers = React.useMemo(() => {
    if (!spec?.eventHandlers) return undefined;
    return spec.eventHandlers;
  }, [spec?.eventHandlers]);

  const [localState, setLocalState] = React.useState(state || { open: isOpen });
  
  const handlers = useEventHandlers({
    eventHandlers: eventHandlers as Record<string, EventHandlerSpec> | undefined,
    state: localState,
    setState: setLocalState,
  });

  // Update internal state when SDUI state changes
  React.useEffect(() => {
    if (typeof localState.open === 'boolean' && !isControlled) {
      setInternalOpen(localState.open);
    }
  }, [localState.open, isControlled]);

  // Expose handlers to parent context for programmatic control
  React.useEffect(() => {
    if (parentContext?.handlers && typeof parentContext.handlers === 'object') {
      const collapsibleId = spec?.id || 'collapsible';
      const handlers = parentContext.handlers as Record<string, unknown>;
      handlers[`open${collapsibleId}`] = () => {
        if (!isControlled) {
          setInternalOpen(true);
        }
        setLocalState(prev => ({ ...prev, open: true }));
      };
      handlers[`close${collapsibleId}`] = () => {
        if (!isControlled) {
          setInternalOpen(false);
        }
        setLocalState(prev => ({ ...prev, open: false }));
      };
      handlers[`toggle${collapsibleId}`] = () => {
        const newOpen = !isOpen;
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        setLocalState(prev => ({ ...prev, open: newOpen }));
      };
    }
  }, [parentContext, spec?.id, isOpen, isControlled]);

  const onOpenChangeCallback = props.onOpenChange;
  
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    
    // Update SDUI state
    setLocalState(prev => ({ ...prev, open: newOpen }));
    
    // Call original handler if provided
    onOpenChangeCallback?.(newOpen);
    
    // Trigger SDUI event handlers
    if (handlers.elementRef.current && eventHandlers && typeof eventHandlers === 'object' && 'toggle' in eventHandlers) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      handlers.elementRef.current.dispatchEvent(clickEvent);
    }
  }, [isControlled, onOpenChangeCallback, handlers, eventHandlers]);

  return (
    <CollapsiblePrimitive.Root 
      ref={handlers.elementRef as React.Ref<HTMLDivElement>}
      data-slot="collapsible" 
      {...cleanProps}
      open={isOpen}
      onOpenChange={handleOpenChange}
    />
  );
}

interface CollapsibleTriggerProps extends React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> {
  readonly spec?: ComponentProps["spec"];
  readonly state?: ComponentProps["state"]; 
  readonly parentContext?: ComponentProps["parentContext"];
}

function CollapsibleTrigger({
  spec,
  state,
  parentContext,
  className,
  ...props
}: CollapsibleTriggerProps) {
  const cleanProps = cleanDOMProps(props);
  const ref = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);
  
  // Set up SDUI event handlers if in SDUI mode
  const eventHandlers = React.useMemo(() => {
    if (!spec?.eventHandlers) return undefined;
    return spec.eventHandlers;
  }, [spec?.eventHandlers]);

  const [localState, setLocalState] = React.useState(state || {});
  
  const handlers = useEventHandlers({
    eventHandlers: eventHandlers as Record<string, EventHandlerSpec> | undefined,
    state: localState,
    setState: setLocalState,
  });
  
  // Remove no-transition class after mount to enable hover effects
  React.useEffect(() => {
    setMounted(true);
    const timeout = globalThis.setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove("collapsible-trigger-no-initial-transition");
      }
    }, 100);
    return () => globalThis.clearTimeout(timeout);
  }, []);
  
  return (
    <CollapsiblePrimitive.CollapsibleTrigger 
      ref={handlers.elementRef as React.Ref<HTMLButtonElement>}
      data-slot="collapsible-trigger" 
      className={cn(!mounted && "collapsible-trigger-no-initial-transition", className)}
      {...cleanProps} 
    />
  );
}

interface CollapsibleContentProps extends React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> {
  readonly animated?: boolean;
  readonly spec?: ComponentProps["spec"];
  readonly state?: ComponentProps["state"]; 
  readonly parentContext?: ComponentProps["parentContext"];
}

function CollapsibleContent({
  spec,
  state,
  parentContext,
  className,
  animated = true,
  ...props
}: CollapsibleContentProps) {
  const cleanProps = cleanDOMProps(props);
  
  if (!animated) {
    return (
      <CollapsiblePrimitive.CollapsibleContent 
        data-slot="collapsible-content" 
        className={cn("collapsible-content-no-initial-transition", className)}
        {...cleanProps} 
      >
        {props.children}
      </CollapsiblePrimitive.CollapsibleContent>
    );
  }
  
  return (
    <CollapsiblePrimitive.CollapsibleContent asChild {...cleanProps}>
      <motion.div
        data-slot="collapsible-content"
        className={cn("collapsible-content-no-initial-transition overflow-hidden", className)}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: "auto", 
          opacity: 1,
          transition: {
            height: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            },
            opacity: {
              duration: 0.25,
              ease: "easeOut"
            }
          }
        }}
        exit={{ 
          height: 0, 
          opacity: 0,
          transition: {
            height: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            },
            opacity: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        }}
      >
        {props.children}
      </motion.div>
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
export type { CollapsibleContentProps };
