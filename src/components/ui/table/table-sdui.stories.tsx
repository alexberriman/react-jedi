import type { Meta, StoryObj } from "@storybook/react-vite";
import { render } from "../../../lib/render";
import type { UISpecification } from "../../../types/schema/specification";

const meta: Meta = {
  title: "ui/Table/SDUI",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

// Story showing all table variants in SDUI mode
export const AllVariants: Story = {
  render: () => {
    const tableData = {
      head: {
        rows: [
          {
            cells: [
              { content: "Name", align: "left" as const },
              { content: "Role", align: "left" as const },
              { content: "Status", align: "center" as const },
              { content: "Salary", align: "right" as const },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              { content: "John Doe" },
              { content: "Software Engineer" },
              { content: "Active", align: "center" as const },
              { content: "$120,000", align: "right" as const },
            ],
          },
          {
            cells: [
              { content: "Jane Smith" },
              { content: "Product Manager" },
              { content: "Active", align: "center" as const },
              { content: "$140,000", align: "right" as const },
            ],
          },
          {
            cells: [
              { content: "Bob Johnson" },
              { content: "Designer" },
              { content: "On Leave", align: "center" as const },
              { content: "$100,000", align: "right" as const },
            ],
          },
        ],
      },
      footer: {
        rows: [
          {
            cells: [
              { content: "Total", className: "font-bold" },
              { content: "", colSpan: 2 },
              { content: "$360,000", align: "right" as const, className: "font-bold" },
            ],
          },
        ],
      },
    };

    const variants = [
      { variant: "default", title: "Default Table" },
      { variant: "striped", title: "Striped Table" },
      { variant: "bordered", title: "Bordered Table" },
      { variant: "minimal", title: "Minimal Table" },
      { variant: "compact", title: "Compact Table" },
      { variant: "modern", title: "Modern Table" },
    ] as const;

    const specification: UISpecification = {
      version: "1.0",
      root: {
        type: "Stack",
        direction: "column",
        spacing: "lg",
        children: variants.map(({ variant, title }) => ({
          type: "Box",
          children: [
            {
              type: "Heading",
              level: "h3" as const,
              children: title,
              className: "mb-4",
            },
            {
              type: "Table",
              variant,
              caption: `Example of ${variant} table variant`,
              ...tableData,
            },
          ],
        })),
      },
    };

    return <div className="w-full max-w-4xl p-6">{render(specification)}</div>;
  },
};

// Story showing sticky header functionality
export const StickyHeader: Story = {
  render: () => {
    const specification: UISpecification = {
      version: "1.0",
      root: {
        type: "Box",
        className: "h-[400px] overflow-y-auto border rounded-lg",
        children: {
          type: "Table",
          variant: "modern",
          stickyHeader: true,
          caption: "Table with sticky header - scroll to see effect",
          head: {
            rows: [
              {
                cells: [
                  { content: "Product", className: "font-semibold" },
                  { content: "Category", className: "font-semibold" },
                  { content: "Price", align: "right" as const, className: "font-semibold" },
                  { content: "Stock", align: "center" as const, className: "font-semibold" },
                ],
              },
            ],
          },
          body: {
            rows: Array.from({ length: 20 }, (_, i) => ({
              cells: [
                { content: `Product ${i + 1}` },
                { content: ["Electronics", "Clothing", "Home", "Sports"][i % 4] },
                { content: `$${(i + 1) * 49.99}`, align: "right" as const },
                { content: `${(i + 1) * 5}`, align: "center" as const },
              ],
            })),
          },
        },
      },
    };

    return <div className="w-full max-w-4xl p-6">{render(specification)}</div>;
  },
};

// Story showing hoverable prop functionality
export const HoverableToggle: Story = {
  render: () => {
    const tableData = {
      head: {
        rows: [
          {
            cells: [
              { content: "Feature" },
              { content: "Description" },
              { content: "Status" },
            ],
          },
        ],
      },
      body: {
        rows: [
          {
            cells: [
              { content: "Auto-save" },
              { content: "Automatically saves your work" },
              { content: "Enabled" },
            ],
          },
          {
            cells: [
              { content: "Dark mode" },
              { content: "Switch between light and dark themes" },
              { content: "Enabled" },
            ],
          },
          {
            cells: [
              { content: "Notifications" },
              { content: "Get notified about important updates" },
              { content: "Disabled" },
            ],
          },
        ],
      },
    };

    const specification: UISpecification = {
      version: "1.0",
      root: {
        type: "Stack",
        direction: "column",
        spacing: "lg",
        children: [
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h3" as const,
                children: "Hoverable Table (default)",
                className: "mb-4",
              },
              {
                type: "Table",
                variant: "modern",
                hoverable: true,
                ...tableData,
              },
            ],
          },
          {
            type: "Box",
            children: [
              {
                type: "Heading",
                level: "h3" as const,
                children: "Non-hoverable Table",
                className: "mb-4",
              },
              {
                type: "Table",
                variant: "modern",
                hoverable: false,
                ...tableData,
              },
            ],
          },
        ],
      },
    };

    return <div className="w-full max-w-4xl p-6">{render(specification)}</div>;
  },
};

// Story showing nested components in table cells
export const NestedComponents: Story = {
  render: () => {
    const specification: UISpecification = {
      version: "1.0",
      root: {
        type: "Table",
        variant: "striped",
        caption: "Table with nested components in cells",
        head: {
          rows: [
            {
              cells: [
                { content: "User" },
                { content: "Status" },
                { content: "Actions" },
              ],
            },
          ],
        },
        body: {
          rows: [
            {
              cells: [
                {
                  content: {
                    type: "Flex",
                    align: "center",
                    gap: "sm",
                    children: [
                      {
                        type: "Avatar",
                        children: [
                          {
                            type: "AvatarImage",
                            src: "https://picsum.photos/32/32?random=1",
                            alt: "User 1",
                          },
                          {
                            type: "AvatarFallback",
                            children: "JD",
                          },
                        ],
                      },
                      {
                        type: "Text",
                        children: "John Doe",
                        className: "font-medium",
                      },
                    ],
                  },
                },
                {
                  content: {
                    type: "Badge",
                    variant: "outline",
                    className: "text-green-600 border-green-600",
                    children: "Active",
                  },
                },
                {
                  content: {
                    type: "Flex",
                    gap: "xs",
                    children: [
                      {
                        type: "Button",
                        variant: "ghost",
                        size: "sm",
                        children: "Edit",
                      },
                      {
                        type: "Button",
                        variant: "ghost",
                        size: "sm",
                        className: "text-destructive",
                        children: "Delete",
                      },
                    ],
                  },
                },
              ],
            },
            {
              cells: [
                {
                  content: {
                    type: "Flex",
                    align: "center",
                    gap: "sm",
                    children: [
                      {
                        type: "Avatar",
                        children: [
                          {
                            type: "AvatarImage",
                            src: "https://picsum.photos/32/32?random=2",
                            alt: "User 2",
                          },
                          {
                            type: "AvatarFallback",
                            children: "JS",
                          },
                        ],
                      },
                      {
                        type: "Text",
                        children: "Jane Smith",
                        className: "font-medium",
                      },
                    ],
                  },
                },
                {
                  content: {
                    type: "Badge",
                    variant: "outline",
                    className: "text-yellow-600 border-yellow-600",
                    children: "Pending",
                  },
                },
                {
                  content: {
                    type: "Flex",
                    gap: "xs",
                    children: [
                      {
                        type: "Button",
                        variant: "ghost",
                        size: "sm",
                        children: "Edit",
                      },
                      {
                        type: "Button",
                        variant: "ghost",
                        size: "sm",
                        className: "text-destructive",
                        children: "Delete",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
    };

    return <div className="w-full max-w-4xl p-6">{render(specification)}</div>;
  },
};