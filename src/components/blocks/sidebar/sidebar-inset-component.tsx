import React from "react";
import { SidebarInset } from "./sidebar";
import type { BaseComponentSpec } from "../../../types/components/base";
import { cleanDOMProps } from "../../../lib/utils";

export interface SidebarInsetComponentProps extends BaseComponentSpec {
  type: "sidebar-inset";
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function SidebarInsetComponent({
  header,
  children,
  style = {},
  className = "",
  ...props
}: SidebarInsetComponentProps & { style?: React.CSSProperties; className?: string }) {
  return (
    <SidebarInset style={style} className={className} {...cleanDOMProps(props)}>
      {header && (
        <header className="flex items-center gap-2 p-4 border-b">
          {typeof header === "string" ? <h1 className="font-semibold">{header}</h1> : header}
        </header>
      )}
      {children && <main className="p-4">{children}</main>}
    </SidebarInset>
  );
}
