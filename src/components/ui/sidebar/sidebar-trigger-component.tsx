import React from "react";
import { SidebarTrigger } from "./sidebar";
import type { BaseComponentSpec } from "../../../types/components/base";
import { createSimpleEventHandler } from "../../../lib/events/simple-handlers";
import { cleanDOMProps } from "../../../lib/utils";

export interface SidebarTriggerComponentProps extends BaseComponentSpec {
  type: "sidebar-trigger";
  onClick?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export function SidebarTriggerComponent({
  onClick,
  variant = "ghost",
  size = "icon",
  style = {},
  className = "",
  ...props
}: SidebarTriggerComponentProps & { style?: React.CSSProperties; className?: string }) {
  const { type, ...restProps } = props;
  const cleanProps = cleanDOMProps(restProps);

  return (
    <SidebarTrigger
      onClick={onClick ? createSimpleEventHandler(onClick) : undefined}
      variant={variant}
      size={size}
      style={style}
      className={className}
      {...cleanProps}
    />
  );
}
