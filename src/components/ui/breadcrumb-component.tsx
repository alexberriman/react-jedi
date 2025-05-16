import React from "react";
import { BreadcrumbProps, BreadcrumbItemSpec } from "@/types/components/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { ChevronRight, Slash } from "lucide-react";

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
                if (item.isCurrentPage) {
                  return <BreadcrumbPage>{item.label}</BreadcrumbPage>;
                }
                if (item.href) {
                  return (
                    <BreadcrumbLink href={item.href}>
                      {item.icon && <span className="mr-1">{item.icon}</span>}
                      {item.label}
                    </BreadcrumbLink>
                  );
                }
                return <span>{item.label}</span>;
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
