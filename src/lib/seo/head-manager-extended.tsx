import React from "react";
import { HeadManager, type HeadManagerProps } from "@/components/ui/head-manager/head-manager";
import { useStructuredData } from "./use-structured-data";
import type { StructuredDataSchema } from "./structured-data";

export interface ExtendedHeadManagerProps extends HeadManagerProps {
  readonly structuredData?: StructuredDataSchema | StructuredDataSchema[];
}

export function ExtendedHeadManager({
  structuredData,
  ...headManagerProps
}: Readonly<ExtendedHeadManagerProps>): React.JSX.Element {
  useStructuredData(structuredData);

  return <HeadManager {...headManagerProps} />;
}
