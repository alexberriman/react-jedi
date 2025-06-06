import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn, cleanDOMProps } from "../../../lib/utils";
import type { ComponentProps } from "../../../types/schema";
import type {
  ContextMenuComponentSpec,
  ContextMenuItemSpec as ContextMenuItemType,
} from "../../../types/components/context-menu";
import { render as renderComponent } from "../../../lib/render";
import { useEventHandlers } from "../../../lib/events";

// Re-export Radix UI components with proper typing and styling
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...cleanDOMProps(props)}
  >
    {children}
    <svg
      className="ml-auto h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...cleanDOMProps(props)}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...cleanDOMProps(props)}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      variant === "destructive" && "text-destructive focus:text-destructive",
      className
    )}
    {...cleanDOMProps(props)}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...cleanDOMProps(props)}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...cleanDOMProps(props)}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" />
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...cleanDOMProps(props)}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...cleanDOMProps(props)}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...cleanDOMProps(props)}
    />
  );
};

import { SDUIIcon } from "../../../lib/icons";

function getIcon(iconName?: string): React.ReactElement | null {
  if (!iconName) return null;
  return <SDUIIcon name={iconName} size={16} className="size-4" />;
}

// Custom hook for menu item handlers
function useMenuItemHandlers(item: ContextMenuItemType, options: ComponentProps): () => void {
  const eventHandlers = React.useMemo(() => {
    if (!item.onSelect) return undefined;
    return {
      click: {
        type: "click" as const,
        handler: {
          type: item.onSelect.action,
          ...item.onSelect,
        },
      },
    };
  }, [item.onSelect]);

  const [localState, setLocalState] = React.useState(options.state || {});

  const handlers = useEventHandlers({
    eventHandlers,
    state: localState,
    setState: setLocalState,
  });

  return React.useCallback(() => {
    if (item.onSelect && handlers.elementRef.current) {
      handlers.elementRef.current.click();
    }
  }, [item.onSelect, handlers]);
}

// Component for rendering individual menu items
function MenuItemContent({
  item,
  options,
}: Readonly<{
  item: ContextMenuItemType;
  options: ComponentProps;
}>): React.ReactElement | null {
  const handleSelect = useMenuItemHandlers(item, options);

  switch (item.type) {
    case "separator": {
      return <ContextMenuSeparator />;
    }

    case "label": {
      return <ContextMenuLabel>{item.label}</ContextMenuLabel>;
    }

    case "checkbox": {
      return (
        <ContextMenuCheckboxItem
          checked={item.checked}
          onCheckedChange={handleSelect}
          disabled={item.disabled}
        >
          {getIcon(item.icon)}
          {item.label}
        </ContextMenuCheckboxItem>
      );
    }

    case "radio": {
      return (
        <ContextMenuRadioItem value={item.value || ""} disabled={item.disabled}>
          {getIcon(item.icon)}
          {item.label}
        </ContextMenuRadioItem>
      );
    }

    case "sub": {
      return (
        <ContextMenuSub>
          <ContextMenuSubTrigger disabled={item.disabled}>
            {getIcon(item.icon)}
            {item.label}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {item.items?.map((subItem, index) => (
              <MenuItemContent key={`sub-${index}`} item={subItem} options={options} />
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    }

    case "item": {
      return (
        <ContextMenuItem onSelect={handleSelect} disabled={item.disabled} variant={item.variant}>
          {getIcon(item.icon)}
          {item.label}
          {item.shortcut && <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>}
        </ContextMenuItem>
      );
    }

    default: {
      return null;
    }
  }
}

export default function ContextMenuWrapper({ spec, ...props }: Readonly<ComponentProps>) {
  const {
    trigger,
    items = [],
    onOpenChange,
    ...contextMenuProps
  } = spec as ContextMenuComponentSpec;

  // Handle onOpenChange event
  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (onOpenChange && onOpenChange.action && props.state) {
        const state = props.state;
        if ("dispatch" in state && typeof state.dispatch === "function") {
          state.dispatch({
            type: onOpenChange.action,
            payload: { open },
          });
        }
      }
    },
    [onOpenChange, props.state]
  );

  // Group radio items for proper radio group rendering
  const groupedItems: (ContextMenuItemType | ContextMenuItemType[])[] = [];
  let currentRadioGroup: ContextMenuItemType[] = [];

  for (const [index, item] of items.entries()) {
    if (item.type === "radio") {
      currentRadioGroup.push(item);
      // Check if next item is not a radio or if it's the last item
      if (index === items.length - 1 || items[index + 1].type !== "radio") {
        groupedItems.push([...currentRadioGroup]);
        currentRadioGroup = [];
      }
    } else {
      groupedItems.push(item);
    }
  }

  const triggerElement = trigger ? renderComponent(trigger, props) : null;

  return (
    <ContextMenu {...contextMenuProps} onOpenChange={handleOpenChange}>
      <ContextMenuTrigger asChild>{triggerElement}</ContextMenuTrigger>
      <ContextMenuContent>
        {groupedItems.map((item, index) => {
          if (Array.isArray(item)) {
            // Radio group
            return (
              <ContextMenuRadioGroup
                key={`radio-group-${index}`}
                value={item.find((radio) => radio.checked)?.value}
              >
                {item.map((radio, radioIndex) => (
                  <MenuItemContent
                    key={`radio-${radioIndex}`}
                    item={radio}
                    options={{ ...props, spec }}
                  />
                ))}
              </ContextMenuRadioGroup>
            );
          }
          return <MenuItemContent key={`item-${index}`} item={item} options={{ ...props, spec }} />;
        })}
      </ContextMenuContent>
    </ContextMenu>
  );
}

// Export all context menu components for use in other files
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
};
