import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, CircleIcon } from "lucide-react";
import { cn, cleanDOMProps } from "../../../lib/utils";

// Define Menubar components from Radix UI
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPortal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </MenubarPortal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

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
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

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
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, alignOffset = -6, sideOffset = 2, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    alignOffset={alignOffset}
    sideOffset={sideOffset}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <CircleIcon className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
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
