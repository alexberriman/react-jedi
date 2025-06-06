import React from "react";
import { BreadcrumbProps, BreadcrumbItemSpec } from "@/types/components/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";
import { ChevronRight, Slash } from "lucide-react";
import { isIconReference, transformIconReference } from "@/lib/icons";

/**
 * Breadcrumb component for JSON specification rendering
 * Maps the JSON specification to the actual shadcn breadcrumb component
 */
export function BreadcrumbComponent(props: Readonly<Record<string, unknown>>) {
  const breadcrumbProps = props as BreadcrumbProps;
  const { items = [], separator, ariaLabel } = breadcrumbProps;
  const separatorMap: Record<string, React.JSX.Element> = {
    chevron: <ChevronRight className="h-4 w-4" />,
    slash: <Slash className="h-4 w-4" />,
    // Default is chevron if not specified
  };

  const getSeparatorContent = (): React.JSX.Element => {
    if (!separator) {
      return <ChevronRight className="h-4 w-4" />;
    }

    if (separator in separatorMap) {
      return separatorMap[separator];
    }

    return <>{separator}</>;
  };

  return (
    <Breadcrumb aria-label={ariaLabel}>
      <BreadcrumbList>
        {items.map((item: BreadcrumbItemSpec, index: number) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {(() => {
                // Handle ellipsis case
                if (item.isEllipsis) {
                  return <BreadcrumbEllipsis />;
                }
                
                // Render icon if present
                const renderIcon = () => {
                  if (!item.icon) return null;
                  
                  // If it's an icon reference object, transform it
                  if (isIconReference(item.icon)) {
                    return transformIconReference(item.icon);
                  }
                  
                  // Otherwise render as is (for backwards compatibility)
                  return <span className="mr-1">{item.icon}</span>;
                };
                
                if (item.isCurrentPage) {
                  return (
                    <BreadcrumbPage>
                      {renderIcon()}
                      {item.label}
                    </BreadcrumbPage>
                  );
                }
                if (item.href) {
                  return (
                    <BreadcrumbLink href={item.href} className={item.icon ? "flex items-center gap-1" : undefined}>
                      {renderIcon()}
                      {item.label && <span>{item.label}</span>}
                    </BreadcrumbLink>
                  );
                }
                return (
                  <span className={item.icon ? "flex items-center gap-1" : undefined}>
                    {renderIcon()}
                    {item.label && <span>{item.label}</span>}
                  </span>
                );
              })()}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>{getSeparatorContent()}</BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
