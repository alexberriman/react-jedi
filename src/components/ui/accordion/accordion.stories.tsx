import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { render } from "@/lib/render";

const meta = {
  title: "Components/UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Type of accordion - single or multiple items can be expanded",
    },
    collapsible: {
      control: "boolean",
      description: "When type is 'single', determines if the item can be collapsed",
    },
    defaultValue: {
      control: "text",
      description: "The default expanded item(s)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the entire accordion",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
    collapsible: true,
    className: "w-[400px]",
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    className: "w-[400px]",
    defaultValue: ["item-1", "item-3"],
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1. Multiple sections can be expanded at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content for section 2. Try expanding multiple sections!</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3. This section starts expanded by default.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NonCollapsible: Story = {
  args: {
    type: "single",
    collapsible: false,
    className: "w-[400px]",
    defaultValue: "item-1",
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Always Expanded Item</AccordionTrigger>
        <AccordionContent>
          When collapsible is false, at least one item must remain expanded.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          You can switch between items, but cannot collapse all items.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDisabledItems: Story = {
  args: {
    type: "single",
    collapsible: true,
    className: "w-[400px]",
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Item</AccordionTrigger>
        <AccordionContent>This item can be expanded normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>
          This content cannot be seen because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Enabled Item</AccordionTrigger>
        <AccordionContent>This item also works normally.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  args: {
    type: "single",
    collapsible: true,
    className: "w-[500px]",
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item with Long Content</AccordionTrigger>
        <AccordionContent>
          <p>
            This accordion item contains longer content to demonstrate how the component handles
            varying amounts of text.
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mt-2">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Short Content</AccordionTrigger>
        <AccordionContent>Just a brief bit of content here.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Unstyled: Story = {
  args: {
    type: "single",
    collapsible: true,
    className: "w-[400px] border-none",
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline">Unstyled Accordion</AccordionTrigger>
        <AccordionContent>
          This accordion has minimal styling applied, showing the base functionality.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const ServerDriven: Story = {
  name: "Server-Driven (JSON)",
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "single",
      defaultValue: "item-1",
      collapsible: true,
      items: [
        {
          value: "item-1",
          trigger: "What is React Jedi?",
          content:
            "React Jedi is a server-driven UI library that enables you to build React interfaces using JSON specifications.",
        },
        {
          value: "item-2",
          trigger: "How does it work?",
          content:
            "It uses a single render() function to transform JSON schemas into fully functional React components.",
        },
        {
          value: "item-3",
          trigger: "What are the benefits?",
          content:
            "Zero lock-in architecture, theme inheritance, reactive state management, and more - all through JSON!",
        },
      ],
    };

    return render(spec) || <></>;
  },
};

export const ServerDrivenMultiple: Story = {
  name: "Server-Driven Multiple (JSON)",
  args: {
    type: "multiple",
    defaultValue: ["item-1", "item-3"],
  },
  render: () => {
    const spec = {
      type: "accordion",
      accordionType: "multiple",
      defaultValue: ["item-1", "item-3"],
      items: [
        {
          value: "item-1",
          trigger: "Frontend Technologies",
          content: "React, TypeScript, TailwindCSS, and Vite for modern development.",
        },
        {
          value: "item-2",
          trigger: "Component Library",
          content: "Built on top of Radix UI and ShadCN for accessible, composable components.",
        },
        {
          value: "item-3",
          trigger: "State Management",
          content: "Reactive state management with computed properties and persistence.",
        },
        {
          value: "item-4",
          trigger: "Animation Support",
          content: "Framer Motion integration for smooth, performant animations.",
          disabled: true,
        },
      ],
    };

    return render(spec) || <></>;
  },
};
