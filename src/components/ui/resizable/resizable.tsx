import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn, cleanDOMProps } from "../../../lib/utils";
import { SDUIIcon } from "../../../lib/icons/sdui-icon";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      {...cleanDOMProps(props)}
    />
  );
}

function ResizablePanel({ ...props }: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...cleanDOMProps(props)} />;
}

function ResizableHandle({
  withHandle,
  className,
  iconName = "grip-vertical",
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
  iconName?: string;
}) {
  // Function to render the grip icon - supports both React and SDUI modes
  const renderGripIcon = (): React.ReactNode => {
    try {
      // Try to use SDUI icon registry first (for SDUI mode)
      return <SDUIIcon name={iconName} className="size-2.5" />;
    } catch {
      // Fall back to direct import (for React mode)
      return <GripVerticalIcon className="size-2.5" />;
    }
  };

  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      data-testid="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...cleanDOMProps(props)}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border" data-panel-resize-handle-enabled>
          {renderGripIcon()}
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
