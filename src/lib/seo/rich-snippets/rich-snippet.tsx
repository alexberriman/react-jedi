/**
 * React component for rendering rich snippets
 */

import React from "react";
import { RichSnippet as RichSnippetType } from "./types";

interface RichSnippetProps {
  snippet: RichSnippetType | RichSnippetType[];
  id?: string;
}

/**
 * Component that renders structured data as JSON-LD script tag
 */
export const RichSnippet: React.FC<RichSnippetProps> = ({ snippet, id }) => {
  const scriptContent = Array.isArray(snippet)
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@graph": snippet,
      })
    : JSON.stringify(snippet);

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};

/**
 * Hook to generate rich snippet script content
 */
export function useRichSnippet(snippet: RichSnippetType | RichSnippetType[]): string {
  return React.useMemo(() => {
    if (Array.isArray(snippet)) {
      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": snippet,
      });
    }
    return JSON.stringify(snippet);
  }, [snippet]);
}

/**
 * Higher-order component that injects rich snippets
 */
export function withRichSnippet<P extends object>(
  Component: React.ComponentType<P>,
  snippetGenerator: (props: P) => RichSnippetType | RichSnippetType[] | null
): React.FC<P> {
  const WithRichSnippetComponent: React.FC<P> = (props: P) => {
    const snippet = snippetGenerator(props);

    return (
      <>
        {snippet && <RichSnippet snippet={snippet} />}
        <Component {...props} />
      </>
    );
  };

  WithRichSnippetComponent.displayName = `WithRichSnippet(${Component.displayName || Component.name || "Component"})`;

  return WithRichSnippetComponent;
}
