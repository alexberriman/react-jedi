import { useEffect } from "react";
import type { MicrodataSchema } from "./microdata";

/**
 * React hook for managing microdata on a page
 * Note: This is primarily for documentation and tracking purposes
 * as microdata is embedded directly in HTML elements
 */
export function useMicrodata(schema?: MicrodataSchema | MicrodataSchema[]): void {
  useEffect(() => {
    if (!schema) return;

    // For debugging/development purposes, we can log the microdata schemas
    if (process.env.NODE_ENV === "development") {
      const schemas = Array.isArray(schema) ? schema : [schema];
      console.group("Microdata schemas on page:");
      for (const s of schemas) {
        console.log(`${s.type}:`, s.properties);
      }
      console.groupEnd();
    }

    // Unlike JSON-LD, microdata doesn't require script injection
    // It's embedded directly in the HTML elements
    // This hook serves as documentation of what microdata is present
  }, [schema]);
}

/**
 * Hook to validate microdata structure during development
 */
export function useValidateMicrodata(): void {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Find all elements with itemscope
    const microdataElements = document.querySelectorAll("[itemscope]");

    const issues: string[] = [];

    for (const element of microdataElements) {
      // Check if itemtype is present
      if (!element.hasAttribute("itemtype")) {
        issues.push(`Element with itemscope missing itemtype: ${element.tagName}`);
      }

      // Check for orphaned itemprops (properties without a parent scope)
      const properties = element.querySelectorAll("[itemprop]");
      for (const prop of properties) {
        if (!prop.closest("[itemscope]")) {
          issues.push(
            `Orphaned itemprop "${prop.getAttribute("itemprop")}" without parent itemscope`
          );
        }
      }
    }

    // Check for properties without parent scope
    const allProperties = document.querySelectorAll("[itemprop]");
    for (const prop of allProperties) {
      if (!prop.closest("[itemscope]")) {
        issues.push(`itemprop "${prop.getAttribute("itemprop")}" not within any itemscope`);
      }
    }

    if (issues.length > 0) {
      console.warn("Microdata validation issues found:", issues);
    }
  }, []);
}
