import * as React from "react";
import { Sheet, SheetTrigger, SheetContent } from "./sheet";
import type { ComponentProps } from "../../../types/schema/components";

interface SheetWrapperProps {
  readonly spec?: ComponentProps["spec"];
  readonly defaultOpen?: boolean;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly onOpenChangeAction?: string;
  readonly modal?: boolean;
  readonly children?: React.ReactNode;
  readonly parentContext?: {
    readonly handlers?: Record<string, (...args: unknown[]) => unknown>;
  };
  readonly [key: string]: unknown;
}

/**
 * Wrapper component for Sheet that handles SDUI state management
 * This component manages the open/closed state for SDUI rendering
 */
export function SheetWrapper({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  onOpenChangeAction,
  modal = true,
  parentContext,
  ...props
}: Readonly<SheetWrapperProps>): React.ReactElement {
  // Use internal state if not controlled
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  // Determine if we're in controlled mode
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  // Get the onOpenChange handler from either props or handlers
  const handleOpenChange = React.useMemo(() => {
    // If onOpenChange is directly provided, use it
    if (onOpenChange) {
      return onOpenChange;
    }
    // If onOpenChangeAction is provided, look it up in handlers
    if (onOpenChangeAction && parentContext?.handlers) {
      const handler = parentContext.handlers[onOpenChangeAction];
      if (typeof handler === 'function') {
        return handler as (open: boolean) => void;
      }
    }
    // Otherwise use internal state setter
    return setInternalOpen;
  }, [onOpenChange, onOpenChangeAction, parentContext?.handlers]);
  
  const setOpen = isControlled ? handleOpenChange : setInternalOpen;

  // Set up SDUI handlers if we're in SDUI mode
  React.useEffect(() => {
    if (parentContext?.handlers && setOpen) {
      // Override the handlers with actual sheet control functions
      parentContext.handlers.openSheet = () => setOpen(true);
      parentContext.handlers.closeSheet = () => setOpen(false);
      parentContext.handlers.toggleSheet = () => setOpen(!open);
    }
  }, [parentContext, setOpen, open]);

  // Process children to extract trigger and content
  const childArray = React.Children.toArray(children);
  let trigger: React.ReactNode = null;
  let content: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  for (const child of childArray) {
    if (React.isValidElement(child)) {
      if (child.type === SheetTrigger || child.props?.type === "SheetTrigger") {
        trigger = child;
      } else if (child.type === SheetContent || child.props?.type === "SheetContent") {
        content = child;
      } else {
        otherChildren.push(child);
      }
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={modal} {...props}>
      {trigger}
      {content}
      {otherChildren}
    </Sheet>
  );
}

// Re-export all sheet components from sheet.tsx
export {
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from "./sheet";