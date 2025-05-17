import { useEffect } from "react";
import {
  type StructuredDataSchema,
  addJsonLdToDocument,
  removeJsonLdFromDocument,
} from "./structured-data";

export function useStructuredData(
  schema: StructuredDataSchema | StructuredDataSchema[] | undefined
): void {
  useEffect(() => {
    if (!schema) return;

    const schemas = Array.isArray(schema) ? schema : [schema];

    // Add each schema to the document
    for (const s of schemas) addJsonLdToDocument(s);

    // Cleanup on unmount or schema change
    return () => {
      removeJsonLdFromDocument();
    };
  }, [schema]);
}
