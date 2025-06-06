import React from "react";
import * as UI from "./dropdown-menu";
import type {
  DropdownMenuProps,
  DropdownMenuContentItem,
} from "../../../types/components/dropdown-menu";
import { render } from "../../../lib/render";
import type { ComponentSpec } from "../../../types/schema";
import * as Icons from "lucide-react";

/**
 * Get icon component from icon name
 */
function getIconComponent(iconName: string): React.ComponentType<{ className?: string }> | null {
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> | undefined;
  return IconComponent || null;
}

/**
 * Wrapper component for DropdownMenu that handles JSON specification rendering
 */
export function DropdownMenuWrapper(props: { readonly spec: DropdownMenuProps }) {
  const { trigger, content, open, defaultOpen, modal, onOpenChange } = props.spec;

  // Render the trigger component
  const triggerElement = React.useMemo(() => {
    if (!trigger.component) return null;

    // Render the trigger component from the specification
    return render(trigger.component as ComponentSpec);
  }, [trigger.component]);

  // Render content items
  const renderContentItem = (item: DropdownMenuContentItem, index: number) => {
    const key = `item-${index}`;

    switch (item.type) {
      case "label": {
        return (
          <UI.DropdownMenuLabel key={key} inset={item.inset}>
            {item.text}
          </UI.DropdownMenuLabel>
        );
      }

      case "separator": {
        return <UI.DropdownMenuSeparator key={key} />;
      }

      case "item": {
        const IconComponent = item.icon ? getIconComponent(item.icon) : null;
        return (
          <UI.DropdownMenuItem
            key={key}
            inset={item.inset}
            variant={item.variant}
            disabled={item.disabled}
            onClick={() => item.onClick && console.log("onClick", item.onClick)}
          >
            {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
            <span>{item.text}</span>
            {item.shortcut && <UI.DropdownMenuShortcut>{item.shortcut}</UI.DropdownMenuShortcut>}
          </UI.DropdownMenuItem>
        );
      }

      case "checkbox": {
        return (
          <UI.DropdownMenuCheckboxItem
            key={key}
            checked={item.checked}
            disabled={item.disabled}
            onCheckedChange={(checked) =>
              item.onCheckedChange && console.log("onCheckedChange", checked, item.onCheckedChange)
            }
          >
            {item.text}
          </UI.DropdownMenuCheckboxItem>
        );
      }

      case "radioGroup": {
        return (
          <UI.DropdownMenuRadioGroup
            key={key}
            value={item.value}
            onValueChange={(value) =>
              item.onValueChange && console.log("onValueChange", value, item.onValueChange)
            }
          >
            {item.items.map((radioItem, radioIndex) => {
              const RadioIconComponent = radioItem.icon ? getIconComponent(radioItem.icon) : null;
              return (
                <UI.DropdownMenuRadioItem
                  key={`radio-${radioIndex}`}
                  value={radioItem.value}
                  disabled={radioItem.disabled}
                >
                  {RadioIconComponent && <RadioIconComponent className="mr-2 h-4 w-4" />}
                  {radioItem.text}
                </UI.DropdownMenuRadioItem>
              );
            })}
          </UI.DropdownMenuRadioGroup>
        );
      }

      case "group": {
        return (
          <UI.DropdownMenuGroup key={key}>
            {item.items.map((groupItem, groupIndex) => renderContentItem(groupItem, groupIndex))}
          </UI.DropdownMenuGroup>
        );
      }

      case "sub": {
        const SubIconComponent = item.icon ? getIconComponent(item.icon) : null;
        return (
          <UI.DropdownMenuSub key={key}>
            <UI.DropdownMenuSubTrigger inset={item.inset}>
              {SubIconComponent && <SubIconComponent className="mr-2 h-4 w-4" />}
              <span>{item.text}</span>
            </UI.DropdownMenuSubTrigger>
            <UI.DropdownMenuSubContent>
              {item.content.items.map((subItem, subIndex) => renderContentItem(subItem, subIndex))}
            </UI.DropdownMenuSubContent>
          </UI.DropdownMenuSub>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <UI.DropdownMenu
      open={open}
      defaultOpen={defaultOpen}
      modal={modal}
      onOpenChange={(newOpen) => onOpenChange && console.log("onOpenChange", newOpen, onOpenChange)}
    >
      <UI.DropdownMenuTrigger asChild={trigger.asChild}>{triggerElement}</UI.DropdownMenuTrigger>
      <UI.DropdownMenuContent
        className={content.className}
        align={content.align}
        alignOffset={content.alignOffset}
        side={content.side}
        sideOffset={content.sideOffset}
        collisionPadding={content.collisionPadding}
        avoidCollisions={content.avoidCollisions}
      >
        {content.items.map((item, index) => renderContentItem(item, index))}
      </UI.DropdownMenuContent>
    </UI.DropdownMenu>
  );
}
