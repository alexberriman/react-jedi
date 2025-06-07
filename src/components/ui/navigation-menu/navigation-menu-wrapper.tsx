import React from "react";
import * as UI from "./navigation-menu";
import type { NavigationMenuComponent, NavigationItemSpec, NavigationLinkSpec } from "../../../types/components/navigation-menu";
import { cn } from "../../../lib/utils";
import { Badge } from "../badge";
import { SDUIIcon, transformIconReference, isIconReference } from "../../../lib/icons/sdui-icon";

/**
 * Wrapper component for NavigationMenu that handles JSON specification rendering
 */
export function NavigationMenuWrapper(props: { readonly spec: NavigationMenuComponent }) {
  const { items, orientation, delayDuration, skipDelayDuration, viewport = true, className, id } = props.spec;

  // Helper to render icon
  const renderIcon = (icon: string | { type: string; name: string; [key: string]: unknown } | undefined, size = 16) => {
    if (!icon) return null;
    
    if (typeof icon === "string") {
      return <SDUIIcon name={icon} size={size} />;
    }
    
    if (isIconReference(icon)) {
      return transformIconReference(icon);
    }
    
    return null;
  };

  // Helper to render badge
  const renderBadge = (badge: { type: string; variant?: string; className?: string; children: string; [key: string]: unknown } | undefined) => {
    if (!badge) return null;
    
    return (
      <Badge 
        variant={badge.variant as "default" | "secondary" | "destructive" | "outline"}
        className={badge.className}
      >
        {badge.children}
      </Badge>
    );
  };

  // Helper to render a navigation link
  const renderLink = (link: NavigationLinkSpec, key: string, isFeature = false) => {
    const iconElement = renderIcon(link.icon, isFeature ? 32 : 16);
    
    return (
      <UI.NavigationMenuLink asChild key={key}>
        <a 
          href={link.href}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            isFeature && "flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/5 to-primary/10 p-6 hover:from-primary/10 hover:to-primary/15 focus:shadow-md"
          )}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          {iconElement && isFeature && (
            <div className="mb-2 text-4xl">{iconElement}</div>
          )}
          <div className={cn(
            "text-sm font-medium leading-none",
            isFeature && "text-lg font-medium mb-2"
          )}>
            {iconElement && !isFeature && <span className="mr-2">{iconElement}</span>}
            {link.title}
          </div>
          {link.description && (
            <p className={cn(
              "line-clamp-2 text-sm leading-snug text-muted-foreground",
              isFeature ? "leading-tight" : "mt-1"
            )}>
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
    const badge = renderBadge(item.trigger.badge);

    // Simple link item (no dropdown)
    if (item.href && !item.content) {
      return (
        <UI.NavigationMenuItem key={key}>
          <UI.NavigationMenuLink
            href={item.href}
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 outline-none no-underline"
            )}
          >
            {item.trigger.label}
            {badge}
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
      const items = item.content.items;
      
      // Check if first item should be featured (has icon and larger size)
      const firstItem = items[0];
      const hasFeatureItem = firstItem && 'href' in firstItem && Boolean(firstItem.icon);

      return (
        <UI.NavigationMenuItem key={key}>
          <UI.NavigationMenuTrigger className="gap-1">
            {item.trigger.label}
            {badge}
          </UI.NavigationMenuTrigger>
          <UI.NavigationMenuContent>
            <ul className={cn(
              "grid gap-3 p-4", 
              widthClass,
              (() => {
                if (hasFeatureItem && items.length > 1) {
                  return "lg:grid-cols-[.75fr_1fr]";
                }
                if (items.length > 3) {
                  return "md:grid-cols-2";
                }
                return "";
              })()
            )}>
              {items.map((contentItem, contentIndex) => {
                const contentKey = `${key}-content-${contentIndex}`;
                
                // Check if it's a NavigationLinkSpec
                if ('href' in contentItem) {
                  const linkSpec = contentItem as NavigationLinkSpec;
                  const isFirstWithIcon = contentIndex === 0 && hasFeatureItem;
                  
                  return (
                    <li key={contentKey} className={isFirstWithIcon ? "row-span-3" : ""}>
                      {renderLink(linkSpec, contentKey, isFirstWithIcon)}
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
      className={cn("mx-auto", className)}
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