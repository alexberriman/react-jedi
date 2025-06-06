import * as React from "react";
import { Drawer, DrawerTrigger, DrawerContent } from "./drawer";
import type { ComponentProps } from "../../../types/schema/components";

interface DrawerWrapperProps {
  readonly spec?: ComponentProps["spec"];
  readonly defaultOpen?: boolean;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly modal?: boolean;
  readonly drawerDirection?: "top" | "right" | "bottom" | "left";
  readonly direction?: "top" | "right" | "bottom" | "left";
  readonly children?: React.ReactNode;
  readonly parentContext?: {
    readonly handlers?: Record<string, (...args: unknown[]) => unknown>;
  };
  readonly [key: string]: unknown;
}

/**
 * Wrapper component for Drawer that handles SDUI state management
 * This component manages the open/closed state for SDUI rendering
 */
export function DrawerWrapper({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  modal = true,
  direction,
  drawerDirection,
  parentContext,
  ...props
}: Readonly<DrawerWrapperProps>): React.ReactElement {
  const finalDirection = direction || drawerDirection;
  // Use internal state if not controlled
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  // Determine if we're in controlled mode
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  // Set up SDUI handlers if we're in SDUI mode
  React.useEffect(() => {
    if (parentContext?.handlers && setOpen) {
      // Override the handlers with actual drawer control functions
      parentContext.handlers.openDrawer = () => setOpen(true);
      parentContext.handlers.closeDrawer = () => setOpen(false);
      parentContext.handlers.toggleDrawer = () => setOpen(!open);
    }
  }, [parentContext, setOpen, open]);

  // Process children to extract trigger and content
  const childArray = React.Children.toArray(children);
  let trigger: React.ReactNode = null;
  let content: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  for (const child of childArray) {
    if (React.isValidElement(child)) {
      if (child.type === DrawerTrigger || child.props?.type === "DrawerTrigger") {
        trigger = child;
      } else if (child.type === DrawerContent || child.props?.type === "DrawerContent") {
        // Apply direction if specified
        content = finalDirection && React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            "data-vaul-drawer-direction": finalDirection,
            ...child.props,
          }) : child;
      } else {
        otherChildren.push(child);
      }
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={modal} {...props}>
      {trigger}
      {content}
      {otherChildren}
    </Drawer>
  );
}

// Re-export all drawer components from drawer.tsx
export {
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerSection,
  DrawerHandle,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerContent,
} from "./drawer";