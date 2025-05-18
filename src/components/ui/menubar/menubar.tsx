import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn, cleanDOMProps } from "../../../lib/utils";

// Define Menubar components from Radix UI
const Menubar = MenubarPrimitive.Root;
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarTrigger = MenubarPrimitive.Trigger;
const MenubarContent = MenubarPrimitive.Content;
const MenubarItemPrimitive = MenubarPrimitive.Item;

// Extended MenubarItem with inset and variant props
export interface MenubarItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, inset, variant, ...props }, ref) => (
  <MenubarItemPrimitive
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      variant === "destructive" && "text-destructive focus:text-destructive",
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
const MenubarSeparator = MenubarPrimitive.Separator;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarSubTriggerPrimitive = MenubarPrimitive.SubTrigger;

// Extended MenubarSubTrigger with inset prop
export interface MenubarSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
  inset?: boolean;
}

export const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, ...props }, ref) => (
  <MenubarSubTriggerPrimitive
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
const MenubarSubContent = MenubarPrimitive.SubContent;
const MenubarCheckboxItem = MenubarPrimitive.CheckboxItem;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
const MenubarRadioItem = MenubarPrimitive.RadioItem;
const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...cleanDOMProps(props)} />
  );
};
import type { MenubarComponent } from "../../../types/components/menubar";

export type MenubarProps = MenubarComponent;

export function MenubarWrapper({ menus, ...props }: Readonly<MenubarProps>) {
  return (
    <Menubar>
      {menus.map((menu, menuIndex) => (
        <MenubarMenu key={menuIndex}>
          <MenubarTrigger>{menu.trigger}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, itemIndex) => {
              switch (item.type) {
                case "item": {
                  return (
                    <MenubarItem
                      key={itemIndex}
                      disabled={item.disabled}
                      inset={item.inset}
                      variant={item.variant}
                      onClick={item.onClick}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.label}
                      {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
                    </MenubarItem>
                  );
                }

                case "submenu": {
                  return (
                    <MenubarSub key={itemIndex}>
                      <MenubarSubTrigger inset={item.inset}>{item.trigger}</MenubarSubTrigger>
                      <MenubarSubContent>
                        {item.items.map((subItem, subIndex) => {
                          if (subItem.type === "separator") {
                            return <MenubarSeparator key={subIndex} />;
                          }
                          return (
                            <MenubarItem
                              key={subIndex}
                              disabled={subItem.disabled}
                              onClick={subItem.onClick}
                            >
                              {subItem.label}
                              {subItem.shortcut && (
                                <MenubarShortcut>{subItem.shortcut}</MenubarShortcut>
                              )}
                            </MenubarItem>
                          );
                        })}
                      </MenubarSubContent>
                    </MenubarSub>
                  );
                }

                case "checkbox": {
                  return (
                    <MenubarCheckboxItem
                      key={itemIndex}
                      checked={item.checked}
                      onCheckedChange={item.onCheckedChange}
                    >
                      {item.label}
                    </MenubarCheckboxItem>
                  );
                }

                case "radioGroup": {
                  return (
                    <MenubarRadioGroup
                      key={itemIndex}
                      value={item.value}
                      onValueChange={item.onValueChange}
                    >
                      {item.items.map((radioItem, radioIndex) => (
                        <MenubarRadioItem key={radioIndex} value={radioItem.value}>
                          {radioItem.label}
                        </MenubarRadioItem>
                      ))}
                    </MenubarRadioGroup>
                  );
                }

                case "separator": {
                  return <MenubarSeparator key={itemIndex} />;
                }

                default: {
                  return null;
                }
              }
            })}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  // MenubarItem is defined above
  MenubarSeparator,
  MenubarSub,
  // MenubarSubTrigger is defined above
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
};
