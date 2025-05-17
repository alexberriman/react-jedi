import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return {
    scrollToSection,
    scrollToTop,
    scrollToBottom,
  };
}
