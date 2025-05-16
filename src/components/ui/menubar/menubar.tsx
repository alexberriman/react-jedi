import {
  Menubar as MenubarBase,
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
} from "../menubar";
import type { MenubarComponent } from "../../../types/components/menubar";

export type MenubarProps = MenubarComponent;

export function Menubar({ menus, ...props }: Readonly<MenubarProps>) {
  return (
    <MenubarBase>
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
    </MenubarBase>
  );
}
