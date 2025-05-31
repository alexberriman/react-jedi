const docSections = [
  { id: "getting-started", label: "Getting Started", path: "/documentation/getting-started" },
  { id: "component-system", label: "Component System", path: "/documentation/component-system" },
  { id: "layout-components", label: "Layout Components", path: "/documentation/layout-components" },
  { id: "typography", label: "Typography", path: "/documentation/typography" },
  { id: "ui-components", label: "UI Components", path: "/documentation/ui-components" },
  { id: "form-components", label: "Form Components", path: "/documentation/form-components" },
  { id: "theming", label: "Theming", path: "/documentation/theming" },
  { id: "state-management", label: "State Management", path: "/documentation/state-management" },
  { id: "complex-examples", label: "Complex Examples", path: "/documentation/complex-examples" },
  { id: "performance", label: "Performance", path: "/documentation/performance" },
];

export function getDocumentationNavigation(currentPath: string) {
  const currentIndex = docSections.findIndex(section => section.path === currentPath);
  
  if (currentIndex === -1) {
    return { prev: undefined, next: undefined };
  }

  const prev = currentIndex > 0 ? docSections[currentIndex - 1] : undefined;
  const next = currentIndex < docSections.length - 1 ? docSections[currentIndex + 1] : undefined;

  return { prev, next };
}