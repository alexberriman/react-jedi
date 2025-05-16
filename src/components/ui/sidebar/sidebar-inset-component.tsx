import React from "react";
import { SidebarInset } from "./sidebar";
import type { BaseComponentSpec } from "@/types/components/base";
import { render } from "@/lib";

import type { ComponentSpec } from "@/types/schema/components";

export interface SidebarInsetComponentProps extends BaseComponentSpec {
  type: "sidebar-inset";
  header?: React.ReactNode | ComponentSpec;
  children?: ComponentSpec[];
}

export function SidebarInsetComponent({
  header,
  children,
  style = {},
  className = "",
  ...props
}: SidebarInsetComponentProps & { style?: React.CSSProperties; className?: string }) {
  return (
    <SidebarInset style={style} className={className} {...props}>
      {header && (
        <header className="flex items-center gap-2 p-4 border-b">
          {(() => {
            if (typeof header === "string") {
              return <h1 className="font-semibold">{header}</h1>;
            }
            if (header && typeof header === "object" && "type" in header) {
              return render(header as ComponentSpec);
            }
            return <>{header}</>;
          })()}
        </header>
      )}
      {children && (
        <main className="p-4">
          {children.map((child, index) => (
            <div key={index}>{child && render(child)}</div>
          ))}
        </main>
      )}
    </SidebarInset>
  );
}
