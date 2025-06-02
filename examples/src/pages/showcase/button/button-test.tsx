import { render } from "@alexberriman/react-jedi";
import { Button } from "@alexberriman/react-jedi";

export function ButtonTest() {
  const testSpec = {
    type: "Stack",
    spacing: "4",
    className: "p-8",
    children: [
      {
        type: "Heading",
        level: "h2",
        children: "Button Color Test"
      },
      {
        type: "Text",
        children: "Testing if button variants show correct colors:",
        className: "mb-4"
      },
      {
        type: "Group",
        spacing: "3",
        children: [
          { type: "Button", children: "Default", variant: "default" },
          { type: "Button", children: "Primary", variant: "primary" },
          { type: "Button", children: "Secondary", variant: "secondary" },
          { type: "Button", children: "Destructive", variant: "destructive" },
          { type: "Button", children: "Outline", variant: "outline" },
          { type: "Button", children: "Ghost", variant: "ghost" },
        ],
      },
      {
        type: "Text",
        children: "Direct React component usage:",
        className: "mt-6 mb-4"
      },
      {
        type: "Box",
        className: "flex gap-3",
        children: [
          <Button key="1" variant="default">Direct Default</Button>,
          <Button key="2" variant="primary">Direct Primary</Button>,
          <Button key="3" variant="secondary">Direct Secondary</Button>,
          <Button key="4" variant="destructive">Direct Destructive</Button>,
        ]
      },
      {
        type: "Text",
        children: "Testing CSS variables directly:",
        className: "mt-6 mb-4"
      },
      {
        type: "Box",
        className: "flex gap-3",
        children: [
          {
            type: "Box",
            element: "button",
            className: "px-4 py-2 rounded",
            style: { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" },
            children: "CSS Var Test"
          },
          {
            type: "Box",
            element: "div",
            className: "px-4 py-2 rounded bg-primary text-primary-foreground",
            children: "Tailwind Classes"
          }
        ]
      }
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {render(testSpec)}
    </div>
  );
}