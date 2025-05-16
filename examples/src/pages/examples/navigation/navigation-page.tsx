import React from "react";
import { UISpecification } from "@banja/react-jedi";
import { render } from "@banja/react-jedi";

const breadcrumbSpec: UISpecification = {
  version: "1.0.0",
  metadata: {
    title: "Navigation Components",
    description: "Showcase of navigation components including breadcrumbs",
  },
  root: {
    type: "Container",
    children: [
      {
        type: "Heading",
        level: 1,
        children: ["Navigation Components"],
        className: "mb-4 text-3xl font-bold",
      },
      {
        type: "Text",
        children: ["Various navigation components for building interactive user interfaces."],
        className: "mb-8 text-gray-600",
      },
      {
        type: "Heading",
        level: 2,
        children: ["Breadcrumb Navigation"],
        className: "mb-4 text-xl font-bold",
      },
      {
        type: "Box",
        className: "space-y-6",
        children: [
          {
            type: "Box",
            className: "p-4 border rounded-lg",
            children: [
              {
                type: "Text",
                children: ["Default Breadcrumb"],
                className: "mb-2 font-semibold",
              },
              {
                type: "breadcrumb",
                items: [
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: "Electronics", href: "/products/electronics" },
                  { label: "Phones", isCurrentPage: true },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "p-4 border rounded-lg",
            children: [
              {
                type: "Text",
                children: ["With Icons"],
                className: "mb-2 font-semibold",
              },
              {
                type: "breadcrumb",
                items: [
                  { label: "Dashboard", href: "/", icon: "🏠" },
                  { label: "Projects", href: "/projects", icon: "📁" },
                  { label: "React Jedi", href: "/projects/react-jedi", icon: "⚛️" },
                  { label: "Settings", isCurrentPage: true, icon: "⚙️" },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "p-4 border rounded-lg",
            children: [
              {
                type: "Text",
                children: ["Custom Separator (Slash)"],
                className: "mb-2 font-semibold",
              },
              {
                type: "breadcrumb",
                separator: "slash",
                items: [
                  { label: "Home", href: "/" },
                  { label: "Documentation", href: "/docs" },
                  { label: "Components", href: "/docs/components" },
                  { label: "Breadcrumb", isCurrentPage: true },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "p-4 border rounded-lg",
            children: [
              {
                type: "Text",
                children: ["No Links (Text Only)"],
                className: "mb-2 font-semibold",
              },
              {
                type: "breadcrumb",
                items: [
                  { label: "Level 1" },
                  { label: "Level 2" },
                  { label: "Level 3" },
                  { label: "Current Page", isCurrentPage: true },
                ],
              },
            ],
          },
          {
            type: "Box",
            className: "p-4 border rounded-lg",
            children: [
              {
                type: "Text",
                children: ["Custom Text Separator"],
                className: "mb-2 font-semibold",
              },
              {
                type: "breadcrumb",
                separator: "→",
                items: [
                  { label: "Start", href: "/" },
                  { label: "Middle", href: "/middle" },
                  { label: "End", isCurrentPage: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export function NavigationPage() {
  return render(breadcrumbSpec);
}
