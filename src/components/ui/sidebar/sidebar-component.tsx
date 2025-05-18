import React from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarInput,
  SidebarSeparator,
} from "./sidebar";
import type {
  SidebarComponentProps,
  SidebarMenuItem as SidebarMenuItemType,
  SidebarSubMenuItem,
  SidebarSection,
  SidebarMenu as SidebarMenuType,
  SidebarInput as SidebarInputType,
} from "../../../types/components/sidebar";
import type { ComponentSpec } from "../../../types/schema/components";
import { createSimpleEventHandler } from "../../../lib/events/simple-handlers";
import { render } from "../../../lib";
import * as Icons from "lucide-react";
import { cleanDOMProps } from "../../../lib/utils";

export function SidebarComponent({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  defaultOpen = true,
  open,
  onOpenChange,
  header,
  content,
  footer,
  style = {},
  className = "",
  ...props
}: SidebarComponentProps & { style?: React.CSSProperties; className?: string }) {
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = Icons[iconName as keyof typeof Icons] as
      | React.ComponentType<{ className?: string }>
      | undefined;
    return IconComponent && typeof IconComponent === "function" ? (
      <IconComponent className="h-4 w-4" />
    ) : null;
  };

  const renderMenuItem = (item: SidebarMenuItemType, index: number, groupIndex?: number) => {
    const MenuButton = item.href ? (
      <SidebarMenuButton asChild tooltip={item.tooltip} isActive={item.isActive}>
        <a href={item.href}>
          {renderIcon(item.icon)}
          <span>{item.label}</span>
        </a>
      </SidebarMenuButton>
    ) : (
      <SidebarMenuButton
        onClick={item.onClick ? createSimpleEventHandler(item.onClick) : undefined}
        tooltip={item.tooltip}
        isActive={item.isActive}
      >
        {renderIcon(item.icon)}
        <span>{item.label}</span>
        {item.subItems && <Icons.ChevronRightIcon className="ml-auto h-3 w-3" />}
      </SidebarMenuButton>
    );

    // Generate a unique key using label, href, or fallback to indices
    const itemKey = item.href ? `${item.label}-${item.href}` : `${groupIndex ?? 'ungrouped'}-${index}-${item.label}`;
    
    return (
      <SidebarMenuItem key={itemKey}>
        {MenuButton}
        {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
        {item.action && (
          <SidebarMenuAction
            showOnHover={item.action.showOnHover}
            onClick={
              item.action.onClick ? createSimpleEventHandler(item.action.onClick) : undefined
            }
          >
            {renderIcon(item.action.icon)}
          </SidebarMenuAction>
        )}
        {item.subItems && (
          <SidebarMenuSub>
            {item.subItems.map((subItem: SidebarSubMenuItem, subIndex: number) => (
              <SidebarMenuSubItem key={subIndex}>
                <SidebarMenuSubButton
                  asChild={!!subItem.href}
                  isActive={subItem.isActive}
                  onClick={subItem.onClick ? createSimpleEventHandler(subItem.onClick) : undefined}
                >
                  {subItem.href ? <a href={subItem.href}>{subItem.label}</a> : subItem.label}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  };

  const renderSection = (section?: SidebarSection) => {
    if (!section?.children) return null;

    return section.children.map((child, index) => {
      // Type guard for SidebarMenu
      if ("items" in child && Array.isArray(child.items)) {
        const menu = child as SidebarMenuType;
        return (
          <SidebarMenu key={index}>
            {menu.items.map((item: SidebarMenuItemType, itemIndex: number) =>
              renderMenuItem(item, itemIndex, index)
            )}
          </SidebarMenu>
        );
      }
      // Type guard for SidebarInput
      else if ("type" in child && child.type === "search") {
        const input = child as SidebarInputType;
        return (
          <SidebarInput
            key={index}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange ? createSimpleEventHandler(input.onChange) : undefined}
          />
        );
      }
      // Handle ComponentSpec
      else {
        const component = child as ComponentSpec;
        return <div key={index}>{render(component)}</div>;
      }
    });
  };

  const renderContent = () => {
    if (!content?.groups) return null;

    return content.groups.map((group, groupIndex) => (
      <React.Fragment key={groupIndex}>
        {groupIndex > 0 && <SidebarSeparator />}
        <SidebarGroup>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          {group.action && (
            <SidebarGroupAction
              onClick={
                group.action?.onClick ? createSimpleEventHandler(group.action.onClick) : undefined
              }
            >
              {renderIcon(group.action.icon)}
            </SidebarGroupAction>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item, index) => renderMenuItem(item, index, groupIndex))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </React.Fragment>
    ));
  };

  const { type, id, dataAttributes, visible, events, ...sidebarProps } = props;
  const cleanProps = cleanDOMProps(sidebarProps);

  return (
    <SidebarProvider defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <Sidebar
        side={side}
        variant={variant}
        collapsible={collapsible}
        style={style}
        className={className}
        {...cleanProps}
      >
        {header && <SidebarHeader>{renderSection(header)}</SidebarHeader>}
        {content && <SidebarContent>{renderContent()}</SidebarContent>}
        {footer && <SidebarFooter>{renderSection(footer)}</SidebarFooter>}
      </Sidebar>
    </SidebarProvider>
  );
}
