import React from "react";
import * as UI from "./navigation-menu";
import type { NavigationMenuComponent, NavigationItemSpec, NavigationLinkSpec } from "../../../types/components/navigation-menu";
import { cn } from "../../../lib/utils";

/**
 * Wrapper component for NavigationMenu that handles JSON specification rendering
 */
export function NavigationMenuWrapper(props: { readonly spec: NavigationMenuComponent }) {
  const { items, orientation, delayDuration, skipDelayDuration, viewport = true, className, id } = props.spec;

  // Helper to render a navigation link
  const renderLink = (link: NavigationLinkSpec, key: string) => {
    return (
      <UI.NavigationMenuLink asChild key={key}>
        <a 
          href={link.href}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
          )}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          <div className="text-sm font-medium leading-none">{link.title}</div>
          {link.description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {link.description}
            </p>
          )}
        </a>
      </UI.NavigationMenuLink>
    );
  };

  // Helper to render navigation items
  const renderItem = (item: NavigationItemSpec, index: number) => {
    const key = `nav-item-${index}`;

    // Simple link item (no dropdown)
    if (item.href && !item.content) {
      return (
        <UI.NavigationMenuItem key={key}>
          <UI.NavigationMenuLink
            href={item.href}
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            {item.trigger.label}
          </UI.NavigationMenuLink>
        </UI.NavigationMenuItem>
      );
    }

    // Dropdown item
    if (item.content && 'items' in item.content) {
      const contentWidthClasses: Record<string, string> = {
        sm: "w-[300px]",
        md: "w-[400px]",
        lg: "w-[500px]",
        xl: "w-[600px]",
        "2xl": "w-[700px]",
        full: "w-full"
      };

      const widthClass = item.content.width ? contentWidthClasses[item.content.width] || "w-[400px]" : "w-[400px]";

      return (
        <UI.NavigationMenuItem key={key}>
          <UI.NavigationMenuTrigger>{item.trigger.label}</UI.NavigationMenuTrigger>
          <UI.NavigationMenuContent>
            <ul className={cn("grid gap-3 p-4", widthClass, 
              item.content.items.length > 3 ? "md:grid-cols-2" : ""
            )}>
              {item.content.items.map((contentItem, contentIndex) => {
                const contentKey = `${key}-content-${contentIndex}`;
                
                // Check if it's a NavigationLinkSpec
                if ('href' in contentItem) {
                  return (
                    <li key={contentKey}>
                      {renderLink(contentItem as NavigationLinkSpec, contentKey)}
                    </li>
                  );
                }

                // For now, we only support NavigationLinkSpec in the wrapper
                // More complex types (sections, features) can be added later
                return null;
              })}
            </ul>
          </UI.NavigationMenuContent>
        </UI.NavigationMenuItem>
      );
    }

    return null;
  };

  return (
    <UI.NavigationMenu 
      className={className}
      orientation={orientation}
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      viewport={viewport}
      data-testid={id}
    >
      <UI.NavigationMenuList>
        {items.map((item, index) => renderItem(item, index))}
      </UI.NavigationMenuList>
    </UI.NavigationMenu>
  );
}