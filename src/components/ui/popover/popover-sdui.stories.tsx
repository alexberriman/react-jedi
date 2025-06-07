import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { render } from "../../../lib/render";
import type { ComponentSpec } from "../../../types/schema/components";

const meta = {
  title: "Components/Popover/SDUI Tests",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Testing Popover component SDUI functionality with event handlers and controlled state.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Component to test controlled state
function ControlledPopoverTest() {
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = React.useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const spec: ComponentSpec = {
    type: "Popover",
    open,
    onOpenChange: "handleOpenChange",
    children: [
      {
        type: "PopoverTrigger",
        asChild: true,
        children: {
          type: "Button",
          children: "Controlled Popover",
        },
      },
      {
        type: "PopoverContent",
        children: {
          type: "Flex",
          direction: "column" as const,
          gap: "sm" as const,
          children: [
            {
              type: "Text",
              className: "font-semibold",
              children: "Controlled State",
            },
            {
              type: "Text",
              className: "text-sm text-muted-foreground",
              children: `Open: ${open}`,
            },
            {
              type: "Button",
              size: "sm" as const,
              variant: "secondary" as const,
              onClick: "closePopover",
              children: "Close",
            },
          ],
        },
      },
    ],
  };

  const handlers: Record<string, (...args: unknown[]) => unknown> = {
    handleOpenChange: (newOpen: unknown) => {
      addLog(`onOpenChange(${newOpen})`);
      setOpen(newOpen as boolean);
    },
    closePopover: () => {
      addLog("Close button clicked");
      setOpen(false);
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          onClick={() => {
            addLog("Open programmatically");
            setOpen(true);
          }}
        >
          Open
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          onClick={() => {
            addLog("Close programmatically");
            setOpen(false);
          }}
        >
          Close
        </button>
      </div>
      <div>{render(spec, { handlers })}</div>
      <div className="mt-4 p-2 bg-gray-100 rounded text-xs font-mono max-h-32 overflow-auto">
        {log.length === 0 ? (
          <div className="text-gray-500">Events will appear here...</div>
        ) : (
          log.map((entry, i) => <div key={i}>{entry}</div>)
        )}
      </div>
    </div>
  );
}

export const SDUIBasic: Story = {
  render: () => {
    const spec: ComponentSpec = {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "outline" as const,
            children: "Open Basic Popover",
          },
        },
        {
          type: "PopoverContent",
          children: {
            type: "Text",
            children: "This popover is rendered via SDUI!",
          },
        },
      ],
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic SDUI Popover</h3>
        {render(spec)}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-600">View Spec</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify(spec, null, 2)}
          </pre>
        </details>
      </div>
    );
  },
};

export const SDUIControlled: Story = {
  render: () => <ControlledPopoverTest />,
};

export const SDUIWithFormElements: Story = {
  render: () => {
    const [values, setValues] = React.useState({ width: "100%", height: "25px" });

    const spec: ComponentSpec = {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            variant: "secondary" as const,
            children: "Update Dimensions",
          },
        },
        {
          type: "PopoverContent",
          className: "w-80",
          children: {
            type: "Flex",
            direction: "column" as const,
            gap: "md" as const,
            children: [
              {
                type: "Flex",
                direction: "column" as const,
                gap: "sm" as const,
                children: [
                  {
                    type: "Heading",
                    level: "h4" as const,
                    className: "font-medium",
                    children: "Dimensions",
                  },
                  {
                    type: "Text",
                    className: "text-sm text-muted-foreground",
                    children: "Set the dimensions for the layer.",
                  },
                ],
              },
              {
                type: "Flex",
                direction: "column" as const,
                gap: "sm" as const,
                children: [
                  {
                    type: "Grid",
                    className: "grid-cols-3 items-center gap-4",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "width",
                        children: "Width",
                      },
                      {
                        type: "Input",
                        id: "width",
                        value: values.width,
                        onChange: "handleWidthChange",
                        className: "col-span-2 h-8",
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    className: "grid-cols-3 items-center gap-4",
                    children: [
                      {
                        type: "Label",
                        htmlFor: "height",
                        children: "Height",
                      },
                      {
                        type: "Input",
                        id: "height",
                        value: values.height,
                        onChange: "handleHeightChange",
                        className: "col-span-2 h-8",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Button",
                size: "sm" as const,
                onClick: "handleSave",
                className: "w-full",
                children: "Save Changes",
              },
            ],
          },
        },
      ],
    };

    const handlers: Record<string, (...args: unknown[]) => unknown> = {
      handleWidthChange: (e: unknown) => {
        const event = e as React.ChangeEvent<HTMLInputElement>;
        setValues((prev) => ({ ...prev, width: event.target.value }));
      },
      handleHeightChange: (e: unknown) => {
        const event = e as React.ChangeEvent<HTMLInputElement>;
        setValues((prev) => ({ ...prev, height: event.target.value }));
      },
      handleSave: () => {
        alert(`Saved: Width=${values.width}, Height=${values.height}`);
      },
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SDUI Popover with Form</h3>
        {render(spec, { handlers })}
        <div className="mt-4 p-2 bg-blue-50 rounded text-sm">
          Current values: Width={values.width}, Height={values.height}
        </div>
      </div>
    );
  },
};

export const SDUIPositioning: Story = {
  render: () => {
    const positions = ["top", "right", "bottom", "left"] as const;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SDUI Popover Positioning</h3>
        <div className="grid grid-cols-2 gap-8 p-8">
          {positions.map((position) => (
            <div key={position} className="flex justify-center">
              {render({
                type: "Popover",
                children: [
                  {
                    type: "PopoverTrigger",
                    asChild: true,
                    children: {
                      type: "Button",
                      variant: "outline" as const,
                      size: "sm" as const,
                      children: position.charAt(0).toUpperCase() + position.slice(1),
                    },
                  },
                  {
                    type: "PopoverContent",
                    side: position,
                    children: {
                      type: "Text",
                      className: "text-sm",
                      children: `${position} placement`,
                    },
                  },
                ],
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const SDUINestedPopovers: Story = {
  render: () => {
    const spec: ComponentSpec = {
      type: "Popover",
      children: [
        {
          type: "PopoverTrigger",
          asChild: true,
          children: {
            type: "Button",
            children: "Open First Popover",
          },
        },
        {
          type: "PopoverContent",
          children: {
            type: "Flex",
            direction: "column" as const,
            gap: "sm" as const,
            children: [
              {
                type: "Text",
                children: "This is the first popover",
              },
              {
                type: "Popover",
                children: [
                  {
                    type: "PopoverTrigger",
                    asChild: true,
                    children: {
                      type: "Button",
                      size: "sm" as const,
                      variant: "secondary" as const,
                      children: "Open Nested",
                    },
                  },
                  {
                    type: "PopoverContent",
                    side: "right" as const,
                    children: {
                      type: "Text",
                      className: "text-sm",
                      children: "This is a nested popover!",
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SDUI Nested Popovers</h3>
        {render(spec)}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-600">View Spec</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify(spec, null, 2)}
          </pre>
        </details>
      </div>
    );
  },
};