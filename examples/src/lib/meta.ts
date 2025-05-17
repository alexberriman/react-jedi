import { useEffect } from "react";

export interface PageMetadata {
  title: string;
  description?: string;
}

const DEFAULT_TITLE = "React Jedi - Server-Driven UI";
const TITLE_SUFFIX = " - React Jedi";

export function setPageMetadata({ title, description }: PageMetadata): void {
  // Set title
  const fullTitle = title === DEFAULT_TITLE ? title : `${title}${TITLE_SUFFIX}`;
  document.title = fullTitle;

  // Set or update meta description
  if (description) {
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.append(metaDescription);
    }
    metaDescription.content = description;
  }
}

export function usePageMetadata(metadata: PageMetadata): void {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    )?.content;

    setPageMetadata(metadata);

    // Cleanup on unmount
    return () => {
      document.title = previousTitle;
      const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (metaDescription && previousDescription !== undefined) {
        metaDescription.content = previousDescription;
      }
    };
  }, [metadata.title, metadata.description]);
}
