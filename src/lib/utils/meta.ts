import { useEffect } from "react";

export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  favicon?: string | FaviconSet;
}

export interface FaviconSet {
  default?: string;
  apple?: string;
  icon16?: string;
  icon32?: string;
  manifest?: string;
}

export interface MetaOptions {
  titleSuffix?: string;
  defaultTitle?: string;
}

const DEFAULT_OPTIONS: MetaOptions = {
  titleSuffix: "",
  defaultTitle: "React Application",
};

function createOrUpdateMetaTag(selector: string, attribute: string, value: string): void {
  let metaTag = document.querySelector<HTMLMetaElement>(selector);

  if (!metaTag) {
    metaTag = document.createElement("meta");
    const [attrName, attrValue] = selector.replace("meta[", "").replace("]", "").split('="');
    metaTag.setAttribute(attrName, attrValue.replace('"', ""));
    document.head.append(metaTag);
  }

  if (value) {
    metaTag.setAttribute(attribute, value);
  }
}

function setMetaTitle(metadata: PageMetadata, options: MetaOptions): void {
  const { titleSuffix = "", defaultTitle = "React Application" } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const title = metadata.title || defaultTitle;
  const fullTitle = title === defaultTitle ? title : `${title}${titleSuffix}`;
  document.title = fullTitle;
}

function setStandardMeta(metadata: PageMetadata): void {
  if (metadata.description) {
    createOrUpdateMetaTag('meta[name="description"]', "content", metadata.description);
  }

  if (metadata.keywords?.length) {
    createOrUpdateMetaTag('meta[name="keywords"]', "content", metadata.keywords.join(", "));
  }

  if (metadata.author) {
    createOrUpdateMetaTag('meta[name="author"]', "content", metadata.author);
  }
}

function setOpenGraphMeta(metadata: PageMetadata): void {
  if (metadata.ogTitle) {
    createOrUpdateMetaTag('meta[property="og:title"]', "content", metadata.ogTitle);
  }

  if (metadata.ogDescription) {
    createOrUpdateMetaTag('meta[property="og:description"]', "content", metadata.ogDescription);
  }

  if (metadata.ogImage) {
    createOrUpdateMetaTag('meta[property="og:image"]', "content", metadata.ogImage);
  }
}

function setTwitterCardMeta(metadata: PageMetadata): void {
  if (metadata.twitterCard) {
    createOrUpdateMetaTag('meta[name="twitter:card"]', "content", metadata.twitterCard);
  }

  if (metadata.twitterTitle) {
    createOrUpdateMetaTag('meta[name="twitter:title"]', "content", metadata.twitterTitle);
  }

  if (metadata.twitterDescription) {
    createOrUpdateMetaTag(
      'meta[name="twitter:description"]',
      "content",
      metadata.twitterDescription
    );
  }

  if (metadata.twitterImage) {
    createOrUpdateMetaTag('meta[name="twitter:image"]', "content", metadata.twitterImage);
  }
}

function setCanonicalUrl(metadata: PageMetadata): void {
  if (!metadata.canonicalUrl) return;

  let linkTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!linkTag) {
    linkTag = document.createElement("link");
    linkTag.rel = "canonical";
    document.head.append(linkTag);
  }
  linkTag.href = metadata.canonicalUrl;
}

function createOrUpdateLinkTag(rel: string, sizes?: string): HTMLLinkElement {
  const selector = sizes ? `link[rel="${rel}"][sizes="${sizes}"]` : `link[rel="${rel}"]`;
  let linkTag = document.querySelector<HTMLLinkElement>(selector);

  if (!linkTag) {
    linkTag = document.createElement("link");
    linkTag.rel = rel;
    if (sizes) {
      linkTag.setAttribute("sizes", sizes);
    }
    document.head.append(linkTag);
  }

  return linkTag;
}

function setFaviconString(favicon: string): void {
  const faviconTag = createOrUpdateLinkTag("icon");
  faviconTag.href = favicon;
}

function setFaviconSet(faviconSet: FaviconSet): void {
  const { default: defaultIcon, apple, icon16, icon32, manifest } = faviconSet;

  if (defaultIcon) {
    const faviconTag = createOrUpdateLinkTag("icon");
    faviconTag.href = defaultIcon;
  }

  if (apple) {
    const appleTag = createOrUpdateLinkTag("apple-touch-icon");
    appleTag.href = apple;
  }

  if (icon16) {
    const icon16Tag = createOrUpdateLinkTag("icon", "16x16");
    icon16Tag.href = icon16;
  }

  if (icon32) {
    const icon32Tag = createOrUpdateLinkTag("icon", "32x32");
    icon32Tag.href = icon32;
  }

  if (manifest) {
    const manifestTag = createOrUpdateLinkTag("manifest");
    manifestTag.href = manifest;
  }
}

function setFavicon(metadata: PageMetadata): void {
  if (!metadata.favicon) return;

  if (typeof metadata.favicon === "string") {
    setFaviconString(metadata.favicon);
  } else {
    setFaviconSet(metadata.favicon);
  }
}

export function setPageMetadata(
  metadata: PageMetadata,
  options: MetaOptions = DEFAULT_OPTIONS
): void {
  setMetaTitle(metadata, options);
  setStandardMeta(metadata);
  setOpenGraphMeta(metadata);
  setTwitterCardMeta(metadata);
  setCanonicalUrl(metadata);
  setFavicon(metadata);
}

function restoreMetaTags(selectors: string[], previousValues: Record<string, string | null>): void {
  for (const selector of selectors) {
    const tag = document.querySelector<HTMLMetaElement>(selector);
    const previousValue = previousValues[selector];
    if (tag) {
      if (previousValue === null) {
        tag.remove();
      } else {
        tag.content = previousValue;
      }
    }
  }
}

function restoreCanonicalUrl(previousCanonical: string | undefined): void {
  const canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonicalTag) {
    if (previousCanonical) {
      canonicalTag.href = previousCanonical;
    } else {
      canonicalTag.remove();
    }
  }
}

function restoreLinks(selectors: string[], previousValues: Record<string, string | null>): void {
  for (const selector of selectors) {
    const tag = document.querySelector<HTMLLinkElement>(selector);
    const previousValue = previousValues[selector];
    if (tag) {
      if (previousValue === null) {
        tag.remove();
      } else {
        tag.href = previousValue;
      }
    }
  }
}

export function usePageMetadata(metadata: PageMetadata, options?: MetaOptions): void {
  useEffect(() => {
    // Store previous values
    const previousTitle = document.title;
    const previousMeta: Record<string, string | null> = {};
    const metaTags = [
      'meta[name="description"]',
      'meta[name="keywords"]',
      'meta[name="author"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:image"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
    ];

    for (const selector of metaTags) {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      previousMeta[selector] = tag?.content || null;
    }

    const previousCanonical =
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;

    // Store previous favicon values
    const previousFavicons: Record<string, string | null> = {};
    const faviconSelectors = [
      'link[rel="icon"]',
      'link[rel="apple-touch-icon"]',
      'link[rel="icon"][sizes="16x16"]',
      'link[rel="icon"][sizes="32x32"]',
      'link[rel="manifest"]',
    ];

    for (const selector of faviconSelectors) {
      const tag = document.querySelector<HTMLLinkElement>(selector);
      previousFavicons[selector] = tag?.href || null;
    }

    // Set new metadata
    setPageMetadata(metadata, options);

    // Cleanup on unmount
    return () => {
      document.title = previousTitle;
      restoreMetaTags(metaTags, previousMeta);
      restoreCanonicalUrl(previousCanonical);
      restoreLinks(faviconSelectors, previousFavicons);
    };
  }, [metadata, options]);
}
