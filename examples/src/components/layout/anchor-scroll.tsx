import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function AnchorScroll() {
  const location = useLocation();

  useEffect(() => {
    // Check if URL has a hash (anchor)
    if (location.hash) {
      const id = location.hash.slice(1); // Remove the #

      globalThis.setTimeout(() => {
        const element = document.querySelector(`#${id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });

          // Add a focus indication for accessibility
          element.classList.add("ring-2", "ring-primary", "ring-offset-2");
          globalThis.setTimeout(() => {
            element.classList.remove("ring-2", "ring-primary", "ring-offset-2");
          }, 2000);
        }
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [location]);

  return null;
}
