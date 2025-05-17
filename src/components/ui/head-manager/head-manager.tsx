import React from "react";
import { usePageMetadata, type PageMetadata } from "@/lib/utils/meta";

export interface HeadManagerProps {
  readonly metadata: PageMetadata;
  readonly titleSuffix?: string;
  readonly defaultTitle?: string;
  readonly children?: React.ReactNode;
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
