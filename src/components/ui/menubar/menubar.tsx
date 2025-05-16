import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../../lib/utils";

// Define Menubar components from Radix UI
const Menubar = MenubarPrimitive.Root;
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarTrigger = MenubarPrimitive.Trigger;
const MenubarContent = MenubarPrimitive.Content;
const MenubarItem = MenubarPrimitive.Item;
const MenubarSeparator = MenubarPrimitive.Separator;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarSubTrigger = MenubarPrimitive.SubTrigger;
const MenubarSubContent = MenubarPrimitive.SubContent;
const MenubarCheckboxItem = MenubarPrimitive.CheckboxItem;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
const MenubarRadioItem = MenubarPrimitive.RadioItem;
const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
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
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
};
