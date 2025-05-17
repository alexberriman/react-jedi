import React from "react";
import { usePageMetadata, type PageMetadata } from "@/lib/utils/meta";
import { type BaseComponentProps } from "@/types/schema/base";

export interface HeadManagerProps extends BaseComponentProps {
  readonly metadata: PageMetadata;
  readonly titleSuffix?: string;
  readonly defaultTitle?: string;
}

export function HeadManager({
  metadata,
  titleSuffix,
  defaultTitle,
  children,
}: Readonly<HeadManagerProps>): React.JSX.Element {
  usePageMetadata(metadata, { titleSuffix, defaultTitle });

  return <>{children}</>;
}
