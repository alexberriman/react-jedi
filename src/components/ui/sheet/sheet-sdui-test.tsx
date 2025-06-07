import React from "react";
import { render } from "../../../lib/render";

export function SheetSDUITest() {
  const [isOpen, setIsOpen] = React.useState(false);

  const sheetSpec = {
    type: "Sheet",
    open: isOpen,
    onOpenChange: (open: boolean) => {
      console.log("onOpenChange called with:", open);
      setIsOpen(open);
    },
    children: [
      {
        type: "SheetTrigger",
        asChild: true,
        children: {
          type: "Button",
          variant: "outline",
          children: "Open Sheet - SDUI Test"
        }
      },
      {
        type: "SheetContent",
        children: [
          {
            type: "SheetHeader",
            children: [
              {
                type: "SheetTitle",
                children: "Test Sheet"
              },
              {
                type: "SheetDescription",
                children: "Testing SDUI mode event handling"
              }
            ]
          },
          {
            type: "Text",
            children: "Sheet is now open!"
          }
        ]
      }
    ]
  };

  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold mb-4">Sheet SDUI Test</h2>
      <div className="mb-4">
        <p>Sheet open state: {isOpen ? "Open" : "Closed"}</p>
      </div>
      {render(sheetSpec)}
    </div>
  );
}