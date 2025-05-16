import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuShortcut,
} from "./";
import type { ComponentProps } from "@/types/schema";
import type {
  ContextMenuComponentSpec,
  ContextMenuItemSpec as ContextMenuItemType,
} from "@/types/components/context-menu";
import { render as renderComponent } from "@/lib/render";
import { useEventHandlers } from "@/lib/events";

// Icon mapping for common icons
const iconMap: Record<string, React.ReactNode> = {
  copy: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  cut: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  paste: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  trash: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  link: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  share: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  ),
  user: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  settings: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m-9-9h6m6 0h6" />
    </svg>
  ),
};

function getIcon(iconName?: string): React.ReactElement | null {
  if (!iconName) return null;
  const icon = iconMap[iconName];
  return icon as React.ReactElement | null;
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
