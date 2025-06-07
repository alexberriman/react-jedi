import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { render } from "../../../lib/render";
import type { ComponentSpec } from "../../../types/schema/components";

const meta = {
  title: "Components/Sheet/SDUI",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SDUIWithHandlers: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const sheetSpec: ComponentSpec = {
      type: "Sheet",
      open: isOpen,
      onOpenChangeAction: "handleSheetOpenChange",
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline",
            children: "Open Sheet (SDUI)",
          },
        },
        {
          type: "SheetContent",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  children: "SDUI Sheet Title",
                },
                {
                  type: "SheetDescription",
                  children: "This sheet is rendered using SDUI with event handlers.",
                },
              ],
            },
            {
              type: "Text",
              children: "Sheet content rendered via SDUI specification.",
            },
            {
              type: "Flex",
              direction: "column",
              gap: 2,
              className: "mt-4",
              children: [
                {
                  type: "Text",
                  className: "text-sm text-muted-foreground",
                  children: `Sheet is ${isOpen ? "open" : "closed"}`,
                },
                {
                  type: "Button",
                  onClickAction: "handleCloseSheet",
                  variant: "secondary",
                  children: "Close via Button",
                },
              ],
            },
          ],
        },
      ],
    };

    const handlers: Record<string, (...args: unknown[]) => unknown> = {
      handleSheetOpenChange: (open: unknown) => {
        console.log("Sheet open state changed to:", open);
        setIsOpen(open as boolean);
      },
      handleCloseSheet: () => {
        console.log("Close button clicked");
        setIsOpen(false);
      },
    };

    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          Sheet state: {isOpen ? "Open" : "Closed"}
        </p>
        {render(sheetSpec, { handlers })}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Check that the trigger button is rendered
    const trigger = canvas.getByRole("button", { name: "Open Sheet (SDUI)" });
    expect(trigger).toBeInTheDocument();

    // Click to open the sheet
    await user.click(trigger);

    // Wait for sheet to open
    await waitFor(() => {
      expect(within(document.body).getByText("SDUI Sheet Title")).toBeInTheDocument();
    });

    // Verify content is displayed
    expect(within(document.body).getByText(/This sheet is rendered using SDUI/)).toBeInTheDocument();
    expect(within(document.body).getByText("Sheet content rendered via SDUI specification.")).toBeInTheDocument();

    // Test the custom close button
    const closeButton = within(document.body).getByRole("button", { name: "Close via Button" });
    await user.click(closeButton);

    // Verify sheet is closed
    await waitFor(() => {
      expect(within(document.body).queryByText("SDUI Sheet Title")).not.toBeInTheDocument();
    });
  },
};

export const SDUIUncontrolled: Story = {
  render: () => {
    const sheetSpec: ComponentSpec = {
      type: "Sheet",
      defaultOpen: false,
      children: [
        {
          type: "SheetTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Open Uncontrolled Sheet",
          },
        },
        {
          type: "SheetContent",
          side: "right",
          children: [
            {
              type: "SheetHeader",
              children: [
                {
                  type: "SheetTitle",
                  children: "Uncontrolled Sheet",
                },
                {
                  type: "SheetDescription",
                  children: "This sheet manages its own state internally.",
                },
              ],
            },
            {
              type: "Text",
              children: "The sheet state is managed internally without external handlers.",
            },
          ],
        },
      ],
    };

    return (
      <div className="min-h-[400px] flex items-center justify-center">
        {render(sheetSpec)}
      </div>
    );
  },
};